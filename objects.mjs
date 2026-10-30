import {COMMON_OBJECTS} from './catalog-common.mjs?v=morandi-1';
export const OBJECTS=COMMON_OBJECTS;
export const CATALOG_SIZE=OBJECTS.length;
export const CATALOG_VERSION='common-morandi-1';
export const BY_ID=Object.fromEntries(OBJECTS.map(o=>[o.id,o]));
export function picture(id){const o=BY_ID[id];if(!o)throw Error('Unknown object: '+id);return `<img src="${o.src}" alt="" aria-hidden="true" draggable="false" decoding="async">`;}
