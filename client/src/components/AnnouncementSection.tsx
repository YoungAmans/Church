export default function AnnouncementSection() {
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
            Watch our latest updates and messages
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-background rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Hope Church Philippines Announcement"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
                data-testid="video-announcement"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
