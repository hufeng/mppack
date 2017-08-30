//logs.js
var util = require('../../utils/util.js')
var utilIndex = require('../../utils/index')
console.log(utilIndex)

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      })
    })
  }
})
