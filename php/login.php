<?php

    session_start();

    include 'dbconnect.php';

    $uname = $_POST['username'];
    $pwd = $_POST['password'];
    $sqlString = null;
    if($uname == 00) {
        $sqlString = "SELECT password FROM `admin-password`";
    } else {
        $sqlString = "SELECT * FROM employee_basic WHERE emp_id = $uname";
    }
    $sql = mysqli_query($con, $sqlString);
    
    if (mysqli_num_rows($sql) == 0) {
        echo 3;
    } else if ($pwd != mysqli_fetch_assoc($sql)['password']) {
        echo 4;
    } else if (mysqli_fetch_assoc($sql)['availability'] == 'blocked') {
        echo 8;
    } else {
        $_SESSION['id'] = $uname;
        echo 0;
    }

    include 'dbclose.php';