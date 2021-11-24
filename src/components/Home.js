import React ,{useEffect,useState}from 'react'
import Cities from "../assets/Data/cities.json"
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import HeaderImg from '../assets/images/weatherAppHeader.png'
import CloudIcon from '@mui/icons-material/Cloud';
import { useHistory } from "react-router-dom";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import moment from 'moment';
import Footer from './Footer';

const Home = () => {

    const history = useHistory();
    const [cityList,setCityList] = useState([])
    const [newCityList,setNewCityList] = useState([])

   useEffect(() => {
     
    // console.log(Cities.List)
    setCityList(Cities.List)
    for(let i=0;i< Cities.List.length;i++){

    let cityC=Cities.List[i].CityCode
    axios.get(`http://api.openweathermap.org/data/2.5/group?id=${cityC}&units=metric&appid=7a5a4430b28d2b450b463368d1bc43c6`)
    .then((res) => {
        // console.log(res);
        setNewCityList(oldArray => [...oldArray, res.data.list[0]]);
      })
      .catch((err) => {
        console.log(err);
      });
    }

   
   }, [])

   useEffect(() => {
      console.log(newCityList)
   }, [newCityList])



 function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const goTo=(cityWeather)=>{
    //   <OverViewModel cityWeather={cityWeather}/>
    history.push({
        pathname: '/overview',
        state: { city: cityWeather }
    });
  
}
     
  


    return (
        <div>
           <div className="appBody">
               </div>
         <img className="headerImg" src={HeaderImg} />
        
     <div className="appTitle"><CloudIcon className="appTitleIcon"/>Weather App</div>

<div className="searchFlex" >
    <input className="search-bar" type="text" placeholder="Enter a city"/>
    <button className="search-btn">Add City</button>
</div>
<div className='weatherCard'>
      {newCityList.map((city) => (
        <div className='weatherCardBody' key={city.id} onClick={() => goTo(city)}>
     
      
        <div className ="weatherCard-top" style={{backgroundColor:`${getRandomColor()}`}}>
        

        <div className="cardTopRight-Body">
        <div className="country">{city.name}, {city.sys.country}</div>
        <div className="dateTime">{moment().format('LT')}, {moment().format('ll').split(',',1)}</div>
        <div className="description"><LightModeOutlinedIcon className="descCard"/>{city.weather[0].description}</div>
        </div>

        <div className="cardTopLeft-Body">
       
        <div className="temp">{Math.round(city.main.temp)}&deg;C</div>
        <div className="temp_min">Temp Min: {Math.round(city.main.temp_min)}&deg;C</div>
        <div className="temp_max">Temp Max: {Math.round(city.main.temp_max)}&deg;C</div>
        </div>
        <CloseIcon className="closeIcon"></CloseIcon>
    

        </div>

        <div className ="weatherCard-bottom">
        
        <div>
        <div>Pressure:<font className="cardBottomBody">{city.main.pressure}hPa</font></div>
        <div>Humidity:<font className="cardBottomBody">{city.main.humidity}%</font></div>
        <div>Visibility: <font className="cardBottomBody">{city.visibility/1000}km</font></div>
        </div>
        <div class="vl3"></div>
        <div className="windDetails">
        <NavigationOutlinedIcon className="windIcon"/>
        <div>{city.wind.speed}m/s {city.wind.deg} Degree</div>
        </div>
        <div class="vl3"></div>
        <div>
        <div>Sunrise - <font className="cardBottomBody"> {new Date(city.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</font></div>
        <div>Sunset - <font className="cardBottomBody"> {new Date(city.sys.sunset * 1000).toLocaleTimeString('en-IN')}</font></div>
        </div>
        </div>

        </div>
        
      ))}
      </div>
<Footer/>
</div>
    
        
    )
}
export default Home;
