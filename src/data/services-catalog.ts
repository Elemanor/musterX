export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  estimatedTime: string;
  priceRange: {
    min: number;
    max: number;
  };
  requiresLicense?: string;
  popularityScore: number;
  tags: string[];
  searchTerms: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: string[];
  requiresLicense?: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "plumbing",
    name: "Plumbing & Drains",
    icon: "Droplets",
    description: "Faucets, toilets, drains, pipes, and water fixtures",
    subcategories: ["Faucets", "Toilets", "Drains", "Pipes", "Water Heaters", "Fixtures"],
  },
  {
    id: "electrical",
    name: "Electrical & Lighting",
    icon: "Zap",
    description: "Outlets, switches, fixtures, and electrical repairs",
    subcategories: ["Outlets", "Switches", "Lighting", "Fixtures", "Breakers", "Smart Home"],
    requiresLicense: "ESA Licensed Electrical Contractor"
  },
  {
    id: "carpentry",
    name: "Carpentry & Woodwork",
    icon: "Hammer",
    description: "Furniture, shelving, trim, and wood repairs",
    subcategories: ["Furniture", "Shelving", "Trim", "Doors", "Cabinets", "Decks"]
  },
  {
    id: "walls",
    name: "Walls & Drywall",
    icon: "PaintBucket",
    description: "Drywall, painting, texturing, and wall repairs",
    subcategories: ["Drywall", "Painting", "Texturing", "Wallpaper", "Patching"]
  },
  {
    id: "flooring",
    name: "Flooring & Tiles",
    icon: "Square",
    description: "Tile, hardwood, laminate, and floor repairs",
    subcategories: ["Tile", "Hardwood", "Laminate", "Vinyl", "Carpet", "Grout"]
  },
  {
    id: "doors-windows",
    name: "Doors & Windows",
    icon: "DoorOpen",
    description: "Door and window installation, repairs, and hardware",
    subcategories: ["Doors", "Windows", "Locks", "Hardware", "Weatherproofing", "Screens"]
  },
  {
    id: "appliances",
    name: "Appliance Installation",
    icon: "Package",
    description: "Install and setup household appliances",
    subcategories: ["Kitchen", "Laundry", "HVAC", "Water", "Smart Appliances"]
  },
  {
    id: "furniture",
    name: "Furniture & Assembly",
    icon: "Package",
    description: "Furniture assembly, mounting, and repairs",
    subcategories: ["Assembly", "TV Mounting", "Shelving", "Office", "Outdoor", "Repairs"]
  },
  {
    id: "exterior",
    name: "Exterior & Outdoor",
    icon: "Home",
    description: "Outdoor repairs, maintenance, and installations",
    subcategories: ["Gutters", "Siding", "Fences", "Decks", "Landscaping", "Pressure Washing"]
  },
  {
    id: "hvac",
    name: "HVAC & Climate",
    icon: "Wind",
    description: "Heating, cooling, and ventilation services",
    subcategories: ["AC Units", "Heating", "Ventilation", "Thermostats", "Filters"],
    requiresLicense: "TSSA Certified for gas work"
  },
  {
    id: "bathroom",
    name: "Bathroom Renovations",
    icon: "Bath",
    description: "Complete bathroom services and renovations",
    subcategories: ["Fixtures", "Vanities", "Showers", "Tubs", "Tiles", "Accessories"]
  },
  {
    id: "kitchen",
    name: "Kitchen Services",
    icon: "Utensils",
    description: "Kitchen repairs, installations, and updates",
    subcategories: ["Cabinets", "Countertops", "Backsplash", "Sinks", "Fixtures", "Organization"]
  },
  {
    id: "safety",
    name: "Safety & Security",
    icon: "Shield",
    description: "Safety installations and security upgrades",
    subcategories: ["Smoke Detectors", "Carbon Monoxide", "Security", "Childproofing", "Handrails"]
  },
  {
    id: "smart-home",
    name: "Smart Home Setup",
    icon: "Wifi",
    description: "Smart device installation and configuration",
    subcategories: ["Thermostats", "Doorbells", "Locks", "Lighting", "Speakers", "Security"]
  },
  {
    id: "office",
    name: "Office & Commercial",
    icon: "Briefcase",
    description: "Office setups, commercial repairs, and workspace solutions",
    subcategories: ["Desks", "Whiteboards", "Cable Management", "Signage", "Partitions", "Storage"]
  }
];

