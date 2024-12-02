import Dropzone from "react-dropzone";
import { FolderUp, X } from "lucide-react";

import FileUploadModal from "@/components/admin-components/FileUploadModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

import { API_URL } from "@/constants";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const FileUpload = ({ optionNotPresent, category }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileHandler = (acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  };

  const [uploadProgress, setUploadProgress] = useState({});

  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  const clearHandler = () => {
    setSelectedFiles([]);
  };

  const removeFileHandler = (fileIndex) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== fileIndex
    );
    setSelectedFiles(updatedFiles);
  };

  const uploadFunction = (file, index, category) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(`${API_URL}upload/add-designs/${category}`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress((prevProgress) => ({
          ...prevProgress,

          [index]: percentCompleted,
        }));
      },
    });
  };
  const uploadHandler = async () => {
    try {
      setIsUploading(true);

      await Promise.all(
        selectedFiles.map((file, index) => {
          return uploadFunction(file, index, category);
        })
      );
      setIsUploading(false);
      console.log("success");
      setSelectedFiles([]);
    } catch (error) {
      console.error("Upload error:", error.message);
    }
  };

  return optionNotPresent ? (
    <FolderUp
      color="grey"
      style={{
        outline: "none",
        border: "none",
      }}
    />
  ) : (
    <FileUploadModal>
      <p>
        Category <span>{category}</span>
      </p>
      <Dropzone onDrop={fileHandler}>
        {({ getRootProps, getInputProps, acceptedFiles }) => (
          <>
            <div
              {...getRootProps()}
              className="min-w-full border-dotted border-2 border-sky-500 rounded-lg py-3 my-4"
            >
              <input {...getInputProps()} />
              <div className="flex justify-center">
                <FolderUp />
                <span className="mx-2"> Select Files or Drop Folder</span>
              </div>
            </div>

            <div className="max-h-[380px] overflow-y-scroll w-full">
              {selectedFiles.length > 0 &&
                selectedFiles.map((file, index) => {
                  return (
                    <div
                      className="flex justify-between items-center"
                      key={index}
                    >
                      <p>{file.name}</p>

                      {isUploading && (
                        <Progress
                          value={uploadProgress[index]}
                          className="w-[200px]"
                        />
                      )}

                      <X
                        onClick={() => removeFileHandler(index)}
                        className="cursor-pointer"
                      />
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </Dropzone>

      {/*  */}
      <div>
        {selectedFiles.length > 0 && (
          <div className="my-4">
            <Button onClick={uploadHandler} disabled={isUploading}>
              {isUploading ? "Uploading" : "Upload"}
            </Button>
            <Button
              className="mx-2"
              onClick={clearHandler}
              disabled={isUploading}
            >
              Clear
            </Button>
          </div>
        )}
      </div>
    </FileUploadModal>
  );
};

export default FileUpload;
