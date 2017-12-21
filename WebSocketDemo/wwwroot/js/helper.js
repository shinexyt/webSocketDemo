/*$(document).on('ajaxError', function (e, xhr, options) {
    if (404 == xhr.status) {
    }
    else if (500 == xhr.status) {
    }
});
*/
function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function getDiff(start, end, fmat) {
    var start = start.replace(/-/g, '/');
    var end = end.replace(/-/g, '/');
    //var format = { 'ss': 1000, 'mm': 60 * 1000, 'hh': 60 * 60 * 1000, 'dd': 1000 * 60 * 60 * 24 };
    var startDate = new Date(Date.parse(start));
    var endDate = new Date(Date.parse(end));
    var totalHours = (endDate.getTime() - startDate.getTime()) / (60 * 60 * 1000);
    var totalDays = Math.floor(totalHours / 24);
    var hours = Math.round(totalHours % 24);
    return totalDays + '天' + hours + '小时';
}