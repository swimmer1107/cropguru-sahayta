import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import * as api from "@/lib/api";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const recentAnalyses = [
    {
      id: 1,
      crop: "Rice",
      disease: "Leaf Blast",
      confidence: 94,
      severity: "Medium",
      treatment: "Apply Tricyclazole fungicide",
      status: "detected",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      crop: "Wheat",
      disease: "Healthy Plant",
      confidence: 98,
      severity: "None",
      treatment: "Continue current care",
      status: "healthy",
      timestamp: "1 day ago"
    },
    {
      id: 3,
      crop: "Tomato",
      disease: "Early Blight",
      confidence: 87,
      severity: "High",
      treatment: "Apply copper-based fungicide immediately",
      status: "detected",
      timestamp: "2 days ago"
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    try {
      const result = await api.analyzeDisease(selectedImage);
      toast.success("Image analyzed and saved");
      console.log("Analysis result:", result);
    } catch (e) {
      toast.error("Failed to analyze image");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const treatmentSuggestions = [
    {
      type: "Organic",
      title: "Neem Oil Spray",
      description: "Natural fungicide, apply every 7-10 days",
      cost: "₹50-80 per application"
    },
    {
      type: "Chemical",
      title: "Tricyclazole 75% WP",
      description: "Systemic fungicide for blast control",
      cost: "₹150-200 per application"
    },
    {
      type: "Prevention",
      title: "Crop Rotation",
      description: "Rotate with legume crops next season",
      cost: "No additional cost"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Camera className="mr-2 h-6 w-6 text-primary" />
          Disease Detection
        </h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={async () => {
            try {
              const history = await api.getDiseaseHistory();
              toast.info(`Loaded ${history.length} records`);
            } catch (e) {
              toast.error("Failed to load history");
            }
          }}
        >
          Detection History
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Image Upload and Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Crop Image</CardTitle>
            <p className="text-sm text-muted-foreground">
              Take a clear photo of affected leaves or plants for AI analysis
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              {selectedImage ? (
                <div className="space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded crop" 
                    className="max-w-full h-48 object-contain mx-auto rounded-lg"
                  />
                  <div className="flex space-x-2 justify-center">
                    <Button 
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-primary to-primary-glow"
                    >
                      {isAnalyzing ? (
                        <>
                          <Clock className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Camera className="mr-2 h-4 w-4" />
                          Analyze Image
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedImage(null)}>
                      Upload New
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-lg font-medium">Upload crop image</p>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG up to 10MB
                    </p>
                  </div>
                  <div className="flex space-x-2 justify-center">
                    <Button asChild>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="mr-2 h-4 w-4" />
                        Choose File
                      </label>
                    </Button>
                    <Button variant="outline" onClick={() => console.log('Take photo')}>
                      <Camera className="mr-2 h-4 w-4" />
                      Take Photo
                    </Button>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* Analysis Results */}
            {isAnalyzing && (
              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 animate-spin text-primary" />
                    <span>AI is analyzing your crop image...</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This usually takes 10-30 seconds
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Treatment Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>Treatment Options</CardTitle>
            <p className="text-sm text-muted-foreground">
              Cost-effective solutions for detected issues
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {treatmentSuggestions.map((treatment, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{treatment.title}</h4>
                  <Badge variant={
                    treatment.type === 'Organic' ? 'default' : 
                    treatment.type === 'Chemical' ? 'secondary' : 'outline'
                  }>
                    {treatment.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {treatment.description}
                </p>
                <p className="text-sm font-medium text-accent">
                  {treatment.cost}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Analyses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Disease Analyses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAnalyses.map((analysis) => (
              <div key={analysis.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  {analysis.status === 'healthy' ? (
                    <CheckCircle className="h-8 w-8 text-success" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-warning" />
                  )}
                  <div>
                    <h4 className="font-medium">{analysis.crop}</h4>
                    <p className="text-sm text-muted-foreground">
                      {analysis.disease} • {analysis.confidence}% confidence
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={analysis.severity === 'None' ? 'outline' : 
                            analysis.severity === 'High' ? 'destructive' : 'secondary'}
                  >
                    {analysis.severity}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {analysis.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiseaseDetection;