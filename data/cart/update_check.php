<?php
/**
* 修改购物车条目中的是否勾选
*/
header('Content-Type: application/json;charset=UTF-8');

@$iid = $_REQUEST['iid'] or die('{"code":401,"msg":"获取购物ID失败！"}');
@$checked = $_REQUEST['checked'];
if($checked!=='0' && !$checked){
  die('{"code":402,"msg":"该商品未勾选,请勾选！"}');
}

session_start();
if(! @$_SESSION['loginUid']){
  die('{"code":300, "msg":"用户未登陆,请登录！"}');
}

require_once('../init.php');
$sql = "UPDATE v_shoppingcart_item SET is_checked=$checked WHERE iid=$iid";
$result = mysqli_query($conn, $sql);
if($result){
  echo '{"code":200, "msg":"更新成功！"}';
}else {
  echo '{"code":500, "msg":"更新失败！"}';
}
