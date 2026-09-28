import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  Filter, 
  ArrowUpDown, 
  Bookmark, 
  CheckCircle2, 
  HelpCircle, 
  Award,
  Zap,
  Flame,
  Search,
  ChevronDown,
  Coins,
  Shirt
} from 'lucide-react';
import { JLPT_LEVELS } from './data/kanjiData';
import { 
  KanjiItem, 
  JLPTLevel, 
  ActiveTab, 
  UserProgress, 
  StickmanProfile, 
  WardrobeItem, 
  ItemCategory 
} from './types';
import { Navbar } from './components/Navbar';
import { KanjiCard } from './components/KanjiCard';
import { KanjiDetailModal } from './components/KanjiDetailModal';
import { PracticeDrawView } from './components/PracticeDrawView';
import { QuizChoiceMode } from './components/QuizChoiceMode';
import { QuizStrokeMode } from './components/QuizStrokeMode';
import { StickmanShopView } from './components/StickmanShopView';
import { UniversalLookupBar } from './components/UniversalLookupBar';
import { RadicalPickerModal } from './components/RadicalPickerModal';
import { CoinRewardToast, CoinRewardEvent } from './components/CoinRewardToast';
import { queryDictionary, getAllDictionaryKanji, lookupAnyKanji } from './utils/dictionaryEngine';
import { sound } from './utils/audio';

const DEFAULT_STICKMAN: StickmanProfile = {
  name: 'Samurai Niji',
  color: 'white',
  expression: 'happy',
  equippedOutfit: 'outfit_karate',
  equippedHat: null,
  equippedProp: 'prop_brush',
  equippedAura: null,
  unlockedItemIds: ['outfit_karate', 'prop_brush', 'prop_matcha'],
};

