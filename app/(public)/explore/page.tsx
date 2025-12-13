"use client";
import { useState, useMemo } from "react";

import { X, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, events } from "@/data/concerts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/brutalism/select";
import { EventCard } from "@/components/public/event-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/brutalism/dropdown-menu";
import { ButtonBrutalism } from "@/components/ui/brutalism/button";
import { Badge } from "@/components/ui/brutalism/badge";

const locations = [...new Set(events.map((e) => e.city))];

const timeFilters = [
  { key: "this-week", label: "Minggu Ini" },
  { key: "next-week", label: "Minggu Depan" },
  { key: "this-month", label: "Bulan Ini" },
  { key: "next-month", label: "Bulan Depan" },
];

const priceFilters = [
  { key: "paid", label: "Berbayar" },
  { key: "free", label: "Gratis" },
];

const sortOptions = [
  { key: "date-asc", label: "Waktu Terdekat" },
  { key: "date-desc", label: "Waktu Terjauh" },
  { key: "name-asc", label: "Nama A-Z" },
  { key: "name-desc", label: "Nama Z-A" },
];

const Explore = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("date-asc");

  const filteredEvents = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const startOfNextWeek = new Date(endOfWeek);
    startOfNextWeek.setDate(endOfWeek.getDate() + 1);
    startOfNextWeek.setHours(0, 0, 0, 0);

    const endOfNextWeek = new Date(startOfNextWeek);
    endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
    endOfNextWeek.setHours(23, 59, 59, 999);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const endOfNextMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 2,
      0,
      23,
      59,
      59,
      999
    );

    let result = events.filter((event) => {
      // Location filter
      if (location && event.city !== location) return false;

      // Category filter
      if (category && event.category !== category) return false;

      // Time filter
      if (timeFilter) {
        const eventDate = new Date(event.date);

        switch (timeFilter) {
          case "this-week":
            if (eventDate < startOfWeek || eventDate > endOfWeek) return false;
            break;
          case "next-week":
            if (eventDate < startOfNextWeek || eventDate > endOfNextWeek)
              return false;
            break;
          case "this-month":
            if (eventDate < startOfMonth || eventDate > endOfMonth)
              return false;
            break;
          case "next-month":
            if (eventDate < startOfNextMonth || eventDate > endOfNextMonth)
              return false;
            break;
        }
      }

      // Price filter
      if (priceFilter) {
        const lowestPrice = Math.min(...Object.values(event.price));
        if (priceFilter === "free" && lowestPrice > 0) return false;
        if (priceFilter === "paid" && lowestPrice === 0) return false;
      }

      return true;
    });

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [location, category, timeFilter, priceFilter, sortBy]);

  const hasActiveFilters = location || category || timeFilter || priceFilter;

  const clearFilters = () => {
    setLocation(null);
    setCategory(null);
    setTimeFilter(null);
    setPriceFilter(null);
  };

  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onRemove: () => void }[] = [];

    if (location) {
      chips.push({
        key: "location",
        label: location,
        onRemove: () => setLocation(null),
      });
    }
    if (category) {
      const cat = categories.find((c) => c.key === category);
      chips.push({
        key: "category",
        label: cat?.label || category,
        onRemove: () => setCategory(null),
      });
    }
    if (timeFilter) {
      const tf = timeFilters.find((t) => t.key === timeFilter);
      chips.push({
        key: "time",
        label: tf?.label || timeFilter,
        onRemove: () => setTimeFilter(null),
      });
    }
    if (priceFilter) {
      const pf = priceFilters.find((p) => p.key === priceFilter);
      chips.push({
        key: "price",
        label: pf?.label || priceFilter,
        onRemove: () => setPriceFilter(null),
      });
    }

    return chips;
  }, [location, category, timeFilter, priceFilter]);

  const getCategoryLabel = () =>
    categories.find((c) => c.key === category)?.label || "Semua";
  const getTimeLabel = () =>
    timeFilters.find((t) => t.key === timeFilter)?.label || "Semua";
  const getPriceLabel = () =>
    priceFilters.find((p) => p.key === priceFilter)?.label || "Semua";
  const getSortLabel = () =>
    sortOptions.find((s) => s.key === sortBy)?.label || "Urutkan";

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-gabirato text-4xl md:text-5xl font-black uppercase tracking-tighter mb-2">
            Explore Event
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            Temukan event yang cocok untukmu
          </p>
        </div>

        {/* Filter Bar - Top Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {/* Filter Toggle Button */}
            <ButtonBrutalism variant="noShadowOutline" size="sm">
              <Filter className="w-4 h-4" />
              <span className="font-mono text-sm">Filter</span>
            </ButtonBrutalism>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="font-mono text-sm text-primary hover:underline"
              >
                Reset
              </button>
            )}

            {/* Active Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {activeFilterChips.map((chip) => (
                <Badge
                  key={chip.key}
                  onClick={chip.onRemove}
                  className="flex items-center gap-1.5 cursor-pointer bg-primary text-primary-foreground rounded-full font-mono text-sm"
                >
                  {chip.label}
                  <X className="w-3.5 h-3.5" />
                </Badge>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonBrutalism variant={"noShadowOutline"} size={"sm"}>
                {getSortLabel()}
                <ChevronDown className="w-4 h-4" />
              </ButtonBrutalism>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-card border border-border"
            >
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.key}
                  onClick={() => setSortBy(option.key)}
                  className={`font-mono text-sm cursor-pointer ${
                    sortBy === option.key
                      ? "border-2 border-foreground font-bold"
                      : ""
                  }`}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filter Dropdowns Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-muted/30 rounded-lg">
          {/* Location Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-muted-foreground uppercase">
                Lokasi
              </span>
              {location && (
                <button
                  onClick={() => setLocation(null)}
                  className="font-mono text-sm hover:underline text-destructive cursor-pointer"
                >
                  Hapus
                </button>
              )}
            </div>
            <Select
              value={location || ""}
              onValueChange={(val) => setLocation(val || null)}
            >
              <SelectTrigger className="bg-card border-border font-mono text-sm h-10">
                <SelectValue placeholder="Semua" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {locations.map((loc) => (
                  <SelectItem
                    key={loc}
                    value={loc}
                    className="font-mono text-sm"
                  >
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-muted-foreground uppercase">
                Kategori
              </span>
              {category && (
                <button
                  onClick={() => setCategory(null)}
                  className="font-mono text-sm hover:underline text-destructive cursor-pointer"
                >
                  Hapus
                </button>
              )}
            </div>
            <Select
              value={category || ""}
              onValueChange={(val) => setCategory(val || null)}
            >
              <SelectTrigger className="bg-card border-border font-mono text-sm h-10">
                <SelectValue placeholder="Semua" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {categories
                  .filter((c) => c.key !== "all")
                  .map((cat) => (
                    <SelectItem
                      key={cat.key}
                      value={cat.key}
                      className="font-mono text-sm"
                    >
                      {cat.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-muted-foreground uppercase">
                Waktu
              </span>
              {timeFilter && (
                <button
                  onClick={() => setTimeFilter(null)}
                  className="font-mono text-sm hover:underline text-destructive cursor-pointer"
                >
                  Hapus
                </button>
              )}
            </div>
            <Select
              value={timeFilter || ""}
              onValueChange={(val) => setTimeFilter(val || null)}
            >
              <SelectTrigger className="bg-card border-border font-mono text-sm h-10">
                <SelectValue placeholder="Semua" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {timeFilters.map((tf) => (
                  <SelectItem
                    key={tf.key}
                    value={tf.key}
                    className="font-mono text-sm"
                  >
                    {tf.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Filter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-muted-foreground uppercase">
                Harga
              </span>
              {priceFilter && (
                <button
                  onClick={() => setPriceFilter(null)}
                  className="font-mono text-sm hover:underline text-destructive cursor-pointer"
                >
                  Hapus
                </button>
              )}
            </div>
            <Select
              value={priceFilter || ""}
              onValueChange={(val) => setPriceFilter(val || null)}
            >
              <SelectTrigger className="bg-card border-border font-mono text-sm h-10">
                <SelectValue placeholder="Semua" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border">
                {priceFilters.map((pf) => (
                  <SelectItem
                    key={pf.key}
                    value={pf.key}
                    className="font-mono text-sm"
                  >
                    {pf.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <p className="font-mono text-sm text-muted-foreground mb-6">
          Menampilkan {filteredEvents.length} event
        </p>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <p className="font-mono text-muted-foreground mb-4">
              Tidak ada event yang sesuai dengan filter
            </p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="font-mono"
            >
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Explore;
