var currentDay = $("#currentDay");
var timeBlockEl = $(".time-block");
var descriptionEl = $(".description");



function checkTime() {
    var today = moment().format("ha, dddd, MMMM Do");
    currentDay.text(today);
    timeBlockEl.map(item => {
        const timeConvert = moment(timeBlockEl[item].children[0].innerText, "ha").format('HH:mm');
        var difference = Number(moment().format('HH:mm').substring(0, 2)) - Number(timeConvert.substring(0, 2));
        if (difference > 0) {
            timeBlockEl[item].children[1].style.setProperty("background", "grey")
        } else if (difference === 0) {
            timeBlockEl[item].children[1].style.setProperty("background", "red")
        } else {
            timeBlockEl[item].children[1].style.setProperty("background", "yellow")
        }
    })
}

function printDescription() {
    descriptionEl.text("Appointment added to local storage");
    setInterval(function () {
        descriptionEl.text("")
    }, 3000);
}

function getInputValue(event) {
    var btnClicked = $(event.target);
    const currentHour = btnClicked.siblings("div").data("hour");
    const currentInput = btnClicked.siblings("textarea").val();
    localStorage.setItem(currentHour, currentInput);
    printDescription();
}

function printEvents() {
    timeBlockEl.map(item => {
        var event = localStorage.getItem(timeBlockEl[item].innerText);
        timeBlockEl[item].children[1].innerText = event;
    })
}


setInterval(checkTime, 1000)
timeBlockEl.on("click", ".saveBtn", getInputValue)
printEvents();
