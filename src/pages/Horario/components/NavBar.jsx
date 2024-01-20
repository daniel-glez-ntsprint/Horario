import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useEffect } from "react";

export default function CenteredTabs({
  brigadas,
  brigadaSeleccionada,
  setBrigadaSeleccionada,
}) {  

  const [value,setvalue]=React.useState(false)

  const handleChange = (event, newValue) => {
    setBrigadaSeleccionada(newValue)
    setvalue(newValue);


  };


  return brigadas ? (
    <Box sx={{ width: "100%", bgcolor: "background.primary" }}>
      <Tabs value={value} onChange={handleChange} centered>
        {brigadas.map((brigada) => (
          <Tab label={brigada?.nombre} value={brigada?.nombre} key={brigada?.id} />
        ))}
      </Tabs>
    </Box>
  ) : (
    <Box sx={{ width: "100%", bgcolor: "background.primary" }}>
      <Tabs value={selectedbrigada} onChange={handleChange} centered>
        <Tab label="No hay Brigadas" />
      </Tabs>
    </Box>
  );
}
