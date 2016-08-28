<?php

session_start();

include 'dbconnect.php';

$field = $_POST['field'];

switch ($field) {
    case 'names':
        $names = $_POST['names'];
        $sql = mysqli_query($con, "UPDATE employee_basic SET first_name = '$names[0]', second_name = '$names[1]', surname = '$names[2]' "
                . "WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'gender':
        $gender = $_POST['gender'];
        $sql = mysqli_query($con, "UPDATE employee_basic SET gender = '$gender' WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'marital':
        $marital = $_POST['marital'];
        $sql = mysqli_query($con, "UPDATE employee_basic SET marital_status = '$marital' WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'id':
        $id = $_POST['id'];
        $sql = mysqli_query($con, "UPDATE employee_basic SET id_number = $id WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'email':
        $email = $_POST['email'];
        $sql = mysqli_query($con, "UPDATE employee_address SET email_address = '$email' WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'alternate':
        $alternate = $_POST['alternate'];
        $sql = mysqli_query($con, "UPDATE employee_address SET alternate_number = $alternate WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'phone':
        $phone = $_POST['phone'];
        $sql = mysqli_query($con, "UPDATE employee_addresss SET phone_number = $phone WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'city':
        $city = $_POST['city'];
        $sql = mysqli_query($con, "UPDATE employee_address SET box_city = '$city' WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'postal':
        $postal = $_POST['postal'];
        $sql = mysqli_query($con, "UPDATE employee_address SET postal_address = $postal WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'box':
        $box = $_POST['box'];
        $sql = mysqli_query($con, "UPDATE employee_address SET box_number = $box WHERE emp_id = ".$_SESSION['id']);
        test($sql);
        break;
    case 'pwd':
        $old = $_POST['old'];
        $current = $_POST['current'];
        $sqlConfirm = mysqli_query($con, "SELECT password FROM employee_basic WHERE emp_id = ".$_SESSION['id']);
        if(mysqli_fetch_assoc($sqlConfirm)['password'] != $old) {
            echo 4;
        } else {
            $sql = mysqli_query($con, "UPDATE employee_basic SET password = '$current' WHERE emp_id = ".$_SESSION['id']);
            test($sql);
        }
        break;
    default:
        $hseno = $_POST['hseno'];
        try {
            mysqli_begin_transaction($con);
            mysqli_query($con, "INSERT INTO requests (house_number, emp_id, previous, type, requested_date, requested_time) "
                    . "VALUES ('$hseno', ".$_SESSION['id'].", '$hseno', 'left', curdate(), curtime())");
            mysqli_query($con, "UPDATE occupation SET till_date= curdate() WHERE house_number = '$hseno'");
            mysqli_query($con, "UPDATE houses SET book_status = 'Vacant' WHERE house_number = '$hseno'");
        } catch (Exception $ex) {
            mysqli_rollback($con);
            echo 5;
        } finally {
            mysqli_commit($con);
            echo 0;
        }
        break;
}

function test($sql) {
    if($sql){
        echo 0;
    } else {
        echo 6;
    }
}

include 'dbclose.php';