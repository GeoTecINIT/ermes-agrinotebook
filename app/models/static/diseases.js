export function getNames(context) {
  return [
    {
      optgroup: context.get('i18n').t('fields.text.default'),
      elements: [
        {text: context.get('i18n').t('data.diseases.names.bipolaris'), value: 'bipolaris'},
        {text: context.get('i18n').t('data.diseases.names.cercospora'), value: 'cercospora'},
        {text: context.get('i18n').t('data.diseases.names.fusarium'), value: 'fusarium'},
        {text: context.get('i18n').t('data.diseases.names.pyricularia-(blast)'), value: 'pyricularia-(blast)'}
      ]
    }
  ];
}

