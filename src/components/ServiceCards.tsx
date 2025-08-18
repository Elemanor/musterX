import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Home, Building2, Briefcase, Wrench, Zap, Droplets, Hammer, PaintBucket, Shield, Square, DoorOpen, Package } from 'lucide-react';

const spaceTypes = [
  {
    icon: Home,
    title: "House",
    description: "Repairs, installs, weatherproofing, furniture/TV mounting.",
    features: ["Full property access", "Flexible scheduling", "All repair types"]
  },
  {
    icon: Building2,
    title: "Condo",
    description: "COI on request, elevator bookings handled, protection mats/guards.",
    features: ["COI provided", "Elevator booking", "Building compliance"]
  },
  {
    icon: Briefcase,
    title: "Office",
    description: "Desks and sit-stand builds, whiteboards, signage, cable tidy, occupancy tweaks.",
    features: ["After-hours available", "WSIB clearance", "Commercial ready"]
  }
];

const services = [
  {
    icon: Droplets,
    title: "Plumbing & Drains (minor)",
    description: "Faucet/toilet repairs, P-traps, supply lines, re-caulk tubs/showers.",
    note: "Main drains/backups? We coordinate a 306A plumber",
    badge: "Minor repairs only"
  },
  {
    icon: Zap,
    title: "Electrical & Fixtures",
    description: "Light fixtures, dimmers/switches, outlets/USB, smart thermostats.",
    note: "Performed by or under permit of an ESA-Licensed Electrical Contractor",
    badge: "ESA Licensed"
  },
  {
    icon: Hammer,
    title: "Carpentry & Installs",
    description: "Shelving, closet systems, trim, door plane & latch fixes, cabinet pulls.",
    badge: "Same-day available"
  },
  {
    icon: PaintBucket,
    title: "Walls & Paint",
    description: "Drywall patches, texture blend, repaint touch-ups.",
    badge: "Color matching"
  },
  {
    icon: Shield,
    title: "Caulking & Weatherproofing",
    description: "Bath/kitchen re-caulk, exterior gaps, door weatherstrip.",
    badge: "Prevent damage"
  },
  {
    icon: Square,
    title: "Tile & Flooring (minor)",
    description: "Single cracked-tile swap, small grout re-do, thresholds.",
    badge: "Small repairs"
  },
  {
    icon: DoorOpen,
    title: "Doors/Windows/Hardware",
    description: "Locksets, closers, strikes, window latches (no glazing).",
    badge: "Security upgrades"
  },
  {
    icon: Package,
    title: "Furniture & Mounting",
    description: "Desks, sit-stand setups, TVs, whiteboards, glassboards.",
    badge: "Professional install"
  }
];

export function ServiceCards() {
  return (
    <div className="space-y-12">
      {/* Space Type Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {spaceTypes.map((space, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <space.icon className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl">{space.title}</CardTitle>
              <CardDescription>{space.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {space.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service Directory */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <service.icon className="h-8 w-8 text-primary" />
                {service.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {service.badge}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg mt-3">{service.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-gray-600">{service.description}</p>
              {service.note && (
                <p className="text-xs text-muted-foreground italic border-l-2 border-primary/20 pl-2">
                  {service.note}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}