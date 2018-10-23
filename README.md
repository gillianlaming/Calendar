# README #

##starting to write what we will turn in

GROUP MEMBERS:

Gillian Laming (ID: 457507)
Leela Ghaemmaghami (ID: 457569)

link to calendar home page: 

CREATIVE PORTION DESCRIPTION:

#our thotszsz

creative portion:
    - when username exists, give user suggestions of usernames similar to current username that doesnt exist
    - color code events based on which user's event it is
        - "choose color" option in register form, we could add this to the mySQL table
    - month view, week view, day view (I don't know how hard this would be because you did the view part)
    - repeating events

TO DOs:

1. "without ever refreshing the browser after the initial web page load" does this mean logout is super fucked? (no, i dont think so because wording later on is "At no time should the main page need to be reloaded")

2. "Unregistered users should see no events on the calendar." NO (SAD!!)

4. Your AJAX should not ask the server for events from a certain username. Instead, your AJAX should ask the server for events, and the server should respond with the events for only the currently-logged-in user (from the session). Can you think of why? ARE WE DOING THIS

5. we need to run everything by a validator - in process

7. we need to pass tokens to prevent CSRF attacks ("Hint: You will need to send your CSRF tokens in your AJAX requests. Remember that AJAX still submits forms and runs server-side scripts, just like the vanilla forms you've been using in Modules 2 and 3.")
- CSRF tokens are passed when editing or removing events (3 points)

8. we need to make sure that the link we put in the readme corresponds with the link to the instance in the code (!!!)

9. are we safe? "Safe from XSS attacks; that is, all content is escaped on output (3 points)"

10. im 99% sure we use queries "Use prepared queries to prevent SQL Injection attacks."

11. the fuck? "Session cookie is HTTP-Only (3 points)"

Validator:

- newUser.php PASS
- getEvents.php PASS
- newEvents.php PASS
- editEvent.php PASS
- deleteEvent.php PASS
- checkUser.php PASS
- calscript.js 
- calendar.min.js MAJOR ISSUES
- calendar.html 
- calendar.css PASS
- calendar_database.php GETTING WEIRD THINGS, BUT I THINK THIS IS BECAUSE IT JUST CONNECTS TO THE MYSQL

