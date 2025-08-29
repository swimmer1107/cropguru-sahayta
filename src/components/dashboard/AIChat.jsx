import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Mic, Globe } from "lucide-react";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("English");

  const chatHistory = [
    {
      type: "user",
      message: "मेरी गेहूं की फसल में कुछ पत्ते पीले हो रहे हैं, क्या करूं?",
      time: "2 min ago"
    },
    {
      type: "ai",
      message: "गेहूं में पत्ते पीले होना नाइट्रोजन की कमी का संकेत हो सकता है। इसके लिए:\n\n1. तुरंत यूरिया का छिड़काव करें (25-30 kg/hectare)\n2. मिट्टी की जांच कराएं\n3. सिंचाई का समय बढ़ाएं\n4. अगले 7 दिन में सुधार दिखना चाहिए",
      time: "1 min ago"
    },
    {
      type: "user",
      message: "What is the best time to plant rice in Maharashtra?",
      time: "30 sec ago"
    },
    {
      type: "ai",
      message: "In Maharashtra, the best time for rice planting is:\n\n🌾 **Kharif Season**: June-July (monsoon arrival)\n📅 **Optimal window**: 15th June to 15th July\n🌧️ **Condition**: After sufficient rainfall (75-100mm)\n🌡️ **Temperature**: 25-35°C ideal\n\nFor your specific region, I recommend waiting for consistent monsoon rains before transplanting seedlings.",
      time: "Just now"
    }
  ];

  const quickQuestions = [
    "Best fertilizer for my crop?",
    "When to harvest wheat?",
    "Pest control suggestions",
    "Weather forecast impact",
    "Government schemes available"
  ];

  const languages = ["English", "हिंदी", "मराठी", "ગુજરાતી", "தமிழ்"];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to AI backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <MessageCircle className="mr-2 h-6 w-6 text-primary" />
          AI Farming Assistant
        </h2>
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm border border-border rounded px-2 py-1 bg-background"
          >
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Chat with CropGuru AI</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ask questions about crops, weather, pests, or farming techniques
              </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Chat History */}
              <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      chat.type === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="whitespace-pre-line">{chat.message}</p>
                      <p className="text-xs mt-2 opacity-70">{chat.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <Input
                  placeholder={`Ask your farming question in ${language}...`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button size="sm" onClick={() => console.log('Voice input')}>
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="sm" onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 px-3"
                  onClick={() => setMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">CROP ADVICE</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">WEATHER ALERTS</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">PEST CONTROL</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">MARKET PRICES</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">GOV SCHEMES</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIChat;