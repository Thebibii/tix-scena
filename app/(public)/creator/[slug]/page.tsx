"use client";
import { useState } from "react";
import {
  ArrowLeft,
  Instagram,
  Twitter,
  Globe,
  Calendar,
  MapPin,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { events } from "@/data/concerts";
import { Navbar } from "@/components/public/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/public/event-card";
import {
  TabsBrutalism,
  TabsBrutalismContent,
  TabsBrutalismList,
  TabsBrutalismTrigger,
} from "@/components/ui/brutalism/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/brutalism/dropdown-menu";
import { ButtonBrutalism } from "@/components/ui/brutalism/button";
import { isPastEvent } from "@/lib/utils";

// Sort options
const SORT_OPTIONS = {
  DATE_NEAREST: "date_nearest",
  DATE_FARTHEST: "date_farthest",
  NAME_ASC: "name_asc",
  NAME_DESC: "name_desc",
};

const SORT_LABELS = {
  [SORT_OPTIONS.DATE_NEAREST]: "Waktu Mulai (Terdekat)",
  [SORT_OPTIONS.DATE_FARTHEST]: "Waktu Mulai (Terjauh)",
  [SORT_OPTIONS.NAME_ASC]: "Nama Event (A - Z)",
  [SORT_OPTIONS.NAME_DESC]: "Nama Event (Z - A)",
};

export default function CreatorProfile() {
  const { slug } = useParams();
  const [sortOption, setSortOption] = useState(SORT_OPTIONS.DATE_NEAREST);

  // Find creator from events data
  const creatorEvents = events.filter((e) => e.creator.id === slug);
  const creator = creatorEvents[0]?.creator;

  if (!creator) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="font-gabirato font-bold text-4xl mb-4">
            Creator tidak ditemukan
          </h1>
          <Link href="/">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Filter event aktif dan event lalu
  const activeEvents = creatorEvents
    .filter((e) => !isPastEvent(e.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Fungsi untuk mengurutkan event lalu
  const sortPastEvents = (events: typeof creatorEvents) => {
    const sortedEvents = [...events];

    switch (sortOption) {
      case SORT_OPTIONS.DATE_NEAREST:
        return sortedEvents.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case SORT_OPTIONS.DATE_FARTHEST:
        return sortedEvents.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case SORT_OPTIONS.NAME_ASC:
        return sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
      case SORT_OPTIONS.NAME_DESC:
        return sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sortedEvents;
    }
  };

  const pastEventsFiltered = creatorEvents.filter((e) => isPastEvent(e.date));
  const pastEvents = sortPastEvents(pastEventsFiltered);

  // Stats
  const totalEvents = creatorEvents.length;
  const cities = [...new Set(creatorEvents.map((e) => e.city))];
  const categories = [...new Set(creatorEvents.map((e) => e.category))];

  return (
    <main className="pt-20 pb-16">
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

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-[auto_1fr] gap-x-12">
          <div className="lg:col-span-3 lg:row-start-1 aspect-16/5 lg:aspect-16/3 shadow-shadow lg:shadow-none">
            {/* Banner Image */}
            {creator.bannerImage ? (
              <img
                src={creator.bannerImage}
                alt={`${creator.name} banner`}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <div className="w-full h-full bg-linear-to-br from-primary/30 via-accent/20 to-secondary/30" />
              </>
            )}
          </div>
          {/* Creator Header */}
          <div className="lg:row-start-2 mb-12 relative">
            <div className="absolute z-10 left-6 -top-16">
              {/* Avatar */}
              <Avatar className="w-32 h-32 border-4 rounded-4xl border-foreground">
                <AvatarImage src={creator.avatar} alt={creator.name} />
                <AvatarFallback className="font-gabirato font-bold text-4xl bg-secondary">
                  {creator.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="border-2 border-foreground pt-[82] bg-card p-6 shadow-shadow">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Info */}
                <div className="flex-1">
                  <h1 className="font-gabirato font-extrabold text-3xl tracking-tight mb-4">
                    {creator.name}
                  </h1>

                  {/* Social Media Links */}
                  {creator.socialMedia && (
                    <div className="flex flex-wrap gap-3 mb-6">
                      {creator.socialMedia.instagram && (
                        <a
                          href={creator.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground font-mono text-sm hover:bg-foreground hover:text-background transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                          Instagram
                        </a>
                      )}
                      {creator.socialMedia.twitter && (
                        <a
                          href={creator.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground font-mono text-sm hover:bg-foreground hover:text-background transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                          Twitter
                        </a>
                      )}
                      {creator.socialMedia.website && (
                        <a
                          href={creator.socialMedia.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-foreground font-mono text-sm hover:bg-foreground hover:text-background transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          Website
                        </a>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  {/* <div className="flex flex-wrap gap-4">
                    <div className="p-4 bg-muted border-2 border-foreground/20">
                      <p className="font-gabirato font-extrabold text-2xl">
                        {totalEvents}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground uppercase">
                        Total Event
                      </p>
                    </div>
                    <div className="p-4 bg-muted border-2 border-foreground/20">
                      <p className="font-gabirato font-extrabold text-2xl">
                        {cities.length}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground uppercase">
                        Kota
                      </p>
                    </div>
                    <div className="p-4 bg-muted border-2 border-foreground/20">
                      <p className="font-gabirato font-extrabold text-2xl">
                        {categories.length}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground uppercase">
                        Kategori
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Events by Creator */}
          <div className="lg:col-span-2 lg:row-start-2 pt-4">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-gabirato font-bold text-2xl">
                Event oleh {creator.name}
              </h2>
              <div className="flex-1 h-0.5 bg-foreground/20" />
            </div>
            <TabsBrutalism defaultValue="event_aktif" className="w-full">
              <TabsBrutalismList className="h-auto p-0 bg-transparent border-2 border-foreground">
                <TabsBrutalismTrigger
                  value="event_aktif"
                  className="font-mono uppercase text-sm py-3 px-4 rounded-none data-[state=active]:bg-foreground data-[state=active]:text-background border-r border-foreground"
                >
                  Event Aktif ({activeEvents.length})
                </TabsBrutalismTrigger>
                <TabsBrutalismTrigger
                  value="event_lalu"
                  className="font-mono uppercase text-sm py-3 px-4 rounded-none data-[state=active]:bg-foreground data-[state=active]:text-background"
                >
                  Event Lalu ({pastEvents.length})
                </TabsBrutalismTrigger>
              </TabsBrutalismList>

              {/* Tab Content: Event Aktif */}
              <TabsBrutalismContent value="event_aktif">
                {activeEvents.length > 0 ? (
                  <>
                    <p>
                      Tampil {activeEvents.length} Dari Total{" "}
                      {activeEvents.length} event
                    </p>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 mt-6 gap-6">
                      {activeEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-foreground/30 mt-6">
                    <p className="font-mono text-muted-foreground">
                      Tidak ada event aktif saat ini
                    </p>
                  </div>
                )}
              </TabsBrutalismContent>

              {/* Tab Content: Event Lalu */}
              <TabsBrutalismContent value="event_lalu" className="mt-4">
                {pastEvents.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <p className="font-mono">
                        Tampil {pastEvents.length} Dari Total{" "}
                        {pastEvents.length} event
                      </p>
                      <DropdownMenu modal={false}>
                        <div className="flex space-x-4 items-center">
                          <p className="font-mono">Urutkan:</p>
                          <DropdownMenuTrigger asChild>
                            <ButtonBrutalism
                              variant={"noShadowOutline"}
                              size={"sm"}
                            >
                              {SORT_LABELS[sortOption]}
                            </ButtonBrutalism>
                          </DropdownMenuTrigger>
                        </div>
                        <DropdownMenuContent
                          className="bg-background w-56 font-mono"
                          align="end"
                        >
                          <DropdownMenuItem
                            className={`bg-background cursor-pointer ${
                              sortOption === SORT_OPTIONS.DATE_NEAREST
                                ? "border-2 border-foreground font-bold"
                                : "border-2 border-transparent"
                            }`}
                            onClick={() =>
                              setSortOption(SORT_OPTIONS.DATE_NEAREST)
                            }
                          >
                            {SORT_LABELS[SORT_OPTIONS.DATE_NEAREST]}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={`bg-background cursor-pointer ${
                              sortOption === SORT_OPTIONS.DATE_FARTHEST
                                ? "border-2 border-foreground font-bold"
                                : "border-2 border-transparent"
                            }`}
                            onClick={() =>
                              setSortOption(SORT_OPTIONS.DATE_FARTHEST)
                            }
                          >
                            {SORT_LABELS[SORT_OPTIONS.DATE_FARTHEST]}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={`bg-background cursor-pointer ${
                              sortOption === SORT_OPTIONS.NAME_ASC
                                ? "border-2 border-foreground font-bold"
                                : "border-2 border-transparent"
                            }`}
                            onClick={() => setSortOption(SORT_OPTIONS.NAME_ASC)}
                          >
                            {SORT_LABELS[SORT_OPTIONS.NAME_ASC]}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className={`bg-background cursor-pointer ${
                              sortOption === SORT_OPTIONS.NAME_DESC
                                ? "border-2 border-foreground font-bold"
                                : "border-2 border-transparent"
                            }`}
                            onClick={() =>
                              setSortOption(SORT_OPTIONS.NAME_DESC)
                            }
                          >
                            {SORT_LABELS[SORT_OPTIONS.NAME_DESC]}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3  gap-6">
                      {pastEvents.map((event) => (
                        <div key={event.id} className="relative">
                          <EventCard event={event} />
                          {/* Badge "Selesai" */}
                          <div className="absolute top-4 right-4 bg-foreground text-background px-3 py-1 font-mono text-xs uppercase font-bold border-2 border-foreground shadow-shadow">
                            Selesai
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-foreground/30 mt-6">
                    <p className="font-mono text-muted-foreground">
                      Belum ada event yang telah selesai
                    </p>
                  </div>
                )}
              </TabsBrutalismContent>
            </TabsBrutalism>
          </div>
        </div>
      </div>
    </main>
  );
}
