export function getRegions(context) {
  return [
    {text: context.get('i18n').t('region.greece'), value: "greece"},
    {text: context.get('i18n').t('region.italy'), value: "italy"},
    {text: context.get('i18n').t('region.spain'), value: "spain"}
  ];
}

export function getLanguajes() {
  return [
    {text: 'English', value: 'en', selected: true},
    {text: 'Español', value: 'es'},
    {text: 'Italiano', value: 'it'},
    {text: 'Έλληνες', value: 'gk'}
  ];
}
