var limit = 10;
new Vue({
    el: '#app',
    data: {
        list: [],
        isLoading: true,
        nodeName: decodeURI(getUrlVars()["nodeName"]),
        nodeId: getUrlVars()["nodeId"]
    },
    methods: {
        nextPage: function (e) {
            e.preventDefault();
            $(e.currentTarget).hide();
            this.loadPageList(e.currentTarget.dataset.pageNumber, limit);
            e.currentTarget.dataset.pageNumber++;
        },
        loadPageList: function (pageNumber, limit) {
            var api = "/webapi/v1/community/info/list";
            var jsonData = { 
                "header": { "userid": "", "token": "" }, 
                "body": { "cityid": 1, "nodeid": this.nodeId, "page": pageNumber, "limit": limit } 
            };
            $.ajax({
                url: global.baseUrl + api,
                type: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify(jsonData),
                success: (data) => {
                    this.isLoading = false;
                    if (data.header.code == 0) {
                        var newArray = this.list.concat(data.body.list);
                        this.list = newArray;
        
                        if (data.body.list.length < limit)
                            $("#btnNext").hide();
                        else
                            $("#btnNext").show();
                    }
                }
            });
        }
    },
    created: function () {
        $(document).attr("title", this.nodeName);
        this.loadPageList(0, limit);
    }
});