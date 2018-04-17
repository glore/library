/* ========================================================
                        小程序配置文件
======================================================== */
// 域名
var host = 'https://library.ufutx.com/api'
// var host = 'http://library.hankin.com/api'
export const service = {
    // 登录接口
    login: `${host}/login/wechat`,
    // 微信注册接口
    register: `${host}/wechat/register`,
    // 注册发短信接口
    send_register: `${host}/sms/register`,
    //用户
    user: `${host}/user`,
    //借阅书籍
    reserve: `${host}/libraries/books`,
    // 列表接口 GET
    list: `${host}/books`,
    // 图书馆接口
    libraries: `${host}/libraries`,
    // 图书馆接口
    my_libraries: `${host}/user/libraries`,
    recommend: `${host}/recommend`,
    // 图书馆图书录入
    book_store: `${host}/books`,
    // 图书列表
    books: `${host}/books`,
    // 我的图书
    my_books: `${host}/user/books`,
    // 图书分类
    sorts: `${host}/sorts`,
    // 图书入库
    books_collect: `${host}/user/books/store`,
    // 图书上传
    books_upload: `${host}/uploads`,
    // 筛选页接口 GET
    tags: `${host}/bookmall/tags`,
    // 假装有收藏接口 POST
    collect: `${host}/bookmall/list`,
    // 主域
    host
}

export default {
    service
}
