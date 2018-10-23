# README #

CALENDAR TO-DO LIST:
## ok final thots before i schlep ##

1. fuck event listeners but we have to use them so let's remove all 'onclick' things --LETS NOT BOTHER, RUBRIC SAYS NOTHING ABOUT THIS

2. make sure the right alerts come up when logging in/registering incorrectly -- DONE

3. logout probably shouldnt just be refreshing but idk -- CHANGED. IT LOOKS BETTER NOW.

4. creative portion
    - when username exists, give user suggestions of usernames similar to current username that doesnt exist
    - color code events based on which user's event it is
        - "choose color" option in register form, we could add this to the mySQL table
    - month view, week view, day view (I don't know how hard this would be because you did the view part)
    - repeating events

6. Gillian started working on tokens, unclear where she left off. Do we need to send these tokens?

TO DOs:

1. "without ever refreshing the browser after the initial web page load" does this mean logout is super fucked? (no, i dont think so because wording later on is "At no time should the main page need to be reloaded")

2. "Unregistered users should see no events on the calendar." does this happen

3. You do not need to support recurring events -- this prolly means doing this is hard so lets not add this to our creative portion

4. Your AJAX should not ask the server for events from a certain username. Instead, your AJAX should ask the server for events, and the server should respond with the events for only the currently-logged-in user (from the session). Can you think of why? ARE WE DOING THIS

5. we need to run everything by a validator

6. Be careful when transmitting data over JSON that will be reflected in an event title! (Note: JSON data should be sanitized on the client side, not the server side.) -- OUR DATA isn't reflected in URL, right?

7. we need to pass tokens to prevent CSRF attacks ("Hint: You will need to send your CSRF tokens in your AJAX requests. Remember that AJAX still submits forms and runs server-side scripts, just like the vanilla forms you've been using in Modules 2 and 3.")
- CSRF tokens are passed when editing or removing events (3 points)

8. we need to make sure that the link we put in the readme corresponds with the link to the instance in the code (!!!)

9. are we safe? "Safe from XSS attacks; that is, all content is escaped on output (3 points)"

10. im 99% sure we use queries "Use prepared queries to prevent SQL Injection attacks."

11. the fuck? "Session cookie is HTTP-Only (3 points)"

