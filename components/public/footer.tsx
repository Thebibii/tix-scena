import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 border-t-2 border-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <Link
              href="/"
              className="font-gabirato font-extrabold text-2xl tracking-tighter inline-block mb-4"
            >
              TIX<span className="opacity-50">SKENA</span>
            </Link>
            <p className="font-mono text-sm opacity-70 leading-relaxed">
              Platform tiket konser untuk anak seni dan pecinta musik live di
              Indonesia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider mb-4 opacity-50">
              Navigasi
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="font-mono text-sm hover:line-through transition-all"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-mono text-sm hover:line-through transition-all"
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="font-mono text-sm hover:line-through transition-all"
                >
                  Keranjang
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider mb-4 opacity-50">
              Kontak
            </h4>
            <ul className="space-y-2 font-mono text-sm">
              <li className="opacity-70">halo@tixskena.id</li>
              <li className="opacity-70">+62 812 3456 7890</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs opacity-50">
            © 2024 TIXSKENA. Semua hak dilindungi.
          </p>
          {/* <div className="flex gap-4">
            <span className="inline-block px-3 py-1 border border-background/30 font-mono text-xs uppercase">
              Made with Thebibie
            </span>
          </div> */}
        </div>
      </div>
    </footer>
  );
};
