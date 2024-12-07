import { useState } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { NavLogo } from "@/components/navigation/NavLogo";
import { NavLinks } from "@/components/navigation/NavLinks";
import { NavActions } from "@/components/navigation/NavActions";

export function Navigation() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <SearchDialog open={showSearch} onOpenChange={setShowSearch} />
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center gap-6">
          <NavLogo />
          <NavLinks />
          <NavActions onSearchClick={() => setShowSearch(true)} />
        </div>
      </nav>
    </>
  );
}