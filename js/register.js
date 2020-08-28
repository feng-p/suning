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
    //点击×时跳转到商城首页
    $(".close-btn").click(function() {
        window.location.href = "index.html";
    });
})