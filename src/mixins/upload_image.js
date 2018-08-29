import wepy from 'wepy';
import { service } from '../config.js'

export default class upload_image extends wepy.mixin {
  data = {
    Image: '../images/icon/icon-upload.png',
    files: '',
    ShowUpload: false,
    BookImage: ''
  };
  onLoad(e) {

  }
  onShow(e) {

  }
  uploadFiles(filePaths, successUp, failUp, i, length) {
    let that = this
    let token = wx.getStorageSync('token')
    wx.uploadFile({
      url: service.books_upload,
      filePath: filePaths,
      method: 'POST',
      name: 'fileData',
      header: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest'
      },
      success: (resp) => {
        that.Image = JSON.parse(resp.data).data
        console.log(that.Image)
        that.$apply()
      },
      fail: (res) => {
        failUp++
      },
      complete: () => {
        i++
        if (i === length) {
        } else {
          that.uploadFiles(filePaths, successUp, failUp, i, length)
        }
        wx.hideToast();
      }
    })
  }
  methods = {
    chooseimage() {
      var that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            mask: true,
            duration: 10000
          })
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.files = res.tempFilePaths
          that.ShowUpload = true
          that.BookImage = res.tempFilePaths[0]
          that.$apply()
          that.uploadFiles(that.BookImage, 0, 0, 0, that.files.length)
        }
      })
    },
  }
}
