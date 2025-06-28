import axios from 'axios';
const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;

export const uploadImage = async (imageFile, folderName) => {
  if (!imageFile) {
    throw new Error('No image file provided in frontend');
  }

  // In case imageFile is an array, like when using an input with 'multiple'
  // if (Array.isArray(imageFile)) {
  // imageFile = imageFile[0]; // If it's an array, use the first file
  // }

  console.log('Image File ', imageFile);

  // Create a new FormData object
  const formData = new FormData();

  // Append the file directly to FormData
  formData.append('image', imageFile, imageFile.name); // The third parameter is the file name

  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/media/uploadImage`, // Backend endpoint
      formData, // Send the FormData object directly
      {
        headers: {
          'Content-Type': 'multipart/form-data' // This is set automatically by axios
        },
        params: {
          folderName: folderName // Pass the folder name as a parameter to the backend
        }
      }
    );

    return response.data.imageUrl; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Image upload failed:', error.message);
    throw error;
  }
};

// export const uploadPdf = async (pdfFile, folderName) => {
//   if (!pdfFile) {
//     throw new Error('No PDF file provided');
//   }

//   console.log('pdfFile in helper', pdfFile);
//   // Create FormData object and append the PDF file
//   const formData = new FormData();
//   formData.append('pdf', {
//     name: `${new Date().toISOString()}_Document.pdf`, // Generate a unique filename
//     type: pdfFile.type || 'application/pdf', // Ensure the file type is application/pdf
//     uri: pdfFile.uri || pdfFile // Handle React Native or web compatibility
//   });

//   try {
//     const response = await axios.post(
//       `${BASE_API_URL}/api/media/uploadPdf`, // Backend endpoint
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data' // Set the content type to multipart/form-data
//         },
//         params: {
//           folderName // Pass the folder name as a query parameter
//         }
//       }
//     );

//     return response.data.pdfUrl; // Return the uploaded PDF URL
//   } catch (error) {
//     console.error('PDF upload failed:', error.message);
//     throw error;
//   }
// };



export const uploadPdf = async (pdfFile, folderName) => {
  if (!pdfFile) {
    throw new Error('No PDF file provided');
  }

  console.log('pdfFile in helper', pdfFile);

  // Create FormData object and append the PDF file directly
  const formData = new FormData();
  formData.append('pdf', pdfFile); // Append the file directly

  try {
    const response = await axios.post(
      `${BASE_API_URL}/api/media/uploadPdf`, // Backend endpoint
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
        params: {
          folderName, // Pass the folder name as a query parameter
        },
      }
    );

    return response.data.pdfUrl; // Return the uploaded PDF URL
  } catch (error) {
    console.error('PDF upload failed:', error.message);
    throw error;
  }
};
