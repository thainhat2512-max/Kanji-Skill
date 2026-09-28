import { WardrobeItem, StickmanColor, StickmanExpression } from '../types';

export interface ColorOption {
  id: StickmanColor;
  name: string;
  hex: string;
  gradient?: string;
  glow: string;
}

export const STICKMAN_COLORS: ColorOption[] = [
  { id: 'white', name: 'Trắng Cơ Bản', hex: '#ffffff', glow: 'rgba(255,255,255,0.6)' },
  { id: 'rainbow', name: 'Cầu Vồng Niji', hex: '#ec4899', gradient: 'linear-gradient(135deg, #f43f5e, #a855f7, #38bdf8)', glow: 'rgba(236,72,153,0.8)' },
  { id: 'cyan', name: 'Cyber Neon Cyan', hex: '#06b6d4', glow: 'rgba(6,182,212,0.8)' },
  { id: 'pink', name: 'Hot Sakura Pink', hex: '#f43f5e', glow: 'rgba(244,63,94,0.8)' },
  { id: 'gold', name: 'Hoàng Kim Đế Vương', hex: '#f59e0b', glow: 'rgba(245,158,11,0.8)' },
  { id: 'emerald', name: 'Lục Bảo Ninja', hex: '#10b981', glow: 'rgba(16,185,129,0.8)' },
  { id: 'crimson', name: 'Huyết Long Đỏ', hex: '#ef4444', glow: 'rgba(239,68,68,0.8)' },
  { id: 'shadow', name: 'Bóng Đêm Hắc Ám', hex: '#64748b', glow: 'rgba(100,116,139,0.8)' },
];

export interface ExpressionOption {
  id: StickmanExpression;
  name: string;
  face: string;
}

export const STICKMAN_EXPRESSIONS: ExpressionOption[] = [
  { id: 'happy', name: 'Vui Vẻ', face: '(^‿^)' },
  { id: 'determined', name: 'Quyết Tâm', face: '(ò_ó)' },
  { id: 'cool', name: 'Thần Thái', face: '(⌐■_■)' },
  { id: 'kawaii', name: 'Dễ Thương', face: '(◕‿◕✿)' },
  { id: 'winking', name: 'Nháy Mắt', face: '(^_~)' },
  { id: 'fire', name: 'Bùng Cháy', face: '(🔥_🔥)' },
];

