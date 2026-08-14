import imageCompression from "browser-image-compression";

export const compressImage = async (file) => {
  const compressedBlob = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.85,
  });

  return new File(
    [compressedBlob],
    file.name.replace(/\.[^.]+$/, ".webp"),
    {
      type: "image/webp",
      lastModified: Date.now(),
    }
  );
};