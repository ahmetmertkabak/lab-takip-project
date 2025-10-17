import { auth, signIn, signOut } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Lab Takip Projesi
          </h1>
          
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 mb-4">
              Next.js 14 + TypeScript + Tailwind CSS + Prisma + NextAuth.js v5
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Proje Özellikleri:
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Next.js 14 App Router</li>
              <li>✅ TypeScript desteği</li>
              <li>✅ Tailwind CSS entegrasyonu</li>
              <li>✅ Prisma ORM (PostgreSQL)</li>
              <li>✅ NextAuth.js v5 authentication</li>
              <li>✅ Prisma singleton pattern</li>
            </ul>
          </div>

          <div className="text-center">
            {session?.user ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 mb-2">
                    Hoş geldiniz, {session.user.name || session.user.email}!
                  </p>
                  {session.user.image && (
                    <img 
                      src={session.user.image} 
                      alt="Profil" 
                      className="w-12 h-12 rounded-full mx-auto mb-2"
                    />
                  )}
                </div>
                <form action={async () => {
                  "use server"
                  await signOut()
                }}>
                  <button 
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                  >
                    Çıkış Yap
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">
                  Giriş yapmak için aşağıdaki butonlardan birini kullanın:
                </p>
                <div className="space-x-4">
                  <form action={async () => {
                    "use server"
                    await signIn("google")
                  }} className="inline">
                    <button 
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                      Google ile Giriş
                    </button>
                  </form>
                  <form action={async () => {
                    "use server"
                    await signIn("github")
                  }} className="inline">
                    <button 
                      type="submit"
                      className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition duration-200"
                    >
                      GitHub ile Giriş
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
