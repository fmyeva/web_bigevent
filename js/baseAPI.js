//每次调用$.get()、$.post()、$.ajax()的时候都会调用这个函数
//ajaxPrefilter函数可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url

    if(options.url.indexOf('/my/') !== -1 ){
        //统一为有权限的接口设置headers请求头
    options.headers = {Authorization:localStorage.getItem('token')||''}
    }
            //全局统一挂载
            //无论成功还是失败最终都会调用complete函数
            //在回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
     options.complete = function(res){
                if(res.responseJSON.status === 1 && res.responseJSON.message === '身份验证失败！')
                //强制清空token，跳转登录页面
                localStorage.removeItem('token')
                location.href = 'login.html'
            }
    
})