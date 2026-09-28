import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ShoppingBag, 
  Shirt, 
  Crown, 
  Flame, 
  Check, 
  Coins, 
  Palette, 
  Smile, 
  Edit3, 
  ShieldCheck, 
  Undo2, 
  Layers, 
  Zap,
  Tag
} from 'lucide-react';
import { 
  StickmanProfile, 
  StickmanColor, 
  StickmanExpression, 
  WardrobeItem, 
  ItemCategory 
} from '../types';
import { 
  WARDROBE_ITEMS, 
  STICKMAN_COLORS, 
  STICKMAN_EXPRESSIONS, 
  getItemById 
} from '../data/stickmanCatalog';
import { StickmanRenderer } from './StickmanRenderer';
import { sound } from '../utils/audio';

interface Props {
  profile: StickmanProfile;
  coins: number;
  onUpdateProfile: (updated: Partial<StickmanProfile>) => void;
  onPurchaseItem: (item: WardrobeItem) => void;
  onEquipItem: (item: WardrobeItem) => void;
  onUnequipItem: (category: ItemCategory) => void;
}

export const StickmanShopView: React.FC<Props> = ({
  profile,
  coins,
  onUpdateProfile,
  onPurchaseItem,
  onEquipItem,
  onUnequipItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory | 'all'>('all');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);
  const [tryOnItem, setTryOnItem] = useState<WardrobeItem | null>(null);
  const [celebrationPose, setCelebrationPose] = useState<'idle' | 'celebrating'>('idle');

  // Compute preview profile (either wearing equipped or try-on)
  const previewProfile: StickmanProfile = {
    ...profile,
    equippedOutfit: tryOnItem?.category === 'outfit' ? tryOnItem.id : profile.equippedOutfit,
    equippedHat: tryOnItem?.category === 'hat' ? tryOnItem.id : profile.equippedHat,
    equippedProp: tryOnItem?.category === 'prop' ? tryOnItem.id : profile.equippedProp,
    equippedAura: tryOnItem?.category === 'aura' ? tryOnItem.id : profile.equippedAura,
  };

  const handleSaveName = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (tempName.trim()) {
      sound.playClick();
      onUpdateProfile({ name: tempName.trim() });
    }
    setIsEditingName(false);
  };

  const handlePurchase = (item: WardrobeItem) => {
    if (coins < item.price) {
      sound.playWrong();
      return;
    }

    sound.playPurchase();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f43f5e', '#a855f7', '#38bdf8']
    });

    onPurchaseItem(item);
    // Clear try on
    if (tryOnItem?.id === item.id) {
      setTryOnItem(null);
    }
  };

  const handleTriggerPose = () => {
    sound.playClick();
    setCelebrationPose('celebrating');
    setTimeout(() => setCelebrationPose('idle'), 1500);
  };

  const filteredItems = WARDROBE_ITEMS.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Rarity styling helpers
  const getRarityBadge = (rarity: WardrobeItem['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-[0_0_10px_rgba(251,191,36,0.5)]';
      case 'epic':
        return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]';
      case 'rare':
        return 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white';
      default:
        return 'bg-slate-800 text-slate-300';
    }
  };

  const getRarityText = (rarity: WardrobeItem['rarity']) => {
    switch (rarity) {
      case 'legendary': return 'Huyền Thoại';
      case 'epic': return 'Sử Thi';
      case 'rare': return 'Hiếm';
      default: return 'Phổ Biến';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Banner: Stage Showcase & Customizer */}
      <div className="w-full rounded-3xl bg-gradient-to-b from-slate-900 via-purple-950/30 to-slate-900 border border-white/15 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        
        {/* Glow ambient background circles */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Column 1: Stickman Pedestal Stage */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* Stage Pedestal */}
            <div className="relative w-64 h-80 flex flex-col items-center justify-center">
              {/* Spotlight beam */}
              <div className="absolute top-2 w-48 h-56 bg-gradient-to-b from-cyan-400/20 via-pink-500/10 to-transparent rounded-t-full pointer-events-none filter blur-sm"></div>
              
              {/* Stickman Model */}
              <div className="relative z-10">
                <StickmanRenderer
                  profile={previewProfile}
                  size="xl"
                  actionPose={celebrationPose}
                  onClick={handleTriggerPose}
                />
              </div>

              {/* Pedestal Base */}
              <div className="absolute bottom-2 w-48 h-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-400 p-[2px] shadow-[0_0_25px_rgba(236,72,153,0.5)]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <span className="text-[10px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-300 uppercase">
                    ★ SÂN KHẤU NGƯỜI QUE ★
                  </span>
                </div>
              </div>
            </div>

            {/* Tap to Pose Hint */}
            <button
              onClick={handleTriggerPose}
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Bấm vào để người que biểu diễn dáng</span>
            </button>

            {/* Try-on indicator */}
            {tryOnItem && (
              <div className="mt-2 px-3 py-1 rounded-lg bg-pink-950/60 border border-pink-500/40 text-[11px] text-pink-300 flex items-center gap-2 animate-in fade-in">
                <span>Đang mặc thử: <strong>{tryOnItem.name}</strong></span>
                <button
                  onClick={() => setTryOnItem(null)}
                  className="text-white hover:text-rose-300 text-xs font-bold underline"
                >
                  Bỏ thử
                </button>
              </div>
            )}
          </div>

          {/* Column 2: Character Identity & Customizer Controls */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Name & Coin Balance */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              {/* Stickman Name */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1 mb-0.5">
                  <Crown className="w-3 h-3" />
                  Nhân Vật Của Bạn
                </span>

                {isEditingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      maxLength={20}
                      className="px-3 py-1 rounded-xl bg-slate-900 border border-pink-500 text-sm font-bold text-white focus:outline-none"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold"
                    >
                      Lưu
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {profile.name}
                    </h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-pink-400 transition-colors"
                      title="Đổi tên người que"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Coin Counter Pill */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-500/40 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                  <Coins className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block leading-none">
                    Ví Xu Cầu Vồng
                  </span>
                  <span className="text-lg font-black text-amber-400 leading-none">
                    {coins.toLocaleString('vi-VN')} Xu
                  </span>
                </div>
              </div>
            </div>

            {/* Color Customizer */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                <span>Màu Sắc Bản Thể Người Que:</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {STICKMAN_COLORS.map((col) => {
                  const isSelected = profile.color === col.id;
                  return (
                    <button
                      key={col.id}
                      onClick={() => {
                        sound.playClick();
                        onUpdateProfile({ color: col.id });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                        isSelected
                          ? 'border-pink-500 bg-pink-950/40 text-white shadow-[0_0_12px_rgba(236,72,153,0.5)] scale-105'
                          : 'border-white/10 bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-sm"
                        style={{
                          background: col.gradient || col.hex,
                          boxShadow: `0 0 8px ${col.glow}`
                        }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expression Customizer */}
            <div>
              <label className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5 text-pink-400" />
                <span>Biểu Cảm Khuôn Mặt:</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {STICKMAN_EXPRESSIONS.map((exp) => {
                  const isSelected = profile.expression === exp.id;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => {
                        sound.playClick();
                        onUpdateProfile({ expression: exp.id });
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-105'
                          : 'border-white/10 bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-mono text-cyan-300">{exp.face}</span>
                      <span>{exp.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Equipped Items Quick Badges */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px] font-semibold">Đang trang bị:</span>
              
              {/* Outfit */}
              {profile.equippedOutfit ? (
                <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-slate-200 flex items-center gap-1.5">
                  <span>{getItemById(profile.equippedOutfit)?.icon}</span>
                  <span className="text-[11px] font-medium">{getItemById(profile.equippedOutfit)?.name}</span>
                  <button
                    onClick={() => onUnequipItem('outfit')}
                    className="text-slate-400 hover:text-rose-400 font-bold ml-1"
                    title="Gỡ áo"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <span className="text-[11px] text-slate-500 italic">Chưa mặc áo</span>
              )}

              {/* Hat */}
              {profile.equippedHat && (
                <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-slate-200 flex items-center gap-1.5">
                  <span>{getItemById(profile.equippedHat)?.icon}</span>
                  <span className="text-[11px] font-medium">{getItemById(profile.equippedHat)?.name}</span>
                  <button
                    onClick={() => onUnequipItem('hat')}
                    className="text-slate-400 hover:text-rose-400 font-bold ml-1"
                    title="Gỡ nón"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Prop */}
              {profile.equippedProp && (
                <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-slate-200 flex items-center gap-1.5">
                  <span>{getItemById(profile.equippedProp)?.icon}</span>
                  <span className="text-[11px] font-medium">{getItemById(profile.equippedProp)?.name}</span>
                  <button
                    onClick={() => onUnequipItem('prop')}
                    className="text-slate-400 hover:text-rose-400 font-bold ml-1"
                    title="Cất đạo cụ"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Aura */}
              {profile.equippedAura && (
                <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-white/10 text-slate-200 flex items-center gap-1.5">
                  <span>{getItemById(profile.equippedAura)?.icon}</span>
                  <span className="text-[11px] font-medium">{getItemById(profile.equippedAura)?.name}</span>
                  <button
                    onClick={() => onUnequipItem('aura')}
                    className="text-slate-400 hover:text-rose-400 font-bold ml-1"
                    title="Tắt hào quang"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* Earn Points Banner Guide */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-cyan-900/40 border border-white/10 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white flex items-center gap-1.5">
              Cách Kiếm Xu Cầu Vồng Để Mua Đồ Cho Người Que
            </h4>
            <p className="text-slate-300 text-[11px]">
              🪙 <strong>+10 Xu</strong> mỗi khi vẽ đúng 1 nét Kanji • <strong>+50 Xu</strong> khi viết xong 1 chữ Kanji • <strong>+20 Xu</strong> khi trả lời trắc nghiệm đúng
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">
            Học viết càng nhiều = Càng nhiều đồ đẹp!
          </span>
        </div>
      </div>

      {/* Shop Category Navigation Tabs */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'Tất cả cửa hàng', icon: ShoppingBag },
            { id: 'outfit', label: 'Quần Áo / Trang Phục', icon: Shirt },
            { id: 'hat', label: 'Nón & Phụ Kiện Đầu', icon: Crown },
            { id: 'prop', label: 'Vũ Khí & Đạo Cụ Tay', icon: Zap },
            { id: 'aura', label: 'Hào Quang & Thú Cưng', icon: Flame },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedCategory(tab.id as typeof selectedCategory);
                }}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap border ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-indigo-500 text-white border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.4)]'
                    : 'bg-slate-900/80 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-400 font-medium">
          {filteredItems.length} vật phẩm trong danh mục
        </span>
      </div>

      {/* Wardrobe Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => {
          const isUnlocked = profile.unlockedItemIds.includes(item.id);
          const isEquipped = 
            profile.equippedOutfit === item.id ||
            profile.equippedHat === item.id ||
            profile.equippedProp === item.id ||
            profile.equippedAura === item.id;
          const isTryingOn = tryOnItem?.id === item.id;
          const canAfford = coins >= item.price;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border p-4 flex flex-col justify-between transition-all backdrop-blur-xl group relative overflow-hidden ${
                isEquipped
                  ? 'bg-gradient-to-b from-slate-900 via-cyan-950/20 to-slate-900 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                  : isTryingOn
                  ? 'bg-gradient-to-b from-slate-900 via-pink-950/20 to-slate-900 border-pink-500/80 shadow-[0_0_20px_rgba(236,72,153,0.25)]'
                  : 'bg-slate-900/70 border-white/10 hover:border-white/20 hover:bg-slate-900/90'
              }`}
            >
              {/* Card Header: Icon & Rarity */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${getRarityBadge(item.rarity)}`}>
                    {getRarityText(item.rarity)}
                  </span>
                </div>

                <h3 className="text-sm font-black text-white group-hover:text-pink-300 transition-colors mb-1">
                  {item.name}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {item.description}
                </p>
              </div>

              {/* Card Footer: Price & Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                
                {/* Price Display */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Giá mua:</span>
                  {isUnlocked ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Đã sở hữu
                    </span>
                  ) : (
                    <span className="text-amber-400 font-black flex items-center gap-1 text-sm">
                      <Coins className="w-3.5 h-3.5 text-amber-400" />
                      {item.price} Xu
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-1">
                  
                  {/* Try On Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setTryOnItem(isTryingOn ? null : item);
                    }}
                    className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isTryingOn
                        ? 'bg-pink-500 text-white border-pink-400'
                        : 'bg-slate-800 text-slate-300 border-white/10 hover:text-white hover:bg-slate-700'
                    }`}
                    title="Mặc thử để xem trước trên sân khấu"
                  >
                    {isTryingOn ? 'Bỏ thử' : 'Thử'}
                  </button>

                  {/* Primary Action Button */}
                  {isUnlocked ? (
                    isEquipped ? (
                      <button
                        onClick={() => {
                          sound.playClick();
                          onUnequipItem(item.category);
                        }}
                        className="flex-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-rose-500/20 border border-cyan-400/50 hover:border-rose-400/50 text-cyan-300 hover:text-rose-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Đang mặc (Gỡ)</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          sound.playClick();
                          onEquipItem(item);
                          setTryOnItem(null);
                        }}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        <span>Mặc vào</span>
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => handlePurchase(item)}
                      disabled={!canAfford}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 hover:opacity-95 text-white shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                          : 'bg-slate-800 text-slate-500 border border-white/5 cursor-not-allowed'
                      }`}
                    >
                      <Coins className="w-3.5 h-3.5" />
                      <span>{canAfford ? 'Mua ngay' : `Thiếu ${item.price - coins} Xu`}</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
