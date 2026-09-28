export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export interface KanjiExample {
  word: string;
  furigana: string;
  romaji: string;
  meaning: string;
  sentence?: {
    jp: string;
    furigana: string;
    romaji: string;
    vi: string;
  };
}

export interface KanjiItem {
  id: string;
  character: string;
  hanViet: string;          // Nghĩa Hán Việt (e.g., "NHẬT", "SINH")
  vietnamese: string;       // Nghĩa tiếng Việt giải thích (e.g., "Mặt trời, ngày, Nhật Bản")
  onyomi: string[];         // Âm On (Hán - Katakana/Romaji)
  kunyomi: string[];        // Âm Kun (Nhật - Hiragana/Romaji)
  jlpt: JLPTLevel;
  strokeCount: number;
  radical: string;          // Bộ thủ (e.g., "日 (Nhật - Mặt trời)")
  mnemonics?: string;       // Mẹo ghi nhớ hình tượng Kanji
  examples: KanjiExample[];
  strokePaths?: string[];   // Optional SVG stroke path fallback
}

export type ActiveTab = 'library' | 'detail' | 'practice-draw' | 'quiz-choice' | 'quiz-stroke' | 'favorites' | 'stickman-shop';

export type StickmanColor = 'white' | 'rainbow' | 'cyan' | 'pink' | 'gold' | 'emerald' | 'crimson' | 'shadow';

export type StickmanExpression = 'happy' | 'determined' | 'cool' | 'kawaii' | 'winking' | 'fire';

export type ItemCategory = 'outfit' | 'hat' | 'prop' | 'aura';

export interface WardrobeItem {
  id: string;
  name: string;
  category: ItemCategory;
  price: number;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: string;
  previewColor: string;
}

export interface StickmanProfile {
  name: string;
  color: StickmanColor;
  expression: StickmanExpression;
  equippedOutfit: string | null;
  equippedHat: string | null;
  equippedProp: string | null;
  equippedAura: string | null;
  unlockedItemIds: string[];
}

export interface UserProgress {
  learnedKanjiIds: string[];
  favoriteKanjiIds: string[];
  coins: number;
  stickman: StickmanProfile;
  quizStats: {
    totalQuizzesTaken: number;
    highestStreak: number;
    totalCorrectAnswers: number;
    totalWritingPassed: number;
    totalStrokesWritten: number;
  };
}

export interface QuizQuestion {
  id: string;
  kanji: KanjiItem;
  questionType: 'han_viet' | 'vietnamese_meaning' | 'onyomi' | 'kunyomi';
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
