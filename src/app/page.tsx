'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Car, Utensils, Phone, Mail, MapPin, Clock, ArrowRight, Star, Menu, ChevronLeft, ChevronRight, Shield, Award, Heart, Sparkles, Settings } from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const vehicles = [
    {
      id: 1,
      name: 'Luxury Sedan Collection',
      category: 'Sedan',
      price: 'Starting at $45,000',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      features: ['Premium Leather', 'Advanced Safety', 'Hybrid Option']
    },
    {
      id: 2,
      name: 'Premium SUV Series',
      category: 'SUV',
      price: 'Starting at $52,000',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
      features: ['7-Seat Config', 'AWD System', 'Panoramic Roof']
    },
    {
      id: 3,
      name: 'Performance Sports',
      category: 'Sports',
      price: 'Starting at $65,000',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
      features: ['V8 Engine', 'Track Mode', 'Carbon Fiber']
    },
    {
      id: 4,
      name: 'Executive Trucks',
      category: 'Truck',
      price: 'Starting at $48,000',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
      features: ['Towing Package', 'Heavy Duty', 'Comfort Interior']
    }
  ]

  const menuItems = [
    {
      name: 'Signature Grilled Ribeye',
      description: 'Prime-cut steak, house seasoning, herb butter',
      price: '$45',
      category: 'Mains'
    },
    {
      name: 'Truffle Mushroom Risotto',
      description: 'Arborio rice, wild mushrooms, black truffle oil',
      price: '$28',
      category: 'Mains'
    },
    {
      name: 'Seared Salmon Fillet',
      description: 'Atlantic salmon, lemon caper sauce, vegetables',
      price: '$38',
      category: 'Mains'
    },
    {
      name: 'Lobster Thermidor',
      description: 'Whole lobster, cream sauce, gratin topping',
      price: '$58',
      category: 'Specialties'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Business Executive',
      content: 'Spenza Motors delivered exactly what I needed - a reliable luxury vehicle with exceptional service. The restaurant was the perfect cherry on top!',
      rating: 5
    },
    {
      name: 'James Rodriguez',
      role: 'Restaurant Enthusiast',
      content: 'The dining experience at Spenza Motors restaurant is unmatched. Coupled with their premium vehicle selection, it\'s a one-of-a-kind destination.',
      rating: 5
    },
    {
      name: 'Emily Chen',
      role: 'Loyal Customer',
      content: 'I\'ve purchased three vehicles from Spenza Motors and each experience has been flawless. Their team goes above and beyond.',
      rating: 5
    }
  ]

  const services = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Premium Protection',
      description: 'Comprehensive warranty packages and extended coverage plans for peace of mind'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Certified Pre-Owned',
      description: 'Rigorous 150-point inspection on all pre-owned vehicles'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Financing Solutions',
      description: 'Flexible financing options tailored to your budget and lifestyle'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Concierge Service',
      description: 'Personalized vehicle delivery and white-glove customer experience'
    }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Spenza Motors</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('dealership')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Vehicles
            </button>
            <button
              onClick={() => scrollToSection('restaurant')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Restaurant
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/vehicles">
              <Button variant="outline" size="sm">
                Find Vehicle
              </Button>
            </Link>
            <Link href="/reservation">
              <Button size="sm">
                Reserve Table
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('dealership')}
                  className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Vehicles
                </button>
                <button
                  onClick={() => scrollToSection('restaurant')}
                  className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Restaurant
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Reviews
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-left text-sm font-medium hover:text-primary transition-colors py-2"
                >
                  Contact
                </button>
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/vehicles" className="w-full">
                    <Button variant="outline" className="w-full">
                      Find Vehicle
                    </Button>
                  </Link>
                  <Link href="/reservation" className="w-full">
                    <Button className="w-full">
                      Reserve Table
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative container px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            We Deliver, You Drive
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Experience premium automotive excellence combined with exceptional dining at Spenza Motors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/vehicles">
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 text-base px-8 py-6 h-auto"
              >
                <Car className="mr-2 h-5 w-5" />
                Explore Vehicles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 h-auto"
              >
                <Utensils className="mr-2 h-5 w-5" />
                View Restaurant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Two Worlds, One Exceptional Experience
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                At Spenza Motors, we believe that luxury shouldn't be compartmentalized. That's why we've brought together two premium experiences under one roof: a world-class car dealership and an exquisite restaurant.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Whether you're searching for your next dream vehicle or looking to savor gourmet cuisine, our dedicated teams are committed to delivering excellence at every touchpoint.
              </p>
              <div className="flex gap-8 mt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">5,000+</div>
                  <div className="text-sm text-muted-foreground">Vehicles Sold</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
                alt="Luxury Car"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dealership Section */}
      <section id="dealership" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">Our Vehicles</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Premium Vehicle Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our curated selection of luxury vehicles, each rigorously inspected and maintained to the highest standards
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4">{vehicle.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{vehicle.name}</CardTitle>
                  <CardDescription className="text-base font-semibold text-primary">
                    {vehicle.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center">
                        <Sparkles className="h-3 w-3 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/vehicles/${vehicle.id}`} className="w-full">
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/vehicles">
              <Button size="lg" className="px-8">
                View All Vehicles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Restaurant Section */}
      <section id="restaurant" className="py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4" variant="secondary">Spenza Motors Restaurant</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Culinary Excellence Meets Automotive Luxury
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                While browsing our vehicle collection, treat yourself to an unforgettable dining experience. Our restaurant offers a sophisticated atmosphere with gourmet cuisine crafted from the finest ingredients.
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Perfect for business meetings, family celebrations, or simply enjoying a meal in style. Our award-winning chefs create dishes that are as exceptional as our vehicles.
              </p>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-semibold">Featured Menu Items</h3>
                {menuItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b pb-4">
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <span className="font-semibold text-primary">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/menu" className="flex-1">
                  <Button size="lg" className="flex-1">
                    <Utensils className="mr-2 h-5 w-5" />
                    View Full Menu
                  </Button>
                </Link>
                <Link href="/reservation" className="flex-1">
                  <Button size="lg" variant="outline" className="flex-1">
                    Make Reservation
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Fine Dining"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Spenza Motors
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We go beyond the ordinary to deliver exceptional experiences in both automotive and dining services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4" variant="secondary">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
          </div>

          <Card className="bg-muted/30">
            <CardContent className="pt-8 pb-8">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-xl text-center font-medium mb-8">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="text-center">
                <div className="font-semibold text-lg">{testimonials[currentTestimonial].name}</div>
                <div className="text-muted-foreground">{testimonials[currentTestimonial].role}</div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex gap-2 items-center">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentTestimonial ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4" variant="secondary">Contact Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get in Touch
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Have questions about our vehicles or want to make a reservation? We'd love to hear from you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-muted-foreground">123 Automotive Boulevard<br />Luxury District, LD 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@spenzamotors.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Dealership: Mon-Sat 9AM - 8PM<br />
                      Restaurant: Daily 11AM - 10PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">
                      Phone
                    </label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="interest" className="text-sm font-medium">
                      I'm Interested In
                    </label>
                    <select
                      id="interest"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select an option</option>
                      <option value="vehicle">Purchasing a Vehicle</option>
                      <option value="restaurant">Restaurant Reservation</option>
                      <option value="both">Both</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you..."
                      className="min-h-32"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4 mt-auto">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Car className="h-6 w-6" />
                <span className="text-xl font-bold">Spenza Motors</span>
              </div>
              <p className="text-primary-foreground/80 mb-4">
                Premium automotive excellence meets fine dining. Experience luxury like never before.
              </p>
              <p className="text-sm text-primary-foreground/60">
                © 2024 Spenza Motors. All rights reserved.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('dealership')}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Vehicles
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('restaurant')}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Restaurant
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    Services
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <span className="text-primary-foreground/80">New Vehicles</span>
                </li>
                <li>
                  <span className="text-primary-foreground/80">Pre-Owned</span>
                </li>
                <li>
                  <span className="text-primary-foreground/80">Financing</span>
                </li>
                <li>
                  <span className="text-primary-foreground/80">Fine Dining</span>
                </li>
                <li>
                  <span className="text-primary-foreground/80">Private Events</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span className="text-primary-foreground/80">info@spenzamotors.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-primary-foreground/80">123 Automotive Blvd</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-primary-foreground/20">
                <Link href="/admin" className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  <Settings className="h-4 w-4" />
                  Admin Panel
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-sm text-primary-foreground/60">
              We Deliver, You Drive™ — Spenza Motors
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
