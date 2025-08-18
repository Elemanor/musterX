import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, MessageSquare, Users, Camera, MapPin, 
  Clock, AlertCircle, CheckCircle, Phone, ArrowRight,
  Star, Shield, Zap, ChevronRight, Sparkles
} from 'lucide-react';

interface BookingWidgetProps {
  onBookingStart?: (type: 'instant' | 'photo' | 'bids', data?: any) => void;
}

export function EnhancedBookingWidget({ onBookingStart }: BookingWidgetProps) {
  const [bookingType, setBookingType] = useState<'instant' | 'photo' | 'bids' | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [requiresLicense, setRequiresLicense] = useState(false);
  const [estimatedHours, setEstimatedHours] = useState(1);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  // Simple service categories to determine if bidding is needed
  const regulatedServices = {
    electrical: { license: 'ESA Licensed Electrical Contractor', minHours: 1 },
    gas: { license: 'TSSA Certified', minHours: 1 },
    plumbing: { license: '306A Licensed Plumber', minHours: 2 },
    complex: { license: null, minHours: 4 }
  };

  const handleServiceSelection = (service: string) => {
    setSelectedService(service);
    
    // Check if service requires licensing or is complex
    if (service.toLowerCase().includes('electrical') || 
        service.toLowerCase().includes('outlet') || 
        service.toLowerCase().includes('wiring')) {
      setRequiresLicense(true);
      setBookingType('bids');
    } else if (service.toLowerCase().includes('gas') || 
               service.toLowerCase().includes('furnace')) {
      setRequiresLicense(true);
      setBookingType('bids');
    } else if (service.toLowerCase().includes('plumbing') && 
               !service.toLowerCase().includes('simple')) {
      setRequiresLicense(true);
      setBookingType('bids');
    } else if (estimatedHours > 4) {
      setBookingType('bids');
    } else {
      setBookingType('instant');
    }
  };

  return (
    <div className="relative">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 blur-3xl animate-pulse" />
      
      <div className="relative flex flex-col lg:flex-row gap-4 justify-center items-stretch max-w-5xl mx-auto">
        {/* Primary CTA: Book Now */}
        <Dialog>
          <DialogTrigger asChild>
            <div 
              className="flex-1 transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setIsHovered('book')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Card className="h-full bg-gradient-to-br from-blue-600 to-blue-700 border-0 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-yellow-400 text-black px-3 py-1 text-xs font-bold rounded-bl-lg">
                  MOST POPULAR
                </div>
                <CardContent className="p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <Calendar className={`h-8 w-8 ${isHovered === 'book' ? 'animate-bounce' : ''}`} />
                    <Badge className="bg-white/20 text-white border-0">
                      2hr window
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Book Now</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Get help today with same-day service
                  </p>
                  <div className="flex items-center gap-2 text-xs text-blue-100">
                    <CheckCircle className="h-3 w-3" />
                    <span>Starting at $75/hour</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 mt-3 transition-transform ${isHovered === 'book' ? 'translate-x-2' : ''}`} />
                </CardContent>
              </Card>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Book Same-Day Service
              </DialogTitle>
              <DialogDescription>
                Get help today with a 2-hour arrival window. Most jobs $75-150/hour.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              <div>
                <Label htmlFor="service">What do you need help with?</Label>
                <Input 
                  id="service" 
                  placeholder="e.g., Mount TV, fix door, patch drywall"
                  onChange={(e) => handleServiceSelection(e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="time">Preferred time today</Label>
                <select id="time" className="w-full p-2 border rounded-lg mt-1">
                  <option>Next available (fastest)</option>
                  <option>8am - 10am</option>
                  <option>10am - 12pm</option>
                  <option>12pm - 2pm</option>
                  <option>2pm - 4pm</option>
                  <option>4pm - 6pm</option>
                  <option>6pm - 8pm</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="location">Your location</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="location" placeholder="Address or postal code" className="pl-10" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input id="phone" type="tel" placeholder="437-545-0067" className="pl-10" />
                </div>
              </div>
              
              {requiresLicense && (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 animate-slide-down">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">Licensed professional required</p>
                      <p className="text-gray-600">We'll connect you with certified experts</p>
                    </div>
                  </div>
                </div>
              )}
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" onClick={() => onBookingStart?.('instant')}>
                Confirm Booking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Insured
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  4.9 Rating
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  Fast Response
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Secondary CTA: Text Photos */}
        <Dialog>
          <DialogTrigger asChild>
            <div 
              className="flex-1 transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setIsHovered('photo')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Card className="h-full bg-gradient-to-br from-purple-500 to-purple-600 border-0 shadow-xl hover:shadow-2xl transition-all cursor-pointer">
                <CardContent className="p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <Camera className={`h-8 w-8 ${isHovered === 'photo' ? 'animate-pulse' : ''}`} />
                    <Badge className="bg-white/20 text-white border-0">
                      Quick estimate
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Text Photos</h3>
                  <p className="text-purple-100 text-sm mb-4">
                    Get a price in 30 minutes
                  </p>
                  <div className="flex items-center gap-2 text-xs text-purple-100">
                    <MessageSquare className="h-3 w-3" />
                    <span>437-545-0067</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 mt-3 transition-transform ${isHovered === 'photo' ? 'translate-x-2' : ''}`} />
                </CardContent>
              </Card>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-purple-500" />
                Get a Quick Estimate
              </DialogTitle>
              <DialogDescription>
                Text us photos and we'll send you a price range within 30 minutes
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
                      <MessageSquare className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="font-bold text-xl">Text: 437-545-0067</p>
                    <p className="text-sm text-gray-600">
                      Send photos of what needs fixing
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">What to include:</p>
                <div className="space-y-2">
                  {['Clear photos from multiple angles', 'Brief description of the issue', 'Your location (neighborhood)', 'When you need it done'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-purple-500 text-purple-600 hover:bg-purple-50"
                onClick={() => window.location.href = 'sms:437-545-0067'}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Open Text Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Tertiary: Get Bids (shown conditionally) */}
        <Dialog>
          <DialogTrigger asChild>
            <div 
              className="flex-1 lg:max-w-[200px] transform transition-all duration-300 hover:scale-105"
              onMouseEnter={() => setIsHovered('bids')}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Card className="h-full bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300 shadow-lg hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Users className={`h-8 w-8 text-gray-600 ${isHovered === 'bids' ? 'animate-pulse' : ''}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Get Bids</h3>
                  <p className="text-gray-600 text-xs mb-4">
                    For licensed or complex work
                  </p>
                  <ChevronRight className={`h-5 w-5 text-gray-500 transition-transform ${isHovered === 'bids' ? 'translate-x-2' : ''}`} />
                </CardContent>
              </Card>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Get Multiple Quotes</DialogTitle>
              <DialogDescription>
                Best for licensed work (electrical, gas, plumbing) or complex projects
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 pt-4">
              <div>
                <Label>When should you get bids?</Label>
                <div className="mt-2 space-y-2">
                  {[
                    { icon: Zap, text: 'Electrical work (ESA required)', color: 'yellow' },
                    { icon: Users, text: 'Gas appliances (TSSA required)', color: 'blue' },
                    { icon: Users, text: 'Major plumbing (306A required)', color: 'green' },
                    { icon: Clock, text: 'Projects over 4 hours', color: 'purple' },
                    { icon: AlertCircle, text: 'Unclear scope needing assessment', color: 'red' }
                  ].map((item, i) => (
                    <Card key={i} className="p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <item.icon className={`h-4 w-4 text-${item.color}-500`} />
                        <p className="text-sm font-medium">{item.text}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full"
                onClick={() => {
                  onBookingStart?.('bids');
                  window.location.href = '/marketplace';
                }}
              >
                Post Your Job
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                Receive 2-4 quotes from verified professionals
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Trust indicators below */}
      <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-600">
        <span className="flex items-center gap-1">
          <Shield className="h-3 w-3 text-green-500" />
          WSIB Insured
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-500" />
          4.9/5 (2,500+ reviews)
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-blue-500" />
          Average arrival: 47 min
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3 text-purple-500" />
          100% Satisfaction
        </span>
      </div>
    </div>
  );
}