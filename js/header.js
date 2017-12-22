    (()=>{

        $("#list").load("top.html",function(){
            $.ajax({
                url:"data/session_data.php",
                success:function(result) {
                    console.log(result);
                    if(result.uname){
                        //var html = "";
                        //html +=`<b> 欢迎回来:${result.uname}</b>&nbsp;<a id="logout">退出登录</a>`;
                        //$("#login").css("display", "none");
                        $("#login").html('<b> 欢迎回来:'+result.uname+'</b>&nbsp;<a id="logout">退出登录</a>');
                        $("#logout").click(function(e){
                            e.preventDefault();
                            $.ajax({
                                url: "data/logout.php",
                                success: function (result) {
                                    if(result.code == 200) {
                                        alert(result.msg);
                                        //sessionStorage.clear();
                                        location.href = "index.html";
                                    }
                                },
                                error:function() {
                                    alert("网络故障，请检查");
                                }
                            })

                        });
                    }
                }

            })

        });
        ajax("get","02-header.html","","text").then(html=>{
            document.getElementById("header").innerHTML=html;
    //console.log(html);
    }).then(()=>{

            $(".weixin").on("mouseenter",function(){
                $("#weixin").css("display","block");
            });
            $(".weixin").on("mouseleave",function(){
                $("#weixin").css("display","none");
            });
    //首页点击搜索跳转
    $(".search2").click(function(e){
        e.preventDefault();
        var kw=$(".search").val();
        // console.log("xxx");
        if(kw.trim().length!=0){
            var url="http://127.0.0.1/Amy_v2.0/06-products.html?kw="+kw;
            location=url;
        }
    })
}).then(()=>{
    //自动搜索
    $(".search").autocomplete({
        source:"data/06_auto_search.php",
        select:function(e,obj){
            $(this).val(obj.item.title);
            setTimeout(function(){
                location="07-product-detail.html?lid="+obj.item.lid;
            },1000);
            return false;
        }
    }).autocomplete("instance")
        ._renderItem=function($ul,p){
        var $li=$(`<li><div>${p.title} 销量:${p.sold_count}</div></li>`);
        $ul.append($li);
        return $li;
    }
}).then(()=>{
            $(".search3").click(function(e){
                console.log(666);
                e.preventDefault();
                $.ajax({
                    url:"data/session_data.php",
                    success:function(result){
                        if(result.uname&&result.uid){
                            location.href="08-cart.html";
                        }else{
                            alert('您未登录,请先登录!');
                            location.href="05-login.html";
                        }
                    }
                })
            })

        })

})()


function displayMenu(li){
    var elem = li.getElementsByTagName("ul")[0];
    elem.style.display = "block";
    elem.style.zIndex=10;
    elem.style.transition="all .5s linear";
}
function hideMenu(li){
    var elem = li.getElementsByTagName("ul")[0];
    elem.style.display = "none";
}
