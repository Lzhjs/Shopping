/**
 * Created by web-01 on 2017/12/2.
 */
//加载购物车内容
$.ajax({
    type:"GET",
    url:"data/cart/list.php",
    success:function(result){
        if(result.code==300){
            alert(result.msg);
            location.href="05-login.html";
        }else if(result.code==200){
            var html="";
            if(result.data.length){
                $.each(result.data,function(i,l){
                    html+=`
                <div class="imfor">
                    <div class="check">
                        <div class="Each">
                            <span class="normal">
                                <img src="img/cart/product_normal.png" alt=""/>
                            </span>
                            <input type="hidden" name="lid" value="${l.lid}">
                        </div>
                    </div>
                    <div class="pudc">
                        <div class="pudc_information" id="${l.iid}">
                        <a href="07-product-detail.html?lid=${l.lid}"><img src="${l.pic}" class="lf"/></a>
                        <input type="hidden" name="" value="">
                        <span class="des lf">
                        <a href="07-product-detail.html?lid=${l.lid}">${l.title}</a>
                        <input type="hidden" name="" value="">
                        </span>
                        <p class="col lf"><span>颜色:</span><span class="color_des">${l.spec}  <input type="hidden" name=""value=""></span></p>
                        <p class="col lf"><span>尺码:</span><span class="color_des">${l.clothes_size}</span></p>
                        </div>
                    </div>
                    <div class="pices">
                        <p class="pices_des">冬季特惠价</p>
                        <p class="pices_information">
                            <b>￥</b><span>${l.price}  <input type="hidden" name="" value=""></span>
                        </p>
                    </div>
                    <div class="num">
                        <span class="reduc">&nbsp;-&nbsp;</span><input class="count" type="text" value="${l.count}"><span class="add">&nbsp;+&nbsp;</span>
                    </div>
                    <div class="totle">
                        <span>￥</span>
                        <span class="totle_information">${l.price * l.count}</span>
                    </div>
                    <div class="del">
                        <a href="javascript:;" class="del_d">删除</a>
                    </div>
                    </div>`;
                })
            }else{
                $(".none").show();
            }
            $("#content_box_body").html(html);
        }
    },
    error:function(){
        alert("网络故障,请检查");
    }
})
    var sum1=0;
    var sum2=0;
    $(function(){
    if (!$(".imfor")) {
        $('#section').hide();
        $('.none').show();
    }
    add_reduce();
    //全选
        //var sum1=0;
    $(".all").click(function () {
        amountadd();
        if ($('.all>span').hasClass('normal')) {
            $('.all>span').addClass('true').removeClass('normal');
            $('.all>span>img').attr('src', 'img/cart/product_true.png');
            $(".Each>span").each(function () {
                $(this).addClass('true').removeClass('normal');
                $(this).children('img').attr('src', 'img/cart/product_true.png');
            })

            totl();
            $(".count").each(function(){
                sum1+=parseInt($(this).val());
                $('.total').text(sum1);
                $('.totalOne').text(sum1);
            })

        } else {
            $('.all>span').addClass('normal').removeClass('true');
            $('.all>span>img').attr('src', 'img/cart/product_normal.png');
            $('.Each>span').addClass('normal').removeClass('true');
            $('.Each>span>img').attr('src', 'img/cart/product_normal.png');
            $(".susum").text(0.00);
            $(".susumOne").text(0.00);
            $('.total').text(0);
            $('.totalOne').text(0);
            sum1=0;
            sum2=0;
        }
    })
    //单选
       // var sum2=0;
        $('#content_box_body').on('click', '.Each>span', function(){
        amountadd();
        $('.all>span').addClass('normal').removeClass('true');
        $('.all>span>img').attr('src', 'img/cart/product_normal.png');
        if ($(this).hasClass('normal')){
            $(this).addClass('true').removeClass('normal');
            $(this).children('img').attr('src', 'img/cart/product_true.png');
            var amou = parseInt($(this).parent().parent().siblings('.num').children('.count').val());
            sum2+=amou;
            $('.total').text(sum2);
            $('.totalOne').text(sum2);
            //var sum=0;
            //$(this).each(".count",function(){
            //    sum+=parseInt($(this).val());
            //    $('.total').text(sum);
            //    $('.totalOne').text(sum);
            //})
            amountadd();
            var iid = $(this).parent().parent().siblings('.pudc').children('.pudc_information').attr('id');
            $.ajax({
                type:'POST',
                url:+'data/cart/update_check.php',
                data: {iid:iid,checked:1},
                success: function(result){
                    console.log(result);
                }
            })
        } else {
            $(this).addClass('normal').removeClass('true');
            $(this).children('img').attr('src', 'img/cart/product_normal.png');
            var amou2 = parseInt($(this).parent().parent().siblings('.num').children('.count').val());
            sum2-=amou2;
            $('.total').text(sum2);
            $('.totalOne').text(sum2);

            //var amou = parseInt($('.total').text());
            //amou--;
            //$('.total').text(amou);
            //$('.totalOne').text(amou);
            var newamo = parseInt($('.susum').text()) - parseInt($(this).parent().parent().siblings('.totle').children('.totle_information').text());
            $('.susum').text(newamo.toFixed(2));
            $('.susumOne').text(newamo.toFixed(2));
            var iid = $(this).parent().parent().siblings('.pudc').children('.pudc_information').attr('id');
            $.ajax({
                type:'POST',
                url: 'data/cart/update_check.php',
                data: {iid:iid,checked:0},
                success: function(result){
                    console.log(result);
                }
            })
        }


    })

        //单个 购物车中删除商品操作
        $("#content_box_body").on("click",".del_d",function(){
            var me=this;
            var id=$(this).parent().siblings('.pudc').children('.pudc_information').attr('id');
            $.ajax({
                type:"POST",
                url:"data/cart/del.php",
                data:{iid:id},
                success:function(result){
                    if(result.code==200){
                        $(me).parent().parent().remove();
                        alert(result.msg);

                    }else{
                        alert("更新失败！");
                    }
                },
                error:function(){
                    alert("网络故障,请重试！");
                }
            })

        });

    });
        //合计
        function totl() {
            var sum = 0.00;
            $(".totle_information").each(function(){
                //console.log($(this).text());
                sum += parseInt($(this).text());
                $(".susum").text(sum.toFixed(2));
                $(".susumOne").text(sum.toFixed(2));


            })
            //$('.total').text(amount);
            //$('.totalOne').text(amount);
        }
