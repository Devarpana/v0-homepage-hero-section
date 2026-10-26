// Homepage content for the services-first site. Photos and videos are optional:
// drop a file into /public at the path given and set it here, and the page shows it
// instead of the built-in illustration.

export const videos = {
  // Short explainer of what 3D printing is, e.g. '/videos/what-is-3d-printing.mp4'
  whatIs3dPrinting: '/videos/what-is-3d-printing.mp4' as string | null,
  // Brand film showing XYZ Layers at work, e.g. '/videos/brand.mp4'
  // For now this plays the hero video from the current xyzlayers.in site.
  brand: 'https://www.xyzlayers.in/videos/hero-video.mp4' as string | null,
  // Optional poster images shown before the videos play
  whatIs3dPrintingPoster: '/videos/what-is-3d-printing-poster.jpg' as string | null,
  brandPoster: null as string | null,
}

// The registered company behind the XYZ Layers brand.
export const company = {
  legalName: 'Aqua Fusion Technology Private Limited',
  shortName: 'Aqua Fusion Technology Pvt. Ltd.',
  origin: 'IIT Guwahati',
}

// Contact details, as shown on xyzlayers.in (checked 26 Oct).
export const contact = {
  phone: '+91 85478 42337',
  phoneHref: 'tel:+918547842337',
  whatsappHref: 'https://wa.me/918547842337',
  email: 'Info.xyzlayers@gmail.com',
  instagram: { handle: '@xyz.layers', href: 'https://instagram.com/xyz.layers' },
  linkedin: { handle: 'XYZ Layers', href: 'https://linkedin.com/company/xyzlayers' },
  responseTime: 'We usually reply within 24 hours.',
  serving: 'Serving customers across India',
}

// Founders and team for the About page. The section stays hidden while this is empty.
// e.g. { name: 'Name', role: 'Co-founder, Design', photo: '/team/name.jpg' }
export const team: { name: string; role: string; photo?: string }[] = []

export type ServiceIcon =
  | 'prototype'
  | 'reverse'
  | 'design'
  | 'print'
  | 'engineering'
  | 'flexible'
  | 'batch'
  | 'parts'
  | 'jig'
  | 'drone'
  | 'model'
  | 'gift'

export type Service = {
  slug: string
  name: string
  icon: ServiceIcon
  tagline: string // one line, shown on the tab panel
  description: string // two or three plain sentences
  chooseIf: string // "Choose this if..." in plain words
  materials: string // filaments usually used
  idealFor: string[]
  examples: string[]
  image?: string // e.g. '/services/prototyping.jpg'
}

