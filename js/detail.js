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