export function getProducts(context) {
  return [
    {
      optgroup: context.get('i18n').t('data.agrochemicals.products.herbicides'),
      elements: [
        {text: context.get('i18n').t('data.agrochemicals.herbicides.azimsulfuron'), value: 'azimsulfuron'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.cyhalofop-butyl'), value: 'cyhalofop-butyl'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.imazamox-(clear-field)'), value: 'imazamox-(clear-field)'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.penoxulam'), value: 'penoxulam'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.profixydim'), value: 'profixydim'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.quinclorac'), value: 'quinclorac'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.bentazon'), value: 'bentazon'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.fludioxonil'), value: 'fludioxonil'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.oxodiazon'), value: 'oxodiazon'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.propanil'), value: 'propanil'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.mcpa'), value: 'mcpa'},
        {text: context.get('i18n').t('data.agrochemicals.herbicides.glyphosate-(only-for-paddy-mounds)'), value: 'glyphosate-(only-for-paddy-mounds)'}
      ]
    },
    {
      optgroup: context.get('i18n').t('data.agrochemicals.products.fungicides'),
      elements: [
        {text: context.get('i18n').t('data.agrochemicals.fungicides.azoxistrobin'), value: 'azoxistrobin'},
        {text: context.get('i18n').t('data.agrochemicals.fungicides.propiconazole-prochloraz'), value: 'propiconazole-prochloraz'},
        {text: context.get('i18n').t('data.agrochemicals.fungicides.trebuconazole'), value: 'trebuconazole'},
        {text: context.get('i18n').t('data.agrochemicals.fungicides.tricyclazone'), value: 'tricyclazone'}
      ]
    },
    {
      optgroup: context.get('i18n').t('data.agrochemicals.products.insecticides'),
      elements: [
        {text: context.get('i18n').t('data.agrochemicals.insecticides.pyrethroids'), value: 'pyrethroids'}
      ]
    }
  ];
}

