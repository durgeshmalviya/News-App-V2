import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useState,useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import './Pages/Style.css'
import axios from 'axios';
import { CardContent } from '@mui/material';
function HideOnScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,

    window: PropTypes.func,
};

export default function HideAppBar(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };
    const [weatherData, setWeatherData] = useState(null);
    const [searchLocation, setSearchLocation] = useState('');
    const [userLocation, setUserLocation] = useState(null);
  
    const fetchUserLocation = async () => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=73e0ebd16c8baf8838b2af42e24723cb`);
              setUserLocation(response.data.name);
            } catch (error) {
              console.error('Error fetching user location:', error);
            }
          });
        } else {
          console.error('Geolocation is not available in this browser.');
        }
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };
  
    const fetchData = async (location) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=73e0ebd16c8baf8838b2af42e24723cb`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchUserLocation();
     
    }, []);
  
    useEffect(() => {
      if (userLocation) {
        fetchData(userLocation);
        
      }
    }, [userLocation]);
  
    const handleSearch = () => {
      fetchData(searchLocation);
      window.location.reload()
    };
  

    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar sx={{ background: 'black',padding:'8px'  }}>
                    <Toolbar>
                        <IconButton
                            edge='start'
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleMenu}
                            sx={{ display: 'block',  }}
                        >
                            <MenuIcon />
                        </IconButton>   
                        <Typography variant="h4" sx={{ flexGrow: 3, textAlign: 'center',      }}>
                            <Link to="/" style={{ textDecoration: 'none',      border: '2px solid pink', }}>
                                <span
                                    style={{
                                  
                                        color: 'white',
                                        padding: '',
                                        transition: 'background-color 0.3s',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent',
                                    }}

                                    onMouseOver={(e) => {
                                        e.target.style.backgroundColor = 'pink';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.backgroundColor = 'transparent';
                                    }}
                                >
                                    Head-Lines Today
                                </span>
                            </Link>
                        </Typography>
                        
       {weatherData && (
            <Link to='/Weather'>   <CardContent style={{ color:'white',display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', }}>
          
                
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    alt={weatherData.weather[0].description}
                    style={{ width: '30px', height: '30px', }}
                  />
           
               
                  <Typography variant="body2" style={{ color: '',fontSize:'12px' }}>
                    {weatherData.name && `Temperature in ${weatherData.name}`}<br/>                 
                    {weatherData.main && Math.round(weatherData.main.temp - 273.15)} &#8451; {weatherData.weather[0].description}            
         
                  </Typography>
            
      
            
            </CardContent></Link>
          )}
   
                    </Toolbar>
                    <Drawer
                        open={menuOpen}
                        onClose={closeMenu}
                        anchor="top"
                        PaperProps={{
                            sx: {
                                backgroundColor: 'black',                        
                                display: 'flex',
                                flexDirection: 'column',
                                color: 'whitesmoke',

                            },
                        }}
                    >

                        <List style={{margin:'20px 10px 40px 20px'
                        }} onClick={closeMenu}>
                            <CloseIcon onClose={closeMenu} style={{ cursor: 'pointer', fontSize: '42px',float:'right' ,padding:'10px'}} />
                            <ListItem className='card2'
                                button
                                component={RouterLink}
                                to="/"
                                onClick={closeMenu}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border:'2px dotted pink',
                                    '&:hover': {
                                        backgroundColor: 'pink',
                                        transition: 'background-color 0.3s',
                                        borderRadius: '90px 0px 90px 0px'
                                    },
                                }}
                            >
                                <ListItemText><Typography variant='h4'>Home</Typography></ListItemText>
                            </ListItem>
                            <ListItem
                            className='card1'
                                button
                                component={RouterLink}
                                to="/Usa"
                                onClick={closeMenu}
                                sx={{border:'2px dotted pink',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: 'pink',
                                        transition: 'background-color 0.3s',
                                        borderRadius: '90px 0px 90px 0px'
                                    },
                                }}
                            ><ListItemText><Typography variant='h4'>Top Headlines</Typography></ListItemText>                       
                            </ListItem>                            
                            <ListItem
                            className='card2'
                                button
                                component={RouterLink}
                                to="/WNews"
                                onClick={closeMenu}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',border:'2px dotted pink',
                                    '&:hover': {
                                        backgroundColor: 'pink',
                                        transition: 'background-color 0.3s',
                                        borderRadius: '90px 0px 90px 0px'
                                    },
                                }}
                            >
                                <ListItemText><Typography variant='h4'>Weather News</Typography></ListItemText>
                             
                            </ListItem>
                            <ListItem
                                button
                                className='card1'
                                component={RouterLink}
                                to="/Sports"
                                onClick={closeMenu}
                                sx={{border:'2px dotted pink',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: 'pink',
                                        transition: 'background-color 0.3s',
                                        borderRadius: '90px 0px 90px 0px'
                                    },
                                }}
                            >
                      <ListItemText><Typography variant='h4'><span
                     >Sports News & Score</span></Typography></ListItemText>
                            </ListItem>
                            <ListItem
                                button
                                className='card1'
                                component={RouterLink}
                                to="/India"
                                onClick={closeMenu}
                                sx={{border:'2px dotted pink',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: 'pink',
                                        transition: 'background-color 0.3s',
                                        borderRadius: '90px 0px 90px 0px'
                                    },
                                }}
                            >
                      <ListItemText><Typography variant='h4'><span
                      >India News</span></Typography></ListItemText>
                            </ListItem> <ListItem
                                button
                                className='card1'
                                component={RouterLink}
                                to="/Live"
                                onClick={closeMenu}
                                sx={{border:'2px dotted pink',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    '&:hover': {
                                        backgroundColor: 'pink',
                                        transition: 'background-color 0.3s',
                                        borderRadius: '90px 0px 90px 0px'
                                    },
                                }}
                            >
                      <ListItemText><Typography variant='h4'><span
                      >Live News</span></Typography></ListItemText>
                            </ListItem>
                        </List>
                    </Drawer>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <Container>
            </Container>
        </React.Fragment>
    );
}
