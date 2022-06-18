//get dom element by using jquery
var currentDay = $("#currentDay");
var timeBlockEl = $(".time-block");
var descriptionEl = $(".description");

//compare with current time
function checkTime() {
    var today = moment().format("h:mma, dddd, MMMM Do");
    //display the current time
    currentDay.text(today);
    timeBlockEl.map(item => {
        const timeConvert = moment(timeBlockEl[item].children[0].innerText, "ha").format('HH:mm');
        var difference = Number(moment().format('HH:mm').substring(0, 2)) - Number(timeConvert.substring(0, 2));
        if (difference > 0) {
            timeBlockEl[item].children[1].setAttribute("class", "col-lg-10 past")
        } else if (difference === 0) {
            timeBlockEl[item].children[1].setAttribute("class", "col-lg-10 present")
        } else {
            timeBlockEl[item].children[1].setAttribute("class", "col-lg-10 future")
        }
    })
}
//show description
function printDescription() {
    descriptionEl.css("display","block")
    setInterval(function () {
        descriptionEl.css("display","none")
    }, 3000);
}
//get and store input value
function getInputValue(event) {
    var btnClicked = $(event.target);
    const currentHour = btnClicked.siblings("div").data("hour");
    const currentInput = btnClicked.siblings("textarea").val();
    localStorage.setItem(currentHour, currentInput);
    printDescription();
}
//print the vaule which store in the local storage
function printEvents() {
    timeBlockEl.map(item => {
        var event = localStorage.getItem(timeBlockEl[item].innerText);
        timeBlockEl[item].children[1].innerText = event;
    })
}
//keep updating the time
setInterval(checkTime, 1000)
//add event to save button
timeBlockEl.on("click", ".saveBtn", getInputValue)
//call function to print the events when refresh
printEvents();
