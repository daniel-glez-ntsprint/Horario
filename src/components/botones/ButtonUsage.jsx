
import Button from '@mui/material/Button';
import { useState } from 'react';
import PropTypes from 'prop-types';


  ButtonUsage.propTypes = {
    value: PropTypes.number.isRequired
  };
  

export default function ButtonUsage({ value })
{



  const [counter, setCounter] = useState(0);

  const handleAdd = () => {

    setCounter(counter + 1);
  };

  
  const handleSubtract = () => {

    setCounter(counter - 1);
  };

  const handleReset = () => {
    setCounter(value);
  };


  return (
    <>
      <h2>{counter}</h2>

      <Button onClick={handleSubtract} variant="contained">-1</Button>
      
      <Button onClick={handleReset} variant="contained">Hello world</Button>
 
      <Button onClick={handleAdd} variant="contained">+1</Button>
    </>
  );
}

