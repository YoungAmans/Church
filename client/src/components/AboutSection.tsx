import { Users, Heart, BookOpen } from "lucide-react";
import communityImage from "@assets/generated_images/church_community_gathering.png";

const stats = [
  { icon: Users, label: "Community Members", value: "500+" },
  { icon: Heart, label: "Years Serving", value: "25+" },
  { icon: BookOpen, label: "Weekly Groups", value: "30+" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 
              className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6"
              data-testid="text-about-title"
            >
              Welcome to Grace Community Church
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              For over 25 years, we've been a place where people from all walks of life 
              come together to worship, grow, and serve. Our doors are open to everyone 
              seeking hope, purpose, and genuine community.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you're exploring faith for the first time or looking for a new 
              church home, you'll find a warm welcome here. We believe in the 
              transforming power of love, the importance of community, and living 
              out our faith through service to others.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="text-center p-4"
                  data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={communityImage}
              alt="Church community gathering"
              className="w-full rounded-lg"
              data-testid="img-about"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
