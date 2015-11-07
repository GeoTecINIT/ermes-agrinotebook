export function getDevelopmentStages(context) {
  return [
    {text: context.get('i18n').t('data.crop-phenology.development-stages.emergence'), value: 'emergence'},
    {text: context.get('i18n').t('data.crop-phenology.development-stages.2nd-leaf'), value: '2nd-leaf'},
    {text: context.get('i18n').t('data.crop-phenology.development-stages.3rd-leaf'), value: '3rd-leaf'},
    {text: context.get('i18n').t('data.crop-phenology.development-stages.4th-leaf'), value: '4th-leaf'},
    {text: context.get('i18n').t('data.crop-phenology.development-stages.beginning-of-tillering'), value: 'beginning-of-tillering'},
    {text: context.get('i18n').t('data.crop-phenology.development-stages.panicle-initiation'), value: 'panicle-initiation'},
    {text: context.get('i18n').t('data.crop-phenology.development-stages.heading'), value: 'heading'},
    {text: context.get('i18n').t('data.crop-phenology.development-stages.flowering'), value: 'flowering'},
    {text: context.get('i18n').t('data.crop-phenology.development-stages.maturity'), value: 'maturity'}
  ];
}

export function getPhenologyGrowth(context) {
  return [
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.null'), value: 'null:'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.0:-germination'), value: '0:-germination'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.1:-leaf-development'), value: '1:-leaf-development'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.2:-tillering'), value: '2:-tillering'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.3:-stem-elongation'), value: '3:-stem-elongation'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.4:-booting'), value: '4:-booting'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.5:-inflorescence-emergence,-heading'), value: '5:-inflorescence-emergence,-heading'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.6:-flowering,-anthesis'), value: '6:-flowering,-anthesis'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.7:-development-of-fruit'), value: '7:-development-of-fruit'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.8:-ripening'), value: '8:-ripening'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.9:-senescence'), value: '9:-senescence'}
  ];
}

