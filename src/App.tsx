import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

function App() {
  const { watch, register } = useForm();
  const imageUpload: FileList = watch("image-upload");
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  useEffect(() => {
    if (imageUpload && imageUpload[0]) {
      toBase64(imageUpload[0]).then(base64 => {
        base64 && setPreviewImage(base64.toString());
      });
    }
  }, [imageUpload]);

  return (
    <>
      {previewImage && (
        <img
          src={previewImage}
          alt={"image"}
          style={{ width: "64px", height: "64px" }}
        />
      )}
      <input name={"image-upload"} type={"file"} ref={register} />
    </>
  );
}

export default App;
