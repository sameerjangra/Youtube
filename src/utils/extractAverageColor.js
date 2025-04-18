export const extractAverageColor = (img, size = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
  
    const centerX = Math.floor(canvas.width / 2);
    const centerY = Math.floor(canvas.height / 2);
    const startX = Math.max(centerX - size / 2, 0);
    const startY = Math.max(centerY - size / 2, 0);
    const imageData = ctx.getImageData(startX, startY, size, size);
    const { data } = imageData;
  
    let rSum = 0, gSum = 0, bSum = 0;
    const totalPixels = size * size;
  
    for (let i = 0; i < data.length; i += 4) {
      rSum += data[i];
      gSum += data[i + 1];
      bSum += data[i + 2];
    }
  
    const avgR = Math.round(rSum / totalPixels);
    const avgG = Math.round(gSum / totalPixels);
    const avgB = Math.round(bSum / totalPixels);
  
    return `#${avgR.toString(16).padStart(2, '0')}${avgG.toString(16).padStart(2, '0')}${avgB.toString(16).padStart(2, '0')}`;
  };
  