export function getPhenologyCodes(context) {
  return {
    cod_null: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'}
    ],
    cod_0: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.0:-dry-seed-(caryopsis)'), value: '0:-dry-seed-(caryopsis)'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.1:-beginning-of-seed-imbibition'), value: '1:-beginning-of-seed-imbibition'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.3:-seed-imbibition-complete-(pigeon-breast)'), value: '3:-seed-imbibition-complete-(pigeon-breast)'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.5:-radicle-emerged-from-caryopsis'), value: '5:-radicle-emerged-from-caryopsis'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.6:-radicle-elongated,-root-hairs-and/or-side-roots-visible'), value: '6:-radicle-elongated,-root-hairs-and/or-side-roots-visible'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.7:-coleoptile-emerged-from-caryopsis-(in-water-rice-this-stage-occurs-before-stage-05)'), value: '7:-coleoptile-emerged-from-caryopsis-(in-water-rice-this-stage-occurs-before-stage-05)'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.9:-imperfect-leaf-emerges-(still-rolled)-at-the-tip-of-the-coleoptile'), value: '9:-imperfect-leaf-emerges-(still-rolled)-at-the-tip-of-the-coleoptile'}
    ],
    cod_1: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.10:-imperfect-leaf-unrolled,-tip-of-first-true-leaf-visible'), value: '10:-imperfect-leaf-unrolled,-tip-of-first-true-leaf-visible'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.11:-first-leaf-unfolded'), value: '11:-first-leaf-unfolded'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.12:-2-leaves-unfolded'), value: '12:-2-leaves-unfolded'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.13:-3-leaves-unfolded'), value: '13:-3-leaves-unfolded'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.14:-4-leaves-unfolded'), value: '14:-4-leaves-unfolded'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.15:-5-leaves-unfolded'), value: '15:-5-leaves-unfolded'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.16:-6-leaves-unfolded'), value: '16:-6-leaves-unfolded'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.17:-7-leaves-unfolded'), value: '17:-7-leaves-unfolded'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.18:-8-leaves-unfolded-'), value: '18:-8-leaves-unfolded-'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.19:-9-or-more-leaves-unfolded'), value: '19:-9-or-more-leaves-unfolded'}
    ],
    cod_2: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.21:-beginning-of-tillering:-first-tiller-detectable'), value: '21:-beginning-of-tillering:-first-tiller-detectable'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.22:-2-tillers-detectable'), value: '22:-2-tillers-detectable'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.23:-3-tillers-detectable'), value: '23:-3-tillers-detectable'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.24:-4-tillers-detectable'), value: '24:-4-tillers-detectable'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.25:-5-tillers-detectable'), value: '25:-5-tillers-detectable'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.26:-6-tillers-detectable'), value: '26:-6-tillers-detectable'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.27:-7-tillers-detectable'), value: '27:-7-tillers-detectable'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.28:-8-tillers-detectable'), value: '28:-8-tillers-detectable'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.29:-maximum-number-of-tillers-detectable'), value: '29:-maximum-number-of-tillers-detectable'}
    ],
    cod_3: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.30:-panicle-initiation-or-green-ring-stage:-chlorophyll-accumulates-in-the-stem-tissue,-forming-a-green-ring'), value: '30:-panicle-initiation-or-green-ring-stage:-chlorophyll-accumulates-in-the-stem-tissue,-forming-a-green-ring'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.34:-internode-elongation-or-jointing-stage:-internodes-begin-to-elongate,-panicle-more-than-2-mm-long'), value: '34:-internode-elongation-or-jointing-stage:-internodes-begin-to-elongate,-panicle-more-than-2-mm-long'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.32:-panicle-formation:-panicle-1–2-mm-in-length-(variety-dependent)'), value: '32:-panicle-formation:-panicle-1–2-mm-in-length-(variety-dependent)'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.37:-flag-leaf-just-visible,-still-rolled,-panicle-moving-upwards'), value: '37:-flag-leaf-just-visible,-still-rolled,-panicle-moving-upwards'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.39:-flag-leaf-stage:-flag-leaf-unfolded,-collar-regions-(auricle-and-ligule)-of-flag-leaf-and-penultimate-leaf-aligned-(pre-boot-stage)'), value: '39:-flag-leaf-stage:-flag-leaf-unfolded,-collar-regions-(auricle-and-ligule)-of-flag-leaf-and-penultimate-leaf-aligned-(pre-boot-stage)'}
    ],
    cod_4: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.41:-early-boot-stage:-upper-part-of-stem-slightly-thickened,-sheath-of-flag-leaf-about-5-cm-out-of-penultimate'), value: '41:-early-boot-stage:-upper-part-of-stem-slightly-thickened,-sheath-of-flag-leaf-about-5-cm-out-of-penultimate'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.43:-mid-boot-stage:-sheath-of-flag-leaf-5–10-cm-out-of-the-penultimate-leaf-sheath'), value: '43:-mid-boot-stage:-sheath-of-flag-leaf-5–10-cm-out-of-the-penultimate-leaf-sheath'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.45:-late-boot-stage:-flag-leaf-sheath-swollen,-sheath-of-flag-leaf-more-than-10-cm-out-of-penultimate-leaf-sheath'), value: '45:-late-boot-stage:-flag-leaf-sheath-swollen,-sheath-of-flag-leaf-more-than-10-cm-out-of-penultimate-leaf-sheath'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.47:-flag-leaf-sheath-opening'), value: '47:-flag-leaf-sheath-opening'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.49:-flag-leaf-sheath-open'), value: '49:-flag-leaf-sheath-open'}
    ],
    cod_5: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.51:-beginning-of-panicle-emergence:-tip-of-inflorescence-emerged-from-sheath'), value: '51:-beginning-of-panicle-emergence:-tip-of-inflorescence-emerged-from-sheath'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.55:-middle-of-panicle-emergence:-neck-node-still-in-sheath'), value: '55:-middle-of-panicle-emergence:-neck-node-still-in-sheath'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.52:-20%-of-panicle-emerged'), value: '52:-20%-of-panicle-emerged'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.53:-30%-of-panicle-emerged'), value: '53:-30%-of-panicle-emerged'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.54:-40%-of-panicle-emerged'), value: '54:-40%-of-panicle-emerged'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.56:-60%-of-panicle-emerged'), value: '56:-60%-of-panicle-emerged'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.57:-70%-of-panicle-emerged'), value: '57:-70%-of-panicle-emerged'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.58:-80%-of-panicle-emerged'), value: '58:-80%-of-panicle-emerged'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.59:-end-of-panicle-emergence:-neck-node-level-with-the-flag-leaf-auricle,-anthers-not-yet-visible'), value: '59:-end-of-panicle-emergence:-neck-node-level-with-the-flag-leaf-auricle,-anthers-not-yet-visible'}
    ],
    cod_6: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.61:-beginning-of-flowering:-anthers-visible-at-top-of-panicle'), value: '61:-beginning-of-flowering:-anthers-visible-at-top-of-panicle'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.65:-full-flowering:-anthers-visible-on-most-spikelets'), value: '65:-full-flowering:-anthers-visible-on-most-spikelets'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.69:-end-of-flowering:-all-spikelets-have-completed-flowering-but-some-dehydrated-anthers-may-remain'), value: '69:-end-of-flowering:-all-spikelets-have-completed-flowering-but-some-dehydrated-anthers-may-remain'}
    ],
    cod_7: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.71:-watery-ripe:-first-grains-have-reached-half-their-final-size'), value: '71:-watery-ripe:-first-grains-have-reached-half-their-final-size'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.75:-medium-milk:-grain-content-milky'), value: '75:-medium-milk:-grain-content-milky'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.73:-early-milk'), value: '73:-early-milk'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.77:-late-milk'), value: '77:-late-milk'}
    ],
    cod_8: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.83:-early-dough'), value: '83:-early-dough'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.85:-soft-dough:-grain-content-soft-but-dry,-fingernail-impression-not-held,-grains-and-glumes-still-green'), value: '85:-soft-dough:-grain-content-soft-but-dry,-fingernail-impression-not-held,-grains-and-glumes-still-green'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.87:-hard-dough:-grain-content-solid,-fingernail-impression-held'), value: '87:-hard-dough:-grain-content-solid,-fingernail-impression-held'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.89:-fully-ripe:-grain-hard,-difficult-to-divide-with-thumbnail'), value: '89:-fully-ripe:-grain-hard,-difficult-to-divide-with-thumbnail'}
    ],
    cod_9: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.92:-over-ripe:-grain-very-hard,-cannot-be-dented-by-thumbnail'), value: '92:-over-ripe:-grain-very-hard,-cannot-be-dented-by-thumbnail'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.97:-plant-dead-and-collapsing-'), value: '97:-plant-dead-and-collapsing-'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.99:-harvested-product'), value: '99:-harvested-product'}
    ]
  };
}

