/**
 * Created by web-01 on 2017/10/14.
 */
(()=>{
    ajax("get","03-footer.html","","text").then(html=>{
        document.getElementById("footer").innerHTML=html;
        //console.log(html);
    });

})();