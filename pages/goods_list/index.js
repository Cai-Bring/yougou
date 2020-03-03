// pages/goods_list/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:'',
    priceActive:1,
    active:0,
    list:[],
    pagesize:5,
    pagenum:1,
    hadnone:false,
    isloadding:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // console.log(option)
    this.setData({
      query: option.query
    })
    request({
      url:"/goods/search",
      data:{
        query: this.data.query,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    }).then(res=>{
      // console.log(res)
      const { goods } = res.data.message
      this.setData({
        list: goods,
        isloadding: false
      })
    })
  },
  price_up(){
    let priceactive = this.data.priceActive
    if (priceactive==0){
      priceactive=1
    }else{
      priceactive=0
    }
    this.setData({
      priceActive: priceactive
    })
  },
  show_all(){
    this.setData({
      active:0
    })
  },
  show_nub() {
    this.setData({
      active: 1
    })
  },
  // 滚到底部时触发
  loadding(){
    if (this.data.hadnone){
      return
    }
    let num = this.data.pagenum
    num=num+1
    if (this.data.isloadding) {
      return
    }
    this.setData({
      isloadding:true,
      pagenum:num
    })
    // 判断是否是正在加载中，如果是，则不执行获取数据
    request({
      url: "/goods/search",
      data: {
        query: this.data.query,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    }).then(res => {
      // console.log(res)
      let { goods } = res.data.message
      // console.log(goods)
      let oldlist = this.data.list
      // console.log(oldlist)
      oldlist.push(...goods)
      this.setData({
        list: oldlist,
        isloadding: false// 获取成功后才讲加载中状态取消
      })
      if (this.data.list.length >= res.data.message.total) {
        this.setData({
          hadnone: true
        })
      }
    })
  }
})