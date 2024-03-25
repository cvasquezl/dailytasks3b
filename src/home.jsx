import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro, faStar } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./index.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [activitiesForDays, setActivitiesForDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState();

  useEffect(()=>{
    const handleGetAll = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    const activitiesData = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        titulo: doc.data().titulo,
        asignatura: doc.data().asignatura,
        fecha: doc.data().fecha,
        imagenes: doc.data().imagenes,
      };
    });
    setActivities(activitiesData);
  };
    handleGetAll();
  }, []);
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



  const handleOnClickDay = (date) => {
    setSelectedDate(date);
    const activitiesForDays = activities.filter(
      (activity) => activity.fecha === date.toISOString().substring(0, 10)
    );
    setActivitiesForDays(activitiesForDays);
  };
  return (
    <div>
      <div  className="grid text-center">
        <div className="accordion accordion-flush " id="accordionFlushExample">
          <div className="row justify-content-center  mt-5 ">
            <div className="col col-8 col-sm-4 box">
              {asignaturas.map((asignatura) => (
                <div className="accordion-item ">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#flush-collapse" + asignatura.name}
                      aria-expanded="false"
                      aria-controls={"flush-collapse" + asignatura.name}
                    >
                      {asignatura.name}
                    </button>
                  </h2>
                  <div
                    id={"flush-collapse" + asignatura.name}
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">
                      <div>
                        <Calendar
                          tileContent={({ date, view }) => {
                            if (view === "month") {
                              const activitiesFiltered = activities.filter(
                                (activity) =>
                                  activity.asignatura === asignatura.name
                              );
                              const activitiesDates = activitiesFiltered.map(
                                (activity) => activity.fecha
                              );

                              if (
                                activitiesDates.includes(
                                  date.toISOString().substring(0, 10)
                                )
                              ) {
                                return (
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    size="sm"
                                    color="#FF8B13"
                                  />
                                );
                              }
                            }
                            return null;
                          }}
                          onClickDay={handleOnClickDay}
                        />
                        {selectedDate && (
                          <ul>
                            {activitiesForDays
                              .filter(
                                (activity) =>
                                  activity.asignatura === asignatura.name &&
                                  activity.fecha ===
                                    selectedDate.toISOString().substring(0, 10)
                              )
                              .map((activity) => (
                                <li key={activity.id}>
                                  <a href={"/galeria/" + activity.id}>
                                    {activity.titulo}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="row mx-auto ">
          <div className="col">
            <button id= "flotante"className="btn btn-info " type="submit ">
              <a className="enlaces" href="/formulario">
                <FontAwesomeIcon icon={faCameraRetro} size="2xl" />
              </a>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
