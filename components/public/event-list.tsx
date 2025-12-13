"use client";
import { useState } from "react";
import { events, categories } from "@/data/concerts";
import { ButtonBrutalism } from "../ui/brutalism/button";
import { EventCard } from "./event-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export const EventList = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <section id="events" className="py-16 border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-block px-3 py-1 bg-accent-mint text-accent-foreground border-2 border-foreground font-mono text-xs uppercase -rotate-1 mb-4">
              Upcoming
            </span>
            <h2 className="font-gabirato font-extrabold text-4xl md:text-5xl tracking-tight">
              Event <span className="text-stroke">Terdekat</span>
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <ButtonBrutalism
                key={category.key}
                variant={
                  activeCategory === category.key ? "default" : "outline"
                }
                size="sm"
                onClick={() => setActiveCategory(category.key)}
                className={activeCategory === category.key ? "" : "shadow-none"}
              >
                {category.label}
              </ButtonBrutalism>
            ))}
          </div>
        </div>

        {/* Event Grid */}
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent className="">
            {filteredEvents.map((event, index) => (
              <CarouselItem
                key={event.id}
                className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
              >
                <div
                  className="animate-fade-in px-4 sm:px-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <EventCard event={event} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 sm:-left-4 " />
          <CarouselNext className="right-0 sm:-right-4 " />
        </Carousel>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-foreground/30">
            <p className="font-mono text-muted-foreground">
              Tidak ada event untuk kategori ini.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
