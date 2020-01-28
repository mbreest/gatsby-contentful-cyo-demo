exports.getImageURL = ({
    public_id,
    cloudName,
    baseTransformations = [],                
    transformations = [],
    chained = [],
    defaults = ['f_auto', 'q_auto'],
    version = false,
    format
  }) => {
    const baseURL = 'https://res.cloudinary.com/';
    const allTransformations = [baseTransformations.join()]
      .concat(transformations.concat(defaults).join())
      .concat(chained)
      .join('/');
  
    const imagePath = [
      cloudName,
      '/image/upload/',
      allTransformations,
      version ? `/v${version}/` : '/',
      public_id,
      format ? "." + format : ""
    ]
      .join('')
      .replace('//', '/');
  
    return baseURL + imagePath;
  };