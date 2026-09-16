# Kamura integrated health report

Status: first synthetic-data workflow prototype implemented at /my/reports, 16 September 2026. Supports source inclusion, value verification, connected template findings, editable review actions and printable HTML export. No real diagnostic uploads, automated extraction, AI synthesis, clinical authorisation or patient record persistence are implemented.

## Purpose
Bring multiple tests belonging to one person into a source-linked, comprehensive report. Connect findings across modalities, explain uncertainty and identify concrete questions and follow-up actions. Preserve original clinical reports. Do not infer that an absent result is normal.

## First release
Inputs: blood-test PDFs and structured exports; body-composition PDF/CSV reports; written radiology reports. Raw DICOM image interpretation is a separate future project. Uploading imaging files does not imply automated interpretation.

Workflow: choose person and encounter → add reports → verify extracted results → reconcile findings → draft combined report → clinician review → release a versioned report to client → track follow-up.

The destination clinic/device formats and release workflow are pending user input. Recommend clinician approval before patient release of clinical interpretations and treatment actions.

## Report
1. Summary: reason for assessment, tests reviewed, dates, missing context and key findings.
2. Prioritised findings: source-reported urgent findings, items for timely review and routine follow-up. Urgency derived from validated clinic rules and clinician review; do not let a language model independently triage critical results.
3. Connected findings grouped by organ/system. Every factual statement links to its source page, result, collection date and method. Distinguish measured facts, radiologist interpretations, clinical hypotheses and clinician conclusions.
4. Trends only for sufficiently comparable measurements. Retain assay/device/method changes and flag differences that prevent direct comparison.
5. Actions: clinician-approved action, reason, owner, timeframe, measure of progress and review date. Include education, clarification, appropriate follow-up and clinician-selected interventions; do not automatically prescribe peptides or hormones from abnormal tests.
6. Questions, limitations and missing information.
7. Full results appendix and original reports.
8. Clinician identity, approval date, report version and amendment history.

## Data integrity
Confirm patient identity and document date before merging. Retain units and laboratory-specific reference intervals. Extraction confidence alone does not verify correctness; make uncertain or missing values reviewable. Distinguish specimen date from report date. Preserve qualitative results and original wording. Record device model and measurement method for body composition. Distinguish device-derived visceral-fat estimates from CT/MRI measurements. Do not silently average conflicting values. Prevent duplicate reports from counting twice.

## Technical model
Use FHIR-aligned concepts for future interoperability, without claiming FHIR conformance: DiagnosticReport for original clinical reports, Observation for individual measurements, ImagingStudy for imaging metadata. Store original source references and extraction provenance separately from generated interpretation.

Proposed entities: diagnostic_encounters, diagnostic_documents, diagnostic_observations, document_extractions, integrated_report_versions, report_findings, finding_sources, review_actions, access_grants and audit_events.

Document states: received, processing, needs_verification, verified, rejected. Report states: draft, in_review, approved, released, amended. Replacing an input invalidates affected draft findings and requires review before re-release.

## Patient-data implementation prerequisites
Existing member authentication is not sufficient evidence of patient-data readiness. Implement and test private storage, patient/assigned-clinician access policies, server-side authorisation on every operation, short-lived document access links, audit trails and file validation. Keep uploads and extracted text out of analytics and application logs. Agree storage location, processing vendors, consent, retention and deletion behaviour with the operator before accepting real patient uploads. Never reuse the browser-local saved-learning collection for diagnostic records.

## Implementation order
A. Reviewable prototype with synthetic data: input list, extraction review, connected findings, clinician edits and report preview. No real-patient upload or automated diagnostic claims.
B. Verified document intake for agreed laboratory and device formats, secure storage and access controls.
C. Structured extraction with human verification and deterministic checks for units, dates, duplicates and conflicting patient identities.
D. Source-grounded drafting service that can abstain, with visible missing context and tested citation fidelity.
E. Clinician review, immutable released versions, patient-friendly report, print/PDF export and follow-up tracking.
F. Direct device/laboratory integrations, longitudinal comparison and body-linked visualisation.

## Acceptance criteria
- Cross-patient uploads cannot merge without explicit correction and audit.
- Every numerical claim resolves to a verified observation and original page.
- Unsupported, missing or conflicting findings remain visible.
- Unit and reference-range checks cover actual launch formats.
- Radiology text is attributed to its author; raw images are not reported as analysed.
- Only authorised assigned clinicians can approve/release reports.
- Uploaded records cannot be accessed by another member or unassigned clinician.
- Report changes preserve previous released versions and authorship.
- Test extraction on de-identified examples before accepting each new format.
- No actionable clinical output is labelled validated until evaluation and clinician review are complete.

## Reference
HL7 FHIR DiagnosticReport: https://hl7.org/fhir/R4/diagnosticreport.html
