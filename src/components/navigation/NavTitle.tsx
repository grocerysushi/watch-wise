import { cn } from "@/lib/utils";

export function NavTitle() {
  return (
    <div className="flex-1 text-center">
      <div className="inline-flex items-center gap-2">
        <img 
          src="/lovable-uploads/2c0af9c1-9bcf-46a0-b293-9a90ef54246e.png" 
          alt="Cueious Logo" 
          className={cn(
            "h-8 w-8",
            "transition-transform duration-300 hover:scale-110"
          )}
        />
        <span className="text-xl font-bold">Cueious</span>
      </div>
    </div>
  );
}