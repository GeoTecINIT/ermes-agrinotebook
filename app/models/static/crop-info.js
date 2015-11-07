export function getCropTypes(context) {
  return [
    {text: context.get('i18n').t('data.crop-info.crop-types.alpha_alpha'), value: 'alpha_alpha'},
    {text: context.get('i18n').t('data.crop-info.crop-types.clover'), value: 'clover'},
    {text: context.get('i18n').t('data.crop-info.crop-types.corn'), value: 'corn'},
    {text: context.get('i18n').t('data.crop-info.crop-types.meadow'), value: 'meadow'},
    {text: context.get('i18n').t('data.crop-info.crop-types.poplar'), value: 'poplar'},
    {text: context.get('i18n').t('data.crop-info.crop-types.rice'), value: 'rice', selected: 'true'},
    {text: context.get('i18n').t('data.crop-info.crop-types.set-aside'), value: 'set-aside'},
    {text: context.get('i18n').t('data.crop-info.crop-types.soybean'), value: 'soybean'}
  ];
}

export function getPuddings(context) {
  return [
    {text: context.get('i18n').t('data.crop-info.puddings.null'), value: 'null'},
    {text: context.get('i18n').t('data.crop-info.puddings.yes'), value: 'yes'},
    {text: context.get('i18n').t('data.crop-info.puddings.no'), value: 'no'}
  ];
}

export function getRiceVarieties(context) {
  return [
    {text: context.get('i18n').t('data.crop-info.rice-varieties.null'), value: 'null'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.alexandros'), value: 'alexandros'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.augusto'), value: 'augusto'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.axios'), value: 'axios'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.bomba'), value: 'bomba'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.carnaroli'), value: 'carnaroli'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.cl-12'), value: 'cl-12'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.cl-26'), value: 'cl-26'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.cl-46'), value: 'cl-46'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.cl-80'), value: 'cl-80'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.clxl745'), value: 'clxl745'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.dimitra'), value: 'dimitra'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.dion'), value: 'dion'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.ecco-61'), value: 'ecco-61'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.gladio'), value: 'gladio'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.gleva'), value: 'gleva'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.luna'), value: 'luna'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.mare-cl'), value: 'mare-cl'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.olympiada'), value: 'olympiada'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.opale'), value: 'opale'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.ronaldo'), value: 'ronaldo'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.roxani'), value: 'roxani'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.selenio'), value: 'selenio'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.sirio-cl'), value: 'sirio-cl'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.sole-cl'), value: 'sole-cl'},
    {text: context.get('i18n').t('data.crop-info.rice-varieties.terra-cl'), value: 'terra-cl'}
  ];
}

export function getSowingPractices(context) {
  return [
    {text: context.get('i18n').t('data.crop-info.sowing-practices.null'), value: 'null'},
    {text: context.get('i18n').t('data.crop-info.sowing-practices.direct-seeding'), value: 'direct-seeding'},
    {text: context.get('i18n').t('data.crop-info.sowing-practices.scattered-seeding'), value: 'scattered-seeding'}
  ];
}

