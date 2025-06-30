'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Heart, 
  Camera, 
  Droplets, 
  Sun, 
  Moon,
  Clock,
  Star,
  ImageIcon,
  Sparkles,
  Upload,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface SkinAnalysis {
  skinType: string;
  concerns: string[];
  routine: {
    morning: Array<{
      step: number;
      product: string;
      description: string;
      reason: string;
    }>;
    evening: Array<{
      step: number;
      product: string;
      description: string;
      reason: string;
    }>;
  };
  recommendations: {
    ingredients: string[];
    lifestyle: string[];
    products: Array<{
      category: string;
      suggestion: string;
      budget: string;
    }>;
  };
}

export default function SkinCareGuide() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [skinType, setSkinType] = useState('');
  const [skinConcerns, setSkinConcerns] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState('');
  const [budget, setBudget] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SkinAnalysis | null>(null);

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

  const handleConcernChange = (concern: string, checked: boolean) => {
    if (checked) {
      setSkinConcerns([...skinConcerns, concern]);
    } else {
      setSkinConcerns(skinConcerns.filter(c => c !== concern));
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Mock analysis based on inputs
    const mockAnalysis: SkinAnalysis = {
      skinType: skinType || "Combination",
      concerns: skinConcerns,
      routine: {
        morning: [
          {
            step: 1,
            product: "Gentle Cleanser",
            description: "Mild, pH-balanced cleanser",
            reason: "Removes overnight impurities without stripping natural oils"
          },
          {
            step: 2,
            product: "Vitamin C Serum",
            description: "10-15% L-Ascorbic Acid or Magnesium Ascorbyl Phosphate",
            reason: "Protects from environmental damage and brightens skin"
          },
          {
            step: 3,
            product: "Moisturizer",
            description: "Lightweight, non-comedogenic formula",
            reason: "Maintains hydration and strengthens skin barrier"
          },
          {
            step: 4,
            product: "Broad-Spectrum SPF 30+",
            description: "Mineral or chemical sunscreen",
            reason: "Essential protection from UV damage and premature aging"
          }
        ],
        evening: [
          {
            step: 1,
            product: "Oil Cleanser (if wearing makeup)",
            description: "Gentle oil-based cleanser",
            reason: "Effectively removes makeup and sunscreen"
          },
          {
            step: 2,
            product: "Water-Based Cleanser",
            description: "Same as morning cleanser",
            reason: "Completes the double cleanse for thorough cleaning"
          },
          {
            step: 3,
            product: "Treatment (3x per week)",
            description: "Retinol or AHA/BHA",
            reason: "Promotes cell turnover and addresses specific concerns"
          },
          {
            step: 4,
            product: "Night Moisturizer",
            description: "Richer formula with ceramides",
            reason: "Supports overnight repair and regeneration"
          }
        ]
      },
      recommendations: {
        ingredients: ["Hyaluronic Acid", "Niacinamide", "Ceramides", "Vitamin E"],
        lifestyle: ["Drink 8 glasses of water daily", "Get 7-8 hours of sleep", "Eat omega-3 rich foods", "Manage stress through meditation"],
        products: [
          {
            category: "Cleanser",
            suggestion: "CeraVe Foaming Facial Cleanser or Neutrogena Ultra Gentle",
            budget: "Budget-friendly"
          },
          {
            category: "Moisturizer",
            suggestion: "Cetaphil Daily Facial Moisturizer or The Ordinary Natural Moisturizing Factors",
            budget: "Budget-friendly"
          },
          {
            category: "Sunscreen",
            suggestion: "EltaMD UV Clear or Neutrogena Ultra Sheer",
            budget: "Mid-range"
          }
        ]
      }
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const skinConcernsList = [
    "Acne/Breakouts",
    "Dark spots/Hyperpigmentation",
    "Fine lines/Wrinkles",
    "Large pores",
    "Uneven skin tone",
    "Dryness/Dehydration",
    "Oily T-zone",
    "Sensitivity/Redness",
    "Dark circles",
    "Dullness"
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
          <Heart className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">Skin Care Guide</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Your Personalized Skincare Journey
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get a customized skincare routine based on your skin type, concerns, and lifestyle. Your skin deserves the best care.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="w-5 h-5 mr-2 text-purple-600" />
                Upload a Selfie (Optional)
              </CardTitle>
              <CardDescription>
                Share a clear photo of your face for more accurate skin analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center hover:border-purple-300 transition-colors">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded selfie" 
                      className="max-w-full h-48 object-cover rounded-lg mx-auto"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedImage(null)}
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      Change Photo
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ImageIcon className="w-12 h-12 text-purple-400 mx-auto" />
                    <div>
                      <p className="text-gray-600 mb-2">Upload a clear, well-lit selfie</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="selfie-upload"
                      />
                      <label htmlFor="selfie-upload">
                        <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
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

          {/* Skin Type Selection */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Droplets className="w-5 h-5 mr-2 text-blue-600" />
                What's Your Skin Type?
              </CardTitle>
              <CardDescription>
                Not sure? Think about how your skin feels a few hours after cleansing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={skinType} onValueChange={setSkinType}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oily" id="oily" />
                    <Label htmlFor="oily" className="flex-1">
                      <div>
                        <div className="font-medium">Oily</div>
                        <div className="text-sm text-gray-600">Shiny, enlarged pores, prone to breakouts</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dry" id="dry" />
                    <Label htmlFor="dry" className="flex-1">
                      <div>
                        <div className="font-medium">Dry</div>
                        <div className="text-sm text-gray-600">Tight, flaky, rough texture</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="combination" id="combination" />
                    <Label htmlFor="combination" className="flex-1">
                      <div>
                        <div className="font-medium">Combination</div>
                        <div className="text-sm text-gray-600">Oily T-zone, normal/dry cheeks</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="flex-1">
                      <div>
                        <div className="font-medium">Normal</div>
                        <div className="text-sm text-gray-600">Balanced, rarely sensitive</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sensitive" id="sensitive" />
                    <Label htmlFor="sensitive" className="flex-1">
                      <div>
                        <div className="font-medium">Sensitive</div>
                        <div className="text-sm text-gray-600">Easily irritated, reactive to products</div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Skin Concerns */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-orange-600" />
                What Are Your Main Concerns?
              </CardTitle>
              <CardDescription>
                Select all that apply - we'll address them in your routine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {skinConcernsList.map((concern) => (
                  <div key={concern} className="flex items-center space-x-2">
                    <Checkbox
                      id={concern}
                      checked={skinConcerns.includes(concern)}
                      onCheckedChange={(checked) => handleConcernChange(concern, !!checked)}
                    />
                    <Label htmlFor={concern} className="text-sm">
                      {concern}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Age Range</Label>
                <RadioGroup value={ageRange} onValueChange={setAgeRange}>
                  <div className="flex space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teens" id="teens" />
                      <Label htmlFor="teens">Teens</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="20s" id="20s" />
                      <Label htmlFor="20s">20s</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="30s" id="30s" />
                      <Label htmlFor="30s">30s</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="40s+" id="40s" />
                      <Label htmlFor="40s">40s+</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Budget Preference</Label>
                <RadioGroup value={budget} onValueChange={setBudget}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="budget" id="budget" />
                      <Label htmlFor="budget">Budget-friendly (Under $50/month)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mid" id="mid" />
                      <Label htmlFor="mid">Mid-range ($50-100/month)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="premium" id="premium" />
                      <Label htmlFor="premium">Premium ($100+/month)</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleAnalyze}
            disabled={!skinType || isAnalyzing}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 text-lg font-semibold rounded-lg"
          >
            {isAnalyzing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Your Skin...
              </div>
            ) : (
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2" />
                Get My Skincare Plan
              </div>
            )}
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {analysis && (
            <>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-800">Your Personalized Skincare Plan</h3>
                <p className="text-gray-600">Created with care for your {analysis.skinType.toLowerCase()} skin</p>
              </div>

              {/* Morning Routine */}
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <Sun className="w-5 h-5 mr-2" />
                    Morning Routine
                  </CardTitle>
                  <CardDescription>Start your day with protection and nourishment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.routine.morning.map((step) => (
                    <div key={step.step} className="flex space-x-4 p-4 bg-white/60 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{step.product}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        <p className="text-xs text-orange-700 mt-1 italic">{step.reason}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Evening Routine */}
              <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-700">
                    <Moon className="w-5 h-5 mr-2" />
                    Evening Routine
                  </CardTitle>
                  <CardDescription>Wind down with repair and renewal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysis.routine.evening.map((step) => (
                    <div key={step.step} className="flex space-x-4 p-4 bg-white/60 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{step.product}</h4>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        <p className="text-xs text-indigo-700 mt-1 italic">{step.reason}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700">
                    <Star className="w-5 h-5 mr-2" />
                    Key Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Beneficial Ingredients</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.recommendations.ingredients.map((ingredient) => (
                        <Badge key={ingredient} variant="outline" className="border-purple-200 text-purple-700">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Lifestyle Tips</h4>
                    <ul className="space-y-2">
                      {analysis.recommendations.lifestyle.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">Product Suggestions</h4>
                    <div className="space-y-3">
                      {analysis.recommendations.products.map((product, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-800">{product.category}</div>
                            <div className="text-sm text-gray-600">{product.suggestion}</div>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {product.budget}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-pink-700 mb-2">A Gentle Reminder</h4>
                  <p className="text-pink-600">
                    Skincare is a journey, not a destination. Be patient with your skin and remember that consistency 
                    is more important than perfection. Your skin is unique and beautiful, and these recommendations 
                    are here to help you care for it with love. ✨
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          {!analysis && !isAnalyzing && (
            <Card className="bg-white/50 backdrop-blur-sm border-dashed border-purple-200">
              <CardContent className="p-12 text-center">
                <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Ready for Beautiful Skin?</h3>
                <p className="text-gray-600">
                  Tell me about your skin type and concerns, and I'll create a personalized routine that works for you.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}