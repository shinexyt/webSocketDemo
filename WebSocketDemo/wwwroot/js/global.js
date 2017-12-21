var global = {
    // baseUrl: "http://localhost:8180",
    // baseUrl: "http://km.guoanshequ.top",  //城市街口
    baseUrl: "http://ggfw.guoanshequ.top",  
    // virtualDirectory="/GuoAnH5/",
    virtualDirectory: "/",
    townId: 37,
    userInfo: {},
    isLogin: function () {
        if (localStorage.userInfo || sessionStorage.userInfo) {
            if (localStorage.userInfo)
                this.userInfo = JSON.parse(localStorage.userInfo);
            else
                this.userInfo = JSON.parse(sessionStorage.userInfo);
            return true;
        } else
            return false;
    },
    cancellation: function () {
        localStorage.userInfo = '';
        sessionStorage.userInfo = '';
        global.userInfo = null;
    }
};