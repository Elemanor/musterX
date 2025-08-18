import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, Info } from 'lucide-react';

const pricingTiers = [
  {
    title: "Handyman",
    description: "General repairs and installations",
    firstHour: "$95-120",
    per30Min: "$45-60",
    typical: "Most small jobs finish in 1-2 hours",
    included: ["Basic tools", "Minor materials", "Same-day booking"],
    badge: "Most Popular"
  },
  {
    title: "Electrician (ESA LEC)",
    description: "Licensed electrical work",
    firstHour: "$150-180",
    per30Min: "$70-85",
    typical: "Fixture swaps, outlet installs",
    included: ["ESA certification", "Permit coordination", "Safety inspection"],
    badge: "Licensed",
    note: "Electrical work performed by ESA-Licensed Electrical Contractor"
  },
  {
    title: "Plumber (306A)",
    description: "Licensed plumbing services",
    firstHour: "$140-170",
    per30Min: "$65-80",
    typical: "Faucets, toilets, minor repairs",
    included: ["306A license", "Warranty on work", "Emergency available"],
    badge: "Compulsory Trade",
    note: "Substantive plumbing by licensed 306A plumbers"
  },
  {
    title: "Gas (TSSA-certified)",
    description: "Gas appliance and line work",
    firstHour: "$160-190",
    per30Min: "$75-90",
    typical: "Gas range hookups, BBQ lines",
    included: ["TSSA certification", "Safety testing", "Permit handling"],
    badge: "Specialized",
    note: "Gas work by TSSA-certified technicians only"
  }
];

export function PricingTable() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Quick Pricing & Booking</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          <strong>Straightforward model:</strong> first-hour minimum, then billed in <strong>30-minute</strong> increments. 
          Most small jobs finish in <strong>1-2 hours</strong> after photo review.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingTiers.map((tier, index) => (
          <Card key={index} className="relative hover:shadow-lg transition-shadow">
            {tier.badge && (
              <Badge 
                className="absolute -top-3 right-4 px-3 py-1"
                variant={tier.badge === "Most Popular" ? "default" : "secondary"}
              >
                {tier.badge}
              </Badge>
            )}
            <CardHeader className="pt-8">
              <CardTitle className="text-xl">{tier.title}</CardTitle>
              <CardDescription className="text-sm">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">First hour:</span>
                  <span className="font-semibold">{tier.firstHour}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Then per 30 min:</span>
                  <span className="font-semibold">{tier.per30Min}</span>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <p className="text-sm text-muted-foreground mb-2">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {tier.typical}
                </p>
                <ul className="space-y-1">
                  {tier.included.map((item, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="text-green-500 mr-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {tier.note && (
                <div className="pt-3 border-t">
                  <p className="text-xs text-muted-foreground italic flex items-start">
                    <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                    {tier.note}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-center">
            <strong>Note:</strong> Materials, parking, disposal and permits extra. 
            We'll flag permit-likely tasks and help with City of Toronto guidance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}