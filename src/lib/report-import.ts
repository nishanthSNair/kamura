export type ImportedPage={number:number;text:string;ocr:boolean};
export type ReportKind='Blood test'|'Body composition'|'Imaging report'|'Other';
export type ImportedReport={id:string;name:string;kind:ReportKind;date:string;pages:ImportedPage[];reviewed:boolean;findings:string;hash:string};
export type ExtractedResult={name:string;value:number;unit:string;low:number;high:number;status:'Above printed range'|'Below printed range'|'Within printed range';source:string;page:number;line:string};
// Deliberately conservative: ambiguous columns and one-sided cut-offs stay in source text.
export function extractResults(report:ImportedReport):ExtractedResult[]{const results:ExtractedResult[]=[];for(const page of report.pages)for(const raw of page.text.split('\n')){const line=raw.trim();const match=line.match(/^([A-Za-z][A-Za-z ()/%.,-]{1,65}?)\s*[,;\t ]+\s*(-?\d+(?:\.\d+)?)\s*[,;\t ]+\s*([a-zA-Zµμ%][a-zA-Zµμ%\d/^.-]*)\s*[,;\t ]+\s*(?:\(?\s*(?:reference(?: range)?|range)\s*[:=]?\s*)?(-?\d+(?:\.\d+)?)\s*[-–—]\s*(-?\d+(?:\.\d+)?)\s*\)?\s*$/i);if(!match)continue;const [,name,v,unit,l,h]=match;const value=Number(v),low=Number(l),high=Number(h);if(low>high||![value,low,high].every(Number.isFinite))continue;results.push({name:name.trim(),value,unit,low,high,status:value<low?'Below printed range':value>high?'Above printed range':'Within printed range',source:report.name,page:page.number,line});}return results;}
// Weighted rather than first-match: a blood panel that happens to carry an
// "Impression:" line should still read as a blood test. Distinctive terms score
// higher than words that appear across many report formats. The uploader can
// always correct the type, so ties resolve to the most cautious generic label.
const KIND_TERMS:{kind:ReportKind;weight:number;pattern:RegExp}[]=[
 {kind:'Imaging report',weight:3,pattern:/\b(MRI|CT scan|ultrasound|radiology|radiograph|sonograph\w*|contrast|radiologist)\b/gi},
 {kind:'Imaging report',weight:1,pattern:/\b(impression|findings)\b/gi},
 {kind:'Body composition',weight:3,pattern:/\b(inbody|body composition|skeletal muscle|body fat|visceral fat|DEXA|DXA|lean mass)\b/gi},
 {kind:'Blood test',weight:3,pattern:/\b(h(a)?emoglobin|glucose|cholesterol|triglycerides|creatinine|HbA1c|bilirubin|platelets?|serum|albumin|TSH|ferritin)\b/gi},
 {kind:'Blood test',weight:1,pattern:/\b(blood test|blood count|panel|laboratory|reference range)\b/gi},
];
export function inferKind(text:string):ReportKind{
 const scores=new Map<ReportKind,number>();
 for(const {kind,weight,pattern} of KIND_TERMS){
  const hits=text.match(pattern)?.length??0;
  if(hits)scores.set(kind,(scores.get(kind)??0)+hits*weight);
 }
 let best:ReportKind='Other',top=0;
 for(const [kind,score] of scores)if(score>top){top=score;best=kind;}
 return top?best:'Other';
}
export function repeatedMeasurements(reports:ImportedReport[]){const groups=new Map<string,ExtractedResult[]>();for(const r of reports)for(const o of extractResults(r)){const key=o.name.toLowerCase()+'|'+o.unit;groups.set(key,[...(groups.get(key)||[]),o]);}return [...groups.values()].filter(g=>new Set(g.map(x=>x.source)).size>1);}
export function reportText(report:ImportedReport){return report.pages.map(p=>`PAGE ${p.number}${p.ocr?' · OCR':''}\n${p.text}`).join('\n\n');}
