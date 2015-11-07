export function getMeasures(context) {
  return [
    {text: context.get('i18n').t('data.irrigation.measures.mm'), value: 'mm'},
    {text: context.get('i18n').t('data.irrigation.measures.m3'), value: 'm3'}
  ];
}

