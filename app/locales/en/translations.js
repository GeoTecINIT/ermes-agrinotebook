export default {
  //
  // WARNING! Translate only text between " " characters
  // It is important to avoid translating text between ' ' and {{ }}
  //
  // Please, try to use strings with a similar length to the original.
  // Use short synonyms as possible, always keeping the same meaning.
  // This is primordial to keep UI homogeneity.
  //
  // Thanks for your collaboration
  //

  'login': {
    'text': {
      'login': "Log in",
      'signup': "Sign up",
      'enter-as-guest': "Enter as guest"
    },
    'login-p': {
      'username-f': "Enter username",
      'password-f': "Enter password",
      'login-btn': "Log in"
    },
    'signup-p': {
      'name-f': "Name",
      'surname-f': "Surname",
      'username-f': "Enter desired username",
      'collaborating-with': "Owner (optional)",
      'password-f': "Your password",
      'repeat-password-f': "Repeat your password",
      'email-f': "Your email",
      'repeat-email-f': "Repeat your email",
      'signup-btn': "Sign up"
    }
  },
  'fields': {
    'text': {
      'my-fields': "My fields",
      'crop-info': "Crop Info",
      'soil-type': "Soil Type",
      'soil-condition': "Soil Condition",
      'crop-phenology': "Crop Phenology",
      'insects': "Insects",
      'diseases': "Diseases",
      'weeds': "Weeds",
      'abiotic-stresses': "Abiotic Stresses",
      'fertilizers': "Fertilizers",
      'agrochemicals': "Agrochemicals",
      'irrigation': "Irrigation",
      'yield': "Yield",
      'observation': "Observation",
      'parcel-info': "Parcel Info",
      'add-new': "Add info",
      'default': 'Default',
      'custom': 'Custom',
      'other': 'Other (specify)',
      'share': "Share with other Ermes users"
    },
    'ui-special': {
      'agrochemicals': "Agro chemicals"
    },
    'header': {
      'title': "General View",
      'add-info-tooltip': "Add field(s) info",
      'observation-tooltip': "Add new observation",
      'options-tooltip': "User menu"
    },
    'map-tools': {
      'confirm-selection': "Add fields",
      'discard-changes': "Discard changes",
      'select-all': "Select all fields",
      'invert-selection': "Invert selected fields",
      'parcel-info': "Selected parcel info"
    },
    'options-m': {
      'title': "Hello, {{username}}",
      'profile': "My profile",
      'fields': "My fields",
      'about': "About",
      'search': "Search parcel",
      'logout': "Logout"
    }
  },
  'panel': {
    'about': {
      'content': "Developed by the GEOTEC group"
    },
    'agrochemicals': {
      'date': "Date of usage",
      'product': "Product",
      'quantity': "Quantity",
      'quantity-unit': "Kg/hectare"
    },
    'crop-info': {
      'crop-type': "Crop type",
      'rice-variety': "Rice variety",
      'puddling': 'Puddling',
      'sowing-type': "Sowing type",
      'amount': "Amount",
      'seeds-per-ha': "Seeds/hectare",
      'date': 'Sowing date'
    },
    'crop-phenology': {
      'date': "Date of observation",
      'development-stage': "Development stage",
      'bbch': "BBCH"
    },
    'diseases': {
      'date': "Date of observation",
      'name': "Name",
      'comment': "Add a comment",
      'picture': "Add a picture",
      'damage': "Damage (1 min - 10 max)"
    },
    'fertilizers': {
      'date': "Date of usage",
      'product': "Product",
      'quantity': "Quantity",
      'quantity-unit': "Kg/hectare",
      'nitrogen': "Nitrogen content",
      'nitrogen-unit': "Kg/hectare",
      'phosphorus': "Phosphorus content",
      'phosphorus-unit': "Kg/hectare",
      'potassium': "Potassium content",
      'potassium-unit': "Kg/hectare"
    },
    'irrigation': {
      'start-date': "Start date",
      'end-date': "End date",
      'measure': "Measure",
      'quantity': "Quantity",
      'quantity-unit-mm': "Millimeters",
      'quantity-unit-m3': "Cubic meters",
      'hours': "Hours",
      'hours-unit': "Hours",
      'height': "Water height"
    },
    'observation': {
      'comment': "Add a comment",
      'picture': "Add a picture",
      'send-btn': "Send observation"
    },
    'insects': {
      'date': "Date of observation",
      'name': "Name",
      'comment': "Add a comment",
      'picture': "Add a picture",
      'damage': "Damage (1 min - 10 max)"
    },
    'abiotic-stresses': {
      'date': "Date of observation",
      'cause': "Cause",
      'comment': "Add a comment",
      'picture': "Add a picture",
      'damage': "Damage (1 min - 10 max)"
    },
    'soil-condition': {
      'status': "Parcel status",
      'date': "Date of observation"
    },
    'soil-type': {
      'texture': "Select the soil texture",
      'organic-matter': "Organic matter",
      'organic-matter-unit':"Percent organic matter",
      'ph': "pH (min 0 - max 14)",
      'date': "Date"
    },
    'weeds': {
      'date': "Date of observation",
      'name': "Name",
      'comment': "Add a comment",
      'picture': "Add a picture",
      'damage': "Percent covered (1 min - 100 max)"
    },
    'yield':{
      'date': "Harvest date",
      'yield': "Yield (dry weight)",
      'yield-unit': "Ton/hectare",
      'comments': "Comments",
      'grain-moisture': "Grain moisture",
      'percent-grain-moisture': "Humidity (%)"
    },
    'parcel-info': {
      'none-selected': "Please select one parcel",
      'crop-info-text': "Parcel crop information",
      'info-table-content': "Content",
      'product-text': "Last product upload dates",
      'product-table-product': "Product",
      'product-table-date': "Date"
    },
    'profile': {
      'picture-section': "Profile picture",
      'username-section': "Username",
      'email-section': "Email",
      'language-section': "Language",
      'email-tooltip': "Change email",
      'password-section': "Password",
      'old-password-tooltip': "Old password",
      'new-password-tooltip': "New password",
      'repeat-new-password-tooltip': "Repeat new password",
      'update': "Update profile",
      'logout': "Logout",
      'services': "Services",
      'enable-notifications': "Enable notifications",
      'enable-alerts': "Enable alerts"
    },
    'notification': {
      'downloading-data': "Downloading data... {{count}} / {{total}}",
      'offline': "Connection lost",
      'online': "Connection established",
      'product-upload': "Uploading parcel info",
      'product-upload-later': "Offline. Product will be uploaded later",
      'user-not-found': "User not found",
      'login-error': "Wrong password",
      'wrong-old-password': "Wrong old password",
      'inactive-account': "Your account has to be activated",
      'password-mismatch': "Passwords don't match",
      'old-password-needed': "You have to provide your old password",
      'email-mismatch': "Emails don't match",
      'regional-error': "This is a regional account",
      'unknown-owner': "Owner does not exist",
      'region-mismatch': "Owner isn't in that region",
      'repeated-email': "Email address is already in the system",
      'user-exits': "Username already exists",
      'processing': "Processing...",
      'welcome': "Welcome, {{username}}",
      'login-allowed': "Now you can,",
      'activation-needed': "Your account will be activated",
      'email-sent': "You will receive an email",
      'missing-date': "Please fill date",
      'missing-parcel': "Please select at least one parcel",
      'missing-marker': "Please place the location of the observation on the map",
      'missing-start-date': "Please fill in the start date",
      'dates-inconsistency': "End date must be later than start date",
      'file-missing': "Please upload an image",
      'offline-parcels': "Sorry, you need to go online to add or delete parcels",
      'offline-profile-update': "Sorry, you cannot update your profile while offline",
      'no-data-offline': "You have lost your connection, and we do not have any info stored about you on this device",
      'parcel-offline': "Sorry, there is no info stored about this parcel on this device, and you don't have connection. Please try again later",
      'try-again': "You can try to",
      'reconnect': "Reconnect",
      'retrieving-info': "We are recovering your profile from our servers. Please wait...",
      'first-login': "Please select your parcels by clicking on them, and hit the check button in the right bottom corner when finished",
      'got-it': "Got it",
      'saved': "Saved",
      'loading-map': "Loading map...",
      'warning': "Warning",
      'possible-outdated': "You're offline - this info could be outdated",
      'wrong-data': "Wrong data"
    },
    'search': {
      'town': "Town",
      'polygon': "Polygon",
      'parcel': "Parcel",
      'search': "Search",
      'map-centered': "Map centered on parcel",
      'service-down': "Search service temporally unavailable"
    }
  },
  'download-assets':{
    'download-basemap': "Download resources for offline browsing (+/- 50MB)?",
    'download-advantages': "We recommend download to allow full offline map availability and to improve performance.",
    'connection-acceptable': "You're currently using a data plan. Depending on your region we can download up to 50 MB. Press OK to continue.",
    'downloading-assets': "We're currently downloading maps to enable offline mode, we'll redirect you when finished. Please be patient",
    'download-error': "An error occurred while downloading",
    'proceed': "Proceed",
    'later': "Not now",
    'it-is-ok': "OK",
    'no-way': "Later",
    'retry': "Retry"
  },
  'update-os': {
    'should-update': "Android version {{version}} detected. This app requires Android 4.4 or higher. Please update your operating system. In case you continue with your current Android version, offline functionality will not be available, and we cannot guarantee full stability of the app.",
    'do-not-show-again': "Do not show again"
  },
  'region': {
    'greece': "Greece",
    'italy': "Italy",
    'spain': "Spain"
  },
  'data': {
    'crop-info': {
      'crop-types': {
        'alpha_alpha': "Alpha_alpha",
        'clover': "Clover",
        'corn': "Corn",
        'meadow': "Meadow",
        'poplar': "Poplar",
        'rice': "Rice",
        'set-aside': "Set-aside",
        'soybean': "Soybean"
      },
      'puddlings': {
        'null': "----",
        'yes': "Yes",
        'no': "No"
      },
      'rice-varieties': {
        'null': "----",
        'alexandros': "Alexandros",
        'augusto': "Augusto",
        'axios': "Axios",
        'bomba': "Bomba",
        'carnaroli': "Carnaroli",
        'cl-12': "Cl 12",
        'cl-26': "Cl 26",
        'cl-46': "Cl 46",
        'cl-80': "Cl 80",
        'clxl745': "Clxl745",
        'dimitra': "Dimitra",
        'dion': "Dion",
        'ecco-61': "Ecco 61",
        'gladio': "Gladio",
        'gleva': "Gleva",
        'luna': "Luna",
        'mare-cl': "Mare cl",
        'olympiada': "Olympiada",
        'opale': "Opale",
        'ronaldo': "Ronaldo",
        'roxani': "Roxani",
        'selenio': "Selenio",
        'sirio-cl': "Sirio cl",
        'sole-cl': "Sole cl",
        'terra-cl': "Terra cl",
        'argila': "Argila",
        'jsendra': "JSendra",
        'fonsa': "Fonsa",
        'montsianell': "Montsianell",
        'pinyana': "Piñana"
      },
      'sowing-types': {
        'null': "----",
        'dry-soil-direct-seeding': "Dry soil direct seeding",
        'broadcast-scattered-seeding': "Broadcast - Scattered seeding"
      }
    },
    'soil-type': {
      'soil-textures': {
        'clay': "Clay",
        'sandy-clay': "Sandy clay",
        'silty-clay': "Silty clay",
        'sandy-clay-loam': "Sandy clay loam",
        'clay-loam': "Clay loam",
        'silty-clay-loam': "Silty clay loam",
        'sandy-loam': "Sandy loam",
        'loam': "Loam",
        'silt-loam': "Silt loam",
        'silt': "Silt",
        'loamy-sand': "Loamy sand",
        'sand': "Sand"
      }
    },
    'soil-condition': {
      'parcel-status': {
        'bare-soil': "Bare soil",
        'plowed': "Plowed",
        'sowed': "Sowed",
        'flooded': "Flooded"
      }
    },
    'crop-phenology': {
      'development-stages': {
        'emergence': "Emergence",
        '2nd-leaf': "2nd leaf",
        '3rd-leaf': "3rd leaf",
        '4th-leaf': "4th leaf",
        'beginning-of-tillering': "Beginning of tillering",
        'panicle-initiation': "Panicle initiation",
        'heading': "Heading",
        'flowering': "Flowering",
        'maturity': "Maturity"
      },
      'phenology-growth': {
        'null': "Growth stage",
        '0': "0: germination",
        '1': "1: leaf development",
        '2': "2: tillering",
        '3': "3: stem elongation",
        '4': "4: booting",
        '5': "5: inflorescence emergence, heading",
        '6': "6: flowering, anthesis",
        '7': "7: development of fruit",
        '8': "8: ripening",
        '9': "9: senescence"
      },
      'phenology-codes': {
        'null': "Code",
        '0': "0: dry seed (caryopsis)",
        '1': "1: beginning of seed imbibition",
        '3': "3: seed imbibition complete (pigeon breast)",
        '5': "5: radicle emerged from caryopsis",
        '6': "6: radicle elongated, root hairs and/or side roots visible",
        '7': "7: coleoptile emerged from caryopsis (in water-rice this stage occurs before stage 05)",
        '9': "9: imperfect leaf emerges (still rolled) at the tip of the coleoptile",
        '10': "10: imperfect leaf unrolled, tip of first true leaf visible",
        '11': "11: first leaf unfolded",
        '12': "12: 2 leaves unfolded",
        '13': "13: 3 leaves unfolded",
        '14': "14: 4 leaves unfolded",
        '15': "15: 5 leaves unfolded",
        '16': "16: 6 leaves unfolded",
        '17': "17: 7 leaves unfolded",
        '18': "18: 8 leaves unfolded ",
        '19': "19: 9 or more leaves unfolded",
        '21': "21: beginning of tillering: first tiller detectable",
        '22': "22: 2 tillers detectable",
        '23': "23: 3 tillers detectable",
        '24': "24: 4 tillers detectable",
        '25': "25: 5 tillers detectable",
        '26': "26: 6 tillers detectable",
        '27': "27: 7 tillers detectable",
        '28': "28: 8 tillers detectable",
        '29': "29: maximum number of tillers detectable",
        '30': "30: panicle initiation or green ring stage: chlorophyll accumulates in the stem tissue, forming a green ring",
        '32': "32: panicle formation: panicle 1–2 mm in length (variety-dependent)",
        '34': "34: internode elongation or jointing stage: internodes begin to elongate, panicle more than 2 mm long",
        '37': "37: flag leaf just visible, still rolled, panicle moving upwards",
        '39': "39: flag leaf stage: flag leaf unfolded, collar regions (auricle and ligule) of flag leaf and penultimate leaf aligned (pre-boot stage)",
        '41': "41: early boot stage: upper part of stem slightly thickened, sheath of flag leaf about 5 cm out of penultimate",
        '43': "43: mid boot stage: sheath of flag leaf 5–10 cm out of the penultimate leaf sheath",
        '45': "45: late boot stage: flag leaf sheath swollen, sheath of flag leaf more than 10 cm out of penultimate leaf sheath",
        '47': "47: flag leaf sheath opening",
        '49': "49: flag leaf sheath open",
        '51': "51: beginning of panicle emergence: tip of inflorescence emerged from sheath",
        '52': "52: 20% of panicle emerged",
        '53': "53: 30% of panicle emerged",
        '54': "54: 40% of panicle emerged",
        '55': "55: middle of panicle emergence: neck node still in sheath",
        '56': "56: 60% of panicle emerged",
        '57': "57: 70% of panicle emerged",
        '58': "58: 80% of panicle emerged",
        '59': "59: end of panicle emergence: neck node level with the flag leaf auricle, anthers not yet visible",
        '61': "61: beginning of flowering: anthers visible at top of panicle",
        '65': "65: full flowering: anthers visible on most spikelets",
        '69': "69: end of flowering: all spikelets have completed flowering but some dehydrated anthers may remain",
        '71': "71: watery ripe: first grains have reached half their final size",
        '73': "73: early milk",
        '75': "75: medium milk: grain content milky",
        '77': "77: late milk",
        '83': "83: early dough",
        '85': "85: soft dough: grain content soft but dry, fingernail impression not held, grains and glumes still green",
        '87': "87: hard dough: grain content solid, fingernail impression held",
        '89': "89: fully ripe: grain hard, difficult to divide with thumbnail",
        '92': "92: over-ripe: grain very hard, cannot be dented by thumbnail",
        '97': "97: plant dead and collapsing ",
        '99': "99: harvested product"
      }
    },
    'insects': {
      'names': {
        'aphids': "Aphids",
        'lissorhoptrus-oryzophilus': "Lissorhoptrus oryzophilus",
        'nematodes': "Nematodes",
        'pomacea': "Pomacea",
        'sesamia': "Sesamia",
        'chironomus': "Chironomus",
        'chilo': "Chilo"
      }
    },
    'diseases': {
      'names': {
        'bipolaris': "Bipolaris",
        'cercospora': "Cercospora",
        'fusarium': "Fusarium",
        'pyricularia-(blast)': "Pyricularia (Rice blast)"
      }
    },
    'weeds': {
      'names': {
        'bidens-sp': "Bidens sp",
        'cyperus-difformis': "Cyperus difformis",
        'heteranthera-sp': "Heteranthera sp",
        'echinochloa-crus-galli-or-oryzoides': "Echinochloa crus-galli or oryzoides",
        'leersia-oryzoides': "Leersia oryzoides",
        'red-rice-(oryza-sativa)': "Red rice (Oryza sativa)",
        'scirpus-sp': "Scirpus sp",
        'paspalum-distichum': "Paspalum distichum",
        'ammania-spp': "Ammania spp",
        'typha-spp': "Typha spp",
        'phragmites-communis': "Phragmites communis",
        'butomus-umbellatus': "Butomus umbellatus",
        'polygonum-spp': "Polygonum spp"
      }
    },
    'abiotic-stresses': {
      'causes': {
        'cold': "Cold",
        'salinity': "Salinity",
        'drought': "Drought",
        'heat-wave': "Heat wave"
      }
    },
    'fertilizers': {
      'products': {
        'calcium-cyanamide': "Calcium cyanamide",
        'entec-26-(n+-k)': "Entec 26 (n+k)",
        'entec-46-(n+k)': "Entec 46 (n+k)",
        'flexammon': "Flexammon",
        'nitrophoska': "Nitrophoska",
        'novammon-(n+k)': "Novammon (n+k)",
        'organic': "Organic",
        'urea': "Urea",
        'utec-46-': "Utec 46 "
      }
    },
    'agrochemicals': {
      'products': {
        'herbicides': "Herbicides",
        'fungicides': "Fungicides",
        'insecticides': "Insecticides"
      },
      'herbicides': {
        'azimsulfuron': "Azimsulfuron",
        'cyhalofop-butyl': "Cyhalofop Butyl",
        'imazamox-(clear-field)': "Imazamox (Clear field)",
        'penoxulam': "Penoxulam",
        'profixydim': "Profixydim",
        'quinclorac': "Quinclorac",
        'bentazon': "Bentazon",
        'fludioxonil': "Fludioxonil",
        'oxodiazon': "Oxodiazon",
        'propanil': "Propanil",
        'mcpa': "MCPA",
        'glyphosate-(only-for-paddy-mounds)': "Glyphosate (Only for paddy mounds)"
      },
      'fungicides': {
        'azoxistrobin': "Azoxistrobin",
        'propiconazole-prochloraz': "Propiconazole + Prochloraz",
        'trebuconazole': "Trebuconazole",
        'tricyclazone': "Tricyclazone"
      },
      'insecticides': {
        'pyrethroids': "Pyrethroids"
      }
    },
    'irrigation': {
      'measures': {
        'mm': "mm/day",
        'm3': "m3/hour"
      }
    }
  }
};
