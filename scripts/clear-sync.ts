import { config } from 'dotenv'
config()

async function main() {
  const prisma = require('../src/lib/db').default
  await prisma.user.updateMany({ data: { lastSyncAt: null } })
  console.log('Cleared lastSyncAt')
  process.exit(0)
}
main().catch(console.error)
