import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import Item from "./components/item";

const apiURL = "http://127.0.0.1:8000/api";
const horarioInicial = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
// const apiURL = import.meta.env.VITE_API_URL;

export default function Horario() {
  const [clases, setClases] = useState([]);
  const [horario, setHorario] = useState(horarioInicial);
  

  const getAllClases = async () => {
    try {
      const response = await axios.get(`${apiURL}/clases`);
      setClases(response.data);
    } catch (err) {
      console.log(`error: ${err}`);
    }
  };


  useEffect(() => {
    getAllClases();
  }, []);

  useEffect(() => {
    if (clases?.length > 0) {
      setHorario((prevHorario) => {
        const newHorario = [...prevHorario];
        clases.forEach((clase) => {
          const { fecha, turn, tipo } = clase;
          if (!newHorario[turn - 1]) {
            newHorario[turn - 1] = [];
          }
          newHorario[turn - 1][fecha - 1] = clase;
        });
        return newHorario;
      });
    }
  }, [clases]);

  
  //TODO
  const deleteClase = async () => {
    await axios.delete(`${apiURL}/clases/${id}`);
    getAllClases();
  };

  // const getTotalClase = function (clase) {
  //   let clasetotal = "";
  //   return (clasetotal =
  //     clase?.asignatura?.nombre +
  //     " " +
  //     clase.tipo +
  //     " " +
  //     clase?.local?.nombre);
  // };

  if (clases.length == 0)
    return (
      <div className="h-[100vh] w-full flex items-center place-content-center">
        <h2>Cargando esta vaina</h2>
      </div>
    );

  return (
    <>
      

      <div className="m-6 flex flex-row items-center place-content-center">
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
            {horario.map((fila, turno) => (
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
      </div>
    </>
  );
}

Horario.propTypes = {};
