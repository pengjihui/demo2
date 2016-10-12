/**
 * Created by Administrator on 2016/9/18.
 */

/*var d=new Date();
d.setDate(d.getDate()+30);
document.cookie = "name="+"yuanyuan"+";path=/;expires="+d+";"*/



$(function () {
    $sjh = $(".sjh");
    $mima = $(".mima");
    $check = $(".check");
    $check.click(function () {
        if($check.prop("checked")) {
                $.cookie("手机号",$sjh.val());
                $.cookie("密码",$mima.val());

        }else {

        }
    })
    $sjh.val($.cookie("手机号"));
    $mima.val($.cookie("密码"));

});
