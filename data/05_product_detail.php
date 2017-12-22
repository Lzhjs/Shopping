<?php
    header("Content-type:application/json");
    require_once("init.php");

    @$lid=$_REQUEST["lid"];
    //$sql="select price,promise,spec,os,memory,resolution (select sm,md,lg from v_clothes_pic where clothes_id=$lid) from v_clothes where lid=$lid";
    if($lid){
      $sql="select * from v_clothes where lid=$lid";
      $output["clothes"]=sql_execute($sql)[0];

      $sql="select * from v_clothes_pic where clothes_id=$lid";
      $output["clothes"]["pics"]=sql_execute($sql);

      $fid=$output["clothes"]["family_id"];

      $sql="select fid,fname from v_clothes_family where fid=$fid";
      $output["family"]=sql_execute($sql)[0];

      $sql="select lid,spec from v_clothes where family_id=$fid";
      $output["family"]["clothes_list"]=
        sql_execute($sql);
      echo json_encode($output);
    }else{
      echo "[]";
    }

?>