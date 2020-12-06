/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/jdenticon/dist/jdenticon-module.mjs":
/*!**********************************************************!*\
  !*** ./node_modules/jdenticon/dist/jdenticon-module.mjs ***!
  \**********************************************************/
/*! exports provided: bundle, configure, drawIcon, toSvg, update, updateCanvas, updateSvg, version */
/*! exports used: toSvg */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export bundle */
/* unused harmony export configure */
/* unused harmony export drawIcon */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return toSvg; });
/* unused harmony export update */
/* unused harmony export updateCanvas */
/* unused harmony export updateSvg */
/* unused harmony export version */
/**
 * Jdenticon 3.0.1
 * http://jdenticon.com
 *
 * Built: 2020-08-03T16:58:18.496Z
 * 
 * MIT License
 * 
 * Copyright (c) 2014-2020 Daniel Mester Pirttijärvi
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Parses a substring of the hash as a number.
 * @param {number} startPosition 
 * @param {number=} octets 
 * @noinline
 */
function parseHex(hash, startPosition, octets) {
    return parseInt(hash.substr(startPosition, octets), 16);
}

function decToHex(v) {
    v |= 0; // Ensure integer value
    return v < 0 ? "00" :
        v < 16 ? "0" + v.toString(16) :
        v < 256 ? v.toString(16) :
        "ff";
}

function hueToRgb(m1, m2, h) {
    h = h < 0 ? h + 6 : h > 6 ? h - 6 : h;
    return decToHex(255 * (
        h < 1 ? m1 + (m2 - m1) * h :
        h < 3 ? m2 :
        h < 4 ? m1 + (m2 - m1) * (4 - h) :
        m1));
}

/**
 * @param {string} color  Color value to parse. Currently hexadecimal strings on the format #rgb[a] and #rrggbb[aa] are supported.
 */
function parseColor(color) {
    if (/^#[0-9a-f]{3,8}$/i.test(color)) {
        let result;

        if (color.length < 6) {
            const r = color[1],
                  g = color[2],
                  b = color[3],
                  a = color[4] || "";
            result = "#" + r + r + g + g + b + b + a + a;
        }
        if (color.length == 7 || color.length > 8) {
            result = color;
        }
        
        return result;
    }
}

/**
 * @param {string} hexColor  Color on the format "#RRGGBB" or "#RRGGBBAA"
 */
function toCss3Color(hexColor) {
    const a = parseHex(hexColor, 7, 2);
    let result;

    if (isNaN(a)) {
        result = hexColor;
    } else {
        const r = parseHex(hexColor, 1, 2),
            g = parseHex(hexColor, 3, 2),
            b = parseHex(hexColor, 5, 2);
        result = "rgba(" + r + "," + g + "," + b + "," + (a / 255).toFixed(2) + ")";
    }

    return result;
}

/**
 * @param h Hue [0, 1]
 * @param s Saturation [0, 1]
 * @param l Lightness [0, 1]
 */
function hsl(h, s, l) {
    // Based on http://www.w3.org/TR/2011/REC-css3-color-20110607/#hsl-color
    let result;

    if (s == 0) {
        const partialHex = decToHex(l * 255);
        result = partialHex + partialHex + partialHex;
    }
    else {
        const m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s,
              m1 = l * 2 - m2;
        result =
            hueToRgb(m1, m2, h * 6 + 2) +
            hueToRgb(m1, m2, h * 6) +
            hueToRgb(m1, m2, h * 6 - 2);
    }

    return "#" + result;
}

// This function will correct the lightness for the "dark" hues
function correctedHsl(h, s, l) {
    // The corrector specifies the perceived middle lightness for each hue
    const correctors = [ 0.55, 0.5, 0.5, 0.46, 0.6, 0.55, 0.55 ],
          corrector = correctors[(h * 6 + 0.5) | 0];
    
    // Adjust the input lightness relative to the corrector
    l = l < 0.5 ? l * corrector * 2 : corrector + (l - 0.5) * (1 - corrector) * 2;
    
    return hsl(h, s, l);
}

// In the future we can replace `GLOBAL` with `globalThis`, but for now use the old school global detection for
// backward compatibility.

const GLOBAL = 
    typeof window !== "undefined" ? window :
    typeof self !== "undefined" ? self :
    typeof global !== "undefined" ? global :
    {};

/**
 * @noinline
 */
const ROOT_CONFIG_PROPERTY = "config";

var rootConfigurationHolder = {};

/**
 * Sets a new icon style configuration. The new configuration is not merged with the previous one. * 
 * @param {Object} newConfiguration - New configuration object.
 */
function configure(newConfiguration) {
    if (arguments.length) {
        rootConfigurationHolder[ROOT_CONFIG_PROPERTY] = newConfiguration;
    }
    return rootConfigurationHolder[ROOT_CONFIG_PROPERTY];
}

/**
 * Gets the normalized current Jdenticon color configuration. Missing fields have default values.
 * @param {Object|number|undefined} paddingOrLocalConfig - Configuration passed to the called API method. A
 *    local configuration overrides the global configuration in it entirety. This parameter can for backward
 *    compatibility also contain a padding value. A padding value only overrides the global padding, not the
 *    entire global configuration.
 * @param {number} defaultPadding - Padding used if no padding is specified in neither the configuration nor
 *    explicitly to the API method.
 */
function getConfiguration(paddingOrLocalConfig, defaultPadding) {
    const configObject = 
            typeof paddingOrLocalConfig == "object" && paddingOrLocalConfig ||
            rootConfigurationHolder[ROOT_CONFIG_PROPERTY] ||
            GLOBAL["jdenticon_config"] ||
            { },

        lightnessConfig = configObject["lightness"] || { },
        
        // In versions < 2.1.0 there was no grayscale saturation -
        // saturation was the color saturation.
        saturation = configObject["saturation"] || { },
        colorSaturation = "color" in saturation ? saturation["color"] : saturation,
        grayscaleSaturation = saturation["grayscale"],

        backColor = configObject["backColor"],
        padding = configObject["padding"];
    
    /**
     * Creates a lightness range.
     */
    function lightness(configName, defaultRange) {
        let range = lightnessConfig[configName];
        
        // Check if the lightness range is an array-like object. This way we ensure the
        // array contain two values at the same time.
        if (!(range && range.length > 1)) {
            range = defaultRange;
        }

        /**
         * Gets a lightness relative the specified value in the specified lightness range.
         */
        return function (value) {
            value = range[0] + value * (range[1] - range[0]);
            return value < 0 ? 0 : value > 1 ? 1 : value;
        };
    }

    /**
     * Gets a hue allowed by the configured hue restriction,
     * provided the originally computed hue.
     */
    function hueFunction(originalHue) {
        const hueConfig = configObject["hues"];
        let hue;
        
        // Check if 'hues' is an array-like object. This way we also ensure that
        // the array is not empty, which would mean no hue restriction.
        if (hueConfig && hueConfig.length > 0) {
            // originalHue is in the range [0, 1]
            // Multiply with 0.999 to change the range to [0, 1) and then truncate the index.
            hue = hueConfig[0 | (0.999 * originalHue * hueConfig.length)];
        }

        return typeof hue == "number" ?
            
            // A hue was specified. We need to convert the hue from
            // degrees on any turn - e.g. 746° is a perfectly valid hue -
            // to turns in the range [0, 1).
            ((((hue / 360) % 1) + 1) % 1) :

            // No hue configured => use original hue
            originalHue;
    }
        
    return {
        P/*hue*/: hueFunction,
        n/*colorSaturation*/: typeof colorSaturation == "number" ? colorSaturation : 0.5,
        C/*grayscaleSaturation*/: typeof grayscaleSaturation == "number" ? grayscaleSaturation : 0,
        o/*colorLightness*/: lightness("color", [0.4, 0.8]),
        D/*grayscaleLightness*/: lightness("grayscale", [0.3, 0.9]),
        F/*backColor*/: parseColor(backColor),
        R/*iconPadding*/: 
            typeof paddingOrLocalConfig == "number" ? paddingOrLocalConfig : 
            typeof padding == "number" ? padding : 
            defaultPadding
    }
}

/**
 * Represents a point.
 */
class Point {
    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

/**
 * Translates and rotates a point before being passed on to the canvas context. This was previously done by the canvas context itself, 
 * but this caused a rendering issue in Chrome on sizes > 256 where the rotation transformation of inverted paths was not done properly.
 */
class Transform {
    /**
     * @param {number} x The x-coordinate of the upper left corner of the transformed rectangle.
     * @param {number} y The y-coordinate of the upper left corner of the transformed rectangle.
     * @param {number} size The size of the transformed rectangle.
     * @param {number} rotation Rotation specified as 0 = 0 rad, 1 = 0.5π rad, 2 = π rad, 3 = 1.5π rad
     */
    constructor(x, y, size, rotation) {
        this.p/*_x*/ = x;
        this.q/*_y*/ = y;
        this.G/*_size*/ = size;
        this.S/*_rotation*/ = rotation;
    }

    /**
     * Transforms the specified point based on the translation and rotation specification for this Transform.
     * @param {number} x x-coordinate
     * @param {number} y y-coordinate
     * @param {number=} w The width of the transformed rectangle. If greater than 0, this will ensure the returned point is of the upper left corner of the transformed rectangle.
     * @param {number=} h The height of the transformed rectangle. If greater than 0, this will ensure the returned point is of the upper left corner of the transformed rectangle.
     */
    H/*transformIconPoint*/(x, y, w, h) {
        const right = this.p/*_x*/ + this.G/*_size*/,
              bottom = this.q/*_y*/ + this.G/*_size*/,
              rotation = this.S/*_rotation*/;
        return rotation === 1 ? new Point(right - y - (h || 0), this.q/*_y*/ + x) :
               rotation === 2 ? new Point(right - x - (w || 0), bottom - y - (h || 0)) :
               rotation === 3 ? new Point(this.p/*_x*/ + y, bottom - x - (w || 0)) :
               new Point(this.p/*_x*/ + x, this.q/*_y*/ + y);
    }
}

const NO_TRANSFORM = new Transform(0, 0, 0, 0);

/**
 * Provides helper functions for rendering common basic shapes.
 */
class Graphics {
    constructor(renderer) {
        this.I/*_renderer*/ = renderer;
        this.t/*_transform*/ = NO_TRANSFORM;
    }

    /**
     * Adds a polygon to the underlying renderer.
     * @param {Array} points The points of the polygon clockwise on the format [ x0, y0, x1, y1, ..., xn, yn ]
     * @param {boolean=} invert Specifies if the polygon will be inverted.
     */
    g/*addPolygon*/(points, invert) {
        const di = invert ? -2 : 2, 
              transform = this.t/*_transform*/,
              transformedPoints = [];
        
        for (let i = invert ? points.length - 2 : 0; i < points.length && i >= 0; i += di) {
            transformedPoints.push(transform.H/*transformIconPoint*/(points[i], points[i + 1]));
        }
        
        this.I/*_renderer*/.g/*addPolygon*/(transformedPoints);
    }
    
    /**
     * Adds a polygon to the underlying renderer.
     * Source: http://stackoverflow.com/a/2173084
     * @param {number} x The x-coordinate of the upper left corner of the rectangle holding the entire ellipse.
     * @param {number} y The y-coordinate of the upper left corner of the rectangle holding the entire ellipse.
     * @param {number} size The size of the ellipse.
     * @param {boolean=} invert Specifies if the ellipse will be inverted.
     */
    h/*addCircle*/(x, y, size, invert) {
        const p = this.t/*_transform*/.H/*transformIconPoint*/(x, y, size, size);
        this.I/*_renderer*/.h/*addCircle*/(p, size, invert);
    }

    /**
     * Adds a rectangle to the underlying renderer.
     * @param {number} x The x-coordinate of the upper left corner of the rectangle.
     * @param {number} y The y-coordinate of the upper left corner of the rectangle.
     * @param {number} w The width of the rectangle.
     * @param {number} h The height of the rectangle.
     * @param {boolean=} invert Specifies if the rectangle will be inverted.
     */
    i/*addRectangle*/(x, y, w, h, invert) {
        this.g/*addPolygon*/([
            x, y, 
            x + w, y,
            x + w, y + h,
            x, y + h
        ], invert);
    }

    /**
     * Adds a right triangle to the underlying renderer.
     * @param {number} x The x-coordinate of the upper left corner of the rectangle holding the triangle.
     * @param {number} y The y-coordinate of the upper left corner of the rectangle holding the triangle.
     * @param {number} w The width of the triangle.
     * @param {number} h The height of the triangle.
     * @param {number} r The rotation of the triangle (clockwise). 0 = right corner of the triangle in the lower left corner of the bounding rectangle.
     * @param {boolean=} invert Specifies if the triangle will be inverted.
     */
    j/*addTriangle*/(x, y, w, h, r, invert) {
        const points = [
            x + w, y, 
            x + w, y + h, 
            x, y + h,
            x, y
        ];
        points.splice(((r || 0) % 4) * 2, 2);
        this.g/*addPolygon*/(points, invert);
    }

    /**
     * Adds a rhombus to the underlying renderer.
     * @param {number} x The x-coordinate of the upper left corner of the rectangle holding the rhombus.
     * @param {number} y The y-coordinate of the upper left corner of the rectangle holding the rhombus.
     * @param {number} w The width of the rhombus.
     * @param {number} h The height of the rhombus.
     * @param {boolean=} invert Specifies if the rhombus will be inverted.
     */
    J/*addRhombus*/(x, y, w, h, invert) {
        this.g/*addPolygon*/([
            x + w / 2, y,
            x + w, y + h / 2,
            x + w / 2, y + h,
            x, y + h / 2
        ], invert);
    }
}

/**
 * @param {number} index
 * @param {Graphics} g
 * @param {number} cell
 * @param {number} positionIndex
 */
function centerShape(index, g, cell, positionIndex) {
    index = index % 14;

    let k, m, w, h, inner, outer;

    !index ? (
        k = cell * 0.42,
        g.g/*addPolygon*/([
            0, 0,
            cell, 0,
            cell, cell - k * 2,
            cell - k, cell,
            0, cell
        ])) :

    index == 1 ? (
        w = 0 | (cell * 0.5), 
        h = 0 | (cell * 0.8),

        g.j/*addTriangle*/(cell - w, 0, w, h, 2)) :

    index == 2 ? (
        w = 0 | (cell / 3),
        g.i/*addRectangle*/(w, w, cell - w, cell - w)) :

    index == 3 ? (
        inner = cell * 0.1,
        // Use fixed outer border widths in small icons to ensure the border is drawn
        outer = 
            cell < 6 ? 1 :
            cell < 8 ? 2 :
            (0 | (cell * 0.25)),
        
        inner = 
            inner > 1 ? (0 | inner) : // large icon => truncate decimals
            inner > 0.5 ? 1 :         // medium size icon => fixed width
            inner,                    // small icon => anti-aliased border

        g.i/*addRectangle*/(outer, outer, cell - inner - outer, cell - inner - outer)) :

    index == 4 ? (
        m = 0 | (cell * 0.15),
        w = 0 | (cell * 0.5),
        g.h/*addCircle*/(cell - w - m, cell - w - m, w)) :

    index == 5 ? (
        inner = cell * 0.1,
        outer = inner * 4,

        // Align edge to nearest pixel in large icons
        outer > 3 && (outer = 0 | outer),
        
        g.i/*addRectangle*/(0, 0, cell, cell),
        g.g/*addPolygon*/([
            outer, outer,
            cell - inner, outer,
            outer + (cell - outer - inner) / 2, cell - inner
        ], true)) :

    index == 6 ? 
        g.g/*addPolygon*/([
            0, 0,
            cell, 0,
            cell, cell * 0.7,
            cell * 0.4, cell * 0.4,
            cell * 0.7, cell,
            0, cell
        ]) :

    index == 7 ? 
        g.j/*addTriangle*/(cell / 2, cell / 2, cell / 2, cell / 2, 3) :

    index == 8 ? (
        g.i/*addRectangle*/(0, 0, cell, cell / 2),
        g.i/*addRectangle*/(0, cell / 2, cell / 2, cell / 2),
        g.j/*addTriangle*/(cell / 2, cell / 2, cell / 2, cell / 2, 1)) :

    index == 9 ? (
        inner = cell * 0.14,
        // Use fixed outer border widths in small icons to ensure the border is drawn
        outer = 
            cell < 4 ? 1 :
            cell < 6 ? 2 :
            (0 | (cell * 0.35)),

        inner = 
            cell < 8 ? inner : // small icon => anti-aliased border
            (0 | inner),       // large icon => truncate decimals

        g.i/*addRectangle*/(0, 0, cell, cell),
        g.i/*addRectangle*/(outer, outer, cell - outer - inner, cell - outer - inner, true)) :

    index == 10 ? (
        inner = cell * 0.12,
        outer = inner * 3,

        g.i/*addRectangle*/(0, 0, cell, cell),
        g.h/*addCircle*/(outer, outer, cell - inner - outer, true)) :

    index == 11 ? 
        g.j/*addTriangle*/(cell / 2, cell / 2, cell / 2, cell / 2, 3) :

    index == 12 ? (
        m = cell * 0.25,
        g.i/*addRectangle*/(0, 0, cell, cell),
        g.J/*addRhombus*/(m, m, cell - m, cell - m, true)) :

    // 13
    (
        !positionIndex && (
            m = cell * 0.4, w = cell * 1.2,
            g.h/*addCircle*/(m, m, w)
        )
    );
}

/**
 * @param {number} index
 * @param {Graphics} g
 * @param {number} cell
 */
function outerShape(index, g, cell) {
    index = index % 4;

    let m;

    !index ?
        g.j/*addTriangle*/(0, 0, cell, cell, 0) :
        
    index == 1 ?
        g.j/*addTriangle*/(0, cell / 2, cell, cell / 2, 0) :

    index == 2 ?
        g.J/*addRhombus*/(0, 0, cell, cell) :

    // 3
    (
        m = cell / 6,
        g.h/*addCircle*/(m, m, cell - 2 * m)
    );
}

/**
 * Gets a set of identicon color candidates for a specified hue and config.
 */
function colorTheme(hue, config) {
    hue = config.P/*hue*/(hue);
    return [
        // Dark gray
        correctedHsl(hue, config.C/*grayscaleSaturation*/, config.D/*grayscaleLightness*/(0)),
        // Mid color
        correctedHsl(hue, config.n/*colorSaturation*/, config.o/*colorLightness*/(0.5)),
        // Light gray
        correctedHsl(hue, config.C/*grayscaleSaturation*/, config.D/*grayscaleLightness*/(1)),
        // Light color
        correctedHsl(hue, config.n/*colorSaturation*/, config.o/*colorLightness*/(1)),
        // Dark color
        correctedHsl(hue, config.n/*colorSaturation*/, config.o/*colorLightness*/(0))
    ];
}

/**
 * Draws an identicon to a specified renderer.
 */
function iconGenerator(renderer, hash, config) {
    config = getConfiguration(config, 0.08);

    // Set background color
    if (config.F/*backColor*/) {
        renderer.m/*setBackground*/(config.F/*backColor*/);
    }
    
    // Calculate padding and round to nearest integer
    let size = renderer.k/*iconSize*/;
    const padding = (0.5 + size * config.R/*iconPadding*/) | 0;
    size -= padding * 2;
    
    const graphics = new Graphics(renderer);
    
    // Calculate cell size and ensure it is an integer
    const cell = 0 | (size / 4);
    
    // Since the cell size is integer based, the actual icon will be slightly smaller than specified => center icon
    const x = 0 | (padding + size / 2 - cell * 2);
    const y = 0 | (padding + size / 2 - cell * 2);

    function renderShape(colorIndex, shapes, index, rotationIndex, positions) {
        const shapeIndex = parseHex(hash, index, 1);
        let r = rotationIndex ? parseHex(hash, rotationIndex, 1) : 0;
        
        renderer.K/*beginShape*/(availableColors[selectedColorIndexes[colorIndex]]);
        
        for (let i = 0; i < positions.length; i++) {
            graphics.t/*_transform*/ = new Transform(x + positions[i][0] * cell, y + positions[i][1] * cell, cell, r++ % 4);
            shapes(shapeIndex, graphics, cell, i);
        }
        
        renderer.L/*endShape*/();
    }

    // AVAILABLE COLORS
    const hue = parseHex(hash, -7) / 0xfffffff,
    
          // Available colors for this icon
          availableColors = colorTheme(hue, config),

          // The index of the selected colors
          selectedColorIndexes = [];

    let index;

    function isDuplicate(values) {
        if (values.indexOf(index) >= 0) {
            for (let i = 0; i < values.length; i++) {
                if (selectedColorIndexes.indexOf(values[i]) >= 0) {
                    return true;
                }
            }
        }
    }

    for (let i = 0; i < 3; i++) {
        index = parseHex(hash, 8 + i, 1) % availableColors.length;
        if (isDuplicate([0, 4]) || // Disallow dark gray and dark color combo
            isDuplicate([2, 3])) { // Disallow light gray and light color combo
            index = 1;
        }
        selectedColorIndexes.push(index);
    }

    // ACTUAL RENDERING
    // Sides
    renderShape(0, outerShape, 2, 3, [[1, 0], [2, 0], [2, 3], [1, 3], [0, 1], [3, 1], [3, 2], [0, 2]]);
    // Corners
    renderShape(1, outerShape, 4, 5, [[0, 0], [3, 0], [3, 3], [0, 3]]);
    // Center
    renderShape(2, centerShape, 1, null, [[1, 1], [2, 1], [2, 2], [1, 2]]);
    
    renderer.finish();
}

/**
 * Computes a SHA1 hash for any value and returns it as a hexadecimal string.
 * 
 * This function is optimized for minimal code size and rather short messages.
 * 
 * @param {string} message 
 */
function sha1(message) {
    const HASH_SIZE_HALF_BYTES = 40;
    const BLOCK_SIZE_WORDS = 16;

    // Variables
    // `var` is used to be able to minimize the number of `var` keywords.
    var i = 0,
        f = 0,
    
        // Use `encodeURI` to UTF8 encode the message without any additional libraries
        // We could use `unescape` + `encodeURI` to minimize the code, but that would be slightly risky
        // since `unescape` is deprecated.
        urlEncodedMessage = encodeURI(message) + "%80", // trailing '1' bit padding
        
        // This can be changed to a preallocated Uint32Array array for greater performance and larger code size
        data = [],
        dataSize,
        
        hashBuffer = [],

        a = 0x67452301,
        b = 0xefcdab89,
        c = ~a,
        d = ~b,
        e = 0xc3d2e1f0,
        hash = [a, b, c, d, e],

        blockStartIndex = 0,
        hexHash = "";

    /**
     * Rotates the value a specified number of bits to the left.
     * @param {number} value  Value to rotate
     * @param {number} shift  Bit count to shift.
     */
    function rotl(value, shift) {
        return (value << shift) | (value >>> (32 - shift));
    }

    // Message data
    for ( ; i < urlEncodedMessage.length; f++) {
        data[f >> 2] = data[f >> 2] |
            (
                (
                    urlEncodedMessage[i] == "%"
                        // Percent encoded byte
                        ? parseInt(urlEncodedMessage.substring(i + 1, i += 3), 16)
                        // Unencoded byte
                        : urlEncodedMessage.charCodeAt(i++)
                )

                // Read bytes in reverse order (big endian words)
                << ((3 - (f & 3)) * 8)
            );
    }

    // f is now the length of the utf8 encoded message
    // 7 = 8 bytes (64 bit) for message size, -1 to round down
    // >> 6 = integer division with block size
    dataSize = (((f + 7) >> 6) + 1) * BLOCK_SIZE_WORDS;

    // Message size in bits.
    // SHA1 uses a 64 bit integer to represent the size, but since we only support short messages only the least
    // significant 32 bits are set. -8 is for the '1' bit padding byte.
    data[dataSize - 1] = f * 8 - 8;
    
    // Compute hash
    for ( ; blockStartIndex < dataSize; blockStartIndex += BLOCK_SIZE_WORDS) {
        for (i = 0; i < 80; i++) {
            f = rotl(a, 5) + e + (
					// Ch
					i < 20 ? ((b & c) ^ ((~b) & d)) + 0x5a827999 :
					
					// Parity
					i < 40 ? (b ^ c ^ d) + 0x6ed9eba1 :
					
					// Maj
					i < 60 ? ((b & c) ^ (b & d) ^ (c & d)) + 0x8f1bbcdc :
					
					// Parity
                    (b ^ c ^ d) + 0xca62c1d6
				) + ( 
                    hashBuffer[i] = i < BLOCK_SIZE_WORDS
                        // Bitwise OR is used to coerse `undefined` to 0
                        ? (data[blockStartIndex + i] | 0)
                        : rotl(hashBuffer[i - 3] ^ hashBuffer[i - 8] ^ hashBuffer[i - 14] ^ hashBuffer[i - 16], 1)
				);

            e = d;
            d = c;
            c = rotl(b, 30);
            b = a;
            a = f;
        }

        hash[0] = a = ((hash[0] + a) | 0);
        hash[1] = b = ((hash[1] + b) | 0);
        hash[2] = c = ((hash[2] + c) | 0);
        hash[3] = d = ((hash[3] + d) | 0);
        hash[4] = e = ((hash[4] + e) | 0);
    }

    // Format hex hash
    for (i = 0; i < HASH_SIZE_HALF_BYTES; i++) {
        hexHash += (
            (
                // Get word (2^3 half-bytes per word)
                hash[i >> 3] >>>

                // Append half-bytes in reverse order
                ((7 - (i & 7)) * 4)
            ) 
            // Clamp to half-byte
            & 0xf
        ).toString(16);
    }

    return hexHash;
}

/**
 * Inputs a value that might be a valid hash string for Jdenticon and returns it 
 * if it is determined valid, otherwise a falsy value is returned.
 */
function isValidHash(hashCandidate) {
    return /^[0-9a-f]{11,}$/i.test(hashCandidate) && hashCandidate;
}

/**
 * Computes a hash for the specified value. Currently SHA1 is used. This function
 * always returns a valid hash.
 */
function computeHash(value) {
    return sha1(value == null ? "" : "" + value);
}

/**
 * Renderer redirecting drawing commands to a canvas context.
 */
class CanvasRenderer {
    /**
     * @param {number=} iconSize
     */
    constructor(ctx, iconSize) {
        const width = ctx.canvas.width,
              height = ctx.canvas.height;
        
        ctx.save();
        
        if (!iconSize) {
            iconSize = Math.min(width, height);
            
            ctx.translate(
                ((width - iconSize) / 2) | 0,
                ((height - iconSize) / 2) | 0);
        }

        this.l/*_ctx*/ = ctx;
        this.k/*iconSize*/ = iconSize;
        
        ctx.clearRect(0, 0, iconSize, iconSize);
    }

