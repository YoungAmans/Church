import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Music, Heart } from "lucide-react";

const services = [
  {
    name: "Monday - Saturday",
    time: "9:00 AM - 6:00 PM",
    day: "Weekdays",
    description: "Church office and fellowship hours. Visit us during these times.",
    icon: Clock,
    audience: "All welcome",
  },
  {
    name: "Sunday Morning Service", 
    time: "9:30 AM - 12:00 PM",
    day: "Sunday",
    description: "Join us for worship, prayer, and community fellowship.",
    icon: Music,
    audience: "All ages welcome",
  },
  {
    name: "Sunday Afternoon Service",
    time: "3:30 PM - 6:00 PM", 
    day: "Sunday",
    description: "Evening worship service with teaching and fellowship.",
    icon: Heart,
    audience: "All ages welcome",
  },
];

import { BookOpen } from "lucide-react";

export default function ServiceTimesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4"
            data-testid="text-services-title"
          >
            Service Hours
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">
            Join us for worship and fellowship.
          </p>
          <p className="text-base text-secondary font-semibold">Opening Soon</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.name} 
              className="overflow-visible"
              data-testid={`card-service-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <service.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{service.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{service.day} at {service.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Users className="w-4 h-4" />
                  <span>{service.audience}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button size="lg" data-testid="button-plan-visit">
            Plan Your Visit
          </Button>
        </div>
      </div>
    </section>
  );
}
