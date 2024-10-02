import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BriefcaseIcon, MenuIcon } from "lucide-react";
import ConnectButton from "./ConnectButton";

export default function NavBar() {
  return (
    <header className="flex fixed top-0 border-b h-16 w-full items-center justify-between bg-gray-800 px-4 sm:px-6 md:px-8">
      <Link
        href="#"
        className="flex items-center  text-white gap-2"
        >
        <BriefcaseIcon className="h-6 w-6" />
        <span className="text-lg font-bold ">Proposal Dapp</span>
      </Link>

      <nav className="hidden items-center gap-4 md:flex">
        <Link
          href="#"
          className="text-sm font-medium text-white hover:text-foreground">
          Home
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-white hover:text-foreground"
          >
          Proposals
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-white hover:text-foreground"
          >
          Clients
        </Link>
        <Link
          href="#"
          className="text-sm font-medium text-white hover:text-foreground"
          >
          Settings
        </Link>
      </nav>

      <w3m-button />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[200px]">
          <div className="flex flex-col gap-4 p-4">
            <Link
              href="#"
              className="text-sm font-medium text-white hover:text-foreground"
              >
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-white hover:text-foreground"
              >
              Proposals
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-white hover:text-foreground"
              >
              Clients
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-white hover:text-foreground"
              >
              Settings
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
