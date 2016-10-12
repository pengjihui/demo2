/**
 * Created by Administrator on 2016/9/17.
 */


$(function () {

    var $orderPriceS = $(".order-price span");
    var $orderNum = $(".order-num span");
    var $orderOldPrice = $(".order-old-price span");



    var $operation = $(".operation");

    var $settleNum = $(".settle-num");
    var $settlePrice = $(".settle-price");

    //获取cookie中的数据
    var $orderUl = $(".order-ul");
    var str = "";
    var arr =[];
    $.get("json/goods-list.json",function (data) {
        var oData  = data;
        for(var i = 0;i<40;i++){
            if($.cookie("id"+oData[i].id)!=null){
                str ='<li class="li-warp"> ' +
                    '<ul> ' +
                    '<li class="order"><img src="'+$.cookie("id"+oData[i].id+"img")+'"/></li> ' +
                    '<li class="order-name">'+oData[i].name+'</li> ' +
                    '<li class="order-spc">'+oData[i].num+''+oData[i].unit+'</li> ' +
                    '<li class="order-price"><span>'+oData[i].price+'</span></li> ' +
                    '<li class="order-num"><a class="minus" href="javascript:;">-</a><span>'+$.cookie("id"+oData[i].id+"num")+'</span><a class="plus" href="javascript:;">+</a></li> ' +
                    '<li class="order-old-price">￥<span>'+(parseFloat((oData[i].price).split("￥")[1]).toFixed(2)*$.cookie("id"+oData[i].id+"num")).toFixed(2)+'</span></li> ' +
                    '<li class="operation"><a href="javascript:;">删除</a> </li> ' +
                    '</ul> ' +
                    '</li>'
            console.log(str);
                arr.push(oData[i].id);

                $(str).appendTo($orderUl);

                $settleNum.html($.cookie("total"));
                $settlePrice.html($.cookie("val"));



            }
        }




        console.log(arr);
        //加减按钮被点击
//减
        var $minus = $(".minus");
        var $plus = $(".plus");
        $minus.each(function () {
            $(this).click(function () {
                var oP = $(this).parents(".li-warp");
                var tprice = parseFloat(oP.find(".order-price span").html().split("￥")[1]);
                var num = parseInt($(this).siblings("span").html());
                oP.find(".order-old-price span").html(num*tprice);
                var oldPrice = parseFloat(oP.find(".order-old-price span").html());

                var allNum = $.cookie("total");
                var allprice = parseFloat($settlePrice.html());
                if(num>1){
                num--;
                $(this).siblings("span").html(num);
                oldPrice = (tprice*num).toFixed(2);
                oP.find(".order-old-price span").html(oldPrice);
                allNum --;
                allprice = (allprice - tprice).toFixed(2);
                $settleNum.html(allNum);
                $settlePrice.html(allprice);
                var m = $(this).index(".minus");
                console.log(arr[m]);
                $.cookie("id"+arr[m]+"num",num);
                $.cookie("total",allNum);
                $.cookie("val",allprice);
                }
            });

        });


        $plus.click(function () {
            var oP = $(this).parents(".li-warp");
            var num = parseInt($(this).siblings("span").html()
            );
            var oldPrice = parseFloat(oP.find(".order-old-price span").html());
            var tprice = parseFloat(oP.find(".order-price span").html().split("￥")[1]);
            var allNum = $settleNum.html();
            var allprice = parseFloat($settlePrice.html());
            num++;
            $(this).siblings("span").html(num);
            oldPrice = (num*tprice).toFixed(2);
            console.log(oldPrice);
            oP.find(".order-old-price span").html(oldPrice);
            allNum ++;
            allprice = (allprice + tprice).toFixed(2);
            $settleNum.html(allNum);
            $settlePrice.html(allprice);
            $.cookie("total",allNum);
            $.cookie("val",allprice);

            var m = $(this).index(".plus");
            console.log(arr[m]);
            $.cookie("id"+arr[m]+"num",num);
        });


        //删除
        /*$(document).on("click",".operation a",function () {*/
        $(".operation a").click(function () {
            console.log($(this).parents(".li-warp"));
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
            $.cookie("id"+arr[n]+"img","",{expires:-1});


        });



    });







});
