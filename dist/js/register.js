$(function() {
    //页面加载时协议显示
    $(".argument-wrap").css({
        "display": "block"
    });
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

    //tel框
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

    //ver-code框

    //ver-code框失去焦点时显示提示
    $(".sec").blur(function() {

            //电话狂为空时显示输入手机
            if ($(".tel").val() == "") {
                $(".tel-warn").css({
                    "display": "block",
                    "color": "red"
                }).text("请输入注册手机！")
            } else if (/^1(3|4|5|6|7|8|9)\d{9}$/.test($(".tel").val())) {
                if (/\d{4}/.test($(".sec").val())) {
                    $(".tel-warn").css({
                        "display": "none"
                    })
                    $(".ver-code-warn").css({
                        "display": "none"
                    })
                } else if ($(".sec").val() == "") {
                    $(".ver-code-warn").css({
                        "display": "none"
                    })
                } else {
                    $(".ver-code-warn").css({
                        "display": "block"
                    })
                }
            } else {
                $(".tel-warn").css({
                    "color": "red"
                }).text("格式不正确，请输入正确的手机号。")
                $(".ver-code-warn").css({
                    "display": "none"
                })
            }

        }

    )

    $(".psd").bind('input propertychange', function() {
        var str = $(".psd").val();
        if (str.length >= 6) {
            $(".psd-length").css({
                "display": "block"
            });
            psdstrength(str);

        } else {
            $(".psd-length").css({
                "display": "none"
            });
        }
    });


    //密码框获取焦点时显示提示，失去焦点时隐藏提示
    $(".psd").focus(function() {
        var str = $(".psd").val();
        if (str.length >= 6) {
            $(".psd-length").css({
                "display": "block"
            });
            psdstrength(str);
        }
        $(".posi-warn").css({
            "display": "block",
            "color": "#999999"
        }).html("6-20个字符，由字母、数字和符号的两种以上组合。")
    })


    $(".psd").blur(function() {
        var str = $(".psd").val();
        $(".posi-warn").css({
            "display": "none"
        });
        if (str.length == 0) {
            $(".psd-length").css({
                "display": "none"
            })
            $(".psd-length>p").css({
                "background": "#cacaca"
            });
        } else if (str.length > 0 && str.length < 6) {
            $(".psd-length").css({
                "display": "none"
            });
            $(".posi-warn").css({
                "display": "block",
                "color": "red"
            }).html("请输入6-20位密码！");

        }

    });


    //密码框附加操作
    //点击密码设置建议显示模块
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


    //密码强度判断
    function psdstrength(val) {
        var flag1 = false,
            flag2 = false,
            flag3 = false;

        for (let i = 0; i < val.length; i++) {

            if (/\d/.test(val[i]) && flag1 == false) { //数字
                flag1 = true;
            }
            if (/[a-zA-Z]/.test(val[i]) && flag2 == false) {
                flag2 = true;
            }
            if (/(?=[\x21-\x7e]+)[^A-Za-z0-9]/.test(val[i]) && flag3 == false) {
                flag3 = true;
            }
        }
        if (flag1 && flag2 && flag3) {
            $(".psd-length>p").eq(0).css({
                "background": "#ffaa00"
            });
            $(".psd-length>p").eq(1).css({
                "background": "#ffaa00"
            });
            $(".psd-length>p").eq(2).css({
                "background": "#ffaa00"
            })
        } else if (flag1 && flag2 || flag1 && flag3 || flag2 && flag3) {
            $(".psd-length>p").eq(0).css({
                "background": "#ffaa00"
            });
            $(".psd-length>p").eq(1).css({
                "background": "#ffaa00"
            });
        } else {
            $(".psd-length>p").eq(0).css({
                "background": "#ffaa00"
            });
        }
    }

})


//注册接口

$(function() {
    $(".btn input").click(function() {
        if (/^1(3|4|5|6|7|8|9)\d{9}$/.test($(".tel").val()) && /\d{4}/.test($(".sec").val()) && /.{6,18}/.test($(".psd").val())) {
            $.get("http://jx.xuzhixiang.top/ap/api/reg.php", {
                username: $(".tel").val(),
                password: $(".psd").val()
            }, data => {
                console.log(data);
                if (data.msg == "注册成功") {
                    alert("注册成功，点击确定登录");
                    location.href = "login.html";
                } else if (data.msg == "用户名已经存在") {
                    alert("用户名已存在")
                } else {
                    alert("注册失败");
                }
            })
        }
    })
})