import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     email: 'test2@nomad.com',
  //     password: '123456',
  //     name: 'tester2',
  //   },
  // })
  // console.log(user)

  // const user = await prisma.user.create({
  //   data: {
  //     email: 'test@nomad.com',
  //     password: '123456',
  //     name: 'tester',
  //   },
  // })
  // console.log(user)

  const tweet = await prisma.tweet.update({
    data : {
      content: "테스터2의 트윗",
    },
    where : {
      id : 4
    }
  })
  console.log(tweet)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })