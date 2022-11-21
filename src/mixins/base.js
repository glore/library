/* ========================================================
               小程序基础公用方法，类似于弹框.....等
======================================================== */

export default {
  data: {},

  methods: {
    $callPhone(mobile) {
      wx.makePhoneCall({
        phoneNumber: mobile,
        success: function () {
          console.log('拨打电话成功!')
        },
        fail: function () {
          console.log('拨打电话失败！')
        }
      })
    },
    $showToast(title) {
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 1200
      })
    },
    $Toast_success(title) {
      wx.showToast({
        title: title,
        icon: 'success',
        duration: 1200
      })
    },
    $Toast_error(title) {
      wx.showToast({
        title: title,
        icon: 'error',
        duration: 1200
      })
    },
    $showLoading(title) {
      wx.showLoading({
        title: title,
        mask: true
      })
    },
    // 跳转链接
    $goto(url) {  // 普通跳转,有路由栈限制
      wx.navigateTo({url: url})
    },
    $gotoTab(url) { // 跳转至tabBar
      wx.switchTab({url: url})
    },
    $redirectTo(url) { // 关闭当前页面
      wx.redirectTo({url: url})
    },
    $reLaunchTo(url) { // 关闭所有页面
      wx.redirectTo({url: url})
    },
    $gotoBack(num) {
      wx.navigateBack({
        delta: num
      })
    },
    $gotoH5(URL) {
      console.log(encodeURIComponent(URL))
      wx.navigateTo({url: '/pages/test?url=' + encodeURIComponent(URL)})
    },
    $createSelectorQuery(id) {
      return new Promise((resolve) => {
        wx.createSelectorQuery().select(id).boundingClientRect(function (rect) {
          resolve(rect)
          // 节点的上边界坐标
          // let top = rect.top // 节点的下边界坐标
          // let bottom = rect.bottom
        }).exec()
      })
    },
    $getCurrentPageUrl() { // 获取当前页面路由
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const url = `/${currentPage.route}`
      return url
    },
    $getCurrentLastPageUrl() { // 获取上个页面路由
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 2]
      const url = `/${currentPage.route}`
      return url
    },
    // 预览单图
    $previewImage(image) {
      let imageArray = []
      imageArray.push(image)
      console.log(imageArray)
      wx.previewImage({
        current: image, // 当前显示图片的http链接
        urls: imageArray // 需要预览的图片http链接列表
      })
    },
    // 预览多图
    $previewImages(image, imageArray) {
      wx.previewImage({
        current: image, // 当前显示图片的http链接
        urls: imageArray // 需要预览的图片http链接列表
      })
    },
    // 打开文档
    $openDocument(url) {
      wx.showLoading({
        title: '正在打开文件',
        mask: true
      })
      wx.downloadFile({
        // 示例 url，并非真实存在
        url: url,
        success: function (res) {
          const filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
              wx.hideLoading()
            },
            fail: (err) => {
              console.log(err)
              wx.hideLoading()
            }
          })
        }
      })
    },
    $contrastTime(st, et) {
      console.log(`开始${st}`, `结束${et}`)
      return new Promise((resolve, reject) => {
        if (st && et) {
          var stdt = new Date(st.replace(/-/g, '/'))
          var etdt = new Date(et.replace(/-/g, '/'))
          console.log(stdt, etdt)

          // let createTime = res.date.replace(/-/g, '/');
          if (stdt > etdt) {
            wx.showModal({ // 使用模态框提示用户进行操作
              title: '温馨提示',
              content: '开始时间必须小于结束时间,请重新选择!',
              showCancel: false,
              confirmText: '确定',
              success: function (res) {
                reject(new Error(`开始时间需小于结束时间`))
                // if (res.confirm) {
                //   vm.formData.link_file.splice(index, 1)
                // } else if (res.cancel) {
                //   console.log('用户点击取消')
                // }
              }
            })
            // this.$showToast('')

            // } else if (stdt == etdt) {
            //   this.$showToast('开始时间不能等于结束时间')
            //   reject(new Error(`开始时间不能等于结束时间`))
          } else {
            console.log('时间合理')
            resolve()
          }
        } else {
          resolve()
        }
      })
    },
    $getsubscription(ids) {
      let subscriptionsSetting = wx.getStorageSync('subscriptionsSetting')
      return new Promise((resolve, reject) => {
        if (subscriptionsSetting && subscriptionsSetting == 'true') {
          reject(resV)
        } else {
          wx.getSetting({
            withSubscriptions: true,
            success(resV) {
              let {itemSettings, mainSwitch} = resV.subscriptionsSetting
              if (!mainSwitch) {
                resolve(resV)
                return console.log('需要跳转到授权页面')
              }
              if (!itemSettings) {
                wx.setStorageSync('subscriptionsSetting', 'false')
                console.log('需要授权')
                wx.requestSubscribeMessage({
                  tmplIds: ids, // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
                  success(res) {
                    if (res[ids[0]] === 'accept') {
                      console.log('订阅成功')
                    } else {
                      console.log('拒绝授权')
                    }
                  },
                  complete(res) {
                    resolve(res)
                    console.log('complete  调用完成')
                  }
                })
              } else {
                console.log('授权成功')
                wx.setStorageSync('subscriptionsSetting', 'true')
                reject(resV)
              }
            }
          })
        }
      })
    },
    $getSystemInfo() {
      return new Promise((resolve) => {
        wx.getSystemInfo({
          success: (res) => {
            console.log(res)
            resolve(res)
            // 获取可使用窗口宽度
            // let clientHeight = res.windowHeight
            // 获取可使用窗口高度
            // let clientWidth = res.windowWidth
            // 算出比例
            // let ratio = 750 / clientWidth
            // 算出高度(单位rpx)
            // let height = clientHeight * ratio
            // 设置高度
          }
        })
      })
    }
  },
  created() {
  }
}
