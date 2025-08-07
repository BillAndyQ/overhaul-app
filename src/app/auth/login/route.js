import { queryDB} from "@/utils/db_tables/connect"
import { NextResponse } from "next/server";

import { generateToken, generateRefreshToken } from '@/utils/auth';

import bcrypt from 'bcryptjs';


export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // Validar entrada
    if (!username || !password) {
      return NextResponse.json({ message: 'Usuario y contraseña son requeridos' }, { status: 400 });
    }

    // Verificar si el usuario existe
    const users = await queryDB(`SELECT * FROM users where username='${username}'`)

    if (users.length === 0) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    const user = users[0];

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Credenciales inválidas' }, { status: 401 });
    }

    // Generar tokens
    const token = await generateToken({ userId: user.id, username: user.username, role: user.role });
    const refreshToken = await generateRefreshToken({ userId: user.id, username: user.username, role: user.role });
    
    // Crear respuesta
    const response = NextResponse.json({ message: 'Inicio de sesión exitoso' , user});

    // Establecer cookies
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60, // 1 hora
      path: '/',
      sameSite: 'strict',
    });
    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 días
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}