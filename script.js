//display the date//

$(document).ready(function () {
    $("#currentDay").text(dayjs().format('dddd, MMMM D'));

    //update time block colors, according to the hour//

    function updateColors() {
        dayjs.locale('en');
        var currentHour = dayjs().hour();
        console.log(dayjs().toString())
     
        $(".time-block").each(function () {
            let blockHour = parseInt($(this).attr("id").split("-")[1]);
          
            if (blockHour >= 1 && blockHour <= 5) blockHour += 12;

            if (blockHour < currentHour) {
                console.log("blockHour: "+blockHour+"currentHour: "+currentHour)
                $(this).removeClass("present future").addClass("past");
            } else if (blockHour === currentHour) {
                $(this).removeClass("past future").addClass("present");
            } else {
                $(this).removeClass("past present").addClass("future");
            }
        });
    } 
//call the function updateColors()

    updateColors();

    //set up an interval for the function updateColor every 6 second//

    setInterval(updateColors, 6000);

    //retrieve data from local storage and display text in time block//

    $(".time-block").each(function () {
        let id = $(this).attr("id");
        let saveEvent = localStorage.getItem(id);
        if (saveEvent) {
            $(this).find(".description").val(saveEvent);
        }
    });

    //add the saving function to the button//

    $(".saveBtn").on("click", function () {
        let timeBlock = $(this).parent();
        let id = timeBlock.attr("id");
        let eventText = timeBlock.find(".description").val();
        localStorage.setItem(id, eventText);
    });


    //save the text to the local storage//
    
    $(".fa-save").on("click", function (){
        let timeBlock = $(this).parent().parent();
        let id = timeBlock.attr("id");
        let eventText = timeBlock.find(".description").val();
        localStorage.setItem(id, eventText);
    })
});
