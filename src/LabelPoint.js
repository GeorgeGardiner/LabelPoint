/**
 * LabelPoint.js
 *
 * Class to find the optimum placement for a label inside an irregular polygon using
 * Polls of Inaccessibility algorithm.
 *
 * George Gardiner
 * www.commonmode.co.uk
 */

(function (window, undefined) {
    var LabelPoint = {
        find: function (points, precision) {
            if (precision == undefined) {
                precision = 1;
            }
            var x_min, y_min, x_max, y_max;
            for (var i = 0; i < points.length; i++) {
                if (i == 0) {
                    x_min = x_max = points[i].x;
                    y_min = y_max = points[i].y;
                }
                else {
                    x_min = Math.min(x_min, points[i].x);
                    x_max = Math.max(x_max, points[i].x);
                    y_min = Math.min(y_min, points[i].y);
                    y_max = Math.max(y_max, points[i].y);
                }
            }
            var lp = this.pollScan(x_min, y_min, x_max, y_max, points);
            if (precision > 0) {
                var r = ((x_max - x_min) * (y_max - y_min));
                var dx, dy;
                while (r > precision) {
                    lp = this.pollScan(x_min, y_min, x_max, y_max, points);
                    dx = (x_max - x_min) / 24;
                    dy = (y_max - y_min) / 24;
                    x_min = lp.x - dx;
                    x_max = lp.x + dx;
                    y_min = lp.y - dy;
                    y_max = lp.y + dy;
                    r = dx * dy;
                }
            }
            return lp;
        },
        pointToLineDistance: function (x, y, x1, y1, x2, y2) {
            var A = x - x1;
            var B = y - y1;
            var C = x2 - x1;
            var D = y2 - y1;
            var dot = A * C + B * D;
            var len_sq = C * C + D * D;
            var param = -1;
            if (len_sq != 0) {
                param = dot / len_sq;
            }
            var xx, yy;
            if (param < 0) {
                xx = x1;
                yy = y1;
            }
            else if (param > 1) {
                xx = x2;
                yy = y2;
            }
            else {
                xx = x1 + param * C;
                yy = y1 + param * D;
            }
            var dx = x - xx;
            var dy = y - yy;
            return Math.sqrt(dx * dx + dy * dy);
        },
        pointToPerimeterDistance: function (x, y, points) {
            var d, p1, p2, minDistance;
            for (var i = 0; i < points.length; i++) {
                p1 = points[i];
                if ((i + 1) < points.length) {
                    p2 = points[i + 1];
                }
                else {
                    p2 = points[0];
                }
                d = this.pointToLineDistance(x, y, p1.x, p1.y, p2.x, p2.y);
                if (i == 0) {
                    minDistance = d;
                }
                else {
                    if (d < minDistance) {
                        minDistance = d;
                    }
                }
            }
            return minDistance;
        },
        isInside: function (x, y, points) {
            for (var c = false, i = -1, l = points.length, j = l - 1; ++i < l; j = i)
                ((points[i].y <= y && y < points[j].y) || (points[j].y <= y && y < points[i].y))
                    && (x < (points[j].x - points[i].x) * (y - points[i].y) / (points[j].y - points[i].y) + points[i].x)
                && (c = !c);
            return c;
        },
        pollScan: function (x_min, y_min, x_max, y_max, points) {
            var px, py, pd, maxDistance = 0;
            for (var y = y_min; y < y_max; y += ((y_max - y_min) / 24)) {
                for (var x = x_min; x < x_max; x += ((x_max - x_min) / 24)) {
                    if (this.isInside(x, y, points)) {
                        pd = this.pointToPerimeterDistance(x, y, points);
                        if (pd > maxDistance) {
                            maxDistance = pd;
                            px = x;
                            py = y;
                        }
                    }
                }
            }
            return {
                x: px,
                y: py
            };
        }
    };
    window.LabelPoint = LabelPoint;
})(window);
