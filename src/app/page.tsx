import Link from 'next/link'
import { getSession } from '@/lib/actions/auth.actions'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await getSession()

  if (session) {
    redirect('/questions')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 flex flex-col justify-between">
      
      {/* Navbar on landing */}
      <header className="border-b border-gray-200 bg-white/80 dark:bg-gray-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary-700 dark:text-primary-500 font-arabic">منهجنا</span>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Manhajuna</span>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="btn btn-secondary px-4 py-2 text-sm">
              Masuk
            </Link>
            <Link href="/register" className="btn btn-primary px-4 py-2 text-sm">
              Daftar
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero & Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center items-center">
        
        {/* Hero Section */}
        <section className="text-center max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Rujukan Tanya Jawab <span className="text-primary-700 dark:text-primary-400">Ilmiah Islami</span> Berstandar Turats
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Platform Q&A ilmiah berbasis reputasi dengan verifikasi referensi Kitab Kuning (Turats) mu'tabar langsung oleh para Muraqi (moderator).
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn btn-primary px-8 py-3.5 text-base shadow-lg hover:shadow-primary-700/20">
              Mulai Bertanya & Menjawab
            </Link>
            <Link href="/questions" className="btn btn-secondary px-8 py-3.5 text-base">
              Jelajahi Pertanyaan (Tamu)
            </Link>
          </div>
        </section>

        {/* Feature Cards Grid (StackOverflow Concept) */}
        <section className="w-full grid md:grid-cols-3 gap-8 max-w-5xl">
          <div className="card p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className="text-primary-700 dark:text-primary-400 text-3xl mb-4 font-bold">01</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Q&A Ilmiah & Terarah</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Ajukan pertanyaan seputar Fikih, Nahwu, Tafsir, Hadits, dan bidang keilmuan lainnya secara terstruktur.
            </p>
          </div>

          <div className="card p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className="text-secondary-dark text-3xl mb-4 font-bold">02</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Validasi Kitab Kuning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Setiap jawaban didukung lampiran teks Arab, terjemahan, jilid, dan halaman kitab klassik yang divalidasi langsung.
            </p>
          </div>

          <div className="card p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <div className="text-primary-700 dark:text-primary-400 text-3xl mb-4 font-bold">03</div>
            <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Reputasi & Prestasi</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Dapatkan reputasi (pts) dari kontribusi jawaban tervalidasi dan raih badge keilmuan khusus.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <p className="font-arabic text-sm text-primary-600/80 dark:text-primary-500/80 font-bold mb-1">منهجنا للعلوم الشرعية</p>
          <p>&copy; 2024 Manhajuna Q&A. Semua hak cipta dilindungi.</p>
        </div>
      </footer>

    </div>
  )
}
