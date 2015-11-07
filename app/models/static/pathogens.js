export function getNames(context) {
  return [
    {text: context.get('i18n').t('data.pathogens.names.aphids'), value: 'aphids'},
    {text: context.get('i18n').t('data.pathogens.names.lissorhoptrus-oryzophilus'), value: 'lissorhoptrus-oryzophilus'},
    {text: context.get('i18n').t('data.pathogens.names.nematods'), value: 'nematods'},
    {text: context.get('i18n').t('data.pathogens.names.pomacea'), value: 'pomacea'}
  ];
}

