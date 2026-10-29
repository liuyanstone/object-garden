import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import{OBJECTS,BY_ID,picture}from './objects.mjs';
import{DURATION,SIZE,createRound,start,tick,pause,choose,score,restore,saveResult,restoreRecords,localDay,answerAtEnd}from './engine.mjs';
import{en,zh}from './i18n.mjs';
import{scatter}from './scatter.mjs';
let seed=123;const random=()=>((seed=Math.imul(seed,1664525)+1013904223>>>0)/2**32);
assert.equal(OBJECTS.length,1000);for(const key of ['id','en','zh'])assert.equal(new Set(OBJECTS.map(o=>o[key])).size,1000,'Every catalog object has a distinct identity/name');assert.equal(new Set(OBJECTS.map(o=>o.src||o.art)).size,1000);
for(const o of OBJECTS){assert(o.en&&o.zh&&(o.art||o.src));assert(picture(o.id).includes(o.src?'src="'+o.src+'"':'viewBox="0 0 100 100"'));if(o.src)assert(existsSync(new URL(o.src,import.meta.url)));}
const sampled=new Set();for(let i=0;i<500;i++){let s=createRound(random);for(const id of s.board)sampled.add(id);assert.equal(s.board.length,SIZE);assert.equal(new Set(s.board).size,SIZE);assert(s.board.includes(s.target));assert.equal(choose(s,s.target),s);s=start(s);const old=s.target,wrong=s.board.find(id=>id!==old),miss=choose(s,wrong,random);assert.equal(miss.target,old);assert.equal(miss.found,0);assert.equal(miss.wrong,1);assert.equal(score(miss),0);const hit=choose(miss,old,random);assert.equal(hit.found,1);assert.equal(score(hit),100);assert.notEqual(hit.target,old);assert(hit.board.includes(hit.target));assert.deepEqual(hit.board,s.board);assert.equal(hit.elapsed,s.elapsed);const frozen=pause(tick(hit,18000));assert.equal(tick(frozen,10000),frozen);assert.equal(choose(frozen,frozen.target),frozen);const restored=restore(JSON.parse(JSON.stringify({...frozen,phase:'playing'})));assert.equal(restored.phase,'paused');assert.equal(restored.elapsed,18000);const end=tick(start(frozen),DURATION);assert.equal(end.phase,'finished');assert.equal(end.elapsed,DURATION);assert.equal(choose(end,end.target),end);assert.equal(tick(end,100),end);let records=saveResult({},end);assert.equal(records[end.day],100);assert.equal(saveResult(records,{...end,found:0})[end.day],100);assert.equal(saveResult(records,{...end,found:7})[end.day],700);assert.equal(saveResult(records,hit),records);}
const s=start(createRound(random));let chunks=s;for(let i=0;i<5400;i++)chunks=tick(chunks,1000/60);assert(Math.abs(chunks.elapsed-DURATION)<1e-5);assert.equal(tick(s,DURATION).phase,'finished');assert.equal(restore({...s,board:Array(SIZE).fill('apple')}),null);assert.equal(restore({...s,target:'missing'}),null);assert.equal(restore({...s,elapsed:-1}),null);assert.equal(restore({...s,found:NaN}),null);assert.equal(restore({...s,phase:'finished'}),null);assert.deepEqual(restoreRecords({'2026-10-28':300,'bad':500,'2026-10-27':-2,'2026-10-26':123}),{'2026-10-28':300});assert.equal(localDay(new Date(2026,9,28,23,59)),'2026-10-28');assert.deepEqual(Object.keys(en).sort(),Object.keys(zh).sort());for(const k of Object.keys(en))assert.deepEqual([...en[k].matchAll(/\{(\w+)\}/g)].map(m=>m[1]),[...zh[k].matchAll(/\{(\w+)\}/g)].map(m=>m[1]));
console.log('PASS: 500 random collections; 150 different objects; every target present; wrong taps retain target; correct taps score and advance; stable positions; pause/resume; exact 90-second finish; no scoring after expiry; daily highest scores; checkpoint validation; local dates; English/Chinese parity.');

