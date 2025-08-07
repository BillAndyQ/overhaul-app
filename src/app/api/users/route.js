import { NextResponse } from "next/server";
import dbTables from "@/utils/db_tables/tables";
import { queryDB } from "@/utils/db_tables/connect";

export async function GET(req) {
  try {
    const {users } = dbTables
    
    const result = await queryDB(`SELECT ${Object.keys(users)} from users`)

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
};

