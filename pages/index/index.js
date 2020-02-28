import request from "../../utils/request.js"
Page({
  data:{
    banners:[], //轮播图
    navs:[], // 导航
    floor:[], // 楼层
    topshow: false // 是否显示返回顶部
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

    // 获取楼层信息
    request({
      url:'/home/floordata'
    }).then(res=>{
      // console.log(res)
      const {message} = res.data
      this.setData({
        floor:message
      })
    })    
  },
  // 返回顶部的方法
  gototop(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
  },
  // 监听用户是否滚动
  onPageScroll(e){
    let isshow = false
    const {scrollTop} = e
    // console.log(scrollTop)
    if (scrollTop>100){
      isshow=true
    }else{
      isshow = false
    }
    if (isshow == this.data.topshow) return;
    this.setData({
      topshow:isshow
    })
  }
})
