<?php
    
    include 'dbconnect.php';
    
    $housesarray = array();
    
    try {
        $sql = mysqli_query($con, "SELECT * FROM houses");
        while($row = mysqli_fetch_assoc($sql)){
            $housesarray[] = $row;
        }
    } catch (Exception $ex) {
        die("Couldn't fetch data");
    } finally {
        echo json_encode($housesarray);
    }
   