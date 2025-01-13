export interface Dimensions {
  width: number;
  height: number;
}

export const getImageDimensions = (file: File): Dimensions => {
  const img = new Image();

  img.onload = () => {
    const dimensions = {
      width: img.width,
      height: img.height,
    };
    return dimensions;
  };
  img.src = URL.createObjectURL(file);
  const result: Dimensions = {
    width: img.width,
    height: img.height,
  };

  return result;
};
