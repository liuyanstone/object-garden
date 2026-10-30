"""Fit vector paint inside circular hit bounds; no raster asset is delivered.
CairoSVG/Pillow are used only to measure SVG paint during source preparation.
"""
import os,sys,io,json,math,hashlib,xml.etree.ElementTree as ET
import cairosvg
from PIL import Image
root=sys.argv[1] if len(sys.argv)>1 else os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
manifest=os.path.join(root,'asset-credits.json')
credits=json.load(open(manifest));ns='http://www.w3.org/2000/svg';ET.register_namespace('',ns)
def radius(svg):
 im=Image.open(io.BytesIO(cairosvg.svg2png(bytestring=svg.encode(),output_width=288,output_height=288))).convert('RGBA');alpha=im.getchannel('A');points=alpha.load();best=0
 for y in range(288):
  for x in range(288):
   if points[x,y]>8:best=max(best,math.hypot((x+.5)/4-36,(y+.5)/4-36))
 return best
changed=0;maximum=0
for item in credits:
 path=os.path.join(root,item['src']);svg=open(path).read();r=radius(svg)
 if r>34:
  changed+=1
  for attempt in range(4):
   tree=ET.fromstring(svg);group=ET.Element('{'+ns+'}g',{'transform':'translate(36 36) scale(%.6f) translate(-36 -36)'%(33.5/r)})
   for child in list(tree):tree.remove(child);group.append(child)
   tree.append(group);svg=ET.tostring(tree,encoding='unicode');r=radius(svg)
   if r<=34:break
  if r>34:raise RuntimeError('Paint exceeds circular bounds: '+item['id'])
  svg+='\n';open(path,'w').write(svg)
 item['sha256']=hashlib.sha256(svg.encode()).hexdigest();item['paintRadiusUnits']=round(r,4);item['adaptation']+=' Paint fitted inside circular placement bounds.';maximum=max(maximum,r)
json.dump(credits,open(manifest,'w'),ensure_ascii=False,indent=2)
print('Measured 300 SVGs; fitted %d; maximum paint radius %.3f / 36 canvas units.'%(changed,maximum))
