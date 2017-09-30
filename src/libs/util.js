let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'Addoiles';
    window.document.title = title;
};

util.validateReq = function (content) {
    if(content == null || content.trim() == '' || content  == undefined){
        return false;
    }
    return true
};

export default util;