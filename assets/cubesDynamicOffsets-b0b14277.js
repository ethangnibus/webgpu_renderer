import"./modulepreload-polyfill-3cfb730f.js";import{b as y}from"./basic.vert-ae845a6f.js";import{p as P}from"./position.frag-8baafb48.js";import{v as m,a as g}from"./cube-91a5abf9.js";import{b as w}from"./math-7b9ebb83.js";import"./mat4-5036aab8.js";async function B(e){if(!navigator.gpu)throw new Error("Not Support WebGPU");const o=await navigator.gpu.requestAdapter();if(!o)throw new Error("No Adapter Found");const i=await o.requestDevice(),n=e.getContext("webgpu"),r=navigator.gpu.getPreferredCanvasFormat(),t=window.devicePixelRatio||1;e.width=e.clientWidth*t,e.height=e.clientHeight*t;const a={width:e.width,height:e.height};return n.configure({device:i,format:r,alphaMode:"opaque"}),{device:i,context:n,format:r,size:a}}async function b(e,o,i){const n=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:0}}]}),r=e.createPipelineLayout({bindGroupLayouts:[n]}),t=await e.createRenderPipelineAsync({label:"Basic Pipline",layout:r,vertex:{module:e.createShaderModule({code:y}),entryPoint:"main",buffers:[{arrayStride:5*4,attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:3*4,format:"float32x2"}]}]},fragment:{module:e.createShaderModule({code:P}),entryPoint:"main",targets:[{format:o}]},primitive:{topology:"triangle-list",cullMode:"back"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}}),a=e.createTexture({size:i,format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),f=a.createView(),s=e.createBuffer({label:"GPUBuffer store vertex",size:m.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});e.queue.writeBuffer(s,0,m);const u=e.createBuffer({label:"GPUBuffer store 2 4*4 matrix",size:256*2,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),d=e.createBindGroup({layout:n,entries:[{binding:0,resource:{buffer:u,size:4*16}}]});return{pipeline:t,vertexBuffer:s,mvpBuffer:u,group:d,depthTexture:a,depthView:f}}function T(e,o,i){const n=e.createCommandEncoder(),r={colorAttachments:[{view:o.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:i.depthView,depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}},t=n.beginRenderPass(r);t.setPipeline(i.pipeline),t.setVertexBuffer(0,i.vertexBuffer);const a=new Uint32Array([0,256]);t.setBindGroup(0,i.group,a,0,1),t.draw(g),t.setBindGroup(0,i.group,a,1,1),t.draw(g),t.end(),e.queue.submit([n.finish()])}async function U(){const e=document.querySelector("canvas");if(!e)throw new Error("No Canvas");const{device:o,context:i,format:n,size:r}=await B(e),t=await b(o,n,r);let a=r.width/r.height;const f={x:2,y:0,z:-8},s={x:0,y:0,z:0},u={x:1,y:1,z:1},d={x:-2,y:0,z:-8},p={x:0,y:0,z:0},x={x:1,y:1,z:1};function l(){const c=Date.now()/1e3;{s.x=Math.sin(c),s.y=Math.cos(c);const h=w(a,f,s,u);o.queue.writeBuffer(t.mvpBuffer,0,h)}{p.x=Math.cos(c),p.y=Math.sin(c);const h=w(a,d,p,x);o.queue.writeBuffer(t.mvpBuffer,256,h)}T(o,i,t),requestAnimationFrame(l)}l(),window.addEventListener("resize",()=>{r.width=e.width=e.clientWidth*devicePixelRatio,r.height=e.height=e.clientHeight*devicePixelRatio,t.depthTexture.destroy(),t.depthTexture=o.createTexture({size:r,format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),t.depthView=t.depthTexture.createView(),a=r.width/r.height})}U();
