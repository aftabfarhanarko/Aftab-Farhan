export const uploadImageToImgBB = async (file: File) => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("ImgBB API key is missing");
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return data.data.url; // Returns the direct image URL
    } else {
      throw new Error(data.error.message || "Failed to upload image");
    }
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
    throw error;
  }
};