// The 12 services approved on 23 Oct (see the creative brief).
export const services: Service[] = [
  {
    slug: 'reverse-engineering',
    name: 'Reverse Engineering',
    icon: 'reverse',
    tagline: 'We measure an existing object and rebuild it as a 3D file.',
    description:
      'Bring us a physical part, even a broken one. We measure it precisely, rebuild it as an accurate 3D model, and print a new one. You also get the file to reprint or improve it later.',
    chooseIf: 'You have a part but no drawing or file.',
    materials: 'Any',
    idealFor: ['Machine owners', 'Workshops and factories', 'Restorers'],
    examples: ['Discontinued parts', 'Broken clips and brackets', 'Improved versions of old parts'],
  },
  {
    slug: '3d-design',
    name: '3D Design & Modelling',
    icon: 'design',
    tagline: 'We turn your sketch, photo or idea into a print-ready 3D model.',
    description:
      'No 3D file? No problem. Share a sketch, a photo or just describe what you need. Our designers model it in CAD, show you previews, and refine it with you before anything is printed.',
    chooseIf: 'You have an idea but no 3D file.',
    materials: 'Any',
    idealFor: ['Anyone with an idea', 'Small businesses', 'Architects and designers'],
    examples: ['Product designs', 'Custom fittings', 'Logos and nameplates in 3D'],
  },
  {
    slug: 'prototyping',
    name: 'Rapid Prototyping',
    icon: 'prototype',
    tagline: 'Quick test versions of your product so you can hold, test and improve it.',
    description:
      'We turn your design into a physical prototype in days, not weeks. Check the size, fit and feel, change what needs changing, and print again until it is right.',
    chooseIf: 'You are developing a product and need to try it first.',
    materials: 'PLA, PETG',
    idealFor: ['Product startups', 'Engineering students', 'Inventors'],
    examples: ['Product enclosures', 'Concept models', 'Fit and function tests'],
  },
  {
    slug: '3d-printing',
    name: '3D Printing on Demand',
    icon: 'print',
    tagline: 'Send us your file, we print it in the material and colour you choose.',
    description:
      'Already have an STL or 3D file? Upload it and tell us how many you need. We advise on material and settings, print it carefully, check every piece and deliver it to your door.',
    chooseIf: 'You already have an STL or 3D file.',
    materials: 'Any',
    idealFor: ['Makers and hobbyists', 'Engineers', 'Students'],
    examples: ['Single parts', 'Multi-part assemblies', 'Replacement pieces'],
  },
  {
    slug: 'functional-parts',
    name: 'Functional & Engineering Parts',
    icon: 'engineering',
    tagline: 'Strong parts that handle heat, sun, weather and load.',
    description:
      'When a part has a real job to do, we print it in engineering filaments like ABS, ASA or carbon fibre. They stay strong in a hot car, in the sun or inside a working machine.',
    chooseIf: 'The part has a real job: in a car, outdoors, or in a machine.',
    materials: 'ABS, ASA, carbon fibre',
    idealFor: ['Engineers', 'Automotive owners', 'Machine builders'],
    examples: ['Brackets and mounts', 'Enclosures', 'Car interior and exterior parts'],
  },
  {
    slug: 'flexible-parts',
    name: 'Flexible Parts',
    icon: 'flexible',
    tagline: 'Rubber-like parts that bend, grip and absorb shocks.',
    description:
      'We print in TPU, a soft and flexible filament that bends and springs back. It is ideal for parts that need to seal, grip, cushion or protect.',
    chooseIf: 'You need a seal, grip, bumper, strap or soft case.',
    materials: 'TPU',
    idealFor: ['Product designers', 'Gadget makers', 'Repairs at home'],
    examples: ['Seals and gaskets', 'Grips and bumpers', 'Phone cases and straps'],
  },
  {
    slug: 'low-volume-production',
    name: 'Low-Volume Production',
    icon: 'batch',
    tagline: '10 to a few hundred identical parts without expensive moulds.',
    description:
      'Moulds only make sense for thousands of units. For smaller runs we print your parts in batches with consistent quality, so you can launch, test the market or serve a niche.',
    chooseIf: 'You need a small batch for a shop, event or startup.',
    materials: 'Any',
    idealFor: ['Small brands', 'Product launches', 'Limited editions'],
    examples: ['Product parts', 'Branded merchandise', 'Spare stock'],
  },
  {
    slug: 'spare-parts',
    name: 'Spare & Replacement Parts',
    icon: 'parts',
    tagline: 'Discontinued or broken parts, made again, often stronger.',
    description:
      'Knobs, clips, gears, covers and brackets break and are often impossible to find. We recreate them in a strong filament so your appliance, vehicle accessory or machine works again.',
    chooseIf: 'Something broke and you cannot buy it anywhere.',
    materials: 'PETG, ABS, ASA',
    idealFor: ['Households', 'Repair shops', 'Vehicle and appliance owners'],
    examples: ['Appliance knobs', 'Battery covers', 'Gears and clips'],
  },
  {
    slug: 'manufacturing-aids',
    name: 'Manufacturing Aids',
    icon: 'jig',
    tagline: 'Custom jigs, holders and tools that make work faster on a shop floor.',
    description:
      'Production lines and workshops need holders, guides and fixtures shaped for one exact job. We design and print them quickly and cheaply, so your team works faster with fewer mistakes.',
    chooseIf: 'You run a workshop or factory.',
    materials: 'PETG, ABS, carbon fibre',
    idealFor: ['Manufacturers', 'Workshops', 'Assembly lines'],
    examples: ['Drilling guides', 'Part holders', 'Assembly fixtures'],
  },
  {
    slug: 'drone-rc-robotics',
    name: 'Drone, RC & Robotics Parts',
    icon: 'drone',
    tagline: 'Light, stiff frames, mounts and bumpers for things that move.',
    description:
      'Moving machines need parts that are light but tough. We print stiff carbon fibre frames and mounts, and soft TPU bumpers and guards that survive crashes.',
    chooseIf: 'You build drones, RC cars or robots.',
    materials: 'Carbon fibre, TPU',
    idealFor: ['Drone pilots', 'RC hobbyists', 'Robotics teams and students'],
    examples: ['Frames and arms', 'Camera and sensor mounts', 'Bumpers and guards'],
  },
  {
    slug: 'models-and-props',
    name: 'Models & Props',
    icon: 'model',
    tagline: 'Architecture models, display pieces, cosplay and film props.',
    description:
      'From architectural and product scale models to props for events, films and exhibitions, we print detailed pieces that look great on a table, a stage or a shelf.',
    chooseIf: 'You need something to show, display or wear.',
    materials: 'PLA',
    idealFor: ['Architects', 'Event and film teams', 'Exhibitors'],
    examples: ['Building models', 'Exhibition displays', 'Cosplay and stage props'],
  },
  {
    slug: 'custom-gifts',
    name: 'Custom Gifts & Personalised Items',
    icon: 'gift',
    tagline: 'Name plates, keychains, figurines and trophies made for one person.',
    description:
      'Personalised gifts and branded merchandise, designed for the person or brand and printed with care. Order one, or a set for your whole team.',
    chooseIf: 'You want a unique gift or branded merchandise.',
    materials: 'PLA, PETG',
    idealFor: ['Gifting', 'Corporate teams', 'Events and celebrations'],
    examples: ['Name plates and keychains', 'Figurines', 'Trophies and branded items'],
  },
]

