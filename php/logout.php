<?php
    session_start();
    
    if(isset($_SESSION['id'])){
        unset($_SESSION['id']);
        echo 0;
    }
?>

