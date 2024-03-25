import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

const Galeria = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState({})
  useEffect(()=>{
    const handleGetAll = async () => {
    const oneDoc = await getDoc(doc(db, "tasks",id));
    console.log(oneDoc.data());
    setActivity(oneDoc.data());
  };
    handleGetAll();
  },[id]);
  return (
    <div className="row justify-content-center">
      <div className="col-4 text-center">
        <h1>{activity.asignatura}</h1>
        <h2>Tarea: {activity.titulo}</h2>
        <button type="button" class="flotante2 btn btn-info"><a href="/" className="enlaces"><FontAwesomeIcon icon={faCircleArrowLeft} size="2xl" /></a></button>
        
      </div>
      {activity.imagenes && activity.imagenes.map((img) => {
        return (
          <div className="row justify-content-center">
            <div className="col-8">
              <img src={img} alt="" className="img-fluid rounded mb-3"/>
            </div>
          </div>
        );
      })}
      
    </div>
  );
};

export default Galeria;
