

const submitbtn =document.getElementById('submitbtn');
const outputday=document.getElementById('day');
const outputdate=document.getElementById('date');

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
