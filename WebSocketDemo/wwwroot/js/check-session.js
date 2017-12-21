//localStorage.session = "";
if (!localStorage.session) {
    var apiInit = "/webapi/v1/app/init";
    var pass = "5DujNCNOzRHobqRJ";
    var jsonBody = {
        "header": { "userid": "", "token": "" },
        "body": { "storeid": "", "pass": pass }
    };

    $.ajax({
        url: global.baseUrl + apiInit,
        type: 'POST',
        headers: {
            // "Accept-Encoding": "GuoAnZWEncoding",
            // "Content-Encoding": "GuoAnZWEncoding",
            "Content-Type": "application/json"
            // "GAZWSession": ""
        },
        data: JSON.stringify(jsonBody),
        //dataType: 'json',
        success:function (data) {
            localStorage.session = data.body.session;
            localStorage.setItem(data.body.session, pass);
            //console.log("pass=" + localStorage.getItem(data.body.session))
        },
        error: function (xhr, textStatus) {
            console.log('错误')
            console.log(xhr)
            console.log(textStatus)
        }
        // complete: function() {
        //     console.log('结束')
        // }
    })
}