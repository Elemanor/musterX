import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Star, Shield, Clock, Award, MapPin, TrendingUp, Users, CheckCircle } from 'lucide-react';

export function EnhancedHero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [jobsCompleted, setJobsCompleted] = useState(2487);

  const testimonials = [
    { text: "Fixed my condo's electrical issue same day!", author: "Sarah M.", location: "Liberty Village" },
    { text: "Professional, fast, and fair pricing", author: "Mike L.", location: "Yorkville" },
    { text: "They handle all our office repairs", author: "Tech Corp", location: "King West" }
  ];

  const trustMetrics = [
    { icon: Shield, label: "WSIB Insured", value: "$2M Coverage" },
    { icon: Star, label: "Google Rating", value: "4.9/5 Stars" },
    { icon: Clock, label: "Response Time", value: "~47 min" },
    { icon: Award, label: "Jobs Done", value: jobsCompleted.toLocaleString() }
  ];

  const neighborhoods = [
    "Downtown", "Yorkville", "The Annex", "Leslieville", 
    "Beaches", "Liberty Village", "King West", "Distillery",
    "North York", "Etobicoke", "Scarborough", "Mississauga"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setJobsCompleted(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Live indicator */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-800">
              3 handymen active in your area
            </span>
          </div>
        </div>

        {/* Main heading with gradient */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Same-Day Handyman
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-gray-700">
              for Homes, Condos & Offices
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            From quick fixes to complex repairs — professional service with 
            <span className="font-semibold text-blue-600"> transparent pricing</span> and 
            <span className="font-semibold text-green-600"> licensed pros</span> when needed.
          </p>
        </div>

        {/* Animated trust metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-scale-in">
          {trustMetrics.map((metric, index) => (
            <Card 
              key={index} 
              className="p-4 text-center hover-lift bg-white/80 backdrop-blur border-gray-200 hover:border-blue-300 transition-all"
            >
              <metric.icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-600">{metric.label}</p>
            </Card>
          ))}
        </div>

        {/* Service area with animated badges */}
        <div className="mb-8 p-6 bg-white/60 backdrop-blur rounded-2xl border border-gray-200 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Serving Toronto & GTA</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {neighborhoods.map((area, index) => (
              <span 
                key={index}
                className="service-area-badge"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {area}
              </span>
            ))}
          </div>
          <div className="text-center mt-4">
            <a 
              href="https://g.page/masterbuildx" 
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <Star className="h-4 w-4" />
              View our 200+ Google reviews
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full ml-1">
                4.9★
              </span>
            </a>
          </div>
        </div>

        {/* Rotating testimonial */}
        <div className="mb-8 animate-fade-in">
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg font-medium text-gray-900 mb-2">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">{testimonials[currentTestimonial].author}</span>
                  <span>•</span>
                  <span>{testimonials[currentTestimonial].location}</span>
                  <div className="flex gap-1 ml-auto">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Live activity feed */}
        <div className="flex justify-center animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">12 jobs</span> completed today • 
              <span className="font-semibold text-blue-600"> 8 active</span> • 
              Next available in <span className="font-semibold text-green-600">~20 min</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}