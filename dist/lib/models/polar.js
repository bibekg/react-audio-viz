"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var util_1 = require("../util");
exports.DEFAULT_OPTIONS = {
    darkMode: true,
    reversed: false,
    scale: 2,
    binSize: 50,
    color: '#009CE0'
};
exports["default"] = (function (options) {
    if (options === void 0) { options = {}; }
    var _a = __assign(__assign({}, exports.DEFAULT_OPTIONS), options), reversed = _a.reversed, scale = _a.scale, darkMode = _a.darkMode, color = _a.color, binSize = _a.binSize;
    var parsedColor = util_1.parseCSSColor(color) || { r: 0, g: 0, b: 0 };
    var colorMakerOptions = {
        dark: function (c, f) { return c * (f / 255); },
        // TODO: Performance tank due to so many operations here
        light: function (c, f) { return c + (255 - c) * (1 - f / 255); }
    };
    var colorMaker = colorMakerOptions[darkMode ? 'dark' : 'light'];
    var frequencyIndexSelectorOptions = {
        normal: function (r, R, L) { return Math.min(Math.floor((r / R) * L), L); },
        reversed: function (r, R, L) { return L - 1 - Math.min(Math.floor((r / R) * L), L); }
    };
    var frequencyIndexSelector = frequencyIndexSelectorOptions[reversed ? 'reversed' : 'normal'];
    return function (x, y, width, height, frequencyData, frameID) {
        var centerX = Math.floor(width / 2);
        var centerY = Math.floor(height / 2);
        // The viz will be a circle with radius equaling the distance from the center to any of the four cocrners
        // This will ensure that the visible area is fully contained within the circle
        var R = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2)) * scale;
        var radius = Math.sqrt(Math.pow((centerX - x), 2) + Math.pow((centerY - y), 2));
        var binnedRadius = Math.floor(radius / binSize) * binSize;
        var frequencyMagnitudeForThisPixel = frequencyData[frequencyIndexSelector(binnedRadius, R, frequencyData.length)];
        return {
            r: colorMaker(parsedColor.r, frequencyMagnitudeForThisPixel),
            g: colorMaker(parsedColor.g, frequencyMagnitudeForThisPixel),
            b: colorMaker(parsedColor.b, frequencyMagnitudeForThisPixel)
        };
    };
});
