import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, FileText, Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/church_community_gathering.png";
import communityImage from "@assets/generated_images/two_people_sharing_biblical_learnings_with_bible.png";

type AnnouncementType = "video" | "article" | "image";

interface Announcement {
  id: string;
  type: AnnouncementType;
  title: string;
  description: string;
  videoUrl?: string;
  articleText?: string;
  imageUrl?: string;
  date: string;
}

const announcements: Announcement[] = [
  {
    id: "1",
    type: "video",
    title: "Sunday Service Highlights",
    description: "Watch our latest Sunday service message",
    videoUrl: "https://www.youtube.com/embed/2CiMBKAeQzY",
    date: "Dec 29, 2024",
  },
  {
    id: "2",
    type: "article",
    title: "New Ministry Launch",
    description: "We're excited to announce the launch of our new community outreach program",
    articleText: "Hope Church Philippines is thrilled to announce the launch of our new community outreach ministry. This initiative aims to serve our neighbors in San Juan City with compassion and care. Through various programs and volunteer opportunities, we invite you to join us in making a positive impact in our community. Whether you're interested in feeding programs, educational support, or spiritual mentoring, there's a place for you. Contact us to learn more and get involved today.",
    date: "Dec 28, 2024",
  },
  {
    id: "3",
    type: "image",
    title: "Community Gathering",
    description: "Our community coming together in fellowship",
    imageUrl: heroImage,
    date: "Dec 27, 2024",
  },
  {
    id: "4",
    type: "article",
    title: "Christmas Service Recap",
    description: "Thank you for joining our blessed Christmas celebration",
    articleText: "Our Christmas service was a wonderful time of worship, fellowship, and celebration. We were blessed to have many visitors and community members join us. The entire Hope Church family came together to celebrate the birth of Jesus Christ. Special thanks to our worship team, volunteers, and everyone who contributed to making this service meaningful. Mark your calendars for our upcoming New Year service!",
    date: "Dec 26, 2024",
  },
  {
    id: "5",
    type: "image",
    title: "Discipleship in Action",
    description: "Members sharing biblical learnings and faith journey",
    imageUrl: communityImage,
    date: "Dec 25, 2024",
  },
];