// 单独
        function amountadd() {
            var amo = 0;
            $('.Each>span').each(function () {
                if ($(this).hasClass('true')) {
                    amo += parseInt($(this).parent().parent().siblings('.totle').children('.totle_information').text());
                }
            })
            $('.susum').text(amo.toFixed(2));
            $('.susumOne').text(amo.toFixed(2));
            $

        }

    function add_reduce(){
        //购物车中加操作
        $("#content_box_body").on("click",".add",function(){
            $sum=0;
            var vals=$(this).prev().val();
           // var count=parseInt($('.total').text());
            vals++;
            //count++;
            $(this).prev().val(vals);
            $sum=(parseInt(vals).toFixed(2)*parseInt($(this).parent().prev().children().eq(1).children().eq(1).text()));
            $(this).parent().next().children().eq(1).text(Math.round($sum).toFixed(2));
            amountadd();
            //$().
            //var amou2 = parseInt($(this).parent().parent().siblings('.num').children('.count').val());
            if($(this).parent().siblings('.check').children('.Each').children().hasClass('true')){
                sum2++;
                $('.total').text(sum2);
                $('.totalOne').text(sum2);
            }

            var num=$(this).prev().val();
            var id=$(this).parent().siblings('.pudc').children('.pudc_information').attr('id');
            $.ajax({
                type:"POST",
                url:"data/cart/update_count.php",
                data:{count:num,iid:id},
                success:function(result){
                    console.log(result);
                },
                error:function(){
                    alert("网络故障,请检查！");
                }

            })

        });
        //购物车中减操作*******************
        $("#content_box_body").on("click",".reduc",function(){
            $sum=0;
            var vals=$(this).next().val();
            vals--;
            if(vals<=0){
                return;
                //vals=1;
            }
            $(this).next().val(vals);
            $sum=(parseInt(vals).toFixed(2)*parseInt($(this).parent().prev().children().eq(1).children().eq(1).text()));
            $(this).parent().next().children().eq(1).text(Math.round($sum).toFixed(2));
            amountadd();
            if($(this).parent().siblings('.check').children('.Each').children().hasClass('true')){
                sum2--;
                $('.total').text(sum2);
                $('.totalOne').text(sum2);
            }
            var num=$(this).next().val();
            var id=$(this).parent().siblings('.pudc').children('.pudc_information').attr('id');
            $.ajax({
                type:"POST",
                url:"data/cart/update_count.php",
                data:{count:num,iid:id},
                success:function(result){
                    console.log(result);
                },
                error:function(){
                    alert("网络故障,请检查！");
                }

            })

        });
    }
//去结算
    var str = [];
    var totalPrice = 0;
    $('#go-buy').click(function(){
        var totalPrice = parseFloat($('.susumOne').html());
        if(totalPrice<=0){
            alert('请勾选您确定购买的商品！');
        }else {
            //location.href = 'order_confirm.html';
            alert('即将进入购物车!');
        }
    });




