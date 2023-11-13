import { useState } from "react";
import axios from "axios";

const useImageUpload = (apiUrl) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0); // Define setProgress function

    const uploadImage = async (file, type, url, name) => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        const formData = new FormData();
        formData.append("image", file);
        formData.append("type", type)
        formData.append("url", url);
        formData.append("name", name);
        const config = {
            onUploadProgress: (progressEvent) => {
                setProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
            },
        };

        try {
            await axios.post(apiUrl, formData, config);
            setSuccess(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { loading, success, error, progress, setProgress, uploadImage };
};

export default useImageUpload;
