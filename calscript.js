
function updateCalendar(){
    $('.week').empty();
	var weeks = currentMonth.getWeeks();
    let i = 1;
	for(var w in weeks){
		var days = weeks[w].getDates();
		// days contains normal JavaScript Date objects.
		let this_week = "week" + i;
		for(var d in days){
            let this_date = days[d].getDate();

            let formatted_date = days[d].getFullYear() + "-" + (days[d].getMonth() + 1) + "-" + this_date;

            if (days[d].getMonth() == currentMonth.month){
                $('#'+this_week).append("<td class='day_this_month' id="+formatted_date+"><h6 class='date'>"+this_date+"</h6><img src='plus.png' id='plus' onclick='addEvent(this)'></td>");
            } else{
                $('#'+this_week).append("<td class='day_wrong_month' id="+formatted_date+"><h6 class='date'>"+this_date+"</h6></td>");
            } 
            // show dates in columns, id is the date
        }
        i++;
    }
    displayEvents();
    // addListeners(document.getElementsByClassName("day_this_month"));
}

function getMonthName(){
    var monthNum = currentMonth.month;
    if (monthNum == 0){ return 'January';} if (monthNum == 1){ return 'February';}if (monthNum == 2){ return 'March';}if (monthNum == 3){ return 'April';}
    if (monthNum == 4){ return 'May';}if (monthNum == 5){ return 'June';}if (monthNum == 6){ return 'July';}if (monthNum == 7){ return 'August';}
    if (monthNum == 8){ return 'September';}if (monthNum == 9){ return 'October';}if (monthNum == 10){ return 'November';}if (monthNum == 11){ return 'December';}
}

// function addListeners(days){
//     for (var i=0; i<days.length; i++){
//         days[i].addEventListener('click', addEvent, false);
//     }
// }


function addEvent(day) { 
    let this_date = day.parentNode.id;
    $('#popUpHeader').html('<br><h3>add an event on '+this_date+'</h3>');
    $('#start_date').val(this_date+" 0:00:00");
    $('#end_date').val(this_date +" 0:00:00");
    $('#popUp').dialog();
    $('#calendar').css('opacity', '.75');
    $('#popUp').on('dialogclose', function(event) {
        $('#calendar').css('opacity', '1');
    });
}


function displayEvents(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://ec2-18-223-135-67.us-east-2.compute.amazonaws.com/getEvents.php", true);
    
    // on load
    xmlHttp.addEventListener('load', function(e){
       if (xmlHttp.status == 200){
            let response = xmlHttp.responseText; // get json
            let parsed = JSON.parse(response); // parse json

            for (var i =0; i<parsed.length; i++){
                let date = parsed[i].start_date.split(" ")[0];
                let time = parsed[i].start_date.split(" ")[1];
                let loc = parsed[i].location;
                let day = date.substring(8);
                
                if (day[0] == 0){
                    day = day.substring(1);
                    date = date.substring(0,7)+"-"+day;
                }

                if (time[0] == 0)
                    time = time.substring(1);
                
                $('#'+date).append("<h6 class='time' id='"+time+"'>"+time+"</h6><p class='event_name' id='"+parsed[i].event_name+"' onclick='editEvent(this)'>"+parsed[i].event_name+"<i id='"+loc+"'> at "+loc+"</i></p>");
                $('#'+date+" h6").first().css({"margin-bottom": "-40px"});
                $('#'+date+" img").first().css({"margin-bottom": "-20px","top": "0px"});
            }
       }
       else {
           $('#calendar').html("<p>Something went wrong. Try again!</p>");
       }
    }, false);

    xmlHttp.send(null);
}


function editEvent(event){
    this_date = event.parentNode.id;
    this_name = event.id;
    this_time = event.parentNode.childNodes[2].id;
    this_loc = event.parentNode.childNodes[3].childNodes[1].id;
    $('#popUpHeader').html('<br><h3>edit event on '+this_date+'</h3>');
    $('#event_name').val(this_name);
    $('#start_date').val(this_date+" "+this_time);
    $('#end_date').val(this_date +" 23:00:00");
    $('#location').val(this_loc);
    $('#submit').val('Save Event');
    $('#popUp').dialog();
    $('#calendar').css('opacity', '.75');
    $('#popUp').on('dialogclose', function(event) {
        $('#calendar').css('opacity', '1');
    });
}