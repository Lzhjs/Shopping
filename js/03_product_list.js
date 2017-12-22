/**
 * Created by web-01 on 2017/11/8.
 */
    function loadProductByPage(pno,pageSize){
        var kw=location.search.split("=")[1]||"";
        $.ajax({
            type:"GET",
            url:"data/04_products.php?kw="+kw,
            data:{pno:pno,pageSize:pageSize},
            success:function(pager){
                var html="";
                var rows=pager.data;
                console.log(rows);
                for(var i=0;i<rows.length;i++){
                    var obj=rows[i];
                    html+=`
                    <div>
                       <a href="07-product-detail.html?lid=${obj.lid}" class="md_img"><img src="${obj.md}" alt=""/></a>
                       <p class="detail">${obj.title}</p>
                       <p class="price">售价:￥${obj.price}</p>
                     </div>
                    `;
                }
                $("#product_list").html(html);

                var html = "";
                //上一页
                html+=`
                <li class="${pager.pno<=1?'disabled':''}">
                    <a href="${pager.pno>=2?pager.pno-1:1}">上一页</a>
                </li>
            `;
                if(pager.pno-2>0){
                    html += `<li><a href="#">${pager.pno-2}</a></li>`;
                }
                if(pager.pno-1>0){
                    html += `<li><a href="#">${pager.pno-1}</a></li>`;
                }
                html += `<li class="active"><a href="#">${pager.pno}</a></li>`;
                if(pager.pno+1<=pager.pageCount){
                    html += `<li><a href="#">${pager.pno+1}</a></li>`;
                }
                if(pager.pno+2<=pager.pageCount){
                    html += `<li><a href="#">${pager.pno+2}</a></li>`;
                }
                //下一页
                html+=`
                <li class="${pager.pno>=pager.pageCount?'disabled':''}">
                    <a href="${pager.pno<pager.pageCount?pager.pno+1:pager.pageCount}">下一页</a>
                </li>
            `;
                $(".pagination").html(html);
            },
            error:function(){
                alert("网络故障，！！请检查！");
            }
        });
}

loadProductByPage(1,16);
//为页码绑定点击事件-----用 事件代理机制 绑定点击事件
$(".pagination").on("click","li a",function(e){
    e.preventDefault();
    //$(this).addClass("active");
    var text=$(this).html();
    if(text=="上一页"||text=="下一页"){
        var pnop=$(this).attr("href");
        loadProductByPage(pnop,16);
    }else{
        var pno=$(this).html();
        loadProductByPage(pno,16);
    }

});