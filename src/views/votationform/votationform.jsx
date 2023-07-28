import { useState } from "react";
import style from "./votationform.module.css";
import { Input, Button, Textarea, HStack } from "@chakra-ui/react";
import VotationOption from "../../components/votationOption/votationOption";

const Votationform = () => {
  const [optionsData, setOptionsData] = useState([
    { title: "", images: [] },
    { title: "", images: [] },
  ]);

  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    description: "",
    opening_date: "",
    closing_date: "",
  });

  const addOption = () => {
    setOptionsData((prev) => [...prev, { title: "", images: [] }]);
  };

  const removeOption = () => {
    if (optionsData.length > 2) {
      setOptionsData((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_id", "jsdfkajdsaksdfj");
    formData.append("title", "Titulo de la votacion");
    formData.append("description", "description ");
    formData.append("opening_date", "28/07/23");
    formData.append("closing_date", "28/07/23");

    optionsData.forEach((option, index) => {
      formData.append(`option${index + 1}Title`, option.title);
      option.images.forEach((image) => {
        formData.append(`option${index + 1}Image`, image);
      });
    });

    fetch(`${import.meta.env.VITE_API_BACKEND_BASE_URL}/voting`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div className={style.cont}>
      <h1>Votationform</h1> <br />
      <Input placeholder="Titulo de la votacion" />
      <Input placeholder="fecha de inicio" />
      <Input placeholder="fecha de finalizacion" />
      <h1>INGRESAR OPCIONES</h1> <br />
      <div
        style={{ width: "400px", display: "flex", flexDirection: "column", alignItems: "start" }}
      >
        {optionsData.map((option, index) => (
          <VotationOption
            key={index}
            index={index}
            option={option}
            setOptionsData={setOptionsData}
          />
        ))}
      </div>
      <br />
      <HStack>
        <Button onClick={addOption}>Añadir</Button>
        <Button onClick={removeOption} bg={"red.400"}>
          Remover
        </Button>
      </HStack>
      <div style={{ width: "100%" }}>
        <h1>detalles</h1>
        <Textarea placeholder="proporcione contexto sobre la tematica de la votacion y detalles aqui." />
        <Button onClick={handleSubmit}>Enviar</Button>
      </div>
      <button className={style.Link} onClick={() => history.back()}>
        ATRAS
      </button>
    </div>
  );
};

export default Votationform;
