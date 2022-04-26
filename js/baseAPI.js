//每次调用$.get()、$.post()、$.ajax()的时候都会调用这个函数
//ajaxPrefilter函数可以拿到ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url
})