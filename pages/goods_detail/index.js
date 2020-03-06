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
  },
  // 加入购物车
  to_storage(){
    const goods = wx.getStorageSync('goods')||[];
    const ishave = goods.some(v=>{
      return v.goods_id===this.data.list.goods_id
    })
    if(ishave){
      wx.showToast({
        title: '购物车已存在',
        image: '../../images/icon_cart_active@3x.png',
        duration: 2000
      })
      return;
    }
    goods.unshift({
      goods_id: this.data.list.goods_id,
      goods_name: this.data.list.goods_name,
      goods_price: this.data.list.goods_price,
      goods_small_logo: this.data.list.goods_small_logo,
      number: 1,
      checked:true
    })
    // 存到本地
    wx.setStorageSync("goods", goods);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
  }
})