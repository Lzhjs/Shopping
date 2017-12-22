/**
 * Created by Administrator on 2017/10/28.
 */
$("#uname").blur(function(){
	if($("#uname").val()){
	 $("#vali_info1").text("");
}else{
	$("#vali_info1").text("用户名不能为空");
}
    
});


$("#upwd").blur(function(){
		if($("#upwd").val()){
			 $("#vali_info2").text("");
		}else{
			 $("#vali_info2").text("密码不能为空");
		}
});

$("#bt-login").click(function(){
		var data=$("#form-login").serialize();
		console.log(data);
		$.ajax({
			type:"POST",
			url:"data/01_user_login.php",
			data:data,
			success:function(result){
				//console.log(666);
				//console.log(result);
				if(result.code==1){
					alert("登录成功，自动返回首页！");
          location.href="index.html";
				}else if(result.code==400){
					//alert("用户名或密码输入有误！");
					alert(result.msg);
				}else if(result.code==401){
					alert(result.msg);
				}else if(result.code=201){
					alert(result.msg);
				}else if(result.code==500){
					alert(result.msg);
				}

			},
			error:function(){
				alert("网络故障，请检查！");
			}
			
		})

});