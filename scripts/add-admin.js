const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addAdmin(email) {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, role: true }
    })

    if (!user) {
      console.error(`User with email ${email} not found`)
      return
    }

    if (user.role === 'admin') {
      console.log(`User ${user.name} (${user.email}) is already an admin`)
      return
    }

    // Update user role to admin
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { role: 'admin' },
      select: { id: true, name: true, email: true, role: true }
    })

    console.log(`Successfully made ${updatedUser.name} (${updatedUser.email}) an admin`)
  } catch (error) {
    console.error('Error updating user role:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Get email from command line argument
const email = process.argv[2]

if (!email) {
  console.error('Please provide an email address')
  console.log('Usage: node scripts/add-admin.js <email>')
  process.exit(1)
}

addAdmin(email) 