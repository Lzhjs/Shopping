<?php
//获取当前登录用户的购物车信息
header("Content-Type:application/json");
require_once("../init.php");
session_start();

if(!@$_SESSION['loginUid']){
    $_SESSION['pageToJump']='08-cart.html';
    die('{"code":300,"msg":"您未登陆，请先登陆！"}');
}

$sql="select iid,lid,title,spec,price,count,clothes_size from v_clothes c,v_shoppingcart_item s where user_id=$_SESSION[loginUid] and c.lid=s.product_id";
$result=mysqli_query($conn,$sql);
$list=mysqli_fetch_all($result,MYSQLI_ASSOC);
//查询每个商品的第一幅小图
foreach($list as $i=>$p){
    $sql="select sm from v_clothes_pic where clothes_id=$p[lid] limit 1";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    $list[$i]['pic']=$row[0];
}
$output=['code'=>200,'data'=>$list];

echo json_encode($output);

?>