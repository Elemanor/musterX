import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, Clock, MapPin, Shield, Award, TrendingUp, 
  Camera, Upload, DollarSign, Users, Timer, CheckCircle,
  AlertCircle, Calendar, MessageSquare, Zap, Droplets, Hammer
} from 'lucide-react';

// Mock data for handymen profiles
const mockHandymen = [
  {
    id: 1,
    name: "Mike Chen",
    photo: "/api/placeholder/64/64",
    rating: 4.9,
    reviews: 127,
    badges: ["WSIB Cleared", "ESA Partner", "5+ Years"],
    specialties: ["Electrical", "Plumbing", "Smart Home"],
    responseTime: "< 30 min",
    completedJobs: 856,
    hourlyRate: { min: 95, max: 125 },
    availability: "Available Now",
    distance: "2.3 km",
    bio: "Licensed electrician with 8 years experience. Specialize in smart home installations."
  },
  {
    id: 2,
    name: "Tony Rodriguez",
    photo: "/api/placeholder/64/64",
    rating: 4.8,
    reviews: 98,
    badges: ["WSIB Cleared", "306A Plumber", "Same Day"],
    specialties: ["Plumbing", "Bathroom", "Kitchen"],
    responseTime: "< 1 hour",
    completedJobs: 642,
    hourlyRate: { min: 85, max: 115 },
    availability: "Available in 2 hours",
    distance: "4.1 km",
    bio: "Certified 306A plumber. Fast, reliable service for all plumbing needs."
  },
  {
    id: 3,
    name: "David Park",
    photo: "/api/placeholder/64/64",
    rating: 4.7,
    reviews: 73,
    badges: ["WSIB Cleared", "Condo Specialist"],
    specialties: ["Furniture Assembly", "TV Mounting", "Carpentry"],
    responseTime: "< 45 min",
    completedJobs: 428,
    hourlyRate: { min: 75, max: 95 },
    availability: "Available Now",
    distance: "1.8 km",
    bio: "Your go-to for furniture assembly and mounting. Condo board approved."
  },
  {
    id: 4,
    name: "Alex Kumar",
    photo: "/api/placeholder/64/64",
    rating: 5.0,
    reviews: 45,
    badges: ["WSIB Cleared", "New Pro", "Top Rated"],
    specialties: ["Drywall", "Painting", "General Repairs"],
    responseTime: "< 2 hours",
    completedJobs: 189,
    hourlyRate: { min: 70, max: 90 },
    availability: "Available Tomorrow",
    distance: "5.5 km",
    bio: "Perfectionist with attention to detail. Specializing in drywall and painting."
  }
];

interface ServiceRequest {
  id: string;
  service: string;
  description: string;
  photos: string[];
  urgency: string;
  propertyType: string;
  budget?: string;
  status: 'draft' | 'posted' | 'bidding' | 'assigned' | 'completed';
  bids: Bid[];
  createdAt: Date;
}

interface Bid {
  handymanId: number;
  handyman: typeof mockHandymen[0];
  price: number;
  estimatedTime: string;
  message: string;
  canStartAt: string;
  submittedAt: Date;
}

