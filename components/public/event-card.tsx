"use client";
import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { CardBrutalism, CardBrutalismContent } from "../ui/brutalism/card";
import { Event } from "@/data/concerts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: Event;
}

const categoryLabels: Record<string, string> = {
  music: "Musik",
  festival: "Festival",
  exhibition: "Pameran",
  theater: "Teater",
  workshop: "Workshop",
};

export const EventCard = ({ event }: EventCardProps) => {
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

  const router = useRouter();

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/creator/${event.creator.id}`);
  };

  return (
    <Link href={`/event/${event.id}`} className="group block ">
      <CardBrutalism className="shadow-shadow p-0 gap-0">
        {/* Image */}
        <div className="aspect-4/3 bg-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-foreground/10 group-hover:bg-transparent transition-colors" />
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            <span className="inline-block px-3 py-1 bg-accent-rose text-secondary-foreground border-2 border-foreground font-mono text-xs uppercase -rotate-2">
              {categoryLabels[event.category] || event.category}
            </span>
          </div>
          {event.isFeatured && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-block px-3 py-1 bg-accent-mint text-accent-foreground border-2 border-foreground font-mono text-xs uppercase rotate-2">
                Featured
              </span>
            </div>
          )}

          <img
            src={event.image || "/events/placeholder.jpg"}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Placeholder big letter (jika image gagal load) */}
          {!event.image && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-syne font-extrabold text-6xl text-foreground/10 group-hover:text-foreground/20 transition-colors">
                {event.artist.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <CardBrutalismContent className="p-4 border-t-2 border-foreground">
          {/* Creator Info */}
          <div
            onClick={handleCreatorClick}
            className="flex items-center gap-2 mb-3 hover:opacity-70 transition-opacity"
          >
            <Avatar className="w-6 h-6 border border-foreground">
              <AvatarImage
                src={event.creator.avatar}
                alt={event.creator.name}
              />
              <AvatarFallback className="text-xs font-mono bg-muted">
                {event.creator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-mono text-xs text-muted-foreground truncate hover:underline">
              {event.creator.name}
            </span>
          </div>

          <h3 className="font-syne font-bold text-lg leading-tight mb-1 group-hover:line-through transition-all line-clamp-1">
            {event.title}
          </h3>
          <p className="font-mono text-sm text-muted-foreground mb-3 line-clamp-1">
            {event.artist}
          </p>

          <div className="space-y-1 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <CalendarDays className="w-4 h-4" />
              <span className="font-mono">
                {formatDate(event.date)} • {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span className="font-mono line-clamp-1">
                {event.venue}, {event.city}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-foreground/30">
            <span className="font-mono text-xs text-muted-foreground uppercase">
              Mulai dari
            </span>
            <span className="font-syne font-bold text-lg">
              {formatPrice(event.price.regular)}
            </span>
          </div>
        </CardBrutalismContent>
      </CardBrutalism>
    </Link>
  );
};
