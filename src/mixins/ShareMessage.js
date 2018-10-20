import wepy from 'wepy';
import { service } from '../config.js'

export default class ShareMessage extends wepy.mixin {
  data = {
    from_openid: '',
    openGid: ''
  };
  onLoad(e) {
    let that = this
    that.from_openid = wx.getStorageSync('openid')
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
      let title = this.config.navigationBarTitleText
      let that = this
      that.from_openid = wx.getStorageSync('openid')
      let pages = getCurrentPages()    //获取加载的页面
      let currentPage = pages[pages.length-1]    //获取当前页面的对象
      let link = currentPage.route    //当前页面url
      let library_id = currentPage.options.library_id ? currentPage.options.library_id : ''
      let options = currentPage.options.id
      let id = options ? '?id=' + options : ''
      if (library_id) {
        id = options ? '?id=' + options + '&library_id=' + library_id : ''
      }
      let url = ''
      if(options) {
        url = link + id + '&from_openid=' + that.from_openid
      }else {
        url = link + '?from_openid=' + that.from_openid
      }
      if (wx.getStorageSync('libraryName')) {
        title = wx.getStorageSync('libraryName')
      }
      console.log(url)
      console.log(currentPage.options)
      // debugger
      if (res.from === 'menu') {
        console.log(res.target)
      }
      return {
        title: title,
        path: url,
        // 设置转发image，不设默认当前截图
        imageUrl: '',
        success: function(res) {
          let shareTickets = res.shareTickets;
          if (shareTickets.length == 0) {
            return false
          }
          wx.getShareInfo({
            shareTicket: shareTickets[0],
            success: function(res){
              let encryptedData = res.encryptedData
              let iv = res.iv
              let code = ''
              wepy.login({
                success: (res) => {
                  code = res.code
                  let data = {
                    code: code,
                    iv: iv,
                    encryptedData: encryptedData
                  }
                  that.$post({url: service.infor, data}, {
                    success: ({code, data}) => {
                      that.openGid = data.openGId
                      that.$apply()
                    },
                    fail: ({code, data}) => {},
                    complete: () => { this.loading = false }
                  })
                },
                fail: (res) => {
                  console.log('wepy.login.fail:', res)
                }
              })
            }
          })
          wx.showToast({
            title: '转发成功',
            icon: 'success',
            duration: 1500

          })

        },
        fail: function(res) {
          // 转发失败
        }
      }
    }
  }
}
