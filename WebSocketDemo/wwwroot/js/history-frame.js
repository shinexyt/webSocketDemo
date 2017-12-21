var state = { showIframe: false };
window.history.pushState(state, null);

function loadFrame(obj) {
    window.history.pushState(null, null, "detail.html");
    app.url = obj.dataset.href;
    app.iFShowIframe = true;
}
window.onpopstate = function () {
    var state = window.history.state;
    if (state) {
        app.iFShowIframe = state.showIframe;
    }
    else
        window.history.go(-1);
}