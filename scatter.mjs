// Deterministic free placement. Circular hit regions and art share these bounds.
export function randomFrom(seed){return()=>{let t=seed+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};}
export function scatter(width,count,seed){
 width=Math.max(240,Math.floor(width));
 let height=Math.max(480,Math.ceil(count*Math.PI*27.5**2/(width*.57)));
 for(let pass=0;pass<12;pass++){
  const random=randomFrom(seed),items=Array.from({length:count},()=>{const r=23+random()*5;return{r,rotation:(random()-.5)*50,x:r+7+random()*(width-2*r-14),y:r+7+random()*(height-2*r-14)};});
  // Relax random circles rather than aligning them in rows or columns.
  for(let step=0;step<1000;step++){
   for(let i=0;i<count;i++)for(let j=i+1;j<count;j++){
    const a=items[i],b=items[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),required=a.r+b.r+4.02;
    if(d<required){const shift=(required-d)/2,nx=d?dx/d:1,ny=d?dy/d:0;a.x-=nx*shift;a.y-=ny*shift;b.x+=nx*shift;b.y+=ny*shift;}
   }
   for(const p of items){p.x=Math.max(p.r+7,Math.min(width-p.r-7,p.x));p.y=Math.max(p.r+7,Math.min(height-p.r-7,p.y));}
   if(step%10===0){let clear=true;for(let i=0;i<count&&clear;i++)for(let j=i+1;j<count;j++){const a=items[i],b=items[j];if(Math.hypot(a.x-b.x,a.y-b.y)<a.r+b.r+4){clear=false;break;}}if(clear)return{width,height,items};}
  }
  height=Math.ceil(height*1.12);
 }
 throw Error('Unable to place a non-overlapping collection');
}
