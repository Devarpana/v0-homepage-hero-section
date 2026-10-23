// Homepage content for the services-first site. Photos and videos are optional:
// drop a file into /public at the path given and set it here, and the page shows it
// instead of the built-in illustration.

export const videos = {
  // Short explainer of what 3D printing is, e.g. '/videos/what-is-3d-printing.mp4'
  whatIs3dPrinting: null as string | null,
  // Brand film showing XYZ Layers at work, e.g. '/videos/brand.mp4'
  // For now this plays the hero video from the current xyzlayers.in site.
  brand: 'https://www.xyzlayers.in/videos/hero-video.mp4' as string | null,
  // Optional poster images shown before the videos play
  whatIs3dPrintingPoster: null as string | null,
  brandPoster: null as string | null,
}

export type ServiceIcon =
  | 'prototype'
  | 'reverse'
  | 'design'
  | 'print'
  | 'batch'
  | 'parts'
  | 'jig'
  | 'model'
  | 'gift'

export type Service = {
  slug: string
  name: string
  icon: ServiceIcon
  tagline: string // one line, shown on the tab panel
  description: string // two or three plain sentences
  idealFor: string[]
  examples: string[]
  image?: string // e.g. '/services/prototyping.jpg'
}

export const services: Service[] = [
  {
    slug: 'prototyping',
    name: 'Rapid Prototyping',
    icon: 'prototype',
    tagline: 'Hold your idea in your hand before you spend on production.',
    description:
      'We turn your design into a physical prototype in days, not weeks. Check the size, fit and feel, change what needs changing, and print again until it is right.',
    idealFor: ['Product startups', 'Engineering students', 'Inventors'],
    examples: ['Product enclosures', 'Concept models', 'Fit and function tests'],
  },
  {
    slug: 'reverse-engineering',
    name: 'Reverse Engineering',
    icon: 'reverse',
    tagline: 'Have a part but no drawing? We rebuild it as a 3D model.',
    description:
      'Bring us a physical part, even a broken one. We measure it precisely, rebuild it as an accurate 3D model, and print a new one. You also get the file to reprint or improve it later.',
    idealFor: ['Machine owners', 'Workshops and factories', 'Restorers'],
    examples: ['Discontinued parts', 'Broken clips and brackets', 'Improved versions of old parts'],
  },
  {
    slug: '3d-design',
    name: '3D Design & Modelling',
    icon: 'design',
    tagline: 'From a sketch, photo or idea to a print-ready 3D model.',
    description:
      'No 3D file? No problem. Share a sketch, a photo or just describe what you need. Our designers model it in CAD, show you previews, and refine it with you before anything is printed.',
    idealFor: ['Anyone with an idea', 'Small businesses', 'Architects and designers'],
    examples: ['Product designs', 'Custom fittings', 'Logos and nameplates in 3D'],
  },
  {
    slug: '3d-printing',
    name: '3D Printing on Demand',
    icon: 'print',
    tagline: 'Send us a file. We print it in the right material and finish.',
    description:
      'Already have an STL or 3D file? Upload it and tell us how many you need. We advise on material and settings, print it carefully, check every piece and deliver it to your door.',
    idealFor: ['Makers and hobbyists', 'Engineers', 'Students'],
    examples: ['Single parts', 'Multi-part assemblies', 'Replacement pieces'],
  },
  {
    slug: 'low-volume-production',
    name: 'Low-Volume Production',
    icon: 'batch',
    tagline: 'Ten to a few hundred pieces, without the cost of a mould.',
    description:
      'Moulds only make sense for thousands of units. For smaller runs we print your parts in batches with consistent quality, so you can launch, test the market or serve a niche.',
    idealFor: ['Small brands', 'Product launches', 'Limited editions'],
    examples: ['Product parts', 'Branded merchandise', 'Spare stock'],
  },
  {
    slug: 'spare-parts',
    name: 'Spare & Replacement Parts',
    icon: 'parts',
    tagline: 'The small part you cannot buy anywhere, made again.',
    description:
      'Knobs, clips, gears, covers and brackets break and are often impossible to find. We recreate them in a strong filament so your appliance, vehicle accessory or machine works again.',
    idealFor: ['Households', 'Repair shops', 'Vehicle and appliance owners'],
    examples: ['Appliance knobs', 'Battery covers', 'Gears and clips'],
  },
  {
    slug: 'manufacturing-aids',
    name: 'Jigs, Fixtures & Tools',
    icon: 'jig',
    tagline: 'Custom tools that make your workshop faster and more accurate.',
    description:
      'Production lines and workshops need holders, guides and fixtures shaped for one exact job. We design and print them quickly and cheaply, so your team works faster with fewer mistakes.',
    idealFor: ['Manufacturers', 'Workshops', 'Assembly lines'],
    examples: ['Drilling guides', 'Part holders', 'Assembly fixtures'],
  },
  {
    slug: 'models-and-props',
    name: 'Models & Props',
    icon: 'model',
    tagline: 'Scale models and display pieces that tell your story.',
    description:
      'From architectural and product scale models to props for events, films and exhibitions, we print detailed pieces that look great on a table, a stage or a shelf.',
    idealFor: ['Architects', 'Event and film teams', 'Exhibitors'],
    examples: ['Building models', 'Exhibition displays', 'Cosplay and stage props'],
  },
  {
    slug: 'custom-gifts',
    name: 'Custom Gifts & Personalisation',
    icon: 'gift',
    tagline: 'One-of-a-kind pieces with a name, face or logo on them.',
    description:
      'Personalised nameplates, portrait medallions, trophies and corporate gifts, designed for the person or brand and printed with care. Order one, or a set for your whole team.',
    idealFor: ['Gifting', 'Corporate teams', 'Events and celebrations'],
    examples: ['Nameplates', 'Portrait medallions', 'Branded desk items'],
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

// Typical values for common filament brands; confirm against the spools in use.
export const materials: Material[] = [
  {
    name: 'PLA',
    fullName: 'Polylactic Acid',
    speciality: 'The sharpest detail and widest colour range, made from plant-based starch.',
    look: 'Smooth, slightly satin finish with crisp edges and fine detail. Feels hard and rigid.',
    finish: 'matte',
    swatches: ['#e08e3c', '#23458d', '#f5f5f2', '#1e2330'],
    ratings: [
      { label: 'Detail', value: 5 },
      { label: 'Strength', value: 3 },
      { label: 'Flexibility', value: 1 },
      { label: 'Heat resistance', value: 2 },
      { label: 'Outdoor use', value: 2 },
    ],
    specs: [
      { label: 'Softens at', value: 'about 55–60 °C' },
      { label: 'Surface', value: 'Matte to satin' },
      { label: 'Feel', value: 'Rigid' },
      { label: 'Source', value: 'Plant-based (corn or sugarcane)' },
    ],
    bestFor: ['Prototypes', 'Display models', 'Gifts and decor'],
  },
  {
    name: 'PETG',
    fullName: 'Polyethylene Terephthalate Glycol',
    speciality: 'Tough, slightly flexible and water resistant, so it suits parts that get used every day.',
    look: 'Glossy, smooth surface with a slight shine. Can be made semi-transparent.',
    finish: 'glossy',
    swatches: ['#2f6fd0', '#1e2330', '#d9dde3', '#3aa676'],
    ratings: [
      { label: 'Detail', value: 4 },
      { label: 'Strength', value: 4 },
      { label: 'Flexibility', value: 3 },
      { label: 'Heat resistance', value: 3 },
      { label: 'Outdoor use', value: 4 },
    ],
    specs: [
      { label: 'Softens at', value: 'about 75–80 °C' },
      { label: 'Surface', value: 'Glossy' },
      { label: 'Feel', value: 'Tough, slightly flexible' },
      { label: 'Resists', value: 'Water, moisture, many chemicals' },
    ],
    bestFor: ['Functional parts', 'Spare parts', 'Outdoor and kitchen use'],
  },
]
