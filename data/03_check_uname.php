<?php
	header("Content-Type:application/json;charset=utf-8");
	require_once("init.php");
	@$uname=$_REQUEST["uname"];
	if(!$uname){
    	die('{"code":400,"msg":"请输入用户名！"}');
    	}
	$sql="select * from v_user where uname='$uname'";

	$result=mysqli_query($conn,$sql);
	$row = mysqli_fetch_row($result);
	if($row == null){
		echo '{"code":1,"msg":"该用户名可用！"}';
	}else{
		echo '{"code":-1,"msg":"该用户名已被占用！"}';
	}
?>