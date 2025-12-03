"use client";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-foreground">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center py-3">
          {/* Logo */}
          <Link
            href="/"
            className="font-syne font-extrabold text-2xl tracking-tighter"
          >
            TIX
            <span className="text-stroke">SKENA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 justify-self-center">
            <Link
              href="/"
              className="font-mono text-sm uppercase tracking-wider hover:line-through transition-all"
            >
              Konser
            </Link>
            <Link
              href="/about"
              className="font-mono text-sm uppercase tracking-wider hover:line-through transition-all"
            >
              Tentang
            </Link>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4 justify-self-end">
            <Avatar className="rounded-lg hidden md:block">
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-foreground py-4">
            <Link
              href="/"
              className="block font-mono text-sm uppercase tracking-wider py-2 hover:line-through"
              onClick={() => setIsMenuOpen(false)}
            >
              Konser
            </Link>
            <Link
              href="/about"
              className="block font-mono text-sm uppercase tracking-wider py-2 hover:line-through"
              onClick={() => setIsMenuOpen(false)}
            >
              Tentang
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
