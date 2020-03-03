// pages/goods_detail/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    request({
      url:"/goods/detail",
      data:{
        goods_id: options.goods_id
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        list:res.data.message
      })
    })
  }
})