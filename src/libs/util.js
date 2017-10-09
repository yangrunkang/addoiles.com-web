let util = {

};

/**
 * 网页标题
 * @param title
 */
util.title = function (title) {
    title = title ? title + ' - Home' : 'Addoiles';
    window.document.title = title;
};
/**
 * 验证参数是否为空
 * @param content 需要验证的内容
 * @returns {boolean} true 不为空  false 为空 
 */
util.validateReq = function (content) {
    if(content == null || content.trim() == '' || content  == undefined){
        return false;
    }
    return true
};
/**
 * 时间格式化
 * @param unixTime 时间戳
 * @returns {string} 格式化后获得时间字符串
 */
util.formatUnixTime = function(unixTime) {
    return new Date(parseInt(unixTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
};
/**
 * 检查是否是当前用户id
 * @param userId 要比对的目标id
 * @param currentLoginUserId 当前登录用户id
 * @returns {boolean} true 是  false 否
 */
util.isCurrentUser = function(userId,currentLoginUserId) {
    return userId == currentLoginUserId;
};


export default util;