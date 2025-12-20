import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import youthImage from "@assets/generated_images/youth_ministry_group.png";
import childrenImage from "@assets/generated_images/children's_ministry_activities.png";
import worshipImage from "@assets/generated_images/worship_music_ministry.png";
import outreachImage from "@assets/generated_images/community_outreach_ministry.png";
import groupsImage from "@assets/generated_images/small_groups_ministry.png";

const ministries = [
  {
    name: "Youth Ministry",
    description: "Helping teens grow in faith and build lasting friendships.",
    image: youthImage,
  },
  {
    name: "Children's Ministry",
    description: "Fun, safe, and engaging programs for kids of all ages.",
    image: childrenImage,
  },
  {
    name: "Worship Team",
    description: "Using music to create meaningful worship experiences.",
    image: worshipImage,
  },
  {
    name: "Community Outreach",
    description: "Serving our neighbors and making a difference locally.",
    image: outreachImage,
  },
  {
    name: "Life Groups",
    description: "Connect with others in intimate group settings.",
    image: groupsImage,
  },
  {
    name: "Lifegroups",
    description: "Deep faith journeys in small communities focused on discipleship.",
    image: groupsImage,
  },
  {
    name: "Shepherding",
    description: "Pastoral care and spiritual guidance for your growth journey.",
    image: worshipImage,
  },
];

export default function MinistriesSection() {
  return (
    <section id="ministries" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4"
            data-testid="text-ministries-title"
          >
            Get Involved
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover ways to connect, grow, and serve alongside our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry, index) => (
            <Card 
              key={ministry.name}
              className={`overflow-hidden hover-elevate ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              data-testid={`card-ministry-${ministry.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={ministry.image}
                  alt={ministry.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">{ministry.name}</h3>
                <p className="text-muted-foreground mb-4">{ministry.description}</p>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-primary"
                  data-testid={`button-learn-more-${ministry.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
