window.Global ={
}
cc.ajax = function(obj){
	obj = obj ? obj : {method:'get',success:{},fail:{},url:"",data:{}};
	obj.debug  = obj.debug != undefined ? obj.debug : true;
	let method = obj.method ? obj.method : obj.type ? obj.type : 'get';
	if(method == 'get' || method =="GET"){
		obj.url = obj.url.indexOf('?') == -1 ? obj.url+='?' : obj.url+='&';
		for(var item in obj.data){
			obj.url+=item+'='+obj.data[item]+'&'
		}
	}
	obj.debug && console.log("%c%s%s%s%s","color:blue",'本次请求:请求方式',method,'请求地址(请求地址为空时默认请求发起地址):',obj.url,)
	let xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
        	var  res;
        	try{
        		res = JSON.parse(xhr.response);
        		obj.debug && console.log('%c%s',"color:green","返回数据为JSON格式,自动转换格式")
        		try{
            		obj.success && obj.success(res,xhr)
            	}catch(res){
            		console.error(res.message)
            	}
        	}catch(res){
        		res = xhr.response;
        		obj.debug && console.log('%c%s',"color:green","返回数据不为JSON格式")
        		obj.success && obj.success(res,xhr)
        	}
            obj.debug && console.log("%c%s","color:green",'请求成功',xhr.response);
        } else {
        	obj.debug &&  console.error('请求失败,执行fail回调函数')
    		obj.fail && obj.fail();
        }
    };
    xhr.onerror = (res) => {
    	obj.debug &&  console.error('请求失败,执行fail回调函数')
    	obj.fail && obj.fail(res);
    };
    xhr.ontimeout = () => {
    	obj.debug &&  console.error('请求超时')
    	obj.timeout &&  obj.timeout();
    };
    xhr.open(method,obj.url, true);
    var  data;
    try{
    	if(typeof(FormData)  == 'function'){
    		obj.debug && console.log("%c%s","color:green","支持 formData");
			data = new FormData();
			for(var item in obj.data){
				data.append(item,obj.data[item]);
			}
		}else{
			obj.debug && console.log("%c%s","color:red","不支持formData");
			if(method == "POST" || method == 'post'){ 
    			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    		}
    		data = ""
    		for(var item in obj.data){
    			data += item+'='+obj.data[item]+'&'
    		}
		}
		xhr.send(data);
	}catch(res){
    	obj.debug && console.error('发送数据错误',res);
    }
}
window.$= {
	ajax:function(obj){
			obj.loading && wx.showLoading({
				title:"正在加载数据",
				mask:true,
			})
		if(obj.method == 'post' || obj.method == "POST" || obj.type == 'post' || obj.type == "POST"){
          var type = "POST"
        }
		if(type == 'POST'){
			wx.request({
				url:obj.url,
				data:obj.data,
				header: {"Content-Type":"application/x-www-form-urlencoded"},
                method:"POST",
                success(res){
                	obj.loading && wx.hideLoading();
                	obj.success(res.data)
                },
                fail(res){
                	obj.loading && wx.hideLoading();wx.hideLoading();
                	obj.fail && obj.fail(res);
                }
			})
		}else{
			wx.showLoading();
			wx.request({
				url:obj.url,
				data:obj.data,
				success(res){
					obj.loading && wx.hideLoading();wx.hideLoading();
					obj.success(res);
				},
				fail(res){
					obj.loading && wx.hideLoading();wx.hideLoading();
					obj.fail && obj.fail(res);
				}
			})
		}
	}
}