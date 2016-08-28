<?php

session_start();

include 'dbconnect.php';

$hseno = $_POST['selectedHouse'];
$requestType = $_POST['requestType'];

if($requestType == 'new') {
    try {
        mysqli_begin_transaction($con);
        mysqli_query($con, "INSERT INTO requests (house_number, emp_id, type, requested_date, requested_time) VALUES('$hseno', " . $_SESSION['id'] . ", "
                . "'new', curdate(), curtime());");
        mysqli_query($con, "UPDATE `houses` SET `book_status`='Requested' WHERE house_number = '$hseno';");
    } catch (Exception $ex) {
        mysqli_rollback($con);
        echo 5;
    } finally {
        mysqli_commit($con);
        echo 0;
    }
} else {
    try {
        mysqli_begin_transaction($con);
        mysqli_query($con, "INSERT INTO requests (house_number, emp_id, previous, type, requested_date, requested_time) VALUES('$hseno', "
                . $_SESSION['id'] . ", '$requestType', 'changing', curdate(), curtime());");
        mysqli_query($con, "UPDATE `houses` SET `book_status`='Requested' WHERE house_number = '$hseno';");
    } catch (Exception $ex) {
        mysqli_rollback($con);
        echo 5;
    } finally {
        mysqli_commit($con);
        echo 0;
    }
}



include 'dbclose.php';