/* ========================================================
                        小程序公共方法
======================================================== */
const {service} = require('../config')
const base = require('../mixins/base')

const onShareAppMessage = (title, path, imageUrl, callback) => {
  // 设置一个默认分享背景图片
  let defaultImageUrl = '../images/share.jpg',
    from_openid = wx.getStorageSync('openid')
  if (path.includes('?')) {
    path = `${path}&from_openid=${from_openid}`
  } else {
    path = `${path}?from_openid=${from_openid}`
  }
  console.log(path, title, imageUrl)
  return {
    title: title,
    path: path,
    imageUrl: imageUrl || '',
    success(res) {
      console.log('转发成功！')
      if (!res.shareTickets) {
        // 分享到个人
        // api.shareFriend().then(() => {
        //   console.warn('shareFriendSuccess!')
        //   // 执行转发成功以后的回调函数
        //   callback && callback()
        // })
      } else {
        // 分享到群
        let st = res.shareTickets[0]
        wx.getShareInfo({
          shareTicket: st,
          success(res) {
            let iv = res.iv
            let encryptedData = res.encryptedData
            // api.groupShare(encryptedData, iv).then(() => {
            //   console.warn('groupShareSuccess!')
            //   // 执行转发成功以后的回调函数
            //   callback && callback()
            // })
          }
        })
      }
    },
    fail: function (res) {
      console.log('转发失败！')
    }
  }
}

const is_mobile = (mobile) => {      // 判断一个对象下是否有空属性
  let myreg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  return myreg.test(mobile)
  // const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  // if (reg.test(this.phoneNumber)) {
  //   alert("手机号码格式正确");
  // } else {
  //   alert("请输入正确的手机号码");
  // }
}

let getPhoneNumber = ({detail}) => {
  let vm = this
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.login({
      success: ({code}) => {
        wx.setStorageSync('code', code)
        if (detail.iv) {
          let data = {
            code: code,
            iv: detail.iv,
            from_openid: wx.getStorageSync('from_openid'),
            encryptedData: detail.encryptedData
          }
          console.log(data)
          wx.request({
            url: `${service.host}/wechat/infor`,
            header: {
              'Authorization': 'Bearer ' + wx.getStorageSync('token'),
              'X-Requested-With': 'XMLHttpRequest'
            },
            data: data,
            method: 'post',
            success: ({data: {data}}) => {
              wx.hideLoading()
              if (data.phoneNumber) {
                let {phoneNumber, openid} = data
                wx.setStorageSync('openid', openid)
                wx.setStorageSync('mobile', phoneNumber)
                resolve(data) // 返回参数
              } else {
                wx.showToast({
                  title: '绑定失败，请重试',
                  icon: 'error',
                  duration: 1200
                })
              }
            },
            fail: (Error) => {
              wx.hideLoading()
              reject(Error)
            }
          })
        }
      },
      fail: (res) => {
        wx.hideLoading()
        reject(res)
      }
    })
  })
}
const getElement_WH = (element) => { // 获取元素位置
  // console.log(element)
  return new Promise((resolve, reject) => {
    let query = wx.createSelectorQuery()
    query.select(element).boundingClientRect((rect) => {
      if (typeof rect == 'object') {
        resolve(rect)
      } else {
        // reject('TypeError')
      }
    }).exec()
  })
}
const uploadImg = (filePaths) => {
  return new Promise((resolve, reject) => {
    let vm = this
    let token = wx.getStorageSync('token')
    wx.uploadFile({
      url: `${service.host}/uploads`,
      filePath: filePaths,
      method: 'POST',
      name: 'fileData',
      header: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
      success: (resp) => {
        resolve(JSON.parse(resp.data).data)
        // vm.EditImage = JSON.parse(resp.data).data
        // console.log(that.EditImage)
        // that.$apply()
      },
      fail: (res) => {
      },
      complete: () => {
        wx.hideToast()
      }
    })
  })
}
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
        wx.request({
          url: `${service.host}/code/to/login`,
          data: data,
          method: 'post',
          success: ({data: res}) => {
            let {code, data} = res
            switch (code) {
              case 0:
                wx.setStorageSync('token', data.token)
                wx.setStorageSync('openid', data.openid)
                let userInfo = {
                  cash_pledge: data.cash_pledge,
                  name: data.name,
                  mobile: data.mobile,
                  circle_avatar: data.circle_avatar,
                  id: data.id,
                  openid: data.wechat.openid,
                  created_at: data.created_at
                }
                wx.setStorageSync('userInfo', userInfo) // 用户基本信息
                wx.setStorageSync('user_id', data.id) // 用户id
                wx.setStorageSync('openid', data.wechat.openid) // 用户id
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
  wx_login, throttle, getPhoneNumber, is_mobile, getElement_WH, uploadImg, onShareAppMessage
}
