export type BodyZone = "brain" | "heart" | "lungs" | "gut" | "muscles" | "fullBody";

export interface ConcernEducation {
  summary: string;
  commonCauses: string[];
  researchInsight: string;
}

export interface WellnessConcern {
  id: string;
  label: string;
  zone: BodyZone;
  icon: string;
  matchTags: string[];
  matchOutcomes: string[];
  education: ConcernEducation;
}

export interface ZoneConfig {
  zone: BodyZone;
  label: string;
  icon: string;
  description: string;
  followUpQuestion: string;
  concerns: WellnessConcern[];
}

export type ConcernDuration = "weeks" | "months" | "years";

export const DURATION_OPTIONS: { value: ConcernDuration; label: string }[] = [
  { value: "weeks", label: "Recent (weeks)" },
  { value: "months", label: "A few months" },
  { value: "years", label: "Ongoing (years)" },
];

export const ZONES: ZoneConfig[] = [
  {
    zone: "brain",
    label: "Brain & Mind",
    icon: "\u{1F9E0}",
    description: "Focus, memory, mood & cognitive wellness",
    followUpQuestion: "How long have you noticed these cognitive concerns?",
    concerns: [
      {
        id: "brain-fog",
        label: "Brain fog",
        zone: "brain",
        icon: "\u{1F32B}\uFE0F",
        matchTags: ["Cognitive", "Brain", "Brain Health", "Focus", "Cognitive Enhancement", "Neuroprotection"],
        matchOutcomes: ["Cognitive Function", "Cognitive Enhancement", "Cognitive Performance & Memory", "Brain Health", "Neuroprotection"],
        education: {
          summary: "Brain fog is a persistent feeling of mental cloudiness, difficulty thinking clearly, and reduced mental sharpness. It affects working memory, word recall, and the ability to process information efficiently.",
          commonCauses: ["Poor sleep quality", "Chronic stress & high cortisol", "Nutrient deficiencies (B12, iron, omega-3)", "Gut microbiome imbalance", "Systemic inflammation"],
          researchInsight: "A 2022 study in Nature Medicine found that neuroinflammation and reduced cerebral blood flow are key drivers of brain fog, and that interventions targeting mitochondrial function and oxidative stress show the most consistent improvements.",
        },
      },
      {
        id: "poor-focus",
        label: "Poor focus",
        zone: "brain",
        icon: "\u{1F3AF}",
        matchTags: ["Focus", "Cognitive", "Cognitive Enhancement", "Cognitive Health"],
        matchOutcomes: ["Cognitive Function", "Cognitive Enhancement", "ADHD Symptom Improvement", "Cognitive Performance & Memory"],
        education: {
          summary: "Difficulty sustaining attention, frequent mind-wandering, and trouble completing tasks. Modern lifestyles with constant digital stimulation can progressively erode our capacity for deep, sustained focus.",
          commonCauses: ["Digital overstimulation", "Sleep deprivation", "Low dopamine or norepinephrine", "Blood sugar fluctuations", "Chronic multitasking"],
          researchInsight: "Research published in PNAS shows that sustained attention relies on optimal prefrontal cortex dopamine levels. Both nootropic compounds and structured mindfulness practices have demonstrated measurable improvements in sustained attention tasks.",
        },
      },
      {
        id: "memory-decline",
        label: "Memory issues",
        zone: "brain",
        icon: "\u{1F4AD}",
        matchTags: ["Cognitive", "Brain Health", "Neuroprotection", "Neuroplasticity"],
        matchOutcomes: ["Cognitive Function", "Neuroprotection", "Brain Health", "Cognitive Performance & Memory", "Cognitive Function (Lion's Mane)"],
        education: {
          summary: "Age-related memory decline involves difficulty forming new memories, slower recall, and reduced ability to retain learned information. While some decline is normal after 30, accelerated decline is often preventable.",
          commonCauses: ["Normal aging & reduced neuroplasticity", "Chronic stress (cortisol damages hippocampus)", "Poor cardiovascular health", "Lack of mental stimulation", "Oxidative stress & inflammation"],
          researchInsight: "A landmark study in Neurology demonstrated that adults who engage in cognitively stimulating activities and maintain cardiovascular fitness show 32% slower memory decline. Lion's Mane mushroom has shown particular promise for stimulating nerve growth factor (NGF) production.",
        },
      },
      {
        id: "anxiety",
        label: "Anxiety & worry",
        zone: "brain",
        icon: "\u{1F61F}",
        matchTags: ["Anxiety", "Stress", "Mental Health", "Nervous System", "Relaxation"],
        matchOutcomes: ["Anxiety Reduction", "Anxiety & Stress Reduction", "Anxiety & OCD Symptom Reduction", "Stress Reduction", "Stress & Anxiety"],
        education: {
          summary: "Persistent worry, restlessness, and a heightened state of alertness that can manifest physically as tension, rapid heartbeat, and difficulty relaxing. Anxiety is one of the most common mental health concerns worldwide.",
          commonCauses: ["Overactive sympathetic nervous system", "HPA axis dysregulation", "Gut-brain axis imbalance", "Magnesium & GABA deficiency", "Unprocessed trauma or chronic stress"],
          researchInsight: "Meta-analyses in JAMA Psychiatry show that adaptogenic herbs (ashwagandha, rhodiola) reduce cortisol by 23-30% in clinical trials, while breathwork techniques can shift autonomic nervous system balance within minutes.",
        },
      },
      {
        id: "low-mood",
        label: "Low mood",
        zone: "brain",
        icon: "\u2601\uFE0F",
        matchTags: ["Mental Health", "Mood", "Depression", "Stress"],
        matchOutcomes: ["Energy & Mood", "Emotional Regulation", "Mild-to-Moderate Depression (St John's Wort)", "Treatment-Resistant Depression", "Stress & Mood Regulation"],
        education: {
          summary: "Persistent feelings of sadness, low energy, reduced interest in activities, and emotional flatness. Beyond clinical depression, many people experience subclinical low mood that significantly impacts quality of life.",
          commonCauses: ["Serotonin or dopamine imbalances", "Vitamin D deficiency", "Chronic inflammation", "Lack of physical activity", "Social isolation & poor sleep"],
          researchInsight: "Research in The Lancet Psychiatry found that regular exercise is as effective as SSRIs for mild-to-moderate depression. Omega-3 fatty acids (EPA specifically) and vitamin D supplementation also show significant mood-lifting effects in deficient populations.",
        },
      },
      {
        id: "low-motivation",
        label: "Low motivation",
        zone: "brain",
        icon: "\u{1F50B}",
        matchTags: ["Energy", "Cognitive", "Mental Resilience", "Adaptogen"],
        matchOutcomes: ["Energy & Vitality", "Energy & Mood", "Cognitive Enhancement", "Norepinephrine Boost"],
        education: {
          summary: "A persistent lack of drive, ambition, and the internal push to take action. Often mistaken for laziness, low motivation frequently has biological roots in neurotransmitter imbalances and cellular energy production.",
          commonCauses: ["Low dopamine signaling", "Adrenal fatigue & cortisol dysregulation", "Mitochondrial dysfunction", "Iron or B-vitamin deficiencies", "Burnout & chronic stress"],
          researchInsight: "Neuroscience research shows that motivation is primarily driven by dopamine signaling in the nucleus accumbens. Adaptogens like rhodiola rosea have been shown to increase dopamine sensitivity, while CoQ10 and NAD+ precursors support the cellular energy production that underlies sustained drive.",
        },
      },
    ],
  },
  {
    zone: "heart",
    label: "Heart & Stress",
    icon: "\u2764\uFE0F",
    description: "Stress resilience, cardiovascular health & emotional balance",
    followUpQuestion: "How would you describe your stress levels lately?",
    concerns: [
      {
        id: "chronic-stress",
        label: "Chronic stress",
        zone: "heart",
        icon: "\u{1F624}",
        matchTags: ["Stress", "Relaxation", "Mental Health", "Adaptogen", "Adrenal"],
        matchOutcomes: ["Stress Reduction", "Stress & Anxiety", "Stress & Mood Regulation", "Relaxation & Stress", "Inflammation / Cortisol"],
        education: {
          summary: "When stress becomes chronic, your body stays in fight-or-flight mode. Elevated cortisol damages the immune system, disrupts sleep, accelerates aging, and increases risk of cardiovascular disease and metabolic disorders.",
          commonCauses: ["Work pressure & lack of boundaries", "Financial uncertainty", "Sleep deprivation", "Overstimulation from technology", "Perfectionism & people-pleasing"],
          researchInsight: "A 2023 meta-analysis in Psychoneuroendocrinology found that ashwagandha supplementation reduces cortisol levels by an average of 23% and significantly improves stress resilience scores. Cold exposure therapy also shows rapid cortisol normalization.",
        },
      },
      {
        id: "poor-hrv",
        label: "Low HRV / recovery",
        zone: "heart",
        icon: "\u{1F4C9}",
        matchTags: ["HRV", "Recovery", "Cardiovascular", "Heart Health"],
        matchOutcomes: ["HRV Improvement", "Heart Rate Variability Improvement", "Recovery", "Cardiovascular Health"],
        education: {
          summary: "Heart rate variability (HRV) measures the variation in time between heartbeats. Higher HRV indicates better autonomic nervous system flexibility and resilience. Low HRV is associated with increased mortality risk and poor stress recovery.",
          commonCauses: ["Chronic stress & sympathetic dominance", "Poor sleep quality", "Overtraining or under-recovery", "Alcohol & processed food", "Sedentary lifestyle"],
          researchInsight: "Studies in the European Heart Journal show that HRV is one of the strongest predictors of all-cause mortality. Interventions like coherent breathing (5.5 breaths/min), cold exposure, and omega-3 supplementation consistently improve HRV within weeks.",
        },
      },
      {
        id: "blood-pressure",
        label: "Blood pressure concerns",
        zone: "heart",
        icon: "\u{1FA7A}",
        matchTags: ["Cardiovascular", "Blood Pressure", "Heart Health", "Blood"],
        matchOutcomes: ["Blood Pressure Reduction", "Cardiovascular Health", "Cardiovascular Protection", "Cardiovascular & Circulatory Benefits"],
        education: {
          summary: "Elevated blood pressure (hypertension) is often called the 'silent killer' because it damages blood vessels, heart, kidneys, and brain without obvious symptoms. Optimal blood pressure is below 120/80 mmHg.",
          commonCauses: ["High sodium intake", "Chronic stress", "Excess body weight", "Sedentary lifestyle", "Genetic predisposition"],
          researchInsight: "The DASH diet trial and subsequent research show that combining dietary changes (potassium, magnesium, reduced sodium) with regular aerobic exercise can reduce systolic BP by 10-15 mmHg \u2014 comparable to a single medication.",
        },
      },
      {
        id: "emotional-regulation",
        label: "Emotional ups & downs",
        zone: "heart",
        icon: "\u{1F3AD}",
        matchTags: ["Stress", "Mental Health", "Anxiety", "Mindfulness", "Mind-Body"],
        matchOutcomes: ["Emotional Regulation", "Stress & Mood Regulation", "Autonomic Nervous System Regulation", "PTSD & Trauma Symptom Reduction"],
        education: {
          summary: "Difficulty managing emotional responses, mood swings, and feeling overwhelmed by feelings. Emotional dysregulation often reflects nervous system imbalance rather than character weakness.",
          commonCauses: ["Autonomic nervous system dysregulation", "Unresolved trauma", "Hormonal fluctuations", "Sleep deprivation", "Blood sugar instability"],
          researchInsight: "Research in Frontiers in Psychology demonstrates that vagal tone (measured via HRV) strongly predicts emotional regulation capacity. Practices that stimulate the vagus nerve \u2014 including breathwork, cold exposure, and meditation \u2014 measurably improve emotional resilience.",
        },
      },
      {
        id: "burnout",
        label: "Burnout & fatigue",
        zone: "heart",
        icon: "\u{1F525}",
        matchTags: ["Energy", "Stress", "Adaptogen", "Adrenal", "Recovery"],
        matchOutcomes: ["Energy & Vitality", "Stress Reduction", "Adrenal Support", "Energy & Mood"],
        education: {
          summary: "Burnout is a state of complete physical, emotional, and mental exhaustion caused by prolonged stress. It goes beyond tiredness \u2014 it involves cynicism, detachment, and a sense that nothing you do makes a difference.",
          commonCauses: ["Prolonged work overload", "Lack of autonomy or recognition", "HPA axis exhaustion", "Depleted micronutrient stores", "No recovery practices"],
          researchInsight: "The WHO recognizes burnout as an occupational phenomenon. Research shows that adaptogenic herbs restore HPA axis function, while NAD+ and CoQ10 supplementation can address the mitochondrial dysfunction that underlies the physical exhaustion component.",
        },
      },
    ],
  },
  {
    zone: "lungs",
    label: "Lungs & Breath",
    icon: "\u{1FAC1}",
    description: "Respiratory health, oxygen efficiency & recovery capacity",
    followUpQuestion: "Is this related to exercise performance or general wellness?",
    concerns: [
      {
        id: "low-endurance",
        label: "Low endurance",
        zone: "lungs",
        icon: "\u{1F3C3}",
        matchTags: ["Endurance", "Cardio", "VO2 Max", "Performance", "Oxygen"],
        matchOutcomes: ["Aerobic Capacity (VO2 Max)", "Muscular Endurance & Strength", "Respiratory Function"],
        education: {
          summary: "Low cardiovascular endurance means your body struggles to deliver and use oxygen efficiently during sustained activity. VO2 max \u2014 your maximum oxygen uptake \u2014 is one of the strongest predictors of longevity.",
          commonCauses: ["Sedentary lifestyle", "Poor mitochondrial function", "Low iron or hemoglobin", "Deconditioning after illness", "Suboptimal breathing mechanics"],
          researchInsight: "A 2018 study in JAMA Network Open found that VO2 max is the single strongest predictor of all-cause mortality \u2014 even stronger than smoking, diabetes, or heart disease. Every 1 MET increase in fitness reduces mortality risk by approximately 13%.",
        },
      },
      {
        id: "poor-recovery",
        label: "Slow exercise recovery",
        zone: "lungs",
        icon: "\u23F1\uFE0F",
        matchTags: ["Recovery", "Sports Recovery", "Oxygen", "Rehabilitation"],
        matchOutcomes: ["Post-Exercise Recovery", "Athletic Recovery", "Exercise Recovery & DOMS Reduction", "Recovery & Soreness", "Sports Recovery (DOMS)"],
        education: {
          summary: "Delayed recovery after exercise \u2014 persistent soreness, fatigue, and reduced performance in subsequent sessions \u2014 often indicates that your body's repair systems are overwhelmed or under-resourced.",
          commonCauses: ["Inadequate sleep", "Poor nutrition & protein timing", "Excessive training volume", "Chronic inflammation", "Dehydration & electrolyte imbalance"],
          researchInsight: "Research in the Journal of Strength & Conditioning shows that cold water immersion reduces DOMS by 20% and accelerates return to baseline performance. Peptides like BPC-157 and TB-500 are showing promise in accelerating tissue repair at the cellular level.",
        },
      },
      {
        id: "breathing-issues",
        label: "Breathing quality",
        zone: "lungs",
        icon: "\u{1F4A8}",
        matchTags: ["Respiratory", "Oxygen", "Mind-Body"],
        matchOutcomes: ["Respiratory Function", "Mitochondrial Function & Oxygen Efficiency"],
        education: {
          summary: "Most people breathe suboptimally \u2014 using only a fraction of their lung capacity, mouth breathing, or with shallow chest patterns. Proper breathing directly impacts oxygen delivery, stress response, and cellular energy production.",
          commonCauses: ["Mouth breathing habit", "Poor posture", "Chronic stress (shallow breathing)", "Nasal congestion", "Weak diaphragm engagement"],
          researchInsight: "James Nestor's research, published in his book 'Breath' and supported by Stanford studies, demonstrates that switching from mouth to nasal breathing can increase nitric oxide production by 6x, improving oxygen absorption by 10-15% and reducing blood pressure.",
        },
      },
      {
        id: "oxygen-performance",
        label: "Oxygen & performance",
        zone: "lungs",
        icon: "\u26F0\uFE0F",
        matchTags: ["Oxygen", "Performance", "Mitochondria", "VO2 Max", "Sports Performance"],
        matchOutcomes: ["Mitochondrial Function & Oxygen Efficiency", "Aerobic Capacity (VO2 Max)", "Mitochondrial Function"],
        education: {
          summary: "Your cells' ability to use oxygen efficiently determines your physical and cognitive performance ceiling. Mitochondrial health and oxygen delivery systems are the bottleneck for human performance at every level.",
          commonCauses: ["Mitochondrial dysfunction", "Low CoQ10 or NAD+ levels", "Iron deficiency", "Altitude deconditioning", "Aging-related decline"],
          researchInsight: "Hyperbaric oxygen therapy (HBOT) has been shown in Tel Aviv University research to lengthen telomeres by 20% and clear 37% of senescent cells in aging adults. This suggests oxygen-based interventions may directly impact biological aging.",
        },
      },
    ],
  },
  {
    zone: "gut",
    label: "Gut & Digestion",
    icon: "\u{1F34E}",
    description: "Digestive health, microbiome, metabolism & nutrient absorption",
    followUpQuestion: "Do you experience digestive discomfort regularly?",
    concerns: [
      {
        id: "gut-issues",
        label: "Digestive problems",
        zone: "gut",
        icon: "\u{1F623}",
        matchTags: ["Gut", "Gut Health", "Digestion", "IBS", "Microbiome"],
        matchOutcomes: ["Gut Healing & Repair", "Digestive Health & Gut Function", "Digestive Symptom Relief", "IBS Symptom Relief", "Gut Health & Digestive Improvement"],
        education: {
          summary: "Digestive issues encompass a range of symptoms from bloating and gas to irregular bowel movements and food sensitivities. The gut is increasingly recognized as central to overall health, housing 70% of your immune system and producing 90% of your serotonin.",
          commonCauses: ["Dysbiosis (imbalanced gut bacteria)", "Leaky gut (intestinal permeability)", "Food sensitivities", "Low stomach acid or enzyme production", "Chronic stress & vagus nerve dysfunction"],
          researchInsight: "A 2023 study in Cell Host & Microbe found that gut microbiome diversity is one of the strongest predictors of healthy aging. Peptides like BPC-157 have shown remarkable gut-healing properties in clinical research, with community reports of significant improvement within 3 weeks.",
        },
      },
      {
        id: "bloating",
        label: "Bloating & discomfort",
        zone: "gut",
        icon: "\u{1F388}",
        matchTags: ["Gut", "Gut Health", "Digestion", "IBS"],
        matchOutcomes: ["Digestive Symptom Relief", "IBS Symptom Relief", "Gut Inflammation", "Intestinal Barrier Repair"],
        education: {
          summary: "Bloating is excess gas or fluid retention in the digestive tract causing abdominal distension and discomfort. While occasionally normal, chronic bloating often signals underlying digestive dysfunction that can be addressed.",
          commonCauses: ["SIBO (small intestinal bacterial overgrowth)", "Food intolerances (FODMAPs, gluten, dairy)", "Low digestive enzyme production", "Gut motility issues", "Intestinal inflammation"],
          researchInsight: "Research in Gastroenterology shows that a low-FODMAP diet reduces bloating symptoms in 75% of IBS patients. Probiotic strains (especially Lactobacillus and Bifidobacterium) combined with gut-healing compounds show additive benefits.",
        },
      },
      {
        id: "weight-management",
        label: "Weight management",
        zone: "gut",
        icon: "\u2696\uFE0F",
        matchTags: ["Weight Loss", "Fat Loss", "Body Composition", "Metabolic", "Metabolic Health", "Visceral Fat"],
        matchOutcomes: ["Weight Loss", "Fat Loss", "Weight Management", "Visceral Fat Reduction", "Body Composition", "Weight Loss Enhancement"],
        education: {
          summary: "Sustainable weight management goes far beyond calories in vs. out. It involves optimizing metabolic hormones (insulin, leptin, GLP-1), gut microbiome composition, sleep quality, stress levels, and body composition rather than just scale weight.",
          commonCauses: ["Insulin resistance", "Hormonal imbalance (thyroid, cortisol)", "Poor sleep (disrupts hunger hormones)", "Gut microbiome composition", "Chronic inflammation & metabolic dysfunction"],
          researchInsight: "GLP-1 receptor agonists (like semaglutide) have revolutionized weight management, showing 15-20% body weight reduction in clinical trials. However, research also shows that metabolic health markers improve significantly with targeted supplementation, fasting protocols, and body composition optimization.",
        },
      },
      {
        id: "blood-sugar",
        label: "Blood sugar balance",
        zone: "gut",
        icon: "\u{1F4CA}",
        matchTags: ["Blood Sugar", "Glucose", "Metabolic", "Diabetes", "Metabolic Health"],
        matchOutcomes: ["Blood Sugar Control", "Glycemic Control", "Metabolic Health", "Diabetes Prevention", "Glycemic Variability Awareness"],
        education: {
          summary: "Blood sugar stability is foundational to energy, mood, cognitive function, and long-term health. Large glucose spikes and crashes drive inflammation, accelerate aging, and increase risk of type 2 diabetes and cardiovascular disease.",
          commonCauses: ["Refined carbohydrate-heavy diet", "Insulin resistance", "Sedentary lifestyle", "Chronic stress (cortisol raises blood sugar)", "Poor meal timing & composition"],
          researchInsight: "Continuous glucose monitor (CGM) research by Levels Health and others shows that individual glycemic responses vary enormously \u2014 the same food can cause a spike in one person and not another. Berberine has shown blood sugar-lowering effects comparable to metformin in multiple clinical trials.",
        },
      },
      {
        id: "inflammation",
        label: "Chronic inflammation",
        zone: "gut",
        icon: "\u{1F525}",
        matchTags: ["Inflammation", "Immune", "Gut", "Antioxidant"],
        matchOutcomes: ["Inflammation Reduction", "Inflammation", "Immune Function", "Oxidative Stress Reduction", "Inflammation & Immune Modulation", "Oxidative Stress / Inflammation"],
        education: {
          summary: "Chronic low-grade inflammation is now recognized as the root driver of virtually every age-related disease \u2014 from heart disease and cancer to Alzheimer's and autoimmunity. Unlike acute inflammation (which heals), chronic inflammation silently damages tissues over years.",
          commonCauses: ["Processed food & seed oils", "Gut permeability (leaky gut)", "Visceral fat (produces inflammatory cytokines)", "Poor sleep", "Environmental toxins & oxidative stress"],
          researchInsight: "Research in Nature Medicine identifies 'inflammaging' as a primary driver of biological aging. Curcumin, omega-3s, and NAD+ precursors have the strongest clinical evidence for reducing systemic inflammatory markers like CRP and IL-6.",
        },
      },
      {
        id: "nutrient-absorption",
        label: "Nutrient absorption",
        zone: "gut",
        icon: "\u{1F9EA}",
        matchTags: ["Nutrition", "Vitamins", "Supplements", "Gut Health", "Personalized Medicine"],
        matchOutcomes: ["Personalized Nutrient Optimization", "Digestive Health & Gut Function", "Personalized Nutrition", "Digestive & Metabolic Health"],
        education: {
          summary: "Even with a perfect diet, compromised gut health can prevent proper nutrient absorption. Many people are unknowingly deficient in key micronutrients due to gut inflammation, low stomach acid, or genetic variations in nutrient metabolism.",
          commonCauses: ["Gut inflammation reducing absorption surface", "Low stomach acid (common with age)", "Genetic SNPs affecting nutrient metabolism", "Medications depleting nutrients", "Processed food lacking micronutrient density"],
          researchInsight: "Personalized nutrition research from the Weizmann Institute shows that genetic variations (like MTHFR) can dramatically affect how individuals process B vitamins, folate, and other nutrients. Blood testing combined with gut health optimization provides the most targeted approach.",
        },
      },
    ],
  },
  {
    zone: "muscles",
    label: "Muscles & Joints",
    icon: "\u{1F4AA}",
    description: "Physical performance, pain relief, joint health & mobility",
    followUpQuestion: "Is this related to an injury, aging, or general fitness?",
    concerns: [
      {
        id: "joint-pain",
        label: "Joint pain & stiffness",
        zone: "muscles",
        icon: "\u{1F9B4}",
        matchTags: ["Joint", "Joint Health", "Joints", "Musculoskeletal", "Pain"],
        matchOutcomes: ["Joint Repair", "Joint & Cartilage Repair", "Joint Pain & Osteoarthritis", "Knee Osteoarthritis", "Joint-Friendly Conditioning"],
        education: {
          summary: "Joint pain and stiffness can result from cartilage degradation, inflammation, overuse, or autoimmune processes. As the body's most mechanically stressed structures, joints require specific nutritional and recovery support to maintain function.",
          commonCauses: ["Osteoarthritis & cartilage wear", "Chronic inflammation", "Previous injuries", "Sedentary lifestyle (weak supporting muscles)", "Overuse without adequate recovery"],
          researchInsight: "Research in the Annals of Internal Medicine shows that collagen peptide supplementation (10g/day) significantly reduces joint pain and improves function in osteoarthritis. GHK-Cu peptide has demonstrated cartilage regeneration properties in preclinical studies.",
        },
      },
      {
        id: "muscle-recovery",
        label: "Slow muscle recovery",
        zone: "muscles",
        icon: "\u{1F504}",
        matchTags: ["Recovery", "Sports Recovery", "Muscle", "Muscle Endurance"],
        matchOutcomes: ["Muscle Recovery", "Post-Exercise Recovery", "Exercise Recovery & DOMS Reduction", "Sports Recovery (DOMS)", "Recovery & Soreness"],
        education: {
          summary: "Delayed onset muscle soreness (DOMS) and slow recovery between training sessions limit your ability to maintain consistent exercise. Recovery is when adaptation actually happens \u2014 without it, training becomes counterproductive.",
          commonCauses: ["Insufficient protein intake", "Poor sleep quality", "Overtraining without periodization", "Chronic inflammation", "Low magnesium or zinc levels"],
          researchInsight: "A systematic review in Sports Medicine found that cold water immersion, compression garments, and tart cherry juice each reduce DOMS by 15-20%. Peptide therapies (BPC-157, TB-500) show accelerated tissue repair in both animal and emerging human studies.",
        },
      },
      {
        id: "chronic-pain",
        label: "Chronic body pain",
        zone: "muscles",
        icon: "\u{1F616}",
        matchTags: ["Pain", "Pain Management", "Inflammation", "Musculoskeletal"],
        matchOutcomes: ["Pain Reduction", "Chronic Pain Reduction", "Pain Relief", "Low Back Pain", "Musculoskeletal Pain Relief", "Chronic Pain Management", "Chronic Pain & Tension Release"],
        education: {
          summary: "Chronic pain persists beyond normal healing time and involves changes in how your nervous system processes pain signals. It affects 1 in 5 adults and is the leading cause of disability worldwide, but modern approaches offer new pathways to relief.",
          commonCauses: ["Central sensitization (nervous system amplifying pain)", "Chronic inflammation", "Poor posture & movement patterns", "Unresolved injuries", "Stress & emotional holding patterns"],
          researchInsight: "Neuroscience research shows chronic pain rewires neural pathways. Interventions combining anti-inflammatory approaches (peptides, red light therapy) with nervous system retraining (breathwork, cold exposure) show better outcomes than either approach alone.",
        },
      },
      {
        id: "strength-building",
        label: "Building strength",
        zone: "muscles",
        icon: "\u{1F3CB}\uFE0F",
        matchTags: ["Muscle", "Strength", "Performance", "Sports Performance", "Growth Hormone", "Fitness"],
        matchOutcomes: ["Muscle Strength & Power", "Strength Gains", "Muscle Performance", "Growth Hormone Release", "Muscular Endurance & Strength"],
        education: {
          summary: "Muscle mass and strength are among the strongest predictors of longevity and healthspan. After age 30, adults lose 3-8% of muscle mass per decade (sarcopenia), making strength maintenance one of the most impactful health investments.",
          commonCauses: ["Age-related muscle loss (sarcopenia)", "Inadequate protein intake", "Low testosterone or growth hormone", "Insufficient resistance training", "Poor recovery & sleep"],
          researchInsight: "Research in the British Journal of Sports Medicine shows that higher grip strength is associated with lower all-cause mortality risk. Growth hormone-releasing peptides and creatine monohydrate are among the most well-researched performance enhancers for strength and muscle mass.",
        },
      },
      {
        id: "flexibility",
        label: "Mobility & flexibility",
        zone: "muscles",
        icon: "\u{1F9D8}",
        matchTags: ["Mobility", "Fascia", "Pilates", "Low-Impact", "Rehabilitation"],
        matchOutcomes: ["Flexibility & Mobility", "Range of Motion & Flexibility", "Postural & Functional Improvement", "Balance & Fall Prevention"],
        education: {
          summary: "Mobility \u2014 the ability to move joints through their full range of motion with control \u2014 is distinct from flexibility. Good mobility prevents injuries, reduces pain, and maintains functional independence as you age.",
          commonCauses: ["Sedentary work (prolonged sitting)", "Fascial adhesions & tissue stiffness", "Previous injuries limiting range", "Age-related collagen changes", "Lack of movement variety"],
          researchInsight: "Research shows that fascia (connective tissue) is a key driver of mobility, not just muscle flexibility. Practices like Pilates, animal flow, and myofascial release work directly on fascial tissue, showing superior mobility improvements compared to static stretching alone.",
        },
      },
    ],
  },
  {
    zone: "fullBody",
    label: "Sleep, Energy & Aging",
    icon: "\u2728",
    description: "Sleep quality, vitality, longevity, skin, hair & immunity",
    followUpQuestion: "What matters most to you right now?",
    concerns: [
      {
        id: "poor-sleep",
        label: "Poor sleep quality",
        zone: "fullBody",
        icon: "\u{1F319}",
        matchTags: ["Sleep"],
        matchOutcomes: ["Sleep Quality", "Sleep Improvement", "Insomnia Resolution (CBT-I)", "Melatonin Regulation", "Sleep Quality Improvement"],
        education: {
          summary: "Sleep is your body's primary repair and regeneration mechanism. Poor sleep quality \u2014 even with adequate hours \u2014 disrupts memory consolidation, immune function, hormone balance, and cellular repair. It accelerates aging at the biological level.",
          commonCauses: ["Blue light exposure before bed", "Irregular sleep schedule", "Stress & racing thoughts", "Room temperature too warm", "Caffeine or alcohol late in the day"],
          researchInsight: "Matthew Walker's research at UC Berkeley shows that just one night of poor sleep reduces natural killer cell activity by 70%. The Eight Sleep pod and similar temperature-regulating devices improve deep sleep by 20-34% in clinical studies.",
        },
      },
      {
        id: "aging-concerns",
        label: "Aging & longevity",
        zone: "fullBody",
        icon: "\u{1F9EC}",
        matchTags: ["Longevity", "Anti-Aging", "Aging", "Geroprotective", "Senolytic", "Telomeres", "Cellular Health"],
        matchOutcomes: ["Lifespan Extension (Animal)", "Biological Age Reversal", "Telomere Maintenance", "Longevity", "Autophagy Activation", "Senescent Cell Clearance", "Anti-Aging", "Anti-Aging (Systemic)", "Cellular Aging & Mitochondrial Function"],
        education: {
          summary: "Biological aging is driven by specific hallmarks: telomere shortening, mitochondrial dysfunction, cellular senescence, and epigenetic changes. Modern longevity science targets these mechanisms directly, and biological age can differ significantly from chronological age.",
          commonCauses: ["Telomere shortening", "Mitochondrial dysfunction", "Accumulation of senescent cells", "Chronic inflammation (inflammaging)", "Epigenetic drift"],
          researchInsight: "David Sinclair's research at Harvard shows that epigenetic reprogramming can reverse biological age markers. Rapamycin, metformin, NAD+ precursors, and senolytic compounds (fisetin, quercetin + dasatinib) are the most researched longevity interventions in human trials.",
        },
      },
      {
        id: "skin-health",
        label: "Skin health & glow",
        zone: "fullBody",
        icon: "\u2728",
        matchTags: ["Skin", "Rejuvenation"],
        matchOutcomes: ["Skin Health", "Skin Rejuvenation", "Skin Brightening", "Skin Protection", "Anti-Aging Skin", "Skin & Hair", "Skin Health & Detoxification"],
        education: {
          summary: "Skin is your largest organ and a visible indicator of internal health. Collagen production declines 1% per year after age 20, while oxidative stress, UV damage, and inflammation accelerate visible aging. True skin health starts from within.",
          commonCauses: ["Collagen degradation (UV, sugar, aging)", "Oxidative stress & free radical damage", "Dehydration & poor gut health", "Hormonal changes", "Nutrient deficiencies (vitamin C, zinc, omega-3)"],
          researchInsight: "A 2019 meta-analysis in the Journal of Drugs in Dermatology found that oral collagen supplementation significantly improves skin elasticity, hydration, and wrinkle depth. GHK-Cu peptide has shown remarkable skin regeneration properties, stimulating collagen synthesis and wound healing.",
        },
      },
      {
        id: "hair-loss",
        label: "Hair thinning & loss",
        zone: "fullBody",
        icon: "\u{1F487}",
        matchTags: ["Hair", "Hair Restoration"],
        matchOutcomes: ["Hair Growth", "Hair Regrowth & Darkening", "Hair Restoration"],
        education: {
          summary: "Hair loss affects both men and women and can result from hormonal changes, nutrient deficiencies, stress, or autoimmune conditions. Hair follicle health depends on adequate blood flow, nutrient delivery, and hormonal balance.",
          commonCauses: ["DHT sensitivity (androgenetic alopecia)", "Iron, zinc, or biotin deficiency", "Thyroid dysfunction", "Chronic stress (telogen effluvium)", "Autoimmune conditions (alopecia areata)"],
          researchInsight: "Red light therapy (650-670nm) has shown significant hair regrowth in multiple randomized controlled trials, increasing hair density by 35-50%. GHK-Cu peptide applied topically stimulates hair follicle growth and has been shown to reverse hair thinning in clinical studies.",
        },
      },
      {
        id: "low-immunity",
        label: "Weak immunity",
        zone: "fullBody",
        icon: "\u{1F6E1}\uFE0F",
        matchTags: ["Immune", "Immunity"],
        matchOutcomes: ["Immune Function", "Immune Support", "Immune Modulation", "Immune Function Enhancement", "Immune Support (Reishi)", "Immune Function & Healthspan", "Immune Function & Systemic Inflammation"],
        education: {
          summary: "A weakened immune system leaves you vulnerable to frequent infections, slow wound healing, and chronic fatigue. The immune system is deeply interconnected with gut health, sleep, stress levels, and nutritional status.",
          commonCauses: ["Poor sleep (reduces NK cell activity)", "Chronic stress (suppresses immune function)", "Gut dysbiosis (70% of immune system is gut-based)", "Vitamin D deficiency", "Sedentary lifestyle"],
          researchInsight: "Research in the Journal of Sport and Health Science shows that moderate exercise boosts immune surveillance by 300%, while overtraining suppresses it. Medicinal mushrooms (reishi, turkey tail) and Thymosin Alpha-1 peptide show significant immune-modulating effects in clinical trials.",
        },
      },
      {
        id: "low-energy",
        label: "Persistent fatigue",
        zone: "fullBody",
        icon: "\u{1FAAB}",
        matchTags: ["Energy", "Mitochondria"],
        matchOutcomes: ["Energy & Vitality", "Energy & Mood", "Energy & Mitochondrial Function", "Mitochondrial Function", "Energy & Aging", "Energy (Cordyceps)"],
        education: {
          summary: "Chronic fatigue that doesn't resolve with rest points to issues at the cellular level \u2014 specifically mitochondrial dysfunction. Your mitochondria produce 90% of your body's energy (ATP), and their decline is a hallmark of aging and disease.",
          commonCauses: ["Mitochondrial dysfunction", "Iron or B12 deficiency", "Thyroid underfunction", "Chronic stress & adrenal fatigue", "Poor sleep quality"],
          researchInsight: "Research in Nature Aging shows that NAD+ levels decline by 50% between ages 40 and 60, directly reducing mitochondrial energy production. NAD+ precursors (NMN, NR), CoQ10, and cordyceps mushroom have all shown significant improvements in cellular energy production and subjective energy levels.",
        },
      },
      {
        id: "detox",
        label: "Detox & reset",
        zone: "fullBody",
        icon: "\u{1F9F9}",
        matchTags: ["Detox", "Heavy Metals", "Lymphatic", "Blood Filtering"],
        matchOutcomes: ["Detoxification", "General Detox / Wellness", "Heavy Metal Removal", "Toxin Removal", "Skin Health & Detoxification"],
        education: {
          summary: "Your body has sophisticated detoxification systems (liver, kidneys, lymphatic system), but modern environmental toxin exposure often exceeds their capacity. Heavy metals, microplastics, pesticides, and industrial chemicals accumulate in tissues over time.",
          commonCauses: ["Environmental pollutants & heavy metals", "Processed food additives", "Microplastic exposure", "Compromised liver detox pathways", "Sluggish lymphatic system"],
          researchInsight: "Research in Environmental Health Perspectives shows that the average person carries over 200 industrial chemicals in their body. Chelation therapy for heavy metals, infrared sauna for toxin excretion through sweat, and glutathione (IV or liposomal) are the most evidence-backed detoxification approaches.",
        },
      },
    ],
  },
];

export function getZoneConfig(zone: BodyZone): ZoneConfig {
  return ZONES.find((z) => z.zone === zone)!;
}
