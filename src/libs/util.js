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

/**
 * 是否是草稿
 */
util.isDraft = function(delete_status) {

    return delete_status === 2 ? "[草稿]" : "";
};

/**
 * 是否公开
 */
util.isHide = function(is_hide) {
    return is_hide === 1 ? "[不公开]" : "";
};

util.getInputTypePlaceHolder = function (type) {
    switch(type){
        case 0:
            return '最早的编程语言是在电脑发明之后产生的，当时是用来控制提花织布机及自动演奏钢琴的动作。';
        case 1:
            return '开发Bug多怎么办';
        case 2:
            return '我的英文名是Cache,欢迎和我做朋友';
        case 3:
            return '最初的电脑并没有操作系统，人们通过各种操作按钮来控制计算机，后来出现了汇编语言，操作人员通过有孔的纸带将程序输入电脑进行编译。这些将语言内置的电脑只能由操作人员自己编写程序来运行，不利于设备、程序的共用。为了解决这种问题，就出现了操作系统，这样就很好实现了程序的共用，以及对计算机硬件资源的管理';
        case 4:
            return '在百端待举、日理万机中，毛泽东仍然念念不忘少年儿童的教育与健康。1950年6月19日，毛泽东写信给当时的教育部部长马叙伦：“要各校注意健康第一，学习第二。营养不足，宜酌增经费。”1951年9月底，毛泽东接见安徽参加国庆的代表团，代表团成员中有渡江小英雄马三姐。毛泽东关切地问她念书情况，还送她一本精美的笔记本，并且在扉页上题词：好好学习，天天向上';
        default:
            return '你的技术很OK,^B^';

    }
};

export default util;