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
  repeatedYears?: string;
}

export interface ClickableExamItem {
  id: string;
  section: ExamSectionType;
  choiceGroup?: string;
  title: string;
  marksOrHint?: string;
  repeatedYears?: string;
  answer: string;
}

export interface DailyPaperSet {
  setNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  dayLabel: string;
  examPatternNote: string;
  mcqs: McqQuestion[];
  items: ClickableExamItem[];
}

export interface SubjectPaperConfig {
  id: string;
  classLevel: ClassLevel;
  medium: MediumType;
  subjectName: string;
  levelNote: string;
  sets: DailyPaperSet[];
}

type SubjectKey =
  | 'Hindi'
  | 'English'
  | 'Math'
  | 'Science'
  | 'Social Science'
  | 'Art'
  | 'Physics'
  | 'Chemistry'
  | 'Biology';

interface RawMcq {
  q: string;
  opts: [string, string, string, string];
  ans: 0 | 1 | 2 | 3;
  exp: string;
  years?: string;
}

/* ==================== CLASS 10TH MCQ BANKS ==================== */

const HINDI_10_MCQS: RawMcq[] = [
  { q: "'चिंतामणि' किस विधा की रचना है?", opts: ['नाटक', 'निबंध संग्रह', 'कहानी', 'उपन्यास'], ans: 1, exp: 'उत्तर: (ख) निबंध संग्रह', years: '2022, 2024, 2025' },
  { q: "'क्या भूलूँ क्या याद करूँ' किसकी आत्मकथा है?", opts: ['हरिवंशराय बच्चन', 'रामवृक्ष बेनीपुरी', 'जैनेंद्र कुमार', 'यशपाल'], ans: 0, exp: 'उत्तर: (क) हरिवंशराय बच्चन', years: '2023, 2025' },
  { q: "'आकाशदीप' कहानी के लेखक कौन हैं?", opts: ['प्रेमचंद', 'जयशंकर प्रसाद', 'अज्ञेय', 'अमरकांत'], ans: 1, exp: 'उत्तर: (ख) जयशंकर प्रसाद', years: '2022, 2023, 2024' },
  { q: "'गोदान' किस विधा की रचना है?", opts: ['उपन्यास', 'रेखाचित्र', 'संस्मरण', 'यात्रावृत्त'], ans: 0, exp: 'उत्तर: (क) उपन्यास', years: '2022, 2025' },
  { q: "'मेरी असफलताएँ' किसकी रचना है?", opts: ['बाबू गुलाबराय', 'डॉ. राजेंद्र प्रसाद', 'हजारीप्रसाद द्विवेदी', 'महादेवी वर्मा'], ans: 0, exp: 'उत्तर: (क) बाबू गुलाबराय', years: '2023, 2024' },
  { q: "'रामचरितमानस' किस भाषा में रचित है?", opts: ['ब्रजभाषा', 'अवधी', 'खड़ी बोली', 'मैथिली'], ans: 1, exp: 'उत्तर: (ख) अवधी', years: '2022, 2024, 2025' },
  { q: "'सूरसागर' के रचयिता कौन हैं?", opts: ['कबीरदास', 'सूरदास', 'रसखान', 'बिहारी'], ans: 1, exp: 'उत्तर: (ख) सूरदास', years: '2022, 2023, 2025' },
  { q: "'साकेत' किसकी प्रसिद्ध कृति है?", opts: ['मैथिलीशरण गुप्त', 'सुमित्रानंदन पंत', 'सूर्यकांत त्रिपाठी निराला', 'दिनकर'], ans: 0, exp: 'उत्तर: (क) मैथिलीशरण गुप्त', years: '2023, 2024, 2025' },
  { q: 'रीतिकाल की प्रमुख विशेषता क्या है?', opts: ['वीरता', 'शृंगार एवं अलंकार प्रधानता', 'प्रकृति चित्रण', 'राष्ट्रीयता'], ans: 1, exp: 'उत्तर: (ख) शृंगार एवं अलंकार प्रधानता', years: '2022, 2024' },
  { q: "'पल्लव' किस कवि की रचना है?", opts: ['सुमित्रानंदन पंत', 'जयशंकर प्रसाद', 'माखनलाल चतुर्वेदी', 'सुभद्राकुमारी चौहान'], ans: 0, exp: 'उत्तर: (क) सुमित्रानंदन पंत', years: '2023, 2025' },
  { q: 'हास्य रस का स्थायी भाव क्या है?', opts: ['शोक', 'हास', 'रति', 'क्रोध'], ans: 1, exp: 'उत्तर: (ख) हास', years: '2022, 2023, 2024, 2025' },
  { q: 'करुण रस का स्थायी भाव क्या है?', opts: ['उत्साह', 'शोक', 'भय', 'जुगुप्सा'], ans: 1, exp: 'उत्तर: (ख) शोक', years: '2022, 2024, 2025' },
  { q: "'पीपर पात सरिस मन डोला' में कौन-सा अलंकार है?", opts: ['रूपक', 'उपमा', 'उत्प्रेक्षा', 'अनुप्रास'], ans: 1, exp: 'उत्तर: (ख) उपमा', years: '2022, 2023, 2025' },
  { q: 'रोला छंद के प्रत्येक चरण में कितनी मात्राएँ होती हैं?', opts: ['16', '24', '13', '11'], ans: 1, exp: 'उत्तर: (ख) 24', years: '2022, 2024, 2025' },
  { q: "'अनु-' उपसर्ग लगाकर बना शब्द कौन-सा है?", opts: ['अपमान', 'अनुशासन', 'अधिकार', 'परिश्रम'], ans: 1, exp: 'उत्तर: (ख) अनुशासन', years: '2023, 2025' },
  { q: "'पंडित' का पर्यायवाची शब्द है—", opts: ['विद्वान', 'मूर्ख', 'सेवक', 'शत्रु'], ans: 0, exp: 'उत्तर: (क) विद्वान', years: '2022, 2024' },
  { q: "'नदी' का पर्यायवाची शब्द कौन-सा है?", opts: ['सरिता', 'पर्वत', 'वारिद', 'अंबर'], ans: 0, exp: 'उत्तर: (क) सरिता', years: '2023, 2024, 2025' },
  { q: "'चतुर्भुज' में कौन-सा समास है?", opts: ['द्वंद्व', 'बहुव्रीहि', 'तत्पुरुष', 'अव्ययीभाव'], ans: 1, exp: 'उत्तर: (ख) बहुव्रीहि', years: '2022, 2023, 2025' },
  { q: "'अग्नि' का तद्भव रूप क्या है?", opts: ['आग', 'अनल', 'पावक', 'ज्वाला'], ans: 0, exp: 'उत्तर: (क) आग', years: '2022, 2024, 2025' },
  { q: "'तत् + लीन' की संधि होगी—", opts: ['तल्लीन', 'ततलीन', 'तलिन', 'तलीन'], ans: 0, exp: 'उत्तर: (क) तल्लीन', years: '2023, 2025' },
  { q: "'अजातशत्रु' किस विधा की रचना है?", opts: ['नाटक', 'उपन्यास', 'जीवनी', 'निबंध'], ans: 0, exp: 'उत्तर: (क) नाटक', years: '2022, 2024' },
  { q: 'सोरठा छंद के पहले और तीसरे चरण में कितनी मात्राएँ होती हैं?', opts: ['11-11', '13-13', '16-16', '24-24'], ans: 0, exp: 'उत्तर: (क) 11-11', years: '2022, 2023, 2025' },
  { q: "'पंचवटी' में कौन-सा समास है?", opts: ['द्विगु', 'द्वंद्व', 'कर्मधारय', 'अव्ययीभाव'], ans: 0, exp: 'उत्तर: (क) द्विगु', years: '2022, 2024, 2025' }
];

const ENGLISH_10_MCQS: RawMcq[] = [
  { q: "Who is the author of 'A Letter to God'?", opts: ['G.L. Fuentes', 'Nelson Mandela', 'Anne Frank', 'Ruskin Bond'], ans: 0, exp: 'Answer: (A) G.L. Fuentes', years: '2022, 2023, 2024, 2025' },
  { q: 'How much money did Lencho ask from God?', opts: ['70 pesos', '100 pesos', '50 pesos', '30 pesos'], ans: 1, exp: 'Answer: (B) 100 pesos', years: '2022, 2024, 2025' },
  { q: "Who is the poet of 'Dust of Snow'?", opts: ['Robert Frost', 'Walt Whitman', 'John Berryman', 'W.B. Yeats'], ans: 0, exp: 'Answer: (A) Robert Frost', years: '2022, 2023, 2025' },
  { q: 'Which tree shook down dust of snow on the poet?', opts: ['Oak tree', 'Hemlock tree', 'Pine tree', 'Banyan tree'], ans: 1, exp: 'Answer: (B) Hemlock tree', years: '2023, 2024, 2025' },
  { q: 'According to Nelson Mandela, what is the greatest wealth of a nation?', opts: ['Minerals and gems', 'Its people', 'Gold reserves', 'Military power'], ans: 1, exp: 'Answer: (B) Its people', years: '2022, 2024, 2025' },
  { q: "What was the name of Anne Frank's diary?", opts: ['Kitty', 'Betty', 'Margot', 'Lucy'], ans: 0, exp: 'Answer: (A) Kitty', years: '2022, 2023, 2025' },
  { q: 'Coorg is famous for which crop and spices?', opts: ['Tea and cardamom', 'Coffee and spices', 'Rubber and pepper', 'Cotton and jute'], ans: 1, exp: 'Answer: (B) Coffee and spices', years: '2023, 2024' },
  { q: "Who was Tricki in 'A Triumph of Surgery'?", opts: ['A cat', 'A small dog', 'A parrot', 'A rabbit'], ans: 1, exp: 'Answer: (B) A small dog', years: '2022, 2024, 2025' },
  { q: "What was Hari Singh's real profession in 'The Thief's Story'?", opts: ['Cook', 'Thief', 'Teacher', 'Shopkeeper'], ans: 1, exp: 'Answer: (B) Thief', years: '2022, 2023, 2025' },
  { q: "Who is the author of 'Footprints without Feet'?", opts: ['H.G. Wells', 'Robert Arthur', 'Victor Canning', 'Guy de Maupassant'], ans: 0, exp: 'Answer: (A) H.G. Wells', years: '2023, 2024, 2025' },
  { q: 'What did Matilda borrow from Madame Forestier?', opts: ['A gold ring', 'A diamond necklace', 'A silk dress', 'Pearl earrings'], ans: 1, exp: 'Answer: (B) A diamond necklace', years: '2022, 2024, 2025' },
  { q: "What was Bholi's real name?", opts: ['Sulekha', 'Radha', 'Champa', 'Mangla'], ans: 0, exp: 'Answer: (A) Sulekha', years: '2022, 2023, 2024, 2025' },
  { q: "In 'Fire and Ice', what does 'Fire' symbolize?", opts: ['Hatred', 'Desire and greed', 'Coldness', 'Peace'], ans: 1, exp: 'Answer: (B) Desire and greed', years: '2022, 2025' },
  { q: 'Choose the correct preposition: He is fond ____ music.', opts: ['with', 'of', 'in', 'for'], ans: 1, exp: 'Answer: (B) of', years: '2022, 2023, 2024, 2025' },
  { q: 'Identify the tense: She has completed her homework.', opts: ['Simple Past', 'Present Perfect', 'Past Perfect', 'Present Continuous'], ans: 1, exp: 'Answer: (B) Present Perfect', years: '2023, 2025' },
  { q: "Change into passive voice: 'He writes a letter.'", opts: ['A letter was written by him.', 'A letter is written by him.', 'A letter is being written by him.', 'A letter has written by him.'], ans: 1, exp: 'Answer: (B) A letter is written by him.', years: '2022, 2024, 2025' },
  { q: 'Choose the correct spelling:', opts: ['Recieve', 'Receive', 'Receeve', 'Recive'], ans: 1, exp: 'Answer: (B) Receive', years: '2022, 2023, 2025' },
  { q: "Find the antonym of 'Ancient':", opts: ['Old', 'Modern', 'Past', 'Historic'], ans: 1, exp: 'Answer: (B) Modern', years: '2023, 2024' },
  { q: "Who wrote 'The Ball Poem'?", opts: ['John Berryman', 'Leslie Norris', 'Carl Sandburg', 'Adrienne Rich'], ans: 0, exp: 'Answer: (A) John Berryman', years: '2022, 2023, 2025' },
  { q: 'Choose the correct article: He is ____ honest man.', opts: ['a', 'an', 'the', 'no article'], ans: 1, exp: 'Answer: (B) an', years: '2022, 2023, 2024, 2025' },
  { q: 'Where did Gautama Buddha preach his first sermon?', opts: ['Gaya', 'Benares (Sarnath)', 'Kapilavastu', 'Lumbini'], ans: 1, exp: 'Answer: (B) Benares (Sarnath)', years: '2022, 2024, 2025' },
  { q: 'What did Valli wish to ride on?', opts: ['A train', 'A bus', 'A boat', 'A bicycle'], ans: 1, exp: 'Answer: (B) A bus', years: '2023, 2025' },
  { q: 'Who cured Tricki without any medicine?', opts: ['Dr. Herriot', 'Mrs. Pumphrey', 'Hodgkin', 'Dr. Watson'], ans: 0, exp: 'Answer: (A) Dr. Herriot', years: '2022, 2024' }
];

