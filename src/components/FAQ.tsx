import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Do you work in condos and offices?",
    answer: "Yes. We provide COI, handle elevator bookings, and can work after hours. We include a WSIB eClearance link in your work order.",
    category: "Service Areas"
  },
  {
    question: "Who performs electrical work?",
    answer: "Electrical work for hire in Ontario is performed by or under permit of an ESA-Licensed Electrical Contractor.",
    category: "Licensing"
  },
  {
    question: "Do I need a permit for repairs?",
    answer: "Many small repairs don't; structural or material alterations may. We'll flag and help with City of Toronto guidance.",
    category: "Permits"
  },
  {
    question: "Basement floor drain backing up—what now?",
    answer: "Report to 311 so the City can investigate. The City maintains the service line to the property line; owner is responsible from the line to the house. We coordinate licensed plumbing on the homeowner side.",
    category: "Emergency"
  },
  {
    question: "How does your pricing work?",
    answer: "First-hour minimum, then billed in 30-minute increments. Most small jobs finish in 1-2 hours after photo review. Materials, parking, and permits are extra.",
    category: "Pricing"
  },
  {
    question: "Can you handle emergency repairs?",
    answer: "Yes, we offer same-day service with 2-hour arrival windows. For after-hours emergencies, we have on-call technicians available.",
    category: "Service"
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Quick answers to common questions about our handyman services
        </p>
      </div>

      {faqs.map((faq, index) => (
        <Card 
          key={index}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 text-muted-foreground transition-transform mt-1 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {openIndex === index && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}