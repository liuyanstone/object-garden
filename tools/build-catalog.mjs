import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {originalSVG} from './original-art.mjs';
const root=new URL('../',import.meta.url),items=JSON.parse(await readFile(new URL('./common-items.json',import.meta.url)));
const revision='aeb8bb3a59e2de39c754ac79180c8131c906acea';
const cache=process.argv[2]?new URL('file://'+process.argv[2].replace(/\/$/,'')+'/'):new URL('./source-cache/',import.meta.url);
await mkdir(new URL('assets/morandi/',root),{recursive:true});await mkdir(cache,{recursive:true});
export const PALETTE=['#59645e','#77817c','#a9aea5','#d2d6ca','#f1ebdf','#fbf6ec','#c49b9b','#dcc0bb','#c49a80','#a98773','#c5b380','#9eae96','#7f977f','#9db1b8','#829ba9','#b0a1b8','#b4a491'];
function color(hex){hex=hex.toLowerCase();if(hex.length===4)hex='#'+[...hex.slice(1)].map(c=>c+c).join('');const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255,max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;
 if(max<.22)return '#59645e';if(d<.12){if(max>.95)return '#fbf6ec';if(max>.8)return '#d2d6ca';if(max>.59)return '#a9aea5';return '#77817c';}
 // Keep warm brown fur and wood warm; map saturated colors by hue family.
 let hue=d===0?0:max===r?((g-b)/d)%6:max===g?(b-r)/d+2:(r-g)/d+4;hue=(hue*60+360)%360;
 if(hue<18||hue>=340)return max>.91&&min>.45?'#dcc0bb':'#c49b9b';
 if(hue<47)return max<.7?'#a98773':'#c49a80';if(hue<75)return '#c5b380';
 if(hue<170)return max<.62?'#7f977f':'#9eae96';if(hue<220)return '#9db1b8';if(hue<270)return '#829ba9';if(hue<320)return '#b0a1b8';return '#c49b9b';
}
const catalog=[],credits=[];
for(const o of items){let svg,source,license,sourceHash;
 if(o.hexcode){source=`https://raw.githubusercontent.com/hfg-gmuend/openmoji/${revision}/color/svg/${o.hexcode}.svg`;let original;try{original=await readFile(new URL(o.hexcode+'.svg',cache),'utf8');}catch{const response=await fetch(source);if(!response.ok)throw Error(source);original=await response.text();await writeFile(new URL(o.hexcode+'.svg',cache),original);}
 sourceHash=createHash('sha256').update(original).digest('hex');
 svg=original.replace(/<\?xml[^>]*>/g,'').replace(/<!--[\s\S]*?-->/g,'').replace(/viewBox="[^"]*"/,'viewBox="0 0 72 72"').replace(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g,color).replace(/stroke-width="[^"]*"/g,'stroke-width="2"');
 license='CC BY-SA 4.0';
 }else{svg=originalSVG(o.id);source='tools/original-art.mjs#'+o.id;license='Original artwork created for Object Garden';}
 if(/<script|foreignObject|<image|onload=|onerror=|href=/i.test(svg))throw Error('Unexpected active SVG '+o.id);
 const used=[...svg.matchAll(/#[0-9a-fA-F]{6}\b/g)].map(m=>m[0].toLowerCase());if(used.some(c=>!PALETTE.includes(c)))throw Error('Non-palette color '+o.id);
 const src='assets/morandi/'+o.id+'.svg';await writeFile(new URL(src,root),svg+'\n');
 catalog.push({id:o.id,en:o.en,zh:o.zh,category:o.category,src});credits.push({...o,src,source,license,sourceHash:sourceHash||null,sha256:createHash('sha256').update(svg+'\n').digest('hex'),adaptation:'Unified low-saturation Morandi palette, rounded 2-unit outlines, 72-unit canvas. Simplified object labels reviewed for this game.'});
}
await writeFile(new URL('catalog-common.mjs',root),'// Curated familiar objects. Artwork is local; see credits.html.\nexport const COMMON_OBJECTS='+JSON.stringify(catalog,null,2)+';\n');
await writeFile(new URL('asset-credits.json',root),JSON.stringify(credits,null,2)+'\n');
await writeFile(new URL('palette.json',root),JSON.stringify(PALETTE,null,2)+'\n');
execFileSync('python3',[fileURLToPath(new URL('./fit-art.py',import.meta.url)),fileURLToPath(root)],{stdio:'inherit'});
console.log(`Built ${catalog.length} consistent illustrations (${catalog.length-items.filter(o=>!o.hexcode).length} OpenMoji adaptations + ${items.filter(o=>!o.hexcode).length} original).`);
