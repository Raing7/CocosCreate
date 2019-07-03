# CocosCreate
# CocosCreate开发拓展工具
# CocosCreate网络请求拓展方法，封装原生xhr方法，封装wx.request 拓展CocosCreate loadImg方法
# author:Raing7
# QQ:837167752
# 邮箱:837167752@qq.com
# 有什么比较好用的功能可以继续添加


# 安装
将CRReust.js放入CocosCreate工程内

# 使用

# cc.ajax

实现
XMLHttpRequest 

调用方法
cc.ajax({
  url:"www.baidu.com",      | string,  //接口地址  
  method:"get || post",     | string,  //默认值get 后台接受数据的方式 可以使用method设置提交方式也可以使用type  
                                         设置提交方式 值可以为 post||POST||get||GET   
  type:"get || post",       | string,  //默认值get 另外一种设置后台接受数据的方式 method跟type选择其中一个即可,   
                                         method的优先级高于type  
  data:{k,v},               | object,  //提交到后台的数据 GET方式也可在这里设置，会自动拼接到url中，post发送数据时会优先使用formData的方式  
                                       上传数据  
  debug:true,               | bool,    //是否开启调试 默认值false,设置为ture可输出本次请求的信息  
  success(res){console.log(res)},   |function,    //请求执行成功的回调方法，res为后台返回的数据 如后台返回的数据为json格式的字符串，  
                                                  自动转换成object,不为json时，原样输出  
  #fail(res){console.log(res)}       |function,    //请求失败的回调方法，res为请求失败的原因  
  #timeout(){}                       |function,    //请求超时的回调方法，无接受参数  
})

以上就是cc.ajax的调用方法， 跟jquery的调用方法基本一样，应该不难懂，没有添加请求完成的complete方法，在开发的项目中没有用到，就懒得加了,在cocosCreate中浏览器运行使用cc.ajax如果出现跨域问题，请后台配合一下 加一个允许所有访问，（PHP）百度搜索 PHP解决跨域 使用客户端 不会出现跨域问题，只有在浏览器中才会出现跨域问题。

# wxs.ajax

实现
wx.request

调用方法
wxs.ajax({
  url:"www.baidu.com",        | string,  //接口地址
  method:"get || post",       | string,  //默认值get 后台接受数据的方式 可以使用method设置提交方式也可以使用type
                                         设置提交方式 值不为post || POST 值自动设置为get
  type:"get || post",         | string,  //默认值get 后台接受数据的方式 可以使用method设置提交方式也可以使用type
                                         设置提交方式 值不为post || POST 值自动设置为get
  data:{k,v},                 | object,  //提交到后台的数据 GET方式也可在这里设置，会自动拼接到url中
  loading:true,               | bool,    //默认为false 设置为true是发送请求时会自动调用wx.showLoading,请求完成时自动关闭
  success(res){console.log(res)},   |function,    //请求执行成功的回调方法，res为后台返回的数据 如后台返回的数据为json格式的字符串，
                                                  自动转换成object,不为json时，原样输出
  fail(res){console.log(res)}       |function,    //请求失败的回调方法，res为请求失败的原因
})

# cc.loadImg

实现
cc.loader.load

调用方法
cc.loadImg({
  url:"www.baidu.com/image.png",  |string    //加载图片的地址
  node:node                       |node      //游戏节点 拥有cc.Sprite组件的节点
  success(sprite){}               |function  //加载图片的成功的回调方法，方法接收此次加载的成功的贴图资源
  fail(error){}                   |function  //加载图片失败的回调方法，返回加载失败的原因
})
