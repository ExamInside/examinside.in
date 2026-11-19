import { SubjectBlueprint } from './class10Blueprint';
import { SolvedPaper } from './types';

function buildClass12ThreeYearPapers(
  subjectId: string,
  code: string,
  nameHi: string,
  nameEn: string,
  totalMarks: number,
  sampleTopicHi: string,
  sampleTopicEn: string,
  hintHi: string,
  hintEn: string
): SolvedPaper[] {
  return [
    {
      id: `${subjectId}-2026`,
      year: 2026,
      paperTypeHi: '2026 आधिकारिक मॉडल / लीक गेस पेपर PDF',
      paperTypeEn: '2026 Official Guess / Leak Model Paper PDF',
      paperCode: `${code} ML-26`,
      titleHi: `UP बोर्ड कक्षा 12 ${nameHi} 2026 मॉडल लीक पेपर (100% संभावित प्रश्न)`,
      titleEn: `UP Board Class 12 ${nameEn} 2026 Official Model & Leak Paper`,
      totalMarks,
      timeLimit: '3 Hours 15 Mins',
      pdfPages: 18,
      pdfUrl: `https://upmsp.edu.in/ModelPaper2026_Class12_${code}.pdf`,
      sampleSections: [
        {
          sectionNameHi: 'खंड-क: वस्तुनिष्ठ एवं अति लघु उत्तरीय प्रश्न',
          sectionNameEn: 'Section A: Objective MCQs & Very Short Answers',
          questionsCount: 12,
          sampleQHi: `${sampleTopicHi} से 2026 परीक्षा हेतु सर्वाधिक संभावित प्रश्न।`,
          sampleQEn: `Top high-probability 2026 questions from ${sampleTopicEn}.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
        {
          sectionNameHi: 'खंड-ख: दीर्घ उत्तरीय व निगमन (5-8 अंक)',
          sectionNameEn: 'Section B: Long Derivations & Analytical Questions (5-8 Marks)',
          questionsCount: 8,
          sampleQHi: `${sampleTopicHi} के 5 से 8 अंकों वाले गारंटीड निगमन व व्याख्या।`,
          sampleQEn: `Guaranteed 5-8 mark derivations & explanations from ${sampleTopicEn}.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
      ],
    },
    {
      id: `${subjectId}-2025`,
      year: 2025,
      paperTypeHi: '2025 बोर्ड व प्री-बोर्ड हल पेपर PDF',
      paperTypeEn: '2025 Board Solved Official Paper PDF',
      paperCode: `${code} EX-25`,
      titleHi: `UP बोर्ड कक्षा 12 ${nameHi} 2025 सम्पूर्ण हल प्रश्नपत्र`,
      titleEn: `UP Board Class 12 ${nameEn} 2025 Complete Solved Official Paper`,
      totalMarks,
      timeLimit: '3 Hours 15 Mins',
      pdfPages: 20,
      pdfUrl: `https://upmsp.edu.in/SolvedPaper2025_Class12_${code}.pdf`,
      sampleSections: [
        {
          sectionNameHi: 'खंड-क: 2025 आधिकारिक बहुविकल्पीय व 1-अंक प्रश्न',
          sectionNameEn: 'Section A: 2025 Official MCQs & 1-Mark Questions',
          questionsCount: 12,
          sampleQHi: `2025 यूपी बोर्ड पेपर में आए ${sampleTopicHi} के प्रश्न।`,
          sampleQEn: `Actual 2025 UPMSP Board questions on ${sampleTopicEn}.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
        {
          sectionNameHi: 'खंड-ख: 2025 टॉपर स्टेप-वाइज मॉडल उत्तर',
          sectionNameEn: 'Section B: 2025 Step-Marking Model Solutions',
          questionsCount: 8,
          sampleQHi: `${sampleTopicHi} का पूर्ण स्टेप-बाई-स्टेप समाधान।`,
          sampleQEn: `Full step-by-step board rubric answers for ${sampleTopicEn}.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
      ],
    },
    {
      id: `${subjectId}-2024`,
      year: 2024,
      paperTypeHi: '2024 UPMSP बोर्ड हल पेपर PDF',
      paperTypeEn: '2024 UPMSP Board Solved Paper PDF',
      paperCode: `${code} DH-24`,
      titleHi: `UP बोर्ड कक्षा 12 ${nameHi} 2024 वास्तविक बोर्ड पेपर व हल`,
      titleEn: `UP Board Class 12 ${nameEn} 2024 Original Board Paper & Solutions`,
      totalMarks,
      timeLimit: '3 Hours 15 Mins',
      pdfPages: 20,
      pdfUrl: `https://upmsp.edu.in/BoardPaper2024_Class12_${code}.pdf`,
      sampleSections: [
        {
          sectionNameHi: 'खंड-क: 2024 वास्तविक प्रश्न व उत्तर कुंजी',
          sectionNameEn: 'Section A: 2024 Original Paper MCQs & Key',
          questionsCount: 12,
          sampleQHi: `2024 में पूछे गए ${sampleTopicHi} के प्रमुख प्रश्न।`,
          sampleQEn: `Key 2024 Board questions covering ${sampleTopicEn}.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
        {
          sectionNameHi: 'खंड-ख: विस्तृत उत्तर व अंक विभाजन',
          sectionNameEn: 'Section B: Detailed Long Solutions & Marking Scheme',
          questionsCount: 8,
          sampleQHi: `${sampleTopicHi} के विस्तृत हल।`,
          sampleQEn: `Complete long-form solved answers for ${sampleTopicEn}.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
      ],
    },
  ];
}

export const CLASS_12_BLUEPRINTS: SubjectBlueprint[] = [
  // 1. CLASS 12 SAMANYA HINDI (Code 302) - ALL 25+ CHAPTERS (ZERO MISSING!)
  {
    id: 'c12-hindi',
    classLevel: '12',
    code: '302',
    isHindiLanguageSubject: true,
    nameHi: 'सामान्य हिंदी (Code 302 - 25+ अध्याय)',
    nameEn: 'सामान्य हिंदी (Code 302 - सभी 25+ अध्याय)',
    taglineHi: 'गद्य गरिमा (7), काव्यांजलि (8), कथा भारती (4), खण्डकाव्य (6), संस्कृत (8) व व्याकरण',
    taglineEn: 'गद्य गरिमा (7), काव्यांजलि (8), कथा भारती (4), खण्डकाव्य (6), संस्कृत (8) व व्याकरण',
    iconName: 'BookOpen',
    colorTheme: {
      bgLight: 'bg-rose-50/70',
      bgDark: 'dark:bg-rose-950/20',
      borderLight: 'border-rose-200',
      borderDark: 'dark:border-rose-800/40',
      accent: 'text-rose-600 dark:text-rose-400',
      text: 'hover:border-rose-400',
    },
    chapterDetails: [
      // गद्य गरिमा (7 Chapters)
      {
        id: 'c12h-g1', number: 1, sectionHi: 'गद्य गरिमा (7 अध्याय)', sectionEn: 'गद्य गरिमा (7 अध्याय)',
        titleHi: 'राष्ट्र का स्वरूप', titleEn: 'राष्ट्र का स्वरूप',
        authorOrTopicHi: 'डॉ. वासुदेवशरण अग्रवाल', authorOrTopicEn: 'डॉ. वासुदेवशरण अग्रवाल',
        keyFocusHi: 'भूमि, जन और संस्कृति — राष्ट्र के तीन अंग (10 अंक गद्यांश व 5 अंक साहित्यिक परिचय)',
        keyFocusEn: 'भूमि, जन और संस्कृति — राष्ट्र के तीन अंग (10 अंक गद्यांश व 5 अंक साहित्यिक परिचय)',
        boardWeightage: '10+5 Marks Fixed',
        formulaOrTrickHi: 'मुख्य पंक्ति: "भूमि का निर्माण देवों ने किया है, वह अनंत काल से है।" — माता भूमिः पुत्रोऽहं पृथिव्याः।',
        formulaOrTrickEn: 'मुख्य पंक्ति: "भूमि का निर्माण देवों ने किया है, वह अनंत काल से है।" — माता भूमिः पुत्रोऽहं पृथिव्याः।'
      },
      {
        id: 'c12h-g2', number: 2, sectionHi: 'गद्य गरिमा (7 अध्याय)', sectionEn: 'गद्य गरिमा (7 अध्याय)',
        titleHi: 'रॉबर्ट नर्सिंग होम में', titleEn: 'रॉबर्ट नर्सिंग होम में',
        authorOrTopicHi: 'कन्हैयालाल मिश्र "प्रभाकर"', authorOrTopicEn: 'कन्हैयालाल मिश्र "प्रभाकर"',
        keyFocusHi: 'मदर टेरेसा, मदर मार्गरेट व क्रिस्टहेल्ड का मानवीय करुणा व सेवा रिपोर्ताज',
        keyFocusEn: 'मदर टेरेसा, मदर मार्गरेट व क्रिस्टहेल्ड का मानवीय करुणा व सेवा रिपोर्ताज',
        boardWeightage: 'High MCQ + Gadyansh'
      },
      {
        id: 'c12h-g3', number: 3, sectionHi: 'गद्य गरिमा (7 अध्याय)', sectionEn: 'गद्य गरिमा (7 अध्याय)',
        titleHi: 'अशोक के फूल', titleEn: 'अशोक के फूल',
        authorOrTopicHi: 'डॉ. हजारी प्रसाद द्विवेदी', authorOrTopicEn: 'डॉ. हजारी प्रसाद द्विवेदी',
        keyFocusHi: 'भारतीय संस्कृति की समन्वय दृष्टि व दुर्दमनीय जिजीविषा (10 अंक गद्यांश व साहित्यिक परिचय)',
        keyFocusEn: 'भारतीय संस्कृति की समन्वय दृष्टि व दुर्दमनीय जिजीविषा (10 अंक गद्यांश व साहित्यिक परिचय)',
        boardWeightage: '10+5 Marks Fixed'
      },
      {
        id: 'c12h-g4', number: 4, sectionHi: 'गद्य गरिमा (7 अध्याय)', sectionEn: 'गद्य गरिमा (7 अध्याय)',
        titleHi: 'भाषा और आधुनिकता', titleEn: 'भाषा और आधुनिकता',
        authorOrTopicHi: 'प्रो. जी. सुंदर रेड्डी', authorOrTopicEn: 'प्रो. जी. सुंदर रेड्डी',
        keyFocusHi: 'रमणीयता व नित्य नूतनता — भाषा एक परिवर्तनशील और गतिशील धारा है',
        keyFocusEn: 'रमणीयता व नित्य नूतनता — भाषा एक परिवर्तनशील और गतिशील धारा है',
        boardWeightage: '10 Marks High-Yield'
      },
      {
        id: 'c12h-g5', number: 5, sectionHi: 'गद्य गरिमा (7 अध्याय)', sectionEn: 'गद्य गरिमा (7 अध्याय)',
        titleHi: 'निंदा रस', titleEn: 'निंदा रस',
        authorOrTopicHi: 'हरिशंकर परसाई', authorOrTopicEn: 'हरिशंकर परसाई',
        keyFocusHi: 'धृतराष्ट्र व भीम का पुतला प्रसंग — ईर्ष्या, द्वेष एवं परनिंदा पर तीखा व्यंग्य',
        keyFocusEn: 'धृतराष्ट्र व भीम का पुतला प्रसंग — ईर्ष्या, द्वेष एवं परनिंदा पर तीखा व्यंग्य',
        boardWeightage: '4-10 Marks'
      },
      {
        id: 'c12h-g6', number: 6, sectionHi: 'गद्य गरिमा (7 अध्याय)', sectionEn: 'गद्य गरिमा (7 अध्याय)',
        titleHi: 'हम और हमारा आदर्श (तेजस्वी मन के अंश)', titleEn: 'हम और हमारा आदर्श (तेजस्वी मन के अंश)',
        authorOrTopicHi: 'डॉ. ए.पी.जे. अब्दुल कलाम', authorOrTopicEn: 'डॉ. ए.पी.जे. अब्दुल कलाम',
        keyFocusHi: 'विकसित भारत का सपना, महत्वाकांक्षी लक्ष्य व युवा ऊर्जा का सकारात्मक उपयोग',
        keyFocusEn: 'विकसित भारत का सपना, महत्वाकांक्षी लक्ष्य व युवा ऊर्जा का सकारात्मक उपयोग',
        boardWeightage: '5+ Marks'
      },
      {
        id: 'c12h-g7', number: 7, sectionHi: 'गद्य गरिमा (7 अध्याय)', sectionEn: 'गद्य गरिमा (7 अध्याय)',
        titleHi: 'प्रगति के मानदण्ड', titleEn: 'प्रगति के मानदण्ड',
        authorOrTopicHi: 'पंडित दीनदयाल उपाध्याय', authorOrTopicEn: 'पंडित दीनदयाल उपाध्याय',
        keyFocusHi: 'एकात्म मानववाद, धर्म-अर्थ-काम-मोक्ष संतुलन व मानव कल्याण',
        keyFocusEn: 'एकात्म मानववाद, धर्म-अर्थ-काम-मोक्ष संतुलन व मानव कल्याण',
        boardWeightage: '4 Marks'
      },
      // काव्यांजलि (8 Chapters)
      {
        id: 'c12h-k1', number: 8, sectionHi: 'काव्यांजलि (8 अध्याय)', sectionEn: 'काव्यांजलि (8 अध्याय)',
        titleHi: 'पवन-दूतिका', titleEn: 'पवन-दूतिका',
        authorOrTopicHi: 'अयोध्यासिंह उपाध्याय "हरिऔध" (प्रियप्रवास)', authorOrTopicEn: 'अयोध्यासिंह उपाध्याय "हरिऔध" (प्रियप्रवास)',
        keyFocusHi: 'राधा का लोकसेविका स्वरूप — पवन को दूत बनाकर मथुरा भेजना (10 अंक पद्यांश पक्का)',
        keyFocusEn: 'राधा का लोकसेविका स्वरूप — पवन को दूत बनाकर मथुरा भेजना (10 अंक पद्यांश पक्का)',
        boardWeightage: '10+5 Marks Fixed',
        poemsOrShlokasHi: ['बैठी खिन्ना यक दिवस वे गेह में थीं अकेली। आके आँसू दृग-युगल में थे धरा को भिगोते।।'],
        poemsOrShlokasEn: ['बैठी खिन्ना यक दिवस वे गेह में थीं अकेली। आके आँसू दृग-युगल में थे धरा को भिगोते।।']
      },
      {
        id: 'c12h-k2', number: 9, sectionHi: 'काव्यांजलि (8 अध्याय)', sectionEn: 'काव्यांजलि (8 अध्याय)',
        titleHi: 'कैकेयी का अनुताप एवं गीत', titleEn: 'कैकेयी का अनुताप एवं गीत',
        authorOrTopicHi: 'मैथिलीशरण गुप्त (साकेत महाकाव्य)', authorOrTopicEn: 'मैथिलीशरण गुप्त (साकेत महाकाव्य)',
        keyFocusHi: 'कुमाता न होने की आत्मग्लानि, "तदंतर बैठी सभा उटज के आगे..." (10 अंक पद्यांश)',
        keyFocusEn: 'कुमाता न होने की आत्मग्लानि, "तदंतर बैठी सभा उटज के आगे..." (10 अंक पद्यांश)',
        boardWeightage: '10+5 Marks Fixed'
      },
      {
        id: 'c12h-k3', number: 10, sectionHi: 'काव्यांजलि (8 अध्याय)', sectionEn: 'काव्यांजलि (8 अध्याय)',
        titleHi: 'श्रद्धा-मनु एवं गीत', titleEn: 'श्रद्धा-मनु एवं गीत',
        authorOrTopicHi: 'जयशंकर प्रसाद (कामायनी)', authorOrTopicEn: 'जयशंकर प्रसाद (कामायनी)',
        keyFocusHi: '"कौन तुम संसृति-जलनिधि तीर..." — निराश मनु को श्रद्धा का कर्मयोग संदेश',
        keyFocusEn: '"कौन तुम संसृति-जलनिधि तीर..." — निराश मनु को श्रद्धा का कर्मयोग संदेश',
        boardWeightage: '10+5 Marks High-Yield'
      },
      {
        id: 'c12h-k4', number: 11, sectionHi: 'काव्यांजलि (8 अध्याय)', sectionEn: 'काव्यांजलि (8 अध्याय)',
        titleHi: 'नौका-विहार, बापू के प्रति एवं परिवर्तन', titleEn: 'नौका-विहार, बापू के प्रति एवं परिवर्तन',
        authorOrTopicHi: 'सुमित्रानंदन पंत', authorOrTopicEn: 'सुमित्रानंदन पंत',
        keyFocusHi: 'कालाकांकर गंगा नौका-विहार सौंदर्य, "तुम मांसहीन तुम रक्तहीन..." (गांधी वंदना)',
        keyFocusEn: 'कालाकांकर गंगा नौका-विहार सौंदर्य, "तुम मांसहीन तुम रक्तहीन..." (गांधी वंदना)',
        boardWeightage: '10 Marks'
      },
      {
        id: 'c12h-k5', number: 12, sectionHi: 'काव्यांजलि (8 अध्याय)', sectionEn: 'काव्यांजलि (8 अध्याय)',
        titleHi: 'गीत (मैं नीर भरी दुख की बदली / चिर सजग आँखें)', titleEn: 'गीत (महादेवी वर्मा)',
        authorOrTopicHi: 'महादेवी वर्मा (यामा / सांध्यगीत)', authorOrTopicEn: 'महादेवी वर्मा (यामा / सांध्यगीत)',
        keyFocusHi: '"चिर सजग आँखें उनींदी, आज कैसा व्यस्त बाना" — साधना पथ पर जागरण संदेश',
        keyFocusEn: '"चिर सजग आँखें उनींदी, आज कैसा व्यस्त बाना" — साधना पथ पर जागरण संदेश',
        boardWeightage: '10+5 Marks'
      },
      {
        id: 'c12h-k6', number: 13, sectionHi: 'काव्यांजलि (8 अध्याय)', sectionEn: 'काव्यांजलि (8 अध्याय)',
        titleHi: 'पुरुरवा, उर्वशी एवं अभिनव मनुष्य', titleEn: 'पुरुरवा, उर्वशी एवं अभिनव मनुष्य',
        authorOrTopicHi: 'रामधारी सिंह "दिनकर"', authorOrTopicEn: 'रामधारी सिंह "दिनकर"',
        keyFocusHi: 'आधुनिक विज्ञान पर मानव का विजय रथ, पर श्रेय मानवीय प्रेम में ही है',
        keyFocusEn: 'आधुनिक विज्ञान पर मानव का विजय रथ, पर श्रेय मानवीय प्रेम में ही है',
        boardWeightage: '5+ Marks'
      },
      {
        id: 'c12h-k7', number: 14, sectionHi: 'काव्यांजलि (8 अध्याय)', sectionEn: 'काव्यांजलि (8 अध्याय)',
        titleHi: 'मैंने आहुति बनकर देखा एवं हिरोशिमा', titleEn: 'मैंने आहुति बनकर देखा एवं हिरोशिमा',
        authorOrTopicHi: 'सच्चिदानंद हीरानंद वात्स्यायन "अज्ञेय"', authorOrTopicEn: 'सच्चिदानंद हीरानंद वात्स्यायन "अज्ञेय"',
        keyFocusHi: 'परमाणु बम त्रासदी ("एक दिन सहसा सूरज निकला...") व जीवन-साधना की आहुति',
        keyFocusEn: 'परमाणु बम त्रासदी ("एक दिन सहसा सूरज निकला...") व जीवन-साधना की आहुति',
        boardWeightage: '4-10 Marks'
      },
      {
        id: 'c12h-k8', number: 15, sectionHi: 'काव्यांजलि (8 अध्याय)', sectionEn: 'काव्यांजलि (8 अध्याय)',
        titleHi: 'उद्धव-शतक एवं गंगावतरण', titleEn: 'उद्धव-शतक एवं गंगावतरण',
        authorOrTopicHi: 'जगन्नाथदास "रत्नाकर"', authorOrTopicEn: 'जगन्नाथदास "रत्नाकर"',
        keyFocusHi: 'ब्रजभाषा कवित्त-छंद में गोपियों का उद्धव से मार्मिक संवाद',
        keyFocusEn: 'ब्रजभाषा कवित्त-छंद में गोपियों का उद्धव से मार्मिक संवाद',
        boardWeightage: '4 Marks'
      },
      // कथा भारती (4 Stories)
      {
        id: 'c12h-kt1', number: 16, sectionHi: 'कथा भारती (4 कहानियाँ)', sectionEn: 'कथा भारती (4 कहानियाँ)',
        titleHi: 'पंचलाइट (कहानी सारांश व उद्देश्य)', titleEn: 'पंचलाइट',
        authorOrTopicHi: 'फणीश्वरनाथ "रेणु"', authorOrTopicEn: 'फणीश्वरनाथ "रेणु"',
        keyFocusHi: 'गोधन द्वारा पेट्रोमैक्स जलाना, मुनरी व गुलरी काकी — 5 अंक 100% पक्का प्रश्न',
        keyFocusEn: 'गोधन द्वारा पेट्रोमैक्स जलाना, मुनरी व गुलरी काकी — 5 अंक 100% पक्का प्रश्न',
        boardWeightage: '5 Marks Guaranteed'
      },
      {
        id: 'c12h-kt2', number: 17, sectionHi: 'कथा भारती (4 कहानियाँ)', sectionEn: 'कथा भारती (4 कहानियाँ)',
        titleHi: 'बहादुर (दिल बहादुर का चरित्र चित्रण)', titleEn: 'बहादुर',
        authorOrTopicHi: 'अमरकांत', authorOrTopicEn: 'अमरकांत',
        keyFocusHi: '12 वर्षीय नेपाली किशोर बहादुर का स्वाभिमान व निर्मला-किशोर का झूठा चोरी आरोप',
        keyFocusEn: '12 वर्षीय नेपाली किशोर बहादुर का स्वाभिमान व निर्मला-किशोर का झूठा चोरी आरोप',
        boardWeightage: '5 Marks Guaranteed'
      },
      {
        id: 'c12h-kt3', number: 18, sectionHi: 'कथा भारती (4 कहानियाँ)', sectionEn: 'कथा भारती (4 कहानियाँ)',
        titleHi: 'ध्रुवयात्रा', titleEn: 'ध्रुवयात्रा',
        authorOrTopicHi: 'जैनेन्द्र कुमार', authorOrTopicEn: 'जैनेन्द्र कुमार',
        keyFocusHi: 'राजा रिपुदमन व उर्मिला के कर्तव्य बनाम प्रेम का मनोवैज्ञानिक अंतर्द्वंद्व',
        keyFocusEn: 'राजा रिपुदमन व उर्मिला के कर्तव्य बनाम प्रेम का मनोवैज्ञानिक अंतर्द्वंद्व',
        boardWeightage: '5 Marks'
      },
      {
        id: 'c12h-kt4', number: 19, sectionHi: 'कथा भारती (4 कहानियाँ)', sectionEn: 'कथा भारती (4 कहानियाँ)',
        titleHi: 'लाटी', titleEn: 'लाटी',
        authorOrTopicHi: 'गौरा पंत "शिवानी"', authorOrTopicEn: 'गौरा पंत "शिवानी"',
        keyFocusHi: 'कप्तान जोशी, पत्नी बानो और सेनेटोरियम की करुण मानवीय संवेदना',
        keyFocusEn: 'कप्तान जोशी, पत्नी बानो और सेनेटोरियम की करुण मानवीय संवेदना',
        boardWeightage: '3-5 Marks'
      },
      // खण्डकाव्य (6 जनपदवार खण्डकाव्य)
      {
        id: 'c12h-kh1', number: 20, sectionHi: 'जनपदवार खण्डकाव्य (6)', sectionEn: 'जनपदवार खण्डकाव्य (6)',
        titleHi: 'रश्मिरथी, मुक्ति-यज्ञ व सत्य की जीत', titleEn: 'रश्मिरथी, मुक्ति-यज्ञ व सत्य की जीत',
        authorOrTopicHi: 'दानवीर कर्ण (वाराणसी/मुजफ्फरनगर), गांधीजी (कानपुर/जौनपुर), द्रौपदी (झाँसी/बदायूँ)', authorOrTopicEn: 'रश्मिरथी (कर्ण), मुक्ति-यज्ञ (गांधी) व सत्य की जीत (द्रौपदी)',
        keyFocusHi: 'सर्ग सारांश व प्रमुख नायक (कर्ण / गांधीजी / युधिष्ठिर) का चरित्र-चित्रण — 5 अंक पक्का',
        keyFocusEn: 'सर्ग सारांश व प्रमुख नायक का चरित्र-चित्रण — 5 अंक पक्का',
        boardWeightage: '5 Marks Fixed'
      },
      {
        id: 'c12h-kh2', number: 21, sectionHi: 'जनपदवार खण्डकाव्य (6)', sectionEn: 'जनपदवार खण्डकाव्य (6)',
        titleHi: 'आलोकवृत्त, त्यागपथी व श्रवणकुमार', titleEn: 'आलोकवृत्त, त्यागपथी व श्रवणकुमार',
        authorOrTopicHi: 'प्रयागराज/अलीगढ़ (आलोकवृत्त), आगरा/गोरखपुर/गाजीपुर (त्यागपथी), मेरठ/बस्ती (श्रवणकुमार)', authorOrTopicEn: 'आलोकवृत्त, त्यागपथी (हर्षवर्धन) व श्रवणकुमार (6 जनपदवार खण्डकाव्य पूर्ण)',
        keyFocusHi: 'अपने जिले के अनुसार निर्धारित खण्डकाव्य की प्रमुख घटना व चरित्र-चित्रण',
        keyFocusEn: 'अपने जिले के अनुसार निर्धारित खण्डकाव्य की प्रमुख घटना व चरित्र-चित्रण',
        boardWeightage: '5 Marks Fixed'
      },
      // संस्कृत दिग्दर्शिका (समस्त 8 इकाइयाँ)
      {
        id: 'c12h-sd1', number: 22, sectionHi: 'संस्कृत दिग्दर्शिका (1-4)', sectionEn: 'संस्कृत दिग्दर्शिका (1-4)',
        titleHi: 'भोजस्यौदार्यम्, आत्मज्ञ एवं सर्वज्ञः, संस्कृतभाषायाः महत्त्वम्, जातक-कथा', titleEn: 'भोजस्यौदार्यम्, आत्मज्ञ एवं सर्वज्ञः, संस्कृतभाषायाः महत्त्वम्, जातक-कथा',
        authorOrTopicHi: 'याज्ञवल्क्य-मैत्रेयी संवाद, संस्कृत देववाणी, उलूक-जातकम् व नृत्य-जातकम्', authorOrTopicEn: 'याज्ञवल्क्य-मैत्रेयी संवाद, संस्कृत देववाणी व जातक कथाएँ',
        keyFocusHi: 'संस्कृत गद्यांश संदर्भ सहित हिंदी अनुवाद (7 अंक पक्का)',
        keyFocusEn: 'संस्कृत गद्यांश संदर्भ सहित हिंदी अनुवाद (7 अंक पक्का)',
        boardWeightage: '7 Marks Fixed'
      },
      {
        id: 'c12h-sd2', number: 23, sectionHi: 'संस्कृत दिग्दर्शिका (5-8)', sectionEn: 'संस्कृत दिग्दर्शिका (5-8)',
        titleHi: 'सुभाषित-रत्नानि, महामना मालवीयः, पञ्चशील-सिद्धान्ताः व दूतवाक्यम्', titleEn: 'सुभाषित-रत्नानि, महामना मालवीयः, पञ्चशील-सिद्धान्ताः व दूतवाक्यम्',
        authorOrTopicHi: '7 अंक पक्का श्लोक व्याख्या + BHU मालवीयजी + बुद्ध पंचशील', authorOrTopicEn: 'सुभाषित-रत्नानि श्लोक (7 अंक), महामना मालवीय व पंचशील सिद्धांत',
        keyFocusHi: '"भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती..." व "विद्या विवादाय..." 100% संभावित श्लोक',
        keyFocusEn: '"भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती..." व "विद्या विवादाय..." श्लोक अनुवाद',
        boardWeightage: '14 Marks Fixed',
        poemsOrShlokasHi: ['भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती। तस्या हि मधुरं काव्यं तस्मादपि सुभाषितम्।।'],
        poemsOrShlokasEn: ['भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती। तस्या हि मधुरं काव्यं तस्मादपि सुभाषितम्।।']
      },
      // हिंदी 2nd (व्याकरण व रचना)
      {
        id: 'c12h-vy1', number: 24, sectionHi: 'हिंदी 2nd (व्याकरण व रचना)', sectionEn: 'हिंदी 2nd (व्याकरण व रचना)',
        titleHi: 'रस-छंद-अलंकार, संधि, विभक्ति, मुहावरे व अपठित', titleEn: 'रस-छंद-अलंकार, संधि, विभक्ति, मुहावरे व अपठित',
        authorOrTopicHi: 'शृंगार/वीर/शांत रस, चौपाई/दोहा/कुंडलिया, यमक/श्लेष व शब्द-युग्म', authorOrTopicEn: 'काव्य-सौंदर्य (6M), मुहावरे (2M), संधि-विभक्ति-शब्द-अर्थ',
        keyFocusHi: '"अंधे की लाठी", "ईद का चाँद", "नौ दो ग्यारह" व यमक-श्लेष उदाहरण',
        keyFocusEn: 'काव्य सौंदर्य के 6 अंक और व्याकरण के 10 पक्के अंक',
        boardWeightage: '16 Marks Fixed'
      },
      {
        id: 'c12h-vy2', number: 25, sectionHi: 'हिंदी 2nd (पत्र व निबंध)', sectionEn: 'हिंदी 2nd (पत्र व निबंध)',
        titleHi: 'आवेदन/बैंक ऋण पत्र (6 अंक) एवं निबंध लेखन (9 अंक)', titleEn: 'पत्र लेखन (6 अंक) व निबंध लेखन (9 अंक)',
        authorOrTopicHi: 'लिपिक नियुक्ति पत्र, बैंक व्यवसाय ऋण पत्र + बेरोजगारी/पर्यावरण/आतंकवाद निबंध', authorOrTopicEn: 'नियुक्ति/ऋण/सफाई पत्र (6M) + 9 अंक प्रमुख निबंध',
        keyFocusHi: 'हेडिंग व रूपरेखा (प्रस्तावना, कारण, निवारण, उपसंहार) से 9/9 अंक निबंध पक्का',
        keyFocusEn: 'बैंक ऋण/नियुक्ति आवेदन पत्र (6M) + रूपरेखा आधारित निबंध (9M)',
        boardWeightage: '15 Marks Fixed'
      }
    ],
    coreMcqs: [
      {
        id: 'c12h-mcq-1',
        questionHi: '"अशोक के फूल" निबंध के रचयिता कौन हैं?',
        questionEn: '"अशोक के फूल" निबंध के रचयिता कौन हैं?',
        optionsHi: ['वासुदेवशरण अग्रवाल', 'डॉ. हजारी प्रसाद द्विवेदी', 'हरिशंकर परसाई', 'प्रो. जी. सुंदर रेड्डी'],
        optionsEn: ['वासुदेवशरण अग्रवाल', 'डॉ. हजारी प्रसाद द्विवेदी', 'हरिशंकर परसाई', 'प्रो. जी. सुंदर रेड्डी'],
        correctIndex: 1,
        explanationHi: '"अशोक के फूल" आचार्य हजारी प्रसाद द्विवेदी का प्रसिद्ध ललित निबंध संग्रह है।',
        explanationEn: '"अशोक के फूल" आचार्य हजारी प्रसाद द्विवेदी की रचना है।',
        chapter: 'अशोक के फूल',
        chapterEn: 'अशोक के फूल',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c12h-mcq-2',
        questionHi: 'हिंदी का प्रथम मौलिक उपन्यास "परीक्षा गुरु" के लेखक कौन हैं?',
        questionEn: 'हिंदी का प्रथम मौलिक उपन्यास "परीक्षा गुरु" के लेखक कौन हैं?',
        optionsHi: ['मुंशी प्रेमचंद', 'लाला श्रीनिवासदास', 'देवकीनंदन खत्री', 'जयशंकर प्रसाद'],
        optionsEn: ['मुंशी प्रेमचंद', 'लाला श्रीनिवासदास', 'देवकीनंदन खत्री', 'जयशंकर प्रसाद'],
        correctIndex: 1,
        explanationHi: 'सन् 1882 में रचित "परीक्षा गुरु" (लाला श्रीनिवासदास) हिंदी का प्रथम मौलिक उपन्यास है।',
        explanationEn: 'लाला श्रीनिवासदास कृत "परीक्षा गुरु" हिंदी का प्रथम उपन्यास है।',
        chapter: 'हिंदी गद्य साहित्य का इतिहास',
        chapterEn: 'हिंदी गद्य साहित्य का इतिहास',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c12h-mcq-3',
        questionHi: '"प्रियप्रवास" महाकाव्य के रचयिता कौन हैं?',
        questionEn: '"प्रियप्रवास" महाकाव्य के रचयिता कौन हैं?',
        optionsHi: ['मैथिलीशरण गुप्त', 'अयोध्यासिंह उपाध्याय "हरिऔध"', 'सूर्यकांत त्रिपाठी निराला', 'सुमित्रानंदन पंत'],
        optionsEn: ['मैथिलीशरण गुप्त', 'अयोध्यासिंह उपाध्याय "हरिऔध"', 'निराला', 'सुमित्रानंदन पंत'],
        correctIndex: 1,
        explanationHi: '"प्रियप्रवास" खड़ीबोली हिंदी का प्रथम महाकाव्य है, जिसके रचयिता हरिऔध जी हैं।',
        explanationEn: 'हरिऔध जी ने खड़ीबोली का प्रथम महाकाव्य "प्रियप्रवास" रचा।',
        chapter: 'पवन-दूतिका (हरिऔध)',
        chapterEn: 'पवन-दूतिका (हरिऔध)',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c12h-imp-1',
        marks: 5,
        chapter: 'पंचलाइट (कथा भारती)',
        chapterEn: 'पंचलाइट (कथा भारती)',
        questionHi: 'फणीश्वरनाथ "रेणु" की कहानी "पंचलाइट" का सारांश एवं उद्देश्य अपने शब्दों में (80 शब्द) लिखिए।',
        questionEn: '"पंचलाइट" कहानी का सारांश व उद्देश्य लिखिए (5 अंक)।',
        answerHi: 'सारांश: महतो टोली के पंचों ने मेले से पेट्रोमैक्स (पंचलाइट) खरीदा पर किसी को जलाना नहीं आता था। राजपूत टोली वाले हँसी उड़ाने लगे। मुनरी ने गुलरी काकी से बताया कि उसका प्रेमी गोधन पंचलाइट जला सकता है। पंचों ने गोधन का हुक्का-पानी बहाल कर दिया। गोधन ने बिना स्पिरिट के गरी के तेल से पंचलाइट जलाकर टोली की लाज बचाई।\n\nउद्देश्य: रूढ़िवादी सामाजिक बंधनों की अपेक्षा मानवीय गुण व आवश्यकता अधिक महत्वपूर्ण है।',
        answerEn: 'पंचलाइट कहानी में गोधन द्वारा बिना स्पिरिट के पेट्रोमैक्स जलाकर महतो टोली का सम्मान बचाने का सजीव चित्रण है।',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '5 Marks 100% पक्का',
        tagEn: '5 Marks 100% पक्का'
      },
      {
        id: 'c12h-imp-2',
        marks: 7,
        chapter: 'सुभाषित-रत्नानि (संस्कृत दिग्दर्शिका)',
        chapterEn: 'सुभाषित-रत्नानि (संस्कृत दिग्दर्शिका)',
        questionHi: 'श्लोक का संदर्भ सहित हिंदी अनुवाद कीजिए: "भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती। तस्या हि मधुरं काव्यं तस्मादपि सुभाषितम्।।"',
        questionEn: 'श्लोक अनुवाद: "भाषासु मुख्या मधुरा दिव्या गीर्वाणभारती..."',
        answerHi: 'संदर्भ: प्रस्तुत श्लोक हमारी पाठ्यपुस्तक के "संस्कृत दिग्दर्शिका" खंड के "सुभाषित-रत्नानि" पाठ से उद्धृत है।\n\nअनुवाद: देववाणी संस्कृत समस्त भाषाओं में मुख्य, मधुर और दिव्य है। निश्चय ही उसका काव्य अधिक मधुर है, और उस काव्य से भी अधिक मधुर उसके सुंदर वचन (सुभाषित) हैं।',
        answerEn: 'समस्त भाषाओं में देववाणी संस्कृत सबसे प्रमुख, मधुर व दिव्य है, और उसमें भी उसके सुभाषित सर्वाधिक मधुर हैं।',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026'],
        tagHi: '7 Marks Shloka Fixed',
        tagEn: '7 Marks Shloka Fixed'
      }
    ],
    biographies: [
      {
        id: 'c12-bio-agarwal',
        authorNameHi: 'डॉ. वासुदेवशरण अग्रवाल',
        authorNameEn: 'डॉ. वासुदेवशरण अग्रवाल',
        period: '1904 ई. – 1967 ई.',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'खेड़ा (मेरठ, उ.प्र.)',
        birthPlaceEn: 'खेड़ा (मेरठ, उ.प्र.)',
        notableWorksHi: ['पृथ्वीपुत्र', 'कल्पवृक्ष', 'भारत की एकता', 'माता भूमि'],
        notableWorksEn: ['पृथ्वीपुत्र', 'कल्पवृक्ष', 'भारत की एकता', 'माता भूमि'],
        summaryHi: 'भारतीय संस्कृति व पुरातत्व के मर्मज्ञ डॉ. वासुदेवशरण अग्रवाल का जन्म 1904 ई. में मेरठ में हुआ। काशी हिंदू विश्वविद्यालय से PhD/DLitt की तथा लखनऊ संग्रहालय के अध्यक्ष रहे। इनका निधन 1967 ई. में हुआ।',
        summaryEn: 'डॉ. वासुदेवशरण अग्रवाल का जन्म 1904 में मेरठ के खेड़ा ग्राम में हुआ। रचनाएँ: पृथ्वीपुत्र, कल्पवृक्ष, भारत की एकता।',
        examTipsHi: 'कक्षा 12 में "साहित्यिक परिचय" हेडिंग आवश्यक है (जीवन परिचय + साहित्य में योगदान + 4 प्रमुख रचनाएँ = 5/5 अंक)।',
        examTipsEn: 'साहित्यिक परिचय हेडिंग के अंतर्गत भाषा-शैली व रचनाएँ लिखना अनिवार्य है।',
        examWordLimit: '80 शब्द (5 अंक)'
      },
      {
        id: 'c12-bio-mahadevi',
        authorNameHi: 'महादेवी वर्मा',
        authorNameEn: 'महादेवी वर्मा',
        period: '1907 ई. – 1987 ई.',
        category: 'Kavya (Poetry)',
        birthPlaceHi: 'फर्रुखाबाद (उ.प्र.)',
        birthPlaceEn: 'फर्रुखाबाद (उ.प्र.)',
        notableWorksHi: ['यामा (ज्ञानपीठ पुरस्कार)', 'नीहार', 'रश्मि', 'नीरजा', 'दीपशिखा'],
        notableWorksEn: ['यामा', 'नीहार', 'रश्मि', 'नीरजा', 'दीपशिखा'],
        summaryHi: 'आधुनिक मीरा महादेवी वर्मा का जन्म 1907 ई. में फर्रुखाबाद में हुआ। प्रयाग महिला विद्यापीठ की प्राचार्या रहीं। छायावादी रहस्यवाद की प्रमुख स्तंभ को "यामा" पर ज्ञानपीठ पुरस्कार मिला।',
        summaryEn: 'आधुनिक मीरा महादेवी वर्मा का जन्म 1907 ई. में फर्रुखाबाद में हुआ। "यामा" पर ज्ञानपीठ पुरस्कार प्राप्त।',
        examTipsHi: '"आधुनिक मीरा" तथा "यामा पर ज्ञानपीठ पुरस्कार" अवश्य लिखें।',
        examTipsEn: '"यामा (ज्ञानपीठ पुरस्कार)" व जन्म 1907 फर्रुखाबाद अवश्य लिखें।',
        examWordLimit: '80 शब्द (5 अंक)'
      }
    ],
    solvedPapers: buildClass12ThreeYearPapers(
      'c12-hindi', '302', 'सामान्य हिंदी', 'Samanya Hindi', 100,
      'राष्ट्र का स्वरूप, पवन दूतिका, पंचलाइट, रश्मिरथी व सुभाषित-रत्नानि', 'राष्ट्र का स्वरूप, पवन दूतिका, पंचलाइट व सुभाषित-रत्नानि',
      '10 अंक साहित्य इतिहास MCQ, 10-10M गद्यांश/पद्यांश, 5-5M साहित्यिक परिचय, 5M कहानी/खण्डकाव्य, 14M संस्कृत व 9M निबंध।',
      '10 MCQ + 20M व्याख्या + 10M परिचय + 10M कहानी-खण्डकाव्य + 14M संस्कृत + व्याकरण/निबंध।'
    )
  },

  // 2. CLASS 12 ENGLISH CORE (Code 316) - All Flamingo + Vistas + Grammar
  {
    id: 'c12-english',
    classLevel: '12',
    code: '316',
    nameHi: 'अंग्रेजी (English Core)',
    nameEn: 'English Core (Code 316)',
    taglineHi: 'Flamingo (8 Prose + 5 Poems), Vistas (6 Ch), Notice, Letter & Grammar',
    taglineEn: 'Flamingo (8 Prose + 5 Poems), Vistas (6 Ch), Notice, Letter & Grammar',
    iconName: 'Languages',
    colorTheme: {
      bgLight: 'bg-sky-50/70',
      bgDark: 'dark:bg-sky-950/20',
      borderLight: 'border-sky-200',
      borderDark: 'dark:border-sky-800/40',
      accent: 'text-sky-600 dark:text-sky-400',
      text: 'hover:border-sky-400',
    },
    chapterDetails: [
      {
        id: 'c12e-1', number: 1, sectionHi: 'Flamingo (Prose)', sectionEn: 'Flamingo (Prose)',
        titleHi: 'The Last Lesson (Franz & M. Hamel)', titleEn: 'The Last Lesson (Alphonse Daudet)',
        authorOrTopicHi: 'Alsace-Lorraine में फ्रेंच भाषा पर रोक व "Vive La France!"', authorOrTopicEn: 'Berlin Order, Linguistic Chauvinism & M. Hamel’s Last Class',
        keyFocusHi: 'Why Franz was surprised by M. Hamel’s Sunday clothes and kindness',
        keyFocusEn: 'Importance of mother tongue & M. Hamel’s final chalk message "Vive La France!"',
        boardWeightage: '7 Marks Fixed'
      },
      {
        id: 'c12e-2', number: 2, sectionHi: 'Flamingo (Prose)', sectionEn: 'Flamingo (Prose)',
        titleHi: 'Lost Spring (Saheb & Mukesh)', titleEn: 'Lost Spring (Anees Jung)',
        authorOrTopicHi: 'Seemapuri कूड़ा बीनने वाले व Firozabad चूड़ी कारीगर', authorOrTopicEn: 'Seemapuri Ragpickers (Garbage as Gold) & Firozabad Bangle Makers',
        keyFocusHi: 'Saheb’s loss of freedom at tea stall vs Mukesh’s dream to be a motor mechanic',
        keyFocusEn: 'Vicious cycle of poverty in Firozabad & child labour exploitation',
        boardWeightage: '7 Marks High-Yield'
      },
      {
        id: 'c12e-3', number: 3, sectionHi: 'Flamingo (Prose)', sectionEn: 'Flamingo (Prose)',
        titleHi: 'Deep Water (William Douglas)', titleEn: 'Deep Water (William O. Douglas)',
        authorOrTopicHi: 'YMCA पूल हादसा व पानी के डर पर जीत (Roosevelt Quote)', authorOrTopicEn: 'YMCA Pool Misadventure & Overcoming Hydrophobia with Instructor',
        keyFocusHi: '"All we have to fear is fear itself" — How Douglas conquered terror',
        keyFocusEn: 'Step-by-step training method used by the instructor to cure fear',
        boardWeightage: '4-7 Marks'
      },
      {
        id: 'c12e-4', number: 4, sectionHi: 'Flamingo (Prose)', sectionEn: 'Flamingo (Prose)',
        titleHi: 'The Rattrap & Indigo', titleEn: 'The Rattrap (Selma Lagerlöf) & Indigo (Louis Fischer)',
        authorOrTopicHi: 'Edla Willmansson की करुणा + चंपारण सत्याग्रह (1917)', authorOrTopicEn: 'Crofter’s 30 Kronor, Edla’s Kindness & Gandhiji’s Champaran Victory',
        keyFocusHi: 'How Champaran became the turning point in India’s freedom & self-reliance',
        keyFocusEn: 'Transformation of the peddler by Edla; Rajkumar Shukla & Champaran 25% refund',
        boardWeightage: '8 Marks Fixed'
      },
      {
        id: 'c12e-5', number: 5, sectionHi: 'Flamingo (Prose 6-8)', sectionEn: 'Flamingo (Prose 6-8)',
        titleHi: 'Poets and Pancakes, The Interview & Going Places', titleEn: 'Poets and Pancakes, The Interview & Going Places',
        authorOrTopicHi: 'Gemini Studios, Umberto Eco ("The Name of the Rose") व Sophie की कल्पना', authorOrTopicEn: 'Gemini Studios Satire, Umberto Eco Interview & Sophie’s Danny Casey Fantasy',
        keyFocusHi: 'How Umberto Eco uses "interstices" (empty spaces in time)',
        keyFocusEn: 'Contrast between realistic Jansie and daydreamer Sophie',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c12e-6', number: 6, sectionHi: 'Flamingo (Poetry - 5 Poems)', sectionEn: 'Flamingo (Poetry - All 5 Poems)',
        titleHi: 'My Mother at 66, Keeping Quiet & A Thing of Beauty', titleEn: 'My Mother at 66, Keeping Quiet & A Thing of Beauty (+ Roadside Stand & Aunt Jennifer)',
        authorOrTopicHi: '4-अंक Central Idea (100% पक्का) + Stanza Q&A', authorOrTopicEn: '4 Marks Central Idea Fixed: Kamala Das, Pablo Neruda, John Keats, Frost, Adrienne Rich',
        keyFocusHi: 'Smile behind fear of separation (66), 12-second stillness (Neruda), Endless fountain of joy (Keats)',
        keyFocusEn: 'Central Ideas of My Mother at 66, Keeping Quiet, and A Thing of Beauty',
        boardWeightage: '10 Marks Guaranteed'
      },
      {
        id: 'c12e-7', number: 7, sectionHi: 'Vistas (Supplementary - 6 Ch)', sectionEn: 'Vistas (All 6 Chapters)',
        titleHi: 'The Third Level, Tiger King, Journey to Earth, The Enemy, On the Face of It, Memories', titleEn: 'The Third Level, The Tiger King, Journey to End of Earth, The Enemy, On the Face of It & Memories',
        authorOrTopicHi: 'Charley 1894 Galesburg, 100th Tiger, Dr. Sadao & Hana, Mr. Lamb & Derry', authorOrTopicEn: 'Charley’s Escapism, Irony of 100th Tiger, Dr. Sadao Saving Tom & Derry-Mr. Lamb',
        keyFocusHi: 'How Dr. Sadao balanced patriotism and medical ethics; Mr. Lamb’s optimism',
        keyFocusEn: 'Irony in The Tiger King’s wooden toy tiger death & Dr. Sadao’s human dilemma',
        boardWeightage: '14 Marks Fixed'
      },
      {
        id: 'c12e-8', number: 8, sectionHi: 'Writing & Grammar', sectionEn: 'Section B & C (Writing & Grammar)',
        titleHi: 'Article, Letter to Editor, Narration, Synthesis, Transformation & Idioms', titleEn: 'Article (10M), Formal Letter (10M), Narration, Synthesis, Syntax & Idioms',
        authorOrTopicHi: 'Price Rise, Women Safety, Electricity/Water Complaint Letter व Grammar Rules', authorOrTopicEn: 'Unseen Passage (15M), Article (10M), Editor Letter (10M) & Grammar Conversions',
        keyFocusHi: 'Direct-Indirect, Active-Passive, Degree Comparison & Correcting Syntax Errors',
        keyFocusEn: 'Board rubric for 10M Article & Editor Letter + Transformation/Synthesis rules',
        boardWeightage: '35 Marks'
      }
    ],
    coreMcqs: [
      {
        id: 'c12e-mcq-1',
        questionHi: '"The Last Lesson" में बर्लिन के आदेश के अनुसार Alsace-Lorraine के स्कूलों में अब कौन-सी भाषा पढ़ाई जानी थी?',
        questionEn: 'According to the Berlin order in "The Last Lesson", which language was to be taught in Alsace and Lorraine schools?',
        optionsHi: ['French', 'German', 'English', 'Latin'],
        optionsEn: ['French', 'German', 'English', 'Latin'],
        correctIndex: 1,
        explanationHi: 'फ्रांस-प्रशिया युद्ध (1870-71) के बाद बर्लिन से केवल "German" भाषा पढ़ाने का आदेश आया था।',
        explanationEn: 'Berlin ordered that only German would be taught in schools of Alsace and Lorraine.',
        chapter: 'The Last Lesson',
        chapterEn: 'The Last Lesson',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c12e-mcq-2',
        questionHi: '"A Thing of Beauty is a joy forever" पंक्ति किस कवि की है?',
        questionEn: 'Who wrote the famous line "A thing of beauty is a joy forever"?',
        optionsHi: ['Pablo Neruda', 'John Keats', 'Kamala Das', 'Robert Frost'],
        optionsEn: ['Pablo Neruda', 'John Keats', 'Kamala Das', 'Robert Frost'],
        correctIndex: 1,
        explanationHi: 'रोमांटिक कवि John Keats ने "Endymion" से ली गई कविता A Thing of Beauty में यह लिखा।',
        explanationEn: 'John Keats wrote this opening line in his poem "A Thing of Beauty" (from Endymion).',
        chapter: 'My Mother at 66, Keeping Quiet & A Thing of Beauty',
        chapterEn: 'Flamingo (Poetry)',
        boardYears: ['2024', '2025', '2026 Model']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c12e-imp-1',
        marks: 4,
        chapter: 'Flamingo (Poetry)',
        chapterEn: 'Flamingo (Poetry)',
        questionHi: 'कविता "My Mother at Sixty-Six" या "Keeping Quiet" का Central Idea लिखिए।',
        questionEn: 'Write the Central Idea of "My Mother at Sixty-Six" or "Keeping Quiet" (4 Marks Fixed).',
        answerHi: 'Central Idea (My Mother at Sixty-Six): Kamala Das sensitively depicts the universal fear of losing one’s ageing parents. Watching her mother’s ashen, corpse-like face, she contrasts it with sprinting young trees and merry children, hiding her deep ache behind a reassuring smile.\n\nCentral Idea (Keeping Quiet): Pablo Neruda urges humanity to observe 12 seconds of silence and introspection to halt wars, environmental harm, and mindless haste, fostering universal brotherhood.',
        answerEn: 'Central Idea (My Mother at Sixty-Six): Kamala Das portrays the poignant pain of ageing and separation. Seeing her frail 66-year-old mother dozing, the poet hides her childhood fear behind repeated smiles.\n\nKeeping Quiet: Pablo Neruda advocates quiet introspection to end destructive violence and promote peace.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026'],
        tagHi: '4 Marks Guaranteed',
        tagEn: '4 Marks Guaranteed'
      }
    ],
    biographies: [
      {
        id: 'c12e-bio-keats',
        authorNameHi: 'जॉन कीट्स व पाब्लो नेरुदा',
        authorNameEn: 'John Keats & Pablo Neruda',
        period: '1795 – 1973',
        category: 'English Literature',
        birthPlaceHi: 'लंदन / चिली',
        birthPlaceEn: 'London / Chile',
        notableWorksHi: ['A Thing of Beauty (Endymion)', 'Keeping Quiet'],
        notableWorksEn: ['A Thing of Beauty (Endymion)', 'Keeping Quiet'],
        summaryHi: 'यूपी बोर्ड कक्षा 12 में Stanza extract और Central Idea में कवि नाम लिखने पर सीधा 1-2 अंक सुनिश्चित रहता है।',
        summaryEn: 'John Keats (Romantic nature beauty) and Nobel laureate Pablo Neruda (Keeping Quiet) appear consistently in Poetry questions.',
        examTipsHi: 'Central Idea में कवि और कविता का नाम अंडरलाइन करके लिखें।',
        examTipsEn: 'Underline poet and poem name in Central Idea opening lines.',
        examWordLimit: 'Central Idea (50 Words)'
      }
    ],
    solvedPapers: buildClass12ThreeYearPapers(
      'c12-english', '316', 'अंग्रेजी', 'English Core', 100,
      'The Last Lesson, Champaran, My Mother at 66 & Editor Letter', 'The Last Lesson, Indigo, My Mother at 66 & Editor Letter',
      '15M Unseen Passage, 10M Article, 10M Letter to Editor, 25M Grammar Conversions व 40M Flamingo/Vistas.',
      '15M Unseen Passage, 10M Article + 10M Letter, 25M Grammar, 40M Literature.'
    )
  },

  // 3. CLASS 12 PHYSICS (Code 346) - All 14 Chapters
  {
    id: 'c12-physics',
    classLevel: '12',
    code: '346',
    nameHi: 'भौतिक विज्ञान (Physics - 14 अध्याय)',
    nameEn: 'Physics (Code 346 - All 14 Chapters)',
    taglineHi: 'पूरे 14 अध्याय: गॉस प्रमेय, व्हीटस्टोन सेतु, लेंस मेकर सूत्र (5M), हाइगेन्स व P-N डायोड',
    taglineEn: 'All 14 Chapters: Gauss’s Law, Wheatstone Bridge, Lens Maker’s Formula (5M) & Diode',
    iconName: 'Zap',
    colorTheme: {
      bgLight: 'bg-indigo-50/70',
      bgDark: 'dark:bg-indigo-950/20',
      borderLight: 'border-indigo-200',
      borderDark: 'dark:border-indigo-800/40',
      accent: 'text-indigo-600 dark:text-indigo-400',
      text: 'hover:border-indigo-400',
    },
    chapterDetails: [
      { id: 'c12p-1', number: 1, sectionHi: 'स्थिरवैद्युतिकी', sectionEn: 'Electrostatics', titleHi: 'वैद्युत आवेश तथा क्षेत्र (गॉस प्रमेय)', titleEn: 'Electric Charges and Fields (Gauss’s Law)', authorOrTopicHi: 'कॉलॉम नियम, द्विध्रुव अक्षीय/निरक्षीय तीव्रता व गॉस की प्रमेय (Φ = q/ε₀)', authorOrTopicEn: 'Coulomb’s Law, Dipole Field & Gauss’s Theorem Derivation (Φ = q/ε₀)', keyFocusHi: 'गॉस प्रमेय के अनुप्रयोग: अनंत रेखीय आवेश E = λ/(2πε₀r) — 5 अंक पक्का', keyFocusEn: 'Gauss Law applications: Infinite line charge & uniformly charged plane sheet (5 Marks)', boardWeightage: '5 Marks Fixed' },
      { id: 'c12p-2', number: 2, sectionHi: 'स्थिरवैद्युतिकी', sectionEn: 'Electrostatics', titleHi: 'स्थिरवैद्युत विभव तथा धारिता', titleEn: 'Electrostatic Potential and Capacitance', authorOrTopicHi: 'समांतर प्लेट संधारित्र की धारिता C = Kε₀A/d व ऊर्जा U = ½CV²', authorOrTopicEn: 'Parallel Plate Capacitor with Dielectric Slab & Energy Density', keyFocusHi: 'परावैद्युत पट्टी रखने पर संधारित्र की धारिता C = ε₀A/(d - t + t/K) का निगमन', keyFocusEn: 'Derivation of capacitance with partial dielectric slab t (5 Marks)', boardWeightage: '5 Marks' },
      { id: 'c12p-3', number: 3, sectionHi: 'धारा विद्युत', sectionEn: 'Current Electricity', titleHi: 'विद्युत धारा (किरचॉफ व व्हीटस्टोन सेतु)', titleEn: 'Current Electricity (Kirchhoff & Wheatstone Bridge)', authorOrTopicHi: 'अनुगमन वेग I = neAv_d, किरचॉफ के दोनों नियम व संतुलित सेतु P/Q = R/S', authorOrTopicEn: 'Drift Velocity (I = neAv_d), Kirchhoff’s Junction/Loop Laws & Wheatstone Bridge', keyFocusHi: 'किरचॉफ नियम द्वारा व्हीटस्टोन सेतु की संतुलन शर्त P/Q = R/S का निगमन — 5 अंक पक्का', keyFocusEn: 'Proof of P/Q = R/S using Kirchhoff’s Loop Rule & Drift Velocity derivation', boardWeightage: '7 Marks Fixed' },
      { id: 'c12p-4', number: 4, sectionHi: 'चुंबकत्व', sectionEn: 'Magnetism', titleHi: 'गतिमान आवेश और चुंबकत्व', titleEn: 'Moving Charges and Magnetism', authorOrTopicHi: 'बायो-सेवर्ट नियम, ऐम्पियर परिपथीय नियम व दो समांतर धारावाही तारों के मध्य बल', authorOrTopicEn: 'Biot-Savart Law, Ampere’s Circuital Law & Force Between Parallel Conductors', keyFocusHi: 'दो समांतर धारावाही चालकों के बीच प्रति एकांक लंबाई बल F/L = (μ₀I₁I₂)/(2πd) — 5 अंक', keyFocusEn: 'Derivation of force per unit length & 1 Ampere definition (5 Marks)', boardWeightage: '5 Marks' },
      { id: 'c12p-5', number: 5, sectionHi: 'चुंबकत्व', sectionEn: 'Magnetism', titleHi: 'चुंबकत्व एवं द्रव्य', titleEn: 'Magnetism and Matter', authorOrTopicHi: 'प्रतिचुंबकीय, अनुचुंबकीय व लौहचुंबकीय पदार्थों में अंतर व क्यूरी नियम', authorOrTopicEn: 'Diamagnetic, Paramagnetic vs Ferromagnetic Materials & Curie Law', keyFocusHi: 'तीनों चुंबकीय पदार्थों की चुंबकीय प्रवृत्ति χ व आपेक्षिक चुंबकशीलता μr सारणी', keyFocusEn: 'Properties comparison table of Dia, Para, and Ferromagnetic substances', boardWeightage: '3 Marks' },
      { id: 'c12p-6', number: 6, sectionHi: 'विद्युत चुंबकीय प्रेरण', sectionEn: 'EMI', titleHi: 'वैद्युत चुंबकीय प्रेरण (फैराडे व लेंज)', titleEn: 'Electromagnetic Induction (Faraday & Lenz)', authorOrTopicHi: 'फैराडे के दोनों नियम, लेंज का ऊर्जा संरक्षण नियम, स्वप्रेरण व अन्योन्य प्रेरण', authorOrTopicEn: 'Faraday’s Laws, Lenz’s Law (Energy Conservation), Self & Mutual Inductance', keyFocusHi: 'परिनलिका का स्वप्रेरकत्व L = μ₀n²Al व अन्योन्य प्रेरकत्व M का सूत्र निगमन', keyFocusEn: 'Mutual inductance of coaxial solenoids & Lenz Law energy conservation proof', boardWeightage: '4 Marks' },
      { id: 'c12p-7', number: 7, sectionHi: 'प्रत्यावर्ती धारा', sectionEn: 'AC Circuits', titleHi: 'प्रत्यावर्ती धारा (LCR परिपथ व ट्रांसफार्मर)', titleEn: 'Alternating Current (LCR Circuit & Transformer)', authorOrTopicHi: 'LCR प्रतिबाधा Z = √[R² + (X_L - X_C)²], अनुनाद आवृत्ति व उच्चायी/अपचायी ट्रांसफार्मर', authorOrTopicEn: 'Series LCR Impedance, Resonance Frequency f = 1/(2π√LC) & Transformer Principle', keyFocusHi: 'ट्रांसफार्मर का सिद्धांत, कार्यविधि, भँवर धारा हानि व LCR अनुनाद — 5 अंक पक्का', keyFocusEn: 'Transformer working, energy losses & LCR resonance curve (5 Marks)', boardWeightage: '6 Marks Fixed' },
      { id: 'c12p-8', number: 8, sectionHi: 'EM तरंगें', sectionEn: 'EM Waves', titleHi: 'वैद्युत चुंबकीय तरंगें', titleEn: 'Electromagnetic Waves', authorOrTopicHi: 'विस्थापन धारा (Id = ε₀ dΦ_E/dt), मैक्सवेल समीकरण व EM स्पेक्ट्रम उपयोग', authorOrTopicEn: 'Displacement Current, Transverse Nature & Uses of X-Rays, UV, Microwaves', keyFocusHi: 'तरंगदैर्ध्य क्रम व X-किरण, गामा, पराबैंगनी, सूक्ष्म तरंगों के उपयोग', keyFocusEn: 'Maxwell’s displacement current & industrial/medical uses of EM spectrum', boardWeightage: '4 Marks' },
      { id: 'c12p-9', number: 9, sectionHi: 'प्रकाशिकी', sectionEn: 'Ray Optics', titleHi: 'किरण प्रकाशिकी एवं प्रकाशिक यंत्र', titleEn: 'Ray Optics & Optical Instruments (Lens Maker’s 5M)', authorOrTopicHi: 'लेंस मेकर सूत्र 1/f=(n-1)(1/R₁-1/R₂), प्रिज्म अपवर्तनांक सूत्र, दूरदर्शी व सूक्ष्मदर्शी', authorOrTopicEn: 'Lens Maker’s Formula (5M), Prism Formula & Compound Microscope / Telescope', keyFocusHi: 'लेंस मेकर सूत्र (5 अंक 100% फिक्स्ड) तथा खगोलीय दूरदर्शी आवर्धन क्षमता निगमन', keyFocusEn: 'Complete Lens Maker’s derivation + Refractive Index of Prism (5 Marks Fixed)', boardWeightage: '9 Marks Fixed',
        formulaOrTrickHi: 'लेंस मेकर सूत्र: 1/f = (n - 1)(1/R₁ - 1/R₂) | प्रिज्म: n = sin[(A+δm)/2] / sin(A/2)',
        formulaOrTrickEn: 'Lens Maker Formula: 1/f = (n - 1)(1/R₁ - 1/R₂) | Prism: n = sin[(A+δm)/2] / sin(A/2)' },
      { id: 'c12p-10', number: 10, sectionHi: 'प्रकाशिकी', sectionEn: 'Wave Optics', titleHi: 'तरंग प्रकाशिकी (हाइगेन्स व व्यतिकरण)', titleEn: 'Wave Optics (Huygens Principle & YDSE)', authorOrTopicHi: 'हाइगेन्स के द्वितीयक तरंगिकाओं द्वारा परावर्तन व अपवर्तन (स्नेल नियम) की व्याख्या', authorOrTopicEn: 'Huygens Secondary Wavelets Proof of Reflection/Refraction & Fringe Width β = Dλ/d', keyFocusHi: 'हाइगेन्स सिद्धांत द्वारा अपवर्तन (sin i / sin r = v₁/v₂) सिद्ध करना — 5 अंक पक्का', keyFocusEn: 'Proof of Snell’s Law via Huygens wavefronts & Young’s Double Slit β = Dλ/d', boardWeightage: '5 Marks Guaranteed' },
      { id: 'c12p-11', number: 11, sectionHi: 'आधुनिक भौतिकी', sectionEn: 'Dual Nature', titleHi: 'विकिरण तथा द्रव्य की द्वैत प्रकृति', titleEn: 'Dual Nature of Radiation and Matter', authorOrTopicHi: 'आइंस्टीन का प्रकाश वैद्युत समीकरण (½mv² = hν - W₀) व दे-ब्रॉग्ली λ = h/p', authorOrTopicEn: 'Einstein’s Photoelectric Equation (K_max = hν - φ₀) & de-Broglie Wavelength', keyFocusHi: 'कार्यफलन, देहली आवृत्ति व निरोधी विभव V₀ की परिभाषा व आइंस्टीन समीकरण निगमन', keyFocusEn: 'Laws of photoelectric emission, stopping potential & de-Broglie λ = h/√(2mqV)', boardWeightage: '4 Marks' },
      { id: 'c12p-12', number: 12, sectionHi: 'आधुनिक भौतिकी', sectionEn: 'Atoms', titleHi: 'परमाणु (रदरफोर्ड व बोर मॉडल)', titleEn: 'Atoms (Bohr Model & Hydrogen Spectrum)', authorOrTopicHi: 'बोर के तीनों अभिगृहीत, त्रिज्या rₙ∝n², ऊर्जा Eₙ = -13.6/n² eV व लाइमन-बामर श्रेणियाँ', authorOrTopicEn: 'Bohr’s Postulates, Energy Levels (-13.6/n² eV) & Lyman-Balmer Spectral Series', keyFocusHi: 'हाइड्रोजन स्पेक्ट्रम की लाइमन (UV), बामर (दृश्य), पाश्चन (IR) श्रेणियों का आरेख', keyFocusEn: 'Derivation of Bohr radius/energy & Hydrogen emission spectrum transitions', boardWeightage: '5 Marks' },
      { id: 'c12p-13', number: 13, sectionHi: 'आधुनिक भौतिकी', sectionEn: 'Nuclei', titleHi: 'नाभिक (द्रव्यमान क्षति व ऊर्जा)', titleEn: 'Nuclei (Binding Energy, Fission & Fusion)', authorOrTopicHi: 'द्रव्यमान क्षति (Δm), बंधन ऊर्जा वक्र (Fe⁵⁶ अधिकतम), नाभिकीय विखंडन बनाम संलयन', authorOrTopicEn: 'Mass Defect, Binding Energy per Nucleon Curve & Nuclear Fission vs Fusion', keyFocusHi: '1 amu = 931.5 MeV न्यूमेरिकल व सूर्य में नाभिकीय संलयन (4 ¹H₁ → ²He₄)', keyFocusEn: 'Mass-energy relation E=Δmc², Fission vs Fusion differences & proton-proton cycle', boardWeightage: '4 Marks' },
      { id: 'c12p-14', number: 14, sectionHi: 'इलेक्ट्रॉनिकी', sectionEn: 'Semiconductors', titleHi: 'अर्धचालक इलेक्ट्रॉनिकी (P-N संधि डायोड)', titleEn: 'Semiconductor Electronics (P-N Diode & Rectifier)', authorOrTopicHi: 'p व n प्रकार के अर्धचालक, P-N डायोड अग्र/पश्च अभिनति तथा अर्ध/पूर्ण तरंग दिष्टकारी', authorOrTopicEn: 'Intrinsic vs Extrinsic (p/n-type), Forward/Reverse Bias & Half/Full-Wave Rectifier', keyFocusHi: 'P-N संधि डायोड पूर्ण तरंग दिष्टकारी (Full-Wave Rectifier) परिपथ व तरंग रूप — 5 अंक पक्का', keyFocusEn: 'Full-Wave & Half-Wave Rectifier circuit diagram, working & waveforms (5 Marks)', boardWeightage: '7 Marks Guaranteed' }
    ],
    coreMcqs: [
      {
        id: 'c12p-mcq-1',
        questionHi: 'विद्युतशीलता ε₀ (निर्वात की वैद्युतशीलता) का SI मात्रक क्या होता है?',
        questionEn: 'What is the SI unit of permittivity of free space (ε₀)?',
        optionsHi: ['N·m²/C²', 'C²/(N·m²)', 'C/(N·m)', 'N·C/m²'],
        optionsEn: ['N·m²/C²', 'C²/(N·m²)', 'C/(N·m)', 'N·C/m²'],
        correctIndex: 1,
        explanationHi: 'कॉलॉम के नियम F = q₁q₂/(4πε₀r²) से ε₀ का मात्रक कूलॉम² / (न्यूटन·मीटर²) होता है।',
        explanationEn: 'From Coulomb’s law F = q₁q₂/(4πε₀r²), ε₀ has units C²/(N·m²).',
        chapter: 'वैद्युत आवेश तथा क्षेत्र',
        chapterEn: 'Electric Charges and Fields',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c12p-mcq-2',
        questionHi: 'लेंज का नियम (Lenz’s Law) किस भौतिक राशि के संरक्षण के सिद्धांत पर आधारित है?',
        questionEn: 'Lenz’s law of electromagnetic induction is a direct consequence of the law of conservation of:',
        optionsHi: ['आवेश (Charge)', 'संवेग (Momentum)', 'ऊर्जा (Energy)', 'द्रव्यमान (Mass)'],
        optionsEn: ['Charge', 'Momentum', 'Energy', 'Mass'],
        correctIndex: 2,
        explanationHi: 'लेंज का नियम ऊर्जा संरक्षण पर आधारित है क्योंकि प्रेरित धारा सदैव उस कारण का विरोध करती है जिससे वह उत्पन्न होती है।',
        explanationEn: 'Lenz’s law obeys Conservation of Energy: mechanical work done against opposing magnetic force converts into electrical energy.',
        chapter: 'वैद्युत चुंबकीय प्रेरण',
        chapterEn: 'Electromagnetic Induction',
        boardYears: ['2024', '2025', '2026 Model']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c12p-imp-1',
        marks: 5,
        chapter: 'किरण प्रकाशिकी एवं प्रकाशिक यंत्र',
        chapterEn: 'Ray Optics & Optical Instruments',
        questionHi: 'पतले गोलीय लेंस के लिए अपवर्तन (लेंस मेकर) सूत्र 1/f = (n - 1)(1/R₁ - 1/R₂) का पूर्ण निगमन कीजिए।',
        questionEn: 'Derive the Lens Maker’s Formula 1/f = (n - 1)(1/R₁ - 1/R₂) for a thin convex lens.',
        answerHi: '1. प्रथम पृष्ठ (वक्रता त्रिज्या R₁) से अपवर्तन: n/v\' - 1/u = (n - 1)/R₁ --- (i)\n2. द्वितीय पृष्ठ (वक्रता त्रिज्या R₂) हेतु प्रथम प्रतिबिम्ब I\' आभासी वस्तु है: 1/v - n/v\' = (1 - n)/R₂ = -(n - 1)/R₂ --- (ii)\n3. समीकरण (i) व (ii) जोड़ने पर: 1/v - 1/u = (n - 1)(1/R₁ - 1/R₂)।\nचूँकि वस्तु u = ∞ होने पर v = f, अतः 1/f = (n - 1)(1/R₁ - 1/R₂)। (इति सिद्धम्)',
        answerEn: '1. Refraction at first spherical surface (radius R₁): n/v\' - 1/u = (n - 1)/R₁ --- (1)\n2. Refraction at second surface (radius R₂, image I\' acts as virtual object): 1/v - n/v\' = -(n - 1)/R₂ --- (2)\n3. Adding (1) and (2): 1/v - 1/u = (n - 1)(1/R₁ - 1/R₂).\nSince u = ∞ gives v = f, therefore: 1/f = (n - 1)(1/R₁ - 1/R₂). (Proved)',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '5 Marks Physics Guarantee',
        tagEn: '5 Marks Physics Guarantee'
      }
    ],
    biographies: [
      {
        id: 'c12p-bio-gauss',
        authorNameHi: 'कार्ल फ्रेडरिक गॉस एवं क्रिश्चियन हाइगेन्स',
        authorNameEn: 'Carl Friedrich Gauss & Christiaan Huygens',
        period: '1629 – 1855',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'जर्मनी / नीदरलैंड्स',
        birthPlaceEn: 'Germany / Netherlands',
        notableWorksHi: ['गॉस प्रमेय (Φ = q/ε₀)', 'तरंगिका सिद्धांत (Huygens Wave Optics)'],
        notableWorksEn: ['Gauss’s Law (Φ = q/ε₀)', 'Wave Theory of Light'],
        summaryHi: 'यूपी बोर्ड भौतिकी में गॉस प्रमेय और हाइगेन्स तरंग सिद्धांत से प्रतिवर्ष 5-5 अंक के निगमन पूछे जाते हैं।',
        summaryEn: 'Gauss’s Law (Ch 1) and Huygens’ Principle (Ch 10) each yield 5-mark guaranteed derivations in UPMSP Class 12.',
        examTipsHi: 'निगमन में स्पष्ट गाउसियन पृष्ठ (Gaussian Surface) और तरंगाग्र आरेख पेंसिल से अवश्य बनाएं।',
        examTipsEn: 'Always draw clean Gaussian cylinder/sphere and wavefronts using pencil.',
        examWordLimit: '5-Mark Derivation'
      }
    ],
    solvedPapers: buildClass12ThreeYearPapers(
      'c12-physics', '346', 'भौतिक विज्ञान', 'Physics', 70,
      'गॉस प्रमेय, किरचॉफ, लेंस मेकर सूत्र व पूर्ण तरंग दिष्टकारी', 'Gauss’s Law, Kirchhoff, Lens Maker’s Formula & Rectifier',
      '6 MCQ, 6 अति लघु (1M), 2M/3M न्यूमेरिकल व खंड-य में 5-5 अंक के 4 विस्तृत निगमन (लेंस मेकर/हाइगेन्स/दिष्टकारी)।',
      '6 MCQs, 1M/2M/3M numericals + four 5-mark long derivations with alternative choices.'
    )
  },

  // 4. CLASS 12 CHEMISTRY (Code 347) - All 10 Revised UPMSP/NCERT Chapters
  {
    id: 'c12-chemistry',
    classLevel: '12',
    code: '347',
    nameHi: 'रसायन विज्ञान (Chemistry - 10 अध्याय)',
    nameEn: 'Chemistry (Code 347 - All 10 Chapters)',
    taglineHi: 'सभी 10 अध्याय: राउल्ट, नेर्नस्ट, प्रथम कोटि, कैनिजारो, ऐल्डोल, रीमर-टीमैन व DNA',
    taglineEn: 'All 10 Chapters: Raoult, Nernst, First Order, Name Reactions & Biomolecules',
    iconName: 'FlaskConical',
    colorTheme: {
      bgLight: 'bg-emerald-50/70',
      bgDark: 'dark:bg-emerald-950/20',
      borderLight: 'border-emerald-200',
      borderDark: 'dark:border-emerald-800/40',
      accent: 'text-emerald-600 dark:text-emerald-400',
      text: 'hover:border-emerald-400',
    },
    chapterDetails: [
      { id: 'c12c-1', number: 1, sectionHi: 'भौतिक रसायन', sectionEn: 'Physical Chemistry', titleHi: 'विलयन (Solutions)', titleEn: 'Solutions (Raoult’s Law & Colligative Properties)', authorOrTopicHi: 'मोलरता, मोललता, हेनरी नियम, राउल्ट का नियम व परासरण दाब (π = CRT)', authorOrTopicEn: 'Molarity, Molality, Henry’s Law, Raoult’s Law & Osmotic Pressure', keyFocusHi: 'राउल्ट नियम, क्वथनांक उन्नयन ΔTb व मोलर द्रव्यमान न्यूमेरिकल — 7 अंक', keyFocusEn: 'Raoult’s Law deviations, ΔTb/ΔTf & Van’t Hoff factor i numericals (7 Marks)', boardWeightage: '7 Marks Fixed' },
      { id: 'c12c-2', number: 2, sectionHi: 'भौतिक रसायन', sectionEn: 'Physical Chemistry', titleHi: 'वैद्युतरसायन (Electrochemistry)', titleEn: 'Electrochemistry (Nernst & Kohlrausch)', authorOrTopicHi: 'नेर्नस्ट समीकरण E = E° - (0.059/n)log([P]/[R]), कोलराउश नियम व फैराडे नियम', authorOrTopicEn: 'Nernst Equation, Kohlrausch’s Law of Independent Migration & Faraday’s Laws', keyFocusHi: 'कोलराउश नियम व इसके दो अनुप्रयोग तथा नेर्नस्ट समीकरण से सेल EMF ज्ञात करना', keyFocusEn: 'Kohlrausch Law (Λ°m) & Nernst equation cell EMF numericals (7 Marks)', boardWeightage: '7 Marks Fixed' },
      { id: 'c12c-3', number: 3, sectionHi: 'भौतिक रसायन', sectionEn: 'Physical Chemistry', titleHi: 'रासायनिक बलगतिकी', titleEn: 'Chemical Kinetics', authorOrTopicHi: 'शून्य व प्रथम कोटि अभिक्रिया k=(2.303/t)log(a/(a-x)), अर्ध-आयु t½=0.693/k', authorOrTopicEn: 'Zero & First Order Integrated Rate Equation, Half-Life t½ = 0.693/k & Order vs Molecularity', keyFocusHi: 'प्रथम कोटि अभिक्रिया के 99.9% पूर्ण होने का समय t½ का 10 गुना होता है — सिद्ध करें', keyFocusEn: 'Proving t₉₉.₉% = 10 × t½ for first-order reactions & Order vs Molecularity table', boardWeightage: '7 Marks Guaranteed' },
      { id: 'c12c-4', number: 4, sectionHi: 'अकार्बनिक रसायन', sectionEn: 'Inorganic Chemistry', titleHi: 'd एवं f ब्लॉक के तत्व', titleEn: 'd and f Block Elements', authorOrTopicHi: 'संक्रमण तत्व (रंगीन आयन, चुंबकीय आघूर्ण μ=√n(n+2)), लैंथेनॉयड संकुचन, KMnO₄/K₂Cr₂O₇', authorOrTopicEn: 'Transition Metals, Spin-only Magnetic Moment, Lanthanoid Contraction & KMnO₄ Prep', keyFocusHi: 'लैंथेनॉयड संकुचन के कारण व परिणाम तथा संक्रमण धातुओं के अनुचुंबकीय गुण', keyFocusEn: 'Causes & consequences of Lanthanoid Contraction + K₂Cr₂O₇ preparation', boardWeightage: '6 Marks' },
      { id: 'c12c-5', number: 5, sectionHi: 'अकार्बनिक रसायन', sectionEn: 'Inorganic Chemistry', titleHi: 'उपसहसंयोजन यौगिक', titleEn: 'Coordination Compounds', authorOrTopicHi: 'वर्नर सिद्धांत, संकुल यौगिकों का IUPAC नामकरण, लिगैंड (द्विदंती/उभयदंती) व CFT/VBT', authorOrTopicEn: 'Werner’s Theory, IUPAC Nomenclature, Ambidentate Ligands, VBT & CFT', keyFocusHi: '[Fe(CN)₆]⁴⁻, [Ni(CO)₄], [Co(NH₃)₆]³⁺ का IUPAC नाम व संकरण/चुंबकीय प्रकृति', keyFocusEn: 'IUPAC naming of coordination complexes + VBT hybridization (sp³ vs dsp²)', boardWeightage: '6 Marks Fixed' },
      { id: 'c12c-6', number: 6, sectionHi: 'कार्बनिक रसायन', sectionEn: 'Organic Chemistry', titleHi: 'हैलोऐल्केन तथा हैलोऐरीन', titleEn: 'Haloalkanes and Haloarenes', authorOrTopicHi: 'SN1 बनाम SN2 क्रियाविधि, वुर्ट्ज़-फिटिग अभिक्रिया, सैंडमायर अभिक्रिया व क्लोरोफॉर्म', authorOrTopicEn: 'SN1 vs SN2 Mechanism, Wurtz-Fittig, Sandmeyer Reaction & Finkelstein/Swarts', keyFocusHi: 'क्लोरोबेन्जीन की नाभिकस्नेही प्रतिस्थापन के प्रति कम क्रियाशीलता व DDT/फ्रीऑन', keyFocusEn: 'Why haloarenes are less reactive toward nucleophilic substitution (Resonance)', boardWeightage: '7 Marks' },
      { id: 'c12c-7', number: 7, sectionHi: 'कार्बनिक रसायन', sectionEn: 'Organic Chemistry', titleHi: 'ऐल्कोहॉल, फीनॉल एवं ईथर', titleEn: 'Alcohols, Phenols and Ethers', authorOrTopicHi: 'रीमर-टीमैन अभिक्रिया (सैलिसिलैल्डिहाइड), कोल्बे अभिक्रिया, विलियमसन ईथर संश्लेषण व ल्यूकास परीक्षण', authorOrTopicEn: 'Reimer-Tiemann, Kolbe’s Reaction, Williamson Ether Synthesis & Lucas Test (1°/2°/3°)', keyFocusHi: 'फीनॉल की अम्लीय प्रकृति व प्राथमिक, द्वितीयक, तृतीयक ऐल्कोहॉल में विभेद (ल्यूकास/विहाइड्रोजनीकरण)', keyFocusEn: 'Reimer-Tiemann & Kolbe reactions + Distinguishing 1°, 2°, 3° alcohols', boardWeightage: '7 Marks Guaranteed' },
      { id: 'c12c-8', number: 8, sectionHi: 'कार्बनिक रसायन', sectionEn: 'Organic Chemistry', titleHi: 'ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल', titleEn: 'Aldehydes, Ketones and Carboxylic Acids', authorOrTopicHi: 'कैनिजारो अभिक्रिया, ऐल्डोल संघनन, टॉलेन/फेहलिंग परीक्षण, रोजेनमुंड व HVZ अभिक्रिया', authorOrTopicEn: 'Cannizzaro, Aldol Condensation, Rosenmund, Tollens’/Fehling’s Test & HVZ', keyFocusHi: '"क्या होता है जब" व नेम रिएक्शंस — ऐल्डोल (α-H युक्त) तथा कैनिजारो (α-H रहित HCHO/C₆H₅CHO)', keyFocusEn: 'Aldol vs Cannizzaro (α-Hydrogen rule) + "How will you convert" equations (8 Marks)', boardWeightage: '8 Marks Fixed' },
      { id: 'c12c-9', number: 9, sectionHi: 'कार्बनिक रसायन', sectionEn: 'Organic Chemistry', titleHi: 'ऐमीन (Amines)', titleEn: 'Amines (Gabriel, Hofmann & Carbylamine)', authorOrTopicHi: 'हॉफमान ब्रोमामाइड निम्नीकरण, गैब्रिएल थैलिमाइड, कार्बिलऐमीन परीक्षण व हिन्सबर्ग अभिकर्मक', authorOrTopicEn: 'Hofmann Bromamide Degradation, Gabriel Phthalimide, Carbylamine & Hinsberg Test', keyFocusHi: '1°, 2° व 3° ऐमीन का हिन्सबर्ग परीक्षण तथा क्षारीय प्रबलता क्रम (गैस बनाम जलीय माध्यम)', keyFocusEn: 'Carbylamine test for 1° amines & Basicity order of methyl/ethyl amines in water', boardWeightage: '6 Marks' },
      { id: 'c12c-10', number: 10, sectionHi: 'जैव रसायन', sectionEn: 'Biomolecules', titleHi: 'जैव-अणु (ग्लूकोज, प्रोटीन, DNA/RNA)', titleEn: 'Biomolecules (Glucose, Proteins, Vitamins & DNA/RNA)', authorOrTopicHi: 'ग्लूकोज की 5 रासायनिक अभिक्रियाएँ (OH/CHO प्रमाण), पेप्टाइड बंध, विकृतीकरण व DNA बनाम RNA', authorOrTopicEn: '5 Reactions Proving Glucose Structure, Zwitter Ion, Denaturation & DNA vs RNA', keyFocusHi: 'ग्लूकोज में 5 –OH व –CHO समूह सिद्ध करने की समीकरण व DNA/RNA में 4 अंतर — 7 अंक', keyFocusEn: 'Proof of 5 –OH & 1 –CHO in Glucose + Vitamins A/B/C/D deficiency & DNA vs RNA', boardWeightage: '7 Marks Fixed' }
    ],
    coreMcqs: [
      {
        id: 'c12c-mcq-1',
        questionHi: 'प्रथम कोटि की अभिक्रिया के वेग स्थिरांक k का मात्रक क्या होता है?',
        questionEn: 'What is the unit of rate constant (k) for a first-order reaction?',
        optionsHi: ['mol L⁻¹ s⁻¹', 's⁻¹ (समय⁻¹)', 'L mol⁻¹ s⁻¹', 'L² mol⁻² s⁻¹'],
        optionsEn: ['mol L⁻¹ s⁻¹', 's⁻¹ (time⁻¹)', 'L mol⁻¹ s⁻¹', 'L² mol⁻² s⁻¹'],
        correctIndex: 1,
        explanationHi: 'n कोटि हेतु मात्रक (mol L⁻¹)¹⁻ⁿ s⁻¹ में n=1 रखने पर प्रथम कोटि का मात्रक s⁻¹ (प्रति सेकंड) आता है।',
        explanationEn: 'Using general formula (mol L⁻¹)¹⁻ⁿ s⁻¹ with n = 1 gives s⁻¹ (time⁻¹).',
        chapter: 'रासायनिक बलगतिकी',
        chapterEn: 'Chemical Kinetics',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c12c-mcq-2',
        questionHi: 'निम्नलिखित में से कौन-सा यौगिक "कैनिजारो अभिक्रिया" (Cannizzaro Reaction) देता है?',
        questionEn: 'Which of the following compounds undergoes Cannizzaro Reaction?',
        optionsHi: ['CH₃CHO (ऐसीटैल्डिहाइड)', 'HCHO (फॉर्मेल्डिहाइड)', 'CH₃COCH₃ (ऐसीटोन)', 'CH₃CH₂CHO'],
        optionsEn: ['CH₃CHO (Acetaldehyde)', 'HCHO (Formaldehyde)', 'CH₃COCH₃ (Acetone)', 'CH₃CH₂CHO'],
        correctIndex: 1,
        explanationHi: 'जिन ऐल्डिहाइड में α-हाइड्रोजन परमाणु अनुपस्थित होता है (जैसे HCHO व C₆H₅CHO), वे सांद्र NaOH से कैनिजारो अभिक्रिया देते हैं।',
        explanationEn: 'Aldehydes lacking an α-hydrogen atom (such as HCHO and Benzaldehyde) give Cannizzaro reaction with conc. NaOH.',
        chapter: 'ऐल्डिहाइड, कीटोन एवं कार्बोक्सिलिक अम्ल',
        chapterEn: 'Aldehydes, Ketones and Carboxylic Acids',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c12c-imp-1',
        marks: 5,
        chapter: 'ऐल्डिहाइड, कीटोन व फीनॉल (नेम रिएक्शंस)',
        chapterEn: 'Top Organic Name Reactions',
        questionHi: 'रासायनिक समीकरण सहित संक्षिप्त टिप्पणी लिखिए: (i) रीमर-टीमैन अभिक्रिया (ii) कैनिजारो अभिक्रिया (iii) ऐल्डोल संघनन (iv) हॉफमान ब्रोमामाइड अभिक्रिया।',
        questionEn: 'Write short notes with balanced chemical equations on: (i) Reimer-Tiemann, (ii) Cannizzaro, (iii) Aldol Condensation, (iv) Hofmann Bromamide Reaction.',
        answerHi: '1. रीमर-टीमैन: फीनॉल + CHCl₃ + 3NaOH (340K) → H⁺ → सैलिसिलैल्डिहाइड (2-हाइड्रॉक्सीबेन्जैल्डिहाइड)।\n2. कैनिजारो: 2HCHO + सांद्र NaOH → CH₃OH (मेथैनॉल) + HCOONa (सोडियम फॉर्मेट)।\n3. ऐल्डोल संघनन: 2CH₃CHO + तनु NaOH → CH₃-CH(OH)-CH₂-CHO (ऐल्डोल) → Δ → ब्यूट-2-ईनैल।\n4. हॉफमान ब्रोमामाइड: R-CONH₂ + Br₂ + 4KOH → R-NH₂ (1° ऐमीन, एक कम कार्बन) + K₂CO₃ + 2KBr + 2H₂O।',
        answerEn: '1. Reimer-Tiemann: Phenol + CHCl₃ + aq. NaOH -> Salicylaldehyde (o-hydroxybenzaldehyde).\n2. Cannizzaro: 2HCHO + Conc. NaOH -> CH₃OH + HCOONa.\n3. Aldol Condensation: 2CH₃CHO + dil. NaOH -> 3-Hydroxybutanal -> But-2-enal + H₂O.\n4. Hofmann Bromamide: RCONH₂ + Br₂ + 4KOH -> RNH₂ (1 carbon less) + K₂CO₃ + 2KBr + 2H₂O.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '5-8 Marks Name Reactions',
        tagEn: '5-8 Marks Name Reactions'
      }
    ],
    biographies: [
      {
        id: 'c12c-bio-werner',
        authorNameHi: 'अल्फ्रेड वर्नर एवं फ्रांस्वा राउल्ट',
        authorNameEn: 'Alfred Werner & François-Marie Raoult',
        period: '1830 – 1919',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'फ्रांस / स्विट्ज़रलैंड',
        birthPlaceEn: 'France / Switzerland',
        notableWorksHi: ['राउल्ट का वाष्पदाब नियम', 'वर्नर उपसहसंयोजन सिद्धांत'],
        notableWorksEn: ['Raoult’s Law of Vapour Pressure', 'Werner’s Coordination Theory'],
        summaryHi: 'भौतिक रसायन में राउल्ट नियम व अकार्बनिक रसायन में वर्नर की प्राथमिक-द्वितीयक संयोजकता सर्वाधिक महत्वपूर्ण प्रश्न हैं।',
        summaryEn: 'Raoult’s Law (Ch 1) and Werner’s Primary/Secondary Valency Theory (Ch 5) appear almost every year in UPMSP Chemistry.',
        examTipsHi: 'राउल्ट नियम के साथ आदर्श व अनादर्श विलयन के उदाहरण भी लिखें।',
        examTipsEn: 'Mention positive & negative deviation examples alongside Raoult’s Law formula.',
        examWordLimit: '3-5 Mark Key Concept'
      }
    ],
    solvedPapers: buildClass12ThreeYearPapers(
      'c12-chemistry', '347', 'रसायन विज्ञान', 'Chemistry', 70,
      'मोलरता-राउल्ट न्यूमेरिकल, प्रथम कोटि, नेम रिएक्शंस व ग्लूकोज', 'Solutions Numericals, Kinetics, Organic Conversions & Glucose',
      '6 MCQ, विलयन-बलगतिकी के 3M न्यूमेरिकल, वर्नर-IUPAC नाम तथा 5M में कैनिजारो/रीमर-टीमैन/"क्या होता है जब"।',
      '6 MCQs, Solutions & Kinetics numericals, Coordination IUPAC & 5M Organic Name Reactions.'
    )
  },

  // 5. CLASS 12 MATHEMATICS (Code 348) - All 13 Chapters
  {
    id: 'c12-maths',
    classLevel: '12',
    code: '348',
    nameHi: 'गणित (Mathematics - 13 अध्याय)',
    nameEn: 'Mathematics (Code 348 - All 13 Chapters)',
    taglineHi: 'सभी 13 अध्याय: आव्यूह विधि X=A⁻¹B (8M), निश्चित समाकलन, 3D न्यूनतम दूरी व LPP',
    taglineEn: 'All 13 Chapters: Matrix X=A⁻¹B (8M), Integrals, 3D Shortest Distance & Bayes',
    iconName: 'Calculator',
    colorTheme: {
      bgLight: 'bg-violet-50/70',
      bgDark: 'dark:bg-violet-950/20',
      borderLight: 'border-violet-200',
      borderDark: 'dark:border-violet-800/40',
      accent: 'text-violet-600 dark:text-violet-400',
      text: 'hover:border-violet-400',
    },
    chapterDetails: [
      { id: 'c12m-1', number: 1, sectionHi: 'संबंध व फलन', sectionEn: 'Relations & Functions', titleHi: 'संबंध एवं फलन (तुल्यता व एकैकी-आच्छादक)', titleEn: 'Relations and Functions (Equivalence, One-One & Onto)', authorOrTopicHi: 'स्वतुल्य, सममित, संक्रामक (तुल्यता संबंध) सिद्ध करना — 5 अंक', authorOrTopicEn: 'Reflexive, Symmetric, Transitive Equivalence Proofs & Bijective Functions', keyFocusHi: 'R = {(a,b) : |a-b| सम है} को तुल्यता संबंध सिद्ध करना', keyFocusEn: 'Proving equivalence relations & bijectivity of f(x) = 3x / (x-2)/(x-3)', boardWeightage: '5 Marks Fixed' },
      { id: 'c12m-2', number: 2, sectionHi: 'त्रिकोणमिति', sectionEn: 'Inverse Trig', titleHi: 'प्रतिलोम त्रिकोणमितीय फलन', titleEn: 'Inverse Trigonometric Functions', authorOrTopicHi: 'मुख्य मान शाखा (Principal Value) व tan⁻¹x + tan⁻¹y के सिद्ध प्रश्न', authorOrTopicEn: 'Principal Value Branch & Simplification Identities', keyFocusHi: 'cos⁻¹(-½) व sin⁻¹(-½) के मुख्य मान (2 अंक OMR/लघु पक्का)', keyFocusEn: 'Finding principal values of sin⁻¹(-½), sec⁻¹(2/√3) and tan⁻¹((cos x - sin x)/(cos x + sin x))', boardWeightage: '4 Marks' },
      { id: 'c12m-3', number: 3, sectionHi: 'बीजगणित', sectionEn: 'Algebra', titleHi: 'आव्यूह (Matrices)', titleEn: 'Matrices (Symmetric/Skew-Symmetric & A² - 5A + 6I)', authorOrTopicHi: 'सममित व विषम सममित आव्यूह के योग के रूप में निरूपण, AB गुणा व A⁻¹', authorOrTopicEn: 'Matrix Multiplication, Transpose & Expressing A as Symmetric + Skew-Symmetric', keyFocusHi: 'यदि A = [...] तो सिद्ध करें A³ - 6A² + 7A + 2I = O (5 अंक)', keyFocusEn: 'Verifying Cayley-Hamilton polynomial equations & finding A⁻¹', boardWeightage: '6 Marks' },
      { id: 'c12m-4', number: 4, sectionHi: 'बीजगणित', sectionEn: 'Algebra', titleHi: 'सारणिक (Determinants - X = A⁻¹B 8M)', titleEn: 'Determinants (Matrix Method X = A⁻¹B — 8M Fixed)', authorOrTopicHi: 'आव्यूह विधि से 3 रैखिक समीकरणों का हल X = A⁻¹B (8 अंक 100% गारंटीड)', authorOrTopicEn: 'Solving 3x3 Linear Equations by Matrix Method X = A⁻¹B (8 Marks Guaranteed)', keyFocusHi: '|A| ≠ 0 → adj(A) → A⁻¹ = adj(A)/|A| → X = A⁻¹B (प्रत्येक वर्ष 8 अंक)', keyFocusEn: 'Step-by-step computation of Cofactors, Adjoint, A⁻¹ and solution X=A⁻¹B', boardWeightage: '8 Marks 100% Fixed',
        formulaOrTrickHi: '8M पक्का सूत्र: X = A⁻¹B, जहाँ A⁻¹ = (1/|A|) · adj(A) [|A| ≠ 0]',
        formulaOrTrickEn: '8M Guaranteed Formula: X = A⁻¹B where A⁻¹ = (1/|A|) · adj(A) [|A| ≠ 0]' },
      { id: 'c12m-5', number: 5, sectionHi: 'कलन (Calculus)', sectionEn: 'Calculus', titleHi: 'सांतत्य तथा अवकलनीयता', titleEn: 'Continuity and Differentiability', authorOrTopicHi: 'LHL = RHL = f(c), लघुगणकीय अवकलन (x^sinx), प्राचलिक व द्वितीय कोटि d²y/dx²', authorOrTopicEn: 'Continuity at x=c, Logarithmic Differentiation (x^cosx), Parametric & Second Order', keyFocusHi: 'यदि y = sin⁻¹x तो सिद्ध करें (1-x²)y₂ - xy₁ = 0 (5 अंक पक्का)', keyFocusEn: 'Proving second-order differential identities like (1-x²)d²y/dx² - x dy/dx = 0', boardWeightage: '8 Marks' },
      { id: 'c12m-6', number: 6, sectionHi: 'कलन (Calculus)', sectionEn: 'Calculus', titleHi: 'अवकलज के अनुप्रयोग (Maxima & Minima)', titleEn: 'Applications of Derivatives (Maxima & Minima)', authorOrTopicHi: 'वर्धमान-ह्रासमान, स्पर्श रेखा-अभिलंब व उच्चिष्ठ-निम्निष्ठ (8 अंक पक्का)', authorOrTopicEn: 'Increasing/Decreasing, Rate of Change & Maxima/Minima Word Problems (8M)', keyFocusHi: 'शंकु/बेलन का अधिकतम आयतन या न्यूनतम वक्रपृष्ठ — 8 अंक दीर्घ प्रश्न', keyFocusEn: 'Maximizing volume of cylinder/cone inscribed in a sphere (8 Marks)', boardWeightage: '8 Marks' },
      { id: 'c12m-7', number: 7, sectionHi: 'कलन (Calculus)', sectionEn: 'Calculus', titleHi: 'समाकलन (Integrals - P4 प्रगुण 8M)', titleEn: 'Integrals (Indefinite & Definite King Property P4 — 8M)', authorOrTopicHi: 'खंडशः समाकलन, आंशिक भिन्न व निश्चित समाकलन प्रगुण P₄: ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a-x)dx', authorOrTopicEn: 'Integration by Parts, Partial Fractions & Property ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a-x)dx', keyFocusHi: '∫₀^(π/2) √sinx/(√sinx + √cosx) dx = π/4 व ∫₀^(π/2) log(sin x) dx = -(π/2)log2 (8 अंक)', keyFocusEn: 'Evaluating ∫₀^(π/2) log(sin x)dx = -(π/2)log2 & ∫ x/(1+cos²x) dx (8 Marks)', boardWeightage: '14 Marks Guaranteed' },
      { id: 'c12m-8', number: 8, sectionHi: 'कलन (Calculus)', sectionEn: 'Calculus', titleHi: 'समाकलनों के अनुप्रयोग (वक्रों का क्षेत्रफल)', titleEn: 'Applications of Integrals (Area Under Curves)', authorOrTopicHi: 'दीर्घवृत्त x²/a² + y²/b² = 1 का क्षेत्रफल (πab) व परवलय-रेखा क्षेत्रफल', authorOrTopicEn: 'Area of Ellipse (πab), Circle (πa²) & Area Bounded by Parabola and Line', keyFocusHi: 'समाकलन विधि से दीर्घवृत्त या वृत्त का संपूर्ण क्षेत्रफल ज्ञात करना — 5 अंक', keyFocusEn: 'Finding area bounded by y² = 4ax and y = mx or x²/a² + y²/b² = 1', boardWeightage: '5 Marks' },
      { id: 'c12m-9', number: 9, sectionHi: 'कलन (Calculus)', sectionEn: 'Calculus', titleHi: 'अवकल समीकरण (Differential Equations)', titleEn: 'Differential Equations (Linear & Homogeneous)', authorOrTopicHi: 'कोटि व घात (2M), समघातीय समीकरण (y=vx) व रैखिक dy/dx + Py = Q (IF = e^∫Pdx)', authorOrTopicEn: 'Order & Degree, Homogeneous (y=vx) & Linear DE (IF = e^∫Pdx)', keyFocusHi: 'रैखिक अवकल समीकरण dy/dx + Py = Q का व्यापक हल y·(IF) = ∫Q·(IF)dx + C — 5-8 अंक', keyFocusEn: 'Solving Linear Differential Equations using Integrating Factor IF = e^∫Pdx (5-8M)', boardWeightage: '8 Marks Fixed' },
      { id: 'c12m-10', number: 10, sectionHi: 'सदिश व 3D', sectionEn: 'Vectors', titleHi: 'सदिश बीजगणित (Vector Algebra)', titleEn: 'Vector Algebra (Dot & Cross Product)', authorOrTopicHi: 'प्रक्षेप (a·b/|b|), दोनों पर लम्ब एकांक सदिश (a×b/|a×b|) व समांतर चतुर्भुज क्षेत्रफल', authorOrTopicEn: 'Projection of Vector, Unit Vector ⊥ to both (a×b/|a×b|) & Area of Parallelogram', keyFocusHi: 'यदि a+b+c=0 तो a·b + b·c + c·a का मान ज्ञात करना — 5 अंक पक्का', keyFocusEn: 'Finding |a×b| & unit perpendicular vector; angle between two vectors', boardWeightage: '6 Marks' },
      { id: 'c12m-11', number: 11, sectionHi: 'सदिश व 3D', sectionEn: '3D Geometry', titleHi: 'त्रिविमीय ज्यामिति (न्यूनतम दूरी 8M)', titleEn: 'Three-Dimensional Geometry (Shortest Distance 8M Fixed)', authorOrTopicHi: 'दो विषमतलीय रेखाओं के बीच की न्यूनतम दूरी d = |(a₂-a₁)·(b₁×b₂)| / |b₁×b₂| — 8 अंक फिक्स्ड', authorOrTopicEn: 'Shortest Distance Between Two Skew Lines d = |(a₂-a₁)·(b₁×b₂)| / |b₁×b₂| (8M Fixed)', keyFocusHi: 'प्रत्येक वर्ष 8 या 5 अंक में 100% आने वाला न्यूनतम दूरी का प्रश्न', keyFocusEn: 'Vector & Cartesian shortest distance formula + angle between two lines', boardWeightage: '8 Marks Guaranteed' },
      { id: 'c12m-12', number: 12, sectionHi: 'रैखिक प्रोग्रामन', sectionEn: 'LPP', titleHi: 'रैखिक प्रोग्रामन (Linear Programming)', titleEn: 'Linear Programming (Graphical Max/Min Z — 5M)', authorOrTopicHi: 'आलेखीय विधि से उद्देश्य फलन Z = ax + by का अधिकतमीकरण / न्यूनतमीकरण व कोणीय बिंदु', authorOrTopicEn: 'Graphical Feasible Region & Corner Point Method to Maximize/Minimize Z = ax + by', keyFocusHi: 'असमानता का ग्राफ खींचकर सुसंगत क्षेत्र के कोणीय बिंदुओं पर Z का अधिकतम मान (5 अंक)', keyFocusEn: 'Plotting constraints cleanly and evaluating Z at all corner vertices (5 Marks)', boardWeightage: '5 Marks Fixed' },
      { id: 'c12m-13', number: 13, sectionHi: 'प्रायिकता', sectionEn: 'Probability', titleHi: 'प्रायिकता (सप्रतिबंध व बेज़ प्रमेय)', titleEn: 'Probability (Conditional & Bayes’ Theorem)', authorOrTopicHi: 'P(A|B) = P(A∩B)/P(B), स्वतंत्र घटना P(A∩B)=P(A)P(B) व बेज़ प्रमेय (5 अंक)', authorOrTopicEn: 'Conditional Probability, Independent Events & Bayes’ Theorem (5-8 Marks)', keyFocusHi: 'थैले-गेंद और सत्य बोलने वाले व्यक्ति के बेज़ प्रमेय प्रश्न — 5-8 अंक पक्का', keyFocusEn: 'Bayes’ Theorem bag-ball & truth-speaking numericals (5-8 Marks)', boardWeightage: '8 Marks Fixed' }
    ],
    coreMcqs: [
      {
        id: 'c12m-mcq-1',
        questionHi: 'अवकल समीकरण [1 + (dy/dx)²]³ = d²y/dx² की कोटि (Order) एवं घात (Degree) क्या है?',
        questionEn: 'What are the Order and Degree of the differential equation [1 + (dy/dx)²]³ = d²y/dx²?',
        optionsHi: ['कोटि 2, घात 1', 'कोटि 2, घात 3', 'कोटि 1, घात 3', 'कोटि 3, घात 2'],
        optionsEn: ['Order 2, Degree 1', 'Order 2, Degree 3', 'Order 1, Degree 3', 'Order 3, Degree 2'],
        correctIndex: 0,
        explanationHi: 'उच्चतम अवकलज d²y/dx² की कोटि 2 है तथा इसकी घात 1 है (अतः कोटि 2, घात 1)।',
        explanationEn: 'Highest derivative is d²y/dx² (Order = 2) and its highest power is 1 (Degree = 1).',
        chapter: 'अवकल समीकरण',
        chapterEn: 'Differential Equations',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c12m-mcq-2',
        questionHi: 'निश्चित समाकलन ∫₀^(π/2) √sin x / (√sin x + √cos x) dx का मान क्या होगा?',
        questionEn: 'Evaluate the definite integral: ∫₀^(π/2) √sin x / (√sin x + √cos x) dx.',
        optionsHi: ['π / 2', 'π / 4', 'π', '0'],
        optionsEn: ['π / 2', 'π / 4', 'π', '0'],
        correctIndex: 1,
        explanationHi: 'प्रगुण P₄: I = ∫₀^(π/2) f(π/2 - x) dx जोड़ने पर 2I = ∫₀^(π/2) 1 dx = π/2 => I = π/4।',
        explanationEn: 'Using King Property ∫₀ᵃ f(x)dx = ∫₀ᵃ f(a-x)dx gives 2I = π/2, hence I = π/4.',
        chapter: 'समाकलन',
        chapterEn: 'Integrals',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c12m-imp-1',
        marks: 8,
        chapter: 'सारणिक (आव्यूह विधि X=A⁻¹B)',
        chapterEn: 'Determinants (Matrix Method)',
        questionHi: 'आव्यूह विधि से निम्नलिखित रैखिक समीकरण निकाय को हल कीजिए (8 अंक पक्का): x + y + z = 6, y + 3z = 11, x - 2y + z = 0।',
        questionEn: 'Solve the system of equations using Matrix Method (8 Marks Fixed): x + y + z = 6, y + 3z = 11, x - 2y + z = 0.',
        answerHi: '1. AX = B के रूप में लिखने पर: A = [[1,1,1],[0,1,3],[1,-2,1]], X = [x,y,z]ᵀ, B = [6,11,0]ᵀ।\n2. सारणिक |A| = 1(1+6) - 1(0-3) + 1(0-1) = 7 + 3 - 1 = 9 ≠ 0 (अतः हल अद्वितीय है)।\n3. सहखंडज adj(A) = [[7,-3,2],[3,0,-3],[-1,3,1]]।\n4. A⁻¹ = (1/9) adj(A)।\n5. X = A⁻¹B = (1/9)[[7,-3,2],[3,0,-3],[-1,3,1]][6,11,0]ᵀ = (1/9)[9, 18, 27]ᵀ = [1, 2, 3]ᵀ।\nअतः x = 1, y = 2, z = 3।',
        answerEn: '1. Write AX = B with A = [[1,1,1],[0,1,3],[1,-2,1]], B = [6,11,0]ᵀ.\n2. Determinant |A| = 1(1+6) - 1(0-3) + 1(0-1) = 9 ≠ 0.\n3. Compute Cofactors & Transpose to get adj(A) = [[7,-3,2],[3,0,-3],[-1,3,1]].\n4. X = A⁻¹B = (1/9)[9, 18, 27]ᵀ = [1, 2, 3]ᵀ.\nAnswer: x = 1, y = 2, z = 3.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '8 Marks 100% Fixed',
        tagEn: '8 Marks 100% Fixed'
      }
    ],
    biographies: [
      {
        id: 'c12m-bio-leibniz',
        authorNameHi: 'गॉटफ्रीड लाइबनिज एवं थॉमस बेज़',
        authorNameEn: 'Gottfried Leibniz & Thomas Bayes',
        period: '1646 – 1761',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'जर्मनी / इंग्लैंड',
        birthPlaceEn: 'Germany / England',
        notableWorksHi: ['कलन (dy/dx व ∫) संकेत', 'बेज़ प्रायिकता प्रमेय'],
        notableWorksEn: ['Calculus Notation (dy/dx, ∫)', 'Bayes’ Conditional Theorem'],
        summaryHi: 'कक्षा 12 गणित के कुल 100 में से 44 अंक केवल कलन (Calculus) व 8-8 अंक आव्यूह/3D न्यूनतम दूरी से आते हैं।',
        summaryEn: 'Calculus carries 44/100 marks in UPMSP Class 12 Mathematics, alongside guaranteed 8M Matrix and 3D Shortest Distance questions.',
        examTipsHi: '8 अंक के तीन बड़े प्रश्न: X=A⁻¹B, निश्चित समाकलन P₄ प्रगुण, और 3D न्यूनतम दूरी को अंत में जांचकर हल करें।',
        examTipsEn: 'Double-check determinant sign errors in X=A⁻¹B and cross-product signs in 3D Shortest Distance.',
        examWordLimit: '8-Mark Strategy'
      }
    ],
    solvedPapers: buildClass12ThreeYearPapers(
      'c12-maths', '348', 'गणित', 'Mathematics', 100,
      'आव्यूह विधि X=A⁻¹B, समाकलन P4 प्रगुण, LPP व 3D न्यूनतम दूरी', 'Matrix Method, Integrals P4, LPP & 3D Shortest Distance',
      '5 MCQ (1M), 1M के 5, 2M के 4, 5M के 10 प्रश्न व खंड-7/8/9 में 8-8 अंकों के 3 दीर्घ उत्तरीय सवाल।',
      '5 MCQs, 1M/2M short questions, 5M proofs & three 8-mark long questions (Matrix, Integrals, 3D).'
    )
  },

  // 6. CLASS 12 BIOLOGY (Code 349) - All 13 Chapters
  {
    id: 'c12-biology',
    classLevel: '12',
    code: '349',
    nameHi: 'जीव विज्ञान (Biology - 13 अध्याय)',
    nameEn: 'Biology (Code 349 - All 13 Chapters)',
    taglineHi: 'सभी 13 अध्याय: द्विनिषेचन, मानव जनन, मेंडल, DNA द्विकुंडली मॉडल, PCR व जैव विविधता',
    taglineEn: 'All 13 Chapters: Double Fertilization, DNA Double Helix, PCR & Biodiversity',
    iconName: 'Dna',
    colorTheme: {
      bgLight: 'bg-teal-50/70',
      bgDark: 'dark:bg-teal-950/20',
      borderLight: 'border-teal-200',
      borderDark: 'dark:border-teal-800/40',
      accent: 'text-teal-600 dark:text-teal-400',
      text: 'hover:border-teal-400',
    },
    chapterDetails: [
      { id: 'c12b-1', number: 1, sectionHi: 'जनन (Reproduction)', sectionEn: 'Reproduction', titleHi: 'पुष्पी पादपों में लैंगिक जनन', titleEn: 'Sexual Reproduction in Flowering Plants', authorOrTopicHi: 'द्विनिषेचन (Double Fertilization), भ्रूणकोष (7-कोशिकीय 8-केंद्रकीय) व लघुबीजाणुजनन', authorOrTopicEn: 'Double Fertilization, Triple Fusion, 7-Celled 8-Nucleate Embryo Sac & Pollination', keyFocusHi: 'द्विनिषेचन व त्रिसंलयन की क्रिया तथा प्रारूपिक बीजांड का नामांकित चित्र (5 अंक)', keyFocusEn: 'Double fertilization (Syngamy + Triple fusion) & labelled diagram of Anatropous Ovule', boardWeightage: '6 Marks Fixed' },
      { id: 'c12b-2', number: 2, sectionHi: 'जनन (Reproduction)', sectionEn: 'Reproduction', titleHi: 'मानव जनन (Human Reproduction)', titleEn: 'Human Reproduction', authorOrTopicHi: 'शुक्रजनन बनाम अंडजनन, आर्तव चक्र (Menstrual Cycle) व शुक्राणु का नामांकित चित्र', authorOrTopicEn: 'Spermatogenesis vs Oogenesis, Menstrual Cycle Hormones (LH/FSH) & Sperm Structure', keyFocusHi: 'मानव शुक्राणु का सचित्र वर्णन तथा शुक्रजनन व अंडजनन में अंतर — 5 अंक पक्का', keyFocusEn: 'Labelled Human Sperm diagram + Graafian Follicle & Menstrual Cycle phases', boardWeightage: '6 Marks' },
      { id: 'c12b-3', number: 3, sectionHi: 'जनन (Reproduction)', sectionEn: 'Reproduction', titleHi: 'जनन स्वास्थ्य (Reproductive Health)', titleEn: 'Reproductive Health', authorOrTopicHi: 'परिवार नियोजन विधियाँ (IUD, वैसैक्टॉमी/ट्यूबेक्टॉमी), उल्वबेधन (Amniocentesis) व IVF-ZIFT', authorOrTopicEn: 'Contraceptives (Copper-T, Pills), Amniocentesis Ban & ART (IVF, ZIFT, GIFT)', keyFocusHi: 'टेस्ट ट्यूब बेबी (IVF), ZIFT व GIFT पर 3 अंक संक्षिप्त टिप्पणी', keyFocusEn: 'Distinguishing ZIFT, GIFT, ICSI & Amniocentesis misuse prevention', boardWeightage: '4 Marks' },
      { id: 'c12b-4', number: 4, sectionHi: 'आनुवंशिकी', sectionEn: 'Genetics', titleHi: 'वंशागति तथा विविधता के सिद्धांत', titleEn: 'Principles of Inheritance and Variation', authorOrTopicHi: 'मेंडल के 3 नियम, अपूर्ण प्रभाविता (1:2:1), लिंग सहलग्न (हीमोफीलिया/वर्णांधता) व मधुमक्खी/मानव लिंग निर्धारण', authorOrTopicEn: 'Mendel’s Laws, Incomplete Dominance (1:2:1), Haemophilia/Color Blindness & Sex Determination', keyFocusHi: 'हीमोफीलिया व वर्णांधता की वंशागति का क्रॉस आरेख तथा डाउन/टर्नर सिंड्रोम (5 अंक)', keyFocusEn: 'Pedigree/Cross of Color-blindness & Haemophilia + Down’s (47, +21) & Turner’s (XO)', boardWeightage: '7 Marks Fixed' },
      { id: 'c12b-5', number: 5, sectionHi: 'आनुवंशिकी', sectionEn: 'Molecular Genetics', titleHi: 'वंशागति का आणविक आधार (DNA मॉडल)', titleEn: 'Molecular Basis of Inheritance (Watson-Crick DNA)', authorOrTopicHi: 'वाटसन-क्रिक DNA द्विकुंडली मॉडल, प्रतिकृतिकरण, अनुलेखन (Transcription), आनुवंशिक कूट (AUG) व लैक ऑपेरॉन', authorOrTopicEn: 'Watson-Crick DNA Helix, Hershey-Chase Experiment, Genetic Code & Lac Operon', keyFocusHi: 'DNA की द्विकुंडली संरचना, A=T, G≡C नियम व DNA बनाम RNA में अंतर — 5 अंक फिक्स्ड', keyFocusEn: 'Watson-Crick DNA model (3.4 nm pitch, Chargaff rule) & DNA Fingerprinting (5 Marks)', boardWeightage: '8 Marks Guaranteed' },
      { id: 'c12b-6', number: 6, sectionHi: 'विकास', sectionEn: 'Evolution', titleHi: 'विकास (Evolution)', titleEn: 'Evolution (Darwin, Miller-Urey & Hardy-Weinberg)', authorOrTopicHi: 'मिलर का चिंगारी विसर्जन प्रयोग (CH₄, NH₃, H₂, H₂O), समजात बनाम समवृत्ति अंग व हार्डी-विनबर्ग नियम', authorOrTopicEn: 'Miller-Urey Experiment, Homologous vs Analogous Organs & Hardy-Weinberg Equilibrium (p²+2pq+q²=1)', keyFocusHi: 'समजात व समवृत्ति अंगों में अंतर तथा मिलर प्रयोग का सचित्र वर्णन', keyFocusEn: 'Homologous (divergent) vs Analogous (convergent) examples & Hardy-Weinberg factors', boardWeightage: '4 Marks' },
      { id: 'c12b-7', number: 7, sectionHi: 'मानव स्वास्थ्य', sectionEn: 'Human Health', titleHi: 'मानव स्वास्थ्य तथा रोग', titleEn: 'Human Health and Disease', authorOrTopicHi: 'सक्रिय व निष्क्रिय प्रतिरक्षा, मलेरिया (प्लाज्मोडियम चक्र), टाइफाइड (विडाल), डेंगू, कैंसर व AIDS (ELISA)', authorOrTopicEn: 'Active vs Passive Immunity, Malaria Life Cycle, Typhoid (Widal), Cancer & HIV/AIDS', keyFocusHi: 'प्रतिरक्षी (Antibody H₂L₂) संरचना व मलेरिया/अमीबता का रोगजनक व रोकथाम (5 अंक)', keyFocusEn: 'Antibody H₂L₂ structure, Widal test, ELISA for AIDS & Innate vs Acquired Immunity', boardWeightage: '7 Marks' },
      { id: 'c12b-8', number: 8, sectionHi: 'सूक्ष्मजीव', sectionEn: 'Microbes', titleHi: 'मानव कल्याण में सूक्ष्मजीव', titleEn: 'Microbes in Human Welfare', authorOrTopicHi: 'पेनिसिलिन, बायोगैस संयंत्र (मेथेनोजेन), वाहित मल उपचार (BOD) व जैव उर्वरक (राइजोबियम)', authorOrTopicEn: 'Penicillin, Biogas Plant (Methanobacterium), Sewage BOD Treatment & Biofertilizers', keyFocusHi: 'वाहित मल उपचार में प्राथमिक व द्वितीयक (जैविक) उपचार व BOD की भूमिका', keyFocusEn: 'BOD (Biochemical Oxygen Demand) significance & Cyclosporin-A / Statins', boardWeightage: '4 Marks' },
      { id: 'c12b-9', number: 9, sectionHi: 'जैव प्रौद्योगिकी', sectionEn: 'Biotechnology', titleHi: 'जैव प्रौद्योगिकी - सिद्धांत व प्रक्रम (PCR)', titleEn: 'Biotechnology: Principles and Processes (PCR & rDNA)', authorOrTopicHi: 'प्रतिबंधन एंजाइम (आणविक कैंची EcoRI), pBR322 वाहक, जेल इलेक्ट्रोफोरेसिस व PCR (Taq पॉलीमरेज)', authorOrTopicEn: 'Restriction Enzymes (EcoRI), pBR322 Plasmid, Gel Electrophoresis & PCR Steps', keyFocusHi: 'PCR (निष्क्रियीकरण, एनीलिंग, प्रसार) का आरेखीय वर्णन व पुनर्योगज DNA तकनीक (5 अंक)', keyFocusEn: '3 Steps of PCR (Denaturation, Annealing, Extension with Taq polymerase) — 5 Marks Fixed', boardWeightage: '6 Marks Guaranteed' },
      { id: 'c12b-10', number: 10, sectionHi: 'जैव प्रौद्योगिकी', sectionEn: 'Biotech Apps', titleHi: 'जैव प्रौद्योगिकी एवं उसके उपयोग', titleEn: 'Biotechnology and its Applications (Bt Cotton & Insulin)', authorOrTopicHi: 'Bt कपास (Cry जीन - Bacillus thuringiensis), आनुवंशिक इंसुलिन (एली लिली) व जीन चिकित्सा (ADA)', authorOrTopicEn: 'Bt Cotton (Cry1Ac/Cry2Ab), Humulin Insulin Chains A & B & ADA Gene Therapy', keyFocusHi: 'Bt कपास कैसे कीटरोधी बनता है व पारजीनी जंतुओं (Transgenic Animals) के लाभ', keyFocusEn: 'How Cry proteins kill bollworms selectively & Human Insulin maturation', boardWeightage: '5 Marks' },
      { id: 'c12b-11', number: 11, sectionHi: 'पारिस्थितिकी', sectionEn: 'Ecology', titleHi: 'जीव और समष्टियाँ', titleEn: 'Organisms and Populations', authorOrTopicHi: 'सहोपकारिता (Mutualism - लाइकेन/माइकोराइजा), परजीविता, सहभोजिता व समष्टि वृद्धि (S-वक्र)', authorOrTopicEn: 'Population Interactions (+/+, +/-, +/0) & Logistic Verhulst-Pearl Growth Curve', keyFocusHi: 'सहोपकारिता, परजीविता व सहभोजिता के सटीक उदाहरण — 3 अंक पक्का', keyFocusEn: 'Mutualism (Fig-wasp), Commensalism (Orchid on mango) & Parasitism (Cuscuta)', boardWeightage: '4 Marks' },
      { id: 'c12b-12', number: 12, sectionHi: 'पारिस्थितिकी', sectionEn: 'Ecology', titleHi: 'पारितंत्र (Ecosystem)', titleEn: 'Ecosystem (Productivity & Ecological Pyramids)', authorOrTopicHi: 'प्राथमिक उत्पादकता (GPP - R = NPP), 10% ऊर्जा नियम व जीवभार/संख्या/ऊर्जा पिरामिड', authorOrTopicEn: 'GPP vs NPP, Decomposition Steps & Ecological Pyramids (Energy Always Upright)', keyFocusHi: 'ऊर्जा का पिरामिड सदैव सीधा (Upright) क्यों होता है? — 3 अंक पक्का', keyFocusEn: 'Why Pyramid of Energy is always upright while Biomass pyramid in sea is inverted', boardWeightage: '4 Marks' },
      { id: 'c12b-13', number: 13, sectionHi: 'पारिस्थितिकी', sectionEn: 'Biodiversity', titleHi: 'जैव विविधता एवं संरक्षण', titleEn: 'Biodiversity and Conservation', authorOrTopicHi: 'तप्त स्थल (Hotspots - 3 भारत में), रेड डाटा बुक (IUCN), स्व-स्थाने बनाम बाह्य-स्थाने संरक्षण', authorOrTopicEn: 'Biodiversity Hotspots, Red Data Book (IUCN) & In-situ vs Ex-situ Conservation', keyFocusHi: 'स्व-स्थाने (राष्ट्रीय उद्यान/अभयारण्य) व बाह्य-स्थाने (चिड़ियाघर/बीज बैंक) संरक्षण में अंतर', keyFocusEn: '4 Evil Quartet causes of biodiversity loss & In-situ vs Ex-situ examples', boardWeightage: '5 Marks' }
    ],
    coreMcqs: [
      {
        id: 'c12b-mcq-1',
        questionHi: 'आवृतबीजी पौधों के भ्रूणपोष (Endosperm) की सूत्रगुणिता (Ploidy) क्या होती है?',
        questionEn: 'What is the ploidy level of the Endosperm in angiosperm flowering plants?',
        optionsHi: ['अगुणित (n)', 'द्विगुणित (2n)', 'त्रिगुणित (3n)', 'चतुर्गुणित (4n)'],
        optionsEn: ['Haploid (n)', 'Diploid (2n)', 'Triploid (3n)', 'Tetraploid (4n)'],
        correctIndex: 2,
        explanationHi: 'त्रिसंलयन (एक नर युग्मक n + द्वितीयक केंद्रक 2n) से प्राथमिक भ्रूणपोष केंद्रक (PEN) बनता है जो त्रिगुणित (3n) होता है।',
        explanationEn: 'Triple fusion (1 male gamete n + 2 polar nuclei 2n) yields a Triploid (3n) Primary Endosperm Nucleus.',
        chapter: 'पुष्पी पादपों में लैंगिक जनन',
        chapterEn: 'Sexual Reproduction in Flowering Plants',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c12b-mcq-2',
        questionHi: 'DNA खंडों को आपस में जोड़ने के लिए किस एंजाइम ("आणविक गोंद") का उपयोग किया जाता है?',
        questionEn: 'Which enzyme acts as "molecular glue" to join cut DNA fragments in rDNA technology?',
        optionsHi: ['प्रतिबंधन एंडोन्यूक्लिएज (EcoRI)', 'DNA लाइगेज (DNA Ligase)', 'Taq पॉलीमरेज', 'हेलीकेस'],
        optionsEn: ['Restriction Endonuclease (EcoRI)', 'DNA Ligase', 'Taq Polymerase', 'Helicase'],
        correctIndex: 1,
        explanationHi: 'प्रतिबंधन एंजाइम DNA को काटते हैं ("आणविक कैंची"), जबकि DNA लाइगेज कटे खंडों को जोड़ता है।',
        explanationEn: 'Restriction enzymes cut DNA (molecular scissors), while DNA Ligase seals/joins DNA fragments.',
        chapter: 'जैव प्रौद्योगिकी - सिद्धांत व प्रक्रम',
        chapterEn: 'Biotechnology: Principles and Processes',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c12b-imp-1',
        marks: 5,
        chapter: 'वंशागति का आणविक आधार',
        chapterEn: 'Molecular Basis of Inheritance',
        questionHi: 'वाटसन एवं क्रिक द्वारा प्रस्तुत DNA की द्विकुंडली (Double Helix) संरचना का सचित्र वर्णन कीजिए।',
        questionEn: 'Describe the Watson and Crick Double Helix Model of DNA with a neat labelled diagram.',
        answerHi: '1. DNA दो पॉलीन्यूक्लियोटाइड शृंखलाओं से बना होता है जो प्रतिसमांतर (5\'→3\' तथा 3\'→5\') दिशा में सर्पिल घूमती हैं।\n2. आधार शर्करा-फॉस्फेट की रीढ़ (Backbone) से बना होता है और नाइट्रोजनी क्षार अंदर की ओर होते हैं।\n3. क्षार युग्मन: एडेनीन (A) थायमीन (T) से 2 हाइड्रोजन बंध (A=T) और ग्वानीन (G) साइटोसीन (C) से 3 हाइड्रोजन बंध (G≡C) से जुड़ता है (चारगाफ नियम)।\n4. कुंडली का व्यास 20 Å (2 nm) तथा एक पूर्ण चक्कर (Pitch) 34 Å (10 क्षार युग्म, दूरी 3.4 Å) होता है।',
        answerEn: '1. DNA consists of two antiparallel polynucleotide strands coiled in a right-handed helix (5\'→3\' and 3\'→5\').\n2. Backbone is Sugar-Phosphate; nitrogenous bases project inward.\n3. Complementary Base Pairing: Adenine pairs with Thymine via 2 H-bonds (A=T); Guanine pairs with Cytosine via 3 H-bonds (G≡C).\n4. Diameter = 20 Å (2 nm); Pitch = 34 Å containing 10 base pairs (3.4 Å apart).',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '5 Marks Diagram Fixed',
        tagEn: '5 Marks Diagram Fixed'
      }
    ],
    biographies: [
      {
        id: 'c12b-bio-watson',
        authorNameHi: 'जेम्स वाटसन एवं फ्रांसिस क्रिक',
        authorNameEn: 'James Watson & Francis Crick',
        period: '1953 (Nobel 1962)',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'कैम्ब्रिज (UK)',
        birthPlaceEn: 'Cambridge, UK',
        notableWorksHi: ['DNA द्विकुंडली मॉडल (1953)', 'सेंट्रल डोग्मा (DNA→RNA→Protein)'],
        notableWorksEn: ['DNA Double Helix (1953)', 'Central Dogma of Molecular Biology'],
        summaryHi: 'रोजालिंड फ्रैंकलिन व मौरिस विल्किंस के एक्स-रे विवर्तन डेटा के आधार पर वाटसन-क्रिक ने 1953 में DNA का द्विकुंडली मॉडल दिया।',
        summaryEn: 'Proposed the Double Helix structure of DNA in 1953 using Chargaff’s ratio and Franklin’s X-ray diffraction.',
        examTipsHi: 'DNA चित्र में 5\'→3\', 3\'→5\', 3.4 nm पिच व H-बंध संख्या (A=T, G≡C) स्पष्ट दर्शाएं।',
        examTipsEn: 'Label antiparallel polarity (5\'→3\'), 34 Å pitch & H-bond counts (A=T, G≡C) for full 5/5 marks.',
        examWordLimit: '5-Mark DNA Diagram'
      }
    ],
    solvedPapers: buildClass12ThreeYearPapers(
      'c12-biology', '349', 'जीव विज्ञान', 'Biology', 70,
      'द्विनिषेचन, मेंडल, DNA द्विकुंडली मॉडल व PCR', 'Double Fertilization, Mendel, DNA Helix & PCR',
      '4 MCQ, 1M/2M/3M आरेख प्रश्न तथा 5-5 अंक के दीर्घ प्रश्न (पुष्प द्विनिषेचन, DNA मॉडल, मानव रोग, PCR व जैव विविधता)।',
      '4 MCQs, 1M/2M/3M diagram questions + three 5-mark long questions (DNA, Fertilization, PCR).'
    )
  }
];
