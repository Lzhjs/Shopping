<?php
    header("Content-type:application/json");
    require_once("init.php");
    @$kw=$_REQUEST["kw"];
    $sql="select lid,title,sold_count from v_clothes";
    if($kw){
    $kws=explode(" ",$kw);
    for($i=0;$i<count($kws);$i++){
        $kws[$i]=" title like '%".$kws[$i]."%'";
    }
    $where=" where ".implode(" and ",$kws);
    $sql=$sql.$where;
    }
    $sql=$sql." order by sold_count desc limit 10 ";

    echo json_encode(sql_execute($sql));

?>