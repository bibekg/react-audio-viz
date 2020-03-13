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
    fadeBars: true,
    scale: 1.0,
    color: '#F44E3B',
    binSize: 25,
    frequencyRange: [0, 16000]
};
exports["default"] = (function (options) {
    if (options === void 0) { options = {}; }
    var _a = __assign(__assign({}, exports.DEFAULT_OPTIONS), options), reversed = _a.reversed, darkMode = _a.darkMode, scale = _a.scale, color = _a.color, frequencyRange = _a.frequencyRange, binSize = _a.binSize, fadeBars = _a.fadeBars;
    var parsedColor = util_1.parseCSSColor(color);
    var colorMakerOptions = {
        dark: function (c, intensity) { return c * intensity; },
        light: function (c, intensity) { return c + (255 - c) * (1 - intensity); }
    };
    var colorMaker = colorMakerOptions[darkMode ? 'dark' : 'light'];
    var frequencyIndexSelectorOptions = {
        normal: function (x, width, L) { return Math.floor((x / width) * L); },
        reverse: function (x, width, L) { return L - Math.floor((x / width) * L); }
    };
    var frequencyIndexSelector = frequencyIndexSelectorOptions[reversed ? 'reverse' : 'normal'];
    var MIN_INTENSITY = 0.5;
    var offPixel = darkMode
        ? util_1.parseCSSColor('#000000')
        : util_1.parseCSSColor('#ffffff');
    return function (x, y, width, height, frequencyData) {
        var binnedX = Math.floor(x / binSize) * binSize;
        var frequencyIndex = frequencyIndexSelector(binnedX, width, 
        // Tell the index selector to limit its options to the provided frequency range
        Math.floor(((frequencyRange[1] - frequencyRange[0]) / 24000) * frequencyData.length));
        // The frequency magnitude in [0, 1]
        var frequencyMagnitudeForThisPixel = frequencyData[frequencyIndex] / 255;
        var range = height / 2;
        var scaledRange = range * scale;
        // yPosition in [0, 1]
        var yPosition = Math.abs(range - y) / scaledRange;
        var scaledIntensity = (1 - yPosition / frequencyMagnitudeForThisPixel) * (1 - MIN_INTENSITY) +
            MIN_INTENSITY;
        var turnOn = yPosition <= frequencyMagnitudeForThisPixel;
        return turnOn
            ? {
                r: fadeBars
                    ? colorMaker(parsedColor.r, scaledIntensity)
                    : parsedColor.r,
                g: fadeBars
                    ? colorMaker(parsedColor.g, scaledIntensity)
                    : parsedColor.g,
                b: fadeBars
                    ? colorMaker(parsedColor.b, scaledIntensity)
                    : parsedColor.b
            }
            : offPixel;
    };
});
