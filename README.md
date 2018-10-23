# README #

##starting to write what we will turn in

GROUP MEMBERS:

Gillian Laming (ID: 457507)
Leela Ghaemmaghami (ID: 457569)

link to calendar home page: 

CREATIVE PORTION DESCRIPTION:

#our thotszsz 

* creative portion:
    - when username exists, give user suggestions of usernames similar to current username that doesnt exist
    - color code events based on which user's event it is
    - color view shows all of user's events tagged a certain color!! yay colors
    - repeating events? seems hard tbh

##TO DOs:

2. "Unregistered users should see no events on the calendar." 
    - DONE BITCH

4. Your AJAX should not ask the server for events from a certain username. Instead, your AJAX should ask the server for events, and the server should respond with the events for only the currently-logged-in user (from the session). Can you think of why? <- fuck off cole
    - YEET YEET 

5. we need to run everything by a validator - in process 
    - gillian is asking question on piazza about this

7. we need to pass tokens to prevent CSRF attacks ("Hint: You will need to send your CSRF tokens in your AJAX requests. Remember that AJAX still submits forms and runs server-side scripts, just like the vanilla forms you've been using in Modules 2 and 3.")
    - CSRF tokens are passed when editing or removing events (3 points)
    - gillian is going to do this

8. we need to make sure that the link we put in the readme corresponds with the link to the instance in the code (!!!) 
    - haha not a thing anymore bc no more xmhtthxtml

9. are we safe? "Safe from XSS attacks; that is, all content is escaped on output (3 points)" -???

11. the fuck? "Session cookie is HTTP-Only (3 points)" --pretty sure this is okay 

*   honestlyt still trying to figure out how in vscode this list ^^^ is out of order but then on bitbucket??? shes beautiful??? 
 -  america exBLAIN

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

