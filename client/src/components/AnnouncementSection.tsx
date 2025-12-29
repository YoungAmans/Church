import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, FileText, Image } from "lucide-react";
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
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const goToPrevious = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const goToSlide = (index: number) => {
    setAutoPlay(false);
    setCurrentIndex(index);
  };

  const current = announcements[currentIndex];

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
