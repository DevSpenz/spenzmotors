"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Utensils,
  CheckCircle,
} from "lucide-react";
import { format, addDays, isWeekend } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";

export default function ReservationPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [occasion, setOccasion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const availableTimes = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
  ];

  const occasions = [
    "Birthday Celebration",
    "Anniversary",
    "Business Meal",
    "Date Night",
    "Family Gathering",
    "Special Occasion",
    "No Special Occasion",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!date || !guests || !time || !name || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate reservation submission
    setSubmitted(true);
    toast.success("Reservation submitted successfully!");

    // Reset form after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
      setDate(undefined);
      setGuests("");
      setTime("");
      setName("");
      setEmail("");
      setPhone("");
      setSpecialRequests("");
      setOccasion("");
    }, 5000);
  };

  const isDateDisabled = (date: Date) => {
    // Disable past dates
    if (date < new Date()) return true;
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Utensils className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">
              Make a Reservation
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Reserve Your Table
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience at Spenza Motors
            Restaurant
          </p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {submitted ? (
            <Card className="border-2 border-primary">
              <CardContent className="pt-8 pb-8 text-center">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Reservation Confirmed!
                </h2>
                <div className="space-y-2 mb-6 text-left max-w-md mx-auto bg-muted/30 p-6 rounded-lg">
                  <p>
                    <strong>Name:</strong> {name}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {date ? format(date, "MMMM d, yyyy") : ""}
                  </p>
                  <p>
                    <strong>Time:</strong> {time}
                  </p>
                  <p>
                    <strong>Party Size:</strong> {guests} guest(s)
                  </p>
                  <p>
                    <strong>Email:</strong> {email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {phone}
                  </p>
                  {occasion && (
                    <p>
                      <strong>Occasion:</strong> {occasion}
                    </p>
                  )}
                </div>
                <p className="text-muted-foreground mb-6">
                  A confirmation email has been sent to your inbox. We look
                  forward to seeing you!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button size="lg">Return to Home</Button>
                  </Link>
                  <Link href="/menu">
                    <Button size="lg" variant="outline">
                      View Menu
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Restaurant Hours</CardTitle>
                  <CardDescription>
                    Please note our operating hours when selecting your
                    reservation time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        Operating Hours
                      </h3>
                      <ul className="space-y-1 text-sm">
                        <li>Monday - Thursday: 11:00 AM - 10:00 PM</li>
                        <li>Friday - Saturday: 11:00 AM - 11:00 PM</li>
                        <li>Sunday: 11:00 AM - 9:00 PM</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Party Information
                      </h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Parties of 6+ require phone confirmation</li>
                        <li>• Large parties (10+) may require deposit</li>
                        <li>• Private dining available for 12+ guests</li>
                        <li>• Children are welcome - high chairs available</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <form onSubmit={handleSubmit}>
                <Card>
                  <CardHeader>
                    <CardTitle>Reservation Details</CardTitle>
                    <CardDescription>
                      Fill out the form below to make your reservation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Date Selection */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-medium">
                          Select Date{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="date"
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date
                                ? format(date, "MMMM d, yyyy")
                                : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              disabled={isDateDisabled}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-medium">
                          Select Time{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <Select value={time} onValueChange={setTime}>
                          <SelectTrigger id="time">
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Choose a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableTimes.map((t) => (
                              <SelectItem key={t} value={t}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Guest Count */}
                    <div className="space-y-2">
                      <label htmlFor="guests" className="text-sm font-medium">
                        Number of Guests{" "}
                        <span className="text-destructive">*</span>
                      </label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger id="guests">
                          <Users className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select party size" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "10+"].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} guest{num !== 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Occasion */}
                    <div className="space-y-2">
                      <label htmlFor="occasion" className="text-sm font-medium">
                        Occasion (Optional)
                      </label>
                      <Select value={occasion} onValueChange={setOccasion}>
                        <SelectTrigger id="occasion">
                          <SelectValue placeholder="Select occasion" />
                        </SelectTrigger>
                        <SelectContent>
                          {occasions.map((occ) => (
                            <SelectItem key={occ} value={occ}>
                              {occ}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <hr className="border-border" />

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="text-sm font-medium"
                            >
                              Full Name{" "}
                              <span className="text-destructive">*</span>
                            </label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="John Doe"
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="text-sm font-medium"
                            >
                              Email <span className="text-destructive">*</span>
                            </label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-sm font-medium"
                          >
                            Phone Number{" "}
                            <span className="text-destructive">*</span>
                          </label>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div className="space-y-2">
                      <label htmlFor="requests" className="text-sm font-medium">
                        Special Requests (Optional)
                      </label>
                      <Textarea
                        id="requests"
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                        className="min-h-24"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" size="lg" className="flex-1">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Confirm Reservation
                      </Button>
                      <Link href="/" className="flex-1">
                        <Button
                          type="button"
                          size="lg"
                          variant="outline"
                          className="w-full"
                        >
                          Cancel
                        </Button>
                      </Link>
                    </div>

                    {/* Help Text */}
                    <p className="text-sm text-muted-foreground text-center">
                      * Required fields. Your reservation is subject to
                      availability. We'll confirm your booking within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
