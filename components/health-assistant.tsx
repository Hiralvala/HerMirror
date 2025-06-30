'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Stethoscope, 
  Heart, 
  MessageCircle, 
  Send,
  Shield,
  Clock,
  User,
  Bot,
  AlertTriangle,
  Info,
  Sparkles
} from 'lucide-react';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
  category?: string;
}

export default function HealthAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your personal health assistant. I'm here to help with questions about women's health, periods, wellness, and general health concerns. Feel free to ask me anything - this is a safe, judgment-free space. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
      category: "greeting"
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickQuestions = [
    "What's normal during menstruation?",
    "How to manage period pain?",
    "Signs I should see a doctor?",
    "Healthy lifestyle tips for women",
    "Understanding mood changes",
    "Basic hygiene questions"
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const lowerMessage = userMessage.toLowerCase();
    
    // Period-related responses
    if (lowerMessage.includes('period') || lowerMessage.includes('menstruation') || lowerMessage.includes('cycle')) {
      return "Menstrual cycles typically last 21-35 days, with bleeding for 3-7 days. It's normal to experience some cramping, mood changes, and breast tenderness. However, severe pain that interferes with daily activities, very heavy bleeding, or cycles shorter than 21 days or longer than 35 days should be discussed with a healthcare provider. Would you like specific tips for managing period symptoms?";
    }
    
    // Pain management
    if (lowerMessage.includes('pain') || lowerMessage.includes('cramp')) {
      return "For menstrual cramps, try: applying heat to your lower abdomen, gentle exercise like walking or yoga, over-the-counter pain relievers (following package directions), staying hydrated, and getting enough rest. If pain is severe or doesn't improve with these methods, it's worth consulting a healthcare provider as it could indicate conditions like endometriosis.";
    }
    
    // When to see doctor
    if (lowerMessage.includes('doctor') || lowerMessage.includes('medical') || lowerMessage.includes('see') || lowerMessage.includes('concern')) {
      return "You should consider seeing a healthcare provider if you experience: severe or worsening pain, very heavy bleeding (changing pads/tampons every hour), bleeding between periods, missed periods (if not pregnant), severe mood changes, signs of infection (unusual discharge, fever, pelvic pain), or any symptoms that worry you. Trust your instincts - you know your body best!";
    }
    
    // Hygiene questions
    if (lowerMessage.includes('hygiene') || lowerMessage.includes('clean') || lowerMessage.includes('wash')) {
      return "Good intimate hygiene includes: washing with warm water and mild, unscented soap externally only, changing underwear daily (cotton is breathable), avoiding douching or harsh products, changing pads/tampons regularly during your period, and wiping front to back. Remember, the vagina is self-cleaning, so gentle external care is usually all that's needed.";
    }
    
    // Mood and emotional health
    if (lowerMessage.includes('mood') || lowerMessage.includes('emotional') || lowerMessage.includes('stress') || lowerMessage.includes('anxiety')) {
      return "Hormonal changes during your cycle can affect mood - this is completely normal! Some tips: maintain regular sleep and exercise routines, eat nutritious foods, practice stress management techniques like deep breathing or meditation, stay connected with supportive people, and consider tracking your cycle to identify patterns. If mood changes significantly impact your life, speaking with a healthcare provider or counselor can be very helpful.";
    }
    
    // General wellness
    if (lowerMessage.includes('healthy') || lowerMessage.includes('wellness') || lowerMessage.includes('lifestyle')) {
      return "For overall women's wellness: eat a balanced diet rich in iron and calcium, stay hydrated, exercise regularly (even light activity helps), get adequate sleep (7-9 hours), manage stress, avoid smoking, limit alcohol, practice safe sun exposure, and maintain regular check-ups with healthcare providers. Remember, small consistent habits make a big difference in how you feel!";
    }
    
    // Default supportive response
    return "Thank you for sharing that with me. Women's health encompasses many aspects, and it's great that you're taking an active interest in your wellbeing. While I can provide general information and support, remember that every person is unique. If you have specific concerns or symptoms that worry you, it's always best to consult with a healthcare provider who can give you personalized advice. Is there anything specific you'd like to know more about?";
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: currentMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const response = await getAIResponse(currentMessage);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        content: response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        content: "I apologize, but I'm having trouble responding right now. Please try again, and remember that for urgent health concerns, it's always best to contact a healthcare provider directly.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setCurrentMessage(question);
    textareaRef.current?.focus();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full">
          <Stethoscope className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">Women's Health Assistant</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Your Safe Space for Health Questions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ask questions about periods, women's health, wellness, and more. This is a judgment-free, private conversation.
        </p>
      </div>

      {/* Privacy Notice */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Complete Privacy & Safety</h4>
              <p className="text-green-600 text-sm leading-relaxed">
                Your conversations are completely private and not stored anywhere. This assistant provides general health information 
                and support, but is not a replacement for professional medical advice. For urgent concerns or persistent symptoms, 
                please consult with a healthcare provider.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Questions */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-indigo-700">
                <Sparkles className="w-5 h-5 mr-2" />
                Quick Questions
              </CardTitle>
              <CardDescription>
                Click on any question to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left justify-start h-auto p-3 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
                >
                  <MessageCircle className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0" />
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Important Notice */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-amber-700 text-sm mb-1">When to Seek Immediate Care</h5>
                  <p className="text-amber-600 text-xs leading-relaxed">
                    Severe pain, heavy bleeding, signs of infection, or any symptoms that concern you warrant 
                    prompt medical attention. Trust your instincts about your body.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="bg-white/80 backdrop-blur-sm h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-indigo-600" />
                Health Chat
              </CardTitle>
              <CardDescription>
                Ask me anything about women's health and wellness
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.isUser 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                        }`}>
                          {message.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.isUser 
                            ? 'bg-indigo-500 text-white' 
                            : 'bg-white border border-gray-200'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <div className={`text-xs mt-2 opacity-70 ${message.isUser ? 'text-indigo-100' : 'text-gray-500'}`}>
                            <Clock className="w-3 h-3 inline mr-1" />
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="flex-shrink-0 border-t p-4">
                <div className="flex space-x-2">
                  <Textarea
                    ref={textareaRef}
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about periods, health concerns, or wellness tips..."
                    className="flex-1 min-h-[60px] max-h-[120px] resize-none border-indigo-200 focus:border-indigo-300"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!currentMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <Info className="w-3 h-3 mr-1" />
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Resources */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-700">Remember</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="space-y-2">
              <Heart className="w-6 h-6 text-purple-600 mx-auto" />
              <h4 className="font-semibold text-purple-700">You're Not Alone</h4>
              <p className="text-sm text-purple-600">Every woman's experience is valid and important</p>
            </div>
            <div className="space-y-2">
              <Shield className="w-6 h-6 text-purple-600 mx-auto" />
              <h4 className="font-semibold text-purple-700">Your Body, Your Choice</h4>
              <p className="text-sm text-purple-600">Trust your instincts and advocate for your health</p>
            </div>
            <div className="space-y-2">
              <Stethoscope className="w-6 h-6 text-purple-600 mx-auto" />
              <h4 className="font-semibold text-purple-700">Professional Support</h4>
              <p className="text-sm text-purple-600">Don't hesitate to seek medical care when needed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}