$(function(){
    let layer = layui.layer
    //获取裁剪区域的DOM元素
    let $image = $('#image')
    //配置选项
    const options = {
        //纵横比 1/1
        aspectRatio: 1,
        //指定预览区
        preview: '.img-preview'
    }
    //创建裁剪区域
    $image.cropper(options)

    //为上传按钮绑定点击事件,调用上传按钮的点击事件
    $('#btnChooseImage').on('click',function(){
    $('#file').click()
    })
    $('#file').on('change',function(e){
        //获取用户选择的图片
     let filelist = e.target.files
     if(filelist.length === 0){
         return layer.msg('请选择照片！')
        }
        // 拿到用户选择的文件
         let file = e.target.files[0]
        //  根据选择的文件，创建一个对应的url地址
          let imgURL =URL.createObjectURL(file)
          //重新初始化裁剪区域
          $image 
              .cropper('destroy') //销毁旧的裁剪区域
              .attr('src',imgURL) //重新设置图片路径
              .cropper(options)   //重新初始化裁剪区域
    })
    //为确定按钮绑定点击事件
    $('#btnUpload').on('click',function(){
        //拿到用户裁剪之后的头像
        let dataURL = $image
        .cropper('getCroppedCanvas',{
            //创建一个Canvas画布
            width:100,
            height:100
        })
        //将Canvas画布上的内容，转化为base64格式的字符串
        .toDataURL('image/png')
        //调用接口，把头像上传到服务器
        $.ajax({
            method:'POST',
            url:'/my/update/avatar',
            data:{
                avatar: dataURL
            },
            success:function(res){
              if(res.status !== 0){
                  return layer.msg('更新用户信息失败！')
              }
                  layer.msg('更新用户信息成功！')
              //调用父页面中的方法，重新渲染用户的头像和用户的信息
            window.parent.getUserInfo()
            }
        })

    })
})