assert.equal(DURATION,90000);assert.equal(SIZE,150);
for(const id of s.board)assert.equal(s.board.filter(value=>value===id).length,1);
for(const width of [270,320,343,480,760,840,1100])for(let seed=0;seed<8;seed++){
 const layout=scatter(width,SIZE,seed);assert.equal(layout.items.length,150);
 assert.deepEqual(scatter(width,SIZE,seed),layout,'Pause/reload use the same placements at the same width');
 for(let i=0;i<layout.items.length;i++){
  const a=layout.items[i];assert(a.x-a.r>=0&&a.y-a.r>=0&&a.x+a.r<=width&&a.y+a.r<=layout.height);
  assert(a.r*2>=46,'Objects retain a usable physical tap size');
  for(const b of layout.items.slice(i+1))assert(Math.hypot(a.x-b.x,a.y-b.y)>=a.r+b.r+4-1e-9,'Visible objects and circular hit areas never overlap');
 }
 assert(new Set(layout.items.map(p=>Math.round(p.x))).size>70,'Positions are not aligned in columns');
 assert(new Set(layout.items.map(p=>Math.round(p.y))).size>80,'Positions are not aligned in rows');
}
assert.equal(restore({...s,version:1}),null,'Old 24-tile rounds restart, completed records are retained');
assert.equal(restore({...s,layoutSeed:NaN}),null);
console.log('PASS: 56 desktop/mobile scatter layouts; deterministic restoration; 150 different objects with no overlapping art/hit regions; irregular positions, sizes and rotations; 90-second rounds; old active-round migration.');

for(let run=0;run<40;run++){
 let all=start(createRound(random));const requested=[];
 for(let i=0;i<SIZE;i++){
  assert.equal(all.phase,'playing');assert(!requested.includes(all.target));requested.push(all.target);
  if(i===75){const saved=JSON.parse(JSON.stringify(all));all=start(restore(saved));assert.deepEqual(all.order,saved.order);assert.equal(all.target,saved.target);}
  const wrong=all.board.find(id=>id!==all.target),miss=choose(all,wrong);assert.equal(miss.target,all.target);assert.deepEqual(miss.order,all.order);
  all=choose(miss,all.target);
 }
 assert.equal(new Set(requested).size,150);assert.equal(all.found,150);assert.equal(all.phase,'finished');assert.equal(all.target,null);assert.equal(score(all),15000);assert.equal(choose(all,all.board[0]),all);assert.equal(saveResult({},all)[all.day],15000);
}
const badOrder=[...s.order];badOrder[0]=badOrder[1];assert.equal(restore({...s,order:badOrder}),null);assert.equal(restore({...s,target:s.order[1]}),null);assert.equal(restore({...s,version:2}),null);assert(restore({...s,version:3}),'Existing no-repeat rounds retain progress after catalog expansion');assert.equal(restore({...s,found:150}),null);
console.log('PASS: 40 entire 150-target sequences with no repeated objects or targets, including checkpoint restoration; wrong answers do not advance the sequence; all-found rounds finish immediately and save 15,000 points.');

assert.equal(sampled.size,1000,'Every catalog object participates in random sampling');
const credits=JSON.parse(readFileSync(new URL('./asset-credits.json',import.meta.url)));assert.equal(credits.length,831);
for(const asset of credits){const bytes=readFileSync(new URL(asset.src,import.meta.url));assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);assert(!/<script|foreignObject|<image|onload=|onerror=/i.test(bytes.toString()),'Artwork is inert local SVG');}
let review=start(createRound(random));assert.equal(answerAtEnd(review),null);for(let i=0;i<5;i++)review=choose(review,review.target);const unresolved=review.target;review=tick(review,DURATION);assert.equal(answerAtEnd(review),unresolved,'Timeout review reveals the unfinished target');
let perfectReview=start(createRound(random));const lastRequested=perfectReview.order[149];while(perfectReview.phase==='playing')perfectReview=choose(perfectReview,perfectReview.target);assert.equal(answerAtEnd(perfectReview),lastRequested,'Perfect-round review shows the final found object');assert.equal(OBJECTS.some(o=>o.id===answerAtEnd(perfectReview)),true);
console.log('PASS: exactly 1,000 distinct catalog items; 500 random rounds cover the full catalog; all 831 local image files match source hashes; timeout/perfect review identifies the right final object; old no-repeat checkpoints preserved.');
