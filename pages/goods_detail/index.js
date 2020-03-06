// pages/goods_detail/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    current:0
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
      // console.log(res)
      this.setData({
        list:res.data.message
      })
    })
  },
  // 切换TAB栏
  goodnav(e){
    // console.log(e)
    const index = e.target.dataset.index
    this.setData({
      current:index
    })
  },
  // 点击图片
  choosePhoto(e){
    const index = e.target.dataset.index
    let list = this.data.list.pics.map(v=>{
      return v.pics_big_url
    })
    // console.log(list)
    // 显示图片大图
    wx.previewImage({
      current: list[index], // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  // 购物车跳转
  tocar(){
    wx.switchTab({
      url: '/pages/cart/index'
    })
  }
})