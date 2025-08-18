import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar, Upload, Phone, MessageSquare, Users } from 'lucide-react';

export function BookingWidget() {
  const [bookingType, setBookingType] = useState<'instant' | 'photos' | 'bids'>('instant');
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotoFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {/* Book Now */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" className="w-full" onClick={() => setBookingType('instant')}>
            <Calendar className="mr-2 h-5 w-5" />
            Book Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Book Same-Day Service</DialogTitle>
            <DialogDescription>
              Choose your 2-hour arrival window and we'll confirm within minutes
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="timeSlot">Select Time Window</Label>
              <Select>
                <SelectTrigger id="timeSlot">
                  <SelectValue placeholder="Choose time window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8am-12pm)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12pm-4pm)</SelectItem>
                  <SelectItem value="evening">Evening (4pm-8pm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Service Address</Label>
              <Input id="address" placeholder="123 Street Name, Toronto" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select>
                <SelectTrigger id="propertyType">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Describe Your Task</Label>
              <Textarea 
                id="description" 
                placeholder="e.g., Replace bathroom faucet, mount TV on wall, patch drywall hole"
                rows={3}
              />
            </div>
            <Button className="w-full">Confirm Booking</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Text Photos */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" variant="secondary" className="w-full" onClick={() => setBookingType('photos')}>
            <MessageSquare className="mr-2 h-5 w-5" />
            Text Photos
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Get a Fast Estimate</DialogTitle>
            <DialogDescription>
              Upload photos and we'll text you back with timing and pricing
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Your Phone Number</Label>
              <Input id="phone" type="tel" placeholder="(416) 555-0123" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="photos">Upload Photos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
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
                  Select Photos
                </Button>
              </div>
              {photoFiles.length > 0 && (
                <p className="text-sm text-gray-600">{photoFiles.length} photo(s) selected</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="photoDescription">Brief Description</Label>
              <Textarea 
                id="photoDescription" 
                placeholder="What needs to be done?"
                rows={2}
              />
            </div>
            <Button className="w-full">Send for Estimate</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Get Bids */}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" variant="outline" className="w-full" onClick={() => setBookingType('bids')}>
            <Users className="mr-2 h-5 w-5" />
            Get Bids (2-3 offers)
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Get Multiple Licensed Bids</DialogTitle>
            <DialogDescription>
              Perfect for regulated work or complex jobs. Receive 2-3 quotes from licensed professionals.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select>
                <SelectTrigger id="jobType">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrical">Electrical (ESA Licensed)</SelectItem>
                  <SelectItem value="plumbing">Plumbing (306A Licensed)</SelectItem>
                  <SelectItem value="gas">Gas Work (TSSA Certified)</SelectItem>
                  <SelectItem value="complex">Complex/Multiple Trades</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select>
                <SelectTrigger id="timeline">
                  <SelectValue placeholder="When do you need this done?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urgent">Urgent (Today/Tomorrow)</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="nextWeek">Next Week</SelectItem>
                  <SelectItem value="flexible">I'm Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bidAddress">Service Address</Label>
              <Input id="bidAddress" placeholder="123 Street Name, Toronto" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bidDescription">Detailed Description</Label>
              <Textarea 
                id="bidDescription" 
                placeholder="Please describe the work needed in detail. Include any specific requirements, existing conditions, or concerns."
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="bidPhotos">Photos (Optional)</Label>
              <Input
                id="bidPhotos"
                type="file"
                multiple
                accept="image/*"
                className="cursor-pointer"
              />
            </div>
            <Button className="w-full">Request Bids</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}