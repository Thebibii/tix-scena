import { Concert } from "@/data/concerts";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { CardBrutalism, CardBrutalismContent } from "../ui/brutalism/card";

interface ConcertCardProps {
  concert: Concert;
}

export const ConcertCard = ({ concert }: ConcertCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link href={`/event/${concert.id}`} className="group block ">
      <CardBrutalism className="shadow-shadow p-0 gap-0">
        {/* Image */}
        <div className="aspect-[4/3] bg-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors" />
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 bg-accent-rose text-secondary-foreground border-2 border-foreground font-mono text-xs uppercase rotate-[-2deg]">
              {concert.genre}
            </span>
          </div>
          {concert.isFeatured && (
            <div className="absolute top-3 right-3">
              <span className="inline-block px-3 py-1 bg-accent-mint text-accent-foreground border-2 border-foreground font-mono text-xs uppercase rotate-[2deg]">
                Featured
              </span>
            </div>
          )}
          {/* Placeholder pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-syne font-extrabold text-6xl text-foreground/10 group-hover:text-foreground/20 transition-colors">
              {concert.artist.charAt(0)}
            </span>
          </div>
        </div>

        {/* Content */}
        <CardBrutalismContent className="p-4 border-t-2 border-foreground">
          <h3 className="font-syne font-bold text-lg leading-tight mb-1 group-hover:line-through transition-all">
            {concert.title}
          </h3>
          <p className="font-mono text-sm text-muted-foreground mb-3">
            {concert.artist}
          </p>

          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="w-4 h-4" />
              <span className="font-mono">
                {formatDate(concert.date)} • {concert.time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="font-mono">
                {concert.venue}, {concert.city}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-foreground/30">
            <span className="font-mono text-xs text-muted-foreground uppercase">
              Mulai dari
            </span>
            <span className="font-syne font-bold text-lg">
              {formatPrice(concert.price.regular)}
            </span>
          </div>
        </CardBrutalismContent>
      </CardBrutalism>
    </Link>
  );
};
