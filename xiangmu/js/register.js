/**
 * Created by Administrator on 2016/9/17.
 */
$(function () {
    var $phone1 = $(".phone1");
    var $password = $(".password");
    var $cpassword = $(".c-password");
    var $codeIn = $(".code-in");
    var $code = $(".code");

    var $cRight = $(".c-right");
    var $cFalse = $(".c-false");
    var $pRight = $(".p-right");
    var $pFalse = $(".p-false");
    var $qRight = $(".q-right");
    var $qFalse = $(".q-false");
    var $codeIR = $(".codeI-right");
    var $codeIF = $(".codeI-false");
    var $codeR  = $(".code-right");
    var $codeF  = $(".code-false");

    var $refresh = $(".refresh");
    var $yzm = $(".yzm");

    //验证码

  /*  $refresh.click(function () {*/
  toCode();

      $(document).on("click",".refresh,.yzm",function () {
         toCode();
      });
    function toCode() {
        var arr = [0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        var n1 = Math.floor(Math.random()*255);
        var n2 = Math.floor(Math.random()*255);
        var n3 = Math.floor(Math.random()*255);
        var str = "";
        for(var i = 0;i<4;i++){
            var m = Math.floor(Math.random()*62);
            str +=arr[m];
        }

        $yzm.css({"color":"rgb("+n1+","+n2+","+n3+")"});
        $yzm.html(str);

    }


    //输入验证
    var $btn1 = $(".btn1");
    var $btn2 = $(".btn2");
    var reg = /^1+[3578]+\d{9}$/;
    var reg2 = /^\d{6,20}$/;

    //获取所有的span
    var $span = $(".right span");
    //console.log($span);
    //输入框获取焦点
    var $input = $(".right input");
    //console.log($input);
    $input.focus(function () {
        //console.log($(this).index("input"));
        var index = $(this).index("input");
        $span.eq(2*index).hide();
        $span.eq(2*index+1).hide();
        $(this).css({"border-color":"#6ca232"},{"box-shadow":"0 0 4px 2px rgba(0,230,0,0.75)"}).parents().siblings().find("input").css({"border-color":"#ccc"});
    });
    //失去焦点
    $input.blur(function () {
        $(this).css({"border-color":"#ccc"})
    });



    //点击发送验证码
    var timer;
    var $callCode = $(".call-code");
    var $surplusTime = $(".surplus-time");
    var $countDown = $(".surplus-time span")
    $callCode.click(function () {
        clearInterval(timer);
        if($phone1.val()==""||reg.test($phone1.val())==false){
            $cFalse.show();
            $phone1.css({"border-color":"red"})
        }else if($codeIn.val()!=$yzm.html()){
            $codeIF.show();
            $codeIn.css({"border-color":"red"});
            toCode();
            }else if($cpassword.val()!=$password.val()||$cpassword.val()==""||$password.val()==""){
            $pFalse.show();
            $password.css({"border-color":"red"})
            $qFalse.show();
            $cpassword.css({"border-color":"red"})
        }else {
            $callCode.hide();
            $surplusTime.show();

            var t = 60;
            console.log(typeof t);
           timer =  setInterval(function () {
                t--;
               if(t<=10&&t>0){
                   $countDown.css({"color":"red"});
               }
               $countDown.html(t);
                if(t<=0){
                    t = 60;
                    clearInterval(timer);
                    $surplusTime.hide();
                    $callCode.show()
                }
            },1000)
        }


    });

    //点击注册按钮
    var $prmptWarp1 = $(".prompt-warp1");
    var $prmptWarp2 = $(".prompt-warp2");
    var $prompt = $(".prompt");
    var $cha = $(".cha");
    $btn2.click(function () {
        if($phone1.val()==""||reg.test($phone1.val())==false){
            $cFalse.show();
            $phone1.css({"border-color":"red"})
        }else{
            $cFalse.hide();
            $cRight.show();
        }
        if($password.val() == ""||(reg2.test($password.val() )== false)){
            $pFalse.show();
            $password.css({"border-color":"red"})
        }else{

            $pRight.show()
        }
        if($cpassword.val()!=$password.val()||$cpassword.val()==""){
            $qFalse.show();
            $cpassword.css({"border-color":"red"})
            $prmptWarp1.show();
            $prmptWarp2.show();
        }else {
            $qRight.show();
        }
        if($codeIn.val()!=$yzm.html()){
            $codeIF.show();
            $codeIn.css({"border-color":"red"})
            toCode();
        }else{
            $codeIR.show();
        }

        if($code.val() == ""||$code.val() == "发送手机验证码"){
            $code.css({"border-color":"red"});
            $codeF.show();
        }else{

        }

    });

    //点击X时

    $cha.toggle(function () {
        $prmptWarp2.css({"background":"rgba(0,0,0,0)"})},
            function () {
                $prmptWarp2.css({"background":"rgba(0,0,0,0.4)"});
                $prmptWarp1.hide();
                $prmptWarp2.hide();
            }
    );






});