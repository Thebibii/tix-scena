import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CardBrutalism,
  CardBrutalismContent,
} from "@/components/ui/brutalism/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, LogOut, Ticket } from "lucide-react";
import Link from "next/link";
export default function AccountSidebar() {
  return (
    <CardBrutalism className="col-span-12 md:col-span-3 h-fit md:sticky md:top-24 flex flex-col gap-6 px-6">
      <CardBrutalismContent className=" px-0">
        <Avatar className="w-16 h-16">
          <AvatarFallback>H</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-medium break-all mt-4">
          Habibie Bayezid Wildan
        </h1>
        <p className="text-muted-foreground text-lg break-all">
          habibiesanji@gmail.com
        </p>
      </CardBrutalismContent>
      <Separator />
      <CardBrutalismContent className="flex flex-col gap-2 px-0">
        <Button
          className="justify-start h-10 has-[>svg]:px-4"
          variant="ghost"
          asChild
        >
          <Link href="/tickets">
            <Ticket />
            Tiket Saya
            <ChevronRight className="ml-auto" />
          </Link>
        </Button>
        <Button
          className="justify-start h-10 has-[>svg]:px-4"
          variant="ghost"
          asChild
        >
          <Link href="/tickets">
            <Ticket />
            Profil
            <ChevronRight className="ml-auto" />
          </Link>
        </Button>
        <Button
          className="justify-start h-10 has-[>svg]:px-4"
          variant="ghost"
          asChild
        >
          <Link href="/tickets">
            <Ticket />
            Pengaturan
            <ChevronRight className="ml-auto" />
          </Link>
        </Button>
      </CardBrutalismContent>

      <Button
        variant="destructive"
        className="h-10 has-[>svg]:px-4 bg-destructive/15 hover:bg-destructive/25 cursor-pointer text-destructive"
      >
        <LogOut className="scale-x-[-1]" />
        Keluar
      </Button>
    </CardBrutalism>
  );
}
