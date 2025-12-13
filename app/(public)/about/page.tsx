import { Marquee } from "@/components/ui/marquee";

export default function Page() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 border-b-2 border-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-accent-rose text-secondary-foreground border-2 border-foreground font-mono text-xs uppercase -rotate-1 mb-6">
              Est. 2024
            </span>
            <h1 className="font-gabirato font-extrabold text-5xl md:text-7xl tracking-tight mb-6">
              TENTANG
              <br />
              <span className="text-stroke">TIXSKENA</span>
            </h1>
            <p className="font-mono text-lg text-muted-foreground leading-relaxed">
              Platform tiket konser yang dibuat untuk anak seni, skena, dan
              semua orang yang mencintai musik live. Kami percaya musik harus
              bisa dinikmati semua orang.
            </p>
          </div>
        </div>
      </section>

      <Marquee
        className="bg-primary text-primary-foreground py-2 [--duration:20s]"
        pauseOnHover
      >
        <p className="font-mono text-sm uppercase tracking-widest">
          Musik adalah kehidupan
        </p>
        <p className="font-mono text-sm uppercase tracking-widest">
          Musik adalah kehidupan
        </p>
      </Marquee>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-accent-mint text-accent-foreground border-2 border-foreground font-mono text-xs uppercase rotate-1 mb-4">
                Misi Kami
              </span>
              <h2 className="font-gabirato font-bold text-3xl md:text-4xl mb-6">
                Menghubungkan Musik dan Penggemarnya
              </h2>
              <p className="font-mono text-muted-foreground leading-relaxed mb-4">
                TIXSKENA hadir untuk memudahkan kamu mendapatkan tiket konser
                favorit. Dari gig kecil di basement sampai festival musik besar,
                semua ada di sini.
              </p>
              <p className="font-mono text-muted-foreground leading-relaxed">
                Kami mendukung scene musik lokal dengan memberikan platform yang
                fair untuk artis dan penyelenggara event.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-accent-rose border-2 border-foreground shadow-shadow">
                <span className="font-gabirato font-extrabold text-4xl">
                  50+
                </span>
                <p className="font-mono text-sm text-muted-foreground mt-2">
                  Event Tiap Bulan
                </p>
              </div>
              <div className="p-6 bg-accent-mint border-2 border-foreground shadow-shadow translate-y-4">
                <span className="font-gabirato font-extrabold text-4xl">
                  10K+
                </span>
                <p className="font-mono text-sm text-muted-foreground mt-2">
                  Tiket Terjual
                </p>
              </div>
              <div className="p-6 bg-card border-2 border-foreground shadow-shadow">
                <span className="font-gabirato font-extrabold text-4xl">
                  100+
                </span>
                <p className="font-mono text-sm text-muted-foreground mt-2">
                  Partner Venue
                </p>
              </div>
              <div className="p-6 bg-muted border-2 border-foreground shadow-shadow translate-y-4">
                <span className="font-gabirato font-extrabold text-4xl">
                  24/7
                </span>
                <p className="font-mono text-sm text-muted-foreground mt-2">
                  Customer Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-t-2 border-foreground">
        <div className="container mx-auto px-4">
          <span className="inline-block px-3 py-1 bg-accent-rose text-secondary-foreground border-2 border-foreground font-mono text-xs uppercase -rotate-1 mb-4">
            Nilai Kami
          </span>
          <h2 className="font-gabirato font-extrabold text-3xl md:text-4xl mb-12">
            APA YANG <span className="text-stroke">KAMI PERCAYA</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-foreground hover:-translate-y-1 transition-transform shadow-shadow hover:shadow-[6px_6px_0px_hsl(var(--foreground))]">
              <span className="font-gabirato font-extrabold text-6xl text-foreground/10">
                01
              </span>
              <h3 className="font-gabirato font-bold text-xl mb-3 -mt-4">
                Autentik
              </h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Kami tidak pura-pura. Setiap event yang kami kurasi adalah event
                yang benar-benar worth it.
              </p>
            </div>

            <div className="p-6 border-2 border-foreground hover:-translate-y-1 transition-transform shadow-shadow hover:shadow-[6px_6px_0px_hsl(var(--foreground))]">
              <span className="font-gabirato font-extrabold text-6xl text-foreground/10">
                02
              </span>
              <h3 className="font-gabirato font-bold text-xl mb-3 -mt-4">
                Inklusif
              </h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Musik untuk semua. Harga transparan, tidak ada biaya
                tersembunyi.
              </p>
            </div>

            <div className="p-6 border-2 border-foreground hover:-translate-y-1 transition-transform shadow-shadow hover:shadow-[6px_6px_0px_hsl(var(--foreground))]">
              <span className="font-gabirato font-extrabold text-6xl text-foreground/10">
                03
              </span>
              <h3 className="font-gabirato font-bold text-xl mb-3 -mt-4">
                Komunitas
              </h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Kami mendukung scene lokal. Dari indie sampai mainstream, semua
                punya tempat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
