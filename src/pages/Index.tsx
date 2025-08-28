import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Dashboard from "@/components/dashboard/Dashboard";
import AIChat from "@/components/dashboard/AIChat";
import SatelliteData from "@/components/dashboard/SatelliteData";
import DiseaseDetection from "@/components/dashboard/DiseaseDetection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "chat":
        return <AIChat />;
      case "satellite":
        return <SatelliteData />;
      case "disease":
        return <DiseaseDetection />;
      case "profile":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Farmer Profile</h2>
            <p className="text-muted-foreground">
              Profile management and settings coming soon...
            </p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
