import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Tohumlama başlatılıyor...')

  // Laboratuvarları oluştur
  const gömülüLab = await prisma.lab.upsert({
    where: { name: 'Gömülü' },
    update: {},
    create: {
      name: 'Gömülü',
    },
  })

  const bilgisayarLab = await prisma.lab.upsert({
    where: { name: 'Bilgisayar Laboratuvarı' },
    update: {},
    create: {
      name: 'Bilgisayar Laboratuvarı',
    },
  })

  const networkLab = await prisma.lab.upsert({
    where: { name: 'Network Laboratuvarı' },
    update: {},
    create: {
      name: 'Network Laboratuvarı',
    },
  })

  console.log('✅ Laboratuvarlar oluşturuldu')

  // Gömülü Laboratuvarı için 14 bilgisayar
  const gömülüComputers = []
  for (let i = 1; i <= 14; i++) {
    const computer = await prisma.computer.create({
      data: {
        name: `Gömülü-${i.toString().padStart(2, '0')}`,
        labId: gömülüLab.id,
      },
    })
    gömülüComputers.push(computer)
  }
  console.log(`✅ Gömülü Laboratuvarı'na ${gömülüComputers.length} bilgisayar eklendi`)

  // Bilgisayar Laboratuvarı için 12 bilgisayar
  const bilgisayarComputers = []
  for (let i = 1; i <= 12; i++) {
    const computer = await prisma.computer.create({
      data: {
        name: `BilLab-${i.toString().padStart(2, '0')}`,
        labId: bilgisayarLab.id,
      },
    })
    bilgisayarComputers.push(computer)
  }
  console.log(`✅ Bilgisayar Laboratuvarı'na ${bilgisayarComputers.length} bilgisayar eklendi`)

  // Network Laboratuvarı için 8 bilgisayar
  const networkComputers = []
  for (let i = 1; i <= 8; i++) {
    const computer = await prisma.computer.create({
      data: {
        name: `Network-${i.toString().padStart(2, '0')}`,
        labId: networkLab.id,
      },
    })
    networkComputers.push(computer)
  }
  console.log(`✅ Network Laboratuvarı'na ${networkComputers.length} bilgisayar eklendi`)

  console.log('🎉 Tohumlama tamamlandı!')
  console.log(`📊 Toplam: 3 laboratuvar, ${14 + 12 + 8} bilgisayar oluşturuldu`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Tohumlama hatası:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
