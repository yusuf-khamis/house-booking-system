<?php

include 'dbconnect.php';

$choice = $_POST['choice'];

switch ($choice) {
    case 'fetch':
        $data = array();
        $requests = mysqli_query($con, "SELECT house_number, emp_id, previous, type, requested_date, requested_time, acceptance FROM requests "
                . "WHERE acceptance IS NULL");
        $count = 0;
        while($row = mysqli_fetch_assoc($requests)) {
            $empId = $row['emp_id'];
            $hseno = $row['house_number'];
            $type = $row['type'];
            $fetchDetails = mysqli_query($con, "SELECT first_name, second_name, surname FROM employee_basic WHERE emp_id = $empId");
            while($namesRow = mysqli_fetch_assoc($fetchDetails)) {
                $data['requests'][] = array_merge($row, $namesRow);
            }
            $count++;
        }
        if(mysqli_num_rows($requests) == 0) {
            $data['requests'][] = NULL;
        }
        $users = mysqli_query($con, "SELECT employee_basic.emp_id, first_name, second_name, surname, gender, marital_status, id_number, box_number, "
                . "box_city, postal_address, phone_number, alternate_number, email_address, availability FROM employee_basic, employee_address WHERE "
                . "employee_basic.emp_id = employee_address.emp_id");
        while($row = mysqli_fetch_assoc($users)) {
            $data['users'][] = $row;
        }
        $houses = mysqli_query($con, "SELECT * FROM houses");
        $count = 0;
        while($row = mysqli_fetch_assoc($houses)) {
            $hseno = $row['house_number'];
            $hsestatus = $row['book_status'];
            switch ($hsestatus) {
                case 'Vacant':
                    $data['houses'][] = $row;
                    break;
                case 'Requested':
                    $fetchDetails = mysqli_query($con, "SELECT house_number, requests.emp_id, requested_date, first_name, second_name, surname FROM "
                            . "requests, employee_basic WHERE employee_basic.emp_id = requests.emp_id AND requests.acceptance IS NULL");
                    while($inrow = mysqli_fetch_assoc($fetchDetails)) {
                        $data['houses'][] = array_merge($row, $inrow);
                    }
                    break;
                case 'Booked':
                    $fetchDetails = mysqli_query($con, "SELECT house_number, occupation.emp_id, since_date, first_name, second_name, surname FROM "
                            . "occupation, employee_basic WHERE employee_basic.emp_id = occupation.emp_id AND till_date IS NULL");
                    while($inrow = mysqli_fetch_assoc($fetchDetails)) {
                        $data['houses'][] = array_merge($row, $inrow);
                    }
                    break;
            }
            
            $count++;
        }
        echo json_encode($data);
        break;
    case 'update':
        $action = $_POST['action'];
        switch ($action) {
            case 'block':
                $type = $_POST['type'];
                $id = $_POST['id'];
                $block = mysqli_query($con, "UPDATE employee_basic SET availability = '" . ($type == 'Block user' ? 'blocked' : 'available') . "' "
                        . "WHERE emp_id = $id");
                if(!$block) {
                    echo 6;
                } else {
                    echo 0;
                }
                break;
            case 'respond':
                $type = $_POST['type'];
                $id = $_POST['id'];
                $house = $_POST['house'];
                $requestType = $_POST['requestType'];
                $prev = $_POST['prev'];
                if($type == 'Decline') {
                    try {
                        mysqli_begin_transaction($con);
                        mysqli_query($con, "UPDATE requests SET acceptance = '".$type."d', acceptance_date = curdate(), acceptance_time = curtime() "
                                . "WHERE emp_id =  $id AND house_number = '$house' AND acceptance IS NULL");
                        mysqli_query($con, "UPDATE houses SET book_status = 'Vacant' WHERE house_number = '$house'");
                    } catch (Exception $ex) {
                        mysqli_rollback($con);
                        echo 5;
                    } finally {
                        mysqli_commit($con);
                        echo 0;
                    }
                } else if($type == 'Approve') {
                     $ok = mysqli_query($con, "UPDATE requests SET acceptance = '".$type."d', acceptance_date = curdate(), acceptance_time = curtime() "
                             . "WHERE emp_id =  $id AND house_number = '$house' AND acceptance IS NULL");
                     if($ok) {
                         echo 0;
                     } else {
                         echo 5;
                     }
                } else {
                    try {
                        mysqli_begin_transaction($con);
                        mysqli_query($con, "UPDATE requests SET acceptance = '".$type."d', acceptance_date = curdate(), acceptance_time = curtime() "
                                . "WHERE emp_id =  $id AND acceptance IS NULL;");
                        if($requestType == 'changing') {
                            mysqli_query($con, "UPDATE houses SET book_status = 'Booked' WHERE house_number = '$house';");
                            mysqli_query($con, "UPDATE houses SET book_status = 'Vacant' WHERE house_number = '$prev';");
                            mysqli_query($con, "UPDATE occupation SET house_number = '$house', since_date = curdate() WHERE emp_id = $id AND "
                                    . "house_number = '$prev';");
                        } else {
                            mysqli_query($con, "UPDATE houses SET book_status = 'Booked' WHERE house_number = '$house';");
                            mysqli_query($con, "INSERT INTO occupation (house_number, emp_id, since_date) VALUES ('$house', $id, curdate());");
                        }
                    } catch (Exception $ex) {
                        mysqli_rollback($con);
                        echo 5;
                    } finally {
                        mysqli_rollback($con);
                        echo 0;
                    }
                }
                
                break;
            case 'read':
                $id = $_POST['id'];
                $readmail = mysqli_query($con, "UPDATE emails SET read_status = 'read' WHERE id = $id");
                if($readmail) {
                    echo 0;
                } else {
                    echo 5;
                }
                break;
            case 'reset':
                $id = $_POST['id'];
                $resetpwd = mysqli_query($con, "UPDATE employee_basic SET password = 'password' WHERE emp_id = $id");
                if($resetpwd) {
                    echo 0;
                } else {
                    echo 5;
                }
                break;
        }
        break;
}

include 'dbclose.php';