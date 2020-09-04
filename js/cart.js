$(function() {
    //页面加载时把从接口获取到的购物车数据放到页面中
    var userid = location.search.split("=")[1];

    var str = '<div class="prod-tit"><div class="th-chk"><input type="checkbox" class="checkAll"><label for="">全选</label></div><div class="th th-item">商品信息</div><div class="th th-specs">规格</div><div class="th th-price">单价（元）</div><div class="th th-amount">数量</div><div class="th th-sum">小计（元）</div><div class="th th-op">操作</div></div>';
    // $(".cart-exist").html(str);
    $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", {
        id: userid
    }, data => {
        var datas = data.data;
        for (let i = 0; i < datas.length; i++) {
            str += `
            <div class="product-box">
            <div class="item-main">
                <div class="td td-chk form">
                    <input type="checkbox" class="checkOne">
                </div>
                <div class="td td-item clean">
                    <img src="${datas[i].pimg}" alt="">
                    <p>${datas[i].pdesc}</p>
                </div>
                <div class="td-specs"></div>
                <div class="td-price">${datas[i].pprice}</div>
                <div class="td-amout">
                    <div class="item-amount">
                        <span class="minus">-</span>
                        <input type="text" class="text-amount" value="${datas[i].pnum}">
                        <span class="plus">+</span>
                    </div>
                </div>
                <div class="td-sum">${(datas[i].pnum*datas[i].pprice).toFixed(2)}</div>
                <div class="td-del clean"><button class="del-btn" prod-id="${datas[i].pid}">删除</button></div>
            </div>
        </div>
        `;
        }
        $(".cart-exist").html(str + "");


        //购物车页面其他功能

        // console.log(Number($(".td-price").text()) * Number($(".text-amount").val()))


        //删除购物车商品

        $(".del-btn").click(function() {
            var userid = location.search.split("=")[1];

            $.get("http://jx.xuzhixiang.top/ap/api/cart-delete.php", {
                uid: userid,
                pid: $(this).attr("prod-id")
            }, data => {
                if (data.msg == "删除成功") {
                    $(this).parents(".product-box").remove();
                    getTotalprice();
                    var len = $(".checkOne:checked").length;

                    //判断

                    if (len == $(".checkOne").length) {
                        $(".checkAll").prop("checked", true);
                    } else {
                        $(".checkAll").prop("checked", false);
                    }
                }
            })

            //调用计算总价的方法

        })

        //全选

        //点击全选时所有复选框状态和全选的状态一直

        $(".checkAll").click(function() {
            $(".checkOne").prop("checked", $(".checkAll").prop("checked"));
            getTotalprice();


            if ($(".checkAll").prop("checked") == true) {
                $(".checkOne").parents(".item-main").css({
                    "background": "#FFFBF2"
                })
            } else {
                $(".checkOne").parents(".item-main").css({
                    "background": "#ffffff"
                })
            }


        })

        //点击单个复选框时，判断选中数量是否和li下的复选框长度一致
        //如果一致，选中全选的复选框，否则不选中

        $(".checkOne").click(function() {

            //获取到当前被选中的复选框的数量
            var len = $(".checkOne:checked").length;

            //判断

            if (len == $(".checkOne").length) {
                $(".checkAll").prop("checked", true);
            } else {
                $(".checkAll").prop("checked", false);
            }
            getTotalprice();
            if ($(this).prop("checked") == true) {
                $(this).parents(".item-main").css({
                    "background": "#FFFBF2"
                })
            } else {
                $(this).parents(".item-main").css({
                    "background": "#ffffff"
                })
            }
        })


        //数量变化
        //点击➖
        $(".minus").click(function() {
                var userid = location.search.split("=")[1];

                let numVal = $(this).next().val();
                numVal--;

                if (numVal < 1) {
                    numVal = 1;
                }
                $(this).next().val(numVal);

                //修改购物车数据

                $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                    uid: userid,
                    pnum: $(this).next().val(),
                    pid: $(this).parent().parent().next().next().children().eq(0).attr("prod-id")
                }, data => {
                    var pertotalPrice = $(this).next().val() * $(this).parent().parent().prev().text();
                    $(this).parent().parent().next().text(pertotalPrice.toFixed(2));
                })
                getTotalprice();
            })
            //点击➕
        $(".plus").click(function() {
                var userid = location.search.split("=")[1];

                let numVal = $(this).prev().val();
                numVal++;
                $(this).prev().val(numVal);

                //修改购物车数据

                $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                    uid: userid,
                    pnum: $(this).prev().val(),
                    pid: $(this).parent().parent().next().next().children().eq(0).attr("prod-id")
                }, data => {})
                var pertotalPrice = $(this).prev().val() * $(this).parent().parent().prev().text();
                $(this).parent().parent().next().text(pertotalPrice.toFixed(2));
                getTotalprice();
            })
            //文本框值
        $(".text-amount").change(function() {
            var userid = location.search.split("=")[1];

            var numVal = $(this).val();
            if (numVal <= 1) {
                numVal = 1;
            }
            $(this).next().val(numVal);

            //修改购物车数据
            // console.log($(this).val() * $(this).parent().parent().prev().text())

            $.get("http://jx.xuzhixiang.top/ap/api/cart-update-num.php", {
                uid: userid,
                pnum: $(this).val(),
                pid: $(this).parent().parent().next().next().children().eq(0).attr("prod-id")
            }, data => {})
            var pertotalPrice = $(this).val() * $(this).parent().parent().prev().text();
            $(this).parent().parent().next().text(pertotalPrice);
            getTotalprice();
        })
    })
})



//判断购物车数据是否为空，如果为空显示空页面，如果不为空显示购物车数据
$(function() {
    var userid = location.search.split("=")[1];

    $.get("http://jx.xuzhixiang.top/ap/api/cart-list.php", {
        id: userid
    }, data => {
        if (data.data.length == 0) {
            $(".cart-empty").css({
                "display": "block"
            });
            $(".cart-exist").css({
                "display": "none"
            });
            $(".checkout").css({
                "display": "none"
            });
        } else {
            $(".cart-empty").css({
                "display": "none"
            });
            $(".cart-exist").css({
                "display": "block"
            });
            $(".checkout").css({
                "display": "block"
            });
        }
    })
})


//计算总价
function getTotalprice() {

    //获取所有当前复选框被选中框的单个总价进行累加
    var totalPrice = 0;
    var checked = $(".checkOne:checked");
    for (var i = 0; i < checked.length; i++) {
        totalPrice += Number($(checked[i]).parents(".item-main").find(".td-sum").html());
    }
    $(".totalprice").html("￥" + totalPrice.toFixed(2));
}