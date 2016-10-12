/**
 * Created by Administrator on 2016/9/19.
 */
//点击购物车 出现购物车中的商品
    $(function () {

        var $shoppingCar = $(".shopping-car");
        var $scar = $(".scar");
        var $span = $(".shopping-car .span");
        var $account = $(".account");

        $shoppingCar.toggle(function () {
            /*if(num == 0){
             }*/
            $account.slideDown();
            $account.click(function (event) {
                event.stopPropagation();
            });
            $shoppingCar.css({"background":"url('images/1.bmp') no-repeat "});
            $span.css({"background":"#f6ab00"});
            //if()
        },function () {
            $account.slideUp();
            $shoppingCar.css({"background":"url('images/2.bmp') no-repeat 1px center"} );
            $span.css({"background":"#64a131"})
        });

        console.log(window.location.search);
        var str = window.location.search;
        var str2 = "";
        var str3 = "";
        var arr = str.split("=");
        var $leftImg = $(".left-img");
        var $rightImg = $(".right-img");
        var $fspan = $(".f-span");
        var $h2 = $(".h2");
        var $much = $(".much");
        var $jin = $(".jin");

        $.ajax({
            type:"get",
            url:"json/goods-list.json",
            async:true,
            success:function(data) {
                $.each(data, function (index, obj) {
                    if (obj["id"] == arr[1]) {
                        str2 = '<img src="' + obj["img"] + '">' +
                            '<img src="images/goods-pro2.png">' +
                            '<img src="images/goods-pro3.png">' +
                            '<img src="images/goods-pro4.png">'

                        str3 = '<a href="javascript:;"><img src="' + obj["img"] + '"></a> ' +
                            '<a href="javascript:;"><img src="images/goods-pro2.png"></a> ' +
                            '<a href="javascript:;"> <img src="images/goods-pro3.png"></a> ' +
                            '<a href="javascript:;"><img src="images/goods-pro4.png"></a>'

                        $leftImg.html(str2);
                        $rightImg.html(str3);

                        $fspan.html(obj["name"]);
                        $h2.html(obj["name"]);
                        $much.html(obj["price"]);
                        $jin.html(obj["num"]+obj["unit"]);
                    }
                });
                //加减按钮









                var $proNum = $(".pro-num");

                //点击加入购物车
                $(document).on("click",".addC",function () {
                    var allNum =parseInt( $.cookie("total"))||1;
                    var thisNum = parseInt($proNum.html());
                   $.cookie("id"+arr[1]+"num",thisNum);
                    $.cookie("id"+arr[1],1);
                    var price = parseFloat($.cookie("id"+arr[1]+"price"))||parseFloat($much.html().split("￥")[1]);

                    var val = parseFloat($.cookie("val"));
                    $.cookie("val",val+price);
                    $.cookie("total",allNum+thisNum)

                });




                //选项卡
                var $btn = $(".left-img img");
                var $bimg = $(".right-img a");
                var $proImg  = $(".pro-message-img");
                $btn.eq(0).css({"height":"136px","width":"136px","border":"1px solid orange"});
                $bimg.eq(0).show().siblings().hide();
                var iNow = -1;
                $btn.mouseover(function () {
                    $(this).css({"height":"136px","width":"136px","border":"1px solid orange"}).siblings().css({"height":"138px","width":"138px","border":"none"});
                    $bimg.eq($(this).index()).show().siblings().hide();
                    iNow = $(this).index();
                });

                var timer = null;
                //轮播
                autoPlay();

                function autoPlay() {
                    clearInterval(timer);
                    timer =setInterval(function () {
                        iNow++;
                        $btn.eq(iNow%4).css({"height":"136px","width":"136px","border":"1px solid orange"}).siblings().css({"height":"138px","width":"138px","border":"none"});
                        $bimg.eq(iNow%4).show().siblings().hide();
                    },2000);
                }

                $proImg.mouseover(function () {
                    clearInterval(timer);
                });
                $proImg.mouseout(function () {
                    autoPlay();
                });

            }

        });





        //二维码
        var $yzm = $(".yzm");
        var $bigYzm = $(".big-yzm");
        $(document).on("mouseover",".yzm,.big-yzm",function () {
            $bigYzm.show();
        });
        $bigYzm.mouseout(function () {
            setTimeout(function () {
                $bigYzm.hide();
            },500);
        })

        //区域
        var $area2 = $(".area2");
        var $xzWarp = $(".xz-warp");
        var t = null;

        $area2.mouseover(function () {
            $xzWarp.show();
            clearTimeout(t);
        });
        $area2.mouseout(function () {
            t = setTimeout(function () {
                $xzWarp.hide();
            },1000)
        })

        var $buy =$(".buy");
        $buy.click(function () {

        });











        //加入购物车在页面固定定位
        console.log($(window).outerWidth());
        var $title = $(".goods-xq1 .title");
        var iH = $title.offset().top;
        $(window).scroll(function () {
            var $scrollTop = $(this).scrollTop();
            /*console.log($scrollTop);
            console.log(iH);*/
            if($scrollTop>=iH){
                $title.css({"position":"fixed","top":"0","left":"75px"})
            }else{
                $title.css({"position":""});
            }
        })






    });
