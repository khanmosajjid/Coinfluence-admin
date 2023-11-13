/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch image data from your server
    axios.get("https://api.coinfluence.io/images").then((response) => {
      setImages(response.data);
    });
  }, []);

  const handleDeleteImage = (imageId) => {
    // Call the delete image API
    axios
      .delete(`https://api.coinfluence.io/${imageId}`)
      .then(() => {
        // Remove the deleted image from the state
        setImages((prevImages) =>
          prevImages.filter((image) => image._id !== imageId)
        );
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  return (
    <div className="image-list-container">
      <h2>Image List</h2>
      {images.map((image) => (
        <div key={image._id} style={{ overflow: "scroll" }}>
          <img
            key={image.path}
            style={{ width: "100%" }}
            src={`https://api.coinfluence.io/${image.path}`}
            alt="Image"
          />
          <h4 style={{ color: "black" }}>Type: {image?.type}</h4>
          <h4 style={{ color: "black" }}>Name: {image?.name}</h4>
          <h4 style={{ color: "black" }}>Url: {image?.url}</h4>
          <button onClick={() => handleDeleteImage(image._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
