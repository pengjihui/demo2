/**
 * Created by Administrator on 2016/9/13.
 */




    $(function () {
        //送货地区
        var $area = $(".area");
        var $globalArea = $(".global-area");
        var $jsBtn = $(".js-btn");
        var $jiangSu = $(".jiangsu");
        var $zjBtn = $(".zj-btn");
        var $zheJiang = $(".zhejiang");
        var $ahBtn = $(".ah-btn");
        var $angHui = $(".anghui");
        var $hbBtn = $(".hb-btn");
        var $heiBei = $(".hb-btn");
        var $gdBtn = $(".gd-btn");
        var $guangDong = $(".guangdong");
        //var Nm;
        //var $span = $(".span");
        var $areaP = $(".area-p");
        var $globalA = $(".global-area a");
        var len = $globalA.length;
        for(var i = 0;i<len;i++){
            $globalA.click(function () {
                /*  var Nm = $(this).text();
                if(Nm = "江苏") {
                    return;
                }else {*/
                    console.log(($(this).text()));
                    $areaP.text($(this).text())

            })
        }

        $area.mouseover(function () {
            $globalArea.show();
            $area.css({"background-color":"#fff"});
           // $span.css({"background-color":"#fff"});
        });
        $area.mouseout(function () {
            $globalArea.hide();
            $area.css({"background-color":"#eeeeee"});
           // $span.css({"background-color":"#eeeeee"});
        });

        $jsBtn.toggle(function () {
            $jiangSu.slideDown();
            $(".js-btn span").html("v");

        },function () {
            $jiangSu.slideUp();
            $(".js-btn span").html(">")
        });

        $zjBtn.toggle(function () {
            $zheJiang.slideDown();
            $(".zj-btn span").html("v");
        },function () {
            $zheJiang.slideUp();
            $(".zj-btn span").html(">");
        });

        $hbBtn.toggle(function () {
            $heiBei.slideDown();
            $(".hb-btn span").html("v");

        },function () {
            $heiBei.slideUp();
            $(".hb-btn span").html(">");

        });

        $gdBtn.toggle(function () {
            $guangDong.slideDown();
            $(".gd-btn span").html("v");

        },function () {
            $guangDong.slideUp();
            $(".gd-btn span").html(">");

        });
        $ahBtn.toggle(function () {
            $angHui.slideDown();
            $(".ah-btn span").html("V");

        },function () {
            $angHui.slideUp();
            $(".ah-btn span").html(">");

        });





        //果园公告
        var $noticeWarp = $(".notice-warp");
        var $notice = $(".notice");
        $noticeWarp.mouseover(function () {
            $notice.show();
            $noticeWarp.css({"background":"#fff"})
        });
        $noticeWarp.mouseout(function () {
            $notice.hide();
            $noticeWarp.css({"background":"#eeeeee"})
        })

        //手机果园
        var $phoneNotice = $(".phone-notice");
        var $phone = $(".phone");

        $phone.mouseover(function () {
            $phoneNotice.show();
            $phone.css({"background-color":"#fff"});
        });
        $phone.mouseout(function () {
            $phoneNotice.hide();
            $phone.css({"background-color":"#eee"});
        });

        //返回顶部
        var $gonTop = $(".go-top");
        $gonTop.click(function () {
            $("body,html").animate({"scrollTop":0});
        });



    });

