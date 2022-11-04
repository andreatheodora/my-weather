import { Container, Paper, Box, Button } from '@mui/material';
import Input from '@mui/material/Input'
import { useState, useEffect } from 'react';
import useFetchWeather from '../hooks/useFetchWeather';
import { useNavigate } from 'react-router-dom';
import { validateIfCityExist } from '../helper/ValidateIfCityExists';
import CityCardList from '../components/CityCardList';

const ariaLabel = { 'aria-label': 'description'};
function Home() {

  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const [notFound, setNotFound] = useState(false);

  const [fetchWeatherDataCallback, weatherData, error, isLoading] = useFetchWeather();

  let arr = [];

    let temp = JSON.parse(localStorage.getItem('searches'));
    if(temp == null) {
      console.log('searches null');
    } else {
      arr = temp;
    }

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
            justifyContent: 'space-between'
          }}>
            <Box sx={{
              width:25,
            }}/>
            <Input fullWidth placeholder="Enter city" inputProps={ariaLabel}
            onChange={
              (e)=>{
                setQuery(e.target.value);
              }
            }/>
            
      

            <Box sx={{
              width:25,
            }}/>
                <Button variant="contained"
                 onClick={async ()=>{
                  try {
                    const validationResult = await validateIfCityExist(query);
                    if (validationResult === true) {
                      setNotFound(false);
                      var searches = JSON.parse(localStorage.getItem('searches'));
                      if(searches == null) searches = [];

                      var cek = true;

                      for(let index = 0; index < searches.length; ++index) {
                        const element = searches[index];

                        if(element == query){
                          delete searches[index];
                          searches.shift();
                          cek = false;
                        } else {
                          cek = true;
                        }
                      }

                      if(cek == true){
                   //     searches.push(query);
                        var arr = [query, ...searches];
                        localStorage.setItem('searches', JSON.stringify(arr));
                      }
                      console.log(JSON.parse(localStorage.getItem('searches')));
                      localStorage.setItem('city', query);

                      navigate('/detail');
                    }       
                  } catch(e) {
                    alert('City not found');
                    console.error(e);
                  }
              }}
            
                >Go</Button>
                <Box sx={{
              width:25,
            }}/>
                <Button variant="contained"
               onClick={()=>{
                navigate('/savedCities');
              }}
                >Saved Cities</Button>
                <Box sx={{
                width:25,
                }}/>
          </Box>
          <Box>
            Recent Searches


            {arr.map((item, idx)=><li>
              <Button onClick={
                ()=>{
                  localStorage.setItem('city', item);
                  navigate('/detail');
                }
              }>
                {item}
              </Button>
              </li>)}
          </Box>
         
       </Paper>
    </Container>


   
  );
}

export default Home;
