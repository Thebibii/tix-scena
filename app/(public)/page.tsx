import { ConcertList } from "@/components/public/concert-list";
import { Hero } from "@/components/public/hero";
import { Marquee } from "@/components/ui/marquee";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="w-full ">
        <Marquee
          className="bg-primary text-primary-foreground py-2 [--duration:20s]"
          pauseOnHover
        >
          <p className="font-mono text-sm uppercase tracking-widest">
            BELI TIKET SEKARANG ★ BELI TIKET SEKARANG{" "}
          </p>
        </Marquee>
      </div>
      <ConcertList />
    </main>
  );
}