const OTHER4_10_HI: Record<'Science' | 'Math' | 'Social Science' | 'Art', RawMcq[]> = {
  Science: [
    { q: 'समतल दर्पण की फोकस दूरी कितनी होती है?', opts: ['शून्य', 'अनंत', '25 सेमी', '-25 सेमी'], ans: 1, exp: 'उत्तर: (ख) अनंत', years: '2022, 2023, 2024, 2025' },
    { q: 'स्पष्ट दृष्टि की न्यूनतम दूरी (स्वस्थ नेत्र) कितनी होती है?', opts: ['25 मीटर', '25 सेमी', 'अनंत', '2.5 सेमी'], ans: 1, exp: 'उत्तर: (ख) 25 सेमी', years: '2022, 2024, 2025' },
    { q: 'विद्युत धारा का SI मात्रक क्या है?', opts: ['वोल्ट', 'कूलॉम', 'ऐम्पियर', 'ओम'], ans: 2, exp: 'उत्तर: (ग) ऐम्पियर', years: '2022, 2023, 2025' },
    { q: 'ओम के नियम का सही सूत्र है—', opts: ['V = I/R', 'V = I × R', 'R = V × I', 'I = V × R'], ans: 1, exp: 'उत्तर: (ख) V = I × R', years: '2022, 2023, 2024, 2025' },
    { q: 'विद्युत शक्ति का SI मात्रक क्या है?', opts: ['जूल', 'वाट', 'वोल्ट', 'ओम-मीटर'], ans: 1, exp: 'उत्तर: (ख) वाट', years: '2023, 2024, 2025' },
    { q: 'लेंस की क्षमता का SI मात्रक क्या है?', opts: ['मीटर', 'डायोप्टर', 'वाट', 'सेमी'], ans: 1, exp: 'उत्तर: (ख) डायोप्टर', years: '2022, 2024, 2025' },
    { q: 'चुंबकीय क्षेत्र का SI मात्रक क्या है?', opts: ['टेस्ला', 'न्यूटन', 'कूलॉम', 'फैराडे'], ans: 0, exp: 'उत्तर: (क) टेस्ला', years: '2022, 2023, 2025' },
    { q: 'शुद्ध जल का pH मान कितना होता है?', opts: ['0', '7', '14', '5'], ans: 1, exp: 'उत्तर: (ख) 7', years: '2022, 2023, 2024, 2025' },
    { q: 'खाने के सोडा का रासायनिक सूत्र क्या है?', opts: ['Na₂CO₃', 'NaHCO₃', 'NaCl', 'CaOCl₂'], ans: 1, exp: 'उत्तर: (ख) NaHCO₃', years: '2022, 2024, 2025' },
    { q: 'धावन सोडा का रासायनिक सूत्र क्या है?', opts: ['Na₂CO₃·10H₂O', 'NaHCO₃', 'CaSO₄·2H₂O', 'NaOH'], ans: 0, exp: 'उत्तर: (क) Na₂CO₃·10H₂O', years: '2023, 2024, 2025' },
    { q: 'प्लास्टर ऑफ पेरिस का रासायनिक सूत्र है—', opts: ['CaSO₄·2H₂O', 'CaSO₄·½H₂O', 'CaCO₃', 'CaO'], ans: 1, exp: 'उत्तर: (ख) CaSO₄·½H₂O', years: '2022, 2023, 2025' },
    { q: 'सामान्य ताप पर द्रव धातु कौन-सी है?', opts: ['सोडियम', 'पारा (मरकरी)', 'लोहा', 'ताँबा'], ans: 1, exp: 'उत्तर: (ख) पारा (मरकरी)', years: '2022, 2024' },
    { q: 'C₂H₆ (एथेन) में कितने सहसंयोजक आबंध होते हैं?', opts: ['6', '7', '8', '9'], ans: 1, exp: 'उत्तर: (ख) 7', years: '2022, 2023, 2025' },
    { q: 'मनुष्य के हृदय में कितने कोष्ठक होते हैं?', opts: ['2', '3', '4', '5'], ans: 2, exp: 'उत्तर: (ग) 4', years: '2022, 2024, 2025' },
    { q: 'पादपों में जल के वहन के लिए उत्तरदायी है—', opts: ['जाइलम', 'फ्लोएम', 'रंध्र', 'मूलरोम'], ans: 0, exp: 'उत्तर: (क) जाइलम', years: '2022, 2023, 2024, 2025' },
    { q: 'मनुष्य में वृक्क (किडनी) किस तंत्र से संबंधित है?', opts: ['पोषण', 'श्वसन', 'उत्सर्जन', 'परिवहन'], ans: 2, exp: 'उत्तर: (ग) उत्सर्जन', years: '2022, 2024, 2025' },
    { q: 'स्वपोषी पोषण के लिए आवश्यक है—', opts: ['CO₂ तथा जल', 'क्लोरोफिल', 'सूर्य का प्रकाश', 'उपरोक्त सभी'], ans: 3, exp: 'उत्तर: (घ) उपरोक्त सभी', years: '2022, 2023, 2025' },
    { q: 'मेंडल ने अपने प्रयोग किस पौधे पर किए?', opts: ['गुड़हल', 'मटर', 'गुलाब', 'सरसों'], ans: 1, exp: 'उत्तर: (ख) मटर', years: '2022, 2023, 2024, 2025' },
    { q: 'मास्टर ग्रंथि किसे कहते हैं?', opts: ['थायरॉयड', 'पीयूष ग्रंथि', 'एड्रीनल', 'अग्न्याशय'], ans: 1, exp: 'उत्तर: (ख) पीयूष ग्रंथि', years: '2023, 2024, 2025' },
    { q: 'ओजोन परत क्षरण के लिए उत्तरदायी गैस है—', opts: ['CFC', 'ऑक्सीजन', 'नाइट्रोजन', 'हीलियम'], ans: 0, exp: 'उत्तर: (क) CFC', years: '2022, 2024, 2025' },
    { q: 'विद्युत प्रतिरोधकता का SI मात्रक है—', opts: ['ओम', 'ओम-मीटर', 'वोल्ट/मीटर', 'ऐम्पियर'], ans: 1, exp: 'उत्तर: (ख) ओम-मीटर', years: '2022, 2024, 2025' },
    { q: 'अम्लीय विलयन का pH मान होता है—', opts: ['7 से कम', '7 के बराबर', '7 से अधिक', '14'], ans: 0, exp: 'उत्तर: (क) 7 से कम', years: '2022, 2023, 2025' },
    { q: 'निकट दृष्टि दोष में किस लेंस का प्रयोग होता है?', opts: ['उत्तल लेंस', 'अवतल लेंस', 'बेलनाकार', 'द्विफोकसी'], ans: 1, exp: 'उत्तर: (ख) अवतल लेंस', years: '2022, 2023, 2024, 2025' }
  ],
  Math: [
    { q: '14587 / 1250 का दशमलव प्रसार कितने स्थानों बाद सांत होगा?', opts: ['1', '2', '3', '4'], ans: 3, exp: 'उत्तर: (घ) 4', years: '2022, 2024, 2025' },
    { q: 'HCF = 18, LCM = 360 तथा एक संख्या 72 हो तो दूसरी संख्या है—', opts: ['90', '45', '180', '36'], ans: 0, exp: 'उत्तर: (क) 90', years: '2022, 2023, 2025' },
    { q: 'द्विघात बहुपद x² - 5x + 6 के शून्यकों का योगफल है—', opts: ['-5', '5', '6', '-6'], ans: 1, exp: 'उत्तर: (ख) 5', years: '2022, 2024, 2025' },
    { q: '2x + 3y = 12 में यदि x = 3 हो तो y का मान होगा—', opts: ['1', '2', '3', '4'], ans: 1, exp: 'उत्तर: (ख) 2', years: '2023, 2024, 2025' },
    { q: 'x² + kx + 4 = 0 के मूल बराबर हों तो k का मान है—', opts: ['±2', '±4', '±8', '0'], ans: 1, exp: 'उत्तर: (ख) ±4', years: '2022, 2023, 2024, 2025' },
    { q: 'AP: 3, 7, 11, 15, ... का 10वाँ पद है—', opts: ['39', '43', '35', '40'], ans: 0, exp: 'उत्तर: (क) 39', years: '2022, 2024, 2025' },
    { q: 'बिंदु (3, 4) की मूल बिंदु (0, 0) से दूरी है—', opts: ['3', '4', '5', '7'], ans: 2, exp: 'उत्तर: (ग) 5', years: '2022, 2023, 2024, 2025' },
    { q: 'बिंदुओं (2, 3) और (4, 1) का मध्य-बिंदु है—', opts: ['(3, 2)', '(6, 4)', '(2, 2)', '(3, 4)'], ans: 0, exp: 'उत्तर: (क) (3, 2)', years: '2023, 2025' },
    { q: 'यदि sin A = 3/5 हो तो cos A का मान है—', opts: ['4/5', '3/4', '5/3', '5/4'], ans: 0, exp: 'उत्तर: (क) 4/5', years: '2022, 2024, 2025' },
    { q: 'tan 45° + cot 45° का मान है—', opts: ['0', '1', '2', '√2'], ans: 2, exp: 'उत्तर: (ग) 2', years: '2022, 2023, 2025' },
    { q: '9 sec² A - 9 tan² A बराबर है—', opts: ['1', '9', '8', '0'], ans: 1, exp: 'उत्तर: (ख) 9', years: '2022, 2023, 2024, 2025' },
    { q: 'समरूप त्रिभुजों की भुजाएँ 4 : 9 हों तो क्षेत्रफलों का अनुपात होगा—', opts: ['2 : 3', '4 : 9', '16 : 81', '81 : 16'], ans: 2, exp: 'उत्तर: (ग) 16 : 81', years: '2022, 2024, 2025' },
    { q: 'वृत्त के किसी बिंदु पर कितनी स्पर्श रेखाएँ खींची जा सकती हैं?', opts: ['एक', 'दो', 'अनंत', 'शून्य'], ans: 0, exp: 'उत्तर: (क) एक', years: '2023, 2024, 2025' },
    { q: '7 सेमी त्रिज्या वाले वृत्त का क्षेत्रफल है—', opts: ['44 सेमी²', '154 सेमी²', '308 सेमी²', '77 सेमी²'], ans: 1, exp: 'उत्तर: (ख) 154 सेमी²', years: '2022, 2023, 2025' },
    { q: 'घनाभ (5 × 4 × 3 सेमी) का आयतन है—', opts: ['12 सेमी³', '60 सेमी³', '47 सेमी³', '94 सेमी³'], ans: 1, exp: 'उत्तर: (ख) 60 सेमी³', years: '2022, 2024' },
    { q: '2, 4, 6, 8, 10 का समांतर माध्य है—', opts: ['5', '6', '7', '8'], ans: 1, exp: 'उत्तर: (ख) 6', years: '2022, 2023, 2024, 2025' },
    { q: '3, 5, 7, 5, 9, 5, 2 का बहुलक है—', opts: ['3', '5', '7', '9'], ans: 1, exp: 'उत्तर: (ख) 5', years: '2022, 2024, 2025' },
    { q: 'पासे की एक फेंक में सम संख्या आने की प्रायिकता है—', opts: ['1/6', '1/3', '1/2', '2/3'], ans: 2, exp: 'उत्तर: (ग) 1/2', years: '2022, 2023, 2024, 2025' },
    { q: 'असंभव घटना की प्रायिकता होती है—', opts: ['1', '0', '0.5', '-1'], ans: 1, exp: 'उत्तर: (ख) 0', years: '2023, 2025' },
    { q: 'sin 60° cos 30° + sin 30° cos 60° का मान है—', opts: ['0', '1', '1/2', '√3/2'], ans: 1, exp: 'उत्तर: (ख) 1', years: '2022, 2024, 2025' },
    { q: 'गोले की त्रिज्या r हो तो पृष्ठीय क्षेत्रफल है—', opts: ['2πr²', '3πr²', '4πr²', '4/3 πr³'], ans: 2, exp: 'उत्तर: (ग) 4πr²', years: '2022, 2025' },
    { q: 'बहुलक = 3 माध्यिका - ____', opts: ['2 माध्य', '3 माध्य', 'माध्य', '4 माध्य'], ans: 0, exp: 'उत्तर: (क) 2 माध्य', years: '2022, 2023, 2024, 2025' },
    { q: 'यदि tan A = 1 तो कोण A है—', opts: ['30°', '45°', '60°', '90°'], ans: 1, exp: 'उत्तर: (ख) 45°', years: '2023, 2025' }
  ],
  'Social Science': [
    { q: 'फ्रांस की क्रांति किस वर्ष हुई थी?', opts: ['1789 ई.', '1776 ई.', '1815 ई.', '1848 ई.'], ans: 0, exp: 'उत्तर: (क) 1789 ई.', years: '2022, 2023, 2024, 2025' },
    { q: 'यंग इटली सोसाइटी का संस्थापक कौन था?', opts: ['गैरीबाल्डी', 'बिस्मार्क', 'कावूर', 'ज्युसेपे मेत्सिनी'], ans: 3, exp: 'उत्तर: (घ) ज्युसेपे मेत्सिनी', years: '2022, 2024, 2025' },
    { q: 'महात्मा गांधी भारत कब लौटे थे?', opts: ['1915 ई.', '1917 ई.', '1919 ई.', '1920 ई.'], ans: 0, exp: 'उत्तर: (क) 1915 ई.', years: '2022, 2023, 2025' },
    { q: 'चौरी-चौरा कांड किस वर्ष हुआ था?', opts: ['1920 ई.', '1921 ई.', '1922 ई.', '1930 ई.'], ans: 2, exp: 'उत्तर: (ग) 1922 ई.', years: '2022, 2024, 2025' },
    { q: 'जलियाँवाला बाग हत्याकांड कब हुआ?', opts: ['13 अप्रैल 1919', '13 अप्रैल 1920', '15 अगस्त 1919', '26 जनवरी 1930'], ans: 0, exp: 'उत्तर: (क) 13 अप्रैल 1919', years: '2022, 2023, 2024, 2025' },
    { q: 'सविनय अवज्ञा आंदोलन कब शुरू हुआ?', opts: ['1920 ई.', '1930 ई.', '1942 ई.', '1928 ई.'], ans: 1, exp: 'उत्तर: (ख) 1930 ई.', years: '2023, 2024, 2025' },
    { q: 'भारत में सर्वाधिक कौन-सी मिट्टी पाई जाती है?', opts: ['काली मिट्टी', 'जलोढ़ मिट्टी', 'लाल मिट्टी', 'लैटेराइट'], ans: 1, exp: 'उत्तर: (ख) जलोढ़ मिट्टी', years: '2022, 2024, 2025' },
    { q: 'कपास की खेती के लिए उपयुक्त मिट्टी है—', opts: ['काली मिट्टी', 'जलोढ़ मिट्टी', 'पर्वतीय मिट्टी', 'मरुस्थलीय'], ans: 0, exp: 'उत्तर: (क) काली मिट्टी', years: '2022, 2023, 2024, 2025' },
    { q: 'चिपको आंदोलन संबंधित है—', opts: ['मृदा संरक्षण', 'वन संरक्षण', 'जल संरक्षण', 'वायु संरक्षण'], ans: 1, exp: 'उत्तर: (ख) वन संरक्षण', years: '2022, 2023, 2025' },
    { q: 'हीराकुंड परियोजना किस नदी पर है?', opts: ['सतलुज', 'महानदी', 'नर्मदा', 'कृष्णा'], ans: 1, exp: 'उत्तर: (ख) महानदी', years: '2023, 2024, 2025' },
    { q: 'रबी की फसल कौन-सी है?', opts: ['धान', 'गेहूँ', 'मक्का', 'कपास'], ans: 1, exp: 'उत्तर: (ख) गेहूँ', years: '2022, 2024, 2025' },
    { q: 'झरिया प्रसिद्ध है—', opts: ['लौह अयस्क', 'कोयला', 'ताँबा', 'बॉक्साइट'], ans: 1, exp: 'उत्तर: (ख) कोयला', years: '2022, 2023, 2025' },
    { q: 'भारत में पंचायती राज (73वाँ संशोधन) कब लागू हुआ?', opts: ['1990 ई.', '1992 ई.', '1995 ई.', '2000 ई.'], ans: 1, exp: 'उत्तर: (ख) 1992 ई.', years: '2022, 2024, 2025' },
    { q: 'आठवीं अनुसूची में कितनी भाषाएँ हैं?', opts: ['18', '20', '22', '24'], ans: 2, exp: 'उत्तर: (ग) 22', years: '2022, 2023, 2024, 2025' },
    { q: 'भारत में दलीय व्यवस्था है—', opts: ['एकदलीय', 'द्विदलीय', 'बहुदलीय', 'कोई नहीं'], ans: 2, exp: 'उत्तर: (ग) बहुदलीय', years: '2023, 2025' },
    { q: 'देश का विकास किस आधार पर मापा जाता है?', opts: ['प्रति व्यक्ति आय', 'साक्षरता', 'स्वास्थ्य', 'उपरोक्त सभी'], ans: 3, exp: 'उत्तर: (घ) उपरोक्त सभी', years: '2022, 2024, 2025' },
    { q: 'कृषि किस क्षेत्रक में आती है?', opts: ['प्राथमिक', 'द्वितीयक', 'तृतीयक', 'चतुर्थक'], ans: 0, exp: 'उत्तर: (क) प्राथमिक', years: '2022, 2023, 2025' },
    { q: 'करेंसी नोट जारी करने का अधिकार है—', opts: ['SBI', 'RBI', 'वित्त मंत्रालय', 'PNB'], ans: 1, exp: 'उत्तर: (ख) RBI', years: '2022, 2023, 2024, 2025' },
    { q: 'WTO की स्थापना कब हुई?', opts: ['1991 ई.', '1995 ई.', '1999 ई.', '2001 ई.'], ans: 1, exp: 'उत्तर: (ख) 1995 ई.', years: '2023, 2024, 2025' },
    { q: 'उपभोक्ता संरक्षण अधिनियम (COPRA) कब बना?', opts: ['1982 ई.', '1986 ई.', '1991 ई.', '1995 ई.'], ans: 1, exp: 'उत्तर: (ख) 1986 ई.', years: '2022, 2024, 2025' },
    { q: "'वंदे मातरम्' के रचयिता हैं—", opts: ['रवींद्रनाथ टैगोर', 'बंकिमचंद्र चट्टोपाध्याय', 'शरदचंद्र', 'अवनींद्रनाथ'], ans: 1, exp: 'उत्तर: (ख) बंकिमचंद्र चट्टोपाध्याय', years: '2022, 2023, 2025' },
    { q: 'प्रोजेक्ट टाइगर कब शुरू हुआ?', opts: ['1970 ई.', '1973 ई.', '1980 ई.', '1986 ई.'], ans: 1, exp: 'उत्तर: (ख) 1973 ई.', years: '2023, 2024' },
    { q: 'बैंकिंग व परिवहन किस क्षेत्रक में आते हैं?', opts: ['प्राथमिक', 'द्वितीयक', 'तृतीयक (सेवा)', 'कृषि'], ans: 2, exp: 'उत्तर: (ग) तृतीयक (सेवा)', years: '2022, 2024, 2025' }
  ],
  Art: [
    { q: 'प्राथमिक (मुख्य) रंग कितने होते हैं?', opts: ['2', '3', '5', '7'], ans: 1, exp: 'उत्तर: (ख) 3', years: '2022, 2023, 2024, 2025' },
    { q: 'ठंडा (शीतल) रंग कौन-सा है?', opts: ['लाल', 'पीला', 'हरा', 'नारंगी'], ans: 2, exp: 'उत्तर: (ग) हरा', years: '2022, 2024, 2025' },
    { q: 'गर्म (उष्ण) रंग कौन-सा है?', opts: ['नीला', 'हरा', 'लाल', 'धानी'], ans: 2, exp: 'उत्तर: (ग) लाल', years: '2022, 2023, 2025' },
    { q: 'ओस्टवाल्ड रंग चक्र में कितने रंग होते हैं?', opts: ['6', '7', '8', '12'], ans: 2, exp: 'उत्तर: (ग) 8', years: '2022, 2023, 2024, 2025' },
    { q: 'इंद्रधनुष में कितने रंग होते हैं?', opts: ['5', '6', '7', '8'], ans: 2, exp: 'उत्तर: (ग) 7', years: '2022, 2024, 2025' },
    { q: 'लाल + पीला मिलाने से कौन-सा रंग बनता है?', opts: ['हरा', 'नारंगी', 'बैंगनी', 'भूरा'], ans: 1, exp: 'उत्तर: (ख) नारंगी', years: '2022, 2023, 2025' },
    { q: 'नीला + पीला मिलाने से कौन-सा रंग बनता है?', opts: ['हरा', 'बैंगनी', 'नारंगी', 'काला'], ans: 0, exp: 'उत्तर: (क) हरा', years: '2022, 2024, 2025' },
    { q: 'लाल + नीला मिलाने से कौन-सा रंग बनता है?', opts: ['हरा', 'नारंगी', 'बैंगनी', 'आसमानी'], ans: 2, exp: 'उत्तर: (ग) बैंगनी', years: '2023, 2024, 2025' },
    { q: 'सबसे गहरी काली रेखा किस पेंसिल से बनती है?', opts: ['2H', 'HB', '2B', '6B'], ans: 3, exp: 'उत्तर: (घ) 6B', years: '2022, 2023, 2024, 2025' },
    { q: 'सबसे हल्की रेखा किस पेंसिल से बनती है?', opts: ['2H', '2B', '4B', '6B'], ans: 0, exp: 'उत्तर: (क) 2H', years: '2022, 2024, 2025' },
    { q: 'तटस्थ रंग कौन-से हैं?', opts: ['लाल-पीला', 'काला-सफ़ेद', 'हरा-नीला', 'नारंगी-बैंगनी'], ans: 1, exp: 'उत्तर: (ख) काला-सफ़ेद', years: '2022, 2023, 2025' },
    { q: 'समबाहु त्रिभुज का प्रत्येक कोण होता है—', opts: ['45°', '60°', '90°', '120°'], ans: 1, exp: 'उत्तर: (ख) 60°', years: '2022, 2024, 2025' },
    { q: 'संपूर्ण कोण कितने अंश का होता है?', opts: ['90°', '180°', '270°', '360°'], ans: 3, exp: 'उत्तर: (घ) 360°', years: '2023, 2025' },
    { q: '1 मीटर में कितने सेंटीमीटर होते हैं?', opts: ['10', '100', '1000', '50'], ans: 1, exp: 'उत्तर: (ख) 100', years: '2022, 2023, 2024, 2025' },
    { q: 'अजंता की गुफाएँ किस राज्य में हैं?', opts: ['MP', 'महाराष्ट्र', 'UP', 'राजस्थान'], ans: 1, exp: 'उत्तर: (ख) महाराष्ट्र', years: '2022, 2023, 2025' },
    { q: 'मुगल चित्रकला का स्वर्ण युग किसका काल था?', opts: ['बाबर', 'अकबर', 'जहाँगीर', 'औरंगज़ेब'], ans: 2, exp: 'उत्तर: (ग) जहाँगीर', years: '2023, 2024, 2025' },
    { q: 'आलेखन में कौन-से रंग उत्तम माने जाते हैं?', opts: ['तेल रंग', 'जल रंग', 'मोम रंग', 'चारकोल'], ans: 1, exp: 'उत्तर: (ख) जल रंग', years: '2022, 2024, 2025' },
    { q: 'वर्ग का प्रत्येक कोण कितने अंश का होता है?', opts: ['45°', '60°', '90°', '120°'], ans: 2, exp: 'उत्तर: (ग) 90°', years: '2022, 2023, 2025' },
    { q: 'लाल रंग का विरोधी रंग है—', opts: ['पीला', 'हरा', 'नीला', 'नारंगी'], ans: 1, exp: 'उत्तर: (ख) हरा', years: '2022, 2023, 2024, 2025' },
    { q: 'पीले रंग का विरोधी रंग है—', opts: ['नीला', 'हरा', 'लाल', 'सफ़ेद'], ans: 0, exp: 'उत्तर: (क) नीला', years: '2022, 2024, 2025' },
    { q: 'स्मृति चित्रण में शेडिंग के लिए उपयुक्त पेंसिल है—', opts: ['2B/4B/6B', 'केवल लाल', 'स्केच पेन', 'ब्रश'], ans: 0, exp: 'उत्तर: (क) 2B/4B/6B', years: '2022, 2024, 2025' }
  ]
};

