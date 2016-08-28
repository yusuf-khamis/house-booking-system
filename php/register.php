<?php

session_start();

include 'dbconnect.php';

$empId = $_POST['empId'];
$fname = $_POST['fname'];
$sname = $_POST['sname'];
$surname = $_POST['surname'];
$id = $_POST['id'];
$pwd = $_POST['pwd'];
$box = $_POST['box'];
$postal = $_POST['postal'];
$city = $_POST['city'];
$phone = $_POST['phone'];
$alternate = $_POST['alternate'];
$email = $_POST['email'];
$gender = $_POST['gender'];
$marital = $_POST['marital'];

$check = mysqli_query($con, "SELECT first_name, surname FROM employee_basic WHERE emp_id = $empId");
if(mysqli_num_rows($check) == 1) {
    $row = mysql_fetch_assoc($check);
    $names = $row['first_name'].' '.$row['surname'];
    echo $names;
} else {
    try {
        mysqli_begin_transaction($con);
        mysqli_query($con, "INSERT INTO employee_basic VALUES($empId, '$fname', '$sname', '$surname', '$gender', '$pwd', '$marital', $id, 'available')");
        mysqli_query($con, "INSERT INTO employee_address VALUES($empId, $box, '$city', $postal, $phone, $alternate, '$email')");
        $_SESSION['id'] = $empId;
    } catch (Exception $ex) {
        mysqli_rollback($con);
        echo 5;
    } finally {
        mysqli_commit($con);
        echo 0;
    }
}

include 'dbclose.php';