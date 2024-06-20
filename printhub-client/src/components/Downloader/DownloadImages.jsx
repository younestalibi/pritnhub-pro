import React from "react";
import { Button } from "antd";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { BsDownload } from "react-icons/bs";

const DownloadImages = ({ imageUrls }) => {
  const handleDownload = async () => {
    const zip = new JSZip();
    const folder = zip.folder("images");

    await Promise.all(
      imageUrls.map(async (url, index) => {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/${url}`
        );
        const blob = await response.blob();
        const filename = url.substring(url.lastIndexOf("/") + 1);
        folder.file(filename, blob);
      })
    );

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
  };

  return <BsDownload
  style={{ 
    cursor:'pointer',
   }}
  size={25} onClick={handleDownload} />;
};

export default DownloadImages;
