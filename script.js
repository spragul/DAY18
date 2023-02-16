async function api(){

    let a = fetch("https://restcountries.com/v3.1/all")
     let response = await a;
     let result = response.json();
     let output = await result
    // console.log(output);
     let parent_continar = document.querySelector('.continar')
     
     for(let i of output){
         let card_data = document.createElement('div')
         card_data.classList.add('card')
        //  card_data.style.display='inline-block';
         //countery name  
         let named=document.createElement('div')
         named.classList.add('card-header')
         card_data.append(named)
              //title  id="title" and class="text-center
         const title = document.createElement('h5')
         title.classList.add('text-center')
         title.setAttribute('id','title')
         title.innerText = i.name.common;
         named.append(title)
         const cb =document.createElement('div')
         cb.classList.add('card-body')
         card_data.append(cb)
         //flag
         const img = document.createElement('img')
         img.classList.add('card-img-top','card-text')
         img.setAttribute('src',`${i.flags.png}`)
         cb.append(img)
         //capital
         const capital= document.createElement('p')
         capital.classList.add('capital','card-text')
         capital.innerText = `Capital:${i.capital}`;
         cb.append(capital)
         
         //li-region
         const region = document.createElement('p')
         region .classList.add('Region','card-text')
         region .innerText = `Region:${i.region}`;
         cb.append( region )
         //li-country_code
         const country_code=document.createElement('p')
         country_code.classList.add('country_code','card-text')
         country_code.innerText = `Country Code:${i.cca3}`;
         cb.append(country_code)

         let latlang = i.latlng;
         let lat = latlang[0];
         let lang = latlang[1];
        // console.log(lat,lang);

         //weather
         const h=document.createElement('div')
         h.classList.add('btn_div')
         cb.append(h)

         const btn = document.createElement('button')
         btn.setAttribute('onclick','weatherapi(this)')
         btn.classList.add('btn','btn-primary')
         btn.setAttribute('value',`${latlang}`)
         btn.innerText="click for weather"
         h.append(btn)

         parent_continar.append(card_data)         
     }
}
api()
//Kelvin = Celsius + 273.15  Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
//Celsius = Kelvin -  273.15

//Humidity, %
async function weatherapii(lat,lon){
    let weather=fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=622171718f0fbdaf90613e242bece694`)
    let req = await weather;
    let reselt1 = req.json();
    let out = await reselt1;
   console.log(out);
   // console.log("weather",out.weather[0].main)
    let kelvin = out.main.temp;
    let celsius = kelvin - 273.15;

   // console.log("tempratur:"+celsius+"C|F")
    let  date=out.dt
   // console.log("date"+date);

var date1 = new Date(date * 1000);
//console.log(date1);

    let wind=out.wind.speed;
  //  console.log("wind:",wind+"km/hr");
    let humidity = out.main.humidity;
  //  console.log("humidity:"+humidity+"%");
    let pressure = out.main.pressure;
   // console.log("pressure:",pressure)
    let w = out.weather[0].main
    let wd = out.weather[0].description;
    let popup = document.getElementById('popup')
    popup.classList.add('open-popup');
    popup.innerHTML=`
    <p>Date:${date1}</p>
    <p>weather:${w}</p>
    <p>weather-description:${wd}</p>
    <p>tempratur:${celsius.toFixed(2)}C|F</p>
    <p>wind:${wind}km/h</p>
    <p>humidity:${humidity}%</p>
    <p>pressure:${pressure}hPa</p>
    <button type="button" class="popbutton" onclick="closepopup(this)">ok</button>
    `
   


}
function weatherapi(e){
 //console.log('key press',e.value)
 let latlong=e.value.split(',')
 let lat=latlong[0];
 let lang=latlong[1];
 weatherapii(lat,lang)
}

function closepopup(e){
    popup = document.getElementById('popup')
    popup.classList.remove('open-popup')
}