import{OBJECTS}from './objects.mjs';
export const DURATION=90000,POINTS=100,SIZE=120;
export function localDay(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function shuffled(a,random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function nextTarget(s,random){const pool=s.board.filter(id=>id!==s.target);return pool[Math.floor(random()*pool.length)];}
export function createRound(random=Math.random){const board=shuffled(Array.from({length:SIZE},(_,i)=>OBJECTS[i%OBJECTS.length].id),random);return{version:2,layoutSeed:Math.floor(random()*4294967296),phase:'ready',day:localDay(),board,target:board[Math.floor(random()*SIZE)],elapsed:0,found:0,wrong:0};}
export function start(s){return s.phase==='ready'||s.phase==='paused'?{...s,phase:'playing'}:s;}
export function tick(s,ms){if(s.phase!=='playing'||!Number.isFinite(ms)||ms<0)return s;const elapsed=Math.min(DURATION,s.elapsed+ms);return{...s,elapsed,phase:elapsed===DURATION?'finished':'playing'};}
export function pause(s){return s.phase==='playing'?{...s,phase:'paused'}:s;}
export function choose(s,id,random=Math.random){if(s.phase!=='playing'||!s.board.includes(id))return s;if(id!==s.target)return{...s,wrong:s.wrong+1};return{...s,found:s.found+1,target:nextTarget(s,random)};}
export function score(s){return s.found*POINTS;}
export function restore(raw){if(!raw||raw.version!==2||!['ready','playing','paused'].includes(raw.phase)||!/^\d{4}-\d{2}-\d{2}$/.test(raw.day)||!Number.isInteger(raw.layoutSeed)||raw.layoutSeed<0||raw.layoutSeed>4294967295||!Array.isArray(raw.board)||raw.board.length!==SIZE||new Set(raw.board).size!==OBJECTS.length||raw.board.some(id=>!OBJECTS.some(o=>o.id===id))||!raw.board.includes(raw.target)||!Number.isFinite(raw.elapsed)||raw.elapsed<0||raw.elapsed>=DURATION||!Number.isSafeInteger(raw.found)||raw.found<0||!Number.isSafeInteger(raw.wrong)||raw.wrong<0)return null;return{version:2,layoutSeed:raw.layoutSeed,phase:raw.phase==='playing'?'paused':raw.phase,day:raw.day,board:raw.board,target:raw.target,elapsed:raw.elapsed,found:raw.found,wrong:raw.wrong};}
export function saveResult(records,s){if(s.phase!=='finished'||s.elapsed!==DURATION)return records;const previous=records[s.day];return{...records,[s.day]:Math.max(previous||0,score(s))};}
export function restoreRecords(raw){return Object.fromEntries(Object.entries(raw||{}).filter(([d,v])=>/^\d{4}-\d{2}-\d{2}$/.test(d)&&Number.isSafeInteger(v)&&v>=0&&v%POINTS===0));}
