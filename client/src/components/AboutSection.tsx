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
              Welcome to Hope Church
            </h2>
            
            <div className="mb-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-foreground mb-3">Our Vision</h3>
              <p className="text-muted-foreground mb-4">To fulfill the great commission (Matthew 28:19-20)</p>
              
              <h3 className="font-semibold text-foreground mb-3">Our Mission</h3>
              <p className="text-muted-foreground font-medium">Love Neighbours • Make Disciples • Plant Churches</p>
            </div>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At Hope Church, we're committed to living out Jesus' great commission every day. 
              We're a community devoted to loving our neighbors, making disciples, and planting 
              churches that transform lives and communities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're exploring faith for the first time or looking for a church home, 
              you'll find a warm welcome here. We believe in the transforming power of love, 
              the importance of discipleship, and living out our faith through service to others.
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
