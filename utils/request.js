// 封装一个异步的请求工具库

// 1.调用返回一个promise对象
// 2.配置基准路径
// 3.错误拦截
// 如果没有传递参数，则config默认为一个空对象
const request=(config={})=>{
  // 判断url中是否带有http开头（用正则进行判断）
  if(config.url.search(/^http/)===-1){
    // 如果没有，则加上基准路径
    config.url = request.defaults.baseURL+config.url
  }
  // 返回一个promise对象
  return new Promise((resolve, reject)=>{
    // 发送请求
    wx.request({
      // 展开数据
      ...config,
      // 成功之后返回的数据
      success(res){
        resolve(res)
      },
      // 失败之后返回的数据
      fail(res){
        reject(res)
      },
      // 成功或者失败都执行的函数
      complete(res){
        // 执行错误的兰截器
        request.errors(res);
      }
    })
  })
}

// 定义config的defaults属性
request.defaults={
  // 定义基准路径
  baseURL:""
}

// 定义一个储存错误的一个回调函数，默认为空
request.errors=()=>{}

// 错误拦截
request.onError=(callback)=>{
  // 判断是否为函数
  if(typeof callback==='function'){
    // 如果是，则保持到定义的存储错误函数中
    request.errors=callback
  }
}

// 暴露出去
export default request;