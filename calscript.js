
function updateCalendar(){
    $('.week').empty();
	var weeks = currentMonth.getWeeks();
    let i = 1;
	for(var w in weeks){
		var days = weeks[w].getDates();
		// days contains normal JavaScript Date objects.
		let this_week = "week" + i;
		for(var d in days){
            // show dates in columns
            $('#'+this_week).append("<td>"+days[d]+"</td>");
        }
        i++;
	}
}
