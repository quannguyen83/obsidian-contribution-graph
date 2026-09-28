// DOM regression checks; does not replace visual checks inside Obsidian.
const { build } = require('esbuild');
const { JSDOM } = require('jsdom');
const assert = require('node:assert/strict');
(async () => {
 const dom = new JSDOM('<html><body></body></html>', {url:'https://heatmap.test',runScripts:'outside-only'});
 const w=dom.window;
 try {
 const compile = async (entry, name, plugins=[]) => {
  const result=await build({entryPoints:[entry],bundle:true,write:false,format:'iife',globalName:name,platform:'browser',plugins});
  w.eval(result.outputFiles[0].text);
 };
 await compile('src/render/sketchStyle.ts','sketch');
 let clicks=0;
 const drawings=[];
 for(const roughness of [0,1,2]) for(const fillStyle of ['solid','hachure','cross-hatch']) {
  const graph=w.document.createElement('div');graph.className='sketch-contribution-graph';
  graph.innerHTML='<div class="cell" data-date="2026-09-28" style="background-color:#63aa82">A</div><div class="cell empty" data-date="2026-09-27"></div><div class="cell hole"></div><div class="cell-rule-indicator-container"><div class="cell" style="background-color:#63aa82"></div><div class="cell text">more</div></div>';
  w.document.body.append(graph);graph.firstChild.onclick=()=>clicks++;
  const original=graph.innerHTML;w.sketch.decorateSketchGraph(graph);assert.equal(graph.innerHTML,original);
  w.sketch.decorateSketchGraph(graph,{enabled:true,fillStyle,roughness});
  const cell=graph.firstElementChild;
  const svg=cell.querySelector('svg');
  assert.equal(graph.querySelectorAll('svg').length,3);
  assert.equal(cell.textContent,'A');
  assert.equal(svg.getAttribute('preserveAspectRatio'),'none');
  assert.equal(svg.getAttribute('aria-hidden'),'true');
  drawings.push(svg.innerHTML);
  const clone=graph.cloneNode(true);
  for(const c of clone.querySelectorAll('.sketch-cell')){c.classList.remove('sketch-cell');c.querySelector('svg').remove()}
  w.sketch.decorateSketchGraph(clone,{enabled:true,fillStyle,roughness});
  assert.equal(clone.querySelector('svg').outerHTML,svg.outerHTML);
  w.sketch.decorateSketchGraph(graph,{enabled:true,fillStyle,roughness});
  assert.equal(graph.querySelectorAll('svg').length,3);
  svg.dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
 }
 assert.equal(clicks,9);
 assert.equal(new Set(drawings).size,9);
 // Rounded paths must preserve shared endpoints in every sloppiness mode.
 for(const roughness of [0,1,2]) {
  const rounded=w.sketch.sketchOptions({roughness},123,'#63aa82',true);
  assert.equal(rounded.preserveVertices,true);
  assert.equal(rounded.roughness,roughness/2);
 }
 assert.equal(w.sketch.sketchOptions({roughness:2},123,'#63aa82',false).preserveVertices,false);
 const invalid=w.sketch.sketchOptions({roughness:NaN,strokeWidth:-5,fillStyle:'invalid'},1);
 assert.equal(invalid.strokeWidth,0.5);assert.equal(invalid.fillStyle,'hachure');assert.ok(Number.isFinite(invalid.roughness));
 await compile('src/render/renders.ts','renders',[{name:'obsidian-test-shim',setup(b){b.onResolve({filter:/^obsidian$/},()=>({path:'obsidian',namespace:'shim'}));b.onLoad({filter:/.*/,namespace:'shim'},()=>({contents:'export { default as moment } from "moment";',resolveDir:process.cwd()}));}}]);
 w.createEl=(tag,opts={})=>{const el=w.document.createElement(tag);if(opts.cls)el.className=Array.isArray(opts.cls)?opts.cls.join(' '):opts.cls;if(opts.text)el.textContent=opts.text;if(opts.parent)opts.parent.append(el);return el};
 w.createDiv=(opts)=>w.createEl('div',opts);
 w.HTMLElement.prototype.empty=function(){this.replaceChildren()};
 for(const graphType of ['default','month-track','calendar']) {
  const root=w.document.createElement('div');w.document.body.append(root);
  w.renders.Renders.render(root,{graphType,fromDate:'2026-09-01',toDate:'2026-09-30',data:[{date:'2026-09-28',value:2}],sketchStyle:{enabled:true,fillStyle:'cross-hatch'}});
  assert.ok(root.querySelector('.cell[data-date="2026-09-28"] svg'),graphType);
  assert.equal(root.querySelectorAll('.cell[data-date]').length,30);
  assert.equal(root.querySelectorAll('.cell[data-date] svg').length,30);
  root.querySelector('.cell[data-date="2026-09-28"]').click();
  assert.ok(root.querySelector('.activity-summary'),graphType+' click');
 }
 console.log('PASS: all 3 layouts and fills; standard unchanged; labels; click bubbling; stable seeds; empty days; legend; placeholders; idempotence; malformed options');
 } finally {w.close()}
})().catch(e=>{console.error(e);process.exit(1)});