// "Not sure what you need?": everyday situations mapped to a service.
export const serviceFinder: { situation: string; service: string; answer: string }[] = [
  {
    situation: 'I have an idea but no design or 3D file',
    service: '3d-design',
    answer: 'Start with 3D Design & Modelling. Share a sketch, photo or description and we create the 3D model with you.',
  },
  {
    situation: 'I already have an STL or 3D file',
    service: '3d-printing',
    answer: 'Choose 3D Printing on Demand. Send the file, pick a quantity and we suggest the best material.',
  },
  {
    situation: 'A part broke and I cannot find a replacement',
    service: 'reverse-engineering',
    answer: 'Reverse Engineering is for you. We measure the old part, rebuild it in 3D and print a new one.',
  },
  {
    situation: 'I want to test my product before manufacturing',
    service: 'prototyping',
    answer: 'Rapid Prototyping. Get a real sample in your hands, test it, change it and print again.',
  },
  {
    situation: 'My part has to handle heat, sun or heavy use',
    service: 'functional-parts',
    answer: 'Functional & Engineering Parts. We print it in a tough filament like ABS, ASA or carbon fibre.',
  },
  {
    situation: 'I need something soft that bends or grips',
    service: 'flexible-parts',
    answer: 'Flexible Parts. We print in TPU, a rubber-like filament for seals, grips, bumpers and cases.',
  },
  {
    situation: 'I need many copies of the same part',
    service: 'low-volume-production',
    answer: 'Low-Volume Production. We print batches with consistent quality, no expensive mould needed.',
  },
  {
    situation: 'I want a personalised gift or branded item',
    service: 'custom-gifts',
    answer: 'Custom Gifts & Personalisation. Tell us the name, photo or logo and we design it for you.',
  },
]

export type Material = {
  name: string
  fullName: string
  speciality: string // one sentence
  look: string // how a finished print looks and feels
  finish: 'matte' | 'glossy'
  swatches: string[] // colours to show on the sample render
  ratings: { label: string; value: number }[] // out of 5
  specs: { label: string; value: string }[]
  bestFor: string[]
  image?: string // photo of a real print, e.g. '/materials/pla.jpg'
}

