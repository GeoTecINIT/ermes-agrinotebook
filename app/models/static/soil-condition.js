export function getParcelStatus(context) {
  return [
    {text: context.get('i18n').t('data.soil-condition.parcel-status.bare-soil'), value: 'bare-soil'},
    {text: context.get('i18n').t('data.soil-condition.parcel-status.plowed'), value: 'plowed'},
    {text: context.get('i18n').t('data.soil-condition.parcel-status.sowed'), value: 'sowed'},
    {text: context.get('i18n').t('data.soil-condition.parcel-status.flooded'), value: 'flooded'}
  ];
}

