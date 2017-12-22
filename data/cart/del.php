<?php
    header("Content-Type:application/json;charset=utf-8");
    @$iid=$_REQUEST['iid'] or die('{"code":400,"msg":"获取商品ID失败！"}');

    session_start();
    if(!@$_SESSION['loginUid']){
        die('{"code":300,"msg":"用户未登陆！请登录！"}');
    }
    require_once("../init.php");
    $sql="delete from v_shoppingcart_item where iid=$iid";
    $result=mysqli_query($conn,$sql);
    if($result){
        echo '{"code":200,"msg":"删除商品成功！"}';
    }else{
        echo '{"code":500,"msg":"删除商品失败！"}';
    }
?>