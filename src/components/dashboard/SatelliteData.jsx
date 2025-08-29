import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Satellite, MapPin, CloudRain, Thermometer, Droplets, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import * as api from "@/lib/api";

const SatelliteData = () => {
  const farmData = {
    location: "Pune, Maharashtra",
    coordinates: "18.5204° N, 73.8567° E",
    fieldSize: "2.5 hectares",
    lastUpdated: "2 hours ago"
  };

  const ndviData = [
    { zone: "North Field", ndvi: 0.85, health: "Excellent", color: "bg-success" },
    { zone: "South Field", ndvi: 0.72, health: "Good", color: "bg-accent" },
    { zone: "East Field", ndvi: 0.68, health: "Fair", color: "bg-warning" },
    { zone: "West Field", ndvi: 0.91, health: "Excellent", color: "bg-success" }
  ];

  const weatherAlerts = [
    {
      type: "rainfall",
      message: "Moderate rainfall expected in 48 hours",
      impact: "Delay fertilizer application",
      priority: "medium"
    },
    {
      type: "temperature",
      message: "Temperature drop expected next week",
      impact: "Consider protective measures for sensitive crops",
      priority: "low"
    }
  ];

  const soilMetrics = [
    { label: "Soil Moisture", value: 65, unit: "%", status: "Optimal" },
    { label: "Temperature", value: 28, unit: "°C", status: "Normal" },
    { label: "pH Level", value: 6.8, unit: "", status: "Good" },
    { label: "Organic Matter", value: 3.2, unit: "%", status: "Adequate" }
  ];

  const handleAnalyzeField = async () => {
    try {
      await api.analyzeField();
      toast.success("Field analysis started");
    } catch (e) {
      toast.error("Failed to analyze field");
    }
  };

  const handleWeatherForecast = async () => {
    try {
      const data = await api.forecast(30);
      toast.info(`Forecast loaded: ${data?.days?.length || 30} days`);
    } catch (e) {
      toast.error("Failed to fetch forecast");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Satellite className="mr-2 h-6 w-6 text-primary" />
          Satellite & Weather Analysis
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={async () => {
            try {
              await api.setLocation(farmData.location);
              toast.success("Location updated");
            } catch (e) {
              toast.error("Failed to update location");
            }
          }}
        >
          <MapPin className="mr-1 h-4 w-4" />
          Change Location
        </Button>
      </div>

      {/* Farm Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Farm Overview</span>
            <Badge variant="outline">{farmData.lastUpdated}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{farmData.location}</p>
              <p className="text-xs text-muted-foreground">{farmData.coordinates}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Field Size</p>
              <p className="font-medium">{farmData.fieldSize}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Crop Season</p>
              <p className="font-medium">Kharif 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* NDVI Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">NDVI Analysis</CardTitle>
            <p className="text-sm text-muted-foreground">
              Crop health assessment from satellite imagery
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {ndviData.map((zone, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{zone.zone}</span>
                  <Badge className={`${zone.color} text-white`}>
                    {zone.health}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={zone.ndvi * 100} className="flex-1 h-2" />
                  <span className="text-sm font-mono">{zone.ndvi}</span>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-4" onClick={handleAnalyzeField}>
              Analyze Current Field Status
            </Button>
          </CardContent>
        </Card>

        {/* Weather Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
              Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {weatherAlerts.map((alert, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/50 border">
                <div className="flex items-start space-x-2">
                  {alert.type === 'rainfall' ? (
                    <CloudRain className="h-5 w-5 text-blue-500 mt-0.5" />
                  ) : (
                    <Thermometer className="h-5 w-5 text-orange-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Impact: {alert.impact}
                    </p>
                  </div>
                  <Badge 
                    variant={alert.priority === 'medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {alert.priority}
                  </Badge>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={handleWeatherForecast}>
              Get 30-Day Forecast
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Soil Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Droplets className="mr-2 h-5 w-5 text-primary" />
            Soil Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {soilMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-primary">
                  {metric.value}{metric.unit}
                </p>
                <Badge variant="outline" className="mt-2 text-xs">
                  {metric.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SatelliteData;