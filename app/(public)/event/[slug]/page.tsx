import { Navbar } from "@/components/public/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Globe,
  Instagram,
  MapPin,
  Tag,
  Ticket,
  Twitter,
} from "lucide-react";
import { events } from "@/data/concerts";
import { EventCard } from "@/components/public/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  TabsBrutalism,
  TabsBrutalismContent,
  TabsBrutalismList,
  TabsBrutalismTrigger,
} from "@/components/ui/brutalism/tabs";
import { ButtonBrutalism } from "@/components/ui/brutalism/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const categoryLabels: Record<string, string> = {
  music: "Musik",
  festival: "Festival",
  exhibition: "Pameran",
  theater: "Teater",
  workshop: "Workshop",
};

// Server Component - mengambil params dengan SSR
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = events.find((c) => c.id === slug);

  // Get recommended events (same category, excluding current)
  const recommendedEvents = events
    .filter((e) => e.id !== slug && e.category === event?.category)
    .slice(0, 8);

  // If not enough from same category, add from other categories
  if (recommendedEvents.length < 3 && event) {
    const otherEvents = events
      .filter((e) => e.id !== slug && e.category !== event.category)
      .slice(0, 8 - recommendedEvents.length);
    recommendedEvents.push(...otherEvents);
  }

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Jika konser tidak ditemukan
  if (!event) {
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
    <main className="pt-20 flex flex-col space-y-6">
      {/* Back button */}
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider hover:line-through"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Banner */}
            <div className="relative group aspect-video bg-muted border-2 border-foreground overflow-hidden shadow-shadow">
              <img
                src={event.image || "/events/placeholder.jpg"}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!event.image && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-syne font-extrabold text-[300px] text-foreground/5">
                    {event.artist.charAt(0)}
                  </span>
                </div>
              )}

              <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 hidden sm:block">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-4 py-2 bg-accent-rose text-secondary-foreground border-2 border-foreground font-mono text-sm uppercase">
                    {categoryLabels[event.category] || event.category}
                  </span>
                  {event.isFeatured && (
                    <span className="inline-block px-4 py-2 bg-accent-mint text-accent-foreground border-2 border-foreground font-mono text-sm uppercase">
                      Featured
                    </span>
                  )}
                </div>
                <h1 className="font-syne font-extrabold text-4xl md:text-6xl tracking-tight mb-2">
                  {event.title}
                </h1>
                <p className="font-mono text-xl text-muted-foreground">
                  {event.artist}
                </p>
              </div>
            </div>

            {/* Event Info Card */}
            <div className="border-2 border-foreground p-6 bg-card shadow-shadow block lg:hidden">
              <h3 className="font-syne font-bold text-lg mb-4 pb-3 border-b-2 border-dashed border-foreground/30">
                Informasi Event
              </h3>

              <div className="space-y-4">
                {/* Event Name */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-muted border border-foreground/20">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase">
                      Nama Event
                    </p>
                    <p className="font-syne font-bold text-sm">{event.title}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-muted border border-foreground/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase">
                      Lokasi
                    </p>
                    <p className="font-syne font-bold text-sm">{event.venue}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {event.city}
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-muted border border-foreground/20">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase">
                      Tanggal & Waktu
                    </p>
                    <p className="font-syne font-bold text-sm">
                      {formatDate(event.date)}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {event.time} WIB
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-muted border border-foreground/20">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase">
                      Kategori
                    </p>
                    <p className="font-syne font-bold text-sm">
                      {categoryLabels[event.category] || event.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Card */}
            <div className="border-2 border-foreground p-6 bg-card shadow-shadow block lg:hidden">
              <h3 className="font-syne font-bold text-lg mb-4 pb-3 border-b-2 border-dashed border-foreground/30">
                Penyelenggara
              </h3>

              <Link
                href={`/creator/${event.creator.id}`}
                className="flex items-center gap-3 mb-4 hover:opacity-70 transition-opacity"
              >
                <Avatar className="w-12 h-12 border-2 border-foreground">
                  <AvatarImage
                    src={event.creator.avatar}
                    alt={event.creator.name}
                  />
                  <AvatarFallback className="font-mono bg-accent-rose">
                    {event.creator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-syne font-bold hover:underline">
                    {event.creator.name}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    Event Organizer
                  </p>
                </div>
              </Link>

              {/* Social Media Links */}
              {event.creator.socialMedia && (
                <div className="flex gap-2">
                  {event.creator.socialMedia.instagram && (
                    <a
                      href={event.creator.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {event.creator.socialMedia.twitter && (
                    <a
                      href={event.creator.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {event.creator.socialMedia.website && (
                    <a
                      href={event.creator.socialMedia.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Tabs */}
            <TabsBrutalism defaultValue="description" className="w-full">
              <TabsBrutalismList className="w-full grid grid-cols-2 h-auto p-0 bg-transparent border-2 border-foreground">
                <TabsBrutalismTrigger
                  value="description"
                  className="font-mono uppercase text-sm py-3 rounded-none data-[state=active]:bg-foreground data-[state=active]:text-background border-r border-foreground"
                >
                  Deskripsi
                </TabsBrutalismTrigger>
                <TabsBrutalismTrigger
                  value="terms"
                  className="font-mono uppercase text-sm py-3 rounded-none data-[state=active]:bg-foreground data-[state=active]:text-background"
                >
                  Syarat & Ketentuan
                </TabsBrutalismTrigger>
              </TabsBrutalismList>
              <TabsBrutalismContent
                value="description"
                className="mt-4 p-6 border-2 border-foreground bg-card"
              >
                <p className="font-mono text-sm leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </TabsBrutalismContent>
              <TabsBrutalismContent
                value="terms"
                className="mt-4 p-6 border-2 border-foreground bg-card"
              >
                <p className="font-mono text-sm leading-relaxed whitespace-pre-line">
                  {event.terms ||
                    "Syarat dan ketentuan akan diumumkan kemudian."}
                </p>
              </TabsBrutalismContent>
            </TabsBrutalism>
          </div>
          {/* Right - Info Sidebar */}
          <div className="space-y-6 sticky top-24">
            {/* Event Info Card */}
            <div className="border-2 border-foreground p-6 bg-card shadow-shadow hidden lg:block">
              <h3 className="font-syne font-bold text-lg mb-4 pb-3 border-b-2 border-dashed border-foreground/30">
                Informasi Event
              </h3>

              <div className="space-y-4">
                {/* Event Name */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-muted border border-foreground/20">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase">
                      Nama Event
                    </p>
                    <p className="font-syne font-bold text-sm">{event.title}</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-muted border border-foreground/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase">
                      Lokasi
                    </p>
                    <p className="font-syne font-bold text-sm">{event.venue}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {event.city}
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-muted border border-foreground/20">
                    <CalendarDays className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase">
                      Tanggal & Waktu
                    </p>
                    <p className="font-syne font-bold text-sm">
                      {formatDate(event.date)}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {event.time} WIB
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-muted border border-foreground/20">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-muted-foreground uppercase">
                      Kategori
                    </p>
                    <p className="font-syne font-bold text-sm">
                      {categoryLabels[event.category] || event.category}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizer Card */}
            <div className="border-2 border-foreground p-6 bg-card shadow-shadow hidden lg:block">
              <h3 className="font-syne font-bold text-lg mb-4 pb-3 border-b-2 border-dashed border-foreground/30">
                Penyelenggara
              </h3>

              <Link
                href={`/creator/${event.creator.id}`}
                className="flex items-center gap-3 mb-4 hover:opacity-70 transition-opacity"
              >
                <Avatar className="w-12 h-12 border-2 border-foreground">
                  <AvatarImage
                    src={event.creator.avatar}
                    alt={event.creator.name}
                  />
                  <AvatarFallback className="font-mono bg-accent-rose">
                    {event.creator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-syne font-bold hover:underline">
                    {event.creator.name}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    Event Organizer
                  </p>
                </div>
              </Link>

              {/* Social Media Links */}
              {event.creator.socialMedia && (
                <div className="flex gap-2">
                  {event.creator.socialMedia.instagram && (
                    <a
                      href={event.creator.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {event.creator.socialMedia.twitter && (
                    <a
                      href={event.creator.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {event.creator.socialMedia.website && (
                    <a
                      href={event.creator.socialMedia.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Price & Buy Button */}
            <div className="border-2 border-foreground p-6 bg-accent-rose shadow-shadow hidden lg:block">
              <div className="mb-4">
                <p className="font-mono text-xs text-muted-foreground uppercase mb-1">
                  Harga mulai dari
                </p>
                <p className="font-syne font-extrabold text-3xl">
                  {formatPrice(event.price.regular)}
                </p>
              </div>
              <ButtonBrutalism
                variant="reverseToOutline"
                size="lg"
                className="w-full"
                asChild
              >
                <Link href={`/event/${event.id}/tickets`}>Beli Tiket</Link>
              </ButtonBrutalism>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Events */}
      <div className="container mx-auto px-4 pb-16">
        {recommendedEvents.length > 0 && (
          <div>
            <h2 className="font-syne font-bold text-2xl mb-6">
              Event Rekomendasi
            </h2>
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
            >
              <CarouselContent className="">
                {recommendedEvents.map((recEvent) => (
                  <CarouselItem
                    key={recEvent.id}
                    className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <EventCard event={recEvent} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 sm:-left-4 " />
              <CarouselNext className="right-0 sm:-right-4 " />
            </Carousel>
          </div>
        )}
      </div>

      {/* Price & Buy Button */}
      <div className="border-2 border-foreground px-6 py-4 space-y-4 bg-accent-rose shadow-shadow  fixed left-0 right-0 bottom-0 z-10 lg:hidden">
        <div className="flex items-center justify-between">
          <p className="font-mono font-bold text-xs text-primary uppercase">
            Harga mulai dari
          </p>
          <p className="font-mono font-bold text-xl md:text-2xl">
            {formatPrice(event.price.regular)}
          </p>
        </div>
        <ButtonBrutalism
          variant="reverseToOutline"
          size="lg"
          className="w-full rounded-lg"
          asChild
        >
          <Link href={`/event/${event.id}/tickets`}>
            <Ticket />
            Beli Tiket
          </Link>
        </ButtonBrutalism>
      </div>
    </main>
  );
}

// Generate static params untuk static generation (opsional)
export async function generateStaticParams() {
  return events.map((event) => ({
    slug: event.id,
  }));
}
