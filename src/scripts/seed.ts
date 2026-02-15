import { getPayload } from 'payload'
import config from '@payload-config'

const seedData = async () => {
  console.log('🌟 Starting SafariIndia Database Seed...\n')

  const payload = await getPayload({ config })

  // 1. Create admin user
  console.log('👤 Creating admin user...')
  try {
    const existingAdmin = await payload.find({
      collection: 'users',
      where: { email: { equals: 'admin@safarindia.com' } },
      depth: 0,
    })

    if (existingAdmin.docs.length > 0) {
      console.log('✅ Admin user already exists\n')
    } else {
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@safarindia.com',
          password: 'SafariIndia@2024!',
          name: 'Super Admin',
        },
        draft: true,
      })
      console.log('✅ Admin user created\n')
    }
  } catch (error) {
    console.log('⚠️  Admin user creation skipped:', error)
  }

  // 2. Create destinations
  console.log('📍 Creating destinations...')
  const destinations: {
    name: string
    slug: string
    state: string
    category: string
    isFeatured: boolean
    isActive: boolean
    description: string
  }[] = [
    {
      name: 'Manali',
      slug: 'manali',
      state: 'himachal-pradesh',
      category: 'hill-station',
      isFeatured: true,
      isActive: true,
      description:
        'Nestled in the Beas River valley, Manali is a picturesque hill station known for its snow-capped mountains, lush valleys, and adventure activities.',
    },
    {
      name: 'Goa',
      slug: 'goa',
      state: 'goa',
      category: 'beach',
      isFeatured: true,
      isActive: true,
      description:
        'Famous for its pristine beaches, vibrant nightlife, and Portuguese heritage, Goa offers the perfect blend of relaxation and excitement.',
    },
    {
      name: 'Jaipur',
      slug: 'jaipur',
      state: 'rajasthan',
      category: 'heritage',
      isFeatured: true,
      isActive: true,
      description:
        'The Pink City of Jaipur is a treasure trove of royal palaces, forts, and temples, showcasing the rich heritage of Rajasthan.',
    },
    {
      name: 'Leh-Ladakh',
      slug: 'leh-ladakh',
      state: 'ladakh',
      category: 'adventure',
      isFeatured: true,
      isActive: true,
      description:
        'A land of high passes, ancient monasteries, and breathtaking landscapes, Ladakh offers unparalleled adventure and serenity.',
    },
    {
      name: 'Kerala',
      slug: 'kerala',
      state: 'kerala',
      category: 'beach',
      isFeatured: true,
      isActive: true,
      description:
        "God's Own Country, Kerala is famous for its serene backwaters, lush tea gardens, and rejuvenating ayurvedic treatments.",
    },
    {
      name: 'Andaman & Nicobar',
      slug: 'andaman',
      state: 'andaman-nicobar',
      category: 'beach',
      isFeatured: false,
      isActive: true,
      description:
        'Crystal clear waters, coral reefs, and pristine beaches make Andaman a tropical paradise for beach lovers.',
    },
    {
      name: 'Varanasi',
      slug: 'varanasi',
      state: 'uttar-pradesh',
      category: 'heritage',
      isFeatured: false,
      isActive: true,
      description:
        'One of the oldest living cities in the world, Varanasi is a spiritual capital on the banks of the sacred Ganges.',
    },
    {
      name: 'Coorg',
      slug: 'coorg',
      state: 'karnataka',
      category: 'hill-station',
      isFeatured: false,
      isActive: true,
      description:
        'Known as the Scotland of India, Coorg is famous for its coffee plantations, misty hills, and waterfalls.',
    },
    {
      name: 'Spiti Valley',
      slug: 'spiti-valley',
      state: 'himachal-pradesh',
      category: 'adventure',
      isFeatured: false,
      isActive: true,
      description:
        'A remote mountain valley in the Himalayas, Spiti offers stunning landscapes, ancient monasteries, and thrilling treks.',
    },
    {
      name: 'Rann of Kutch',
      slug: 'rann-of-kutch',
      state: 'gujarat',
      category: 'heritage',
      isFeatured: false,
      isActive: true,
      description:
        'The white salt desert of Kutch is famous for its dramatic landscapes, wildlife sanctuary, and vibrant cultural festivals.',
    },
  ]

  const createdDestinations: any[] = []
  for (const dest of destinations) {
    try {
      const existing = await payload.find({
        collection: 'destinations',
        where: { slug: { equals: dest.slug } },
        depth: 0,
      })

      if (existing.docs.length > 0) {
        createdDestinations.push(existing.docs[0])
        console.log(`  ⏭️  ${dest.name} already exists`)
      } else {
        const created = await payload.create({
          collection: 'destinations',
          data: dest as any,
        })
        createdDestinations.push(created)
        console.log(`  ✅ ${dest.name} created`)
      }
    } catch (error) {
      console.log(`  ⚠️  ${dest.name}:`, error)
    }
  }
  console.log('')

  // 3. Create packages
  console.log('📦 Creating packages...')

  const getDestinationId = (slug: string) => {
    const dest = createdDestinations.find((d) => d.slug === slug)
    return dest?.id
  }

  const getFutureDate = (monthsFromNow: number) => {
    const date = new Date()
    date.setMonth(date.getMonth() + monthsFromNow)
    return date.toISOString()
  }

  const packages = [
    {
      title: 'Magical Manali Winter Escape - 5 Days 4 Nights',
      slug: 'manali-winter-escape',
      shortDescription:
        'Experience snowfall, adventure sports, and Himalayan beauty in this perfect winter getaway to Manali.',
      category: 'hill-station',
      destination: getDestinationId('manali'),
      duration: { days: 5, nights: 4 },
      price: { original: 18000, discounted: 15299 },
      isFeatured: true,
      isActive: true,
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Manali',
          description: 'Arrive in Manali and check into your hotel. Evening walk on Mall Road.',
        },
        {
          day: 2,
          title: 'Solang Valley Adventure',
          description: 'Full day at Solang Valley for skiing, paragliding, and zorbing.',
        },
        {
          day: 3,
          title: 'Rohtang Pass / Atul Tunnel',
          description:
            'Excursion to Rohtang Pass (subject to weather) or visit the new Atul Tunnel.',
        },
        {
          day: 4,
          title: 'Local Sightseeing',
          description: 'Visit Hadimba Temple, Vashisht Hot Springs, and Manu Temple.',
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Morning free for leisure. Check out and depart with memories.',
        },
      ],
      includes: [
        { item: '4 nights accommodation in 3-star hotel' },
        { item: 'Daily breakfast and dinner' },
        { item: 'All transfers by private vehicle' },
        { item: 'Sightseeing as per itinerary' },
        { item: 'All applicable taxes' },
        { item: '24/7 customer support' },
      ],
      excludes: [
        { item: 'Airfare / Train fare' },
        { item: 'Lunch' },
        { item: 'Adventure activities at Solang Valley' },
        { item: 'Personal expenses' },
      ],
      highlights: [
        { item: 'Snow activities in Solang Valley' },
        { item: 'Visit to iconic Hadimba Temple' },
        { item: 'Hot water springs at Vashisht' },
        { item: 'Scenic mountain drives' },
        { item: 'Local culture exploration' },
      ],
      groupSize: { min: 2, max: 12 },
      startDates: [{ date: getFutureDate(2) }, { date: getFutureDate(3) }],
    },
    {
      title: 'Goa Beach Paradise - 5 Days 4 Nights',
      slug: 'goa-beach-paradise',
      shortDescription:
        'Relax on pristine beaches, explore Portuguese churches, and enjoy vibrant nightlife in Goa.',
      category: 'beach',
      destination: getDestinationId('goa'),
      duration: { days: 5, nights: 4 },
      price: { original: 22000, discounted: 18999 },
      isFeatured: true,
      isActive: true,
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Goa',
          description: 'Arrive in Goa and transfer to beach resort. Evening at Baga Beach.',
        },
        {
          day: 2,
          title: 'North Goa Tour',
          description: 'Visit Aguada Fort, Baga Beach, Calangute Beach, and Anjuna Flea Market.',
        },
        {
          day: 3,
          title: 'South Goa Tour',
          description: 'Visit Basilica of Bom Jesus, Se Cathedral, and Colva Beach.',
        },
        {
          day: 4,
          title: 'Beach Day',
          description: 'Full day at leisure. Optional water sports or spa.',
        },
        {
          day: 5,
          title: 'Departure',
          description: 'Morning free. Check out and transfer to airport.',
        },
      ],
      includes: [
        { item: '4 nights beach resort accommodation' },
        { item: 'Daily breakfast' },
        { item: 'AC transfer for sightseeing' },
        { item: 'All applicable taxes' },
      ],
      excludes: [{ item: 'Airfare' }, { item: 'Lunch and dinner' }, { item: 'Water sports' }],
      highlights: [
        { item: 'Famous North Goa beaches' },
        { item: 'UNESCO World Heritage churches' },
        { item: 'Beach shack experience' },
        { item: 'Vibrant nightlife' },
      ],
      groupSize: { min: 2, max: 15 },
      startDates: [{ date: getFutureDate(1) }, { date: getFutureDate(2) }],
    },
    {
      title: 'Royal Rajasthan Heritage Tour - 7 Days 6 Nights',
      slug: 'rajasthan-heritage-tour',
      shortDescription:
        'Explore the majestic forts, palaces, and vibrant culture of the Land of Kings.',
      category: 'heritage',
      destination: getDestinationId('jaipur'),
      duration: { days: 7, nights: 6 },
      price: { original: 45000, discounted: 39999 },
      isFeatured: true,
      isActive: true,
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Jaipur',
          description: 'Arrive in Jaipur. Transfer to hotel. Evening at Jalmahal.',
        },
        {
          day: 2,
          title: 'Jaipur Sightseeing',
          description: 'Visit Amber Fort, Nahargarh Fort, Jal Mahal, and City Palace.',
        },
        {
          day: 3,
          title: 'Jaipur to Jodhpur',
          description: 'En route visit Pushkar. Evening in Jodhpur.',
        },
        {
          day: 4,
          title: 'Jodhpur Sightseeing',
          description: 'Visit Mehrangarh Fort, Umaid Bhawan, and Jaswant Thada.',
        },
        {
          day: 5,
          title: 'Jodhpur to Udaipur',
          description: 'Via Ranakpur Jain Temples. Evening boat ride at Lake Pichola.',
        },
        {
          day: 6,
          title: 'Udaipur Sightseeing',
          description: 'Visit City Palace, Jagdish Temple, and Fateh Sagar Lake.',
        },
        { day: 7, title: 'Departure', description: 'Transfer to Udaipur airport for departure.' },
      ],
      includes: [
        { item: '6 nights heritage hotel accommodation' },
        { item: 'Daily breakfast and dinner' },
        { item: 'All transfers by AC vehicle' },
        { item: 'Guide at each city' },
        { item: 'All entrance fees' },
      ],
      excludes: [{ item: 'Airfare' }, { item: 'Lunch' }, { item: 'Personal expenses' }],
      highlights: [
        { item: 'Magnificent Amber Fort' },
        { item: 'Blue City of Jodhpur' },
        { item: 'Lake Palace Hotel' },
        { item: 'Pushkar Camel Fair' },
      ],
      groupSize: { min: 2, max: 10 },
      startDates: [{ date: getFutureDate(2) }, { date: getFutureDate(4) }],
    },
    {
      title: 'Ladakh Adventure Expedition - 8 Days 7 Nights',
      slug: 'ladakh-adventure',
      shortDescription:
        'Journey through the stunning landscapes of Ladakh with monasteries, lakes, and mountain passes.',
      category: 'adventure',
      destination: getDestinationId('leh-ladakh'),
      duration: { days: 8, nights: 7 },
      price: { original: 55000, discounted: 48999 },
      isFeatured: true,
      isActive: true,
      itinerary: [
        {
          day: 1,
          title: 'Arrive in Leh',
          description: 'Acclimatization day. Visit Shanti Stupa in evening.',
        },
        {
          day: 2,
          title: 'Leh Local Sightseeing',
          description: 'Visit Leh Palace, Hemis Monastery, and Thiksey Monastery.',
        },
        {
          day: 3,
          title: 'Nubra Valley',
          description: 'Drive to Nubra Valley via Khardung La. Visit Diskit Monastery.',
        },
        {
          day: 4,
          title: 'Nubra Valley Exploration',
          description: 'Visit Hunder Sand Dunes. Double-humped camel ride.',
        },
        {
          day: 5,
          title: 'Pangong Lake',
          description: 'Drive to the stunning Pangong Lake (14,000 ft).',
        },
        { day: 6, title: 'Return to Leh', description: 'Morning at Pangong. Return via Chang La.' },
        { day: 7, title: 'Leisure Day', description: 'Free day for shopping at Leh Market.' },
        { day: 8, title: 'Departure', description: 'Transfer to Leh airport.' },
      ],
      includes: [
        { item: '7 nights accommodation (3-star)' },
        { item: 'All meals included' },
        { item: 'All transfers by SUV' },
        { item: 'Airport transfers' },
        { item: 'Oxygen cylinder on demand' },
      ],
      excludes: [
        { item: 'Airfare to Leh' },
        { item: 'Personal expenses' },
        { item: 'Tips and gratuities' },
      ],
      highlights: [
        { item: 'Pangong Lake' },
        { item: 'Khardung La pass' },
        { item: 'Nubra Valley' },
        { item: 'Himalayan monasteries' },
      ],
      groupSize: { min: 2, max: 8 },
      startDates: [{ date: getFutureDate(3) }, { date: getFutureDate(5) }],
    },
    {
      title: 'Kerala Backwaters & Beaches - 6 Days 5 Nights',
      slug: 'kerala-backwaters',
      shortDescription:
        'Experience the serene backwaters, lush tea gardens, and pristine beaches of Kerala.',
      category: 'beach',
      destination: getDestinationId('kerala'),
      duration: { days: 6, nights: 5 },
      price: { original: 35000, discounted: 29999 },
      isFeatured: true,
      isActive: true,
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Cochin',
          description: 'Arrive in Cochin. Transfer to Alleppey.',
        },
        {
          day: 2,
          title: 'Alleppey Backwaters',
          description: 'Overnight houseboat cruise through the serene backwaters.',
        },
        {
          day: 3,
          title: 'Munnar',
          description: 'Drive to Munnar. Visit tea gardens and waterfalls.',
        },
        {
          day: 4,
          title: 'Munnar Exploration',
          description: 'Full day at tea plantations and Eravikulam National Park.',
        },
        {
          day: 5,
          title: 'Kovalam Beach',
          description: 'Drive to Kovalam Beach. Evening at the beach.',
        },
        { day: 6, title: 'Departure', description: 'Transfer to Trivandrum airport.' },
      ],
      includes: [
        { item: '5 nights accommodation' },
        { item: 'All meals (full board on houseboat)' },
        { item: 'All transfers' },
        { item: 'Houseboat experience' },
      ],
      excludes: [{ item: 'Airfare' }, { item: 'Personal expenses' }],
      highlights: [
        { item: 'Houseboat backwater cruise' },
        { item: 'Munnar tea gardens' },
        { item: 'Kovalam beaches' },
        { item: 'Ayurvedic spa' },
      ],
      groupSize: { min: 2, max: 10 },
      startDates: [{ date: getFutureDate(2) }, { date: getFutureDate(3) }],
    },
    {
      title: 'Andaman Tropical Escape - 6 Days 5 Nights',
      slug: 'andaman-tropical',
      shortDescription:
        'Discover crystal clear waters, coral reefs, and pristine beaches of the Andaman Islands.',
      category: 'beach',
      destination: getDestinationId('andaman'),
      duration: { days: 6, nights: 5 },
      price: { original: 42000, discounted: 37999 },
      isFeatured: false,
      isActive: true,
      itinerary: [
        {
          day: 1,
          title: 'Arrive in Port Blair',
          description: 'Arrive and transfer to hotel. Visit Cellular Jail in evening.',
        },
        {
          day: 2,
          title: 'Havelock Island',
          description: 'Ferry to Havelock. Evening at Radhanagar Beach.',
        },
        {
          day: 3,
          title: 'Havelock Activities',
          description: 'Snorkeling/Scuba at Elephant Beach.',
        },
        {
          day: 4,
          title: 'Neil Island',
          description: 'Visit Neil Island. Explore natural bridges.',
        },
        {
          day: 5,
          title: 'Return to Port Blair',
          description: "Return ferry. Visit Corbyn's Cove.",
        },
        { day: 6, title: 'Departure', description: 'Transfer to airport.' },
      ],
      includes: [
        { item: '5 nights beach resort' },
        { item: 'All meals' },
        { item: 'All transfers and ferry' },
        { item: 'Water sports activities' },
      ],
      excludes: [{ item: 'Airfare' }, { item: 'Personal expenses' }],
      highlights: [
        { item: 'Radhanagar Beach' },
        { item: 'Coral reefs' },
        { item: 'Elephant Beach' },
        { item: 'Cellular Jail' },
      ],
      groupSize: { min: 2, max: 8 },
      startDates: [{ date: getFutureDate(3) }, { date: getFutureDate(5) }],
    },
    {
      title: 'Varanasi Spiritual Journey - 4 Days 3 Nights',
      slug: 'varanasi-spiritual',
      shortDescription:
        'Immerse yourself in the spiritual capital of India with Ganga aarti and ancient temples.',
      category: 'heritage',
      destination: getDestinationId('varanasi'),
      duration: { days: 4, nights: 3 },
      price: { original: 15000, discounted: 12999 },
      isFeatured: false,
      isActive: true,
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Varanasi',
          description: 'Evening Ganga Aarti at Dashashwamedh Ghat.',
        },
        {
          day: 2,
          title: 'Varanasi Temple Tour',
          description: 'Visit Kashi Vishwanath, Tulsi Manas Temple.',
        },
        {
          day: 3,
          title: 'Sarnath Excursion',
          description: 'Visit Sarnath (Buddhist pilgrimage site).',
        },
        { day: 4, title: 'Departure', description: 'Morning boat ride. Transfer to airport.' },
      ],
      includes: [
        { item: '3 nights hotel' },
        { item: 'Breakfast and dinner' },
        { item: 'All transfers' },
        { item: 'Guide services' },
      ],
      excludes: [{ item: 'Airfare' }, { item: 'Personal expenses' }],
      highlights: [
        { item: 'Ganga Aarti' },
        { item: 'Kashi Vishwanath' },
        { item: 'Sarnath' },
        { item: 'Morning boat ride' },
      ],
      groupSize: { min: 2, max: 15 },
      startDates: [{ date: getFutureDate(2) }, { date: getFutureDate(4) }],
    },
    {
      title: 'Coorg Coffee & Nature Retreat - 4 Days 3 Nights',
      slug: 'coorg-nature-retreat',
      shortDescription:
        'Escape to the Scotland of India with coffee plantations, waterfalls, and misty hills.',
      category: 'hill-station',
      destination: getDestinationId('coorg'),
      duration: { days: 4, nights: 3 },
      price: { original: 18000, discounted: 15999 },
      isFeatured: false,
      isActive: true,
      itinerary: [
        { day: 1, title: 'Arrival in Coorg', description: 'Check in. Evening walk in plantation.' },
        {
          day: 2,
          title: 'Coorg Sightseeing',
          description: "Visit Abbey Falls, Raja's Seat, Dubare Elephant Camp.",
        },
        {
          day: 3,
          title: 'Trek & Nature',
          description: 'Morning trek to Kopat Falls. Coffee estate tour.',
        },
        { day: 4, title: 'Departure', description: 'Morning free. Transfer to airport.' },
      ],
      includes: [
        { item: '3 nights resort' },
        { item: 'All meals' },
        { item: 'All transfers' },
        { item: 'Coffee tour' },
      ],
      excludes: [{ item: 'Airfare' }, { item: 'Personal expenses' }],
      highlights: [
        { item: 'Coffee plantation' },
        { item: 'Abbey Falls' },
        { item: 'Elephant camp' },
        { item: "Raja's Seat sunset" },
      ],
      groupSize: { min: 2, max: 10 },
      startDates: [{ date: getFutureDate(2) }, { date: getFutureDate(3) }],
    },
    {
      title: 'Spiti Valley High Altitude Adventure - 7 Days 6 Nights',
      slug: 'spiti-valley-adventure',
      shortDescription:
        'Journey through the cold desert of Spiti with monasteries, villages, and Himalayan peaks.',
      category: 'adventure',
      destination: getDestinationId('spiti-valley'),
      duration: { days: 7, nights: 6 },
      price: { original: 48000, discounted: 42999 },
      isFeatured: false,
      isActive: true,
      itinerary: [
        {
          day: 1,
          title: 'Shimla to Sarahan',
          description: 'Drive to Sarahan. Visit Bhimakali Temple.',
        },
        {
          day: 2,
          title: 'Sarahan to Sangla',
          description: 'Beautiful drive to Kinnaur. Stay in Sangla.',
        },
        { day: 3, title: 'Sangla to Kalpa', description: 'Visit Kalpa. View Kinnar Kailash.' },
        { day: 4, title: 'Kalpa to Kaza', description: 'Enter Spiti Valley. Visit Kaza.' },
        {
          day: 5,
          title: 'Kaza Exploration',
          description: 'Visit Key Monastery, Hikkim, and Komik.',
        },
        { day: 6, title: 'Chandratal Lake', description: 'Day trip to stunning Chandratal Lake.' },
        {
          day: 7,
          title: 'Return to Manali',
          description: 'Long drive back to Manali via Rohtang.',
        },
      ],
      includes: [
        { item: '6 nights homestay/guesthouse' },
        { item: 'All meals' },
        { item: '4x4 vehicle' },
        { item: 'Experienced driver' },
      ],
      excludes: [{ item: 'Airfare' }, { item: 'Personal expenses' }, { item: 'Permits' }],
      highlights: [
        { item: 'Key Monastery' },
        { item: 'Chandratal Lake' },
        { item: "World's highest post office" },
        { item: 'Himalayan villages' },
      ],
      groupSize: { min: 2, max: 6 },
      startDates: [{ date: getFutureDate(4) }, { date: getFutureDate(5) }],
    },
    {
      title: 'Rann of Kutch Cultural Festival - 5 Days 4 Nights',
      slug: 'rann-kutch-festival',
      shortDescription:
        'Experience the vibrant Rann Utsav with salt desert, cultural performances, and handicrafts.',
      category: 'heritage',
      destination: getDestinationId('rann-of-kutch'),
      duration: { days: 5, nights: 4 },
      price: { original: 25000, discounted: 21999 },
      isFeatured: false,
      isActive: true,
      itinerary: [
        {
          day: 1,
          title: 'Arrival in Bhuj',
          description: 'Transfer to Tent City. Evening cultural program.',
        },
        { day: 2, title: 'Rann Utsav', description: 'Full day at White Rann. Sunset and星空.' },
        {
          day: 3,
          title: 'Village Tour',
          description: 'Visit local villages. Handicraft shopping.',
        },
        { day: 4, title: 'Kutch Exploration', description: 'Visit Mandvi Beach, Vijay Garh.' },
        { day: 5, title: 'Departure', description: 'Transfer to Bhuj airport.' },
      ],
      includes: [
        { item: '4 nights tent/camp' },
        { item: 'All meals' },
        { item: 'All transfers' },
        { item: 'Cultural programs' },
      ],
      excludes: [{ item: 'Airfare' }, { item: 'Personal shopping' }],
      highlights: [
        { item: 'White Rann sunset' },
        { item: 'Gujarati culture' },
        { item: 'Traditional crafts' },
        { item: 'Tent city experience' },
      ],
      groupSize: { min: 2, max: 20 },
      startDates: [{ date: getFutureDate(3) }, { date: getFutureDate(4) }],
    },
  ]

  for (const pkg of packages) {
    try {
      const existing = await payload.find({
        collection: 'packages',
        where: { slug: { equals: pkg.slug } },
        depth: 0,
      })

      if (existing.docs.length > 0) {
        console.log(`  ⏭️  ${pkg.title.substring(0, 40)}... already exists`)
      } else {
        await payload.create({
          collection: 'packages',
          data: pkg as any,
        })
        console.log(`  ✅ ${pkg.title.substring(0, 40)}...`)
      }
    } catch (error) {
      console.log(`  ⚠️  ${pkg.title.substring(0, 40)}...:`, error)
    }
  }
  console.log('')

  // 4. Create banners
  console.log('🎬 Creating banners...')
  const banners = [
    {
      title: 'Discover Incredible India',
      subtitle: 'Your Gateway to Unforgettable Journeys',
      type: 'image',
      ctaText: 'Explore Packages',
      ctaLink: '/packages',
      isActive: true,
      order: 1,
    },
    {
      title: 'Book Your Dream Vacation',
      subtitle: 'Amazing Deals on Tour Packages',
      type: 'image',
      ctaText: 'View Destinations',
      ctaLink: '/destinations',
      isActive: true,
      order: 2,
    },
    {
      title: 'Experience the Magic of India',
      subtitle: 'From Mountains to Beaches',
      type: 'image',
      ctaText: 'Start Planning',
      ctaLink: '/contact',
      isActive: true,
      order: 3,
    },
  ]

  for (const banner of banners) {
    try {
      await payload.create({
        collection: 'banners',
        data: banner as any,
      })
      console.log(`  ✅ ${banner.title}`)
    } catch (error) {
      console.log(`  ⚠️  ${banner.title}:`, error)
    }
  }
  console.log('')

  // 5. Create site settings
  console.log('⚙️  Creating site settings...')
  try {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: 'SafariIndia',
        tagline: 'Your Gateway to Incredible India',
        phone: '+91-999-999-9999',
        email: 'info@safariindia.com',
        whatsappNumber: '919999999999',
      },
    })
    console.log('✅ Site settings created\n')
  } catch (error) {
    console.log('⚠️  Site settings:', error)
  }

  console.log('🎉 Seed completed successfully!')
  console.log('')
  console.log('📊 Summary:')
  console.log('  👤 Admin: admin@safarindia.com / SafariIndia@2024!')
  console.log('  📍 Destinations: 10')
  console.log('  📦 Packages: 12')
  console.log('  🎬 Banners: 3')
  console.log('')
  console.log('🚀 Run "pnpm dev" to start the development server!')
}

seedData()
