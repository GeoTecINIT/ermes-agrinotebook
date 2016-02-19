export function getCauses(context) {
  return [
    {text: context.get('i18n').t('data.abiotic-stresses.causes.cold'), value: 'cold'},
    {text: context.get('i18n').t('data.abiotic-stresses.causes.salinity'), value: 'salinity'},
    {text: context.get('i18n').t('data.abiotic-stresses.causes.drought'), value: 'drought'},
    {text: context.get('i18n').t('data.abiotic-stresses.causes.heat-wave'), value: 'heat-wave'}
  ];
}

