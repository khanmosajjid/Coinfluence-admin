/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import useImageUpload from "./useImageUpload"; // Import the custom hook

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedType, setSelectedType] = useState("exchanges"); // Default selection
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [urlError, setUrlError] = useState("");
  const [nameError, setNameError] = useState("");
  const API_URL = "https://api.coinfluence.io/upload"; // Replace with your Ngrok URL

  const { loading, success, error, progress, uploadImage, setProgress } =
    useImageUpload(API_URL);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      setProgress(0);
      setImageFile(file);
    } else {
      setSelectedImage(null);
      setImageFile(null);
    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleUrlChange = (event) => {
    const inputUrl = event.target.value;
    setUrl(inputUrl);
    if (!inputUrl) {
      setUrlError("URL is required");
    } else {
      setUrlError("");
    }
  };

  const handleNameChange = (event) => {
    const inputName = event.target.value;
    setName(inputName);
    if (!inputName) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const handleUploadClick = () => {
    if (!url) {
      setUrlError("URL is required");
    }
    if (!name) {
      setNameError("Name is required");
    }

    if (url && name) {
      uploadImage(imageFile, selectedType, url, name);
    }
  };

  return (
    <div className="upload-container">
      <Card className="upload-card">
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Upload the company logo
          </Typography>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {selectedImage && (
            <img src={selectedImage} alt="Preview" className="image-preview" />
          )}
          <div>
            <label>
              <input
                type="radio"
                value="exchanges"
                checked={selectedType === "exchanges"}
                onChange={handleTypeChange}
              />
              Exchanges
            </label>
            <label>
              <input
                type="radio"
                value="partners"
                checked={selectedType === "partners"}
                onChange={handleTypeChange}
              />
              Partners
            </label>
          </div>
          <TextField
            label="URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={handleUrlChange}
            error={!!urlError}
            helperText={urlError}
          />
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            error={!!nameError}
            helperText={nameError}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedImage || urlError || nameError}
            onClick={handleUploadClick}
          >
            Upload Image
          </Button>
          {loading && (
            <div className="progress">
              <LinearProgress variant="determinate" value={progress} />
            </div>
          )}
          {success && <p>Image uploaded successfully!</p>}
          {error && <p>Image upload failed. Please try again.</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadImage;
