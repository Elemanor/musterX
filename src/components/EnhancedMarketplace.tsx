import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  DollarSign, Users, Calculator, Heart, Info, TrendingUp, 
  Sparkles, Shield, Clock, Star, ArrowRight, Toggle, 
  Package, Zap, CheckCircle
} from 'lucide-react';
import { MarketplaceBidding } from './MarketplaceBidding';
import { ServiceBrowser } from './ServiceBrowser';
import { NameYourPriceRequest } from './NameYourPriceRequest';

interface EnhancedMarketplaceProps {
  defaultMode?: 'standard' | 'name-your-price';
}

export function EnhancedMarketplace({ defaultMode = 'standard' }: EnhancedMarketplaceProps) {
  const [pricingMode, setPricingMode] = useState<'standard' | 'name-your-price'>(defaultMode);
  const [showComparison, setShowComparison] = useState(false);

  const handleNameYourPriceSubmit = (data: any) => {
    console.log('Name Your Price submission:', data);
    // This would send to backend with both user price and market price
    // Contractors see both and can decide to accept or counter
  };

  return (
    <div className="space-y-8">
      {/* Pricing Mode Toggle */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Choose Your Pricing Method</h2>
            <p className="text-gray-600">
              Get competitive bids or set your own budget - you're in control!
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={pricingMode === 'standard' ? 'default' : 'outline'}
              onClick={() => setPricingMode('standard')}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Market Pricing
            </Button>
            <Button
              variant={pricingMode === 'name-your-price' ? 'default' : 'outline'}
              onClick={() => setPricingMode('name-your-price')}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Name Your Price
            </Button>
          </div>
        </div>

        {/* Mode Description */}
        <div className="mt-4 p-4 bg-white rounded-lg">
          {pricingMode === 'standard' ? (
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Market-Based Pricing</h3>
                <p className="text-sm text-gray-600">
                  Post your job and receive competitive bids from multiple handymen. 
                  Compare prices, ratings, and choose the best offer.
                </p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    2-4 quotes
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Competitive rates
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Compare options
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Name Your Price</h3>
                <p className="text-sm text-gray-600">
                  Set your budget upfront. We'll show you market rates for reference, 
                  but you decide what you're comfortable paying. Perfect for students and budget-conscious customers!
                </p>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    Your budget
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    No surprises
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    All services
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Show Comparison Button */}
        <div className="text-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComparison(!showComparison)}
          >
            <Info className="h-4 w-4 mr-2" />
            {showComparison ? 'Hide' : 'Show'} Pricing Comparison
          </Button>
        </div>
      </div>

      {/* Pricing Comparison */}
      {showComparison && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Market-Based Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium">Best for complex jobs</p>
                  <p className="text-sm text-gray-600">Get multiple perspectives and solutions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium">Competitive pricing</p>
                  <p className="text-sm text-gray-600">Market forces ensure fair rates</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium">Compare handymen</p>
                  <p className="text-sm text-gray-600">Choose based on ratings and experience</p>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded text-sm">
                <strong>Example:</strong> TV mounting job receives bids of $80, $95, $110 - you choose the $95 bid from a 5-star handyman
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-500" />
                Name Your Price
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium">Best for simple tasks</p>
                  <p className="text-sm text-gray-600">Quick jobs with clear scope</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium">Budget control</p>
                  <p className="text-sm text-gray-600">Never pay more than you're comfortable with</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <div>
                  <p className="font-medium">No awkward negotiations</p>
                  <p className="text-sm text-gray-600">Price is set upfront</p>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded text-sm">
                <strong>Example:</strong> Market rate for changing lightbulbs is $30-40, but you offer $25 - a nearby handyman accepts!
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Based on Mode */}
      {pricingMode === 'standard' ? (
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Services</TabsTrigger>
            <TabsTrigger value="post">Post a Job</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <ServiceBrowser />
          </TabsContent>

          <TabsContent value="post">
            <MarketplaceBidding />
          </TabsContent>
        </Tabs>
      ) : (
        <div>
          {/* Name Your Price Interface */}
          <NameYourPriceRequest onSubmit={handleNameYourPriceSubmit} embedded={true} />
        </div>
      )}

      {/* How Contractors See It */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5 text-yellow-600" />
            How It Works for Handymen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pricingMode === 'standard' ? (
              <>
                <p className="text-sm">
                  <strong>Standard Mode:</strong> Handymen see your job request and submit competitive bids. 
                  They can highlight their experience, ratings, and availability to win your business.
                </p>
                <div className="p-3 bg-white rounded">
                  <p className="text-xs text-gray-600">
                    Example view: "Customer needs TV mounted in condo. 55 inch TV, concrete wall. 
                    Photos attached. Requesting quotes."
                  </p>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm">
                  <strong>Name Your Price Mode:</strong> Handymen see both your offered price AND the typical market rate. 
                  They can accept your price, suggest an alternative, or pass. This transparency helps everyone!
                </p>
                <div className="p-3 bg-white rounded">
                  <p className="text-xs text-gray-600">
                    Example view: "Customer needs 3 lightbulbs changed. Market rate: $30-40. 
                    Customer's budget: $25. Location: 5 min away. [Accept] [Counter] [Pass]"
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="grid md:grid-cols-4 gap-4 text-center">
        <Card>
          <CardContent className="pt-6">
            <Shield className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <p className="font-semibold">All Verified</p>
            <p className="text-sm text-gray-600">WSIB & Licensed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <p className="font-semibold">150+ Handymen</p>
            <p className="text-sm text-gray-600">Ready to help</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <p className="font-semibold">4.8★ Average</p>
            <p className="text-sm text-gray-600">2,500+ reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Clock className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <p className="font-semibold">Fast Response</p>
            <p className="text-sm text-gray-600">Usually &lt; 30 min</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}