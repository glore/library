/* ========================================================
                        小程序配置文件
======================================================== */
// 域名
var host = ''

// if (_NODE_) {
// host = 'https://task.ufutx.com/api' // 线上环境
// } else {
  host = 'https://library.ufutx.com/api' // 线上环境
// }

export const service = {
  host: `${host}`,
  // 登录接口

  login: `${host}/login/wechat`
}

export default {
  service
}
