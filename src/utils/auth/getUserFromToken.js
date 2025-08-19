import { jwtVerify } from 'jose';
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload; // contiene: role, id, email, etc.
  } catch (err) {
    throw new Error("Invalid token");
  }
}
