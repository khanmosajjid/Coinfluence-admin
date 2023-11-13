/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UploadIcon from "@mui/icons-material/CloudUpload";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import UploadImage from "./UploadImage";
import ImageList from "./ImageList";
import "./App.css";

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="app-container">
      <Tabs value={tabValue} onChange={handleChangeTab} centered>
        <Tab
          label="Upload Image"
          icon={<UploadIcon />}
          style={{ padding: "12px", margin: "0 12px" }} // Adjust padding and margin
        />
        <Tab
          label="Image List"
          icon={<PhotoLibraryIcon />}
          style={{ padding: "12px", margin: "0 12px" }} // Adjust padding and margin
        />
      </Tabs>
      <Box hidden={tabValue !== 0}>
        <UploadImage />
      </Box>
      <Box hidden={tabValue !== 1}>
        <ImageList key={tabValue} />
      </Box>
    </div>
  );
}

export default App;
