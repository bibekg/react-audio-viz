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
var React = require("react");
var resize_observer_polyfill_1 = require("resize-observer-polyfill");
var NOOP_RETURN_VALUE = [null, function () { }];
var InternalReactAudioViz = function (props) {
    var model = props.model, audioSrcRef = props.audioSrcRef, analyserRef = props.analyserRef, canvasRef = props.canvasRef;
    // Maintain record of the last animation frame request ID so that we can cancel it when we need
    // to create a new handler (i.e. when the model prop changes)
    var lastAnimationFrameRequest = React.useRef(null);
    var createVizImageFromData = React.useCallback(function (frequencyData, canvas, lastFrameID) {
        var width = canvas.width, height = canvas.height;
        var imageData = new ImageData(width, height);
        for (var y = 0, i = 0; y < height; y += 1) {
            for (var x = 0; x < width; x += 1, i += 4) {
                var _a = model(x + 1, y + 1, width, height, frequencyData, lastFrameID), r = _a.r, g = _a.g, b = _a.b, a = _a.a;
                imageData.data[i + 0] = r;
                imageData.data[i + 1] = g;
                imageData.data[i + 2] = b;
                imageData.data[i + 3] = a || 255;
            }
        }
        return imageData;
    }, [model]);
    if (audioSrcRef.current && analyserRef.current && canvasRef.current) {
        var analyser_1 = analyserRef.current;
        var frequencyData_1 = new Uint8Array(analyser_1.frequencyBinCount);
        var vizImage_1;
        var renderFrame_1 = function () {
            var canvas = canvasRef.current;
            if (canvas == null) {
                return;
            }
            var lastFrameID = lastAnimationFrameRequest.current;
            lastAnimationFrameRequest.current = requestAnimationFrame(renderFrame_1);
            analyser_1.getByteFrequencyData(frequencyData_1);
            vizImage_1 = createVizImageFromData(frequencyData_1, canvas, lastFrameID);
            var canvasContext = canvas.getContext('2d');
            if (canvasContext == null || vizImage_1 == null) {
                return;
            }
            canvasContext.putImageData(vizImage_1, 0, 0);
        };
        // Cancel existing animation frame handlers before creating new ones
        // otherwise performance will severely tank
        if (lastAnimationFrameRequest.current) {
            cancelAnimationFrame(lastAnimationFrameRequest.current);
            lastAnimationFrameRequest.current = null;
        }
        lastAnimationFrameRequest.current = requestAnimationFrame(renderFrame_1);
    }
    var refitCanvas = React.useCallback(function () {
        if (canvasRef.current) {
            var canvas = canvasRef.current;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
    }, [canvasRef]);
    refitCanvas();
    if (canvasRef.current) {
        var resizeObserver = new resize_observer_polyfill_1["default"](refitCanvas);
        resizeObserver.observe(canvasRef.current);
    }
    return React.createElement("canvas", { ref: canvasRef, style: { width: '100%', height: '100%' } });
};
var useVisualizer = function (mediaElementRef) {
    var _a = React.useState(false), hasInitialized = _a[0], setHasInitialized = _a[1];
    var canvasRef = React.useRef(null);
    var audioSrcRef = React.useRef(null);
    var analyserRef = React.useRef(null);
    var audioContextRef = React.useRef(null);
    // Create an external ReactAudioViz for the user of this hook by passing in the necessary
    // settings to the internal ReactAudioViz
    var ReactAudioViz = React.useMemo(function () { return function (props) { return (React.createElement(InternalReactAudioViz, __assign({ canvasRef: canvasRef, audioSrcRef: audioSrcRef, analyserRef: analyserRef }, props))); }; }, [canvasRef, audioSrcRef, analyserRef]);
    var initializer = React.useCallback(function () {
        if (hasInitialized) {
            return;
        }
        if (audioContextRef.current == null) {
            if ('AudioContext' in window) {
                audioContextRef.current = new AudioContext();
                // } else if ('webkitAudioContext' in window) {
                // Known bug with webkitAudioContext (Safar/iOS): https://bugs.webkit.org/show_bug.cgi?id=203435
                // TODO: Once that bug is fixed, re-enable the webkitAudioContext path
                // audioContextRef.current = new webkitAudioContext()
            }
            else {
                console.warn("Can't show visualizations in this browser :(");
                return NOOP_RETURN_VALUE;
            }
        }
        if (audioContextRef.current && mediaElementRef.current) {
            audioSrcRef.current = audioContextRef.current.createMediaElementSource(mediaElementRef.current);
            analyserRef.current = audioContextRef.current.createAnalyser();
            if (audioSrcRef.current && analyserRef.current) {
                // we have to connect the MediaElementSource with the analyser
                audioSrcRef.current.connect(analyserRef.current);
                audioSrcRef.current.connect(audioContextRef.current.destination);
            }
            audioContextRef.current.resume();
            setHasInitialized(true);
        }
    }, [
        audioContextRef.current,
        analyserRef.current,
        audioSrcRef.current,
        hasInitialized,
    ]);
    return [ReactAudioViz, initializer];
};
exports["default"] = useVisualizer;
