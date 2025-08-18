import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, Filter, TrendingUp, Clock, DollarSign, AlertCircle,
  Zap, Droplets, Hammer, PaintBucket, Square, DoorOpen, 
  Package, Home, Wind, Shield, Wifi, Briefcase, Bath, ChefHat,
  Star, ArrowRight, Info
} from 'lucide-react';
import { 
  serviceCategories, 
  comprehensiveServices, 
  getServicesByCategory,
  searchServices,
  getPopularServices,
  type ServiceItem 
} from '@/data/services-catalog';

const iconMap: Record<string, any> = {
  'Zap': Zap,
  'Droplets': Droplets,
  'Hammer': Hammer,
  'PaintBucket': PaintBucket,
  'Square': Square,
  'DoorOpen': DoorOpen,
  'Package': Package,
  'Home': Home,
  'Wind': Wind,
  'Shield': Shield,
  'Wifi': Wifi,
  'Briefcase': Briefcase,
  'Bath': Bath,
  'Utensils': ChefHat
};

interface ServiceBrowserProps {
  onServiceSelect?: (service: ServiceItem) => void;
}

export function ServiceBrowser({ onServiceSelect }: ServiceBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under100' | '100to200' | 'over200'>('all');
  const [showLicensedOnly, setShowLicensedOnly] = useState(false);

  // Filter services based on search and filters
  const filteredServices = useMemo(() => {
    let services = searchQuery 
      ? searchServices(searchQuery)
      : selectedCategory === 'all' 
        ? comprehensiveServices 
        : getServicesByCategory(selectedCategory);

    // Apply price filter
    if (priceFilter !== 'all') {
      services = services.filter(service => {
        const avgPrice = (service.priceRange.min + service.priceRange.max) / 2;
        switch (priceFilter) {
          case 'under100':
            return avgPrice < 100;
          case '100to200':
            return avgPrice >= 100 && avgPrice <= 200;
          case 'over200':
            return avgPrice > 200;
          default:
            return true;
        }
      });
    }

    // Apply license filter
    if (showLicensedOnly) {
      services = services.filter(service => service.requiresLicense);
    }

    return services;
  }, [searchQuery, selectedCategory, priceFilter, showLicensedOnly]);

  const popularServices = getPopularServices(8);

  return (
    <div className="space-y-8">
      {/* Search Header */}
      <div className="bg-gradient-to-b from-slate-50 to-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Browse All Services</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for any repair or service..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={priceFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPriceFilter('all')}
            >
              All Prices
            </Button>
            <Button
              variant={priceFilter === 'under100' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPriceFilter('under100')}
            >
              Under $100
            </Button>
            <Button
              variant={priceFilter === '100to200' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPriceFilter('100to200')}
            >
              $100-$200
            </Button>
            <Button
              variant={priceFilter === 'over200' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPriceFilter('over200')}
            >
              $200+
            </Button>
          </div>
          <Button
            variant={showLicensedOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowLicensedOnly(!showLicensedOnly)}
          >
            <Shield className="h-4 w-4 mr-2" />
            Licensed Only
          </Button>
        </div>
      </div>

      {/* Popular Services */}
      {!searchQuery && selectedCategory === 'all' && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-orange-500" />
            Most Popular Services
          </h3>
          <div className="grid md:grid-cols-4 gap-3">
            {popularServices.map(service => (
              <Card 
                key={service.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onServiceSelect?.(service)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{service.name}</h4>
                    <div className="flex items-center text-xs text-yellow-600">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="ml-1">{service.popularityScore}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{service.estimatedTime}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      ${service.priceRange.min}-${service.priceRange.max}
                    </span>
                    {service.requiresLicense && (
                      <Badge variant="secondary" className="text-xs">
                        Licensed
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="w-full flex-wrap h-auto p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            All Services ({comprehensiveServices.length})
          </TabsTrigger>
          {serviceCategories.slice(0, 8).map(category => {
            const Icon = iconMap[category.icon] || Package;
            const count = getServicesByCategory(category.id).length;
            return (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Icon className="h-4 w-4 mr-1" />
                {category.name} ({count})
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Found {filteredServices.length} services
              {searchQuery && ` for "${searchQuery}"`}
            </p>
            {selectedCategory !== 'all' && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                Clear category filter
              </Button>
            )}
          </div>

          {/* Service Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map(service => (
              <Card 
                key={service.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onServiceSelect?.(service)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant={service.popularityScore > 80 ? "default" : "secondary"} className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      {service.popularityScore}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Price and Time */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 mr-1 text-green-600" />
                      <span className="font-semibold">
                        ${service.priceRange.min}-${service.priceRange.max}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.estimatedTime}
                    </div>
                  </div>

                  {/* License Requirements */}
                  {service.requiresLicense && (
                    <div className="flex items-start bg-yellow-50 p-2 rounded text-xs">
                      <AlertCircle className="h-3 w-3 mr-1 text-yellow-600 mt-0.5" />
                      <span className="text-yellow-800">
                        Requires: {service.requiresLicense}
                      </span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {service.tags.slice(0, 3).map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full" size="sm">
                    Get Quotes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No services found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filters
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setPriceFilter('all');
                      setShowLicensedOnly(false);
                    }}
                  >
                    Clear all filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Service Categories Overview */}
      {!searchQuery && selectedCategory === 'all' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Browse by Category</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceCategories.map(category => {
              const Icon = iconMap[category.icon] || Package;
              const services = getServicesByCategory(category.id);
              
              return (
                <Card 
                  key={category.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Icon className="h-8 w-8 text-primary" />
                      <Badge variant="secondary">
                        {services.length} services
                      </Badge>
                    </div>
                    <CardTitle className="text-base mt-2">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    {category.requiresLicense && (
                      <div className="flex items-center text-xs text-yellow-600">
                        <Shield className="h-3 w-3 mr-1" />
                        {category.requiresLicense}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}