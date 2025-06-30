'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  Heart, 
  Sun, 
  Cloud,
  MapPin,
  Clock,
  Palette,
  Star,
  ImageIcon
} from 'lucide-react';

interface Suggestion {
  id: number;
  category: string;
  title: string;
  description: string;
  confidence: string;
  colors: string[];
  accessories: string[];
}

export default function DressConfidence() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [occasion, setOccasion] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('');
  const [culturalPreference, setCulturalPreference] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock suggestions based on inputs
    const mockSuggestions: Suggestion[] = [
      {
        id: 1,
        category: "Professional Chic",
        title: "Elegant Blazer Ensemble",
        description: "A tailored blazer with matching trousers creates a polished, confident look perfect for presentations. The structured silhouette enhances your natural grace while the neutral tones project professionalism.",
        confidence: "You'll feel empowered and ready to conquer any challenge!",
        colors: ["Navy Blue", "Cream White", "Soft Gray"],
        accessories: ["Pearl earrings", "Leather handbag", "Low heels"]
      },
      {
        id: 2,
        category: "Smart Casual",
        title: "Flowing Midi Dress",
        description: "A midi dress in a flattering cut that moves beautifully with you. This style celebrates your femininity while maintaining the perfect balance of comfort and sophistication.",
        confidence: "This look radiates confidence and authentic beauty!",
        colors: ["Dusty Rose", "Sage Green", "Warm Taupe"],
        accessories: ["Delicate necklace", "Block heels", "Crossbody bag"]
      },
      {
        id: 3,
        category: "Cultural Elegance",
        title: "Modern Traditional Fusion",
        description: "A contemporary take on traditional wear that honors your heritage while expressing your personal style. The rich fabrics and thoughtful details create a stunning, respectful appearance.",
        confidence: "You'll feel beautifully connected to your roots while looking absolutely radiant!",
        colors: ["Deep Burgundy", "Golden Yellow", "Rich Emerald"],
        accessories: ["Traditional earrings", "Embroidered dupatta", "Comfortable flats"]
      }
    ];
    
    setSuggestions(mockSuggestions);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-pink-100 px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-pink-600" />
          <span className="text-sm font-medium text-pink-700">Dress Confidence Assistant</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Discover Your Perfect Look
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a photo or describe your occasion, and I'll suggest outfits that make you feel confident and beautiful.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2 text-pink-600" />
                Upload Your Photo (Optional)
              </CardTitle>
              <CardDescription>
                Share a photo of yourself or your current outfit for personalized suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-pink-200 rounded-lg p-8 text-center hover:border-pink-300 transition-colors">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded" 
                      className="max-w-full h-48 object-cover rounded-lg mx-auto"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedImage(null)}
                      className="border-pink-200 text-pink-600 hover:bg-pink-50"
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ImageIcon className="w-12 h-12 text-pink-400 mx-auto" />
                    <div>
                      <p className="text-gray-600 mb-2">Drag and drop or click to upload</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Photo
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Occasion Input */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-600" />
                Tell Me About Your Occasion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe where you're going or what you're doing... (e.g., 'College presentation to professors', 'Family wedding', 'First date at a nice restaurant')"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="min-h-[100px] border-purple-200 focus:border-purple-300"
              />
              
              {/* Additional Preferences */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Palette className="w-4 h-4 mr-2" />
                    Body Type (Optional)
                  </label>
                  <Select value={bodyType} onValueChange={setBodyType}>
                    <SelectTrigger className="border-purple-200">
                      <SelectValue placeholder="Select if you'd like" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pear">Pear</SelectItem>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="hourglass">Hourglass</SelectItem>
                      <SelectItem value="rectangle">Rectangle</SelectItem>
                      <SelectItem value="inverted-triangle">Inverted Triangle</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Sun className="w-4 h-4 mr-2" />
                    Weather/Season
                  </label>
                  <Select value={weatherCondition} onValueChange={setWeatherCondition}>
                    <SelectTrigger className="border-purple-200">
                      <SelectValue placeholder="Current weather" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hot-sunny">Hot & Sunny</SelectItem>
                      <SelectItem value="warm-mild">Warm & Mild</SelectItem>
                      <SelectItem value="cool-breezy">Cool & Breezy</SelectItem>
                      <SelectItem value="cold-winter">Cold & Winter</SelectItem>
                      <SelectItem value="rainy">Rainy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Cultural Preference (Optional)
                </label>
                <Select value={culturalPreference} onValueChange={setCulturalPreference}>
                  <SelectTrigger className="border-purple-200">
                    <SelectValue placeholder="Select if you have preferences" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="western">Western Style</SelectItem>
                    <SelectItem value="traditional-indian">Traditional Indian</SelectItem>
                    <SelectItem value="modest-conservative">Modest/Conservative</SelectItem>
                    <SelectItem value="bohemian">Bohemian</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="mix-traditional-modern">Mix Traditional & Modern</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleAnalyze}
            disabled={!occasion.trim() || isAnalyzing}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 text-lg font-semibold rounded-lg"
          >
            {isAnalyzing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Your Style...
              </div>
            ) : (
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Get My Style Suggestions
              </div>
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {suggestions.length > 0 && (
            <>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">Your Personalized Suggestions</h3>
                <p className="text-gray-600">Curated just for you with love and care</p>
              </div>

              <div className="space-y-6">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="bg-white/80 backdrop-blur-sm border-pink-100 hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-pink-100 text-pink-700">
                          {suggestion.category}
                        </Badge>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                          <Star className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                      <CardTitle className="text-xl text-purple-700">{suggestion.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">{suggestion.description}</p>
                      
                      <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-400">
                        <div className="flex items-start">
                          <Heart className="w-5 h-5 text-pink-500 mt-0.5 mr-2 flex-shrink-0" />
                          <p className="text-pink-700 font-medium italic">{suggestion.confidence}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Palette className="w-4 h-4 mr-2" />
                            Recommended Colors
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.colors.map((color, index) => (
                              <Badge key={index} variant="outline" className="border-purple-200 text-purple-700">
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Accessories
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.accessories.map((accessory, index) => (
                              <Badge key={index} variant="outline" className="border-pink-200 text-pink-700">
                                {accessory}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-700 mb-2">Remember</h4>
                  <p className="text-purple-600">
                    The most beautiful thing you can wear is confidence. These suggestions are here to enhance your natural radiance, 
                    but your authentic self is what truly shines. Trust your instincts and choose what makes you feel amazing! ✨
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          {suggestions.length === 0 && !isAnalyzing && (
            <Card className="bg-white/50 backdrop-blur-sm border-dashed border-pink-200">
              <CardContent className="p-12 text-center">
                <Sparkles className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready to Discover Your Style?</h3>
                <p className="text-gray-600">
                  Describe your occasion and I'll create personalized outfit suggestions that celebrate your unique beauty.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}