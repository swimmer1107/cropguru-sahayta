import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Droplets, Sprout, Calendar } from "lucide-react";
import { toast } from "sonner";
import * as api from "@/lib/api";

const CropPredictions = () => {
  const predictions = [
    {
      crop: "Rice",
      expectedYield: "4.2 tonnes/hectare",
      confidence: 92,
      status: "Excellent",
      statusColor: "bg-success text-success-foreground",
      recommendations: [
        "Apply 25kg NPK fertilizer next week",
        "Increase irrigation frequency by 20%",
        "Harvest in 45-50 days"
      ]
    },
    {
      crop: "Wheat",
      expectedYield: "3.8 tonnes/hectare",
      confidence: 87,
      status: "Good",
      statusColor: "bg-accent text-accent-foreground",
      recommendations: [
        "Monitor for rust disease",
        "Reduce nitrogen application",
        "Optimal harvest window: 60-65 days"
      ]
    },
    {
      crop: "Sugarcane",
      expectedYield: "85 tonnes/hectare",
      confidence: 89,
      status: "Very Good",
      statusColor: "bg-success text-success-foreground",
      recommendations: [
        "Maintain current irrigation schedule",
        "Apply potassium sulfate in 2 weeks",
        "Expected harvest in 4 months"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <TrendingUp className="mr-2 h-6 w-6 text-primary" />
          Crop Yield Predictions
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={async () => {
            try {
              const preds = await api.fetchPredictions();
              toast.info(`Loaded ${preds.length} predictions`);
            } catch (e) {
              toast.error("Failed to load predictions");
            }
          }}
        >
          View All Crops
        </Button>
      </div>

      <div className="grid gap-6">
        {predictions.map((prediction, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Sprout className="mr-2 h-5 w-5 text-primary" />
                  {prediction.crop}
                </CardTitle>
                <Badge className={prediction.statusColor}>
                  {prediction.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Yield Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Expected Yield</p>
                  <p className="text-2xl font-bold text-primary">{prediction.expectedYield}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Confidence Level</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">AI Recommendations</p>
                <div className="space-y-2">
                  {prediction.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={async () => {
                    try {
                      await api.scheduleIrrigation({ crop: prediction.crop });
                      toast.success(`Irrigation set for ${prediction.crop}`);
                    } catch (e) {
                      toast.error("Failed to schedule irrigation");
                    }
                  }}
                >
                  <Droplets className="mr-1 h-4 w-4" />
                  Set Irrigation
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={async () => {
                    try {
                      await api.createTask({ task: `Tasks for ${prediction.crop}`, crop: prediction.crop, priority: "Medium" });
                      toast.success(`Task created for ${prediction.crop}`);
                    } catch (e) {
                      toast.error("Failed to schedule tasks");
                    }
                  }}
                >
                  <Calendar className="mr-1 h-4 w-4" />
                  Schedule Tasks
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CropPredictions;