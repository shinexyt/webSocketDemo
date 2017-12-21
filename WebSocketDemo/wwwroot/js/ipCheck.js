var apiQuery = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
$.ajax({
    url: apiQuery,
    type: 'GET',
    dataType: 'script',
    success: (data, ts, xhr) => {
        if (ts === 'success') {
            console.log(remote_ip_info);
            if (remote_ip_info.ret === 1) {
                switch (remote_ip_info.city) {
                    case "上海":
                        window.location.href = "http://sh.guoanshequ.top";
                        break;
                    case "天津":
                        window.location.href = "http://tj.guoanshequ.top";
                        break;
                    case "昆明":
                        window.location.href = "http://km.guoanshequ.top";
                        break;
                    case "深圳":
                        window.location.href = "http://sz.guoanshequ.top";
                        break;
                    case "贵阳":
                        window.location.href = "http://gy.guoanshequ.top";
                        break;
                }
            } else {
                console.log('没能找到客户端IP定位信息');
            }
        } else {
            console.log('访问接口服务失败');
        }
    }
})