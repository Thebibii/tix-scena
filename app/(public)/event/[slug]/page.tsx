import { concerts } from "@/data/concerts";
import { Navbar } from "@/components/public/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { ConcertDetailClient } from "@/components/public/concert-detail-content";

// Server Component - mengambil params dengan SSR
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concert = concerts.find((c) => c.id === slug);

  // Helper functions untuk formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Jika konser tidak ditemukan
  if (!concert) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="font-syne font-bold text-4xl mb-4">
            Konser tidak ditemukan
          </h1>
          <Link href="/">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20">
        {/* Back button */}
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider hover:line-through"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Image (Static SSR) */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted border-2 border-foreground relative overflow-hidden shadow-[8px_8px_0px_hsl(var(--foreground))]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-syne font-extrabold text-[200px] text-foreground/5">
                    {concert.artist.charAt(0)}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-4 py-2 bg-accent-rose text-secondary-foreground border-2 border-foreground font-mono text-sm uppercase -rotate-2">
                    {concert.genre}
                  </span>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-card border-2 border-foreground text-center">
                  <CalendarDays className="w-5 h-5 mx-auto mb-2" />
                  <p className="font-mono text-xs">
                    {formatDate(concert.date).split(",")[0]}
                  </p>
                </div>
                <div className="p-4 bg-card border-2 border-foreground text-center">
                  <Clock className="w-5 h-5 mx-auto mb-2" />
                  <p className="font-mono text-xs">{concert.time} WIB</p>
                </div>
                <div className="p-4 bg-card border-2 border-foreground text-center">
                  <MapPin className="w-5 h-5 mx-auto mb-2" />
                  <p className="font-mono text-xs">{concert.city}</p>
                </div>
              </div>
            </div>

            {/* Right - Details (Static SSR) */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 bg-accent-mint text-accent-foreground border-2 border-foreground font-mono text-xs uppercase rotate-1 mb-4">
                  {formatDate(concert.date)}
                </span>
                <h1 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight mb-2">
                  {concert.title}
                </h1>
                <p className="font-mono text-xl text-muted-foreground">
                  {concert.artist}
                </p>
              </div>

              <div className="p-4 bg-secondary border-2 border-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-syne font-bold">{concert.venue}</p>
                    <p className="font-mono text-sm text-muted-foreground">
                      {concert.city}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  Deskripsi
                </h3>
                <p className="font-mono text-sm leading-relaxed">
                  {concert.description}
                </p>
              </div>

              {/* Client Component untuk interaksi */}
              <ConcertDetailClient concert={concert} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Generate static params untuk static generation (opsional)
export async function generateStaticParams() {
  return concerts.map((concert) => ({
    slug: concert.id,
  }));
}
