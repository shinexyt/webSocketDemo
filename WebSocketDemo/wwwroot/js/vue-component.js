Vue.component('my-transition-group', {
    props: ['tag'],
    template: '\
    <transition-group\
      name="very-special-transition"\
      v-bind:tag="tag"\
      v-on:before-enter="beforeEnter"\
      v-on:enter="enter"\
    >\
      <slot></slot>\
    </transition-group>\
  ',
    methods: {
        beforeEnter: function(el) {
            el.style.opacity = 0
        },
        enter: function(el, done) {
            var delay = el.dataset.index * 80
            setTimeout(function() {
                Velocity(
                    el, {
                        opacity: 1
                    }, {
                        complete: done
                    }
                )
            }, delay)
        }
    }
})