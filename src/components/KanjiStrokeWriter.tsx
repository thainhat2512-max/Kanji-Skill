import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  PenTool, 
  FastForward, 
  Grid,
  Brush,
  Undo
} from 'lucide-react';
import { KanjiItem } from '../types';
import { sound } from '../utils/audio';

interface Props {
  kanji: KanjiItem;
  onCompletePractice?: (score: number) => void;
  onCorrectStroke?: (strokeNum: number) => void;
  initialMode?: 'interactive' | 'freeform';
}

export const KanjiStrokeWriter: React.FC<Props> = ({ 
  kanji, 
  onCompletePractice,
  onCorrectStroke,
  initialMode = 'interactive' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const freeCanvasRef = useRef<HTMLCanvasElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);

  // States
  const [mode, setMode] = useState<'animate' | 'quiz' | 'freehand'>(
    initialMode === 'freeform' ? 'freehand' : 'quiz'
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOutline, setShowOutline] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [gridStyle, setGridStyle] = useState<'mi' | 'tian' | 'simple'>('mi'); // 米字格, 田字格, ô đơn
  const [animationSpeed, setAnimationSpeed] = useState<number>(1);
  const [currentStroke, setCurrentStroke] = useState<number>(0);
  const [totalStrokes, setTotalStrokes] = useState<number>(kanji.strokeCount);
  const [mistakes, setMistakes] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizAccuracy, setQuizAccuracy] = useState<number>(100);
  const [statusMessage, setStatusMessage] = useState<string>('Hãy dùng chuột hoặc ngón tay để vẽ theo thứ tự nét!');
  const [writerLoaded, setWriterLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Freehand drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [rainbowHue, setRainbowHue] = useState(0);
  const [brushSize, setBrushSize] = useState(12);
  const [freehandHistory, setFreehandHistory] = useState<ImageData[]>([]);

  // Initialize HanziWriter
  useEffect(() => {
    if (!containerRef.current) return;

    // Reset states
    setWriterLoaded(false);
    setLoadError(false);
    setQuizFinished(false);
    setMistakes(0);
    setCurrentStroke(0);
    setStatusMessage('Đang khởi tạo nét vẽ...');

    // Clear previous elements
    containerRef.current.innerHTML = '';

    try {
      const writer = HanziWriter.create(containerRef.current, kanji.character, {
        width: 280,
        height: 280,
        padding: 24,
        showOutline: showOutline,
        strokeAnimationSpeed: animationSpeed,
        delayBetweenStrokes: 250,
        strokeColor: '#f43f5e',      // Vibrant rose
        outlineColor: '#334155',     // Sleek slate
        drawingColor: '#38bdf8',     // Cyan neon for drawing
        highlightColor: '#a855f7',   // Purple neon for highlight
        drawingWidth: 16,
        showCharacter: mode === 'animate',
        onLoadCharDataSuccess: (data) => {
          setWriterLoaded(true);
          setTotalStrokes(data.strokes.length || kanji.strokeCount);
          setStatusMessage(mode === 'quiz' ? 'Bắt đầu vẽ nét thứ 1 nhé!' : 'Sẵn sàng mô phỏng nét vẽ.');
          
          if (mode === 'quiz') {
            startQuiz(writer);
          } else if (mode === 'animate') {
            animateStrokes(writer);
          }
        },
        onLoadCharDataError: () => {
          setLoadError(true);
          setStatusMessage('Không thể tải vector stroke cho chữ này. Chuyển sang bảng tập viết tự do.');
          setMode('freehand');
        }
      });

      writerRef.current = writer;
    } catch (e) {
      console.warn('HanziWriter init error:', e);
      setLoadError(true);
      setMode('freehand');
    }

    return () => {
      if (writerRef.current) {
        try {
          writerRef.current.cancelQuiz();
        } catch {}
      }
    };
  }, [kanji.character]);

  // Handle mode switches
  const handleModeChange = (newMode: 'animate' | 'quiz' | 'freehand') => {
    sound.playClick();
    setMode(newMode);
    setQuizFinished(false);

    if (!writerRef.current) return;

    try {
      writerRef.current.cancelQuiz();
      if (newMode === 'animate') {
        writerRef.current.showCharacter();
        writerRef.current.showOutline();
        animateStrokes(writerRef.current);
      } else if (newMode === 'quiz') {
        setMistakes(0);
        setCurrentStroke(0);
        writerRef.current.hideCharacter();
        if (showOutline) writerRef.current.showOutline();
        startQuiz(writerRef.current);
      }
    } catch (e) {
      console.warn('Mode change error:', e);
    }
  };

  const animateStrokes = (writer = writerRef.current) => {
    if (!writer) return;
    setIsAnimating(true);
    setStatusMessage('Đang phát hoạt họa thứ tự nét vẽ...');
    writer.animateCharacter({
      onComplete: () => {
        setIsAnimating(false);
        setStatusMessage('Đã hoàn thành mô phỏng tất cả nét vẽ!');
      }
    });
  };

  const startQuiz = (writer = writerRef.current) => {
    if (!writer) return;
    setQuizFinished(false);
    setMistakes(0);
    setCurrentStroke(0);
    setStatusMessage('Hãy vẽ nét đầu tiên!');

    try {
      writer.quiz({
        onCorrectStroke: (strokeData) => {
          sound.playStrokeSuccess();
          const nextIndex = strokeData.strokeNum + 1;
          setCurrentStroke(nextIndex);
          setStatusMessage(`Rất tốt! Đã hoàn thành nét ${strokeData.strokeNum + 1}/${totalStrokes}`);
          if (onCorrectStroke) {
            onCorrectStroke(strokeData.strokeNum);
          }
        },
        onMistake: () => {
          sound.playWrong();
          setMistakes(prev => {
            const updated = prev + 1;
            setStatusMessage(`Sai nét rồi (${updated} lỗi)! Hãy thử lại hoặc bấm "Xem gợi ý".`);
            return updated;
          });
        },
        onComplete: (summary) => {
          sound.playCorrect();
          const rawAccuracy = Math.max(0, 100 - (summary.totalMistakes * 10));
          setQuizAccuracy(rawAccuracy);
          setQuizFinished(true);
          setStatusMessage(`Xuất sắc! Bạn đã viết xong chữ "${kanji.character}" với độ chính xác ${rawAccuracy}%!`);

          // Confetti explosion
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f43f5e', '#ec4899', '#a855f7', '#38bdf8', '#10b981', '#fbbf24']
          });

          if (onCompletePractice) {
            onCompletePractice(rawAccuracy);
          }
        }
      });
    } catch (e) {
      console.warn('Quiz start error:', e);
    }
  };

  // Toggle Outline
  const toggleOutline = () => {
    sound.playClick();
    const next = !showOutline;
    setShowOutline(next);
    if (writerRef.current) {
      if (next) {
        writerRef.current.showOutline();
      } else {
        writerRef.current.hideOutline();
      }
    }
  };

  // Give Hint in Quiz mode
  const giveHint = () => {
    sound.playClick();
    if (writerRef.current) {
      try {
        writerRef.current.highlightStroke(currentStroke);
        setStatusMessage(`Gợi ý: Đã chiếu sáng nét thứ ${currentStroke + 1}!`);
      } catch {
        setStatusMessage('Gợi ý: Hãy quan sát kỹ vị trí xuất phát của nét tiếp theo!');
      }
    }
  };

  // Change Animation Speed
  const cycleSpeed = () => {
    sound.playClick();
    const speeds = [0.75, 1, 1.5, 2];
    const currentIndex = speeds.indexOf(animationSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setAnimationSpeed(nextSpeed);
    if (writerRef.current && (writerRef.current as any)._options) {
      (writerRef.current as any)._options.strokeAnimationSpeed = nextSpeed;
    }
  };

  // Freehand Canvas Logic
  useEffect(() => {
    if (mode !== 'freehand') return;
    const canvas = freeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 280;
    canvas.height = 280;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    saveCanvasState();
  }, [mode, kanji.character]);

  const saveCanvasState = () => {
    const canvas = freeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setFreehandHistory(prev => [...prev.slice(-10), state]);
  };

  const handleUndoFreehand = () => {
    sound.playClick();
    const canvas = freeCanvasRef.current;
    if (!canvas || freehandHistory.length <= 1) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...freehandHistory];
    newHistory.pop(); // remove current
    const previous = newHistory[newHistory.length - 1];
    if (previous) {
      ctx.putImageData(previous, 0, 0);
      setFreehandHistory(newHistory);
    }
  };

  const clearFreehand = () => {
    sound.playClick();
    const canvas = freeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveCanvasState();
  };

  const startFreehandDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = freeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    // Rainbow shifting hue
    setRainbowHue(prev => (prev + 25) % 360);
    ctx.strokeStyle = `hsl(${rainbowHue}, 90%, 65%)`;
    ctx.lineWidth = brushSize;
    ctx.shadowColor = `hsl(${rainbowHue}, 90%, 65%)`;
    ctx.shadowBlur = 8;
  };

  const drawFreehand = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = freeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setRainbowHue(prev => (prev + 3) % 360);
    ctx.strokeStyle = `hsl(${rainbowHue}, 90%, 65%)`;
    ctx.shadowColor = `hsl(${rainbowHue}, 90%, 65%)`;
  };

  const stopFreehandDraw = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveCanvasState();
      sound.playStrokeSuccess();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Mode Selector Pill */}
      <div className="flex items-center p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md mb-4 shadow-lg w-full justify-between gap-1">
        <button
          id="btn-mode-quiz"
          onClick={() => handleModeChange('quiz')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mode === 'quiz'
              ? 'bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Kiểm tra nét</span>
        </button>

        <button
          id="btn-mode-animate"
          onClick={() => handleModeChange('animate')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mode === 'animate'
              ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>Xem thứ tự</span>
        </button>

        <button
          id="btn-mode-freehand"
          onClick={() => handleModeChange('freehand')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            mode === 'freehand'
              ? 'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Brush className="w-3.5 h-3.5" />
          <span>Vẽ tự do</span>
        </button>
      </div>

      {/* Main Canvas Box with Rainbow Magic Glass Glow */}
      <div className="relative group">
        {/* Animated Rainbow Ambient Ring behind the box */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-rose-500 via-purple-500 via-cyan-400 to-amber-400 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-700 animate-rainbow"></div>

        <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] rounded-2xl bg-slate-950/90 border border-white/15 backdrop-blur-xl p-3 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
          
          {/* Kanji Grid Overlay Guide */}
          {showGrid && (
            <div className="absolute inset-4 pointer-events-none border border-slate-700/40 rounded-xl">
              {/* Horizontal line */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-slate-700/50 -translate-y-1/2"></div>
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-l border-dashed border-slate-700/50 -translate-x-1/2"></div>
              {/* Diagonals for 'mi' grid */}
              {gridStyle === 'mi' && (
                <svg className="absolute inset-0 w-full h-full text-slate-800/40" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeDasharray="4 4" />
                  <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeDasharray="4 4" />
                </svg>
              )}
            </div>
          )}

          {/* Interactive HanziWriter Container */}
          <div 
            ref={containerRef} 
            className={`w-[280px] h-[280px] flex items-center justify-center cursor-crosshair ${
              mode === 'freehand' ? 'hidden' : 'block'
            }`}
          />

          {/* Freehand Canvas Mode */}
          {mode === 'freehand' && (
            <div className="relative w-[280px] h-[280px]">
              {/* Ghost character background if outline is toggled on */}
              {showOutline && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none text-[180px] font-light text-slate-700/35 font-japanese">
                  {kanji.character}
                </div>
              )}
              <canvas
                ref={freeCanvasRef}
                onMouseDown={startFreehandDraw}
                onMouseMove={drawFreehand}
                onMouseUp={stopFreehandDraw}
                onMouseLeave={stopFreehandDraw}
                onTouchStart={startFreehandDraw}
                onTouchMove={drawFreehand}
                onTouchEnd={stopFreehandDraw}
                className="w-full h-full cursor-crosshair touch-none"
              />
            </div>
          )}

          {/* Finished Overlay Badge */}
          {quizFinished && mode === 'quiz' && (
            <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 via-purple-500 to-cyan-400 p-0.5 mb-3 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-amber-300 animate-spin" />
                </div>
              </div>

              <h4 className="text-lg font-bold text-white mb-1">
                Hoàn thành xuất sắc!
              </h4>
              <p className="text-xs text-slate-300 mb-2">
                Chữ <span className="text-rose-400 font-bold text-sm">{kanji.character}</span> ({kanji.hanViet})
              </p>

              <div className="flex items-center gap-3 my-2 bg-slate-900/90 px-4 py-2 rounded-xl border border-white/10">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Độ chính xác</span>
                  <span className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                    {quizAccuracy}%
                  </span>
                </div>
                <div className="h-6 w-[1px] bg-slate-800"></div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Số nét sai</span>
                  <span className="text-base font-bold text-rose-400">
                    {mistakes}
                  </span>
                </div>
              </div>

              <button
                id="btn-retry-quiz"
                onClick={() => startQuiz()}
                className="mt-3 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 hover:opacity-95 shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Luyện viết lại
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Status / Feedback Message */}
      <div className="w-full mt-3 px-3 py-2 rounded-xl bg-slate-900/60 border border-white/5 backdrop-blur-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="truncate max-w-[240px] text-slate-300">{statusMessage}</span>
        </div>

        {mode === 'quiz' && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded-lg border border-purple-500/20">
            <span>Nét: {currentStroke}/{totalStrokes}</span>
          </div>
        )}
      </div>

      {/* Interactive Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3 w-full">
        {mode === 'quiz' && (
          <>
            <button
              id="btn-hint"
              onClick={giveHint}
              className="py-1.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
              title="Xem gợi ý nét tiếp theo"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Gợi ý</span>
            </button>

            <button
              id="btn-reset-quiz"
              onClick={() => startQuiz()}
              className="py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Vẽ lại từ đầu"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Vẽ lại</span>
            </button>
          </>
        )}

        {mode === 'animate' && (
          <>
            <button
              id="btn-play-anim"
              onClick={() => animateStrokes()}
              disabled={isAnimating}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white text-xs font-medium flex items-center gap-1.5 transition-all disabled:opacity-50 shadow-sm"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Chạy lại</span>
            </button>

            <button
              id="btn-speed"
              onClick={cycleSpeed}
              className="py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all"
              title="Thay đổi tốc độ nét"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>{animationSpeed}x</span>
            </button>
          </>
        )}

        {mode === 'freehand' && (
          <>
            <button
              id="btn-undo-freehand"
              onClick={handleUndoFreehand}
              className="py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <Undo className="w-3.5 h-3.5" />
              <span>Hoàn tác</span>
            </button>

            <button
              id="btn-clear-freehand"
              onClick={clearFreehand}
              className="py-1.5 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Xóa bảng</span>
            </button>

            <div className="flex items-center gap-1.5 bg-slate-900/60 px-2 py-1 rounded-xl border border-white/10">
              <span className="text-[10px] text-slate-400">Cọ:</span>
              <button 
                onClick={() => setBrushSize(8)} 
                className={`w-4 h-4 rounded-full border ${brushSize === 8 ? 'border-cyan-400 bg-cyan-500/30' : 'border-slate-600'}`}
                title="Cọ nhỏ"
              />
              <button 
                onClick={() => setBrushSize(14)} 
                className={`w-5 h-5 rounded-full border ${brushSize === 14 ? 'border-cyan-400 bg-cyan-500/30' : 'border-slate-600'}`}
                title="Cọ vừa"
              />
              <button 
                onClick={() => setBrushSize(20)} 
                className={`w-6 h-6 rounded-full border ${brushSize === 20 ? 'border-cyan-400 bg-cyan-500/30' : 'border-slate-600'}`}
                title="Cọ đậm"
              />
            </div>
          </>
        )}

        {/* Universal Controls: Outline & Grid */}
        <button
          id="btn-toggle-outline"
          onClick={toggleOutline}
          className={`py-1.5 px-2.5 rounded-xl border text-xs font-medium flex items-center gap-1 transition-all ${
            showOutline 
              ? 'bg-purple-950/40 border-purple-500/40 text-purple-300' 
              : 'bg-slate-900/60 border-white/10 text-slate-400'
          }`}
          title={showOutline ? 'Ẩn nét mờ' : 'Hiện nét mờ mẫu'}
        >
          {showOutline ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>Mẫu mờ</span>
        </button>

        <button
          id="btn-toggle-grid"
          onClick={() => {
            sound.playClick();
            setShowGrid(!showGrid);
          }}
          className={`py-1.5 px-2.5 rounded-xl border text-xs font-medium flex items-center gap-1 transition-all ${
            showGrid 
              ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300' 
              : 'bg-slate-900/60 border-white/10 text-slate-400'
          }`}
          title="Bật/tắt lưới kẻ ô"
        >
          <Grid className="w-3.5 h-3.5" />
          <span>Lưới</span>
        </button>

        {/* Speak Kanji Pronunciation */}
        <button
          id="btn-speak-kanji"
          onClick={() => {
            sound.playClick();
            sound.speakJapanese(kanji.character);
          }}
          className="py-1.5 px-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-pink-300 text-xs font-medium flex items-center gap-1 transition-all"
          title="Phát âm chữ Kanji"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Âm</span>
        </button>
      </div>
    </div>
  );
};
