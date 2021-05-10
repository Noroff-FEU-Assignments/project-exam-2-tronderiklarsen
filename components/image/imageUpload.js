import styles from "../../styles/ImageUpload.module.css";
import { useState } from "react";
import { API_URL } from "../../constants/api";

export default function ImageUpload({ placeId, imageUploaded }) {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "place");
    formData.append("refId", placeId);
    formData.append("field", "image");

    const response = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.upload}>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange}></input>
        </div>
        <input className="btn" type="submit" value="Upload"></input>
      </form>
    </div>
  );
}