const OTHER4_10_EN: Record<'Science' | 'Math' | 'Social Science' | 'Art', RawMcq[]> = {
  Science: [
    { q: 'What is the focal length of a plane mirror?', opts: ['Zero', 'Infinity', '25 cm', '-25 cm'], ans: 1, exp: 'Answer: (B) Infinity', years: '2022, 2023, 2024, 2025' },
    { q: 'Least distance of distinct vision for a normal human eye is:', opts: ['25 m', '25 cm', 'Infinity', '2.5 cm'], ans: 1, exp: 'Answer: (B) 25 cm', years: '2022, 2024, 2025' },
    { q: 'SI unit of electric current is:', opts: ['Volt', 'Coulomb', 'Ampere', 'Ohm'], ans: 2, exp: 'Answer: (C) Ampere', years: '2022, 2023, 2025' },
    { q: "Correct formula for Ohm's law is:", opts: ['V = I/R', 'V = I × R', 'R = V × I', 'I = V × R'], ans: 1, exp: 'Answer: (B) V = I × R', years: '2022, 2023, 2024, 2025' },
    { q: 'SI unit of electric power is:', opts: ['Joule', 'Watt', 'Volt', 'Ohm-metre'], ans: 1, exp: 'Answer: (B) Watt', years: '2023, 2024, 2025' },
    { q: 'SI unit of power of a lens is:', opts: ['Metre', 'Dioptre', 'Watt', 'Centimetre'], ans: 1, exp: 'Answer: (B) Dioptre', years: '2022, 2024, 2025' },
    { q: 'SI unit of magnetic field is:', opts: ['Tesla', 'Newton', 'Coulomb', 'Farad'], ans: 0, exp: 'Answer: (A) Tesla', years: '2022, 2023, 2025' },
    { q: 'pH value of pure water is:', opts: ['0', '7', '14', '5'], ans: 1, exp: 'Answer: (B) 7', years: '2022, 2023, 2024, 2025' },
    { q: 'Chemical formula of baking soda is:', opts: ['Na₂CO₃', 'NaHCO₃', 'NaCl', 'CaOCl₂'], ans: 1, exp: 'Answer: (B) NaHCO₃', years: '2022, 2024, 2025' },
    { q: 'Chemical formula of washing soda is:', opts: ['Na₂CO₃·10H₂O', 'NaHCO₃', 'CaSO₄·2H₂O', 'NaOH'], ans: 0, exp: 'Answer: (A) Na₂CO₃·10H₂O', years: '2023, 2024, 2025' },
    { q: 'Chemical formula of Plaster of Paris is:', opts: ['CaSO₄·2H₂O', 'CaSO₄·½H₂O', 'CaCO₃', 'CaO'], ans: 1, exp: 'Answer: (B) CaSO₄·½H₂O', years: '2022, 2023, 2025' },
    { q: 'Which metal is liquid at room temperature?', opts: ['Sodium', 'Mercury', 'Iron', 'Copper'], ans: 1, exp: 'Answer: (B) Mercury', years: '2022, 2024' },
    { q: 'Number of covalent bonds in ethane (C₂H₆) is:', opts: ['6', '7', '8', '9'], ans: 1, exp: 'Answer: (B) 7', years: '2022, 2023, 2025' },
    { q: 'How many chambers are present in the human heart?', opts: ['2', '3', '4', '5'], ans: 2, exp: 'Answer: (C) 4', years: '2022, 2024, 2025' },
    { q: 'In plants, xylem is responsible for transport of:', opts: ['Water', 'Food', 'Amino acids', 'Oxygen'], ans: 0, exp: 'Answer: (A) Water', years: '2022, 2023, 2024, 2025' },
    { q: 'Kidneys in human beings are part of:', opts: ['Nutrition', 'Respiration', 'Excretion', 'Transportation'], ans: 2, exp: 'Answer: (C) Excretion', years: '2022, 2024, 2025' },
    { q: 'Autotrophic nutrition requires:', opts: ['CO₂ and water', 'Chlorophyll', 'Sunlight', 'All of these'], ans: 3, exp: 'Answer: (D) All of these', years: '2022, 2023, 2025' },
    { q: 'Mendel conducted his inheritance experiments on:', opts: ['Hibiscus', 'Garden pea', 'Rose', 'Mustard'], ans: 1, exp: 'Answer: (B) Garden pea', years: '2022, 2023, 2024, 2025' },
    { q: 'Which gland is called the master gland?', opts: ['Thyroid', 'Pituitary gland', 'Adrenal', 'Pancreas'], ans: 1, exp: 'Answer: (B) Pituitary gland', years: '2023, 2024, 2025' },
    { q: 'Main gas responsible for ozone layer depletion is:', opts: ['CFC', 'Oxygen', 'Nitrogen', 'Helium'], ans: 0, exp: 'Answer: (A) CFC', years: '2022, 2024, 2025' },
    { q: 'SI unit of electrical resistivity is:', opts: ['Ohm', 'Ohm-metre', 'Volt/metre', 'Ampere'], ans: 1, exp: 'Answer: (B) Ohm-metre', years: '2022, 2024, 2025' },
    { q: 'pH of an acidic solution is:', opts: ['Less than 7', 'Equal to 7', 'Greater than 7', '14'], ans: 0, exp: 'Answer: (A) Less than 7', years: '2022, 2023, 2025' },
    { q: 'Lens used to correct myopia (near-sightedness) is:', opts: ['Convex lens', 'Concave lens', 'Cylindrical', 'Bifocal'], ans: 1, exp: 'Answer: (B) Concave lens', years: '2022, 2023, 2024, 2025' }
  ],
  Math: [
    { q: 'Decimal expansion of 14587 / 1250 terminates after how many places?', opts: ['1', '2', '3', '4'], ans: 3, exp: 'Answer: (D) 4', years: '2022, 2024, 2025' },
    { q: 'If HCF = 18, LCM = 360 and one number is 72, the other number is:', opts: ['90', '45', '180', '36'], ans: 0, exp: 'Answer: (A) 90', years: '2022, 2023, 2025' },
    { q: 'Sum of zeroes of quadratic polynomial x² - 5x + 6 is:', opts: ['-5', '5', '6', '-6'], ans: 1, exp: 'Answer: (B) 5', years: '2022, 2024, 2025' },
    { q: 'In 2x + 3y = 12, if x = 3 then y equals:', opts: ['1', '2', '3', '4'], ans: 1, exp: 'Answer: (B) 2', years: '2023, 2024, 2025' },
    { q: 'If x² + kx + 4 = 0 has equal roots, value of k is:', opts: ['±2', '±4', '±8', '0'], ans: 1, exp: 'Answer: (B) ±4', years: '2022, 2023, 2024, 2025' },
    { q: '10th term of AP: 3, 7, 11, 15, ... is:', opts: ['39', '43', '35', '40'], ans: 0, exp: 'Answer: (A) 39', years: '2022, 2024, 2025' },
    { q: 'Distance of point (3, 4) from origin (0, 0) is:', opts: ['3', '4', '5', '7'], ans: 2, exp: 'Answer: (C) 5', years: '2022, 2023, 2024, 2025' },
    { q: 'Mid-point of segment joining (2, 3) and (4, 1) is:', opts: ['(3, 2)', '(6, 4)', '(2, 2)', '(3, 4)'], ans: 0, exp: 'Answer: (A) (3, 2)', years: '2023, 2025' },
    { q: 'If sin A = 3/5, value of cos A is:', opts: ['4/5', '3/4', '5/3', '5/4'], ans: 0, exp: 'Answer: (A) 4/5', years: '2022, 2024, 2025' },
    { q: 'Value of tan 45° + cot 45° is:', opts: ['0', '1', '2', '√2'], ans: 2, exp: 'Answer: (C) 2', years: '2022, 2023, 2025' },
    { q: '9 sec² A - 9 tan² A equals:', opts: ['1', '9', '8', '0'], ans: 1, exp: 'Answer: (B) 9', years: '2022, 2023, 2024, 2025' },
    { q: 'Ratio of sides of similar triangles is 4 : 9; ratio of areas is:', opts: ['2 : 3', '4 : 9', '16 : 81', '81 : 16'], ans: 2, exp: 'Answer: (C) 16 : 81', years: '2022, 2024, 2025' },
    { q: 'How many tangents can be drawn at a point on a circle?', opts: ['One', 'Two', 'Infinite', 'Zero'], ans: 0, exp: 'Answer: (A) One', years: '2023, 2024, 2025' },
    { q: 'Area of a circle of radius 7 cm is:', opts: ['44 cm²', '154 cm²', '308 cm²', '77 cm²'], ans: 1, exp: 'Answer: (B) 154 cm²', years: '2022, 2023, 2025' },
    { q: 'Volume of cuboid (5 × 4 × 3 cm) is:', opts: ['12 cm³', '60 cm³', '47 cm³', '94 cm³'], ans: 1, exp: 'Answer: (B) 60 cm³', years: '2022, 2024' },
    { q: 'Mean of 2, 4, 6, 8, 10 is:', opts: ['5', '6', '7', '8'], ans: 1, exp: 'Answer: (B) 6', years: '2022, 2023, 2024, 2025' },
    { q: 'Mode of 3, 5, 7, 5, 9, 5, 2 is:', opts: ['3', '5', '7', '9'], ans: 1, exp: 'Answer: (B) 5', years: '2022, 2024, 2025' },
    { q: 'Probability of getting an even number on a single die throw:', opts: ['1/6', '1/3', '1/2', '2/3'], ans: 2, exp: 'Answer: (C) 1/2', years: '2022, 2023, 2024, 2025' },
    { q: 'Probability of an impossible event is:', opts: ['1', '0', '0.5', '-1'], ans: 1, exp: 'Answer: (B) 0', years: '2023, 2025' },
    { q: 'sin 60° cos 30° + sin 30° cos 60° equals:', opts: ['0', '1', '1/2', '√3/2'], ans: 1, exp: 'Answer: (B) 1', years: '2022, 2024, 2025' },
    { q: 'Total surface area of a sphere of radius r is:', opts: ['2πr²', '3πr²', '4πr²', '4/3 πr³'], ans: 2, exp: 'Answer: (C) 4πr²', years: '2022, 2025' },
    { q: 'Mode = 3 Median - ____', opts: ['2 Mean', '3 Mean', 'Mean', '4 Mean'], ans: 0, exp: 'Answer: (A) 2 Mean', years: '2022, 2023, 2024, 2025' },
    { q: 'If tan A = 1, angle A is:', opts: ['30°', '45°', '60°', '90°'], ans: 1, exp: 'Answer: (B) 45°', years: '2023, 2025' }
  ],
  'Social Science': [
    { q: 'In which year did the French Revolution occur?', opts: ['1789', '1776', '1815', '1848'], ans: 0, exp: 'Answer: (A) 1789', years: '2022, 2023, 2024, 2025' },
    { q: 'Who founded Young Italy society?', opts: ['Garibaldi', 'Bismarck', 'Cavour', 'Giuseppe Mazzini'], ans: 3, exp: 'Answer: (D) Giuseppe Mazzini', years: '2022, 2024, 2025' },
    { q: 'When did Mahatma Gandhi return to India from South Africa?', opts: ['1915', '1917', '1919', '1920'], ans: 0, exp: 'Answer: (A) 1915', years: '2022, 2023, 2025' },
    { q: 'In which year did the Chauri Chaura incident happen?', opts: ['1920', '1921', '1922', '1930'], ans: 2, exp: 'Answer: (C) 1922', years: '2022, 2024, 2025' },
    { q: 'When did the Jallianwala Bagh massacre take place?', opts: ['13 April 1919', '13 April 1920', '15 Aug 1919', '26 Jan 1930'], ans: 0, exp: 'Answer: (A) 13 April 1919', years: '2022, 2023, 2024, 2025' },
    { q: 'When did the Civil Disobedience Movement begin?', opts: ['1920', '1930', '1942', '1928'], ans: 1, exp: 'Answer: (B) 1930', years: '2023, 2024, 2025' },
    { q: 'Most widespread soil in India is:', opts: ['Black soil', 'Alluvial soil', 'Red soil', 'Laterite soil'], ans: 1, exp: 'Answer: (B) Alluvial soil', years: '2022, 2024, 2025' },
    { q: 'Soil most suitable for cotton cultivation is:', opts: ['Black soil (Regur)', 'Alluvial soil', 'Mountain soil', 'Arid soil'], ans: 0, exp: 'Answer: (A) Black soil (Regur)', years: '2022, 2023, 2024, 2025' },
    { q: 'Chipko Movement is related to:', opts: ['Soil conservation', 'Forest conservation', 'Water conservation', 'Air conservation'], ans: 1, exp: 'Answer: (B) Forest conservation', years: '2022, 2023, 2025' },
    { q: 'Hirakud dam is built on which river?', opts: ['Sutlej', 'Mahanadi', 'Narmada', 'Krishna'], ans: 1, exp: 'Answer: (B) Mahanadi', years: '2023, 2024, 2025' },
    { q: 'Which one is a Rabi crop?', opts: ['Paddy', 'Wheat', 'Maize', 'Cotton'], ans: 1, exp: 'Answer: (B) Wheat', years: '2022, 2024, 2025' },
    { q: 'Jharia is famous for:', opts: ['Iron ore', 'Coal', 'Copper', 'Bauxite'], ans: 1, exp: 'Answer: (B) Coal', years: '2022, 2023, 2025' },
    { q: '73rd Constitutional Amendment (Panchayati Raj) came in:', opts: ['1990', '1992', '1995', '2000'], ans: 1, exp: 'Answer: (B) 1992', years: '2022, 2024, 2025' },
    { q: 'How many languages are in the Eighth Schedule of India?', opts: ['18', '20', '22', '24'], ans: 2, exp: 'Answer: (C) 22', years: '2022, 2023, 2024, 2025' },
    { q: 'India has which party system?', opts: ['One-party', 'Two-party', 'Multi-party', 'None'], ans: 2, exp: 'Answer: (C) Multi-party', years: '2023, 2025' },
    { q: 'Development of a country is measured by:', opts: ['Per capita income', 'Literacy rate', 'Health status', 'All of these'], ans: 3, exp: 'Answer: (D) All of these', years: '2022, 2024, 2025' },
    { q: 'Agriculture belongs to which sector?', opts: ['Primary', 'Secondary', 'Tertiary', 'Quaternary'], ans: 0, exp: 'Answer: (A) Primary', years: '2022, 2023, 2025' },
    { q: 'Authority to issue currency notes in India is with:', opts: ['SBI', 'RBI', 'Finance Ministry', 'PNB'], ans: 1, exp: 'Answer: (B) RBI', years: '2022, 2023, 2024, 2025' },
    { q: 'When was WTO established?', opts: ['1991', '1995', '1999', '2001'], ans: 1, exp: 'Answer: (B) 1995', years: '2023, 2024, 2025' },
    { q: 'Consumer Protection Act (COPRA) was enacted in:', opts: ['1982', '1986', '1991', '1995'], ans: 1, exp: 'Answer: (B) 1986', years: '2022, 2024, 2025' },
    { q: "Who composed 'Vande Mataram'?", opts: ['Rabindranath Tagore', 'Bankim Chandra Chattopadhyay', 'Saratchandra', 'Abanindranath'], ans: 1, exp: 'Answer: (B) Bankim Chandra Chattopadhyay', years: '2022, 2023, 2025' },
    { q: 'Project Tiger was launched in:', opts: ['1970', '1973', '1980', '1986'], ans: 1, exp: 'Answer: (B) 1973', years: '2023, 2024' },
    { q: 'Banking and transport belong to:', opts: ['Primary', 'Secondary', 'Tertiary (Service)', 'Agriculture'], ans: 2, exp: 'Answer: (C) Tertiary (Service)', years: '2022, 2024, 2025' }
  ],
  Art: [
    { q: 'How many primary colours are there?', opts: ['2', '3', '5', '7'], ans: 1, exp: 'Answer: (B) 3', years: '2022, 2023, 2024, 2025' },
    { q: 'Which one is a cool colour?', opts: ['Red', 'Yellow', 'Green', 'Orange'], ans: 2, exp: 'Answer: (C) Green', years: '2022, 2024, 2025' },
    { q: 'Which one is a warm colour?', opts: ['Blue', 'Green', 'Red', 'Light green'], ans: 2, exp: 'Answer: (C) Red', years: '2022, 2023, 2025' },
    { q: 'How many colours are in Ostwald colour wheel?', opts: ['6', '7', '8', '12'], ans: 2, exp: 'Answer: (C) 8', years: '2022, 2023, 2024, 2025' },
    { q: 'How many colours are in a rainbow?', opts: ['5', '6', '7', '8'], ans: 2, exp: 'Answer: (C) 7', years: '2022, 2024, 2025' },
    { q: 'Mixing Red and Yellow produces:', opts: ['Green', 'Orange', 'Violet', 'Brown'], ans: 1, exp: 'Answer: (B) Orange', years: '2022, 2023, 2025' },
    { q: 'Mixing Blue and Yellow produces:', opts: ['Green', 'Violet', 'Orange', 'Black'], ans: 0, exp: 'Answer: (A) Green', years: '2022, 2024, 2025' },
    { q: 'Mixing Red and Blue produces:', opts: ['Green', 'Orange', 'Violet', 'Sky blue'], ans: 2, exp: 'Answer: (C) Violet', years: '2023, 2024, 2025' },
    { q: 'Which pencil gives the darkest black line?', opts: ['2H', 'HB', '2B', '6B'], ans: 3, exp: 'Answer: (D) 6B', years: '2022, 2023, 2024, 2025' },
    { q: 'Which pencil gives the lightest line?', opts: ['2H', '2B', '4B', '6B'], ans: 0, exp: 'Answer: (A) 2H', years: '2022, 2024, 2025' },
    { q: 'Neutral colours are:', opts: ['Red & Yellow', 'Black & White', 'Green & Blue', 'Orange & Violet'], ans: 1, exp: 'Answer: (B) Black & White', years: '2022, 2023, 2025' },
    { q: 'Each angle of an equilateral triangle is:', opts: ['45°', '60°', '90°', '120°'], ans: 1, exp: 'Answer: (B) 60°', years: '2022, 2024, 2025' },
    { q: 'A complete angle measures:', opts: ['90°', '180°', '270°', '360°'], ans: 3, exp: 'Answer: (D) 360°', years: '2023, 2025' },
    { q: 'How many centimetres make 1 metre?', opts: ['10', '100', '1000', '50'], ans: 1, exp: 'Answer: (B) 100', years: '2022, 2023, 2024, 2025' },
    { q: 'Ajanta caves are located in:', opts: ['MP', 'Maharashtra', 'UP', 'Rajasthan'], ans: 1, exp: 'Answer: (B) Maharashtra', years: '2022, 2023, 2025' },
    { q: 'Mughal painting peaked under which ruler?', opts: ['Babur', 'Akbar', 'Jahangir', 'Aurangzeb'], ans: 2, exp: 'Answer: (C) Jahangir', years: '2023, 2024, 2025' },
    { q: 'Which colours are best suited for Alekhan (design)?', opts: ['Oil colour', 'Water colour', 'Wax colour', 'Charcoal'], ans: 1, exp: 'Answer: (B) Water colour', years: '2022, 2024, 2025' },
    { q: 'Each angle of a square is:', opts: ['45°', '60°', '90°', '120°'], ans: 2, exp: 'Answer: (C) 90°', years: '2022, 2023, 2025' },
    { q: 'Complementary (opposite) colour of Red is:', opts: ['Yellow', 'Green', 'Blue', 'Orange'], ans: 1, exp: 'Answer: (B) Green', years: '2022, 2023, 2024, 2025' },
    { q: 'Complementary colour of Yellow is:', opts: ['Blue', 'Green', 'Red', 'White'], ans: 0, exp: 'Answer: (A) Blue', years: '2022, 2024, 2025' },
    { q: 'Best pencils for shading in memory drawing are:', opts: ['2B/4B/6B', 'Only red', 'Sketch pen', 'Brush'], ans: 0, exp: 'Answer: (A) 2B/4B/6B', years: '2022, 2024, 2025' }
  ]
};

/* ==================== CLASS 12TH MCQ BANKS ==================== */

const HINDI_12_MCQS: RawMcq[] = [
  { q: "'अशोक के फूल' निबंध के लेखक कौन हैं?", opts: ['हजारीप्रसाद द्विवेदी', 'वासुदेवशरण अग्रवाल', 'रामचंद्र शुक्ल', 'हरिशंकर परसाई'], ans: 0, exp: 'उत्तर: (क) हजारीप्रसाद द्विवेदी', years: '2022, 2024, 2025' },
  { q: "'राष्ट्र का स्वरूप' निबंध किस संग्रह से लिया गया है?", opts: ['पृथ्वीपुत्र', 'कल्पलता', 'कला और संस्कृति', 'वाग्धारा'], ans: 0, exp: 'उत्तर: (क) पृथ्वीपुत्र', years: '2022, 2023, 2025' },
  { q: "'कामायनी' किस युग का महाकाव्य है?", opts: ['छायावाद', 'द्विवेदी युग', 'प्रगतिवाद', 'रीतिकाल'], ans: 0, exp: 'उत्तर: (क) छायावाद', years: '2022, 2023, 2024, 2025' },
  { q: "'पवन दूतिका' प्रसंग किस महाकाव्य का अंश है?", opts: ['प्रियप्रवास', 'साकेत', 'कामायनी', 'उर्वशी'], ans: 0, exp: 'उत्तर: (क) प्रियप्रवास (अयोध्यासिंह उपाध्याय हरिऔध)', years: '2022, 2024, 2025' },
  { q: "'नौका विहार' कविता के रचयिता कौन हैं?", opts: ['सुमित्रानंदन पंत', 'निराला', 'महादेवी वर्मा', 'जयशंकर प्रसाद'], ans: 0, exp: 'उत्तर: (क) सुमित्रानंदन पंत', years: '2023, 2024, 2025' },
  { q: "'तार सप्तक' का संपादन किसने किया?", opts: ['अज्ञेय', 'मुक्तिबोध', 'दिनकर', 'नागार्जुन'], ans: 0, exp: 'उत्तर: (क) सच्चिदानंद हीरानंद वात्स्यायन अज्ञेय (1943 ई.)', years: '2022, 2023, 2025' },
  { q: "'पंचलाइट' कहानी के लेखक कौन हैं?", opts: ['फणीश्वरनाथ रेणु', 'अमरकांत', 'जैनेंद्र कुमार', 'शिवानी'], ans: 0, exp: 'उत्तर: (क) फणीश्वरनाथ रेणु', years: '2022, 2024, 2025' },
  { q: "'बहादुर' कहानी के लेखक कौन हैं?", opts: ['अमरकांत', 'प्रेमचंद', 'यशपाल', 'इलाचंद्र जोशी'], ans: 0, exp: 'उत्तर: (क) अमरकांत', years: '2022, 2023, 2025' },
  { q: "'आवारा मसीहा' किसकी जीवनी पर आधारित है?", opts: ['शरतचंद्र चट्टोपाध्याय', 'प्रेमचंद', 'निराला', 'भारतेंदु'], ans: 0, exp: 'उत्तर: (क) शरतचंद्र चट्टोपाध्याय (लेखक: विष्णु प्रभाकर)', years: '2023, 2024, 2025' },
  { q: "'चिंतामणि' किसकी रचना है?", opts: ['आचार्य रामचंद्र शुक्ल', 'महावीरप्रसाद द्विवेदी', 'श्यामसुंदर दास', 'गुलाबराय'], ans: 0, exp: 'उत्तर: (क) आचार्य रामचंद्र शुक्ल', years: '2022, 2024' },
  { q: 'वीर रस का स्थायी भाव क्या है?', opts: ['उत्साह', 'क्रोध', 'शोक', 'भय'], ans: 0, exp: 'उत्तर: (क) उत्साह', years: '2022, 2023, 2025' },
  { q: 'शृंगार रस का स्थायी भाव क्या है?', opts: ['रति', 'हास', 'निर्वेद', 'विस्मय'], ans: 0, exp: 'उत्तर: (क) रति', years: '2022, 2024, 2025' },
  { q: 'चौपाई छंद के प्रत्येक चरण में कितनी मात्राएँ होती हैं?', opts: ['16', '24', '13', '11'], ans: 0, exp: 'उत्तर: (क) 16', years: '2022, 2023, 2024, 2025' },
  { q: 'दोहा के पहले और तीसरे चरण में कितनी मात्राएँ होती हैं?', opts: ['13-13', '11-11', '16-16', '24-24'], ans: 0, exp: 'उत्तर: (क) 13-13', years: '2023, 2025' },
  { q: "'कनक-कनक ते सौ गुनी' में कौन-सा अलंकार है?", opts: ['यमक', 'श्लेष', 'उपमा', 'रूपक'], ans: 0, exp: 'उत्तर: (क) यमक अलंकार', years: '2022, 2023, 2024, 2025' },
  { q: "'रहिमन पानी राखिए' में कौन-सा अलंकार है?", opts: ['श्लेष', 'यमक', 'उत्प्रेक्षा', 'संदेह'], ans: 0, exp: 'उत्तर: (क) श्लेष अलंकार', years: '2022, 2024, 2025' },
  { q: "'पावकः' का सही संधि-विच्छेद है—", opts: ['पौ + अकः', 'पो + अकः', 'पा + वकः', 'प + आवकः'], ans: 0, exp: 'उत्तर: (क) पौ + अकः (अयादि संधि)', years: '2022, 2023, 2025' },
  { q: "'विद्यालयः' में कौन-सी संधि है?", opts: ['दीर्घ स्वर संधि', 'गुण संधि', 'वृद्धि संधि', 'यण संधि'], ans: 0, exp: 'उत्तर: (क) विद्या + आलयः (दीर्घ संधि)', years: '2022, 2024, 2025' },
  { q: "'प्रतिदिनम्' में कौन-सा समास है?", opts: ['अव्ययीभाव', 'तत्पुरुष', 'द्वंद्व', 'कर्मधारय'], ans: 0, exp: 'उत्तर: (क) अव्ययीभाव समास', years: '2023, 2024, 2025' },
  { q: "'जिसका कोई शत्रु न जन्मा हो' वाक्यांश के लिए एक शब्द है—", opts: ['अजातशत्रु', 'अजेय', 'अमर', 'अविनाशी'], ans: 0, exp: 'उत्तर: (क) अजातशत्रु', years: '2022, 2023, 2025' },
  { q: "'अंधे की लकड़ी' मुहावरे का अर्थ है—", opts: ['एकमात्र सहारा', 'कमजोर व्यक्ति', 'अंधा होना', 'कठिन कार्य'], ans: 0, exp: 'उत्तर: (क) एकमात्र सहारा', years: '2022, 2024, 2025' },
  { q: "'उर्वशी' किस कवि की प्रसिद्ध कृति है?", opts: ['रामधारी सिंह दिनकर', 'अज्ञेय', 'पंत', 'निराला'], ans: 0, exp: 'उत्तर: (क) रामधारी सिंह दिनकर', years: '2022, 2023, 2025' }
];

