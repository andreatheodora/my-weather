import { Container, Paper, Box, Button } from '@mui/material';
import Input from '@mui/material/Input'
import { useEffect, useState } from 'react';
import useFetchWeather from '../hooks/useFetchWeather';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const ariaLabel = { 'aria-label': 'description'};
function SavedCities() {

  const navigate = useNavigate();

  const [state, setState] = useState();

  let savedCities = JSON.parse(localStorage.getItem('savedCities'));
  let arr = [];
  
  if(savedCities == null) {
    arr = [];
  } else {
    arr = savedCities;
  }

  console.log(arr);

  return (
   
    <Container maxWidth="sm">
       <Paper elevation={3}>
          <Box
            sx={{
              height: 50,
            }}
          />

<Box sx={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            

            <Button onClick={()=>{
              navigate('/');
            }}>
              <ArrowBackIcon></ArrowBackIcon>
            </Button>

            <h1>Saved Cities</h1>


            
          
               
                
</Box>

{arr.map((item, idx)=>{
  if(item != '') {
    return <li><Button
    onClick={()=>{
      localStorage.setItem('city', item);
      navigate('/detail');
    }}
    
    >{item}
      </Button>
      <Button onClick={()=>{
              for(let i=0; i < savedCities.length; i++){
                if(savedCities[i] == item) {
                  savedCities[i] = '';
                }
              } 
              localStorage.setItem('savedCities', JSON.stringify(savedCities));
              setState('');
      }}>
      <DeleteIcon/>
      </Button>
      </li>
  }
}
            )}
         
       </Paper>
    </Container>


   
  );
}

export default SavedCities;
