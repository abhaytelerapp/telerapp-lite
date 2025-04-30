import React, { useEffect, useState } from "react";

const PreviewPdf = (data) => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Fetch the image as a blob
        // const response = await fetch(`https://telerappdevattachments.s3.ap-south-1.amazonaws.com/documents/1730970153986-padmakar-chopakar%20%20%281%29.pdf`);
        const response = await fetch(`${data.previewUrl}`);

        // Check if the response is ok (status code 200)
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        // Convert the response to a blob
        const imageBlob = await response.blob();

        // Create a temporary URL for the image blob
        const imageUrl = URL.createObjectURL(imageBlob);

        // Set the image URL in state
        setImageData(imageUrl);
      } catch (err) {
        // If an error occurs, update the error state
        setError("Failed to load image");
        console.error(err);
      } finally {
        // Set loading to false once the image is loaded or failed
        setLoading(false);
      }
    };

    fetchImage();
  }, []);

  // If the image is still loading
  if (loading) {
    return <div>Loading image...</div>;
  }

  // If there was an error fetching the image
  if (error) {
    return <div>{error}</div>;
  }

  // Render the image once it is successfully fetched
  return (
    <div className=" w-full h-[70vh]">
      {/* <img src={imageData} alt="Fetched Image" /> */}
      <iframe
        key={Math.random()}
        src={imageData}
        className="h-full w-full"
        title="Attachment Preview"
      ></iframe>
    </div>
  );
};

export default PreviewPdf;
