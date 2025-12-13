import { Footer } from "@/components/public/footer";
import { Navbar } from "@/components/public/navbar";
import AccountSidebar from "@/components/user/account-sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" min-h-screen flex flex-col gap-4 dark:bg-black">
      <Navbar />
      <div className="flex-1 pt-24 pb-16 font-gabirato">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-4">
            <AccountSidebar />
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
