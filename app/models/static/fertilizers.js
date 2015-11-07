export function getProducts(context) {
  return [
    {text: context.get('i18n').t('data.fertilizers.products.calcium-cyanamide'), value: 'calcium-cyanamide'},
    {text: context.get('i18n').t('data.fertilizers.products.entec-26-(n+-k)'), value: 'entec-26-(n+-k)'},
    {text: context.get('i18n').t('data.fertilizers.products.entec-46-(n+k)'), value: 'entec-46-(n+k)'},
    {text: context.get('i18n').t('data.fertilizers.products.flexammon'), value: 'flexammon'},
    {text: context.get('i18n').t('data.fertilizers.products.nitrophoska'), value: 'nitrophoska'},
    {text: context.get('i18n').t('data.fertilizers.products.novammon-(n+k)'), value: 'novammon-(n+k)'},
    {text: context.get('i18n').t('data.fertilizers.products.organic'), value: 'organic'},
    {text: context.get('i18n').t('data.fertilizers.products.urea'), value: 'urea'},
    {text: context.get('i18n').t('data.fertilizers.products.utec-46-'), value: 'utec-46-'}
  ];
}

