// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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