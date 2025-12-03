"use client";
import { concerts, genres } from "@/data/concerts";
import { ConcertCard } from "./concert-card";
import { useState } from "react";
import { ButtonBrutalism } from "../ui/brutalism/button";

export const ConcertList = () => {
  const [activeGenre, setActiveGenre] = useState("All");

  const filteredConcerts =
    activeGenre === "All"
      ? concerts
      : concerts.filter((c) => c.genre === activeGenre);

  return (
    <section id="concerts" className="py-16 border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-block px-3 py-1 bg-accent-mint text-accent-foreground border-2 border-foreground font-mono text-xs uppercase rotate-[-1deg] mb-4">
              Upcoming
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight">
              SEMUA <span className="text-stroke">KONSER</span>
            </h2>
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <ButtonBrutalism
                key={genre}
                variant={activeGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveGenre(genre)}
                className={activeGenre === genre ? "" : "shadow-none"}
              >
                {genre}
              </ButtonBrutalism>
            ))}
          </div>
        </div>

        {/* Concert Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConcerts.map((concert, index) => (
            <div
              key={concert.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ConcertCard concert={concert} />
            </div>
          ))}
        </div>

        {filteredConcerts.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-foreground/30">
            <p className="font-mono text-muted-foreground">
              Tidak ada konser untuk genre ini.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
