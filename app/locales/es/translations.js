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
      'login': "Iniciar sesión",
      'signup': "Registrarse"
    },
    'login-p': {
      'username-f': "Usuario",
      'password-f': "Contraseña",
      'login-btn': "Acceder"
    },
    'signup-p': {
      'username-f': "Nombre de usuario",
      'password-f': "Tu contraseña",
      'repeat-password-f': "Repite tu contraseña",
      'email-f': "Tu email",
      'repeat-email-f': "Repite tu email",
      'signup-btn': "Registrarse"
    }
  },
  'fields': {
    'text': {
      'my-fields': "Mis Parcelas",
      'crop-info': "Información de cosecha",
      'soil-type': "Tipo de suelo",
      'soil-condition': "Estado del suelo",
      'crop-phenology': "Fenología del cultivo",
      'pathogens': "Patógenos",
      'diseases': "Enfermedades",
      'weeds': "Malas hierbas",
      'fertilizers': "Fertilizantes",
      'agrochemicals': "Pesticidas",
      'irrigation': "Riego",
      'yield': "Producción",
      'observation': "Observación",
      'parcel-info': "Parcela",
      'add-new': "Añadir"
    },
    'ui-special': {
      'agrochemicals': "Pesticidas"
    },
    'header': {
      'title': "Visión General",
      'add-info-tooltip': "Añadir nueva información a el/los campo/s",
      'observation-tooltip': "Añadir una nueva observación",
      'options-tooltip': "Menú de usuario"
    },
    'options-m': {
      'title': "Hola, {{username}}",
      'profile': "Mi perfil",
      'fields': "Mis campos",
      'about': "Acerca de"
    }
  },
  'panel': {
    'about': {
      'content': "Desarrollado por GEOTEC"
    },
    'agrochemicals': {
      'date': "Fecha de uso",
      'product': "Producto",
      'quantity': "Cantidad",
      'quantity-unit': "Kg/hectárea"
    },
    'crop-info': {
      'crop-type': "Tipo de cultivo",
      'rice-variety': "Variedad de arroz",
      'pudding': 'Mezcla',
      'sowing-practice': "Método de siembra",
      'date': 'Fecha de siembra'
    },
    'crop-phenology': {
      'date': "Fecha de observación",
      'development-stage': "Etapa de desarrollo",
      'bbch': "BBCH"
    },
    'diseases': {
      'date': "Fecha de observación",
      'name': "Nombre",
      'comment': "Añadir un comentario",
      'picture': "Añadir una foto",
      'damage': "Daño (1 min - 10 max)"
    },
    'fertilizers': {
      'date': "Fecha de uso",
      'product': "Producto",
      'quantity': "Cantidad",
      'quantity-unit': "Kg/hectárea",
      'nitrogen': "Contenido en nitrógeno",
      'nitrogen-unit': "Kg/hectárea",
      'phosphorus': "Contenido en fósforo",
      'phosphorus-unit': "Kg/hectárea",
      'potassium': "Contenido en potasio",
      'potassium-unit': "Kg/hectárea"
    },
    'irrigation': {
      'start-date': "Fecha de inicio",
      'end-date': "Fecha de fin",
      'measure': "Medida",
      'quantity': "Cantidad",
      'quantity-unit-mm': "Milímetros",
      'quantity-unit-m3': "Metros cúbicos",
      'hours': "Horas",
      'hours-unit': "Horas",
      'depth': "Profundidad del agua"
    },
    'observation': {
      'comment': "Añadir un comentario",
      'picture': "Añadir una foto",
      'send-btn': "Enviar observación"
    },
    'pathogens': {
      'date': "Fecha de observación",
      'name': "Nombre",
      'comment': "Añadir un comentario",
      'picture': "Añadir una foto",
      'damage': "Daño (1 min - 10 max)"
    },
    'soil-condition': {
      'status': "Estado de la parcela",
      'date': "Fecha de observación"
    },
    'soil-type': {
      'texture': "Textura del suelo",
      'organic-matter': "Materia orgánica",
      'organic-matter-unit':"% de materia orgánica",
      'ph': "Ph (min 0 - max 14)",
      'date': "Fecha"
    },
    'weeds': {
      'date': "Fecha de observación",
      'name': "Nombre",
      'comment': "Añadir comentario",
      'picture': "Añadir foto",
      'damage': "% cubierto (1 min - 100 max)"
    },
    'yield':{
      'date': "Fecha de cosecha",
      'yield': "Cosecha (peso en seco)",
      'yield-unit': "Ton/ha",
      'comments': "Comentarios"
    },
    'parcel-info': {
      'none-selected': "Por favor selecciona una parcela",
      'crop-info-text': "Información de cultivo",
      'info-table-content': "Contenido",
      'product-text': "Última fecha de subida de producto",
      'product-table-product': "Producto",
      'product-table-date': "Fecha"
    },
    'profile': {
      'picture-section': "Imagen de perfil",
      'username-section': "Usuario",
      'email-section': "Email",
      'email-tooltip': "Cambiar email",
      'password-section': "Contraseña",
      'old-password-tooltip': "Contraseña antigua",
      'new-password-tooltip': "Contraseña nueva",
      'repeat-new-password-tooltip': "Repite la contraseña",
      'update': "Actualizar perfil",
      'logout': "Desconectar"
    },
    'notification': {
      'downloading-data': "Descargando datos...",
      'offline': "Conexión perdida",
      'online': "Conexión establecida",
      'product-upload': "Subiendo info. de parcela",
      'product-upload-later': "Fuera de línea. La información se subirá más tarde"
    }
  },
  'region': {
    'greece': "Grecia",
    'italy': "Italia",
    'spain': "España"
  },
  'data': {
    'crop-info': {
      'crop-types': {
        'alpha_alpha': "Alpha_alpha",
        'clover': "Trébol",
        'corn': "Maíz",
        'meadow': "Prado",
        'poplar': "Álamo",
        'rice': "Arroz",
        'set-aside': "Barbecho",
        'soybean': "Soja"
      },
      'puddings': {
        'null': "----",
        'yes': "Sí",
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
        'terra-cl': "Terra cl"
      },
      'sowing-practices': {
        'null': "----",
        'direct-seeding': "Siembra directa",
        'scattered-seeding': "Siembra dispersa"
      }
    },
    'soil-type': {
      'soil-textures': {
        'clay': "Arcilloso",
        'silt-clay': "Arcillo limoso",
        'silt-clay-loam': "Arcillo limosos franco",
        'medium-textured': "Texturas medias"
      }
    },
    'soil-condition': {
      'parcel-status': {
        'bare-soil': "Suelo desnudo",
        'plowed': "Arado",
        'sowed': "Sembrado",
        'flooded': "Inundado"
      }
    },
    'crop-phenology': {
      'development-stages': {
        'emergence': "Aparición",
        '2nd-leaf': "Segunda hoja",
        '3rd-leaf': "Tercera hoja",
        '4th-leaf': "Cuarta hoja",
        'beginning-of-tillering': "Inicio macollaje",
        'panicle-initiation': "Inicio panoja",
        'heading': "Desarrollo de la panoja",
        'flowering': "Florecimiento",
        'maturity': "Maduración"
      },
      'phenology-growth': {
        'null': "Etapa de crecimiento",
        '0:-germination': "0: germinación",
        '1:-leaf-development': "1: desarrollo de las hojas (tallo principal)",
        '2:-tillering': "2: formación de brotes laterales: ahijamiento",
        '3:-stem-elongation': "3: encañado",
        '4:-booting': "4: hinchamiento de la panoja (Embuchamiento)",
        '5:-inflorescence-emergence,-heading': "5: salida de la panoja",
        '6:-flowering,-anthesis': "6:  floración (tallo principal)",
        '7:-development-of-fruit': "7: formación del fruto",
        '8:-ripening': "8: maduración de frutos y semillas",
        '9:-senescence': "9: senescencia"
      },
      'phenology-codes': {
        'null': "Código",
        '0:-dry-seed-(caryopsis)': "0: semilla seca(cariópdise)",
        '1:-beginning-of-seed-imbibition': "1: comienza la imbibición de la semilla",
        '3:-seed-imbibition-complete-(pigeon-breast)': "3: imbibición completa de la semilla pecho paloma",
        '5:-radicle-emerged-from-caryopsis': "5: Radícula (raíz embrional) emergida de la semilla",
        '6:-radicle-elongated,-root-hairs-and/or-side-roots-visible': "6: Radícula alargada, formando pelos radiculares y raíces secundarias",
        '7:-coleoptile-emerged-from-caryopsis-(in-water-rice-this-stage-occurs-before-stage-05)': "7: Coleóptilo, emergido de la semilla (en arroz en agua esta etapa precede a la etapa 5)",
        '9:-imperfect-leaf-emerges-(still-rolled)-at-the-tip-of-the-coleoptile': "9: Emergencia: el coleóptilo traspasa la superficie del suelo",
        '10:-imperfect-leaf-unrolled,-tip-of-first-true-leaf-visible': "10: 1a hoja, atraviesa el coleoptilo",
        '11:-first-leaf-unfolded': "11: primera hoja desplegada",
        '12:-2-leaves-unfolded': "12: 2 hojas desplegadas",
        '13:-3-leaves-unfolded': "13: 3 hojas desplegadas",
        '14:-4-leaves-unfolded': "14: 4 hojas desplegadas",
        '15:-5-leaves-unfolded': "15: 5 hojas desplegadas",
        '16:-6-leaves-unfolded': "16: 6 hojas desplegadas",
        '17:-7-leaves-unfolded': "17: 7 hojas desplegadas",
        '18:-8-leaves-unfolded-': "18: 8 hojas desplegadas",
        '19:-9-or-more-leaves-unfolded': "19: 9 o más hojas desplegadas",
        '21:-beginning-of-tillering:-first-tiller-detectable': "21: Comienzo del macollamiento: 1 hijuelo visible",
        '22:-2-tillers-detectable': "22: 2 hijuelos o macollas visibles",
        '23:-3-tillers-detectable': "23: 3 hijuelos o macollas visibles",
        '24:-4-tillers-detectable': "24: 4 hijuelos o macollas visibles",
        '25:-5-tillers-detectable': "25: 5 hijuelos o macollas visibles",
        '26:-6-tillers-detectable': "26: 6 hijuelos o macollas visibles",
        '27:-7-tillers-detectable': "27: 7 hijuelos o macollas visibles",
        '28:-8-tillers-detectable': "28: 8 hijuelos o macollas visibles",
        '29:-maximum-number-of-tillers-detectable': "29: Fin del macollamiento; el máximo de hijuelos o macollas",
        '30:-panicle-initiation-or-green-ring-stage:-chlorophyll-accumulates-in-the-stem-tissue,-forming-a-green-ring': "30: Iniciación de la panoja o estadio anillo verde: acumulación del clorofilo en el tejido de la caña, formando un anillo verde",
        '34:-internode-elongation-or-jointing-stage:-internodes-begin-to-elongate,-panicle-more-than-2-mm-long': "34: alargamiento de los entrenudos: los entrenudos comienzan a alargarse; panoja, de más de 2 mm de longitud (según variedad)",
        '32:-panicle-formation:-panicle-1–2-mm-in-length-(variety-dependent)': "32: Formación de la panoja: longitud de 1 a 2 mm",
        '37:-flag-leaf-just-visible,-still-rolled,-panicle-moving-upwards': "37: Aparece la hoja bandera, aún enrollada; panoja moviéndose hacia arriba",
        '39:-flag-leaf-stage:-flag-leaf-unfolded,-collar-regions-(auricle-and-ligule)-of-flag-leaf-and-penultimate-leaf-aligned-(pre-boot-stage)': "39: Estadio hoja bandera: hoja bandera, completamente desenrollada, las zonas del collar (lígula y aurícula) de la hoja bandera y de la penúltima hoja alineadas (estadio pre-hinchado)",
        '41:-early-boot-stage:-upper-part-of-stem-slightly-thickened,-sheath-of-flag-leaf-about-5-cm-out-of-penultimate': "41: Estadio hinchado temprano: la parte superior de la caña, ligeramente engrosada; la vaina de la hoja bandera, sobre 5 cm fuera de la penúltima vaina foliar",
        '43:-mid-boot-stage:-sheath-of-flag-leaf-5–10-cm-out-of-the-penultimate-leaf-sheath': "43: Estadio hinchado medio: la vaina de la hoja bandera, 5 a 10 cm fuera de la penúltima vaina foliar",
        '45:-late-boot-stage:-flag-leaf-sheath-swollen,-sheath-of-flag-leaf-more-than-10-cm-out-of-penultimate-leaf-sheath': "45: Estadio hinchado tardío: la vaina de la hoja bandera, hinchada; vaina de la hoja bandera, 10 cm fuera de la peníltima hoja",
        '47:-flag-leaf-sheath-opening': "47: Se empieza a abrir la vaina de la hoja bandera",
        '49:-flag-leaf-sheath-open': "49: Vaina de la hoja bandera, abierta",
        '51:-beginning-of-panicle-emergence:-tip-of-inflorescence-emerged-from-sheath': "51: Comienzo de la emergencia de la panoja: el extremo de la inflorescencia emerge de la vaina",
        '55:-middle-of-panicle-emergence:-neck-node-still-in-sheath': "55: Mitad de la emergencia de las panojas: el nudo del cuello está todavía en la vaina",
        '52:-20%-of-panicle-emerged': "52: 20 % de las panojas, emergidas",
        '53:-30%-of-panicle-emerged': "53: 30% de las panojas, emergidas",
        '54:-40%-of-panicle-emerged': "54: 40% de las panojas, emergidas",
        '56:-60%-of-panicle-emerged': "56: 60% de las panojas, emergidas",
        '57:-70%-of-panicle-emerged': "57: 70% de las panojas, emergidas",
        '58:-80%-of-panicle-emerged': "58: 80% de las panojas, emergidas",
        '59:-end-of-panicle-emergence:-neck-node-level-with-the-flag-leaf-auricle,-anthers-not-yet-visible': "59: Fin de la salida de las panojas: el nudo del cuello coincide con la aurícula de la hoja bandera; las anteras no son visibles aún",
        '61:-beginning-of-flowering:-anthers-visible-at-top-of-panicle': "61: Comienzo del florecimiento: anteras, visibles en lo alto de la panoja",
        '65:-full-flowering:-anthers-visible-on-most-spikelets': "65: Plena floración: anteras, visibles en la mayoría de las espiguillas",
        '69:-end-of-flowering:-all-spikelets-have-completed-flowering-but-some-dehydrated-anthers-may-remain': "69: Fin del florecimiento: todas las espiguillas han terminado el florecimiento, pero todavía pueden permanecer algunas anteras deshidratadas",
        '71:-watery-ripe:-first-grains-have-reached-half-their-final-size': "71: Madurez acuosa: los primeros granos han alcanzado la mitad de su tamaño final",
        '75:-medium-milk:-grain-content-milky': "75: Lechoso medio: contenido del grano es lechoso",
        '73:-early-milk': "73: lechoso temprano",
        '77:-late-milk': "77: lechoso tardío",
        '83:-early-dough': "83: pastoso temprano",
        '85:-soft-dough:-grain-content-soft-but-dry,-fingernail-impression-not-held,-grains-and-glumes-still-green': "85: Pastoso blando: contenido del grano, blando, pero seco; no se mantiene la huella de la uña del dedo; granos y glumas, todavía verdes",
        '87:-hard-dough:-grain-content-solid,-fingernail-impression-held': "87: Pastoso duro: contenido del grano sólido; se mantiene la huella de la uña del pulgar",
        '89:-fully-ripe:-grain-hard,-difficult-to-divide-with-thumbnail': "89: Madurez completa: grano duro, difícil de dividir con la uña del pulgar",
        '92:-over-ripe:-grain-very-hard,-cannot-be-dented-by-thumbnail': "92: Sobre maduración: granos muy duros; no pueden ser mellados con la uña del pulgar",
        '97:-plant-dead-and-collapsing-': "97: Planta muerta, tallos se quiebran",
        '99:-harvested-product': "99: Partes cosechadas (estadio para señalar tratamientos de post-cosecha)"
      }
    },
    'pathogens': {
      'names': {
        'aphids': "Pulgones",
        'lissorhoptrus-oryzophilus': "Lissorhoptrus oryzophilus",
        'nematods': "Nematodos",
        'pomacea': "Pomacea"
      }
    },
    'diseases': {
      'names': {
        'bipolaris': "Bipolaris",
        'cercospora': "Cercospora",
        'fusarium': "Fusarium",
        'pyricularia-(blast)': "Pyricularia (estallido)"
      }
    },
    'weeds': {
      'names': {
        'bidens': "Bidens",
        'ciperus-difformis': "Ciperus difformis",
        'echinochloa-crus-galli': "Echinochloa crus-galli",
        'heteranthera': "Heteranthera",
        'leersia-oryzoides': "Leersia oryzoides",
        'oryza-sativa': "Oryza sativa",
        'scirpus-maritimus': "Scirpus maritimus"
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
        'bentazon': "Bentazon",
        'celest-syngenta-(fludioxonil)': "Celest syngenta (fludioxonil)",
        'mixed-product': "Producto Mezclado",
        'oxodiazon': "Oxodiazon",
        'propanil': "Propanil",
        'pyretroids': "Piretroides",
        'touchdown-syngenta-(glyphosate)': "Touchdown syngenta (glifostato)"
      }
    },
    'irrigation': {
      'measures': {
        'mm': "mm/día",
        'm3': "m3/h"
      }
    }
  }
};
