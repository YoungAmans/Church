import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

const churchAddress = "127 H. Lozada St., Balong Bato, San Juan City, Quezon City, Philippines";
const googleMapsUrl = "https://maps.google.com/?q=127+H.+Lozada+St.,+Balong+Bato,+San+Juan+City,+Quezon+City,+Philippines";
const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(googleMapsUrl)}`;

export default function LocationSection() {
  return (
    <section id="location" className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4"
            data-testid="text-location-title"
          >
            Find Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visit Hope Philippines Church this Sunday. We're easy to find.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-8">
            <Card className="overflow-visible">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Address</h3>
                      <p className="text-muted-foreground">{churchAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0 mt-1">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                      <a 
                        href="tel:287051553" 
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        data-testid="link-phone"
                      >
                        287-0515-53
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0 mt-1">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Email</h3>
                      <a 
                        href="mailto:hello@gracecommunity.church"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        data-testid="link-email"
                      >
                        hello@gracecommunity.church
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-sm text-muted-foreground">
              <strong>Parking:</strong> Free parking available on-site. Look for visitor spots near the main entrance.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-8">
            <Card className="overflow-visible">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground mb-4">Scan to get directions</p>
                  <a 
                    href={googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block hover-elevate"
                    data-testid="link-qr-code"
                  >
                    <img 
                      src={qrCodeUrl}
                      alt="QR code to Google Maps"
                      className="w-64 h-64"
                      data-testid="img-qr-code"
                    />
                  </a>
                  <p className="text-xs text-muted-foreground mt-4">
                    Click or scan to open in Google Maps
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