const ENGLISH_12_MCQS: RawMcq[] = [
  { q: "Who is the author of 'The Last Lesson'?", opts: ['Alphonse Daudet', 'Anees Jung', 'William Douglas', 'Selma Lagerlof'], ans: 0, exp: 'Answer: (A) Alphonse Daudet', years: '2022, 2023, 2024, 2025' },
  { q: 'For how many years had M. Hamel taught in the school?', opts: ['40 years', '30 years', '25 years', '20 years'], ans: 0, exp: 'Answer: (A) 40 years', years: '2022, 2024, 2025' },
  { q: 'Saheb-e-Alam in "Lost Spring" was a:', opts: ['Ragpicker', 'Bangle maker', 'Farmer', 'Tailor'], ans: 0, exp: 'Answer: (A) Ragpicker', years: '2022, 2023, 2025' },
  { q: 'Firozabad is famous for:', opts: ['Glass bangles', 'Silk sarees', 'Brassware', 'Carpets'], ans: 0, exp: 'Answer: (A) Glass bangles', years: '2022, 2024, 2025' },
  { q: "Who is the author of 'Deep Water'?", opts: ['William O. Douglas', 'Louis Fischer', 'Asokamitran', 'Christopher Silvester'], ans: 0, exp: 'Answer: (A) William O. Douglas', years: '2023, 2024, 2025' },
  { q: 'What did the peddler in "The Rattrap" compare the world to?', opts: ['A big rattrap', 'A prison', 'A forest', 'A marketplace'], ans: 0, exp: 'Answer: (A) A big rattrap', years: '2022, 2023, 2025' },
  { q: 'Where did Gandhiji launch the Indigo movement in 1917?', opts: ['Champaran', 'Kheda', 'Ahmedabad', 'Bardoli'], ans: 0, exp: 'Answer: (A) Champaran', years: '2022, 2023, 2024, 2025' },
  { q: "Who is the poet of 'My Mother at Sixty-Six'?", opts: ['Kamala Das', 'Pablo Neruda', 'John Keats', 'Adrienne Rich'], ans: 0, exp: 'Answer: (A) Kamala Das', years: '2022, 2024, 2025' },
  { q: "In 'Keeping Quiet', up to what number does Pablo Neruda ask us to count?", opts: ['Twelve', 'Ten', 'Twenty', 'Hundred'], ans: 0, exp: 'Answer: (A) Twelve', years: '2022, 2023, 2025' },
  { q: "Who wrote 'A Thing of Beauty'?", opts: ['John Keats', 'William Wordsworth', 'P.B. Shelley', 'Robert Frost'], ans: 0, exp: 'Answer: (A) John Keats', years: '2022, 2023, 2024, 2025' },
  { q: 'What was the name of the third level in "The Third Level"?', opts: ['Grand Central Station', 'Victoria Terminus', 'Waterloo', 'Central Park'], ans: 0, exp: 'Answer: (A) Grand Central Station', years: '2023, 2025' },
  { q: 'How many tigers did the Maharaja of Pratibandapuram vow to kill?', opts: ['100 tigers', '50 tigers', '99 tigers', '75 tigers'], ans: 0, exp: 'Answer: (A) 100 tigers', years: '2022, 2024, 2025' },
  { q: 'Who was Dr. Sadao Hoki in "The Enemy"?', opts: ['A Japanese surgeon', 'An American soldier', 'A German general', 'A British diplomat'], ans: 0, exp: 'Answer: (A) A Japanese surgeon', years: '2022, 2023, 2025' },
  { q: 'One who looks at the bright side of things is called:', opts: ['Optimist', 'Pessimist', 'Atheist', 'Fatalist'], ans: 0, exp: 'Answer: (A) Optimist', years: '2022, 2023, 2024, 2025' },
  { q: 'One who cannot read or write is:', opts: ['Illiterate', 'Illegible', 'Ineligible', 'Invisible'], ans: 0, exp: 'Answer: (A) Illiterate', years: '2022, 2024, 2025' },
  { q: "Meaning of the idiom 'A bone of contention':", opts: ['Cause of quarrel', 'Close friend', 'Easy task', 'Sudden danger'], ans: 0, exp: 'Answer: (A) Cause of quarrel', years: '2022, 2023, 2025' },
  { q: "Synonym of 'Bane' is:", opts: ['Curse', 'Boon', 'Blessing', 'Profit'], ans: 0, exp: 'Answer: (A) Curse', years: '2023, 2024, 2025' },
  { q: "Antonym of 'Virtue' is:", opts: ['Vice', 'Goodness', 'Merit', 'Honesty'], ans: 0, exp: 'Answer: (A) Vice', years: '2022, 2024, 2025' },
  { q: 'He is senior ____ me by two years.', opts: ['to', 'than', 'from', 'with'], ans: 0, exp: 'Answer: (A) to', years: '2022, 2023, 2024, 2025' },
  { q: 'Neither Ram nor his friends ____ present.', opts: ['were', 'was', 'is', 'has'], ans: 0, exp: 'Answer: (A) were', years: '2022, 2024, 2025' },
  { q: 'A government by the people is called:', opts: ['Democracy', 'Autocracy', 'Monarchy', 'Bureaucracy'], ans: 0, exp: 'Answer: (A) Democracy', years: '2022, 2023, 2025' }
];

const OTHER4_12_HI: Record<'Physics' | 'Chemistry' | 'Biology' | 'Math', RawMcq[]> = {
  Physics: [
    { q: 'विद्युतशीलता (ε₀) का SI मात्रक क्या है?', opts: ['कूलॉम² / न्यूटन-मीटर²', 'न्यूटन-मीटर² / कूलॉम²', 'न्यूटन / कूलॉम', 'वोल्ट / मीटर'], ans: 0, exp: 'उत्तर: (क) कूलॉम² / न्यूटन-मीटर²', years: '2022, 2023, 2024, 2025' },
    { q: 'विद्युत फ्लक्स का मात्रक है—', opts: ['वोल्ट-मीटर', 'वेबर', 'टेस्ला', 'जूल/कूलॉम'], ans: 0, exp: 'उत्तर: (क) वोल्ट-मीटर', years: '2022, 2024, 2025' },
    { q: 'विशिष्ट प्रतिरोध (प्रतिरोधकता) का मात्रक है—', opts: ['ओम-मीटर', 'ओम/मीटर', 'ओम⁻¹', 'वोल्ट-ऐम्पियर'], ans: 0, exp: 'उत्तर: (क) ओम-मीटर', years: '2022, 2023, 2025' },
    { q: 'किरचॉफ का प्रथम नियम किस संरक्षण पर आधारित है?', opts: ['आवेश संरक्षण', 'ऊर्जा संरक्षण', 'संवेग संरक्षण', 'द्रव्यमान संरक्षण'], ans: 0, exp: 'उत्तर: (क) आवेश संरक्षण', years: '2022, 2023, 2024, 2025' },
    { q: 'किरचॉफ का द्वितीय नियम किस संरक्षण पर आधारित है?', opts: ['ऊर्जा संरक्षण', 'आवेश संरक्षण', 'कोणीय संवेग', 'बल संरक्षण'], ans: 0, exp: 'उत्तर: (क) ऊर्जा संरक्षण', years: '2022, 2024, 2025' },
    { q: 'चुंबकीय फ्लक्स का SI मात्रक है—', opts: ['वेबर', 'टेस्ला', 'हेनरी', 'गॉस'], ans: 0, exp: 'उत्तर: (क) वेबर', years: '2022, 2023, 2025' },
    { q: 'स्वप्रेरकत्व (Self-inductance) का मात्रक है—', opts: ['हेनरी', 'फैराडे', 'वेबर', 'ओम'], ans: 0, exp: 'उत्तर: (क) हेनरी', years: '2023, 2024, 2025' },
    { q: 'लेन्ज का नियम किसके संरक्षण के अनुरूप है?', opts: ['ऊर्जा संरक्षण', 'आवेश संरक्षण', 'संवेग संरक्षण', 'द्रव्यमान'], ans: 0, exp: 'उत्तर: (क) ऊर्जा संरक्षण', years: '2022, 2023, 2024, 2025' },
    { q: 'विद्युत चुंबकीय तरंगों की प्रकृति होती है—', opts: ['अनुप्रस्थ', 'अनुदैर्ध्य', 'यांत्रिक', 'अप्रगामी'], ans: 0, exp: 'उत्तर: (क) अनुप्रस्थ', years: '2022, 2024, 2025' },
    { q: 'पूर्ण आंतरिक परावर्तन के लिए प्रकाश किरण जाती है—', opts: ['सघन से विरल माध्यम में', 'विरल से सघन में', 'निर्वात से काँच में', 'वायु से जल में'], ans: 0, exp: 'उत्तर: (क) सघन से विरल माध्यम में', years: '2022, 2023, 2025' },
    { q: 'यदि +2D और -1D क्षमता के दो लेंस संपर्क में रखे हों, तो संयुक्त क्षमता होगी—', opts: ['+1D', '+3D', '-3D', '+2D'], ans: 0, exp: 'उत्तर: (क) P = +2 - 1 = +1D', years: '2022, 2024, 2025' },
    { q: 'प्रकाश तरंगों के व्यतिकरण के लिए दोनों स्रोतों का होना आवश्यक है—', opts: ['कला संबद्ध (Coherent)', 'असंबद्ध', 'भिन्न आवृत्ति', 'भिन्न वेग'], ans: 0, exp: 'उत्तर: (क) कला संबद्ध', years: '2023, 2024, 2025' },
    { q: 'प्लांक नियतांक (h) का मात्रक है—', opts: ['जूल-सेकंड', 'जूल/सेकंड', 'न्यूटन-मीटर', 'वाट-सेकंड'], ans: 0, exp: 'उत्तर: (क) जूल-सेकंड', years: '2022, 2023, 2024, 2025' },
    { q: 'de-Broglie तरंगदैर्ध्य λ का सूत्र है—', opts: ['h / mv', 'mv / h', 'h × mv', 'h / c'], ans: 0, exp: 'उत्तर: (क) λ = h / p = h / mv', years: '2022, 2024, 2025' },
    { q: 'हाइड्रोजन परमाणु की मूल अवस्था में ऊर्जा होती है—', opts: ['-13.6 eV', '+13.6 eV', '-3.4 eV', '-1.51 eV'], ans: 0, exp: 'उत्तर: (क) -13.6 eV', years: '2022, 2023, 2025' },
    { q: 'नाभिकीय रिएक्टर में मंदक के रूप में प्रयुक्त होता है—', opts: ['भारी जल (D₂O)', 'कैडमियम छड़', 'यूरेनियम', 'सोडियम'], ans: 0, exp: 'उत्तर: (क) भारी जल या ग्रेफाइट', years: '2023, 2024, 2025' },
    { q: 'p-प्रकार के अर्धचालक में बहुसंख्यक आवेश वाहक होते हैं—', opts: ['कोटर (Holes)', 'इलेक्ट्रॉन', 'प्रोटॉन', 'न्यूट्रॉन'], ans: 0, exp: 'उत्तर: (क) कोटर (Holes)', years: '2022, 2023, 2024, 2025' },
    { q: 'n-प्रकार के अर्धचालक बनाने के लिए जर्मेनियम में मिलाया जाता है—', opts: ['पंचसंयोजी अशुद्धि (As/Sb)', 'त्रिसंयोजी अशुद्धि (B/Al)', 'कार्बन', 'ताँबा'], ans: 0, exp: 'उत्तर: (क) पंचसंयोजी अशुद्धि', years: '2022, 2024, 2025' },
    { q: 'संधारित्र की धारिता का SI मात्रक है—', opts: ['फैरड', 'हेनरी', 'कूलॉम', 'वोल्ट'], ans: 0, exp: 'उत्तर: (क) फैरड', years: '2022, 2023, 2025' },
    { q: '1 eV का मान जूल में होता है—', opts: ['1.6 × 10⁻¹⁹ J', '9.1 × 10⁻³¹ J', '6.6 × 10⁻³⁴ J', '3 × 10⁸ J'], ans: 0, exp: 'उत्तर: (क) 1.6 × 10⁻¹⁹ J', years: '2022, 2023, 2024, 2025' },
    { q: 'सूर्य की ऊर्जा का मुख्य स्रोत है—', opts: ['नाभिकीय संलयन', 'नाभिकीय विखंडन', 'रासायनिक दहन', 'रेडियोधर्मिता'], ans: 0, exp: 'उत्तर: (क) नाभिकीय संलयन', years: '2022, 2024, 2025' }
  ],
  Chemistry: [
    { q: 'मोलरता (Molarity) की इकाई क्या है?', opts: ['मोल / लीटर', 'मोल / किग्रा', 'ग्राम / लीटर', 'मोल⁻¹'], ans: 0, exp: 'उत्तर: (क) मोल / लीटर', years: '2022, 2023, 2024, 2025' },
    { q: 'मोललता (Molality) की इकाई है—', opts: ['मोल / किग्रा विलायक', 'मोल / लीटर विलयन', 'ग्राम / मोल', 'लीटर / मोल'], ans: 0, exp: 'उत्तर: (क) मोल / किग्रा', years: '2022, 2024, 2025' },
    { q: 'शून्य कोटि की अभिक्रिया के वेग स्थिरांक का मात्रक है—', opts: ['मोल लीटर⁻¹ सेकंड⁻¹', 'सेकंड⁻¹', 'लीटर मोल⁻¹ सेकंड⁻¹', 'मोल² सेकंड⁻¹'], ans: 0, exp: 'उत्तर: (क) मोल लीटर⁻¹ सेकंड⁻¹', years: '2022, 2023, 2024, 2025' },
    { q: 'प्रथम कोटि की अभिक्रिया के वेग स्थिरांक का मात्रक है—', opts: ['सेकंड⁻¹', 'मोल लीटर⁻¹ सेकंड⁻¹', 'लीटर मोल⁻¹', 'मोल⁻¹'], ans: 0, exp: 'उत्तर: (क) सेकंड⁻¹ (समय⁻¹)', years: '2022, 2023, 2025' },
    { q: 'प्रथम कोटि की अभिक्रिया के लिए अर्ध-आयुकाल (t₁/₂) होता है—', opts: ['0.693 / k', 'k / 0.693', '1 / k', '2.303 / k'], ans: 0, exp: 'उत्तर: (क) t₁/₂ = 0.693 / k', years: '2022, 2024, 2025' },
    { q: 'निम्न में कौन-सा आयन रंगीन होता है?', opts: ['Cu²⁺', 'Zn²⁺', 'Sc³⁺', 'Ti⁴⁺'], ans: 0, exp: 'उत्तर: (क) Cu²⁺ (अयुग्मित d-इलेक्ट्रॉन के कारण)', years: '2022, 2023, 2025' },
    { q: '[Fe(CN)₆]⁴⁻ में Fe की ऑक्सीकरण संख्या है—', opts: ['+2', '+3', '+4', '+6'], ans: 0, exp: 'उत्तर: (क) x + 6(-1) = -4 ⇒ x = +2', years: '2022, 2023, 2024, 2025' },
    { q: 'क्लोरोफॉर्म का ऑक्सीकरण रोकने के लिए उसमें मिलाया जाता है—', opts: ['एथिल ऐल्कोहॉल (1%)', 'जल', 'बेंजीन', 'ईथर'], ans: 0, exp: 'उत्तर: (क) एथिल ऐल्कोहॉल (फॉस्जीन बनने से रोकने हेतु)', years: '2022, 2024, 2025' },
    { q: 'ल्यूकास अभिकर्मक (Lucas Reagent) है—', opts: ['सांद्र HCl + निर्जल ZnCl₂', 'सांद्र HNO₃ + H₂SO₄', 'NaOH + CaO', 'KMnO₄ + H₂SO₄'], ans: 0, exp: 'उत्तर: (क) सांद्र HCl + निर्जल ZnCl₂', years: '2022, 2023, 2025' },
    { q: 'टॉलेन अभिकर्मक क्या है?', opts: ['अमोनियामय सिल्वर नाइट्रेट', 'क्षारीय कॉपर सल्फेट', 'फेरिक क्लोराइड', 'सोडियम बाइसल्फाइट'], ans: 0, exp: 'उत्तर: (क) अमोनियामय सिल्वर नाइट्रेट [Ag(NH₃)₂]⁺', years: '2022, 2023, 2024, 2025' },
    { q: 'फॉर्मेलिन किसका जलीय विलयन है?', opts: ['फॉर्मेल्डिहाइड (40%)', 'फॉर्मिक अम्ल', 'ऐसीटोन', 'एथेनॉल'], ans: 0, exp: 'उत्तर: (क) फॉर्मेल्डिहाइड (HCHO)', years: '2022, 2024, 2025' },
    { q: 'कैनिजारो अभिक्रिया कौन देता है?', opts: ['HCHO (फॉर्मेल्डिहाइड)', 'CH₃CHO', 'CH₃COCH₃', 'CH₃CH₂CHO'], ans: 0, exp: 'उत्तर: (क) α-हाइड्रोजन रहित ऐल्डिहाइड (HCHO, C₆H₅CHO)', years: '2022, 2023, 2025' },
    { q: 'कार्बिल ऐमीन अभिक्रिया कौन देता है?', opts: ['प्राथमिक ऐमीन (1°)', 'द्वितीयक ऐमीन (2°)', 'तृतीयक ऐमीन (3°)', 'ऐमाइड'], ans: 0, exp: 'उत्तर: (क) प्राथमिक ऐमीन (R-NH₂)', years: '2022, 2023, 2024, 2025' },
    { q: 'ग्लूकोज़ में कितने प्राथमिक ऐल्कोहॉलिक (-CH₂OH) समूह होते हैं?', opts: ['एक', 'दो', 'चार', 'पाँच'], ans: 0, exp: 'उत्तर: (क) एक (-CH₂OH समूह)', years: '2023, 2024, 2025' },
    { q: 'विटामिन C का रासायनिक नाम है—', opts: ['एस्कॉर्बिक अम्ल', 'रेटिनॉल', 'थायमीन', 'कैल्सिफेरॉल'], ans: 0, exp: 'उत्तर: (क) एस्कॉर्बिक अम्ल', years: '2022, 2023, 2025' },
    { q: 'DNA में कौन-सा क्षारक नहीं पाया जाता है?', opts: ['यूरेसिल (Uracil)', 'थायमीन', 'एडीनीन', 'साइटोसीन'], ans: 0, exp: 'उत्तर: (क) यूरेसिल (यह RNA में होता है)', years: '2022, 2023, 2024, 2025' },
    { q: 'सिरके में कौन-सा अम्ल पाया जाता है?', opts: ['ऐसीटिक अम्ल (CH₃COOH)', 'फॉर्मिक अम्ल', 'सिट्रिक अम्ल', 'ऑक्सैलिक अम्ल'], ans: 0, exp: 'उत्तर: (क) ऐसीटिक अम्ल', years: '2022, 2024, 2025' },
    { q: 'हिंसबर्ग अभिकर्मक का सूत्र है—', opts: ['C₆H₅SO₂Cl', 'C₆H₅COCl', 'CH₃COCl', 'C₆H₅NH₂'], ans: 0, exp: 'उत्तर: (क) बेंजीन सल्फोनिल क्लोराइड (C₆H₅SO₂Cl)', years: '2023, 2025' },
    { q: 'शुद्ध जल की मोलरता होती है—', opts: ['55.56 M', '18 M', '1 M', '100 M'], ans: 0, exp: 'उत्तर: (क) 1000 / 18 = 55.56 M', years: '2022, 2024, 2025' },
    { q: 'विशिष्ट चालकता (κ) की इकाई है—', opts: ['ओम⁻¹ सेमी⁻¹', 'ओम सेमी', 'ओम⁻¹', 'सेमी⁻¹'], ans: 0, exp: 'उत्तर: (क) ओम⁻¹ सेमी⁻¹ (S cm⁻¹)', years: '2022, 2023, 2025' }
  ],
  Biology: [
    { q: 'आवृतबीजी पौधों में भ्रूणपोष (Endosperm) होता है—', opts: ['त्रिगुणित (3n)', 'द्विगुणित (2n)', 'अगुणित (n)', 'चतुर्गुणित (4n)'], ans: 0, exp: 'उत्तर: (क) त्रिगुणित (3n)', years: '2022, 2023, 2024, 2025' },
    { q: 'द्विनिषेचन (Double Fertilization) की खोज किसने की थी?', opts: ['नवाश्चिन (Nawaschin)', 'मेंडल', 'वाटसन', 'डार्विन'], ans: 0, exp: 'उत्तर: (क) एस. जी. नवाश्चिन', years: '2022, 2024, 2025' },
    { q: 'मानव में निषेचन (Fertilization) कहाँ संपन्न होता है?', opts: ['अंडवाहिनी (फैलोपियन नलिका)', 'गर्भाशय', 'योनि', 'अंडाशय'], ans: 0, exp: 'उत्तर: (क) फैलोपियन नलिका के एम्पुला भाग में', years: '2022, 2023, 2024, 2025' },
    { q: 'शुक्राणुओं को पोषण प्रदान करने वाली कोशिकाएँ हैं—', opts: ['सर्टोली कोशिकाएँ', 'लीडिग कोशिकाएँ', 'अंडकोशिका', 'लाल रुधिराणु'], ans: 0, exp: 'उत्तर: (क) सर्टोली कोशिकाएँ (Sertoli cells)', years: '2022, 2023, 2025' },
    { q: 'मेंडल के एकसंकर क्रॉस में F₂ पीढ़ी का फीनोटाइप अनुपात होता है—', opts: ['3 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1', '1 : 1'], ans: 0, exp: 'उत्तर: (क) 3 : 1', years: '2022, 2023, 2024, 2025' },
    { q: 'मेंडल के द्विसंकर क्रॉस का F₂ लक्षणप्ररूप अनुपात है—', opts: ['9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1', '2 : 1'], ans: 0, exp: 'उत्तर: (क) 9 : 3 : 3 : 1', years: '2022, 2024, 2025' },
    { q: 'टर्नर सिंड्रोम (Turner Syndrome) में गुणसूत्रों की संख्या होती है—', opts: ['45 (44 + XO)', '47 (44 + XXY)', '46', '47 (ट्राइसोमी 21)'], ans: 0, exp: 'उत्तर: (क) 45 (44 + XO)', years: '2022, 2023, 2025' },
    { q: 'डाउन सिंड्रोम किस गुणसूत्र की त्रिसूत्रता (Trisomy) से होता है?', opts: ['21वें गुणसूत्र', '18वें गुणसूत्र', '13वें गुणसूत्र', 'X गुणसूत्र'], ans: 0, exp: 'उत्तर: (क) 21वें गुणसूत्र की त्रिसूत्रता से', years: '2022, 2023, 2024, 2025' },
    { q: 'DNA की द्विकुंडलिनी संरचना किसने प्रस्तुत की थी?', opts: ['वाटसन एवं क्रिक', 'हरगोविंद खुराना', 'मेंडल', 'फ्लेमिंग'], ans: 0, exp: 'उत्तर: (क) जेम्स वाटसन और फ्रांसिस क्रिक (1953)', years: '2022, 2023, 2024, 2025' },
    { q: 'प्रारंभन कूट (Initiation Codon) कौन-सा है?', opts: ['AUG', 'UAA', 'UAG', 'UGA'], ans: 0, exp: 'उत्तर: (क) AUG (मेथियोनीन को कोड करता है)', years: '2022, 2024, 2025' },
    { q: 'टाइफाइड रोग किस जीवाणु द्वारा होता है?', opts: ['साल्मोनेला टाइफी', 'विब्रियो कॉलेरी', 'प्लाज्मोडियम', 'माइकोबैक्टीरियम'], ans: 0, exp: 'उत्तर: (क) साल्मोनेला टाइफी (विडाल परीक्षण)', years: '2022, 2023, 2025' },
    { q: 'पेनिसिलिन की खोज किसने की थी?', opts: ['अलेक्जेंडर फ्लेमिंग', 'लुई पाश्चर', 'एडवर्ड जेनर', 'रॉबर्ट कोच'], ans: 0, exp: 'उत्तर: (क) अलेक्जेंडर फ्लेमिंग', years: '2022, 2024, 2025' },
    { q: 'आणविक कैंची (Molecular Scissors) किसे कहा जाता है?', opts: ['प्रतिबंधन एंडोन्यूक्लिएज एंजाइम', 'DNA लाइगेज', 'DNA पॉलीमरेज', 'हेलिकेज'], ans: 0, exp: 'उत्तर: (क) Restriction Endonuclease', years: '2022, 2023, 2024, 2025' },
    { q: 'PCR (Polymerase Chain Reaction) में प्रयुक्त तापस्थायी एंजाइम है—', opts: ['Taq पॉलीमरेज', 'लाइगेज', 'पेप्सिन', 'एमाइलेज'], ans: 0, exp: 'उत्तर: (क) Taq Polymerase', years: '2023, 2024, 2025' },
    { q: 'Bt कपास में कीटरोधी जीन किस जीवाणु से लिया गया है?', opts: ['बैसिलस थुरिंजिएंसिस', 'ई. कोलाई', 'राइजोबियम', 'एग्रोबैक्टीरियम'], ans: 0, exp: 'उत्तर: (क) Bacillus thuringiensis (cry जीन)', years: '2022, 2023, 2025' },
    { q: 'काजीरंगा राष्ट्रीय उद्यान किस राज्य में है और किसके लिए प्रसिद्ध है?', opts: ['असम (एक सींग वाला गैंडा)', 'गुजरात (बब्बर शेर)', 'उत्तराखंड (बाघ)', 'राजस्थान'], ans: 0, exp: 'उत्तर: (क) असम (एक सींग वाला गैंडा)', years: '2022, 2024, 2025' },
    { q: 'रेड डेटा बुक (Red Data Book) कौन जारी करता है?', opts: ['IUCN', 'WHO', 'UNESCO', 'WWF'], ans: 0, exp: 'उत्तर: (क) IUCN', years: '2022, 2023, 2025' },
    { q: 'पारिस्थितिक तंत्र में ऊर्जा का पिरामिड सदैव होता है—', opts: ['सीधा (Upright)', 'उल्टा', 'अनियमित', 'क्षैतिज'], ans: 0, exp: 'उत्तर: (क) सदैव सीधा', years: '2022, 2023, 2024, 2025' },
    { q: 'बायोगैस (गोबर गैस) का मुख्य घटक है—', opts: ['मेथेन (CH₄)', 'ऑक्सीजन', 'नाइट्रोजन', 'क्लोरीन'], ans: 0, exp: 'उत्तर: (क) मेथेन (CH₄)', years: '2022, 2024, 2025' },
    { q: 'चिपको आंदोलन के प्रणेता कौन थे?', opts: ['सुंदरलाल बहुगुणा', 'मेधा पाटकर', 'सलीम अली', 'एम. एस. स्वामीनाथन'], ans: 0, exp: 'उत्तर: (क) सुंदरलाल बहुगुणा', years: '2022, 2023, 2025' }
  ],
  Math: [
    { q: 'समुच्चय A = {1, 2, 3} पर कुल कितने तुल्यता संबंध परिभाषित किए जा सकते हैं?', opts: ['5', '3', '6', '9'], ans: 0, exp: 'उत्तर: (क) 5', years: '2022, 2024, 2025' },
    { q: 'cos⁻¹(cos 7π/6) का मुख्य मान क्या होगा?', opts: ['5π/6', '7π/6', 'π/6', 'π/3'], ans: 0, exp: 'उत्तर: (क) cos⁻¹(cos(2π - 5π/6)) = 5π/6', years: '2022, 2023, 2024, 2025' },
    { q: 'sin⁻¹(1/2) + cos⁻¹(1/2) का मान होता है—', opts: ['π/2', 'π', 'π/4', '0'], ans: 0, exp: 'उत्तर: (क) sin⁻¹x + cos⁻¹x = π/2', years: '2022, 2023, 2025' },
    { q: 'यदि A एक 3×3 कोटि का वर्ग आव्यूह है, तो |kA| बराबर होगा—', opts: ['k³|A|', 'k|A|', '3k|A|', 'k²|A|'], ans: 0, exp: 'उत्तर: (क) |kA| = kⁿ|A| = k³|A|', years: '2022, 2023, 2024, 2025' },
    { q: 'यदि आव्यूह A सममित तथा विषम सममित दोनों है, तो A है—', opts: ['एक शून्य आव्यूह', 'एक विकर्ण आव्यूह', 'एक इकाई आव्यूह', 'अव्युत्क्रमणीय'], ans: 0, exp: 'उत्तर: (क) शून्य आव्यूह (Zero Matrix)', years: '2022, 2024, 2025' },
    { q: 'd/dx (tan⁻¹ x) का मान होता है—', opts: ['1 / (1 + x²)', '1 / √(1 - x²)', '-1 / (1 + x²)', 'sec² x'], ans: 0, exp: 'उत्तर: (क) 1 / (1 + x²)', years: '2022, 2023, 2024, 2025' },
    { q: 'd/dx (eˣ + log x) का मान है—', opts: ['eˣ + 1/x', 'eˣ + x', 'eˣ - 1/x', '1/x'], ans: 0, exp: 'उत्तर: (क) eˣ + 1/x', years: '2022, 2023, 2025' },
    { q: '∫ (1 / (1 + x²)) dx का मान है—', opts: ['tan⁻¹ x + C', 'sin⁻¹ x + C', 'log(1+x²) + C', 'sec⁻¹ x + C'], ans: 0, exp: 'उत्तर: (क) tan⁻¹ x + C', years: '2022, 2023, 2024, 2025' },
    { q: '∫₀^(π/2) sin x dx का मान कितना होगा?', opts: ['1', '0', '2', '-1'], ans: 0, exp: 'उत्तर: (क) [-cos x]₀^(π/2) = 0 - (-1) = 1', years: '2022, 2024, 2025' },
    { q: '∫ eˣ (sin x + cos x) dx का मान है—', opts: ['eˣ sin x + C', 'eˣ cos x + C', '-eˣ sin x + C', 'eˣ + C'], ans: 0, exp: 'उत्तर: (क) ∫ eˣ[f(x)+f′(x)]dx = eˣ sin x + C', years: '2022, 2023, 2025' },
    { q: 'अवकल समीकरण (d²y/dx²)³ + (dy/dx)² + y = 0 की घात (Degree) है—', opts: ['3', '2', '1', '0'], ans: 0, exp: 'उत्तर: (क) उच्चतम अवकलज की घात = 3', years: '2022, 2023, 2024, 2025' },
    { q: 'अवकल समीकरण d²y/dx² + 5(dy/dx) + 6y = 0 की कोटि (Order) है—', opts: ['2', '1', '5', '6'], ans: 0, exp: 'उत्तर: (क) कोटि = 2', years: '2022, 2024, 2025' },
    { q: 'सदिश î + ĵ + k̂ का मापांक (Magnitude) है—', opts: ['√3', '3', '1', '√2'], ans: 0, exp: 'उत्तर: (क) √(1² + 1² + 1²) = √3', years: '2022, 2023, 2024, 2025' },
    { q: 'दो परस्पर लंबवत सदिशों a⃗ और b⃗ के लिए a⃗ · b⃗ का मान होता है—', opts: ['0', '1', '-1', '|a||b|'], ans: 0, exp: 'उत्तर: (क) a⃗ · b⃗ = 0', years: '2022, 2023, 2025' },
    { q: 'î × ĵ का मान किसके बराबर होता है?', opts: ['k̂', '-k̂', '0', '1'], ans: 0, exp: 'उत्तर: (क) k̂', years: '2022, 2024, 2025' },
    { q: 'यदि एक रेखा की दिक्-कोज्याएँ l, m, n हैं, तो l² + m² + n² का मान है—', opts: ['1', '0', '-1', '3'], ans: 0, exp: 'उत्तर: (क) l² + m² + n² = 1', years: '2022, 2023, 2024, 2025' },
    { q: 'x-अक्ष की दिक्-कोज्याएँ (Direction Cosines) होती हैं—', opts: ['1, 0, 0', '0, 1, 0', '0, 0, 1', '1, 1, 1'], ans: 0, exp: 'उत्तर: (क) 1, 0, 0', years: '2022, 2023, 2025' },
    { q: 'यदि P(A) = 1/2 तथा P(B) = 0 हो, तो P(A|B) है—', opts: ['परिभाषित नहीं', '0', '1/2', '1'], ans: 0, exp: 'उत्तर: (क) हर शून्य होने से अपरिभाषित', years: '2022, 2024, 2025' },
    { q: 'यदि A और B स्वतंत्र घटनाएँ हैं, तो P(A ∩ B) बराबर है—', opts: ['P(A) · P(B)', 'P(A) + P(B)', 'P(A) / P(B)', '0'], ans: 0, exp: 'उत्तर: (क) P(A) × P(B)', years: '2022, 2023, 2024, 2025' },
    { q: '∫ sec² x dx का मान होता है—', opts: ['tan x + C', 'sec x + C', 'cot x + C', '-tan x + C'], ans: 0, exp: 'उत्तर: (क) tan x + C', years: '2022, 2023, 2025' }
  ]
};

