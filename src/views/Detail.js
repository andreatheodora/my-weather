import { Container, Paper, Box, Button, Grid } from '@mui/material';
import Input from '@mui/material/Input'
import { useState, useEffect } from 'react';
import useFetchWeather from '../hooks/useFetchWeather';
import { useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';

import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const ariaLabel = { 'aria-label': 'description'};

function Detail() {

  const navigate = useNavigate();

  const [inSavedCity, setInSavedCity] = useState();

  const [ fetchWeatherDataCallback, weatherData, error, isLoading] = useFetchWeather();

  const city = localStorage.getItem('city');


  let savedIndex = null;

  let savedCities = JSON.parse(localStorage.getItem('savedCities'));



  useEffect(()=>{
    fetchWeatherDataCallback(city);
  }, []);

  useEffect(()=>{
    if(savedCities == null) {
      savedCities = [];
    } else {
      for(let i=0; i < savedCities.length; i++){
        if(savedCities[i] == city) {
          setInSavedCity(true);
          savedIndex = i;
        }
      }
    }
  });

  return (
    <Container maxWidth="sm">
       <Paper elevation={3}>
          <Box
            sx={{
              height: 50,
            }}
          />
          

  <Button onClick={()=>{
              navigate('/');
            }}>
              <ArrowBackIcon></ArrowBackIcon>
            </Button>
            <span>
            {weatherData?.city}

            </span>

 
  <Button onClick={()=>{
              setInSavedCity(!inSavedCity);

              if(!inSavedCity){
                savedCities.push(weatherData?.city);
                console.log(savedCities);
              } else {
                console.log('removing index '+savedIndex);
                savedCities[savedIndex] = '';
                savedIndex = null;
              }
              localStorage.setItem('savedCities', JSON.stringify(savedCities));
            }}>
              {inSavedCity ? <BookmarkIcon/> : <BookmarkBorderIcon/>}
            </Button>

           
           
          
            
        <Typography sx={{ fontSize: 15 }}>
            {weatherData?.code}
        </Typography>

        <Typography sx={{ fontSize: 15 }}>
             Temperature
             <br></br>
            {weatherData?.temp}
        </Typography>
        <Typography sx={{ fontSize: 15 }}>
            Humidity
            <br></br>
            {weatherData?.humidity}
        </Typography>
         
       </Paper>
    </Container>


   
  );
}

export default Detail;
