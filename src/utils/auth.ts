// lib/auth.ts
import { SignJWT, jwtVerify } from 'jose';

// Clave secreta para firmar/verificar tokens
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

// Generar un JWT (access token)
export async function generateToken(payload: { userId: string; username: string, role: string }) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h') // Expira en 24 hora
    .sign(secretKey);
    
  return token;
}

// Generar un refresh token (opcional)
export async function generateRefreshToken(payload: { userId: string; username: string, role: string }) {
  const refreshToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Expira en 7 días
    .sign(secretKey);

  return refreshToken;
}

// Verificar un JWT
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}