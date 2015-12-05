function domutil() {};

domutil.margin = function(name, el) {
    var style = window.getComputedStyle(el);
    return parseFloat(style['margin' + name]) || 0;
};

domutil.y = function (el) {
    return parseFloat(el.style.top);
};

domutil.x = function (el) {
    return parseFloat(el.style.left);
};

domutil.width = function (el) {
    return el.clientWidth;
};

domutil.height = function (el) {
    return el.clientHeight;
};

domutil.bottom = function (el) {
    return this.y(el) + this.height(el) + this.margin('Bottom', el);
};

domutil.right = function (el) {
    return this.x(el) + this.width(el) + this.margin('Right', el);
};

domutil.sort = function (l) {
    l = l.sort(function(a, b) {
        if (this.bottom(a) === this.bottom(b)) {
            return this.x(b) - this.x(a);
        } else {
            return this.bottom(b) - this.bottom(a);
        }
    }.bind(this));
};
