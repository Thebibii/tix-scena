"use client";

import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { ButtonBrutalism } from "../ui/brutalism/button";

interface Concert {
  id: string;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  genre: string;
  description: string;
  price: {
    regular: number;
    vip: number;
    festival?: number;
  };
}

interface ConcertDetailClientProps {
  concert: Concert;
}

export function ConcertDetailClient({ concert }: ConcertDetailClientProps) {
  const [selectedTicket, setSelectedTicket] = useState<
    "regular" | "vip" | "festival"
  >("regular");
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const ticketTypes = [
    { key: "regular" as const, label: "Regular", price: concert.price.regular },
    { key: "vip" as const, label: "VIP", price: concert.price.vip },
    ...(concert.price.festival
      ? [
          {
            key: "festival" as const,
            label: "Festival Pass",
            price: concert.price.festival,
          },
        ]
      : []),
  ];

  const handleAddToCart = () => {
    const selectedPrice =
      ticketTypes.find((t) => t.key === selectedTicket)?.price ||
      concert.price.regular;
  };

  return (
    <div className="border-2 border-foreground p-6 bg-card shadow-[4px_4px_0px_hsl(var(--foreground))]">
      <h3 className="font-syne font-bold text-xl mb-4">Pilih Tiket</h3>

      {/* Ticket Selection */}
      <div className="space-y-3 mb-6">
        {ticketTypes.map((ticket) => (
          <button
            key={ticket.key}
            onClick={() => setSelectedTicket(ticket.key)}
            className={`w-full p-4 border-2 text-left transition-all ${
              selectedTicket === ticket.key
                ? "border-foreground bg-secondary"
                : "border-foreground/30 hover:border-foreground"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 border-2 border-foreground flex items-center justify-center ${
                    selectedTicket === ticket.key ? "bg-foreground" : ""
                  }`}
                >
                  {selectedTicket === ticket.key && (
                    <Check className="w-3 h-3 text-background" />
                  )}
                </div>
                <span className="font-mono uppercase">{ticket.label}</span>
              </div>
              <span className="font-syne font-bold">
                {formatPrice(ticket.price)}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-dashed border-foreground/30">
        <span className="font-mono text-sm uppercase">Jumlah</span>
        <div className="flex items-center gap-3">
          <ButtonBrutalism
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            variant="noShadowOutline"
            size="icon"
          >
            <Minus className="w-4 h-4" />
          </ButtonBrutalism>
          <span className="font-mono text-xl w-8 text-center">{quantity}</span>
          <ButtonBrutalism
            variant="noShadowOutline"
            size="icon"
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
          >
            <Plus className="w-4 h-4" />
          </ButtonBrutalism>
        </div>
      </div>

      {/* Total & Add to Cart */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-sm uppercase text-muted-foreground">
          Total
        </span>
        <span className="font-syne font-extrabold text-2xl">
          {formatPrice(
            (ticketTypes.find((t) => t.key === selectedTicket)?.price || 0) *
              quantity
          )}
        </span>
      </div>

      <ButtonBrutalism
        variant="default"
        size="lg"
        className="w-full"
        onClick={handleAddToCart}
      >
        Tambah ke Keranjang
      </ButtonBrutalism>
    </div>
  );
}
