"use strict";

//source for parts of js solution: https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c#.uwfs3la8l
//http://jsfiddle.net/mariusc23/s6mLJ/31/

var Navigation = {
  config: {
    // tl: new TimelineLite(),
    didScroll: false,
    delta: 5,
    lastScrollTop: 0,
    lastScrollUp: false,
    lastScrollDown: false
  },
  dom: {
    nav: document.getElementById('js-nav'),
    navHeight: parseFloat(getComputedStyle(document.getElementById('js-nav', null)).height.split('px')[0]),
    boxShadow: parseFloat(getComputedStyle(document.getElementById('js-nav', null)).boxShadow[27]),
    eHeight: parseFloat(getComputedStyle(document.getElementById('js-nav', null)).height.split('px')[0]) + parseFloat(getComputedStyle(document.getElementById('js-nav', null)).boxShadow[27]),
    navOpen: document.getElementById('js-nav-open'),
    navClose: document.getElementById('js-nav-close')
  },
  callbackSetInterval: function callbackSetInterval() {
    if (this.config.didScroll) {
      this.config.didScroll = false;
      this.hasScrolled();
    }
  },
  addSetInterval: function addSetInterval() {
    setInterval(this.callbackSetInterval.bind(this), 250);
  },
  scrollUp: function scrollUp() {
    TweenLite.to(this.dom.nav, 0.6, { ease: Power3.easeOut, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.6)", y: 0, force3D: true });
  },
  scrollDown: function scrollDown(height) {
    TweenLite.to(this.dom.nav, 0.6, { ease: Power3.easeIn, boxShadow: "0px 0px 8px rgba(0, 0, 0, 0)", y: -height, force3D: true });
  },
  hasScrolled: function hasScrolled() {
    //fn config
    var wScroll = window.scrollY,
        scrollNotEnough = Math.abs(this.config.lastScrollTop - wScroll) <= this.config.delta,
        height = this.dom.navHeight + this.dom.boxShadow,
        scrollUp = wScroll < this.config.lastScrollTop,
        scrollDown = wScroll > this.config.lastScrollTop,
        // && wScroll > this.dom.navHeight;  //???!!!
    directionChanged = this.config.lastScrollUp !== scrollUp || this.config.lastScrollDown !== scrollDown;

    if (scrollNotEnough) {
      return;
    }
    //detecting scroll-down
    if (directionChanged && scrollDown) {
      this.scrollDown(this.dom.eHeight);   // ||height
    }
    //detecting scroll-up
    if (directionChanged && scrollUp) {
      this.scrollUp();
    }

    this.config.lastScrollTop = wScroll;
    this.config.lastScrollUp = scrollUp;
    this.config.lastScrollDown = scrollDown;
  },
  scrollHandler: function scrollHandler() {
    this.config.didScroll = true;
  },
  attachListener: function attachListener(el, handler) {
    var ev = arguments.length <= 2 || arguments[2] === undefined ? 'click' : arguments[2];

    el.addEventListener(ev, handler, false);
  },
  init: function init() {
    if (this.dom.nav === null) {
      return;
    }
    this.attachListener(window, this.scrollHandler.bind(this), 'scroll');
    this.attachListener(this.dom.nav, function () {
      return console.log("something happens");
    });
    this.addSetInterval();
  }
};

Navigation.init();
