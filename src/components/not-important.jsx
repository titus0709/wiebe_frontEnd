import React, { createContext, useContext, useState } from "react";
import { NotificationContext } from "./NotificationContext";

const UploadContext = createContext();

const UploadProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]);
  const [isUploading, setIsUploading] = useState({});
  const [failedUploads, setFailedUploads] = useState({});

  const { setNotifications } = useContext(NotificationContext);

  // Update progress for a specific upload
  const updateProgress = (category, index, progress) => {
    setUploads((prevUploads) =>
      prevUploads.map((upload) =>
        upload.category === category
          ? { ...upload, progress: { ...upload.progress, [index]: progress } }
          : upload
      )
    );
  };

  // Mark upload as failed
  const markAsFailed = (category, index, file) => {
    setFailedUploads((prevFailed) => ({
      ...prevFailed,
      [category]: [...(prevFailed[category] || []), index],
    }));
    setNotifications((prev) => [
      ...prev,
      {
        message: `File ${file.path} failed to upload for }`,
        status: false,
        id: file.path,
      },
    ]);
  };

  // Mark job as complete
  const completeUpload = (category) => {
    setIsUploading((prev) => ({ ...prev, [category]: false }));
    setNotifications((prev) => [
      ...prev,
      {
        message: `Files uploaded successfully`,
        status: true,
        id: category,
      },
    ]);
    setUploads((prevUploads) =>
      prevUploads.filter((upload) => upload.category !== category)
    );
  };

  // Check if all files for a job are uploaded
  const checkAllUploaded = (category) => {
    const upload = uploads.find((upload) => upload.category === category);
    return upload && Object.values(upload.progress).every((p) => p === 100);
  };

  // Start upload process
  const startUpload = (files, uploadFunction, category) => {
    const newUpload = { category, files, progress: {} };

    setUploads((prev) => [...prev, newUpload]);
    setIsUploading((prev) => ({ ...prev, [category]: true }));

    files.forEach((file, index) => {
      uploadFunction(file, index, category)
        .then(() => updateProgress(category, index, 100))
        .catch((error) => {
          console.error("Error uploading file:", error);
          updateProgress(category, index, 0);
          markAsFailed(category, index, file);
        })
        .finally(() => {
          if (checkAllUploaded(category)) {
            completeUpload(category);
          }
        });
    });
  };

  // Retry a failed upload
  const retryUpload = (file, index, uploadFunction, category) => {
    setFailedUploads((prevFailed) => ({
      ...prevFailed,
      [category]: (prevFailed[category] || []).filter((i) => i !== index),
    }));

    uploadFunction(file, index, category)
      .then(() => updateProgress(category, index, 100))
      .catch((error) => {
        console.error("Error uploading file:", error);
        updateProgress(category, index, 0);
        markAsFailed(category, index, file);
      })
      .finally(() => {
        if (checkAllUploaded(category)) {
          completeUpload(category);
        }
      });
  };

  return (
    <UploadContext.Provider
      value={{
        uploads,
        startUpload,
        isUploading,
        failedUploads,
        retryUpload,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export { UploadContext, UploadProvider };
