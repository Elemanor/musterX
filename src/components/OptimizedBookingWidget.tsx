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
  Clock, AlertCircle, CheckCircle, Phone, ArrowRight
} from 'lucide-react';

interface BookingWidgetProps {
  onBookingStart?: (type: 'instant' | 'photo' | 'bids', data?: any) => void;
}

export function OptimizedBookingWidget({ onBookingStart }: BookingWidgetProps) {
  const [bookingType, setBookingType] = useState<'instant' | 'photo' | 'bids' | null>(null);
  const [selectedService, setSelectedService] = useState('');
  const [requiresLicense, setRequiresLicense] = useState(false);
  const [estimatedHours, setEstimatedHours] = useState(1);
  
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
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      {/* Primary CTA: Book Now */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Calendar className="mr-2 h-5 w-5" />
            Book Now
            <Badge variant="secondary" className="ml-2 bg-white/20 text-white">
              2hr window
            </Badge>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Same-Day Service</DialogTitle>
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
              />
            </div>
            
            <div>
              <Label htmlFor="time">Preferred time today</Label>
              <select id="time" className="w-full p-2 border rounded">
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
              <Input id="location" placeholder="Address or postal code" />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" type="tel" placeholder="437-545-0067" />
            </div>
            
            {requiresLicense && (
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">This requires a licensed professional</p>
                    <p className="text-gray-600">We'll connect you with certified experts</p>
                  </div>
                </div>
              </div>
            )}
            
            <Button className="w-full" onClick={() => onBookingStart?.('instant')}>
              Confirm Booking
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <p className="text-xs text-center text-gray-500">
              You'll receive confirmation within 15 minutes
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Secondary CTA: Text Photos */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" variant="outline">
            <Camera className="mr-2 h-5 w-5" />
            Text Photos
            <Badge variant="secondary" className="ml-2">
              Get estimate
            </Badge>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Get a Quick Estimate</DialogTitle>
            <DialogDescription>
              Text us photos and we'll send you a price range within 30 minutes
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-4">
                <div className="text-center space-y-3">
                  <div className="text-4xl">📱</div>
                  <p className="font-semibold text-lg">Text: 437-545-0067</p>
                  <p className="text-sm text-gray-600">
                    Send photos of what needs fixing
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">What to include:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Clear photos from multiple angles</li>
                <li>✓ Brief description of the issue</li>
                <li>✓ Your location (neighborhood)</li>
                <li>✓ When you need it done</li>
              </ul>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full"
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
          <Button 
            size="lg" 
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <Users className="mr-2 h-5 w-5" />
            <span className="hidden sm:inline">Get Bids</span>
            <span className="sm:hidden">Bids</span>
          </Button>
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
                <Card className="p-3">
                  <p className="text-sm font-medium">✓ Electrical work (ESA required)</p>
                </Card>
                <Card className="p-3">
                  <p className="text-sm font-medium">✓ Gas appliances (TSSA required)</p>
                </Card>
                <Card className="p-3">
                  <p className="text-sm font-medium">✓ Major plumbing (306A required)</p>
                </Card>
                <Card className="p-3">
                  <p className="text-sm font-medium">✓ Projects over 4 hours</p>
                </Card>
                <Card className="p-3">
                  <p className="text-sm font-medium">✓ Unclear scope needing assessment</p>
                </Card>
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
  );
}