// Original 72-unit illustrations. Same palette, rounded 2-unit outline and
// flat shapes as the adapted collection. No external artwork is embedded.
const p={ink:'#59645e',cream:'#f1ebdf',white:'#fbf6ec',rose:'#c49b9b',pink:'#dcc0bb',clay:'#c49a80',brown:'#a98773',yellow:'#c5b380',sage:'#9eae96',green:'#7f977f',blue:'#9db1b8',denim:'#829ba9',lilac:'#b0a1b8',taupe:'#b4a491'};
const path=(d,fill='none',extra='')=>`<path d="${d}" fill="${p[fill]||fill}" ${extra}/>`;
const rect=(x,y,w,h,r,fill)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${p[fill]||fill}"/>`;
const circle=(x,y,r,fill)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${p[fill]||fill}"/>`;
const ellipse=(x,y,rx,ry,fill,extra='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${p[fill]||fill}" ${extra}/>`;
const eye=(x,y)=>circle(x,y,1.5,'ink');
export const ORIGINAL_ART={
'leaf':path('M36 62 34 42M34 46C17 52 5 41 9 23L21 9Q28 5 35 19Q42 4 50 9L64 25Q65 48 38 47Z','sage')+path('M35 44 22 20M35 44 15 30M35 44 50 19M35 44 57 31'),
'gi-dragonfly':ellipse(23,29,17,7,'blue','transform="rotate(22 23 29)"')+ellipse(49,29,17,7,'blue','transform="rotate(-22 49 29)"')+ellipse(24,43,16,6,'cream','transform="rotate(-16 24 43)"')+ellipse(48,43,16,6,'cream','transform="rotate(16 48 43)"')+rect(33,27,6,34,3,'sage')+path('M33 40h6M33 48h6M33 56h6')+circle(36,22,7,'green')+eye(33,21)+eye(39,21),
'gi-seahorse':path('M46 15Q32 6 25 18L18 22 19 29 28 27Q22 38 31 43Q48 48 42 59Q36 66 29 60Q24 55 31 52Q36 50 36 55M31 43Q11 43 18 34L25 35M32 13 35 7 39 11 44 6 46 14','rose')+path('M31 27Q41 35 32 39M32 46l7 1M31 51l7 2')+eye(34,20),
'gi-ostrich':path('M34 37 31 18Q30 9 40 9Q51 11 43 18L39 18 42 37','pink')+ellipse(31,43,18,13,'taupe')+path('M16 41 7 32 8 47 14 50','brown')+path('M26 55 25 65 17 65M37 56 40 65 49 65M40 12 50 14 43 18','yellow')+ellipse(29,42,10,8,'cream')+eye(40,12),
'gi-bamboo':path('M23 65 22 8M44 65 44 17','none','stroke-width="6" stroke="#9eae96"')+path('M19 20h8M19 35h8M19 50h8M40 29h8M40 44h8M40 59h8')+path('M23 27Q3 21 8 11Q22 12 23 27M44 37Q65 23 64 38Q57 45 44 44M44 24Q61 11 60 9Q46 8 44 24M22 49Q6 42 7 52Q13 59 22 55','green'),
'gi-cotton-flower':path('M36 65V37M36 54 21 47M36 58 52 50')+path('M36 40 21 42 25 33 35 27 47 32 51 42Z','brown')+path('M20 34Q5 29 14 18Q20 7 30 15Q35 1 45 13Q60 8 62 23Q67 35 52 36Q42 44 35 35Q27 42 20 34Z','white')+path('M35 55Q20 39 14 47Q20 59 35 55M37 59Q53 42 59 50Q52 63 37 59','sage'),
'gi-dandelion-flower':path('M36 65V35M36 55 24 49M36 61 49 54')+path('M22 51 15 46 17 56 29 59M49 55 57 49 56 59 43 63','sage')+path('M36 6 41 10 47 8 49 14 55 16 53 22 57 27 51 31 50 37 43 36 38 41 33 37 27 39 24 33 18 30 21 23 18 18 24 14 26 8 32 10Z','white')+path('M36 25 36 12M36 25 47 16M36 25 50 27M36 25 43 35M36 25 28 34M36 25 23 23M36 25 28 15','none','stroke-width="1"')+circle(36,25,2,'yellow'),
'gi-plum':ellipse(36,40,21,24,'lilac')+path('M35 18Q45 37 36 60M36 19 41 7')+path('M40 15Q54 1 61 12Q53 24 40 15','sage'),
'gi-pumpkin':path('M34 20 32 8 41 7 40 20','green')+ellipse(22,41,13,20,'clay')+ellipse(50,41,13,20,'clay')+ellipse(36,41,15,23,'clay')+path('M27 23Q18 43 28 61M45 23Q54 43 44 61'),
'gi-ice-pop':rect(31,48,10,18,4,'brown')+path('M20 47V22Q20 8 36 8Q52 8 52 22V48Q46 54 40 48Q34 55 28 48Q23 53 20 47Z','rose')+path('M25 22V42M35 19V38M45 22V42','none','stroke="#f1ebdf"'),
'kettle':path('M21 31Q14 5 37 6Q59 7 54 32','none','stroke-width="5"')+path('M17 35 6 28 12 46 20 48','blue')+path('M18 30Q36 24 54 31L60 55Q37 65 14 55Z','blue')+path('M18 30H55M20 53H55')+rect(25,24,24,6,3,'cream')+path('M33 23V19H41V24')+path('M23 34 20 48','none','stroke="#f1ebdf"'),
'cooking-pot':path('M16 32H56V48Q54 59 36 59Q18 59 16 48Z','yellow')+path('M16 34H6V43H16M56 34H66V43H56','cream')+ellipse(36,32,20,7,'cream')+path('M22 30Q28 20 33 31M38 31Q43 22 49 31','sage')+path('M25 19Q20 14 26 8M38 17Q33 12 39 6M50 19Q45 14 51 8'),
'drum':path('M13 30H59V52Q37 65 13 52Z','rose')+ellipse(36,30,23,8,'cream')+path('M13 52Q36 62 59 52M16 35 22 53 29 37 36 56 43 37 50 53 57 35','none','stroke="#f1ebdf"')+path('M18 9 47 27M54 8 27 25','none','stroke-width="3"')+circle(18,9,2,'brown')+circle(54,8,2,'brown'),
'gi-rice-cooker':path('M12 30Q14 18 36 18Q58 18 60 30V53Q58 61 36 61Q14 61 12 53Z','sage')+ellipse(36,29,24,10,'cream')+path('M27 18V12Q36 6 45 12V18')+rect(27,42,18,11,3,'cream')+circle(36,47,2,'green')+path('M18 60v4M54 60v4M12 37H7M60 37H65'),
'gi-pressure-cooker':rect(16,30,40,29,9,'blue')+path('M15 32H57L53 24H19Z','cream')+rect(29,18,15,6,2,'ink')+path('M16 36H7V43H16M56 36H65V43H56','taupe')+path('M47 22V15M43 15H51M23 35V50M23 55H49'),
'gi-toaster':rect(12,27,48,32,9,'clay')+path('M19 28V20Q15 13 23 12Q36 7 49 12Q58 14 53 21V28Z','cream')+path('M22 24H50M27 16H44M20 59V64M53 59V64')+rect(22,37,28,4,2,'brown')+path('M57 37h7v13')+circle(54,49,2,'cream'),
'gi-gas-stove':rect(8,16,56,46,6,'cream')+ellipse(23,33,11,8,'denim')+ellipse(49,33,11,8,'denim')+path('M14 33h18M23 26v14M40 33h18M49 26v14')+circle(23,52,3,'brown')+circle(49,52,3,'brown')+path('M10 45H62'),
'gi-desk':rect(8,23,56,8,3,'clay')+rect(41,32,18,15,2,'cream')+path('M13 31V63M59 31V63M42 47V63M47 39H53')+rect(15,12,16,11,1,'blue')+path('M15 17H31M35 23V10'),
'gi-porcelain-vase':path('M27 10H45L42 26Q63 44 54 60Q37 68 18 59Q9 43 30 26Z','rose')+ellipse(36,11,9,3,'cream')+path('M24 41Q36 47 49 40M24 47Q36 53 49 46'),
'gi-hanger':path('M29 19Q25 5 36 5Q48 5 43 15L36 21V28M36 28 8 47Q5 53 13 54H59Q67 53 63 47L36 28Z','none','stroke-width="3"'),
'gi-towel':path('M10 15H62')+path('M18 15H51V59H18Z','blue')+path('M23 15V58M18 49H51M18 54H51M21 59V65M27 59V65M33 59V65M39 59V65M45 59V65'),
'gi-vacuum-cleaner':ellipse(29,51,17,10,'rose')+circle(18,57,5,'ink')+circle(39,57,5,'ink')+path('M35 43Q54 25 42 12Q34 5 28 14Q25 22 37 27L60 51','none','stroke-width="5"')+path('M55 48 64 46 68 60 58 64Z','blue')+path('M28 43 29 37'),
'gi-necklace':path('M18 10Q0 45 36 61Q72 45 54 10','none','stroke-width="3" stroke="#c5b380"')+path('M36 53 27 62 36 69 45 62Z','rose')+circle(18,10,2,'yellow')+circle(54,10,2,'yellow'),
'gi-stapler':path('M11 48H59V58H11Z','taupe')+path('M12 43 55 22Q61 20 62 29L63 40 17 57Z','blue')+path('M17 45 56 28M19 55H52')+circle(57,40,3,'cream'),
'gi-jumping-rope':path('M18 21Q1 61 35 62Q67 62 54 22','none','stroke-width="3" stroke="#b0a1b8"')+rect(13,6,10,24,4,'rose')+rect(49,6,10,24,4,'rose')+path('M17 11v13M53 11v13','none','stroke="#f1ebdf"'),
'piano':path('M15 47V12Q49 2 57 22L52 43 60 50V56H14Z','denim')+path('M17 13 53 25 52 43 15 38Z','blue')+path('M15 43H60V56H15Z','white')+path('M22 44v11M29 44v11M36 44v11M43 44v11M50 44v11M57 44v11M20 57V66M55 57V66')+path('M26 44v6M40 44v6M48 44v6','none','stroke-width="3"'),
'refrigerator':rect(17,6,38,60,5,'blue')+path('M17 27H55M24 14V21M24 35V49M22 66V69M50 66V69')+rect(43,36,5,9,1,'cream'),
'ribbon':path('M30 28 11 18Q7 38 12 52L30 43M42 28 61 18Q66 38 60 52L42 43Z','rose')+rect(29,27,14,18,4,'pink')+path('M15 27 28 33M57 27 44 33M15 44 28 39M57 44 44 39'),
'wallet':path('M10 20 51 9 55 19','brown')+rect(9,19,54,42,6,'clay')+rect(43,34,23,14,4,'cream')+circle(51,41,2,'yellow')+path('M16 25H52M16 55H34'),
'washing-machine':rect(14,6,44,60,5,'cream')+path('M14 19H58')+circle(37,42,16,'blue')+circle(37,42,11,'denim')+path('M27 44Q36 34 47 43M20 12H29')+circle(50,12,2,'sage'),
 'traffic-cone':path('M31 8H41L57 58H15Z','clay')+path('M27 23H46L49 33H24ZM20 45H53L56 55H17Z','cream')+rect(9,57,54,9,3,'clay')
};
export function originalSVG(id){if(!ORIGINAL_ART[id])throw Error('Missing original '+id);return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><g stroke="${p.ink}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ORIGINAL_ART[id]}</g></svg>`;}
