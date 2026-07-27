import { Button } from "@/components/ui/button";
import { ChevronDown, Play } from "lucide-react";
import heroImage from "@assets/generated_images/modern_church_interior_hero.png";

interface HeroSectionProps {
  onWatchOnline?: () => void;
}

const WATCH_ONLINE_VIDEO_URL = "https://www.youtube.com/embed/QIjIvvHGJ9E?start=15&autoplay=1";

export default function HeroSection({ onWatchOnline }: HeroSectionProps) {
  const scrollToAbout = () => {
    const element = document.querySelector("#about");

    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          data-testid="text-hero-title"
        >
          Faith Church
        </h1>
        <p 
          className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
          data-testid="text-hero-subtitle"
        >
          Vision: To fulfill the great commission<br />
          <span className="text-base sm:text-lg">Love Neighbours • Make Disciples • Plant Churches</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-white px-8"
          onClick={scrollToAbout}
        >
          Join Us This Sunday
        </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="backdrop-blur-md bg-white/10 border-white/30 text-white px-8"
            data-testid="button-watch-online"
            onClick={onWatchOnline}
          >
            <Play className="w-4 h-4 mr-2" />
            Watch Online
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 animate-bounce"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
