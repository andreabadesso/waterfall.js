/*!
   --------------------------------
   Waterfall.js
   --------------------------------
   + https://github.com/raphamorim/waterfall
   + version 1.0.0
   + Copyright 2015 Raphael Amorim
   + Licensed under the MIT license
   + Documentation: https://github.com/raphamorim/waterfall
*/

function waterfall(container) {
    if (typeof(container) === 'string')
        container = document.querySelector(container);

    // Freeze the list of nodes
    var els = [].map.call(container.children, function(el) {
        el.style.position = 'absolute';
        return el;
    });
    container.style.position = 'relative';

    function px(n) {
        return n + 'px';
    }

    var boundary = [];

    // Deal with the first element.
    if (els.length) {
        els[0].style.top = '0';
        els[0].style.left = px(domutil.margin('Left', els[0]));
        boundary.push(els[0]);
    }

    // Deal with the first line.
    for (var i = 1; i < els.length; i++) {
        var prev = els[i - 1],
            el = els[i],
            thereIsSpace = domutil.right(prev) + domutil.width(el) <= domutil.width(container);

        if (!thereIsSpace) break;

        el.style.top = prev.style.top;
        el.style.left = px(domutil.right(prev) + domutil.margin('Left', el));

        boundary.push(el);
    }

    // Place following elements at the bottom of the smallest column.
    for (; i < els.length; i++) {
        domutil.sort(boundary);
        var el = els[i],
            minEl = boundary.pop();
        el.style.top = px(domutil.bottom(minEl) + domutil.margin('Top', el));
        el.style.left = px(domutil.x(minEl));
        boundary.push(el);
    }

    domutil.sort(boundary);

    var maxEl = boundary[0];
    container.style.height = px(domutil.bottom(maxEl) + domutil.margin('Bottom', maxEl));

    // Responds to window resize
    var containerWidth = domutil.width(container);

    function resize(e) {
        if (domutil.width(container) != containerWidth) {
            e.target.removeEventListener(e.type, arguments.callee);
            waterfall(container);
        }
    }

    if (window.addEventListener) {
        window.addEventListener('resize', resize);
    } else {
        document.body.onresize = resize;
    }
}
