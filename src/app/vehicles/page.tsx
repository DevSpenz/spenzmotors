'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { ArrowLeft, Car, Search, SlidersHorizontal, Sparkles, Fuel, Gauge, Shield, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Vehicle {
  id: string
  name: string
  category: string
  price: number
  year: number
  mileage: string
  fuel: string
  transmission: string
  image: string
  features: string[]
  specs: {
    engine: string
    hp: number
    torque: string
    acceleration: string
    fuelEconomy: string
    transmission: string
    drivetrain: string
    fuelTank: string
    seating: number
    cargo: string
  }
  colors: string[]
  description: string
  gallery: string[]
  popular: boolean
  isNew: boolean
}

export default function VehiclesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFuelType, setSelectedFuelType] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [showFilters, setShowFilters] = useState(false)
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const res = await fetch('/api/vehicles')
      const data = await res.json()
      setVehicles(data)
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ['all', 'Sedan', 'SUV', 'Sports', 'Truck']
  const fuelTypes = ['all', 'Gasoline', 'Hybrid', 'Electric', 'Diesel']

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || vehicle.category === selectedCategory
    const matchesFuel = selectedFuelType === 'all' || vehicle.fuel === selectedFuelType
    const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesFuel && matchesPrice
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price)
  }

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
            <Car className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Spenza Motors</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-16 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Vehicle Collection
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Explore our premium selection of vehicles, each rigorously inspected and maintained to highest standards
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 border-b bg-muted/30">
        <div className="container max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search vehicles by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
                disabled={loading}
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
            <div className="text-sm text-muted-foreground">
              Showing {filteredVehicles.length} of {vehicles.length} vehicles
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid md:grid-cols-3 gap-6 p-6 bg-background rounded-lg border">
              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === 'all' ? 'All Categories' : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fuel Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Fuel Type</label>
                <Select value={selectedFuelType} onValueChange={setSelectedFuelType} disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Fuel Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel === 'all' ? 'All Fuel Types' : fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                </label>
                <Slider
                  min={0}
                  max={100000}
                  step={5000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                  disabled={loading}
                />
              </div>

              {/* Clear Filters Button */}
              <div className="md:col-span-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                    setSelectedFuelType('all')
                    setPriceRange([0, 100000])
                  }}
                  className="w-full md:w-auto"
                  disabled={loading}
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-12 px-4">
        <div className="container max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <Loader2 className="h-16 w-16 animate-spin text-muted-foreground mx-auto mb-4" />
              <p className="text-lg">Loading vehicles...</p>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedFuelType('all')
                  setPriceRange([0, 100000])
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge variant="secondary">{vehicle.category}</Badge>
                      {vehicle.isNew && (
                        <Badge className="bg-primary text-primary-foreground">New</Badge>
                      )}
                    </div>
                    {vehicle.popular && (
                      <Badge className="absolute top-4 right-4 flex items-center gap-1">
                        <Sparkles className="h-3 w-3 fill-current" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="flex-1">
                    <CardTitle className="text-lg line-clamp-1">{vehicle.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <span className="font-semibold text-primary text-lg">
                        {formatPrice(vehicle.price)}
                      </span>
                      <span>•</span>
                      <span>{vehicle.year}</span>
                      <span>•</span>
                      <span>{vehicle.mileage}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <Fuel className="h-4 w-4 mx-auto mb-1" />
                        <div className="font-semibold">{vehicle.specs.fuelEconomy}</div>
                      </div>
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <Gauge className="h-4 w-4 mx-auto mb-1" />
                        <div className="font-semibold">{vehicle.specs.hp} HP</div>
                      </div>
                      <div className="text-center p-2 bg-muted/30 rounded">
                        <Shield className="h-4 w-4 mx-auto mb-1" />
                        <div className="font-semibold">{vehicle.specs.acceleration}</div>
                      </div>
                    </div>

                    {/* Features Preview */}
                    <div className="flex flex-wrap gap-1">
                      {vehicle.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {vehicle.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{vehicle.features.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* View Details Button */}
                    <Link href={`/vehicles/${vehicle.id}`} className="block w-full">
                      <Button className="w-full">
                        View Details
                        <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
