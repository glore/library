/* ========================================================
                        小程序公共方法
======================================================== */
const {service} = require('../config')
const base = require('../mixins/base')

const wx_login = () => {
  let vm = this
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        let versions = 'v5.4.25'
        let data = {
          code: res.code,
          formId: wx.getStorageSync('formId'),
          from_user_id: wx.getStorageSync('from_user_id'),
          openGId: wx.getStorageSync('openGId'),
          from_platform: wx.getStorageSync('from_platform'),
          from_openid: wx.getStorageSync('from_openid'),
          systemInfo: wx.getStorageSync('systemInfo'),
          system: wx.getStorageSync('system'),
          versions: versions,
          share_user_id: wx.getStorageSync('share_user_id')
        }
        // console.log(res.code)
        // return
        wx.request({
          url: `${service.host}/code/to/login`,
          data: data,
          method: 'post',
          success: ({data: res}) => {
            // console.log(res,'122222222222')
            let {code, data} = res
            switch (code) {
              case 0:
                // console.log(data.api_token)
                wx.setStorageSync('token', data.api_token)
                wx.setStorageSync('openid', data.openid)
                let userInfo = {
                  nickName: data.nickname,
                  avatarUrl: data.avatar,
                  id: data.id,
                  created_at: data.created_at
                }
                wx.setStorageSync('userInfo', userInfo) // 用户基本信息
                wx.setStorageSync('user_id', data.id) // 用户id
                resolve(res)
                break
              case 1:
                wx.showModal({ // 使用模态框提示用户进行操作
                  title: '温馨提示：',
                  content: '很抱歉！' + res.message,
                  showCancel: false,
                  confirmText: '确定',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateBack({
                        delta: 1
                      })
                    }
                  }
                })
                break
              case 2:
                break
            }
          },
          fail: (Error) => {
            reject(Error)
          }
        })
      },
      fail: (res) => {
        wx.showModal({ // 使用模态框提示用户进行操作
          title: '温馨提示：',
          content: '很抱歉！wx.login登录失败~，请重试',
          showCancel: false,
          confirmText: '确定',
          success: function (res) {
            if (res.confirm) {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
        console.log('wx.login登录失败')
      }
    })
  })
}
var timeout

function throttle(func, wait, immediate) {
  return fun(func, wait, immediate)
}

function fun(func, wait, immediate) {
  var context = this,
    args = arguments
  var later = function later() {
    timeout = null
    if (!immediate) func.apply(context, args)
  }
  var callNow = immediate && !timeout
  if (!timeout) {
    clearTimeout(timeout)

    timeout = setTimeout(later, wait)
  }
  if (callNow) func.apply(context, args)
}

module.exports = {
  wx_login, throttle
}
