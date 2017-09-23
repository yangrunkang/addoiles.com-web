let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'Addoiles';
    window.document.title = title;
};

export default util;