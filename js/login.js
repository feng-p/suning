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
            //判断用户名框是否为空，如果不为空出现×号
        if ($(this).val() != "") {
            $(this).next().next().css({
                "display": "block"
            });
        } else {
            $(this).next().next().css({
                "display": "none"
            });
        }
    })
    $("#password").focus(function() { //密码框
        $(".psdimg").css({
            "background": "url(../img/sprite1.png)-41px -67px no-repeat"
        })
    })
    $("#password").blur(function() {
        $(".psdimg").css({
            "background": "url(../img/sprite1.png)0 -108px no-repeat"
        });
        if ($(this).val() != "") {
            $(this).next().next().css({
                "display": "block"
            });
        } else {
            $(this).next().next().css({
                "display": "none"
            });
        }
    })

    //点击×时，清空对应输入框的值

    $(".clear").click(function() {
        $(this).prev().prev().val("").focus();
    })

    //点击登录时判断输入框的值，如果为空出现提示
    $("#login-btn").click(function() {
        var str = $("#password").val();
        if ($("#username").val() == "") {
            $(".login-wran").css({
                "display": "block"
            }).children("span").html("请输入用户名/邮箱/手机号！");
        } else if (str.length < 6) {
            $(".login-wran").css({
                "display": "block"
            }).children("span").html("请输入6-20位密码！");
        } else {
            $(".login-wran").css({
                "display": "none"
            });
        }
    })



























})