import HeroSection from "./HeroSection";
import CropPredictions from "./CropPredictions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Droplets, 
  Thermometer, 
  DollarSign, 
  Calendar,
  Bell,
  Sprout
} from "lucide-react";

const Dashboard = () => {
  const quickStats = [
    {
      title: "Expected Revenue",
      value: "₹2,45,000",
      change: "+12%",
      trend: "up",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Active Fields",
      value: "4",
      change: "2 ready for harvest",
      trend: "neutral",
      icon: Sprout,
      color: "text-primary"
    },
    {
      title: "Avg Temperature",
      value: "28°C",
      change: "Perfect for current crops",
      trend: "neutral",
      icon: Thermometer,
      color: "text-accent"
    },
    {
      title: "Irrigation Usage",
      value: "750L/day",
      change: "-8% from last week",
      trend: "down",
      icon: Droplets,
      color: "text-primary"
    }
  ];

  const upcomingTasks = [
    {
      task: "Apply NPK fertilizer to North Field",
      crop: "Rice",
      dueDate: "Tomorrow",
      priority: "High"
    },
    {
      task: "Harvest wheat in South Field",
      crop: "Wheat",
      dueDate: "3 days",
      priority: "High"
    },
    {
      task: "Pest inspection for tomato plants",
      crop: "Tomato",
      dueDate: "5 days",
      priority: "Medium"
    },
    {
      task: "Soil testing for next season",
      crop: "General",
      dueDate: "1 week",
      priority: "Low"
    }
  ];

  const notifications = [
    {
      type: "weather",
      message: "Rain expected in 2 days - prepare for irrigation adjustment",
      time: "2 hours ago"
    },
    {
      type: "crop",
      message: "Rice crop in North Field showing excellent growth",
      time: "5 hours ago"
    },
    {
      type: "market",
      message: "Wheat prices increased by 5% in local market",
      time: "1 day ago"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-xs ${stat.color} mt-1`}>
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <CropPredictions />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-muted-foreground">
                      {task.crop} • Due {task.dueDate}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      task.priority === 'High' ? 'destructive' : 
                      task.priority === 'Medium' ? 'default' : 'outline'
                    }
                    className="text-xs"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Tasks
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notification, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/30">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                View All Notifications
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Get Yield Prediction
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Droplets className="mr-2 h-4 w-4" />
                Schedule Irrigation
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Set Weather Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;