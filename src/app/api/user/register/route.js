// app/api/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken, generateRefreshToken } from '@/utils/auth';
import { insertIntoTable } from '@/utils/db_tables/connect';
import { queryDB } from '@/utils/db_tables/connect';

// Simulación de una base de datos en memoria

export async function POST(req) {
  try {
    const { username, password, role, ...fields } = await req.json();

    // Validar entrada
    if (!username || !password) {
      return NextResponse.json({ message: 'Usuario y contraseña son requeridos' }, { status: 400 });
    }

    // Verificar si el usuario ya existe
    const users_res = await queryDB(`SELECT * FROM users where username='${username}'`)

    if (users_res[0]?.username == username) {
      return NextResponse.json({ message: 'El usuario ya existe' }, { status: 409 });
    }
    
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const user = {
      username: username,
      password: hashedPassword,
      role: role,
    };

    const newUser = await insertIntoTable("users",{...user, ...fields})

    // Generar tokens
    // const token = await generateToken({ userId: user.id, username: user.username, role : user.role });
    // const refreshToken = await generateRefreshToken({ userId: user.id, username: user.username, role : user.role });

    // Crear respuesta
    const response = NextResponse.json({ message: 'Usuario registrado exitosamente' , newUser});

    // // Establecer cookies
    // response.cookies.set('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 60 * 60, // 1 hora
    //   path: '/',
    //   sameSite: 'strict',
    // });
    // response.cookies.set('refresh_token', refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 7 * 24 * 60 * 60, // 7 días
    //   path: '/',
    //   sameSite: 'strict',
    // });

    return response;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}