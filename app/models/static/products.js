export function getProducts(context) {
  return [
    {text: context.get('i18n').t('fields.text.crop-info'), panel: 'index.crop-info'},
    {text: context.get('i18n').t('fields.text.soil-type'), panel: 'index.soil-type'},
    {text: context.get('i18n').t('fields.text.soil-condition'), panel: 'index.soil-condition'},
    {text: context.get('i18n').t('fields.text.crop-phenology'), panel: 'index.crop-phenology'},
    {text: context.get('i18n').t('fields.text.pathogens'), panel: 'index.pathogens'},
    {text: context.get('i18n').t('fields.text.diseases'), panel: 'index.diseases'},
    {text: context.get('i18n').t('fields.text.weeds'), panel: 'index.weeds'},
    {text: context.get('i18n').t('fields.text.fertilizers'), panel: 'index.fertilizers'},
    {text: context.get('i18n').t('fields.text.agrochemicals'), panel: 'index.agrochemicals'},
    {text: context.get('i18n').t('fields.text.irrigation'), panel: 'index.irrigation'},
    {text: context.get('i18n').t('fields.text.yield'), panel: 'index.yield'}
  ];
}
