// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    list:[] //本地存储 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 第一次加入购物车页面，加载本地存储数据
    this.setData({
      list: wx.getStorageSync('goods')||[]
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 每次再次加入购物车页面，都需要重新加载一次本地存储数据
    this.setData({
      list: wx.getStorageSync('goods') || []
    })
  },
  // 获取地址
  choose_address(){
    wx.chooseAddress({
      success:(res)=> {
        this.setData({
          user:res
        })
        // console.log(res.userName)
        // console.log(res.postalCode)
        // console.log(res.provinceName)
        // console.log(res.cityName)
        // console.log(res.countyName)
        // console.log(res.detailInfo)
        // console.log(res.nationalCode)
        // console.log(res.telNumber)
      }
    })
  }
})