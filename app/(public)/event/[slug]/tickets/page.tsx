"use client";
import { useState } from "react";

import {
  ArrowLeft,
  Plus,
  Minus,
  Check,
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";
import { useParams } from "next/navigation";
import { events } from "@/data/concerts";
import { Navbar } from "@/components/public/navbar";
import Link from "next/link";
import { ButtonBrutalism } from "@/components/ui/brutalism/button";

export default function Page() {
  const { slug } = useParams();
  const event = events.find((e) => e.id === slug);

  const [selectedTicket, setSelectedTicket] = useState<
    "regular" | "vip" | "festival"
  >("regular");
  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="font-gabirato font-bold text-4xl mb-4">
            Event tidak ditemukan
          </h1>
          <Link href="/">
            <ButtonBrutalism variant="outline">
              Kembali ke Beranda
            </ButtonBrutalism>
          </Link>
        </div>
      </div>
    );
  }

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

  const ticketTypes = [
    {
      key: "regular" as const,
      label: "Regular",
      price: event.price.regular,
      description: "Akses standar ke area event",
    },
    {
      key: "vip" as const,
      label: "VIP",
      price: event.price.vip,
      description: "Akses VIP dengan fasilitas premium",
    },
    ...(event.price.festival
      ? [
          {
            key: "festival" as const,
            label: "Festival Pass",
            price: event.price.festival,
            description: "Akses penuh ke semua area dan hari",
          },
        ]
      : []),
  ];

  const selectedPrice =
    ticketTypes.find((t) => t.key === selectedTicket)?.price || 0;

  return (
    <main className="pt-20">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link
          href={`/event/${slug}`}
          className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider hover:line-through"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Detail Event
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-gabirato font-extrabold text-3xl md:text-4xl mb-8">
            Pilih Tiket
          </h1>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Left - Ticket Selection */}
            <div className="md:col-span-3 space-y-6">
              {/* Event Summary */}
              <div className="border-2 border-foreground p-4 bg-muted/50">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-muted border-2 border-foreground shrink-0 flex items-center justify-center">
                    <span className="font-gabirato font-extrabold text-2xl text-foreground/20">
                      {event.artist.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-gabirato font-bold text-lg">
                      {event.title}
                    </h2>
                    <p className="font-mono text-sm text-muted-foreground">
                      {event.artist}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="font-mono text-xs flex items-center gap-1">
                        <CalendarDays className="w-3 h-3" />
                        {formatDate(event.date).split(",")[0]}
                      </span>
                      <span className="font-mono text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time} WIB
                      </span>
                      <span className="font-mono text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.city}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Types */}
              <div className="space-y-3">
                <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
                  Pilih Jenis Tiket
                </h3>
                {ticketTypes.map((ticket) => (
                  <button
                    key={ticket.key}
                    onClick={() => setSelectedTicket(ticket.key)}
                    className={`w-full p-5 border-2 text-left transition-all ${
                      selectedTicket === ticket.key
                        ? "border-foreground bg-accent-rose shadow-[4px_4px_0px_hsl(var(--foreground))]"
                        : "border-foreground/30 hover:border-foreground"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-6 h-6 border-2 border-foreground flex items-center justify-center shrink-0 mt-0.5 ${
                            selectedTicket === ticket.key ? "bg-foreground" : ""
                          }`}
                        >
                          {selectedTicket === ticket.key && (
                            <Check className="w-4 h-4 text-background" />
                          )}
                        </div>
                        <div>
                          <span className="font-gabirato font-bold text-lg block">
                            {ticket.label}
                          </span>
                          <span className="font-mono text-sm text-muted-foreground">
                            {ticket.description}
                          </span>
                        </div>
                      </div>
                      <span className="font-gabirato font-bold text-lg">
                        {formatPrice(ticket.price)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quantity */}
              <div className="border-2 border-foreground p-5 bg-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-1">
                      Jumlah Tiket
                    </h3>
                    <p className="font-mono text-xs text-muted-foreground">
                      Maksimal 10 tiket per transaksi
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 border-2 border-foreground flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="font-gabirato font-bold text-2xl w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-12 h-12 border-2 border-foreground flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="md:col-span-2">
              <div className="border-2 border-foreground p-6 bg-card shadow-[4px_4px_0px_hsl(var(--foreground))] sticky top-24">
                <h3 className="font-gabirato font-bold text-lg mb-4 pb-3 border-b-2 border-dashed border-foreground/30">
                  Ringkasan Pesanan
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between font-mono text-sm">
                    <span>
                      {ticketTypes.find((t) => t.key === selectedTicket)?.label}
                    </span>
                    <span>{formatPrice(selectedPrice)}</span>
                  </div>
                  <div className="flex justify-between font-mono text-sm">
                    <span>Jumlah</span>
                    <span>x{quantity}</span>
                  </div>
                  <div className="border-t-2 border-dashed border-foreground/30 pt-3">
                    <div className="flex justify-between">
                      <span className="font-mono text-sm uppercase">Total</span>
                      <span className="font-gabirato font-extrabold text-2xl">
                        {formatPrice(selectedPrice * quantity)}
                      </span>
                    </div>
                  </div>
                </div>

                <ButtonBrutalism variant="default" size="lg" className="w-full">
                  Tambah ke Keranjang
                </ButtonBrutalism>

                <p className="font-mono text-xs text-center text-muted-foreground mt-4">
                  Dengan membeli tiket, Anda menyetujui syarat & ketentuan yang
                  berlaku
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
