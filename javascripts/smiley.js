/*
The MIT License (MIT)

Copyright (c) 2013 Adam Wentz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function(module) {
    
function Smiley(element, initial_value) {
    this.element = element;
    this.value = typeof initial_value === 'undefined' ? 0.5 : initial_value;
}

Smiley.prototype.render = function() {
    var face = ':(';
    var value = this.value;
    if (value >= 0.75) {
        face = ':)';
    } else if (value >= 0.5) {
        face = ':|';
    } else if (value >= 0.25) {
        face = ':\\';
    }
    this.element.innerText = face;
}

function CanvasSmiley(element, initial_value) {
    Smiley.call(this, element, initial_value);
    this.canvas = element;
}

CanvasSmiley.prototype = new Smiley();

CanvasSmiley.prototype.render = function() {
    var canvas = this.element;
    var half_width = canvas.width * 0.5;
    var half_height = canvas.height * 0.5;
    var thickness = half_width * 0.08; // parameterize?
    var radius = half_width - thickness;
    var context = canvas.getContext('2d');
    // render head
    context.beginPath();
    context.arc(half_width, half_height, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = thickness;
    context.stroke();
    // draw the rest
    this._draw_eye(context, half_width * 0.666, half_height * 0.666, thickness);
    this._draw_eye(context, half_width * 1.333, half_height * 0.666, thickness);
    this._draw_mouth(
        context, half_width, half_height * 1.333, half_height, thickness * 7); 
}

CanvasSmiley.prototype._draw_eye = function(context, x, y, r) {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
}

CanvasSmiley.prototype._draw_mouth = function(
        context, half_width, half_height, smile_width, smile_height) {
    var half_smile_width = 0.5 * smile_width;
    var half_smile_height = 0.5 * smile_height;
    var corner_y = half_height + (0.5 - this.value) * smile_height;
    context.beginPath();
    context.moveTo(half_width - half_smile_width, corner_y);
    context.quadraticCurveTo(
        half_width, half_height + smile_height * (this.value - 0.5),
        half_width + smile_width * 0.5, corner_y);
    context.stroke();
}

module.Smiley = Smiley;
module.CanvasSmiley = CanvasSmiley;

})(window);
