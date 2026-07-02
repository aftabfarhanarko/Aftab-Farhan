export const uploadImageToImgBB = async (file: File) => {
  const apiKey = "b2857d07647b41f6a0bdba5ea922b124"
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
