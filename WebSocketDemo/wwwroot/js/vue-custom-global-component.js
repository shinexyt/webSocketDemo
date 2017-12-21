Vue.component('navbar', {
    template: '\
    <div id="navbar" class="navbar-collapse collapse" aria-expanded="false">\
                <ul class="nav navbar-nav">\
                    <li><a v-bind:href="vd+\'guide\'">去办事</a></li>\
                    <li><a v-bind:href="vd+\'reading\'">看解读</a></li>\
                    <li><a v-bind:href="vd+\'community\'">在社区</a></li>\
                    <li><a v-bind:href="vd+\'watching\'">大讲堂</a></li>\
                    <li><a v-bind:href="vd+\'answer\'">找答案</a></li>\
                    <li><a v-bind:href="vd+\'activity\'">志愿服务</a></li>\
                </ul>\
                <ul class="nav navbar-nav navbar-right">\
                    <!--<li class="active"><a href="#">Home</a></li>-->\
                    <!--<li><a href="#">登录</a></li>-->\
                </ul>\
            </div>\
    ',
    data: function () {
        return { vd: global.virtualDirectory }
    }
});
Vue.component('footer-bar', {
    template: '\
        <footer>\
            <p>&copy2017 国安社区<br> 京ICP备16043196号-1</p>\
        </footer>\
    '
});