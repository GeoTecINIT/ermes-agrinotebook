export function getProducts(context) {
  return [
    {text: context.get('i18n').t('data.agrochemicals.products.bentazon'), value: 'bentazon'},
    {text: context.get('i18n').t('data.agrochemicals.products.celest-syngenta-(fludioxonil)'), value: 'celest-syngenta-(fludioxonil)'},
    {text: context.get('i18n').t('data.agrochemicals.products.mixed-product'), value: 'mixed-product'},
    {text: context.get('i18n').t('data.agrochemicals.products.oxodiazon'), value: 'oxodiazon'},
    {text: context.get('i18n').t('data.agrochemicals.products.propanil'), value: 'propanil'},
    {text: context.get('i18n').t('data.agrochemicals.products.pyretroids'), value: 'pyretroids'},
    {text: context.get('i18n').t('data.agrochemicals.products.touchdown-syngenta-(glyphosate)'), value: 'touchdown-syngenta-(glyphosate)'}
  ];
}

