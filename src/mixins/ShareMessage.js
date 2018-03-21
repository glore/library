import wepy from 'wepy';

export default class ShareMessage extends wepy.mixin {
  data = {
    from_openid: ''
  };
  onLoad(e) {
    let that = this
    if(Boolean(e.from_openid)) {
      wx.setStorageSync('from_openid', e.from_openid)
      // wx.showToast({
      //       title: e.from_openid,
      //       icon: 'none',
      //       duration: 1500
      //     })
    }
    wx.showShareMenu({
      withShareTicket: true
    })
  }
  onShow(e) {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
  methods = {
    onShareAppMessage(res) {
      console.log(res)
      let that = this
      that.from_openid = wx.getStorageSync('openid')
      let pages = getCurrentPages()    //获取加载的页面
      let currentPage = pages[pages.length-1]    //获取当前页面的对象
      let link = currentPage.route    //当前页面url
      let options = currentPage.options.id
      let id = options ? '?id=' + options : ''
      let url = ''
      if(options) {
        url = link + id + '&from_openid=' + that.from_openid
      }else {
        url = link + '?from_openid=' + that.from_openid
      }
      if (res.from === 'menu') {
        console.log(res.target)
      }
      return {
        // title: '',
        path: url,
        // 设置转发image，不设默认当前截图
        imageUrl: '',
        success: function(res) {
          wx.showToast({
            title: '转发成功',
            icon: 'success',
            duration: 1500
          })
          var shareTickets = res.shareTickets;
          if (shareTickets.length == 0) {
            return false;
          }
          // wx.getShareInfo({
          //   shareTicket: shareTickets[0],
          //   withCredentials: true,
          //   success: function(res){
          //     console.log(res)
          //     var encryptedData = res.encryptedData;
          //     var iv = res.iv;
          //     debugger
          //     httpclient.req(
          //       'http://localhost:8090/wxappservice/api/v1/wx/decodeUserInfo',
          //       {
          //         apiName: 'WX_DECODE_USERINFO',
          //         encryptedData: this.data.encryptedData,
          //         iv: this.data.iv,
          //         sessionId: wx.getStorageSync('thirdSessionId')
          //       },
          //       'GET',
          //       function(result){
          //         //解密后的数据
          //         console.log(result.data)
          //       },
          //       function(result){
          //         console.log(result)
          //       }
          //     );
          //   }
          // })
        },
        fail: function(res) {
          // 转发失败
        }
      }
    }
  }
}
