$(function() {
    //页面加载时协议显示
    /*  $(".argument-wrap").css({
         "display": "block"
     }); */
    //点击同意按钮时隐藏
    $("#agree-btn").click(function() {
        $(".argument-wrap").css({
            "display": "none"
        })
    });
    //点击协议×时跳转到商城首页
    $(".close-btn").click(function() {
        window.location.href = "index.html";
    });


    //表单操作
    //tel框获取焦点时显示提示，失去焦点时隐藏提示
    $(".tel").focus(function() {
        $(".tel-warn").css({
            "display": "block",
            "color": "rgb(153,153,153)"
        }).text("验证完成后，您可以使用该手机登录或找回密码");
    })
    $(".tel").blur(function() {
        if (/^1(3|4|5|6|7|8|9)\d{9}$/.test($(".tel").val())) {
            $(".tel-warn").css({
                "display": "none"
            });
            $("#right").css({
                "display": "block"
            });
        } else if ($(".tel").val() == "") {
            $(".tel-warn").css({
                "display": "none"
            });
            $("#right").css({
                "display": "none"
            });
        } else {
            $(".tel-warn").css({
                "color": "red"
            }).text("格式不正确，请输入正确的手机号。")
            $("#right").css({
                "display": "none"
            });
        }

    })

    //ver-code框失去焦点时显示提示
    $(".sec").blur(function() {
        $(".tel-warn").css({
            "display": "block",
            "color": "red"
        }).text("请输入注册手机！")
    })




    //密码框获取焦点时显示提示，失去焦点时隐藏提示
    $(".psd").focus(function() {
        $(".posi-warn").css({
                "display": "block"
            })
            //点击密码设置建议显示模块

    });
    $(".psd-sug-btn").mousedown(function() {
        $(".setpsd-sug").css({
            "display": "block"
        })
    });
    //点击密码建议×时隐藏模块
    $(".close-setpsd-sug").click(function() {
        $(".setpsd-sug").css({
            "display": "none"
        })

    });
    $(".psd").blur(function() {
        $(".posi-warn").css({
            "display": "none"
        })
    });

})