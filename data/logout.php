<?php

header('Content-Type:application/json;charset=UTF-8');

header('Access-Control-Allow-Origin:*');
require_once("init.php");

session_start();
session_destroy();

echo '{"code":200,"msg":"退出登录成功!"}';