export function MarketplaceBidding() {
  const [activeRequests, setActiveRequests] = useState<ServiceRequest[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [urgency, setUrgency] = useState('flexible');
  const [propertyType, setPropertyType] = useState('house');
  const [budget, setBudget] = useState('');
  const [viewMode, setViewMode] = useState<'create' | 'active' | 'history'>('create');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmitRequest = () => {
    // Simulate creating a request and getting bids
    const newRequest: ServiceRequest = {
      id: `req_${Date.now()}`,
      service: selectedService,
      description,
      photos: photos.map(p => URL.createObjectURL(p)),
      urgency,
      propertyType,
      budget,
      status: 'bidding',
      bids: generateMockBids(),
      createdAt: new Date()
    };
    
    setActiveRequests([...activeRequests, newRequest]);
    setViewMode('active');
    
    // Reset form
    setSelectedService('');
    setDescription('');
    setPhotos([]);
    setUrgency('flexible');
    setPropertyType('house');
    setBudget('');
  };

  const generateMockBids = (): Bid[] => {
    // Simulate 2-4 bids coming in
    const numBids = Math.floor(Math.random() * 3) + 2;
    const shuffled = [...mockHandymen].sort(() => 0.5 - Math.random());
    
    return shuffled.slice(0, numBids).map(handyman => ({
      handymanId: handyman.id,
      handyman,
      price: Math.floor(Math.random() * 100) + handyman.hourlyRate.min,
      estimatedTime: `${Math.floor(Math.random() * 3) + 1}-${Math.floor(Math.random() * 2) + 2} hours`,
      message: `Hi! I can help with this. I have experience with similar jobs and can start ${handyman.availability.toLowerCase()}.`,
      canStartAt: handyman.availability,
      submittedAt: new Date(Date.now() - Math.random() * 3600000)
    }));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="create">Create Request</TabsTrigger>
          <TabsTrigger value="active" className="relative">
            Active Requests
            {activeRequests.filter(r => r.status === 'bidding').length > 0 && (
              <Badge className="ml-2 px-1.5 py-0.5 text-xs" variant="destructive">
                {activeRequests.filter(r => r.status === 'bidding').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Create Request Tab */}
        <TabsContent value="create" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Post a Job - Get Multiple Bids</CardTitle>
              <CardDescription>
                Describe your job and receive competitive bids from verified handymen
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service Selection */}
              <div className="grid gap-2">
                <Label htmlFor="service">What do you need done?</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">
                      <div className="flex items-center">
                        <Droplets className="h-4 w-4 mr-2" />
                        Plumbing & Drains
                      </div>
                    </SelectItem>
                    <SelectItem value="electrical">
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        Electrical & Lighting
                      </div>
                    </SelectItem>
                    <SelectItem value="carpentry">
                      <div className="flex items-center">
                        <Hammer className="h-4 w-4 mr-2" />
                        Carpentry & Furniture
                      </div>
                    </SelectItem>
                    <SelectItem value="general">General Repairs</SelectItem>
                    <SelectItem value="painting">Walls & Painting</SelectItem>
                    <SelectItem value="mounting">TV & Furniture Mounting</SelectItem>
                    <SelectItem value="smart-home">Smart Home Setup</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Describe the job in detail</Label>
                <Textarea
                  id="description"
                  placeholder="e.g., I need to mount a 65-inch TV on a brick wall in my living room. The TV weighs about 50 lbs and I already have the mounting bracket..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Photo Upload */}
              <div className="grid gap-2">
                <Label htmlFor="photos">Add photos (recommended)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Photos help handymen provide accurate bids
                  </p>
                  <Input
                    id="photos"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.getElementById('photos')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select Photos
                  </Button>
                  {photos.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      {photos.length} photo(s) selected
                    </p>
                  )}
                </div>
              </div>

              {/* Urgency and Property Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="urgency">When do you need this done?</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger id="urgency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent (Today)</SelectItem>
                      <SelectItem value="soon">Within 2-3 days</SelectItem>
                      <SelectItem value="week">This week</SelectItem>
                      <SelectItem value="flexible">I'm flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="property">Property type</Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger id="property">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Budget (Optional) */}
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget range (optional)</Label>
                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Help handymen understand your budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-100">Under $100</SelectItem>
                    <SelectItem value="100-250">$100 - $250</SelectItem>
                    <SelectItem value="250-500">$250 - $500</SelectItem>
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="over-1000">Over $1,000</SelectItem>
                    <SelectItem value="quote">Need quote first</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button 
                className="w-full" 
                size="lg"
                disabled={!selectedService || !description}
                onClick={handleSubmitRequest}
              >
                <Users className="mr-2 h-5 w-5" />
                Post Job & Get Bids
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                You'll typically receive 2-4 bids within 30 minutes
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Requests Tab */}
        <TabsContent value="active" className="space-y-6">
          {activeRequests.filter(r => r.status === 'bidding').length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active requests</h3>
                  <p className="text-muted-foreground mb-4">
                    Post a job to start receiving bids from handymen
                  </p>
                  <Button onClick={() => setViewMode('create')}>
                    Create Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            activeRequests.filter(r => r.status === 'bidding').map(request => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{request.service}</CardTitle>
                      <CardDescription>{request.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">
                      {request.bids.length} Bids Received
                    </Badge>
                  </div>
                  <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Posted {new Date(request.createdAt).toLocaleTimeString()}
                    </span>
                    <span className="flex items-center">
                      <Timer className="h-3 w-3 mr-1" />
                      {request.urgency}
                    </span>
                    {request.budget && (
                      <span className="flex items-center">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {request.budget}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h4 className="font-medium mb-3">Bids from Handymen:</h4>
                    {request.bids.map((bid, idx) => (
                      <Card key={idx} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <img
                                src={bid.handyman.photo}
                                alt={bid.handyman.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h5 className="font-semibold">{bid.handyman.name}</h5>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm ml-1">{bid.handyman.rating}</span>
                                    <span className="text-sm text-muted-foreground ml-1">
                                      ({bid.handyman.reviews} reviews)
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mb-2">
                                  {bid.handyman.badges.map((badge, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {badge}
                                    </Badge>
                                  ))}
                                  <span className="text-xs text-muted-foreground">
                                    • {bid.handyman.distance} away
                                  </span>
                                </div>

                                <p className="text-sm text-gray-600 mb-3">{bid.message}</p>

                                <div className="flex items-center gap-4 text-sm">
                                  <span className="flex items-center">
                                    <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                                    <strong>${bid.price}</strong>
                                  </span>
                                  <span className="flex items-center text-muted-foreground">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {bid.estimatedTime}
                                  </span>
                                  <span className="flex items-center text-muted-foreground">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {bid.canStartAt}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm">Accept Bid</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Accept {bid.handyman.name}'s Bid?</DialogTitle>
                                    <DialogDescription>
                                      You're about to accept this bid for ${bid.price}. 
                                      The handyman will be notified and will contact you to confirm timing.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4 pt-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <h5 className="font-medium mb-2">Bid Summary:</h5>
                                      <div className="space-y-1 text-sm">
                                        <p>Handyman: {bid.handyman.name}</p>
                                        <p>Price: ${bid.price}</p>
                                        <p>Time Estimate: {bid.estimatedTime}</p>
                                        <p>Can Start: {bid.canStartAt}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-3">
                                      <Button className="flex-1">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Confirm & Accept
                                      </Button>
                                      <Button variant="outline" className="flex-1">
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No completed jobs yet</h3>
                <p className="text-muted-foreground">
                  Your completed jobs will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}