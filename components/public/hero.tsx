import { ArrowRight, Disc3 } from "lucide-react";
import Link from "next/link";
import { ButtonBrutalism } from "../ui/brutalism/button";
import { events } from "@/data/concerts";

export const Hero = () => {
  const featuredConcert = events.find((c) => c.isFeatured) || events[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="min-h-[90vh] pt-16 z-10 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-foreground rotate-12" />
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-foreground -rotate-6" />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-secondary rotate-45" />
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-accent -rotate-12" />
      </div>

      <div className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent-rose border-2 border-foreground -rotate-1">
              <Disc3
                className="w-4 h-4 animate-spin"
                style={{ animationDuration: "3s" }}
              />
              <span className="font-mono text-xs uppercase tracking-wider">
                Live Music Events
              </span>
            </div>

            <h1 className="font-syne font-extrabold text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter">
              BELI
              <br />
              <span className="text-stroke">TIKET</span>
              <br />
              KONSER
            </h1>

            <p className="font-mono text-muted-foreground max-w-md text-sm leading-relaxed">
              Platform tiket konser untuk anak seni, skena, dan semua yang
              mencintai musik live. Dari underground sampai mainstream, semua
              ada di sini.
            </p>

            <div className="flex flex-wrap gap-4">
              <ButtonBrutalism
                variant="noShadow"
                size="lg"
                className="shadow-shadow"
                asChild
              >
                <Link href={`/event/${featuredConcert.id}`}>
                  Lihat Event
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </ButtonBrutalism>
              <ButtonBrutalism
                size="lg"
                variant="noShadow"
                className="shadow-shadow bg-secondary text-primary"
                asChild
              >
                <Link href="#events">Jelajahi</Link>
              </ButtonBrutalism>
            </div>
          </div>

          {/* Right - Featured Concert */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-accent-rose border-2 border-foreground" />
            <div className="relative bg-card border-2 border-foreground p-6">
              <div className="absolute -top-3 -right-3">
                <span className="inline-block px-4 py-2 bg-accent-mint text-accent-foreground border-2 border-foreground font-mono text-xs uppercase rotate-3">
                  Coming Soon
                </span>
              </div>

              <div className="aspect-video group bg-muted mb-4 relative overflow-hidden border-2 border-foreground">
                <img
                  src={featuredConcert.image || "/events/placeholder.jpg"}
                  alt={featuredConcert.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!featuredConcert.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-syne font-extrabold text-8xl text-foreground/10">
                      ★
                    </span>
                  </div>
                )}
              </div>

              <span className="inline-block px-3 py-1 bg-accent-rose text-secondary-foreground border border-foreground font-mono text-xs uppercase mb-3">
                {featuredConcert.genre}
              </span>

              <h2 className="font-syne font-bold text-2xl mb-2">
                {featuredConcert.title}
              </h2>
              <p className="font-mono text-sm text-muted-foreground mb-4">
                {featuredConcert.artist}
              </p>

              <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-foreground/30">
                <div className="font-mono text-sm">
                  <p className="text-muted-foreground text-xs uppercase">
                    Tanggal
                  </p>
                  <p className="font-bold">
                    {formatDate(featuredConcert.date)}
                  </p>
                </div>
                <ButtonBrutalism
                  className="rounded-none bg-accent-rose text-primary shadow-shadow cursor-pointer -rotate-1 hover:rotate-1"
                  variant="noShadow"
                  size="sm"
                  asChild
                >
                  <Link href={`/event/${featuredConcert.id}`}>Beli Tiket</Link>
                </ButtonBrutalism>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
