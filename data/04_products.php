<?php
    header("Content-type:application/json");
    require_once("init.php");

    @$kw=$_REQUEST["kw"];
    @$pno=$_REQUEST["pno"];
    if(!$pno){
        $pno=1; //默认显示第一页
    }else{
        $pno=intval($pno);
    }
    @$pageSize=$_REQUEST["pageSize"];
    if(!$pageSize){
        $pageSize=16;  //默认每页显示8条记录
    }else{
        $pageSize=intval($pageSize);
    }
    $sql="select lid,title,price, (select md from v_clothes_pic where clothes_id=lid limit 1) as md from v_clothes";
    if($kw){
        $kws=explode(" ",$kw);
        for($i=0;$i<count($kws);$i++){
            $kws[$i]="title like '%".$kws[$i]."%'";
        }
        $where=" where ".implode(" and ",$kws);
        $sql=$sql.$where;
    }
    $count=count(sql_execute($sql));
    $pageCount=ceil($count/$pageSize);
    $sql=$sql." limit ".(($pno-1)*$pageSize).",".$pageSize;
    $result=sql_execute($sql);
     $output=[
        "recordCount"=>$count,
        "pageCount"=>$pageCount,
        "pageSize"=>$pageSize,
        "pno"=>$pno,
        "data"=>$result
        ];
    echo json_encode($output);
?>