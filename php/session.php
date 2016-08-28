<?php
    session_start();
    
    include 'dbconnect.php';
    
    if(isset($_SESSION['id'])) {
        if($_SESSION['id'] == 00) {
            echo 'Admin';
        } else {
            $sql = mysqli_query($con, "SELECT first_name, surname FROM employee_basic WHERE emp_id = ".$_SESSION['id']);
            echo $name = mysqli_fetch_assoc($sql)['first_name'].' '.mysqli_fetch_assoc($sql)['surname'];
        }
    } else {
        echo 1;
    }

    include 'dbclose.php';