// Original, code-drawn illustrations: identical geometry in the prompt and collection.
const entries=[
['apple','Apple','苹果','<path d="M49 31C21 16 9 49 28 72Q40 87 50 76Q62 87 76 68C93 42 76 18 51 31" fill="#d97865"/><path d="M50 31Q45 15 57 10M54 20Q70 4 78 17Q67 29 54 20" fill="#78936a"/>'],
['pear','Pear','梨','<path d="M46 16H55Q53 32 68 42C94 62 78 85 51 85S9 64 32 43Q47 31 46 16" fill="#d7b75d"/><path d="M51 18L56 7M55 15Q70 2 76 16Q65 24 55 15" fill="#78936a"/>'],
['cherries','Cherries','樱桃','<path d="M30 60Q48 32 53 14Q60 44 75 62M53 16Q74 7 80 23Q62 30 53 16" fill="#78936a"/><circle cx="28" cy="68" r="18" fill="#c96c73"/><circle cx="73" cy="69" r="18" fill="#d98385"/>'],
['carrot','Carrot','胡萝卜','<path d="M34 32Q62 18 74 42L25 88Z" fill="#de9864"/><path d="M61 31L55 8M65 32L79 13M60 30L39 15M41 45L53 51M34 62L42 66" fill="none"/>'],
['mushroom','Mushroom','蘑菇','<path d="M40 43H61L68 83H32Z" fill="#f3dfb7"/><path d="M12 49C14 0 87 0 89 49Q51 63 12 49" fill="#ce7b66"/><circle cx="33" cy="31" r="7" fill="#fff1d6"/><circle cx="65" cy="27" r="9" fill="#fff1d6"/>'],
['flower','Flower','花朵','<path d="M50 50V90M50 75Q19 77 26 58Q48 55 50 75M50 84Q76 83 77 65Q54 65 50 84" fill="#789b74"/><g fill="#d995a6"><ellipse cx="50" cy="24" rx="13" ry="19"/><ellipse cx="50" cy="56" rx="13" ry="19"/><ellipse cx="34" cy="40" rx="19" ry="13"/><ellipse cx="66" cy="40" rx="19" ry="13"/></g><circle cx="50" cy="40" r="12" fill="#edca70"/>'],
['leaf','Leaf','树叶','<path d="M17 83Q0 17 84 14Q96 77 17 83" fill="#89a878"/><path d="M15 89L72 26M36 65L30 38M48 53L73 56" fill="none"/>'],
['tree','Tree','树','<path d="M44 57H57V91H44Z" fill="#b28c68"/><path d="M23 61Q1 47 20 30Q15 8 44 12Q64-2 77 22Q101 30 83 52Q83 76 55 64Q35 78 23 61" fill="#86a17b"/>'],
['cactus','Cactus','仙人掌','<path d="M39 79V24Q50 5 62 24V47H72V34Q82 23 89 34V52Q89 65 62 65V79ZM39 59H24Q10 59 10 44V36Q19 26 27 37V44H39" fill="#89a58a"/><path d="M29 78H72L65 94H36Z" fill="#cf9679"/>'],
['sun','Sun','太阳','<circle cx="50" cy="50" r="24" fill="#e5bb64"/><path d="M50 6V15M50 85V94M6 50H15M85 50H94M18 18L25 25M76 76L83 83M18 82L25 75M76 24L83 17" fill="none"/>'],
['moon','Moon','月亮','<path d="M68 11A39 39 0 1 0 89 67A35 35 0 0 1 68 11" fill="#e0c17e"/>'],
['cloud','Cloud','云朵','<path d="M24 73C-2 68 6 37 29 38C34 7 74 12 77 43C103 40 106 77 80 77H27Z" fill="#b9d1d4"/>'],
['star','Star','星星','<path d="M50 7L63 34 94 38 71 59 76 91 50 76 23 91 29 59 6 38 37 34Z" fill="#e5bf6d"/>'],
['rainbow','Rainbow','彩虹','<path d="M9 80V60A41 41 0 0 1 91 60V80H77V60A27 27 0 0 0 23 60V80Z" fill="#d78e82"/><path d="M23 80V60A27 27 0 0 1 77 60V80H64V60A14 14 0 0 0 36 60V80Z" fill="#e9c477"/><path d="M36 80V60A14 14 0 0 1 64 60V80" fill="none" stroke="#8faa92" stroke-width="12"/>'],
['umbrella','Umbrella','雨伞','<path d="M50 11V74Q50 94 34 84" fill="none"/><path d="M9 51Q17 7 50 16Q85 8 92 51Q78 40 65 52Q50 41 36 52Q22 41 9 51" fill="#91b6bf"/>'],
['house','House','房子','<path d="M22 43H78V88H22Z" fill="#e1c9a0"/><path d="M8 47L50 10 92 47Z" fill="#cb8b77"/><path d="M44 88V62H62V88M28 54H37V66H28Z" fill="#9eb7b2"/>'],
['key','Key','钥匙','<circle cx="31" cy="31" r="20" fill="#e4bc69"/><path d="M44 44L86 86M65 65L77 53M77 77L89 65" fill="none" stroke-width="12"/><circle cx="28" cy="28" r="6" fill="#faf5e7"/>'],
['cup','Cup','杯子','<path d="M68 30H78Q99 48 77 64H67" fill="none" stroke-width="9"/><path d="M19 26H69V64Q46 90 24 66Z" fill="#94b9b5"/><path d="M15 85H78M32 15V7M50 15V5" fill="none"/>'],
['teapot','Teapot','茶壶','<path d="M70 40Q104 23 89 66H72" fill="none" stroke-width="8"/><path d="M30 39L6 29 21 65H32M29 37Q52 27 72 40L77 72Q50 92 24 73Z" fill="#c5a2bc"/><path d="M30 32H73L64 24H43ZM52 24V15" fill="#c5a2bc"/>'],
['book','Book','书本','<path d="M13 17H70L88 29V88H28L13 76Z" fill="#8eb0bf"/><path d="M28 30H88M28 30V88M13 17L28 30" fill="none"/><path d="M42 45H73M42 55H68" stroke="#f2e9cd" fill="none"/>'],
['pencil','Pencil','铅笔','<path d="M18 66L66 13Q78 6 88 24L40 77 13 88Z" fill="#e5bd6f"/><path d="M18 66L40 77 13 88Z" fill="#e7d1ab"/><path d="M17 78L13 88 25 84ZM66 13L88 24 80 34 58 23Z" fill="#cc8c87"/><path d="M30 66L70 25" fill="none"/>'],
['scissors','Scissors','剪刀','<path d="M40 54L78 11M59 54L24 11" fill="none" stroke-width="7"/><ellipse cx="31" cy="71" rx="15" ry="18" fill="#d69490"/><ellipse cx="69" cy="71" rx="15" ry="18" fill="#d69490"/><circle cx="50" cy="43" r="5" fill="#ece1c4"/>'],
['clock','Clock','时钟','<circle cx="50" cy="50" r="38" fill="#efdfbc"/><circle cx="50" cy="50" r="29" fill="#faf5e7"/><path d="M50 29V50L68 60M50 16V20M17 50H21M79 50H83" fill="none"/>'],
['bell','Bell','铃铛','<path d="M22 67Q32 58 30 40Q29 18 50 18Q73 18 71 43Q69 57 80 67L83 73H18Z" fill="#dcb76e"/><path d="M41 78Q50 95 61 78M50 18V9" fill="#dcb76e"/>'],
['balloon','Balloon','气球','<ellipse cx="50" cy="34" rx="28" ry="31" fill="#d692a5"/><path d="M50 65L43 74H56ZM50 74Q65 85 45 96" fill="none"/>'],
['kite','Kite','风筝','<path d="M51 6L84 35 51 76 15 35Z" fill="#a4b6c6"/><path d="M51 6V76M15 35H84M51 76Q80 82 55 95" fill="none"/><path d="M65 84L76 80 74 91Z" fill="#dca587"/>'],
['fish','Fish','鱼','<path d="M23 48L5 27V73L23 53Q56 9 91 50Q57 91 23 48" fill="#92b8c2"/><circle cx="72" cy="45" r="3" fill="#42594f"/><path d="M49 32Q40 48 49 68" fill="none"/>'],
['butterfly','Butterfly','蝴蝶','<path d="M49 45C16-12-12 39 31 57C-7 87 32 105 49 63C69 104 108 80 69 56C113 35 82-10 49 45" fill="#b6a1c2"/><path d="M50 36V77M50 38L39 20M50 38L62 20" fill="none"/>'],
['snail','Snail','蜗牛','<path d="M13 76H72Q91 76 88 57L84 42M87 57L96 43" fill="none" stroke-width="8"/><circle cx="43" cy="51" r="28" fill="#d5ae83"/><path d="M43 71Q18 60 28 41Q43 25 58 44Q66 63 45 63Q32 60 38 48Q45 42 50 50" fill="none"/>'],
['sailboat','Sailboat','帆船','<path d="M50 9V70M50 17L18 61H50Z" fill="#f0dfb7"/><path d="M55 28L84 61H55Z" fill="#a2bcc7"/><path d="M10 73H92L77 89H27Z" fill="#ce9276"/>']
];
export const OBJECTS=entries.map(([id,en,zh,art])=>({id,en,zh,art}));
export const BY_ID=Object.fromEntries(OBJECTS.map(o=>[o.id,o]));
export function picture(id){return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" stroke="#526459" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">${BY_ID[id].art}</svg>`;}
