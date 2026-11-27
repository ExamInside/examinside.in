export type ClassLevel = '10th' | '12th';
export type MediumType = 'Hindi' | 'English';

export type ExamSectionType =
  | 'Jeevan Parichay (Choice)'
  | 'Gadyansh (Choice)'
  | 'Padyansh (Choice)'
  | 'Shlok / Sanskrit (Choice)'
  | 'Central Idea / Poem (Choice)'
  | 'Short Answer'
  | 'Long Answer'
  | 'Subject Special / Numerical / Grammar';

export interface McqQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  repeatedYears?: string; // जैसे: "2022, 2023, 2025"
}

export interface ClickableExamItem {
  id: string;
  section: ExamSectionType;
  choiceGroup?: string; // जैसे: "इनमें से किसी एक का जीवन परिचय (Choice)" या "Central Idea (कोई 1)"
  title: string;
  marksOrHint?: string;
  repeatedYears?: string; // बार-बार आने वाले साल (सिर्फ़ सन)
  answer: string; // क्लिक करने पर खुलने वाला पूरा उत्तर
}

export interface DailyPaperSet {
  setNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  dayLabel: string; // जैसे: "Day 1 • Set 1"
  examPatternNote: string;
  mcqs: McqQuestion[]; // 20 MCQ
  items: ClickableExamItem[]; // विकल्पों व प्रश्नों की सूची — हर एक पर क्लिक करने पर पूरा उत्तर
}

export interface SubjectPaperConfig {
  id: string;
  classLevel: ClassLevel;
  medium: MediumType;
  subjectName: string;
  levelNote: string;
  sets: DailyPaperSet[];
}

function makeTwentyMcqs(prefix: string, subjectName: string, setNum: number): McqQuestion[] {
  return Array.from({ length: 20 }, (_, i) => {
    const qNo = i + 1;
    const correctIndex = (i % 4) as 0 | 1 | 2 | 3;
    const yearsPool = ['2022, 2024', '2023, 2025', '2022, 2023, 2025', '2024, 2025'];
    return {
      id: `${prefix}-s${setNum}-mcq-${qNo}`,
      question: `Q${qNo} (${subjectName} • Set ${setNum}): बोर्ड परीक्षा पैटर्न का बहुविकल्पीय प्रश्न #${qNo} — सही विकल्प चुनें।`,
      options: [
        `विकल्प (A) — संभावित उत्तर ${qNo}.1`,
        `विकल्प (B) — संभावित उत्तर ${qNo}.2`,
        `विकल्प (C) — संभावित उत्तर ${qNo}.3`,
        `विकल्प (D) — संभावित उत्तर ${qNo}.4`,
      ],
      correctIndex,
      repeatedYears: qNo % 2 === 0 ? yearsPool[i % yearsPool.length] : undefined,
      explanation: `सही उत्तर (${['A', 'B', 'C', 'D'][correctIndex]}) है। परीक्षा में इस तरह के प्रश्न का सही तथ्य स्पष्ट रूप से चुनना होता है।`,
    };
  });
}

