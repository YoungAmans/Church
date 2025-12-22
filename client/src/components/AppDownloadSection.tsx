import { Card, CardContent } from "@/components/ui/card";
import { Download, Smartphone } from "lucide-react";

const appUrl = typeof window !== 'undefined' ? window.location.origin : 'https://hopephilippineschurch.replit.app';
const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(appUrl)}`;

export default function AppDownloadSection() {
  return (
    <section id="download" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4"
            data-testid="text-download-title"
          >
            Get Our App
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scan the QR code below to access Hope Philippines Church anywhere, anytime.
          </p>
        </div>

        <div className="flex justify-center">
          <Card className="overflow-visible max-w-sm w-full">
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10">
                  <Smartphone className="w-8 h-8 text-primary" />
                </div>
                
                <div className="text-center">
                  <h3 className="font-semibold text-foreground mb-2">Download Our App</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Scan the QR code to visit our church application
                  </p>
                </div>

                <a 
                  href={appUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block hover-elevate rounded-lg overflow-hidden"
                  data-testid="link-app-qr-code"
                >
                  <img 
                    src={qrCodeUrl}
                    alt="QR code to download app"
                    className="w-64 h-64 bg-white p-4 rounded-lg"
                    data-testid="img-app-qr-code"
                  />
                </a>

                <div className="text-center w-full border-t border-border pt-6">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>Click or scan to open the app</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
