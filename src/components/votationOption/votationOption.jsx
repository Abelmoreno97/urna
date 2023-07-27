import { Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";

function VotationOption({ option, index, setOptionsData }) {
  const { title, images } = option;

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setOptionsData((prev) => [
      ...prev.slice(0, index),
      { ...prev[index], [name]: value },
      ...prev.slice(index + 1),
    ]);
  };

  const [previewURL, setPreviewURL] = useState({});

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    const { name } = e.target;
    if (selectedFile) {
      const objectURL = URL.createObjectURL(selectedFile);
      setPreviewURL((prev) => {
        return { ...prev, [name]: objectURL };
      });
      setOptionsData((prev) => {
        const newImages = prev[index].images;
        newImages[name === "image1" ? 0 : 1] = selectedFile;
        return [
          ...prev.slice(0, index),
          { ...prev[index], images: newImages },
          ...prev.slice(index + 1),
        ];
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);

    formData.append("images", images[0]);
    formData.append("images", images[1]);
    fetch(`${import.meta.env.VITE_API_BACKEND_BASE_URL}/options`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        // acá tenemos que setear la info en el localStorage
        console.log(res);
      });
  };

  return (
    <div style={{ width: "250px" }}>
      <h2>Opción {index + 1}</h2> <br />
      <Input
        placeholder="Titulo de la votacion"
        value={title}
        name="title"
        onChange={handleOnChange}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          margin: "10px",
          gap: "10px",
        }}
      >
        <label htmlFor={`image1-${index}`} style={{ cursor: "pointer" }}>
          Imagen 1
        </label>
        <input
          id={`image1-${index}`}
          type="file"
          name="image1"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        <label htmlFor={`image2-${index}`} style={{ cursor: "pointer" }}>
          Imagen 2
        </label>
        <input
          id={`image2-${index}`}
          type="file"
          name="image2"
          style={{ display: "none" }}
          onChange={handleFile}
        />
      </div>
      <p>Imágenes previas</p>
      <HStack>
        <img style={{ width: "45%" }} src={previewURL.image1} />
        <img style={{ width: "45%" }} src={previewURL.image2} />
      </HStack>
      <Button onClick={handleOnSubmit}>Confirmar</Button>
    </div>
  );
}

export default VotationOption;
