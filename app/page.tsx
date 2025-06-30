"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Heart,
  Shield,
  Camera,
  MessageCircle,
  Stethoscope,
  Upload,
  Star,
  Lock,
  Eye,
  Zap,
} from "lucide-react";
import DressConfidence from "@/components/dress-confidence";
import SkinCareGuide from "@/components/skin-care-guide";
import HealthAssistant from "@/components/health-assistant";
import Image from "next/image";
import badge from "@/assets/badge.png";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                HerMirror
              </h1>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 border-green-200"
              >
                <Lock className="w-3 h-3 mr-1" />
                100% Private
              </Badge>
              <a
                href="https://bolt.new/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={badge} alt="" className="w-12 h-12" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="dress" className="data-[state=active]:bg-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Dress
            </TabsTrigger>
            <TabsTrigger
              value="skincare"
              className="data-[state=active]:bg-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              Skincare
            </TabsTrigger>
            <TabsTrigger
              value="health"
              className="data-[state=active]:bg-white"
            >
              <Stethoscope className="w-4 h-4 mr-2" />
              Health
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12">
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  Your AI Confidence Companion
                </span>
              </div>

              <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Embrace Your Beautiful Self
              </h2>

              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get personalized, judgment-free guidance for your dress choices,
                skincare routine, and health questions. Your private AI
                companion that celebrates your unique beauty.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button
                  onClick={() => setActiveTab("dress")}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
                >
                  Start Your Journey
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-pink-100">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-pink-700">
                    Dress Confidence
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Upload a photo or describe your occasion for personalized
                    style suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-pink-500" />
                      Body type & skin tone analysis
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-pink-500" />
                      Occasion-appropriate suggestions
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-pink-500" />
                      Confidence-boosting feedback
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab("dress")}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    Try Dress Assistant
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-700">
                    Skin Care Guide
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Get personalized skincare routines based on your skin type
                    and concerns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-purple-500" />
                      Skin type analysis
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-purple-500" />
                      Daily routine suggestions
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-purple-500" />
                      Budget-friendly products
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab("skincare")}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Start Skin Analysis
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/70 backdrop-blur-sm border-indigo-100">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-indigo-700">
                    Health Assistant
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Ask questions about women's health, periods, and wellness in
                    a safe space
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-indigo-500" />
                      Period & hygiene guidance
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-indigo-500" />
                      Symptom checker
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 mr-2 text-indigo-500" />
                      Anonymous conversations
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab("health")}
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    Chat with Assistant
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Privacy Section */}
            <Card className="mt-16 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-green-700">
                  Your Privacy is Sacred
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg max-w-2xl mx-auto">
                  We believe your personal journey should remain personal.
                  That's why HerMirror is designed with privacy at its core.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="space-y-2">
                    <Lock className="w-8 h-8 text-green-600 mx-auto" />
                    <h4 className="font-semibold text-green-700">
                      No Data Storage
                    </h4>
                    <p className="text-sm text-gray-600">
                      Your photos and conversations are never saved or shared
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Shield className="w-8 h-8 text-green-600 mx-auto" />
                    <h4 className="font-semibold text-green-700">
                      On-Device Processing
                    </h4>
                    <p className="text-sm text-gray-600">
                      Analysis happens locally on your device when possible
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Eye className="w-8 h-8 text-green-600 mx-auto" />
                    <h4 className="font-semibold text-green-700">
                      Anonymous by Default
                    </h4>
                    <p className="text-sm text-gray-600">
                      No accounts required, no tracking, no judgment
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dress">
            <DressConfidence />
          </TabsContent>

          <TabsContent value="skincare">
            <SkinCareGuide />
          </TabsContent>

          <TabsContent value="health">
            <HealthAssistant />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                HerMirror
              </span>
            </div>
            <p className="text-gray-600">
              Empowering women with confidence, one reflection at a time.
            </p>
            <p className="text-sm text-gray-500">
              Built with love, respect, and zero judgment. Your beauty is unique
              and deserves to be celebrated.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
