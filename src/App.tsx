import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ControlsBar } from './components/ControlsBar';
import { SubjectCard } from './components/SubjectCard';
import { SubjectDetailModal } from './components/SubjectDetailModal';
import { HighYieldNotesSection } from './components/HighYieldNotesSection';
import { ModelPapersSection } from './components/ModelPapersSection';
import { BiographiesSection } from './components/BiographiesSection';
import { ExamTipsSection } from './components/ExamTipsSection';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { SyllabusManagerModal } from './components/SyllabusManagerModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import {
  OPTIONAL_REMOTE_FEED_URL,
  PUBLIC_BACKEND_CONFIG_PATH,
  getLastAppliedBackendSignature,
  isOwnerIconPinned,
  isOwnerSessionUnlocked,
  resolveBackendConfigPayload,
  setLastAppliedBackendSignature,
  setOwnerIconPinned,
  setOwnerSessionUnlocked,
} from './config/ownerSyllabusConfig';
import {
  Medium,
  ClassLevel,
  SubjectItem,
  ResourceType,
  ChapterEntry,
  SubjectBlueprint,
  MCQQuestion,
  ImportantQuestion,
  BiographyItem,
  HighYieldNoteItem,
  ExamTipItem,
  SyllabusYearPack,
  hydrateBlueprints,
  clearChapterQuestionCache,
} from './data/curriculumData';
import { filterSubjects, toggleBookmarkId } from './utils/examLogic';
import {
  SavedPacksState,
  addCustomMcqToPack,
  applyGlobalPaperUrlPatternInPack,
  buildDefault2026Pack,
  deleteBiographyInPack,
  deleteImportantQuestionInPack,
  fetchAndImportPackFromUrl,
  loadSavedPacksState,
  savePacksState,
  shiftYearPack,
  updatePaperPdfUrlInPack,
  updateSubjectBlueprintInPack,
  upsertBiographyInPack,
  upsertImportantQuestionInPack,
} from './utils/syllabusPackManager';
import AdBanner320x50 from "./components/AdBanner320x50";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  const [medium, setMedium] = useState<Medium>('hindi');
  const [selectedClass, setSelectedClass] = useState<ClassLevel>('10');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [mobileTabKey, setMobileTabKey] = useState<
    'home' | '10' | '12' | 'mcqs' | 'notes' | 'papers'
  >('home');

  const [packsState, setPacksState] = useState<SavedPacksState>(() =>
    loadSavedPacksState()
  );
  const [isOwnerAdmin, setIsOwnerAdmin] = useState<boolean>(() =>
    isOwnerSessionUnlocked()
  );
  const [isOwnerIconVisible, setIsOwnerIconVisible] = useState<boolean>(() =>
    isOwnerIconPinned() || isOwnerSessionUnlocked()
  );
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState<boolean>(false);
  const [isSyllabusManagerOpen, setIsSyllabusManagerOpen] = useState<boolean>(false);

  const activePack = useMemo(
    () =>
      packsState.packs.find((p) => p.id === packsState.activePackId) ||
      packsState.packs[0],
    [packsState]
  );

  const hydratedSubjects = useMemo(() => {
    clearChapterQuestionCache();
    return hydrateBlueprints(
      activePack.class10Blueprints,
      activePack.class12Blueprints,
      activePack.session
    );
  }, [activePack]);

  const activeSession = activePack.session;

  const [bookmarkedSubjectIds, setBookmarkedSubjectIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('examinside_bookmarks');
        return saved ? JSON.parse(saved) : ['c10-hindi', 'c10-maths'];
      } catch {
        return ['c10-hindi'];
      }
    }
    return [];
  });

  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);

  const [activeModalSubjectId, setActiveModalSubjectId] = useState<string | null>(
    null
  );
  const [activeModalResource, setActiveModalResource] =
    useState<ResourceType>('chapters');
  const [activeModalChapter, setActiveModalChapter] = useState<
    ChapterEntry | undefined
  >(undefined);

  const activeModalSubject = useMemo(
    () => hydratedSubjects.find((s) => s.id === activeModalSubjectId) || null,
    [hydratedSubjects, activeModalSubjectId]
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'examinside_bookmarks',
        JSON.stringify(bookmarkedSubjectIds)
      );
    } catch {
      // ignore storage error
    }
  }, [bookmarkedSubjectIds]);

  useEffect(() => {
    savePacksState(packsState);
  }, [packsState]);

  const clearAdminUrlParams = () => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    let dirty = false;
    if (url.hash === '#admin') {
      url.hash = '';
      dirty = true;
    }
    if (url.searchParams.has('admin')) {
      url.searchParams.delete('admin');
      dirty = true;
    }
    if (dirty) {
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  };

  const handleOpenSecretAdmin = () => {
    if (isOwnerAdmin) {
      setIsSyllabusManagerOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleOwnerAuthenticated = (keepIconVisible: boolean) => {
    setOwnerSessionUnlocked(true);
    setOwnerIconPinned(keepIconVisible);
    setIsOwnerAdmin(true);
    setIsOwnerIconVisible(keepIconVisible);
    setIsAdminAuthOpen(false);
    setIsSyllabusManagerOpen(true);
    clearAdminUrlParams();
  };

  const handleLockAdmin = () => {
    setOwnerSessionUnlocked(false);
    setIsOwnerAdmin(false);
    setIsSyllabusManagerOpen(false);
    setIsAdminAuthOpen(false);
    clearAdminUrlParams();
  };

  const handleLockAndHideIcon = () => {
    setOwnerSessionUnlocked(false);
    setOwnerIconPinned(false);
    setIsOwnerAdmin(false);
    setIsOwnerIconVisible(false);
    setIsSyllabusManagerOpen(false);
    setIsAdminAuthOpen(false);
    clearAdminUrlParams();
  };

  // Secret Owner Admin triggers: Ctrl+Shift+A (or Cmd+Shift+A) + #admin / ?admin=1 URL
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkUrlTrigger = () => {
      const params = new URLSearchParams(window.location.search);
      if (window.location.hash === '#admin' || params.get('admin') === '1') {
        if (isOwnerSessionUnlocked()) {
          setIsOwnerAdmin(true);
          setIsSyllabusManagerOpen(true);
        } else {
          setIsAdminAuthOpen(true);
        }
      }
    };

    checkUrlTrigger();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (isOwnerSessionUnlocked()) {
          setIsOwnerAdmin(true);
          setIsSyllabusManagerOpen(true);
        } else {
          setIsAdminAuthOpen(true);
        }
      }
    };

    window.addEventListener('hashchange', checkUrlTrigger);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkUrlTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Silent backend config loader (/public/syllabus-config.json & optional remote URL)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let cancelled = false;

    const applyPackSilently = (pack: SyllabusYearPack, sig?: string) => {
      if (cancelled) return;
      handleImportPack(pack);
      if (sig) setLastAppliedBackendSignature(sig);
    };

    const params = new URLSearchParams(window.location.search);
    const queryPackUrl = params.get('packUrl');
    if (queryPackUrl) {
      fetchAndImportPackFromUrl(queryPackUrl)
        .then((imported) => applyPackSilently(imported))
        .catch(() => {
          // ignore invalid startup sync URL gracefully
        });
      return () => {
        cancelled = true;
      };
    }

    const syncFromBackend = async () => {
      let handledRemote = false;
      try {
        const res = await fetch(PUBLIC_BACKEND_CONFIG_PATH, { cache: 'no-store' });
        if (res.ok) {
          const text = await res.text();
          const resolved = resolveBackendConfigPayload(text);
          const lastSig = getLastAppliedBackendSignature();
          if (resolved.signature && resolved.signature !== lastSig) {
            if (resolved.pack) {
              applyPackSilently(resolved.pack, resolved.signature);
            } else if (resolved.remotePackUrl) {
              handledRemote = true;
              const remotePack = await fetchAndImportPackFromUrl(resolved.remotePackUrl);
              applyPackSilently(remotePack, resolved.signature);
            }
          }
        }
      } catch {
        // silent fallback to local cached/default pack
      }

      if (!handledRemote && OPTIONAL_REMOTE_FEED_URL.trim()) {
        try {
          const remotePack = await fetchAndImportPackFromUrl(OPTIONAL_REMOTE_FEED_URL);
          applyPackSilently(remotePack);
        } catch {
          // silent fallback
        }
      }
    };

    syncFromBackend();
    return () => {
      cancelled = true;
    };
  }, []);

  const mutateActivePack = (
    updater: (pack: SyllabusYearPack) => SyllabusYearPack
  ) => {
    setPacksState((prev) => ({
      ...prev,
      packs: prev.packs.map((p) =>
        p.id === activePack.id ? updater(p) : p
      ),
    }));
  };

  const handleSelectPack = (packId: string) => {
    setPacksState((prev) => ({ ...prev, activePackId: packId }));
  };

  const handleCreateOrShiftPack = (
    examYear: number,
    paperYears: number[],
    packLabel?: string
  ) => {
    const newPack = shiftYearPack(activePack, examYear, paperYears, packLabel);
    setPacksState((prev) => {
      const exists = prev.packs.some((p) => p.id === newPack.id);
      return {
        activePackId: newPack.id,
        packs: exists
          ? prev.packs.map((p) => (p.id === newPack.id ? newPack : p))
          : [newPack, ...prev.packs],
      };
    });
  };

  const handleDeletePack = (packId: string) => {
    setPacksState((prev) => {
      if (prev.packs.length <= 1) return prev;
      const remaining = prev.packs.filter((p) => p.id !== packId);
      const nextActive =
        prev.activePackId === packId ? remaining[0].id : prev.activePackId;
      return { activePackId: nextActive, packs: remaining };
    });
  };

  const handleUpdateSubjectBlueprint = (updatedBp: SubjectBlueprint) => {
    mutateActivePack((pack) => updateSubjectBlueprintInPack(pack, updatedBp));
  };

  const handleSavePaperUrl = (
    subjectId: string,
    paperId: string,
    pdfUrl: string
  ) => {
    mutateActivePack((pack) =>
      updatePaperPdfUrlInPack(pack, subjectId, paperId, pdfUrl)
    );
  };

  const handleAddCustomMcq = (
    subjectId: string,
    mcq: Omit<MCQQuestion, 'questionNumber'>
  ) => {
    mutateActivePack((pack) => addCustomMcqToPack(pack, subjectId, mcq));
  };

  const handleUpdateNotes = (notes: HighYieldNoteItem[]) => {
    mutateActivePack((pack) => ({
      ...pack,
      notes,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleUpdateExamTips = (examTips: ExamTipItem[]) => {
    mutateActivePack((pack) => ({
      ...pack,
      examTips,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleApplyGlobalPaperPattern = (urlPattern: string) => {
    mutateActivePack((pack) => applyGlobalPaperUrlPatternInPack(pack, urlPattern));
  };

  const handleUpsertImportantQuestion = (
    subjectId: string,
    question: ImportantQuestion
  ) => {
    mutateActivePack((pack) =>
      upsertImportantQuestionInPack(pack, subjectId, question)
    );
  };

  const handleDeleteImportantQuestion = (
    subjectId: string,
    questionId: string
  ) => {
    mutateActivePack((pack) =>
      deleteImportantQuestionInPack(pack, subjectId, questionId)
    );
  };

  const handleUpsertBiography = (subjectId: string, bio: BiographyItem) => {
    mutateActivePack((pack) => upsertBiographyInPack(pack, subjectId, bio));
  };

  const handleDeleteBiography = (subjectId: string, bioId: string) => {
    mutateActivePack((pack) => deleteBiographyInPack(pack, subjectId, bioId));
  };

  const handleImportPack = (imported: SyllabusYearPack) => {
    setPacksState((prev) => {
      const exists = prev.packs.some((p) => p.id === imported.id);
      return {
        activePackId: imported.id,
        packs: exists
          ? prev.packs.map((p) => (p.id === imported.id ? imported : p))
          : [imported, ...prev.packs],
      };
    });
  };

  const handleResetToDefault2026 = () => {
    const def = buildDefault2026Pack();
    setPacksState({ activePackId: def.id, packs: [def] });
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedSubjectIds((prev) => toggleBookmarkId(prev, id));
  };

  const handleOpenResource = (
    subject: SubjectItem,
    resource: ResourceType,
    initialChapter?: ChapterEntry
  ) => {
    setActiveModalSubjectId(subject.id);
    setActiveModalResource(resource);
    setActiveModalChapter(initialChapter);
  };

  const handleOpenQuickTest = () => {
    const currentSubjects = hydratedSubjects.filter(
      (s) => s.classLevel === selectedClass
    );
    if (currentSubjects.length > 0) {
      handleOpenResource(currentSubjects[0], 'mcqs');
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayedSubjects = filterSubjects(
    hydratedSubjects,
    selectedClass,
    searchQuery
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        medium={medium}
        onSelectMedium={setMedium}
        onOpenQuickTest={handleOpenQuickTest}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarkCount={bookmarkedSubjectIds.length}
        activeSection={activeSection}
        onNavigateSection={scrollToSection}
        session={activeSession}
        showOwnerIcon={isOwnerIconVisible}
        isOwnerUnlocked={isOwnerAdmin}
        onTriggerOwnerAdmin={handleOpenSecretAdmin}
      />
      <AdBanner320x50 />

      {/* Hero Section */}
      <HeroSection
        subjects={hydratedSubjects}
        session={activeSession}
        medium={medium}
        selectedClass={selectedClass}
        onExploreSubject={() => scrollToSection('subject-cards-grid')}
        onQuickMcq={handleOpenQuickTest}
        onNavigateSection={scrollToSection}
        isOwnerAdmin={isOwnerAdmin}
        onOpenOwnerAdmin={handleOpenSecretAdmin}
      />

      {/* Class, Dual Medium & Deep Search Controls */}
      <ControlsBar
        medium={medium}
        onSelectMedium={setMedium}
        selectedClass={selectedClass}
        onSelectClass={(cls) => {
          setSelectedClass(cls);
          setMobileTabKey(cls === '10' ? '10' : '12');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredCount={displayedSubjects.length}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Section 1: 6 Subject Cards per Class with Line-by-Line Clickable Chapters */}
        <section id="dashboard" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex flex-wrap items-center gap-2">
                <span>
                  {medium === 'hindi'
                    ? `कक्षा ${selectedClass === '10' ? '10वीं (हाईस्कूल)' : '12वीं (इंटरमीडिएट)'} के ${displayedSubjects.length} मुख्य विषय`
                    : `Class ${selectedClass}th — All ${displayedSubjects.length} Core Subjects`}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                  {displayedSubjects.length} Subjects · {activeSession.examYear}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {medium === 'hindi'
                  ? `किसी भी अध्याय पर क्लिक करके 50+ रिपीट प्रश्न पढ़ें, या 400+ MCQs व ${activeSession.shortRangeLabel} हल पेपर्स PDF खोलें।`
                  : `Tap any chapter for 50+ repeated Q&A, drill 400+ non-stop MCQs, or open ${activeSession.shortRangeLabel} Board Papers PDF.`}
              </p>
            </div>

            <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Medium:{' '}
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase">
                {medium}
              </span>{' '}
              · Class:{' '}
              <span className="font-bold text-indigo-600 dark:text-indigo-400">
                {selectedClass}th
              </span>
            </div>
          </div>

          <div
            id="subject-cards-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                session={activeSession}
                medium={medium}
                onOpenResource={handleOpenResource}
                isBookmarked={bookmarkedSubjectIds.includes(subject.id)}
                onToggleBookmark={handleToggleBookmark}
              />
            ))}
          </div>

          {displayedSubjects.length === 0 && (
            <div className="text-center py-12 p-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                "{searchQuery}" से संबंधित कोई विषय या अध्याय नहीं मिला।
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-3 px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold cursor-pointer"
              >
                {medium === 'hindi' ? 'सभी 6 विषय देखें' : 'Show All 6 Subjects'}
              </button>
            </div>
          )}
        </section>

        {/* Section 2: 3–4 Year Repeated High-Yield Notes Vault */}
        <section id="notes-vault">
          <HighYieldNotesSection
            subjects={hydratedSubjects}
            notes={activePack.notes}
            medium={medium}
            selectedClass={selectedClass}
            onOpenSubject={(sub) => handleOpenResource(sub, 'chapters')}
          />
        </section>

        {/* Section 3: Dynamic Solved & Leak Papers PDF Vault */}
        <section id="model-papers">
          <ModelPapersSection
            subjects={hydratedSubjects}
            session={activeSession}
            medium={medium}
            selectedClass={selectedClass}
            onOpenSubjectPaper={(sub) => handleOpenResource(sub, 'solved_papers')}
          />
        </section>

        {/* Section 4: Prescribed 80-Word Biographies */}
        <section id="biographies">
          <BiographiesSection
            subjects={hydratedSubjects}
            medium={medium}
            selectedClass={selectedClass}
            onOpenSubjectBiographies={(sub) => handleOpenResource(sub, 'biographies')}
          />
        </section>

        {/* Section 5: UPMSP Board Rules & Strategy */}
        <section id="exam-tips">
          <ExamTipsSection
            tips={activePack.examTips}
            medium={medium}
            selectedClass={selectedClass}
          />
        </section>
      </main>

      {/* Footer */}
      <Footer
        session={activeSession}
        onSecretAdminTrigger={handleOpenSecretAdmin}
      />

      {/* Persistent Clickable Bottom Navigation Bar (Mobile & Tablet) */}
      <MobileBottomNav
        medium={medium}
        selectedClass={selectedClass}
        session={activeSession}
        activeTabKey={mobileTabKey}
        onSelectHome={() => {
          setMobileTabKey('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectClass10={() => {
          setSelectedClass('10');
          setMobileTabKey('10');
          scrollToSection('dashboard');
        }}
        onSelectClass12={() => {
          setSelectedClass('12');
          setMobileTabKey('12');
          scrollToSection('dashboard');
        }}
        onOpenMcqs={() => {
          setMobileTabKey('mcqs');
          handleOpenQuickTest();
        }}
        onOpenNotes={() => {
          setMobileTabKey('notes');
          scrollToSection('notes-vault');
        }}
        onOpenPapers={() => {
          setMobileTabKey('papers');
          scrollToSection('model-papers');
        }}
      />

      {/* Detailed Study Room Modal */}
      {activeModalSubject && (
        <SubjectDetailModal
          subject={activeModalSubject}
          session={activeSession}
          initialResource={activeModalResource}
          initialChapter={activeModalChapter}
          medium={medium}
          onClose={() => {
            setActiveModalSubjectId(null);
            setActiveModalChapter(undefined);
          }}
          isBookmarked={bookmarkedSubjectIds.includes(activeModalSubject.id)}
          onToggleBookmark={handleToggleBookmark}
          isOwnerAdmin={isOwnerAdmin}
          onSavePaperUrl={handleSavePaperUrl}
        />
      )}

      {/* Secret Owner Admin Authentication Gate */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => {
          setIsAdminAuthOpen(false);
          clearAdminUrlParams();
        }}
        onAuthenticated={handleOwnerAuthenticated}
        medium={medium}
      />

      {/* Password-Protected Owner Year & Syllabus Update Manager */}
      <SyllabusManagerModal
        isOpen={isOwnerAdmin && isSyllabusManagerOpen}
        onClose={() => setIsSyllabusManagerOpen(false)}
        onLockAdmin={handleLockAdmin}
        onLockAndHideIcon={handleLockAndHideIcon}
        medium={medium}
        selectedClass={selectedClass}
        packs={packsState.packs}
        activePack={activePack}
        onSelectPack={handleSelectPack}
        onCreateOrShiftPack={handleCreateOrShiftPack}
        onDeletePack={handleDeletePack}
        onUpdateSubjectBlueprint={handleUpdateSubjectBlueprint}
        onAddCustomMcq={handleAddCustomMcq}
        onUpsertImportantQuestion={handleUpsertImportantQuestion}
        onDeleteImportantQuestion={handleDeleteImportantQuestion}
        onUpsertBiography={handleUpsertBiography}
        onDeleteBiography={handleDeleteBiography}
        onApplyGlobalPaperPattern={handleApplyGlobalPaperPattern}
        onUpdateNotes={handleUpdateNotes}
        onUpdateExamTips={handleUpdateExamTips}
        onImportPack={handleImportPack}
        onResetToDefault2026={handleResetToDefault2026}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedSubjectIds={bookmarkedSubjectIds}
        subjects={hydratedSubjects}
        session={activeSession}
        medium={medium}
        onSelectSubject={(sub) => handleOpenResource(sub, 'chapters')}
        onRemoveBookmark={handleToggleBookmark}
      />
    </div>
  );
}
