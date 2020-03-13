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
    color: '#FCDC00',
    frequencyRange: [1000, 12000]
};
exports["default"] = (function (options) {
    if (options === void 0) { options = {}; }
    var _a = __assign(__assign({}, exports.DEFAULT_OPTIONS), options), color = _a.color, frequencyRange = _a.frequencyRange;
    var parsedColor = util_1.parseCSSColor(color);
    // Memoize the alpha level by frame ID so that we don't recalculate
    // it for each pixel in the frame (pretty computationally expensive
    // since it requires taking a 1024-index weighted average!)
    var memo = {
        id: null,
        alpha: null
    };
    return function (x, y, width, height, frequencyData, frameID) {
        if (memo.id == null || memo.alpha == null || memo.id !== frameID) {
            var L = frequencyData.length;
            var rangeMin = frequencyRange[0], rangeMax = frequencyRange[1];
            var startIndex = Math.round((rangeMin / 24000) * L);
            var endIndex = Math.round((rangeMax / 24000) * L);
            var indexRange = endIndex - startIndex;
            // The idea here is to figure out what the weighted average frequency is
            // Since each index in frequencyData corresponds to a discrete frequency level,
            // we thus find the weighted averae index of that array
            var sumOfWeightedIndices = 0;
            for (var i = startIndex; i < endIndex; i += 1) {
                sumOfWeightedIndices += i * frequencyData[i];
            }
            // Now simply divide that index by our specified valid range of indices to choose
            // from, then again to get it to a [0-1] range, and we have our alpha
            var weightedIndex = sumOfWeightedIndices / indexRange;
            var alpha = weightedIndex / indexRange;
            memo.id = frameID;
            memo.alpha = alpha;
        }
        return {
            r: parsedColor.r,
            g: parsedColor.g,
            b: parsedColor.b,
            a: memo.alpha
        };
    };
});
