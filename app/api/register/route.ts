import bcryptt from 'bcrypt'
import prisma from '@/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const { 
        name,
        email,
        password
    } = body
    console.log('body...',body)

    const hashedPassword = await bcryptt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}