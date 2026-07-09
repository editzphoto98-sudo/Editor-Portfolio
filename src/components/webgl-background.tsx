"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported in this browser.");
      return;
    }

    // Vertex Shader Source
    const vsSource = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Fragment Shader Source
    const fsSource = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
      uniform float isDark;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.005 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.005 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.005 / abs(p.y + sin((bx + time) * xScale) * yScale);
        
        vec4 darkColor = vec4(r, g, b, 1.0);
        
        // Light mode background is soft slate and wave is deep blue-purple
        vec3 lightBg = vec3(0.97, 0.98, 0.99); // #f8fafc
        float lr = clamp(1.0 - r * 0.8, 0.0, 1.0);
        float lg = clamp(1.0 - g * 0.8, 0.0, 1.0);
        float lb = clamp(1.0 - b * 0.8, 0.0, 1.0);
        vec3 lightLineColor = vec3(lr, lg, lb);
        vec3 lightFinal = mix(lightLineColor, lightBg, 0.85);
        vec4 lightColor = vec4(lightFinal, 1.0);
        
        gl_FragColor = mix(lightColor, darkColor, isDark);
      }
    `;

    // Helper: Compile Shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    // Link Program
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry (2 triangles covering full screen)
    const vertices = new Float32Array([
      -1, -1, 0,
       1, -1, 0,
      -1,  1, 0,
      -1,  1, 0,
       1, -1, 0,
       1,  1, 0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    // Get Uniform Locations
    const resLoc = gl.getUniformLocation(program, "resolution");
    const timeLoc = gl.getUniformLocation(program, "time");
    const xScaleLoc = gl.getUniformLocation(program, "xScale");
    const yScaleLoc = gl.getUniformLocation(program, "yScale");
    const distLoc = gl.getUniformLocation(program, "distortion");
    const isDarkLoc = gl.getUniformLocation(program, "isDark");

    // Set stable uniform properties
    gl.uniform1f(xScaleLoc, 1.0);
    gl.uniform1f(yScaleLoc, 0.5);
    gl.uniform1f(distLoc, 0.05);

    let animationId: number;
    let timeVal = 0.0;

    // Resize Handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(resLoc, width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    // Loop
    const render = () => {
      timeVal += 0.015; // smooth speed simulation
      gl.uniform1f(timeLoc, timeVal);
      
      const isDark = resolvedTheme === "dark" ? 1.0 : 0.0;
      gl.uniform1f(isDarkLoc, isDark);

      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return <div className="fixed inset-0 bg-[#020817] z-0" />;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full pointer-events-none opacity-50"
    />
  );
}
