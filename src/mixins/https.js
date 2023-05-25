export default {
  data: {
    mixin: 'MixinText'
  },
  methods: {
    /* =================== [$get 发起GET请求] =================== */
    $get({url = '', headers = {}, data = {}}) {
      const methods = 'GET'
      return new Promise((resolve, reject) => {
        this.$ajax({url, headers, methods, data}).then(({code, data}) => {
          resolve({code, data})
        })
      })
    },
    $getV2({url = '', headers = {}, data = {}}) {
      const methods = 'GET'
      return new Promise((resolve, reject) => {
        this.$ajax({url, headers, methods, data}).then((res) => {
          resolve(res)
        })
      })
    },
    $post({url = '', headers = {}, data = {}}) {
      const methods = 'POST'
      return new Promise((resolve, reject) => {
        this.$ajax({url, headers, methods, data}).then(({code, data}) => {
          resolve({code, data})
        })
      })
    },
    $put({url = '', headers = {}, data = {}}) {
      const methods = 'PUT'
      return new Promise((resolve, reject) => {
        this.$ajax({url, headers, methods, data}).then(({code, data}) => {
          resolve({code, data})
        })
      })
    },
    $delete({url = '', headers = {}, data = {}}) {
      const methods = 'DELETE'
      return new Promise((resolve, reject) => {
        this.$ajax({url, headers, methods, data}).then(({code, data}) => {
          resolve({code, data})
        })
      })
    },
    $ajax({url = '', headers = {}, methods = 'GET', data = {}}) {
      // 增强体验：顶部加载中
      wx.showNavigationBarLoading()
      let params = {
        XDEBUG_SESSION_START: '1',
        from_openid: wx.getStorageSync('from_openid'),
        from_platform: wx.getStorageSync('from_platform'),
        systemInfo: wx.getStorageSync('SystemInfo'),
        system: wx.getStorageSync('system'),
        share_user_id: wx.getStorageSync('share_user_id')
      }
      // 构造请求体
      let requestUrl = `${url}${url.includes('?') ? '&' : '?'}` + Object.keys(params).map(i => `${i}=${encodeURIComponent(params[i] || '')}`).join('&')
      const request = {
        url: requestUrl,
        method: ['GET', 'POST', 'PUT', 'DELETE'].indexOf(methods) > -1 ? methods : 'GET',
        header: Object.assign({
          'Authorization': 'Bearer ' + wx.getStorageSync('token'),
          'X-Requested-With': 'XMLHttpRequest'
        }, headers),
        data: Object.assign({ // set something global
        }, data)
      }
      // 控制台调试日志
      // console.table(request)
      // 发起请求
      return new Promise((resolve, reject) => {
        wx.request(Object.assign(request, {
          success: ({statusCode, data}) => {
            let dataCopy = data
            wx.hideNavigationBarLoading()
            wx.hideLoading()
            const {code, message, notice, operate, path} = data
            wx.removeStorageSync('message')
            wx.stopPullDownRefresh()
            // 控制台调试日志
            console.log('[SUCCESS]', statusCode, typeof data === 'object' ? data : data.toString().substring(0, 100))
            // 状态码正常 & 确认有数据
            if (data.code === 0) {
              // 成功回调
              wx.removeStorageSync('formId')
              // return setTimeout(() => {
              resolve({statusCode, ...data})
              // }, 3000)
            } else if (data.code === 1) {
              wx.showModal({ // 使用模态框提示用户进行操作
                title: '温馨提示：',
                content: '很抱歉！' + data.message,
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
              let errorMessage = {message: '错误,请寻找开发人员协助'}
              throw errorMessage
            } else if (data.code === 2) {
              wx.showModal({ // 使用模态框提示用户进行操作
                title: '温馨提示：',
                content: '很抱歉！登录状态失效啦!',
                showCancel: false,
                confirmText: '重新登录',
                success: function (res) {
                  if (res.confirm) {
                    var pages = getCurrentPages()    // 获取加载的页面
                    var currentPage = pages[pages.length - 1]    // 获取当前页面的对象
                    var options = currentPage.options
                    let url = ''
                    for (var key in options) {
                      url = `${url}${key}=${options[key]}&`
                    }
                    console.log(`${currentPage.route}?${url}`)
                    wx.setStorageSync('jump', `/${currentPage.route}?${url}`)
                    wx.redirectTo({url: '/pages/tabBar/welcome'})
                  }
                }
              })
              let errorMessage = {message: '错误,需要重新登录'}
              throw errorMessage
            } else {
              // 针对外部的接口
              resolve(dataCopy)
            }
          },

          fail: ({statusCode, data}) => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject({statusCode, ...data})
            console.log('[ERROR]', statusCode, data)
          },
          complete: (res) => {
            if (res.errMsg.indexOf('timeout') > -1) {
              console.log('当前网络不稳定！请重试...')
            }
          }
        }))
      })
    }
  }
  // created() {
  //   console.log('created in mixin', '插件打印')
  // }
}
