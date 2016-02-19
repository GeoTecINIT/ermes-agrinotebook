export function getSoilTextures(context) {
  return [
    {text: context.get('i18n').t('data.soil-type.soil-textures.clay'), value: 'clay'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.sandy-clay'), value: 'sandy-clay'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.silty-clay'), value: 'silty-clay'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.sandy-clay-loam'), value: 'sandy-clay-loam'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.clay-loam'), value: 'clay-loam'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.silty-clay-loam'), value: 'silty-clay-loam'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.sandy-loam'), value: 'sandy-loam'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.loam'), value: 'loam'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.silt-loam'), value: 'silt-loam'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.silt'), value: 'silt'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.loamy-sand'), value: 'loamy-sand'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.sand'), value: 'sand'}
];
}

