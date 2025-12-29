import { useState, useEffect } from "react";
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
  const [isTheaterMode, setIsTheaterMode] = useState(false);

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

  // Theater Mode View
  if (isTheaterMode) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
        data-testid="theater-mode-backdrop"
      >
        <div className="w-full h-full max-w-6xl max-h-screen flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsTheaterMode(false)}
              data-testid="button-exit-theater-mode"
              className="text-white hover:bg-white/10"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Video */}
            {current.type === "video" && (
              <div className="w-full flex-1 bg-black rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={current.videoUrl}
                  title={current.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                  data-testid="video-announcement-theater"
                />
              </div>
            )}

            {/* Article */}
            {current.type === "article" && (
              <div className="w-full flex-1 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-lg flex items-center justify-center p-12 overflow-y-auto">
                <div className="w-full flex flex-col items-center justify-center">
                  <FileText className="w-16 h-16 text-secondary mb-6" />
                  <h3 className="font-semibold text-4xl text-white mb-6 text-center">
                    {current.title}
                  </h3>
                  <p className="text-gray-200 text-lg text-center max-w-3xl leading-relaxed">
                    {current.articleText}
                  </p>
                </div>
              </div>
            )}

            {/* Image */}
            {current.type === "image" && (
              <div className="w-full flex-1 bg-black rounded-lg overflow-hidden">
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  className="w-full h-full object-contain"
                  data-testid="image-announcement-theater"
                />
              </div>
            )}

            {/* Bottom Info and Controls */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">{current.title}</h3>
                  <p className="text-gray-300 mb-1">{current.description}</p>
                  <p className="text-sm text-gray-400">{current.date}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {current.type === "video" && (
                    <div className="bg-secondary/30 px-3 py-1 rounded-full flex items-center gap-2">
                      <Play className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-semibold text-white">VIDEO</span>
                    </div>
                  )}
                  {current.type === "article" && (
                    <div className="bg-secondary/30 px-3 py-1 rounded-full flex items-center gap-2">
                      <FileText className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-semibold text-white">ARTICLE</span>
                    </div>
                  )}
                  {current.type === "image" && (
                    <div className="bg-secondary/30 px-3 py-1 rounded-full flex items-center gap-2">
                      <Image className="w-4 h-4 text-secondary" />
                      <span className="text-xs font-semibold text-white">IMAGE</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={goToPrevious}
                  data-testid="button-previous-announcement-theater"
                  className="border-white/20 hover:bg-white/10 text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                {/* Slide Indicators */}
                <div className="flex gap-2 justify-center flex-1">
                  {announcements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "bg-secondary w-8"
                          : "bg-white/30 w-2 hover:bg-white/50"
                      }`}
                      data-testid={`button-slide-theater-${index}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={goToNext}
                  data-testid="button-next-announcement-theater"
                  className="border-white/20 hover:bg-white/10 text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              <div className="text-center text-sm text-gray-400">
                {currentIndex + 1} / {announcements.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Normal View
  return (
    <section id="announcement" className="py-16 md:py-24 bg-secondary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2
            className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4"
            data-testid="text-announcement-title"
          >
            Announcements
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch our latest updates, articles, and community moments
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Carousel Content */}
          <div className="relative bg-background rounded-lg overflow-hidden shadow-lg mb-6">
            {/* Video */}
            {current.type === "video" && (
              <div className="aspect-video bg-muted flex items-center justify-center">
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
              <div className="aspect-video bg-muted flex items-center justify-center p-8">
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg overflow-y-auto">
                  <FileText className="w-12 h-12 text-secondary mb-4" />
                  <h3 className="font-semibold text-2xl text-foreground mb-4 text-center">
                    {current.title}
                  </h3>
                  <p className="text-muted-foreground text-center max-w-2xl leading-relaxed">
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
                  className="w-full h-full object-cover"
                  data-testid="image-announcement"
                />
              </div>
            )}

            {/* Content Badge */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
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

            {/* Theater Mode Button */}
            <button
              onClick={() => setIsTheaterMode(true)}
              className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm hover:bg-background px-3 py-1 rounded-full text-xs font-semibold text-foreground transition-colors"
              data-testid="button-enter-theater-mode"
            >
              Theater Mode
            </button>
          </div>

          {/* Title, Description and Date */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-foreground mb-2">{current.title}</h3>
            <p className="text-muted-foreground mb-2">{current.description}</p>
            <p className="text-sm text-muted-foreground">{current.date}</p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <Button
              size="icon"
              variant="outline"
              onClick={goToPrevious}
              data-testid="button-previous-announcement"
              className="h-10 w-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Slide Indicators */}
            <div className="flex gap-2 justify-center flex-1">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-secondary w-8"
                      : "bg-secondary/30 w-2 hover-elevate"
                  }`}
                  data-testid={`button-slide-${index}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button
              size="icon"
              variant="outline"
              onClick={goToNext}
              data-testid="button-next-announcement"
              className="h-10 w-10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            {currentIndex + 1} / {announcements.length}
          </div>
        </div>
      </div>
    </section>
  );
}
