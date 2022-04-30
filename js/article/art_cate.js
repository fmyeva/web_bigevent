$(function(){
    let layer = layui.layer
    let form = layui.form
    initArtCateList()
    //获取文章分类的列表
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
             let htmlStr = template('tpl-table',res)
             $('tbody').html(htmlStr)
            }
        })
    }

      //为添加类别增加点击事件
      let indexAdd = null
    $('#btnAddCate').on('click',function(){
        //添加类别弹出层
        indexAdd =  layer.open({
                    type:1,
                    area:['500px','250px'],
                    title: '添加文章分类',
                    content: $('#dialog-add').html()})
    })

    //通过代理的形式为form-add表单绑定submit事件
    $('body').on('submit','#form-add',function(e){
          e.preventDefault()
          $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            //快读获取表单元素的数据
            data:$(this).serialize(),
            success:function(res){
             if(res.status !== 0){
                 return layer.msg('添加文章列表失败！')
             }
             layer.msg('添加文章列表成功！')
             //根据索引关闭弹出层
             layer.close(indexAdd)
             initArtCateList()
            }
        })
    })

    //通过代理的形式为btn-edit表单绑定点击事件
    let indexEdit = null
    $('tbody').on('click','#btn-edit',function(){
        //编辑类别的弹出层
indexEdit = layer.open({
            type:1,
            area:['500px','250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()})

       let id = $(this).attr('data-id')
       $.ajax({
        method:'GET',
        url:'/my/article/cates/' + id,
        success:function(res){
        form.val('form-edit',res.data)
        }
    })
})

    //通过代理的形式为btn-edit表单绑定submit事件
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
          method:'POST',
          url:'/my/article/updatecate',
          data:$(this).serialize(),
          success:function(res){
           if(res.status !== 0){
               return layer.msg('更新文章列表失败！')
           }
           layer.msg('更新文章列表成功！')
           //根据索引关闭弹出层
           layer.close(indexEdit)
           initArtCateList()
          }
      })
  })

  //通过代理的形式为表单绑定delete事件
  $('tbody').on('click','.btn-delete',function(){
    let id = $(this).attr('data-id')
    //提示用户是否删除
    layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            method:'GET',
            url:'/my/article/deletecate/' + id,
            success:function(res){
             if(res.status !== 0){
                 return layer.msg('删除文章列表失败！')
             }
             layer.msg('删除文章列表成功！')
             //根据索引关闭弹出层
             layer.close(index)
             initArtCateList()
            }
        })
      })
 
})
})