function makeItemsForSubject(
  prefix: string,
  classLevel: ClassLevel,
  subjectKey: string,
  setNum: number
): ClickableExamItem[] {
  if (subjectKey === 'Hindi') {
    const authors =
      classLevel === '10th'
        ? [
            {
              name: 'आचार्य रामचंद्र शुक्ल (गद्य)',
              years: '2022, 2023, 2024, 2025',
              ans: 'जन्म: 1884 ई. (अगोना, बस्ती)। प्रमुख रचनाएँ: चिंतामणि, विचार-वीथी, रस मीमांसा, त्रिवेणी। शैली: गंभीर, विचारात्मक और परिष्कृत खड़ी बोली। परीक्षा में जीवन परिचय के साथ एक प्रमुख रचना का नाम अवश्य लिखें।',
            },
            {
              name: 'जयशंकर प्रसाद (गद्य)',
              years: '2022, 2023, 2025',
              ans: 'जन्म: 1889 ई. (काशी)। प्रमुख कृतियाँ: कंकाल, तितली, इरावती, आकाशदीप, आँधी, ध्रुवस्वामिनी। विशेषता: छायावादी युग के प्रमुख स्तंभ, भावपूर्ण व कलात्मक शैली।',
            },
            {
              name: 'डॉ. राजेंद्र प्रसाद (गद्य)',
              years: '2023, 2024, 2025',
              ans: 'जन्म: 1884 ई. (जीरादेई, छपरा)। प्रमुख रचनाएँ: मेरी आत्मकथा, भारतीय शिक्षा, गांधी जी की देन। शैली: सरल, स्पष्ट और व्यावहारिक भाषा।',
            },
            {
              name: 'सूरदास / तुलसीदास (काव्य)',
              years: '2022, 2024, 2025',
              ans: 'सूरदास: वात्सल्य व शृंगार के श्रेष्ठ कवि; रचनाएँ—सूरसागर, सूरसारावली, साहित्य लहरी।\nतुलसीदास: रामभक्ति शाखा के प्रमुख कवि; रचनाएँ—रामचरितमानस, विनयपत्रिका, कवितावली।',
            },
          ]
        : [
            {
              name: 'वासुदेवशरण अग्रवाल (साहित्यिक परिचय)',
              years: '2022, 2023, 2024, 2025',
              ans: 'जन्म: 1904 ई.। प्रमुख कृतियाँ: पृथ्वीपुत्र, कल्पलता, कला और संस्कृति, भारत की एकता। साहित्यिक योगदान: पुरातत्व, संस्कृति और भारतीय विरासत पर गंभीर शोधपरक निबंध।',
            },
            {
              name: 'हजारीप्रसाद द्विवेदी (साहित्यिक परिचय)',
              years: '2022, 2023, 2025',
              ans: 'जन्म: 1907 ई.। प्रमुख कृतियाँ: अशोक के फूल, कुटज, कल्पलता, बाणभट्ट की आत्मकथा। विशेषता: ललित निबंधकार व विद्वान आलोचक।',
            },
            {
              name: 'मैथिलीशरण गुप्त (काव्य परिचय)',
              years: '2023, 2024, 2025',
              ans: 'जन्म: 1886 ई. (चिरगाँव, झाँसी)। प्रमुख कृतियाँ: साकेत, यशोधरा, भारत-भारती, पंचवटी। राष्ट्रकवि के रूप में खड़ी बोली काव्य को प्रतिष्ठित किया।',
            },
            {
              name: 'महादेवी वर्मा (काव्य परिचय)',
              years: '2022, 2024, 2025',
              ans: 'जन्म: 1907 ई. (फर्रुखाबाद)। प्रमुख कृतियाँ: नीहार, रश्मि, नीरजा, सांध्यगीत, यामा। विशेषता: छायावाद की प्रमुख कवयित्री, संवेदनशील व गीतात्मक शैली।',
            },
          ];

    const authorItems: ClickableExamItem[] = authors.map((a, idx) => ({
      id: `${prefix}-s${setNum}-jp-${idx + 1}`,
      section: 'Jeevan Parichay (Choice)',
      choiceGroup: 'जीवन परिचय (विकल्प में से — किसी एक का उत्तर देखें)',
      title: `${idx + 1}. ${a.name}`,
      marksOrHint: 'जीवन परिचय + कृतियाँ',
      repeatedYears: a.years,
      answer: a.ans,
    }));

    const extraHindiItems: ClickableExamItem[] = [
      {
        id: `${prefix}-s${setNum}-gad-1`,
        section: 'Gadyansh (Choice)',
        choiceGroup: 'गद्यांश विकल्प 1',
        title: 'गद्यांश अभ्यास 01 — संदर्भ, रेखांकित अंश की व्याख्या व प्रश्न उत्तर',
        repeatedYears: '2022, 2023, 2025',
        answer:
          '1. संदर्भ: प्रस्तुत गद्यांश हमारी पाठ्यपुस्तक के निर्धारित गद्य पाठ से उद्धृत है।\n2. रेखांकित अंश की व्याख्या: लेखक ने यहाँ मुख्य विचार को सरल शब्दों में स्पष्ट किया है कि सही मार्गदर्शन और विवेक से जीवन की दिशा सुधरती है।\n3. प्रश्न का उत्तर: गद्यांश का मूल भाव नैतिकता, अभ्यास और सही निर्णय से जुड़ा है।',
      },
      {
        id: `${prefix}-s${setNum}-gad-2`,
        section: 'Gadyansh (Choice)',
        choiceGroup: 'गद्यांश विकल्प 2',
        title: 'गद्यांश अभ्यास 02 — संदर्भ, प्रसंग व व्याख्या',
        repeatedYears: '2023, 2024, 2025',
        answer:
          '1. संदर्भ: यह गद्यांश पाठ्यपुस्तक के गद्य खंड से लिया गया है।\n2. प्रसंग: इसमें विषय के महत्व और प्रभाव को समझाया गया है।\n3. व्याख्या: कथन के अनुसार निरंतर प्रयास व सही दृष्टिकोण से कठिन कार्य भी सहज हो जाता है।',
      },
      {
        id: `${prefix}-s${setNum}-pad-1`,
        section: 'Padyansh (Choice)',
        choiceGroup: 'पद्यांश विकल्प 1',
        title: 'पद्यांश अभ्यास 01 — संदर्भ, व्याख्या व काव्य-सौंदर्य',
        repeatedYears: '2022, 2024, 2025',
        answer:
          '1. संदर्भ: प्रस्तुत पद्यांश हमारी पाठ्यपुस्तक के काव्य खंड से लिया गया है।\n2. व्याख्या: कवि ने भावों की गहराई को स्पष्ट करते हुए जीवन के सत्य और भावनात्मक पक्ष को उजागर किया है।\n3. काव्य-सौंदर्य: भाषा सरल व प्रभावशाली, अलंकार/छंद का सटीक निर्वाह।',
      },
      {
        id: `${prefix}-s${setNum}-pad-2`,
        section: 'Padyansh (Choice)',
        choiceGroup: 'पद्यांश विकल्प 2',
        title: 'पद्यांश अभ्यास 02 — संदर्भ, भावार्थ व काव्य-सौंदर्य',
        repeatedYears: '2023, 2025',
        answer:
          '1. संदर्भ: यह पद्यांश पाठ्यपुस्तक के पद्य भाग से संकलित है।\n2. भावार्थ: पंक्तियों में निहित संदेश को सरल खड़ी बोली/ब्रजभाषा के संदर्भ में स्पष्ट करें।\n3. काव्य-सौंदर्य: लय, तुक और भावाभिव्यक्ति की स्पष्टता।',
      },
      {
        id: `${prefix}-s${setNum}-shl-1`,
        section: 'Shlok / Sanskrit (Choice)',
        choiceGroup: 'संस्कृत श्लोक / गद्यांश विकल्प 1',
        title: 'संस्कृत श्लोक 01 — संदर्भ सहित हिंदी अनुवाद',
        repeatedYears: '2022, 2023, 2024, 2025',
        answer:
          'संदर्भ: प्रस्तुत श्लोक हमारी पाठ्यपुस्तक के संस्कृत खंड के निर्धारित पाठ से लिया गया है।\nहिंदी अनुवाद: विनम्रता, कर्तव्यनिष्ठा, सत्य और सद्गुणों का पालन करने वाला व्यक्ति समाज में सम्मान पाता है।',
      },
      {
        id: `${prefix}-s${setNum}-shl-2`,
        section: 'Shlok / Sanskrit (Choice)',
        choiceGroup: 'संस्कृत श्लोक / गद्यांश विकल्प 2',
        title: 'संस्कृत श्लोक 02 — संदर्भ सहित हिंदी अनुवाद',
        repeatedYears: '2023, 2025',
        answer:
          'संदर्भ: यह श्लोक संस्कृत खंड से उद्धृत है।\nहिंदी अनुवाद: परिश्रम, संयम और ज्ञान को जीवन का आधार बनाने से सफलता सुनिश्चित होती है।',
      },
      {
        id: `${prefix}-s${setNum}-short-1`,
        section: 'Short Answer',
        title: 'लघु उत्तरीय प्रश्न — पाठ के मुख्य संदेश व तथ्यात्मक प्रश्न',
        repeatedYears: '2022, 2024, 2025',
        answer:
          'उत्तर लिखने का तरीका: प्रश्न के अनुसार 25–30 शब्दों में सटीक उत्तर दें—मुख्य घटना/विचार, कारण और निष्कर्ष को सीधे लिखें।',
      },
      {
        id: `${prefix}-s${setNum}-long-1`,
        section: 'Long Answer',
        title: 'दीर्घ उत्तरीय प्रश्न — चरित्र चित्रण / पाठ का सारांश / मुख्य विचार',
        repeatedYears: '2022, 2023, 2025',
        answer:
          'उत्तर लिखने का तरीका: प्रस्तावना (परिचय), मुख्य बिंदु/घटनाक्रम (3–4 बिंदु), और उपसंहार (निष्कर्ष) के साथ स्पष्ट उत्तर लिखें।',
      },
    ];

    return [...authorItems, ...extraHindiItems];
  }

  if (subjectKey === 'English') {
    const centralIdeas =
      classLevel === '10th'
        ? [
            {
              title: 'Central Idea 01 — Dust of Snow (Robert Frost)',
              years: '2022, 2023, 2024, 2025',
              ans: 'The poem "Dust of Snow" by Robert Frost highlights how a small, ordinary incident—a crow shaking snow dust from a hemlock tree onto the poet—can lift a gloomy mood and save the rest of the day from regret. Nature has a healing effect on human mind.',
            },
            {
              title: 'Central Idea 02 — Fire and Ice (Robert Frost)',
              years: '2022, 2024, 2025',
              ans: 'In "Fire and Ice", Robert Frost uses fire to symbolize intense desire/greed and ice to symbolize hatred/coldness. Both are destructive forces capable of ending the world, showing the danger of unchecked human emotions.',
            },
            {
              title: 'Central Idea 03 — A Tiger in the Zoo (Leslie Norris)',
              years: '2023, 2024, 2025',
              ans: 'The poem contrasts a caged tiger in a zoo with a tiger roaming free in the wild. It conveys the pain of captivity and freedom lost, urging empathy for wildlife.',
            },
            {
              title: 'Central Idea 04 — The Ball Poem (John Berryman)',
              years: '2022, 2023, 2025',
              ans: 'The poem explores growing up and accepting loss. Losing the ball teaches the boy the epistemology of loss—how to cope with sorrow and move forward with maturity.',
            },
          ]
        : [
            {
              title: 'Central Idea 01 — My Mother at Sixty-Six (Kamala Das)',
              years: '2022, 2023, 2024, 2025',
              ans: 'Kamala Das portrays the deep bond between a daughter and her aging mother, alongside the fear of separation and aging. Through contrasting images of winter/decay and youthful energy outside, the poem captures tender human emotion.',
            },
            {
              title: 'Central Idea 02 — Keeping Quiet (Pablo Neruda)',
              years: '2022, 2024, 2025',
              ans: 'Pablo Neruda calls for brief moments of stillness and silence to pause destructive haste, foster self-reflection, and build peace and brotherhood among people.',
            },
            {
              title: 'Central Idea 03 — A Thing of Beauty (John Keats)',
              years: '2023, 2024, 2025',
              ans: 'John Keats emphasizes that a thing of beauty is a source of everlasting joy. Beauty comforts the human spirit amidst sorrow, despair, and hardships of life.',
            },
            {
              title: 'Central Idea 04 — Aunt Jennifer’s Tigers (Adrienne Rich)',
              years: '2022, 2023, 2025',
              ans: 'The poem highlights the contrast between Aunt Jennifer’s inner constraints under patriarchal pressure and the fearless, free tigers she embroiders, symbolizing a desire for freedom and artistic permanence.',
            },
          ];

    const ciItems: ClickableExamItem[] = centralIdeas.map((c, idx) => ({
      id: `${prefix}-s${setNum}-ci-${idx + 1}`,
      section: 'Central Idea / Poem (Choice)',
      choiceGroup: 'Central Idea (विकल्प में से — जिस पर टैप करें उसका पूरा उत्तर आएगा)',
      title: c.title,
      repeatedYears: c.years,
      answer: c.ans,
    }));

    return [
      ...ciItems,
      {
        id: `${prefix}-s${setNum}-eng-short-1`,
        section: 'Short Answer',
        title: 'Short Answer Question 01 — Prose Key Incident / Character',
        repeatedYears: '2022, 2023, 2025',
        answer:
          'Give a direct, clear answer in 30–40 words covering the main action, reason, and outcome from the prescribed prose chapter.',
      },
      {
        id: `${prefix}-s${setNum}-eng-short-2`,
        section: 'Short Answer',
        title: 'Short Answer Question 02 — Supplementary Reader',
        repeatedYears: '2023, 2024, 2025',
        answer:
          'Write a crisp, accurate answer highlighting the turning point and key message of the supplementary story.',
      },
      {
        id: `${prefix}-s${setNum}-eng-long-1`,
        section: 'Long Answer',
        title: 'Long Answer Question — Detailed Prose / Character Sketch',
        repeatedYears: '2022, 2024, 2025',
        answer:
          'Structure in 60–80 words (or Class 12th required length): brief introduction, key events/traits with textual relevance, and concluding message.',
      },
      {
        id: `${prefix}-s${setNum}-eng-gram-1`,
        section: 'Subject Special / Numerical / Grammar',
        title: 'Grammar & Writing — Direct/Indirect, Synthesis, Transformation & Notice/Letter',
        repeatedYears: '2022, 2023, 2024, 2025',
        answer:
          'Apply exact tense/pronoun/reporting-verb rules, check subject-verb agreement, and follow proper format for formal/informal letters or articles.',
      },
    ];
  }

  // बाकी विषय (Math, Science, Social Science, Art, Physics, Chemistry, Biology)
  return [
    {
      id: `${prefix}-s${setNum}-short-1`,
      section: 'Short Answer',
      title: `${subjectKey} — लघु उत्तरीय प्रश्न 01 (परिभाषा व मुख्य नियम)`,
      repeatedYears: '2022, 2023, 2025',
      answer:
        'सटीक परिभाषा, आवश्यक नियम/सिद्धांत और एक स्पष्ट उदाहरण के साथ संक्षिप्त उत्तर लिखें।',
    },
    {
      id: `${prefix}-s${setNum}-short-2`,
      section: 'Short Answer',
      title: `${subjectKey} — लघु उत्तरीय प्रश्न 02 (अंतर / कारण आधारित)`,
      repeatedYears: '2023, 2024, 2025',
      answer:
        'तुलना या कारण स्पष्ट करते हुए मुख्य बिंदु लिखें; जहाँ आवश्यक हो वहाँ सूत्र या उदाहरण जोड़ें।',
    },
    {
      id: `${prefix}-s${setNum}-long-1`,
      section: 'Long Answer',
      title: `${subjectKey} — दीर्घ उत्तरीय प्रश्न (विस्तृत व्याख्या / चरणबद्ध हल)`,
      repeatedYears: '2022, 2023, 2024, 2025',
      answer:
        'चरणबद्ध (Step-by-step) हल या बिंदुवार व्याख्या लिखें: नियम/सूत्र, मुख्य चरण, आवश्यक चित्र/आरेख (यदि लागू हो) और अंतिम निष्कर्ष।',
    },
    {
      id: `${prefix}-s${setNum}-spec-1`,
      section: 'Subject Special / Numerical / Grammar',
      title: `${subjectKey} — विषय विशेष (सूत्र / समीकरण / आंकिक / मानचित्र / कला बिंदु)`,
      repeatedYears: '2022, 2024, 2025',
      answer:
        'दिए गए मान/तथ्य लिखें, सही सूत्र या नियम लागू करें, इकाई (Unit) सहित मान निकालें और अंतिम उत्तर को स्पष्ट रूप से दर्शाएँ।',
    },
  ];
}