    /**
     * Fills the background with the specified color.
     * @param {string} fillColor  Fill color on the format #rrggbb[aa].
     */
    m/*setBackground*/(fillColor) {
        const ctx = this.l/*_ctx*/,
              iconSize = this.k/*iconSize*/;

        ctx.fillStyle = toCss3Color(fillColor);
        ctx.fillRect(0, 0, iconSize, iconSize);
    }

    /**
     * Marks the beginning of a new shape of the specified color. Should be ended with a call to endShape.
     * @param {string} fillColor Fill color on format #rrggbb[aa].
     */
    K/*beginShape*/(fillColor) {
        const ctx = this.l/*_ctx*/;
        ctx.fillStyle = toCss3Color(fillColor);
        ctx.beginPath();
    }

    /**
     * Marks the end of the currently drawn shape. This causes the queued paths to be rendered on the canvas.
     */
    L/*endShape*/() {
        this.l/*_ctx*/.fill();
    }

    /**
     * Adds a polygon to the rendering queue.
     * @param points An array of Point objects.
     */
    g/*addPolygon*/(points) {
        const ctx = this.l/*_ctx*/;
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
    }

    /**
     * Adds a circle to the rendering queue.
     * @param {Point} point The upper left corner of the circle bounding box.
     * @param {number} diameter The diameter of the circle.
     * @param {boolean} counterClockwise True if the circle is drawn counter-clockwise (will result in a hole if rendered on a clockwise path).
     */
    h/*addCircle*/(point, diameter, counterClockwise) {
        const ctx = this.l/*_ctx*/,
              radius = diameter / 2;
        ctx.moveTo(point.x + radius, point.y + radius);
        ctx.arc(point.x + radius, point.y + radius, radius, 0, Math.PI * 2, counterClockwise);
        ctx.closePath();
    }

    /**
     * Called when the icon has been completely drawn.
     */
    finish() {
        this.l/*_ctx*/.restore();
    }
}

/**
 * Draws an identicon to a context.
 * @param {CanvasRenderingContext2D} ctx - Canvas context on which the icon will be drawn at location (0, 0).
 * @param {*} hashOrValue - A hexadecimal hash string or any value that will be hashed by Jdenticon.
 * @param {number} size - Icon size in pixels.
 * @param {Object|number=} config - Optional configuration. If specified, this configuration object overrides any
 *    global configuration in its entirety. For backward compatibility a padding value in the range [0.0, 0.5) can be
 *    specified in place of a configuration object.
 */
function drawIcon(ctx, hashOrValue, size, config) {
    if (!ctx) {
        throw new Error("No canvas specified.");
    }
    
    iconGenerator(new CanvasRenderer(ctx, size), 
        isValidHash(hashOrValue) || computeHash(hashOrValue), 
        config);
}

/**
 * Prepares a measure to be used as a measure in an SVG path, by
 * rounding the measure to a single decimal. This reduces the file
 * size of the generated SVG with more than 50% in some cases.
 */
function svgValue(value) {
    return ((value * 10 + 0.5) | 0) / 10;
}

/**
 * Represents an SVG path element.
 */
class SvgPath {
    constructor() {
        /**
         * This property holds the data string (path.d) of the SVG path.
         */
        this.u/*dataString*/ = "";
    }

    /**
     * Adds a polygon with the current fill color to the SVG path.
     * @param points An array of Point objects.
     */
    g/*addPolygon*/(points) {
        let dataString = "";
        for (let i = 0; i < points.length; i++) {
            dataString += (i ? "L" : "M") + svgValue(points[i].x) + " " + svgValue(points[i].y);
        }
        this.u/*dataString*/ += dataString + "Z";
    }

    /**
     * Adds a circle with the current fill color to the SVG path.
     * @param {Point} point The upper left corner of the circle bounding box.
     * @param {number} diameter The diameter of the circle.
     * @param {boolean} counterClockwise True if the circle is drawn counter-clockwise (will result in a hole if rendered on a clockwise path).
     */
    h/*addCircle*/(point, diameter, counterClockwise) {
        const sweepFlag = counterClockwise ? 0 : 1,
              svgRadius = svgValue(diameter / 2),
              svgDiameter = svgValue(diameter),
              svgArc = "a" + svgRadius + "," + svgRadius + " 0 1," + sweepFlag + " ";
            
        this.u/*dataString*/ += 
            "M" + svgValue(point.x) + " " + svgValue(point.y + diameter / 2) +
            svgArc + svgDiameter + ",0" + 
            svgArc + (-svgDiameter) + ",0";
    }
}

/**
 * Renderer producing SVG output.
 */
class SvgRenderer {
    /**
     * @param {SvgElement|SvgWriter} target 
     */
    constructor(target) {
        /**
         * @type {SvgPath}
         */
        this.v/*_path*/;
        this.A/*_pathsByColor*/ = { };
        this.M/*_target*/ = target;
        this.k/*iconSize*/ = target.k/*iconSize*/;
    }

    /**
     * Fills the background with the specified color.
     * @param {string} fillColor  Fill color on the format #rrggbb[aa].
     */
    m/*setBackground*/(fillColor) {
        const match = /^(#......)(..)?/.exec(fillColor),
              opacity = match[2] ? parseHex(match[2], 0) / 255 : 1;
        this.M/*_target*/.m/*setBackground*/(match[1], opacity);
    }

    /**
     * Marks the beginning of a new shape of the specified color. Should be ended with a call to endShape.
     * @param {string} color Fill color on format #xxxxxx.
     */
    K/*beginShape*/(color) {
        this.v/*_path*/ = this.A/*_pathsByColor*/[color] || (this.A/*_pathsByColor*/[color] = new SvgPath());
    }

    /**
     * Marks the end of the currently drawn shape.
     */
    L/*endShape*/() { }

    /**
     * Adds a polygon with the current fill color to the SVG.
     * @param points An array of Point objects.
     */
    g/*addPolygon*/(points) {
        this.v/*_path*/.g/*addPolygon*/(points);
    }

    /**
     * Adds a circle with the current fill color to the SVG.
     * @param {Point} point The upper left corner of the circle bounding box.
     * @param {number} diameter The diameter of the circle.
     * @param {boolean} counterClockwise True if the circle is drawn counter-clockwise (will result in a hole if rendered on a clockwise path).
     */
    h/*addCircle*/(point, diameter, counterClockwise) {
        this.v/*_path*/.h/*addCircle*/(point, diameter, counterClockwise);
    }

    /**
     * Called when the icon has been completely drawn.
     */
    finish() { 
        const pathsByColor = this.A/*_pathsByColor*/;
        for (let color in pathsByColor) {
            // hasOwnProperty cannot be shadowed in pathsByColor
            // eslint-disable-next-line no-prototype-builtins
            if (pathsByColor.hasOwnProperty(color)) {
                this.M/*_target*/.N/*appendPath*/(color, pathsByColor[color].u/*dataString*/);
            }
        }
    }
}

/**
 * Renderer producing SVG output.
 */
class SvgWriter {
    /**
     * @param {number} iconSize - Icon width and height in pixels.
     */
    constructor(iconSize) {
        this.k/*iconSize*/ = iconSize;
        this.B/*_s*/ =
            '<svg xmlns="http://www.w3.org/2000/svg" width="' + 
            iconSize + '" height="' + iconSize + '" viewBox="0 0 ' + 
            iconSize + ' ' + iconSize + '">';
    }

    /**
     * Fills the background with the specified color.
     * @param {string} fillColor  Fill color on the format #rrggbb.
     * @param {number} opacity  Opacity in the range [0.0, 1.0].
     */
    m/*setBackground*/(fillColor, opacity) {
        if (opacity) {
            this.B/*_s*/ += '<rect width="100%" height="100%" fill="' + 
                fillColor + '" opacity="' + opacity.toFixed(2) + '"/>';
        }
    }

    /**
     * Writes a path to the SVG string.
     * @param {string} color Fill color on format #rrggbb.
     * @param {string} dataString The SVG path data string.
     */
    N/*appendPath*/(color, dataString) {
        this.B/*_s*/ += '<path fill="' + color + '" d="' + dataString + '"/>';
    }

    /**
     * Gets the rendered image as an SVG string.
     */
    toString() {
        return this.B/*_s*/ + "</svg>";
    }
}

/**
 * Draws an identicon as an SVG string.
 * @param {*} hashOrValue - A hexadecimal hash string or any value that will be hashed by Jdenticon.
 * @param {number} size - Icon size in pixels.
 * @param {Object|number=} config - Optional configuration. If specified, this configuration object overrides any
 *    global configuration in its entirety. For backward compatibility a padding value in the range [0.0, 0.5) can be
 *    specified in place of a configuration object.
 * @returns {string} SVG string
 */
function toSvg(hashOrValue, size, config) {
    const writer = new SvgWriter(size);
    iconGenerator(new SvgRenderer(writer), 
        isValidHash(hashOrValue) || computeHash(hashOrValue),
        config);
    return writer.toString();
}

const ICON_TYPE_SVG = 1;

const ICON_TYPE_CANVAS = 2;

/**
 * @noinline
 */
const HASH_ATTRIBUTE = "data-jdenticon-hash";

/**
 * @noinline
 */
const VALUE_ATTRIBUTE = "data-jdenticon-value";

const documentQuerySelectorAll = /** @type {!Function} */ (
    typeof document !== "undefined" && document.querySelectorAll.bind(document));

function getIdenticonType(el) {
    if (el) {
        const tagName = el["tagName"];

        if (/^svg$/i.test(tagName)) {
            return ICON_TYPE_SVG;
        }

        if (/^canvas$/i.test(tagName) && "getContext" in el) {
            return ICON_TYPE_CANVAS;
        }
    }
}

/**
 * Creates a new element and adds it to the specified parent.
 * @param {Element} parentNode
 * @param {string} name
 * @param {...(string|number)} keyValuePairs
 */
function SvgElement_append(parentNode, name, ...keyValuePairs) {
    const el = document.createElementNS("http://www.w3.org/2000/svg", name);
    
    for (let i = 0; i + 1 < keyValuePairs.length; i += 2) {
        el.setAttribute(
            /** @type {string} */ (keyValuePairs[i]),
            /** @type {string|number} */ (keyValuePairs[i + 1]),
            );
    }

    parentNode.appendChild(el);
}


/**
 * Renderer producing SVG output.
 */
class SvgElement {
    /**
     * @param {Element} element - Target element
     */
    constructor(element) {
        // Don't use the clientWidth and clientHeight properties on SVG elements
        // since Firefox won't serve a proper value of these properties on SVG
        // elements (https://bugzilla.mozilla.org/show_bug.cgi?id=874811)
        // Instead use 100px as a hardcoded size (the svg viewBox will rescale 
        // the icon to the correct dimensions)
        const iconSize = this.k/*iconSize*/ = Math.min(
            (Number(element.getAttribute("width")) || 100),
            (Number(element.getAttribute("height")) || 100)
            );
        this.O/*_el*/ = element;
        
        // Clear current SVG child elements
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        
        // Set viewBox attribute to ensure the svg scales nicely.
        element.setAttribute("viewBox", "0 0 " + iconSize + " " + iconSize);
        element.setAttribute("preserveAspectRatio", "xMidYMid meet");
    }

    /**
     * Fills the background with the specified color.
     * @param {string} fillColor  Fill color on the format #rrggbb.
     * @param {number} opacity  Opacity in the range [0.0, 1.0].
     */
    m/*setBackground*/(fillColor, opacity) {
        if (opacity) {
            SvgElement_append(this.O/*_el*/, "rect",
                "width", "100%",
                "height", "100%",
                "fill", fillColor,
                "opacity", opacity);
        }
    }

