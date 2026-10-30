import{BY_ID,picture,CATALOG_SIZE}from './objects.mjs?v=morandi-1';
import{scatter}from './scatter.mjs?v=morandi-1';
import{DURATION,SIZE,createRound,localDay,start,tick,pause,choose,score,restore,saveResult,restoreRecords,answerAtEnd}from './engine.mjs?v=morandi-1';
import{en,zh}from './i18n.mjs?v=morandi-1';
import{createGameAudio}from './audio.mjs';
const $=s=>document.querySelector(s),KEY='object-garden-v1',audio=createGameAudio('object-garden-sound');
let catalogUpdated=false;
let lang='en',records={},round=createRound(),storageOK=true;
try{lang=localStorage.getItem('object-garden-language')==='zh'?'zh':'en';const saved=JSON.parse(localStorage.getItem(KEY)||'null');records=restoreRecords(saved?.records);const resumed=restore(saved?.active);catalogUpdated=Boolean(saved?.active&&!resumed);round=resumed||round;}catch{storageOK=false;}
if(round.day!==localDay())round=createRound();
let last=performance.now(),lastSave=0,notice='notice',noticeObject='',helpWasPlaying=false,loadingPictures=false;
const text=(key,vars={})=>Object.entries(vars).reduce((s,[k,v])=>s.replaceAll(`{${k}}`,v),(lang==='zh'?zh:en)[key].replaceAll('{catalog}',CATALOG_SIZE));
const objectName=id=>BY_ID[id][lang];
const number=n=>n.toLocaleString(lang==='zh'?'zh-CN':'en');
function persist(){try{localStorage.setItem(KEY,JSON.stringify({records,active:round.phase==='finished'?null:round}));lastSave=performance.now();}catch{storageOK=false;}}
function sync(){const now=performance.now();round=tick(round,now-last);last=now;if(round.phase==='finished')finish();}
function finish(){records=saveResult(records,round);audio.success();notice='notice';persist();render();$('#game').scrollIntoView({block:'start',behavior:'instant'});$('#action').focus({preventScroll:true});markAnswer(true);}
function live(){const seconds=Math.ceil((DURATION-round.elapsed)/1000);$('#time').textContent=seconds;$('#found').textContent=number(round.found);$('#score').textContent=number(score(round));$('#timeBar').style.transform=`scaleX(${1-round.elapsed/DURATION})`;$('#timeTrack').classList.toggle('urgent',seconds<=10);$('#timeTrack').setAttribute('aria-valuenow',seconds);}
function target(){const hidden=round.phase!=='playing';$('#targetName').textContent=hidden?'—':objectName(round.target);$('#feedback').textContent=round.phase!=='playing'?text(round.phase==='paused'?'pausedBody':catalogUpdated?'catalogUpdated':'notice'):!storageOK?text('warningStorage'):notice==='notice'?text('notice'):text(notice,{object:objectName(noticeObject||round.target)});$('#feedback').classList.toggle('wrong',notice==='wrong');}
let placedWidth=0;
function placeObjects(){const width=Math.floor($('#board').clientWidth);if(!width)return;placedWidth=width;const layout=scatter(width,round.board.length,round.layoutSeed);$('#board').style.height=layout.height+'px';Array.from($('#board').querySelectorAll('button')).forEach((b,i)=>{const p=layout.items[i];b.style.left=(p.x-p.r)+'px';b.style.top=(p.y-p.r)+'px';b.style.width=b.style.height=(p.r*2)+'px';b.style.setProperty('--turn',p.rotation+'deg');});markAnswer();}
function markAnswer(scroll=false){
 $('#board').querySelector('.answer-ring')?.remove();
 const answer=answerAtEnd(round);if(!answer)return;
 const item=Array.from($('#board').querySelectorAll('button')).find(b=>b.dataset.object===answer);if(!item)return;
 const size=Number.parseFloat(item.style.width),x=Number.parseFloat(item.style.left),y=Number.parseFloat(item.style.top);
 const ring=document.createElement('div');ring.className='answer-ring';ring.setAttribute('aria-hidden','true');ring.style.left=(x-8)+'px';ring.style.top=(y-8)+'px';ring.style.width=ring.style.height=(size+16)+'px';$('#board').append(ring);
 if(scroll){const field=$('.field-scroll');field.scrollTop=Math.max(0,Math.min(field.scrollHeight-field.clientHeight,y+size/2-field.clientHeight/2));}
}
function board(){const board=$('#board');board.replaceChildren();for(const id of round.board){const b=document.createElement('button');b.type='button';b.className='object';b.dataset.object=id;b.setAttribute('aria-label',objectName(id));b.disabled=round.phase!=='playing';b.innerHTML=picture(id);board.append(b);}placeObjects();}
function render(){document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=text('title')+' · '+(lang==='zh'?'90 秒的发现之旅':'A little discovery');for(const el of document.querySelectorAll('[data-t]'))el.textContent=text(el.dataset.t);$('#language').value=lang;$('#board').setAttribute('aria-label',text('board'));$('.field-scroll').setAttribute('aria-label',text('fieldLabel'));$('#timeTrack').setAttribute('aria-label',text('progress'));$('#closeHelp').setAttribute('aria-label',text('close'));$('#sound').innerHTML='♪ '+text(audio.enabled?'soundOn':'soundOff');$('#sound').setAttribute('aria-pressed',audio.enabled);$('#pause').textContent=text(round.phase==='paused'?'resume':'pause');$('#pause').disabled=!['playing','paused'].includes(round.phase);document.body.classList.toggle('finished',round.phase==='finished');$('#overlay').hidden=round.phase==='playing';const status=round.phase==='ready'?'ready':round.phase==='paused'?'paused':'finished';$('#overlayTitle').textContent=text(status);$('#overlayBody').textContent=text(status==='ready'?'readyBody':status==='paused'?'pausedBody':round.found===SIZE?'allFound':'finishedBody');$('#action').textContent=loadingPictures?text('loadingPictures'):text(status==='ready'?'start':status==='paused'?'resume':'again');$('#action').disabled=loadingPictures;$('#result').textContent=round.phase==='finished'?number(score(round))+' '+text('points'):'';$('#resultDetail').textContent=round.phase==='finished'?text('foundCount',{count:number(round.found)}):'';const answer=answerAtEnd(round);$('#answerReview').hidden=!answer;$('#answerPicture').innerHTML=answer?picture(answer):'';$('#answerName').textContent=answer?objectName(answer):'';$('#answerLabel').textContent=text(round.found===SIZE?'lastFound':'lastTarget');$('#reviewLocationHint').hidden=round.phase!=='finished';$('#answerPicture').setAttribute('role','img');$('#answerPicture').setAttribute('aria-label',answer?objectName(answer):'');const best=records[localDay()];$('#best').textContent=best===undefined?'—':number(best);$('#bestDescription').textContent=text(best===undefined?'bestNone':'bestRule');$('#history').replaceChildren();const entries=Object.entries(records).filter(([d])=>d!==localDay()).sort(([a],[b])=>b.localeCompare(a));for(const [day,value]of entries){const li=document.createElement('li');li.textContent=day+' · '+number(value)+' '+text('points');$('#history').append(li);}if(!entries.length){const li=document.createElement('li');li.textContent=text('empty');$('#history').append(li);}live();target();board();}
function pauseRound(){if(round.phase!=='playing')return;sync();if(round.phase==='finished')return;round=pause(round);audio.stop();persist();render();}
function checkDay(){if(round.day===localDay())return false;round=createRound();notice='notice';last=performance.now();persist();render();return true;}
const pictureLoads=new Map();
function preloadPicture(id){const src=BY_ID[id].src;if(!src)return Promise.resolve(true);if(pictureLoads.has(src))return pictureLoads.get(src);const promise=new Promise(resolve=>{const img=new Image();img.onload=()=>resolve(true);img.onerror=()=>{pictureLoads.delete(src);resolve(false);};img.src=src;});pictureLoads.set(src,promise);return promise;}
async function begin(){
 if(loadingPictures||checkDay())return;audio.unlock();
 if(round.phase==='finished'){round=createRound();$('.field-scroll').scrollTop=0;notice='notice';render();persist();return;}
 const expected=round;loadingPictures=true;render();
 const loaded=await Promise.all(round.board.map(preloadPicture));loadingPictures=false;
 if(round!==expected||document.hidden||$('#help').open){render();return;}
 if(loaded.some(ok=>!ok)){render();$('#feedback').textContent=text('pictureError');return;}
 round=start(round);notice='notice';catalogUpdated=false;last=performance.now();render();persist();$('#game').scrollIntoView({block:'start',behavior:'instant'});
}
$('#action').onclick=begin;
$('#pause').onclick=()=>{if(round.phase==='paused')begin();else pauseRound();};
$('#board').addEventListener('click',e=>{const b=e.target.closest('button[data-object]');if(!b||checkDay()||round.phase!=='playing')return;sync();if(round.phase!=='playing')return;const correct=b.dataset.object===round.target;round=choose(round,b.dataset.object);if(round.phase==='finished'){finish();return;}notice=correct?'correct':'wrong';noticeObject=round.target;if(correct)audio.step();else{audio.bump();b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),350);}live();target();persist();});
$('#language').onchange=e=>{const selected=e.target.value;pauseRound();lang=selected==='zh'?'zh':'en';try{localStorage.setItem('object-garden-language',lang);}catch{}render();};
$('#sound').onclick=()=>{audio.setEnabled(!audio.enabled);$('#sound').innerHTML='♪ '+text(audio.enabled?'soundOn':'soundOff');$('#sound').setAttribute('aria-pressed',audio.enabled);};
$('#helpBtn').onclick=()=>{helpWasPlaying=round.phase==='playing';pauseRound();$('#help').showModal();};
$('#closeHelp').onclick=$('#gotIt').onclick=()=>$('#help').close();
$('#help').addEventListener('close',()=>{if(helpWasPlaying&&round.phase==='paused')begin();helpWasPlaying=false;});
window.addEventListener('blur',pauseRound);window.addEventListener('pagehide',()=>{pauseRound();persist();});document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseRound();else{last=performance.now();checkDay();}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#help').open){if(round.phase==='playing')pauseRound();else if(round.phase==='paused')begin();}});
$('#decoration1').innerHTML=picture('mushroom');$('#decoration2').innerHTML=picture('butterfly');$('#decoration3').innerHTML=picture('pear');$('#gardenArt').innerHTML=picture('flower')+picture('snail')+picture('cactus');
function frame(now){if(round.phase==='playing'&&!document.hidden&&!$('#help').open){round=tick(round,now-last);if(round.phase==='finished')finish();else{live();if(now-lastSave>1500)persist();}}last=now;requestAnimationFrame(frame);}
render();persist();requestAnimationFrame(frame);if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>{if(Math.floor($('#board').clientWidth)!==placedWidth){placeObjects();markAnswer(true);}}).observe($('#board'));else window.addEventListener('resize',placeObjects);
