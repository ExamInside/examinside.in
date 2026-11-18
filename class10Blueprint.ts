import { ChapterEntry, MCQQuestion, ImportantQuestion, BiographyItem, SolvedPaper } from './types';

export interface SubjectBlueprint {
  id: string;
  classLevel: '10' | '12';
  code: string;
  isHindiLanguageSubject?: boolean;
  nameHi: string;
  nameEn: string;
  taglineHi: string;
  taglineEn: string;
  iconName: string;
  colorTheme: {
    bgLight: string;
    bgDark: string;
    borderLight: string;
    borderDark: string;
    accent: string;
    text: string;
  };
  chapterDetails: ChapterEntry[];
  coreMcqs: Omit<MCQQuestion, 'questionNumber'>[];
  coreImportantQuestions: ImportantQuestion[];
  biographies: BiographyItem[];
  solvedPapers: SolvedPaper[];
}

function buildThreeYearPapers(
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
      titleHi: `UP बोर्ड ${nameHi} 2026 मॉडल लीक पेपर (100% संभावित प्रश्न)`,
      titleEn: `UP Board ${nameEn} 2026 Official Model & Leak Paper`,
      totalMarks,
      timeLimit: '3 Hours 15 Mins',
      pdfPages: 16,
      pdfUrl: `https://upmsp.edu.in/ModelPaper2026_${code}.pdf`,
      sampleSections: [
        {
          sectionNameHi: 'खंड-अ: 20 बहुविकल्पीय प्रश्न (OMR आधारित)',
          sectionNameEn: 'Section A: 20 Objective MCQs (OMR Based)',
          questionsCount: 20,
          sampleQHi: `${sampleTopicHi} से संबंधित सर्वाधिक बार-बार पूछे जाने वाले 20 OMR प्रश्न।`,
          sampleQEn: `Top 20 high-repeat OMR MCQs from ${sampleTopicEn}.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
        {
          sectionNameHi: 'खंड-ब: वर्णनात्मक लघु एवं दीर्घ उत्तरीय प्रश्न',
          sectionNameEn: 'Section B: Descriptive Short & Long Answer Questions',
          questionsCount: 12,
          sampleQHi: `2, 4 व 6 अंकों के बोर्ड-गारंटीड प्रश्न (${sampleTopicHi})।`,
          sampleQEn: `Guaranteed 2, 4 & 6 mark descriptive questions (${sampleTopicEn}).`,
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
      titleHi: `UP बोर्ड ${nameHi} 2025 सम्पूर्ण हल प्रश्नपत्र (उत्तर कुंजी सहित)`,
      titleEn: `UP Board ${nameEn} 2025 Complete Solved Official Paper`,
      totalMarks,
      timeLimit: '3 Hours 15 Mins',
      pdfPages: 18,
      pdfUrl: `https://upmsp.edu.in/SolvedPaper2025_${code}.pdf`,
      sampleSections: [
        {
          sectionNameHi: 'खंड-अ: आधिकारिक 2025 OMR प्रश्न हल',
          sectionNameEn: 'Section A: Official 2025 OMR Questions Solved',
          questionsCount: 20,
          sampleQHi: `2025 बोर्ड परीक्षा सेट में पूछे गए ${sampleTopicHi} के वास्तविक प्रश्न।`,
          sampleQEn: `Actual 2025 UPMSP board paper MCQs on ${sampleTopicEn}.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
        {
          sectionNameHi: 'खंड-ब: 2025 टॉपर उत्तरपुस्तिका प्रारूप हल',
          sectionNameEn: 'Section B: 2025 Topper Answer-Sheet Format Solutions',
          questionsCount: 12,
          sampleQHi: `स्टेप-मार्किंग नियम के अनुसार ${sampleTopicHi} का पूर्ण हल।`,
          sampleQEn: `Step-marking compliant full solutions for ${sampleTopicEn}.`,
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
      paperCode: `${code} DA-24`,
      titleHi: `UP बोर्ड ${nameHi} 2024 वास्तविक बोर्ड पेपर व सटीक हल`,
      titleEn: `UP Board ${nameEn} 2024 Original Board Paper & Solutions`,
      totalMarks,
      timeLimit: '3 Hours 15 Mins',
      pdfPages: 18,
      pdfUrl: `https://upmsp.edu.in/BoardPaper2024_${code}.pdf`,
      sampleSections: [
        {
          sectionNameHi: 'खंड-अ: 2024 बोर्ड OMR उत्तरमाला',
          sectionNameEn: 'Section A: 2024 Board OMR Answer Key',
          questionsCount: 20,
          sampleQHi: `2024 की परीक्षा में ${sampleTopicHi} से आए 20 बहुविकल्पीय प्रश्न।`,
          sampleQEn: `20 objective MCQs from ${sampleTopicEn} asked in 2024 Board Exam.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
        {
          sectionNameHi: 'खंड-ब: दीर्घ उत्तरीय (5-6 अंक) प्रश्न व उत्तर',
          sectionNameEn: 'Section B: Long Answer (5-6 Marks) Solved Section',
          questionsCount: 12,
          sampleQHi: `${sampleTopicHi} के वे प्रश्न जो 2024 में 5-6 अंकों में आए थे।`,
          sampleQEn: `High-weightage 5-6 mark questions from ${sampleTopicEn} in 2024.`,
          solutionHintHi: hintHi,
          solutionHintEn: hintEn,
        },
      ],
    },
  ];
}

export const CLASS_10_BLUEPRINTS: SubjectBlueprint[] = [
  // 1. CLASS 10 HINDI (Code 901) - Stays in Hindi even when English Medium is active
  {
    id: 'c10-hindi',
    classLevel: '10',
    code: '901',
    isHindiLanguageSubject: true,
    nameHi: 'हिंदी (Hindi 1st + 2nd)',
    nameEn: 'हिंदी (Hindi - Code 901)',
    taglineHi: 'गद्य (7), काव्य (12), संस्कृत (6), व्याकरण, जीवन परिचय व श्लोक',
    taglineEn: 'गद्य (7), काव्य (12), संस्कृत (6), व्याकरण, जीवन परिचय व श्लोक',
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
      // गद्य खंड (7 Chapters)
      {
        id: 'c10h-g1', number: 1, sectionHi: 'गद्य खंड', sectionEn: 'गद्य खंड',
        titleHi: 'मित्रता', titleEn: 'मित्रता',
        authorOrTopicHi: 'आचार्य रामचंद्र शुक्ल', authorOrTopicEn: 'आचार्य रामचंद्र शुक्ल',
        keyFocusHi: 'विश्वासपात्र मित्र जीवन की औषधि है — 6 अंक गद्यांश व्याख्या व शुक्ल जीवन परिचय',
        keyFocusEn: 'विश्वासपात्र मित्र जीवन की औषधि है — 6 अंक गद्यांश व्याख्या व शुक्ल जीवन परिचय',
        boardWeightage: '6+5 Marks Fixed',
        formulaOrTrickHi: 'संदर्भ ट्रिक: प्रस्तुत गद्यांश हमारी पाठ्यपुस्तक "हिंदी" के गद्य-खंड में संकलित "मित्रता" नामक निबंध से उद्धृत है। इसके लेखक आचार्य रामचंद्र शुक्ल हैं।',
        formulaOrTrickEn: 'संदर्भ ट्रिक: प्रस्तुत गद्यांश हमारी पाठ्यपुस्तक "हिंदी" के गद्य-खंड में संकलित "मित्रता" नामक निबंध से उद्धृत है। इसके लेखक आचार्य रामचंद्र शुक्ल हैं।'
      },
      {
        id: 'c10h-g2', number: 2, sectionHi: 'गद्य खंड', sectionEn: 'गद्य खंड',
        titleHi: 'ममता', titleEn: 'ममता',
        authorOrTopicHi: 'जयशंकर प्रसाद', authorOrTopicEn: 'जयशंकर प्रसाद',
        keyFocusHi: 'रोहतास दुर्ग, शेरशाह और हुमायूँ प्रसंग — आश्रय व भारतीय नारी का आदर्श',
        keyFocusEn: 'रोहतास दुर्ग, शेरशाह और हुमायूँ प्रसंग — आश्रय व भारतीय नारी का आदर्श',
        boardWeightage: '6 Marks Gadyansh'
      },
      {
        id: 'c10h-g3', number: 3, sectionHi: 'गद्य खंड', sectionEn: 'गद्य खंड',
        titleHi: 'क्या लिखूँ?', titleEn: 'क्या लिखूँ?',
        authorOrTopicHi: 'पदुमलाल पुन्नालाल बख्शी', authorOrTopicEn: 'पदुमलाल पुन्नालाल बख्शी',
        keyFocusHi: 'निबंध लेखन कला, दूर के ढोल सुहावने होते हैं, प्रगतिशीलता बनाम प्राचीनता',
        keyFocusEn: 'निबंध लेखन कला, दूर के ढोल सुहावने होते हैं, प्रगतिशीलता बनाम प्राचीनता',
        boardWeightage: 'High MCQ + Short Q'
      },
      {
        id: 'c10h-g4', number: 4, sectionHi: 'गद्य खंड', sectionEn: 'गद्य खंड',
        titleHi: 'भारतीय संस्कृति', titleEn: 'भारतीय संस्कृति',
        authorOrTopicHi: 'डॉ. राजेन्द्र प्रसाद', authorOrTopicEn: 'डॉ. राजेन्द्र प्रसाद',
        keyFocusHi: 'अहिंसा और नैतिकता का सिद्धांत, विविधता में एकता — 6 अंक संभावित गद्यांश',
        keyFocusEn: 'अहिंसा और नैतिकता का सिद्धांत, विविधता में एकता — 6 अंक संभावित गद्यांश',
        boardWeightage: '6 Marks Expected'
      },
      {
        id: 'c10h-g5', number: 5, sectionHi: 'गद्य खंड', sectionEn: 'गद्य खंड',
        titleHi: 'ईर्ष्या, तू न गई मेरे मन से', titleEn: 'ईर्ष्या, तू न गई मेरे मन से',
        authorOrTopicHi: 'रामधारी सिंह दिनकर', authorOrTopicEn: 'रामधारी सिंह दिनकर',
        keyFocusHi: 'ईर्ष्या का मनोवैज्ञानिक विश्लेषण, निंदा की आदत और रचनात्मक उपाय',
        keyFocusEn: 'ईर्ष्या का मनोवैज्ञानिक विश्लेषण, निंदा की आदत और रचनात्मक उपाय',
        boardWeightage: '4 Marks High-Yield'
      },
      {
        id: 'c10h-g6', number: 6, sectionHi: 'गद्य खंड', sectionEn: 'गद्य खंड',
        titleHi: 'अजंता', titleEn: 'अजंता',
        authorOrTopicHi: 'डॉ. भगवतशरण उपाध्याय', authorOrTopicEn: 'डॉ. भगवतशरण उपाध्याय',
        keyFocusHi: 'बौद्ध जातक कथाएँ, गुफाओं के भित्तिचित्र व भारतीय शिल्पकला का गौरव',
        keyFocusEn: 'बौद्ध जातक कथाएँ, गुफाओं के भित्तिचित्र व भारतीय शिल्पकला का गौरव',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10h-g7', number: 7, sectionHi: 'गद्य खंड', sectionEn: 'गद्य खंड',
        titleHi: 'पानी में चंदा और चाँद पर आदमी', titleEn: 'पानी में चंदा और चाँद पर आदमी',
        authorOrTopicHi: 'जयप्रकाश भारती', authorOrTopicEn: 'जयप्रकाश भारती',
        keyFocusHi: 'वैज्ञानिक निबंध, अंतरिक्ष यात्रा, चंद्रमा पर मानव कदम व विज्ञान चेतना',
        keyFocusEn: 'वैज्ञानिक निबंध, अंतरिक्ष यात्रा, चंद्रमा पर मानव कदम व विज्ञान चेतना',
        boardWeightage: 'MCQ + 2 Marks'
      },
      // काव्य खंड (12 Chapters)
      {
        id: 'c10h-k1', number: 8, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'पद', titleEn: 'पद',
        authorOrTopicHi: 'सूरदास', authorOrTopicEn: 'सूरदास',
        keyFocusHi: 'चरण कमल बंदौ हरि राई (रूपक अलंकार), ऊधौ मोहि ब्रज बिसरत नाहीं (6 अंक पद्यांश)',
        keyFocusEn: 'चरण कमल बंदौ हरि राई (रूपक अलंकार), ऊधौ मोहि ब्रज बिसरत नाहीं (6 अंक पद्यांश)',
        boardWeightage: '6+5 Marks Fixed',
        poemsOrShlokasHi: ['चरन कमल बंदौ हरि राई। जाकी कृपा पंगु गिरि लंघै, अंधे को सब कछु दरसाई।।'],
        poemsOrShlokasEn: ['चरन कमल बंदौ हरि राई। जाकी कृपा पंगु गिरि लंघै, अंधे को सब कछु दरसाई।।']
      },
      {
        id: 'c10h-k2', number: 9, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'धनुष-भंग एवं वन-पथ पर', titleEn: 'धनुष-भंग एवं वन-पथ पर',
        authorOrTopicHi: 'गोस्वामी तुलसीदास', authorOrTopicEn: 'गोस्वामी तुलसीदास',
        keyFocusHi: 'उदित उदयगिरि मंच पर रघुबर बालपतंग (धनुष-भंग), पुर तें निकसी रघुवीर-बधू (वन-पथ पर)',
        keyFocusEn: 'उदित उदयगिरि मंच पर रघुबर बालपतंग (धनुष-भंग), पुर तें निकसी रघुवीर-बधू (वन-पथ पर)',
        boardWeightage: '6+5 Marks Fixed',
        poemsOrShlokasHi: ['उदित उदयगिरि मंच पर, रघुबर बालपतंग। बिकसे संत सरोज सब, हरषे लोचन भृंग।।'],
        poemsOrShlokasEn: ['उदित उदयगिरि मंच पर, रघुबर बालपतंग। बिकसे संत सरोज सब, हरषे लोचन भृंग।।']
      },
      {
        id: 'c10h-k3', number: 10, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'सवैये एवं कवित्त', titleEn: 'सवैये एवं कवित्त',
        authorOrTopicHi: 'रसखान', authorOrTopicEn: 'रसखान',
        keyFocusHi: 'मानुष हौं तो वही रसखानि, धूरि भरे अति शोभित स्याम जू — ब्रजभक्ति व सवैया छंद',
        keyFocusEn: 'मानुष हौं तो वही रसखानि, धूरि भरे अति शोभित स्याम जू — ब्रजभक्ति व सवैया छंद',
        boardWeightage: '6 Marks Expected',
        poemsOrShlokasHi: ['मानुष हौं तो वही रसखानि, बसौं ब्रज गोकुल गाँव के ग्वारन।'],
        poemsOrShlokasEn: ['मानुष हौं तो वही रसखानि, बसौं ब्रज गोकुल गाँव के ग्वारन।']
      },
      {
        id: 'c10h-k4', number: 11, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'भक्ति एवं नीति के दोहे', titleEn: 'भक्ति एवं नीति के दोहे',
        authorOrTopicHi: 'बिहारीलाल', authorOrTopicEn: 'बिहारीलाल',
        keyFocusHi: 'मेरी भव बाधा हरौ राधा नागरि सोय — गागर में सागर भरने की दोहा शैली',
        keyFocusEn: 'मेरी भव बाधा हरौ राधा नागरि सोय — गागर में सागर भरने की दोहा शैली',
        boardWeightage: '4-6 Marks'
      },
      {
        id: 'c10h-k5', number: 12, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'स्वदेश प्रेम', titleEn: 'स्वदेश प्रेम',
        authorOrTopicHi: 'रामनरेश त्रिपाठी', authorOrTopicEn: 'रामनरेश त्रिपाठी',
        keyFocusHi: 'अतुलनीय जिनके प्रताप का साक्षी है प्रत्यक्ष दिवाकर — वीर रस व राष्ट्रभक्ति',
        keyFocusEn: 'अतुलनीय जिनके प्रताप का साक्षी है प्रत्यक्ष दिवाकर — वीर रस व राष्ट्रभक्ति',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10h-k6', number: 13, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'भारत माता का मंदिर यह', titleEn: 'भारत माता का मंदिर यह',
        authorOrTopicHi: 'मैथिलीशरण गुप्त', authorOrTopicEn: 'मैथिलीशरण गुप्त',
        keyFocusHi: 'सांप्रदायिक सद्भाव, राष्ट्रीय एकता व राष्ट्रकवि गुप्त जी की काव्य धारा',
        keyFocusEn: 'सांप्रदायिक सद्भाव, राष्ट्रीय एकता व राष्ट्रकवि गुप्त जी की काव्य धारा',
        boardWeightage: '3 Marks'
      },
      {
        id: 'c10h-k7', number: 14, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'हिमालय से एवं वर्षा सुंदरी के प्रति', titleEn: 'हिमालय से एवं वर्षा सुंदरी के प्रति',
        authorOrTopicHi: 'महादेवी वर्मा', authorOrTopicEn: 'महादेवी वर्मा',
        keyFocusHi: 'हे चिर महान! छायावादी करुणा व हिमालय की अडिग साधना',
        keyFocusEn: 'हे चिर महान! छायावादी करुणा व हिमालय की अडिग साधना',
        boardWeightage: '4-5 Marks'
      },
      {
        id: 'c10h-k8', number: 15, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'चींटी एवं चंद्रलोक में प्रथम बार', titleEn: 'चींटी एवं चंद्रलोक में प्रथम बार',
        authorOrTopicHi: 'सुमित्रानंदन पंत', authorOrTopicEn: 'सुमित्रानंदन पंत',
        keyFocusHi: 'चींटी के सतत परिश्रम का संदेश व नील आर्मस्ट्रांग की चंद्र-विजय',
        keyFocusEn: 'चींटी के सतत परिश्रम का संदेश व नील आर्मस्ट्रांग की चंद्र-विजय',
        boardWeightage: '3 Marks'
      },
      {
        id: 'c10h-k9', number: 16, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'पुष्प की अभिलाषा एवं जवानी', titleEn: 'पुष्प की अभिलाषा एवं जवानी',
        authorOrTopicHi: 'माखनलाल चतुर्वेदी', authorOrTopicEn: 'माखनलाल चतुर्वेदी',
        keyFocusHi: 'मुझे तोड़ लेना वनमाली, उस पथ पर तुम देना फेंक — देशभक्ति बलिदान भाव',
        keyFocusEn: 'मुझे तोड़ लेना वनमाली, उस पथ पर तुम देना फेंक — देशभक्ति बलिदान भाव',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10h-k10', number: 17, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'झाँसी की रानी की समाधि पर', titleEn: 'झाँसी की रानी की समाधि पर',
        authorOrTopicHi: 'सुभद्रा कुमारी चौहान', authorOrTopicEn: 'सुभद्रा कुमारी चौहान',
        keyFocusHi: 'लक्ष्मीबाई की वीरता, समाधि की गरिमा और ओजपूर्ण वीर काव्य',
        keyFocusEn: 'लक्ष्मीबाई की वीरता, समाधि की गरिमा और ओजपूर्ण वीर काव्य',
        boardWeightage: '3 Marks'
      },
      {
        id: 'c10h-k11', number: 18, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'भाषा एकमात्र अनंत है एवं युवा जंगल', titleEn: 'भाषा एकमात्र अनंत है एवं युवा जंगल',
        authorOrTopicHi: 'अशोक वाजपेयी', authorOrTopicEn: 'अशोक वाजपेयी',
        keyFocusHi: 'भाषा की अमरता, शब्द-शक्ति और पर्यावरण चेतना',
        keyFocusEn: 'भाषा की अमरता, शब्द-शक्ति और पर्यावरण चेतना',
        boardWeightage: '2-3 Marks'
      },
      {
        id: 'c10h-k12', number: 19, sectionHi: 'काव्य खंड', sectionEn: 'काव्य खंड',
        titleHi: 'हल्दीघाटी', titleEn: 'हल्दीघाटी',
        authorOrTopicHi: 'श्यामनारायण पांडेय', authorOrTopicEn: 'श्यामनारायण पांडेय',
        keyFocusHi: 'मेवाड़ केसरी राणा प्रताप और चेतक का अद्भुत रण-कौशल',
        keyFocusEn: 'मेवाड़ केसरी राणा प्रताप और चेतक का अद्भुत रण-कौशल',
        boardWeightage: '3 Marks'
      },
      // संस्कृत खंड (6 Chapters)
      {
        id: 'c10h-s1', number: 20, sectionHi: 'संस्कृत खंड', sectionEn: 'संस्कृत खंड',
        titleHi: 'वाराणसी', titleEn: 'वाराणसी',
        authorOrTopicHi: 'प्राचीन नगरी व विद्या केंद्र', authorOrTopicEn: 'प्राचीन नगरी व विद्या केंद्र',
        keyFocusHi: 'वाराणसी सुविख्याता प्राचीना नगरी — 5 अंक पक्का संस्कृत गद्यांश अनुवाद',
        keyFocusEn: 'वाराणसी सुविख्याता प्राचीना नगरी — 5 अंक पक्का संस्कृत गद्यांश अनुवाद',
        boardWeightage: '5 Marks Fixed',
        poemsOrShlokasHi: ['सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत्।।'],
        poemsOrShlokasEn: ['सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत्।।']
      },
      {
        id: 'c10h-s2', number: 21, sectionHi: 'संस्कृत खंड', sectionEn: 'संस्कृत खंड',
        titleHi: 'देशभक्तः चन्द्रशेखरः', titleEn: 'देशभक्तः चन्द्रशेखरः',
        authorOrTopicHi: 'संस्कृत नाटक संवाद', authorOrTopicEn: 'संस्कृत नाटक संवाद',
        keyFocusHi: 'मम नाम आज़ादः, पितुः नाम स्वतन्त्रः — 2 अंक प्रश्नोत्तर व अनुवाद',
        keyFocusEn: 'मम नाम आज़ादः, पितुः नाम स्वतन्त्रः — 2 अंक प्रश्नोत्तर व अनुवाद',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10h-s3', number: 22, sectionHi: 'संस्कृत खंड', sectionEn: 'संस्कृत खंड',
        titleHi: 'भारतीय संस्कृतिः', titleEn: 'भारतीय संस्कृतिः',
        authorOrTopicHi: 'मानव जीवनस्य संस्करणम्', authorOrTopicEn: 'मानव जीवनस्य संस्करणम्',
        keyFocusHi: 'मानवजीवनस्य संस्करणं संस्कृतिः — सर्वाधिक पूछा जाने वाला गद्यांश व श्लोक',
        keyFocusEn: 'मानवजीवनस्य संस्करणं संस्कृतिः — सर्वाधिक पूछा जाने वाला गद्यांश व श्लोक',
        boardWeightage: '5 Marks High-Yield'
      },
      {
        id: 'c10h-s4', number: 23, sectionHi: 'संस्कृत खंड', sectionEn: 'संस्कृत खंड',
        titleHi: 'प्रबुद्धो ग्रामीणः', titleEn: 'प्रबुद्धो ग्रामीणः',
        authorOrTopicHi: 'पहेली व व्यावहारिक बुद्धि', authorOrTopicEn: 'पहेली व व्यावहारिक बुद्धि',
        keyFocusHi: 'अपदो दूरगामी च साक्षरो न च पण्डितः (उत्तर: पत्रम्) — श्लोक व संवाद',
        keyFocusEn: 'अपदो दूरगामी च साक्षरो न च पण्डितः (उत्तर: पत्रम्) — श्लोक व संवाद',
        boardWeightage: '3-4 Marks'
      },
      {
        id: 'c10h-s5', number: 24, sectionHi: 'संस्कृत खंड', sectionEn: 'संस्कृत खंड',
        titleHi: 'जीवन-सूत्राणि', titleEn: 'जीवन-सूत्राणि',
        authorOrTopicHi: 'यक्ष-युधिष्ठिर संवाद श्लोक', authorOrTopicEn: 'यक्ष-युधिष्ठिर संवाद श्लोक',
        keyFocusHi: 'किंस्विद् गुरुतरं भूमेः? माता गुरुतरा भूमेः — पद्यांश अनुवाद व कंठस्थ श्लोक',
        keyFocusEn: 'किंस्विद् गुरुतरं भूमेः? माता गुरुतरा भूमेः — पद्यांश अनुवाद व कंठस्थ श्लोक',
        boardWeightage: '5+2 Marks Fixed',
        poemsOrShlokasHi: ['बन्धनं मरणं वापि जयो वापि पराजयः। उभयत्र समो वीरः वीरभावो हि वीरता।।'],
        poemsOrShlokasEn: ['बन्धनं मरणं वापि जयो वापि पराजयः। उभयत्र समो वीरः वीरभावो हि वीरता।।']
      },
      {
        id: 'c10h-s6', number: 25, sectionHi: 'संस्कृत खंड', sectionEn: 'संस्कृत खंड',
        titleHi: 'केन किं वर्धते', titleEn: 'केन किं वर्धते',
        authorOrTopicHi: 'सूक्तियाँ व सद्गुण', authorOrTopicEn: 'सूक्तियाँ व सद्गुण',
        keyFocusHi: 'सुवचनेन मैत्री, इन्दुदर्शनेन समुद्रः, दानेन कीर्तिः — 2 अंक संस्कृत उत्तर',
        keyFocusEn: 'सुवचनेन मैत्री, इन्दुदर्शनेन समुद्रः, दानेन कीर्तिः — 2 अंक संस्कृत उत्तर',
        boardWeightage: '2-3 Marks'
      },
      // हिंदी 2nd (व्याकरण व रचना)
      {
        id: 'c10h-v1', number: 26, sectionHi: 'हिंदी 2nd (व्याकरण)', sectionEn: 'हिंदी 2nd (व्याकरण)',
        titleHi: 'रस, छंद व अलंकार (काव्य सौंदर्य)', titleEn: 'रस, छंद व अलंकार (काव्य सौंदर्य)',
        authorOrTopicHi: 'हास्य/करुण रस, सोरठा/रोला, उपमा/रूपक/उत्प्रेक्षा', authorOrTopicEn: 'हास्य/करुण रस, सोरठा/रोला, उपमा/रूपक/उत्प्रेक्षा',
        keyFocusHi: 'OMR MCQs के लिए स्थायी भाव, मात्रा गिनती (11-13 सोरठा, 24 रोला) व जनो/मनो पहचान ट्रिक',
        keyFocusEn: 'OMR MCQs के लिए स्थायी भाव, मात्रा गिनती (11-13 सोरठा, 24 रोला) व जनो/मनो पहचान ट्रिक',
        boardWeightage: '3-6 Marks OMR Fixed'
      },
      {
        id: 'c10h-v2', number: 27, sectionHi: 'हिंदी 2nd (व्याकरण व रचना)', sectionEn: 'हिंदी 2nd (व्याकरण व रचना)',
        titleHi: 'उपसर्ग, प्रत्यय, समास, तत्सम-तद्भव, संधि, निबंध व पत्र', titleEn: 'उपसर्ग, प्रत्यय, समास, तत्सम-तद्भव, संधि, निबंध व पत्र',
        authorOrTopicHi: 'यण् संधि, फल/मति/नदी शब्द रूप, पठ्/हस् धातु रूप व 7 अंक निबंध', authorOrTopicEn: 'यण् संधि, फल/मति/नदी शब्द रूप, पठ्/हस् धातु रूप व 7 अंक निबंध',
        keyFocusHi: 'पर्यावरण प्रदूषण, विज्ञान वरदान या अभिशाप व छात्रवृत्ति हेतु प्रार्थना पत्र',
        keyFocusEn: 'पर्यावरण प्रदूषण, विज्ञान वरदान या अभिशाप व छात्रवृत्ति हेतु प्रार्थना पत्र',
        boardWeightage: '15+ Marks Fixed'
      },
    ],
    coreMcqs: [
      {
        id: 'c10h-mcq-1',
        questionHi: 'आचार्य रामचंद्र शुक्ल द्वारा रचित प्रसिद्ध निबंध "मित्रता" किस विधा की रचना है?',
        questionEn: 'आचार्य रामचंद्र शुक्ल द्वारा रचित प्रसिद्ध निबंध "मित्रता" किस विधा की रचना है?',
        optionsHi: ['कहानी', 'निबंध', 'उपन्यास', 'जीवनी'],
        optionsEn: ['कहानी', 'निबंध', 'उपन्यास', 'जीवनी'],
        correctIndex: 1,
        explanationHi: 'मित्रता आचार्य रामचंद्र शुक्ल का सुप्रसिद्ध नैतिक-सामाजिक निबंध है (चिंतामणि भाग-1 से संबंधित)।',
        explanationEn: 'मित्रता आचार्य रामचंद्र शुक्ल का सुप्रसिद्ध नैतिक-सामाजिक निबंध है।',
        chapter: 'मित्रता (आचार्य शुक्ल)',
        chapterEn: 'मित्रता (आचार्य शुक्ल)',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10h-mcq-2',
        questionHi: 'करुण रस का स्थायी भाव क्या होता है?',
        questionEn: 'करुण रस का स्थायी भाव क्या होता है?',
        optionsHi: ['हास', 'शोक', 'रति', 'उत्साह'],
        optionsEn: ['हास', 'शोक', 'रति', 'उत्साह'],
        correctIndex: 1,
        explanationHi: 'करुण रस का स्थायी भाव "शोक" है तथा हास्य रस का स्थायी भाव "हास" होता है।',
        explanationEn: 'करुण रस का स्थायी भाव "शोक" होता है।',
        chapter: 'रस, छंद व अलंकार',
        chapterEn: 'रस, छंद व अलंकार',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c10h-mcq-3',
        questionHi: '"चरन कमल बंदौ हरि राई" पंक्ति में कौन-सा अलंकार है?',
        questionEn: '"चरन कमल बंदौ हरि राई" पंक्ति में कौन-सा अलंकार है?',
        optionsHi: ['उपमा', 'यमक', 'रूपक', 'उत्प्रेक्षा'],
        optionsEn: ['उपमा', 'यमक', 'रूपक', 'उत्प्रेक्षा'],
        correctIndex: 2,
        explanationHi: 'यहाँ चरण (उपमेय) पर कमल (उपमान) का भेद-रहित आरोप किया गया है, अतः रूपक अलंकार है।',
        explanationEn: 'यहाँ चरण पर कमल का भेद-रहित आरोप होने से रूपक अलंकार है।',
        chapter: 'पद (सूरदास)',
        chapterEn: 'पद (सूरदास)',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10h-mcq-4',
        questionHi: 'सोरठा छंद के पहले और तीसरे चरण में कितनी-कितनी मात्राएँ होती हैं?',
        questionEn: 'सोरठा छंद के पहले और तीसरे चरण में कितनी-कितनी मात्राएँ होती हैं?',
        optionsHi: ['13-13', '11-11', '16-16', '24-24'],
        optionsEn: ['13-13', '11-11', '16-16', '24-24'],
        correctIndex: 1,
        explanationHi: 'सोरठा दोहे का उल्टा होता है; इसके 1 व 3 चरण में 11-11 और 2 व 4 चरण में 13-13 मात्राएँ होती हैं।',
        explanationEn: 'सोरठा के प्रथम एवं तृतीय चरण में 11-11 मात्राएँ होती हैं।',
        chapter: 'रस, छंद व अलंकार',
        chapterEn: 'रस, छंद व अलंकार',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10h-mcq-5',
        questionHi: 'वाराणसी नगरी किस नदी के तट पर स्थित है?',
        questionEn: 'वाराणसी नगरी किस नदी के तट पर स्थित है?',
        optionsHi: ['यमुना', 'गोदावरी', 'गंगा', 'सरयू'],
        optionsEn: ['यमुना', 'गोदावरी', 'गंगा', 'सरयू'],
        correctIndex: 2,
        explanationHi: 'वाराणसी विमलसलिलतरंगायाः गंगायाः कूले (गंगा नदी के किनारे) स्थित है।',
        explanationEn: 'वाराणसी गंगा नदी के तट पर स्थित है।',
        chapter: 'वाराणसी',
        chapterEn: 'वाराणसी',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c10h-imp-1',
        marks: 6,
        chapter: 'मित्रता (आचार्य शुक्ल)',
        chapterEn: 'मित्रता (आचार्य शुक्ल)',
        questionHi: 'गद्यांश व्याख्या: "विश्वासपात्र मित्र जीवन की एक औषध है। हमें अपने मित्रों से यह आशा रखनी चाहिए कि वे उत्तम संकल्पों से हमें दृढ़ करेंगे..." संदर्भ व रेखांकित अंश की व्याख्या लिखिए।',
        questionEn: 'गद्यांश व्याख्या: "विश्वासपात्र मित्र जीवन की एक औषध है..." संदर्भ व रेखांकित अंश की व्याख्या लिखिए।',
        answerHi: 'संदर्भ: प्रस्तुत गद्यांश हमारी पाठ्यपुस्तक "हिंदी" के गद्य-खंड में संकलित "मित्रता" पाठ से लिया गया है, जिसके लेखक आचार्य रामचंद्र शुक्ल हैं।\n\nव्याख्या: लेखक कहते हैं कि जिस प्रकार अच्छी औषधि शरीर के रोगों को नष्ट कर देती है, उसी प्रकार एक सच्चा और विश्वासपात्र मित्र हमारे जीवन की बुराइयों को दूर कर हमें सन्मार्ग पर अग्रसर करता है। वह हमें दोषों और त्रुटियों से बचाता है, सत्य व मर्यादा के प्रति हमारा प्रेम पुष्ट करता है।',
        answerEn: 'संदर्भ व व्याख्या: प्रस्तुत गद्यांश "मित्रता" (आचार्य शुक्ल) से उद्धृत है। विश्वासपात्र मित्र औषधि के समान बुराइयों से बचाकर जीवन को श्रेष्ठ बनाता है।',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '6 अंक फिक्स्ड गद्यांश',
        tagEn: '6 अंक फिक्स्ड गद्यांश'
      },
      {
        id: 'c10h-imp-2',
        marks: 5,
        chapter: 'संस्कृत खंड (कंठस्थ श्लोक व वाराणसी)',
        chapterEn: 'संस्कृत खंड (कंठस्थ श्लोक व वाराणसी)',
        questionHi: 'अपनी पाठ्यपुस्तक से कंठस्थ कोई एक श्लोक लिखिए जो इस प्रश्नपत्र में न आया हो (2 अंक) तथा वाराणसी की विशेषता का संस्कृत में उत्तर दीजिए।',
        questionEn: 'अपनी पाठ्यपुस्तक से कंठस्थ कोई एक श्लोक लिखिए (2 अंक) तथा वाराणसी की विशेषता लिखिए।',
        answerHi: 'श्लोक 1: बन्धनं मरणं वापि जयो वापि पराजयः। उभयत्र समो वीरः वीरभावो हि वीरता।।\nश्लोक 2 (बैकअप): सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत्।।\n\nवाराणसी उत्तर: वाराणसी विविध-धर्माणां संगमस्थली, वैदेशिकानां पर्यटकानां च आकर्षण-केन्द्रम् अस्ति।',
        answerEn: 'बन्धनं मरणं वापि जयो वापि पराजयः। उभयत्र समो वीरः वीरभावो हि वीरता।।',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026'],
        tagHi: '2+5 अंक 100% पक्का',
        tagEn: '2+5 अंक 100% पक्का'
      },
      {
        id: 'c10h-imp-3',
        marks: 6,
        chapter: 'पद (सूरदास)',
        chapterEn: 'पद (सूरदास)',
        questionHi: 'पद्यांश व्याख्या: "चरन कमल बंदौ हरि राई। जाकी कृपा पंगु गिरि लंघै, अंधे को सब कछु दरसाई।।" का संदर्भ, व्याख्या व काव्य-सौंदर्य लिखिए।',
        questionEn: 'पद्यांश व्याख्या: "चरन कमल बंदौ हरि राई..." का संदर्भ व व्याख्या लिखिए।',
        answerHi: 'संदर्भ: प्रस्तुत पद्यांश महाकवि सूरदास रचित "सूरसागर" से हमारी पाठ्यपुस्तक के "पद" शीर्षक से उद्धृत है।\nव्याख्या: सूरदास जी कहते हैं कि हे प्रभु! मैं आपके कमल रूपी चरणों की वंदना करता हूँ जिनकी असीम कृपा से लंगड़ा व्यक्ति भी पर्वत लांघ जाता है और अंधे को सब कुछ दिखाई देने लगता है।\nकाव्य-सौंदर्य: भाषा-ब्रज, रस-भक्ति, अलंकार-रूपक, छंद-गेय पद।',
        answerEn: 'संदर्भ: प्रस्तुत पद्यांश महाकवि सूरदास रचित "पद" से उद्धृत है। यहाँ प्रभु के कमलवत चरणों की महिमा वर्णित है।',
        probability: 'Very High',
        boardYears: ['2024', '2025'],
        tagHi: '6 अंक काव्य व्याख्या',
        tagEn: '6 अंक काव्य व्याख्या'
      }
    ],
    biographies: [
      {
        id: 'c10-bio-shukla',
        authorNameHi: 'आचार्य रामचंद्र शुक्ल',
        authorNameEn: 'आचार्य रामचंद्र शुक्ल',
        period: '1884 ई. – 1941 ई.',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'अगोना (जिला बस्ती, उ.प्र.)',
        birthPlaceEn: 'अगोना (जिला बस्ती, उ.प्र.)',
        notableWorksHi: ['चिंतामणि (निबंध)', 'हिंदी साहित्य का इतिहास', 'रस मीमांसा', 'त्रिवेणी'],
        notableWorksEn: ['चिंतामणि (निबंध)', 'हिंदी साहित्य का इतिहास', 'रस मीमांसा', 'त्रिवेणी'],
        summaryHi: 'हिंदी गद्य के सर्वश्रेष्ठ आलोचक व निबंधकार आचार्य रामचंद्र शुक्ल का जन्म सन् 1884 ई. में बस्ती जिले के अगोना गाँव में हुआ। पिता पं. चंद्रबली शुक्ल थे। काशी नागरी प्रचारिणी सभा एवं बीएचयू में हिंदी विभागाध्यक्ष रहे। सन् 1941 में निधन हुआ।',
        summaryEn: 'हिंदी गद्य के सर्वश्रेष्ठ आलोचक आचार्य रामचंद्र शुक्ल का जन्म 1884 ई. में बस्ती के अगोना ग्राम में हुआ। प्रमुख रचनाएँ: चिंतामणि व हिंदी साहित्य का इतिहास।',
        examTipsHi: 'बॉक्स में जन्म-1884, स्थान-अगोना, पिता-चंद्रबली शुक्ल, मृत्यु-1941 व रचना "चिंतामणि" अवश्य लिखें — पूरे 5 अंक पक्के!',
        examTipsEn: 'बॉक्स में जन्म-1884, स्थान-अगोना व रचना "चिंतामणि" अवश्य लिखें।',
        examWordLimit: '80 शब्द (5 अंक)'
      },
      {
        id: 'c10-bio-prasad',
        authorNameHi: 'जयशंकर प्रसाद',
        authorNameEn: 'जयशंकर प्रसाद',
        period: '1889 ई. – 1937 ई.',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'काशी (वाराणसी, उ.प्र.)',
        birthPlaceEn: 'काशी (वाराणसी, उ.प्र.)',
        notableWorksHi: ['कामायनी (महाकाव्य)', 'चन्द्रगुप्त', 'ध्रुवस्वामिनी', 'तितली', 'आकाशदीप'],
        notableWorksEn: ['कामायनी (महाकाव्य)', 'चन्द्रगुप्त', 'ध्रुवस्वामिनी', 'तितली', 'आकाशदीप'],
        summaryHi: 'छायावाद के प्रवर्तक जयशंकर प्रसाद का जन्म सन् 1889 ई. में काशी के प्रसिद्ध सुंघनी साहु परिवार में हुआ। पिता देवीप्रसाद थे। घर पर संस्कृत, हिंदी, उर्दू व फारसी का अध्ययन किया। क्षय रोग से 1937 में देहावसान हुआ।',
        summaryEn: 'छायावाद के प्रवर्तक जयशंकर प्रसाद का जन्म 1889 ई. में काशी में हुआ। प्रमुख रचनाएँ: कामायनी, चन्द्रगुप्त व ममता।',
        examTipsHi: 'कम से कम 2 नाटक (चन्द्रगुप्त, स्कन्दगुप्त) और 1 महाकाव्य (कामायनी) लिखना अनिवार्य है।',
        examTipsEn: 'चन्द्रगुप्त, स्कन्दगुप्त व कामायनी का उल्लेख अवश्य करें।',
        examWordLimit: '80 शब्द (5 अंक)'
      },
      {
        id: 'c10-bio-surdas',
        authorNameHi: 'महाकवि सूरदास',
        authorNameEn: 'महाकवि सूरदास',
        period: '1478 ई. – 1583 ई.',
        category: 'Kavya (Poetry)',
        birthPlaceHi: 'रुनकता (आगरा-मथुरा मार्ग)',
        birthPlaceEn: 'रुनकता (आगरा-मथुरा मार्ग)',
        notableWorksHi: ['सूरसागर', 'सूरसारावली', 'साहित्य लहरी'],
        notableWorksEn: ['सूरसागर', 'सूरसारावली', 'साहित्य लहरी'],
        summaryHi: 'वात्सल्य रस के सम्राट महाकवि सूरदास का जन्म 1478 ई. में रुनकता ग्राम में हुआ। गुरु वल्लभाचार्य के शिष्य बनकर वे अष्टछाप के प्रमुख कवि बने और श्रीनाथजी मंदिर में कृष्ण-लीला का गान किया। 1583 में पारसौली में निधन हुआ।',
        summaryEn: 'वात्सल्य रस के सम्राट सूरदास का जन्म 1478 ई. में रुनकता में हुआ। गुरु वल्लभाचार्य थे। प्रमुख रचनाएँ: सूरसागर, सूरसारावली, साहित्य लहरी।',
        examTipsHi: 'तीनों प्रामाणिक ग्रंथ (सूरसागर, सूरसारावली, साहित्य लहरी) और गुरु "वल्लभाचार्य" स्पष्ट लिखें।',
        examTipsEn: 'सूरसागर, सूरसारावली, साहित्य लहरी और गुरु वल्लभाचार्य लिखें।',
        examWordLimit: '80 शब्द (5 अंक)'
      },
      {
        id: 'c10-bio-tulsidas',
        authorNameHi: 'गोस्वामी तुलसीदास',
        authorNameEn: 'गोस्वामी तुलसीदास',
        period: '1532 ई. – 1623 ई.',
        category: 'Kavya (Poetry)',
        birthPlaceHi: 'राजापुर (चित्रकूट, उ.प्र.)',
        birthPlaceEn: 'राजापुर (चित्रकूट, उ.प्र.)',
        notableWorksHi: ['रामचरितमानस', 'विनय पत्रिका', 'कवितावली', 'दोहावली', 'गीतावली'],
        notableWorksEn: ['रामचरितमानस', 'विनय पत्रिका', 'कवितावली', 'दोहावली', 'गीतावली'],
        summaryHi: 'रामभक्ति शाखा के शिरोमणि तुलसीदास का जन्म 1532 ई. में राजापुर ग्राम में हुआ। पिता आत्माराम दुबे, माता हुलसी व गुरु नरहरिदास थे। उन्होंने अवधि और ब्रज दोनों में लोकमंगलकारी काव्य रचा। सन् 1623 में काशी में निधन हुआ।',
        summaryEn: 'तुलसीदास का जन्म 1532 ई. में राजापुर में हुआ। गुरु नरहरिदास थे। रचनाएँ: रामचरितमानस, विनय पत्रिका।',
        examTipsHi: 'संवत् 1680 असी गंग के तीर दोहे का जिक्र उत्तर को परीक्षक की नजर में 5/5 अंक दिलाता है।',
        examTipsEn: 'गुरु नरहरिदास व रामचरितमानस स्पष्ट लिखें।',
        examWordLimit: '80 शब्द (5 अंक)'
      }
    ],
    solvedPapers: buildThreeYearPapers(
      'c10-hindi', '901', 'हिंदी', 'Hindi', 70,
      'मित्रता, सूरदास पद, वाराणसी व रस-छंद-अलंकार', 'मित्रता, सूरदास पद, वाराणसी व रस-छंद-अलंकार',
      '20 OMR MCQs (रस/छंद/अलंकार + गद्य-पद्य इतिहास), 6M गद्यांश/पद्यांश, 5M जीवन परिचय (शुक्ल/सूरदास) व 7M निबंध।',
      '20 OMR MCQs, 6M गद्यांश/पद्यांश, 5M जीवन परिचय (शुक्ल/सूरदास) व 7M निबंध।'
    )
  },

  // 2. CLASS 10 ENGLISH (Code 917)
  {
    id: 'c10-english',
    classLevel: '10',
    code: '917',
    nameHi: 'अंग्रेजी (English 1st + 2nd)',
    nameEn: 'English (First Flight, Footprints & Grammar)',
    taglineHi: 'First Flight (9 Prose + 10 Poems), Footprints (9 Ch) व Grammar',
    taglineEn: 'First Flight (9 Prose + 10 Poems), Footprints (9 Ch) & Grammar',
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
      // First Flight Prose (9)
      {
        id: 'c10e-p1', number: 1, sectionHi: 'First Flight (Prose)', sectionEn: 'First Flight (Prose)',
        titleHi: 'A Letter to God (लेन्चो)', titleEn: 'A Letter to God (G.L. Fuentes)',
        authorOrTopicHi: 'Lencho की ईश्वर में अटूट आस्था व 70/100 Pesos प्रसंग', authorOrTopicEn: 'Lencho’s Unshakeable Faith & Post Office "Bunch of Crooks"',
        keyFocusHi: '100 Pesos मांग, 70 Pesos प्राप्ति, "Bunch of Crooks" क्यों कहा (5 Marks Fixed)',
        keyFocusEn: 'Why Lencho wrote to God, hailstones metaphor, and "bunch of crooks" irony (5 Marks Fixed)',
        boardWeightage: '6+4 Marks Fixed'
      },
      {
        id: 'c10e-p2', number: 2, sectionHi: 'First Flight (Prose)', sectionEn: 'First Flight (Prose)',
        titleHi: 'Nelson Mandela: Long Walk to Freedom', titleEn: 'Nelson Mandela: Long Walk to Freedom',
        authorOrTopicHi: '10 May 1994 शपथ व Twin Obligations', authorOrTopicEn: 'Apartheid, 10 May 1994 Inauguration & Twin Obligations',
        keyFocusHi: 'Twin Obligations (Family & Nation), Meaning of Courage and Freedom',
        keyFocusEn: 'Twin Obligations, real courage over absence of fear, and Rainbow Gathering',
        boardWeightage: '4-6 Marks'
      },
      {
        id: 'c10e-p3', number: 3, sectionHi: 'First Flight (Prose)', sectionEn: 'First Flight (Prose)',
        titleHi: 'Two Stories about Flying (Seagull & Black Aeroplane)', titleEn: 'Two Stories about Flying (First Flight & Black Aeroplane)',
        authorOrTopicHi: 'Young Seagull की उड़ान व Dakota DS 088', authorOrTopicEn: 'Young Seagull’s Hunger & Mysterious Pilot of Dakota DS 088',
        keyFocusHi: 'How hunger forced the seagull to fly & mysterious black aeroplane pilot',
        keyFocusEn: 'How hunger conquered fear and the mystery behind the Dakota DS 088 rescue',
        boardWeightage: '3-4 Marks'
      },
      {
        id: 'c10e-p4', number: 4, sectionHi: 'First Flight (Prose)', sectionEn: 'First Flight (Prose)',
        titleHi: 'From the Diary of Anne Frank', titleEn: 'From the Diary of Anne Frank',
        authorOrTopicHi: 'Kitty डायरी व Mr. Keesing निबंध', authorOrTopicEn: '"Paper has more patience than people" & Mr. Keesing',
        keyFocusHi: 'Why Anne called Kitty her true friend & "Quack, Quack, Quack" poem',
        keyFocusEn: 'Why Anne kept a diary named Kitty & how she turned the tables on Mr. Keesing',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10e-p5', number: 5, sectionHi: 'First Flight (Prose)', sectionEn: 'First Flight (Prose)',
        titleHi: 'Glimpses of India (Goa, Coorg, Assam)', titleEn: 'Glimpses of India (Baker, Coorg, Tea from Assam)',
        authorOrTopicHi: 'गोवा के Pader, कूर्ग कॉफी व असम चाय', authorOrTopicEn: 'Goan Bakers (Pader), Coorg (Kodavu) & Tea from Assam',
        keyFocusHi: 'Bread-making tradition (Bol, Kabai), Coorg brave warriors & Pranjol-Rajvir',
        keyFocusEn: 'Pader dress Kabai, Coorg hospitality/Kaveri river & Bodhidharma tea legend',
        boardWeightage: '3-4 Marks'
      },
      {
        id: 'c10e-p6', number: 6, sectionHi: 'First Flight (Prose)', sectionEn: 'First Flight (Prose)',
        titleHi: 'Mijbil the Otter', titleEn: 'Mijbil the Otter (Gavin Maxwell)',
        authorOrTopicHi: 'इराक के ऊदबिलाव मिजबिल का व्यवहार', authorOrTopicEn: 'Camusfearna, Tigris Marshes & Mijbil’s Water Play',
        keyFocusHi: 'Mijbil’s playful habits with water, marbles and air travel',
        keyFocusEn: 'Mijbil’s invention of games with ping-pong ball and bathroom water tap',
        boardWeightage: '3 Marks'
      },
      {
        id: 'c10e-p7', number: 7, sectionHi: 'First Flight (Prose)', sectionEn: 'First Flight (Prose)',
        titleHi: 'Madam Rides the Bus (Valli)', titleEn: 'Madam Rides the Bus (Vallikkannan)',
        authorOrTopicHi: '8 वर्षीय वल्ली की बस यात्रा (30 पैसे)', authorOrTopicEn: '8-year-old Valli’s 30-paise Bus Ride & Dead Cow Lesson',
        keyFocusHi: 'Valli’s careful planning and contrast between lively cow & dead cow',
        keyFocusEn: 'Valli’s maturity, pride in riding alone, and realization of life & death',
        boardWeightage: '4-6 Marks'
      },
      {
        id: 'c10e-p8', number: 8, sectionHi: 'First Flight (Prose)', sectionEn: 'First Flight (Prose)',
        titleHi: 'The Sermon at Benares (Gautama Buddha)', titleEn: 'The Sermon at Benares (Kisa Gotami)',
        authorOrTopicHi: 'किसा गौतमी और सरसों के दाने का उपदेश', authorOrTopicEn: 'Kisa Gotami, Mustard Seeds & Law of Mortality',
        keyFocusHi: 'Why Buddha asked for mustard seeds from a house untouched by death',
        keyFocusEn: 'How Buddha taught Kisa Gotami that death is common to all mortals',
        boardWeightage: '4-6 Marks High-Yield'
      },
      {
        id: 'c10e-p9', number: 9, sectionHi: 'First Flight (Prose)', sectionEn: 'First Flight (Prose)',
        titleHi: 'The Proposal (Anton Chekhov)', titleEn: 'The Proposal (Lomov, Natalya, Chubukov)',
        authorOrTopicHi: 'Oxen Meadows और Guess vs Squeezer झगड़ा', authorOrTopicEn: 'Oxen Meadows & Dog Quarrel (Guess vs Squeezer)',
        keyFocusHi: 'Satire on wealthy marriage proposals and comical property disputes',
        keyFocusEn: 'Character sketch of Lomov & Natalya; Oxen Meadows and Guess vs Squeezer',
        boardWeightage: '3-4 Marks'
      },
      // First Flight Poetry (10 Poems)
      {
        id: 'c10e-po1', number: 10, sectionHi: 'First Flight (Poetry)', sectionEn: 'First Flight (Poetry)',
        titleHi: 'Dust of Snow & Fire and Ice (Robert Frost)', titleEn: 'Dust of Snow & Fire and Ice (Robert Frost)',
        authorOrTopicHi: '2 पक्की याद करने योग्य 4-लाइन कविताएँ + Central Idea', authorOrTopicEn: '2 Guaranteed 4-Line Exam Poems + Central Idea (3+3 Marks)',
        keyFocusHi: 'Hemlock tree & crow changing mood; Fire = Desire, Ice = Hatred',
        keyFocusEn: 'Symbolic role of Crow & Hemlock Tree; Fire (Greed/Desire) vs Ice (Hatred)',
        boardWeightage: '6 Marks Guaranteed',
        poemsOrShlokasHi: ['The way a crow / Shook down on me / The dust of snow / From a hemlock tree.', 'Some say the world will end in fire, / Some say in ice. / From what I’ve tasted of desire / I hold with those who favor fire.'],
        poemsOrShlokasEn: ['The way a crow / Shook down on me / The dust of snow / From a hemlock tree.', 'Some say the world will end in fire, / Some say in ice. / From what I’ve tasted of desire / I hold with those who favor fire.']
      },
      {
        id: 'c10e-po2', number: 11, sectionHi: 'First Flight (Poetry)', sectionEn: 'First Flight (Poetry)',
        titleHi: 'A Tiger in the Zoo (Leslie Norris)', titleEn: 'A Tiger in the Zoo (Leslie Norris)',
        authorOrTopicHi: 'पिंजरे में बंद बाघ बनाम जंगल की आज़ादी', authorOrTopicEn: 'Concrete Cell Captivity vs Natural Jungle Freedom',
        keyFocusHi: 'Central Idea: Importance of freedom for wild animals over zoo cages',
        keyFocusEn: 'Central Idea: Wild animals belong to natural habitats, not concrete cells',
        boardWeightage: '3 Marks Central Idea'
      },
      {
        id: 'c10e-po3', number: 12, sectionHi: 'First Flight (Poetry)', sectionEn: 'First Flight (Poetry)',
        titleHi: 'How to Tell Wild Animals (Carolyn Wells)', titleEn: 'How to Tell Wild Animals (Carolyn Wells)',
        authorOrTopicHi: 'एशियाई शेर, बंगाल टाइगर, गिरगिट (Chameleon)', authorOrTopicEn: 'Humorous identification of Asian Lion, Bengal Tiger & Chameleon',
        keyFocusHi: 'Poetic license ("lep and lep again") and ironic descriptions',
        keyFocusEn: 'Humorous contrasts and rhyme scheme ABABCC across wild beasts',
        boardWeightage: '2-3 Marks'
      },
      {
        id: 'c10e-po4', number: 13, sectionHi: 'First Flight (Poetry)', sectionEn: 'First Flight (Poetry)',
        titleHi: 'The Ball Poem (John Berryman)', titleEn: 'The Ball Poem (John Berryman)',
        authorOrTopicHi: 'नुकसान सहने की शिक्षा (Epistemology of Loss)', authorOrTopicEn: 'Epistemology of Loss & Growing Up Responsibility',
        keyFocusHi: 'Why the poet does not offer money to buy another ball',
        keyFocusEn: 'Learning to stand up after inevitable losses in life',
        boardWeightage: '3 Marks'
      },
      {
        id: 'c10e-po5', number: 14, sectionHi: 'First Flight (Poetry)', sectionEn: 'First Flight (Poetry)',
        titleHi: 'Amanda! (Robin Klein)', titleEn: 'Amanda! (Robin Klein)',
        authorOrTopicHi: 'अमांडा की कल्पनाएँ (Mermaid, Orphan, Rapunzel)', authorOrTopicEn: 'Childhood Freedom vs Constant Parental Nagging',
        keyFocusHi: 'Central Idea: Balancing discipline with a child’s inner space',
        keyFocusEn: 'Amanda’s escapes into Mermaid, Orphan and Rapunzel fantasies',
        boardWeightage: '3 Marks Central Idea'
      },
      {
        id: 'c10e-po6', number: 15, sectionHi: 'First Flight (Poetry)', sectionEn: 'First Flight (Poetry)',
        titleHi: 'The Trees & Fog', titleEn: 'The Trees (Adrienne Rich) & Fog (Carl Sandburg)',
        authorOrTopicHi: 'जंगल में लौटते वृक्ष व बिल्ली रूपी कोहरा (Metaphor)', authorOrTopicEn: 'Nature’s Liberation & Little Cat Feet Metaphor',
        keyFocusHi: 'Personification of trees breaking glass & Haiku-like Fog imagery',
        keyFocusEn: 'Conflict between humans and nature; Metaphor comparing fog to a silent cat',
        boardWeightage: '3 Marks'
      },
      {
        id: 'c10e-po7', number: 16, sectionHi: 'First Flight (Poetry)', sectionEn: 'First Flight (Poetry)',
        titleHi: 'Custard the Dragon & For Anne Gregory', titleEn: 'The Tale of Custard the Dragon & For Anne Gregory',
        authorOrTopicHi: 'कस्टर्ड की वास्तविक वीरता व आंतरिक सौंदर्य', authorOrTopicEn: 'True Bravery in Crisis & Inner Beauty vs Yellow Hair',
        keyFocusHi: 'How "coward" Custard saved Belinda from the pirate; God loves inner soul',
        keyFocusEn: 'Appearance vs reality in Custard; W.B. Yeats on loving someone for themselves alone',
        boardWeightage: '3 Marks'
      },
      // Footprints without Feet (9)
      {
        id: 'c10e-s1', number: 17, sectionHi: 'Footprints (Supplementary)', sectionEn: 'Footprints without Feet',
        titleHi: 'A Triumph of Surgery (Tricki & Dr. Herriot)', titleEn: 'A Triumph of Surgery (Tricki & Dr. Herriot)',
        authorOrTopicHi: 'अधिक लाड़-प्यार और ट्रिकी का बिना दवा इलाज', authorOrTopicEn: 'Pampering by Mrs. Pumphrey & Dr. Herriot’s No-Medicine Cure',
        keyFocusHi: 'How exercise and simple diet cured Tricki in 14 days',
        keyFocusEn: 'Why Mrs. Pumphrey called Tricki’s recovery "A Triumph of Surgery"',
        boardWeightage: '4 Marks Fixed'
      },
      {
        id: 'c10e-s2', number: 18, sectionHi: 'Footprints (Supplementary)', sectionEn: 'Footprints without Feet',
        titleHi: 'The Thief’s Story (Hari Singh & Anil)', titleEn: 'The Thief’s Story (Hari Singh & Anil)',
        authorOrTopicHi: 'अनिल का विश्वास जिसने चोर हरि सिंह को बदला', authorOrTopicEn: 'How Anil’s Trust & Education Transformed Hari Singh',
        keyFocusHi: 'Why Hari Singh returned the stolen 600 rupees to Anil',
        keyFocusEn: 'Character contrast of trusting Anil vs clever thief Hari Singh',
        boardWeightage: '4 Marks Fixed'
      },
      {
        id: 'c10e-s3', number: 19, sectionHi: 'Footprints (Supplementary)', sectionEn: 'Footprints without Feet',
        titleHi: 'The Midnight Visitor & A Question of Trust', titleEn: 'The Midnight Visitor & A Question of Trust',
        authorOrTopicHi: 'Ausable की बालकनी चाल व Horace Danby की चोरी', authorOrTopicEn: 'Ausable’s Balcony Bluff & Horace Danby Outwitted',
        keyFocusHi: 'Presence of mind over gun power (Max) & "Honour among thieves"',
        keyFocusEn: 'How fat Ausable outsmarted Max & how the lady in red tricked Horace',
        boardWeightage: '3-4 Marks'
      },
      {
        id: 'c10e-s4', number: 20, sectionHi: 'Footprints (Supplementary)', sectionEn: 'Footprints without Feet',
        titleHi: 'Footprints without Feet (Griffin)', titleEn: 'Footprints without Feet (Griffin the Lawless Scientist)',
        authorOrTopicHi: 'अदृश्य वैज्ञानिक ग्रिफिन व विज्ञान का दुरुपयोग', authorOrTopicEn: 'Misuse of Invisibility Drug by Griffin at Iping Inn',
        keyFocusHi: 'Griffin’s brilliant discovery ruined by lawless anger & theft',
        keyFocusEn: 'Character sketch of Griffin: "Brilliant scientist, lawless person"',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10e-s5', number: 21, sectionHi: 'Footprints (Supplementary)', sectionEn: 'Footprints without Feet',
        titleHi: 'The Making of a Scientist (Richard Ebright)', titleEn: 'The Making of a Scientist (Richard Ebright)',
        authorOrTopicHi: 'मोनार्क तितलियाँ, डीएनए व रिचर्ड एब्राइट की जिज्ञासा', authorOrTopicEn: 'Monarch Butterflies, Cell DNA Discovery & Mother’s Role',
        keyFocusHi: '3 ingredients of a scientist: First-rate mind, curiosity, will to win',
        keyFocusEn: 'Role of Ebright’s mother and Dr. Urquhart in his scientific journey',
        boardWeightage: '3-4 Marks'
      },
      {
        id: 'c10e-s6', number: 22, sectionHi: 'Footprints (Supplementary)', sectionEn: 'Footprints without Feet',
        titleHi: 'The Necklace (Matilda Loisel)', titleEn: 'The Necklace (Matilda Loisel)',
        authorOrTopicHi: '10 साल का संघर्ष और नकली हार की विडंबना', authorOrTopicEn: 'Matilda’s Vanity, 10 Years of Debt & Fake 500-Franc Necklace',
        keyFocusHi: 'Moral: Contentment is key; borrowing luxury ruined 10 years of life',
        keyFocusEn: 'How Matilda’s dissatisfaction and lost necklace destroyed the Loisels',
        boardWeightage: '4 Marks High-Yield'
      },
      {
        id: 'c10e-s7', number: 23, sectionHi: 'Footprints (Supplementary)', sectionEn: 'Footprints without Feet',
        titleHi: 'Bholi & The Book that Saved the Earth', titleEn: 'Bholi (Sulekha) & The Book that Saved the Earth',
        authorOrTopicHi: 'भोली का आत्मसम्मान (Bishamber को इनकार) व Mother Goose', authorOrTopicEn: 'Bholi’s Education Triumph & Nursery Rhymes Saving Earth from Mars',
        keyFocusHi: 'How Bholi transformed from a stammering simpleton into confident Sulekha',
        keyFocusEn: 'Role of Bholi’s teacher; how "Mother Goose" scared Martian Think-Tank',
        boardWeightage: '4-6 Marks Fixed'
      },
      // English 2nd Grammar & Writing
      {
        id: 'c10e-g1', number: 24, sectionHi: 'English 2nd (Grammar)', sectionEn: 'English 2nd (Grammar & Writing)',
        titleHi: 'Tenses, Prepositions, Active-Passive & Narration', titleEn: 'Tenses, Prepositions, Active-Passive Voice & Narration',
        authorOrTopicHi: 'Parts of Speech, Reordering, Punctuation व Translation', authorOrTopicEn: 'OMR Grammar Rules, Reordering, Direct-Indirect & Translation (10 Marks)',
        keyFocusHi: 'Passive of "Who/Imperative" & Reporting verb past tense rules',
        keyFocusEn: 'Mastering Direct-Indirect rules, Active-Passive conversions & 4-mark Hindi-to-English translation',
        boardWeightage: '10 Marks Fixed'
      },
      {
        id: 'c10e-g2', number: 25, sectionHi: 'English 2nd (Writing)', sectionEn: 'English 2nd (Composition & Letters)',
        titleHi: 'Formal Letter / Application & Descriptive Essay', titleEn: 'Formal Letter (Editor/Principal) & Analytical Paragraph',
        authorOrTopicHi: 'फीस माफी, बिजली/जल आपूर्ति व पर्यावरण/अनुशासन लेख', authorOrTopicEn: '4 Marks Application/Letter + 6 Marks Report/Article Writing',
        keyFocusHi: 'Clean UPMSP letter format (To, The Principal/Editor, Subject, Salutation)',
        keyFocusEn: 'Structured headings for 6-mark Articles (Pollution, Discipline, Digital India)',
        boardWeightage: '10 Marks Fixed'
      }
    ],
    coreMcqs: [
      {
        id: 'c10e-mcq-1',
        questionHi: 'लेन्चो ने ओलावृष्टि के बाद ईश्वर को पत्र लिखकर कितने पेसोस (Pesos) की मांग की थी?',
        questionEn: 'How many pesos did Lencho ask God for in his first letter after the hailstorm?',
        optionsHi: ['70 Pesos', '100 Pesos', '50 Pesos', '30 Pesos'],
        optionsEn: ['70 Pesos', '100 Pesos', '50 Pesos', '30 Pesos'],
        correctIndex: 1,
        explanationHi: 'लेन्चो ने फसल दोबारा बोने और परिवार चलाने हेतु 100 पेसोस की मांग की थी, पर उसे केवल 70 पेसोस मिले।',
        explanationEn: 'Lencho requested 100 pesos to resow his field and support his family, though he received 70 pesos.',
        chapter: 'A Letter to God',
        chapterEn: 'A Letter to God',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10e-mcq-2',
        questionHi: 'ट्रिकी (Tricki) किसकी लाड़ली पालतू कुत्ता था?',
        questionEn: 'Who was the rich mistress of Tricki in "A Triumph of Surgery"?',
        optionsHi: ['Mrs. Hall', 'Mrs. Pumphrey', 'Matilda', 'Anne Frank'],
        optionsEn: ['Mrs. Hall', 'Mrs. Pumphrey', 'Matilda', 'Anne Frank'],
        correctIndex: 1,
        explanationHi: 'Mrs. Pumphrey ने ट्रिकी को अधिक मलाई, केक और चॉकलेट खिलाकर बीमार कर दिया था।',
        explanationEn: 'Mrs. Pumphrey overfed Tricki with cream cakes, chocolates and cod-liver oil.',
        chapter: 'A Triumph of Surgery',
        chapterEn: 'A Triumph of Surgery',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c10e-mcq-3',
        questionHi: '"Dust of Snow" कविता में कौवे (Crow) ने कवि पर बर्फ किस पेड़ से गिराई?',
        questionEn: 'From which tree did the crow shake down the dust of snow on the poet?',
        optionsHi: ['Oak tree', 'Pine tree', 'Hemlock tree', 'Banyan tree'],
        optionsEn: ['Oak tree', 'Pine tree', 'Hemlock tree', 'Banyan tree'],
        correctIndex: 2,
        explanationHi: 'Robert Frost ने नकारात्मकता के प्रतीक धतूरा/विषैले वृक्ष "Hemlock tree" और कौवे से सकारात्मक बदलाव दिखाया।',
        explanationEn: 'Robert Frost used a poisonous Hemlock tree and a crow to show how small nature moments uplift mood.',
        chapter: 'Dust of Snow & Fire and Ice',
        chapterEn: 'Dust of Snow & Fire and Ice',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10e-mcq-4',
        questionHi: 'सही Preposition चुनें: He is fond ____ classical music.',
        questionEn: 'Choose the correct preposition: He is fond ____ classical music.',
        optionsHi: ['with', 'of', 'for', 'from'],
        optionsEn: ['with', 'of', 'for', 'from'],
        correctIndex: 1,
        explanationHi: 'अंग्रेजी व्याकरण में "fond" शब्द के साथ हमेशा "of" (fond of = शौकीन होना) प्रयुक्त होता है।',
        explanationEn: 'The adjective "fond" always takes the fixed preposition "of".',
        chapter: 'Tenses, Prepositions & Narration',
        chapterEn: 'Tenses, Prepositions & Narration',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c10e-imp-1',
        marks: 5,
        chapter: 'A Letter to God',
        chapterEn: 'A Letter to God',
        questionHi: 'लेन्चो ने डाकघर के कर्मचारियों को "बेईमानों का झुंड" (a bunch of crooks) क्यों कहा? क्या वे वास्तव में बेईमान थे?',
        questionEn: 'Why did Lencho call the post office employees "a bunch of crooks"? Was he justified?',
        answerHi: 'जब लेन्चो ने लिफाफा खोला तो उसमें 100 पेसोस के बजाय केवल 70 पेसोस निकले। चूँकि उसे ईश्वर पर अटूट विश्वास था कि ईश्वर गलती नहीं कर सकते, इसलिए उसने सोचा कि बाकी 30 पेसोस डाकघर के कर्मचारियों ने चुरा लिए हैं। वास्तव में वे बेईमान नहीं बल्कि अत्यंत दयालु थे जिन्होंने अपनी सैलरी से 70 पेसोस जुटाए थे।',
        answerEn: 'Lencho had asked God for 100 pesos but found only 70 pesos in the envelope. Believing God could never make a mistake, he suspected the post office staff of stealing the remaining 30 pesos. In reality, they were generous helpers who donated from their own salaries.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '5 Marks Guaranteed',
        tagEn: '5 Marks Guaranteed'
      },
      {
        id: 'c10e-imp-2',
        marks: 3,
        chapter: 'Dust of Snow & Fire and Ice',
        chapterEn: 'Dust of Snow & Fire and Ice',
        questionHi: 'UP बोर्ड परीक्षा में लिखने हेतु 4 पंक्तियों की दो याद की हुई कविताएँ (Dust of Snow / Fire and Ice) तथा Central Idea लिखें।',
        questionEn: 'Write 4 lines of two prescribed poems (Dust of Snow & Fire and Ice) along with Central Idea for 3+3 Marks.',
        answerHi: 'Poem 1 (Dust of Snow):\nThe way a crow\nShook down on me\nThe dust of snow\nFrom a hemlock tree.\n\nPoem 2 (Fire and Ice):\nSome say the world will end in fire,\nSome say in ice.\nFrom what I\'ve tasted of desire\nI hold with those who favor fire.\n\nCentral Idea (Dust of Snow): Small, seemingly insignificant incidents in nature can unexpectedly uplift our sorrowful mood and save the rest of our day.',
        answerEn: 'Poem 1 (Dust of Snow):\nThe way a crow\nShook down on me\nThe dust of snow\nFrom a hemlock tree.\n\nPoem 2 (Fire and Ice):\nSome say the world will end in fire,\nSome say in ice.\nFrom what I\'ve tasted of desire\nI hold with those who favor fire.\n\nCentral Idea: Small incidents in nature hold deep power to transform human sadness into hope.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026'],
        tagHi: '6 Marks Poetry Fixed',
        tagEn: '6 Marks Poetry Fixed'
      }
    ],
    biographies: [
      {
        id: 'c10-bio-frost',
        authorNameHi: 'रॉबर्ट फ्रॉस्ट (Robert Frost)',
        authorNameEn: 'Robert Frost (Famous American Poet)',
        period: '1874 – 1963',
        category: 'English Literature',
        birthPlaceHi: 'सैन फ्रांसिस्को, यूएसए',
        birthPlaceEn: 'San Francisco, USA',
        notableWorksHi: ['Dust of Snow', 'Fire and Ice', 'Stopping by Woods', 'The Road Not Taken'],
        notableWorksEn: ['Dust of Snow', 'Fire and Ice', 'Stopping by Woods', 'The Road Not Taken'],
        summaryHi: 'प्रसिद्ध अमेरिकी प्रकृतिवादी कवि जिन्होंने साधारण ग्रामीण प्रतीकों (कौवा, बर्फ, हेमलॉक वृक्ष, आग-बर्फ) द्वारा गहरे मानवीय संदेश दिए।',
        summaryEn: 'Renowned Pulitzer-winning American poet known for realistic depictions of rural life and deep philosophical symbolism using nature imagery.',
        examTipsHi: 'Extract व Central Idea में कवि का नाम "Robert Frost" की स्पेलिंग सही लिखने पर सीधे अतिरिक्त अंक मिलते हैं।',
        examTipsEn: 'Always credit "Robert Frost" clearly in both Central Idea and stanza reference answers.',
        examWordLimit: 'Central Idea (40-50 Words)'
      },
      {
        id: 'c10-bio-mandela',
        authorNameHi: 'नेल्सन मंडेला (Nelson Mandela)',
        authorNameEn: 'Nelson Mandela (South Africa’s First Black President)',
        period: '1918 – 2013',
        category: 'English Literature',
        birthPlaceHi: 'म्वेजो, दक्षिण अफ्रीका',
        birthPlaceEn: 'Mvezo, South Africa',
        notableWorksHi: ['Long Walk to Freedom (आत्मकथा)'],
        notableWorksEn: ['Long Walk to Freedom (Autobiography)'],
        summaryHi: 'रंगभेद (Apartheid) के विरुद्ध 30 वर्ष जेल में बिताकर दक्षिण अफ्रीका को लोकतंत्र दिलाने वाले महान नेता और नोबेल शांति पुरस्कार विजेता।',
        summaryEn: 'Anti-apartheid revolutionary who spent 30 years in prison and became South Africa’s first Black President on May 10, 1994.',
        examTipsHi: 'Long Answer में "Apartheid" तथा "10th May 1994" तिथि का उल्लेख अवश्य करें।',
        examTipsEn: 'Highlight "Apartheid system", "10 May 1994", and "Twin Obligations" for full 5 marks.',
        examWordLimit: 'Long Answer (60 Words)'
      }
    ],
    solvedPapers: buildThreeYearPapers(
      'c10-english', '917', 'अंग्रेजी', 'English', 70,
      'Lencho, Mandela, Dust of Snow, Bholi & Narration', 'Lencho, Mandela, Dust of Snow, Bholi & Narration',
      '20 OMR MCQs (Unseen Passage + Grammar + Prose/Footprints), Letter to Editor/Principal, 4-line Poem & Central Idea.',
      '20 OMR MCQs (Passage + Grammar + Literature), Formal Letter, 4-line Poem & 5-mark Long Answers.'
    )
  },

  // 3. CLASS 10 MATHEMATICS (Code 928) - All 14 NCERT Chapters
  {
    id: 'c10-maths',
    classLevel: '10',
    code: '928',
    nameHi: 'गणित (Mathematics)',
    nameEn: 'Mathematics (Code 928)',
    taglineHi: 'सभी 14 NCERT अध्याय: √5 सिद्ध, थैल्स प्रमेय (6M), त्रिकोणमिति व सांख्यिकी',
    taglineEn: 'All 14 NCERT Chapters: √5 Proof, Thales Theorem (6M), Trig & Statistics',
    iconName: 'Calculator',
    colorTheme: {
      bgLight: 'bg-indigo-50/70',
      bgDark: 'dark:bg-indigo-950/20',
      borderLight: 'border-indigo-200',
      borderDark: 'dark:border-indigo-800/40',
      accent: 'text-indigo-600 dark:text-indigo-400',
      text: 'hover:border-indigo-400',
    },
    chapterDetails: [
      {
        id: 'c10m-1', number: 1, sectionHi: 'अध्याय 1', sectionEn: 'Chapter 1',
        titleHi: 'वास्तविक संख्याएँ (Real Numbers)', titleEn: 'Real Numbers',
        authorOrTopicHi: '√2, √3, √5 अपरिमेय सिद्ध करना व HCF×LCM = a×b', authorOrTopicEn: 'Proving √2, √3, √5 Irrational & Fundamental Theorem of Arithmetic',
        keyFocusHi: '3 अंक पक्का: विरोधाभास विधि से √5 को अपरिमेय सिद्ध करना',
        keyFocusEn: '3 Marks Fixed: Contradiction proof of √5 irrationality & HCF×LCM identity',
        boardWeightage: '5 Marks Fixed',
        formulaOrTrickHi: 'HCF(a, b) × LCM(a, b) = a × b | शांत दशमलव हेतु हर q = 2ⁿ × 5ᵐ रूप में हो।',
        formulaOrTrickEn: 'HCF(a, b) × LCM(a, b) = a × b | Terminating decimal denominator form: 2ⁿ × 5ᵐ'
      },
      {
        id: 'c10m-2', number: 2, sectionHi: 'अध्याय 2', sectionEn: 'Chapter 2',
        titleHi: 'बहुपद (Polynomials)', titleEn: 'Polynomials',
        authorOrTopicHi: 'शून्यकों का योगफल (α+β = -b/a) व गुणनफल (αβ = c/a)', authorOrTopicEn: 'Sum & Product of Zeroes (α+β = -b/a, αβ = c/a)',
        keyFocusHi: 'द्विघात बहुपद निर्माण: x² - (α+β)x + αβ = 0 (OMR में 2 प्रश्न पक्के)',
        keyFocusEn: 'Quadratic construction: k[x² - (α+β)x + αβ] (2 OMR MCQs guaranteed)',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10m-3', number: 3, sectionHi: 'अध्याय 3', sectionEn: 'Chapter 3',
        titleHi: 'दो चर वाले रैखिक समीकरण युग्म', titleEn: 'Pair of Linear Equations in Two Variables',
        authorOrTopicHi: 'प्रतिस्थापन, विलोपन विधि व अद्वितीय/अनंत/कोई हल नहीं शर्त', authorOrTopicEn: 'Substitution, Elimination & Consistency Conditions (a₁/a₂ vs b₁/b₂)',
        keyFocusHi: 'k का मान ज्ञात करना जब रेखाएँ समांतर (a₁/a₂ = b₁/b₂ ≠ c₁/c₂) हों',
        keyFocusEn: 'Finding k for parallel, intersecting, and coincident lines; boat/age word problems',
        boardWeightage: '6 Marks'
      },
      {
        id: 'c10m-4', number: 4, sectionHi: 'अध्याय 4', sectionEn: 'Chapter 4',
        titleHi: 'द्विघात समीकरण (Quadratic Equations)', titleEn: 'Quadratic Equations',
        authorOrTopicHi: 'श्रीधराचार्य सूत्र व विविक्तकर D = b² - 4ac', authorOrTopicEn: 'Quadratic Formula & Discriminant D = b² - 4ac (Nature of Roots)',
        keyFocusHi: 'समान मूलों हेतु D = 0, वास्तविक भिन्न हेतु D > 0 — 4 अंक प्रश्न',
        keyFocusEn: 'Equal roots condition D = 0; speed-time train word problems (4-6 Marks)',
        boardWeightage: '6 Marks'
      },
      {
        id: 'c10m-5', number: 5, sectionHi: 'अध्याय 5', sectionEn: 'Chapter 5',
        titleHi: 'समांतर श्रेढ़ियाँ (AP)', titleEn: 'Arithmetic Progressions (AP)',
        authorOrTopicHi: 'nवाँ पद aₙ = a + (n-1)d व योगफल Sₙ', authorOrTopicEn: 'nth term aₙ = a + (n-1)d & Sum Sₙ = n/2[2a + (n-1)d]',
        keyFocusHi: 'अंतिम पद से nवाँ पद तथा तीन अंकों वाली 7 से विभाज्य संख्याओं का योग',
        keyFocusEn: 'Finding 3-digit numbers divisible by 7 and sum of n terms problems',
        boardWeightage: '5 Marks'
      },
      {
        id: 'c10m-6', number: 6, sectionHi: 'अध्याय 6', sectionEn: 'Chapter 6',
        titleHi: 'त्रिभुज (Triangles - Thales BPT)', titleEn: 'Triangles (Thales Theorem / BPT)',
        authorOrTopicHi: 'थैल्स प्रमेय (AD/DB = AE/EC) — 6 अंक फिक्स्ड उपपत्ति', authorOrTopicEn: 'Basic Proportionality Theorem (BPT / Thales Proof) — 6 Marks Fixed',
        keyFocusHi: 'यदि किसी त्रिभुज की एक भुजा के समांतर रेखा खींची जाए तो अन्य दो भुजाएँ समान अनुपात में बंटती हैं।',
        keyFocusEn: 'Complete step-by-step BPT proof with construction DM⊥AC, EN⊥AB & AA similarity',
        boardWeightage: '6 Marks Guaranteed'
      },
      {
        id: 'c10m-7', number: 7, sectionHi: 'अध्याय 7', sectionEn: 'Chapter 7',
        titleHi: 'निर्देशांक ज्यामिति', titleEn: 'Coordinate Geometry',
        authorOrTopicHi: 'दूरी सूत्र, विभाजन सूत्र व समदूरस्थ बिंदु', authorOrTopicEn: 'Distance Formula, Section Formula & Midpoint Coordinates',
        keyFocusHi: 'x-अक्ष पर समदूरस्थ बिंदु व संरेख बिंदु के 4 अंक प्रश्न',
        keyFocusEn: 'Equidistant point on x-axis (x, 0) and ratio dividing line segment',
        boardWeightage: '5 Marks'
      },
      {
        id: 'c10m-8', number: 8, sectionHi: 'अध्याय 8', sectionEn: 'Chapter 8',
        titleHi: 'त्रिकोणमिति का परिचय', titleEn: 'Introduction to Trigonometry',
        authorOrTopicHi: 'त्रिकोणमितीय सर्वसमिकाएँ (sin²θ + cos²θ = 1) व मान सारणी', authorOrTopicEn: 'Trigonometric Identities (sin²θ + cos²θ = 1) & Standard Angles',
        keyFocusHi: '(cosec θ - cot θ)² = (1 - cos θ)/(1 + cos θ) जैसे 4 व 6 अंक सिद्ध प्रश्न',
        keyFocusEn: 'Proving key identities & finding values at 0°, 30°, 45°, 60°, 90°',
        boardWeightage: '8 Marks High-Yield'
      },
      {
        id: 'c10m-9', number: 9, sectionHi: 'अध्याय 9', sectionEn: 'Chapter 9',
        titleHi: 'त्रिकोणमिति के कुछ अनुप्रयोग (ऊँचाई और दूरी)', titleEn: 'Applications of Trigonometry (Heights & Distances)',
        authorOrTopicHi: 'उन्नयन व अवनमन कोण (30°, 45°, 60°) — 6 अंक का प्रश्न', authorOrTopicEn: 'Angles of Elevation & Depression — 6-Mark Word Problems',
        keyFocusHi: 'मीनार की ऊँचाई, टूटे पेड़ व 2 जहाजों/भवन के शीर्ष के 6 अंक सवाल',
        keyFocusEn: 'Building-tower elevation & two-ship depression 6-mark long problems',
        boardWeightage: '6 Marks Fixed'
      },
      {
        id: 'c10m-10', number: 10, sectionHi: 'अध्याय 10', sectionEn: 'Chapter 10',
        titleHi: 'वृत्त (Circles)', titleEn: 'Circles (Tangents & Secants)',
        authorOrTopicHi: 'स्पर्श रेखा त्रिज्या पर लम्ब होती है व बाह्य बिंदु से स्पर्श रेखाएँ बराबर', authorOrTopicEn: 'Tangent ⊥ Radius at Point of Contact & Equal Tangents Theorem',
        keyFocusHi: 'प्रमेय 10.1 व 10.2 सिद्ध करना तथा समकोण त्रिभुज पाइथागोरस OMR प्रश्न',
        keyFocusEn: 'Proving PA = PB from external point & finding tangent length via Pythagoras',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10m-11', number: 11, sectionHi: 'अध्याय 11', sectionEn: 'Chapter 11',
        titleHi: 'वृत्तों से संबंधित क्षेत्रफल', titleEn: 'Areas Related to Circles',
        authorOrTopicHi: 'त्रिज्यखंड क्षेत्रफल (θ/360×πr²) व चाप की लंबाई', authorOrTopicEn: 'Area of Sector (θ/360×πr²), Segment & Arc Length',
        keyFocusHi: 'घड़ी की मिनट सुई द्वारा 5 मिनट में रचित क्षेत्रफल (θ = 30°)',
        keyFocusEn: 'Area swept by clock minute hand in 5 mins & chord segment area',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10m-12', number: 12, sectionHi: 'अध्याय 12', sectionEn: 'Chapter 12',
        titleHi: 'पृष्ठीय क्षेत्रफल और आयतन', titleEn: 'Surface Areas and Volumes',
        authorOrTopicHi: 'शंकु, बेलन, गोला व कैप्सूल/खिलौना संयोजन प्रश्न', authorOrTopicEn: 'Combined Solids: Cone + Hemisphere Toys & Cylinder Capsules',
        keyFocusHi: 'वक्रपृष्ठ, कुल पृष्ठीय क्षेत्रफल एवं आयतन के संयुक्त 6 अंक सवाल',
        keyFocusEn: 'TSA & Volume of combined solids (cylinder with hemispherical ends)',
        boardWeightage: '6 Marks'
      },
      {
        id: 'c10m-13', number: 13, sectionHi: 'अध्याय 13', sectionEn: 'Chapter 13',
        titleHi: 'सांख्यिकी (Statistics)', titleEn: 'Statistics (Mean, Median, Mode)',
        authorOrTopicHi: 'माध्य, माध्यिका, बहुलक व 3 Median = Mode + 2 Mean', authorOrTopicEn: 'Grouped Mean, Median, Mode & 3 Median = Mode + 2 Mean',
        keyFocusHi: 'लुप्त बारंबारता (x, y) ज्ञात करना — 6 अंक का 100% पक्का प्रश्न',
        keyFocusEn: 'Finding missing frequencies (f₁, f₂) given Median — 6 Marks Guaranteed',
        boardWeightage: '10 Marks Guaranteed',
        formulaOrTrickHi: 'गोल्डन रिलेशन: 3 माध्यिका = बहुलक + 2 माध्य | Median = L + [(N/2 - cf)/f] × h',
        formulaOrTrickEn: 'Empirical Relation: 3 Median = Mode + 2 Mean | Mode = L + [(f₁-f₀)/(2f₁-f₀-f₂)] × h'
      },
      {
        id: 'c10m-14', number: 14, sectionHi: 'अध्याय 14', sectionEn: 'Chapter 14',
        titleHi: 'प्रायिकता (Probability)', titleEn: 'Probability',
        authorOrTopicHi: 'पासा, ताश (52 पत्ते) व सिक्के — P(E) + P(Ē) = 1', authorOrTopicEn: 'Dice, 52 Playing Cards, Coins & Complementary Event P(E)+P(Ē)=1',
        keyFocusHi: 'निश्चित घटना की प्रायिकता 1 व असंभव की 0 (0 ≤ P(E) ≤ 1)',
        keyFocusEn: 'Probability of getting a face card, prime number on die, or sum 8',
        boardWeightage: '4 Marks'
      }
    ],
    coreMcqs: [
      {
        id: 'c10m-mcq-1',
        questionHi: 'यदि द्विघात समीकरण 3x² - 6x + k = 0 के मूल बराबर हैं, तो k का मान क्या होगा?',
        questionEn: 'If the quadratic equation 3x² - 6x + k = 0 has equal roots, what is the value of k?',
        optionsHi: ['2', '3', '6', '9'],
        optionsEn: ['2', '3', '6', '9'],
        correctIndex: 1,
        explanationHi: 'समान मूलों हेतु D = b² - 4ac = 0 => (-6)² - 4(3)(k) = 0 => 36 = 12k => k = 3।',
        explanationEn: 'For equal roots, Discriminant D = b² - 4ac = 0 => (-6)² - 4(3)(k) = 0 => 36 = 12k => k = 3.',
        chapter: 'द्विघात समीकरण',
        chapterEn: 'Quadratic Equations',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10m-mcq-2',
        questionHi: 'बंटन के लिए आनुभविक संबंध क्या होता है? (माध्य, माध्यिका और बहुलक के बीच)',
        questionEn: 'What is the empirical relationship between Mean, Median, and Mode?',
        optionsHi: [
          'बहुलक = 3 माध्य - 2 माध्यिका',
          '3 माध्यिका = बहुलक + 2 माध्य',
          'माध्य = 3 माध्यिका - 2 बहुलक',
          'बहुलक = 2 माध्यिका - 3 माध्य'
        ],
        optionsEn: [
          'Mode = 3 Mean - 2 Median',
          '3 Median = Mode + 2 Mean',
          'Mean = 3 Median - 2 Mode',
          'Mode = 2 Median - 3 Mean'
        ],
        correctIndex: 1,
        explanationHi: 'मानक सूत्र: 3 Median = Mode + 2 Mean या Mode = 3 Median - 2 Mean।',
        explanationEn: 'Standard empirical formula: 3 Median = Mode + 2 Mean (i.e., Mode = 3 Median - 2 Mean).',
        chapter: 'सांख्यिकी',
        chapterEn: 'Statistics',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c10m-mcq-3',
        questionHi: 'यदि किसी घटना के घटित होने की प्रायिकता P(E) = 0.05 है, तो "E नहीं" की प्रायिकता P(Ē) क्या होगी?',
        questionEn: 'If P(E) = 0.05, what is the probability of "not E", i.e., P(Ē)?',
        optionsHi: ['0.90', '0.95', '0.05', '1.05'],
        optionsEn: ['0.90', '0.95', '0.05', '1.05'],
        correctIndex: 1,
        explanationHi: 'चूँकि P(E) + P(Ē) = 1 होता है, इसलिए P(Ē) = 1 - 0.05 = 0.95।',
        explanationEn: 'Since P(E) + P(not E) = 1, therefore P(not E) = 1 - 0.05 = 0.95.',
        chapter: 'प्रायिकता',
        chapterEn: 'Probability',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10m-mcq-4',
        questionHi: 'दो समरूप त्रिभुजों की भुजाओं का अनुपात 4 : 9 है, तो इनके क्षेत्रफलों का अनुपात क्या होगा?',
        questionEn: 'If the sides of two similar triangles are in the ratio 4 : 9, find the ratio of their areas.',
        optionsHi: ['2 : 3', '4 : 9', '16 : 81', '81 : 16'],
        optionsEn: ['2 : 3', '4 : 9', '16 : 81', '81 : 16'],
        correctIndex: 2,
        explanationHi: 'समरूप त्रिभुजों के क्षेत्रफलों का अनुपात संगत भुजाओं के वर्ग के अनुपात (4² : 9² = 16 : 81) के बराबर होता है।',
        explanationEn: 'Ratio of areas of similar triangles equals the square of the ratio of corresponding sides: 4² : 9² = 16 : 81.',
        chapter: 'त्रिभुज',
        chapterEn: 'Triangles',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c10m-imp-1',
        marks: 6,
        chapter: 'त्रिभुज (थैल्स प्रमेय BPT)',
        chapterEn: 'Triangles (Thales Theorem BPT)',
        questionHi: 'थैल्स प्रमेय (आधारभूत समानुपातिकता प्रमेय) का कथन लिखकर सिद्ध कीजिए: यदि किसी त्रिभुज की एक भुजा के समांतर अन्य दो भुजाओं को काटती रेखा खींची जाए, तो वह उन्हें समान अनुपात में विभाजित करती है।',
        questionEn: 'State and prove Thales Theorem (Basic Proportionality Theorem): If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.',
        answerHi: 'दिया है: ΔABC में DE || BC।\nसिद्ध करना है: AD/DB = AE/EC।\nरचना: B को E से तथा C को D से मिलाया। DM ⊥ AC व EN ⊥ AB खींचा।\nउपपत्ति:\n1. ar(ΔADE)/ar(ΔBDE) = (½×AD×EN)/(½×DB×EN) = AD/DB --- (i)\n2. ar(ΔADE)/ar(ΔCDE) = (½×AE×DM)/(½×EC×DM) = AE/EC --- (ii)\n3. चूँकि ΔBDE व ΔCDE एक ही आधार DE व समांतर रेखाओं DE || BC के मध्य हैं, अतः ar(ΔBDE) = ar(ΔCDE)।\nअतः (i) व (ii) से AD/DB = AE/EC (इति सिद्धम्)।',
        answerEn: 'Given: In ΔABC, DE || BC.\nTo Prove: AD/DB = AE/EC.\nConstruction: Join BE, CD and draw DM ⊥ AC, EN ⊥ AB.\nProof:\n1. ar(ΔADE)/ar(ΔBDE) = (½×AD×EN)/(½×DB×EN) = AD/DB --- (1)\n2. ar(ΔADE)/ar(ΔCDE) = (½×AE×DM)/(½×EC×DM) = AE/EC --- (2)\n3. ΔBDE and ΔCDE lie on the same base DE and between parallels DE || BC, so ar(ΔBDE) = ar(ΔCDE).\nHence from (1) & (2): AD/DB = AE/EC. (Proved)',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '6 अंक गारंटीड उपपत्ति',
        tagEn: '6 Marks Guaranteed Proof'
      },
      {
        id: 'c10m-imp-2',
        marks: 3,
        chapter: 'वास्तविक संख्याएँ',
        chapterEn: 'Real Numbers',
        questionHi: 'सिद्ध कीजिए कि √5 एक अपरिमेय संख्या है।',
        questionEn: 'Prove that √5 is an irrational number.',
        answerHi: 'विरोधाभास विधि: माना √5 एक परिमेय संख्या है। तब √5 = p/q जहाँ p, q सह-अभाज्य पूर्णांक हैं व q ≠ 0।\nदोनों पक्षों का वर्ग करने पर: p² = 5q² => 5, p² को विभाजित करता है => 5, p को भी विभाजित करेगा।\nमाना p = 5m रखने पर: 25m² = 5q² => q² = 5m² => 5, q को भी विभाजित करता है।\nइस प्रकार p व q का उभयनिष्ठ गुणनखंड 5 है जो हमारी सह-अभाज्य मान्यता का विरोधाभास है। अतः √5 अपरिमेय है।',
        answerEn: 'Contradiction Method: Assume √5 is rational, so √5 = p/q where p, q are coprime integers (q ≠ 0).\nSquaring both sides: p² = 5q² => 5 divides p² => 5 divides p.\nLet p = 5m => 25m² = 5q² => q² = 5m² => 5 divides q.\nThus 5 is a common factor of p and q, contradicting coprimality. Hence √5 is irrational.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '3 अंक फिक्स्ड प्रूफ',
        tagEn: '3 Marks Fixed Proof'
      }
    ],
    biographies: [
      {
        id: 'c10m-bio-thales',
        authorNameHi: 'यूनानी गणितज्ञ थैल्स व पाइथागोरस',
        authorNameEn: 'Thales of Miletus & Pythagoras',
        period: '624 BC – 495 BC',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'मिलेटस (प्राचीन यूनान)',
        birthPlaceEn: 'Miletus, Ancient Greece',
        notableWorksHi: ['आधारभूत समानुपातिकता प्रमेय (BPT)', 'पाइथागोरस प्रमेय (AC² = AB² + BC²)'],
        notableWorksEn: ['Basic Proportionality Theorem (BPT)', 'Pythagoras Theorem (h² = p² + b²)'],
        summaryHi: 'ज्यामिति में समरूपता और समकोण त्रिभुज की नींव रखने वाले गणितज्ञ, जिन पर कक्षा 10 गणित के 6 अंक वाले प्रमेय आधारित हैं।',
        summaryEn: 'Foundational Greek geometers behind Triangle Similarity (Thales BPT) and Right-Angle Theorem (Pythagoras), worth 6-8 marks in UPMSP exams.',
        examTipsHi: 'थैल्स प्रमेय लिखते समय दिया है, सिद्ध करना है, रचना और उपपत्ति — इन 4 हेडिंग्स से पूरे 6 अंक मिलते हैं।',
        examTipsEn: 'Always structure geometry theorems into 4 headings: Given, To Prove, Construction, Proof.',
        examWordLimit: 'Theorem Format (6 Marks)'
      }
    ],
    solvedPapers: buildThreeYearPapers(
      'c10-maths', '928', 'गणित', 'Mathematics', 70,
      '√5 अपरिमेय, थैल्स प्रमेय, ऊँचाई-दूरी व सांख्यिकी', 'Irrationality of √5, Thales Theorem, Heights & Statistics',
      '20 OMR MCQs, 4M के 5 प्रश्न व 6M के दीर्घ प्रश्न (समीकरण, मीनार ऊँचाई व लुप्त बारंबारता माध्यिका)।',
      '20 OMR MCQs, 4M step-by-step geometry/algebra & 6M long problems (BPT, Elevation, Median).'
    )
  },

  // 4. CLASS 10 SCIENCE (Code 931) - All 13 Chapters (Chem + Bio + Physics)
  {
    id: 'c10-science',
    classLevel: '10',
    code: '931',
    nameHi: 'विज्ञान (Chem + Bio + Physics)',
    nameEn: 'Science (Code 931 - Chem, Bio & Physics)',
    taglineHi: 'सभी 13 अध्याय: रासायनिक समीकरण, मिसेल, हृदय-नेफ्रॉन, प्रकाश व ओम का नियम',
    taglineEn: 'All 13 Chapters: Equations, Micelle, Heart & Nephron, Optics & Ohm’s Law',
    iconName: 'Atom',
    colorTheme: {
      bgLight: 'bg-emerald-50/70',
      bgDark: 'dark:bg-emerald-950/20',
      borderLight: 'border-emerald-200',
      borderDark: 'dark:border-emerald-800/40',
      accent: 'text-emerald-600 dark:text-emerald-400',
      text: 'hover:border-emerald-400',
    },
    chapterDetails: [
      {
        id: 'c10s-1', number: 1, sectionHi: 'रसायन विज्ञान', sectionEn: 'Chemistry',
        titleHi: 'रासायनिक अभिक्रियाएँ एवं समीकरण', titleEn: 'Chemical Reactions and Equations',
        authorOrTopicHi: 'संतुलन, रेडॉक्स (उपचयन-अपचयन), संक्षारण व विकृतगंधिता', authorOrTopicEn: 'Balancing Equations, Redox Reactions, Corrosion & Rancidity',
        keyFocusHi: 'ऊष्माक्षेपी व ऊष्माशोषी अभिक्रिया, विस्थापन तथा द्विविस्थापन समीकरण उदाहरण',
        keyFocusEn: 'Exothermic vs Endothermic, Displacement & Redox with balanced equations',
        boardWeightage: '5 Marks'
      },
      {
        id: 'c10s-2', number: 2, sectionHi: 'रसायन विज्ञान', sectionEn: 'Chemistry',
        titleHi: 'अम्ल, क्षारक एवं लवण', titleEn: 'Acids, Bases and Salts',
        authorOrTopicHi: 'pH स्केल, विरंजक चूर्ण (CaOCl₂), बेकिंग सोडा व प्लास्टर ऑफ पेरिस (POP)', authorOrTopicEn: 'pH Scale, Bleaching Powder, Baking Soda & Plaster of Paris (POP)',
        keyFocusHi: 'CaSO₄·2H₂O को 373K पर गर्म करने से POP (CaSO₄·½H₂O) बनने की समीकरण — 4 अंक पक्का',
        keyFocusEn: 'Preparation & uses of POP (CaSO₄·½H₂O), Bleaching powder & Chlor-alkali process',
        boardWeightage: '6 Marks Fixed'
      },
      {
        id: 'c10s-3', number: 3, sectionHi: 'रसायन विज्ञान', sectionEn: 'Chemistry',
        titleHi: 'धातु एवं अधातु', titleEn: 'Metals and Non-metals',
        authorOrTopicHi: 'सक्रियता श्रेणी, भर्जन, निस्तापन व मिश्रधातु', authorOrTopicEn: 'Reactivity Series, Roasting, Calcination, Thermit Reaction & Alloys',
        keyFocusHi: 'भर्जन (ऑक्सीजन उपस्थिति) बनाम निस्तापन (सीमित वायु) में 3 प्रमुख अंतर',
        keyFocusEn: 'Difference between Roasting (sulfide ores) & Calcination (carbonate ores)',
        boardWeightage: '4 Marks'
      },
      {
        id: 'c10s-4', number: 4, sectionHi: 'रसायन विज्ञान', sectionEn: 'Chemistry',
        titleHi: 'कार्बन एवं उसके यौगिक', titleEn: 'Carbon and its Compounds',
        authorOrTopicHi: 'साबुन की मिसेल क्रियाविधि, एस्टरीकरण, साबुनीकरण व IUPAC नाम', authorOrTopicEn: 'Soap Micelle Mechanism, Esterification, Saponification & IUPAC Naming',
        keyFocusHi: 'जलरागी आयनिक सिरा व जलविरागी हाइड्रोकार्बन पूँछ से मिसेल निर्माण — 6 अंक फिक्स्ड',
        keyFocusEn: 'Micelle cleansing action diagram (hydrophilic head & hydrophobic tail) — 6 Marks',
        boardWeightage: '6 Marks Guaranteed'
      },
      {
        id: 'c10s-5', number: 5, sectionHi: 'जीव विज्ञान', sectionEn: 'Biology',
        titleHi: 'जैव प्रक्रम (Life Processes)', titleEn: 'Life Processes (Nutrition, Heart & Nephron)',
        authorOrTopicHi: 'मानव हृदय दोहरा परिसंचरण, नेफ्रॉन आरेख, प्रकाश संश्लेषण व पाचन', authorOrTopicEn: 'Human Heart Double Circulation, Nephron Structure & Photosynthesis',
        keyFocusHi: 'नेफ्रॉन (वृक्काणु) का नामांकित चित्र व मूत्र निर्माण के 3 चरण — 6 अंक पक्का',
        keyFocusEn: 'Labelled diagram of Nephron & Double Circulation in Human Heart (6 Marks)',
        boardWeightage: '7 Marks Guaranteed'
      },
      {
        id: 'c10s-6', number: 6, sectionHi: 'जीव विज्ञान', sectionEn: 'Biology',
        titleHi: 'नियंत्रण एवं समन्वय', titleEn: 'Control and Coordination',
        authorOrTopicHi: 'न्यूरॉन आरेख, प्रतिवर्ती क्रिया, मानव मस्तिष्क व पादप हार्मोन (ऑक्सिन/जिबरेलिन)', authorOrTopicEn: 'Neuron Diagram, Reflex Arc, Brain Parts & Plant Hormones',
        keyFocusHi: 'सिनेप्स, इंसुलिन (मधुमेह) व आयोडीन-थायरॉक्सिन के कार्य',
        keyFocusEn: 'Function of Cerebellum, Medulla, Adrenaline, Insulin & Auxin phototropism',
        boardWeightage: '5 Marks'
      },
      {
        id: 'c10s-7', number: 7, sectionHi: 'जीव विज्ञान', sectionEn: 'Biology',
        titleHi: 'जीव जनन कैसे करते हैं', titleEn: 'How do Organisms Reproduce',
        authorOrTopicHi: 'द्विखंडन, मुकुलन, पुष्प संरचना (द्विनिषेचन) व परिवार नियोजन', authorOrTopicEn: 'Fission, Budding, Flower Longitudinal Section & Contraceptive Methods',
        keyFocusHi: 'स्व-परागण व पर-परागण में अंतर तथा पुष्प के मादा भाग का नामांकित आरेख',
        keyFocusEn: 'Self vs Cross-Pollination, Regeneration in Planaria & Human Reproductive System',
        boardWeightage: '6 Marks'
      },
      {
        id: 'c10s-8', number: 8, sectionHi: 'जीव विज्ञान', sectionEn: 'Biology',
        titleHi: 'आनुवंशिकता (Heredity)', titleEn: 'Heredity (Mendel’s Laws)',
        authorOrTopicHi: 'मेंडल के तीनों नियम, 9:3:3:1 द्विसंकर अनुपात व लिंग निर्धारण', authorOrTopicEn: 'Mendel’s 3 Laws, 9:3:3:1 Dihybrid Cross & Sex Determination (XX/XY)',
        keyFocusHi: 'मानव में लिंग निर्धारण आरेख व मेंडल का स्वतंत्र अपव्यूहन नियम — 4-6 अंक',
        keyFocusEn: 'Monohybrid (3:1), Dihybrid (9:3:3:1) & Human XY Sex Determination',
        boardWeightage: '6 Marks Fixed'
      },
      {
        id: 'c10s-9', number: 9, sectionHi: 'भौतिक विज्ञान', sectionEn: 'Physics',
        titleHi: 'प्रकाश - परावर्तन तथा अपवर्तन', titleEn: 'Light - Reflection and Refraction',
        authorOrTopicHi: 'दर्पण सूत्र (1/f=1/v+1/u), लेंस सूत्र, किरण आरेख व स्नेल नियम', authorOrTopicEn: 'Mirror Formula (1/f=1/v+1/u), Lens Formula, Ray Diagrams & Snell’s Law',
        keyFocusHi: 'अवतल दर्पण व उत्तल लेंस के 6 किरण आरेख और क्षमता P = 1/f (D) न्यूमेरिकल',
        keyFocusEn: 'Ray diagrams for concave mirror / convex lens & Power P = 1/f(m) numericals',
        boardWeightage: '7 Marks'
      },
      {
        id: 'c10s-10', number: 10, sectionHi: 'भौतिक विज्ञान', sectionEn: 'Physics',
        titleHi: 'मानव नेत्र तथा रंगबिरंगा संसार', titleEn: 'The Human Eye and the Colourful World',
        authorOrTopicHi: 'निकट दृष्टि दोष (अवतल), दूर दृष्टि दोष (उत्तल), प्रिज्म व तारे टिमटिमाना', authorOrTopicEn: 'Myopia (Concave), Hypermetropia (Convex), Prism Dispersion & Twinkling Stars',
        keyFocusHi: 'निकट व दूर दृष्टि दोष के कारण, निवारण लेंस व किरण आरेख — 4 अंक पक्का',
        keyFocusEn: 'Causes & correction ray diagrams of Myopia and Hypermetropia (4 Marks Fixed)',
        boardWeightage: '5 Marks'
      },
      {
        id: 'c10s-11', number: 11, sectionHi: 'भौतिक विज्ञान', sectionEn: 'Physics',
        titleHi: 'विद्युत (Electricity)', titleEn: 'Electricity (Ohm’s Law & Circuits)',
        authorOrTopicHi: 'ओम का नियम (V=IR), श्रेणी (R₁+R₂) व समांतर क्रम, किलोवाट-घंटा (Unit)', authorOrTopicEn: 'Ohm’s Law (V=IR), Series & Parallel Resistance, Heating Effect & 1 kWh',
        keyFocusHi: 'मिश्रित प्रतिरोध परिपथ व विद्युत शक्ति P=VI=I²R के 6 अंक न्यूमेरिकल',
        keyFocusEn: 'Equivalent resistance derivation (Series & Parallel) and 1 kWh = 3.6×10⁶ J numericals',
        boardWeightage: '7 Marks Guaranteed'
      },
      {
        id: 'c10s-12', number: 12, sectionHi: 'भौतिक विज्ञान', sectionEn: 'Physics',
        titleHi: 'विद्युत धारा के चुंबकीय प्रभाव', titleEn: 'Magnetic Effects of Electric Current',
        authorOrTopicHi: 'फ्लेमिंग का वामहस्त नियम, दाएँ हाथ का अंगूठा नियम, परिनालिका व भू-संपर्क तार', authorOrTopicEn: 'Fleming’s Left-Hand Rule, Right-Hand Thumb Rule, Solenoid & Earthing',
        keyFocusHi: 'चुंबकीय क्षेत्र रेखाओं के गुण एवं फ्लेमिंग वामहस्त नियम का स्पष्ट चित्र',
        keyFocusEn: 'Properties of magnetic field lines, domestic AC 220V/50Hz & fuse safety',
        boardWeightage: '5 Marks'
      },
      {
        id: 'c10s-13', number: 13, sectionHi: 'पर्यावरण विज्ञान', sectionEn: 'Environment',
        titleHi: 'हमारा पर्यावरण', titleEn: 'Our Environment',
        authorOrTopicHi: 'पारितंत्र, खाद्य श्रृंखला, लिंडेमान का 10% ऊर्जा नियम व ओजोन परत क्षरण (CFC)', authorOrTopicEn: 'Ecosystem, Food Chain, 10% Energy Law & Ozone Depletion (CFC)',
        keyFocusHi: 'ओजोन परत (O₃) के क्षरण का कारण (CFC) एवं जैव निम्नीकरणीय कचरा',
        keyFocusEn: '10% energy transfer calculation across trophic levels & Ozone O₃ protection',
        boardWeightage: '3-4 Marks'
      }
    ],
    coreMcqs: [
      {
        id: 'c10s-mcq-1',
        questionHi: 'स्पष्ट दृष्टि की न्यूनतम दूरी (स्वस्थ मानव नेत्र के लिए) कितनी होती है?',
        questionEn: 'What is the least distance of distinct vision for a normal human eye?',
        optionsHi: ['25 मीटर', '25 सेमी', '2.5 सेमी', 'अनंत'],
        optionsEn: ['25 m', '25 cm', '2.5 cm', 'Infinity'],
        correctIndex: 1,
        explanationHi: 'सामान्य स्वस्थ नेत्र का निकट बिंदु 25 सेमी तथा दूर बिंदु अनंत (Infinity) होता है।',
        explanationEn: 'The near point of a healthy human eye is 25 cm and far point is infinity.',
        chapter: 'मानव नेत्र तथा रंगबिरंगा संसार',
        chapterEn: 'The Human Eye and the Colourful World',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c10s-mcq-2',
        questionHi: 'शुद्ध जल का pH मान कितना होता है?',
        questionEn: 'What is the pH value of pure water?',
        optionsHi: ['0', '1', '7', '14'],
        optionsEn: ['0', '1', '7', '14'],
        correctIndex: 2,
        explanationHi: 'शुद्ध जल उदासीन होता है, अतः इसका pH मान 7 होता है। अम्ल < 7 और क्षार > 7 होते हैं।',
        explanationEn: 'Pure water is neutral with pH = 7. Acids have pH < 7 and bases have pH > 7.',
        chapter: 'अम्ल, क्षारक एवं लवण',
        chapterEn: 'Acids, Bases and Salts',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10s-mcq-3',
        questionHi: 'विद्युत प्रतिरोध का SI मात्रक क्या होता है?',
        questionEn: 'What is the SI unit of electrical resistance?',
        optionsHi: ['वोल्ट (Volt)', 'एम्पियर (Ampere)', 'ओम (Ohm - Ω)', 'वाट (Watt)'],
        optionsEn: ['Volt', 'Ampere', 'Ohm (Ω)', 'Watt'],
        correctIndex: 2,
        explanationHi: 'ओम के नियम R = V/I के अनुसार प्रतिरोध का SI मात्रक ओम (Ω) है।',
        explanationEn: 'By Ohm’s law R = V/I, the SI unit of resistance is Ohm (Ω).',
        chapter: 'विद्युत',
        chapterEn: 'Electricity',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10s-mcq-4',
        questionHi: 'आनुवंशिकता का जनक (Father of Genetics) किसे कहा जाता है?',
        questionEn: 'Who is known as the Father of Genetics?',
        optionsHi: ['चार्ल्स डार्विन', 'ग्रेगर जॉन मेंडल', 'लैमार्क', 'अरस्तू'],
        optionsEn: ['Charles Darwin', 'Gregor Johann Mendel', 'Lamarck', 'Aristotle'],
        correctIndex: 1,
        explanationHi: 'ग्रेगर जॉन मेंडल ने मटर (Pisum sativum) के पौधे पर प्रयोग करके आनुवंशिकता के नियम दिए।',
        explanationEn: 'Gregor Johann Mendel formulated laws of inheritance through pea plant (Pisum sativum) experiments.',
        chapter: 'आनुवंशिकता',
        chapterEn: 'Heredity',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c10s-imp-1',
        marks: 6,
        chapter: 'कार्बन एवं उसके यौगिक',
        chapterEn: 'Carbon and its Compounds',
        questionHi: 'साबुन की सफाई प्रक्रिया (मिसेल क्रियाविधि) का सचित्र वर्णन कीजिए।',
        questionEn: 'Explain the cleansing action of soap (Micelle formation mechanism) with a neat diagram.',
        answerHi: 'साबुन का अणु दो भागों से बना होता है:\n1. जलविरागी पूँछ (Hydrophobic Tail - हाइड्रोकार्बन भाग): यह तेल या मैल में घुलती है।\n2. जलरागी सिरा (Hydrophilic Head - आयनिक Na⁺ भाग): यह जल की ओर आकर्षित रहता है।\nजल में घोलने पर साबुन के अणु मैल की बूंद को चारों ओर से घेरकर एक गोलाकार गुच्छा बनाते हैं जिसे "मिसेल" कहते हैं। पानी से धोने पर यह मिसेल मैल को साथ बहा ले जाता है।',
        answerEn: 'A soap molecule has two ends:\n1. Hydrophobic hydrocarbon tail (soluble in oil/grease).\n2. Hydrophilic ionic head (COO⁻Na⁺, soluble in water).\nIn water, soap molecules arrange around dirt droplets with tails inside the grease and heads facing water, forming a spherical cluster called a "Micelle". Rinsing washes away the suspended micelles cleanly.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '6 Marks Chemistry Fixed',
        tagEn: '6 Marks Chemistry Fixed'
      },
      {
        id: 'c10s-imp-2',
        marks: 6,
        chapter: 'जैव प्रक्रम',
        chapterEn: 'Life Processes',
        questionHi: 'मानव हृदय में दोहरे रक्त परिसंचरण तथा नेफ्रॉन (वृक्काणु) की संरचना व मूत्र निर्माण विधि को समझाइए।',
        questionEn: 'Explain Double Circulation in the human heart and the structure and urine-formation steps of a Nephron.',
        answerHi: 'दोहरा परिसंचरण: एक चक्र में रक्त हृदय से दो बार गुजरता है—(1) पल्मोनरी परिसंचरण (दायाँ निलय → फेफड़े → बायाँ अलिंद) व (2) दैहिक परिसंचरण (बायाँ निलय → महाधमनी → शरीर)। इससे शुद्ध व अशुद्ध रक्त अलग रहते हैं।\nनेफ्रॉन के 3 चरण: 1. गुच्छीय निस्यंदन (बोमन संपुट), 2. वर्णात्मक पुनःअवशोषण (ग्लूकोज व जल), 3. नलिका स्रवण।',
        answerEn: 'Double Circulation: Blood passes twice through the heart in one complete cycle (Pulmonary circulation + Systemic circulation), preventing mixing of oxygenated and deoxygenated blood.\nNephron Steps: 1. Glomerular Ultrafiltration in Bowman’s capsule, 2. Selective Reabsorption (glucose, amino acids, water), 3. Tubular Secretion.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026'],
        tagHi: '6 Marks Biology Fixed',
        tagEn: '6 Marks Biology Fixed'
      }
    ],
    biographies: [
      {
        id: 'c10s-bio-mendel',
        authorNameHi: 'ग्रेगर जॉन मेंडल एवं जॉर्ज साइमन ओम',
        authorNameEn: 'Gregor Mendel & Georg Simon Ohm',
        period: '1789 – 1884',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'ऑस्ट्रिया / जर्मनी',
        birthPlaceEn: 'Austria / Germany',
        notableWorksHi: ['आनुवंशिकता के 3 नियम (9:3:3:1)', 'ओम का नियम (V = IR)'],
        notableWorksEn: ['Laws of Inheritance (9:3:3:1)', 'Ohm’s Law (V = IR)'],
        summaryHi: 'जीव विज्ञान में मेंडल का द्विसंकर अनुपात (9:3:3:1) व भौतिकी में ओम का नियम (V = IR) यूपी बोर्ड के सर्वाधिक अंकदायी नियम हैं।',
        summaryEn: 'Mendel’s laws of heredity and Georg Ohm’s V = IR proportionality form the highest-scoring concepts in Class 10 Science.',
        examTipsHi: 'बायो में मेंडल का चेकरबोर्ड व फिजिक्स में V-I ग्राफ (सीधी रेखा) अवश्य बनाएं।',
        examTipsEn: 'Always draw Punnett square in Mendel answers and linear V-I graph in Ohm’s Law.',
        examWordLimit: 'Diagram + Law (6 Marks)'
      }
    ],
    solvedPapers: buildThreeYearPapers(
      'c10-science', '931', 'विज्ञान', 'Science', 70,
      'POP समीकरण, मिसेल, नेफ्रॉन, ओम नियम व दृष्टि दोष', 'POP, Micelle, Nephron, Ohm’s Law & Eye Defects',
      '20 OMR MCQs (Phys 7 + Chem 6 + Bio 7), 4M के समीकरण व किरण आरेख तथा 6M के मिसेल/नेफ्रॉन/विद्युत न्यूमेरिकल।',
      '20 OMR MCQs (Phys/Chem/Bio), 4M ray diagrams/equations & 6M Micelle, Nephron & Circuit numericals.'
    )
  },

  // 5. CLASS 10 SOCIAL SCIENCE (Code 936) - 4 Sections + 10 Marks Map Work
  {
    id: 'c10-sst',
    classLevel: '10',
    code: '936',
    nameHi: 'सामाजिक विज्ञान (SST + 10M मैप)',
    nameEn: 'Social Science (Code 936 + 10M Map)',
    taglineHi: 'इतिहास, भूगोल, नागरिक शास्त्र, अर्थशास्त्र + 10 अंक का पक्का मानचित्र कार्य',
    taglineEn: 'History, Geography, Civics, Economics + 10 Marks Fixed Map Work',
    iconName: 'Globe',
    colorTheme: {
      bgLight: 'bg-amber-50/70',
      bgDark: 'dark:bg-amber-950/20',
      borderLight: 'border-amber-200',
      borderDark: 'dark:border-amber-800/40',
      accent: 'text-amber-600 dark:text-amber-400',
      text: 'hover:border-amber-400',
    },
    chapterDetails: [
      {
        id: 'c10sst-h1', number: 1, sectionHi: 'इतिहास (History)', sectionEn: 'History',
        titleHi: 'यूरोप में राष्ट्रवाद का उदय', titleEn: 'The Rise of Nationalism in Europe',
        authorOrTopicHi: 'फ्रांसीसी क्रांति 1789, नेपोलियन संहिता 1804, बिस्मार्क, इटली-जर्मनी एकीकरण', authorOrTopicEn: 'French Revolution 1789, Napoleonic Code 1804, Unification of Germany & Italy',
        keyFocusHi: 'जर्मनी का एकीकरण (ओटो वॉन बिस्मार्क) व वियना संधि 1815 — 6 अंक का पक्का प्रश्न',
        keyFocusEn: 'Process of German Unification (Bismarck) & Impact of French Revolution (6 Marks)',
        boardWeightage: '6 Marks Fixed'
      },
      {
        id: 'c10sst-h2', number: 2, sectionHi: 'इतिहास (History)', sectionEn: 'History',
        titleHi: 'भारत में राष्ट्रवाद', titleEn: 'Nationalism in India',
        authorOrTopicHi: 'असहयोग आंदोलन, चौरी-चौरा (1922), सविनय अवज्ञा (दांडी 1930), जलियाँवाला बाग', authorOrTopicEn: 'Non-Cooperation (1920), Chauri-Chaura (1922), Civil Disobedience (Dandi 1930)',
        keyFocusHi: 'गांधीजी के तीन सत्याग्रह (चंपारण, खेड़ा, अहमदाबाद) + पूना पैक्ट 1932',
        keyFocusEn: 'Gandhiji’s Satyagraha movements, Simon Commission & Salt March (6 Marks + 5M Map)',
        boardWeightage: '11 Marks (6M + 5M Map)'
      },
      {
        id: 'c10sst-h3', number: 3, sectionHi: 'इतिहास (History)', sectionEn: 'History',
        titleHi: 'भूमंडलीकृत विश्व का बनना व औद्योगीकरण/मुद्रण', titleEn: 'Making of a Global World, Industrialisation & Print Culture',
        authorOrTopicHi: '1929 की आर्थिक महामंदी के कारण, रेशम मार्ग, ब्रिटेन वुड्स व गुटेनबर्ग प्रिंट', authorOrTopicEn: '1929 Great Depression Causes, Silk Routes, Bretton Woods & Print Revolution',
        keyFocusHi: '1929 की महामंदी के 3 कारण व भारत पर प्रभाव — 4-6 अंक पक्का',
        keyFocusEn: '3 Causes of 1929 Great Depression & Gutenberg Printing Press impact',
        boardWeightage: '6 Marks High-Yield'
      },
      {
        id: 'c10sst-g1', number: 4, sectionHi: 'भूगोल (Geography)', sectionEn: 'Geography',
        titleHi: 'संसाधन, वन-वन्यजीव एवं जल संसाधन', titleEn: 'Resources, Forest & Water Resources',
        authorOrTopicHi: 'जलोढ़ व काली मिट्टी, चिपको आंदोलन, बहुउद्देशीय नदी परियोजनाएँ (बांध)', authorOrTopicEn: 'Alluvial & Black Soil, Chipko Movement & Multipurpose Dam Projects',
        keyFocusHi: 'काली मृदा (रेगुर, कपास) तथा हीराकुंड, भाखड़ा नांगल, टिहरी बांध मानचित्र प्वाइंट',
        keyFocusEn: 'Soil conservation, rainwater harvesting & Dams (Hirakud, Bhakra Nangal, Tehri)',
        boardWeightage: '6 Marks'
      },
      {
        id: 'c10sst-g2', number: 5, sectionHi: 'भूगोल (Geography)', sectionEn: 'Geography',
        titleHi: 'कृषि, खनिज ऊर्जा एवं राष्ट्रीय अर्थव्यवस्था', titleEn: 'Agriculture, Minerals-Energy & Lifelines of Economy',
        authorOrTopicHi: 'रबी-खरीफ-जायद फसलें, कोयला-पेट्रोलियम व स्वर्णिम चतुर्भुज/पत्तन', authorOrTopicEn: 'Rabi-Kharif-Zaid Crops, Coal/Iron Belts, Ports & Roadways',
        keyFocusHi: 'भारतीय कृषि की समस्याएँ तथा गैर-परंपरागत ऊर्जा स्रोत (सौर/पवन)',
        keyFocusEn: 'Features of Rabi vs Kharif crops & Non-conventional energy importance',
        boardWeightage: '6 Marks'
      },
      {
        id: 'c10sst-c1', number: 6, sectionHi: 'नागरिक शास्त्र (Civics)', sectionEn: 'Civics (Political Science)',
        titleHi: 'सत्ता की साझेदारी एवं संघवाद', titleEn: 'Power Sharing and Federalism',
        authorOrTopicHi: 'बेल्जियम-श्रीलंका मॉडल, संघीय व्यवस्था की 5 विशेषताएँ व 3 सूचियाँ', authorOrTopicEn: 'Belgium vs Sri Lanka Model, Key Features of Federalism & Union/State/Concurrent Lists',
        keyFocusHi: 'भारतीय संविधान में संघवाद की विशेषताएँ व केंद्र-राज्य शक्ति विभाजन (6 अंक)',
        keyFocusEn: 'Why power sharing is desirable & Three Lists of Indian Federalism (6 Marks)',
        boardWeightage: '6 Marks Fixed'
      },
      {
        id: 'c10sst-c2', number: 7, sectionHi: 'नागरिक शास्त्र (Civics)', sectionEn: 'Civics',
        titleHi: 'जाति-धर्म-लैंगिक मसले, राजनीतिक दल व लोकतंत्र के परिणाम', titleEn: 'Gender-Religion-Caste, Political Parties & Outcomes of Democracy',
        authorOrTopicHi: 'राजनीतिक दलों के कार्य, चुनौतियाँ व लोकतंत्र की उत्तरदायी सरकार', authorOrTopicEn: 'Functions & Reforms of Political Parties, Accountable Democratic Govt',
        keyFocusHi: 'राजनीतिक दलों की 4 प्रमुख चुनौतियाँ व सुधार के उपाय — 4-6 अंक',
        keyFocusEn: 'Challenges faced by political parties & why democracy is better than dictatorship',
        boardWeightage: '5 Marks'
      },
      {
        id: 'c10sst-e1', number: 8, sectionHi: 'अर्थशास्त्र (Economics)', sectionEn: 'Economics',
        titleHi: 'विकास, अर्थव्यवस्था के क्षेत्रक, मुद्रा-साख व वैश्वीकरण', titleEn: 'Development, Sectors of Economy, Money-Credit & Globalisation',
        authorOrTopicHi: 'मानव विकास सूचकांक (HDI), प्राथमिक-द्वितीयक-तृतीयक क्षेत्र, RBI व MNCs, COPRA 1986', authorOrTopicEn: 'HDI, Primary/Secondary/Tertiary Sectors, Formal Credit (RBI), MNCs & COPRA',
        keyFocusHi: 'संगठित बनाम असंगठित क्षेत्रक, औपचारिक ऋण (RBI) तथा उपभोक्ता अधिकार (जागो ग्राहक)',
        keyFocusEn: 'Organised vs Unorganised sectors, Role of RBI in credit & Consumer Rights',
        boardWeightage: '8 Marks'
      },
      {
        id: 'c10sst-map', number: 9, sectionHi: 'अनिवार्य मानचित्र कार्य', sectionEn: 'Mandatory 10M Map Work',
        titleHi: '10 अंक का फिक्स्ड मानचित्र (इतिहास 5M + भूगोल 5M)', titleEn: '10 Marks Guaranteed India Map Work (History 5M + Geography 5M)',
        authorOrTopicHi: 'चंपारण, चौरी-चौरा, दांडी, कांग्रेस अधिवेशन + बांध, पत्तन, परमाणु केंद्र', authorOrTopicEn: 'Champaran, Dandi, INC Sessions (5M) + Dams, Ports, Nuclear Plants (5M)',
        keyFocusHi: 'इतिहास: नागपुर 1920, लाहौर 1929, अमृतसर | भूगोल: हीराकुंड, भाखड़ा नांगल, कांडला, नरोरा',
        keyFocusEn: 'History: Amritsar, Chauri-Chaura, Madras 1927 | Geography: Hirakud, Tehri, Narora, Kandla',
        boardWeightage: '10 Marks 100% Fixed'
      }
    ],
    coreMcqs: [
      {
        id: 'c10sst-mcq-1',
        questionHi: 'जलियाँवाला बाग हत्याकांड किस तिथि को और कहाँ हुआ था?',
        questionEn: 'When and where did the Jallianwala Bagh massacre take place?',
        optionsHi: ['13 अप्रैल 1919, अमृतसर', '5 फरवरी 1922, गोरखपुर', '12 मार्च 1930, दांडी', '23 मार्च 1931, लाहौर'],
        optionsEn: ['13 April 1919, Amritsar', '5 Feb 1922, Gorakhpur', '12 March 1930, Dandi', '23 March 1931, Lahore'],
        correctIndex: 0,
        explanationHi: '13 अप्रैल 1919 को बैसाखी के दिन अमृतसर के जलियाँवाला बाग में जनरल डायर ने निहत्थी भीड़ पर गोली चलवाई थी।',
        explanationEn: 'On 13 April 1919 (Baisakhi), General Dyer fired upon unarmed peaceful crowd at Jallianwala Bagh, Amritsar.',
        chapter: 'भारत में राष्ट्रवाद',
        chapterEn: 'Nationalism in India',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c10sst-mcq-2',
        questionHi: 'निम्नलिखित में से किस राज्य में "काली मृदा" (रेगुर मिट्टी) मुख्य रूप से पाई जाती है?',
        questionEn: 'In which state is Black Soil (Regur soil, best for cotton) predominantly found?',
        optionsHi: ['जम्मू-कश्मीर', 'महाराष्ट्र', 'राजस्थान', 'झारखंड'],
        optionsEn: ['Jammu & Kashmir', 'Maharashtra', 'Rajasthan', 'Jharkhand'],
        correctIndex: 1,
        explanationHi: 'काली मिट्टी (जिसे रेगुर या कपास की मिट्टी भी कहते हैं) महाराष्ट्र, गुजरात व मालवा पठार में पाई जाती है।',
        explanationEn: 'Black soil (Regur soil), ideal for cotton cultivation, is predominantly found in Maharashtra and Gujarat.',
        chapter: 'संसाधन, वन एवं जल संसाधन',
        chapterEn: 'Resources, Forest & Water Resources',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10sst-mcq-3',
        questionHi: 'असत्य कथन पहचानें: भारत में "तीसरे स्तर" की सरकार किसे कहा जाता है?',
        questionEn: 'Which tier of government was strengthened by the 73rd/74th Amendment in India?',
        optionsHi: ['केंद्र सरकार', 'राज्य सरकार', 'पंचायती राज (स्थानीय स्वशासन)', 'राष्ट्रपति शासन'],
        optionsEn: ['Central Government', 'State Government', 'Panchayati Raj (Local Govt)', 'Governor Rule'],
        correctIndex: 2,
        explanationHi: '1992 के 73वें व 74वें संवैधानिक संशोधन द्वारा स्थानीय स्वशासन (पंचायत व नगरपालिका) को तीसरा स्तर बनाया गया।',
        explanationEn: 'The 1992 Constitutional Amendments empowered Local Self-Government (Panchayati Raj & Municipalities) as the 3rd tier.',
        chapter: 'सत्ता की साझेदारी एवं संघवाद',
        chapterEn: 'Power Sharing and Federalism',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c10sst-imp-1',
        marks: 6,
        chapter: 'भारत में राष्ट्रवाद',
        chapterEn: 'Nationalism in India',
        questionHi: 'गांधीजी द्वारा चलाए गए "असहयोग आंदोलन" के प्रमुख कारण, कार्यक्रम तथा वापस लेने (चौरी-चौरा कांड) का कारण स्पष्ट कीजिए।',
        questionEn: 'Explain the causes, key programmes, and reason for withdrawal (Chauri-Chaura) of the Non-Cooperation Movement.',
        answerHi: 'कारण: 1. रौलट एक्ट (1919), 2. जलियाँवाला बाग हत्याकांड, 3. खिलाफत आंदोलन का समर्थन।\nकार्यक्रम: सरकारी पदवियों, स्कूलों, अदालतों व विदेशी कपड़ों का बहिष्कार और खादी व स्वदेशी का प्रचार।\nवापसी: 5 फरवरी 1922 को गोरखपुर के चौरी-चौरा में हिंसक भीड़ द्वारा पुलिस थाने में आग लगाने से 22 पुलिसकर्मी मारे गए, जिससे व्यथित होकर गांधीजी ने 12 फरवरी 1922 को आंदोलन वापस ले लिया।',
        answerEn: 'Causes: 1. Rowlatt Act (1919), 2. Jallianwala Bagh Massacre, 3. Khilafat solidarity.\nProgrammes: Boycott of foreign cloth, government schools, courts, titles and promotion of Khadi.\nWithdrawal: Following the Chauri-Chaura incident (5 Feb 1922, Gorakhpur UP) where 22 policemen died, Gandhiji halted the movement to preserve non-violence.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '6 Marks History Fixed',
        tagEn: '6 Marks History Fixed'
      },
      {
        id: 'c10sst-imp-2',
        marks: 5,
        chapter: '10 अंक का फिक्स्ड मानचित्र',
        chapterEn: 'Mandatory 10M Map Work',
        questionHi: 'मानचित्र अभ्यास (10 अंक पक्के): इतिहास (5 स्थान) एवं भूगोल (5 स्थान) भारत के मानचित्र में चिह्नित करने हेतु सटीक राज्य बताइए।',
        questionEn: 'Map Work Mastery (10 Marks): State the exact states for the 5 top History and 5 top Geography map locations.',
        answerHi: 'इतिहास (5M):\n1. जलियाँवाला बाग - अमृतसर (पंजाब)\n2. चौरी-चौरा - गोरखपुर (उत्तर प्रदेश)\n3. चंपारण सत्याग्रह - बिहार\n4. दांडी मार्च - गुजरात\n5. कांग्रेस 1927 अधिवेशन - मद्रास (तमिलनाडु)\n\nभूगोल (5M):\n1. हीराकुंड बांध - महानदी (ओडिशा)\n2. भाखड़ा नांगल बांध - सतलुज (पंजाब/हिमाचल)\n3. कांडला पत्तन - गुजरात\n4. नरोरा परमाणु केंद्र - उत्तर प्रदेश\n5. कोडरमा अभ्रक - झारखंड',
        answerEn: 'History (5M):\n1. Jallianwala Bagh -> Amritsar (Punjab)\n2. Chauri-Chaura -> Gorakhpur (UP)\n3. Champaran -> Bihar\n4. Dandi -> Gujarat\n5. 1927 INC Session -> Madras (Tamil Nadu)\n\nGeography (5M):\n1. Hirakud Dam -> Odisha (Mahanadi)\n2. Bhakra Nangal Dam -> Punjab/HP (Sutlej)\n3. Kandla Port -> Gujarat\n4. Narora Nuclear Plant -> Uttar Pradesh\n5. Rana Pratap Sagar -> Rajasthan',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026'],
        tagHi: '10/10 Marks Map Guarantee',
        tagEn: '10/10 Marks Map Guarantee'
      }
    ],
    biographies: [
      {
        id: 'c10sst-bio-bismarck',
        authorNameHi: 'ओटो वॉन बिस्मार्क एवं महात्मा गांधी',
        authorNameEn: 'Otto von Bismarck & Mahatma Gandhi',
        period: '1815 – 1948',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'जर्मनी / पोरबंदर (गुजरात)',
        birthPlaceEn: 'Prussia (Germany) / Porbandar (India)',
        notableWorksHi: ['जर्मनी का एकीकरण (रक्त व लौह नीति)', 'सत्याग्रह व अहिंसा (हिंद स्वराज)'],
        notableWorksEn: ['German Unification (Blood & Iron)', 'Satyagraha & Hind Swaraj (1909)'],
        summaryHi: 'यूरोप व भारत के राष्ट्रवाद में बिस्मार्क की कूटनीति और महात्मा गांधी के सत्याग्रह (चंपारण, खेड़ा, असहयोग, दांडी) सर्वाधिक पूछे जाते हैं।',
        summaryEn: 'Bismarck unified Germany in 1871 while Mahatma Gandhi led India’s non-violent Satyagraha freedom struggle.',
        examTipsHi: 'इतिहास के मानचित्र में गांधीजी के आंदोलनों की तिथि व राज्य सही भरने पर 5/5 अंक मिलते हैं।',
        examTipsEn: 'Remember exact years (1917 Champaran, 1920 NCM, 1930 Dandi) for 10/10 Map + MCQ accuracy.',
        examWordLimit: 'History Key Facts'
      }
    ],
    solvedPapers: buildThreeYearPapers(
      'c10-sst', '936', 'सामाजिक विज्ञान', 'Social Science', 70,
      'राष्ट्रवाद, महामंदी, संघवाद व 10M मानचित्र', 'Nationalism, Great Depression, Federalism & 10M Map',
      '20 OMR MCQs, 4M के 4 प्रश्न, 6M के 4 दीर्घ प्रश्न तथा प्रश्न-9A व 9B में 10 अंक का भारत का मानचित्र।',
      '20 OMR MCQs, 4M & 6M descriptive questions from all 4 books + 10 Marks Map Work.'
    )
  },

  // 6. CLASS 10 ART & DRAWING (Code 940)
  {
    id: 'c10-art',
    classLevel: '10',
    code: '940',
    nameHi: 'चित्रकला (Art & Drawing)',
    nameEn: 'Art & Drawing (Code 940)',
    taglineHi: 'आलेखन कला (35M), स्मृति चित्रण (35M) व 20 OMR रंग-सिद्धांत प्रश्न',
    taglineEn: 'Design Art (35M), Memory Drawing (35M) & 20 OMR Color Theory MCQs',
    iconName: 'Palette',
    colorTheme: {
      bgLight: 'bg-fuchsia-50/70',
      bgDark: 'dark:bg-fuchsia-950/20',
      borderLight: 'border-fuchsia-200',
      borderDark: 'dark:border-fuchsia-800/40',
      accent: 'text-fuchsia-600 dark:text-fuchsia-400',
      text: 'hover:border-fuchsia-400',
    },
    chapterDetails: [
      {
        id: 'c10a-1', number: 1, sectionHi: 'खंड-क (20 OMR)', sectionEn: 'Section A (20 OMR MCQs)',
        titleHi: 'रंग सिद्धांत, पेंसिल ग्रेड व प्राविधिक कला', titleEn: 'Color Theory, Pencil Grades & Technical Drawing MCQs',
        authorOrTopicHi: 'प्राथमिक/द्वितीयक रंग, ओस्टवाल्ड चक्र, 2B/HB/2H पेंसिल व ज्यामितीय कोण', authorOrTopicEn: 'Primary/Secondary Colors, Ostwald Wheel (8), Pencil Grades (H vs B)',
        keyFocusHi: 'तटस्थ रंग (सफेद व काला), गर्म रंग (लाल/पीला/नारंगी) व ठंडे रंग (नीला/हरा) — 20 OMR पक्के',
        keyFocusEn: 'Neutral colors (Black, White), Warm vs Cool colors & softest pencil (6B/8B) vs hardest (2H)',
        boardWeightage: '20 Marks OMR'
      },
      {
        id: 'c10a-2', number: 2, sectionHi: 'खंड-ख (35 अंक)', sectionEn: 'Section B (35 Marks)',
        titleHi: 'आलेखन कला (Design Drawing)', titleEn: 'Naturalistic & Ornamental Design (Aalekhan)',
        authorOrTopicHi: '16 सेमी वृत्त/आयत में भारतीय पुष्प (कमल, गुलाब, कनेर) + हंस/मछली', authorOrTopicEn: '16cm Circle/Rectangle Lotus, Rose, Kaner Motif with Swan/Fish & 3-Color Harmony',
        keyFocusHi: 'नियम: ठीक 3 आकर्षक जल रंगों का प्रयोग, स्वच्छ लयात्मक रेखाएँ और पृष्ठभूमि भराव',
        keyFocusEn: 'Rule: Strictly 3 harmonious watercolors, crisp outline & balanced rhythmic floral curves',
        boardWeightage: '35 Marks Fixed'
      },
      {
        id: 'c10a-3', number: 3, sectionHi: 'खंड-ग (35 अंक)', sectionEn: 'Section C (35 Marks)',
        titleHi: 'स्मृति चित्रण (Memory Drawing)', titleEn: 'Memory Drawing & Pencil Shading (2B/4B/6B)',
        authorOrTopicHi: 'पत्तियों सहित आम, अनार, खुली किताब, सुराही, गिलास व छाता (माप ≥ 15 सेमी)', authorOrTopicEn: 'Mango/Pomegranate with Leaves, Open Book, Surahi-Glass & Umbrella (≥ 15 cm)',
        keyFocusHi: 'अनिवार्य नियम: चित्र की लंबाई 15 सेमी से कम न हो, केवल 2B/4B/6B पेंसिल शेडिंग करें (रंग नहीं)',
        keyFocusEn: 'Mandatory Rule: Size must be at least 15 cm; use 2B/4B/6B pencil shading ONLY (no color)',
        boardWeightage: '35 Marks Fixed'
      }
    ],
    coreMcqs: [
      {
        id: 'c10a-mcq-1',
        questionHi: 'मुख्य (प्राथमिक) रंग कितने होते हैं?',
        questionEn: 'How many Primary Colors are there in standard pigment art theory?',
        optionsHi: ['2', '3 (लाल, पीला, नीला)', '6', '8'],
        optionsEn: ['2', '3 (Red, Yellow, Blue)', '6', '8'],
        correctIndex: 1,
        explanationHi: 'प्राथमिक रंग 3 होते हैं—लाल, नीला व पीला। (ओस्टवाल्ड चक्र में 8 रंग होते हैं)।',
        explanationEn: 'There are 3 primary pigment colors: Red, Yellow, and Blue. (Ostwald wheel has 8 colors).',
        chapter: 'रंग सिद्धांत एवं पेंसिल ग्रेड',
        chapterEn: 'Color Theory & Pencil Grades',
        boardYears: ['2024', '2025', '2026 Model']
      },
      {
        id: 'c10a-mcq-2',
        questionHi: 'निम्नलिखित में से कौन-सी पेंसिल से खींची गई रेखा सबसे अधिक गहरी (काली) होती है?',
        questionEn: 'Which pencil grade draws the darkest and softest shading line?',
        optionsHi: ['2H', 'HB', '2B', '6B'],
        optionsEn: ['2H', 'HB', '2B', '6B'],
        correctIndex: 3,
        explanationHi: 'पेंसिल में "B" (Blackness/Softness) जितना अधिक होगा, रेखा उतनी गहरी व मोटी होगी—6B सर्वाधिक गहरी है।',
        explanationEn: 'Higher "B" number indicates softer lead and darker strokes; hence 6B is darkest among these.',
        chapter: 'स्मृति चित्रण',
        chapterEn: 'Memory Drawing',
        boardYears: ['2024', '2025']
      },
      {
        id: 'c10a-mcq-3',
        questionHi: 'तटस्थ (Neutral) रंग कौन-से होते हैं?',
        questionEn: 'Which pair represents Neutral colors in art?',
        optionsHi: ['लाल और हरा', 'सफेद और काला', 'पीला और नीला', 'नारंगी और बैंगनी'],
        optionsEn: ['Red and Green', 'White and Black', 'Yellow and Blue', 'Orange and Violet'],
        correctIndex: 1,
        explanationHi: 'सफेद (White) और काला (Black) तटस्थ रंग कहलाते हैं।',
        explanationEn: 'White and Black (along with Grey) are called Neutral colors.',
        chapter: 'रंग सिद्धांत एवं पेंसिल ग्रेड',
        chapterEn: 'Color Theory & Pencil Grades',
        boardYears: ['2024', '2025']
      }
    ],
    coreImportantQuestions: [
      {
        id: 'c10a-imp-1',
        marks: 6,
        chapter: 'आलेखन कला व स्मृति चित्रण',
        chapterEn: 'Design & Memory Drawing (70/70 Rules)',
        questionHi: 'चित्रकला (Code 940) में 70 में से 68-70 अंक पक्के करने के 5 अनिवार्य बोर्ड नियम बताइए।',
        questionEn: 'List the 5 mandatory UP Board rules to score 68-70/70 in Drawing (Art Code 940).',
        answerHi: '1. आलेखन का व्यास/माप ठीक स्केल से नापकर (जैसे 16 सेमी वृत्त या 18×12 आयत) बनाएं।\n2. आलेखन में केवल 3 जल रंग (जैसे हल्का गुलाबी, पत्ती हरा व क्रीम पृष्ठभूमि) ही भरें।\n3. स्मृति चित्रण (आम/खुली किताब/सुराही) की ऊँचाई कम से कम 15 सेमी अवश्य रखें।\n4. स्मृति चित्रण में रंग नहीं, केवल 2B, 4B व 6B पेंसिल से प्रकाश-छाया (Shading) करें।\n5. शीट के कोने पर अपना अनुक्रमांक स्पष्ट लिखें और सफाई रखें।',
        answerEn: '1. Measure exact geometry (e.g., 16 cm circle or 18×12 rectangle) cleanly with compass and ruler.\n2. Use strictly 3 harmonious watercolors in Aalekhan (no oil pastel or sketch pens).\n3. Keep Memory Drawing objects (Mango, Open Book, Surahi) at least 15 cm tall.\n4. Shade Memory Drawing only with 2B/4B/6B pencils — never color it.\n5. Keep paper smudge-free and write your Roll Number neatly on the sheet.',
        probability: 'Repeated',
        boardYears: ['2024', '2025', '2026 Model'],
        tagHi: '70/70 Marks Guarantee Rules',
        tagEn: '70/70 Marks Guarantee Rules'
      }
    ],
    biographies: [
      {
        id: 'c10a-bio-raja',
        authorNameHi: 'राजा रवि वर्मा एवं विल्हेम ओस्टवाल्ड',
        authorNameEn: 'Raja Ravi Varma & Wilhelm Ostwald',
        period: '1848 – 1932',
        category: 'Gadhya (Prose)',
        birthPlaceHi: 'किलिमनूर (केरल) / रीगा',
        birthPlaceEn: 'Kerala (India) / Riga',
        notableWorksHi: ['ओस्टवाल्ड 8-रंग चक्र', 'शकुंतला, हंस दमयंती चित्र'],
        notableWorksEn: ['Ostwald 8-Color Wheel', 'Shakuntala & Hamsa Damayanti'],
        summaryHi: 'ओस्टवाल्ड रंग चक्र (8 रंग, विरोधी रंग नियम) व भारतीय चित्रकला के जनक राजा रवि वर्मा से प्रतिवर्ष OMR में प्रश्न पूछे जाते हैं।',
        summaryEn: 'Wilhelm Ostwald created the 8-color wheel tested in UPMSP OMR MCQs; Raja Ravi Varma pioneered modern Indian painting.',
        examTipsHi: 'ओस्टवाल्ड चक्र में ठीक आमने-सामने वाले रंग विरोधी (Complementary) होते हैं — जैसे लाल का विरोधी हरा।',
        examTipsEn: 'Opposite colors on the Ostwald wheel are Complementary (e.g., Red opposite Green).',
        examWordLimit: 'Art Theory Facts'
      }
    ],
    solvedPapers: buildThreeYearPapers(
      'c10-art', '940', 'चित्रकला', 'Art & Drawing', 70,
      'रंग सिद्धांत, 16 सेमी कमल आलेखन व 15 सेमी स्मृति चित्रण', 'Color Theory, 16cm Lotus Design & 15cm Memory Drawing',
      '20 OMR (रंग चक्र व प्राविधिक), 35M आलेखन (3 रंग) तथा 35M स्मृति चित्रण (2B/4B पेंसिल शेडिंग)।',
      '20 OMR MCQs (Ostwald/Pencils), 35M Aalekhan Design (3 Watercolors) & 35M Memory Drawing.'
    )
  }
];
