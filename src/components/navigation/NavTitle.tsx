import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { removeBackground, loadImage } from "@/lib/imageUtils";
import { useToast } from "@/components/ui/use-toast";

export function NavTitle() {
  const [processedLogoUrl, setProcessedLogoUrl] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const processLogo = async () => {
      try {
        // Fetch the original image
        const response = await fetch("/lovable-uploads/22434899-cdca-46ff-8872-ba58de7d8908.png");
        const blob = await response.blob();
        
        // Load the image
        const img = await loadImage(blob);
        
        // Remove the background
        const processedBlob = await removeBackground(img);
        
        // Create URL for the processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        setProcessedLogoUrl(processedUrl);
      } catch (error) {
        console.error("Error processing logo:", error);
        toast({
          title: "Error",
          description: "Failed to process logo image. Using original image instead.",
          variant: "destructive",
        });
        setProcessedLogoUrl("/lovable-uploads/22434899-cdca-46ff-8872-ba58de7d8908.png");
      }
    };

    processLogo();

    // Cleanup function to revoke object URL
    return () => {
      if (processedLogoUrl) {
        URL.revokeObjectURL(processedLogoUrl);
      }
    };
  }, []);

  return (
    <div className="flex-1 text-center">
      <div className="inline-flex items-center gap-2">
        <img 
          src={processedLogoUrl || "/lovable-uploads/22434899-cdca-46ff-8872-ba58de7d8908.png"}
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