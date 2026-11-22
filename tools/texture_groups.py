"""Groups each move's textures by their dominant hue (src/data/texture_groups.json): from the survey of tools/survey_textures.js.
Usage: python tools/texture_groups.py 20 40 0.08 survey.json survey_map.json   (hue gap that splits, closer centres merge, smallest share)
The survey: a temporary effects file with, for every move's effect object, [[recolor]] object = "<obj>", copy = "<obj[:4]>39<nnnn>",
textures = "none", materials = "none", hue = 0, mode = "shift"; the game started once; VRFW's copies (cache\\VRFW\\types\\effect\\data\\
dx11\\effect\\event) read; the file deleted. Only the texture names and hues are kept, not the game's pictures."""
import json, math, collections
import sys
GAP=float(sys.argv[1]); MERGE=float(sys.argv[2]); SMALL=float(sys.argv[3])
data=json.load(open(sys.argv[4])); cmap=json.load(open(sys.argv[5]))
T=json.load(open('src/data/techniques.json'))
NAMES=[(15,'red'),(45,'orange'),(70,'yellow'),(160,'green'),(200,'cyan'),(255,'blue'),(290,'purple'),(335,'pink'),(360,'red')]
def hname(h):
    for lim,n in NAMES:
        if h<lim: return n
def tex_hue(hist):
    x=sum(w*math.cos(math.radians(i*30)) for i,w in enumerate(hist)); y=sum(w*math.sin(math.radians(i*30)) for i,w in enumerate(hist))
    return (math.degrees(math.atan2(y,x))+360)%360, math.hypot(x,y)
def dist(a,b): d=abs(a-b)%360; return min(d,360-d)
res={}
for stem,tex in data.items():
    if not isinstance(tex,list): continue
    obj=cmap.get(stem)
    if not obj: continue
    items=[]
    for name,w,h,st in tex:
        if not st: continue
        col,ws,hist=st
        if col<0.05 or ws<1: continue
        hue,conc=tex_hue(hist)
        suf=name[len(stem)+1:]
        items.append([hue,ws,suf,conc])
    if not items: continue
    tot=sum(i[1] for i in items)
    # clusters: sort by hue, split at gaps >= 35 deg (circular)
    items.sort()
    hs=[i[0] for i in items]
    gaps=[( (hs[(k+1)%len(hs)]-hs[k])%360 if len(hs)>1 else 360, k) for k in range(len(hs))]
    cuts=sorted(k for g,k in gaps if g>=GAP)
    if not cuts: clusters=[items]
    else:
        clusters=[]
        for a,b in zip(cuts, cuts[1:]+[cuts[0]+len(items)]):
            clusters.append([items[(k)%len(items)] for k in range(a+1,b+1)])
    def centre(c):
        x=sum(i[1]*math.cos(math.radians(i[0])) for i in c); y=sum(i[1]*math.sin(math.radians(i[0])) for i in c)
        return (math.degrees(math.atan2(y,x))+360)%360
    cl=[[centre(c),sum(i[1] for i in c),c] for c in clusters]
    # merge small clusters (<10%) into the nearest big one
    big=[c for c in cl if c[1]>=SMALL*tot]; small=[c for c in cl if c[1]<SMALL*tot]
    if not big: big=[max(cl,key=lambda c:c[1])]; small=[c for c in cl if c is not big[0]]
    for s in small:
        nb=min(big,key=lambda b:dist(b[0],s[0])); nb[2]+=s[2]
    # merge big clusters closer than 40 deg
    merged=True
    while merged and len(big)>1:
        merged=False
        for i in range(len(big)):
            for j in range(i+1,len(big)):
                if dist(big[i][0],big[j][0])<MERGE:
                    big[i][2]+=big[j][2]; big[i][1]+=big[j][1]; big[i][0]=centre(big[i][2]); del big[j]; merged=True; break
            if merged: break
    big.sort(key=lambda c:-sum(i[1] for i in c[2]))
    while len(big)>3:   # at most 3 groups: the smallest joins the nearest
        s_=big.pop(); nb=min(big,key=lambda b:dist(b[0],s_[0])); nb[2]+=s_[2]
    res[obj]=[[hname(round(c[0])%360),round(c[0]),round(100*sum(i[1] for i in c[2])/tot),sorted(i[2] for i in c[2])] for c in big]
json.dump(res,open('groups_all.json','w'))
out={t['k']:[[x[0],x[1],x[2],x[3]] for x in res[t['obj']]] for t in T if len(res.get(t['obj'],[]))>1}
open('src/data/texture_groups.json','w').write(json.dumps(out,separators=(',',':')))
multi={o:g for o,g in res.items() if len(g)>1}
print(len(res),'objects;',len(multi),'with 2+ groups;',sum(1 for g in multi.values() if len(g)>2),'with 3+')
byobj={t['obj']:t for t in T}
for o in ['ev60009500','ev60006500']+[t['obj'] for t in T if 'Victory Line' in t['en'] or 'Perfect Tower' in (t['en'] or '')][:3]:
    print(o, byobj.get(o,{}).get('en'), [(g[0],g[1],g[2],len(g[3])) for g in res.get(o,[])])
