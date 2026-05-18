import { config } from 'dotenv'
config()

async function main() {
  const prisma = require('../src/lib/db').default
  const categories = await prisma.category.findMany({ where: { slug: null } })
  
  for (const cat of categories) {
    const slug = cat.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    await prisma.category.update({
      where: { id: cat.id },
      data: { slug }
    })
    console.log(`Updated ${cat.name} → ${slug}`)
  }

  console.log(`Backfilled ${categories.length} categories`)
  process.exit(0)
}

main().catch(console.error)
