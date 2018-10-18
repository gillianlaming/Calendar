# README #

CALENDAR TO-DO LIST:

1. set up new database
    * users table:
        * username (unique), password hash
    * events table:
        * id, username (foriegn key), title, date, time, location, category
        * use php to connect to the database

2. set up login / register page
    * copy html and php from turnip login
    * if the user is not logged in, they cannot see any site
    * use ajax to access the php

3. make empty calendar
    * make it do dates until infinity
    * they gave us this code ^^
    * when you click on a section, javascript opens up a window (google dialogue, then you can add an event to that)
    * javascript

4. add events
    * javascript -> php -> mySQL
    * you can call the php in the js function 

Notes from tutor:

* does not reccomend using jQuery (use simple functions, but not complex ones)
* group events thing from the creative part is easy
* idea: timeline for each day so you can see how long each event lasts
* do login first, then format calendar page, then start coding events
* make sure we understand the code they give to us
* upload everything to ec2
* CSRF code in web application and security under solutions: examples 1 and 2
* email tutor "show create table" for all of the table creations
* creative portion: ajax request to google maps to look for their location

