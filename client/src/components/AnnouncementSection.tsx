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
        {/* Close Button */}
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-6 right-6 z-60 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          data-testid="button-close-fullscreen"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="w-full h-full flex items-center justify-center p-8">
          {/* Video */}
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

          {/* Article */}
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

          {/* Image */}
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
    <section id="announcement" className="relative py-24 md:py-32 overflow-hidden bg-black">
      {/* Theatrical Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-secondary/5" />
      
      {/* Spotlight Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full filter blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl opacity-20 -z-10" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Theater Title */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 justify-center">
              <div className="w-12 h-12 border-2 border-secondary/40" />
              <h2
                className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-wider"
                data-testid="text-announcement-title"
              >
                ANNOUNCEMENTS
              </h2>
              <div className="w-12 h-12 border-2 border-secondary/40" />
            </div>
          </div>
          <p className="text-lg text-gray-300 tracking-wide">
            Experience our latest updates and messages
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Main Theater Display */}
          <div className="relative group">
            {/* Outer Frame Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-secondary/40 via-primary/40 to-secondary/40 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity blur-xl" />
            
            {/* Content Container */}
            <div className="relative bg-black rounded-lg overflow-hidden border-2 border-secondary/20">
              {/* Inner Frame Border */}
              <div className="absolute inset-0 border-8 border-black pointer-events-none z-10" />

              {/* Video */}
              {current.type === "video" && (
                <div className="aspect-video bg-black flex items-center justify-center overflow-hidden">
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
                <div className="aspect-video bg-gradient-to-br from-black via-secondary/10 to-black flex items-center justify-center p-12">
                  <div className="flex flex-col items-center justify-center h-full w-full">
                    <FileText className="w-16 h-16 text-secondary/80 mb-6" />
                    <h3 className="font-semibold text-3xl text-white mb-6 text-center">
                      {current.title}
                    </h3>
                    <p className="text-gray-300 text-center max-w-2xl leading-relaxed text-lg">
                      {current.articleText}
                    </p>
                  </div>
                </div>
              )}

              {/* Image */}
              {current.type === "image" && (
                <div className="aspect-video bg-black overflow-hidden">
                  <img
                    src={current.imageUrl}
                    alt={current.title}
                    className="w-full h-full object-cover"
                    data-testid="image-announcement"
                  />
                </div>
              )}

              {/* Content Type Badge - Theater Style */}
              <div className="absolute top-6 right-6 bg-black/80 border border-secondary/40 px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm z-20">
                {current.type === "video" && (
                  <>
                    <Play className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold text-white tracking-widest">FEATURE</span>
                  </>
                )}
                {current.type === "article" && (
                  <>
                    <FileText className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold text-white tracking-widest">STORY</span>
                  </>
                )}
                {current.type === "image" && (
                  <>
                    <Image className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-bold text-white tracking-widest">GALLERY</span>
                  </>
                )}
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute bottom-6 left-6 bg-secondary/90 hover:bg-secondary text-black px-6 py-2 rounded-full text-sm font-bold tracking-wider transition-all z-20"
                data-testid="button-expand-fullscreen"
              >
                FULLSCREEN
              </button>
            </div>
          </div>

          {/* Theater Info Section */}
          <div className="mt-12 bg-black/40 border border-secondary/20 rounded-lg p-8 backdrop-blur-sm">
            <div className="flex justify-between items-start gap-8">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-white mb-3 tracking-wide">{current.title}</h3>
                <p className="text-gray-300 mb-3 text-lg">{current.description}</p>
                <p className="text-sm text-gray-400 tracking-wider">{current.date}</p>
              </div>
            </div>
          </div>

          {/* Theater Navigation */}
          <div className="mt-12 flex items-center justify-between gap-6">
            <Button
              size="icon"
              variant="outline"
              onClick={goToPrevious}
              data-testid="button-previous-announcement"
              className="h-12 w-12 border-secondary/40 hover:bg-secondary/10 text-white rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Slide Indicators - Theater Style */}
            <div className="flex gap-3 justify-center flex-1">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-secondary w-10"
                      : "bg-secondary/30 w-3 hover:bg-secondary/50"
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
              className="h-12 w-12 border-secondary/40 hover:bg-secondary/10 text-white rounded-full"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Slide Counter - Theater Style */}
          <div className="text-center mt-8 text-gray-400 tracking-widest text-sm font-bold">
            [{currentIndex + 1} / {announcements.length}]
          </div>
        </div>
      </div>
    </section>
  );
}
