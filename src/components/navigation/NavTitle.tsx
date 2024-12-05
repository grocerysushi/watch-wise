import { cn } from "@/lib/utils";
import Image from "@/components/ui/image";

export function NavTitle() {
  return (
    <div className="flex-1 text-center">
      <div className="inline-flex items-center gap-2">
        <Image 
          src="/lovable-uploads/a89e392b-ac7d-4556-8f41-b064ab664e62.png"
          alt="Cueious Logo"
          className="h-16 w-16"
        />
      </div>
    </div>
  );
}