const OTHER4_12_EN: Record<'Physics' | 'Chemistry' | 'Biology' | 'Math', RawMcq[]> = {
  Physics: [
    { q: 'SI unit of permittivity of free space (ε₀) is:', opts: ['C² / N·m²', 'N·m² / C²', 'N / C', 'V / m'], ans: 0, exp: 'Answer: (A) C² / N·m²', years: '2022, 2023, 2024, 2025' },
    { q: 'SI unit of electric flux is:', opts: ['Volt-metre', 'Weber', 'Tesla', 'Joule/coulomb'], ans: 0, exp: 'Answer: (A) Volt-metre', years: '2022, 2024, 2025' },
    { q: 'SI unit of specific resistance (resistivity) is:', opts: ['Ohm-metre', 'Ohm/metre', 'Ohm⁻¹', 'Volt-ampere'], ans: 0, exp: 'Answer: (A) Ohm-metre', years: '2022, 2023, 2025' },
    { q: "Kirchhoff's first law is based on conservation of:", opts: ['Charge', 'Energy', 'Momentum', 'Mass'], ans: 0, exp: 'Answer: (A) Charge', years: '2022, 2023, 2024, 2025' },
    { q: "Kirchhoff's second law is based on conservation of:", opts: ['Energy', 'Charge', 'Angular momentum', 'Force'], ans: 0, exp: 'Answer: (A) Energy', years: '2022, 2024, 2025' },
    { q: 'SI unit of magnetic flux is:', opts: ['Weber', 'Tesla', 'Henry', 'Gauss'], ans: 0, exp: 'Answer: (A) Weber', years: '2022, 2023, 2025' },
    { q: 'SI unit of self-inductance is:', opts: ['Henry', 'Farad', 'Weber', 'Ohm'], ans: 0, exp: 'Answer: (A) Henry', years: '2023, 2024, 2025' },
    { q: "Lenz's law is a consequence of conservation of:", opts: ['Energy', 'Charge', 'Momentum', 'Mass'], ans: 0, exp: 'Answer: (A) Energy', years: '2022, 2023, 2024, 2025' },
    { q: 'Electromagnetic waves are:', opts: ['Transverse in nature', 'Longitudinal', 'Mechanical', 'Stationary'], ans: 0, exp: 'Answer: (A) Transverse in nature', years: '2022, 2024, 2025' },
    { q: 'For total internal reflection, light must travel from:', opts: ['Denser to rarer medium', 'Rarer to denser medium', 'Vacuum to glass', 'Air to water'], ans: 0, exp: 'Answer: (A) Denser to rarer medium', years: '2022, 2023, 2025' },
    { q: 'Two lenses of +2D and -1D in contact have combined power:', opts: ['+1D', '+3D', '-3D', '+2D'], ans: 0, exp: 'Answer: (A) +1D', years: '2022, 2024, 2025' },
    { q: 'For sustained interference of light, two sources must be:', opts: ['Coherent', 'Incoherent', 'Different frequencies', 'Different speeds'], ans: 0, exp: 'Answer: (A) Coherent', years: '2023, 2024, 2025' },
    { q: "SI unit of Planck's constant (h) is:", opts: ['Joule-second', 'Joule/second', 'Newton-metre', 'Watt-second'], ans: 0, exp: 'Answer: (A) Joule-second', years: '2022, 2023, 2024, 2025' },
    { q: 'Formula for de-Broglie wavelength λ is:', opts: ['h / mv', 'mv / h', 'h × mv', 'h / c'], ans: 0, exp: 'Answer: (A) h / mv', years: '2022, 2024, 2025' },
    { q: 'Ground state energy of hydrogen atom is:', opts: ['-13.6 eV', '+13.6 eV', '-3.4 eV', '-1.51 eV'], ans: 0, exp: 'Answer: (A) -13.6 eV', years: '2022, 2023, 2025' },
    { q: 'Moderator used in a nuclear reactor is:', opts: ['Heavy water (D₂O)', 'Cadmium rod', 'Uranium', 'Sodium'], ans: 0, exp: 'Answer: (A) Heavy water (D₂O)', years: '2023, 2024, 2025' },
    { q: 'Majority charge carriers in a p-type semiconductor are:', opts: ['Holes', 'Electrons', 'Protons', 'Neutrons'], ans: 0, exp: 'Answer: (A) Holes', years: '2022, 2023, 2024, 2025' },
    { q: 'To make an n-type semiconductor, Germanium is doped with:', opts: ['Pentavalent impurity (As/Sb)', 'Trivalent impurity (B/Al)', 'Carbon', 'Copper'], ans: 0, exp: 'Answer: (A) Pentavalent impurity', years: '2022, 2024, 2025' },
    { q: 'SI unit of capacitance is:', opts: ['Farad', 'Henry', 'Coulomb', 'Volt'], ans: 0, exp: 'Answer: (A) Farad', years: '2022, 2023, 2025' },
    { q: 'Value of 1 eV in Joules is:', opts: ['1.6 × 10⁻¹⁹ J', '9.1 × 10⁻³¹ J', '6.6 × 10⁻³⁴ J', '3 × 10⁸ J'], ans: 0, exp: 'Answer: (A) 1.6 × 10⁻¹⁹ J', years: '2022, 2023, 2024, 2025' },
    { q: 'Main source of energy in the Sun is:', opts: ['Nuclear fusion', 'Nuclear fission', 'Chemical burning', 'Radioactivity'], ans: 0, exp: 'Answer: (A) Nuclear fusion', years: '2022, 2024, 2025' }
  ],
  Chemistry: [
    { q: 'Unit of Molarity is:', opts: ['mol / L', 'mol / kg', 'g / L', 'mol⁻¹'], ans: 0, exp: 'Answer: (A) mol / L', years: '2022, 2023, 2024, 2025' },
    { q: 'Unit of Molality is:', opts: ['mol / kg solvent', 'mol / L solution', 'g / mol', 'L / mol'], ans: 0, exp: 'Answer: (A) mol / kg', years: '2022, 2024, 2025' },
    { q: 'Unit of rate constant for a zero-order reaction is:', opts: ['mol L⁻¹ s⁻¹', 's⁻¹', 'L mol⁻¹ s⁻¹', 'mol² s⁻¹'], ans: 0, exp: 'Answer: (A) mol L⁻¹ s⁻¹', years: '2022, 2023, 2024, 2025' },
    { q: 'Unit of rate constant for a first-order reaction is:', opts: ['s⁻¹', 'mol L⁻¹ s⁻¹', 'L mol⁻¹', 'mol⁻¹'], ans: 0, exp: 'Answer: (A) s⁻¹', years: '2022, 2023, 2025' },
    { q: 'Half-life (t₁/₂) for a first-order reaction is:', opts: ['0.693 / k', 'k / 0.693', '1 / k', '2.303 / k'], ans: 0, exp: 'Answer: (A) 0.693 / k', years: '2022, 2024, 2025' },
    { q: 'Which of the following ions is coloured in aqueous solution?', opts: ['Cu²⁺', 'Zn²⁺', 'Sc³⁺', 'Ti⁴⁺'], ans: 0, exp: 'Answer: (A) Cu²⁺', years: '2022, 2023, 2025' },
    { q: 'Oxidation state of Fe in [Fe(CN)₆]⁴⁻ is:', opts: ['+2', '+3', '+4', '+6'], ans: 0, exp: 'Answer: (A) +2', years: '2022, 2023, 2024, 2025' },
    { q: 'To prevent oxidation of chloroform, 1% of which is added?', opts: ['Ethyl alcohol', 'Water', 'Benzene', 'Ether'], ans: 0, exp: 'Answer: (A) Ethyl alcohol', years: '2022, 2024, 2025' },
    { q: 'Lucas Reagent is:', opts: ['Conc. HCl + Anhydrous ZnCl₂', 'Conc. HNO₃ + H₂SO₄', 'NaOH + CaO', 'KMnO₄ + H₂SO₄'], ans: 0, exp: 'Answer: (A) Conc. HCl + Anhydrous ZnCl₂', years: '2022, 2023, 2025' },
    { q: "Tollen's reagent is:", opts: ['Ammoniacal silver nitrate', 'Alkaline copper sulphate', 'Ferric chloride', 'Sodium bisulphite'], ans: 0, exp: 'Answer: (A) Ammoniacal silver nitrate', years: '2022, 2023, 2024, 2025' },
    { q: 'Formalin is an aqueous solution of:', opts: ['Formaldehyde (40%)', 'Formic acid', 'Acetone', 'Ethanol'], ans: 0, exp: 'Answer: (A) Formaldehyde (40%)', years: '2022, 2024, 2025' },
    { q: 'Which compound undergoes Cannizzaro reaction?', opts: ['HCHO', 'CH₃CHO', 'CH₃COCH₃', 'CH₃CH₂CHO'], ans: 0, exp: 'Answer: (A) HCHO (lacks alpha-hydrogen)', years: '2022, 2023, 2025' },
    { q: 'Carbylamine reaction is given by:', opts: ['Primary amines (1°)', 'Secondary amines (2°)', 'Tertiary amines (3°)', 'Amides'], ans: 0, exp: 'Answer: (A) Primary amines (1°)', years: '2022, 2023, 2024, 2025' },
    { q: 'How many primary alcoholic (-CH₂OH) groups are in glucose?', opts: ['One', 'Two', 'Four', 'Five'], ans: 0, exp: 'Answer: (A) One', years: '2023, 2024, 2025' },
    { q: 'Chemical name of Vitamin C is:', opts: ['Ascorbic acid', 'Retinol', 'Thiamine', 'Calciferol'], ans: 0, exp: 'Answer: (A) Ascorbic acid', years: '2022, 2023, 2025' },
    { q: 'Which nitrogenous base is NOT found in DNA?', opts: ['Uracil', 'Thymine', 'Adenine', 'Cytosine'], ans: 0, exp: 'Answer: (A) Uracil', years: '2022, 2023, 2024, 2025' },
    { q: 'Which acid is present in vinegar?', opts: ['Acetic acid', 'Formic acid', 'Citric acid', 'Oxalic acid'], ans: 0, exp: 'Answer: (A) Acetic acid', years: '2022, 2024, 2025' },
    { q: 'Formula of Hinsberg reagent is:', opts: ['C₆H₅SO₂Cl', 'C₆H₅COCl', 'CH₃COCl', 'C₆H₅NH₂'], ans: 0, exp: 'Answer: (A) C₆H₅SO₂Cl', years: '2023, 2025' },
    { q: 'Molarity of pure water is:', opts: ['55.56 M', '18 M', '1 M', '100 M'], ans: 0, exp: 'Answer: (A) 55.56 M', years: '2022, 2024, 2025' },
    { q: 'Unit of specific conductance (κ) is:', opts: ['ohm⁻¹ cm⁻¹', 'ohm cm', 'ohm⁻¹', 'cm⁻¹'], ans: 0, exp: 'Answer: (A) ohm⁻¹ cm⁻¹', years: '2022, 2023, 2025' }
  ],
  Biology: [
    { q: 'Endosperm in angiosperms is:', opts: ['Triploid (3n)', 'Diploid (2n)', 'Haploid (n)', 'Tetraploid (4n)'], ans: 0, exp: 'Answer: (A) Triploid (3n)', years: '2022, 2023, 2024, 2025' },
    { q: 'Double fertilization was discovered by:', opts: ['Nawaschin', 'Mendel', 'Watson', 'Darwin'], ans: 0, exp: 'Answer: (A) Nawaschin', years: '2022, 2024, 2025' },
    { q: 'Where does fertilization occur in human females?', opts: ['Fallopian tube (Oviduct)', 'Uterus', 'Vagina', 'Ovary'], ans: 0, exp: 'Answer: (A) Fallopian tube (ampulla)', years: '2022, 2023, 2024, 2025' },
    { q: 'Cells that provide nutrition to developing sperms are:', opts: ['Sertoli cells', 'Leydig cells', 'Ovum', 'RBCs'], ans: 0, exp: 'Answer: (A) Sertoli cells', years: '2022, 2023, 2025' },
    { q: "Phenotypic ratio of Mendel's F₂ monohybrid cross is:", opts: ['3 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1', '1 : 1'], ans: 0, exp: 'Answer: (A) 3 : 1', years: '2022, 2023, 2024, 2025' },
    { q: "Phenotypic ratio of Mendel's F₂ dihybrid cross is:", opts: ['9 : 3 : 3 : 1', '3 : 1', '1 : 2 : 1', '2 : 1'], ans: 0, exp: 'Answer: (A) 9 : 3 : 3 : 1', years: '2022, 2024, 2025' },
    { q: 'Chromosome number in Turner Syndrome is:', opts: ['45 (44 + XO)', '47 (44 + XXY)', '46', '47 (Trisomy 21)'], ans: 0, exp: 'Answer: (A) 45 (44 + XO)', years: '2022, 2023, 2025' },
    { q: "Down's syndrome is caused by trisomy of which chromosome?", opts: ['21st chromosome', '18th chromosome', '13th chromosome', 'X chromosome'], ans: 0, exp: 'Answer: (A) 21st chromosome', years: '2022, 2023, 2024, 2025' },
    { q: 'Double helix model of DNA was proposed by:', opts: ['Watson and Crick', 'Hargobind Khorana', 'Mendel', 'Fleming'], ans: 0, exp: 'Answer: (A) Watson and Crick', years: '2022, 2023, 2024, 2025' },
    { q: 'Which one is the initiation codon?', opts: ['AUG', 'UAA', 'UAG', 'UGA'], ans: 0, exp: 'Answer: (A) AUG', years: '2022, 2024, 2025' },
    { q: 'Typhoid fever is caused by which bacterium?', opts: ['Salmonella typhi', 'Vibrio cholerae', 'Plasmodium', 'Mycobacterium'], ans: 0, exp: 'Answer: (A) Salmonella typhi', years: '2022, 2023, 2025' },
    { q: 'Who discovered Penicillin?', opts: ['Alexander Fleming', 'Louis Pasteur', 'Edward Jenner', 'Robert Koch'], ans: 0, exp: 'Answer: (A) Alexander Fleming', years: '2022, 2024, 2025' },
    { q: 'What are known as molecular scissors?', opts: ['Restriction endonucleases', 'DNA ligase', 'DNA polymerase', 'Helicase'], ans: 0, exp: 'Answer: (A) Restriction endonucleases', years: '2022, 2023, 2024, 2025' },
    { q: 'Thermostable enzyme used in PCR is:', opts: ['Taq polymerase', 'Ligase', 'Pepsin', 'Amylase'], ans: 0, exp: 'Answer: (A) Taq polymerase', years: '2023, 2024, 2025' },
    { q: 'Insect-resistant gene in Bt cotton is isolated from:', opts: ['Bacillus thuringiensis', 'E. coli', 'Rhizobium', 'Agrobacterium'], ans: 0, exp: 'Answer: (A) Bacillus thuringiensis', years: '2022, 2023, 2025' },
    { q: 'Kaziranga National Park is located in and famous for:', opts: ['Assam (One-horned rhinoceros)', 'Gujarat (Lion)', 'Uttarakhand (Tiger)', 'Rajasthan'], ans: 0, exp: 'Answer: (A) Assam (One-horned rhinoceros)', years: '2022, 2024, 2025' },
    { q: 'Red Data Book is published by:', opts: ['IUCN', 'WHO', 'UNESCO', 'WWF'], ans: 0, exp: 'Answer: (A) IUCN', years: '2022, 2023, 2025' },
    { q: 'Pyramid of energy in an ecosystem is always:', opts: ['Upright', 'Inverted', 'Irregular', 'Horizontal'], ans: 0, exp: 'Answer: (A) Upright', years: '2022, 2023, 2024, 2025' },
    { q: 'Main constituent of biogas is:', opts: ['Methane (CH₄)', 'Oxygen', 'Nitrogen', 'Chlorine'], ans: 0, exp: 'Answer: (A) Methane (CH₄)', years: '2022, 2024, 2025' },
    { q: 'Leader of Chipko Movement was:', opts: ['Sunderlal Bahuguna', 'Medha Patkar', 'Salim Ali', 'M.S. Swaminathan'], ans: 0, exp: 'Answer: (A) Sunderlal Bahuguna', years: '2022, 2023, 2025' }
  ],
  Math: [
    { q: 'Total number of equivalence relations on set A = {1, 2, 3} is:', opts: ['5', '3', '6', '9'], ans: 0, exp: 'Answer: (A) 5', years: '2022, 2024, 2025' },
    { q: 'Principal value of cos⁻¹(cos 7π/6) is:', opts: ['5π/6', '7π/6', 'π/6', 'π/3'], ans: 0, exp: 'Answer: (A) 5π/6', years: '2022, 2023, 2024, 2025' },
    { q: 'Value of sin⁻¹(1/2) + cos⁻¹(1/2) is:', opts: ['π/2', 'π', 'π/4', '0'], ans: 0, exp: 'Answer: (A) π/2', years: '2022, 2023, 2025' },
    { q: 'If A is a square matrix of order 3×3, then |kA| equals:', opts: ['k³|A|', 'k|A|', '3k|A|', 'k²|A|'], ans: 0, exp: 'Answer: (A) k³|A|', years: '2022, 2023, 2024, 2025' },
    { q: 'A matrix which is both symmetric and skew-symmetric is:', opts: ['Zero matrix', 'Diagonal matrix', 'Identity matrix', 'Singular matrix'], ans: 0, exp: 'Answer: (A) Zero matrix', years: '2022, 2024, 2025' },
    { q: 'Derivative d/dx (tan⁻¹ x) is:', opts: ['1 / (1 + x²)', '1 / √(1 - x²)', '-1 / (1 + x²)', 'sec² x'], ans: 0, exp: 'Answer: (A) 1 / (1 + x²)', years: '2022, 2023, 2024, 2025' },
    { q: 'Derivative d/dx (eˣ + log x) is:', opts: ['eˣ + 1/x', 'eˣ + x', 'eˣ - 1/x', '1/x'], ans: 0, exp: 'Answer: (A) eˣ + 1/x', years: '2022, 2023, 2025' },
    { q: 'Integral ∫ (1 / (1 + x²)) dx equals:', opts: ['tan⁻¹ x + C', 'sin⁻¹ x + C', 'log(1+x²) + C', 'sec⁻¹ x + C'], ans: 0, exp: 'Answer: (A) tan⁻¹ x + C', years: '2022, 2023, 2024, 2025' },
    { q: 'Value of ∫₀^(π/2) sin x dx is:', opts: ['1', '0', '2', '-1'], ans: 0, exp: 'Answer: (A) 1', years: '2022, 2024, 2025' },
    { q: 'Integral ∫ eˣ (sin x + cos x) dx equals:', opts: ['eˣ sin x + C', 'eˣ cos x + C', '-eˣ sin x + C', 'eˣ + C'], ans: 0, exp: 'Answer: (A) eˣ sin x + C', years: '2022, 2023, 2025' },
    { q: 'Degree of differential equation (d²y/dx²)³ + (dy/dx)² + y = 0 is:', opts: ['3', '2', '1', '0'], ans: 0, exp: 'Answer: (A) 3', years: '2022, 2023, 2024, 2025' },
    { q: 'Order of differential equation d²y/dx² + 5(dy/dx) + 6y = 0 is:', opts: ['2', '1', '5', '6'], ans: 0, exp: 'Answer: (A) 2', years: '2022, 2024, 2025' },
    { q: 'Magnitude of vector î + ĵ + k̂ is:', opts: ['√3', '3', '1', '√2'], ans: 0, exp: 'Answer: (A) √3', years: '2022, 2023, 2024, 2025' },
    { q: 'For two perpendicular vectors a⃗ and b⃗, a⃗ · b⃗ equals:', opts: ['0', '1', '-1', '|a||b|'], ans: 0, exp: 'Answer: (A) 0', years: '2022, 2023, 2025' },
    { q: 'Value of î × ĵ is:', opts: ['k̂', '-k̂', '0', '1'], ans: 0, exp: 'Answer: (A) k̂', years: '2022, 2024, 2025' },
    { q: 'If l, m, n are direction cosines of a line, then l² + m² + n² equals:', opts: ['1', '0', '-1', '3'], ans: 0, exp: 'Answer: (A) 1', years: '2022, 2023, 2024, 2025' },
    { q: 'Direction cosines of x-axis are:', opts: ['1, 0, 0', '0, 1, 0', '0, 0, 1', '1, 1, 1'], ans: 0, exp: 'Answer: (A) 1, 0, 0', years: '2022, 2023, 2025' },
    { q: 'If P(A) = 1/2 and P(B) = 0, then P(A|B) is:', opts: ['Not defined', '0', '1/2', '1'], ans: 0, exp: 'Answer: (A) Not defined', years: '2022, 2024, 2025' },
    { q: 'If A and B are independent events, then P(A ∩ B) equals:', opts: ['P(A) · P(B)', 'P(A) + P(B)', 'P(A) / P(B)', '0'], ans: 0, exp: 'Answer: (A) P(A) · P(B)', years: '2022, 2023, 2024, 2025' },
    { q: 'Integral ∫ sec² x dx equals:', opts: ['tan x + C', 'sec x + C', 'cot x + C', '-tan x + C'], ans: 0, exp: 'Answer: (A) tan x + C', years: '2022, 2023, 2025' }
  ]
};

