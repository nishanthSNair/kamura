import test from 'node:test';import assert from 'node:assert/strict';import {extractResults,repeatedMeasurements,inferKind} from '../src/lib/report-import.ts';
const make=(text,name='lab')=>({id:name,name,kind:'Blood test',date:'',pages:[{number:1,text,ocr:false}],reviewed:false,findings:'',hash:name});
test('extracts explicit units and two-sided ranges without clinical thresholds',()=>{const rows=extractResults(make('Glucose 108 mg/dL 70-99\nALT 42 U/L 0–40\nBody fat 29 %'));assert.equal(rows.length,2);assert.equal(rows[0].status,'Above printed range');assert.equal(rows[0].page,1);assert.equal(rows[0].unit,'mg/dL');});
test('keeps one-sided, ambiguous, comma-decimal and inverted ranges out of auto comparison',()=>{for(const line of ['Glucose 5,5 mmol/L 3,9-5,5','LDL 100 mg/dL <100','Glucose 108 70-99','Glucose 5 mmol/L 10-2','Glucose 108 H mg/dL 70-99'])assert.equal(extractResults(make(line)).length,0,line);});
test('CSV rows and inclusive interval endpoints',()=>{assert.equal(extractResults(make('Glucose,99,mg/dL,70-99'))[0].status,'Within printed range');});
test('repeated values require the same label and unit in different sources',()=>{const a=make('Glucose 108 mg/dL 70-99','a'),b=make('Glucose 90 mg/dL 70-99','b'),c=make('Glucose 5 mmol/L 3-6','c');assert.equal(repeatedMeasurements([a,b,c]).length,1);assert.equal(repeatedMeasurements([a,c]).length,0);});
test('identifies imaging narrative without treating it as image analysis',()=>{assert.equal(inferKind('MRI impression: text report'),'Imaging report');});
test('a blood panel containing an Impression line is still a blood test',()=>{assert.equal(inferKind('Kamura Lab\nGlucose 112 mg/dL 70-99\nCholesterol 190 mg/dL 125-200\nImpression: follow up fasting glucose.'),'Blood test');});
test('body composition and unknown text are classified separately',()=>{assert.equal(inferKind('InBody scan skeletal muscle 34 kg body fat 22 %'),'Body composition');assert.equal(inferKind('Appointment letter, no results enclosed.'),'Other');});
test('analyte names containing digits are extracted (HbA1c, B12, T4, 25-OH)',()=>{
 for(const [line,name] of [['HbA1c 6.1 pct 4.0-5.6','HbA1c'],['Vitamin B12 180 ng/L 200-900','Vitamin B12'],['Free T4 1.1 ng/dL 0.8-1.8','Free T4'],['25-OH Vitamin D 18 ng/mL 30-100','25-OH Vitamin D']]){
  const r=extractResults(make(line));assert.equal(r.length,1,line);assert.equal(r[0].name,name);}
 assert.equal(extractResults(make('HbA1c 6.1 pct 4.0-5.6'))[0].status,'Above printed range');
 assert.equal(extractResults(make('Vitamin B12 180 ng/L 200-900'))[0].status,'Below printed range');});
test('a purely numeric first column is never treated as an analyte name',()=>{assert.equal(extractResults(make('70 99 mg/dL 10-20')).length,0);assert.equal(extractResults(make('2026 14 g/dL 13-17')).length,0);});
