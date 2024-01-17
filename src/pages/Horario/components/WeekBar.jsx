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
          <Typography>{children}</Typography>
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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <Tab label="semana 1" {...a11yProps(0)} />
        <Tab label="semana 2" {...a11yProps(1)} />
        <Tab label="semana 3" {...a11yProps(2)} />
        <Tab label="semana 4" {...a11yProps(3)} />
        <Tab label="semana 5" {...a11yProps(4)} />
        <Tab label="semana 6" {...a11yProps(5)} />
        <Tab label="semana 7" {...a11yProps(6)} />
      </Tabs>
      <TabPanel className="" value={value} index={0}>
        Item One
    
          <Button>editar</Button>
          <Button variant="text" color="primary">
            eliminar
          </Button>
 
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
        <div>
          <div className="w-full">
            <button className="w-full">editar</button>
          </div>
          <div className="w-full">
            <button>eliminar</button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
        <div>
          <div className="text-black flex items-center place-content-center">
            <IconButton aria-label="">
              <HiOutlinePlusCircle className="" />
            </IconButton>
          </div>
          <button className="bg-blue-700">eliminar</button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
