// pages/search/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    theinput:'',
    list:[],
    loading: false,
    loadinginput: '',// 加载中输入框的值
    history:[],// 本地存储
  },
  onLoad: function (options) {
    // 拿出本地存储
    let arr = wx.getStorageSync("history");
    // 判断是否是一个数组
    if (!Array.isArray(arr)) {
      arr = [];
    }
    this.setData({
      history: arr
    })
  },
  // 点击取消
  navback(){
    this.setData({
      list:[],
      theinput:''
    })
  },
  // 点击回车时触发
  gogogo(e){
    // console.log(e)
    // console.log(e.detail.value)
    let query = e.detail.value
    // 获取本地存储
    let arr = wx.getStorageSync("history");
    // 判断是否有本地存储，如果没有，则给一个空数组
    if (!Array.isArray(arr)) {
      arr = [];
    }
    arr.unshift(query);
    // 数组去重
    arr = [...new Set(arr)]
    // 保存到本地
    wx.setStorageSync('history', arr)
    // 跳转
    wx.redirectTo({
      url: '/pages/goods_list/index?query='+query
    })
  },
  // 键盘输入时触发
  isinput(e){
    // console.log(e)
    let {value} = e.detail
    this.setData({
      theinput:value
    })
    if (!value) {
      this.setData({
        list: []
      })
      return;
    } 
    this.gethistory()
  },
  // 封装获取商品
  gethistory(){
    if(this.data.loading==false){
      this.setData({
        loading:true,
        loadinginput:this.data.theinput
      })
      request({
        url: '/goods/qsearch',
        data: {
          query: this.data.theinput
        }
      }).then(res => {
        // console.log(res)
        const { message } = res.data
        this.setData({
          list: message,
          loading:false
        })
        // console.log(this.data.list)
        if (this.data.loadinginput !== this.data.theinput) {
          this.gethistory();
        }
      })
    }
  },
  // 失焦的时候触发
  isblur(){
    this.setData({
      list:[]
    })
  },
  // 清除历史记录
  clearhistory(){
    this.setData({
      history: []
    })
    // 清空本地的历史数据
    wx.setStorageSync('history', [])
  },
})