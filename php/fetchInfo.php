<?php

session_start();

include 'dbconnect.php';

$status = null;
$sql = null;
$data = array();

$sqlConfirm = mysqli_query($con, "SELECT * FROM occupation WHERE emp_id = ".$_SESSION['id']." ORDER BY id DESC LIMIT 1");

if(mysqli_num_rows($sqlConfirm) == 1) {
    $nullcheck = mysqli_fetch_assoc($sqlConfirm)['till_date'];
    if($nullcheck == null) {
        $status = 'tenant';
        $request = mysqli_query($con, "SELECT house_number AS current, previous, requested_time, requested_date FROM requests WHERE emp_id = "
                .$_SESSION['id']." AND acceptance IS NULL AND type = 'changing' ORDER BY id DESC LIMIT 1");
        if(mysqli_num_rows($request) == 1) {
            $status = 'changing';
            while($row = mysqli_fetch_assoc($request)) {
                $data = $row;
            }
        }
        $sql = mysqli_query($con, "SELECT first_name, second_name, surname, gender, marital_status, id_number, box_number, box_city, postal_address, "
                . "phone_number, alternate_number, email_address, house_number, since_date FROM employee_basic, employee_address, occupation WHERE "
                . "employee_basic.emp_id = ".$_SESSION['id']." AND employee_address.emp_id = ".$_SESSION['id']." AND occupation.emp_id = ".$_SESSION['id']
                . " ORDER BY id DESC LIMIT 1");
    } else {
        $status = 'non-tenant';
        $sql = mysqli_query($con, "SELECT first_name, second_name, surname, gender, marital_status, id_number, box_number, box_city, postal_address, phone_number, "
            . "alternate_number, email_address FROM employee_basic, employee_address WHERE employee_basic.emp_id = ".$_SESSION['id']." AND "
                . "employee_address.emp_id = ".$_SESSION['id']);
        $request = mysqli_query($con, "SELECT * FROM requests WHERE emp_id = ".$_SESSION['id']." AND acceptance IS NULL AND type != 'left' ORDER BY id DESC LIMIT 1");
        if(mysqli_num_rows($request) == 1) {
            $status = 'requesting';
            while($row = mysqli_fetch_assoc($request)) {
                $data = $row;
            }
        }
    }
    
    //currently a tenant
} else {
    //currently not a tenant
    $sql = mysqli_query($con, "SELECT first_name, second_name, surname, gender, marital_status, id_number, box_number, box_city, postal_address, phone_number, "
        . "alternate_number, email_address FROM employee_basic, employee_address WHERE employee_basic.emp_id = ".$_SESSION['id']." AND "
            . "employee_address.emp_id = ".$_SESSION['id']);
    $request = mysqli_query($con, "SELECT * FROM requests WHERE emp_id = ".$_SESSION['id']." AND acceptance IS NULL AND type != 'left' ORDER BY id DESC LIMIT 1");
    if(mysqli_num_rows($request) == 1) {
        $status = 'requesting';
        while($row = mysqli_fetch_assoc($request)) {
            $data = array_merge($row, $inrow);
        }
        if($type == 'changing') {
            $status = $type;
            $data['prev_location'] = mysqli_fetch_assoc(mysqli_query($con, "SELECT location FROM houses WHERE house_number = '$prev'"))['location'];
        } else {
            $status = 'requesting';
        }
    } else {
        $status = 'non-tenant';
    }
}

while($row = mysqli_fetch_assoc($sql)) {
    $data = array_merge($data, $row);
}

$data['status'] = $status;

echo json_encode($data);

include 'dbclose.php';