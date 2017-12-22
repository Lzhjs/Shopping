<?php
	header("Content-type:application/json;charset=utf-8");
    require_once("init.php");
    @$uname=$_REQUEST["uname"];
    if($uname==""||$uname==null){
   	 die('{"code":-1,"msg":"用户名不能为空"}');
    }
  // else if(!preg_match("/^[\w\s\u4e00-\u9fa5]{6,12}$/i",$uname)){
	// die('{"code":-1,"msg":"用户名格式不对"}');
   // }
	@$upwd=$_REQUEST["upwd"];
	 if($upwd==""||$upwd==null){
       	 die('{"code":-1,"msg":"密码不能为空"}');
        }else if(!preg_match("/^\d{6,12}$/",$upwd)){
    	 die('{"code":-1,"msg":"密码格式不对"}');
        }
	@$email=$_REQUEST["email"];
	 if($email==""||$email==null){
       	 die('{"code":-1,"msg":"邮箱不能为空"}');
        }else if(!preg_match("/^\d{6,11}([@][q][q][.][c][o][m])$/",$email)){
    	 die('{"code":-1,"msg":"邮箱格式不对"}');
        }
	@$phone=$_REQUEST["phone"];
	 if($phone==""||$phone==null){
       	 die('{"code":-1,"msg":"手机号不能为空"}');
        }else if(!preg_match("/^\d{11}$/",$phone)){
    	 die('{"code":-1,"msg":"手机号格式不对"}');
        }

	$sql="insert into v_user (uname,upwd,email,phone) values('$uname','$upwd','$email','$phone')";
	$result=mysqli_query($conn,$sql);

	if($result == true){
		echo '{"code":1,"msg":"注册成功！"}';
	}else{
		echo '{"code":-1,"msg":"注册失败！"}';
	}
?>