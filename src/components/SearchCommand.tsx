import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useState } from "react";

let showSearchCommand: (() => void) | null = null;

export function openSearch() {
  if (showSearchCommand) {
    showSearchCommand();
  }
}

export function SearchCommand() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Store the setOpen function in our module-level variable
  showSearchCommand = () => setOpen(true);

  const runCommand = (command: () => unknown) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem
            onSelect={() => {
              runCommand(() => {
                navigate("/");
                toast("Navigated to home");
              });
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Home</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              runCommand(() => {
                navigate("/upcoming");
                toast("Navigated to upcoming");
              });
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Upcoming</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}