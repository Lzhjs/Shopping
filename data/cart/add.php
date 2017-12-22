<?php

header("Content-Type:application/json;charset=utf-8");

@$lid=$_REQUEST['lid'] or die('{"code":401,"msg":"lid required"}');
@$buyCount=$_REQUEST['buyCount'] or die('{"code":402,"msg":"请确定购买数量！"}');
@$size=$_REQUEST['size'] or die('{"code":403,"msg":"请确定衣服尺码！"}');
session_start();
if(!@$_SESSION['loginUid']){
     $_SESSION['pageToJump'] = '08-cart.html';
      $_SESSION['toBuyLid'] = $lid;
      $_SESSION['toBuyCount'] = $buyCount;
      die('{"code":300, "msg":"您未登陆，请先登陆！"}');
}
require_once("../init.php");

//$sql="select iid from v_shoppingcart_item where user_id=$_SESSION['loginUid'] and product_id=$lid";

$sql = "SELECT iid FROM v_shoppingcart_item WHERE user_id=$_SESSION[loginUid] AND product_id=$lid AND clothes_size='$size'";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_row($result);
if($row){
   $sql="update v_shoppingcart_item set count=count+$buyCount where user_id=$_SESSION[loginUid] and product_id=$lid and clothes_size='$size'";
}else{
    $sql="insert into v_shoppingcart_item values(null,$_SESSION[loginUid],$lid,$buyCount,false,'$size')";
   }
   $result = mysqli_query($conn, $sql);
   if($result){
     echo '{"code":200, "msg":"添加商品成功！"}';
   }else {
     echo '{"code":500, "msg":"添加商品失败！"}';
   }

?>