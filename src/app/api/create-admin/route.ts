import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    // Delete all existing users
    await payload.delete({
      collection: 'users',
      where: {
        id: { exists: true },
      },
    })

    // Create new admin user
    const newAdmin = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@safarindia.com',
        password: 'SafariIndia@2024!',
        name: 'Super Admin',
        role: 'superadmin',
      },
      draft: false, // Ensure user is active/published
    })

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      user: {
        email: newAdmin.email,
        role: newAdmin.role,
      },
      credentials: {
        email: 'admin@safarindia.com',
        password: 'SafariIndia@2024!',
      },
    })
  } catch (error: any) {
    console.error('Error creating admin:', error)
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