export default function AnnouncementSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const current = announcements[currentIndex];

  // Fullscreen Theater Mode
  if (isFullscreen) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        data-testid="theater-mode-fullscreen"
      >
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-6 right-6 z-60 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          data-testid="button-close-fullscreen"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="w-full h-full flex items-center justify-center p-8">
          {current.type === "video" && (
            <div className="w-full h-full max-w-7xl max-h-screen">
              <iframe
                width="100%"
                height="100%"
                src={current.videoUrl}
                title={current.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full rounded-lg"
                data-testid="video-fullscreen"
              />
            </div>
          )}

          {current.type === "article" && (
            <div className="max-w-3xl w-full h-full flex flex-col items-center justify-center">
              <div className="bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg p-16 flex flex-col items-center justify-center h-full">
                <FileText className="w-20 h-20 text-secondary mb-8" />
                <h3 className="font-semibold text-4xl text-white mb-8 text-center">
                  {current.title}
                </h3>
                <p className="text-gray-200 text-lg text-center leading-relaxed">
                  {current.articleText}
                </p>
              </div>
            </div>
          )}

          {current.type === "image" && (
            <div className="w-full h-full max-w-7xl">
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full h-full object-contain rounded-lg"
                data-testid="image-fullscreen"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // Theater-style Normal View
  return (
    <section id="announcement" className="relative py-20 md:py-28 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-60 h-60 bg-secondary/10 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-primary/10 rounded-full filter blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Premium Title Section */}
        <div className="text-center mb-20">
          <div className="inline-flex flex-col items-center gap-4">
            {/* Decorative Top Line */}
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-secondary to-transparent" />
            
            {/* Main Title */}
            <h2
              className="font-serif text-5xl md:text-6xl font-bold text-foreground tracking-tight"
              data-testid="text-announcement-title"
            >
              Announcements
            </h2>
            
            {/* Decorative Bottom Line */}
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-secondary to-transparent" />
          </div>
          
          {/* Subtitle */}
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Discover our latest updates, stories, and community moments
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Display with Side Navigation */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Previous Button */}
            <Button
              size="icon"
              variant="default"
              onClick={goToPrevious}
              data-testid="button-previous-announcement"
              className="h-96 w-16 rounded-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground flex-shrink-0 hidden md:flex"
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            {/* Main Display Card */}
            <div className="relative group flex-1">
              {/* Animated Gradient Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary/30 via-primary/30 to-secondary/30 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
              
              {/* Content Card */}
              <div className="relative bg-card rounded-xl overflow-hidden border border-secondary/20 shadow-2xl">
                {/* Video */}
                {current.type === "video" && (
                  <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={current.videoUrl}
                      title={current.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full"
                      data-testid="video-announcement"
                    />
                  </div>
                )}

                {/* Article */}
                {current.type === "article" && (
                  <div className="aspect-video bg-gradient-to-br from-secondary/5 via-background to-primary/5 flex items-center justify-center p-12">
                    <div className="flex flex-col items-center justify-center h-full w-full text-center">
                      <div className="mb-6 p-4 rounded-full bg-secondary/10">
                        <FileText className="w-12 h-12 text-secondary" />
                      </div>
                      <h3 className="font-semibold text-3xl text-foreground mb-6">
                        {current.title}
                      </h3>
                      <p className="text-muted-foreground max-w-2xl leading-relaxed text-base">
                        {current.articleText}
                      </p>
                    </div>
                  </div>
                )}

                {/* Image */}
                {current.type === "image" && (
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={current.imageUrl}
                      alt={current.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      data-testid="image-announcement"
                    />
                  </div>
                )}

                {/* Content Badge */}
                <div className="absolute top-5 right-5 bg-background/90 backdrop-blur-md border border-secondary/30 px-4 py-2 rounded-full flex items-center gap-2">
                  {current.type === "video" && (
                    <>
                      <Play className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-semibold text-foreground">VIDEO</span>
                    </>
                  )}
                  {current.type === "article" && (
                    <>
                      <FileText className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-semibold text-foreground">ARTICLE</span>
                    </>
                  )}
                  {current.type === "image" && (
                    <>
                      <Image className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-semibold text-foreground">IMAGE</span>
                    </>
                  )}
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute bottom-5 left-5 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 hover:shadow-lg"
                  data-testid="button-expand-fullscreen"
                >
                  FULLSCREEN
                </button>
              </div>
            </div>

            {/* Next Button */}
            <Button
              size="icon"
              variant="default"
              onClick={goToNext}
              data-testid="button-next-announcement"
              className="h-96 w-16 rounded-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground flex-shrink-0 hidden md:flex"
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-center gap-4 mb-8 md:hidden">
            <Button
              size="icon"
              variant="default"
              onClick={goToPrevious}
              data-testid="button-previous-announcement-mobile"
              className="h-11 w-11 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex gap-2 justify-center flex-1">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-secondary w-8"
                      : "bg-secondary/20 w-2 hover:bg-secondary/40"
                  }`}
                  data-testid={`button-slide-${index}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              size="icon"
              variant="default"
              onClick={goToNext}
              data-testid="button-next-announcement-mobile"
              className="h-11 w-11 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Info Section */}
          <div className="mb-8 p-8 bg-secondary/5 rounded-xl border border-secondary/20">
            <h3 className="text-2xl font-bold text-foreground mb-2">{current.title}</h3>
            <p className="text-muted-foreground mb-3">{current.description}</p>
            <p className="text-xs text-muted-foreground/70 font-medium tracking-wide">{current.date}</p>
          </div>

          {/* Desktop Slide Indicators */}
          <div className="flex gap-2 justify-center flex-1 mb-6 hidden md:flex">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-secondary w-8"
                    : "bg-secondary/20 w-2 hover:bg-secondary/40"
                }`}
                data-testid={`button-slide-${index}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-center text-sm text-muted-foreground/70 font-medium">
            {currentIndex + 1} of {announcements.length}
          </div>
        </div>
      </div>
    </section>
  );
}