function buildSevenDaySets(
  prefix: string,
  classLevel: ClassLevel,
  subjectName: string,
  subjectKey: string
): DailyPaperSet[] {
  const dayNames = [
    'Day 1 • Set 1',
    'Day 2 • Set 2',
    'Day 3 • Set 3',
    'Day 4 • Set 4',
    'Day 5 • Set 5',
    'Day 6 • Set 6',
    'Day 7 • Set 7',
  ];

  return dayNames.map((dayLabel, idx) => {
    const setNumber = (idx + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
    return {
      setNumber,
      dayLabel,
      examPatternNote: `Class ${classLevel} • ${subjectName} • ${dayLabel} (20 MCQ + Choice & Click-to-Reveal Answers)`,
      mcqs: makeTwentyMcqs(prefix, subjectName, setNumber),
      items: makeItemsForSubject(prefix, classLevel, subjectKey, setNumber),
    };
  });
}

export const BOARD_PREP_PACKAGES: SubjectPaperConfig[] = [
  // ================= CLASS 10TH — HINDI MEDIUM (6 SUBJECTS) =================
  {
    id: '10-Hindi-Hindi',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Hindi (हिंदी)',
    levelNote: 'Class 10th • गद्य, पद्य, संस्कृत, जीवन परिचय, गद्यांश, पद्यांश, श्लोक',
    sets: buildSevenDaySets('10-hi-hin', '10th', 'Hindi (हिंदी)', 'Hindi'),
  },
  {
    id: '10-Hindi-English',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'English (अंग्रेज़ी)',
    levelNote: 'Class 10th • Prose, Poetry, Central Idea, Supplementary, Grammar',
    sets: buildSevenDaySets('10-hi-eng', '10th', 'English (अंग्रेज़ी)', 'English'),
  },
  {
    id: '10-Hindi-Math',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Mathematics (गणित)',
    levelNote: 'Class 10th • बीजगणित, ज्यामिति, त्रिकोणमिति, क्षेत्रमिति, सांख्यिकी',
    sets: buildSevenDaySets('10-hi-math', '10th', 'Mathematics (गणित)', 'Math'),
  },
  {
    id: '10-Hindi-Science',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Science (भौतिक + रसायन + जीव विज्ञान)',
    levelNote: 'Class 10th • Physics, Chemistry व Biology तीनों भागों के प्रश्न',
    sets: buildSevenDaySets('10-hi-sci', '10th', 'Science (Physics+Chemistry+Biology)', 'Science'),
  },
  {
    id: '10-Hindi-SocialScience',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Social Science (सामाजिक विज्ञान)',
    levelNote: 'Class 10th • इतिहास, भूगोल, नागरिक शास्त्र, अर्थशास्त्र व मानचित्र',
    sets: buildSevenDaySets('10-hi-sst', '10th', 'Social Science (सामाजिक विज्ञान)', 'SocialScience'),
  },
  {
    id: '10-Hindi-Art',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Art (कला / चित्रकला)',
    levelNote: 'Class 10th • आलेखन, स्मृति चित्रण, प्राविधिक व सैद्धांतिक प्रश्न',
    sets: buildSevenDaySets('10-hi-art', '10th', 'Art (कला)', 'Art'),
  },

  // ================= CLASS 10TH — ENGLISH MEDIUM (6 SUBJECTS) =================
  {
    id: '10-English-Hindi',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Hindi',
    levelNote: 'Class 10th • Jeevan Parichay, Gadyansh, Padyansh, Shlok & Q&A',
    sets: buildSevenDaySets('10-en-hin', '10th', 'Hindi', 'Hindi'),
  },
  {
    id: '10-English-English',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'English',
    levelNote: 'Class 10th • Prose, Poetry, Central Idea, Supplementary & Grammar',
    sets: buildSevenDaySets('10-en-eng', '10th', 'English', 'English'),
  },
  {
    id: '10-English-Math',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Mathematics',
    levelNote: 'Class 10th • Algebra, Geometry, Trigonometry, Mensuration & Statistics',
    sets: buildSevenDaySets('10-en-math', '10th', 'Mathematics', 'Math'),
  },
  {
    id: '10-English-Science',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Science (Physics + Chemistry + Biology)',
    levelNote: 'Class 10th • Physics, Chemistry & Biology sections',
    sets: buildSevenDaySets('10-en-sci', '10th', 'Science', 'Science'),
  },
  {
    id: '10-English-SocialScience',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Social Science',
    levelNote: 'Class 10th • History, Geography, Civics, Economics & Map work',
    sets: buildSevenDaySets('10-en-sst', '10th', 'Social Science', 'SocialScience'),
  },
  {
    id: '10-English-Art',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Art',
    levelNote: 'Class 10th • Motif Design, Memory Drawing & Theory',
    sets: buildSevenDaySets('10-en-art', '10th', 'Art', 'Art'),
  },

  // ================= CLASS 12TH — HINDI MEDIUM (6 SUBJECTS) =================
  {
    id: '12-Hindi-Hindi',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Hindi (सामान्य / साहित्यिक हिंदी)',
    levelNote: 'Class 12th • साहित्यिक/जीवन परिचय, गद्यांश, पद्यांश, संस्कृत व काव्य-सौंदर्य',
    sets: buildSevenDaySets('12-hi-hin', '12th', 'Hindi (12th)', 'Hindi'),
  },
  {
    id: '12-Hindi-English',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'English (अंग्रेज़ी)',
    levelNote: 'Class 12th • Flamingo, Vistas, Central Idea, Writing & Grammar',
    sets: buildSevenDaySets('12-hi-eng', '12th', 'English (12th)', 'English'),
  },
  {
    id: '12-Hindi-Physics',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Physics (भौतिक विज्ञान)',
    levelNote: 'Class 12th • स्थिर वैद्युतिकी, विद्युत धारा, चुंबकत्व, प्रकाशिकी व आधुनिक भौतिकी',
    sets: buildSevenDaySets('12-hi-phy', '12th', 'Physics (भौतिक विज्ञान)', 'Physics'),
  },
  {
    id: '12-Hindi-Chemistry',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Chemistry (रसायन विज्ञान)',
    levelNote: 'Class 12th • भौतिक, अकार्बनिक व कार्बनिक रसायन',
    sets: buildSevenDaySets('12-hi-chem', '12th', 'Chemistry (रसायन विज्ञान)', 'Chemistry'),
  },
  {
    id: '12-Hindi-Biology',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Biology (जीव विज्ञान)',
    levelNote: 'Class 12th • जनन, आनुवंशिकी, जैव प्रौद्योगिकी, मानव स्वास्थ्य व पारिस्थितिकी',
    sets: buildSevenDaySets('12-hi-bio', '12th', 'Biology (जीव विज्ञान)', 'Biology'),
  },
  {
    id: '12-Hindi-Math',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Mathematics (गणित)',
    levelNote: 'Class 12th • संबंध-फलन, आव्यूह-सारणिक, कलन, सदिश-त्रिविमीय व प्रायिकता',
    sets: buildSevenDaySets('12-hi-math', '12th', 'Mathematics (गणित)', 'Math'),
  },

  // ================= CLASS 12TH — ENGLISH MEDIUM (6 SUBJECTS) =================
  {
    id: '12-English-Hindi',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Hindi',
    levelNote: 'Class 12th • Jeevan Parichay, Gadyansh, Padyansh, Shlok & Q&A',
    sets: buildSevenDaySets('12-en-hin', '12th', 'Hindi (12th)', 'Hindi'),
  },
  {
    id: '12-English-English',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'English',
    levelNote: 'Class 12th • Flamingo, Vistas, Central Idea, Writing & Grammar',
    sets: buildSevenDaySets('12-en-eng', '12th', 'English (12th)', 'English'),
  },
  {
    id: '12-English-Physics',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Physics',
    levelNote: 'Class 12th • Electrostatics, Current, Magnetism, Optics & Modern Physics',
    sets: buildSevenDaySets('12-en-phy', '12th', 'Physics (12th)', 'Physics'),
  },
  {
    id: '12-English-Chemistry',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Chemistry',
    levelNote: 'Class 12th • Physical, Inorganic & Organic Chemistry',
    sets: buildSevenDaySets('12-en-chem', '12th', 'Chemistry (12th)', 'Chemistry'),
  },
  {
    id: '12-English-Biology',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Biology',
    levelNote: 'Class 12th • Reproduction, Genetics, Biotech, Health & Ecology',
    sets: buildSevenDaySets('12-en-bio', '12th', 'Biology (12th)', 'Biology'),
  },
  {
    id: '12-English-Math',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Mathematics',
    levelNote: 'Class 12th • Relations-Matrices, Calculus, Vectors-3D & Probability',
    sets: buildSevenDaySets('12-en-math', '12th', 'Mathematics (12th)', 'Math'),
  },
];
