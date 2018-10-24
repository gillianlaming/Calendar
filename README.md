# README #

#GROUP MEMBERS:

* Gillian Laming (ID: 457507)
* Leela Ghaemmaghami (ID: 457569)

link our calendar: http://ec2-18-223-135-67.us-east-2.compute.amazonaws.com/calendar.html

##HOW TO USE:
* when the page loads, you will see an empty calendar
* to interact with the calendar, login or register with the buttons at the top right
* after succesfully logging in, all of your events are displayed
    - you can add events by clicking the plus sign
    - you can edit or delete your events by clicking on the event name
* when you make changes, the calendar automatically updates
* click the logout button to logout

##CREATIVE PORTION:
* users can color code events (they choose one of five colors: black, coquelicot, glaucous, wenge, or amaranth)
* 'color view' shows all of user's events organized by color
* when events are added, the event name is displayed in their assigned color

##TO DOs:

7. we need to pass tokens to prevent CSRF attacks ("Hint: You will need to send your CSRF tokens in your AJAX requests. Remember that AJAX still submits forms and runs server-side scripts, just like the vanilla forms you've been using in Modules 2 and 3.")
    - CSRF tokens are passed when editing or removing events (3 points)
    - gillian is going to do this

9. are we safe? "Safe from XSS attacks; that is, all content is escaped on output (3 points)" -???

11. the fuck? "Session cookie is HTTP-Only (3 points)" --pretty sure this is okay 