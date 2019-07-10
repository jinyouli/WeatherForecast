//index.js
//获取应用实例

const bmap = require('../../libs/bmap-wx.min.js')
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    toView: 'yellow',
    scrollLeft: 0,
    //滚动的数组
    scrolls: [

    ],
  },

  onLoad: function () {
    // var that = this
    // wx.request({
    //   url: 'https://www.tianqiapi.com/api/',
    //   data: { version: 'v3', appid: '1001', appsecret: '2033', cityid: '101280101' },
    //   method: 'GET', 
    //   success: function (res) {
    //     // success
    //     console.log("res == " + JSON.stringify(res))

    //    that.setData({
    //     scrolls: res.data.data
    //   });
    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })
  },

  // onLoad: function () {

  //   var that = this;
  //   // 新建百度地图对象 
  //   var BMap = new bmap.BMapWX({
  //     ak: 'AFKtuBYm2gjIdkZj1rir6LwyvPoWEe6k'
  //   });
  //   var fail = function (data) {
  //     console.log(data)
  //   };
  //   var success = function (data) {

  //     var weatherData = data.currentWeather[0];
  //     weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';

  //     that.setData({
  //       scrolls: data.originalData.results[0].weather_data
  //     });

  //     console.log("daa == " + JSON.stringify(data.originalData.results[0].weather_data));
  //   }
  //   // 发起weather请求 
  //   BMap.weather({
  //     fail: fail,
  //     success: success
  //   });

  // },

  upper: function (e) {
    console.log('滚动到顶部')
  },
  lower: function (e) {
    console.log('滚动到底部')
  },
  scroll: function (e) {
    console.log(e)
  },

})
