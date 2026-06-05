/* ============================================================
   HushBook landing — WebGL neon sine-wave shader (finale backdrop)
   Ported from a React + three.js component to RAW WebGL (no three.js
   dependency) so it runs in this static site. Warm-tinted chromatic
   sine glow behind the final CTA. Honors prefers-reduced-motion;
   pauses when the section is off-screen.
   ============================================================ */
(function () {
  "use strict";

  var canvas = document.getElementById("finale-gl");
  if (!canvas) return;
  var section = canvas.closest(".finale") || canvas.parentElement;
  var glOpts = { preserveDrawingBuffer: true, antialias: true, alpha: false };
  var gl = canvas.getContext("webgl", glOpts) || canvas.getContext("experimental-webgl", glOpts);
  if (!gl) { canvas.style.display = "none"; return; }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var VSRC = "attribute vec3 position; void main(){ gl_Position = vec4(position,1.0); }";
  var FSRC = [
    "precision highp float;",
    "uniform vec2 resolution;",
    "uniform float time;",
    "uniform float xScale;",
    "uniform float yScale;",
    "uniform float distortion;",
    "uniform vec3 tint;",
    "void main(){",
    "  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);",
    "  float d = length(p) * distortion;",
    "  float rx = p.x * (1.0 + d);",
    "  float gx = p.x;",
    "  float bx = p.x * (1.0 - d);",
    "  float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);",
    "  float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);",
    "  float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);",
    "  gl_FragColor = vec4(r * tint.r, g * tint.g, b * tint.b, 1.0);",
    "}"
  ].join("\n");

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn("HushBook gl:", gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  var vs = compile(gl.VERTEX_SHADER, VSRC), fs = compile(gl.FRAGMENT_SHADER, FSRC);
  if (!vs || !fs) { canvas.style.display = "none"; return; }
  var prog = gl.createProgram();
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.style.display = "none"; return; }
  gl.useProgram(prog);

  // full-screen quad (two triangles)
  var verts = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0]);
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
  var posLoc = gl.getAttribLocation(prog, "position");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);

  var U = {
    resolution: gl.getUniformLocation(prog, "resolution"),
    time: gl.getUniformLocation(prog, "time"),
    xScale: gl.getUniformLocation(prog, "xScale"),
    yScale: gl.getUniformLocation(prog, "yScale"),
    distortion: gl.getUniformLocation(prog, "distortion"),
    tint: gl.getUniformLocation(prog, "tint")
  };
  gl.uniform1f(U.xScale, 1.0);
  gl.uniform1f(U.yScale, 0.5);
  gl.uniform1f(U.distortion, 0.06);
  gl.uniform3f(U.tint, 1.0, 0.82, 0.6); // warm copper, on-brand

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var t = 0, raf = 0;

  function resize() {
    var w = section.offsetWidth, h = section.offsetHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(U.resolution, canvas.width, canvas.height);
  }
  function frame() {
    t += 0.01;
    gl.uniform1f(U.time, t);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    raf = requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();

  if (reduce) { gl.uniform1f(U.time, 1.5); gl.drawArrays(gl.TRIANGLES, 0, 6); return; }
  raf = requestAnimationFrame(frame);

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { if (!raf) raf = requestAnimationFrame(frame); }
        else if (raf) { cancelAnimationFrame(raf); raf = 0; }
      });
    }, { threshold: 0.02 }).observe(section);
  }
})();
