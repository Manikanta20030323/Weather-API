// const API_KEY = "793f153dc09a29ba9aff3fdf8a199000";

// async function getWeatherApi()
// {
//     let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${API_KEY}`);

//     data= await data.json();

//     const new_para=document.createElement('p');
//     new_para.textContent=`${data?.main?.temp.toFixed(2)} *C`;

//     document.body.appendChild(new_para);
//     console.log(data);
//     console.log("hi mani");
// }

// getWeatherApi();

const userTab=document.querySelector("[data-userWeather]");
const cityTab=document.querySelector("[data-searchWeather]");
const searchForm=document.querySelector("[search-form]");
const grantButton=document.querySelector("[data-grantAccess]");
const loading=document.querySelector(".loading-container");
const city_name=document.querySelector("[data-cityName]");
const weatherDesc=document.querySelector("[data-weatherDesc]");
const weatherTemp=document.querySelector("[data-weatherTemp]");
const windspeed=document.querySelector("[data-windspeed]");
const humididty=document.querySelector("[data-humididty]");
const cloud=document.querySelector("[data-cloud]");
const countryFlag=document.querySelector("[data-countryIcon]");
const weatherIcon=document.querySelector("[data-weatherIcon]");
const Search=document.querySelector("[search-input]");
const button_search=document.querySelector("[search-button]");
const cityNotFound=document.querySelector("[cityNotFound]");
const GrantLocation=document.querySelector("[GrantLocation]");
const weather_info=document.querySelector(".weather-info");

loading.style.display='none';
let latitude;
let longitude;

let API_KEY="793f153dc09a29ba9aff3fdf8a199000";
//initial assign
let currTab=userTab;
currTab.classList.add('curr-Tab');

function initial_state()
{
    console.log("hi ima in initial state")
    GrantLocation.classList.add('active');
    searchForm.classList.add('inactive');
    cityNotFound.classList.add("inactive");
    weather_info.classList.add("inactive");
    loading.classList.add('inactive');
}

function make_Active(element)
{
    element.classList.add('active');

}
function make_inactive(element)
{
    element.classList.add('inactive');
}
function remove_inactive(element)
{
    element.classList.remove('inactive');
}
initial_state();
function handleCityTab(){
    console.log("hi mani")
    searchForm.classList.add('search-city-active');

}
cityTab.addEventListener('click',handleCityTab);


//fucntion for switching b/w userTab and searchtab
function switchTabstoUser(){

    if(currTab!=userTab)
    {
       currTab.classList.remove('curr-Tab');
        currTab=userTab;
        currTab.classList.add('curr-Tab');

        if(!GrantLocation.classList.contains('inactive'))
        {
            make_inactive(GrantLocation);
            remove_inactive(weather_info);
            make_inactive(cityNotFound);
            
        }
        else{
            remove_inactive(weather_info);
            make_inactive(cityNotFound);
            make_inactive(searchForm);
            //call info
            getLocation();
        }
        
    }
    

}
function switchTabstoCity(){

    if(currTab!=cityTab)
    {
        currTab.classList.remove('curr-Tab');
        currTab=cityTab;
        currTab.classList.add('curr-Tab');
        make_inactive(GrantLocation);
        make_inactive(weather_info);
        remove_inactive(searchForm);
        make_inactive(cityNotFound);
        
    }
    else{
        make_inactive(cityNotFound);
        make_inactive(weather_info);
        remove_inactive(searchForm)
    }
    

}

userTab.addEventListener('click',switchTabstoUser);
cityTab.addEventListener('click',switchTabstoCity);



//fun get geo location cordinates
function getLocation(){
   
   if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(success,error);
        
    } 
    else{
        alert("Geo location is not supported by this browser");
    }
}

function success(position)
{
    remove_inactive(loading);
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    console.log(`latitude is ${latitude} and longitude is ${longitude}`);
    fetch_weather_long_and_lat(latitude,longitude);

        
}
function error(error)
{
    switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }

}

grantButton.addEventListener('click', getLocation);
function display_weather_info(data)
{
     city_name.textContent= data?.name;
     weatherDesc.textContent=data?.weather?.[0].description;
     weatherTemp.textContent=`${data?.main?.temp.toFixed(2) } °C`;
     windspeed.textContent=`${data?.wind?.speed}m/s`;
     humididty.textContent=`${data?.main?.humidity}%`;
     cloud.textContent=`${data?.clouds?.all}%`;
    
    countryFlag.src=`https://flagsapi.com/${data?.sys?.country}/flat/64.png`;
   
    weatherIcon.src=`https://openweathermap.org/img/wn/${data?.weather?.[0].icon}@2x.png`;
    make_inactive(loading);
    make_inactive(GrantLocation);
    remove_inactive(weather_info);

}

async function fetch_weather_long_and_lat(lat,lon)
{
    
    let data =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    data= await data.json();

    console.log(data);
    
   
    display_weather_info(data);
    
}

async function fetch_weather_using_city(city_name)
{
    try{
        let data =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`);
        data= await data.json();

    console.log(data);
    loading.style.display='none';
    console.log("cod is ",data?.cod)

    if(data?.cod===200)
    {
        make_inactive(searchForm);
        display_weather_info(data);
    }
    else{
        make_inactive(searchForm);
        remove_inactive(cityNotFound);
        //city not found will display
        // cityNotFound.
    }
   
    
    }
    catch(e){
        console.log(e);
    }
    
    
}
function handleSearch(Event)
{
    
         Event.preventDefault();
         console.log('Form submission prevented!');
 
   
    let city=Search.value;
    console.log("city name ", city);
    fetch_weather_using_city(city);

}
searchForm.addEventListener('submit',handleSearch);