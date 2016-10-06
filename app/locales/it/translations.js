export default {

  // Please, translate ONLY the text between " " characters,
  // just replace the English string with the translation in your language.
  // Please DO NOT translate the text between ' ' and {{ }} !!

  // For example, in the following, you only need to translate "Log in" and "Sign up" (indiated with <---- below)

  // 'login': {
  //  'text': {
  //    'login': "Log in",  <----
  //    'signup': "Sign up" <----
  //  },

  // Your result would look as follows (for example, for the Spanish translation):

  // 'login': {
  //  'text': {
  //    'login': "Entrar",
  //    'signup': "Registrar"
  //  },

  // Please try to keep the strings as short as possible.
  // Please Always use the same translation for the same term (do not use synonyms).

  // Thanks for your collaboration!

  'login': {
    'text': {
      'login': "Entra",
      'signup': "Registrati",
      'enter-as-guest': "Enter as guest"
    },
    'login-p': {
      'username-f': "Nome Utente",
      'password-f': "Password",
      'login-btn': "Entra"
    },
    'signup-p': {
      'username-f': "Scegli Nome Utente",
      'collaborating-with': "Proprietario (opzionale)",
      'password-f': "Scegli password",
      'repeat-password-f': "Ripeti password",
      'email-f': "Indirizzo email",
      'repeat-email-f': "Ripeti Indirizzo email",
      'signup-btn': "Registrati"
    }
  },
  'fields': {
    'text': {
      'my-fields': "I miei campi",
      'crop-info': "Informazioni Coltura",
      'soil-type': "Tipo di suolo",
      'soil-condition': "Condizioni Suolo",
      'crop-phenology': "Fenologia",
      'insects': "Insetti",
      'diseases': "Malattie",
      'weeds': "Infestanti",
      'abiotic-stresses': "Stress Abiotici",
      'fertilizers': "Fertilizzazioni",
      'agrochemicals': "Trattamenti",
      'irrigation': "Irrigazione",
      'yield': "Resa",
      'observation': "Osservazioni",
      'parcel-info': "Informazioni sulla parcella",
      'add-new': "Aggiungi Dati",
      'default': 'Default',
      'custom': 'Personalizzato',
      'other': 'Altro (Specifica)',
      'share': "Share with other Ermes users"
    },
    'ui-special': {
      'agrochemicals': "Trattamenti"
    },
    'header': {
      'title': "Vista Generale",
      'add-info-tooltip': "Aggiungi dati per i tuoi campi",
      'observation-tooltip': "Aggiungi un'osservazione",
      'options-tooltip': "Menu utente"
    },
    'map-tools': {
      'confirm-selection': "Aggiungi campi",
      'discard-changes': "Annulla Modifche",
      'select-all': "Seleziona tutti i campi",
      'invert-selection': "Inverti la selezione",
      'parcel-info': "Info su campo selezionato"
    },
    'options-m': {
      'title': "Ciao, {{username}}",
      'profile': "Il mio profilo",
      'fields': "I miei campi",
      'about': "Info",
      'search': "Search parcel",
      'logout': "Esci"
    }
  },
  'panel': {
    'about': {
      'content': "Sviluppato da GEOTEC group"
    },
    'agrochemicals': {
      'date': "Data Trattamento",
      'product': "Prodotto",
      'quantity': "Quantità",
      'quantity-unit': "Kg/ettaro"
    },
    'crop-info': {
      'crop-type': "Tipo Coltura",
      'rice-variety': "Varietà Riso",
      'puddling': 'Intasamento',
      'sowing-type': "Metodo di semina",
      'amount': "Quantità",
      'seeds-per-ha': "Semi/hectare",
      'date': 'Data di semina'
    },
    'crop-phenology': {
      'date': "Data osservazione",
      'development-stage': "Stadio di sviluppo",
      'bbch': "BBCH"
    },
    'diseases': {
      'date': "Data Osservazione",
      'name': "Nome",
      'comment': "Aggiungi Commento",
      'picture': "Aggiungi Foto",
      'damage': "Danno (1 min - 10 max)"
    },
    'fertilizers': {
      'date': "Data Trattamento",
      'product': "Prodotto",
      'quantity': "Quantità",
      'quantity-unit': "Kg/ettaro",
      'nitrogen': "Contenuto in Azoto",
      'nitrogen-unit': "Kg/ettaro",
      'phosphorus': "Contenuto in Fosforo",
      'phosphorus-unit': "Kg/ettaro",
      'potassium': "Contenuto in Potassio",
      'potassium-unit': "Kg/ettaro"
    },
    'irrigation': {
      'start-date': "Data Inizio",
      'end-date': "Data Fine",
      'measure': "Unità Misura",
      'quantity': "Quantità",
      'quantity-unit-mm': "Millimetri",
      'quantity-unit-m3': "Metri Cubi",
      'hours': "Ore",
      'hours-unit': "Ore",
      'height': "Altezza Acqua"
    },
    'observation': {
      'comment': "Aggiungi Commento",
      'picture': "Aggiungi Foto",
      'send-btn': "Invia Osservazione"
    },
    'insects': {
      'date': "Data Osservazione",
      'name': "Nome",
      'comment': "Aggiungi Commento",
      'picture': "Aggiungi Foto",
      'damage': "Danno (1 min - 10 max)"
    },
    'abiotic-stresses': {
      'date': "Data Osservazione",
      'cause': "Cause",
      'comment': "Aggiungi Commento",
      'picture': "Aggiungi Foto",
      'damage': "Danno (1 min - 10 max)"
    },
    'soil-condition': {
      'status': "Stato del campo",
      'date': "Data Osservazione"
    },
    'soil-type': {
      'texture': "Seleziona la tessitura",
      'organic-matter': "Sostanza Organica",
      'organic-matter-unit':"Percentuale Sostanza Organica",
      'ph': "pH (min 0 - max 14)",
      'date': "Data"
    },
    'weeds': {
      'date': "Data Osservazione",
      'name': "Nome",
      'comment': "Aggiungi Commento",
      'picture': "Aggiungi Foto",
      'damage': "Percentuale di copertura (1 min - 100 max)"
    },
    'yield':{
      'date': "Data Raccolto",
      'yield': "Resa (peso secco)",
      'yield-unit': "Ton/hectare",
      'comments': "Commenti",
      'grain-moisture': "Umidità Granella",
      'percent-grain-moisture': "Umidità (%)"
    },
    'parcel-info': {
      'none-selected': "Seleziona una parcella",
      'crop-info-text': "Informazioni parcella",
      'info-table-content': "Contenuto",
      'product-text': "Ultime date di aggiornamento",
      'product-table-product': "Prodotto",
      'product-table-date': "Data"
    },
    'profile': {
      'picture-section': "Immagine Profilo",
      'username-section': "Nome Utente",
      'email-section': "Email",
      'language-section': "Lingua/Language",
      'email-tooltip': "Cambia email",
      'password-section': "Password",
      'old-password-tooltip': "Vecchia password",
      'new-password-tooltip': "Nuova password",
      'repeat-new-password-tooltip': "Ripeti Nuova password",
      'update': "Aggiorna profilo",
      'logout': "Esci",
      'services': "Services",
      'enable-notifications': "Enable notifications",
      'enable-alerts': "Enable alerts"
    },
    'notification': {
      'downloading-data': "Scaricamento dati...",
      'offline': "Connessione persa",
      'online': "Connessione stabilita",
      'product-upload': "Caricamento info parcelle",
      'product-upload-later': "Sei Offline. I dati verranno caricati più tardi",
      'user-not-found': "Utente non trovato",
      'login-error': "Password Errata",
      'wrong-old-password': "Vecchia password errata",
      'inactive-account': "Il tuo account deve essere attivato",
      'password-mismatch': "Le password non coincidono",
      'old-password-needed': "Devi inserire la vecchia password",
      'email-mismatch': "Le email non coincidono",
      'regional-error': "Questo é un account ERMES regionale",
      'unknown-owner': "Questo proprietario non esiste",
      'region-mismatch': "Questo proprietario é di un'altra regione",
      'repeated-email': "Questa mail é già nel sistema",
      'user-exits': "Utente già esistente",
      'processing': "Elaborazione...",
      'welcome': "Benvenuto, {{username}}",
      'login-allowed': "Ora puoi,",
      'activation-needed': "Il tuo account verrà attivato",
      'email-sent': "Ricevereai un' email",
      'missing-date': "Inserisci una data",
      'missing-parcel': "Selezionare almeno una parcella",
      'missing-start-date': "Inserire la data di inizio",
      'dates-inconsistency': "La data finale deve essere successiva alla data di inizio",
      'file-missing': "Allega un'immagine, per favore",
      'offline-parcels': "Spiacenti, devi essere on-line per aggiungere o cancellare parcelle",
      'offline-profile-update': "Spiacenti, devi essere on-line per modificare il tuo profilo",
      'no-data-offline': "Sembra che tu abbia perso la connessione e non ci sono dati salvati su questo device",
      'parcel-offline': "Spiacenti, non ci sono informazioni su questa parcella su questo dispositivo e non sei connesso. Riprova più tardi",
      'try-again': "Ora puoi provare a ",
      'reconnect': "Riconnetterti",
      'retrieving-info': "Stiamo recuperando il tuo profilo dal server. Attendi...",
      'first-login': "Seleziona le tue parcelle cliccandoci sopra,.Premi il pulsante nell'angolo in basso a destra quando hai finito. ",
      'got-it': "Fatto",
      'saved': "Salvato",
      'loading-map': "Carico mappa...",
      'warning': "Attenzione",
      'possible-outdated': "Sei offline - Questa informazione può non essere aggiornata",
      'wrong-data': "Wrong data"
    },
    'search': {
      'town': "Town",
      'polygon': "Polygon",
      'parcel': "Parcel",
      'search': "Search",
      'wrong-data': "Wrong data",
      'map-centered': "Map centered on parcel",
      'service-down': "Search service temporally unavailable"
    }
  },
  'download-assets':{
    'download-basemap': "Vuoi scaricare i dati necessari per il funzionamento offline (circa 50MB)?",
    'download-advantages': "Ti suggeriamo di scaricare i dati per il funzionamento offline per migliorare le performance della app.",
    'connection-acceptable': "Attenzione ! Stai utilizzando un piano dati tariffario. A seconda della regione, verranno scaricati fino a 50 MB. Sei d'accordo ?",
    'downloading-assets': "Stiamo scaricando i dati per abilitare la modalità offline. Verrai ridirezionato alla fine dell'operazione. Per favore attendi",
    'download-error': "Errore durante il download !",
    'proceed': "Continua",
    'later': "Non ora",
    'it-is-ok': "OK !",
    'no-way': "No !",
    'retry': "Riprova"
  },
  'update-os': {
    'should-update': "Android version {{version}} detected. This app requires Android 4.4 or higher. Please update your operating system. In case you continue with your current Android version, offline functionality will not be available, and we cannot guarantee full stability of the app.",
    'do-not-show-again': "Do not show again"
  },
  'region': {
    'greece': "Grecia",
    'italy': "Italia",
    'spain': "Spagna"
  },
  'data': {
    'crop-info': {
      'crop-types': {
        'alpha_alpha': "Erba Medica",
        'clover': "Trifoglio",
        'corn': "Mais",
        'meadow': "Prato",
        'poplar': "Pioppo",
        'rice': "Riso",
        'set-aside': "Riposo",
        'soybean': "Soia"
      },
      'puddlings': {
        'null': "----",
        'yes': "Si",
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
        'dry-soil-direct-seeding': "Semina in Asciutta",
        'broadcast-scattered-seeding': "Semina in Acqua"
      }
    },
    'soil-type': {
      'soil-textures': {
        'clay': "Argilloso",
        'sandy-clay': "Sabbioso Argilloso",
        'silty-clay': "Franco Argilloso",
        'sandy-clay-loam': "Sabbioso Argilloso Limoso",
        'clay-loam': "Limoso Argilloso",
        'silty-clay-loam': "Franco Argilloso Limoso",
        'sandy-loam': "Sabbioso Limoso",
        'loam': "Limoso",
        'silt-loam': "Franco Limoso",
        'silt': "Franco",
        'loamy-sand': "Limoso Sabbioso",
        'sand': "Sabbioso"
      }
    },
    'soil-condition': {
      'parcel-status': {
        'bare-soil': "Suolo Nudo",
        'plowed': "Arato",
        'sowed': "Seminato",
        'flooded': "Inondato"
      }
    },
    'crop-phenology': {
      'development-stages': {
        'emergence': "Emergenza",
        '2nd-leaf': "2nda foglia",
        '3rd-leaf': "3rd foglia",
        '4th-leaf': "4th foglia",
        'beginning-of-tillering': "Inizio Accestimento",
        'panicle-initiation': "Inizializzazione Pannocchia",
        'heading': "Levata",
        'flowering': "Fioritura",
        'maturity': "Maturità "
      },
      'phenology-growth': {
        'null': "Stadio Crescita",
        '0': "0: Germinazione",
        '1': "1: Sviluppo fogliare",
        '2': "2: Accestimento",
        '3': "3: Allungamento fusto ",
        '4': "4: Botticella",
        '5': "5: Emergenza infiorescenza, spigatura",
        '6': "6: Fioritura, antesi",
        '7': "7: Sviluppo dei frutti",
        '8': "8: Maturazione",
        '9': "9: Senescenza"
      },
      'phenology-codes': {
        'null': "Codice",
        '0': "0: Seme asciutto",
        '1': "1: Inizio imbibizione",
        '3': "3: Imbibizione completa",
        '5': "5: Emergenza radichetta",
        '6': "6: Allungamento radice, formazione peli radicali e/o radici laterali",
        '7': "7: Emersione coleoptile dalla cariosside (con semina in immersione avviene prima dello stadio 05)",
        '9': "9: Foglie imperfette emergono (ancora arrotolate) alla punta del coleoptile",
        '10': "10: Prima foglia imperfetta dispiegata, punta della prima foglia vera visibile",
        '11': "11: Prima foglia dispiegata",
        '12': "12: 2 Foglie dispiegate",
        '13': "13: 3 Foglie dispiegate",
        '14': "14: 4 Foglie dispiegate",
        '15': "15: 5 Foglie dispiegate",
        '16': "16: 6 Foglie dispiegate",
        '17': "17: 7 Foglie dispiegate",
        '18': "18: 8 Foglie dispiegate",
        '19': "19: 9 o più Foglie dispiegate",
        '21': "21: Inizio accestimento: primo fusto d’accestimento visibile",
        '22': "22: 2 Fusti d’accestimento visibili",
        '23': "23: 3 Fusti d’accestimento visibili",
        '24': "24: 4 Fusti d’accestimento visibili",
        '25': "25: 5 Fusti d’accestimento visibili",
        '26': "26: 6 Fusti d’accestimento visibili",
        '27': "27: 7 Fusti d’accestimento visibili",
        '28': "28: 8 Fusti d’accestimento visibili",
        '29': "29: Massimo numero di fusti d’accestimento visibili",
        '30': "30: Inizio formazione della pannocchia o stadio dell’anello verde: la clorofilla accumulata nei tessuti del fusto forma un anello verde",
        '32': "32: Formazione della pannocchia: 1-2 mm in lunghezza",
        '34': "34: Allungamento internodi o fase di congiungimento: gli internodi cominciano ad allungarsi, pannocchia lunga più di 2 mm",
        '37': "37: Foglia a bandiera visibile, ancora arrotolata, pannocchia muove verso l’alto",
        '39': "39: Stadio di foglia a bandiera: foglia a bandiera completamente srotolata, auricole e ligula visibile",
        '41': "41: Inizio stadio di botticella: la parte superiore del fusto si ispessisce un po', guaina della foglia bandiera circa 5 centimetri fuori dalla guaina della penultima foglia ",
        '43': "43: Stadio di botticella medio: guaina della foglia a bandiera 5-10 cm fuori dalla guaina della penultima foglia",
        '45': "45: Fine stadio di botticella: guaina della foglia a bandiera gonfia, guaina della foglia a bandiera almeno 10 cm fuori dalla guaina della penultima foglia",
        '47': "47: Apertura della guaina della foglia a bandiera",
        '49': "49: Guaina della foglia a bandiera aperta",
        '51': "51: Inizio emergenza pannocchia: punta dell’infiorescenza emersa dalla guaina",
        '52': "52: 20% dell’infiorescenza emersa",
        '53': "53: 30% dell’infiorescenza emersa",
        '54': "54: 40% dell’infiorescenza emersa",
        '55': "55: Metà dell’infiorescenza emersa (metà spigatura)",
        '56': "56: 60% dell’infiorescenza emersa",
        '57': "57: 70% dell’infiorescenza emersa",
        '58': "58: 80% dell’infiorescenza emersa",
        '59': "59: Fine spigatura (antere non ancora visibili)",
        '61': "61: Inizio fioritura: prime antere visibili al top della pannocchia",
        '65': "65: Piena fioritura: antere visibili sulla maggior parte delle spighette ",
        '69': "69: Piena fioritura: antere visibili sulla maggior parte delle spighette",
        '71': "71: Cariossidi in maturazione acquosa, i primi chicchi hanno raggiunto la metà della taglia finale",
        '73': "73: Inizio maturazione lattea",
        '75': "75: Maturazione lattea media: consistenza lattea",
        '77': "77: Fine maturazione lattea",
        '83': "83: Inizio maturazione cerosa",
        '85': "85: maturazione cerosa soffice, chicchi soffici ma secchi, il segno dell’unghia non rimane, grani e glume ancora verdi",
        '87': "87: Maturazione cerosa avanzata: contenuto dei chicchi solido, il segno dell’unghia rimane",
        '89': "89: Piena maturazione: difficoltà a dividere i chicchi con l’unghia del pollice",
        '92': "92: Sovra-maturazione: chicchi duri, non possono essere scalfiti con l’unghia del pollice",
        '97': "97: Piante morte",
        '99': "99: Prodotto Raccolto"
      }
    },

    // Note: starting from here, scientific names have not been translated!

    'insects': {
      'names': {
        'aphids': "Afidi",
        'lissorhoptrus-oryzophilus': "Lissorhoptrus oryzophilus (Punteruolo)",
        'nematodes': "Nematodi",
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
        'pyricularia-(blast)': "Brusone"
      }
    },
    'weeds': {
      'names': {
        'bidens-sp': "Bidens sp",
        'cyperus-difformis': "Cyperus difformis (Zigolo)",
        'heteranthera-sp': "Heteranthera sp",
        'echinochloa-crus-galli-or-oryzoides': "Echinochloa crus-galli o oryzoides (Giavone)",
        'leersia-oryzoides': "Leersia oryzoides",
        'red-rice-(oryza-sativa)': "Oryza sativa (Riso Crodo)",
        'scirpus-sp': "Scirpus sp (Cipollino, Lisca marittima)",
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
        'cold': "Freddo",
        'salinity': "Salinità",
        'drought': "Siccità",
        'heat-wave': "Onda di calore"
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
        'organic': "Organico",
        'urea': "Urea",
        'utec-46-': "Utec 46 "
      }
    },
    'agrochemicals': {
      'products': {
        'herbicides': "Erbicidi",
        'fungicides': "Fungicidi",
        'insecticides': "Insetticidi"
      },
      'herbicides': {
        'azimsulfuron': "Azimsulfurone",
        'cyhalofop-butyl': "Cyhalofop Butyl",
        'imazamox-(clear-field)': "Imazamox (Clear field)",
        'penoxulam': "Penoxulam",
        'profixydim': "Profixydim",
        'quinclorac': "Quinclorac",
        'bentazon': "Bentazone",
        'fludioxonil': "Fludioxonil",
        'oxodiazon': "Oxodiazone",
        'propanil': "Propanile",
        'mcpa': "MCPA",
        'glyphosate-(only-for-paddy-mounds)': "Glifosato"
      },
      'fungicides': {
        'azoxistrobin': "Azoxistrobin",
        'propiconazole-prochloraz': "Propiconazolo + Prochloraz",
        'trebuconazole': "Trebuconazolo",
        'tricyclazone': "Tricyclazono"
      },
      'insecticides': {
        'pyrethroids': "Piretroidi"
      }
    },
    'irrigation': {
      'measures': {
        'mm': "mm/giorno",
        'm3': "m3/ora"
      }
    }
  }
};
