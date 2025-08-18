import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Heart, Lightbulb, PaintBucket, Hammer, Home, DollarSign, 
  HelpCircle, Sparkles, HandHeart, School, Coffee, Zap,
  Info, ArrowRight, Check, Calculator, Upload, Camera
} from 'lucide-react';

// Common small jobs that students/renters often need
const commonSmallJobs = [
  { 
    id: 'bulb', 
    name: 'Change a lightbulb', 
    icon: Lightbulb, 
    suggestedPrice: '20-30',
    time: '15 min',
    description: "Even hard-to-reach ones!"
  },
  { 
    id: 'picture', 
    name: 'Hang pictures/posters', 
    icon: Home, 
    suggestedPrice: '25-40',
    time: '30 min',
    description: "Without damaging walls"
  },
  { 
    id: 'furniture', 
    name: 'Assemble furniture', 
    icon: Hammer, 
    suggestedPrice: '40-80',
    time: '1-2 hours',
    description: "IKEA, Amazon, anything!"
  },
  { 
    id: 'shelf', 
    name: 'Install a shelf', 
    icon: Home, 
    suggestedPrice: '35-60',
    time: '45 min',
    description: "Floating or bracket shelves"
  },
  { 
    id: 'paint-touch', 
    name: 'Paint touch-ups', 
    icon: PaintBucket, 
    suggestedPrice: '40-70',
    time: '1 hour',
    description: "Small areas, nail holes"
  },
  { 
    id: 'paint-room', 
    name: 'Paint a room', 
    icon: PaintBucket, 
    suggestedPrice: '150-300',
    time: '4-6 hours',
    description: "Walls only, you provide paint"
  },
  { 
    id: 'drywall', 
    name: 'Patch drywall holes', 
    icon: Home, 
    suggestedPrice: '50-100',
    time: '1-2 hours',
    description: "From tiny to fist-sized"
  },
  { 
    id: 'mold', 
    name: 'Clean mold (small area)', 
    icon: Sparkles, 
    suggestedPrice: '60-120',
    time: '1-2 hours',
    description: "Bathroom/kitchen spots"
  },
  { 
    id: 'caulk', 
    name: 'Re-caulk bathroom', 
    icon: Home, 
    suggestedPrice: '60-100',
    time: '1 hour',
    description: "Tub, shower, sink"
  },
  { 
    id: 'mount-tv', 
    name: 'Mount a TV', 
    icon: Home, 
    suggestedPrice: '80-150',
    time: '1-2 hours',
    description: "Hide cables too!"
  },
  { 
    id: 'unclog', 
    name: 'Unclog a drain', 
    icon: Home, 
    suggestedPrice: '60-120',
    time: '30-90 min',
    description: "Sink, tub, or shower"
  },
  { 
    id: 'custom', 
    name: 'Something else', 
    icon: HelpCircle, 
    suggestedPrice: 'You decide',
    time: 'Varies',
    description: "Describe what you need!"
  }
];

// Price calculator based on task complexity
const calculateSuggestedPrice = (taskType: string, details: any) => {
  const baseRates = {
    'simple': { min: 20, max: 40 },      // 15-30 min jobs
    'basic': { min: 40, max: 80 },       // 30-60 min jobs
    'moderate': { min: 80, max: 150 },   // 1-2 hour jobs
    'complex': { min: 150, max: 300 }    // 2+ hour jobs
  };

  // Adjust based on urgency
  const urgencyMultiplier = details.urgent ? 1.5 : 1;
  
  // Adjust based on time of day
  const afterHoursMultiplier = details.afterHours ? 1.3 : 1;
  
  // Calculate final suggestion
  const range = baseRates[taskType as keyof typeof baseRates] || baseRates.basic;
  return {
    min: Math.round(range.min * urgencyMultiplier * afterHoursMultiplier),
    max: Math.round(range.max * urgencyMultiplier * afterHoursMultiplier)
  };
};

interface NameYourPriceRequestProps {
  onSubmit?: (data: any) => void;
  embedded?: boolean;
}

