$(function() {


    //验证码登录区域鼠标移入事件
    $(".img-box").mouseenter(function() {
        $(".code").stop().animate({
            left: "0"
        }, 200, function() {
            $(".phone").css({
                "display": "block"
            })
        })
    })

    $(".img-box").mouseleave(function() {
        $(".code").stop().animate({
            left: "75"
        }, 200)
        $(".phone").css({
            "display": "none"
        })
    })

    //切换验证码登录和密码登录

    $(".scan-code-login").click(function() { //验证码登录
        $(".login-box-right").css({
            "display": "none"
        });
        $(".login-box-left").css({
            "display": "block"
        });
        $(this).addClass("outline").siblings().removeClass("outline");
    })
    $(".account-login").click(function() { //密码登录
        $(".login-box-right").css({
            "display": "block"
        });
        $(".login-box-left").css({
            "display": "none"
        });
        $(this).addClass("outline").siblings().removeClass("outline");
    })

    //表单操作

    //点击图标input获取焦点
    $(".userimg").click(function() {
        $("#username").focus();
    });
    $(".psdimg").click(function() {
        $("#password").focus();
    });

    //获取焦点时图片颜色变深,失去焦点时颜色变浅
    $("#username").focus(function() { //用户名框
        $(".userimg").css({
            "background": "url(../img/sprite1.png)-82px -67px no-repeat"
        })
    })
    $("#username").blur(function() {
        $(".userimg").css({
            "background": "url(../img/sprite1.png)-123px -67px no-repeat"
        })
    })
    $("#password").focus(function() { //密码框
        $(".psdimg").css({
            "background": "url(../img/sprite1.png)-41px -67px no-repeat"
        })
    })
    $("#password").blur(function() {
        $(".psdimg").css({
            "background": "url(../img/sprite1.png)0 -108px no-repeat"
        })
    })



























})