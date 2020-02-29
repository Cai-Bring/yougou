// pages/category/index.js
import request from "../../utils/request.js"
Page({
  data: {
    mywatch:0,
    list:[]
  },
  onLoad(){
    request({
      url:'/categories'
    }).then(res=>{
      console.log(res)
      const { message}=res.data
      this.setData({
        list: message
      })
    })
  },
  towatch(e){
    // console.log(e)
    const { index } = e.currentTarget.dataset
    this.setData({
      mywatch:index
    })
  }
})