/* ==================== HELPERS ==================== */

function resolveSubjectKey(subjectKeyOrName: string): SubjectKey {
  const s = subjectKeyOrName.toLowerCase();
  if (s.includes('hindi') || s.includes('हिंदी')) return 'Hindi';
  if (s.includes('english') || s.includes('अंग्रे')) return 'English';
  if (s.includes('physics') || s.includes('भौतिक')) return 'Physics';
  if (s.includes('chemistry') || s.includes('रसायन')) return 'Chemistry';
  if (s.includes('biology') || s.includes('जीव')) return 'Biology';
  if (s.includes('science') && !s.includes('social')) return 'Science';
  if (s.includes('social') || s.includes('सामाजिक')) return 'Social Science';
  if (s.includes('math') || s.includes('गणित')) return 'Math';
  return 'Art';
}

function getMcqBank(classLevel: ClassLevel, key: SubjectKey, medium: MediumType): RawMcq[] {
  // Hindi subject ALWAYS stays in Hindi; English subject ALWAYS stays in English.
  if (key === 'Hindi') return classLevel === '10th' ? HINDI_10_MCQS : HINDI_12_MCQS;
  if (key === 'English') return classLevel === '10th' ? ENGLISH_10_MCQS : ENGLISH_12_MCQS;

  const isEn = medium === 'English';
  if (classLevel === '10th') {
    if (key === 'Science') return isEn ? OTHER4_10_EN.Science : OTHER4_10_HI.Science;
    if (key === 'Math') return isEn ? OTHER4_10_EN.Math : OTHER4_10_HI.Math;
    if (key === 'Social Science') return isEn ? OTHER4_10_EN['Social Science'] : OTHER4_10_HI['Social Science'];
    return isEn ? OTHER4_10_EN.Art : OTHER4_10_HI.Art;
  }

  if (key === 'Physics') return isEn ? OTHER4_12_EN.Physics : OTHER4_12_HI.Physics;
  if (key === 'Chemistry') return isEn ? OTHER4_12_EN.Chemistry : OTHER4_12_HI.Chemistry;
  if (key === 'Biology') return isEn ? OTHER4_12_EN.Biology : OTHER4_12_HI.Biology;
  return isEn ? OTHER4_12_EN.Math : OTHER4_12_HI.Math;
}

function makeTwentyMcqs(
  prefix: string,
  classLevel: ClassLevel,
  subjectKey: string,
  setNum: number,
  medium: MediumType
): McqQuestion[] {
  const key = resolveSubjectKey(subjectKey);
  const bank = getMcqBank(classLevel, key, medium);
  const offset = (setNum - 1) * 3;
  return Array.from({ length: 20 }, (_, i) => {
    const item = bank[(offset + i) % bank.length];
    return {
      id: `${prefix}-s${setNum}-mcq-${i + 1}`,
      question: item.q,
      options: item.opts,
      correctIndex: item.ans,
      explanation: item.exp,
      repeatedYears: item.years
    };
  });
}

