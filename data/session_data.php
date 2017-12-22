<?php
/**
* 返回当前登录用户的信息：
* 如：{"uid":10, "uname":"dingding"}
*/
header("Content-Type:application/json;charset=utf-8");
require_once("init.php");
session_start();
@$output['uid']=$_SESSION['loginUid'];
@$output['uname']=$_SESSION['loginUname'];

echo json_encode($output);
?>