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
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.null'), value: 'null'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.0'), value: '0'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.1'), value: '1'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.2'), value: '2'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.3'), value: '3'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.4'), value: '4'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.5'), value: '5'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.6'), value: '6'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.7'), value: '7'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.8'), value: '8'},
    {text: context.get('i18n').t('data.crop-phenology.phenology-growth.9'), value: '9'}
  ];
}

export function getPhenologyCodes(context) {
  return {
    cod_null: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'}
    ],
    cod_0: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.0'), value: '0'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.1'), value: '1'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.3'), value: '3'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.5'), value: '5'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.6'), value: '6'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.7'), value: '7'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.9'), value: '9'}
    ],
    cod_1: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.10'), value: '10'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.11'), value: '11'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.12'), value: '12'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.13'), value: '13'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.14'), value: '14'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.15'), value: '15'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.16'), value: '16'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.17'), value: '17'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.18'), value: '18'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.19'), value: '19'}
    ],
    cod_2: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.21'), value: '21'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.22'), value: '22'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.23'), value: '23'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.24'), value: '24'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.25'), value: '25'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.26'), value: '26'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.27'), value: '27'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.28'), value: '28'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.29'), value: '29'}
    ],
    cod_3: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.30'), value: '30'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.32'), value: '32'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.34'), value: '34'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.37'), value: '37'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.39'), value: '39'}
    ],
    cod_4: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.41'), value: '41'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.43'), value: '43'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.45'), value: '45'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.47'), value: '47'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.49'), value: '49'}
    ],
    cod_5: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.51'), value: '51'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.52'), value: '52'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.53'), value: '53'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.54'), value: '54'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.55'), value: '55'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.56'), value: '56'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.57'), value: '57'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.58'), value: '58'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.59'), value: '59'}
    ],
    cod_6: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.61'), value: '61'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.65'), value: '65'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.69'), value: '69'}
    ],
    cod_7: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.71'), value: '71'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.73'), value: '73'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.75'), value: '75'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.77'), value: '77'}
    ],
    cod_8: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.83'), value: '83'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.85'), value: '85'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.87'), value: '87'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.89'), value: '89'}
    ],
    cod_9: [
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.null'), value: 'null'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.92'), value: '92'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.97'), value: '97'},
      {text: context.get('i18n').t('data.crop-phenology.phenology-codes.99'), value: '99'}
    ]
  };
}

