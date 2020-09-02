//放大镜
$(function() {
    $(".middle").mouseover(function() {
            // 鼠标移入时放大镜和大图区域显示
            $(".min").css({
                "display": "block"
            });
            $(".max").css({
                "display": "block"
            });
            $(".middle").mousemove(function(e) {
                var evt = e || event;

                var l = evt.pageX - $(".middle").offset().left;
                var t = evt.pageY - $(".middle").offset().top;
                // console.log(l, t);
                var x = l - $(".min").innerWidth() / 2;
                var y = t - $(".min").innerHeight() / 2;
                // console.log(x, y)
                //判断临界值
                // console.log($(".middle").outerWidth());  //402
                //console.log($(".min").outerWidth()); //200

                var maxX = $(".middle").outerWidth() - $(".min").outerWidth();
                var maxY = $(".middle").outerHeight() - $(".min").outerHeight();
                var minX = $(".middle").position().left;
                var minY = $(".middle").position().top;
                x = x > maxX ? maxX : x < minX ? minX : x;
                y = y > maxY ? maxY : y < minY ? minY : y;

                //放大镜跟着鼠标走
                // console.log(x, y);
                $(".min").css({
                    "left": x + "Px",
                    "top": y + "Px"
                });
                //大图定位置跟鼠标移动方向相反
                // 比例：  .min的offsetleft/.middle的宽高 = .max的offsetleft / .max的宽高
                var L = -$(".min").position().left * $(".max").children("img").outerWidth() / $(".middle").outerWidth();
                var T = -$(".min").position().top * $(".max").children("img").outerHeight() / $(".middle").outerHeight();
                // console.log(L, T);

                //大图的位置
                $(".max").children("img").css({
                    "left": L + "px",
                    "top": T + "px"
                })

            })

        })
        //移出时影藏
    $(".middle").mouseout(function() {
        $(".min").css({
            "display": "none"
        });
        $(".max").css({
            "display": "none"
        });
    })
})


//详情页获取商品信息
$(function() {
    var pid = location.search.split("=")[1];
    $.get("http://jx.xuzhixiang.top/ap/api/detail.php", {
        id: pid
    }, data => {
        var datas = data.data;
        var str = "";
        str += `
            <p class="tit">${datas.pdesc}</p>
            <p class="price"><span>￥</span>${datas.pprice}</p>
            <p class="num"><em>数量</em><span>-</span><input type="text" value="1"><span>+</span></p>
            <p class="join-cart"><input type="button" value="立即购买"><input type="button" value="加入购物车" id="joinBtn" prodid=${datas.pid}></p>
        `;
        $(".detail-message").html(str);
        var str1 = "";
        str1 += `
            <img src="${datas.pimg}" alt="">
        `;
        $(".max").html(str1);
        var str2 = "";
        str2 += `
        ${datas.pimg}
        `;
        // console.log();
        $(".middle").children().eq(0).attr("src", str2);
        //详情页加入购物车

        //数量减少按钮
        $(".num").children("span").eq(0).click(function() {
            let numVal = $(this).next().val();
            numVal--;
            if (numVal <= 1) {
                numVal = 1;
            }
            $(this).next().val(numVal);
        })

        //数量zengjia按钮
        $(".num").children("span").eq(1).click(function() {
            let numVal = $(this).prev().val();
            numVal++;
            $(this).prev().val(numVal);
        })

        //点击加入购物车调用加入购物车接口
        $(".join-cart").children().eq(1).click(function() {
            // console.log($(".num").children("input").val())
            $.get("http://jx.xuzhixiang.top/ap/api/add-product.php", {
                uid: 38652,
                pid: pid,
                pnum: $(".num").children("input").val()
            }, data => {
                console.log(data);
                if (data.msg == "插入成功" || data.msg == "修改成功") {
                    alert("成功加入购物车");
                } else {
                    alert("添加失败");
                }
            })
        })

        //查询购物车数据
        // $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", {
        //     id: 38652
        // }, data => {
        //     console.log(data);
        // })


        //跳转到购物车
        $("#cartLi").click(function() {
            location.href = "cart.html";
        })
    })
})