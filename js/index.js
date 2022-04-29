$(function(){
    getUserInfo()
      let layer = layui.layer
    $('#btnLogout').on('click',function(){
        //提示用户是否确认退出
        layer.confirm('确认退出登录？', {icon: 3, title:'提示'}, function(index){
            //清空token，跳转登陆页面
            localStorage.removeItem('token')
            location.href = 'login.html'
            //关闭询问框
            layer.close(index)
          });
    })
    
   
})

//获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //header请求头配置对象
        // headers:{Authorization:localStorage.getItem('token')||''},
        success:function(res){
              if(res.status !== 0){
                  return layui.layer.msg('获取用户信息失败！')
              }
              //渲染用户的头像
              renderAvatar(res.data)
        }
    })
}

 //渲染用户的头像
 function renderAvatar(user){
    //渲染用户姓名
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //渲染用户头像
    if(user.user_pic !== null){
        //渲染图片头像
        $('.layui-nav-img').prop('src','user.user_pic').show()
        $('.text-avater').hide()
    }else{
        //渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0]
        $('.text-avater').html(first).show()
    }
}