let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'Addoiles';
    window.document.title = title;
};
//验证参数
util.validateReq = function (content) {
    if(content == null || content.trim() == '' || content  == undefined){
        return false;
    }
    return true
};
//时间格式化
util.formatUnixTime = function(unixTime) {
    return new Date(parseInt(unixTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
};

export default util;