import { config } from 'dotenv'
config()

async function test() {
  const prisma = require('../src/lib/db').default
  const users = await prisma.user.findMany()
  if (users.length === 0) {
    console.log("No users found")
    return
  }
  
  const user = users[0]
  if (!user.providerToken) {
    console.log("User has no provider token")
    return
  }

  console.log("Found user with provider token")
  
  // Test WL playlist
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=5&playlistId=WL`,
    {
      headers: {
        Authorization: `Bearer ${user.providerToken}`,
      },
    }
  )

  const data = await response.json()
  console.log("WL Response status:", response.status)
  console.log("WL Response data:", JSON.stringify(data, null, 2))

  // Test Liked Videos (LL)
  const response2 = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=5&playlistId=LL`,
    {
      headers: {
        Authorization: `Bearer ${user.providerToken}`,
      },
    }
  )
  const data2 = await response2.json()
  console.log("LL Response status:", response2.status)
  console.log("LL Response count:", data2.items?.length)
}

test().catch(console.error)
