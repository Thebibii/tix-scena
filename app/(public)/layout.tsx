import { Footer } from "@/components/public/footer";
import { Navbar } from "@/components/public/navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-zinc-50 min-h-screen dark:bg-black">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
