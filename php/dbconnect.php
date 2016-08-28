<?php
    $con = null;
    try {
        $con = mysqli_connect('localhost', 'root', '', 'house_booking');
    } catch (Exception $ex) {
        echo 1;
        die();
    }

