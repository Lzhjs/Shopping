<?php
    header("Content-type:application/json");
    require_once("../init.php");
    $output=[];   //定义二维关联数组

    $sql="select * from v_index_product where seq_recommended between 1 and 4";    //一楼
    $output["f1"]=sql_execute($sql);

    $sql="select * from v_index_product where seq_recommended between 5 and 8";      //二楼
    $output["f2"]=sql_execute($sql);

    $sql="select * from v_index_product where seq_recommended between 9 and 12";         //三楼
    $output["f3"]=sql_execute($sql);

    $sql="select * from v_index_product where seq_recommended between 13 and 16";         //四楼
    $output["f4"]=sql_execute($sql);

    echo json_encode($output);
?>