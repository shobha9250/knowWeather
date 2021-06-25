

const submitbtn =document.getElementById('submitbtn');
const outputcityname = document.getElementById('city_name');
const inputcityname = document.getElementById('cityName');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');

const inner_layer =document.querySelector('.inner_layer');

const outputday=document.getElementById('day');
const outputdate=document.getElementById('date');


const getInfo = async(event) =>{
    
    //prevents refreshing
    event.preventDefault();
    let inputcityVal = inputcityname.value;
    if(inputcityVal === ''){
        outputcityname.innerText = `that's not a city`;
        inner_layer.classList.add('data_hide');
    }
    else{
         try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${inputcityVal}&units=metric&appid=mykey`;
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            
            const arrData = [data];     //array of objects
            
            outputcityname.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = arrData[0].main.temp;
            const temp_mood = arrData[0].weather[0].main;
            

            if(temp_mood === 'Clear'){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'</i>";
            } else if(temp_mood === 'Clouds'){
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'</i>";
            } else if(temp_mood === 'Rain'){
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'</i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #f1f2f6;'</i>";
            }
            inner_layer.classList.remove('data_hide');

         }catch(err) {
            inner_layer.classList.add('data_hide');
            outputcityname.innerText = `Please enter a city name`;
            
         }
    }
}

const getcurrentday = () => {
    let weekday =new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];

    outputday.innerText =`${day}`;
}

const getcurrentdate = () => {
    let month =new Array(12);
    month[0] = "JAN";
    month[1] = "FEB";
    month[2] = "MAR";
    month[3] = "APR";
    month[4] = "MAY";
    month[5] = "JUN";
    month[6] = "JUL";
    month[7] = "AUG";
    month[8] = "SEPT";
    month[9] = "OCT";
    month[10] = "NOV";
    month[11] = "DEC";

    let currentTime = new Date();

    let date= currentTime.getDate();

    let mn = month[currentTime.getMonth()];

    outputdate.innerText= `${date} ${mn} `;
}

getcurrentday();
getcurrentdate();
submitbtn.addEventListener('click',getInfo);