export const comprehensiveServices: ServiceItem[] = [
  // Plumbing Services (20+ items)
  {
    id: "p001",
    name: "Faucet Repair/Replace",
    category: "plumbing",
    subcategory: "Faucets",
    description: "Fix leaky faucets or install new ones",
    estimatedTime: "45-90 min",
    priceRange: { min: 85, max: 150 },
    popularityScore: 95,
    tags: ["urgent", "common", "water-saving"],
    searchTerms: ["leaky faucet", "dripping tap", "faucet installation", "kitchen faucet", "bathroom faucet"]
  },
  {
    id: "p002",
    name: "Toilet Repair",
    category: "plumbing",
    subcategory: "Toilets",
    description: "Fix running toilets, replace parts, adjust fill valves",
    estimatedTime: "45-75 min",
    priceRange: { min: 95, max: 175 },
    popularityScore: 92,
    tags: ["urgent", "common"],
    searchTerms: ["running toilet", "toilet won't flush", "toilet repair", "flapper replacement"]
  },
  {
    id: "p003",
    name: "Toilet Installation",
    category: "plumbing",
    subcategory: "Toilets",
    description: "Remove old toilet and install new one",
    estimatedTime: "90-150 min",
    priceRange: { min: 185, max: 350 },
    requiresLicense: "306A Plumber for main line work",
    popularityScore: 78,
    tags: ["renovation", "upgrade"],
    searchTerms: ["toilet installation", "new toilet", "toilet replacement"]
  },
  {
    id: "p004",
    name: "Unclog Drain",
    category: "plumbing",
    subcategory: "Drains",
    description: "Clear blocked sinks, tubs, or shower drains",
    estimatedTime: "30-90 min",
    priceRange: { min: 95, max: 225 },
    popularityScore: 88,
    tags: ["urgent", "common"],
    searchTerms: ["clogged drain", "blocked sink", "slow drain", "drain cleaning"]
  },
  {
    id: "p005",
    name: "P-Trap Replacement",
    category: "plumbing",
    subcategory: "Pipes",
    description: "Replace P-trap under sinks",
    estimatedTime: "45-60 min",
    priceRange: { min: 85, max: 145 },
    popularityScore: 65,
    tags: ["repair"],
    searchTerms: ["p-trap", "under sink leak", "drain pipe"]
  },
  {
    id: "p006",
    name: "Shut-off Valve Replace",
    category: "plumbing",
    subcategory: "Fixtures",
    description: "Replace faulty shut-off valves",
    estimatedTime: "60-90 min",
    priceRange: { min: 115, max: 195 },
    popularityScore: 70,
    tags: ["safety", "preventive"],
    searchTerms: ["shut off valve", "water valve", "angle stop"]
  },
  {
    id: "p007",
    name: "Garbage Disposal Install",
    category: "plumbing",
    subcategory: "Fixtures",
    description: "Install or replace garbage disposal unit",
    estimatedTime: "90-120 min",
    priceRange: { min: 175, max: 295 },
    popularityScore: 75,
    tags: ["kitchen", "upgrade"],
    searchTerms: ["garbage disposal", "garburator", "kitchen disposal"]
  },
  {
    id: "p008",
    name: "Water Heater Maintenance",
    category: "plumbing",
    subcategory: "Water Heaters",
    description: "Flush tank, check anode rod, adjust temperature",
    estimatedTime: "60-90 min",
    priceRange: { min: 125, max: 195 },
    requiresLicense: "TSSA for gas water heaters",
    popularityScore: 68,
    tags: ["maintenance", "preventive"],
    searchTerms: ["water heater service", "hot water tank", "water heater maintenance"]
  },
  {
    id: "p009",
    name: "Shower Head Replace",
    category: "plumbing",
    subcategory: "Fixtures",
    description: "Install new shower head or hand shower",
    estimatedTime: "30-45 min",
    priceRange: { min: 65, max: 95 },
    popularityScore: 82,
    tags: ["easy", "upgrade"],
    searchTerms: ["shower head", "rain shower", "hand shower installation"]
  },
  {
    id: "p010",
    name: "Bidet Installation",
    category: "plumbing",
    subcategory: "Fixtures",
    description: "Install bidet attachment or bidet toilet seat",
    estimatedTime: "60-90 min",
    priceRange: { min: 125, max: 225 },
    popularityScore: 60,
    tags: ["upgrade", "luxury"],
    searchTerms: ["bidet installation", "bidet toilet seat", "washlet"]
  },

  // Electrical Services (20+ items)
  {
    id: "e001",
    name: "Outlet Replacement",
    category: "electrical",
    subcategory: "Outlets",
    description: "Replace standard outlets with new or GFCI outlets",
    estimatedTime: "30-45 min",
    priceRange: { min: 95, max: 145 },
    requiresLicense: "ESA Licensed Electrical Contractor",
    popularityScore: 85,
    tags: ["safety", "upgrade"],
    searchTerms: ["outlet replacement", "GFCI outlet", "electrical outlet", "power outlet"]
  },
  {
    id: "e002",
    name: "USB Outlet Install",
    category: "electrical",
    subcategory: "Outlets",
    description: "Install outlets with built-in USB charging ports",
    estimatedTime: "45-60 min",
    priceRange: { min: 115, max: 175 },
    requiresLicense: "ESA Licensed Electrical Contractor",
    popularityScore: 78,
    tags: ["upgrade", "modern"],
    searchTerms: ["USB outlet", "charging outlet", "USB wall outlet"]
  },
  {
    id: "e003",
    name: "Light Switch Replace",
    category: "electrical",
    subcategory: "Switches",
    description: "Replace standard switches or install dimmers",
    estimatedTime: "30-45 min",
    priceRange: { min: 85, max: 135 },
    requiresLicense: "ESA Licensed Electrical Contractor",
    popularityScore: 80,
    tags: ["upgrade", "lighting"],
    searchTerms: ["light switch", "dimmer switch", "switch replacement"]
  },
  {
    id: "e004",
    name: "Ceiling Fan Install",
    category: "electrical",
    subcategory: "Fixtures",
    description: "Install or replace ceiling fan with or without light",
    estimatedTime: "90-150 min",
    priceRange: { min: 195, max: 395 },
    requiresLicense: "ESA Licensed Electrical Contractor",
    popularityScore: 83,
    tags: ["cooling", "lighting"],
    searchTerms: ["ceiling fan installation", "fan installation", "ceiling fan with light"]
  },
  {
    id: "e005",
    name: "Light Fixture Replace",
    category: "electrical",
    subcategory: "Lighting",
    description: "Replace ceiling lights, chandeliers, or pendant lights",
    estimatedTime: "45-90 min",
    priceRange: { min: 125, max: 245 },
    requiresLicense: "ESA Licensed Electrical Contractor",
    popularityScore: 87,
    tags: ["lighting", "decor"],
    searchTerms: ["light fixture", "chandelier installation", "pendant light"]
  },
  {
    id: "e006",
    name: "Recessed Lighting Install",
    category: "electrical",
    subcategory: "Lighting",
    description: "Install pot lights or recessed lighting",
    estimatedTime: "60-90 min per light",
    priceRange: { min: 145, max: 225 },
    requiresLicense: "ESA Licensed Electrical Contractor",
    popularityScore: 75,
    tags: ["lighting", "modern"],
    searchTerms: ["pot lights", "recessed lighting", "can lights"]
  },
  {
    id: "e007",
    name: "Smart Switch Install",
    category: "electrical",
    subcategory: "Smart Home",
    description: "Install WiFi-enabled smart switches",
    estimatedTime: "45-75 min",
    priceRange: { min: 125, max: 195 },
    requiresLicense: "ESA Licensed Electrical Contractor",
    popularityScore: 72,
    tags: ["smart home", "automation"],
    searchTerms: ["smart switch", "wifi switch", "automated lighting"]
  },
  {
    id: "e008",
    name: "Doorbell Installation",
    category: "electrical",
    subcategory: "Fixtures",
    description: "Install wired or wireless doorbell",
    estimatedTime: "60-90 min",
    priceRange: { min: 95, max: 175 },
    requiresLicense: "ESA Licensed for wired",
    popularityScore: 76,
    tags: ["security", "smart home"],
    searchTerms: ["doorbell installation", "ring doorbell", "video doorbell"]
  },
  {
    id: "e009",
    name: "EV Charger Install",
    category: "electrical",
    subcategory: "Fixtures",
    description: "Install Level 2 EV charging station",
    estimatedTime: "180-300 min",
    priceRange: { min: 895, max: 1895 },
    requiresLicense: "ESA Licensed Electrical Contractor",
    popularityScore: 55,
    tags: ["EV", "specialty"],
    searchTerms: ["EV charger", "Tesla charger", "electric vehicle charging"]
  },
  {
    id: "e010",
    name: "Under Cabinet Lighting",
    category: "electrical",
    subcategory: "Lighting",
    description: "Install LED strips or puck lights under cabinets",
    estimatedTime: "90-150 min",
    priceRange: { min: 185, max: 345 },
    requiresLicense: "ESA Licensed for hardwired",
    popularityScore: 70,
    tags: ["kitchen", "lighting"],
    searchTerms: ["under cabinet lighting", "kitchen lighting", "LED strips"]
  },

  // Carpentry & Furniture Services (20+ items)
  {
    id: "c001",
    name: "TV Wall Mount",
    category: "furniture",
    subcategory: "TV Mounting",
    description: "Mount TV on wall with proper bracket and cable management",
    estimatedTime: "60-120 min",
    priceRange: { min: 125, max: 245 },
    popularityScore: 93,
    tags: ["popular", "living room"],
    searchTerms: ["TV mounting", "TV installation", "wall mount TV", "TV bracket"]
  },
  {
    id: "c002",
    name: "Floating Shelf Install",
    category: "carpentry",
    subcategory: "Shelving",
    description: "Install floating shelves with hidden brackets",
    estimatedTime: "45-75 min",
    priceRange: { min: 85, max: 145 },
    popularityScore: 81,
    tags: ["storage", "decor"],
    searchTerms: ["floating shelves", "wall shelves", "shelf installation"]
  },
  {
    id: "c003",
    name: "IKEA Furniture Assembly",
    category: "furniture",
    subcategory: "Assembly",
    description: "Assemble IKEA furniture items",
    estimatedTime: "60-180 min",
    priceRange: { min: 95, max: 295 },
    popularityScore: 89,
    tags: ["assembly", "IKEA"],
    searchTerms: ["IKEA assembly", "furniture assembly", "IKEA furniture"]
  },
  {
    id: "c004",
    name: "Closet Organization Install",
    category: "carpentry",
    subcategory: "Cabinets",
    description: "Install closet organizer systems",
    estimatedTime: "120-240 min",
    priceRange: { min: 245, max: 495 },
    popularityScore: 77,
    tags: ["organization", "storage"],
    searchTerms: ["closet organizer", "closet system", "closet shelving"]
  },
  {
    id: "c005",
    name: "Door Installation",
    category: "doors-windows",
    subcategory: "Doors",
    description: "Install interior or exterior doors",
    estimatedTime: "120-180 min",
    priceRange: { min: 245, max: 445 },
    popularityScore: 73,
    tags: ["renovation", "security"],
    searchTerms: ["door installation", "new door", "door replacement"]
  },
  {
    id: "c006",
    name: "Door Adjustment",
    category: "doors-windows",
    subcategory: "Doors",
    description: "Adjust door alignment, fix sticking or sagging",
    estimatedTime: "45-75 min",
    priceRange: { min: 85, max: 145 },
    popularityScore: 79,
    tags: ["repair", "common"],
    searchTerms: ["door repair", "sticking door", "door won't close", "door adjustment"]
  },
  {
    id: "c007",
    name: "Cabinet Hardware Replace",
    category: "carpentry",
    subcategory: "Cabinets",
    description: "Replace cabinet knobs, pulls, and hinges",
    estimatedTime: "60-120 min",
    priceRange: { min: 95, max: 195 },
    popularityScore: 74,
    tags: ["kitchen", "bathroom", "update"],
    searchTerms: ["cabinet hardware", "cabinet pulls", "kitchen hardware"]
  },
  {
    id: "c008",
    name: "Crown Molding Install",
    category: "carpentry",
    subcategory: "Trim",
    description: "Install decorative crown molding",
    estimatedTime: "180-360 min",
    priceRange: { min: 395, max: 795 },
    popularityScore: 62,
    tags: ["decorative", "upgrade"],
    searchTerms: ["crown molding", "molding installation", "trim work"]
  },
  {
    id: "c009",
    name: "Baseboard Install",
    category: "carpentry",
    subcategory: "Trim",
    description: "Install or replace baseboards",
    estimatedTime: "120-240 min",
    priceRange: { min: 245, max: 495 },
    popularityScore: 68,
    tags: ["finishing", "renovation"],
    searchTerms: ["baseboard installation", "baseboards", "trim installation"]
  },
  {
    id: "c010",
    name: "Deck Repair",
    category: "exterior",
    subcategory: "Decks",
    description: "Replace deck boards, fix railings, structural repairs",
    estimatedTime: "180-480 min",
    priceRange: { min: 395, max: 995 },
    popularityScore: 65,
    tags: ["outdoor", "safety"],
    searchTerms: ["deck repair", "deck boards", "railing repair"]
  },

  // Drywall & Painting Services (15+ items)
  {
    id: "d001",
    name: "Small Drywall Patch",
    category: "walls",
    subcategory: "Drywall",
    description: "Patch nail holes or small drywall damage (under 3 inches)",
    estimatedTime: "60-90 min",
    priceRange: { min: 95, max: 165 },
    popularityScore: 86,
    tags: ["repair", "common"],
    searchTerms: ["drywall patch", "hole in wall", "wall repair", "nail holes"]
  },
  {
    id: "d002",
    name: "Large Drywall Repair",
    category: "walls",
    subcategory: "Drywall",
    description: "Fix large holes or water damage (over 3 inches)",
    estimatedTime: "120-240 min",
    priceRange: { min: 245, max: 495 },
    popularityScore: 72,
    tags: ["repair", "damage"],
    searchTerms: ["large hole repair", "drywall damage", "water damage repair"]
  },
  {
    id: "d003",
    name: "Room Painting",
    category: "walls",
    subcategory: "Painting",
    description: "Paint single room walls and ceiling",
    estimatedTime: "360-480 min",
    priceRange: { min: 495, max: 995 },
    popularityScore: 78,
    tags: ["renovation", "refresh"],
    searchTerms: ["room painting", "paint room", "interior painting"]
  },
  {
    id: "d004",
    name: "Accent Wall",
    category: "walls",
    subcategory: "Painting",
    description: "Paint or install feature wall treatment",
    estimatedTime: "180-300 min",
    priceRange: { min: 295, max: 595 },
    popularityScore: 69,
    tags: ["decor", "feature"],
    searchTerms: ["accent wall", "feature wall", "statement wall"]
  },
  {
    id: "d005",
    name: "Wallpaper Removal",
    category: "walls",
    subcategory: "Wallpaper",
    description: "Remove old wallpaper and prep walls",
    estimatedTime: "240-480 min",
    priceRange: { min: 395, max: 795 },
    popularityScore: 58,
    tags: ["renovation", "prep"],
    searchTerms: ["wallpaper removal", "remove wallpaper", "strip wallpaper"]
  },
  {
    id: "d006",
    name: "Wallpaper Installation",
    category: "walls",
    subcategory: "Wallpaper",
    description: "Install new wallpaper or wall covering",
    estimatedTime: "240-480 min",
    priceRange: { min: 495, max: 995 },
    popularityScore: 55,
    tags: ["decor", "specialty"],
    searchTerms: ["wallpaper installation", "install wallpaper", "wall covering"]
  },
  {
    id: "d007",
    name: "Texture Repair",
    category: "walls",
    subcategory: "Texturing",
    description: "Match and repair textured walls or ceilings",
    estimatedTime: "90-180 min",
    priceRange: { min: 195, max: 395 },
    popularityScore: 64,
    tags: ["repair", "specialty"],
    searchTerms: ["texture repair", "ceiling texture", "wall texture"]
  },
  {
    id: "d008",
    name: "Caulking & Sealing",
    category: "walls",
    subcategory: "Patching",
    description: "Re-caulk bathrooms, kitchens, windows",
    estimatedTime: "60-120 min",
    priceRange: { min: 95, max: 195 },
    popularityScore: 75,
    tags: ["maintenance", "waterproofing"],
    searchTerms: ["caulking", "re-caulk", "seal gaps", "bathroom caulk"]
  },

  // Flooring Services (15+ items)
  {
    id: "f001",
    name: "Tile Repair",
    category: "flooring",
    subcategory: "Tile",
    description: "Replace cracked or broken tiles",
    estimatedTime: "90-180 min",
    priceRange: { min: 165, max: 345 },
    popularityScore: 71,
    tags: ["repair", "bathroom", "kitchen"],
    searchTerms: ["tile repair", "cracked tile", "broken tile", "tile replacement"]
  },
  {
    id: "f002",
    name: "Grout Repair",
    category: "flooring",
    subcategory: "Grout",
    description: "Re-grout tiles or repair damaged grout",
    estimatedTime: "120-240 min",
    priceRange: { min: 195, max: 395 },
    popularityScore: 68,
    tags: ["maintenance", "bathroom"],
    searchTerms: ["grout repair", "re-grout", "grout cleaning", "tile grout"]
  },
  {
    id: "f003",
    name: "Laminate Floor Repair",
    category: "flooring",
    subcategory: "Laminate",
    description: "Fix scratches, replace damaged planks",
    estimatedTime: "90-180 min",
    priceRange: { min: 145, max: 295 },
    popularityScore: 66,
    tags: ["repair", "flooring"],
    searchTerms: ["laminate repair", "floor repair", "scratched floor"]
  },
  {
    id: "f004",
    name: "Hardwood Floor Repair",
    category: "flooring",
    subcategory: "Hardwood",
    description: "Fix squeaks, scratches, or replace boards",
    estimatedTime: "120-240 min",
    priceRange: { min: 245, max: 495 },
    popularityScore: 69,
    tags: ["repair", "premium"],
    searchTerms: ["hardwood repair", "squeaky floor", "floor refinishing"]
  },
  {
    id: "f005",
    name: "Vinyl Plank Install",
    category: "flooring",
    subcategory: "Vinyl",
    description: "Install luxury vinyl plank flooring",
    estimatedTime: "360-720 min",
    priceRange: { min: 795, max: 1995 },
    popularityScore: 73,
    tags: ["installation", "renovation"],
    searchTerms: ["vinyl plank", "LVP installation", "vinyl flooring"]
  },
  {
    id: "f006",
    name: "Carpet Repair",
    category: "flooring",
    subcategory: "Carpet",
    description: "Fix carpet tears, burns, or re-stretch",
    estimatedTime: "60-120 min",
    priceRange: { min: 125, max: 245 },
    popularityScore: 61,
    tags: ["repair", "carpet"],
    searchTerms: ["carpet repair", "carpet stretching", "carpet patch"]
  },
  {
    id: "f007",
    name: "Transition Strip Install",
    category: "flooring",
    subcategory: "Hardwood",
    description: "Install transition strips between flooring types",
    estimatedTime: "45-90 min",
    priceRange: { min: 85, max: 165 },
    popularityScore: 64,
    tags: ["finishing", "flooring"],
    searchTerms: ["transition strip", "floor transition", "threshold"]
  },

  // Window & Door Services (10+ items)
  {
    id: "w001",
    name: "Lock Installation",
    category: "doors-windows",
    subcategory: "Locks",
    description: "Install deadbolts or smart locks",
    estimatedTime: "60-90 min",
    priceRange: { min: 125, max: 225 },
    popularityScore: 82,
    tags: ["security", "smart home"],
    searchTerms: ["lock installation", "deadbolt", "smart lock", "door lock"]
  },
  {
    id: "w002",
    name: "Window Screen Repair",
    category: "doors-windows",
    subcategory: "Screens",
    description: "Repair or replace window screens",
    estimatedTime: "30-60 min",
    priceRange: { min: 65, max: 125 },
    popularityScore: 67,
    tags: ["repair", "seasonal"],
    searchTerms: ["screen repair", "window screen", "torn screen"]
  },
  {
    id: "w003",
    name: "Weather Stripping",
    category: "doors-windows",
    subcategory: "Weatherproofing",
    description: "Install weather stripping on doors and windows",
    estimatedTime: "60-120 min",
    priceRange: { min: 95, max: 195 },
    popularityScore: 70,
    tags: ["energy saving", "winterizing"],
    searchTerms: ["weather stripping", "door seal", "draft stopper", "winterize"]
  },
  {
    id: "w004",
    name: "Window Hardware Repair",
    category: "doors-windows",
    subcategory: "Hardware",
    description: "Fix window cranks, latches, or sliding mechanisms",
    estimatedTime: "45-90 min",
    priceRange: { min: 85, max: 165 },
    popularityScore: 63,
    tags: ["repair", "hardware"],
    searchTerms: ["window repair", "window won't open", "window latch", "window crank"]
  },
  {
    id: "w005",
    name: "Door Closer Install",
    category: "doors-windows",
    subcategory: "Hardware",
    description: "Install automatic door closer",
    estimatedTime: "45-75 min",
    priceRange: { min: 95, max: 175 },
    popularityScore: 59,
    tags: ["commercial", "safety"],
    searchTerms: ["door closer", "automatic door", "door spring"]
  },
  {
    id: "w006",
    name: "Pet Door Install",
    category: "doors-windows",
    subcategory: "Doors",
    description: "Install pet door in door or wall",
    estimatedTime: "90-180 min",
    priceRange: { min: 195, max: 395 },
    popularityScore: 56,
    tags: ["pets", "specialty"],
    searchTerms: ["pet door", "doggy door", "cat door", "pet flap"]
  },

  // Smart Home & Technology (10+ items)
  {
    id: "s001",
    name: "Smart Thermostat Install",
    category: "smart-home",
    subcategory: "Thermostats",
    description: "Install and configure smart thermostat",
    estimatedTime: "60-90 min",
    priceRange: { min: 145, max: 245 },
    requiresLicense: "ESA for line voltage",
    popularityScore: 76,
    tags: ["smart home", "energy saving"],
    searchTerms: ["smart thermostat", "nest thermostat", "ecobee", "thermostat installation"]
  },
  {
    id: "s002",
    name: "Smart Doorbell Install",
    category: "smart-home",
    subcategory: "Doorbells",
    description: "Install video doorbell with app setup",
    estimatedTime: "60-90 min",
    priceRange: { min: 125, max: 195 },
    popularityScore: 79,
    tags: ["security", "smart home"],
    searchTerms: ["ring doorbell", "video doorbell", "smart doorbell", "nest hello"]
  },
  {
    id: "s003",
    name: "Smart Lock Install",
    category: "smart-home",
    subcategory: "Locks",
    description: "Install keyless smart lock with app configuration",
    estimatedTime: "75-120 min",
    priceRange: { min: 165, max: 265 },
    popularityScore: 74,
    tags: ["security", "convenience"],
    searchTerms: ["smart lock", "keyless entry", "august lock", "schlage encode"]
  },
  {
    id: "s004",
    name: "Home Security Camera",
    category: "smart-home",
    subcategory: "Security",
    description: "Install and configure security cameras",
    estimatedTime: "60-120 min per camera",
    priceRange: { min: 125, max: 225 },
    popularityScore: 77,
    tags: ["security", "monitoring"],
    searchTerms: ["security camera", "surveillance camera", "ring camera", "arlo"]
  },
  {
    id: "s005",
    name: "Smart Speaker Setup",
    category: "smart-home",
    subcategory: "Speakers",
    description: "Mount and configure smart speakers",
    estimatedTime: "30-60 min",
    priceRange: { min: 65, max: 125 },
    popularityScore: 68,
    tags: ["audio", "smart home"],
    searchTerms: ["alexa setup", "google home", "smart speaker", "sonos"]
  },

  // Office & Commercial Services (10+ items)
  {
    id: "o001",
    name: "Desk Assembly",
    category: "office",
    subcategory: "Desks",
    description: "Assemble office desks including sit-stand desks",
    estimatedTime: "90-180 min",
    priceRange: { min: 145, max: 345 },
    popularityScore: 84,
    tags: ["office", "assembly"],
    searchTerms: ["desk assembly", "standing desk", "office desk", "sit stand desk"]
  },
  {
    id: "o002",
    name: "Whiteboard Installation",
    category: "office",
    subcategory: "Whiteboards",
    description: "Mount whiteboards or glass boards",
    estimatedTime: "60-90 min",
    priceRange: { min: 125, max: 195 },
    popularityScore: 73,
    tags: ["office", "meeting room"],
    searchTerms: ["whiteboard installation", "glass board", "dry erase board"]
  },
  {
    id: "o003",
    name: "Cable Management",
    category: "office",
    subcategory: "Cable Management",
    description: "Install cable trays, raceways, and organize cables",
    estimatedTime: "90-180 min",
    priceRange: { min: 145, max: 295 },
    popularityScore: 71,
    tags: ["office", "organization"],
    searchTerms: ["cable management", "cable tray", "wire management", "cable organizer"]
  },
  {
    id: "o004",
    name: "Office Signage",
    category: "office",
    subcategory: "Signage",
    description: "Install interior or exterior business signage",
    estimatedTime: "60-120 min",
    priceRange: { min: 125, max: 295 },
    popularityScore: 66,
    tags: ["commercial", "branding"],
    searchTerms: ["office sign", "business signage", "door sign", "company sign"]
  },
  {
    id: "o005",
    name: "Cubicle Assembly",
    category: "office",
    subcategory: "Partitions",
    description: "Assemble office cubicles and partitions",
    estimatedTime: "180-360 min",
    priceRange: { min: 395, max: 795 },
    popularityScore: 61,
    tags: ["office", "commercial"],
    searchTerms: ["cubicle assembly", "office partition", "workstation setup"]
  },
  {
    id: "o006",
    name: "Monitor Mount Install",
    category: "office",
    subcategory: "Desks",
    description: "Install monitor arms or multi-monitor mounts",
    estimatedTime: "45-90 min",
    priceRange: { min: 95, max: 175 },
    popularityScore: 78,
    tags: ["office", "ergonomics"],
    searchTerms: ["monitor mount", "monitor arm", "dual monitor", "VESA mount"]
  },

  // Bathroom Specific Services (10+ items)
  {
    id: "b001",
    name: "Vanity Installation",
    category: "bathroom",
    subcategory: "Vanities",
    description: "Install bathroom vanity and sink",
    estimatedTime: "180-300 min",
    priceRange: { min: 395, max: 795 },
    requiresLicense: "306A for plumbing connections",
    popularityScore: 72,
    tags: ["bathroom", "renovation"],
    searchTerms: ["vanity installation", "bathroom vanity", "sink installation"]
  },
  {
    id: "b002",
    name: "Shower Door Install",
    category: "bathroom",
    subcategory: "Showers",
    description: "Install frameless or framed shower doors",
    estimatedTime: "120-240 min",
    priceRange: { min: 345, max: 695 },
    popularityScore: 68,
    tags: ["bathroom", "upgrade"],
    searchTerms: ["shower door", "glass shower door", "shower enclosure"]
  },
  {
    id: "b003",
    name: "Towel Bar Install",
    category: "bathroom",
    subcategory: "Accessories",
    description: "Install towel bars, rings, and hooks",
    estimatedTime: "30-60 min",
    priceRange: { min: 65, max: 125 },
    popularityScore: 76,
    tags: ["bathroom", "accessories"],
    searchTerms: ["towel bar", "towel rack", "bathroom accessories"]
  },
  {
    id: "b004",
    name: "Medicine Cabinet Install",
    category: "bathroom",
    subcategory: "Fixtures",
    description: "Install recessed or surface-mount medicine cabinet",
    estimatedTime: "90-150 min",
    priceRange: { min: 165, max: 295 },
    popularityScore: 65,
    tags: ["bathroom", "storage"],
    searchTerms: ["medicine cabinet", "bathroom cabinet", "mirror cabinet"]
  },
  {
    id: "b005",
    name: "Exhaust Fan Install",
    category: "bathroom",
    subcategory: "Fixtures",
    description: "Install or replace bathroom exhaust fan",
    estimatedTime: "90-150 min",
    priceRange: { min: 195, max: 345 },
    requiresLicense: "ESA for electrical",
    popularityScore: 70,
    tags: ["bathroom", "ventilation"],
    searchTerms: ["bathroom fan", "exhaust fan", "ventilation fan"]
  },

  // Kitchen Specific Services (10+ items)
  {
    id: "k001",
    name: "Kitchen Faucet Install",
    category: "kitchen",
    subcategory: "Fixtures",
    description: "Install new kitchen faucet with sprayer",
    estimatedTime: "60-90 min",
    priceRange: { min: 125, max: 195 },
    popularityScore: 81,
    tags: ["kitchen", "plumbing"],
    searchTerms: ["kitchen faucet", "faucet installation", "pull-down faucet"]
  },
  {
    id: "k002",
    name: "Backsplash Install",
    category: "kitchen",
    subcategory: "Backsplash",
    description: "Install tile or other backsplash material",
    estimatedTime: "240-480 min",
    priceRange: { min: 495, max: 1295 },
    popularityScore: 74,
    tags: ["kitchen", "tile"],
    searchTerms: ["backsplash installation", "kitchen backsplash", "tile backsplash"]
  },
  {
    id: "k003",
    name: "Cabinet Organization",
    category: "kitchen",
    subcategory: "Organization",
    description: "Install pull-out shelves and organizers",
    estimatedTime: "120-240 min",
    priceRange: { min: 195, max: 495 },
    popularityScore: 72,
    tags: ["kitchen", "organization"],
    searchTerms: ["cabinet organizers", "pull out shelves", "kitchen organization"]
  },
  {
    id: "k004",
    name: "Dishwasher Install",
    category: "kitchen",
    subcategory: "Fixtures",
    description: "Install or replace dishwasher",
    estimatedTime: "120-180 min",
    priceRange: { min: 245, max: 395 },
    requiresLicense: "306A for plumbing, ESA for electrical",
    popularityScore: 69,
    tags: ["kitchen", "appliance"],
    searchTerms: ["dishwasher installation", "dishwasher hookup", "new dishwasher"]
  },
  {
    id: "k005",
    name: "Range Hood Install",
    category: "kitchen",
    subcategory: "Fixtures",
    description: "Install over-range hood with venting",
    estimatedTime: "120-240 min",
    priceRange: { min: 295, max: 595 },
    requiresLicense: "ESA for electrical",
    popularityScore: 66,
    tags: ["kitchen", "ventilation"],
    searchTerms: ["range hood", "exhaust hood", "kitchen ventilation"]
  },

  // Exterior & Outdoor Services (10+ items)
  {
    id: "x001",
    name: "Gutter Cleaning",
    category: "exterior",
    subcategory: "Gutters",
    description: "Clean gutters and downspouts",
    estimatedTime: "90-180 min",
    priceRange: { min: 145, max: 295 },
    popularityScore: 73,
    tags: ["maintenance", "seasonal"],
    searchTerms: ["gutter cleaning", "eavestrough cleaning", "downspout cleaning"]
  },
  {
    id: "x002",
    name: "Pressure Washing",
    category: "exterior",
    subcategory: "Pressure Washing",
    description: "Pressure wash driveway, deck, or siding",
    estimatedTime: "120-240 min",
    priceRange: { min: 195, max: 495 },
    popularityScore: 71,
    tags: ["cleaning", "exterior"],
    searchTerms: ["pressure washing", "power washing", "driveway cleaning"]
  },
  {
    id: "x003",
    name: "Fence Repair",
    category: "exterior",
    subcategory: "Fences",
    description: "Repair fence panels, posts, or gates",
    estimatedTime: "120-360 min",
    priceRange: { min: 245, max: 695 },
    popularityScore: 67,
    tags: ["outdoor", "repair"],
    searchTerms: ["fence repair", "gate repair", "fence post", "fence panel"]
  },
  {
    id: "x004",
    name: "Outdoor Light Install",
    category: "exterior",
    subcategory: "Lighting",
    description: "Install outdoor security or decorative lighting",
    estimatedTime: "90-180 min",
    priceRange: { min: 195, max: 395 },
    requiresLicense: "ESA for electrical",
    popularityScore: 70,
    tags: ["security", "lighting"],
    searchTerms: ["outdoor lighting", "security light", "motion sensor light"]
  },
  {
    id: "x005",
    name: "Shed Assembly",
    category: "exterior",
    subcategory: "Landscaping",
    description: "Assemble prefab storage shed",
    estimatedTime: "360-720 min",
    priceRange: { min: 695, max: 1495 },
    popularityScore: 58,
    tags: ["storage", "outdoor"],
    searchTerms: ["shed assembly", "storage shed", "outdoor storage"]
  }
];

// Helper function to get services by category
export function getServicesByCategory(categoryId: string): ServiceItem[] {
  return comprehensiveServices.filter(service => service.category === categoryId);
}

// Helper function to search services
export function searchServices(query: string): ServiceItem[] {
  const lowerQuery = query.toLowerCase();
  return comprehensiveServices.filter(service => 
    service.name.toLowerCase().includes(lowerQuery) ||
    service.description.toLowerCase().includes(lowerQuery) ||
    service.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    service.searchTerms.some(term => term.toLowerCase().includes(lowerQuery))
  );
}

// Get popular services
export function getPopularServices(limit: number = 10): ServiceItem[] {
  return [...comprehensiveServices]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, limit);
}

// Get services that require licenses
export function getLicensedServices(): ServiceItem[] {
  return comprehensiveServices.filter(service => service.requiresLicense);
}