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

/**
 * 获取随机图标
 */
util.getRandomIcon = function () {
    let iconArr = ["ios-lightbulb-outline","paper-airplane","quote","waterdrop","ios-analytics-outline","ios-wineglass-outline","fireball","ios-americanfootball-outline","earth"];
    let iconArrSize = iconArr.length;

    let index = 0;

    try {
        index = Math.round(Math.random() * iconArrSize); //四舍五入
    } catch (e) {
        index = 0;
    }

    return iconArr[index];
};

/**
 * 获取AlertType
 * @returns {string}
 */
util.getRandAlertType = function () {
    let iconArr = ["success","warning","error"];
    let iconArrSize = iconArr.length;

    let index = 0;

    try {
        index = Math.round(Math.random() * iconArrSize); //四舍五入
    } catch (e) {
        index = 0;
    }

    return iconArr[index];
};


export default util;