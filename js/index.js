//轮播
$(function() {
        var num = 0;
        slider(); //确保页面加载五秒后开始执行
        var timer = null;
        timer = setInterval(function() {
            slider();
        }, 5000);

        //鼠标划入图片区控制计时器

        $("#slider img").mouseover(function() {
            clearInterval(timer);
        });

        //鼠标移出开启定时器，按钮小时
        $("#slider img").mouseout(function() {
            timer = setInterval(function() {
                slider();
            }, 5000)
        });
        $(".toggle-btn-r").click(function() {
            slider();
        });
        $(".toggle-btn-l").click(function() {
            num -= 2;
            slider();
        });

        function slider() {
            num++;
            //临界值控制
            if (num == 3) {
                num = 0;
            }
            if (num == -1) {
                num = 2;
            }
            // 图片切换
            $("#slider img").eq(num).stop().animate({
                "opacity": 1
            }, 500);
            $("#slider img").eq(num).siblings().stop().animate({
                "opacity": 0
            }, 500);
            $(".slider-num span").eq(num).addClass("num-white").siblings().removeClass("num-white");
        }
    })
    //首页顶部的效果
$(function() {
    //下拉菜单
    $(".drop").mouseenter(function() {
        $(this).css({
            "background": "#ffffff",
            "border-bottom": "solid 1px #ffffff"
        })
        $(this).children(".icon-arrow").toggleClass("icon-arrow-top")

    })
    $(".drop").mouseleave(function() {
        $(this).css({
            "background": "#f5f5f5",
            "border": "none",
        })
        $(this).children(".icon-arrow").toggleClass("icon-arrow-top")
    })
    $(".drop").click(function() {
            $(this).children(".droplist").toggle();
            $(this).children(".shangjiat").toggle();
            $(this).children(".server").toggle();
            $(this).children(".icon-arrow").toggleClass("icon-arrow-top")
        })
        //搜索框下拉
    $(".seek-input").focus(function() {
        $(".seek-drop").css({
            "display": "block"
        })
        $("#seek-default").css({
            "display": "block"
        })
        $(".seek-input").bind('input propertychange', function() {
            $("#seek-default").css({
                "display": "none"
            })
            console.log($(".seek-input").val());
        })

    })
    $(".seek-input").blur(function() {
        $(".seek-drop").css({
            "display": "none"
        })
    })
    $(".seek-drop").mouseenter(function() {
        $(".seek-input").blur(function() {
            $(".seek-drop").css({
                "display": "block"
            })
        })
    })
    $("#drop-close").click(function() {
        $(".seek-drop").css({
            "display": "none"
        })
    })


})