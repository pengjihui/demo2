/**
 * Created by Administrator on 2016/9/16.
 */

$(function () {

    //商品列表
    var $list = $(".list");
    var str = "";
    var $span = $(".shopping-car .span");

    $.get("json/goods-list.json",function (data) {
        oData = data;
        //console.log(oData);
        for(var i = 0;i<oData.length;i++){
        str += '<li>' +
            '<a href="goods-pro.html?id='+oData[i].id+'"><img src="'+oData[i].img+'" /></a>' +
            '<div class="foots">' +
                '<span class="f-name">'+oData[i].name+'</span>' +
                '<span class="f-price">'+oData[i].price+'</span>' +
            '</div>' +
            '<div class="foots-num">' +
                '<span class="f-num"><span>'+oData[i].num+'</span>'+oData[i].unit+'</span>' +
                '<span class="car" data-id="'+oData[i].id+'"></span>' +
            '</div>' +
            '</li>'
        }
        $(str).appendTo($list);


        var s ;
        var $addCarWarp = $(".addCar-warp");
        var $Ul = $(".account-ul");
        var $sPrice = $(".s-price");
        var val  =parseInt($.cookie("val"))||$sPrice.text().split("￥")[1];
        var $addPrice = $(".add-price");
        var total =parseInt($.cookie("total"))|| 0;
        //点击购物车 加入购物车
        var str1 = $.cookie("str") || "";

        $span.html($.cookie("total"));
        var $setSpan = $(".settle-span");
        $setSpan.html($.cookie("total"));
        $addPrice.html($.cookie("val"));
        $Ul.html(str1);

        // var thisNum = $(".this-num");
        // //定义数组存取下标
        // var arr = ($.cookie("arr"))||[];
        // var arr1 = $.cookie("arr");
        // console.log(arr1);
        // console.log(arr);
        // for(var i = 0;arr.length;i++){
        //      var tNum = $.cookie("id"+arr[i]+"num");
        //
        //     thisNum.eq(i).html(tNum) ;
        // }


        $(".car").each(function () {
            var num = $.cookie("id"+$(this).attr("data-id")+"num")||0;

            $(this).click (function () {
                num = $.cookie("id"+$(this).attr("data-id")+"num")||0;
                console.log($.cookie("val"))
                val  =($.cookie("val"))||$sPrice.text().split("￥")[1];
                console.log(val);
                str1 = $.cookie("str") || "";
                total =parseInt($.cookie("total"))|| 0;
               total++;
                //console.log($(this));
                s = $(this).parents("li").index();
                var oPrice = oData[s].price.split("￥")[1];
                //console.log(typeof parseFloat(oPrice));
                val =(parseFloat(val) +parseFloat(oPrice)).toFixed(2);
                //console.log(val);
                $sPrice.text("￥"+val);
                $addPrice.text(val);
                var li = $(this).parents("li");
                console.log(li);
                $addCarWarp.show();

                $.cookie("id"+$(this).attr("data-id")+"img",oData[s].img);
                $.cookie("id"+$(this).attr("data-id")+"price",oData[s].price);
                $.cookie("id"+$(this).attr("data-id")+"name",oData[s].name);
                if($.cookie("id"+$(this).attr("data-id"))==null){
                   /* arr.push($(this).attr("data-id"));*/
                    $.cookie("id"+$(this).attr("data-id"),{expires:30,path:'/'});
                    $.cookie("id"+$(this).attr("data-id")+"num",++num);
                    str1 += '<li class="all-li" data-id="'+$(this).attr("data-id")+'">' +
                        '<img src="'+$.cookie("id"+$(this).attr("data-id")+"img")+'">' +
                        '<div class="product"> ' +
                        '<p class="p-name">'+$.cookie("id"+$(this).attr("data-id")+"name")+'</p>' +
                        '<p class="p-price">'+$.cookie("id"+$(this).attr("data-id")+"price")+'</p>' +
                        '<div class="dibu" ><div class="amount">' +
                        '<button class="num-minus">-</button><span class="this-num">'+$.cookie("id"+$(this).attr("data-id")+"num")+'</span><button class="num-plus">+</button>' +
                        '</div>' +
                        '<a class="delete" href="###">删除</a>' +
                        '</div>' +
                        '</div>' +
                        '</li>';
                    $.cookie("str",str1);
                    $.cookie("arr",arr);
                    $Ul.html(str1);
                    console.log(str1);

                }else {
                    $.cookie("id"+$(this).attr("data-id")+"num",++num);
                }

                $.cookie("total",total);
                $.cookie("val",val);
                total = parseInt($.cookie("total"))||total;
                /*if(total){
                    $span.text($.cookie("total"));
                }*/

                var X = $("#x");
                var btn1 = $("#btn");


                X.click(function () {
                    $addCarWarp.hide();
                    $span.text(total);
                    return false;
                });
                btn1.click(function () {
                    $addCarWarp.hide();
                    $span.text(total);
                    return false;
                });

                var $num = $(".num");
                $num.text(total);
                $setSpan.text(total);



                $.cookie("total",total);
                $.cookie("val",val);
                var thisNum = $(".this-num");
                var $allLi = $(".all-li");
                for(var i = 0;i<$allLi.length;i++ ){
                    if($allLi.eq(i).attr("data-id") ==$(this).attr("data-id") ){
                        thisNum.eq(i).html($.cookie("id"+$allLi.eq(i).attr("data-id")+"num"));
                        console.log(i+$.cookie("id"+$allLi.eq(i).attr("data-id")+"num"));

                    }
                }


                //删除商品
                //var $pPrice = $(".p-price");
                var oDelete = document.getElementsByClassName("delete");
                for(var i = 0;i<oDelete.length;i++){

                    oDelete[i].index = i;
                    oDelete[i].onclick = function () {

                        /*alert(1);*/
                        var id = $(this).parents(".all-li").attr("data-id");
                        var num = parseInt($.cookie("total"))-parseInt($.cookie("id"+id+"num"));

                        var val = parseFloat($.cookie("val"))-(parseFloat($.cookie("id"+id+"price").split("￥")[1]))*(parseInt($.cookie("id"+id+"num"))).toFixed(2);
                        if(num == 0){
                            val =0;
                        }

                        $addPrice.html(val);
                        $setSpan.html(num);
                        $span.html(num);
                        $.cookie("total",num);
                        $.cookie("val",val);
                        $(this).parents("li").remove();
                        $.cookie("str",$Ul.html());
                        $.cookie("id"+id,"",{expires:-1});
                        $.cookie("id"+id+"num","",{expires:-1});
                        $.cookie("id"+id+"price","",{expires:-1});
                        $.cookie("id"+id+"name","",{expires:-1});
                        $.cookie("id"+id+"img","",{expires:-1});
                        /* console.log($(this).parents(".all-li").html());
                         console.log((str1.split($(this).parents(".all-li").html()))[0]);*/
                        //str1.replace((this).parents("li").html(),"");

                        /*console.log($.cookie("str"));*/
                    };

                    /* console.log($(this).parents(".li-warp"));
                     var n =  $(this).index(".operation a");
                     var num = parseInt($.cookie("total"))-parseInt($.cookie("id"+arr[n]+"num"));
                     console.log(num);
                     $settleNum.html(num);
                     var val = parseFloat($.cookie("val"))-(parseFloat($.cookie("id"+arr[n]+"price").split("￥")[1]))*(parseInt($.cookie("id"+arr[n]+"num"))).toFixed(2);
                     $settlePrice.html(val);
                     $.cookie("total",num);
                     $.cookie("val",val);
                     $(this).parents(".li-warp").remove();
                     $.cookie("id"+arr[n],"",{expires:-1});
                     $.cookie("id"+arr[n]+"num","",{expires:-1});
                     $.cookie("id"+arr[n]+"price","",{expires:-1});
                     $.cookie("id"+arr[n]+"name","",{expires:-1});
                     $.cookie("id"+arr[n]+"img","",{expires:-1});*/




                }

            });





        });






    });

    //点击购物车 出现购物车中的商品
    var $shoppingCar = $(".shopping-car");
    var $scar = $(".scar");

    var $account = $(".account");


    $shoppingCar.toggle(function () {
        /*if(num == 0){
         }*/
        //alert(1);
        $account.slideDown();
        $account.click(function (event) {
            event.stopPropagation();
        })
        $shoppingCar.css({"background":"url('images/1.bmp') no-repeat "});
        $span.css({"background":"#f6ab00"});
        //if()
    },function () {
        $account.slideUp();
        $shoppingCar.css({"background":"url('images/2.bmp') no-repeat 1px center"} );
        $span.css({"background":"#64a131"})
    });




    //点击加减按钮
    var $allLi = $(".all-li");
    $(document).on("click",".num-minus",function () {
        var $pPrice = $(".p-price");
        var $numMinus = $(".num-minus");
        var $numPlus = $(".num-plus");



        var $thisNum = $(this).parents(".all-li").find(".this-num");
        if(parseInt($thisNum.html())>1){
            $thisNum.html(parseInt($thisNum.html())-1);
            val = (val-parseFloat($(this).parents("li").find($pPrice).html().split("￥")[1])).toFixed(2);
            $addPrice.html(val);
        }
    });

    /*$numPlus.click(function () {
        var $thisNum = $(this).parents(".all-li").find(".this-num");
        $thisNum.html(parseInt($thisNum.html())+1);
        console.log(typeof parseFloat(val));
        val = (parseFloat(val)+parseFloat($(this).parents("li").find($pPrice).html().split("￥")[1])).toFixed(2);
        console.log(val);
        $addPrice.html(val);
    });
*/









});