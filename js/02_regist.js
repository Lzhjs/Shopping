/**
 * Created by Administrator on 2017/10/28.
 */
//注册表单验证
//1.验证用户名
var uname=$("#uname");
var info1=$(".vali_info1");
//获得焦点时
uname.on("focus",function(){
    info1.html("6—12个的英文字母、汉字或下划线的组合");
});

function checkunameReg(){
    var unameReg=/^[\w\s\u4e00-\u9fa5]{6,12}$/i;
    if(!unameReg.test(uname.val())){
        uname.next().css("background-image","url('img/regist/error.png')");
    }else if(unameReg.test(uname.val())){
        uname.next().css("background-image","url('img/regist/ok.png')");
        info1.html("");
    }
}

    uname.on("blur",function(){
        var data=uname.val();
        if(!data){
            info1.html("用户名不能为空");
            uname.next().css("background-image","url('img/regist/error.png')");
        }
        console.log(data);
        $.ajax({
            type: "POST",
            url: "data/03_check_uname.php?uname="+data,
            data:data,
            success:function(data){
                //console.log(666);
                console.log(data);
                if(data.code>0){
                    checkunameReg();
                    //info1.html(data.msg);
                }else{
                    info1.html(data.msg);
                    uname.next().css("background-image","url('img/regist/error.png')");

                }
            },
            error: function(){
                alert("网络故障，请检查！");
            }
        });

        //checkunameReg();
    });

//2.验证用户密码
    var upwd=$("#upwd");
    var info2=$(".vali_info2");
    upwd.on("focus",function(){
        info2.html("输入6—12位数字");
    });
    upwd.on("blur",function(){
        var upwdReg=/^\d{6,12}$/;
        if(!upwdReg.test(upwd.val())){
            upwd.next().css("background-image","url('img/regist/error.png')");
        }else if(upwdReg.test(upwd.val())){
            upwd.next().css("background-image","url('img/regist/ok.png')");
            info2.html("");
        }
        if(!upwd.val()){
            info2.html("密码不能为空");
        }
    });

//3.再次验证密码
    var cpwd=$("#cpwd");
    var info3=$(".vali_info3");
    cpwd.on("focus",function(){
        info3.html("请再次确认您的密码");
    });
    cpwd.on("blur",function(){
        if(!cpwd.val()){
            info3.html("密码不能为空");
            cpwd.next().css("background-image","url('img/regist/error.png')");
        }else{
            if((upwd.val()==cpwd.val())){
                cpwd.next().css("background-image","url('img/regist/ok.png')");
                info3.html("");
            }else if(upwd.val()!=cpwd.val()){
                cpwd.next().css("background-image","url('img/regist/error.png')");
                info3.html("密码输入不一致");
            }
        }


    });

//4.验证邮箱
    var email=$("#email");
    var info4=$(".vali_info4");
    email.on("focus",function(){
        info4.html("输入格式正确的邮箱地址");
    });
    email.on("blur",function(){
        var emailReg=/^\d{6,11}([@][q][q][.][c][o][m])$/;
        if(!emailReg.test(email.val())){
            email.next().css("background-image","url('img/regist/error.png')");
            info4.html("您输入的邮箱格式有误");
        }else if(emailReg.test(email.val())){
            email.next().css("background-image","url('img/regist/ok.png')");
            info4.html("");
        }
        if(!email.val()){
            info4.html("邮箱不能为空");
        }
    });

    //验证手机号
    var phone=$("#phone");
    var info5=$(".vali_info5");
    phone.on("focus",function(){
        info5.html("输入11位手机号");
    });
    phone.on("blur",function(){
        var phoneReg=/^\d{11}$/;
        if(!phoneReg.test(phone.val())){
            phone.next().css("background-image","url('img/regist/error.png')");
            info5.html("您输入的手机号码有误");
        }else if(phoneReg.test(phone.val())){
            phone.next().css("background-image","url('img/regist/ok.png')");
            info5.html("");
        }
        if(!phone.val()){
            info5.html("手机号不能为空");
        }
    });

//注册用户到数据库
$("#btn-regist").click(function(){
        if($(".isCheck").is(':checked')){            //验证是否勾选服务条款
            var data=$("#form-regist").serialize();
            console.log(data);
            $.ajax({
                type:"POST",
                url:"data/02_user_regist.php",
                data:data,
                success:function(data){
                    console.log(data);
                    if(data.code>0){
                        alert(data.msg);
                        location.href="05-login.html";
                    }else{
                        alert(data.msg);
                    }

                },
                error:function(){
                    alert("网络故障，请检查！");
                }
            });
        }else{
            alert("请阅读并勾选服务条款！");
        }

    });





