import { useState } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { NavLogo } from "@/components/navigation/NavLogo";
import { NavTitle } from "@/components/navigation/NavTitle";
import { NavActions } from "@/components/navigation/NavActions";

export function Navigation() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <SearchDialog open={showSearch} onOpenChange={setShowSearch} />
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center">
          <NavLogo />
          <NavTitle />
          <NavActions onSearchClick={() => setShowSearch(true)} />
        </div>
      </nav>
    </>
  );
}