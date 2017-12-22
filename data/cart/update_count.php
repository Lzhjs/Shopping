<?php
//更新购物车中商品的数量
header("Content-Type:application/json;utf-8");

@$iid=$_REQUEST[iid] or die('{"code":401,"msg":"获取商品信息失败！"}');
@$count=$_REQUEST['count'] or die('{"code":402,"msg":"获取商品数量失败！"}');

session_start();
if(!@$_SESSION['loginUid']){
    die('{"code":300,"msg":"用户未登陆！"}');
}
require_once("../init.php");
$sql="update v_shoppingcart_item set count=$count where iid=$iid";
$result=mysqli_query($conn,$sql);
if($result){
    echo '{"code":200,"msg":"更新成功！"}';
}else{
    echo '{"code":500,"msg":"更新失败！"}';
}


?>