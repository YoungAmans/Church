import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";

// todo: remove mock functionality
const events = [
  {
    id: 1,
    title: "Christmas Eve Service",
    date: "December 24",
    time: "6:00 PM & 8:00 PM",
    location: "Main Sanctuary",
    category: "Worship",
  },
  {
    id: 2,
    title: "New Year Prayer Gathering",
    date: "January 1",
    time: "10:00 AM",
    location: "Fellowship Hall",
    category: "Prayer",
  },
  {
    id: 3,
    title: "Family Game Night",
    date: "January 10",
    time: "6:00 PM",
    location: "Youth Center",
    category: "Fellowship",
  },
  {
    id: 4,
    title: "Community Food Drive",
    date: "January 15",
    time: "9:00 AM - 2:00 PM",
    location: "Church Parking Lot",
    category: "Outreach",
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4"
            data-testid="text-events-title"
          >
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for special gatherings, celebrations, and opportunities to connect.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card 
              key={event.id}
              className="overflow-visible"
              data-testid={`card-event-${event.id}`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-secondary/10 rounded-lg flex flex-col items-center justify-center">
                    <Calendar className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-foreground">{event.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Button size="sm" data-testid={`button-register-${event.id}`}>
                      Register
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" data-testid="button-view-all-events">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
