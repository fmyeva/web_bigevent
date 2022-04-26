$(function(){
    //点击‘去注册’链接
  $('#link_reg').on('click',function(){
      $('.login-box').hide()
      $('.reg-box').show()
  })  
  //点击‘去登录’链接
  $('#link_login').on('click',function(){
    $('.login-box').show()
    $('.reg-box').hide()
}) 
    //从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    //密码自定义校验规则
    form.verify({
        pwd: [ /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
        //获取注册密码框的值
         let pwd = $('.reg-box [name=password]').val()
         //两个注册密码框值不一样
         if(pwd !== value){
             return '两次密码不一致！'
         }
        } 
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        let data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
            if(res.status !==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功！请登录！');
            $('#link_login').click()
        })
    })
       //监听登录表单的提交事件
       $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            //快速获取表单数据
            data:$(this).serialize(),
            success:function(res){
            if(res.status !== 0){
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功！');
           //将登陆成功得到的token字符串，保存到localStorage中
           localStorage.setItem('token',res.token)
            //登录成功跳到主页
            location.href = 'index.html'
        }
       })
    })
})