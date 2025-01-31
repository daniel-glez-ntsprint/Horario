import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { HiOutlinePlusCircle } from "react-icons/hi";
import Button from "@mui/material/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}> 
          <Typography>{children} hola</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({ semanas,semanasSeleccionada,setSemanasSeleccionada}) {
  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setSemanasSeleccionada(newValue)
    setValue(newValue);
  };
console.log(semanasSeleccionada)

  return (
    
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.black",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
      {semanas.map((semana)=>(
        <Tab label= { semana?.semana } value={ semana?.semana }  key={semana?.id} {...a11yProps(0)} />
     ))}
      </Tabs>
     
    </Box>
  );
}
