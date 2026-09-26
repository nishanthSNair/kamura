export type ImportedPage={number:number;text:string;ocr:boolean};
export type ReportKind='Blood test'|'Body composition'|'Imaging report'|'Other';
export type ExtractedResult={name:string;value:number;unit:string;low:number|null;high:number|null;exclusive?:boolean;status:'Above printed range'|'Below printed range'|'Within printed range';source:string;sourceId?:string;date?:string;page:number;line:string};
export type ImportedReport={id:string;name:string;kind:ReportKind;date:string;pages:ImportedPage[];reviewed:boolean;findings:string;hash:string;results?:ExtractedResult[]};
const NUMBER='(-?\\d+(?:[.,]\\d+)?)';
const ROW=new RegExp('^([A-Za-z0-9][A-Za-z0-9 ()/%.,+-]{0,65}?)\\s+'+NUMBER+'\\s+(?:[HL]\\s+)?([a-zA-Zµμ%][a-zA-Zµμ%\\d/^.-]*)\\s+(?:[HL]\\s+)?(?:\\(?\\s*(?:reference(?: range)?|range)\\s*[:=]?\\s*)?(?:'+NUMBER+'\\s*[-–—]\\s*'+NUMBER+'|([<>≤≥]=?)\\s*'+NUMBER+')\\s*\\)?\\s*(?:[HL])?$', 'i');
const num=(s:string)=>Number(s.replace(',','.'));
export function resultStatus(value:number,low:number|null,high:number|null,exclusive=false):ExtractedResult['status']{return low!==null&&(value<low||(exclusive&&value===low))?'Below printed range':high!==null&&(value>high||(exclusive&&value===high))?'Above printed range':'Within printed range';}
export function referenceLabel(r:Pick<ExtractedResult,'low'|'high'|'exclusive'>){return r.low===null?`${r.exclusive?'<':'≤'} ${r.high}`:r.high===null?`${r.exclusive?'>':'≥'} ${r.low}`:`${r.low}–${r.high}`;}
export function extractResults(report:ImportedReport):ExtractedResult[]{
 if(report.results)return report.results.map(r=>({...r,source:report.name,sourceId:report.id,date:report.date,status:resultStatus(r.value,r.low,r.high,r.exclusive)}));
 const results:ExtractedResult[]=[];
 for(const page of report.pages)for(const raw of page.text.split('\n')){
  // Comma-delimited CSV is accepted only in a clear four-column shape. Decimal commas remain intact in whitespace/semicolon tables.
  let line=raw.trim();if(/^[^,]+,-?\d+(?:\.\d+)?,[^,]+,[^,]+$/.test(line))line=line.replaceAll(',',' ');line=line.replace(/[;\t]+/g,' ');
  const m=line.match(ROW);if(!m||!/[A-Za-z]/.test(m[1]))continue;
  if([m[2],m[4],m[5],m[7]].some(v=>v&&/\d+,\d{3}$/.test(v)))continue;
  const value=num(m[2]),unit=m[3],op=m[6];let low:number|null=null,high:number|null=null;
  if(op){if(op.startsWith('<')||op==='≤')high=num(m[7]);else low=num(m[7]);}else{low=num(m[4]);high=num(m[5]);}
  if(!Number.isFinite(value)||(low!==null&&!Number.isFinite(low))||(high!==null&&!Number.isFinite(high))||(low!==null&&high!==null&&low>high))continue;
  const exclusive=op==='<'||op==='>';
  results.push({name:m[1].trim(),value,unit,low,high,exclusive,status:resultStatus(value,low,high,exclusive),source:report.name,sourceId:report.id,date:report.date,page:page.number,line:raw.trim()});
 }
 return results;
}
const KIND_TERMS:{kind:ReportKind;weight:number;pattern:RegExp}[]=[
 {kind:'Imaging report',weight:3,pattern:/\b(MRI|CT scan|ultrasound|radiology|radiograph|sonograph\w*|contrast|radiologist)\b/gi},
 {kind:'Imaging report',weight:1,pattern:/\b(impression|findings)\b/gi},
 {kind:'Body composition',weight:3,pattern:/\b(inbody|body composition|skeletal muscle|body fat|visceral fat|DEXA|DXA|lean mass)\b/gi},
 {kind:'Blood test',weight:3,pattern:/\b(h(a)?emoglobin|glucose|cholesterol|triglycerides|creatinine|HbA1c|bilirubin|platelets?|serum|albumin|TSH|ferritin)\b/gi},
 {kind:'Blood test',weight:1,pattern:/\b(blood test|blood count|panel|laboratory|reference range)\b/gi},
];
export function inferKind(text:string):ReportKind{const scores=new Map<ReportKind,number>();for(const {kind,weight,pattern} of KIND_TERMS){const hits=text.match(pattern)?.length??0;if(hits)scores.set(kind,(scores.get(kind)??0)+hits*weight);}const ranked=[...scores].sort((a,b)=>b[1]-a[1]);return !ranked.length||ranked[0][1]===ranked[1]?.[1]?'Other':ranked[0][0];}
export function repeatedMeasurements(reports:ImportedReport[]){const groups=new Map<string,ExtractedResult[]>();for(const r of reports)for(const o of extractResults(r)){const key=o.name.toLowerCase().replace(/\s+/g,' ').trim()+'|'+o.unit.replace('μ','µ');groups.set(key,[...(groups.get(key)||[]),o]);}return [...groups.values()].filter(g=>new Set(g.map(x=>x.sourceId)).size>1).map(g=>g.sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999')));}
export function reportText(report:ImportedReport){return report.pages.map(p=>`PAGE ${p.number}${p.ocr?' · OCR':''}\n${p.text}`).join('\n\n');}
