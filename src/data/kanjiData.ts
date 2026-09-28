import { KanjiItem } from '../types';

export const KANJI_DATASET: KanjiItem[] = [
  // =================== N5 KANJI ===================
  {
    id: 'n5-nichi',
    character: '日',
    hanViet: 'NHẬT',
    vietnamese: 'Mặt trời, ngày, Nhật Bản',
    onyomi: ['ニチ (nichi)', 'ジツ (jitsu)'],
    kunyomi: ['ひ (hi)', '-び (-bi)', '-か (-ka)'],
    jlpt: 'N5',
    strokeCount: 4,
    radical: '日 (Nhật - Mặt trời)',
    mnemonics: 'Khung bao tròn có nét ở giữa tượng trưng cho mặt trời sáng rực rỡ.',
    examples: [
      {
        word: '日本',
        furigana: 'にほん',
        romaji: 'nihon',
        meaning: 'Nước Nhật Bản',
        sentence: {
          jp: '来年、日本へ留学します。',
          furigana: 'らいねん、にほんへりゅうがくします。',
          romaji: 'Rainen, Nihon e ryuugaku shimasu.',
          vi: 'Năm sau tôi sẽ đi du học Nhật Bản.'
        }
      },
      {
        word: '日曜日',
        furigana: 'にちようび',
        romaji: 'nichiyoubi',
        meaning: 'Chủ nhật',
        sentence: {
          jp: '日曜日に友達と遊びます。',
          furigana: 'にちようびにともだちとあそびます。',
          romaji: 'Nichiyoubi ni tomodachi to asobimasu.',
          vi: 'Tôi đi chơi với bạn vào Chủ nhật.'
        }
      },
      {
        word: '毎日',
        furigana: 'まいにち',
        romaji: 'mainichi',
        meaning: 'Mỗi ngày, hàng ngày',
        sentence: {
          jp: '毎日日本語を勉強しています。',
          furigana: 'まいにちにほんごをべんきょうしています。',
          romaji: 'Mainichi nihongo o benkyou shiteimasu.',
          vi: 'Tôi học tiếng Nhật mỗi ngày.'
        }
      }
    ]
  },
  {
    id: 'n5-hon',
    character: '本',
    hanViet: 'BẢN / BỔN',
    vietnamese: 'Sách, nguồn gốc, bản chất',
    onyomi: ['ホン (hon)'],
    kunyomi: ['もと (moto)'],
    jlpt: 'N5',
    strokeCount: 5,
    radical: '木 (Mộc - Cây)',
    mnemonics: 'Chữ Mộc (木) thêm một gạch ngang ở gốc để chỉ phần rễ, gốc rễ của cây.',
    examples: [
      {
        word: '本',
        furigana: 'ほん',
        romaji: 'hon',
        meaning: 'Quyển sách',
        sentence: {
          jp: '図書館で本を借りました。',
          furigana: 'としょかんでほんをかりました。',
          romaji: 'Toshokan de hon o karimashita.',
          vi: 'Tôi đã mượn sách ở thư viện.'
        }
      },
      {
        word: '本当',
        furigana: 'ほんとう',
        romaji: 'hontou',
        meaning: 'Sự thật, thực sự',
        sentence: {
          jp: '本当においしいです！',
          furigana: 'ほんとうにおいしいです！',
          romaji: 'Hontou ni oishii desu!',
          vi: 'Thực sự rất ngon!'
        }
      },
      {
        word: '基本',
        furigana: 'きほん',
        romaji: 'kihon',
        meaning: 'Cơ bản, căn bản'
      }
    ]
  },
  {
    id: 'n5-hito',
    character: '人',
    hanViet: 'NHÂN',
    vietnamese: 'Con người, người',
    onyomi: ['ジン (jin)', 'ニン (nin)'],
    kunyomi: ['ひと (hito)'],
    jlpt: 'N5',
    strokeCount: 2,
    radical: '人 (Nhân - Người)',
    mnemonics: 'Hai nét dựa vào nhau như hai người nâng đỡ nhau trong cuộc sống.',
    examples: [
      {
        word: '人',
        furigana: 'ひと',
        romaji: 'hito',
        meaning: 'Người',
        sentence: {
          jp: 'あの人はとても優しいです。',
          furigana: 'あのひとはとてもやさしいです。',
          romaji: 'Ano hito wa totemo yasashii desu.',
          vi: 'Người đó rất hiền từ tốt bụng.'
        }
      },
      {
        word: '日本人',
        furigana: 'にほんじん',
        romaji: 'nihonjin',
        meaning: 'Người Nhật Bản',
        sentence: {
          jp: '田中さんは日本人です。',
          furigana: 'たなかさんはにほんじんです。',
          romaji: 'Tanaka-san wa nihonjin desu.',
          vi: 'Anh Tanaka là người Nhật.'
        }
      },
      {
        word: '三人',
        furigana: 'さんにん',
        romaji: 'sannin',
        meaning: '3 người'
      }
    ]
  },
  {
    id: 'n5-gaku',
    character: '学',
    hanViet: 'HỌC',
    vietnamese: 'Học tập, trường học, khoa học',
    onyomi: ['ガク (gaku)'],
    kunyomi: ['まな・ぶ (mana-bu)'],
    jlpt: 'N5',
    strokeCount: 8,
    radical: '子 (Tử - Con cái)',
    mnemonics: 'Đứa trẻ (子) ngồi dưới mái nhà trường mở mang kiến thức.',
    examples: [
      {
        word: '学生',
        furigana: 'がくせい',
        romaji: 'gakusei',
        meaning: 'Học sinh, sinh viên',
        sentence: {
          jp: '私は大学生です。',
          furigana: 'わたしはだいがくせいです。',
          romaji: 'Watashi wa daigakusei desu.',
          vi: 'Tôi là sinh viên đại học.'
        }
      },
      {
        word: '学校',
        furigana: 'がっこう',
        romaji: 'gakkou',
        meaning: 'Trường học',
        sentence: {
          jp: '毎朝８時に学校へ行きます。',
          furigana: 'まいあさはちじにがっこうへいきます。',
          romaji: 'Maiasa hachiji ni gakkou e ikimasu.',
          vi: 'Mỗi sáng 8 giờ tôi đi đến trường.'
        }
      },
      {
        word: '大学',
        furigana: 'だいがく',
        romaji: 'daigaku',
        meaning: 'Trường đại học'
      }
    ]
  },
  {
    id: 'n5-sei',
    character: '生',
    hanViet: 'SINH',
    vietnamese: 'Sinh ra, sống, tươi sống',
    onyomi: ['セイ (sei)', 'ショウ (shou)'],
    kunyomi: ['い・きる (i-kiru)', 'う・まれる (u-mareru)', 'なま (nama)'],
    jlpt: 'N5',
    strokeCount: 5,
    radical: '生 (Sinh)',
    mnemonics: 'Một mầm cây đâm chồi sinh sôi nảy nở từ mặt đất.',
    examples: [
      {
        word: '先生',
        furigana: 'せんせい',
        romaji: 'sensei',
        meaning: 'Thầy cô giáo',
        sentence: {
          jp: '山田先生は日本語を教えます。',
          furigana: 'やまだせんせいはにほんごをおしえます。',
          romaji: 'Yamada sensei wa nihongo o oshiemasu.',
          vi: 'Thầy Yamada dạy tiếng Nhật.'
        }
      },
      {
        word: '生まれる',
        furigana: 'うまれる',
        romaji: 'umareru',
        meaning: 'Được sinh ra',
        sentence: {
          jp: 'ハノイで生まれました。',
          furigana: 'ハノイでうまれました。',
          romaji: 'Hanoi de umaremashita.',
          vi: 'Tôi sinh ra ở Hà Nội.'
        }
      },
      {
        word: '生活',
        furigana: 'せいかつ',
        romaji: 'seikatsu',
        meaning: 'Cuộc sống, sinh hoạt'
      }
    ]
  },
  {
    id: 'n5-sen',
    character: '先',
    hanViet: 'TIÊN',
    vietnamese: 'Trước, đi trước, dẫn đầu',
    onyomi: ['セン (sen)'],
    kunyomi: ['さき (saki)', 'ま・ず (ma-zu)'],
    jlpt: 'N5',
    strokeCount: 6,
    radical: '儿 (Nhi - Đôi chân bước)',
    mnemonics: 'Người bước đôi chân đi về phía trước sớm hơn người khác.',
    examples: [
      {
        word: '先週',
        furigana: 'せんしゅう',
        romaji: 'senshuu',
        meaning: 'Tuần trước',
        sentence: {
          jp: '先週、旅行に行きました。',
          furigana: 'せんしゅう、りょこうにいきました。',
          romaji: 'Senshuu, ryokou ni ikimashita.',
          vi: 'Tuần trước tôi đã đi du lịch.'
        }
      },
      {
        word: 'お先に',
        furigana: 'おさきに',
        romaji: 'osakini',
        meaning: 'Xin phép trước',
        sentence: {
          jp: 'お先に失礼します。',
          furigana: 'おさきにしつれいします。',
          romaji: 'Osaki ni shitsurei shimasu.',
          vi: 'Tôi xin phép về trước.'
        }
      }
    ]
  },
  {
    id: 'n5-mizu',
    character: '水',
    hanViet: 'THỦY',
    vietnamese: 'Nước, chất lỏng',
    onyomi: ['スイ (sui)'],
    kunyomi: ['みず (mizu)'],
    jlpt: 'N5',
    strokeCount: 4,
    radical: '水 (Thủy - Nước)',
    mnemonics: 'Dòng nước uốn lượn ở giữa với những giọt nước bắn ra hai bên.',
    examples: [
      {
        word: '水',
        furigana: 'みず',
        romaji: 'mizu',
        meaning: 'Nước uống',
        sentence: {
          jp: '冷たい水を一杯ください。',
          furigana: 'つめたいみずをいっぱいください。',
          romaji: 'Tsumetai mizu o ippai kudasai.',
          vi: 'Cho tôi xin một ly nước lạnh.'
        }
      },
      {
        word: '水曜日',
        furigana: 'すいようび',
        romaji: 'suiyoubi',
        meaning: 'Thứ tư',
        sentence: {
          jp: '水曜日にテストがあります。',
          furigana: 'すいようびにてすとがあります。',
          romaji: 'Suiyoubi ni tesuto ga arimasu.',
          vi: 'Thứ tư có bài kiểm tra.'
        }
      }
    ]
  },
  {
    id: 'n5-hi',
    character: '火',
    hanViet: 'HỎA',
    vietnamese: 'Lửa, ngọn lửa',
    onyomi: ['カ (ka)'],
    kunyomi: ['ひ (hi)', 'ほ- (ho-)'],
    jlpt: 'N5',
    strokeCount: 4,
    radical: '火 (Hỏa - Lửa)',
    mnemonics: 'Hình ảnh ngọn lửa đang bùng cháy với tàn lửa bốc lên hai bên.',
    examples: [
      {
        word: '火曜日',
        furigana: 'かようび',
        romaji: 'kayoubi',
        meaning: 'Thứ ba',
        sentence: {
          jp: '火曜日は休みです。',
          furigana: 'かようびはやすみです。',
          romaji: 'Kayoubi wa yasumi desu.',
          vi: 'Thứ ba là ngày nghỉ.'
        }
      },
      {
        word: '火事',
        furigana: 'かじ',
        romaji: 'kaji',
        meaning: 'Hỏa hoạn, vụ cháy'
      },
      {
        word: '花火',
        furigana: 'はなび',
        romaji: 'hanabi',
        meaning: 'Pháo hoa'
      }
    ]
  },
  {
    id: 'n5-ki',
    character: '木',
    hanViet: 'MỘC',
    vietnamese: 'Cây cối, gỗ',
    onyomi: ['ボク (boku)', 'モク (moku)'],
    kunyomi: ['き (ki)', 'こ- (ko-)'],
    jlpt: 'N5',
    strokeCount: 4,
    radical: '木 (Mộc)',
    mnemonics: 'Thân cây thẳng có cành xòe sang hai bên và rễ cắm xuống đất.',
    examples: [
      {
        word: '木曜日',
        furigana: 'もくようび',
        romaji: 'mokuyoubi',
        meaning: 'Thứ năm',
        sentence: {
          jp: '木曜日に映画を見ます。',
          furigana: 'もくようびにえいがをみます。',
          romaji: 'Mokuyoubi ni eiga o mimasu.',
          vi: 'Thứ năm tôi sẽ xem phim.'
        }
      },
      {
        word: '木',
        furigana: 'き',
        romaji: 'ki',
        meaning: 'Cái cây, gỗ'
      }
    ]
  },
  {
    id: 'n5-kin',
    character: '金',
    hanViet: 'KIM',
    vietnamese: 'Vàng, kim loại, tiền',
    onyomi: ['キン (kin)', 'コン (kon)'],
    kunyomi: ['かね (kane)', 'かな- (kana-)'],
    jlpt: 'N5',
    strokeCount: 8,
    radical: '金 (Kim - Vàng/Kim loại)',
    mnemonics: 'Mái che bảo vệ những thỏi vàng và quặng kim loại quý trong lòng đất.',
    examples: [
      {
        word: 'お金',
        furigana: 'おかね',
        romaji: 'okane',
        meaning: 'Tiền bạc',
        sentence: {
          jp: '今、お金があまりありません。',
          furigana: 'いま、おかねがあまりありません。',
          romaji: 'Ima, okane ga amari arimasen.',
          vi: 'Bây giờ tôi không có nhiều tiền.'
        }
      },
      {
        word: '金曜日',
        furigana: 'きんようび',
        romaji: 'kinyoubi',
        meaning: 'Thứ sáu'
      }
    ]
  },
  {
    id: 'n5-tsuchi',
    character: '土',
    hanViet: 'THỔ',
    vietnamese: 'Đất, thổ nhưỡng',
    onyomi: ['ド (do)', 'ト (to)'],
    kunyomi: ['つち (tsuchi)'],
    jlpt: 'N5',
    strokeCount: 3,
    radical: '土 (Thổ - Đất)',
    mnemonics: 'Một mầm cây nhỏ nhú lên trên lớp đất màu mỡ.',
    examples: [
      {
        word: '土曜日',
        furigana: 'どようび',
        romaji: 'doyoubi',
        meaning: 'Thứ bảy',
        sentence: {
          jp: '土曜日に公園を散歩します。',
          furigana: 'どようびにこうえんをさんぽします。',
          romaji: 'Doyoubi ni kouen o sanpo shimasu.',
          vi: 'Thứ bảy tôi đi dạo ở công viên.'
        }
      },
      {
        word: '土地',
        furigana: 'とち',
        romaji: 'tochi',
        meaning: 'Đất đai, thổ địa'
      }
    ]
  },
  {
    id: 'n5-tsuki',
    character: '月',
    hanViet: 'NGUYỆT',
    vietnamese: 'Mặt trăng, tháng',
    onyomi: ['ゲツ (getsu)', 'ガツ (gatsu)'],
    kunyomi: ['つき (tsuki)'],
    jlpt: 'N5',
    strokeCount: 4,
    radical: '月 (Nguyệt - Mặt trăng)',
    mnemonics: 'Hình trăng lưỡi liềm với những đám mây mờ che ngang.',
    examples: [
      {
        word: '月曜日',
        furigana: 'げつようび',
        romaji: 'getsuyoubi',
        meaning: 'Thứ hai',
        sentence: {
          jp: '月曜日から金曜日まで働きます。',
          furigana: 'げつようびからきんようびまではたらきます。',
          romaji: 'Getsuyoubi kara kinyoubi made hatarakimasu.',
          vi: 'Tôi làm việc từ thứ Hai đến thứ Sáu.'
        }
      },
      {
        word: '今月',
        furigana: 'こんげつ',
        romaji: 'kongetsu',
        meaning: 'Tháng này'
      },
      {
        word: '一月',
        furigana: 'いちがつ',
        romaji: 'ichigatsu',
        meaning: 'Tháng 1'
      }
    ]
  },
  {
    id: 'n5-yama',
    character: '山',
    hanViet: 'SƠN / SAN',
    vietnamese: 'Núi, ngọn núi',
    onyomi: ['サン (san)', 'セン (sen)'],
    kunyomi: ['やま (yama)'],
    jlpt: 'N5',
    strokeCount: 3,
    radical: '山 (Sơn - Núi)',
    mnemonics: 'Hình vẽ 3 đỉnh núi nhấp nhô nối tiếp nhau.',
    examples: [
      {
        word: '富士山',
        furigana: 'ふじさん',
        romaji: 'fujisan',
        meaning: 'Núi Phú Sĩ',
        sentence: {
          jp: '富士山に登りたいです。',
          furigana: 'ふじさんにのぼりたいです。',
          romaji: 'Fujisan ni noboritai desu.',
          vi: 'Tôi muốn leo núi Phú Sĩ.'
        }
      },
      {
        word: '山登り',
        furigana: 'やまのぼり',
        romaji: 'yamanobori',
        meaning: 'Leo núi'
      }
    ]
  },
  {
    id: 'n5-kawa',
    character: '川',
    hanViet: 'XUYÊN',
    vietnamese: 'Sông, dòng sông',
    onyomi: ['セン (sen)'],
    kunyomi: ['かわ (kawa)'],
    jlpt: 'N5',
    strokeCount: 3,
    radical: '川 (Xuyên - Sông)',
    mnemonics: 'Ba dòng nước song song chảy xuôi theo dòng sông.',
    examples: [
      {
        word: '川',
        furigana: 'かわ',
        romaji: 'kawa',
        meaning: 'Dòng sông',
        sentence: {
          jp: 'この川はとてもきれいです。',
          furigana: 'このかわはとてもきれいです。',
          romaji: 'Kono kawa wa totemo kirei desu.',
          vi: 'Dòng sông này rất trong lành sạch sẽ.'
        }
      }
    ]
  },
  {
    id: 'n5-ue',
    character: '上',
    hanViet: 'THƯỢNG',
    vietnamese: 'Trên, phía trên, bên trên',
    onyomi: ['ジョウ (jou)', 'ショウ (shou)'],
    kunyomi: ['うえ (ue)', 'あ・がる (a-garu)', 'のぼ・る (nobo-ru)'],
    jlpt: 'N5',
    strokeCount: 3,
    radical: '一 (Nhất)',
    mnemonics: 'Chỉ sự: vạch ngang làm mốc, nét đứng và dấu gạch ở phía trên biểu thị vị trí bên trên.',
    examples: [
      {
        word: '机の上',
        furigana: 'つくえのうえ',
        romaji: 'tsukue no ue',
        meaning: 'Trên bàn',
        sentence: {
          jp: '机の上に鍵があります。',
          furigana: 'つくえのうえにかぎがあります。',
          romaji: 'Tsukue no ue ni kagi ga arimasu.',
          vi: 'Có chiếc chìa khóa ở trên bàn.'
        }
      },
      {
        word: '上手',
        furigana: 'じょうず',
        romaji: 'jouzu',
        meaning: 'Giỏi giang, khéo léo',
        sentence: {
          jp: '彼は日本語がとても上手です。',
          furigana: 'かれはにほんごがとてもじょうずです。',
          romaji: 'Kare wa nihongo ga totemo jouzu desu.',
          vi: 'Anh ấy nói tiếng Nhật rất giỏi.'
        }
      }
    ]
  },
  {
    id: 'n5-shita',
    character: '下',
    hanViet: 'HẠ',
    vietnamese: 'Dưới, phía dưới, tụt xuống',
    onyomi: ['カ (ka)', 'ゲ (ge)'],
    kunyomi: ['した (shita)', 'さ・がる (sa-garu)', 'くだ・る (kuda-ru)'],
    jlpt: 'N5',
    strokeCount: 3,
    radical: '一 (Nhất)',
    mnemonics: 'Chỉ sự: vạch ngang mốc, nét chỉ hướng đi xuống phía dưới.',
    examples: [
      {
        word: '下',
        furigana: 'した',
        romaji: 'shita',
        meaning: 'Bên dưới',
        sentence: {
          jp: '木の下で休みましょう。',
          furigana: 'きのしたでやすみましょう。',
          romaji: 'Ki no shita de yasumimashou.',
          vi: 'Chúng ta hãy nghỉ ngơi dưới bóng cây nhé.'
        }
      },
      {
        word: '下手',
        furigana: 'へた',
        romaji: 'heta',
        meaning: 'Kém, dở, vụng về'
      },
      {
        word: '地下鉄',
        furigana: 'ちかてつ',
        romaji: 'chikatetsu',
        meaning: 'Tàu điện ngầm'
      }
    ]
  },
  {
    id: 'n5-naka',
    character: '中',
    hanViet: 'TRUNG',
    vietnamese: 'Ở giữa, bên trong, Trung Quốc',
    onyomi: ['チュウ (chuu)'],
    kunyomi: ['なか (naka)'],
    jlpt: 'N5',
    strokeCount: 4,
    radical: '丨 (Cổn - Nét sổ)',
    mnemonics: 'Một mũi tên bắn xuyên chính giữa hồng tâm.',
    examples: [
      {
        word: '中',
        furigana: 'なか',
        romaji: 'naka',
        meaning: 'Bên trong',
        sentence: {
          jp: '箱の中に何がありますか。',
          furigana: 'はこのなかになにがありますか。',
          romaji: 'Hako no naka ni nani ga arimasu ka.',
          vi: 'Bên trong chiếc hộp có gì thế?'
        }
      },
      {
        word: '中国',
        furigana: 'ちゅうごく',
        romaji: 'chuugoku',
        meaning: 'Nước Trung Quốc'
      },
      {
        word: '一日中',
        furigana: 'いちにちじゅう',
        romaji: 'ichinichijuu',
        meaning: 'Suốt cả ngày'
      }
    ]
  },
  {
    id: 'n5-dai',
    character: '大',
    hanViet: 'ĐẠI',
    vietnamese: 'To lớn, vĩ đại, rất',
    onyomi: ['ダイ (dai)', 'タイ (tai)'],
    kunyomi: ['おお・きい (oo-kii)'],
    jlpt: 'N5',
    strokeCount: 3,
    radical: '大 (Đại)',
    mnemonics: 'Một người dang rộng hai tay và hai chân để thể hiện sự to lớn.',
    examples: [
      {
        word: '大きい',
        furigana: 'おおきい',
        romaji: 'ookii',
        meaning: 'To lớn',
        sentence: {
          jp: 'このリンゴはとても大きいです。',
          furigana: 'このりんごはとてもおおきいです。',
          romaji: 'Kono ringo wa totemo ookii desu.',
          vi: 'Quả táo này rất to.'
        }
      },
      {
        word: '大変',
        furigana: 'たいへん',
        romaji: 'taihen',
        meaning: 'Vất vả, khó khăn, nghiêm trọng'
      },
      {
        word: '大人',
        furigana: 'おとな',
        romaji: 'otona',
        meaning: 'Người lớn'
      }
    ]
  },
  {
    id: 'n5-shou',
    character: '小',
    hanViet: 'TIỂU',
    vietnamese: 'Nhỏ, bé, ít',
    onyomi: ['ショウ (shou)'],
    kunyomi: ['ちい・さい (chii-sai)', 'こ- (ko-)', 'お- (o-)'],
    jlpt: 'N5',
    strokeCount: 3,
    radical: '小 (Tiểu)',
    mnemonics: 'Vật thể nhỏ bị cắt chia làm nhiều mảnh bé xíu.',
    examples: [
      {
        word: '小さい',
        furigana: 'ちいさい',
        romaji: 'chiisai',
        meaning: 'Nhỏ bé',
        sentence: {
          jp: '小さい猫を飼っています。',
          furigana: 'ちいさいねこをかっています。',
          romaji: 'Chiisai neko o katteimasu.',
          vi: 'Tôi đang nuôi một chú mèo nhỏ.'
        }
      },
      {
        word: '小学校',
        furigana: 'しょうがっこう',
        romaji: 'shougakkou',
        meaning: 'Trường tiểu học'
      }
    ]
  },
  {
    id: 'n5-kou',
    character: '口',
    hanViet: 'KHẨU',
    vietnamese: 'Cái miệng, cửa vào, lối ra',
    onyomi: ['コウ (kou)', 'ク (ku)'],
    kunyomi: ['くち (kuchi)'],
    jlpt: 'N5',
    strokeCount: 3,
    radical: '口 (Khẩu - Miệng)',
    mnemonics: 'Hình vẽ mở rộng vuông vức của chiếc miệng.',
    examples: [
      {
        word: '口',
        furigana: 'くち',
        romaji: 'kuchi',
        meaning: 'Miệng',
        sentence: {
          jp: '口を開けてください。',
          furigana: 'くちをあけてください。',
          romaji: 'Kuchi o akete kudasai.',
          vi: 'Xin vui lòng mở miệng ra.'
        }
      },
      {
        word: '出口',
        furigana: 'でぐち',
        romaji: 'deguchi',
        meaning: 'Lối ra'
      },
      {
        word: '入口',
        furigana: 'いりぐち',
        romaji: 'iriguchi',
        meaning: 'Lối vào'
      }
    ]
  },
  {
    id: 'n5-moku',
    character: '目',
    hanViet: 'MỤC',
    vietnamese: 'Mắt, ánh nhìn, mục lục',
    onyomi: ['モク (moku)', 'ボク (boku)'],
    kunyomi: ['め (me)', '-め (-me)'],
    jlpt: 'N5',
    strokeCount: 5,
    radical: '目 (Mục - Mắt)',
    mnemonics: 'Hình vẽ đồng tử mắt xoay dọc với các mí mắt.',
    examples: [
      {
        word: '目',
        furigana: 'め',
        romaji: 'me',
        meaning: 'Đôi mắt',
        sentence: {
          jp: '目が痛いです。',
          furigana: 'めがいたいです。',
          romaji: 'Me ga itai desu.',
          vi: 'Tôi bị đau mắt.'
        }
      },
      {
        word: '目的',
        furigana: 'もくてき',
        romaji: 'mokuteki',
        meaning: 'Mục đích'
      }
    ]
  },
  {
    id: 'n5-mimi',
    character: '耳',
    hanViet: 'NHĨ',
    vietnamese: 'Tai, thính giác',
    onyomi: ['ジ (ji)'],
    kunyomi: ['みみ (mimi)'],
    jlpt: 'N5',
    strokeCount: 6,
    radical: '耳 (Nhĩ - Tai)',
    mnemonics: 'Hình vành tai người với các nếp gờ nghe âm thanh.',
    examples: [
      {
        word: '耳',
        furigana: 'みみ',
        romaji: 'mimi',
        meaning: 'Lỗ tai',
        sentence: {
          jp: 'うさぎの耳は長いです。',
          furigana: 'うさぎのみみはながいです。',
          romaji: 'Usagi no mimi wa nagai desu.',
          vi: 'Tai của thỏ rất dài.'
        }
      }
    ]
  },

  // =================== N4 KANJI ===================
  {
    id: 'n4-kai',
    character: '会',
    hanViet: 'HỘI',
    vietnamese: 'Gặp gỡ, hội họp, công ty',
    onyomi: ['カイ (kai)', 'エ (e)'],
    kunyomi: ['あ・う (a-u)'],
    jlpt: 'N4',
    strokeCount: 6,
    radical: '人 (Nhân)',
    mnemonics: 'Mọi người tụ họp dưới một mái nhà để trò chuyện.',
    examples: [
      {
        word: '会う',
        furigana: 'あう',
        romaji: 'au',
        meaning: 'Gặp gỡ',
        sentence: {
          jp: '駅で友達と会います。',
          furigana: 'えきでともだちとあいます。',
          romaji: 'Eki de tomodachi to aimasu.',
          vi: 'Tôi gặp bạn ở nhà ga.'
        }
      },
      {
        word: '会社',
        furigana: 'かいしゃ',
        romaji: 'kaisha',
        meaning: 'Công ty',
        sentence: {
          jp: 'ITの会社で働いています。',
          furigana: 'ITのかいしゃではたらいています。',
          romaji: 'IT no kaisha de hataraiteimasu.',
          vi: 'Tôi đang làm việc tại một công ty IT.'
        }
      },
      {
        word: '会話',
        furigana: 'かいわ',
        romaji: 'kaiwa',
        meaning: 'Hội thoại, đàm thoại'
      }
    ]
  },
  {
    id: 'n4-sha',
    character: '社',
    hanViet: 'XÃ',
    vietnamese: 'Xã hội, công ty, đền thờ',
    onyomi: ['シャ (sha)'],
    kunyomi: ['やしろ (yashiro)'],
    jlpt: 'N4',
    strokeCount: 7,
    radical: '示 (Thị - Thần linh)',
    mnemonics: 'Lễ bái thần đất (Thổ 土) cầu chúc bình an cho cộng đồng xã hội.',
    examples: [
      {
        word: '社会',
        furigana: 'しゃかい',
        romaji: 'shakai',
        meaning: 'Xã hội',
        sentence: {
          jp: '現代社会には多くの課題があります。',
          furigana: 'げんだいしゃかいにはおおくのかだいがあります。',
          romaji: 'Gendai shakai ni wa ooku no kadai ga arimasu.',
          vi: 'Xã hội hiện đại có nhiều vấn đề cần giải quyết.'
        }
      },
      {
        word: '神社',
        furigana: 'じんじゃ',
        romaji: 'jinja',
        meaning: 'Đền thờ Shinto'
      },
      {
        word: '社長',
        furigana: 'しゃちょう',
        romaji: 'shachou',
        meaning: 'Giám đốc công ty'
      }
    ]
  },
  {
    id: 'n4-mon',
    character: '門',
    hanViet: 'MÔN',
    vietnamese: 'Cổng, cửa ngõ, môn học',
    onyomi: ['モン (mon)'],
    kunyomi: ['かど (kado)', 'と (to)'],
    jlpt: 'N4',
    strokeCount: 8,
    radical: '門 (Môn - Cổng)',
    mnemonics: 'Hai cánh cổng lớn mở rộng chào đón người bước vào.',
    examples: [
      {
        word: '門',
        furigana: 'もん',
        romaji: 'mon',
        meaning: 'Cổng',
        sentence: {
          jp: '正門の前で待ち合わせしましょう。',
          furigana: 'せいもんのまえでまちあわせしましょう。',
          romaji: 'Seimon no mae de machiawase shimashou.',
          vi: 'Hẹn gặp nhau trước cổng chính nhé.'
        }
      },
      {
        word: '専門',
        furigana: 'せんもん',
        romaji: 'senmon',
        meaning: 'Chuyên môn'
      }
    ]
  },
  {
    id: 'n4-shin',
    character: '新',
    hanViet: 'TÂN',
    vietnamese: 'Mới mẻ, tươi mới, cải tân',
    onyomi: ['シン (shin)'],
    kunyomi: ['あたら・しい (atara-shii)', 'あら・た (ara-ta)'],
    jlpt: 'N4',
    strokeCount: 13,
    radical: '斤 (Cân - Chiếc rìu)',
    mnemonics: 'Dùng rìu đốn cây gỗ mới thơm phức trong rừng.',
    examples: [
      {
        word: '新しい',
        furigana: 'あたらしい',
        romaji: 'atarashii',
        meaning: 'Mới',
        sentence: {
          jp: '新しいパソコンを買いました。',
          furigana: 'あたらしいぱそこんをかいました。',
          romaji: 'Atarashii pasokon o kaimashita.',
          vi: 'Tôi vừa mua một chiếc máy tính xách tay mới.'
        }
      },
      {
        word: '新聞',
        furigana: 'しんぶん',
        romaji: 'shinbun',
        meaning: 'Báo chí'
      },
      {
        word: '新年',
        furigana: 'しんねん',
        romaji: 'shinnen',
        meaning: 'Năm mới'
      }
    ]
  },
  {
    id: 'n4-ko',
    character: '古',
    hanViet: 'CỔ',
    vietnamese: 'Cũ kỹ, cổ xưa, quá khứ',
    onyomi: ['コ (ko)'],
    kunyomi: ['ふる・い (furu-i)'],
    jlpt: 'N4',
    strokeCount: 5,
    radical: '口 (Khẩu)',
    mnemonics: 'Mười (十) đời truyền miệng (口) cho nhau câu chuyện thời xưa cổ.',
    examples: [
      {
        word: '古い',
        furigana: 'ふるい',
        romaji: 'furui',
        meaning: 'Cũ, cổ kính',
        sentence: {
          jp: '京都には古いお寺がたくさんあります。',
          furigana: 'きょうとにはふるいおてらがたくさんあります。',
          romaji: 'Kyouto ni wa furui otera ga takusan arimasu.',
          vi: 'Ở Kyoto có rất nhiều ngôi chùa cổ kính.'
        }
      },
      {
        word: '中古',
        furigana: 'ちゅうこ',
        romaji: 'chuuko',
        meaning: 'Hàng đã qua sử dụng, đồ cũ'
      }
    ]
  },
  {
    id: 'n4-datsu',
    character: '待',
    hanViet: 'ĐÃI',
    vietnamese: 'Chờ đợi, đối đãi, tiếp đón',
    onyomi: ['タイ (tai)'],
    kunyomi: ['ま・つ (ma-tsu)'],
    jlpt: 'N4',
    strokeCount: 9,
    radical: '彳 (Xích - Bước đi)',
    mnemonics: 'Đi đến chùa (寺) đứng lại để chờ đợi người thân.',
    examples: [
      {
        word: '待つ',
        furigana: 'まつ',
        romaji: 'matsu',
        meaning: 'Chờ đợi',
        sentence: {
          jp: 'ちょっと待ってください。',
          furigana: 'ちょっとまってください。',
          romaji: 'Chotto matte kudasai.',
          vi: 'Xin hãy đợi một chút.'
        }
      },
      {
        word: '期待',
        furigana: 'きたい',
        romaji: 'kitai',
        meaning: 'Kỳ vọng, mong chờ'
      }
    ]
  },
  {
    id: 'n4-ryo',
    character: '旅',
    hanViet: 'LỮ',
    vietnamese: 'Đi xa, du lịch, lữ hành',
    onyomi: ['リョ (ryo)'],
    kunyomi: ['たび (tabi)'],
    jlpt: 'N4',
    strokeCount: 10,
    radical: '方 (Phương)',
    mnemonics: 'Mang theo cờ và đồ đạc cùng đoàn người lên đường chu du phương xa.',
    examples: [
      {
        word: '旅行',
        furigana: 'りょこう',
        romaji: 'ryokou',
        meaning: 'Chuyến du lịch',
        sentence: {
          jp: '来月、日本へ旅行に行きます。',
          furigana: 'らいげつ、にほんへりょこうにいきます。',
          romaji: 'Raigetsu, Nihon e ryokou ni ikimasu.',
          vi: 'Tháng sau tôi sẽ đi du lịch Nhật Bản.'
        }
      },
      {
        word: '旅館',
        furigana: 'りょかん',
        romaji: 'ryokan',
        meaning: 'Quán trọ truyền thống Nhật Bản'
      }
    ]
  },
  {
    id: 'n4-shoku',
    character: '食',
    hanViet: 'THỰC',
    vietnamese: 'Ăn uống, thức ăn, ẩm thực',
    onyomi: ['ショク (shoku)', 'ジキ (jiki)'],
    kunyomi: ['た・べる (ta-beru)', 'く・う (ku-u)'],
    jlpt: 'N4',
    strokeCount: 9,
    radical: '食 (Thực - Ăn)',
    mnemonics: 'Người gom góp các loại ngũ cốc tốt nhất dưới mái nhà để làm thức ăn.',
    examples: [
      {
        word: '食べる',
        furigana: 'たべる',
        romaji: 'taberu',
        meaning: 'Ăn',
        sentence: {
          jp: '朝ごはんを食べましたか。',
          furigana: 'あさごはんをたべましたか。',
          romaji: 'Asagohan o tabemashita ka.',
          vi: 'Bạn đã ăn bữa sáng chưa?'
        }
      },
      {
        word: '食事',
        furigana: 'しょくじ',
        romaji: 'shokuji',
        meaning: 'Bữa ăn'
      },
      {
        word: '食堂',
        furigana: 'しょくどう',
        romaji: 'shokudou',
        meaning: 'Nhà ăn, căn tin'
      }
    ]
  },
  {
    id: 'n4-in',
    character: '飲',
    hanViet: 'ẨM',
    vietnamese: 'Uống, đồ uống',
    onyomi: ['イン (in)'],
    kunyomi: ['の・む (no-mu)'],
    jlpt: 'N4',
    strokeCount: 12,
    radical: '食 (Thực)',
    mnemonics: 'Bộ Thực (ăn 食) kết hợp với người há miệng uống từng ngụm lớn.',
    examples: [
      {
        word: '飲む',
        furigana: 'のむ',
        romaji: 'nomu',
        meaning: 'Uống',
        sentence: {
          jp: '薬を飲んで寝ます。',
          furigana: 'くすりをのんでねます。',
          romaji: 'Kusuri o nonde nemasu.',
          vi: 'Tôi uống thuốc rồi đi ngủ.'
        }
      },
      {
        word: '飲み物',
        furigana: 'のみもの',
        romaji: 'nomimono',
        meaning: 'Đồ uống, nước giải khát'
      }
    ]
  },

  // =================== N3 KANJI ===================
  {
    id: 'n3-kei',
    character: '経',
    hanViet: 'KINH',
    vietnamese: 'Kinh tế, trải qua, kinh thư',
    onyomi: ['ケイ (kei)', 'キョウ (kyou)'],
    kunyomi: ['へ・る (he-ru)', 'た・つ (ta-tsu)'],
    jlpt: 'N3',
    strokeCount: 11,
    radical: '糸 (Mịch - Sợi tơ)',
    mnemonics: 'Sợi tơ dọc dệt nên tấm vải, giống như dòng chảy trải qua nhiều tháng năm.',
    examples: [
      {
        word: '経済',
        furigana: 'けいざい',
        romaji: 'keizai',
        meaning: 'Kinh tế',
        sentence: {
          jp: '大学で経済学を勉強しています。',
          furigana: 'だいがくでけいざいがくをべんきょうしています。',
          romaji: 'Daigaku de keizaigaku o benkyou shiteimasu.',
          vi: 'Tôi đang theo học ngành kinh tế học ở trường đại học.'
        }
      },
      {
        word: '経験',
        furigana: 'けいけん',
        romaji: 'keiken',
        meaning: 'Kinh nghiệm'
      },
      {
        word: '経営',
        furigana: 'けいえい',
        romaji: 'keiei',
        meaning: 'Kinh doanh, quản trị'
      }
    ]
  },
  {
    id: 'n3-sai',
    character: '済',
    hanViet: 'TẾ',
    vietnamese: 'Cứu tế, thanh toán, kết thúc',
    onyomi: ['サイ (sai)', 'セイ (sei)'],
    kunyomi: ['す・む (su-mu)', 'す・ます (su-masu)'],
    jlpt: 'N3',
    strokeCount: 11,
    radical: '水 (Thủy - Nước)',
    mnemonics: 'Dòng nước trợ giúp vượt qua bờ bên kia, việc đã giải quyết êm xuôi.',
    examples: [
      {
        word: '経済',
        furigana: 'けいざい',
        romaji: 'keizai',
        meaning: 'Kinh tế'
      },
      {
        word: '返済',
        furigana: 'へんさい',
        romaji: 'hensai',
        meaning: 'Trả nợ, thanh toán hoàn tất',
        sentence: {
          jp: '借金をすべて返済しました。',
          furigana: 'しゃっきんをすべてへんさいしました。',
          romaji: 'Shakkin o subete hensai shimashita.',
          vi: 'Tôi đã trả hết tất cả nợ nần.'
        }
      }
    ]
  },
  {
    id: 'n3-ren',
    character: '連',
    hanViet: 'LIÊN',
    vietnamese: 'Liên kết, liên tục, dẫn theo',
    onyomi: ['レン (ren)'],
    kunyomi: ['つ・れる (tsu-reru)', 'つら・なる (tsura-naru)'],
    jlpt: 'N3',
    strokeCount: 10,
    radical: '辶 (Sước - Bước đi)',
    mnemonics: 'Đoàn xe (車) nối đuôi nhau di chuyển liên tục trên đường dài.',
    examples: [
      {
        word: '連絡',
        furigana: 'れんらく',
        romaji: 'renraku',
        meaning: 'Liên lạc',
        sentence: {
          jp: '着いたらすぐに連絡してください。',
          furigana: 'ついたらすぐにれんらくしてください。',
          romaji: 'Tsuitara sugu ni renraku shite kudasai.',
          vi: 'Khi đến nơi hãy liên lạc với tôi ngay nhé.'
        }
      },
      {
        word: '関連',
        furigana: 'かんれん',
        romaji: 'kanren',
        meaning: 'Liên quan, gắn kết'
      },
      {
        word: '連続',
        furigana: 'れんぞく',
        romaji: 'renzoku',
        meaning: 'Liên tục không dứt'
      }
    ]
  },
  {
    id: 'n3-ketsu',
    character: '結',
    hanViet: 'KẾT',
    vietnamese: 'Gắn kết, kết quả, buộc lại',
    onyomi: ['ケツ (ketsu)', 'ケチ (kechi)'],
    kunyomi: ['むす・ぶ (musu-bu)', 'ゆ・わえる (yu-waeru)'],
    jlpt: 'N3',
    strokeCount: 12,
    radical: '糸 (Mịch)',
    mnemonics: 'Dùng sợi chỉ buộc chặt lời cát tường (吉) thành mối kết duyên.',
    examples: [
      {
        word: '結婚',
        furigana: 'けっこん',
        romaji: 'kekkon',
        meaning: 'Kết hôn',
        sentence: {
          jp: '二人は来月結婚します。',
          furigana: 'ふたりはらいげつけっこんします。',
          romaji: 'Futari wa raigetsu kekkon shimasu.',
          vi: 'Hai người họ sẽ kết hôn vào tháng sau.'
        }
      },
      {
        word: '結果',
        furigana: 'けっか',
        romaji: 'kekka',
        meaning: 'Kết quả'
      },
      {
        word: '結論',
        furigana: 'けつろん',
        romaji: 'ketsuron',
        meaning: 'Kết luận'
      }
    ]
  },
  {
    id: 'n3-kan',
    character: '関',
    hanViet: 'QUAN',
    vietnamese: 'Quan hệ, cửa ải, liên quan',
    onyomi: ['カン (kan)'],
    kunyomi: ['せき (seki)', 'かか・わる (kaka-waru)'],
    jlpt: 'N3',
    strokeCount: 14,
    radical: '門 (Môn)',
    mnemonics: 'Cửa ải kiên cố gác chắn có then khóa đan chéo bảo vệ mối liên kết.',
    examples: [
      {
        word: '関係',
        furigana: 'かんけい',
        romaji: 'kankei',
        meaning: 'Mối quan hệ',
        sentence: {
          jp: '良い人間関係を築くことが大切です。',
          furigana: 'よいにんげんかんけいをきずくことがたいせつです。',
          romaji: 'Yoi ningen kankei o kizuku koto ga taisetsu desu.',
          vi: 'Xây dựng mối quan hệ tốt giữa con người là điều rất quan trọng.'
        }
      },
      {
        word: '玄関',
        furigana: 'げんかん',
        romaji: 'genkan',
        meaning: 'Lối vào nhà, sảnh trước'
      },
      {
        word: '関心',
        furigana: 'かんしん',
        romaji: 'kanshin',
        meaning: 'Sự quan tâm, hứng thú'
      }
    ]
  },

  // =================== N2 KANJI ===================
  {
    id: 'n2-ken',
    character: '憲',
    hanViet: 'HIẾN',
    vietnamese: 'Hiến pháp, phép tắc, chuẩn mực',
    onyomi: ['ケン (ken)'],
    kunyomi: [],
    jlpt: 'N2',
    strokeCount: 16,
    radical: '心 (Tâm - Lòng người)',
    mnemonics: 'Mắt dõi nhìn và tấm lòng tuân thủ luật pháp tối cao của đất nước.',
    examples: [
      {
        word: '憲法',
        furigana: 'けんぽう',
        romaji: 'kenpou',
        meaning: 'Hiến pháp',
        sentence: {
          jp: '憲法は国の最高法規です。',
          furigana: 'けんぽうはくにのさいこうほうきです。',
          romaji: 'Kenpou wa kuni no saikou houki desu.',
          vi: 'Hiến pháp là đạo luật cao nhất của quốc gia.'
        }
      },
      {
        word: '違憲',
        furigana: 'いけん',
        romaji: 'iken',
        meaning: 'Vi hiến, trái với hiến pháp'
      }
    ]
  },
  {
    id: 'n2-kou',
    character: '構',
    hanViet: 'CẤU',
    vietnamese: 'Cấu trúc, cấu thành, thiết kế',
    onyomi: ['コウ (kou)'],
    kunyomi: ['かま・える (kama-eru)', 'かま・う (kama-u)'],
    jlpt: 'N2',
    strokeCount: 14,
    radical: '木 (Mộc)',
    mnemonics: 'Dùng gỗ đan kết tinh tế để dựng nên kết cấu ngôi nhà vững chãi.',
    examples: [
      {
        word: '構造',
        furigana: 'こうぞう',
        romaji: 'kouzou',
        meaning: 'Cấu trúc, kết cấu',
        sentence: {
          jp: 'この建物の構造はとても頑丈です。',
          furigana: 'このたてもののこうぞうはとてもがんじょうです。',
          romaji: 'Kono tatemono no kouzou wa totemo ganjou desu.',
          vi: 'Cấu trúc của tòa nhà này cực kỳ kiên cố.'
        }
      },
      {
        word: '構成',
        furigana: 'こうせい',
        romaji: 'kousei',
        meaning: 'Cấu thành, tổ chức'
      },
      {
        word: '構わない',
        furigana: 'かまわない',
        romaji: 'kamawanai',
        meaning: 'Không sao, không bận tâm'
      }
    ]
  },
  {
    id: 'n2-zou',
    character: '造',
    hanViet: 'TẠO',
    vietnamese: 'Chế tạo, tạo dựng, sáng tạo',
    onyomi: ['ゾウ (zou)'],
    kunyomi: ['つく・る (tsuku-ru)'],
    jlpt: 'N2',
    strokeCount: 10,
    radical: '辶 (Sước)',
    mnemonics: 'Lời thông báo cáo thị (告) rồi bắt tay tiến bước tạo dựng nên công trình.',
    examples: [
      {
        word: '製造',
        furigana: 'せいぞう',
        romaji: 'seizou',
        meaning: 'Sản xuất, chế tạo',
        sentence: {
          jp: '最新の車を工場で製造しています。',
          furigana: 'さいしんのくるまをこうじょうでせいぞうしています。',
          romaji: 'Saishin no kuruma o koujou de seizou shiteimasu.',
          vi: 'Những chiếc xe hơi mới nhất đang được chế tạo tại nhà máy.'
        }
      },
      {
        word: '創造',
        furigana: 'そうぞう',
        romaji: 'souzou',
        meaning: 'Sáng tạo'
      }
    ]
  },
  {
    id: 'n2-shou',
    character: '詳',
    hanViet: 'TƯỜNG',
    vietnamese: 'Rõ ràng, tường tận, chi tiết',
    onyomi: ['ショウ (shou)'],
    kunyomi: ['くわ・しい (kuwa-shii)', 'つまび・らか (tsumabi-raka)'],
    jlpt: 'N2',
    strokeCount: 13,
    radical: '言 (Ngôn - Lời nói)',
    mnemonics: 'Dùng lời lẽ (言) tốt lành như loài cừu (羊) giải thích cặn kẽ mọi ngóc ngách.',
    examples: [
      {
        word: '詳しい',
        furigana: 'くわしい',
        romaji: 'kuwashii',
        meaning: 'Chi tiết, rành rẽ',
        sentence: {
          jp: '詳細はメールで後ほどお送りします。',
          furigana: 'しょうさいはめーるでのちほどおおくりします。',
          romaji: 'Shousai wa meeru de nochihodo o-okuri shimasu.',
          vi: 'Tôi sẽ gửi thông tin chi tiết qua email lát sau.'
        }
      },
      {
        word: '詳細',
        furigana: 'しょうさい',
        romaji: 'shousai',
        meaning: 'Chi tiết'
      }
    ]
  },

  // =================== N1 KANJI ===================
  {
    id: 'n1-kan',
    character: '鑑',
    hanViet: 'GIÁM',
    vietnamese: 'Gương soi, giám định, thưởng ngoạn',
    onyomi: ['カン (kan)'],
    kunyomi: ['かがみ (kagami)', 'かんが・みる (kanga-miru)'],
    jlpt: 'N1',
    strokeCount: 23,
    radical: '金 (Kim)',
    mnemonics: 'Dùng kim loại quý mài nhẵn thành chiếc gương soi để giám định bảo vật.',
    examples: [
      {
        word: '鑑賞',
        furigana: 'かんしょう',
        romaji: 'kanshou',
        meaning: 'Thưởng ngoạn (nghệ thuật, âm nhạc)',
        sentence: {
          jp: '週末に美術館で絵画を鑑賞しました。',
          furigana: 'しゅうまつにびじゅつかんでかいがをかんしょうしました。',
          romaji: 'Shuumatsu ni bijutsukan de kaiga o kanshou shimashita.',
          vi: 'Cuối tuần tôi đã thưởng lãm các tác phẩm hội họa ở bảo tàng mỹ thuật.'
        }
      },
      {
        word: '鑑定',
        furigana: 'かんてい',
        romaji: 'kantei',
        meaning: 'Giám định (đồ cổ, đá quý)'
      },
      {
        word: '印鑑',
        furigana: 'いんかん',
        romaji: 'inkan',
        meaning: 'Con dấu cá nhân'
      }
    ]
  },
  {
    id: 'n1-ha',
    character: '覇',
    hanViet: 'BÁ',
    vietnamese: 'Bá chủ, xưng bá, thống trị',
    onyomi: ['ハ (ha)', 'ハク (haku)'],
    kunyomi: [],
    jlpt: 'N1',
    strokeCount: 19,
    radical: '襾 (Á - Che đậy)',
    mnemonics: 'Dưới ánh trăng mưa, người anh hùng thể hiện khí phách xưng vương bá chủ.',
    examples: [
      {
        word: '覇権',
        furigana: 'はけん',
        romaji: 'haken',
        meaning: 'Bá quyền, quyền thống trị',
        sentence: {
          jp: '市場での覇権を巡って競争が激化しています。',
          furigana: 'しじょうでのはけんをめぐってきょうそうがげきかしています。',
          romaji: 'Shijou de no haken o megutte kyousou ga gekika shiteimasu.',
          vi: 'Cuộc cạnh tranh giành quyền bá chủ trên thị trường ngày càng khốc liệt.'
        }
      },
      {
        word: '連覇',
        furigana: 'れんぱ',
        romaji: 'renpa',
        meaning: 'Thắng liên tiếp, vô địch nhiều lần'
      }
    ]
  },
  {
    id: 'n1-jou',
    character: '醸',
    hanViet: 'NHƯỠNG',
    vietnamese: 'Ủ rượu, lên men, gây ra (không khí)',
    onyomi: ['ジョウ (jou)'],
    kunyomi: ['かも・す (kamo-su)'],
    jlpt: 'N1',
    strokeCount: 20,
    radical: '酉 (Dậu - Bình rượu)',
    mnemonics: 'Ủ men trong bình rượu (酉) tạo nên hương vị nồng nàn lan tỏa.',
    examples: [
      {
        word: '醸造',
        furigana: 'じょうぞう',
        romaji: 'jouzou',
        meaning: 'Ủ men, chưng cất rượu',
        sentence: {
          jp: 'この地方は日本酒の醸造で有名です。',
          furigana: 'このちほうはにほんしゅのじょうぞうでゆうめいです。',
          romaji: 'Kono chihou wa nihonshu no jouzou de yuumei desu.',
          vi: 'Khu vực này nổi tiếng với nghề ủ rượu sake truyền thống.'
        }
      },
      {
        word: '醸し出す',
        furigana: 'かもしだす',
        romaji: 'kamoshidasu',
        meaning: 'Tạo ra bầu không khí (ấm áp, kỳ bí...)'
      }
    ]
  },
  {
    id: 'n1-ken-show',
    character: '顕',
    hanViet: 'HIỂN',
    vietnamese: 'Hiển hiện, rõ rệt, vinh hiển',
    onyomi: ['ケン (ken)'],
    kunyomi: ['あきら・か (akira-ka)', 'あらわ・れる (arawa-reru)'],
    jlpt: 'N1',
    strokeCount: 18,
    radical: '頁 (Hiệt - Trang giấy/Đầu)',
    mnemonics: 'Mặt trời chiếu sáng rực rỡ lên trang sách, mọi điều đều hiển thị sáng rõ.',
    examples: [
      {
        word: '顕著',
        furigana: 'けんちょ',
        romaji: 'kencho',
        meaning: 'Rõ rệt, nổi bật, đáng kể',
        sentence: {
          jp: '業績に顕著な改善が見られました。',
          furigana: 'ぎょうせきにけんちょなかいぜんがみられました。',
          romaji: 'Gyouseki ni kencho na kaizen ga mirararemashita.',
          vi: 'Đã thấy sự cải thiện rõ rệt trong kết quả kinh doanh.'
        }
      },
      {
        word: '顕微鏡',
        furigana: 'けんびきょう',
        romaji: 'kenbikyou',
        meaning: 'Kính hiển vi'
      }
    ]
  }
];

export const JLPT_LEVELS: { id: 'all' | 'N5' | 'N4' | 'N3' | 'N2' | 'N1'; name: string; desc: string; color: string }[] = [
  { id: 'all', name: 'Tất cả', desc: 'Toàn bộ thư viện', color: 'from-pink-500 via-purple-500 to-indigo-500' },
  { id: 'N5', name: 'N5', desc: 'Căn bản (Nhập môn)', color: 'from-emerald-400 to-teal-600' },
  { id: 'N4', name: 'N4', desc: 'Sơ cấp (Thực tế)', color: 'from-cyan-400 to-blue-600' },
  { id: 'N3', name: 'N3', desc: 'Trung cấp (Đời sống)', color: 'from-violet-500 to-purple-700' },
  { id: 'N2', name: 'N2', desc: 'Thượng cấp (Văn phòng)', color: 'from-fuchsia-500 to-pink-600' },
  { id: 'N1', name: 'N1', desc: 'Cao cấp (Chuyên sâu)', color: 'from-amber-400 to-rose-600' },
];
