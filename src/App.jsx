import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import ShowClases from "./components/clases/ShowClases.jsx";
import CreateClases from "./components/clases/CreateClases.jsx";
import Horario from "./pages/Horario/index.jsx";
import CenteredTabs from "./pages/Horario/components/NavBar.jsx";
import TabPanel from "./pages/Horario/components/WeekBar.jsx";
import AssigmentBar from "./pages/Horario/components/AssigmentBar.jsx";

const apiURL = "http://127.0.0.1:8000/api";

const inicialbrigada = 0;

export default function App() {
  const [brigadas, setBrigadas] = useState([]);

  const [brigadaSeleccionada, setBrigadaSeleccionada] =
    useState(inicialbrigada);
  const getAllBrigadas = async () => {
    try {
      const response = await axios.get(`${apiURL}/brigadas`);
      setBrigadas(response.data);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  const getnombrebrigada = function (brigada) {
    let nombrebrig = '';
    brigadas.map((itembrigada) => {
      if (brigada == itembrigada) nombrebrig = itembrigada.nombre;
    });
    return nombrebrig;
  };

  useEffect(() => {
    getAllBrigadas();
  }, []);

  useEffect(() => {
    if (inicialbrigada == 0) {
      let newbrigada = brigadas[0];
      newbrigada = getnombrebrigada(newbrigada);
      setBrigadaSeleccionada(newbrigada);
    }


  });

  return (
    <>
      <CenteredTabs
        brigadas={brigadas}
        brigadaSeleccionada={brigadaSeleccionada}
        setBrigadaSeleccionada={setBrigadaSeleccionada}
      />

      <h2 className="text-3xl font-bold mx-3 my-4 text-center">
        Horario de Clases de la brigada:
      </h2>
      <div className="flex w-full items-center place-content-center gap-4">
        <a className="bg-emerald-500  shadow-emerald-500/50  hover:bg-emerald-700 rounded p-2 text-white shadow-lg btn-lg m-3">
          Agregar Asigatura
        </a>

        <a className="bg-emerald-500  shadow-emerald-500/50 hover:bg-emerald-700 rounded p-2 text-white shadow-lg btn-lg m-3">
          Agregar Local
        </a>
      </div>

      <div className="flex w-full items-center place-content-center">
        <div className="items-center place-content-center  w-1/7">
          <TabPanel />
        </div>

        <BrowserRouter>
          <Routes>
            {<Route path="/" element={<Horario />} />}
            <Route path="/createClase" element={<CreateClases />} />
          </Routes>
        </BrowserRouter>
        <AssigmentBar />
      </div>
    </>
  );
}

App.propTypes = {};