export function NameYourPriceRequest({ onSubmit, embedded = false }: NameYourPriceRequestProps) {
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [customDescription, setCustomDescription] = useState('');
  const [userPrice, setUserPrice] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState<{min: number, max: number} | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [location, setLocation] = useState('');
  const [showEncouragement, setShowEncouragement] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);
  const [needsAfterHours, setNeedsAfterHours] = useState(false);

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    const job = commonSmallJobs.find(j => j.id === jobId);
    if (job && job.suggestedPrice !== 'You decide') {
      const [min, max] = job.suggestedPrice.split('-').map(p => parseInt(p));
      setSuggestedPrice({ min, max });
      setUserPrice(`${min}`); // Set minimum as default
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    const submissionData = {
      job: selectedJob,
      description: customDescription,
      price: userPrice,
      suggestedPrice: suggestedPrice,
      photos,
      location,
      urgent: isUrgent,
      afterHours: needsAfterHours,
      pricingMode: 'name-your-price'
    };
    
    if (onSubmit) {
      onSubmit(submissionData);
    } else {
      console.log('Submission:', submissionData);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Friendly Header */}
      {!embedded && (
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <HandHeart className="h-8 w-8" />
            <span className="text-2xl font-bold">Name Your Price!</span>
            <HandHeart className="h-8 w-8" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold">
            Set Your Own Budget for Any Service
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From simple fixes to complex repairs - you decide what fits your budget. 
            <strong>We'll show market rates, but you set the price!</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="px-3 py-1">
              <DollarSign className="mr-1 h-3 w-3" />
              Your Budget
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Calculator className="mr-1 h-3 w-3" />
              Market Rates Shown
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Heart className="mr-1 h-3 w-3" />
              No Minimum Charge
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              <Zap className="mr-1 h-3 w-3" />
              All Services
            </Badge>
          </div>
        </div>
      )}

      {/* Encouragement Message */}
      {showEncouragement && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-full">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">First time asking for help? That's totally okay!</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Everyone needs help sometimes. Whether it's your first apartment, dorm room, or you just 
                  don't have the tools or know-how - that's exactly why we're here. No task is too simple!
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-white px-2 py-1 rounded">✓ Changed 1,000+ lightbulbs</span>
                  <span className="bg-white px-2 py-1 rounded">✓ Assembled 500+ IKEA items</span>
                  <span className="bg-white px-2 py-1 rounded">✓ Helped 300+ students</span>
                  <span className="bg-white px-2 py-1 rounded">✓ No job too small</span>
                </div>
              </div>
              <button 
                onClick={() => setShowEncouragement(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Choose Your Task */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm">1</span>
            What do you need help with?
          </CardTitle>
          <CardDescription>
            Click on any task below, or describe your own. Seriously, anything is fine!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            {commonSmallJobs.map((job) => {
              const Icon = job.icon;
              return (
                <Card 
                  key={job.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedJob === job.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleJobSelect(job.id)}
                >
                  <CardContent className="pt-4 pb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{job.name}</h4>
                        <p className="text-xs text-gray-500 mb-2">{job.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="outline" className="px-1.5 py-0">
                            {job.time}
                          </Badge>
                          {job.suggestedPrice !== 'You decide' && (
                            <span className="text-green-600 font-medium">
                              ${job.suggestedPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Custom Description */}
          {selectedJob && (
            <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
              <Label htmlFor="description">
                Tell us more about it (optional but helpful!)
              </Label>
              <Textarea
                id="description"
                placeholder="E.g., 'I have 3 ceiling lights that need new bulbs but I don't have a ladder' or 'There's a small patch of mold in my bathroom corner' - any details help!"
                rows={3}
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
              />
              
              {/* Photo Upload */}
              <div>
                <Label htmlFor="photos">Add photos (optional - helps with pricing)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Snap a quick photo with your phone
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
                    size="sm"
                    className="mt-2"
                    onClick={() => document.getElementById('photos')?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Photos
                  </Button>
                  {photos.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                      {photos.length} photo(s) selected
                    </p>
                  )}
                </div>
              </div>

              {/* Timing Options */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">I need this done today/ASAP</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needsAfterHours}
                    onChange={(e) => setNeedsAfterHours(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Evening/weekend is better for me</span>
                </label>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Set Your Price */}
      {selectedJob && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm">2</span>
              Name Your Price
            </CardTitle>
            <CardDescription>
              We'll suggest a fair price, but you decide what works for your budget!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Suggestion */}
            {suggestedPrice && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <Calculator className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Our Suggested Price Range:</h4>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      Average Market Rate: ${suggestedPrice.min} - ${suggestedPrice.max}
                    </p>
                    <p className="text-sm text-gray-600">
                      This is what contractors typically charge for this service. 
                      {isUrgent && ' Price adjusted for urgent service.'}
                      {needsAfterHours && ' Price adjusted for after-hours.'}
                      <strong className="block mt-1">But you can offer any price you're comfortable with!</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* User Price Input */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="price" className="text-lg font-semibold mb-2 block">
                  What's your budget for this task?
                </Label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="Enter your price"
                      className="pl-10 text-lg"
                      value={userPrice}
                      onChange={(e) => setUserPrice(e.target.value)}
                    />
                  </div>
                  <span className="text-gray-500">CAD</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  💡 Tip: Being flexible with your budget helps attract more helpers!
                </p>
              </div>

              {/* Quick Price Buttons */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Quick select:</p>
                <div className="flex flex-wrap gap-2">
                  {[20, 30, 40, 50, 75, 100, 150].map(price => (
                    <Button
                      key={price}
                      variant={userPrice === price.toString() ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setUserPrice(price.toString())}
                    >
                      ${price}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Budget Explanation */}
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <strong>How this works:</strong> Handymen will see your budget and can accept it, 
                    or suggest a different price. You're never obligated to accept - it's just the starting point for the conversation!
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Location */}
      {selectedJob && userPrice && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm">3</span>
              Where do you need help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Your location (area or postal code)</Label>
                <Input
                  id="location"
                  placeholder="e.g., Yorkville, M5V 1J2, or near UofT campus"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="type" defaultChecked /> Apartment/Condo
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="type" /> House
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="type" /> Dorm/Student Housing
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm">
                  <input type="radio" name="type" /> Office
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Section */}
      {selectedJob && userPrice && location && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">You're All Set!</h3>
              <p className="text-gray-600">
                Ready to get help with: <strong>{commonSmallJobs.find(j => j.id === selectedJob)?.name}</strong>
                <br />
                Your budget: <strong>${userPrice}</strong>
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="px-8">
                    <Check className="mr-2 h-5 w-5" />
                    Post My Request
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Posted Successfully! 🎉</DialogTitle>
                    <DialogDescription>
                      Your request has been sent to nearby handymen. You'll start receiving responses within minutes!
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold mb-2">What happens next:</h4>
                      <ol className="space-y-2 text-sm">
                        <li>1. Handymen in your area will see your request</li>
                        <li>2. They can accept your price or suggest alternatives</li>
                        <li>3. You choose who to hire (no obligation!)</li>
                        <li>4. They come and help you out!</li>
                      </ol>
                    </div>
                    <Button className="w-full" onClick={() => window.location.href = '/marketplace'}>
                      View My Request
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <p className="text-sm text-gray-500">
                <strong>Remember:</strong> You're in control. You decide who to hire and when!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trust Message */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="font-semibold">Why Students & Renters Love Us</h3>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-2xl mb-1">🎓</div>
                <strong>Student Discounts</strong>
                <p className="text-gray-600">Show your student ID for 10% off</p>
              </div>
              <div>
                <div className="text-2xl mb-1">🏠</div>
                <strong>Renter Friendly</strong>
                <p className="text-gray-600">We know how to avoid damage</p>
              </div>
              <div>
                <div className="text-2xl mb-1">💰</div>
                <strong>Your Budget</strong>
                <p className="text-gray-600">You set the price that works</p>
              </div>
              <div>
                <div className="text-2xl mb-1">😊</div>
                <strong>No Judgment</strong>
                <p className="text-gray-600">Every request is valid</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}