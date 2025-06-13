import React, { useState, useEffect } from 'react';
import { ChevronRight, Volume2, Star, Trophy, Target, Coffee, Train, ShoppingBag, Hotel, AlertCircle, Menu, X, Check, Lock, Search, Heart, MapPin, Users, Camera } from 'lucide-react';

const TaikiHika = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userProgress, setUserProgress] = useState({
    level: 1,
    xp: 0,
    completedPhrases: [],
    favoritePhrases: [],
    streak: 0,
    isPremium: false
  });
  const [showMenu, setShowMenu] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // all, favorites, search
  const [searchQuery, setSearchQuery] = useState('');
  const [showAchievement, setShowAchievement] = useState(null);

  // ローカルストレージから進捗を読み込み
  useEffect(() => {
    const savedProgress = localStorage.getItem('japanWizardProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // 進捗が更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('japanWizardProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Google Analytics トラッキング
  useEffect(() => {
    // ページタイトル設定
    document.title = 'Japan Work Culture Wizard - Essential Japanese Phrases for Travelers';
    
    // メタタグ設定
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Master essential Japanese phrases for your trip to Japan. Learn pronunciation, context, and cultural tips with Japan Work Culture Wizard.';
    }
    
    // Google Analytics 4の設定
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Japan Work Culture Wizard Home',
        page_location: window.location.href
      });
    }
  }, []);

  // 初期のホテルカテゴリーをプレミアムフレーズを調整
  const categories = [
    {
      id: 'restaurant',
      title: 'Restaurant',
      icon: Coffee,
      color: 'bg-amber-500',
      description: 'Order food & drinks like a pro',
      phrases: [
        {
          id: 'r1',
          japanese: 'これをください',
          romaji: 'Kore o kudasai',
          english: 'I\'ll have this, please',
          context: 'Point at menu item when ordering',
          audio: true,
          xp: 10
        },
        {
          id: 'r2',
          japanese: 'いただきます',
          romaji: 'Itadakimasu',
          english: 'Thank you for the meal (before eating)',
          context: 'Say before starting your meal',
          audio: true,
          xp: 10
        },
        {
          id: 'r3',
          japanese: 'おいしいです',
          romaji: 'Oishii desu',
          english: 'It\'s delicious',
          context: 'Compliment the food',
          audio: true,
          xp: 10
        },
        {
          id: 'r4',
          japanese: 'お会計をお願いします',
          romaji: 'Okaikei o onegaishimasu',
          english: 'Check, please',
          context: 'Ask for the bill',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'r5',
          japanese: 'ごちそうさまでした',
          romaji: 'Gochisousama deshita',
          english: 'Thank you for the meal (after eating)',
          context: 'Say after finishing your meal',
          audio: true,
          xp: 10,
          premium: true
        },
        {
          id: 'r6',
          japanese: '水をください',
          romaji: 'Mizu o kudasai',
          english: 'Water, please',
          context: 'Ask for water',
          audio: true,
          xp: 10,
          premium: true
        },
        {
          id: 'r7',
          japanese: '英語のメニューはありますか',
          romaji: 'Eigo no menyu wa arimasu ka',
          english: 'Do you have an English menu?',
          context: 'Ask for English menu',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'r8',
          japanese: 'おすすめは何ですか',
          romaji: 'Osusume wa nan desu ka',
          english: 'What do you recommend?',
          context: 'Ask for recommendations',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'r9',
          japanese: 'ベジタリアンメニューはありますか',
          romaji: 'Bejitarian menyu wa arimasu ka',
          english: 'Do you have vegetarian options?',
          context: 'Ask for vegetarian menu',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'r10',
          japanese: 'アレルギーがあります',
          romaji: 'Arerugi ga arimasu',
          english: 'I have allergies',
          context: 'Inform about allergies',
          audio: true,
          xp: 20,
          premium: true
        },
        {
          id: 'r11',
          japanese: 'おかわりをください',
          romaji: 'Okawari o kudasai',
          english: 'Refill, please',
          context: 'Ask for more drink/rice',
          audio: true,
          xp: 10
        },
        {
          id: 'r12',
          japanese: '持ち帰りできますか',
          romaji: 'Mochikaeri dekimasu ka',
          english: 'Can I take this to go?',
          context: 'Ask for takeout',
          audio: true,
          xp: 15
        }
      ]
    },
    {
      id: 'transport',
      title: 'Transportation',
      icon: Train,
      color: 'bg-blue-500',
      description: 'Navigate trains & taxis easily',
      phrases: [
        {
          id: 't1',
          japanese: '〜はどこですか',
          romaji: '... wa doko desu ka',
          english: 'Where is ...?',
          context: 'Ask for directions',
          audio: true,
          xp: 10
        },
        {
          id: 't2',
          japanese: 'すみません',
          romaji: 'Sumimasen',
          english: 'Excuse me',
          context: 'Get someone\'s attention politely',
          audio: true,
          xp: 10
        },
        {
          id: 't3',
          japanese: 'ありがとうございます',
          romaji: 'Arigatou gozaimasu',
          english: 'Thank you',
          context: 'Formal way to say thanks',
          audio: true,
          xp: 10
        },
        {
          id: 't4',
          japanese: 'この電車は〜に行きますか',
          romaji: 'Kono densha wa ... ni ikimasu ka',
          english: 'Does this train go to ...?',
          context: 'Confirm train destination',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 't5',
          japanese: '次の駅は何ですか',
          romaji: 'Tsugi no eki wa nan desu ka',
          english: 'What\'s the next station?',
          context: 'Ask about next stop',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 't6',
          japanese: '〜まで行ってください',
          romaji: '... made itte kudasai',
          english: 'Please go to ...',
          context: 'Tell taxi driver destination',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 't7',
          japanese: 'ここで降ります',
          romaji: 'Koko de orimasu',
          english: 'I\'ll get off here',
          context: 'Tell driver to stop',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 't8',
          japanese: '終電は何時ですか',
          romaji: 'Shuden wa nanji desu ka',
          english: 'What time is the last train?',
          context: 'Ask about last train',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 't9',
          japanese: '乗り換えが必要ですか',
          romaji: 'Norikae ga hitsuyou desu ka',
          english: 'Do I need to transfer?',
          context: 'Ask about train transfers',
          audio: true,
          xp: 20,
          premium: true
        },
        {
          id: 't10',
          japanese: '切符売り場はどこですか',
          romaji: 'Kippu uriba wa doko desu ka',
          english: 'Where is the ticket machine?',
          context: 'Find ticket machines',
          audio: true,
          xp: 15,
          premium: true
        }
      ]
    },
    {
      id: 'shopping',
      title: 'Shopping',
      icon: ShoppingBag,
      color: 'bg-purple-500',
      description: 'Shop with confidence',
      phrases: [
        {
          id: 's1',
          japanese: 'いくらですか',
          romaji: 'Ikura desu ka',
          english: 'How much is it?',
          context: 'Ask for the price',
          audio: true,
          xp: 10
        },
        {
          id: 's2',
          japanese: 'クレジットカードは使えますか',
          romaji: 'Kurejitto kaado wa tsukaemasuka',
          english: 'Can I use a credit card?',
          context: 'Ask about payment methods',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 's3',
          japanese: '袋をください',
          romaji: 'Fukuro o kudasai',
          english: 'A bag, please',
          context: 'Ask for a shopping bag',
          audio: true,
          xp: 10
        },
        {
          id: 's4',
          japanese: '試着できますか',
          romaji: 'Shichaku dekimasu ka',
          english: 'Can I try this on?',
          context: 'Ask to try clothes',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 's5',
          japanese: '他の色はありますか',
          romaji: 'Hoka no iro wa arimasu ka',
          english: 'Do you have other colors?',
          context: 'Ask for color options',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 's6',
          japanese: 'もっと大きいサイズはありますか',
          romaji: 'Motto ookii saizu wa arimasu ka',
          english: 'Do you have a bigger size?',
          context: 'Ask for larger size',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 's7',
          japanese: '免税できますか',
          romaji: 'Menzei dekimasu ka',
          english: 'Can I get tax-free?',
          context: 'Ask about tax-free shopping',
          audio: true,
          xp: 20,
          premium: true
        },
        {
          id: 's8',
          japanese: 'レシートをください',
          romaji: 'Reshiito o kudasai',
          english: 'Receipt, please',
          context: 'Ask for receipt',
          audio: true,
          xp: 10,
          premium: true
        }
      ]
    },
    {
      id: 'hotel',
      title: 'Hotel',
      icon: Hotel,
      color: 'bg-green-500',
      description: 'Check-in & requests made easy',
      phrases: [
        {
          id: 'h1',
          japanese: 'チェックインをお願いします',
          romaji: 'Chekku-in o onegaishimasu',
          english: 'I\'d like to check in',
          context: 'At the hotel reception',
          audio: true,
          xp: 15
        },
        {
          id: 'h2',
          japanese: '予約があります',
          romaji: 'Yoyaku ga arimasu',
          english: 'I have a reservation',
          context: 'Tell them you booked',
          audio: true,
          xp: 15
        },
        {
          id: 'h3',
          japanese: 'チェックアウトは何時ですか',
          romaji: 'Chekku-auto wa nanji desu ka',
          english: 'What time is checkout?',
          context: 'Ask about checkout time',
          audio: true,
          xp: 15
        },
        {
          id: 'h4',
          japanese: 'WiFiのパスワードは何ですか',
          romaji: 'WiFi no pasuwado wa nan desu ka',
          english: 'What\'s the WiFi password?',
          context: 'Ask for WiFi access',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'h5',
          japanese: 'タオルをもう一枚ください',
          romaji: 'Taoru o mou ichimai kudasai',
          english: 'One more towel, please',
          context: 'Request extra towel',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'h6',
          japanese: '荷物を預かってもらえますか',
          romaji: 'Nimotsu o azukatte moraemasu ka',
          english: 'Can you hold my luggage?',
          context: 'Ask to store luggage',
          audio: true,
          xp: 20,
          premium: true
        },
        {
          id: 'h7',
          japanese: '朝食は何時からですか',
          romaji: 'Choushoku wa nanji kara desu ka',
          english: 'What time does breakfast start?',
          context: 'Ask about breakfast hours',
          audio: true,
          xp: 15,
          premium: true
        }
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency',
      icon: AlertCircle,
      color: 'bg-red-500',
      description: 'Essential emergency phrases',
      phrases: [
        {
          id: 'e1',
          japanese: '助けて',
          romaji: 'Tasukete',
          english: 'Help!',
          context: 'Emergency situation',
          audio: true,
          xp: 20
        },
        {
          id: 'e2',
          japanese: '警察を呼んでください',
          romaji: 'Keisatsu o yonde kudasai',
          english: 'Please call the police',
          context: 'Need police assistance',
          audio: true,
          xp: 20
        },
        {
          id: 'e3',
          japanese: '病院はどこですか',
          romaji: 'Byouin wa doko desu ka',
          english: 'Where is the hospital?',
          context: 'Medical emergency',
          audio: true,
          xp: 20
        },
        {
          id: 'e4',
          japanese: '救急車を呼んでください',
          romaji: 'Kyuukyuusha o yonde kudasai',
          english: 'Please call an ambulance',
          context: 'Medical emergency',
          audio: true,
          xp: 20
        },
        {
          id: 'e5',
          japanese: '財布をなくしました',
          romaji: 'Saifu o nakushimashita',
          english: 'I lost my wallet',
          context: 'Lost belongings',
          audio: true,
          xp: 20,
          premium: true
        },
        {
          id: 'e6',
          japanese: 'パスポートをなくしました',
          romaji: 'Pasupooto o nakushimashita',
          english: 'I lost my passport',
          context: 'Lost documents',
          audio: true,
          xp: 20,
          premium: true
        },
        {
          id: 'e7',
          japanese: '薬局はどこですか',
          romaji: 'Yakkyoku wa doko desu ka',
          english: 'Where is the pharmacy?',
          context: 'Need medicine',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'e8',
          japanese: '気分が悪いです',
          romaji: 'Kibun ga warui desu',
          english: 'I feel sick',
          context: 'Feeling unwell',
          audio: true,
          xp: 15,
          premium: true
        }
      ]
    },
    {
      id: 'sightseeing',
      title: 'Sightseeing',
      icon: Camera,
      color: 'bg-pink-500',
      description: 'Explore attractions & take photos',
      phrases: [
        {
          id: 'sg1',
          japanese: '写真を撮ってもらえますか',
          romaji: 'Shashin o totte moraemasu ka',
          english: 'Could you take a photo?',
          context: 'Ask someone to take your photo',
          audio: true,
          xp: 15
        },
        {
          id: 'sg2',
          japanese: '入場料はいくらですか',
          romaji: 'Nyuujouryou wa ikura desu ka',
          english: 'How much is admission?',
          context: 'Ask about entrance fees',
          audio: true,
          xp: 15
        },
        {
          id: 'sg3',
          japanese: '営業時間は何時までですか',
          romaji: 'Eigyou jikan wa nanji made desu ka',
          english: 'What time do you close?',
          context: 'Ask about closing time',
          audio: true,
          xp: 15
        },
        {
          id: 'sg4',
          japanese: 'パンフレットはありますか',
          romaji: 'Panfuretto wa arimasu ka',
          english: 'Do you have a brochure?',
          context: 'Ask for information materials',
          audio: true,
          xp: 10,
          premium: true
        },
        {
          id: 'sg5',
          japanese: '写真を撮ってもいいですか',
          romaji: 'Shashin o totte mo ii desu ka',
          english: 'May I take photos?',
          context: 'Ask permission to photograph',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'sg6',
          japanese: '観光案内所はどこですか',
          romaji: 'Kankou annaisho wa doko desu ka',
          english: 'Where is the tourist information?',
          context: 'Find tourist information center',
          audio: true,
          xp: 15,
          premium: true
        }
      ]
    },
    {
      id: 'daily',
      title: 'Daily Life',
      icon: Users,
      color: 'bg-teal-500',
      description: 'Common daily interactions',
      phrases: [
        {
          id: 'd1',
          japanese: 'こんにちは',
          romaji: 'Konnichiwa',
          english: 'Hello (daytime)',
          context: 'General greeting during the day',
          audio: true,
          xp: 10
        },
        {
          id: 'd2',
          japanese: 'さようなら',
          romaji: 'Sayounara',
          english: 'Goodbye',
          context: 'Formal farewell',
          audio: true,
          xp: 10
        },
        {
          id: 'd3',
          japanese: 'はじめまして',
          romaji: 'Hajimemashite',
          english: 'Nice to meet you',
          context: 'First time meeting someone',
          audio: true,
          xp: 10
        },
        {
          id: 'd4',
          japanese: 'お名前は何ですか',
          romaji: 'Onamae wa nan desu ka',
          english: 'What\'s your name?',
          context: 'Ask someone\'s name',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'd5',
          japanese: '日本語がわかりません',
          romaji: 'Nihongo ga wakarimasen',
          english: 'I don\'t understand Japanese',
          context: 'Explain language barrier',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'd6',
          japanese: 'もう一度お願いします',
          romaji: 'Mou ichido onegaishimasu',
          english: 'One more time, please',
          context: 'Ask to repeat',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'd7',
          japanese: 'ゆっくり話してください',
          romaji: 'Yukkuri hanashite kudasai',
          english: 'Please speak slowly',
          context: 'Request slower speech',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'd8',
          japanese: 'トイレはどこですか',
          romaji: 'Toire wa doko desu ka',
          english: 'Where is the restroom?',
          context: 'Find the bathroom',
          audio: true,
          xp: 10,
          premium: true
        }
      ]
    },
    {
      id: 'business',
      title: 'Business',
      icon: MapPin,
      color: 'bg-indigo-500',
      description: 'Professional & work situations',
      phrases: [
        {
          id: 'b1',
          japanese: 'よろしくお願いします',
          romaji: 'Yoroshiku onegaishimasu',
          english: 'Please treat me well',
          context: 'Standard business greeting',
          audio: true,
          xp: 15
        },
        {
          id: 'b2',
          japanese: 'お疲れ様でした',
          romaji: 'Otsukaresama deshita',
          english: 'Thank you for your hard work',
          context: 'End of work day greeting',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'b3',
          japanese: '失礼します',
          romaji: 'Shitsurei shimasu',
          english: 'Excuse me (entering/leaving)',
          context: 'Enter or leave a room',
          audio: true,
          xp: 15,
          premium: true
        },
        {
          id: 'b4',
          japanese: '会議は何時からですか',
          romaji: 'Kaigi wa nanji kara desu ka',
          english: 'What time is the meeting?',
          context: 'Ask about meeting time',
          audio: true,
          xp: 20,
          premium: true
        },
        {
          id: 'b5',
          japanese: '名刺交換をお願いします',
          romaji: 'Meishi koukan o onegaishimasu',
          english: 'May we exchange business cards?',
          context: 'Business card exchange',
          audio: true,
          xp: 20,
          premium: true
        }
      ]
    }
  ];

  // 音声再生機能
  const playAudio = (text, lang = 'ja-JP') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // フレーズ完了処理
  const completePhrase = (phraseId, xp) => {
    if (!userProgress.completedPhrases.includes(phraseId)) {
      const newProgress = {
        ...userProgress,
        completedPhrases: [...userProgress.completedPhrases, phraseId],
        xp: userProgress.xp + xp
      };
      
      // レベルアップチェック
      const oldLevel = Math.floor(userProgress.xp / 100) + 1;
      const newLevel = Math.floor(newProgress.xp / 100) + 1;
      
      if (newLevel > oldLevel) {
        setShowAchievement({
          type: 'levelup',
          level: newLevel,
          rank: getNinjaRank(newLevel).rank
        });
        setTimeout(() => setShowAchievement(null), 3000);
      }
      
      // 最初のフレーズ達成
      if (newProgress.completedPhrases.length === 1) {
        setShowAchievement({
          type: 'first',
          message: 'First Step! You learned your first phrase!'
        });
        setTimeout(() => setShowAchievement(null), 3000);
      }
      
      // 10フレーズ達成
      if (newProgress.completedPhrases.length === 10) {
        setShowAchievement({
          type: 'milestone',
          message: 'Dedication! You learned 10 phrases!'
        });
        setTimeout(() => setShowAchievement(null), 3000);
      }
      
      setUserProgress(newProgress);
    }
  };

  // お気に入り追加/削除
  const toggleFavorite = (phraseId) => {
    setUserProgress(prev => {
      const isFavorite = prev.favoritePhrases.includes(phraseId);
      return {
        ...prev,
        favoritePhrases: isFavorite
          ? prev.favoritePhrases.filter(id => id !== phraseId)
          : [...prev.favoritePhrases, phraseId]
      };
    });
  };

  // 全カテゴリーから全フレーズを取得
  const getAllPhrases = () => {
    return categories.flatMap(cat => 
      cat.phrases.map(phrase => ({
        ...phrase,
        categoryId: cat.id,
        categoryTitle: cat.title,
        categoryColor: cat.color
      }))
    );
  };

  // 検索機能
  const searchPhrases = (query) => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return getAllPhrases().filter(phrase => 
      phrase.japanese.includes(query) ||
      phrase.romaji.toLowerCase().includes(lowerQuery) ||
      phrase.english.toLowerCase().includes(lowerQuery)
    );
  };

  // お気に入りフレーズを取得
  const getFavoritePhrases = () => {
    return getAllPhrases().filter(phrase => 
      userProgress.favoritePhrases.includes(phrase.id)
    );
  };

  // レベル計算
  const calculateLevel = () => {
    return Math.floor(userProgress.xp / 100) + 1;
  };

  // レベルランク
  const getNinjaRank = (level) => {
    if (level >= 20) return { rank: 'Master Explorer', color: 'text-purple-600' };
    if (level >= 15) return { rank: 'Culture Navigator', color: 'text-indigo-600' };
    if (level >= 10) return { rank: 'Journey Expert', color: 'text-blue-600' };
    if (level >= 5) return { rank: 'Phrase Learner', color: 'text-green-600' };
    return { rank: 'First Voyager', color: 'text-gray-600' };
  };

  const currentLevel = calculateLevel();
  const ninjaRank = getNinjaRank(currentLevel);
  const xpForNextLevel = (currentLevel * 100) - userProgress.xp;

  // フレーズ詳細モーダル
  const PhraseModal = () => {
    if (!selectedPhrase) return null;

    const isFavorite = userProgress.favoritePhrases.includes(selectedPhrase.id);
    const isLocked = selectedPhrase.premium && !userProgress.isPremium;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800">
              {isLocked ? 'Premium Phrase' : 'Master This Phrase'}
            </h3>
            <div className="flex items-center gap-2">
              {!isLocked && (
                <button
                  onClick={() => toggleFavorite(selectedPhrase.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    isFavorite 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isFavorite ? '❤️' : '🤍'}
                </button>
              )}
              <button
                onClick={() => setSelectedPhrase(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
              {/* デバッグ用プレミアムトグル（本番では削除） */}
            {process.env.NODE_ENV === 'development' && (
              <button 
                onClick={() => setUserProgress(prev => ({ ...prev, isPremium: !prev.isPremium }))}
                className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-600"
              >
                [Dev] Toggle Premium: {userProgress.isPremium ? 'ON' : 'OFF'}
              </button>
            )}
          </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-center mb-2">{selectedPhrase.japanese}</p>
              <p className="text-lg text-center text-gray-600 mb-4">{selectedPhrase.romaji}</p>
              
              {isLocked ? (
                <div className="text-center">
                  <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">Unlock this phrase with Premium</p>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl py-3 font-semibold transition-all">
                    Upgrade for $2.99/month
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => playAudio(selectedPhrase.japanese)}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                    Listen to Pronunciation
                  </button>
                </>
              )}
            </div>

            {!isLocked && (
              <>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-lg font-semibold text-gray-800 mb-1">English:</p>
                  <p className="text-gray-700">{selectedPhrase.english}</p>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-800 mb-1">Context:</p>
                  <p className="text-sm text-gray-700">{selectedPhrase.context}</p>
                </div>
              </>
            )}

            {selectedPhrase.categoryTitle && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className={`${selectedPhrase.categoryColor} text-white px-2 py-1 rounded`}>
                  {selectedPhrase.categoryTitle}
                </span>
              </div>
            )}

            {!isLocked && (
              <button
                onClick={() => {
                  completePhrase(selectedPhrase.id, selectedPhrase.xp);
                  setSelectedPhrase(null);
                }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-3 font-semibold transition-all transform hover:scale-105"
              >
                I've Mastered This! (+{selectedPhrase.xp} XP)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  // カテゴリー詳細ビュー
  const CategoryDetail = ({ category }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="bg-white shadow-sm">
          <div className="max-w-lg mx-auto px-4 py-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              Back
            </button>
            <div className="flex items-center gap-3">
              <div className={`${category.color} p-3 rounded-xl`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{category.title}</h2>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="space-y-3">
            {category.phrases.map((phrase) => {
              const isCompleted = userProgress.completedPhrases.includes(phrase.id);
              const isLocked = phrase.premium && !userProgress.isPremium;

              return (
                <div
                  key={phrase.id}
                  onClick={() => setSelectedPhrase(phrase)}
                  className={`bg-white rounded-xl p-4 shadow-sm ${
                    isLocked ? 'opacity-75 cursor-pointer hover:shadow-md' : 'cursor-pointer hover:shadow-lg hover:border-purple-200'
                  } transition-all border border-gray-100`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-bold text-lg text-gray-800 mb-1">{phrase.japanese}</p>
                      <p className="text-gray-600 text-sm mb-1">{phrase.romaji}</p>
                      <p className="text-gray-700">{phrase.english}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                      {isCompleted && <Check className="w-5 h-5 text-green-500" />}
                      {userProgress.favoritePhrases.includes(phrase.id) && (
                        <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      )}
                      <span className="text-sm font-semibold text-gray-500">+{phrase.xp} XP</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // メインビュー
  if (selectedCategory) {
    return (
      <>
        <CategoryDetail category={selectedCategory} />
        <PhraseModal />
      </>
    );
  }

  return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      {/* 実績通知 */}
      {showAchievement && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-4 rounded-xl shadow-lg">
            {showAchievement.type === 'levelup' && (
              <div className="text-center">
                <p className="text-2xl font-bold mb-1">🎉 Level Up!</p>
                <p className="text-lg">You are now Level {showAchievement.level}</p>
                <p className="text-sm">{showAchievement.rank}</p>
              </div>
            )}
            {showAchievement.type === 'first' && (
              <div className="text-center">
                <p className="text-xl font-bold mb-1">🌟 {showAchievement.message}</p>
              </div>
            )}
            {showAchievement.type === 'milestone' && (
              <div className="text-center">
                <p className="text-xl font-bold mb-1">🏆 {showAchievement.message}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-lg mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                ✨ Japan Work Culture Wizard
              </h1>
              <p className="text-sm text-white/80">Essential Japanese Phrases</p>
            </div>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* ステータスバー */}
          <div className="bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <span className={`font-semibold ${ninjaRank.color}`}>{ninjaRank.rank}</span>
              <span className="text-sm">Level {currentLevel}</span>
            </div>
            <div className="bg-white bg-opacity-30 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((userProgress.xp % 100) / 100) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>{userProgress.xp} XP</span>
              <span>{xpForNextLevel} XP to next level</span>
            </div>
          </div>
        </div>
      </div>

      {/* メニュー */}
      {showMenu && (
        <div className="bg-white shadow-lg">
          <div className="max-w-lg mx-auto px-4 py-4 space-y-3">
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Achievements</span>
            </button>
            <button className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3">
              <Target className="w-5 h-5 text-blue-500" />
              <span>Daily Challenge</span>
            </button>
            <a 
              href="https://www.amazon.com/stores/Taiki-Hika-Sensei/author/B09MHR6665"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg flex items-center gap-3 block"
            >
              <span className="text-lg">📚</span>
              <span>Books by Author</span>
            </a>
            <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg flex items-center justify-between shadow-lg">
              <span className="flex items-center gap-3">
                <Star className="w-5 h-5" />
                <span>Unlock All 64 Phrases</span>
              </span>
              <span className="text-sm">$2.99/mo</span>
            </button>
          </div>
        </div>
      )}

      {/* カテゴリー一覧 */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* タブ切り替え */}
        <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === 'all' 
                ? 'bg-white text-gray-800 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All Phrases
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'favorites' 
                ? 'bg-white text-gray-800 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Heart className="w-4 h-4" />
            Favorites
            {userProgress.favoritePhrases.length > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {userProgress.favoritePhrases.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'search' 
                ? 'bg-white text-gray-800 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* 検索バー */}
        {activeTab === 'search' && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search phrases in Japanese, Romaji, or English..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* プレミアムプロモーション（無料ユーザーのみ表示） */}
        {!userProgress.isPremium && activeTab === 'all' && (
          <div className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Unlock 44 Premium Phrases
                </p>
                <p className="text-sm opacity-90">
                  Get full access to all categories for just $2.99/month
                </p>
              </div>
              <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        )}

        {/* コンテンツ表示 */}
        {activeTab === 'all' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Choose Your Journey</h2>
              <span className="text-sm text-gray-600">
                {userProgress.isPremium 
                  ? `${getAllPhrases().length} phrases available`
                  : `${getAllPhrases().filter(p => !p.premium).length} free / ${getAllPhrases().length} total`
                }
              </span>
            </div>
            <div className="grid gap-4">
              {categories.map((category) => {
                const completedCount = category.phrases.filter(p =>
                  userProgress.completedPhrases.includes(p.id)
                ).length;
                const totalCount = category.phrases.length;

                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category)}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-all text-left border border-gray-100 hover:border-purple-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`${category.color} p-3 rounded-xl`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{category.title}</h3>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-700">
                          {completedCount}/{totalCount}
                        </p>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`${category.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${(completedCount / totalCount) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {activeTab === 'favorites' && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Favorite Phrases</h2>
            {userProgress.favoritePhrases.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No favorite phrases yet!</p>
                <p className="text-sm text-gray-500 mt-2">
                  Tap the heart icon on any phrase to save it here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {getFavoritePhrases().map((phrase) => {
                  const isCompleted = userProgress.completedPhrases.includes(phrase.id);
                  const isLocked = phrase.premium && !userProgress.isPremium;

                  return (
                    <div
                      key={phrase.id}
                      onClick={() => setSelectedPhrase(phrase)}
                      className={`bg-white rounded-xl p-4 shadow-sm ${
                        isLocked ? 'opacity-75 cursor-pointer hover:shadow-md' : 'cursor-pointer hover:shadow-md'
                      } transition-all`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-bold text-lg text-gray-800 mb-1">{phrase.japanese}</p>
                          <p className="text-gray-600 text-sm mb-1">{phrase.romaji}</p>
                          <p className="text-gray-700">{phrase.english}</p>
                          <span className={`inline-block mt-2 ${phrase.categoryColor} text-white text-xs px-2 py-1 rounded`}>
                            {phrase.categoryTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                          {isCompleted && <Check className="w-5 h-5 text-green-500" />}
                          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === 'search' && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Search Results</h2>
            {searchQuery === '' ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Type to search for phrases</p>
              </div>
            ) : searchPhrases(searchQuery).length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No phrases found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="space-y-3">
                {searchPhrases(searchQuery).map((phrase) => {
                  const isCompleted = userProgress.completedPhrases.includes(phrase.id);
                  const isLocked = phrase.premium && !userProgress.isPremium;
                  const isFavorite = userProgress.favoritePhrases.includes(phrase.id);

                  return (
                    <div
                      key={phrase.id}
                      onClick={() => setSelectedPhrase(phrase)}
                      className={`bg-white rounded-xl p-4 shadow-sm ${
                        isLocked ? 'opacity-75 cursor-pointer hover:shadow-md' : 'cursor-pointer hover:shadow-md'
                      } transition-all`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-bold text-lg text-gray-800 mb-1">{phrase.japanese}</p>
                          <p className="text-gray-600 text-sm mb-1">{phrase.romaji}</p>
                          <p className="text-gray-700">{phrase.english}</p>
                          <span className={`inline-block mt-2 ${phrase.categoryColor} text-white text-xs px-2 py-1 rounded`}>
                            {phrase.categoryTitle}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {isLocked && <Lock className="w-5 h-5 text-gray-400" />}
                          {isCompleted && <Check className="w-5 h-5 text-green-500" />}
                          {isFavorite && <Heart className="w-5 h-5 text-red-500 fill-red-500" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* クイックスタートセクション（allタブのみ表示） */}
        {activeTab === 'all' && (
          <>
            <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">🎯 Today's Journey</h3>
              <p className="mb-4">
                {userProgress.isPremium 
                  ? `Master 3 new phrases from our ${getAllPhrases().length}+ collection!`
                  : `Try our ${getAllPhrases().filter(p => !p.premium).length} free phrases - Unlock ${getAllPhrases().filter(p => p.premium).length} more with Premium!`
                }
              </p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{userProgress.streak}</p>
                  <p className="text-sm">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{userProgress.completedPhrases.length}</p>
                  <p className="text-sm">Phrases Mastered</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    {getAllPhrases().filter(p => !p.premium || userProgress.isPremium).length > 0
                      ? Math.round((userProgress.completedPhrases.length / getAllPhrases().filter(p => !p.premium || userProgress.isPremium).length) * 100)
                      : 0}%
                  </p>
                  <p className="text-sm">Complete</p>
                </div>
              </div>
            </div>

            {/* アフィリエイトセクション（収益化） */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold mb-3 text-gray-800">🗾 Planning Your Japan Trip?</h3>
              <div className="space-y-3">
                <a 
                  href="https://example.com/japan-rail-pass" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">JR Pass - Save 30% on trains</p>
                      <p className="text-sm text-gray-600">Unlimited travel on JR trains</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </a>
                
                <a 
                  href="https://example.com/pocket-wifi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">Pocket WiFi Rental</p>
                      <p className="text-sm text-gray-600">Stay connected everywhere in Japan</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                * Affiliate links - we earn a small commission at no extra cost to you
              </p>
            </div>

            {/* Author Section - 本の紹介 */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold mb-2">📚 Learn More with Our Books</h3>
              <p className="text-gray-700 mb-4">
                Dive deeper into Japanese language and culture with books by Taiki Hika Sensei
              </p>
              <div className="space-y-3">
                <a 
                  href="https://www.amazon.com/stores/Taiki-Hika-Sensei/author/B09MHR6665"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">📖 Browse All Books on Amazon</p>
                      <p className="text-sm text-gray-600">Japanese learning guides & cultural insights</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </a>
                
                {/* 特定の本を紹介する場合はここに追加 */}
                {/*
                <a 
                  href="YOUR_SPECIFIC_BOOK_URL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg p-3 hover:shadow-md transition-shadow border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">🌸 [Book Title]</p>
                      <p className="text-sm text-gray-600">[Book Description]</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </a>
                */}
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">
                "From digital to print - your complete Japanese learning journey"
              </p>
            </div>

            {/* Buy Me a Coffee セクション */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <p className="text-lg font-semibold mb-2">☕ Love Japan Work Culture Wizard?</p>
                <p className="text-gray-700 mb-4">Your support helps us add more phrases and improve the app!</p>
                <a 
                  href="https://buymeacoffee.com/taikihika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-800 font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center gap-2">
                    ☕ Buy Me a Coffee
                  </span>
                </a>
                <p className="text-xs text-gray-500 mt-3">
                  Every coffee helps us create better content for Japanese learners!
                </p>
              </div>
            </div>

            {/* フッター */}
            <div className="mt-12 pb-8 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Made with ✨ by Japan Work Culture Wizard
              </p>
              <p className="text-xs text-gray-500 mb-3">
                Empowering travelers to connect with Japan through language
              </p>
              <p className="text-xs text-gray-400">
                Created by <a href="https://www.amazon.com/stores/Taiki-Hika-Sensei/author/B09MHR6665" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-purple-600 hover:text-purple-700 underline">
                  Taiki Hika Sensei
                </a> • Author & Japanese Culture Expert
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaikiHika;