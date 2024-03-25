import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "./firebase";
import { v4 } from "uuid";
import imagen from "./image/loading.gif";
const Form = () => {
  const [titulo, setTitulo] = useState("");
  const [asignatura, setAsignatura] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  let files;

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleAsignaturaChange = (event) => {
    setAsignatura(event.target.value);
  };

  const handleImagesChange = async (e) => {
    files = await e.target.files;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let urls = [];

    for (const file of files) {
      const storageRef = ref(storage, v4());
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
      console.log(urls);
    }

    const date = new Date(); // obtiene la fecha actual
    const year = date.getFullYear(); // obtiene el año actual (ej: 2023)
    const month = String(date.getMonth() + 1).padStart(2, "0"); // obtiene el mes actual como string (01-12)
    const day = String(date.getDate()).padStart(2, "0"); // obtiene el día actual como string (01-31)
    const formattedDate = `${year}-${month}-${day}`;

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        titulo: titulo,
        asignatura: asignatura,
        imagenes: urls,
        fecha: formattedDate,
      });
      setLoading(false);
      setAlert(true);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRedirectTo = () => {
    setAlert(false);
  };
  const asignaturas = [
    { name: "Lenguaje" },
    { name: "Matematicas" },
    { name: "Ciencias" },
    { name: "Historia" },
    { name: "Ingles" },
    { name: "Tecnologia" },
    { name: "Art.visuales" },
    { name: "Religion" },
    { name: "Musica" },
  ];

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-8 col-sm-4">
        <h1>Agregar tareas</h1>
        <button type="button" class="flotante2 btn btn-info">
          <a href="/" className="enlaces">
            <FontAwesomeIcon icon={faCircleArrowLeft} size="2xl" />
          </a>
        </button>
        <form className="box2" action="" method="POST" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título
            </label>
            <input
              type="text"
              placeholder="Ingrese un título..."
              className="form-control form-control-border"
              id="titulo"
              value={titulo}
              onChange={handleTituloChange}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="asignaturas" className="form-label">
              Asignaturas
            </label>
            <select
              className="form-control form-control-border"
              id="asignaturas"
              value={asignatura}
              onChange={handleAsignaturaChange}
            >
              <option>Seleccione una asignatura...</option>
              {asignaturas.map((asig) => {
                return <option value={asig.name}>{asig.name}</option>;
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="imagenes" className="form-label">
              Imágenes
            </label>
            <input
              className="form-control form-control-border"
              type="file"
              multiple
              name="images"
              id="images"
              onChange={handleImagesChange}
            />
          </div>
          <div className="row justify-content-center">
            <div className="col-sm-6 col-8 text-center">
              <button type="submit" className="btn btn-primary">
                Crear tarea
              </button>
            </div>
          </div>
        </form>
        {loading === true && (
          <img src={imagen} alt="" width={150} className="loading" />
        )}
        {alert === true && (
          <div class="alert alert-success loading text-center" role="alert">
            <h4 class="alert-heading">Tarea cargada</h4>
            <Link to="/" onClick={handleRedirectTo} className="btn btn-warning">
              OK!
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
