var bmap = require('../../libs/bmap-wx.min.js');

Page({
  data: {
    toView: 'yellow',
    scrollLeft: 0,
    province: '',
    city: '',
    district: '',
    //滚动的数组
    scrolls: [

    ],
  },

  onLoad: function () {
    var that = this
    

    wx.getSetting({
      success: (res) => {
        console.log("位置 == " + JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      that.getLocation();

                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          that.getLocation();
        }
        else {
          //调用wx.getLocation的API
          that.getLocation();
        }
      }
    })
  },

  getLocation: function () {
    var that = this;
    wx.getLocation({

      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res));
        var latitude = res.latitude;
        var longitude = res.longitude;
        var speed = res.speed;
        var accuracy = res.accuracy;
        console.log("获取位置 == " + latitude + "  " + longitude);

        
        var BMap = new bmap.BMapWX({
          ak: 'AFKtuBYm2gjIdkZj1rir6LwyvPoWEe6k'
        });
        var fail = function (data) {
          console.log(data)
        };
        var success = function (data) {

          that.setData({
            province: data.originalData.result.addressComponent.province
          });

          that.setData({
            city: data.originalData.result.addressComponent.city
          });

          that.setData({
            district: data.originalData.result.addressComponent.district
          });

          // console.log("fail == " + JSON.stringify(data));
          // for(var i=0; i<that.cityList.length - 1; i++){
          //   var cityData = that.cityList[i];
          //   console.log("city == " + JSON.stringify(cityData));
          // }

          var local = data.originalData.result.addressComponent.city;
          local = local.replace("市", "");
          local = local.replace("区", "");

          wx.request({
            url: 'https://www.tianqiapi.com/api/',
            data: { version: 'v2', appid: '55659272', appsecret: 'uTj67S9T', city: local},
            method: 'GET',
            success: function (res) {
              // success
              console.log("res == " + JSON.stringify(res))

              that.setData({
                scrolls: res.data.data
              });
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
        }
        BMap.regeocoding({
          fail: fail,
          success: success,
          iconPath: '../../img/marker_red.png',
          iconTapPath: '../../img/marker_red.png'
        });

      },
      fail: function (res) {
        console.log("fail == " + JSON.stringify(res));
      }
    })
  },

  

  scrollToRed:function(e)
  {
    this.setData({
      toView: 'green'
    })
  },
  scrollTo100: function (e) {
    this.setData({
      scrollLeft: 100
    })
  },
  
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