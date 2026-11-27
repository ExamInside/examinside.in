import React, { useMemo, useState } from 'react';
import {
  BOARD_PREP_PACKAGES,
  ClassLevel,
  MediumType,
} from './boardPrepData';

interface BoardExamHubProps {
  onBack?: () => void;
}

export const BoardExamHub: React.FC<BoardExamHubProps> = ({ onBack }) => {
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('10th');
  const [selectedMedium, setSelectedMedium] = useState<MediumType>('Hindi');

  const availableSubjects = useMemo(
    () =>
      BOARD_PREP_PACKAGES.filter(
        (pkg) => pkg.classLevel === selectedClass && pkg.medium === selectedMedium
      ),
    [selectedClass, selectedMedium]
  );

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    BOARD_PREP_PACKAGES[0].id
  );
  const [selectedSetNumber, setSelectedSetNumber] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'mcq' | 'paper'>('paper');

  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const currentPackage = useMemo(() => {
    return (
      availableSubjects.find((s) => s.id === selectedSubjectId) ||
      availableSubjects[0]
    );
  }, [availableSubjects, selectedSubjectId]);

  const currentSet = useMemo(() => {
    if (!currentPackage) return undefined;
    return (
      currentPackage.sets.find((s) => s.setNumber === selectedSetNumber) ||
      currentPackage.sets[0]
    );
  }, [currentPackage, selectedSetNumber]);

  const resetStates = () => {
    setMcqAnswers({});
    setExpandedIds({});
  };

  const handleClassChange = (cls: ClassLevel) => {
    setSelectedClass(cls);
    const list = BOARD_PREP_PACKAGES.filter(
      (p) => p.classLevel === cls && p.medium === selectedMedium
    );
    if (list[0]) setSelectedSubjectId(list[0].id);
    setSelectedSetNumber(1);
    resetStates();
  };

  const handleMediumChange = (med: MediumType) => {
    setSelectedMedium(med);
    const list = BOARD_PREP_PACKAGES.filter(
      (p) => p.classLevel === selectedClass && p.medium === med
    );
    if (list[0]) setSelectedSubjectId(list[0].id);
    setSelectedSetNumber(1);
    resetStates();
  };

  const handleSubjectChange = (subId: string) => {
    setSelectedSubjectId(subId);
    setSelectedSetNumber(1);
    resetStates();
  };

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const score = useMemo(() => {
    if (!currentSet) return 0;
    return currentSet.mcqs.reduce(
      (sum, q) => sum + (mcqAnswers[q.id] === q.correctIndex ? 1 : 0),
      0
    );
  }, [currentSet, mcqAnswers]);

  return (
    <section
      style={{
        maxWidth: '940px',
        margin: '16px auto',
        padding: '16px',
        borderRadius: '14px',
        border: '1px solid #cbd5e1',
        backgroundColor: '#ffffff',
        color: '#0f172a',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* हेडर */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '14px',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700 }}>
            UP Board 7-Day • 7-Set Exam Practice & Answer Bank
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#475569' }}>
            Class → Medium → Subject → Day/Set चुनें; हर प्रश्न/विकल्प पर क्लिक करते ही पूरा उत्तर खुलेगा
          </p>
        </div>

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #94a3b8',
              backgroundColor: '#f8fafc',
              color: '#0f172a',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            ← वापस जाएं
          </button>
        )}
      </div>

      {/* 1. Class */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
          1. Class चुनें:
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['10th', '12th'] as ClassLevel[]).map((cls) => {
            const active = selectedClass === cls;
            return (
              <button
                key={cls}
                type="button"
                onClick={() => handleClassChange(cls)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: active ? '2px solid #2563eb' : '1px solid #cbd5e1',
                  backgroundColor: active ? '#eff6ff' : '#ffffff',
                  color: active ? '#1d4ed8' : '#0f172a',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Class {cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Medium */}
      <div style={{ marginBottom: '10px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
          2. Medium चुनें:
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['Hindi', 'English'] as MediumType[]).map((med) => {
            const active = selectedMedium === med;
            return (
              <button
                key={med}
                type="button"
                onClick={() => handleMediumChange(med)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: active ? '2px solid #059669' : '1px solid #cbd5e1',
                  backgroundColor: active ? '#ecfdf5' : '#ffffff',
                  color: active ? '#047857' : '#0f172a',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {med} Medium
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Subject */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
          3. Subject चुनें:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {availableSubjects.map((sub) => {
            const active = currentPackage?.id === sub.id;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleSubjectChange(sub.id)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: active ? '2px solid #7c3aed' : '1px solid #cbd5e1',
                  backgroundColor: active ? '#f5f3ff' : '#f8fafc',
                  color: active ? '#6d28d9' : '#0f172a',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                {sub.subjectName}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. 7-Day / 7-Set */}
      {currentPackage && (
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
            4. 7-Day / 7-Set चुनें (हर दिन 1 नया सेट):
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {currentPackage.sets.map((s) => {
              const active = currentSet?.setNumber === s.setNumber;
              return (
                <button
                  key={s.setNumber}
                  type="button"
                  onClick={() => {
                    setSelectedSetNumber(s.setNumber);
                    resetStates();
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: active ? '2px solid #d97706' : '1px solid #cbd5e1',
                    backgroundColor: active ? '#fffbeb' : '#ffffff',
                    color: active ? '#b45309' : '#334155',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  {s.dayLabel}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: '6px', fontSize: '12px', color: '#475569' }}>
            {currentPackage.levelNote}
          </div>
        </div>
      )}

      {/* सेक्शन स्विच */}
      {currentSet && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#f1f5f9',
              marginBottom: '14px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setActiveTab('paper')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === 'paper' ? '#2563eb' : '#ffffff',
                  color: activeTab === 'paper' ? '#ffffff' : '#0f172a',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                पेपर प्रश्न व विकल्प — उत्तर देखें ({currentSet.items.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('mcq')}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: activeTab === 'mcq' ? '#2563eb' : '#ffffff',
                  color: activeTab === 'mcq' ? '#ffffff' : '#0f172a',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                20 MCQ प्रैक्टिस ({score}/{currentSet.mcqs.length})
              </button>
            </div>

            <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
              {currentSet.examPatternNote}
            </div>
          </div>

          {/* क्लिक करने पर खुलने वाले उत्तर (विकल्प + प्रश्न + जीवन परिचय/गद्यांश/पद्यांश/श्लोक/Central Idea) */}
          {activeTab === 'paper' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentSet.items.map((item) => {
                const isOpen = !!expandedIds[item.id];
                return (
                  <div
                    key={item.id}
                    style={{
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      overflow: 'hidden',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 14px',
                        border: 'none',
                        backgroundColor: isOpen ? '#eff6ff' : '#f8fafc',
                        color: '#0f172a',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '999px',
                              backgroundColor: '#dbeafe',
                              color: '#1e40af',
                            }}
                          >
                            {item.section}
                          </span>
                          {item.repeatedYears && (
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '999px',
                                backgroundColor: '#fef3c7',
                                color: '#92400e',
                              }}
                            >
                              {item.repeatedYears}
                            </span>
                          )}
                        </div>

                        {item.choiceGroup && (
                          <div style={{ fontSize: '11.5px', color: '#475569', marginBottom: '2px' }}>
                            {item.choiceGroup}
                          </div>
                        )}

                        <div style={{ fontWeight: 700, fontSize: '14px' }}>
                          {item.title}
                        </div>
                      </div>

                      <span style={{ fontWeight: 700, fontSize: '12.5px', color: '#2563eb' }}>
                        {isOpen ? 'छुपाएं ▲' : 'उत्तर देखें ▼'}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding: '12px 14px',
                          borderTop: '1px solid #e2e8f0',
                          backgroundColor: '#ffffff',
                          fontSize: '13.5px',
                          lineHeight: 1.65,
                          whiteSpace: 'pre-line',
                          color: '#0f172a',
                        }}
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* 20 MCQ */}
          {activeTab === 'mcq' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentSet.mcqs.map((mcq, idx) => {
                const chosen = mcqAnswers[mcq.id];
                const answered = chosen !== undefined;
                const right = chosen === mcq.correctIndex;

                return (
                  <div
                    key={mcq.id}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#fafafa',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <div style={{ fontWeight: 700, fontSize: '14px' }}>
                        {idx + 1}. {mcq.question}
                      </div>
                      {mcq.repeatedYears && (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '999px',
                            backgroundColor: '#fef3c7',
                            color: '#92400e',
                          }}
                        >
                          {mcq.repeatedYears}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {mcq.options.map((opt, oIdx) => {
                        const isSelected = chosen === oIdx;
                        const isCorrectOpt = mcq.correctIndex === oIdx;

                        let bg = '#ffffff';
                        let border = '1px solid #cbd5e1';

                        if (answered) {
                          if (isCorrectOpt) {
                            bg = '#dcfce7';
                            border = '1px solid #16a34a';
                          } else if (isSelected) {
                            bg = '#fee2e2';
                            border = '1px solid #dc2626';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() =>
                              setMcqAnswers((prev) => ({ ...prev, [mcq.id]: oIdx }))
                            }
                            style={{
                              textAlign: 'left',
                              padding: '8px 10px',
                              borderRadius: '8px',
                              border,
                              backgroundColor: bg,
                              color: '#0f172a',
                              cursor: 'pointer',
                              fontSize: '13px',
                            }}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {answered && (
                      <div
                        style={{
                          marginTop: '8px',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          backgroundColor: right ? '#f0fdf4' : '#fef2f2',
                          fontSize: '12.5px',
                        }}
                      >
                        <strong>{right ? 'सही उत्तर!' : 'गलत उत्तर!'}</strong> {mcq.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </section>
  );
};
