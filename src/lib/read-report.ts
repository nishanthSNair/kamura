import type {ImportedPage} from './report-import';
export async function readReport(file:File,onProgress:(message:string)=>void):Promise<ImportedPage[]>{
 if(file.size>20*1024*1024)throw Error('This file is larger than 20 MB. Split or compress it first.');
 const extension=file.name.split('.').pop()?.toLowerCase();const buffer=await file.arrayBuffer();
 let worker:import('tesseract.js').Worker|undefined;
 async function recognise(image:File|HTMLCanvasElement){if(!worker){onProgress('Loading text recognition tools…');const {createWorker}=await import('tesseract.js');worker=await createWorker('eng',1,{workerPath:'/report-tools/worker.min.js',corePath:'/report-tools/core',langPath:'/report-tools/lang',logger:m=>{if(m.status==='recognizing text')onProgress(`Reading scan · ${Math.round(m.progress*100)}%`);}});}const result=await worker.recognize(image);return result.data.text;}
 try{
  if(extension==='pdf'){const pdfjs=await import('pdfjs-dist');pdfjs.GlobalWorkerOptions.workerSrc='/report-tools/pdf.worker.min.mjs';const task=pdfjs.getDocument({data:buffer});try{const pdf=await task.promise;if(pdf.numPages>50)throw Error('This PDF exceeds 50 pages. Split it into smaller reports.');const pages:ImportedPage[]=[];for(let n=1;n<=pdf.numPages;n++){onProgress(`Reading PDF page ${n} of ${pdf.numPages}`);const page=await pdf.getPage(n);const content=await page.getTextContent();let text='',lastY:number|undefined;for(const item of content.items){if(!('str' in item))continue;const y=item.transform[5];if(lastY!==undefined&&Math.abs(y-lastY)>3)text+='\n';else if(text&&!text.endsWith('\n'))text+=' ';text+=item.str;if(item.hasEOL)text+='\n';lastY=y;}let ocr=false;if(text.replace(/\s/g,'').length<30){ocr=true;const natural=page.getViewport({scale:1});const viewport=page.getViewport({scale:Math.min(2,2400/Math.max(natural.width,natural.height))});const canvas=document.createElement('canvas');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);await page.render({canvas,viewport}).promise;text=await recognise(canvas);canvas.width=0;canvas.height=0;}pages.push({number:n,text:text.trim(),ocr});page.cleanup();}return pages;}finally{await task.destroy();}}
  if(extension==='docx'){const mammoth=await import('mammoth');const {value}=await mammoth.extractRawText({arrayBuffer:buffer});return [{number:1,text:value,ocr:false}];}
  if(['txt','csv'].includes(extension||''))return [{number:1,text:new TextDecoder().decode(buffer),ocr:false}];
  if(['png','jpg','jpeg','webp'].includes(extension||''))return [{number:1,text:await recognise(file),ocr:true}];
  throw Error('Use PDF, DOCX, TXT, CSV, PNG, JPG or WebP. Raw MRI/DICOM images are not supported.');
 }finally{if(worker)await worker.terminate();}
}
