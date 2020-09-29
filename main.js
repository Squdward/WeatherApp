function generateWeather(lat, lon) {
    let overflow = document.querySelector(".overvlow");
    let sity = document.querySelector(".Weather__location")
    let temp = document.querySelector(".Weather_temp")
    let week = document.querySelectorAll(".weather__day")
    let icon = document.querySelector(".Weather_icon")

   

    function hidePopup(popup) {
        popup.classList.add("hide")
        popup.addEventListener("animationend", ()=>{
            popup.remove()
        })
    }
    hidePopup(overflow)

    function currentTemp(currsity,currtemp, iconSet) {
        sity.innerHTML = currsity
        temp.innerHTML = Math.floor(currtemp) + "&#176;"
        console.log(icon)
        switch(iconSet) {
            case "Clouds":
                icon.innerHTML = "<i class=\"fas fa-cloud\"></i>";
            break;
            case "Rain":
                icon.innerHTML = "<i class=\"fas fa-cloud-rain\"></i>";
            break;
            case "Clear":
                icon.innerHTML = "<i class=\"fas fa-sun\"></i>";
            break;
        }

    }
    function weekTemp(htmlWeek, jsonWeek) {
        
       
        let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

        for(let i = 1; i <jsonWeek.length; i++) {

            let date = new Date(jsonWeek[i].dt * 1000)
            let icon;

            htmlWeek[i].innerHTML = days[date.getDay()]
         

            htmlWeek[i].insertAdjacentHTML("beforeend", "<span class=\"week__temp\"> " + Math.floor(jsonWeek[i].temp.day) + "</span>" )

            
            switch(jsonWeek[i].weather[0].main){
                case "Clouds":
                    icon = "<i class=\"fas fa-cloud\"></i>";
                break;
                case "Rain":
                    icon = "<i class=\"fas fa-cloud-rain\"></i>";
                break;
                case "Clear":
                    icon = "<i class=\"fas fa-sun\"></i>";
                break;
            }
            htmlWeek[i].insertAdjacentHTML("beforeend", icon)

        }
    }
    async function Weather() {

        let weatherAPI = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=metric&lang=ru&exclude=minutely&appid=1d1cb87977776e3395944924d5876008')
    


        if(weatherAPI.status == 200) { 
            let obj = await weatherAPI.json();

            currentTemp(obj.timezone,obj.current.temp, obj.current.weather[0].main)
 
            weekTemp(week, obj.daily)

        }

        return weatherAPI

    };
    Weather()
    setInterval(Weather, 120000);


}

function letmeknowyoulocation() {
    let locationBtn = document.querySelector("#myLocation")
    let locationInp = document.querySelector(".myLocationInp")

    let lat;
    let lon;

    locationBtn.addEventListener("click", async function() {
         if(navigator.geolocation) {
            let options = {
                enableHighAccuracy: true,
                timeout: 100,
                maximumAge: 10000
              };

             let promise = new Promise(function(resolve,reject) {
                navigator.geolocation.getCurrentPosition(function(pos){
                    lat = pos.coords.latitude;
                    lon = pos.coords.longitude;
                    let obj = {
                        lat,
                        lon,
                    }
                    resolve(obj);   
                })
             },undefined, options).then(
                 (obj) =>{
                    generateWeather(obj.lat,obj.lon)
                 }
             )
        }

    })

}

function setStyle() {
    let time = new Date()
    let container = document.querySelector(".Container");

    if(time.getHours() >= 18 && time.getHours() <= 21) {
        container.classList.add("evning")
    }
    else if(time.getHours() >= 6 && time.getHours() <= 18) {
            container.classList.add("day")
    }
    else if( time.getHours() >= 22 || time.getHours() <= 6) {
            container.classList.add("moon")
    }
}

setStyle()

letmeknowyoulocation()
