// Reads VRFW's survey copies (a [[recolor]] with textures = "none" for every move's effect object, written by tools/texture_groups.py --survey)
// and writes, per copy, each texture's share of coloured pixels and its hue histogram. Needs codec.js of the Custom Kits app (BC7).
// Usage: node tools/survey_textures.js <codec.js> out.json <copies/*.g4tx>
// per survey copy: every texture's share of grey / coloured pixels and its hue histogram (12 buckets of 30°, weighted)
const {BC7,G4TX}=require(require('path').resolve(process.argv[2])); const fs=require('fs'), path=require('path');
const out={};
for (const f of process.argv.slice(4)) {
  const stem=path.basename(f,'.g4tx'); let d; try { d=new Uint8Array(fs.readFileSync(f)); } catch(e){ continue; }
  let p; try { p=G4TX.parse(d); } catch(e){ out[stem]={err:String(e)}; continue; }
  const tex=[];
  for (const e of p.ents){
    let r=null; try { r=G4TX.decodeEntry(d,e, (e.w*e.h>65536)?1:0); } catch(err){}
    if(!r){ tex.push([e.name,e.w,e.h,null]); continue; }
    const px=r.data,n=r.w*r.h; let grey=0,col=0,wsum=0; const hist=new Array(12).fill(0);
    for(let i=0;i<n;i++){ const R=px[4*i],G=px[4*i+1],B=px[4*i+2],A=px[4*i+3]; const mx=Math.max(R,G,B),mn=Math.min(R,G,B); const s=mx?(mx-mn)/mx:0;
      if(s<0.15||mx<20){grey++;continue;} col++;
      let h; if(mx===R) h=((G-B)/(mx-mn))%6; else if(mx===G) h=(B-R)/(mx-mn)+2; else h=(R-G)/(mx-mn)+4; h=(h*60+360)%360;
      const w=(mx/255)*s*(A/255+0.05); hist[Math.floor(((h+15)%360)/30)]+=w; wsum+=w; }
    tex.push([e.name,e.w,e.h,[+(col/n).toFixed(3), +wsum.toFixed(1), hist.map(v=>+(v/(wsum||1)).toFixed(3))]]);
  }
  out[stem]=tex;
}
fs.writeFileSync(process.argv[3], JSON.stringify(out));
console.log(Object.keys(out).length,'files');
