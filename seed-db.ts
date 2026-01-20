import { db } from '@/lib/db'

async function seed() {
  console.log('Starting database seed...')

  try {
    // Check existing data
    const existingVehicles = await db.vehicle.findMany()
    const existingMenuItems = await db.menuItem.findMany()
    console.log('Existing vehicles:', existingVehicles.length)
    console.log('Existing menu items:', existingMenuItems.length)

    // Only seed if empty
    if (existingVehicles.length === 0) {
      console.log('Seeding vehicles...')
      
      // Add sample vehicle data
      const vehicles = [
        {
          name: 'Spenza Executive Sedan',
          category: 'Sedan',
          price: 45000,
          year: 2024,
          mileage: 'New',
          fuel: 'Hybrid',
          transmission: 'Automatic',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
          features: JSON.stringify(['Premium Leather', 'Advanced Safety', 'Panoramic Roof', 'Wireless Charging']),
          specsEngine: '2.5L 4-Cylinder Hybrid',
          specsHp: 252,
          specsTorque: '232 lb-ft',
          specsAcceleration: '6.2s (0-60)',
          specsFuelEconomy: '42 MPG',
          specsTransmission: '8-Speed Automatic',
          specsDrivetrain: 'FWD',
          specsFuelTank: '13.2 gal',
          specsSeating: 5,
          specsCargo: '16.1 cu ft',
          description: 'The Spenza Executive Sedan represents pinnacle of luxury and efficiency. Combining a sophisticated hybrid powertrain with premium materials and cutting-edge technology, this sedan delivers an exceptional driving experience.',
          gallery: JSON.stringify([
            'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
            'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80'
          ]),
          colors: JSON.stringify(['Midnight Black', 'Pearl White', 'Silver Mist']),
          popular: true,
          isNew: true
        },
        {
          name: 'Spenza Luxury SUV',
          category: 'SUV',
          price: 52000,
          year: 2024,
          mileage: 'New',
          fuel: 'Hybrid',
          transmission: 'Automatic',
          image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
          features: JSON.stringify(['7-Seat Config', 'AWD System', 'Panoramic Roof']),
          specsEngine: '3.5L V6 Hybrid',
          specsHp: 295,
          specsTorque: '267 lb-ft',
          specsAcceleration: '6.8s (0-60)',
          specsFuelEconomy: '38 MPG',
          specsTransmission: '8-Speed Automatic',
          specsDrivetrain: 'AWD',
          specsFuelTank: '17.9 gal',
          specsSeating: 7,
          specsCargo: '18.3 cu ft',
          description: 'The Spenza Luxury SUV offers unparalleled versatility and comfort. With available 7-passenger seating, advanced AWD system, and premium materials throughout, it\'s the perfect family vehicle.',
          gallery: JSON.stringify([
            'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80'
          ]),
          colors: JSON.stringify(['Onyx Black', 'Diamond White', 'Forest Green']),
          popular: true,
          isNew: true
        }
      ]

      for (const vehicle of vehicles) {
        await db.vehicle.create({
          data: vehicle
        })
        console.log(`Created vehicle: ${vehicle.name}`)
      }

      console.log(`Seeded ${vehicles.length} vehicles`)
    }

    if (existingMenuItems.length === 0) {
      console.log('Seeding menu items...')
      
      const menuItems = [
        {
          name: 'Tuna Tartare',
          description: 'Fresh ahi tuna, avocado mousse, sesame crisps, ponzu sauce',
          price: 18,
          category: 'Appetizers',
          popular: true,
          spicy: false
        },
        {
          name: 'Crispy Calamari',
          description: 'Lightly fried calamari, marinara sauce, lemon aioli',
          price: 16,
          category: 'Appetizers',
          popular: false,
          spicy: false
        },
        {
          name: 'Burrata Caprese',
          description: 'Fresh burrata, heirloom tomatoes, basil oil, aged balsamic',
          price: 17,
          category: 'Appetizers',
          popular: true,
          spicy: false
        },
        {
          name: 'Signature Ribeye Steak',
          description: 'Prime-cut ribeye, house seasoning, herb butter, truffle fries',
          price: 55,
          category: 'Mains',
          popular: true,
          spicy: false
        },
        {
          name: 'Truffle Mushroom Risotto',
          description: 'Arborio rice, wild mushrooms, black truffle oil, parmesan',
          price: 32,
          category: 'Mains',
          popular: true,
          spicy: false
        },
        {
          name: 'Pan-Seared Salmon Fillet',
          description: 'Atlantic salmon, lemon caper sauce, asparagus, wild rice',
          price: 38,
          category: 'Seafood',
          popular: true,
          spicy: false
        },
        {
          name: 'Tiramisu',
          description: 'Classic Italian dessert, espresso-soaked ladyfingers, mascarpone',
          price: 12,
          category: 'Desserts',
          popular: true,
          spicy: false
        }
      ]

      for (const item of menuItems) {
        await db.menuItem.create({
          data: item
        })
        console.log(`Created menu item: ${item.name}`)
      }

      console.log(`Seeded ${menuItems.length} menu items`)
    }

    console.log('Seed completed!')
  } catch (error) {
    console.error('Seed error:', error)
  }
}

seed()
