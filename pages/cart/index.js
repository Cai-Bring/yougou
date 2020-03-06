// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    list:[], //本地存储 
    allprice:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 第一次加入购物车页面，加载本地存储数据
    this.setData({
      list: wx.getStorageSync('goods')||[]
    })
    this.calculate()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 每次再次加入购物车页面，都需要重新加载一次本地存储数据
    this.setData({
      list: wx.getStorageSync('goods') || []
    })
    this.calculate()
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
  },
  // 计算总价格
  calculate(){
    let price = 0
    this.data.list.forEach(v=>{
      price += v.goods_price * v.number
    })
    this.setData({
      allprice:price
    })
    //每次点完加减都需要存储到本地存储，则将本地存储封装在计算里面
    wx.setStorageSync("goods", this.data.list)
  },
  // 点击增加减少数量
  modify(e){
    // console.log(e)
    let list = [...this.data.list]
    // console.log(list)
    const {index,val}= e.target.dataset
    // console.log(index)
    let number = list[index].number + +val
    // +val是将val转换为数字类型
    // console.log(number)
    // 如果数量变为0
    if(number==0){
      wx.showModal({
        title: '提示',
        content: '是否删除商品',
        success: (res) => {
          // 确认删除
          if (res.confirm) {
            // 删除商品
            list.splice(index, 1)
            this.setData({
              list: list
            })
            this.calculate();
          }
        }
      })
    }else{
      // 如果不等于0，则将数量赋值给list中
      list[index].number = number
      this.setData({
        list: list
      })
      this.calculate();
    }
  },
  // 输入框输入数量时触发
  isinput(e){
    // console.log(e)
    let val = e.detail.value
    const { index } = e.target.dataset
    // 如果输入不是数字或者输入结果小于0
    if (!Boolean(+val) || val < 0){
      wx.showToast({
        title: '请正确输入',
        icon: 'none',
        duration: 2000
      })
      this.setData({
        list:this.data.list
      })
    }else{
      let list = [...this.data.list]
      list[index].number=+val
      console.log(list)
      this.setData({
        list:list
      })
      this.calculate()
    }
  }
})