function makeItemsForSubject(
  prefix: string,
  classLevel: ClassLevel,
  subjectKey: string,
  setNum: number,
  medium: MediumType
): ClickableExamItem[] {
  const key = resolveSubjectKey(subjectKey);
  const isEn = medium === 'English';

  // 1. Hindi Subject (ALWAYS in Hindi for both 10th & 12th)
  if (key === 'Hindi') {
    if (classLevel === '10th') {
      const authors10 = [
        { name: 'आचार्य रामचंद्र शुक्ल (गद्य)', years: '2022, 2023, 2024, 2025', ans: 'जन्म: 1884 ई. (बस्ती), मृत्यु: 1941 ई.। प्रमुख कृतियाँ: चिंतामणि, हिंदी साहित्य का इतिहास, रस मीमांसा।' },
        { name: 'जयशंकर प्रसाद (गद्य)', years: '2022, 2023, 2025', ans: 'जन्म: 1889 ई. (काशी), मृत्यु: 1937 ई.। प्रमुख कृतियाँ: कामायनी, आँसू, स्कंदगुप्त, आकाशदीप, ममता।' },
        { name: 'डॉ. राजेंद्र प्रसाद (गद्य)', years: '2023, 2024, 2025', ans: 'जन्म: 1884 ई. (जीरादेई), मृत्यु: 1963 ई.। प्रमुख कृतियाँ: मेरी आत्मकथा, भारतीय शिक्षा, गांधी जी की देन।' },
        { name: 'डॉ. भगवतशरण उपाध्याय (गद्य)', years: '2022, 2024, 2025', ans: 'जन्म: 1910 ई. (बलिया), मृत्यु: 1982 ई.। प्रमुख कृतियाँ: अजंता, ठूँठा आम, खून के छींटे।' },
        { name: 'सूरदास (पद्य)', years: '2022, 2023, 2024, 2025', ans: 'जन्म: 1478 ई., मृत्यु: 1583 ई.। प्रमुख कृतियाँ: सूरसागर, सूरसारावली, साहित्य लहरी।' },
        { name: 'गोस्वामी तुलसीदास (पद्य)', years: '2022, 2023, 2024, 2025', ans: 'जन्म: 1532 ई., मृत्यु: 1623 ई.। प्रमुख कृतियाँ: रामचरितमानस, विनयपत्रिका, कवितावली।' },
        { name: 'महादेवी वर्मा (पद्य)', years: '2022, 2024, 2025', ans: 'जन्म: 1907 ई. (फर्रुखाबाद), मृत्यु: 1987 ई.। प्रमुख कृतियाँ: नीहार, रश्मि, नीरजा, यामा, दीपशिखा।' },
        { name: 'मैथिलीशरण गुप्त (पद्य)', years: '2023, 2024, 2025', ans: 'जन्म: 1886 ई. (झाँसी), मृत्यु: 1964 ई.। प्रमुख कृतियाँ: साकेत, भारत-भारती, यशोधरा, पंचवटी।' }
      ];
      return [
        ...authors10.map((a, idx) => ({
          id: `${prefix}-s${setNum}-jp-${idx + 1}`,
          section: 'Jeevan Parichay (Choice)' as ExamSectionType,
          choiceGroup: 'जीवन परिचय (संक्षिप्त)',
          title: `${idx + 1}. ${a.name}`,
          marksOrHint: 'जीवन परिचय व रचनाएँ',
          repeatedYears: a.years,
          answer: a.ans
        })),
        {
          id: `${prefix}-s${setNum}-gad-1`,
          section: 'Gadyansh (Choice)',
          choiceGroup: `गद्यांश (Set ${setNum})`,
          title: 'गद्यांश — मित्रता / ममता (संदर्भ, व्याख्या व तथ्य प्रश्न)',
          repeatedYears: '2022, 2023, 2024, 2025',
          answer: 'संदर्भ: प्रस्तुत गद्यांश हमारी पाठ्यपुस्तक के गद्य खंड से उद्धृत है।\nव्याख्या: सच्चे मित्र के लक्षण एवं कर्तव्यनिष्ठा का वर्णन।'
        },
        {
          id: `${prefix}-s${setNum}-pad-1`,
          section: 'Padyansh (Choice)',
          choiceGroup: `पद्यांश (Set ${setNum})`,
          title: 'पद्यांश — सूर के पद / धनुष भंग / वन पथ पर (संदर्भ व भावार्थ)',
          repeatedYears: '2022, 2024, 2025',
          answer: 'संदर्भ: प्रस्तुत पद्यांश हमारी पाठ्यपुस्तक के काव्य खंड से लिया गया है।\nभावार्थ: भक्ति व वात्सल्य रस तथा अलंकार योजना का वर्णन।'
        },
        {
          id: `${prefix}-s${setNum}-shl-1`,
          section: 'Shlok / Sanskrit (Choice)',
          choiceGroup: `संस्कृत खंड (Set ${setNum})`,
          title: 'संस्कृत गद्यांश / श्लोक — वाराणसी / वीरः वीरेण पूज्यते (हिंदी अनुवाद)',
          repeatedYears: '2022, 2023, 2024, 2025',
          answer: 'संदर्भ: प्रस्तुत अंश हमारी पाठ्यपुस्तक के संस्कृत खंड से उद्धृत है।\nहिंदी अनुवाद: वाराणसी की प्राचीन संस्कृति एवं वीरता के आदर्श।'
        },
        {
          id: `${prefix}-s${setNum}-long-1`,
          section: 'Long Answer',
          title: `खंडकाव्य एवं निबंध (Set ${setNum}) — नायक का चरित्र-चित्रण व निबंध`,
          repeatedYears: '2022, 2023, 2024, 2025',
          answer: 'खंडकाव्य के प्रमुख पात्र की चारित्रिक विशेषताएँ तथा निबंध (प्रस्तावना, मुख्य बिंदु, उपसंहार)।'
        }
      ];
    }

    const authors12 = [
      { name: 'डॉ. वासुदेवशरण अग्रवाल (साहित्यिक परिचय)', years: '2022, 2023, 2024, 2025', ans: 'जन्म: 1904 ई., मृत्यु: 1967 ई.। प्रमुख कृतियाँ: पृथ्वीपुत्र, कल्पलता, भारत की एकता, कला और संस्कृति।' },
      { name: 'आचार्य हजारीप्रसाद द्विवेदी (साहित्यिक परिचय)', years: '2022, 2023, 2025', ans: 'जन्म: 1907 ई. (बलिया), मृत्यु: 1979 ई.। प्रमुख कृतियाँ: अशोक के फूल, कुटज, बाणभट्ट की आत्मकथा।' },
      { name: 'प्रो. जी. सुंदर रेड्डी (साहित्यिक परिचय)', years: '2023, 2024, 2025', ans: 'जन्म: 1919 ई., मृत्यु: 2005 ई.। प्रमुख कृतियाँ: साहित्य और समाज, मेरे विचार, भाषा और आधुनिकता।' },
      { name: 'अयोध्यासिंह उपाध्याय हरिऔध (काव्य परिचय)', years: '2022, 2024, 2025', ans: 'जन्म: 1865 ई. (निजामाबाद), मृत्यु: 1947 ई.। प्रमुख कृतियाँ: प्रियप्रवास, वैदेही वनवास, रसकलश।' },
      { name: 'मैथिलीशरण गुप्त (काव्य परिचय)', years: '2022, 2023, 2024, 2025', ans: 'जन्म: 1886 ई. (झाँसी), मृत्यु: 1964 ई.। प्रमुख कृतियाँ: साकेत, भारत-भारती, यशोधरा, पंचवटी।' },
      { name: 'जयशंकर प्रसाद (काव्य परिचय)', years: '2022, 2023, 2025', ans: 'जन्म: 1889 ई. (काशी), मृत्यु: 1937 ई.। प्रमुख कृतियाँ: कामायनी, आँसू, लहर, झरना।' },
      { name: 'सुमित्रानंदन पंत (काव्य परिचय)', years: '2023, 2024, 2025', ans: 'जन्म: 1900 ई. (कौसानी), मृत्यु: 1977 ई.। प्रमुख कृतियाँ: पल्लव, वीणा, गुंजन, चिदंबरा, लोकायतन।' },
      { name: 'महादेवी वर्मा (काव्य परिचय)', years: '2022, 2024, 2025', ans: 'जन्म: 1907 ई. (फर्रुखाबाद), मृत्यु: 1987 ई.। प्रमुख कृतियाँ: नीहार, नीरजा, यामा, दीपशिखा।' }
    ];
    return [
      ...authors12.map((a, idx) => ({
        id: `${prefix}-s${setNum}-jp-${idx + 1}`,
        section: 'Jeevan Parichay (Choice)' as ExamSectionType,
        choiceGroup: 'साहित्यिक परिचय (संक्षिप्त)',
        title: `${idx + 1}. ${a.name}`,
        marksOrHint: 'साहित्यिक परिचय व कृतियाँ',
        repeatedYears: a.years,
        answer: a.ans
      })),
      {
        id: `${prefix}-s${setNum}-gad-1`,
        section: 'Gadyansh (Choice)',
        choiceGroup: `गद्यांश (Set ${setNum})`,
        title: 'गद्यांश — राष्ट्र का स्वरूप / अशोक के फूल (संदर्भ व प्रश्नोत्तर)',
        repeatedYears: '2022, 2023, 2024, 2025',
        answer: 'संदर्भ: प्रस्तुत गद्यांश हमारी पाठ्यपुस्तक के गद्य खंड से संकलित है।\nव्याख्या: भूमि, जन और संस्कृति से राष्ट्र निर्माण का भाव।'
      },
      {
        id: `${prefix}-s${setNum}-pad-1`,
        section: 'Padyansh (Choice)',
        choiceGroup: `पद्यांश (Set ${setNum})`,
        title: 'पद्यांश — पवन दूतिका / कैकेयी का अनुताप / श्रद्धा मनु (संदर्भ व प्रश्नोत्तर)',
        repeatedYears: '2022, 2024, 2025',
        answer: 'संदर्भ: प्रस्तुत पद्यांश हमारी पाठ्यपुस्तक के काव्य खंड से उद्धृत है।\nभावार्थ: विरह, पश्चाताप एवं आशावाद का चित्रण।'
      },
      {
        id: `${prefix}-s${setNum}-shl-1`,
        section: 'Shlok / Sanskrit (Choice)',
        choiceGroup: `संस्कृत दिग्दर्शिका (Set ${setNum})`,
        title: 'संस्कृत गद्यांश व सुभाषितरत्नानि श्लोक (संदर्भ सहित हिंदी अनुवाद)',
        repeatedYears: '2022, 2023, 2024, 2025',
        answer: 'संदर्भ: प्रस्तुत श्लोक संस्कृत दिग्दर्शिका के सुभाषितरत्नानि पाठ से लिया गया है।\nहिंदी अनुवाद: विद्या, विनय व सद्गुणों का महत्व।'
      },
      {
        id: `${prefix}-s${setNum}-long-1`,
        section: 'Long Answer',
        title: `कहानी व खंडकाव्य (Set ${setNum}) — पंचलाइट / बहादुर का सारांश व खंडकाव्य पात्र`,
        repeatedYears: '2022, 2023, 2024, 2025',
        answer: 'पंचलाइट कहानी का उद्देश्य (ग्रामीण मनोविज्ञान व प्रतिष्ठा) तथा खंडकाव्य के नायक का चरित्र-चित्रण।'
      }
    ];
  }

  // 2. English Subject (ALWAYS in English for both 10th & 12th)
  if (key === 'English') {
    const centralIdeas =
      classLevel === '10th'
        ? [
            { title: 'Central Idea 01 — Dust of Snow (Robert Frost)', years: '2022, 2023, 2024, 2025', ans: 'The poem "Dust of Snow" by Robert Frost shows how a small moment in nature can change a sad mood into a cheerful one. A crow shakes dust of snow from a hemlock tree onto the poet, lifting his gloom and saving the rest of his day.' },
            { title: 'Central Idea 02 — Fire and Ice (Robert Frost)', years: '2022, 2024, 2025', ans: 'In "Fire and Ice", Robert Frost states that "fire" symbolizes desire and greed, while "ice" symbolizes hatred and coldness. Both emotions are powerful enough to destroy the world.' },
            { title: 'Central Idea 03 — A Tiger in the Zoo (Leslie Norris)', years: '2023, 2024, 2025', ans: 'The poem contrasts a caged tiger in a zoo with a tiger free in the jungle. It highlights that wild animals belong in their natural habitat and lose their freedom in captivity.' },
            { title: 'Central Idea 04 — The Ball Poem (John Berryman)', years: '2022, 2023, 2025', ans: 'The poem brings out the lesson of growing up and accepting loss. Losing his ball teaches the boy how to handle loss and move forward with responsibility.' },
            { title: 'Central Idea 05 — Amanda! (Robin Klein)', years: '2022, 2024, 2025', ans: 'The poem shows a child escaping constant instructions into peaceful imagination, emphasizing the need for understanding and freedom in a child’s growth.' }
          ]
        : [
            { title: 'Central Idea 01 — My Mother at Sixty-Six (Kamala Das)', years: '2022, 2023, 2024, 2025', ans: 'Kamala Das portrays the deep bond between a daughter and her ageing mother, capturing the universal fear of losing one’s parents while hiding pain behind a hopeful smile.' },
            { title: 'Central Idea 02 — Keeping Quiet (Pablo Neruda)', years: '2022, 2024, 2025', ans: 'Pablo Neruda calls for twelve seconds of stillness and introspection so humanity can stop violence, understand itself, and live in peace and harmony.' },
            { title: 'Central Idea 03 — A Thing of Beauty (John Keats)', years: '2022, 2023, 2024, 2025', ans: 'John Keats emphasizes that a thing of beauty is a source of eternal joy. Its loveliness never fades and removes sadness and darkness from human life.' },
            { title: 'Central Idea 04 — A Roadside Stand (Robert Frost)', years: '2023, 2025', ans: 'Robert Frost highlights the economic gap between rich city dwellers and poor rural folk who wait hopefully for city cars to stop and buy their goods.' },
            { title: "Central Idea 05 — Aunt Jennifer's Tigers (Adrienne Rich)", years: '2022, 2023, 2025', ans: 'The poem contrasts Aunt Jennifer’s oppressed married life with the fearless, prancing tigers she embroiders, expressing women’s longing for freedom.' }
          ];

    return [
      ...centralIdeas.map((c, idx) => ({
        id: `${prefix}-s${setNum}-ci-${idx + 1}`,
        section: 'Central Idea / Poem (Choice)' as ExamSectionType,
        choiceGroup: 'Central Idea',
        title: c.title,
        repeatedYears: c.years,
        answer: c.ans
      })),
      {
        id: `${prefix}-s${setNum}-eng-short-1`,
        section: 'Short Answer',
        title: classLevel === '10th'
          ? `Short Answer 01 (Set ${setNum}) — Why did Lencho write a letter to God?`
          : `Short Answer 01 (Set ${setNum}) — What did M. Hamel say about the French language in "The Last Lesson"?`,
        repeatedYears: '2022, 2023, 2024, 2025',
        answer: classLevel === '10th'
          ? 'Hailstones destroyed Lencho’s corn crop completely. Having firm faith in God, he wrote to God asking for 100 pesos to sow his field again.'
          : 'M. Hamel called French the clearest and most logical language in the world and urged everyone to guard it as the key to their freedom.'
      },
      {
        id: `${prefix}-s${setNum}-eng-long-1`,
        section: 'Long Answer',
        title: classLevel === '10th'
          ? `Long Answer (Set ${setNum}) — Character Sketch: Nelson Mandela / Bholi`
          : `Long Answer (Set ${setNum}) — How did Douglas overcome his fear of water? / Character of Dr. Sadao`,
        repeatedYears: '2022, 2023, 2024, 2025',
        answer: classLevel === '10th'
          ? 'Nelson Mandela sacrificed his personal freedom to end apartheid and establish equality in South Africa.'
          : 'Douglas hired an instructor, practised step by step with a belt and pulley, and swam across Lake Wentworth to conquer his terror completely.'
      },
      {
        id: `${prefix}-s${setNum}-eng-gram-1`,
        section: 'Subject Special / Numerical / Grammar',
        title: `Grammar & Letter Writing (Set ${setNum}) — Narration, Transformation & Letter to Editor`,
        repeatedYears: '2022, 2023, 2024, 2025',
        answer: 'Indirect: He said to me, "Are you ready?" → He asked me if I was ready.\nPassive: Do not insult the weak. → Let the weak not be insulted.'
      }
    ];
  }

  // 3. Class 10th Other 4 Subjects (Science, Math, Social Science, Art)
  if (classLevel === '10th') {
    if (key === 'Science') {
      return isEn
        ? [
            { id: `${prefix}-s${setNum}-sci-1`, section: 'Short Answer', title: `Physics Short Question (Set ${setNum}) — Snell's Law & Power of Lens`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Snell’s Law: sin i / sin r = constant (n). Power of lens P = 1/f (in metres), unit Dioptre (D).' },
            { id: `${prefix}-s${setNum}-sci-2`, section: 'Short Answer', title: `Chemistry Short Question (Set ${setNum}) — Neutralisation & Plaster of Paris`, repeatedYears: '2022, 2024, 2025', answer: 'Acid + Base → Salt + Water (HCl + NaOH → NaCl + H₂O). POP formula: CaSO₄·½H₂O.' },
            { id: `${prefix}-s${setNum}-sci-3`, section: 'Long Answer', title: `Long Answer (Set ${setNum}) — Human Eye Defects / Electric Motor / Double Circulation in Heart`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Human heart has 4 chambers ensuring complete separation of oxygenated and deoxygenated blood.' },
            { id: `${prefix}-s${setNum}-sci-4`, section: 'Subject Special / Numerical / Grammar', title: `Numerical & Formulae (Set ${setNum}) — Mirror/Lens Formula & Series/Parallel Resistance`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Mirror: 1/f = 1/v + 1/u | Lens: 1/f = 1/v - 1/u | Series: R = R₁ + R₂ | Parallel: 1/R = 1/R₁ + 1/R₂.' }
          ]
        : [
            { id: `${prefix}-s${setNum}-sci-1`, section: 'Short Answer', title: `भौतिक विज्ञान लघु प्रश्न (Set ${setNum}) — स्नेल का नियम व लेंस की क्षमता`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'स्नेल का नियम: sin i / sin r = नियतांक। लेंस की क्षमता P = 1/f (मीटर में), मात्रक डायोप्टर।' },
            { id: `${prefix}-s${setNum}-sci-2`, section: 'Short Answer', title: `रसायन विज्ञान लघु प्रश्न (Set ${setNum}) — उदासीनीकरण व प्लास्टर ऑफ पेरिस`, repeatedYears: '2022, 2024, 2025', answer: 'अम्ल + क्षार → लवण + जल। प्लास्टर ऑफ पेरिस का सूत्र CaSO₄·½H₂O है।' },
            { id: `${prefix}-s${setNum}-sci-3`, section: 'Long Answer', title: `दीर्घ प्रश्न (Set ${setNum}) — मानव नेत्र / विद्युत मोटर या जनित्र / मानव हृदय`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'मानव हृदय में चार कोष्ठक होते हैं; शुद्ध व अशुद्ध रुधिर का पृथक परिसंचरण होता है।' },
            { id: `${prefix}-s${setNum}-sci-4`, section: 'Subject Special / Numerical / Grammar', title: `आंकिक व सूत्र (Set ${setNum}) — दर्पण/लेंस सूत्र व प्रतिरोध संयोजन`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'दर्पण: 1/f = 1/v + 1/u | लेंस: 1/f = 1/v - 1/u | श्रेणी: R = R₁ + R₂ | समांतर: 1/R = 1/R₁ + 1/R₂।' }
          ];
    }

    if (key === 'Math') {
      return isEn
        ? [
            { id: `${prefix}-s${setNum}-math-1`, section: 'Short Answer', title: `Short Answer 01 (Set ${setNum}) — Prove √3 is irrational & HCF × LCM`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'By contradiction, assuming √3 = p/q (coprime integers) shows 3 divides both p and q, proving √3 is irrational.' },
            { id: `${prefix}-s${setNum}-math-2`, section: 'Short Answer', title: `Short Answer 02 (Set ${setNum}) — Quadratic Formula, AP nth Term & Distance Formula`, repeatedYears: '2022, 2024, 2025', answer: 'x = [-b ± √(b² - 4ac)] / 2a | aₙ = a + (n-1)d | Distance = √[(x₂-x₁)² + (y₂-y₁)²].' },
            { id: `${prefix}-s${setNum}-math-3`, section: 'Long Answer', title: `Long Answer (Set ${setNum}) — Heights & Distances, Thales Theorem & Median/Mode`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Median = l + [(N/2 - cf) / f] × h | Mode = l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h.' },
            { id: `${prefix}-s${setNum}-math-4`, section: 'Subject Special / Numerical / Grammar', title: `Mensuration Formulae (Set ${setNum}) — Sector, Cylinder, Cone & Sphere`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Sector = (θ/360°)πr² | Cylinder = πr²h | Cone = (1/3)πr²h | Sphere = (4/3)πr³.' }
          ]
        : [
            { id: `${prefix}-s${setNum}-math-1`, section: 'Short Answer', title: `लघु प्रश्न 01 (Set ${setNum}) — √3 अपरिमेय सिद्ध करना व HCF × LCM`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'विरोधाभास विधि से √3 = p/q मानने पर 3 दोनों p व q को विभाजित करता है, अतः √3 अपरिमेय है।' },
            { id: `${prefix}-s${setNum}-math-2`, section: 'Short Answer', title: `लघु प्रश्न 02 (Set ${setNum}) — द्विघात सूत्र, AP का nवाँ पद व दूरी सूत्र`, repeatedYears: '2022, 2024, 2025', answer: 'x = [-b ± √(b² - 4ac)] / 2a | aₙ = a + (n-1)d | दूरी = √[(x₂-x₁)² + (y₂-y₁)²]।' },
            { id: `${prefix}-s${setNum}-math-3`, section: 'Long Answer', title: `दीर्घ प्रश्न (Set ${setNum}) — ऊँचाई-दूरी, थेल्स प्रमेय व माध्यिका-बहुलक`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'माध्यिका = l + [(N/2 - cf) / f] × h | बहुलक = l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h।' },
            { id: `${prefix}-s${setNum}-math-4`, section: 'Subject Special / Numerical / Grammar', title: `क्षेत्रमिति सूत्र (Set ${setNum}) — त्रिज्यखंड, बेलन, शंकु व गोला`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'त्रिज्यखंड = (θ/360°)πr² | बेलन = πr²h | शंकु = (1/3)πr²h | गोला = (4/3)πr³।' }
          ];
    }

    if (key === 'Social Science') {
      return isEn
        ? [
            { id: `${prefix}-s${setNum}-sst-1`, section: 'Short Answer', title: `History & Civics (Set ${setNum}) — Non-Cooperation, Civil Disobedience & Federalism`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Non-Cooperation (1920–22) followed Rowlatt Act and Jallianwala Bagh. Federalism divides power between Centre and States.' },
            { id: `${prefix}-s${setNum}-sst-2`, section: 'Short Answer', title: `Geography & Economics (Set ${setNum}) — Soil Conservation, Dams & Globalisation`, repeatedYears: '2022, 2024, 2025', answer: 'Terrace farming and afforestation prevent soil erosion. Globalisation integrates economies via trade and investment.' },
            { id: `${prefix}-s${setNum}-sst-3`, section: 'Long Answer', title: `Long Answer (Set ${setNum}) — Unification of Germany/Italy & Democracy`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Otto von Bismarck unified Germany in 1871 through wars with Denmark, Austria and France.' },
            { id: `${prefix}-s${setNum}-sst-4`, section: 'Subject Special / Numerical / Grammar', title: `Map Work (Set ${setNum}) — Amritsar, Champaran, Dandi, Chauri Chaura & Hirakud`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Amritsar (Punjab), Champaran (Bihar), Dandi (Gujarat), Chauri Chaura (UP), Hirakud (Odisha).' }
          ]
        : [
            { id: `${prefix}-s${setNum}-sst-1`, section: 'Short Answer', title: `इतिहास व नागरिक शास्त्र (Set ${setNum}) — असहयोग, सविनय अवज्ञा व संघवाद`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'असहयोग आंदोलन (1920–22) रौलट एक्ट व जलियाँवाला बाग के विरोध में चला। संघवाद में शक्तियों का विभाजन होता है।' },
            { id: `${prefix}-s${setNum}-sst-2`, section: 'Short Answer', title: `भूगोल व अर्थशास्त्र (Set ${setNum}) — मृदा संरक्षण, बाँध व वैश्वीकरण`, repeatedYears: '2022, 2024, 2025', answer: 'सीढ़ीदार खेती व वृक्षारोपण मृदा संरक्षण के उपाय हैं। वैश्वीकरण से व्यापार व निवेश बढ़ता है।' },
            { id: `${prefix}-s${setNum}-sst-3`, section: 'Long Answer', title: `दीर्घ प्रश्न (Set ${setNum}) — जर्मनी/इटली का एकीकरण व लोकतंत्र`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'बिस्मार्क ने रक्त व लौह की नीति से 1871 ई. में जर्मनी का एकीकरण पूरा किया।' },
            { id: `${prefix}-s${setNum}-sst-4`, section: 'Subject Special / Numerical / Grammar', title: `मानचित्र कार्य (Set ${setNum}) — अमृतसर, चंपारण, दांडी, चौरी-चौरा व हीराकुंड`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'अमृतसर (पंजाब), चंपारण (बिहार), दांडी (गुजरात), चौरी-चौरा (उ.प्र.), हीराकुंड (ओडिशा)।' }
          ];
    }

    return isEn
      ? [
          { id: `${prefix}-s${setNum}-art-1`, section: 'Short Answer', title: `Alekhan / Design (Set ${setNum}) — Lotus/Hibiscus with leaves & buds`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Draw a rhythmic floral design in a 16×12 cm rectangle or 16 cm circle and colour neatly with water colours.' },
          { id: `${prefix}-s${setNum}-art-2`, section: 'Short Answer', title: `Technical Drawing (Set ${setNum}) — Inscribed/Circumscribed circle & tangent`, repeatedYears: '2022, 2024, 2025', answer: 'Construct angle/side bisectors with compass and show clear construction lines.' },
          { id: `${prefix}-s${setNum}-art-3`, section: 'Long Answer', title: `Memory Drawing (Set ${setNum}) — Pitcher, Bucket-Mug, Cup-Plate, Mango, Brinjal`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Draw around 15 cm height with accurate proportion and 2B, 4B, 6B pencil shading.' },
          { id: `${prefix}-s${setNum}-art-4`, section: 'Subject Special / Numerical / Grammar', title: `Colour Theory (Set ${setNum}) — Primary, Secondary & Complementary colours`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Primary: Red, Yellow, Blue | Secondary: Orange, Green, Violet | Opposite: Red-Green, Yellow-Blue.' }
        ]
      : [
          { id: `${prefix}-s${setNum}-art-1`, section: 'Short Answer', title: `आलेखन कला (Set ${setNum}) — कमल/गुड़हल पुष्प, कली व पत्तियों सहित आलेखन`, repeatedYears: '2022, 2023, 2024, 2025', answer: '16×12 सेमी आयत या 16 सेमी वृत्त में लयात्मक आलेखन बनाकर जल रंगों से रंगाई करें।' },
          { id: `${prefix}-s${setNum}-art-2`, section: 'Short Answer', title: `प्राविधिक कला (Set ${setNum}) — अंतः/परिगत वृत्त व स्पर्श रेखा रचना`, repeatedYears: '2022, 2024, 2025', answer: 'परकार व पटरी से कोण/भुजा समद्विभाजक खींचकर स्पष्ट रचना रेखाएँ दिखाएँ।' },
          { id: `${prefix}-s${setNum}-art-3`, section: 'Long Answer', title: `स्मृति चित्रण (Set ${setNum}) — सुराही, बाल्टी-मग, कप-प्लेट, आम, बैंगन`, repeatedYears: '2022, 2023, 2024, 2025', answer: '15 सेमी से कम न हो; सही अनुपात व 2B, 4B, 6B पेंसिल से छाया-प्रकाश दिखाएँ।' },
          { id: `${prefix}-s${setNum}-art-4`, section: 'Subject Special / Numerical / Grammar', title: `रंग सिद्धांत (Set ${setNum}) — प्राथमिक, द्वितीयक व विरोधी रंग`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'प्राथमिक: लाल, पीला, नीला | द्वितीयक: नारंगी, हरा, बैंगनी | विरोधी: लाल-हरा, पीला-नीला।' }
        ];
  }

  // 4. Class 12th Other 4 Subjects (Physics, Chemistry, Biology, Math)
  if (key === 'Physics') {
    return isEn
      ? [
          { id: `${prefix}-s${setNum}-phy-1`, section: 'Short Answer', title: `Short Answer 01 (Set ${setNum}) — Gauss's Law, Drift Velocity & Biot-Savart Law`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Gauss’s Law: Total electric flux Φ = q / ε₀. Drift velocity v_d = (eEτ) / m.' },
          { id: `${prefix}-s${setNum}-phy-2`, section: 'Short Answer', title: `Short Answer 02 (Set ${setNum}) — Photoelectric Effect, Work Function & Threshold Frequency`, repeatedYears: '2022, 2024, 2025', answer: 'Einstein’s equation: K_max = hν - φ₀ = h(ν - ν₀).' },
          { id: `${prefix}-s${setNum}-phy-3`, section: 'Long Answer', title: `Long Answer (Set ${setNum}) — Lens Maker's Formula / Transformer / p-n Junction Rectifier`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Lens Maker’s Formula: 1/f = (n - 1)(1/R₁ - 1/R₂). Full-wave rectifier converts both halves of AC into DC.' },
          { id: `${prefix}-s${setNum}-phy-4`, section: 'Subject Special / Numerical / Grammar', title: `Key Formulae & Numericals (Set ${setNum}) — Capacitance, LCR Impedance & Bohr Radius`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'C = ε₀A / d | Z = √[R² + (X_L - X_C)²] | r_n = 0.53 n² Å.' }
        ]
      : [
          { id: `${prefix}-s${setNum}-phy-1`, section: 'Short Answer', title: `लघु प्रश्न 01 (Set ${setNum}) — गॉस की प्रमेय, अनुगमन वेग व बायो-सेवर्ट नियम`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'गॉस की प्रमेय: Φ = q / ε₀। अनुगमन वेग v_d = (eEτ) / m।' },
          { id: `${prefix}-s${setNum}-phy-2`, section: 'Short Answer', title: `लघु प्रश्न 02 (Set ${setNum}) — प्रकाश विद्युत प्रभाव, कार्यफलन व देहली आवृत्ति`, repeatedYears: '2022, 2024, 2025', answer: 'आइंस्टीन समीकरण: K_max = hν - φ₀ = h(ν - ν₀)।' },
          { id: `${prefix}-s${setNum}-phy-3`, section: 'Long Answer', title: `दीर्घ प्रश्न (Set ${setNum}) — लेंस मेकर सूत्र / ट्रांसफॉर्मर / p-n संधि पूर्ण तरंग दिष्टकारी`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'लेंस मेकर सूत्र: 1/f = (n - 1)(1/R₁ - 1/R₂)। पूर्ण तरंग दिष्टकारी AC के दोनों अर्ध-चक्रों को DC में बदलता है।' },
          { id: `${prefix}-s${setNum}-phy-4`, section: 'Subject Special / Numerical / Grammar', title: `महत्वपूर्ण सूत्र व आंकिक (Set ${setNum}) — संधारित्र, LCR प्रतिबाधा व बोर त्रिज्या`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'C = ε₀A / d | Z = √[R² + (X_L - X_C)²] | r_n = 0.53 n² Å।' }
        ];
  }

  if (key === 'Chemistry') {
    return isEn
      ? [
          { id: `${prefix}-s${setNum}-chem-1`, section: 'Short Answer', title: `Physical Chemistry (Set ${setNum}) — Raoult's Law, Kohlrausch's Law & First-Order Kinetics`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Raoult’s Law: (P° - P)/P° = x₂. First-order rate constant k = (2.303/t) log(R₀/R).' },
          { id: `${prefix}-s${setNum}-chem-2`, section: 'Short Answer', title: `Inorganic Chemistry (Set ${setNum}) — Lanthanide Contraction & IUPAC Naming of Complexes`, repeatedYears: '2022, 2024, 2025', answer: 'Lanthanide contraction is the steady decrease in atomic/ionic radii due to poor shielding of 4f electrons.' },
          { id: `${prefix}-s${setNum}-chem-3`, section: 'Long Answer', title: `Organic Name Reactions (Set ${setNum}) — Aldol, Cannizzaro, Reimer-Tiemann & Hoffmann Bromamide`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Reimer-Tiemann: Phenol + CHCl₃ + NaOH → Salicylaldehyde. Hoffmann Bromamide: RCONH₂ + Br₂ + 4NaOH → RNH₂.' },
          { id: `${prefix}-s${setNum}-chem-4`, section: 'Subject Special / Numerical / Grammar', title: `Conversions & Biomolecules (Set ${setNum}) — Glucose Structure, Peptide Bond & DNA vs RNA`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'DNA has deoxyribose sugar & thymine (double helix); RNA has ribose sugar & uracil (single strand).' }
        ]
      : [
          { id: `${prefix}-s${setNum}-chem-1`, section: 'Short Answer', title: `भौतिक रसायन (Set ${setNum}) — राउल्ट नियम, कोलराउश नियम व प्रथम कोटि अभिक्रिया`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'राउल्ट नियम: (P° - P)/P° = x₂। प्रथम कोटि वेग स्थिरांक k = (2.303/t) log(R₀/R)।' },
          { id: `${prefix}-s${setNum}-chem-2`, section: 'Short Answer', title: `अकार्बनिक रसायन (Set ${setNum}) — लैंथेनॉयड आकुंचन व उपसहसंयोजन यौगिकों के IUPAC नाम`, repeatedYears: '2022, 2024, 2025', answer: '4f इलेक्ट्रॉनों के दुर्बल परिरक्षण प्रभाव के कारण परमाणु त्रिज्या में क्रमिक कमी लैंथेनॉयड आकुंचन कहलाती है।' },
          { id: `${prefix}-s${setNum}-chem-3`, section: 'Long Answer', title: `प्रमुख नाम अभिक्रियाएँ (Set ${setNum}) — ऐल्डॉल, कैनिजारो, राइमर-टीमन व हॉफमैन ब्रोमेमाइड`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'राइमर-टीमन: फीनॉल + CHCl₃ + NaOH → सैलिसिलैल्डिहाइड। हॉफमैन ब्रोमेमाइड: RCONH₂ → RNH₂।' },
          { id: `${prefix}-s${setNum}-chem-4`, section: 'Subject Special / Numerical / Grammar', title: `जैव अणु व परिवर्तन (Set ${setNum}) — ग्लूकोज़ संरचना, पेप्टाइड बंध व DNA-RNA अंतर`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'DNA में डीऑक्सीराइबोज शर्करा व थायमीन होता है; RNA में राइबोज शर्करा व यूरेसिल होता है।' }
        ];
  }

  if (key === 'Biology') {
    return isEn
      ? [
          { id: `${prefix}-s${setNum}-bio-1`, section: 'Short Answer', title: `Reproduction (Set ${setNum}) — Double Fertilization, Spermatogenesis & MTP/IVF`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Double fertilization involves syngamy (zygote 2n) and triple fusion (primary endosperm nucleus 3n).' },
          { id: `${prefix}-s${setNum}-bio-2`, section: 'Short Answer', title: `Genetics & Evolution (Set ${setNum}) — Incomplete Dominance, Sex Determination & Lac Operon`, repeatedYears: '2022, 2024, 2025', answer: 'In humans, XX is female and XY is male; the sperm chromosome determines the sex of the child.' },
          { id: `${prefix}-s${setNum}-bio-3`, section: 'Long Answer', title: `Long Answer (Set ${setNum}) — DNA Replication (Meselson-Stahl) / Recombinant DNA Technology`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'rDNA steps: Isolation of DNA, cutting with restriction endonuclease, ligation into vector, transformation and expression.' },
          { id: `${prefix}-s${setNum}-bio-4`, section: 'Subject Special / Numerical / Grammar', title: `Ecology & Human Health (Set ${setNum}) — Immunity, AIDS/Malaria & Biodiversity Conservation`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'In-situ conservation: National parks & sanctuaries; Ex-situ conservation: Seed banks & botanical gardens.' }
        ]
      : [
          { id: `${prefix}-s${setNum}-bio-1`, section: 'Short Answer', title: `जनन (Set ${setNum}) — द्विनिषेचन, शुक्रजनन व IVF/जनसंख्या नियंत्रण`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'द्विनिषेचन में युग्मक संलयन (युग्मनज 2n) तथा त्रिसंलयन (भ्रूणपोष 3n) दोनों होते हैं।' },
          { id: `${prefix}-s${setNum}-bio-2`, section: 'Short Answer', title: `आनुवंशिकी (Set ${setNum}) — अपूर्ण प्रभाविता, मानव में लिंग निर्धारण व लैक ओपेरॉन`, repeatedYears: '2022, 2024, 2025', answer: 'मानव में मादा XX तथा नर XY होता है; संतान का लिंग शुक्राणु के गुणसूत्र पर निर्भर करता है।' },
          { id: `${prefix}-s${setNum}-bio-3`, section: 'Long Answer', title: `दीर्घ प्रश्न (Set ${setNum}) — DNA प्रतिकृति (अर्धसंरक्षी विधि) / पुनर्योगज DNA तकनीक`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'rDNA तकनीक: DNA पृथक्करण, प्रतिबंधन एंजाइम से काटना, लाइगेज द्वारा संवाहक से जोड़ना व पोषी में स्थानांतरण।' },
          { id: `${prefix}-s${setNum}-bio-4`, section: 'Subject Special / Numerical / Grammar', title: `पारिस्थितिकी व स्वास्थ्य (Set ${setNum}) — प्रतिरक्षा, मलेरिया/एड्स व जैव विविधता संरक्षण`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'स्वस्थाने (In-situ): राष्ट्रीय उद्यान व अभयारण्य; बाह्यस्थाने (Ex-situ): बीज बैंक व वनस्पति उद्यान।' }
        ];
  }

  return isEn
    ? [
        { id: `${prefix}-s${setNum}-m12-1`, section: 'Short Answer', title: `Relations & Matrices (Set ${setNum}) — Equivalence Relation, Principal Value & Inverse Matrix`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'A relation is equivalence if it is reflexive, symmetric and transitive. A⁻¹ = (1 / |A|) adj(A) when |A| ≠ 0.' },
        { id: `${prefix}-s${setNum}-m12-2`, section: 'Short Answer', title: `Calculus Short (Set ${setNum}) — Continuity, Maxima-Minima & Integration by Parts`, repeatedYears: '2022, 2024, 2025', answer: '∫ u·v dx = u ∫ v dx - ∫ (du/dx · ∫ v dx) dx (ILATE rule).' },
        { id: `${prefix}-s${setNum}-m12-3`, section: 'Long Answer', title: `Long Answer (Set ${setNum}) — System of Linear Equations by Matrix Method & Definite Integrals`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'AX = B ⇒ X = A⁻¹B. Property: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx.' },
        { id: `${prefix}-s${setNum}-m12-4`, section: 'Subject Special / Numerical / Grammar', title: `Vectors, 3D & Probability (Set ${setNum}) — Shortest Distance & Bayes' Theorem`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'Shortest distance d = |[(a₂ - a₁) · (b₁ × b₂)]| / |b₁ × b₂|. Bayes’ Theorem: P(Eᵢ|A) = P(Eᵢ)P(A|Eᵢ) / Σ P(Eⱼ)P(A|Eⱼ).' }
      ]
    : [
        { id: `${prefix}-s${setNum}-m12-1`, section: 'Short Answer', title: `संबंध व आव्यूह (Set ${setNum}) — तुल्यता संबंध, मुख्य मान व व्युत्क्रम आव्यूह A⁻¹`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'स्वतुल्य, सममित व संक्रामक होने पर संबंध तुल्यता होता है। A⁻¹ = (1 / |A|) adj(A), जहाँ |A| ≠ 0।' },
        { id: `${prefix}-s${setNum}-m12-2`, section: 'Short Answer', title: `कलन लघु प्रश्न (Set ${setNum}) — सांतत्य, उच्चिष्ठ-निम्निष्ठ व खंडशः समाकलन`, repeatedYears: '2022, 2024, 2025', answer: '∫ u·v dx = u ∫ v dx - ∫ (du/dx · ∫ v dx) dx (ILATE नियम)।' },
        { id: `${prefix}-s${setNum}-m12-3`, section: 'Long Answer', title: `दीर्घ प्रश्न (Set ${setNum}) — आव्यूह विधि से रैखिक समीकरण हल व निश्चित समाकलन`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'AX = B ⇒ X = A⁻¹B। प्रगुण: ∫₀ᵃ f(x) dx = ∫₀ᵃ f(a - x) dx।' },
        { id: `${prefix}-s${setNum}-m12-4`, section: 'Subject Special / Numerical / Grammar', title: `सदिश, 3D व प्रायिकता (Set ${setNum}) — न्यूनतम दूरी व बेज़ प्रमेय`, repeatedYears: '2022, 2023, 2024, 2025', answer: 'न्यूनतम दूरी d = |[(a₂ - a₁) · (b₁ × b₂)]| / |b₁ × b₂|। बेज़ प्रमेय: P(Eᵢ|A) = P(Eᵢ)P(A|Eᵢ) / Σ P(Eⱼ)P(A|Eⱼ)।' }
      ];
}

function buildSevenDaySets(
  prefix: string,
  classLevel: ClassLevel,
  subjectName: string,
  subjectKey: string,
  medium: MediumType
): DailyPaperSet[] {
  const dayNames = [
    'Day 1 • Set 1',
    'Day 2 • Set 2',
    'Day 3 • Set 3',
    'Day 4 • Set 4',
    'Day 5 • Set 5',
    'Day 6 • Set 6',
    'Day 7 • Set 7'
  ];

  return dayNames.map((dayLabel, idx) => {
    const setNumber = (idx + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
    return {
      setNumber,
      dayLabel,
      examPatternNote: `Class ${classLevel} • ${subjectName} (${medium}) • ${dayLabel}`,
      mcqs: makeTwentyMcqs(prefix, classLevel, subjectKey, setNumber, medium),
      items: makeItemsForSubject(prefix, classLevel, subjectKey, setNumber, medium)
    };
  });
}

/* ==================== EXPORTED BOARD PREP PACKAGES ==================== */

export const BOARD_PREP_PACKAGES: SubjectPaperConfig[] = [
  // ============== CLASS 10TH - HINDI MEDIUM (6 SUBJECTS) ==============
  {
    id: '10-Hindi-Hindi',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Hindi (हिंदी)',
    levelNote: 'Class 10th • गद्य, पद्य, संस्कृत, जीवन परिचय, व्याकरण व निबंध',
    sets: buildSevenDaySets('10-hi-hin', '10th', 'Hindi (हिंदी)', 'Hindi', 'Hindi')
  },
  {
    id: '10-Hindi-English',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'English (अंग्रेज़ी)',
    levelNote: 'Class 10th • Prose, Poetry, Central Idea, Supplementary & Grammar',
    sets: buildSevenDaySets('10-hi-eng', '10th', 'English (अंग्रेज़ी)', 'English', 'Hindi')
  },
  {
    id: '10-Hindi-Math',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Mathematics (गणित)',
    levelNote: 'Class 10th • बीजगणित, ज्यामिति, त्रिकोणमिति, क्षेत्रमिति व सांख्यिकी',
    sets: buildSevenDaySets('10-hi-math', '10th', 'Mathematics (गणित)', 'Math', 'Hindi')
  },
  {
    id: '10-Hindi-Science',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Science (भौतिक + रसायन + जीव विज्ञान)',
    levelNote: 'Class 10th • Physics, Chemistry व Biology तीनों खंडों के प्रश्न',
    sets: buildSevenDaySets('10-hi-sci', '10th', 'Science (विज्ञान)', 'Science', 'Hindi')
  },
  {
    id: '10-Hindi-SocialScience',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Social Science (सामाजिक विज्ञान)',
    levelNote: 'Class 10th • इतिहास, भूगोल, नागरिक शास्त्र, अर्थशास्त्र व मानचित्र',
    sets: buildSevenDaySets('10-hi-sst', '10th', 'Social Science (सामाजिक विज्ञान)', 'Social Science', 'Hindi')
  },
  {
    id: '10-Hindi-Art',
    classLevel: '10th',
    medium: 'Hindi',
    subjectName: 'Art (कला / चित्रकला)',
    levelNote: 'Class 10th • आलेखन, स्मृति चित्रण, प्राविधिक व सैद्धांतिक प्रश्न',
    sets: buildSevenDaySets('10-hi-art', '10th', 'Art (कला)', 'Art', 'Hindi')
  },

  // ============== CLASS 10TH - ENGLISH MEDIUM (6 SUBJECTS) ==============
  {
    id: '10-English-Hindi',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Hindi (हिंदी)',
    levelNote: 'Class 10th • जीवन परिचय, गद्यांश, पद्यांश, संस्कृत व व्याकरण',
    sets: buildSevenDaySets('10-en-hin', '10th', 'Hindi (हिंदी)', 'Hindi', 'English')
  },
  {
    id: '10-English-English',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'English',
    levelNote: 'Class 10th • Prose, Poetry, Central Idea, Supplementary & Grammar',
    sets: buildSevenDaySets('10-en-eng', '10th', 'English', 'English', 'English')
  },
  {
    id: '10-English-Math',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Mathematics',
    levelNote: 'Class 10th • Algebra, Geometry, Trigonometry, Mensuration & Statistics',
    sets: buildSevenDaySets('10-en-math', '10th', 'Mathematics', 'Math', 'English')
  },
  {
    id: '10-English-Science',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Science (Physics + Chemistry + Biology)',
    levelNote: 'Class 10th • All three sections with numericals and diagrams',
    sets: buildSevenDaySets('10-en-sci', '10th', 'Science', 'Science', 'English')
  },
  {
    id: '10-English-SocialScience',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Social Science',
    levelNote: 'Class 10th • History, Geography, Civics, Economics & Map Work',
    sets: buildSevenDaySets('10-en-sst', '10th', 'Social Science', 'Social Science', 'English')
  },
  {
    id: '10-English-Art',
    classLevel: '10th',
    medium: 'English',
    subjectName: 'Art (Drawing)',
    levelNote: 'Class 10th • Alekhan, Memory Drawing, Technical & Colour Theory',
    sets: buildSevenDaySets('10-en-art', '10th', 'Art', 'Art', 'English')
  },

  // ============== CLASS 12TH - HINDI MEDIUM (6 SUBJECTS) ==============
  {
    id: '12-Hindi-Hindi',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Hindi (सामान्य / साहित्यिक हिंदी)',
    levelNote: 'Class 12th • साहित्यिक परिचय, गद्यांश, पद्यांश, संस्कृत व खंडकाव्य',
    sets: buildSevenDaySets('12-hi-hin', '12th', 'Hindi (हिंदी)', 'Hindi', 'Hindi')
  },
  {
    id: '12-Hindi-English',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'English (अंग्रेज़ी)',
    levelNote: 'Class 12th • Flamingo, Vistas, Central Idea, Writing & Grammar',
    sets: buildSevenDaySets('12-hi-eng', '12th', 'English', 'English', 'Hindi')
  },
  {
    id: '12-Hindi-Physics',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Physics (भौतिक विज्ञान)',
    levelNote: 'Class 12th • स्थिर वैद्युतिकी, विद्युत धारा, चुंबकत्व, प्रकाशिकी व आधुनिक भौतिकी',
    sets: buildSevenDaySets('12-hi-phy', '12th', 'Physics (भौतिक विज्ञान)', 'Physics', 'Hindi')
  },
  {
    id: '12-Hindi-Chemistry',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Chemistry (रसायन विज्ञान)',
    levelNote: 'Class 12th • भौतिक, अकार्बनिक व कार्बनिक रसायन',
    sets: buildSevenDaySets('12-hi-chem', '12th', 'Chemistry (रसायन विज्ञान)', 'Chemistry', 'Hindi')
  },
  {
    id: '12-Hindi-Biology',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Biology (जीव विज्ञान)',
    levelNote: 'Class 12th • जनन, आनुवंशिकी, जैव प्रौद्योगिकी, मानव स्वास्थ्य व पारिस्थितिकी',
    sets: buildSevenDaySets('12-hi-bio', '12th', 'Biology (जीव विज्ञान)', 'Biology', 'Hindi')
  },
  {
    id: '12-Hindi-Math',
    classLevel: '12th',
    medium: 'Hindi',
    subjectName: 'Mathematics (गणित)',
    levelNote: 'Class 12th • संबंध-फलन, आव्यूह-सारणिक, कलन, सदिश-त्रिविमीय व प्रायिकता',
    sets: buildSevenDaySets('12-hi-math', '12th', 'Mathematics (गणित)', 'Math', 'Hindi')
  },

  // ============== CLASS 12TH - ENGLISH MEDIUM (6 SUBJECTS) ==============
  {
    id: '12-English-Hindi',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Hindi (हिंदी)',
    levelNote: 'Class 12th • साहित्यिक परिचय, गद्यांश, पद्यांश, संस्कृत व खंडकाव्य',
    sets: buildSevenDaySets('12-en-hin', '12th', 'Hindi (हिंदी)', 'Hindi', 'English')
  },
  {
    id: '12-English-English',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'English',
    levelNote: 'Class 12th • Flamingo, Vistas, Central Idea, Writing & Grammar',
    sets: buildSevenDaySets('12-en-eng', '12th', 'English', 'English', 'English')
  },
  {
    id: '12-English-Physics',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Physics',
    levelNote: 'Class 12th • Electrostatics, Current, Magnetism, Optics & Modern Physics',
    sets: buildSevenDaySets('12-en-phy', '12th', 'Physics', 'Physics', 'English')
  },
  {
    id: '12-English-Chemistry',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Chemistry',
    levelNote: 'Class 12th • Physical, Inorganic & Organic Chemistry',
    sets: buildSevenDaySets('12-en-chem', '12th', 'Chemistry', 'Chemistry', 'English')
  },
  {
    id: '12-English-Biology',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Biology',
    levelNote: 'Class 12th • Reproduction, Genetics, Biotech, Health & Ecology',
    sets: buildSevenDaySets('12-en-bio', '12th', 'Biology', 'Biology', 'English')
  },
  {
    id: '12-English-Math',
    classLevel: '12th',
    medium: 'English',
    subjectName: 'Mathematics',
    levelNote: 'Class 12th • Relations-Matrices, Calculus, Vectors-3D & Probability',
    sets: buildSevenDaySets('12-en-math', '12th', 'Mathematics', 'Math', 'English')
  }
];
