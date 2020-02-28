import request from "../../utils/request.js"
Page({
  data:{
    banners:[], //轮播图
    navs:[] // 导航
  },
  onLoad(){
    // 请求得到轮播图
    request({
      url:'/home/swiperdata'
    }).then(res=>{
      // console.log(res)
      const {message}=res.data
      this.setData({
        banners:message
      })
    })

    // 请求得到导航部分
    request({
      url:'/home/catitems'
    }).then(res=>{
      // console.log(res)
      const {message}=res.data
      const navdata = message.map((v,i)=>{
        if(i===0){
          v.url ="/pages/category/index"
        }
        return v
      })
      this.setData({
        navs: navdata
      })
    })
  }
})
