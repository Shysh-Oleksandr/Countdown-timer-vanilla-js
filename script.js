var newEvent = "31 Oct 2022";

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

function countdown(newEvent) {
    const newEventDate = new Date(newEvent);
    const currentDate = new Date();
    const startTime = new Date(newEventDate - currentDate);

    const totalSeconds = Math.floor(startTime / 1000);
    
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);

    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);
}

function changeCountdown(newEvent) {
    const newEventDate = new Date(newEvent);
    const currentDate = new Date();
    const startTime = new Date(newEventDate - currentDate);

    const totalSeconds = Math.floor(startTime / 1000);
    
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor((totalSeconds / 3600) % 24);
    const minutes = Math.floor((totalSeconds / 60) % 60);
    const seconds = Math.floor(totalSeconds % 60);

    const countdownContainer = document.getElementsByClassName("countdown__container")[0];

    countdownContainer.classList.remove("fade"); // removing the class
    
    setTimeout(() => {
    requestAnimationFrame(() => {
        // We are manually adding new content and adding class again to node
        daysEl.innerHTML = formatTime(days);
        hoursEl.innerHTML = formatTime(hours);
        minutesEl.innerHTML = formatTime(minutes);
        secondsEl.innerHTML = formatTime(seconds);
        countdownContainer.classList.add("fade");
        
    });
    }, 225); // timeout
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

const navigationLinks = document.getElementById("nav").getElementsByTagName("a");
var title = document.getElementById("title");

for (let index = 0; index < navigationLinks.length; index++) {
    const element = navigationLinks[index];

    element.addEventListener("click", function(event) {
		event.preventDefault();

        if(!element.parentElement.classList.contains('active')) {
            // Adding class active to clicked link.
            for (let index = 0; index < navigationLinks.length; index++) {
                const el = navigationLinks[index];
                el.parentElement.classList.remove("active");
            }
            element.parentElement.classList.add("active");
            
            // Changing site title to link's label.
            title.classList.remove("fade"); // removing the class
            setTimeout(() => {
                requestAnimationFrame(() => {
                    // We are manually adding new content and adding class again to node
                    title.innerHTML = element.innerHTML;
                    title.classList.add("fade");
                });
            }, 225); // timeout
            // Changing background image.
            document.body.style.backgroundImage = `url('${element.getAttribute("data-image")}')`;
            // Changing countdown timer. 
            newEvent = element.getAttribute("data-date");
            let newEventDate = new Date(newEvent);
            let currentDate = new Date();
            // While there's old date, increasing year.
            while(newEventDate < currentDate){
                let eventYear = newEvent.split(" ")[2];
                eventYear++;
                newEventArray = newEvent.split(" ");
                newEventArray[2] = eventYear;
                newEvent = newEventArray.join(" ");
                newEventDate = new Date(newEvent);
                element.setAttribute("data-date", newEvent);
            }
            
            // Setting coundown timer for new date.
            clearInterval(nIntervId);
            changeCountdown(newEvent);
            nIntervId = setInterval(countdown, 1000, newEvent);
        }
    });
}


changeCountdown(newEvent);

var nIntervId = setInterval(countdown, 1000, newEvent);