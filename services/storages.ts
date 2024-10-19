
const endpoint = `${process.env.DOMAIN}/api/admin/storages`;
export const uploadImages = async (files: File[]) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
  
    try {
      const response = await fetch(`${endpoint}/upload`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
};