export default function App() {
  // Navigation & Filter States
  const [activeTab, setActiveTab] = useState<ActiveTab>('library');
  const [selectedLevel, setSelectedLevel] = useState<'all' | JLPTLevel>('all');
  const [selectedRadical, setSelectedRadical] = useState<string | null>(null);
  const [strokeFilter, setStrokeFilter] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'strokes_asc' | 'strokes_desc' | 'level'>('default');

  // Radical Picker Modal
  const [isRadicalPickerOpen, setIsRadicalPickerOpen] = useState(false);

  // Pagination / Load more limit
  const [displayLimit, setDisplayLimit] = useState(30);

  // Selected Kanji for Detail Modal or Practice
  const allKanjiCatalog = useMemo(() => getAllDictionaryKanji(), []);
  const [selectedKanji, setSelectedKanji] = useState<KanjiItem | null>(null);
  const [practiceKanji, setPracticeKanji] = useState<KanjiItem>(allKanjiCatalog[0]);

  // Audio state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Floating Coin Reward Toast
  const [rewardToast, setRewardToast] = useState<CoinRewardEvent | null>(null);

  // User Local Progress
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('kanji_niji_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          learnedKanjiIds: parsed.learnedKanjiIds || ['n5-nichi'],
          favoriteKanjiIds: parsed.favoriteKanjiIds || ['n5-nichi', 'n5-hon'],
          coins: typeof parsed.coins === 'number' ? parsed.coins : 120, // Initial bonus
          stickman: parsed.stickman ? { ...DEFAULT_STICKMAN, ...parsed.stickman } : DEFAULT_STICKMAN,
          quizStats: {
            totalQuizzesTaken: parsed.quizStats?.totalQuizzesTaken || 0,
            highestStreak: parsed.quizStats?.highestStreak || 0,
            totalCorrectAnswers: parsed.quizStats?.totalCorrectAnswers || 0,
            totalWritingPassed: parsed.quizStats?.totalWritingPassed || 0,
            totalStrokesWritten: parsed.quizStats?.totalStrokesWritten || 0,
          }
        };
      }
    } catch {}
    return {
      learnedKanjiIds: ['n5-nichi'],
      favoriteKanjiIds: ['n5-nichi', 'n5-hon'],
      coins: 120, // Gift 120 coins so the user can immediately experience customizing/buying in the shop!
      stickman: DEFAULT_STICKMAN,
      quizStats: {
        totalQuizzesTaken: 0,
        highestStreak: 0,
        totalCorrectAnswers: 0,
        totalWritingPassed: 0,
        totalStrokesWritten: 0,
      }
    };
  });

  // Save progress to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('kanji_niji_progress', JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save progress:', e);
    }
  }, [progress]);

  // Reset pagination limit when filter changes
  useEffect(() => {
    setDisplayLimit(30);
  }, [selectedLevel, selectedRadical, strokeFilter, searchQuery, activeTab]);

  // Sound toggle
  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  // Award Coins with sound and toast notification
  const awardCoins = (amount: number, reason: string) => {
    sound.playCoin();
    setProgress(prev => ({
      ...prev,
      coins: (prev.coins || 0) + amount,
    }));

    setRewardToast({
      id: Math.random().toString(),
      amount,
      reason,
    });

    setTimeout(() => {
      setRewardToast(null);
    }, 2800);
  };

  // Triggered on every single stroke written correctly in KanjiStrokeWriter
  const handleCorrectStroke = () => {
    awardCoins(10, 'Viết đúng 1 nét Kanji chuẩn!');
    setProgress(prev => ({
      ...prev,
      quizStats: {
        ...prev.quizStats,
        totalStrokesWritten: (prev.quizStats.totalStrokesWritten || 0) + 1,
      }
    }));
  };

  // Triggered on complete character practice
  const handleCompletePractice = (score: number) => {
    awardCoins(50, `Hoàn thành xuất sắc chữ Kanji (${score} điểm)!`);
  };

  // Toggle Favorite
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProgress(prev => {
      const isFav = prev.favoriteKanjiIds.includes(id);
      const updated = isFav
        ? prev.favoriteKanjiIds.filter(fId => fId !== id)
        : [...prev.favoriteKanjiIds, id];
      return { ...prev, favoriteKanjiIds: updated };
    });
  };

  // Toggle Learned
  const handleToggleLearned = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setProgress(prev => {
      const isLearned = prev.learnedKanjiIds.includes(id);
      const updated = isLearned
        ? prev.learnedKanjiIds.filter(lId => lId !== id)
        : [...prev.learnedKanjiIds, id];
      return { ...prev, learnedKanjiIds: updated };
    });
  };

  // Handle Quiz Completion
  const handleCompleteQuiz = (score: number, correctCount: number) => {
    awardCoins(correctCount * 20, `Đúng ${correctCount} câu trắc nghiệm!`);
    setProgress(prev => ({
      ...prev,
      quizStats: {
        ...prev.quizStats,
        totalQuizzesTaken: prev.quizStats.totalQuizzesTaken + 1,
        totalCorrectAnswers: prev.quizStats.totalCorrectAnswers + correctCount,
        highestStreak: Math.max(prev.quizStats.highestStreak, correctCount)
      }
    }));
  };

  // Handle Stroke Challenge Completion
  const handleCompleteStrokeChallenge = () => {
    awardCoins(60, 'Hoàn thành thử thách viết nét đố vui!');
    setProgress(prev => ({
      ...prev,
      quizStats: {
        ...prev.quizStats,
        totalWritingPassed: prev.quizStats.totalWritingPassed + 1
      }
    }));
  };

  // ================= STICKMAN CUSTOMIZATION HANDLERS =================
  const currentStickman = progress.stickman || DEFAULT_STICKMAN;

  const handleUpdateStickman = (updated: Partial<StickmanProfile>) => {
    setProgress(prev => ({
      ...prev,
      stickman: {
        ...(prev.stickman || DEFAULT_STICKMAN),
        ...updated,
      }
    }));
  };

  const handlePurchaseItem = (item: WardrobeItem) => {
    if (progress.coins < item.price) return;

    setProgress(prev => {
      const stickman = prev.stickman || DEFAULT_STICKMAN;
      const updatedUnlocked = Array.from(new Set([...stickman.unlockedItemIds, item.id]));

      // Auto equip purchased item
      const equippedSlot = {
        outfit: 'equippedOutfit',
        hat: 'equippedHat',
        prop: 'equippedProp',
        aura: 'equippedAura',
      }[item.category];

      return {
        ...prev,
        coins: prev.coins - item.price,
        stickman: {
          ...stickman,
          unlockedItemIds: updatedUnlocked,
          [equippedSlot]: item.id,
        }
      };
    });
  };

  const handleEquipItem = (item: WardrobeItem) => {
    setProgress(prev => {
      const stickman = prev.stickman || DEFAULT_STICKMAN;
      const slot = {
        outfit: 'equippedOutfit',
        hat: 'equippedHat',
        prop: 'equippedProp',
        aura: 'equippedAura',
      }[item.category];

      return {
        ...prev,
        stickman: {
          ...stickman,
          [slot]: item.id,
        }
      };
    });
  };

  const handleUnequipItem = (category: ItemCategory) => {
    setProgress(prev => {
      const stickman = prev.stickman || DEFAULT_STICKMAN;
      const slot = {
        outfit: 'equippedOutfit',
        hat: 'equippedHat',
        prop: 'equippedProp',
        aura: 'equippedAura',
      }[category];

      return {
        ...prev,
        stickman: {
          ...stickman,
          [slot]: null,
        }
      };
    });
  };

  // Filter & Sort Dictionary Kanji
  const filteredKanji = useMemo(() => {
    let list = queryDictionary({
      query: searchQuery,
      level: selectedLevel,
      radical: selectedRadical,
      minStrokes: strokeFilter.min,
      maxStrokes: strokeFilter.max,
      favoriteIds: progress.favoriteKanjiIds,
      onlyFavorites: activeTab === 'favorites',
    });

    // Sorting
    if (sortBy === 'strokes_asc') {
      list.sort((a, b) => a.strokeCount - b.strokeCount);
    } else if (sortBy === 'strokes_desc') {
      list.sort((a, b) => b.strokeCount - a.strokeCount);
    } else if (sortBy === 'level') {
      const order = { N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 };
      list.sort((a, b) => order[a.jlpt] - order[b.jlpt]);
    }

    return list;
  }, [activeTab, selectedLevel, selectedRadical, strokeFilter, searchQuery, sortBy, progress.favoriteKanjiIds]);

  const visibleKanji = useMemo(() => {
    return filteredKanji.slice(0, displayLimit);
  }, [filteredKanji, displayLimit]);

  // Handler for universal character selection
  const handleSelectUniversalKanji = (kanji: KanjiItem) => {
    setSelectedKanji(kanji);
    setPracticeKanji(kanji);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-pink-500 selection:text-white">
      
      {/* Rainbow Cosmic Background Atmosphere with glowing blur orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-rose-600/15 via-purple-600/15 to-transparent blur-3xl animate-float"></div>
        <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-cyan-500/15 via-blue-600/15 to-transparent blur-3xl animate-float" style={{ animationDelay: '-3s' }}></div>
        <div className="absolute bottom-[-15%] left-[25%] w-[500px] h-[500px] rounded-full bg-gradient-to-t from-pink-600/15 via-amber-500/10 to-transparent blur-3xl animate-float" style={{ animationDelay: '-1.5s' }}></div>
      </div>

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        learnedCount={progress.learnedKanjiIds.length}
        totalKanjiCount={allKanjiCatalog.length}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        coins={progress.coins}
        stickmanProfile={currentStickman}
      />

      {/* Floating Coin Reward Toast */}
      <CoinRewardToast reward={rewardToast} />

      {/* Main App Body */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        
        {/* ================= VIEW 1: KANJI LIBRARY / FAVORITES ================= */}
        {(activeTab === 'library' || activeTab === 'favorites') && (
          <div className="flex flex-col gap-6">
            
            {/* Universal Kanji & Radical Search Bar */}
            <UniversalLookupBar
              onSelectKanji={handleSelectUniversalKanji}
              onOpenRadicalPicker={() => setIsRadicalPickerOpen(true)}
              selectedRadical={selectedRadical}
              onClearRadical={() => setSelectedRadical(null)}
              strokeFilter={strokeFilter}
              onSetStrokeFilter={setStrokeFilter}
            />

            {/* JLPT Level Tabs Bar & Filters */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl shadow-lg">
              
              {/* JLPT Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
                <button
                  id="tab-level-all"
                  onClick={() => {
                    sound.playClick();
                    setSelectedLevel('all');
                  }}
                  className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
                    selectedLevel === 'all'
                      ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 text-white border-transparent shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                      : 'bg-slate-950/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  Tất cả ({allKanjiCatalog.length})
                </button>

                {JLPT_LEVELS.filter(lvl => lvl.id !== 'all').map((lvl) => {
                  const isSelected = selectedLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      id={`tab-level-${lvl.id.toLowerCase()}`}
                      onClick={() => {
                        sound.playClick();
                        setSelectedLevel(lvl.id as JLPTLevel);
                      }}
                      className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border ${
                        isSelected
                          ? 'bg-gradient-to-r from-rose-500 to-indigo-500 text-white border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                          : 'bg-slate-950/60 text-slate-400 border-white/5 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      {lvl.name}
                    </button>
                  );
                })}
              </div>

              {/* Sort & Quick Counter */}
              <div className="flex items-center justify-between w-full md:w-auto gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    id="select-sort-order"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-slate-950/80 border border-white/10 rounded-xl px-2.5 py-1 text-slate-300 text-xs focus:outline-none focus:border-pink-500 cursor-pointer"
                  >
                    <option value="default">Sắp xếp: Mặc định</option>
                    <option value="strokes_asc">Số nét: Tăng dần (Ít ➔ Nhiều)</option>
                    <option value="strokes_desc">Số nét: Giảm dần (Nhiều ➔ Ít)</option>
                    <option value="level">Cấp độ: N5 ➔ N1</option>
                  </select>
                </div>

                <span className="text-slate-400 text-xs font-semibold whitespace-nowrap">
                  Hiển thị <strong className="text-pink-400">{filteredKanji.length}</strong> chữ
                </span>
              </div>

            </div>

            {/* Kanji Card Grid */}
            <div className="w-full">
              {visibleKanji.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {visibleKanji.map((kanji) => (
                      <KanjiCard
                        key={kanji.id}
                        kanji={kanji}
                        isFavorite={progress.favoriteKanjiIds.includes(kanji.id)}
                        isLearned={progress.learnedKanjiIds.includes(kanji.id)}
                        onSelect={() => setSelectedKanji(kanji)}
                        onToggleFavorite={(id, e) => handleToggleFavorite(id, e)}
                        onToggleLearned={(id, e) => handleToggleLearned(id, e)}
                      />
                    ))}
                  </div>

                  {/* Load More Button */}
                  {displayLimit < filteredKanji.length && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setDisplayLimit(prev => prev + 30)}
                        className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 text-white font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:opacity-95 transition-opacity"
                      >
                        Tải thêm chữ Kanji ({displayLimit}/{filteredKanji.length})
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-slate-900/40 border border-white/5">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center mb-3">
                    <Search className="w-6 h-6 text-slate-500" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">Không tìm thấy Kanji nào</h3>
                  <p className="text-xs text-slate-400 max-w-sm mb-4">
                    Thử tìm kiếm với từ khóa khác như "NHẬT", "HỌC", "Mặt trời", "nichi", hoặc nhập trực tiếp chữ Kanji vào ô Tra Cứu Toàn Năng phía trên.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedLevel('all');
                      setSelectedRadical(null);
                      setStrokeFilter({ min: null, max: null });
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                  >
                    Xem toàn bộ thư viện
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= VIEW 2: INTERACTIVE PRACTICE DRAW ================= */}
        {activeTab === 'practice-draw' && (
          <div className="flex flex-col gap-6">
            <UniversalLookupBar
              onSelectKanji={handleSelectUniversalKanji}
              onOpenRadicalPicker={() => setIsRadicalPickerOpen(true)}
              selectedRadical={selectedRadical}
              onClearRadical={() => setSelectedRadical(null)}
              strokeFilter={strokeFilter}
              onSetStrokeFilter={setStrokeFilter}
            />

            <PracticeDrawView
              allKanji={filteredKanji.length > 0 ? filteredKanji : allKanjiCatalog}
              selectedKanji={practiceKanji}
              onSelectKanji={(k) => setPracticeKanji(k)}
              isFavorite={progress.favoriteKanjiIds.includes(practiceKanji.id)}
              isLearned={progress.learnedKanjiIds.includes(practiceKanji.id)}
              onToggleFavorite={handleToggleFavorite}
              onToggleLearned={handleToggleLearned}
              stickmanProfile={currentStickman}
              coins={progress.coins}
              onCorrectStroke={handleCorrectStroke}
              onCompleteCharacter={handleCompletePractice}
              onOpenShop={() => setActiveTab('stickman-shop')}
            />
          </div>
        )}

        {/* ================= VIEW 3: MULTIPLE CHOICE QUIZ ================= */}
        {activeTab === 'quiz-choice' && (
          <QuizChoiceMode
            kanjiList={filteredKanji.length >= 4 ? filteredKanji : allKanjiCatalog}
            onCompleteQuiz={handleCompleteQuiz}
            onOpenKanjiDetail={(k) => setSelectedKanji(k)}
          />
        )}

        {/* ================= VIEW 4: STROKE WRITING CHALLENGE ================= */}
        {activeTab === 'quiz-stroke' && (
          <QuizStrokeMode
            kanjiList={filteredKanji.length >= 3 ? filteredKanji : allKanjiCatalog}
            onCompleteChallenge={handleCompleteStrokeChallenge}
            onOpenKanjiDetail={(k) => setSelectedKanji(k)}
          />
        )}

        {/* ================= VIEW 5: STICKMAN SHOP & DRESSING ROOM ================= */}
        {activeTab === 'stickman-shop' && (
          <StickmanShopView
            profile={currentStickman}
            coins={progress.coins}
            onUpdateProfile={handleUpdateStickman}
            onPurchaseItem={handlePurchaseItem}
            onEquipItem={handleEquipItem}
            onUnequipItem={handleUnequipItem}
          />
        )}

      </main>

      {/* Radical Picker Modal */}
      {isRadicalPickerOpen && (
        <RadicalPickerModal
          selectedRadical={selectedRadical}
          onSelectRadical={(rad) => setSelectedRadical(rad)}
          onClose={() => setIsRadicalPickerOpen(false)}
        />
      )}

      {/* Kanji Detail Modal (Inspection & Interactive Writing) */}
      {selectedKanji && (
        <KanjiDetailModal
          kanji={selectedKanji}
          allKanji={filteredKanji.length > 0 ? filteredKanji : allKanjiCatalog}
          isFavorite={progress.favoriteKanjiIds.includes(selectedKanji.id)}
          isLearned={progress.learnedKanjiIds.includes(selectedKanji.id)}
          onClose={() => setSelectedKanji(null)}
          onSelectKanji={(k) => setSelectedKanji(k)}
          onToggleFavorite={(id) => handleToggleFavorite(id)}
          onToggleLearned={(id) => handleToggleLearned(id)}
          onCorrectStroke={handleCorrectStroke}
          onCompletePractice={handleCompletePractice}
        />
      )}

      {/* Minimal Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950/80 py-4 px-6 mt-auto text-center text-xs text-slate-500">
        <p>Kanji Niji • Từ điển Kanji tiếng Nhật toàn diện (N5-N1) & Tra cứu bộ thủ • Hệ thống Người Que Stickman & Đổi đồ luyện viết Kanji</p>
      </footer>

    </div>
  );
}
