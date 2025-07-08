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
loading.style.display='none';
let latitude;
let longitude;

let API_KEY="793f153dc09a29ba9aff3fdf8a199000";
//initial assign
let currTab=userTab;
currTab.classList.add('curr-Tab');


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
        
    }
    

}
function switchTabstoCity(){

    if(currTab!=cityTab)
    {
        currTab.classList.remove('curr-Tab');
        currTab=cityTab;
        currTab.classList.add('curr-Tab');
        
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
    loading.style.display='block';
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


async function fetch_weather_long_and_lat(lat,lon)
{
    let data =await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    data= await data.json();

    console.log(data);
    loading.style.display='none';
    // city_name.textContent= data?.name;
    
}