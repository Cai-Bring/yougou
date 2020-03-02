// pages/goods_list/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceActive:1,
    active:0,
    list:[],
    pagesize:5,
    pagenum:1,
    cid:0,
    hadnone:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // console.log(option)
    this.setData({
      cid:option.cid
    })
    request({
      url:"/goods/search",
      data:{
        cid:this.data.cid,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    }).then(res=>{
      // console.log(res)
      const { goods } = res.data.message
      this.setData({
        list: goods
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
    let num = this.data.pagenum
    num=num+1
    this.setData({
      pagenum:num
    })
    request({
      url:"/goods/search",
      data:{
        cid: this.data.cid,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    }).then(res=>{
      let { goods } = res.data.message
      // console.log(goods)
      let oldlist = this.data.list
      // console.log(oldlist)
      oldlist.push(...goods)
      this.setData({
        list: oldlist
      })
      if(goods.length===0){
        this.setData({
          hadnone:true
        })
      }
    })
  }
})