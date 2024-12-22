export const optimizeImage = (url: string): string => {
  // If it's an unsplash image, we can use their built-in optimization
  if (url.includes('unsplash.com')) {
    // Add width and quality parameters to the URL
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?w=500&q=80&auto=format&fit=crop`;
  }
  
  // For other images, return as is (we'll handle them in the component)
  return url;
};