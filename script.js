// Display current day in header
$("#currentDay").text(moment().format("dddd[,] MMMM Do"));
// console.log(moment().format("h a"));

// Initialization
var businessHoursList = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
var agendaList = JSON.parse(localStorage.getItem("day-planner"));
// If there is no data
if (!agendaList) {
    // agendaList is empty
    agendaList = ["", "", "", "", "", "", "", "", ""];
}
// console.log(agendaList);

// Display
// For each hour
$.each(businessHoursList, function(index, businessHour) {
    // Create a row
    var hourRowEl = $('<li class="row">');
    // Build the row
        // Add an hour
        var timeBlockEl = $('<div class="hour col-1">');
        timeBlockEl.text(businessHour);
        hourRowEl.append(timeBlockEl);

        // Add a text area
        var textAreaEl = $('<textarea class="col-10">');
        // Assign past, present or future class based on the time
            // Current hour in 24hr format
            var hourNow = parseInt(moment().format("H"));
            // console.log(hourNow);
            // Hour of this row in 24hr format
            var rowHour = index + 9;
            // console.log(rowHour);
            if (hourNow > rowHour) {
                textAreaEl.addClass("past");
            }
            else if (hourNow < rowHour) {
                textAreaEl.addClass("future");
            }
            else {
                textAreaEl.addClass("present");
            }
        textAreaEl.text(agendaList[index]);
        hourRowEl.append(textAreaEl);
        
        // Add a save button
        var saveButtonEl = $('<button class="saveBtn col-1" index-value="' + index + '">');
        saveButtonEl.html('<i class="fas fa-save"></i>');
        hourRowEl.append(saveButtonEl);
    // Place the row
    $(".time-block").append(hourRowEl);
});


// User interation
// When a save button is clicked
$(".saveBtn").click(function() {
    // Get the index value of the button
    var indexValue = $(this).attr("index-value");
    // console.log(indexValue);
    // Get the agenda from the textarea
    var agenda = $(this).prev().val();
    // console.log(agenda);
    agendaList[indexValue] = agenda;
    localStorage.setItem("day-planner", JSON.stringify(agendaList));
});