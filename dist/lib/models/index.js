"use strict";
exports.__esModule = true;
var polar_1 = require("./polar");
var horizontal_1 = require("./horizontal");
var pulse_1 = require("./pulse");
exports["default"] = { polar: polar_1["default"], horizontal: horizontal_1["default"], pulse: pulse_1["default"] };
exports.defaultOptions = {
    polar: polar_1.DEFAULT_OPTIONS,
    horizontal: horizontal_1.DEFAULT_OPTIONS,
    pulse: pulse_1.DEFAULT_OPTIONS
};
