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
function App({ onLogout }) {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="app-container">
      <nav style={styles.navbar}>
        <span style={styles.title}>Upload Page</span>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </nav>
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

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};
