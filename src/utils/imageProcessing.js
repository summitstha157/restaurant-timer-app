// Convert File to Base64 string
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result); // "data:image/jpeg;base64,..."
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

// Validate image file
export const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return file && validTypes.includes(file.type) && file.size <= maxSize;
};

// Get file extension from base64 or mime type
export const getImageExtension = (base64String) => {
  if (!base64String) return 'jpg';

  // Extract mime type from base64 string
  // Format: "data:image/jpeg;base64,..."
  const mimeMatch = base64String.match(/data:image\/(\w+);/);
  if (mimeMatch && mimeMatch[1]) {
    return mimeMatch[1];
  }

  return 'jpg';
};

// Compress image if needed (optional enhancement)
export const compressImage = (base64String, maxWidth = 300, maxHeight = 300) => {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Calculate new dimensions maintaining aspect ratio
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL('image/jpeg', 0.8)); // 80% quality
    };

    img.onerror = () => {
      // If image loading fails, return original
      resolve(base64String);
    };

    img.src = base64String;
  });
};

// Get image metadata for storage
export const getImageMetadata = (file, source = 'upload') => {
  return {
    source: source, // 'camera' or 'upload'
    fileName: file.name || `image.${getImageExtension(file.type)}`,
    uploadedAt: Date.now(),
  };
};
