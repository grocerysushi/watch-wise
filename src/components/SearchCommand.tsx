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

let commandDialog: HTMLDialogElement | null = null;

export function openSearch() {
  if (commandDialog) {
    commandDialog.showModal();
  }
}

export function SearchCommand() {
  const navigate = useNavigate();

  const runCommand = (command: () => unknown) => {
    commandDialog?.close();
    command();
  };

  return (
    <CommandDialog ref={(ref) => (commandDialog = ref)}>
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