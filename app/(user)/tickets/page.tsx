import { EventCard } from "@/components/public/event-card";
import { ButtonBrutalism } from "@/components/ui/brutalism/button";
import {
  CardBrutalism,
  CardBrutalismContent,
} from "@/components/ui/brutalism/card";
import { TabsBrutalismContent } from "@/components/ui/brutalism/tabs";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { events } from "@/data/concerts";
import { isPastEvent } from "@/lib/utils";
import { Ticket } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const activeEvents = events
    .filter((e) => !isPastEvent(e.date))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastEventsFiltered = events.filter((e) => isPastEvent(e.date));
  const pastEvents = pastEventsFiltered.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <CardBrutalism className="col-span-12 md:col-span-9 flex flex-col shadow-transparent md:shadow-shadow border-0 md:border-2 gap-6">
      <CardBrutalismContent className="px-0 md:px-6">
        <h1 className="text-2xl font-medium break-all ">Tiket Saya</h1>
        <p className="text-muted-foreground text-base">
          Semua tiket event yang kamu miliki, baik yang akan datang maupun yang
          sudah lewat.
        </p>
      </CardBrutalismContent>
      <CardBrutalismContent className="px-0 md:px-6">
        <Tabs defaultValue="event_aktif">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="event_aktif"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-primary data-[state=active]:border-b-[0.1rem] rounded-none cursor-pointer border-b-ring/50"
            >
              Event Aktif ({activeEvents.length})
            </TabsTrigger>
            <TabsTrigger
              value="event_lalu"
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-[0.1rem] data-[state=active]:shadow-none data-[state=active]:border-b-primary rounded-none cursor-pointer border-b-ring/50"
            >
              Event Lalu ({pastEvents.length})
            </TabsTrigger>
          </TabsList>
          <TabsBrutalismContent value="event_aktif">
            {activeEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 mt-6 gap-6">
                {activeEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <Empty className="border border-dashed rounded-none">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Ticket />
                  </EmptyMedia>
                  <EmptyTitle>Tiket Kamu Masih Kosong</EmptyTitle>
                  <EmptyDescription>
                    Kamu belum memiliki tiket. Tiket yang kamu pesan akan muncul
                    di sini.
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <ButtonBrutalism
                    variant="noShadowOutline"
                    className="border h-8"
                    size="sm"
                    asChild
                  >
                    <Link href="/explore">Explore Event</Link>
                  </ButtonBrutalism>
                </EmptyContent>
              </Empty>
            )}
          </TabsBrutalismContent>

          {/* Tab Content: Event Lalu */}
          <TabsBrutalismContent value="event_lalu" className="mt-4">
            {pastEvents.length > 0 ? (
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
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-foreground/30 mt-6">
                <p className="font-mono text-muted-foreground">
                  Belum ada event yang telah selesai
                </p>
              </div>
            )}
          </TabsBrutalismContent>
        </Tabs>
      </CardBrutalismContent>
    </CardBrutalism>
  );
}
