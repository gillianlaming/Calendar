
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
            if (days[d].getMonth() == currentMonth.month){
                  $('#'+this_week).append("<td class='day_this_month'><h6 class='date'>"+this_date+"</h6></td>");
            } else{
                $('#'+this_week).append("<td class='day_wrong_month'><h6 class='date'>"+this_date+"</h6></td>");
            } 
            // show dates in columns
        }
        i++;
	}
}

function getMonthName(){
    var monthNum = currentMonth.month;
    if (monthNum == 0){ return 'January';} if (monthNum == 1){ return 'February';}if (monthNum == 2){ return 'March';}if (monthNum == 3){ return 'April';}
    if (monthNum == 4){ return 'May';}if (monthNum == 5){ return 'June';}if (monthNum == 6){ return 'July';}if (monthNum == 7){ return 'August';}
    if (monthNum == 8){ return 'September';}if (monthNum == 9){ return 'October';}if (monthNum == 10){ return 'November';}if (monthNum == 11){ return 'December';}
}