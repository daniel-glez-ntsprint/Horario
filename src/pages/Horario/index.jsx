import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import Item from "./components/item";
import CenteredTabs from "./components/NavBar.jsx";
import TabPanel from "./components/WeekBar.jsx";

const apiURL = "http://127.0.0.1:8000/api";
// const apiURL = import.meta.env.VITE_API_URL;

const horarioInicial = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const semanaInicial = 1;
const inicialBrigada = 0;

export default function Horario() {
  const [isLoading, setIsLoading] = useState(true);
  //Todas las clases de una semana
  const [clases, setClases] = useState([]);

  //Arreglo bidimensional con todas las clases para una semana / una brigada
  const [horarioTabla, setHorarioTabla] = useState(horarioInicial);

  //Arreglo con todas las semanas
  const [semanas, setSemanas] = useState([]);
  const [semanasSeleccionada, setSemanasSeleccionada] = useState(semanaInicial);

  //Arreglo con todas las brigadas
  const [brigadas, setBrigadas] = useState([]);
  const [brigadaSeleccionada, setBrigadaSeleccionada] = useState("");

  const getSemanas = async () => {
    try {
      const response = await axios.get(`${apiURL}/horarios`);
      setSemanas(response.data);
    } catch (error) {
      console.log(`error: ${err}`);
    }
  };

  const getAllBrigadas = async () => {
    try {
      const response = await axios.get(`${apiURL}/brigadas`);
      setBrigadas(response.data);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };

  //Trae todas las clases de la semana seleccionada
  const getAllClases = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiURL}/horarios/${semanasSeleccionada}`
      );
      setClases(response.data.clases);
      console.log("////");
      console.log(response.data);
      console.log("////");
    } catch (err) {
      console.log(`error: ${err}`);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBrigadas();
    getSemanas();
  }, []);

  useEffect(() => {
    getAllClases();
  }, [semanasSeleccionada]);

  // useEffect(() => {
  //   crearHorarioTabla(clases);
  // }, [brigadaSeleccionada]);

  useEffect(() => {
    crearHorarioTabla(clases);
  }, [clases]);

  // const crearHorarioTabla = (clases) => {
  //   setHorarioTabla((prevHorario) => {
  //     // Crear una copia profunda de prevHorario para evitar mutaciones directas
  //     const newHorario = prevHorario.map((dia) => dia.map((clase) => clase));

  //     clases.forEach((clase) => {
  //       const { fecha, turn, tipo } = clase;

  //       // Verificar si el turno existe en newHorario, si no, inicializarlo
  //       if (!newHorario[turn - 1]) {
  //         newHorario[turn - 1] = new Array(5).fill("");
  //       }

  //       // Asignar la clase al día y turno correspondiente
  //       newHorario[turn - 1][fecha - 1] = clase;
  //     });
  //     console.log(JSON.stringify(newHorario));
  //     return newHorario;
  //   });
  // };

  const crearHorarioTabla = (clases) => {
    setHorarioTabla(() => {
      // Iniciar newHorario con una copia del horario inicial
      const newHorario = horarioInicial.map(fila => [...fila]);
  
      clases.forEach((clase) => {
        const { fecha, turn, tipo } = clase;
  
        // Asegurarse de que los índices fecha y turn estén en el rango correcto
        if (turn >= 1 && turn <= 6 && fecha >= 1 && fecha <= 5) {
          // Asignar la clase al día y turno correspondiente
          newHorario[turn - 1][fecha - 1] = clase;
        }
      });
      // alert(JSON.stringify(newHorario));
      return newHorario;
    });
  };

  //TODO
  const deleteClase = async () => {
    await axios.delete(`${apiURL}/clases/${id}`);
    getAllClases();
  };

  if (brigadas.length == 0 || semanas.length == 0)
    return (
      <div className="h-[100vh] w-full flex items-center place-content-center">
        <h2>Cargando esta vaina</h2>
      </div>
    );

  return (
    <>
      <div className="flex-col items-center place-content-center">
        <CenteredTabs
          brigadas={brigadas}
          brigadaSeleccionada={brigadaSeleccionada}
          setBrigadaSeleccionada={setBrigadaSeleccionada}
        />
        <div className="m-6 flex flex-row items-center place-content-center">
          <div className="items-center place-content-center  w-1/7">
            <TabPanel
              semanas={semanas}
              semanasSeleccionada={semanasSeleccionada}
              setSemanasSeleccionada={setSemanasSeleccionada}
            />
          </div>
          <HorarioTabla horarioTabla={horarioTabla} />
        </div>
      </div>
    </>
  );
}

Horario.propTypes = {};

export function HorarioTabla({ horarioTabla }) {
  return (
    <table className="border-collapse border table-auto md:table-fixed border-slate-500 shadow-lg ">
      <thead className="border bg-slate-800 text-white border-slate-600 ">
        <tr>
          <th>Turno</th>
          <th>Lunes</th>
          <th>Martes</th>
          <th>Miércoles</th>
          <th>Jueves</th>
          <th>Viernes</th>
        </tr>
      </thead>
      <tbody>
        {horarioTabla.map((fila, turno) => (
          <tr key={turno}>
            <td className="border p-3 m-2 border-slate-700">{turno + 1}</td>
            {fila.map((clase, fecha) => (
              <td
                className="border w-[125px] h-auto text-white border-slate-700"
                key={fecha}
              >
                <div className="w-full h-full flex items-center place-content-center">
                  <Item
                    clase={clase}
                    color={"bg-green-300"}
                    turn={turno}
                    fecha={fecha}
                  />
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
