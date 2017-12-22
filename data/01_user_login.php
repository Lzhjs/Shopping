<?php
    header("Content-Type:application/json;charset=utf-8");
    header('Access-Control-Allow-Origin:*');
    require_once("init.php");

    //通过正则表达式在php对用户参数再验证
    //$uPattern = '/[a-zA-Z0-9]{3,12}/';
  //  $pPattern = '/[a-zA-Z0-9]{3,12}/';
    //if(!preg_match($uPattern,$u)){
   //  echo '{"code":-2,"msg":"用户名格式不正确"}';
    // exit;//停止php运行
   // }
   // if(!preg_match($pPattern,$p)){
   //  echo '{"code":-2,"msg":"密码格式不正确"}';
   //  exit;//停止php运行
   // }

    @$uname=$_REQUEST["uname"];
    if(!$uname){
    die('{"code":400,"msg":"请输入用户名！"}');
    }
    @$upwd=$_REQUEST["upwd"];
    if(!$upwd){
    die('{"code":401,"msg":"请输入密码！"}');
    }

    $sql="select * from v_user where uname='$uname' and upwd=$upwd";
    $result=mysqli_query($conn,$sql);

   

    if(!$result){       //SQL语句执行失败
      echo('{"code":500, "msg":"用户名或密码错误！!"}');
    }else {
      $row = mysqli_fetch_assoc($result);
      if(!$row){        //用户名或密码错误
        echo('{"code":201, "msg":"用户名或密码错误!"}');
      }else {           //登录成功
        session_start();
        $_SESSION['loginUname'] = $uname;
        $_SESSION['loginUid'] = $row['uid'];
        $pageToJump = @$_SESSION['pageToJump'];
         echo '{"code":1, "msg":"登陆成功!!"}';
        }
        }
?>