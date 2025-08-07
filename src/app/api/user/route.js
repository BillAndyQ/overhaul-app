import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/auth";

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'No autenticado' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || typeof payload !== 'object' || !('userId' in payload) || !('username' in payload) || !('role' in payload)) {
      return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }

    return NextResponse.json({
      userId: String(payload.userId),
      username: String(payload.username),
      role: String(payload.role),
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
};