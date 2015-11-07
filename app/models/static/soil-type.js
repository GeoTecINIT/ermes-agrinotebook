export function getSoilTextures(context) {
  return [
    {text: context.get('i18n').t('data.soil-type.soil-textures.clay'), value: 'clay'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.silt-clay'), value: 'silt-clay'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.slit-clay-loam'), value: 'slit-clay-loam'},
    {text: context.get('i18n').t('data.soil-type.soil-textures.medium-textured'), value: 'medium-textured'}
  ];
}