export const WARDROBE_ITEMS: WardrobeItem[] = [
  // ================= QUẦN ÁO / TRANG PHỤC (OUTFITS) =================
  {
    id: 'outfit_karate',
    name: 'Võ Phục Karate Đai Đen',
    category: 'outfit',
    price: 60,
    rarity: 'common',
    description: 'Võ phục truyền thống màu trắng thanh thoát cùng đai đen cao thủ võ đạo.',
    icon: '🥋',
    previewColor: '#ffffff'
  },
  {
    id: 'outfit_gakuran',
    name: 'Đồng Phục Nam Sinh Nhật (Gakuran)',
    category: 'outfit',
    price: 90,
    rarity: 'common',
    description: 'Đồng phục học sinh Nhật Bản cổ đứng với hàng cúc đồng sáng bóng phong cách anime.',
    icon: '👔',
    previewColor: '#1e293b'
  },
  {
    id: 'outfit_sailor',
    name: 'Đồng Phục Thủy Thủ Nữ Sinh',
    category: 'outfit',
    price: 100,
    rarity: 'common',
    description: 'Áo đồng phục thủy thủ viền xanh cùng chiếc nơ đỏ rực rỡ mang phong cách học đường.',
    icon: '🎀',
    previewColor: '#38bdf8'
  },
  {
    id: 'outfit_kimono',
    name: 'Kimono Hoa Anh Đào Cầu Vồng',
    category: 'outfit',
    price: 150,
    rarity: 'rare',
    description: 'Bộ Kimono truyền thống Nhật Bản tuyệt đẹp với vạt áo chuyển sắc và đai Obi rực rỡ.',
    icon: '👘',
    previewColor: '#ec4899'
  },
  {
    id: 'outfit_ninja',
    name: 'Áo Nhẫn Giả Bóng Đêm (Shinobi)',
    category: 'outfit',
    price: 180,
    rarity: 'rare',
    description: 'Trang phục ninja đêm tối gọn nhẹ, đai thắt lưng đỏ bí ẩn di chuyển không tiếng động.',
    icon: '🥷',
    previewColor: '#0f172a'
  },
  {
    id: 'outfit_cyber',
    name: 'Hoodie Cyberpunk Neon 2077',
    category: 'outfit',
    price: 260,
    rarity: 'epic',
    description: 'Áo hoodie công nghệ cao phong cách tương lai phát sáng các đường nét Neon Cyan cực ngầu.',
    icon: '⚡',
    previewColor: '#06b6d4'
  },
  {
    id: 'outfit_samurai',
    name: 'Giáp Tướng Quân Samurai',
    category: 'outfit',
    price: 350,
    rarity: 'epic',
    description: 'Bộ giáp Shogun huyền thoại với giáp vai xếp tầng và hoa văn rồng vàng uy nghiêm.',
    icon: '🛡️',
    previewColor: '#b45309'
  },
  {
    id: 'outfit_wizard',
    name: 'Áo Choàng Đại Ma Pháp Sư Cầu Vồng',
    category: 'outfit',
    price: 450,
    rarity: 'legendary',
    description: 'Áo choàng phù thủy tối thượng thêu chỉ vàng tỏa bụi sao ma thuật huyền ảo.',
    icon: '🧙',
    previewColor: '#8b5cf6'
  },

  // ================= NÓN & PHỤ KIỆN ĐẦU (HATS & HEADGEAR) =================
  {
    id: 'hat_cap',
    name: 'Mũ Lưỡi Trai Hiphop Streetwear',
    category: 'hat',
    price: 50,
    rarity: 'common',
    description: 'Mũ snapback đỏ năng động phong cách đường phố trẻ trung.',
    icon: '🧢',
    previewColor: '#ef4444'
  },
  {
    id: 'hat_ninja_band',
    name: 'Băng Trán Ninja Làng Kanji',
    category: 'hat',
    price: 80,
    rarity: 'common',
    description: 'Băng đeo trán bằng thép khắc ký tự "忍" (Nhẫn) của một shinobi chân chính.',
    icon: '🥷',
    previewColor: '#475569'
  },
  {
    id: 'hat_sunglasses',
    name: 'Kính Râm Thần Thái Pixel Thug Life',
    category: 'hat',
    price: 90,
    rarity: 'rare',
    description: 'Cặp kính mát đen siêu ngầu tăng 100% độ ngầu khi viết đúng Kanji!',
    icon: '🕶️',
    previewColor: '#000000'
  },
  {
    id: 'hat_cat_ears',
    name: 'Tai Mèo Neko Cầu Vồng Kawaii',
    category: 'hat',
    price: 140,
    rarity: 'rare',
    description: 'Đôi tai mèo mềm mại hồng phát sáng lúc nào cũng rung rinh theo nhịp viết.',
    icon: '🐱',
    previewColor: '#f472b6'
  },
  {
    id: 'hat_ronin',
    name: 'Nón Rơm Lãng Khách (Ronin Kasa)',
    category: 'hat',
    price: 180,
    rarity: 'rare',
    description: 'Nón rơm phong trần đậm chất kiếm sĩ giang hồ lãng tử xứ Phù Tang.',
    icon: '👒',
    previewColor: '#d97706'
  },
  {
    id: 'hat_fox_mask',
    name: 'Mặt Nạ Cáo Hồ Ly (Kitsune Mask)',
    category: 'hat',
    price: 220,
    rarity: 'epic',
    description: 'Mặt nạ cáo lễ hội Nhật Bản đeo nghiêng bên trán thần bí và trang nhã.',
    icon: '🦊',
    previewColor: '#f87171'
  },
  {
    id: 'hat_wizard_hat',
    name: 'Nón Phù Thủy Ngôi Sao Đêm',
    category: 'hat',
    price: 280,
    rarity: 'epic',
    description: 'Chiếc nón chóp nhọn đính ngôi sao vàng phép thuật chứa đầy trí tuệ.',
    icon: '🎩',
    previewColor: '#7c3aed'
  },
  {
    id: 'hat_crown',
    name: 'Vương Miện Hoàng Gia Cầu Vồng',
    category: 'hat',
    price: 500,
    rarity: 'legendary',
    description: 'Vương miện nạm kim cương 7 sắc dành riêng cho Bậc Thầy Kanji Toàn Cõi.',
    icon: '👑',
    previewColor: '#fbbf24'
  },

  // ================= ĐẠO CỤ & VŨ KHÍ CẦM TAY (PROPS & WEAPONS) =================
  {
    id: 'prop_matcha',
    name: 'Tách Trà Đạo Matcha Bát Quái',
    category: 'prop',
    price: 50,
    rarity: 'common',
    description: 'Bát trà xanh thơm ngát nghệ thuật trà đạo Nhật Bản thanh lọc tâm hồn.',
    icon: '🍵',
    previewColor: '#84cc16'
  },
  {
    id: 'prop_fan',
    name: 'Quạt Giấy Hoa Anh Đào (Sensu)',
    category: 'prop',
    price: 100,
    rarity: 'common',
    description: 'Quạt gấp lụa vẽ cành sakura thanh tao vẫy ra làn gió mát lành.',
    icon: '🪭',
    previewColor: '#f43f5e'
  },
  {
    id: 'prop_scroll',
    name: 'Cuộn Bí Kíp Kanji Cổ Truyền',
    category: 'prop',
    price: 160,
    rarity: 'rare',
    description: 'Cuộn thư tịch chứa đựng bí mật 2136 chữ Hán và ngữ pháp bí truyền.',
    icon: '📜',
    previewColor: '#ca8a04'
  },
  {
    id: 'prop_brush',
    name: 'Đại Bút Lông Thư Pháp Cầu Vồng',
    category: 'prop',
    price: 250,
    rarity: 'epic',
    description: 'Cây bút lông khổng lồ viết ra những nét chữ rồng bay phượng múa phát sáng.',
    icon: '🖌️',
    previewColor: '#ec4899'
  },
  {
    id: 'prop_katana',
    name: 'Bảo Kiếm Katana Lôi Điện Muramasa',
    category: 'prop',
    price: 380,
    rarity: 'epic',
    description: 'Thanh kiếm gia truyền của võ sĩ đạo với lưỡi kiếm bén ngót phóng tia sét tím.',
    icon: '⚔️',
    previewColor: '#818cf8'
  },
  {
    id: 'prop_wand',
    name: 'Quyền Trượng Ngôi Sao Tinh Tú',
    category: 'prop',
    price: 480,
    rarity: 'legendary',
    description: 'Gậy phép thuật đính viên ngọc cầu vồng lấp lánh ban phát ánh sáng tri thức.',
    icon: '🪄',
    previewColor: '#38bdf8'
  },

  // ================= HÀO QUANG & BẠN ĐỒNG HÀNH (AURAS & PETS) =================
  {
    id: 'aura_kitsune',
    name: 'Lửa Ma Trận Hồ Ly (Kitsune Flame)',
    category: 'aura',
    price: 190,
    rarity: 'rare',
    description: 'Ngọn lửa thần thú màu xanh lam nhảy múa hộ thể xung quanh người que.',
    icon: '🔥',
    previewColor: '#38bdf8'
  },
  {
    id: 'aura_circle',
    name: 'Trận Đồ Ma Thuật Kanji Dưới Chân',
    category: 'aura',
    price: 280,
    rarity: 'rare',
    description: 'Vòng tròn cổ tự Kanji xoay tròn phát sáng tỏa uy lực học thuật phi thường.',
    icon: '🌀',
    previewColor: '#a855f7'
  },
  {
    id: 'aura_neko',
    name: 'Bé Mèo Thần Tài Maneki Neko Bay Cùng',
    category: 'aura',
    price: 360,
    rarity: 'epic',
    description: 'Chú mèo may mắn mini bay lơ lửng bên cạnh vẫy tay cổ vũ bạn viết đúng nét!',
    icon: '🐱',
    previewColor: '#f59e0b'
  },
  {
    id: 'aura_wings',
    name: 'Đôi Cánh Ánh Sáng Thiên Thần',
    category: 'aura',
    price: 450,
    rarity: 'epic',
    description: 'Đôi cánh thiên thần tinh khôi chuyển động nhịp nhàng đưa nét chữ thăng hoa.',
    icon: '🪽',
    previewColor: '#e0e7ff'
  },
  {
    id: 'aura_rainbow',
    name: 'Vầng Hào Quang Cầu Vồng Vĩnh Cửu',
    category: 'aura',
    price: 600,
    rarity: 'legendary',
    description: 'Hào quang 7 sắc rực rỡ bao phủ toàn thân khẳng định vị thế Đại Tông Sư Kanji.',
    icon: '🌈',
    previewColor: '#ec4899'
  }
];

export function getItemById(id: string | null): WardrobeItem | null {
  if (!id) return null;
  return WARDROBE_ITEMS.find(item => item.id === id) || null;
}
