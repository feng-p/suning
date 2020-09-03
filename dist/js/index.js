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
        if ($(".seek-input").val() == "") {
            $("#seek-default").css({
                "display": "block"
            })
        } else {
            $("#seek-default").css({
                "display": "none"
            })
            $("#seek-search").css({
                "display": "block"
            })
        }

        $(".seek-input").bind('input propertychange', function() {
            if ($(".seek-input").val() == "") {
                $("#seek-default").css({
                    "display": "block"
                })
            } else {
                $("#seek-default").css({
                    "display": "none"
                })
                $("#seek-search").css({
                    "display": "block"
                })
            }
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

$(".contain-tit").children().children().click(function() {
    $(this).addClass("first-tit").siblings().removeClass("first-tit")
})


//返回顶部
$(function() {
    //划过
    $(".side-b").children().mouseover(function() {
        $(".side-b").children().children().css({
            "display": "block"
        }).stop().animate({
            "left": "-75px"
        }, 100)
    })
    $(".side-b").children().mouseleave(function() {
            $(".side-b").children().children().css({
                "display": "none"
            }).stop().animate({
                "left": "0px"
            }, 100)
        })
        //点击
    $(".side-b").children().click(function() {
        $('body,html').animate({
                scrollTop: 0
            },
            500);
        return false;
    })
})


//商品展示

$(function() {

        var uid = location.search.split("=")[1];
        var str = "";
        $.get("http://jx.xuzhixiang.top/ap/api/productlist.php", {
            uid: uid
        }, data => {
            var datas = data.data;
            for (let i = 0; i < datas.length; i++) {
                str += `
        <li>
            <a href="detail.html?pid=${datas[i].pid}" target="_black">
                <img src="${datas[i].pimg}" alt="">
                <p class="describe">${datas[i].pdesc}</p>
                <p class="price">￥&nbsp;<em>${datas[i].pprice}</em></p>
                <a class="cartbtn" prod-id=${datas[i].pid}></a>
            </a>
        </li>
        `;
            }
            $(".container ul").html(str);

            //加入购物车

            $(".cartbtn").click(function() {
                // console.log($(this).attr("prod-id"));
                $.get("http://jx.xuzhixiang.top/ap/api/add-product.php", {
                    uid: uid,
                    pid: $(this).attr("prod-id"),
                    pnum: 1
                }, data => {
                    // console.log(data);
                })
            })

        })

    })
    //跳转到购物车
$(function() {
    $("#cartLi").click(function() {
        var uid = location.search.split("=")[1];
        if (uid != undefined) {
            location.href = "cart.html?uid=" + uid;
        } else {
            location.href = "cart.html";
        }
    })
})

//给购物车添加数据
/* $(function() {
    $(".cartbtn").click = function() {
        console.log("a");
        var prodid = 123;
        var uid = location.search.split("=")[1];
        console.log(uid)
    }
}) */