// Typical values from the creative brief (approximate); confirm against the spools in use.
export const materials: Material[] = [
  {
    name: 'PLA',
    fullName: 'Polylactic Acid',
    speciality: 'The sharpest detail and brightest colours, made from plant-based starch.',
    look: 'Smooth, matte to satin finish with crisp edges and fine detail. Feels hard and rigid.',
    finish: 'matte',
    swatches: ['#e08e3c', '#23458d', '#f5f5f2', '#1e2330'],
    ratings: [
      { label: 'Detail', value: 5 },
      { label: 'Strength', value: 3 },
      { label: 'Flexibility', value: 1 },
      { label: 'Heat resistance', value: 2 },
    ],
    specs: [
      { label: 'Softens at', value: 'about 55–60 °C' },
      { label: 'Outdoors', value: 'Indoor use' },
    ],
    bestFor: ['Models and props', 'Gifts', 'Prototypes'],
  },
  {
    name: 'PETG',
    fullName: 'Polyethylene Terephthalate Glycol',
    speciality: 'Tough, slightly flexible and water-resistant, built for parts that get used.',
    look: 'Glossy, smooth surface with a slight shine. Can be made semi-transparent.',
    finish: 'glossy',
    swatches: ['#2f6fd0', '#1e2330', '#d9dde3', '#3aa676'],
    ratings: [
      { label: 'Detail', value: 4 },
      { label: 'Strength', value: 4 },
      { label: 'Flexibility', value: 3 },
      { label: 'Heat resistance', value: 3 },
    ],
    specs: [
      { label: 'Softens at', value: 'about 75–80 °C' },
      { label: 'Outdoors', value: 'Good' },
    ],
    bestFor: ['Spare parts', 'Brackets', 'Containers'],
  },
  {
    name: 'ABS',
    fullName: 'Acrylonitrile Butadiene Styrene',
    speciality: 'The classic engineering plastic: strong, heat-resistant and easy to sand or paint.',
    look: 'Matte surface that becomes very smooth after sanding. Takes paint well.',
    finish: 'matte',
    swatches: ['#c0392b', '#1e2330', '#f5f5f2', '#7f8c8d'],
    ratings: [
      { label: 'Detail', value: 3 },
      { label: 'Strength', value: 4 },
      { label: 'Flexibility', value: 2 },
      { label: 'Heat resistance', value: 4 },
    ],
    specs: [
      { label: 'Softens at', value: 'about 95–100 °C' },
      { label: 'Outdoors', value: 'Fair (yellows in sun)' },
    ],
    bestFor: ['Car interior parts', 'Enclosures', 'Tools'],
  },
  {
    name: 'ASA',
    fullName: 'Acrylonitrile Styrene Acrylate',
    speciality: 'Like ABS, but made to live outdoors without fading or cracking in the sun.',
    look: 'Even, matte finish that keeps its colour outdoors.',
    finish: 'matte',
    swatches: ['#f5f5f2', '#1e2330', '#23458d', '#e08e3c'],
    ratings: [
      { label: 'Detail', value: 3 },
      { label: 'Strength', value: 4 },
      { label: 'Flexibility', value: 2 },
      { label: 'Heat resistance', value: 4 },
    ],
    specs: [
      { label: 'Softens at', value: 'about 95–100 °C' },
      { label: 'Outdoors', value: 'Excellent, UV-stable' },
    ],
    bestFor: ['Outdoor fittings', 'Car exterior parts', 'Signs'],
  },
  {
    name: 'TPU',
    fullName: 'Thermoplastic Polyurethane',
    speciality: 'Rubber-like and flexible, it bends, grips and bounces back.',
    look: 'Soft, satin surface that feels like rubber in the hand.',
    finish: 'matte',
    swatches: ['#e08e3c', '#1e2330', '#d9dde3', '#c0392b'],
    ratings: [
      { label: 'Detail', value: 3 },
      { label: 'Strength', value: 3 },
      { label: 'Flexibility', value: 5 },
      { label: 'Heat resistance', value: 3 },
    ],
    specs: [
      { label: 'Softens at', value: 'about 60–80 °C' },
      { label: 'Outdoors', value: 'Good' },
    ],
    bestFor: ['Seals', 'Grips and bumpers', 'Phone cases'],
  },
  {
    name: 'Carbon fibre',
    fullName: 'Carbon-fibre-filled filament',
    speciality: 'Light as plastic, stiff like metal, with a premium matte finish.',
    look: 'Dark, textured matte surface that hides layer lines and looks premium.',
    finish: 'matte',
    swatches: ['#2b2d31', '#3d4048'],
    ratings: [
      { label: 'Detail', value: 3 },
      { label: 'Strength', value: 5 },
      { label: 'Flexibility', value: 1 },
      { label: 'Heat resistance', value: 4 },
    ],
    specs: [
      { label: 'Softens at', value: 'about 80 °C and up' },
      { label: 'Outdoors', value: 'Good' },
    ],
    bestFor: ['Drone frames', 'Brackets and jigs', 'Light, strong parts'],
  },
]
