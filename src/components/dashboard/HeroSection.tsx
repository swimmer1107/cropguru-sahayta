import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sprout, TrendingUp, CloudRain, Thermometer } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-background to-muted/50 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Smart Farming
              </span>
              <br />
              <span className="text-foreground">
                for Better Yields
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Maximize your crop yield and income with AI-powered predictions, satellite data analysis, 
              and personalized farming recommendations tailored for Indian agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg">
                <Sprout className="mr-2 h-5 w-5" />
                Get Crop Predictions
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-success/10 to-success/20 border-success/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-success-foreground/80">Avg Yield Increase</p>
                  <p className="text-2xl font-bold text-success">+23%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/20 border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-accent-foreground/80">Today's Temp</p>
                  <p className="text-2xl font-bold text-accent">28°C</p>
                </div>
                <Thermometer className="h-8 w-8 text-accent" />
              </div>
            </Card>
            
            <Card className="col-span-2 p-6 bg-gradient-to-r from-primary/10 to-primary-glow/20 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-foreground/80">Weather Alert</p>
                  <p className="text-lg font-semibold text-primary">Light rainfall expected in 2 days</p>
                </div>
                <CloudRain className="h-8 w-8 text-primary" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;