<?php
   session_start();
   session_destroy();
   if (session_destroy()){
       echo ("true");
   }
   else {
       echo("false");
   }
?>