    /**
     * Appends a path to the SVG element.
     * @param {string} color Fill color on format #xxxxxx.
     * @param {string} dataString The SVG path data string.
     */
    N/*appendPath*/(color, dataString) {
        SvgElement_append(this.O/*_el*/, "path",
            "fill", color,
            "d", dataString);
    }
}

/**
 * Updates the identicon in the specified `<canvas>` or `<svg>` elements.
 * @param {(string|Element)} el - Specifies the container in which the icon is rendered as a DOM element of the type
 *    `<svg>` or `<canvas>`, or a CSS selector to such an element.
 * @param {*=} hashOrValue - Optional hash or value to be rendered. If not specified, the `data-jdenticon-hash` or
 *    `data-jdenticon-value` attribute will be evaluated.
 * @param {Object|number=} config - Optional configuration. If specified, this configuration object overrides any
 *    global configuration in its entirety. For backward compability a padding value in the range [0.0, 0.5) can be
 *    specified in place of a configuration object.
 */
function update(el, hashOrValue, config) {
    renderDomElement(el, hashOrValue, config, function (el, iconType) {
        if (iconType) {
            return iconType == ICON_TYPE_SVG ? 
                new SvgRenderer(new SvgElement(el)) : 
                new CanvasRenderer(el.getContext("2d"));
        }
    });
}

/**
 * Updates the identicon in the specified `<canvas>` elements.
 * @param {(string|Element)} el - Specifies the container in which the icon is rendered as a DOM element of the type
 *    `<canvas>`, or a CSS selector to such an element.
 * @param {*=} hashOrValue - Optional hash or value to be rendered. If not specified, the `data-jdenticon-hash` or
 *    `data-jdenticon-value` attribute will be evaluated.
 * @param {Object|number=} config - Optional configuration. If specified, this configuration object overrides any
 *    global configuration in its entirety. For backward compability a padding value in the range [0.0, 0.5) can be
 *    specified in place of a configuration object.
 */
function updateCanvas(el, hashOrValue, config) {
    renderDomElement(el, hashOrValue, config, function (el, iconType) {
        if (iconType == ICON_TYPE_CANVAS) {
            return new CanvasRenderer(el.getContext("2d"));
        }
    });
}

/**
 * Updates the identicon in the specified `<svg>` elements.
 * @param {(string|Element)} el - Specifies the container in which the icon is rendered as a DOM element of the type
 *    `<svg>`, or a CSS selector to such an element.
 * @param {*=} hashOrValue - Optional hash or value to be rendered. If not specified, the `data-jdenticon-hash` or
 *    `data-jdenticon-value` attribute will be evaluated.
 * @param {Object|number=} config - Optional configuration. If specified, this configuration object overrides any
 *    global configuration in its entirety. For backward compability a padding value in the range [0.0, 0.5) can be
 *    specified in place of a configuration object.
 */
function updateSvg(el, hashOrValue, config) {
    renderDomElement(el, hashOrValue, config, function (el, iconType) {
        if (iconType == ICON_TYPE_SVG) {
            return new SvgRenderer(new SvgElement(el));
        }
    });
}

/**
 * Updates the identicon in the specified canvas or svg elements.
 * @param {(string|Element)} el - Specifies the container in which the icon is rendered as a DOM element of the type
 *    `<svg>` or `<canvas>`, or a CSS selector to such an element.
 * @param {*} hashOrValue - Optional hash or value to be rendered. If not specified, the `data-jdenticon-hash` or
 *    `data-jdenticon-value` attribute will be evaluated.
 * @param {Object|number|undefined} config
 * @param {function(Element,number)} rendererFactory - Factory function for creating an icon renderer.
 */
function renderDomElement(el, hashOrValue, config, rendererFactory) {
    if (typeof el === "string") {
        if (documentQuerySelectorAll) {
            const elements = documentQuerySelectorAll(el);
            for (let i = 0; i < elements.length; i++) {
                renderDomElement(elements[i], hashOrValue, config, rendererFactory);
            }
        }
        return;
    }
    
    // Hash selection. The result from getValidHash or computeHash is 
    // accepted as a valid hash.
    const hash = 
        // 1. Explicit valid hash
        isValidHash(hashOrValue) ||
        
        // 2. Explicit value (`!= null` catches both null and undefined)
        hashOrValue != null && computeHash(hashOrValue) ||
        
        // 3. `data-jdenticon-hash` attribute
        isValidHash(el.getAttribute(HASH_ATTRIBUTE)) ||
        
        // 4. `data-jdenticon-value` attribute. 
        // We want to treat an empty attribute as an empty value. 
        // Some browsers return empty string even if the attribute 
        // is not specified, so use hasAttribute to determine if 
        // the attribute is specified.
        el.hasAttribute(VALUE_ATTRIBUTE) && computeHash(el.getAttribute(VALUE_ATTRIBUTE));
    
    if (!hash) {
        // No hash specified. Don't render an icon.
        return;
    }
    
    const renderer = rendererFactory(el, getIdenticonType(el));
    if (renderer) {
        // Draw icon
        iconGenerator(renderer, hash, config);
    }
}

// This file is compiled to dist/jdenticon-module.mjs

/**
 * Specifies the version of the Jdenticon package in use.
 * @type {string}
 */
const version = "3.0.1";

/**
 * Specifies which bundle of Jdenticon that is used.
 * @type {string}
 */
const bundle = "browser-esm";




/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jdenticon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jdenticon */ "./node_modules/jdenticon/dist/jdenticon-module.mjs");


let ws;
let username = "Anonymous";
// TODO identicon cache?

function log(message) {
    let m = document.createElement("div");
    let output = document.getElementById("messages");
    m.textContent = message;
    m.className = "message";

    let oldScrollHeight = output.scrollHeight;
    output.appendChild(m);
    conditionalMessageScroll(oldScrollHeight);
}

function initUserlist(connected) {
    // fill user list
    let userlist = document.createElement("div");
    for (let user of connected) {
        let userEntry = document.createElement("div");
        userEntry.className = "user-connected";
        userEntry.dataset.userid = user.userid;

        let userImage = document.createElement("div");
        userImage.className = "user-image";
        userImage.innerHTML = Object(jdenticon__WEBPACK_IMPORTED_MODULE_0__[/* toSvg */ "a"])(user.userid, 100);

        let userName = document.createElement("div");
        userName.className = "user-name";
        userName.innerHTML = user.username;

        userEntry.appendChild(userImage);
        userEntry.appendChild(userName);

        userlist.appendChild(userEntry);
    }
    document.getElementById("userlist").innerHTML = userlist.innerHTML;
}

function conditionalMessageScroll(oldScrollHeight) {
    let messages = document.getElementById("messages");
    if (oldScrollHeight === messages.scrollTop + messages.clientHeight) {
        // only scroll if scrolled to bottom before
        messages.scrollTop = messages.scrollHeight;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    ws = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/ws");

    ws.onopen = function() {
        log("Connected to chatroom");
        document.getElementById("submit-icon").style.color = "#50913F";
        document.getElementById("submit").style.cursor = "pointer";
    };

    ws.onclose = function() {
        log("Disconnected from chatroom");
        document.getElementById("submit-icon").style.color = "darkgrey";
        document.getElementById("submit").style.cursor = "not-allowed";
        ws = null;
    };

    ws.onmessage = function(evt) {
        //log("RESPONSE: " + evt.data);

        let msg = JSON.parse(evt.data);
        switch (msg.action) {
            case "init": {
                // fill user data
                document.getElementById("username").value = msg.user.username;
                document.getElementById("usericon").innerHTML = Object(jdenticon__WEBPACK_IMPORTED_MODULE_0__[/* toSvg */ "a"])(msg.user.userid, 100);
                initUserlist(msg.connected);
                break;
            }
            case "broadcast": {
                let m = document.createElement("div");
                m.className = "message";

                let text = document.createElement("div");
                text.className = "message-text";
                text.textContent = `${msg.sender.username}: ${msg.text}`;

                let identicon = document.createElement("div");
                identicon.className = "message-image";
                identicon.innerHTML = Object(jdenticon__WEBPACK_IMPORTED_MODULE_0__[/* toSvg */ "a"])(msg.sender.userid, 100);

                m.appendChild(identicon);
                m.appendChild(text);

                let messages = document.getElementById("messages");
                let oldScrollHeight = messages.scrollHeight;
                messages.appendChild(m);
                conditionalMessageScroll(oldScrollHeight);

                //log(`${msg.sender.username}: ${msg.text}`);
                break;
            }
            case "systemBroadcast": {
                log(`${msg.text}`);
                break;
            }
            case "newUser": {
                let userEntry = document.createElement("div");
                userEntry.className = "user-connected";
                userEntry.dataset.userid = msg.sender.userid;

                let userImage = document.createElement("div");
                userImage.className = "user-image";
                userImage.innerHTML = Object(jdenticon__WEBPACK_IMPORTED_MODULE_0__[/* toSvg */ "a"])(msg.sender.userid, 100);

                let userName = document.createElement("div");
                userName.className = "user-name";
                userName.innerHTML = msg.sender.username;

                userEntry.appendChild(userImage);
                userEntry.appendChild(userName);

                document.getElementById("userlist").appendChild(userEntry);
                break;
            }
            case "removeUser": {
                document.querySelectorAll(`.user-connected[data-userid='${msg.sender.userid}']`)[0].remove();
                break;
            }
            case "usernameChange": {
                let usernameElem = document.querySelectorAll(`.user-connected[data-userid='${msg.sender.userid}']`)[0].children[1];
                log(`User ${usernameElem.textContent} changed name to ${msg.sender.username}`);
                usernameElem.textContent = msg.sender.username;
                break;
            }
            default: {
                console.log("Unhandled message action:", msg);
            }
        }
    };
    ws.onerror = function(evt) {
        log("ERROR: " + evt.data);
    };

}, false);

document.getElementById("submit").addEventListener("click", function() {
    let input = document.getElementById("message-entry");

    if (!ws || input.value.length === 0) {
        return false;
    }

    let msg = {
        //broadcast only for now
        action: "broadcast",
        text: input.value.trim(),
    };

    ws.send(JSON.stringify(msg));
    input.value = "";
    return false;
}, false);

document.getElementById("message-entry").addEventListener("keypress", function(evt) {
    if (evt.key === "Enter" && evt.shiftKey) {
        document.getElementById("submit").click();
        evt.preventDefault();
    }
    return false;
}, false);

document.getElementById("username").addEventListener("focusout", function() {
    let input = document.getElementById("username");
    if (username !== input.value) {
        username = input.value;
        let usernameChanged = {
            action: "usernameChange",
            username: input.value,
        };
        ws.send(JSON.stringify(usernameChanged));
    }
}, false);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2pkZW50aWNvbi9kaXN0L2pkZW50aWNvbi1tb2R1bGUubWpzIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7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QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTztBQUN0QixlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLFNBQVM7QUFD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c291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi5qc1wiKTtcbiIsIi8qKlxyXG4gKiBKZGVudGljb24gMy4wLjFcclxuICogaHR0cDovL2pkZW50aWNvbi5jb21cclxuICpcclxuICogQnVpbHQ6IDIwMjAtMDgtMDNUMTY6NTg6MTguNDk2WlxyXG4gKiBcclxuICogTUlUIExpY2Vuc2VcclxuICogXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDIwIERhbmllbCBNZXN0ZXIgUGlydHRpasOkcnZpXHJcbiAqIFxyXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKiBcclxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqIFxyXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG4gKiBTT0ZUV0FSRS5cclxuICovXHJcblxyXG4vKipcclxuICogUGFyc2VzIGEgc3Vic3RyaW5nIG9mIHRoZSBoYXNoIGFzIGEgbnVtYmVyLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnRQb3NpdGlvbiBcclxuICogQHBhcmFtIHtudW1iZXI9fSBvY3RldHMgXHJcbiAqIEBub2lubGluZVxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VIZXgoaGFzaCwgc3RhcnRQb3NpdGlvbiwgb2N0ZXRzKSB7XHJcbiAgICByZXR1cm4gcGFyc2VJbnQoaGFzaC5zdWJzdHIoc3RhcnRQb3NpdGlvbiwgb2N0ZXRzKSwgMTYpO1xyXG59XG5cbmZ1bmN0aW9uIGRlY1RvSGV4KHYpIHtcclxuICAgIHYgfD0gMDsgLy8gRW5zdXJlIGludGVnZXIgdmFsdWVcclxuICAgIHJldHVybiB2IDwgMCA/IFwiMDBcIiA6XHJcbiAgICAgICAgdiA8IDE2ID8gXCIwXCIgKyB2LnRvU3RyaW5nKDE2KSA6XHJcbiAgICAgICAgdiA8IDI1NiA/IHYudG9TdHJpbmcoMTYpIDpcclxuICAgICAgICBcImZmXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGh1ZVRvUmdiKG0xLCBtMiwgaCkge1xyXG4gICAgaCA9IGggPCAwID8gaCArIDYgOiBoID4gNiA/IGggLSA2IDogaDtcclxuICAgIHJldHVybiBkZWNUb0hleCgyNTUgKiAoXHJcbiAgICAgICAgaCA8IDEgPyBtMSArIChtMiAtIG0xKSAqIGggOlxyXG4gICAgICAgIGggPCAzID8gbTIgOlxyXG4gICAgICAgIGggPCA0ID8gbTEgKyAobTIgLSBtMSkgKiAoNCAtIGgpIDpcclxuICAgICAgICBtMSkpO1xyXG59XHJcblxyXG4vKipcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yICBDb2xvciB2YWx1ZSB0byBwYXJzZS4gQ3VycmVudGx5IGhleGFkZWNpbWFsIHN0cmluZ3Mgb24gdGhlIGZvcm1hdCAjcmdiW2FdIGFuZCAjcnJnZ2JiW2FhXSBhcmUgc3VwcG9ydGVkLlxyXG4gKi9cclxuZnVuY3Rpb24gcGFyc2VDb2xvcihjb2xvcikge1xyXG4gICAgaWYgKC9eI1swLTlhLWZdezMsOH0kL2kudGVzdChjb2xvcikpIHtcclxuICAgICAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgICAgICBpZiAoY29sb3IubGVuZ3RoIDwgNikge1xyXG4gICAgICAgICAgICBjb25zdCByID0gY29sb3JbMV0sXHJcbiAgICAgICAgICAgICAgICAgIGcgPSBjb2xvclsyXSxcclxuICAgICAgICAgICAgICAgICAgYiA9IGNvbG9yWzNdLFxyXG4gICAgICAgICAgICAgICAgICBhID0gY29sb3JbNF0gfHwgXCJcIjtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCIjXCIgKyByICsgciArIGcgKyBnICsgYiArIGIgKyBhICsgYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbG9yLmxlbmd0aCA9PSA3IHx8IGNvbG9yLmxlbmd0aCA+IDgpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gY29sb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaGV4Q29sb3IgIENvbG9yIG9uIHRoZSBmb3JtYXQgXCIjUlJHR0JCXCIgb3IgXCIjUlJHR0JCQUFcIlxyXG4gKi9cclxuZnVuY3Rpb24gdG9Dc3MzQ29sb3IoaGV4Q29sb3IpIHtcclxuICAgIGNvbnN0IGEgPSBwYXJzZUhleChoZXhDb2xvciwgNywgMik7XHJcbiAgICBsZXQgcmVzdWx0O1xyXG5cclxuICAgIGlmIChpc05hTihhKSkge1xyXG4gICAgICAgIHJlc3VsdCA9IGhleENvbG9yO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCByID0gcGFyc2VIZXgoaGV4Q29sb3IsIDEsIDIpLFxyXG4gICAgICAgICAgICBnID0gcGFyc2VIZXgoaGV4Q29sb3IsIDMsIDIpLFxyXG4gICAgICAgICAgICBiID0gcGFyc2VIZXgoaGV4Q29sb3IsIDUsIDIpO1xyXG4gICAgICAgIHJlc3VsdCA9IFwicmdiYShcIiArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyBcIixcIiArIChhIC8gMjU1KS50b0ZpeGVkKDIpICsgXCIpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSBoIEh1ZSBbMCwgMV1cclxuICogQHBhcmFtIHMgU2F0dXJhdGlvbiBbMCwgMV1cclxuICogQHBhcmFtIGwgTGlnaHRuZXNzIFswLCAxXVxyXG4gKi9cclxuZnVuY3Rpb24gaHNsKGgsIHMsIGwpIHtcclxuICAgIC8vIEJhc2VkIG9uIGh0dHA6Ly93d3cudzMub3JnL1RSLzIwMTEvUkVDLWNzczMtY29sb3ItMjAxMTA2MDcvI2hzbC1jb2xvclxyXG4gICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICBpZiAocyA9PSAwKSB7XHJcbiAgICAgICAgY29uc3QgcGFydGlhbEhleCA9IGRlY1RvSGV4KGwgKiAyNTUpO1xyXG4gICAgICAgIHJlc3VsdCA9IHBhcnRpYWxIZXggKyBwYXJ0aWFsSGV4ICsgcGFydGlhbEhleDtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IG0yID0gbCA8PSAwLjUgPyBsICogKHMgKyAxKSA6IGwgKyBzIC0gbCAqIHMsXHJcbiAgICAgICAgICAgICAgbTEgPSBsICogMiAtIG0yO1xyXG4gICAgICAgIHJlc3VsdCA9XHJcbiAgICAgICAgICAgIGh1ZVRvUmdiKG0xLCBtMiwgaCAqIDYgKyAyKSArXHJcbiAgICAgICAgICAgIGh1ZVRvUmdiKG0xLCBtMiwgaCAqIDYpICtcclxuICAgICAgICAgICAgaHVlVG9SZ2IobTEsIG0yLCBoICogNiAtIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBcIiNcIiArIHJlc3VsdDtcclxufVxyXG5cclxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGNvcnJlY3QgdGhlIGxpZ2h0bmVzcyBmb3IgdGhlIFwiZGFya1wiIGh1ZXNcclxuZnVuY3Rpb24gY29ycmVjdGVkSHNsKGgsIHMsIGwpIHtcclxuICAgIC8vIFRoZSBjb3JyZWN0b3Igc3BlY2lmaWVzIHRoZSBwZXJjZWl2ZWQgbWlkZGxlIGxpZ2h0bmVzcyBmb3IgZWFjaCBodWVcclxuICAgIGNvbnN0IGNvcnJlY3RvcnMgPSBbIDAuNTUsIDAuNSwgMC41LCAwLjQ2LCAwLjYsIDAuNTUsIDAuNTUgXSxcclxuICAgICAgICAgIGNvcnJlY3RvciA9IGNvcnJlY3RvcnNbKGggKiA2ICsgMC41KSB8IDBdO1xyXG4gICAgXHJcbiAgICAvLyBBZGp1c3QgdGhlIGlucHV0IGxpZ2h0bmVzcyByZWxhdGl2ZSB0byB0aGUgY29ycmVjdG9yXHJcbiAgICBsID0gbCA8IDAuNSA/IGwgKiBjb3JyZWN0b3IgKiAyIDogY29ycmVjdG9yICsgKGwgLSAwLjUpICogKDEgLSBjb3JyZWN0b3IpICogMjtcclxuICAgIFxyXG4gICAgcmV0dXJuIGhzbChoLCBzLCBsKTtcclxufVxuXG4vLyBJbiB0aGUgZnV0dXJlIHdlIGNhbiByZXBsYWNlIGBHTE9CQUxgIHdpdGggYGdsb2JhbFRoaXNgLCBidXQgZm9yIG5vdyB1c2UgdGhlIG9sZCBzY2hvb2wgZ2xvYmFsIGRldGVjdGlvbiBmb3JcclxuLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eS5cclxuXHJcbmNvbnN0IEdMT0JBTCA9IFxyXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6XHJcbiAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxyXG4gICAgdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6XHJcbiAgICB7fTtcblxuLyoqXHJcbiAqIEBub2lubGluZVxyXG4gKi9cclxuY29uc3QgUk9PVF9DT05GSUdfUFJPUEVSVFkgPSBcImNvbmZpZ1wiO1xyXG5cclxudmFyIHJvb3RDb25maWd1cmF0aW9uSG9sZGVyID0ge307XHJcblxyXG4vKipcclxuICogU2V0cyBhIG5ldyBpY29uIHN0eWxlIGNvbmZpZ3VyYXRpb24uIFRoZSBuZXcgY29uZmlndXJhdGlvbiBpcyBub3QgbWVyZ2VkIHdpdGggdGhlIHByZXZpb3VzIG9uZS4gKiBcclxuICogQHBhcmFtIHtPYmplY3R9IG5ld0NvbmZpZ3VyYXRpb24gLSBOZXcgY29uZmlndXJhdGlvbiBvYmplY3QuXHJcbiAqL1xyXG5mdW5jdGlvbiBjb25maWd1cmUobmV3Q29uZmlndXJhdGlvbikge1xyXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgICByb290Q29uZmlndXJhdGlvbkhvbGRlcltST09UX0NPTkZJR19QUk9QRVJUWV0gPSBuZXdDb25maWd1cmF0aW9uO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJvb3RDb25maWd1cmF0aW9uSG9sZGVyW1JPT1RfQ09ORklHX1BST1BFUlRZXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldHMgdGhlIG5vcm1hbGl6ZWQgY3VycmVudCBKZGVudGljb24gY29sb3IgY29uZmlndXJhdGlvbi4gTWlzc2luZyBmaWVsZHMgaGF2ZSBkZWZhdWx0IHZhbHVlcy5cclxuICogQHBhcmFtIHtPYmplY3R8bnVtYmVyfHVuZGVmaW5lZH0gcGFkZGluZ09yTG9jYWxDb25maWcgLSBDb25maWd1cmF0aW9uIHBhc3NlZCB0byB0aGUgY2FsbGVkIEFQSSBtZXRob2QuIEFcclxuICogICAgbG9jYWwgY29uZmlndXJhdGlvbiBvdmVycmlkZXMgdGhlIGdsb2JhbCBjb25maWd1cmF0aW9uIGluIGl0IGVudGlyZXR5LiBUaGlzIHBhcmFtZXRlciBjYW4gZm9yIGJhY2t3YXJkXHJcbiAqICAgIGNvbXBhdGliaWxpdHkgYWxzbyBjb250YWluIGEgcGFkZGluZyB2YWx1ZS4gQSBwYWRkaW5nIHZhbHVlIG9ubHkgb3ZlcnJpZGVzIHRoZSBnbG9iYWwgcGFkZGluZywgbm90IHRoZVxyXG4gKiAgICBlbnRpcmUgZ2xvYmFsIGNvbmZpZ3VyYXRpb24uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWZhdWx0UGFkZGluZyAtIFBhZGRpbmcgdXNlZCBpZiBubyBwYWRkaW5nIGlzIHNwZWNpZmllZCBpbiBuZWl0aGVyIHRoZSBjb25maWd1cmF0aW9uIG5vclxyXG4gKiAgICBleHBsaWNpdGx5IHRvIHRoZSBBUEkgbWV0aG9kLlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q29uZmlndXJhdGlvbihwYWRkaW5nT3JMb2NhbENvbmZpZywgZGVmYXVsdFBhZGRpbmcpIHtcclxuICAgIGNvbnN0IGNvbmZpZ09iamVjdCA9IFxyXG4gICAgICAgICAgICB0eXBlb2YgcGFkZGluZ09yTG9jYWxDb25maWcgPT0gXCJvYmplY3RcIiAmJiBwYWRkaW5nT3JMb2NhbENvbmZpZyB8fFxyXG4gICAgICAgICAgICByb290Q29uZmlndXJhdGlvbkhvbGRlcltST09UX0NPTkZJR19QUk9QRVJUWV0gfHxcclxuICAgICAgICAgICAgR0xPQkFMW1wiamRlbnRpY29uX2NvbmZpZ1wiXSB8fFxyXG4gICAgICAgICAgICB7IH0sXHJcblxyXG4gICAgICAgIGxpZ2h0bmVzc0NvbmZpZyA9IGNvbmZpZ09iamVjdFtcImxpZ2h0bmVzc1wiXSB8fCB7IH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gSW4gdmVyc2lvbnMgPCAyLjEuMCB0aGVyZSB3YXMgbm8gZ3JheXNjYWxlIHNhdHVyYXRpb24gLVxyXG4gICAgICAgIC8vIHNhdHVyYXRpb24gd2FzIHRoZSBjb2xvciBzYXR1cmF0aW9uLlxyXG4gICAgICAgIHNhdHVyYXRpb24gPSBjb25maWdPYmplY3RbXCJzYXR1cmF0aW9uXCJdIHx8IHsgfSxcclxuICAgICAgICBjb2xvclNhdHVyYXRpb24gPSBcImNvbG9yXCIgaW4gc2F0dXJhdGlvbiA/IHNhdHVyYXRpb25bXCJjb2xvclwiXSA6IHNhdHVyYXRpb24sXHJcbiAgICAgICAgZ3JheXNjYWxlU2F0dXJhdGlvbiA9IHNhdHVyYXRpb25bXCJncmF5c2NhbGVcIl0sXHJcblxyXG4gICAgICAgIGJhY2tDb2xvciA9IGNvbmZpZ09iamVjdFtcImJhY2tDb2xvclwiXSxcclxuICAgICAgICBwYWRkaW5nID0gY29uZmlnT2JqZWN0W1wicGFkZGluZ1wiXTtcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVzIGEgbGlnaHRuZXNzIHJhbmdlLlxyXG4gICAgICovXHJcbiAgICBmdW5jdGlvbiBsaWdodG5lc3MoY29uZmlnTmFtZSwgZGVmYXVsdFJhbmdlKSB7XHJcbiAgICAgICAgbGV0IHJhbmdlID0gbGlnaHRuZXNzQ29uZmlnW2NvbmZpZ05hbWVdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBsaWdodG5lc3MgcmFuZ2UgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QuIFRoaXMgd2F5IHdlIGVuc3VyZSB0aGVcclxuICAgICAgICAvLyBhcnJheSBjb250YWluIHR3byB2YWx1ZXMgYXQgdGhlIHNhbWUgdGltZS5cclxuICAgICAgICBpZiAoIShyYW5nZSAmJiByYW5nZS5sZW5ndGggPiAxKSkge1xyXG4gICAgICAgICAgICByYW5nZSA9IGRlZmF1bHRSYW5nZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgYSBsaWdodG5lc3MgcmVsYXRpdmUgdGhlIHNwZWNpZmllZCB2YWx1ZSBpbiB0aGUgc3BlY2lmaWVkIGxpZ2h0bmVzcyByYW5nZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gcmFuZ2VbMF0gKyB2YWx1ZSAqIChyYW5nZVsxXSAtIHJhbmdlWzBdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlIDwgMCA/IDAgOiB2YWx1ZSA+IDEgPyAxIDogdmFsdWU7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYSBodWUgYWxsb3dlZCBieSB0aGUgY29uZmlndXJlZCBodWUgcmVzdHJpY3Rpb24sXHJcbiAgICAgKiBwcm92aWRlZCB0aGUgb3JpZ2luYWxseSBjb21wdXRlZCBodWUuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGh1ZUZ1bmN0aW9uKG9yaWdpbmFsSHVlKSB7XHJcbiAgICAgICAgY29uc3QgaHVlQ29uZmlnID0gY29uZmlnT2JqZWN0W1wiaHVlc1wiXTtcclxuICAgICAgICBsZXQgaHVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENoZWNrIGlmICdodWVzJyBpcyBhbiBhcnJheS1saWtlIG9iamVjdC4gVGhpcyB3YXkgd2UgYWxzbyBlbnN1cmUgdGhhdFxyXG4gICAgICAgIC8vIHRoZSBhcnJheSBpcyBub3QgZW1wdHksIHdoaWNoIHdvdWxkIG1lYW4gbm8gaHVlIHJlc3RyaWN0aW9uLlxyXG4gICAgICAgIGlmIChodWVDb25maWcgJiYgaHVlQ29uZmlnLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gb3JpZ2luYWxIdWUgaXMgaW4gdGhlIHJhbmdlIFswLCAxXVxyXG4gICAgICAgICAgICAvLyBNdWx0aXBseSB3aXRoIDAuOTk5IHRvIGNoYW5nZSB0aGUgcmFuZ2UgdG8gWzAsIDEpIGFuZCB0aGVuIHRydW5jYXRlIHRoZSBpbmRleC5cclxuICAgICAgICAgICAgaHVlID0gaHVlQ29uZmlnWzAgfCAoMC45OTkgKiBvcmlnaW5hbEh1ZSAqIGh1ZUNvbmZpZy5sZW5ndGgpXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0eXBlb2YgaHVlID09IFwibnVtYmVyXCIgP1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gQSBodWUgd2FzIHNwZWNpZmllZC4gV2UgbmVlZCB0byBjb252ZXJ0IHRoZSBodWUgZnJvbVxyXG4gICAgICAgICAgICAvLyBkZWdyZWVzIG9uIGFueSB0dXJuIC0gZS5nLiA3NDbCsCBpcyBhIHBlcmZlY3RseSB2YWxpZCBodWUgLVxyXG4gICAgICAgICAgICAvLyB0byB0dXJucyBpbiB0aGUgcmFuZ2UgWzAsIDEpLlxyXG4gICAgICAgICAgICAoKCgoaHVlIC8gMzYwKSAlIDEpICsgMSkgJSAxKSA6XHJcblxyXG4gICAgICAgICAgICAvLyBObyBodWUgY29uZmlndXJlZCA9PiB1c2Ugb3JpZ2luYWwgaHVlXHJcbiAgICAgICAgICAgIG9yaWdpbmFsSHVlO1xyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBQLypodWUqLzogaHVlRnVuY3Rpb24sXHJcbiAgICAgICAgbi8qY29sb3JTYXR1cmF0aW9uKi86IHR5cGVvZiBjb2xvclNhdHVyYXRpb24gPT0gXCJudW1iZXJcIiA/IGNvbG9yU2F0dXJhdGlvbiA6IDAuNSxcclxuICAgICAgICBDLypncmF5c2NhbGVTYXR1cmF0aW9uKi86IHR5cGVvZiBncmF5c2NhbGVTYXR1cmF0aW9uID09IFwibnVtYmVyXCIgPyBncmF5c2NhbGVTYXR1cmF0aW9uIDogMCxcclxuICAgICAgICBvLypjb2xvckxpZ2h0bmVzcyovOiBsaWdodG5lc3MoXCJjb2xvclwiLCBbMC40LCAwLjhdKSxcclxuICAgICAgICBELypncmF5c2NhbGVMaWdodG5lc3MqLzogbGlnaHRuZXNzKFwiZ3JheXNjYWxlXCIsIFswLjMsIDAuOV0pLFxyXG4gICAgICAgIEYvKmJhY2tDb2xvciovOiBwYXJzZUNvbG9yKGJhY2tDb2xvciksXHJcbiAgICAgICAgUi8qaWNvblBhZGRpbmcqLzogXHJcbiAgICAgICAgICAgIHR5cGVvZiBwYWRkaW5nT3JMb2NhbENvbmZpZyA9PSBcIm51bWJlclwiID8gcGFkZGluZ09yTG9jYWxDb25maWcgOiBcclxuICAgICAgICAgICAgdHlwZW9mIHBhZGRpbmcgPT0gXCJudW1iZXJcIiA/IHBhZGRpbmcgOiBcclxuICAgICAgICAgICAgZGVmYXVsdFBhZGRpbmdcclxuICAgIH1cclxufVxuXG4vKipcclxuICogUmVwcmVzZW50cyBhIHBvaW50LlxyXG4gKi9cclxuY2xhc3MgUG9pbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geCBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBUcmFuc2xhdGVzIGFuZCByb3RhdGVzIGEgcG9pbnQgYmVmb3JlIGJlaW5nIHBhc3NlZCBvbiB0byB0aGUgY2FudmFzIGNvbnRleHQuIFRoaXMgd2FzIHByZXZpb3VzbHkgZG9uZSBieSB0aGUgY2FudmFzIGNvbnRleHQgaXRzZWxmLCBcclxuICogYnV0IHRoaXMgY2F1c2VkIGEgcmVuZGVyaW5nIGlzc3VlIGluIENocm9tZSBvbiBzaXplcyA+IDI1NiB3aGVyZSB0aGUgcm90YXRpb24gdHJhbnNmb3JtYXRpb24gb2YgaW52ZXJ0ZWQgcGF0aHMgd2FzIG5vdCBkb25lIHByb3Blcmx5LlxyXG4gKi9cclxuY2xhc3MgVHJhbnNmb3JtIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgdXBwZXIgbGVmdCBjb3JuZXIgb2YgdGhlIHRyYW5zZm9ybWVkIHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHVwcGVyIGxlZnQgY29ybmVyIG9mIHRoZSB0cmFuc2Zvcm1lZCByZWN0YW5nbGUuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc2l6ZSBUaGUgc2l6ZSBvZiB0aGUgdHJhbnNmb3JtZWQgcmVjdGFuZ2xlLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvdGF0aW9uIFJvdGF0aW9uIHNwZWNpZmllZCBhcyAwID0gMCByYWQsIDEgPSAwLjXPgCByYWQsIDIgPSDPgCByYWQsIDMgPSAxLjXPgCByYWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoeCwgeSwgc2l6ZSwgcm90YXRpb24pIHtcclxuICAgICAgICB0aGlzLnAvKl94Ki8gPSB4O1xyXG4gICAgICAgIHRoaXMucS8qX3kqLyA9IHk7XHJcbiAgICAgICAgdGhpcy5HLypfc2l6ZSovID0gc2l6ZTtcclxuICAgICAgICB0aGlzLlMvKl9yb3RhdGlvbiovID0gcm90YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUcmFuc2Zvcm1zIHRoZSBzcGVjaWZpZWQgcG9pbnQgYmFzZWQgb24gdGhlIHRyYW5zbGF0aW9uIGFuZCByb3RhdGlvbiBzcGVjaWZpY2F0aW9uIGZvciB0aGlzIFRyYW5zZm9ybS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IHgtY29vcmRpbmF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHkgeS1jb29yZGluYXRlXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IHcgVGhlIHdpZHRoIG9mIHRoZSB0cmFuc2Zvcm1lZCByZWN0YW5nbGUuIElmIGdyZWF0ZXIgdGhhbiAwLCB0aGlzIHdpbGwgZW5zdXJlIHRoZSByZXR1cm5lZCBwb2ludCBpcyBvZiB0aGUgdXBwZXIgbGVmdCBjb3JuZXIgb2YgdGhlIHRyYW5zZm9ybWVkIHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyPX0gaCBUaGUgaGVpZ2h0IG9mIHRoZSB0cmFuc2Zvcm1lZCByZWN0YW5nbGUuIElmIGdyZWF0ZXIgdGhhbiAwLCB0aGlzIHdpbGwgZW5zdXJlIHRoZSByZXR1cm5lZCBwb2ludCBpcyBvZiB0aGUgdXBwZXIgbGVmdCBjb3JuZXIgb2YgdGhlIHRyYW5zZm9ybWVkIHJlY3RhbmdsZS5cclxuICAgICAqL1xyXG4gICAgSC8qdHJhbnNmb3JtSWNvblBvaW50Ki8oeCwgeSwgdywgaCkge1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gdGhpcy5wLypfeCovICsgdGhpcy5HLypfc2l6ZSovLFxyXG4gICAgICAgICAgICAgIGJvdHRvbSA9IHRoaXMucS8qX3kqLyArIHRoaXMuRy8qX3NpemUqLyxcclxuICAgICAgICAgICAgICByb3RhdGlvbiA9IHRoaXMuUy8qX3JvdGF0aW9uKi87XHJcbiAgICAgICAgcmV0dXJuIHJvdGF0aW9uID09PSAxID8gbmV3IFBvaW50KHJpZ2h0IC0geSAtIChoIHx8IDApLCB0aGlzLnEvKl95Ki8gKyB4KSA6XHJcbiAgICAgICAgICAgICAgIHJvdGF0aW9uID09PSAyID8gbmV3IFBvaW50KHJpZ2h0IC0geCAtICh3IHx8IDApLCBib3R0b20gLSB5IC0gKGggfHwgMCkpIDpcclxuICAgICAgICAgICAgICAgcm90YXRpb24gPT09IDMgPyBuZXcgUG9pbnQodGhpcy5wLypfeCovICsgeSwgYm90dG9tIC0geCAtICh3IHx8IDApKSA6XHJcbiAgICAgICAgICAgICAgIG5ldyBQb2ludCh0aGlzLnAvKl94Ki8gKyB4LCB0aGlzLnEvKl95Ki8gKyB5KTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgTk9fVFJBTlNGT1JNID0gbmV3IFRyYW5zZm9ybSgwLCAwLCAwLCAwKTtcblxuLyoqXHJcbiAqIFByb3ZpZGVzIGhlbHBlciBmdW5jdGlvbnMgZm9yIHJlbmRlcmluZyBjb21tb24gYmFzaWMgc2hhcGVzLlxyXG4gKi9cclxuY2xhc3MgR3JhcGhpY3Mge1xyXG4gICAgY29uc3RydWN0b3IocmVuZGVyZXIpIHtcclxuICAgICAgICB0aGlzLkkvKl9yZW5kZXJlciovID0gcmVuZGVyZXI7XHJcbiAgICAgICAgdGhpcy50LypfdHJhbnNmb3JtKi8gPSBOT19UUkFOU0ZPUk07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgdW5kZXJseWluZyByZW5kZXJlci5cclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBvaW50cyBUaGUgcG9pbnRzIG9mIHRoZSBwb2x5Z29uIGNsb2Nrd2lzZSBvbiB0aGUgZm9ybWF0IFsgeDAsIHkwLCB4MSwgeTEsIC4uLiwgeG4sIHluIF1cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IGludmVydCBTcGVjaWZpZXMgaWYgdGhlIHBvbHlnb24gd2lsbCBiZSBpbnZlcnRlZC5cclxuICAgICAqL1xyXG4gICAgZy8qYWRkUG9seWdvbiovKHBvaW50cywgaW52ZXJ0KSB7XHJcbiAgICAgICAgY29uc3QgZGkgPSBpbnZlcnQgPyAtMiA6IDIsIFxyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybSA9IHRoaXMudC8qX3RyYW5zZm9ybSovLFxyXG4gICAgICAgICAgICAgIHRyYW5zZm9ybWVkUG9pbnRzID0gW107XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGludmVydCA/IHBvaW50cy5sZW5ndGggLSAyIDogMDsgaSA8IHBvaW50cy5sZW5ndGggJiYgaSA+PSAwOyBpICs9IGRpKSB7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWVkUG9pbnRzLnB1c2godHJhbnNmb3JtLkgvKnRyYW5zZm9ybUljb25Qb2ludCovKHBvaW50c1tpXSwgcG9pbnRzW2kgKyAxXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkkvKl9yZW5kZXJlciovLmcvKmFkZFBvbHlnb24qLyh0cmFuc2Zvcm1lZFBvaW50cyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIHBvbHlnb24gdG8gdGhlIHVuZGVybHlpbmcgcmVuZGVyZXIuXHJcbiAgICAgKiBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIxNzMwODRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHVwcGVyIGxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUgaG9sZGluZyB0aGUgZW50aXJlIGVsbGlwc2UuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgeS1jb29yZGluYXRlIG9mIHRoZSB1cHBlciBsZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ2xlIGhvbGRpbmcgdGhlIGVudGlyZSBlbGxpcHNlLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNpemUgVGhlIHNpemUgb2YgdGhlIGVsbGlwc2UuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpbnZlcnQgU3BlY2lmaWVzIGlmIHRoZSBlbGxpcHNlIHdpbGwgYmUgaW52ZXJ0ZWQuXHJcbiAgICAgKi9cclxuICAgIGgvKmFkZENpcmNsZSovKHgsIHksIHNpemUsIGludmVydCkge1xyXG4gICAgICAgIGNvbnN0IHAgPSB0aGlzLnQvKl90cmFuc2Zvcm0qLy5ILyp0cmFuc2Zvcm1JY29uUG9pbnQqLyh4LCB5LCBzaXplLCBzaXplKTtcclxuICAgICAgICB0aGlzLkkvKl9yZW5kZXJlciovLmgvKmFkZENpcmNsZSovKHAsIHNpemUsIGludmVydCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcmVjdGFuZ2xlIHRvIHRoZSB1bmRlcmx5aW5nIHJlbmRlcmVyLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHgtY29vcmRpbmF0ZSBvZiB0aGUgdXBwZXIgbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHVwcGVyIGxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdyBUaGUgd2lkdGggb2YgdGhlIHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIFRoZSBoZWlnaHQgb2YgdGhlIHJlY3RhbmdsZS5cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbj19IGludmVydCBTcGVjaWZpZXMgaWYgdGhlIHJlY3RhbmdsZSB3aWxsIGJlIGludmVydGVkLlxyXG4gICAgICovXHJcbiAgICBpLyphZGRSZWN0YW5nbGUqLyh4LCB5LCB3LCBoLCBpbnZlcnQpIHtcclxuICAgICAgICB0aGlzLmcvKmFkZFBvbHlnb24qLyhbXHJcbiAgICAgICAgICAgIHgsIHksIFxyXG4gICAgICAgICAgICB4ICsgdywgeSxcclxuICAgICAgICAgICAgeCArIHcsIHkgKyBoLFxyXG4gICAgICAgICAgICB4LCB5ICsgaFxyXG4gICAgICAgIF0sIGludmVydCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcmlnaHQgdHJpYW5nbGUgdG8gdGhlIHVuZGVybHlpbmcgcmVuZGVyZXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgeC1jb29yZGluYXRlIG9mIHRoZSB1cHBlciBsZWZ0IGNvcm5lciBvZiB0aGUgcmVjdGFuZ2xlIGhvbGRpbmcgdGhlIHRyaWFuZ2xlLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgdXBwZXIgbGVmdCBjb3JuZXIgb2YgdGhlIHJlY3RhbmdsZSBob2xkaW5nIHRoZSB0cmlhbmdsZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3IFRoZSB3aWR0aCBvZiB0aGUgdHJpYW5nbGUuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaCBUaGUgaGVpZ2h0IG9mIHRoZSB0cmlhbmdsZS5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByIFRoZSByb3RhdGlvbiBvZiB0aGUgdHJpYW5nbGUgKGNsb2Nrd2lzZSkuIDAgPSByaWdodCBjb3JuZXIgb2YgdGhlIHRyaWFuZ2xlIGluIHRoZSBsb3dlciBsZWZ0IGNvcm5lciBvZiB0aGUgYm91bmRpbmcgcmVjdGFuZ2xlLlxyXG4gICAgICogQHBhcmFtIHtib29sZWFuPX0gaW52ZXJ0IFNwZWNpZmllcyBpZiB0aGUgdHJpYW5nbGUgd2lsbCBiZSBpbnZlcnRlZC5cclxuICAgICAqL1xyXG4gICAgai8qYWRkVHJpYW5nbGUqLyh4LCB5LCB3LCBoLCByLCBpbnZlcnQpIHtcclxuICAgICAgICBjb25zdCBwb2ludHMgPSBbXHJcbiAgICAgICAgICAgIHggKyB3LCB5LCBcclxuICAgICAgICAgICAgeCArIHcsIHkgKyBoLCBcclxuICAgICAgICAgICAgeCwgeSArIGgsXHJcbiAgICAgICAgICAgIHgsIHlcclxuICAgICAgICBdO1xyXG4gICAgICAgIHBvaW50cy5zcGxpY2UoKChyIHx8IDApICUgNCkgKiAyLCAyKTtcclxuICAgICAgICB0aGlzLmcvKmFkZFBvbHlnb24qLyhwb2ludHMsIGludmVydCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcmhvbWJ1cyB0byB0aGUgdW5kZXJseWluZyByZW5kZXJlci5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIHVwcGVyIGxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUgaG9sZGluZyB0aGUgcmhvbWJ1cy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB5LWNvb3JkaW5hdGUgb2YgdGhlIHVwcGVyIGxlZnQgY29ybmVyIG9mIHRoZSByZWN0YW5nbGUgaG9sZGluZyB0aGUgcmhvbWJ1cy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3IFRoZSB3aWR0aCBvZiB0aGUgcmhvbWJ1cy5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoIFRoZSBoZWlnaHQgb2YgdGhlIHJob21idXMuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBpbnZlcnQgU3BlY2lmaWVzIGlmIHRoZSByaG9tYnVzIHdpbGwgYmUgaW52ZXJ0ZWQuXHJcbiAgICAgKi9cclxuICAgIEovKmFkZFJob21idXMqLyh4LCB5LCB3LCBoLCBpbnZlcnQpIHtcclxuICAgICAgICB0aGlzLmcvKmFkZFBvbHlnb24qLyhbXHJcbiAgICAgICAgICAgIHggKyB3IC8gMiwgeSxcclxuICAgICAgICAgICAgeCArIHcsIHkgKyBoIC8gMixcclxuICAgICAgICAgICAgeCArIHcgLyAyLCB5ICsgaCxcclxuICAgICAgICAgICAgeCwgeSArIGggLyAyXHJcbiAgICAgICAgXSwgaW52ZXJ0KTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XHJcbiAqIEBwYXJhbSB7R3JhcGhpY3N9IGdcclxuICogQHBhcmFtIHtudW1iZXJ9IGNlbGxcclxuICogQHBhcmFtIHtudW1iZXJ9IHBvc2l0aW9uSW5kZXhcclxuICovXHJcbmZ1bmN0aW9uIGNlbnRlclNoYXBlKGluZGV4LCBnLCBjZWxsLCBwb3NpdGlvbkluZGV4KSB7XHJcbiAgICBpbmRleCA9IGluZGV4ICUgMTQ7XHJcblxyXG4gICAgbGV0IGssIG0sIHcsIGgsIGlubmVyLCBvdXRlcjtcclxuXHJcbiAgICAhaW5kZXggPyAoXHJcbiAgICAgICAgayA9IGNlbGwgKiAwLjQyLFxyXG4gICAgICAgIGcuZy8qYWRkUG9seWdvbiovKFtcclxuICAgICAgICAgICAgMCwgMCxcclxuICAgICAgICAgICAgY2VsbCwgMCxcclxuICAgICAgICAgICAgY2VsbCwgY2VsbCAtIGsgKiAyLFxyXG4gICAgICAgICAgICBjZWxsIC0gaywgY2VsbCxcclxuICAgICAgICAgICAgMCwgY2VsbFxyXG4gICAgICAgIF0pKSA6XHJcblxyXG4gICAgaW5kZXggPT0gMSA/IChcclxuICAgICAgICB3ID0gMCB8IChjZWxsICogMC41KSwgXHJcbiAgICAgICAgaCA9IDAgfCAoY2VsbCAqIDAuOCksXHJcblxyXG4gICAgICAgIGcuai8qYWRkVHJpYW5nbGUqLyhjZWxsIC0gdywgMCwgdywgaCwgMikpIDpcclxuXHJcbiAgICBpbmRleCA9PSAyID8gKFxyXG4gICAgICAgIHcgPSAwIHwgKGNlbGwgLyAzKSxcclxuICAgICAgICBnLmkvKmFkZFJlY3RhbmdsZSovKHcsIHcsIGNlbGwgLSB3LCBjZWxsIC0gdykpIDpcclxuXHJcbiAgICBpbmRleCA9PSAzID8gKFxyXG4gICAgICAgIGlubmVyID0gY2VsbCAqIDAuMSxcclxuICAgICAgICAvLyBVc2UgZml4ZWQgb3V0ZXIgYm9yZGVyIHdpZHRocyBpbiBzbWFsbCBpY29ucyB0byBlbnN1cmUgdGhlIGJvcmRlciBpcyBkcmF3blxyXG4gICAgICAgIG91dGVyID0gXHJcbiAgICAgICAgICAgIGNlbGwgPCA2ID8gMSA6XHJcbiAgICAgICAgICAgIGNlbGwgPCA4ID8gMiA6XHJcbiAgICAgICAgICAgICgwIHwgKGNlbGwgKiAwLjI1KSksXHJcbiAgICAgICAgXHJcbiAgICAgICAgaW5uZXIgPSBcclxuICAgICAgICAgICAgaW5uZXIgPiAxID8gKDAgfCBpbm5lcikgOiAvLyBsYXJnZSBpY29uID0+IHRydW5jYXRlIGRlY2ltYWxzXHJcbiAgICAgICAgICAgIGlubmVyID4gMC41ID8gMSA6ICAgICAgICAgLy8gbWVkaXVtIHNpemUgaWNvbiA9PiBmaXhlZCB3aWR0aFxyXG4gICAgICAgICAgICBpbm5lciwgICAgICAgICAgICAgICAgICAgIC8vIHNtYWxsIGljb24gPT4gYW50aS1hbGlhc2VkIGJvcmRlclxyXG5cclxuICAgICAgICBnLmkvKmFkZFJlY3RhbmdsZSovKG91dGVyLCBvdXRlciwgY2VsbCAtIGlubmVyIC0gb3V0ZXIsIGNlbGwgLSBpbm5lciAtIG91dGVyKSkgOlxyXG5cclxuICAgIGluZGV4ID09IDQgPyAoXHJcbiAgICAgICAgbSA9IDAgfCAoY2VsbCAqIDAuMTUpLFxyXG4gICAgICAgIHcgPSAwIHwgKGNlbGwgKiAwLjUpLFxyXG4gICAgICAgIGcuaC8qYWRkQ2lyY2xlKi8oY2VsbCAtIHcgLSBtLCBjZWxsIC0gdyAtIG0sIHcpKSA6XHJcblxyXG4gICAgaW5kZXggPT0gNSA/IChcclxuICAgICAgICBpbm5lciA9IGNlbGwgKiAwLjEsXHJcbiAgICAgICAgb3V0ZXIgPSBpbm5lciAqIDQsXHJcblxyXG4gICAgICAgIC8vIEFsaWduIGVkZ2UgdG8gbmVhcmVzdCBwaXhlbCBpbiBsYXJnZSBpY29uc1xyXG4gICAgICAgIG91dGVyID4gMyAmJiAob3V0ZXIgPSAwIHwgb3V0ZXIpLFxyXG4gICAgICAgIFxyXG4gICAgICAgIGcuaS8qYWRkUmVjdGFuZ2xlKi8oMCwgMCwgY2VsbCwgY2VsbCksXHJcbiAgICAgICAgZy5nLyphZGRQb2x5Z29uKi8oW1xyXG4gICAgICAgICAgICBvdXRlciwgb3V0ZXIsXHJcbiAgICAgICAgICAgIGNlbGwgLSBpbm5lciwgb3V0ZXIsXHJcbiAgICAgICAgICAgIG91dGVyICsgKGNlbGwgLSBvdXRlciAtIGlubmVyKSAvIDIsIGNlbGwgLSBpbm5lclxyXG4gICAgICAgIF0sIHRydWUpKSA6XHJcblxyXG4gICAgaW5kZXggPT0gNiA/IFxyXG4gICAgICAgIGcuZy8qYWRkUG9seWdvbiovKFtcclxuICAgICAgICAgICAgMCwgMCxcclxuICAgICAgICAgICAgY2VsbCwgMCxcclxuICAgICAgICAgICAgY2VsbCwgY2VsbCAqIDAuNyxcclxuICAgICAgICAgICAgY2VsbCAqIDAuNCwgY2VsbCAqIDAuNCxcclxuICAgICAgICAgICAgY2VsbCAqIDAuNywgY2VsbCxcclxuICAgICAgICAgICAgMCwgY2VsbFxyXG4gICAgICAgIF0pIDpcclxuXHJcbiAgICBpbmRleCA9PSA3ID8gXHJcbiAgICAgICAgZy5qLyphZGRUcmlhbmdsZSovKGNlbGwgLyAyLCBjZWxsIC8gMiwgY2VsbCAvIDIsIGNlbGwgLyAyLCAzKSA6XHJcblxyXG4gICAgaW5kZXggPT0gOCA/IChcclxuICAgICAgICBnLmkvKmFkZFJlY3RhbmdsZSovKDAsIDAsIGNlbGwsIGNlbGwgLyAyKSxcclxuICAgICAgICBnLmkvKmFkZFJlY3RhbmdsZSovKDAsIGNlbGwgLyAyLCBjZWxsIC8gMiwgY2VsbCAvIDIpLFxyXG4gICAgICAgIGcuai8qYWRkVHJpYW5nbGUqLyhjZWxsIC8gMiwgY2VsbCAvIDIsIGNlbGwgLyAyLCBjZWxsIC8gMiwgMSkpIDpcclxuXHJcbiAgICBpbmRleCA9PSA5ID8gKFxyXG4gICAgICAgIGlubmVyID0gY2VsbCAqIDAuMTQsXHJcbiAgICAgICAgLy8gVXNlIGZpeGVkIG91dGVyIGJvcmRlciB3aWR0aHMgaW4gc21hbGwgaWNvbnMgdG8gZW5zdXJlIHRoZSBib3JkZXIgaXMgZHJhd25cclxuICAgICAgICBvdXRlciA9IFxyXG4gICAgICAgICAgICBjZWxsIDwgNCA/IDEgOlxyXG4gICAgICAgICAgICBjZWxsIDwgNiA/IDIgOlxyXG4gICAgICAgICAgICAoMCB8IChjZWxsICogMC4zNSkpLFxyXG5cclxuICAgICAgICBpbm5lciA9IFxyXG4gICAgICAgICAgICBjZWxsIDwgOCA/IGlubmVyIDogLy8gc21hbGwgaWNvbiA9PiBhbnRpLWFsaWFzZWQgYm9yZGVyXHJcbiAgICAgICAgICAgICgwIHwgaW5uZXIpLCAgICAgICAvLyBsYXJnZSBpY29uID0+IHRydW5jYXRlIGRlY2ltYWxzXHJcblxyXG4gICAgICAgIGcuaS8qYWRkUmVjdGFuZ2xlKi8oMCwgMCwgY2VsbCwgY2VsbCksXHJcbiAgICAgICAgZy5pLyphZGRSZWN0YW5nbGUqLyhvdXRlciwgb3V0ZXIsIGNlbGwgLSBvdXRlciAtIGlubmVyLCBjZWxsIC0gb3V0ZXIgLSBpbm5lciwgdHJ1ZSkpIDpcclxuXHJcbiAgICBpbmRleCA9PSAxMCA/IChcclxuICAgICAgICBpbm5lciA9IGNlbGwgKiAwLjEyLFxyXG4gICAgICAgIG91dGVyID0gaW5uZXIgKiAzLFxyXG5cclxuICAgICAgICBnLmkvKmFkZFJlY3RhbmdsZSovKDAsIDAsIGNlbGwsIGNlbGwpLFxyXG4gICAgICAgIGcuaC8qYWRkQ2lyY2xlKi8ob3V0ZXIsIG91dGVyLCBjZWxsIC0gaW5uZXIgLSBvdXRlciwgdHJ1ZSkpIDpcclxuXHJcbiAgICBpbmRleCA9PSAxMSA/IFxyXG4gICAgICAgIGcuai8qYWRkVHJpYW5nbGUqLyhjZWxsIC8gMiwgY2VsbCAvIDIsIGNlbGwgLyAyLCBjZWxsIC8gMiwgMykgOlxyXG5cclxuICAgIGluZGV4ID09IDEyID8gKFxyXG4gICAgICAgIG0gPSBjZWxsICogMC4yNSxcclxuICAgICAgICBnLmkvKmFkZFJlY3RhbmdsZSovKDAsIDAsIGNlbGwsIGNlbGwpLFxyXG4gICAgICAgIGcuSi8qYWRkUmhvbWJ1cyovKG0sIG0sIGNlbGwgLSBtLCBjZWxsIC0gbSwgdHJ1ZSkpIDpcclxuXHJcbiAgICAvLyAxM1xyXG4gICAgKFxyXG4gICAgICAgICFwb3NpdGlvbkluZGV4ICYmIChcclxuICAgICAgICAgICAgbSA9IGNlbGwgKiAwLjQsIHcgPSBjZWxsICogMS4yLFxyXG4gICAgICAgICAgICBnLmgvKmFkZENpcmNsZSovKG0sIG0sIHcpXHJcbiAgICAgICAgKVxyXG4gICAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxyXG4gKiBAcGFyYW0ge0dyYXBoaWNzfSBnXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBjZWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBvdXRlclNoYXBlKGluZGV4LCBnLCBjZWxsKSB7XHJcbiAgICBpbmRleCA9IGluZGV4ICUgNDtcclxuXHJcbiAgICBsZXQgbTtcclxuXHJcbiAgICAhaW5kZXggP1xyXG4gICAgICAgIGcuai8qYWRkVHJpYW5nbGUqLygwLCAwLCBjZWxsLCBjZWxsLCAwKSA6XHJcbiAgICAgICAgXHJcbiAgICBpbmRleCA9PSAxID9cclxuICAgICAgICBnLmovKmFkZFRyaWFuZ2xlKi8oMCwgY2VsbCAvIDIsIGNlbGwsIGNlbGwgLyAyLCAwKSA6XHJcblxyXG4gICAgaW5kZXggPT0gMiA/XHJcbiAgICAgICAgZy5KLyphZGRSaG9tYnVzKi8oMCwgMCwgY2VsbCwgY2VsbCkgOlxyXG5cclxuICAgIC8vIDNcclxuICAgIChcclxuICAgICAgICBtID0gY2VsbCAvIDYsXHJcbiAgICAgICAgZy5oLyphZGRDaXJjbGUqLyhtLCBtLCBjZWxsIC0gMiAqIG0pXHJcbiAgICApO1xyXG59XG5cbi8qKlxyXG4gKiBHZXRzIGEgc2V0IG9mIGlkZW50aWNvbiBjb2xvciBjYW5kaWRhdGVzIGZvciBhIHNwZWNpZmllZCBodWUgYW5kIGNvbmZpZy5cclxuICovXHJcbmZ1bmN0aW9uIGNvbG9yVGhlbWUoaHVlLCBjb25maWcpIHtcclxuICAgIGh1ZSA9IGNvbmZpZy5QLypodWUqLyhodWUpO1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICAvLyBEYXJrIGdyYXlcclxuICAgICAgICBjb3JyZWN0ZWRIc2woaHVlLCBjb25maWcuQy8qZ3JheXNjYWxlU2F0dXJhdGlvbiovLCBjb25maWcuRC8qZ3JheXNjYWxlTGlnaHRuZXNzKi8oMCkpLFxyXG4gICAgICAgIC8vIE1pZCBjb2xvclxyXG4gICAgICAgIGNvcnJlY3RlZEhzbChodWUsIGNvbmZpZy5uLypjb2xvclNhdHVyYXRpb24qLywgY29uZmlnLm8vKmNvbG9yTGlnaHRuZXNzKi8oMC41KSksXHJcbiAgICAgICAgLy8gTGlnaHQgZ3JheVxyXG4gICAgICAgIGNvcnJlY3RlZEhzbChodWUsIGNvbmZpZy5DLypncmF5c2NhbGVTYXR1cmF0aW9uKi8sIGNvbmZpZy5ELypncmF5c2NhbGVMaWdodG5lc3MqLygxKSksXHJcbiAgICAgICAgLy8gTGlnaHQgY29sb3JcclxuICAgICAgICBjb3JyZWN0ZWRIc2woaHVlLCBjb25maWcubi8qY29sb3JTYXR1cmF0aW9uKi8sIGNvbmZpZy5vLypjb2xvckxpZ2h0bmVzcyovKDEpKSxcclxuICAgICAgICAvLyBEYXJrIGNvbG9yXHJcbiAgICAgICAgY29ycmVjdGVkSHNsKGh1ZSwgY29uZmlnLm4vKmNvbG9yU2F0dXJhdGlvbiovLCBjb25maWcuby8qY29sb3JMaWdodG5lc3MqLygwKSlcclxuICAgIF07XHJcbn1cblxuLyoqXHJcbiAqIERyYXdzIGFuIGlkZW50aWNvbiB0byBhIHNwZWNpZmllZCByZW5kZXJlci5cclxuICovXHJcbmZ1bmN0aW9uIGljb25HZW5lcmF0b3IocmVuZGVyZXIsIGhhc2gsIGNvbmZpZykge1xyXG4gICAgY29uZmlnID0gZ2V0Q29uZmlndXJhdGlvbihjb25maWcsIDAuMDgpO1xyXG5cclxuICAgIC8vIFNldCBiYWNrZ3JvdW5kIGNvbG9yXHJcbiAgICBpZiAoY29uZmlnLkYvKmJhY2tDb2xvciovKSB7XHJcbiAgICAgICAgcmVuZGVyZXIubS8qc2V0QmFja2dyb3VuZCovKGNvbmZpZy5GLypiYWNrQ29sb3IqLyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIENhbGN1bGF0ZSBwYWRkaW5nIGFuZCByb3VuZCB0byBuZWFyZXN0IGludGVnZXJcclxuICAgIGxldCBzaXplID0gcmVuZGVyZXIuay8qaWNvblNpemUqLztcclxuICAgIGNvbnN0IHBhZGRpbmcgPSAoMC41ICsgc2l6ZSAqIGNvbmZpZy5SLyppY29uUGFkZGluZyovKSB8IDA7XHJcbiAgICBzaXplIC09IHBhZGRpbmcgKiAyO1xyXG4gICAgXHJcbiAgICBjb25zdCBncmFwaGljcyA9IG5ldyBHcmFwaGljcyhyZW5kZXJlcik7XHJcbiAgICBcclxuICAgIC8vIENhbGN1bGF0ZSBjZWxsIHNpemUgYW5kIGVuc3VyZSBpdCBpcyBhbiBpbnRlZ2VyXHJcbiAgICBjb25zdCBjZWxsID0gMCB8IChzaXplIC8gNCk7XHJcbiAgICBcclxuICAgIC8vIFNpbmNlIHRoZSBjZWxsIHNpemUgaXMgaW50ZWdlciBiYXNlZCwgdGhlIGFjdHVhbCBpY29uIHdpbGwgYmUgc2xpZ2h0bHkgc21hbGxlciB0aGFuIHNwZWNpZmllZCA9PiBjZW50ZXIgaWNvblxyXG4gICAgY29uc3QgeCA9IDAgfCAocGFkZGluZyArIHNpemUgLyAyIC0gY2VsbCAqIDIpO1xyXG4gICAgY29uc3QgeSA9IDAgfCAocGFkZGluZyArIHNpemUgLyAyIC0gY2VsbCAqIDIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclNoYXBlKGNvbG9ySW5kZXgsIHNoYXBlcywgaW5kZXgsIHJvdGF0aW9uSW5kZXgsIHBvc2l0aW9ucykge1xyXG4gICAgICAgIGNvbnN0IHNoYXBlSW5kZXggPSBwYXJzZUhleChoYXNoLCBpbmRleCwgMSk7XHJcbiAgICAgICAgbGV0IHIgPSByb3RhdGlvbkluZGV4ID8gcGFyc2VIZXgoaGFzaCwgcm90YXRpb25JbmRleCwgMSkgOiAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHJlbmRlcmVyLksvKmJlZ2luU2hhcGUqLyhhdmFpbGFibGVDb2xvcnNbc2VsZWN0ZWRDb2xvckluZGV4ZXNbY29sb3JJbmRleF1dKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvc2l0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBncmFwaGljcy50LypfdHJhbnNmb3JtKi8gPSBuZXcgVHJhbnNmb3JtKHggKyBwb3NpdGlvbnNbaV1bMF0gKiBjZWxsLCB5ICsgcG9zaXRpb25zW2ldWzFdICogY2VsbCwgY2VsbCwgcisrICUgNCk7XHJcbiAgICAgICAgICAgIHNoYXBlcyhzaGFwZUluZGV4LCBncmFwaGljcywgY2VsbCwgaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJlbmRlcmVyLkwvKmVuZFNoYXBlKi8oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBVkFJTEFCTEUgQ09MT1JTXHJcbiAgICBjb25zdCBodWUgPSBwYXJzZUhleChoYXNoLCAtNykgLyAweGZmZmZmZmYsXHJcbiAgICBcclxuICAgICAgICAgIC8vIEF2YWlsYWJsZSBjb2xvcnMgZm9yIHRoaXMgaWNvblxyXG4gICAgICAgICAgYXZhaWxhYmxlQ29sb3JzID0gY29sb3JUaGVtZShodWUsIGNvbmZpZyksXHJcblxyXG4gICAgICAgICAgLy8gVGhlIGluZGV4IG9mIHRoZSBzZWxlY3RlZCBjb2xvcnNcclxuICAgICAgICAgIHNlbGVjdGVkQ29sb3JJbmRleGVzID0gW107XHJcblxyXG4gICAgbGV0IGluZGV4O1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzRHVwbGljYXRlKHZhbHVlcykge1xyXG4gICAgICAgIGlmICh2YWx1ZXMuaW5kZXhPZihpbmRleCkgPj0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ29sb3JJbmRleGVzLmluZGV4T2YodmFsdWVzW2ldKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcclxuICAgICAgICBpbmRleCA9IHBhcnNlSGV4KGhhc2gsIDggKyBpLCAxKSAlIGF2YWlsYWJsZUNvbG9ycy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGlzRHVwbGljYXRlKFswLCA0XSkgfHwgLy8gRGlzYWxsb3cgZGFyayBncmF5IGFuZCBkYXJrIGNvbG9yIGNvbWJvXHJcbiAgICAgICAgICAgIGlzRHVwbGljYXRlKFsyLCAzXSkpIHsgLy8gRGlzYWxsb3cgbGlnaHQgZ3JheSBhbmQgbGlnaHQgY29sb3IgY29tYm9cclxuICAgICAgICAgICAgaW5kZXggPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxlY3RlZENvbG9ySW5kZXhlcy5wdXNoKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBQ1RVQUwgUkVOREVSSU5HXHJcbiAgICAvLyBTaWRlc1xyXG4gICAgcmVuZGVyU2hhcGUoMCwgb3V0ZXJTaGFwZSwgMiwgMywgW1sxLCAwXSwgWzIsIDBdLCBbMiwgM10sIFsxLCAzXSwgWzAsIDFdLCBbMywgMV0sIFszLCAyXSwgWzAsIDJdXSk7XHJcbiAgICAvLyBDb3JuZXJzXHJcbiAgICByZW5kZXJTaGFwZSgxLCBvdXRlclNoYXBlLCA0LCA1LCBbWzAsIDBdLCBbMywgMF0sIFszLCAzXSwgWzAsIDNdXSk7XHJcbiAgICAvLyBDZW50ZXJcclxuICAgIHJlbmRlclNoYXBlKDIsIGNlbnRlclNoYXBlLCAxLCBudWxsLCBbWzEsIDFdLCBbMiwgMV0sIFsyLCAyXSwgWzEsIDJdXSk7XHJcbiAgICBcclxuICAgIHJlbmRlcmVyLmZpbmlzaCgpO1xyXG59XG5cbi8qKlxyXG4gKiBDb21wdXRlcyBhIFNIQTEgaGFzaCBmb3IgYW55IHZhbHVlIGFuZCByZXR1cm5zIGl0IGFzIGEgaGV4YWRlY2ltYWwgc3RyaW5nLlxyXG4gKiBcclxuICogVGhpcyBmdW5jdGlvbiBpcyBvcHRpbWl6ZWQgZm9yIG1pbmltYWwgY29kZSBzaXplIGFuZCByYXRoZXIgc2hvcnQgbWVzc2FnZXMuXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBcclxuICovXHJcbmZ1bmN0aW9uIHNoYTEobWVzc2FnZSkge1xyXG4gICAgY29uc3QgSEFTSF9TSVpFX0hBTEZfQllURVMgPSA0MDtcclxuICAgIGNvbnN0IEJMT0NLX1NJWkVfV09SRFMgPSAxNjtcclxuXHJcbiAgICAvLyBWYXJpYWJsZXNcclxuICAgIC8vIGB2YXJgIGlzIHVzZWQgdG8gYmUgYWJsZSB0byBtaW5pbWl6ZSB0aGUgbnVtYmVyIG9mIGB2YXJgIGtleXdvcmRzLlxyXG4gICAgdmFyIGkgPSAwLFxyXG4gICAgICAgIGYgPSAwLFxyXG4gICAgXHJcbiAgICAgICAgLy8gVXNlIGBlbmNvZGVVUklgIHRvIFVURjggZW5jb2RlIHRoZSBtZXNzYWdlIHdpdGhvdXQgYW55IGFkZGl0aW9uYWwgbGlicmFyaWVzXHJcbiAgICAgICAgLy8gV2UgY291bGQgdXNlIGB1bmVzY2FwZWAgKyBgZW5jb2RlVVJJYCB0byBtaW5pbWl6ZSB0aGUgY29kZSwgYnV0IHRoYXQgd291bGQgYmUgc2xpZ2h0bHkgcmlza3lcclxuICAgICAgICAvLyBzaW5jZSBgdW5lc2NhcGVgIGlzIGRlcHJlY2F0ZWQuXHJcbiAgICAgICAgdXJsRW5jb2RlZE1lc3NhZ2UgPSBlbmNvZGVVUkkobWVzc2FnZSkgKyBcIiU4MFwiLCAvLyB0cmFpbGluZyAnMScgYml0IHBhZGRpbmdcclxuICAgICAgICBcclxuICAgICAgICAvLyBUaGlzIGNhbiBiZSBjaGFuZ2VkIHRvIGEgcHJlYWxsb2NhdGVkIFVpbnQzMkFycmF5IGFycmF5IGZvciBncmVhdGVyIHBlcmZvcm1hbmNlIGFuZCBsYXJnZXIgY29kZSBzaXplXHJcbiAgICAgICAgZGF0YSA9IFtdLFxyXG4gICAgICAgIGRhdGFTaXplLFxyXG4gICAgICAgIFxyXG4gICAgICAgIGhhc2hCdWZmZXIgPSBbXSxcclxuXHJcbiAgICAgICAgYSA9IDB4Njc0NTIzMDEsXHJcbiAgICAgICAgYiA9IDB4ZWZjZGFiODksXHJcbiAgICAgICAgYyA9IH5hLFxyXG4gICAgICAgIGQgPSB+YixcclxuICAgICAgICBlID0gMHhjM2QyZTFmMCxcclxuICAgICAgICBoYXNoID0gW2EsIGIsIGMsIGQsIGVdLFxyXG5cclxuICAgICAgICBibG9ja1N0YXJ0SW5kZXggPSAwLFxyXG4gICAgICAgIGhleEhhc2ggPSBcIlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUm90YXRlcyB0aGUgdmFsdWUgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIGJpdHMgdG8gdGhlIGxlZnQuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgIFZhbHVlIHRvIHJvdGF0ZVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNoaWZ0ICBCaXQgY291bnQgdG8gc2hpZnQuXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHJvdGwodmFsdWUsIHNoaWZ0KSB7XHJcbiAgICAgICAgcmV0dXJuICh2YWx1ZSA8PCBzaGlmdCkgfCAodmFsdWUgPj4+ICgzMiAtIHNoaWZ0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWVzc2FnZSBkYXRhXHJcbiAgICBmb3IgKCA7IGkgPCB1cmxFbmNvZGVkTWVzc2FnZS5sZW5ndGg7IGYrKykge1xyXG4gICAgICAgIGRhdGFbZiA+PiAyXSA9IGRhdGFbZiA+PiAyXSB8XHJcbiAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICB1cmxFbmNvZGVkTWVzc2FnZVtpXSA9PSBcIiVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQZXJjZW50IGVuY29kZWQgYnl0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHBhcnNlSW50KHVybEVuY29kZWRNZXNzYWdlLnN1YnN0cmluZyhpICsgMSwgaSArPSAzKSwgMTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZW5jb2RlZCBieXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdXJsRW5jb2RlZE1lc3NhZ2UuY2hhckNvZGVBdChpKyspXHJcbiAgICAgICAgICAgICAgICApXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUmVhZCBieXRlcyBpbiByZXZlcnNlIG9yZGVyIChiaWcgZW5kaWFuIHdvcmRzKVxyXG4gICAgICAgICAgICAgICAgPDwgKCgzIC0gKGYgJiAzKSkgKiA4KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGYgaXMgbm93IHRoZSBsZW5ndGggb2YgdGhlIHV0ZjggZW5jb2RlZCBtZXNzYWdlXHJcbiAgICAvLyA3ID0gOCBieXRlcyAoNjQgYml0KSBmb3IgbWVzc2FnZSBzaXplLCAtMSB0byByb3VuZCBkb3duXHJcbiAgICAvLyA+PiA2ID0gaW50ZWdlciBkaXZpc2lvbiB3aXRoIGJsb2NrIHNpemVcclxuICAgIGRhdGFTaXplID0gKCgoZiArIDcpID4+IDYpICsgMSkgKiBCTE9DS19TSVpFX1dPUkRTO1xyXG5cclxuICAgIC8vIE1lc3NhZ2Ugc2l6ZSBpbiBiaXRzLlxyXG4gICAgLy8gU0hBMSB1c2VzIGEgNjQgYml0IGludGVnZXIgdG8gcmVwcmVzZW50IHRoZSBzaXplLCBidXQgc2luY2Ugd2Ugb25seSBzdXBwb3J0IHNob3J0IG1lc3NhZ2VzIG9ubHkgdGhlIGxlYXN0XHJcbiAgICAvLyBzaWduaWZpY2FudCAzMiBiaXRzIGFyZSBzZXQuIC04IGlzIGZvciB0aGUgJzEnIGJpdCBwYWRkaW5nIGJ5dGUuXHJcbiAgICBkYXRhW2RhdGFTaXplIC0gMV0gPSBmICogOCAtIDg7XHJcbiAgICBcclxuICAgIC8vIENvbXB1dGUgaGFzaFxyXG4gICAgZm9yICggOyBibG9ja1N0YXJ0SW5kZXggPCBkYXRhU2l6ZTsgYmxvY2tTdGFydEluZGV4ICs9IEJMT0NLX1NJWkVfV09SRFMpIHtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgODA7IGkrKykge1xyXG4gICAgICAgICAgICBmID0gcm90bChhLCA1KSArIGUgKyAoXHJcblx0XHRcdFx0XHQvLyBDaFxyXG5cdFx0XHRcdFx0aSA8IDIwID8gKChiICYgYykgXiAoKH5iKSAmIGQpKSArIDB4NWE4Mjc5OTkgOlxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHQvLyBQYXJpdHlcclxuXHRcdFx0XHRcdGkgPCA0MCA/IChiIF4gYyBeIGQpICsgMHg2ZWQ5ZWJhMSA6XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdC8vIE1halxyXG5cdFx0XHRcdFx0aSA8IDYwID8gKChiICYgYykgXiAoYiAmIGQpIF4gKGMgJiBkKSkgKyAweDhmMWJiY2RjIDpcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Ly8gUGFyaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgKGIgXiBjIF4gZCkgKyAweGNhNjJjMWQ2XHJcblx0XHRcdFx0KSArICggXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzaEJ1ZmZlcltpXSA9IGkgPCBCTE9DS19TSVpFX1dPUkRTXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJpdHdpc2UgT1IgaXMgdXNlZCB0byBjb2Vyc2UgYHVuZGVmaW5lZGAgdG8gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IChkYXRhW2Jsb2NrU3RhcnRJbmRleCArIGldIHwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiByb3RsKGhhc2hCdWZmZXJbaSAtIDNdIF4gaGFzaEJ1ZmZlcltpIC0gOF0gXiBoYXNoQnVmZmVyW2kgLSAxNF0gXiBoYXNoQnVmZmVyW2kgLSAxNl0sIDEpXHJcblx0XHRcdFx0KTtcclxuXHJcbiAgICAgICAgICAgIGUgPSBkO1xyXG4gICAgICAgICAgICBkID0gYztcclxuICAgICAgICAgICAgYyA9IHJvdGwoYiwgMzApO1xyXG4gICAgICAgICAgICBiID0gYTtcclxuICAgICAgICAgICAgYSA9IGY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoYXNoWzBdID0gYSA9ICgoaGFzaFswXSArIGEpIHwgMCk7XHJcbiAgICAgICAgaGFzaFsxXSA9IGIgPSAoKGhhc2hbMV0gKyBiKSB8IDApO1xyXG4gICAgICAgIGhhc2hbMl0gPSBjID0gKChoYXNoWzJdICsgYykgfCAwKTtcclxuICAgICAgICBoYXNoWzNdID0gZCA9ICgoaGFzaFszXSArIGQpIHwgMCk7XHJcbiAgICAgICAgaGFzaFs0XSA9IGUgPSAoKGhhc2hbNF0gKyBlKSB8IDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvcm1hdCBoZXggaGFzaFxyXG4gICAgZm9yIChpID0gMDsgaSA8IEhBU0hfU0laRV9IQUxGX0JZVEVTOyBpKyspIHtcclxuICAgICAgICBoZXhIYXNoICs9IChcclxuICAgICAgICAgICAgKFxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IHdvcmQgKDJeMyBoYWxmLWJ5dGVzIHBlciB3b3JkKVxyXG4gICAgICAgICAgICAgICAgaGFzaFtpID4+IDNdID4+PlxyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFwcGVuZCBoYWxmLWJ5dGVzIGluIHJldmVyc2Ugb3JkZXJcclxuICAgICAgICAgICAgICAgICgoNyAtIChpICYgNykpICogNClcclxuICAgICAgICAgICAgKSBcclxuICAgICAgICAgICAgLy8gQ2xhbXAgdG8gaGFsZi1ieXRlXHJcbiAgICAgICAgICAgICYgMHhmXHJcbiAgICAgICAgKS50b1N0cmluZygxNik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhleEhhc2g7XHJcbn1cblxuLyoqXHJcbiAqIElucHV0cyBhIHZhbHVlIHRoYXQgbWlnaHQgYmUgYSB2YWxpZCBoYXNoIHN0cmluZyBmb3IgSmRlbnRpY29uIGFuZCByZXR1cm5zIGl0IFxyXG4gKiBpZiBpdCBpcyBkZXRlcm1pbmVkIHZhbGlkLCBvdGhlcndpc2UgYSBmYWxzeSB2YWx1ZSBpcyByZXR1cm5lZC5cclxuICovXHJcbmZ1bmN0aW9uIGlzVmFsaWRIYXNoKGhhc2hDYW5kaWRhdGUpIHtcclxuICAgIHJldHVybiAvXlswLTlhLWZdezExLH0kL2kudGVzdChoYXNoQ2FuZGlkYXRlKSAmJiBoYXNoQ2FuZGlkYXRlO1xyXG59XHJcblxyXG4vKipcclxuICogQ29tcHV0ZXMgYSBoYXNoIGZvciB0aGUgc3BlY2lmaWVkIHZhbHVlLiBDdXJyZW50bHkgU0hBMSBpcyB1c2VkLiBUaGlzIGZ1bmN0aW9uXHJcbiAqIGFsd2F5cyByZXR1cm5zIGEgdmFsaWQgaGFzaC5cclxuICovXHJcbmZ1bmN0aW9uIGNvbXB1dGVIYXNoKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gc2hhMSh2YWx1ZSA9PSBudWxsID8gXCJcIiA6IFwiXCIgKyB2YWx1ZSk7XHJcbn1cblxuLyoqXHJcbiAqIFJlbmRlcmVyIHJlZGlyZWN0aW5nIGRyYXdpbmcgY29tbWFuZHMgdG8gYSBjYW52YXMgY29udGV4dC5cclxuICovXHJcbmNsYXNzIENhbnZhc1JlbmRlcmVyIHtcclxuICAgIC8qKlxyXG4gICAgICogQHBhcmFtIHtudW1iZXI9fSBpY29uU2l6ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihjdHgsIGljb25TaXplKSB7XHJcbiAgICAgICAgY29uc3Qgd2lkdGggPSBjdHguY2FudmFzLndpZHRoLFxyXG4gICAgICAgICAgICAgIGhlaWdodCA9IGN0eC5jYW52YXMuaGVpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFpY29uU2l6ZSkge1xyXG4gICAgICAgICAgICBpY29uU2l6ZSA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZShcclxuICAgICAgICAgICAgICAgICgod2lkdGggLSBpY29uU2l6ZSkgLyAyKSB8IDAsXHJcbiAgICAgICAgICAgICAgICAoKGhlaWdodCAtIGljb25TaXplKSAvIDIpIHwgMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmwvKl9jdHgqLyA9IGN0eDtcclxuICAgICAgICB0aGlzLmsvKmljb25TaXplKi8gPSBpY29uU2l6ZTtcclxuICAgICAgICBcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGljb25TaXplLCBpY29uU2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWxscyB0aGUgYmFja2dyb3VuZCB3aXRoIHRoZSBzcGVjaWZpZWQgY29sb3IuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsbENvbG9yICBGaWxsIGNvbG9yIG9uIHRoZSBmb3JtYXQgI3JyZ2diYlthYV0uXHJcbiAgICAgKi9cclxuICAgIG0vKnNldEJhY2tncm91bmQqLyhmaWxsQ29sb3IpIHtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmwvKl9jdHgqLyxcclxuICAgICAgICAgICAgICBpY29uU2l6ZSA9IHRoaXMuay8qaWNvblNpemUqLztcclxuXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRvQ3NzM0NvbG9yKGZpbGxDb2xvcik7XHJcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGljb25TaXplLCBpY29uU2l6ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGEgbmV3IHNoYXBlIG9mIHRoZSBzcGVjaWZpZWQgY29sb3IuIFNob3VsZCBiZSBlbmRlZCB3aXRoIGEgY2FsbCB0byBlbmRTaGFwZS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxsQ29sb3IgRmlsbCBjb2xvciBvbiBmb3JtYXQgI3JyZ2diYlthYV0uXHJcbiAgICAgKi9cclxuICAgIEsvKmJlZ2luU2hhcGUqLyhmaWxsQ29sb3IpIHtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmwvKl9jdHgqLztcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdG9Dc3MzQ29sb3IoZmlsbENvbG9yKTtcclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJrcyB0aGUgZW5kIG9mIHRoZSBjdXJyZW50bHkgZHJhd24gc2hhcGUuIFRoaXMgY2F1c2VzIHRoZSBxdWV1ZWQgcGF0aHMgdG8gYmUgcmVuZGVyZWQgb24gdGhlIGNhbnZhcy5cclxuICAgICAqL1xyXG4gICAgTC8qZW5kU2hhcGUqLygpIHtcclxuICAgICAgICB0aGlzLmwvKl9jdHgqLy5maWxsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB0byB0aGUgcmVuZGVyaW5nIHF1ZXVlLlxyXG4gICAgICogQHBhcmFtIHBvaW50cyBBbiBhcnJheSBvZiBQb2ludCBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBnLyphZGRQb2x5Z29uKi8ocG9pbnRzKSB7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gdGhpcy5sLypfY3R4Ki87XHJcbiAgICAgICAgY3R4Lm1vdmVUbyhwb2ludHNbMF0ueCwgcG9pbnRzWzBdLnkpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGN0eC5saW5lVG8ocG9pbnRzW2ldLngsIHBvaW50c1tpXS55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGNpcmNsZSB0byB0aGUgcmVuZGVyaW5nIHF1ZXVlLlxyXG4gICAgICogQHBhcmFtIHtQb2ludH0gcG9pbnQgVGhlIHVwcGVyIGxlZnQgY29ybmVyIG9mIHRoZSBjaXJjbGUgYm91bmRpbmcgYm94LlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRpYW1ldGVyIFRoZSBkaWFtZXRlciBvZiB0aGUgY2lyY2xlLlxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBjb3VudGVyQ2xvY2t3aXNlIFRydWUgaWYgdGhlIGNpcmNsZSBpcyBkcmF3biBjb3VudGVyLWNsb2Nrd2lzZSAod2lsbCByZXN1bHQgaW4gYSBob2xlIGlmIHJlbmRlcmVkIG9uIGEgY2xvY2t3aXNlIHBhdGgpLlxyXG4gICAgICovXHJcbiAgICBoLyphZGRDaXJjbGUqLyhwb2ludCwgZGlhbWV0ZXIsIGNvdW50ZXJDbG9ja3dpc2UpIHtcclxuICAgICAgICBjb25zdCBjdHggPSB0aGlzLmwvKl9jdHgqLyxcclxuICAgICAgICAgICAgICByYWRpdXMgPSBkaWFtZXRlciAvIDI7XHJcbiAgICAgICAgY3R4Lm1vdmVUbyhwb2ludC54ICsgcmFkaXVzLCBwb2ludC55ICsgcmFkaXVzKTtcclxuICAgICAgICBjdHguYXJjKHBvaW50LnggKyByYWRpdXMsIHBvaW50LnkgKyByYWRpdXMsIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGNvdW50ZXJDbG9ja3dpc2UpO1xyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxlZCB3aGVuIHRoZSBpY29uIGhhcyBiZWVuIGNvbXBsZXRlbHkgZHJhd24uXHJcbiAgICAgKi9cclxuICAgIGZpbmlzaCgpIHtcclxuICAgICAgICB0aGlzLmwvKl9jdHgqLy5yZXN0b3JlKCk7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIERyYXdzIGFuIGlkZW50aWNvbiB0byBhIGNvbnRleHQuXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjdHggLSBDYW52YXMgY29udGV4dCBvbiB3aGljaCB0aGUgaWNvbiB3aWxsIGJlIGRyYXduIGF0IGxvY2F0aW9uICgwLCAwKS5cclxuICogQHBhcmFtIHsqfSBoYXNoT3JWYWx1ZSAtIEEgaGV4YWRlY2ltYWwgaGFzaCBzdHJpbmcgb3IgYW55IHZhbHVlIHRoYXQgd2lsbCBiZSBoYXNoZWQgYnkgSmRlbnRpY29uLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSAtIEljb24gc2l6ZSBpbiBwaXhlbHMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fG51bWJlcj19IGNvbmZpZyAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24uIElmIHNwZWNpZmllZCwgdGhpcyBjb25maWd1cmF0aW9uIG9iamVjdCBvdmVycmlkZXMgYW55XHJcbiAqICAgIGdsb2JhbCBjb25maWd1cmF0aW9uIGluIGl0cyBlbnRpcmV0eS4gRm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYSBwYWRkaW5nIHZhbHVlIGluIHRoZSByYW5nZSBbMC4wLCAwLjUpIGNhbiBiZVxyXG4gKiAgICBzcGVjaWZpZWQgaW4gcGxhY2Ugb2YgYSBjb25maWd1cmF0aW9uIG9iamVjdC5cclxuICovXHJcbmZ1bmN0aW9uIGRyYXdJY29uKGN0eCwgaGFzaE9yVmFsdWUsIHNpemUsIGNvbmZpZykge1xyXG4gICAgaWYgKCFjdHgpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjYW52YXMgc3BlY2lmaWVkLlwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWNvbkdlbmVyYXRvcihuZXcgQ2FudmFzUmVuZGVyZXIoY3R4LCBzaXplKSwgXHJcbiAgICAgICAgaXNWYWxpZEhhc2goaGFzaE9yVmFsdWUpIHx8IGNvbXB1dGVIYXNoKGhhc2hPclZhbHVlKSwgXHJcbiAgICAgICAgY29uZmlnKTtcclxufVxuXG4vKipcclxuICogUHJlcGFyZXMgYSBtZWFzdXJlIHRvIGJlIHVzZWQgYXMgYSBtZWFzdXJlIGluIGFuIFNWRyBwYXRoLCBieVxyXG4gKiByb3VuZGluZyB0aGUgbWVhc3VyZSB0byBhIHNpbmdsZSBkZWNpbWFsLiBUaGlzIHJlZHVjZXMgdGhlIGZpbGVcclxuICogc2l6ZSBvZiB0aGUgZ2VuZXJhdGVkIFNWRyB3aXRoIG1vcmUgdGhhbiA1MCUgaW4gc29tZSBjYXNlcy5cclxuICovXHJcbmZ1bmN0aW9uIHN2Z1ZhbHVlKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gKCh2YWx1ZSAqIDEwICsgMC41KSB8IDApIC8gMTA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIFNWRyBwYXRoIGVsZW1lbnQuXHJcbiAqL1xyXG5jbGFzcyBTdmdQYXRoIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgcHJvcGVydHkgaG9sZHMgdGhlIGRhdGEgc3RyaW5nIChwYXRoLmQpIG9mIHRoZSBTVkcgcGF0aC5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnUvKmRhdGFTdHJpbmcqLyA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgcG9seWdvbiB3aXRoIHRoZSBjdXJyZW50IGZpbGwgY29sb3IgdG8gdGhlIFNWRyBwYXRoLlxyXG4gICAgICogQHBhcmFtIHBvaW50cyBBbiBhcnJheSBvZiBQb2ludCBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBnLyphZGRQb2x5Z29uKi8ocG9pbnRzKSB7XHJcbiAgICAgICAgbGV0IGRhdGFTdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhdGFTdHJpbmcgKz0gKGkgPyBcIkxcIiA6IFwiTVwiKSArIHN2Z1ZhbHVlKHBvaW50c1tpXS54KSArIFwiIFwiICsgc3ZnVmFsdWUocG9pbnRzW2ldLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnUvKmRhdGFTdHJpbmcqLyArPSBkYXRhU3RyaW5nICsgXCJaXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGRzIGEgY2lyY2xlIHdpdGggdGhlIGN1cnJlbnQgZmlsbCBjb2xvciB0byB0aGUgU1ZHIHBhdGguXHJcbiAgICAgKiBAcGFyYW0ge1BvaW50fSBwb2ludCBUaGUgdXBwZXIgbGVmdCBjb3JuZXIgb2YgdGhlIGNpcmNsZSBib3VuZGluZyBib3guXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGlhbWV0ZXIgVGhlIGRpYW1ldGVyIG9mIHRoZSBjaXJjbGUuXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvdW50ZXJDbG9ja3dpc2UgVHJ1ZSBpZiB0aGUgY2lyY2xlIGlzIGRyYXduIGNvdW50ZXItY2xvY2t3aXNlICh3aWxsIHJlc3VsdCBpbiBhIGhvbGUgaWYgcmVuZGVyZWQgb24gYSBjbG9ja3dpc2UgcGF0aCkuXHJcbiAgICAgKi9cclxuICAgIGgvKmFkZENpcmNsZSovKHBvaW50LCBkaWFtZXRlciwgY291bnRlckNsb2Nrd2lzZSkge1xyXG4gICAgICAgIGNvbnN0IHN3ZWVwRmxhZyA9IGNvdW50ZXJDbG9ja3dpc2UgPyAwIDogMSxcclxuICAgICAgICAgICAgICBzdmdSYWRpdXMgPSBzdmdWYWx1ZShkaWFtZXRlciAvIDIpLFxyXG4gICAgICAgICAgICAgIHN2Z0RpYW1ldGVyID0gc3ZnVmFsdWUoZGlhbWV0ZXIpLFxyXG4gICAgICAgICAgICAgIHN2Z0FyYyA9IFwiYVwiICsgc3ZnUmFkaXVzICsgXCIsXCIgKyBzdmdSYWRpdXMgKyBcIiAwIDEsXCIgKyBzd2VlcEZsYWcgKyBcIiBcIjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy51LypkYXRhU3RyaW5nKi8gKz0gXHJcbiAgICAgICAgICAgIFwiTVwiICsgc3ZnVmFsdWUocG9pbnQueCkgKyBcIiBcIiArIHN2Z1ZhbHVlKHBvaW50LnkgKyBkaWFtZXRlciAvIDIpICtcclxuICAgICAgICAgICAgc3ZnQXJjICsgc3ZnRGlhbWV0ZXIgKyBcIiwwXCIgKyBcclxuICAgICAgICAgICAgc3ZnQXJjICsgKC1zdmdEaWFtZXRlcikgKyBcIiwwXCI7XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIFJlbmRlcmVyIHByb2R1Y2luZyBTVkcgb3V0cHV0LlxyXG4gKi9cclxuY2xhc3MgU3ZnUmVuZGVyZXIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge1N2Z0VsZW1lbnR8U3ZnV3JpdGVyfSB0YXJnZXQgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRhcmdldCkge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtTdmdQYXRofVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudi8qX3BhdGgqLztcclxuICAgICAgICB0aGlzLkEvKl9wYXRoc0J5Q29sb3IqLyA9IHsgfTtcclxuICAgICAgICB0aGlzLk0vKl90YXJnZXQqLyA9IHRhcmdldDtcclxuICAgICAgICB0aGlzLmsvKmljb25TaXplKi8gPSB0YXJnZXQuay8qaWNvblNpemUqLztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGxzIHRoZSBiYWNrZ3JvdW5kIHdpdGggdGhlIHNwZWNpZmllZCBjb2xvci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxsQ29sb3IgIEZpbGwgY29sb3Igb24gdGhlIGZvcm1hdCAjcnJnZ2JiW2FhXS5cclxuICAgICAqL1xyXG4gICAgbS8qc2V0QmFja2dyb3VuZCovKGZpbGxDb2xvcikge1xyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gL14oIy4uLi4uLikoLi4pPy8uZXhlYyhmaWxsQ29sb3IpLFxyXG4gICAgICAgICAgICAgIG9wYWNpdHkgPSBtYXRjaFsyXSA/IHBhcnNlSGV4KG1hdGNoWzJdLCAwKSAvIDI1NSA6IDE7XHJcbiAgICAgICAgdGhpcy5NLypfdGFyZ2V0Ki8ubS8qc2V0QmFja2dyb3VuZCovKG1hdGNoWzFdLCBvcGFjaXR5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYSBuZXcgc2hhcGUgb2YgdGhlIHNwZWNpZmllZCBjb2xvci4gU2hvdWxkIGJlIGVuZGVkIHdpdGggYSBjYWxsIHRvIGVuZFNoYXBlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yIEZpbGwgY29sb3Igb24gZm9ybWF0ICN4eHh4eHguXHJcbiAgICAgKi9cclxuICAgIEsvKmJlZ2luU2hhcGUqLyhjb2xvcikge1xyXG4gICAgICAgIHRoaXMudi8qX3BhdGgqLyA9IHRoaXMuQS8qX3BhdGhzQnlDb2xvciovW2NvbG9yXSB8fCAodGhpcy5BLypfcGF0aHNCeUNvbG9yKi9bY29sb3JdID0gbmV3IFN2Z1BhdGgoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXJrcyB0aGUgZW5kIG9mIHRoZSBjdXJyZW50bHkgZHJhd24gc2hhcGUuXHJcbiAgICAgKi9cclxuICAgIEwvKmVuZFNoYXBlKi8oKSB7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgYSBwb2x5Z29uIHdpdGggdGhlIGN1cnJlbnQgZmlsbCBjb2xvciB0byB0aGUgU1ZHLlxyXG4gICAgICogQHBhcmFtIHBvaW50cyBBbiBhcnJheSBvZiBQb2ludCBvYmplY3RzLlxyXG4gICAgICovXHJcbiAgICBnLyphZGRQb2x5Z29uKi8ocG9pbnRzKSB7XHJcbiAgICAgICAgdGhpcy52LypfcGF0aCovLmcvKmFkZFBvbHlnb24qLyhwb2ludHMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkcyBhIGNpcmNsZSB3aXRoIHRoZSBjdXJyZW50IGZpbGwgY29sb3IgdG8gdGhlIFNWRy5cclxuICAgICAqIEBwYXJhbSB7UG9pbnR9IHBvaW50IFRoZSB1cHBlciBsZWZ0IGNvcm5lciBvZiB0aGUgY2lyY2xlIGJvdW5kaW5nIGJveC5cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkaWFtZXRlciBUaGUgZGlhbWV0ZXIgb2YgdGhlIGNpcmNsZS5cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY291bnRlckNsb2Nrd2lzZSBUcnVlIGlmIHRoZSBjaXJjbGUgaXMgZHJhd24gY291bnRlci1jbG9ja3dpc2UgKHdpbGwgcmVzdWx0IGluIGEgaG9sZSBpZiByZW5kZXJlZCBvbiBhIGNsb2Nrd2lzZSBwYXRoKS5cclxuICAgICAqL1xyXG4gICAgaC8qYWRkQ2lyY2xlKi8ocG9pbnQsIGRpYW1ldGVyLCBjb3VudGVyQ2xvY2t3aXNlKSB7XHJcbiAgICAgICAgdGhpcy52LypfcGF0aCovLmgvKmFkZENpcmNsZSovKHBvaW50LCBkaWFtZXRlciwgY291bnRlckNsb2Nrd2lzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDYWxsZWQgd2hlbiB0aGUgaWNvbiBoYXMgYmVlbiBjb21wbGV0ZWx5IGRyYXduLlxyXG4gICAgICovXHJcbiAgICBmaW5pc2goKSB7IFxyXG4gICAgICAgIGNvbnN0IHBhdGhzQnlDb2xvciA9IHRoaXMuQS8qX3BhdGhzQnlDb2xvciovO1xyXG4gICAgICAgIGZvciAobGV0IGNvbG9yIGluIHBhdGhzQnlDb2xvcikge1xyXG4gICAgICAgICAgICAvLyBoYXNPd25Qcm9wZXJ0eSBjYW5ub3QgYmUgc2hhZG93ZWQgaW4gcGF0aHNCeUNvbG9yXHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcclxuICAgICAgICAgICAgaWYgKHBhdGhzQnlDb2xvci5oYXNPd25Qcm9wZXJ0eShjb2xvcikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTS8qX3RhcmdldCovLk4vKmFwcGVuZFBhdGgqLyhjb2xvciwgcGF0aHNCeUNvbG9yW2NvbG9yXS51LypkYXRhU3RyaW5nKi8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBSZW5kZXJlciBwcm9kdWNpbmcgU1ZHIG91dHB1dC5cclxuICovXHJcbmNsYXNzIFN2Z1dyaXRlciB7XHJcbiAgICAvKipcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpY29uU2l6ZSAtIEljb24gd2lkdGggYW5kIGhlaWdodCBpbiBwaXhlbHMuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGljb25TaXplKSB7XHJcbiAgICAgICAgdGhpcy5rLyppY29uU2l6ZSovID0gaWNvblNpemU7XHJcbiAgICAgICAgdGhpcy5CLypfcyovID1cclxuICAgICAgICAgICAgJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJyArIFxyXG4gICAgICAgICAgICBpY29uU2l6ZSArICdcIiBoZWlnaHQ9XCInICsgaWNvblNpemUgKyAnXCIgdmlld0JveD1cIjAgMCAnICsgXHJcbiAgICAgICAgICAgIGljb25TaXplICsgJyAnICsgaWNvblNpemUgKyAnXCI+JztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGxzIHRoZSBiYWNrZ3JvdW5kIHdpdGggdGhlIHNwZWNpZmllZCBjb2xvci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxsQ29sb3IgIEZpbGwgY29sb3Igb24gdGhlIGZvcm1hdCAjcnJnZ2JiLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wYWNpdHkgIE9wYWNpdHkgaW4gdGhlIHJhbmdlIFswLjAsIDEuMF0uXHJcbiAgICAgKi9cclxuICAgIG0vKnNldEJhY2tncm91bmQqLyhmaWxsQ29sb3IsIG9wYWNpdHkpIHtcclxuICAgICAgICBpZiAob3BhY2l0eSkge1xyXG4gICAgICAgICAgICB0aGlzLkIvKl9zKi8gKz0gJzxyZWN0IHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIiBmaWxsPVwiJyArIFxyXG4gICAgICAgICAgICAgICAgZmlsbENvbG9yICsgJ1wiIG9wYWNpdHk9XCInICsgb3BhY2l0eS50b0ZpeGVkKDIpICsgJ1wiLz4nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFdyaXRlcyBhIHBhdGggdG8gdGhlIFNWRyBzdHJpbmcuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3IgRmlsbCBjb2xvciBvbiBmb3JtYXQgI3JyZ2diYi5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhU3RyaW5nIFRoZSBTVkcgcGF0aCBkYXRhIHN0cmluZy5cclxuICAgICAqL1xyXG4gICAgTi8qYXBwZW5kUGF0aCovKGNvbG9yLCBkYXRhU3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5CLypfcyovICs9ICc8cGF0aCBmaWxsPVwiJyArIGNvbG9yICsgJ1wiIGQ9XCInICsgZGF0YVN0cmluZyArICdcIi8+JztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHJlbmRlcmVkIGltYWdlIGFzIGFuIFNWRyBzdHJpbmcuXHJcbiAgICAgKi9cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkIvKl9zKi8gKyBcIjwvc3ZnPlwiO1xyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBEcmF3cyBhbiBpZGVudGljb24gYXMgYW4gU1ZHIHN0cmluZy5cclxuICogQHBhcmFtIHsqfSBoYXNoT3JWYWx1ZSAtIEEgaGV4YWRlY2ltYWwgaGFzaCBzdHJpbmcgb3IgYW55IHZhbHVlIHRoYXQgd2lsbCBiZSBoYXNoZWQgYnkgSmRlbnRpY29uLlxyXG4gKiBAcGFyYW0ge251bWJlcn0gc2l6ZSAtIEljb24gc2l6ZSBpbiBwaXhlbHMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fG51bWJlcj19IGNvbmZpZyAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24uIElmIHNwZWNpZmllZCwgdGhpcyBjb25maWd1cmF0aW9uIG9iamVjdCBvdmVycmlkZXMgYW55XHJcbiAqICAgIGdsb2JhbCBjb25maWd1cmF0aW9uIGluIGl0cyBlbnRpcmV0eS4gRm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYSBwYWRkaW5nIHZhbHVlIGluIHRoZSByYW5nZSBbMC4wLCAwLjUpIGNhbiBiZVxyXG4gKiAgICBzcGVjaWZpZWQgaW4gcGxhY2Ugb2YgYSBjb25maWd1cmF0aW9uIG9iamVjdC5cclxuICogQHJldHVybnMge3N0cmluZ30gU1ZHIHN0cmluZ1xyXG4gKi9cclxuZnVuY3Rpb24gdG9TdmcoaGFzaE9yVmFsdWUsIHNpemUsIGNvbmZpZykge1xyXG4gICAgY29uc3Qgd3JpdGVyID0gbmV3IFN2Z1dyaXRlcihzaXplKTtcclxuICAgIGljb25HZW5lcmF0b3IobmV3IFN2Z1JlbmRlcmVyKHdyaXRlciksIFxyXG4gICAgICAgIGlzVmFsaWRIYXNoKGhhc2hPclZhbHVlKSB8fCBjb21wdXRlSGFzaChoYXNoT3JWYWx1ZSksXHJcbiAgICAgICAgY29uZmlnKTtcclxuICAgIHJldHVybiB3cml0ZXIudG9TdHJpbmcoKTtcclxufVxuXG5jb25zdCBJQ09OX1RZUEVfU1ZHID0gMTtcclxuXHJcbmNvbnN0IElDT05fVFlQRV9DQU5WQVMgPSAyO1xyXG5cclxuLyoqXHJcbiAqIEBub2lubGluZVxyXG4gKi9cclxuY29uc3QgSEFTSF9BVFRSSUJVVEUgPSBcImRhdGEtamRlbnRpY29uLWhhc2hcIjtcclxuXHJcbi8qKlxyXG4gKiBAbm9pbmxpbmVcclxuICovXHJcbmNvbnN0IFZBTFVFX0FUVFJJQlVURSA9IFwiZGF0YS1qZGVudGljb24tdmFsdWVcIjtcclxuXHJcbmNvbnN0IGRvY3VtZW50UXVlcnlTZWxlY3RvckFsbCA9IC8qKiBAdHlwZSB7IUZ1bmN0aW9ufSAqLyAoXHJcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbC5iaW5kKGRvY3VtZW50KSk7XHJcblxyXG5mdW5jdGlvbiBnZXRJZGVudGljb25UeXBlKGVsKSB7XHJcbiAgICBpZiAoZWwpIHtcclxuICAgICAgICBjb25zdCB0YWdOYW1lID0gZWxbXCJ0YWdOYW1lXCJdO1xyXG5cclxuICAgICAgICBpZiAoL15zdmckL2kudGVzdCh0YWdOYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSUNPTl9UWVBFX1NWRztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgvXmNhbnZhcyQvaS50ZXN0KHRhZ05hbWUpICYmIFwiZ2V0Q29udGV4dFwiIGluIGVsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBJQ09OX1RZUEVfQ0FOVkFTO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG4vKipcclxuICogQ3JlYXRlcyBhIG5ldyBlbGVtZW50IGFuZCBhZGRzIGl0IHRvIHRoZSBzcGVjaWZpZWQgcGFyZW50LlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHBhcmVudE5vZGVcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHsuLi4oc3RyaW5nfG51bWJlcil9IGtleVZhbHVlUGFpcnNcclxuICovXHJcbmZ1bmN0aW9uIFN2Z0VsZW1lbnRfYXBwZW5kKHBhcmVudE5vZGUsIG5hbWUsIC4uLmtleVZhbHVlUGFpcnMpIHtcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiwgbmFtZSk7XHJcbiAgICBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpICsgMSA8IGtleVZhbHVlUGFpcnMubGVuZ3RoOyBpICs9IDIpIHtcclxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyAoa2V5VmFsdWVQYWlyc1tpXSksXHJcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7c3RyaW5nfG51bWJlcn0gKi8gKGtleVZhbHVlUGFpcnNbaSArIDFdKSxcclxuICAgICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKGVsKTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJlciBwcm9kdWNpbmcgU1ZHIG91dHB1dC5cclxuICovXHJcbmNsYXNzIFN2Z0VsZW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgLSBUYXJnZXQgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgLy8gRG9uJ3QgdXNlIHRoZSBjbGllbnRXaWR0aCBhbmQgY2xpZW50SGVpZ2h0IHByb3BlcnRpZXMgb24gU1ZHIGVsZW1lbnRzXHJcbiAgICAgICAgLy8gc2luY2UgRmlyZWZveCB3b24ndCBzZXJ2ZSBhIHByb3BlciB2YWx1ZSBvZiB0aGVzZSBwcm9wZXJ0aWVzIG9uIFNWR1xyXG4gICAgICAgIC8vIGVsZW1lbnRzIChodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD04NzQ4MTEpXHJcbiAgICAgICAgLy8gSW5zdGVhZCB1c2UgMTAwcHggYXMgYSBoYXJkY29kZWQgc2l6ZSAodGhlIHN2ZyB2aWV3Qm94IHdpbGwgcmVzY2FsZSBcclxuICAgICAgICAvLyB0aGUgaWNvbiB0byB0aGUgY29ycmVjdCBkaW1lbnNpb25zKVxyXG4gICAgICAgIGNvbnN0IGljb25TaXplID0gdGhpcy5rLyppY29uU2l6ZSovID0gTWF0aC5taW4oXHJcbiAgICAgICAgICAgIChOdW1iZXIoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKSkgfHwgMTAwKSxcclxuICAgICAgICAgICAgKE51bWJlcihlbGVtZW50LmdldEF0dHJpYnV0ZShcImhlaWdodFwiKSkgfHwgMTAwKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuTy8qX2VsKi8gPSBlbGVtZW50O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIENsZWFyIGN1cnJlbnQgU1ZHIGNoaWxkIGVsZW1lbnRzXHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIFNldCB2aWV3Qm94IGF0dHJpYnV0ZSB0byBlbnN1cmUgdGhlIHN2ZyBzY2FsZXMgbmljZWx5LlxyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwidmlld0JveFwiLCBcIjAgMCBcIiArIGljb25TaXplICsgXCIgXCIgKyBpY29uU2l6ZSk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJwcmVzZXJ2ZUFzcGVjdFJhdGlvXCIsIFwieE1pZFlNaWQgbWVldFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpbGxzIHRoZSBiYWNrZ3JvdW5kIHdpdGggdGhlIHNwZWNpZmllZCBjb2xvci5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxsQ29sb3IgIEZpbGwgY29sb3Igb24gdGhlIGZvcm1hdCAjcnJnZ2JiLlxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9wYWNpdHkgIE9wYWNpdHkgaW4gdGhlIHJhbmdlIFswLjAsIDEuMF0uXHJcbiAgICAgKi9cclxuICAgIG0vKnNldEJhY2tncm91bmQqLyhmaWxsQ29sb3IsIG9wYWNpdHkpIHtcclxuICAgICAgICBpZiAob3BhY2l0eSkge1xyXG4gICAgICAgICAgICBTdmdFbGVtZW50X2FwcGVuZCh0aGlzLk8vKl9lbCovLCBcInJlY3RcIixcclxuICAgICAgICAgICAgICAgIFwid2lkdGhcIiwgXCIxMDAlXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlaWdodFwiLCBcIjEwMCVcIixcclxuICAgICAgICAgICAgICAgIFwiZmlsbFwiLCBmaWxsQ29sb3IsXHJcbiAgICAgICAgICAgICAgICBcIm9wYWNpdHlcIiwgb3BhY2l0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQXBwZW5kcyBhIHBhdGggdG8gdGhlIFNWRyBlbGVtZW50LlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yIEZpbGwgY29sb3Igb24gZm9ybWF0ICN4eHh4eHguXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGF0YVN0cmluZyBUaGUgU1ZHIHBhdGggZGF0YSBzdHJpbmcuXHJcbiAgICAgKi9cclxuICAgIE4vKmFwcGVuZFBhdGgqLyhjb2xvciwgZGF0YVN0cmluZykge1xyXG4gICAgICAgIFN2Z0VsZW1lbnRfYXBwZW5kKHRoaXMuTy8qX2VsKi8sIFwicGF0aFwiLFxyXG4gICAgICAgICAgICBcImZpbGxcIiwgY29sb3IsXHJcbiAgICAgICAgICAgIFwiZFwiLCBkYXRhU3RyaW5nKTtcclxuICAgIH1cclxufVxuXG4vKipcclxuICogVXBkYXRlcyB0aGUgaWRlbnRpY29uIGluIHRoZSBzcGVjaWZpZWQgYDxjYW52YXM+YCBvciBgPHN2Zz5gIGVsZW1lbnRzLlxyXG4gKiBAcGFyYW0geyhzdHJpbmd8RWxlbWVudCl9IGVsIC0gU3BlY2lmaWVzIHRoZSBjb250YWluZXIgaW4gd2hpY2ggdGhlIGljb24gaXMgcmVuZGVyZWQgYXMgYSBET00gZWxlbWVudCBvZiB0aGUgdHlwZVxyXG4gKiAgICBgPHN2Zz5gIG9yIGA8Y2FudmFzPmAsIG9yIGEgQ1NTIHNlbGVjdG9yIHRvIHN1Y2ggYW4gZWxlbWVudC5cclxuICogQHBhcmFtIHsqPX0gaGFzaE9yVmFsdWUgLSBPcHRpb25hbCBoYXNoIG9yIHZhbHVlIHRvIGJlIHJlbmRlcmVkLiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgYGRhdGEtamRlbnRpY29uLWhhc2hgIG9yXHJcbiAqICAgIGBkYXRhLWpkZW50aWNvbi12YWx1ZWAgYXR0cmlidXRlIHdpbGwgYmUgZXZhbHVhdGVkLlxyXG4gKiBAcGFyYW0ge09iamVjdHxudW1iZXI9fSBjb25maWcgLSBPcHRpb25hbCBjb25maWd1cmF0aW9uLiBJZiBzcGVjaWZpZWQsIHRoaXMgY29uZmlndXJhdGlvbiBvYmplY3Qgb3ZlcnJpZGVzIGFueVxyXG4gKiAgICBnbG9iYWwgY29uZmlndXJhdGlvbiBpbiBpdHMgZW50aXJldHkuIEZvciBiYWNrd2FyZCBjb21wYWJpbGl0eSBhIHBhZGRpbmcgdmFsdWUgaW4gdGhlIHJhbmdlIFswLjAsIDAuNSkgY2FuIGJlXHJcbiAqICAgIHNwZWNpZmllZCBpbiBwbGFjZSBvZiBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlKGVsLCBoYXNoT3JWYWx1ZSwgY29uZmlnKSB7XHJcbiAgICByZW5kZXJEb21FbGVtZW50KGVsLCBoYXNoT3JWYWx1ZSwgY29uZmlnLCBmdW5jdGlvbiAoZWwsIGljb25UeXBlKSB7XHJcbiAgICAgICAgaWYgKGljb25UeXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpY29uVHlwZSA9PSBJQ09OX1RZUEVfU1ZHID8gXHJcbiAgICAgICAgICAgICAgICBuZXcgU3ZnUmVuZGVyZXIobmV3IFN2Z0VsZW1lbnQoZWwpKSA6IFxyXG4gICAgICAgICAgICAgICAgbmV3IENhbnZhc1JlbmRlcmVyKGVsLmdldENvbnRleHQoXCIyZFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHRoZSBpZGVudGljb24gaW4gdGhlIHNwZWNpZmllZCBgPGNhbnZhcz5gIGVsZW1lbnRzLlxyXG4gKiBAcGFyYW0geyhzdHJpbmd8RWxlbWVudCl9IGVsIC0gU3BlY2lmaWVzIHRoZSBjb250YWluZXIgaW4gd2hpY2ggdGhlIGljb24gaXMgcmVuZGVyZWQgYXMgYSBET00gZWxlbWVudCBvZiB0aGUgdHlwZVxyXG4gKiAgICBgPGNhbnZhcz5gLCBvciBhIENTUyBzZWxlY3RvciB0byBzdWNoIGFuIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7Kj19IGhhc2hPclZhbHVlIC0gT3B0aW9uYWwgaGFzaCBvciB2YWx1ZSB0byBiZSByZW5kZXJlZC4gSWYgbm90IHNwZWNpZmllZCwgdGhlIGBkYXRhLWpkZW50aWNvbi1oYXNoYCBvclxyXG4gKiAgICBgZGF0YS1qZGVudGljb24tdmFsdWVgIGF0dHJpYnV0ZSB3aWxsIGJlIGV2YWx1YXRlZC5cclxuICogQHBhcmFtIHtPYmplY3R8bnVtYmVyPX0gY29uZmlnIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvbi4gSWYgc3BlY2lmaWVkLCB0aGlzIGNvbmZpZ3VyYXRpb24gb2JqZWN0IG92ZXJyaWRlcyBhbnlcclxuICogICAgZ2xvYmFsIGNvbmZpZ3VyYXRpb24gaW4gaXRzIGVudGlyZXR5LiBGb3IgYmFja3dhcmQgY29tcGFiaWxpdHkgYSBwYWRkaW5nIHZhbHVlIGluIHRoZSByYW5nZSBbMC4wLCAwLjUpIGNhbiBiZVxyXG4gKiAgICBzcGVjaWZpZWQgaW4gcGxhY2Ugb2YgYSBjb25maWd1cmF0aW9uIG9iamVjdC5cclxuICovXHJcbmZ1bmN0aW9uIHVwZGF0ZUNhbnZhcyhlbCwgaGFzaE9yVmFsdWUsIGNvbmZpZykge1xyXG4gICAgcmVuZGVyRG9tRWxlbWVudChlbCwgaGFzaE9yVmFsdWUsIGNvbmZpZywgZnVuY3Rpb24gKGVsLCBpY29uVHlwZSkge1xyXG4gICAgICAgIGlmIChpY29uVHlwZSA9PSBJQ09OX1RZUEVfQ0FOVkFTKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2FudmFzUmVuZGVyZXIoZWwuZ2V0Q29udGV4dChcIjJkXCIpKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVwZGF0ZXMgdGhlIGlkZW50aWNvbiBpbiB0aGUgc3BlY2lmaWVkIGA8c3ZnPmAgZWxlbWVudHMuXHJcbiAqIEBwYXJhbSB7KHN0cmluZ3xFbGVtZW50KX0gZWwgLSBTcGVjaWZpZXMgdGhlIGNvbnRhaW5lciBpbiB3aGljaCB0aGUgaWNvbiBpcyByZW5kZXJlZCBhcyBhIERPTSBlbGVtZW50IG9mIHRoZSB0eXBlXHJcbiAqICAgIGA8c3ZnPmAsIG9yIGEgQ1NTIHNlbGVjdG9yIHRvIHN1Y2ggYW4gZWxlbWVudC5cclxuICogQHBhcmFtIHsqPX0gaGFzaE9yVmFsdWUgLSBPcHRpb25hbCBoYXNoIG9yIHZhbHVlIHRvIGJlIHJlbmRlcmVkLiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgYGRhdGEtamRlbnRpY29uLWhhc2hgIG9yXHJcbiAqICAgIGBkYXRhLWpkZW50aWNvbi12YWx1ZWAgYXR0cmlidXRlIHdpbGwgYmUgZXZhbHVhdGVkLlxyXG4gKiBAcGFyYW0ge09iamVjdHxudW1iZXI9fSBjb25maWcgLSBPcHRpb25hbCBjb25maWd1cmF0aW9uLiBJZiBzcGVjaWZpZWQsIHRoaXMgY29uZmlndXJhdGlvbiBvYmplY3Qgb3ZlcnJpZGVzIGFueVxyXG4gKiAgICBnbG9iYWwgY29uZmlndXJhdGlvbiBpbiBpdHMgZW50aXJldHkuIEZvciBiYWNrd2FyZCBjb21wYWJpbGl0eSBhIHBhZGRpbmcgdmFsdWUgaW4gdGhlIHJhbmdlIFswLjAsIDAuNSkgY2FuIGJlXHJcbiAqICAgIHNwZWNpZmllZCBpbiBwbGFjZSBvZiBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0LlxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlU3ZnKGVsLCBoYXNoT3JWYWx1ZSwgY29uZmlnKSB7XHJcbiAgICByZW5kZXJEb21FbGVtZW50KGVsLCBoYXNoT3JWYWx1ZSwgY29uZmlnLCBmdW5jdGlvbiAoZWwsIGljb25UeXBlKSB7XHJcbiAgICAgICAgaWYgKGljb25UeXBlID09IElDT05fVFlQRV9TVkcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdmdSZW5kZXJlcihuZXcgU3ZnRWxlbWVudChlbCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlcyB0aGUgaWRlbnRpY29uIGluIHRoZSBzcGVjaWZpZWQgY2FudmFzIG9yIHN2ZyBlbGVtZW50cy5cclxuICogQHBhcmFtIHsoc3RyaW5nfEVsZW1lbnQpfSBlbCAtIFNwZWNpZmllcyB0aGUgY29udGFpbmVyIGluIHdoaWNoIHRoZSBpY29uIGlzIHJlbmRlcmVkIGFzIGEgRE9NIGVsZW1lbnQgb2YgdGhlIHR5cGVcclxuICogICAgYDxzdmc+YCBvciBgPGNhbnZhcz5gLCBvciBhIENTUyBzZWxlY3RvciB0byBzdWNoIGFuIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSB7Kn0gaGFzaE9yVmFsdWUgLSBPcHRpb25hbCBoYXNoIG9yIHZhbHVlIHRvIGJlIHJlbmRlcmVkLiBJZiBub3Qgc3BlY2lmaWVkLCB0aGUgYGRhdGEtamRlbnRpY29uLWhhc2hgIG9yXHJcbiAqICAgIGBkYXRhLWpkZW50aWNvbi12YWx1ZWAgYXR0cmlidXRlIHdpbGwgYmUgZXZhbHVhdGVkLlxyXG4gKiBAcGFyYW0ge09iamVjdHxudW1iZXJ8dW5kZWZpbmVkfSBjb25maWdcclxuICogQHBhcmFtIHtmdW5jdGlvbihFbGVtZW50LG51bWJlcil9IHJlbmRlcmVyRmFjdG9yeSAtIEZhY3RvcnkgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGFuIGljb24gcmVuZGVyZXIuXHJcbiAqL1xyXG5mdW5jdGlvbiByZW5kZXJEb21FbGVtZW50KGVsLCBoYXNoT3JWYWx1ZSwgY29uZmlnLCByZW5kZXJlckZhY3RvcnkpIHtcclxuICAgIGlmICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnRRdWVyeVNlbGVjdG9yQWxsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnRRdWVyeVNlbGVjdG9yQWxsKGVsKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyRG9tRWxlbWVudChlbGVtZW50c1tpXSwgaGFzaE9yVmFsdWUsIGNvbmZpZywgcmVuZGVyZXJGYWN0b3J5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIEhhc2ggc2VsZWN0aW9uLiBUaGUgcmVzdWx0IGZyb20gZ2V0VmFsaWRIYXNoIG9yIGNvbXB1dGVIYXNoIGlzIFxyXG4gICAgLy8gYWNjZXB0ZWQgYXMgYSB2YWxpZCBoYXNoLlxyXG4gICAgY29uc3QgaGFzaCA9IFxyXG4gICAgICAgIC8vIDEuIEV4cGxpY2l0IHZhbGlkIGhhc2hcclxuICAgICAgICBpc1ZhbGlkSGFzaChoYXNoT3JWYWx1ZSkgfHxcclxuICAgICAgICBcclxuICAgICAgICAvLyAyLiBFeHBsaWNpdCB2YWx1ZSAoYCE9IG51bGxgIGNhdGNoZXMgYm90aCBudWxsIGFuZCB1bmRlZmluZWQpXHJcbiAgICAgICAgaGFzaE9yVmFsdWUgIT0gbnVsbCAmJiBjb21wdXRlSGFzaChoYXNoT3JWYWx1ZSkgfHxcclxuICAgICAgICBcclxuICAgICAgICAvLyAzLiBgZGF0YS1qZGVudGljb24taGFzaGAgYXR0cmlidXRlXHJcbiAgICAgICAgaXNWYWxpZEhhc2goZWwuZ2V0QXR0cmlidXRlKEhBU0hfQVRUUklCVVRFKSkgfHxcclxuICAgICAgICBcclxuICAgICAgICAvLyA0LiBgZGF0YS1qZGVudGljb24tdmFsdWVgIGF0dHJpYnV0ZS4gXHJcbiAgICAgICAgLy8gV2Ugd2FudCB0byB0cmVhdCBhbiBlbXB0eSBhdHRyaWJ1dGUgYXMgYW4gZW1wdHkgdmFsdWUuIFxyXG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgcmV0dXJuIGVtcHR5IHN0cmluZyBldmVuIGlmIHRoZSBhdHRyaWJ1dGUgXHJcbiAgICAgICAgLy8gaXMgbm90IHNwZWNpZmllZCwgc28gdXNlIGhhc0F0dHJpYnV0ZSB0byBkZXRlcm1pbmUgaWYgXHJcbiAgICAgICAgLy8gdGhlIGF0dHJpYnV0ZSBpcyBzcGVjaWZpZWQuXHJcbiAgICAgICAgZWwuaGFzQXR0cmlidXRlKFZBTFVFX0FUVFJJQlVURSkgJiYgY29tcHV0ZUhhc2goZWwuZ2V0QXR0cmlidXRlKFZBTFVFX0FUVFJJQlVURSkpO1xyXG4gICAgXHJcbiAgICBpZiAoIWhhc2gpIHtcclxuICAgICAgICAvLyBObyBoYXNoIHNwZWNpZmllZC4gRG9uJ3QgcmVuZGVyIGFuIGljb24uXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCByZW5kZXJlciA9IHJlbmRlcmVyRmFjdG9yeShlbCwgZ2V0SWRlbnRpY29uVHlwZShlbCkpO1xyXG4gICAgaWYgKHJlbmRlcmVyKSB7XHJcbiAgICAgICAgLy8gRHJhdyBpY29uXHJcbiAgICAgICAgaWNvbkdlbmVyYXRvcihyZW5kZXJlciwgaGFzaCwgY29uZmlnKTtcclxuICAgIH1cclxufVxuXG4vLyBUaGlzIGZpbGUgaXMgY29tcGlsZWQgdG8gZGlzdC9qZGVudGljb24tbW9kdWxlLm1qc1xyXG5cclxuLyoqXHJcbiAqIFNwZWNpZmllcyB0aGUgdmVyc2lvbiBvZiB0aGUgSmRlbnRpY29uIHBhY2thZ2UgaW4gdXNlLlxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuY29uc3QgdmVyc2lvbiA9IFwiMy4wLjFcIjtcclxuXHJcbi8qKlxyXG4gKiBTcGVjaWZpZXMgd2hpY2ggYnVuZGxlIG9mIEpkZW50aWNvbiB0aGF0IGlzIHVzZWQuXHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5jb25zdCBidW5kbGUgPSBcImJyb3dzZXItZXNtXCI7XG5cbmV4cG9ydCB7IGJ1bmRsZSwgY29uZmlndXJlLCBkcmF3SWNvbiwgdG9TdmcsIHVwZGF0ZSwgdXBkYXRlQ2FudmFzLCB1cGRhdGVTdmcsIHZlcnNpb24gfTtcbiIsImltcG9ydCB7XG4gICAgdG9TdmcsXG59IGZyb20gXCJqZGVudGljb25cIjtcblxubGV0IHdzO1xubGV0IHVzZXJuYW1lID0gXCJBbm9ueW1vdXNcIjtcbi8vIFRPRE8gaWRlbnRpY29uIGNhY2hlP1xuXG5mdW5jdGlvbiBsb2cobWVzc2FnZSkge1xuICAgIGxldCBtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBsZXQgb3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtZXNzYWdlc1wiKTtcbiAgICBtLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgICBtLmNsYXNzTmFtZSA9IFwibWVzc2FnZVwiO1xuXG4gICAgbGV0IG9sZFNjcm9sbEhlaWdodCA9IG91dHB1dC5zY3JvbGxIZWlnaHQ7XG4gICAgb3V0cHV0LmFwcGVuZENoaWxkKG0pO1xuICAgIGNvbmRpdGlvbmFsTWVzc2FnZVNjcm9sbChvbGRTY3JvbGxIZWlnaHQpO1xufVxuXG5mdW5jdGlvbiBpbml0VXNlcmxpc3QoY29ubmVjdGVkKSB7XG4gICAgLy8gZmlsbCB1c2VyIGxpc3RcbiAgICBsZXQgdXNlcmxpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGZvciAobGV0IHVzZXIgb2YgY29ubmVjdGVkKSB7XG4gICAgICAgIGxldCB1c2VyRW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB1c2VyRW50cnkuY2xhc3NOYW1lID0gXCJ1c2VyLWNvbm5lY3RlZFwiO1xuICAgICAgICB1c2VyRW50cnkuZGF0YXNldC51c2VyaWQgPSB1c2VyLnVzZXJpZDtcblxuICAgICAgICBsZXQgdXNlckltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdXNlckltYWdlLmNsYXNzTmFtZSA9IFwidXNlci1pbWFnZVwiO1xuICAgICAgICB1c2VySW1hZ2UuaW5uZXJIVE1MID0gdG9TdmcodXNlci51c2VyaWQsIDEwMCk7XG5cbiAgICAgICAgbGV0IHVzZXJOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdXNlck5hbWUuY2xhc3NOYW1lID0gXCJ1c2VyLW5hbWVcIjtcbiAgICAgICAgdXNlck5hbWUuaW5uZXJIVE1MID0gdXNlci51c2VybmFtZTtcblxuICAgICAgICB1c2VyRW50cnkuYXBwZW5kQ2hpbGQodXNlckltYWdlKTtcbiAgICAgICAgdXNlckVudHJ5LmFwcGVuZENoaWxkKHVzZXJOYW1lKTtcblxuICAgICAgICB1c2VybGlzdC5hcHBlbmRDaGlsZCh1c2VyRW50cnkpO1xuICAgIH1cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJsaXN0XCIpLmlubmVySFRNTCA9IHVzZXJsaXN0LmlubmVySFRNTDtcbn1cblxuZnVuY3Rpb24gY29uZGl0aW9uYWxNZXNzYWdlU2Nyb2xsKG9sZFNjcm9sbEhlaWdodCkge1xuICAgIGxldCBtZXNzYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZXNcIik7XG4gICAgaWYgKG9sZFNjcm9sbEhlaWdodCA9PT0gbWVzc2FnZXMuc2Nyb2xsVG9wICsgbWVzc2FnZXMuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIC8vIG9ubHkgc2Nyb2xsIGlmIHNjcm9sbGVkIHRvIGJvdHRvbSBiZWZvcmVcbiAgICAgICAgbWVzc2FnZXMuc2Nyb2xsVG9wID0gbWVzc2FnZXMuc2Nyb2xsSGVpZ2h0O1xuICAgIH1cbn1cblxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gICAgd3MgPSBuZXcgV2ViU29ja2V0KCgod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiKSA/IFwid3NzOi8vXCIgOiBcIndzOi8vXCIpICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyBcIi93c1wiKTtcblxuICAgIHdzLm9ub3BlbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsb2coXCJDb25uZWN0ZWQgdG8gY2hhdHJvb21cIik7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0LWljb25cIikuc3R5bGUuY29sb3IgPSBcIiM1MDkxM0ZcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRcIikuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgfTtcblxuICAgIHdzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbG9nKFwiRGlzY29ubmVjdGVkIGZyb20gY2hhdHJvb21cIik7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0LWljb25cIikuc3R5bGUuY29sb3IgPSBcImRhcmtncmV5XCI7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0XCIpLnN0eWxlLmN1cnNvciA9IFwibm90LWFsbG93ZWRcIjtcbiAgICAgICAgd3MgPSBudWxsO1xuICAgIH07XG5cbiAgICB3cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgLy9sb2coXCJSRVNQT05TRTogXCIgKyBldnQuZGF0YSk7XG5cbiAgICAgICAgbGV0IG1zZyA9IEpTT04ucGFyc2UoZXZ0LmRhdGEpO1xuICAgICAgICBzd2l0Y2ggKG1zZy5hY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJpbml0XCI6IHtcbiAgICAgICAgICAgICAgICAvLyBmaWxsIHVzZXIgZGF0YVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWVcIikudmFsdWUgPSBtc2cudXNlci51c2VybmFtZTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJpY29uXCIpLmlubmVySFRNTCA9IHRvU3ZnKG1zZy51c2VyLnVzZXJpZCwgMTAwKTtcbiAgICAgICAgICAgICAgICBpbml0VXNlcmxpc3QobXNnLmNvbm5lY3RlZCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiYnJvYWRjYXN0XCI6IHtcbiAgICAgICAgICAgICAgICBsZXQgbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbS5jbGFzc05hbWUgPSBcIm1lc3NhZ2VcIjtcblxuICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB0ZXh0LmNsYXNzTmFtZSA9IFwibWVzc2FnZS10ZXh0XCI7XG4gICAgICAgICAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGAke21zZy5zZW5kZXIudXNlcm5hbWV9OiAke21zZy50ZXh0fWA7XG5cbiAgICAgICAgICAgICAgICBsZXQgaWRlbnRpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBpZGVudGljb24uY2xhc3NOYW1lID0gXCJtZXNzYWdlLWltYWdlXCI7XG4gICAgICAgICAgICAgICAgaWRlbnRpY29uLmlubmVySFRNTCA9IHRvU3ZnKG1zZy5zZW5kZXIudXNlcmlkLCAxMDApO1xuXG4gICAgICAgICAgICAgICAgbS5hcHBlbmRDaGlsZChpZGVudGljb24pO1xuICAgICAgICAgICAgICAgIG0uYXBwZW5kQ2hpbGQodGV4dCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2VzXCIpO1xuICAgICAgICAgICAgICAgIGxldCBvbGRTY3JvbGxIZWlnaHQgPSBtZXNzYWdlcy5zY3JvbGxIZWlnaHQ7XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMuYXBwZW5kQ2hpbGQobSk7XG4gICAgICAgICAgICAgICAgY29uZGl0aW9uYWxNZXNzYWdlU2Nyb2xsKG9sZFNjcm9sbEhlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAvL2xvZyhgJHttc2cuc2VuZGVyLnVzZXJuYW1lfTogJHttc2cudGV4dH1gKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJzeXN0ZW1Ccm9hZGNhc3RcIjoge1xuICAgICAgICAgICAgICAgIGxvZyhgJHttc2cudGV4dH1gKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJuZXdVc2VyXCI6IHtcbiAgICAgICAgICAgICAgICBsZXQgdXNlckVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICB1c2VyRW50cnkuY2xhc3NOYW1lID0gXCJ1c2VyLWNvbm5lY3RlZFwiO1xuICAgICAgICAgICAgICAgIHVzZXJFbnRyeS5kYXRhc2V0LnVzZXJpZCA9IG1zZy5zZW5kZXIudXNlcmlkO1xuXG4gICAgICAgICAgICAgICAgbGV0IHVzZXJJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdXNlckltYWdlLmNsYXNzTmFtZSA9IFwidXNlci1pbWFnZVwiO1xuICAgICAgICAgICAgICAgIHVzZXJJbWFnZS5pbm5lckhUTUwgPSB0b1N2Zyhtc2cuc2VuZGVyLnVzZXJpZCwgMTAwKTtcblxuICAgICAgICAgICAgICAgIGxldCB1c2VyTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgdXNlck5hbWUuY2xhc3NOYW1lID0gXCJ1c2VyLW5hbWVcIjtcbiAgICAgICAgICAgICAgICB1c2VyTmFtZS5pbm5lckhUTUwgPSBtc2cuc2VuZGVyLnVzZXJuYW1lO1xuXG4gICAgICAgICAgICAgICAgdXNlckVudHJ5LmFwcGVuZENoaWxkKHVzZXJJbWFnZSk7XG4gICAgICAgICAgICAgICAgdXNlckVudHJ5LmFwcGVuZENoaWxkKHVzZXJOYW1lKTtcblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcmxpc3RcIikuYXBwZW5kQ2hpbGQodXNlckVudHJ5KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJyZW1vdmVVc2VyXCI6IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAudXNlci1jb25uZWN0ZWRbZGF0YS11c2VyaWQ9JyR7bXNnLnNlbmRlci51c2VyaWR9J11gKVswXS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJ1c2VybmFtZUNoYW5nZVwiOiB7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXJuYW1lRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC51c2VyLWNvbm5lY3RlZFtkYXRhLXVzZXJpZD0nJHttc2cuc2VuZGVyLnVzZXJpZH0nXWApWzBdLmNoaWxkcmVuWzFdO1xuICAgICAgICAgICAgICAgIGxvZyhgVXNlciAke3VzZXJuYW1lRWxlbS50ZXh0Q29udGVudH0gY2hhbmdlZCBuYW1lIHRvICR7bXNnLnNlbmRlci51c2VybmFtZX1gKTtcbiAgICAgICAgICAgICAgICB1c2VybmFtZUVsZW0udGV4dENvbnRlbnQgPSBtc2cuc2VuZGVyLnVzZXJuYW1lO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5oYW5kbGVkIG1lc3NhZ2UgYWN0aW9uOlwiLCBtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICB3cy5vbmVycm9yID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIGxvZyhcIkVSUk9SOiBcIiArIGV2dC5kYXRhKTtcbiAgICB9O1xuXG59LCBmYWxzZSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lc3NhZ2UtZW50cnlcIik7XG5cbiAgICBpZiAoIXdzIHx8IGlucHV0LnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IG1zZyA9IHtcbiAgICAgICAgLy9icm9hZGNhc3Qgb25seSBmb3Igbm93XG4gICAgICAgIGFjdGlvbjogXCJicm9hZGNhc3RcIixcbiAgICAgICAgdGV4dDogaW5wdXQudmFsdWUudHJpbSgpLFxuICAgIH07XG5cbiAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KG1zZykpO1xuICAgIGlucHV0LnZhbHVlID0gXCJcIjtcbiAgICByZXR1cm4gZmFsc2U7XG59LCBmYWxzZSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWVzc2FnZS1lbnRyeVwiKS5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRW50ZXJcIiAmJiBldnQuc2hpZnRLZXkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRcIikuY2xpY2soKTtcbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn0sIGZhbHNlKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VybmFtZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNvdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VybmFtZVwiKTtcbiAgICBpZiAodXNlcm5hbWUgIT09IGlucHV0LnZhbHVlKSB7XG4gICAgICAgIHVzZXJuYW1lID0gaW5wdXQudmFsdWU7XG4gICAgICAgIGxldCB1c2VybmFtZUNoYW5nZWQgPSB7XG4gICAgICAgICAgICBhY3Rpb246IFwidXNlcm5hbWVDaGFuZ2VcIixcbiAgICAgICAgICAgIHVzZXJuYW1lOiBpbnB1dC52YWx1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgd3Muc2VuZChKU09OLnN0cmluZ2lmeSh1c2VybmFtZUNoYW5nZWQpKTtcbiAgICB9XG59LCBmYWxzZSk7Il0sInNvdXJjZVJvb3QiOiIifQ==