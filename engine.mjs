import{OBJECTS}from './objects.mjs?v=review-5';
export const DURATION=90000,POINTS=100,SIZE=150;
export function localDay(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function shuffled(a,random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function createRound(random=Math.random){
 const board=shuffled(OBJECTS.map(o=>o.id),random).slice(0,SIZE),order=shuffled(board,random);
 return{version:4,layoutSeed:Math.floor(random()*4294967296),phase:'ready',day:localDay(),board,order,target:order[0],elapsed:0,found:0,wrong:0};
}
export function start(s){return s.phase==='ready'||s.phase==='paused'?{...s,phase:'playing'}:s;}
export function tick(s,ms){if(s.phase!=='playing'||!Number.isFinite(ms)||ms<0)return s;const elapsed=Math.min(DURATION,s.elapsed+ms);return{...s,elapsed,phase:elapsed===DURATION?'finished':'playing'};}
export function pause(s){return s.phase==='playing'?{...s,phase:'paused'}:s;}
export function choose(s,id){
 if(s.phase!=='playing'||!s.board.includes(id))return s;
 if(id!==s.target)return{...s,wrong:s.wrong+1};
 const found=s.found+1;
 return{...s,found,target:s.order[found]??null,phase:found===SIZE?'finished':'playing'};
}
export function score(s){return s.found*POINTS;}
export function restore(raw){
 if(!raw||![3,4].includes(raw.version)||!['ready','playing','paused'].includes(raw.phase)||!/^\d{4}-\d{2}-\d{2}$/.test(raw.day)||!Number.isInteger(raw.layoutSeed)||raw.layoutSeed<0||raw.layoutSeed>4294967295||!Array.isArray(raw.board)||raw.board.length!==SIZE||new Set(raw.board).size!==SIZE||raw.board.some(id=>!OBJECTS.some(o=>o.id===id))||!Array.isArray(raw.order)||raw.order.length!==SIZE||new Set(raw.order).size!==SIZE||raw.order.some(id=>!raw.board.includes(id))||!Number.isFinite(raw.elapsed)||raw.elapsed<0||raw.elapsed>=DURATION||!Number.isSafeInteger(raw.found)||raw.found<0||raw.found>=SIZE||raw.target!==raw.order[raw.found]||!Number.isSafeInteger(raw.wrong)||raw.wrong<0||(raw.phase==='ready'&&(raw.found!==0||raw.elapsed!==0||raw.wrong!==0)))return null;
 return{version:4,layoutSeed:raw.layoutSeed,phase:raw.phase==='playing'?'paused':raw.phase,day:raw.day,board:raw.board,order:raw.order,target:raw.target,elapsed:raw.elapsed,found:raw.found,wrong:raw.wrong};
}
export function saveResult(records,s){if(s.phase!=='finished'||(s.elapsed!==DURATION&&s.found!==SIZE))return records;return{...records,[s.day]:Math.max(records[s.day]||0,score(s))};}
export function restoreRecords(raw){return Object.fromEntries(Object.entries(raw||{}).filter(([d,v])=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isSafeInteger(v)&&v>=0&&v%POINTS===0));}

export function answerAtEnd(s){return s.phase==='finished'?(s.target??s.order[s.order.length-1]):null;}
