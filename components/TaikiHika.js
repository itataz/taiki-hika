import React, { useState, useEffect } from 'react';
import { ChevronRight, Volume2, Star, Trophy, Target, Coffee, Train, ShoppingBag, Hotel, AlertCircle, Menu, X, Check, Lock, Search, Heart } from 'lucide-react';

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
    const savedProgress = localStorage.getItem('taikiHikaProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // 進捗が更新されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem('taikiHikaProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Google Analytics トラッキング
  useEffect(() => {
    // ページタイトル設定
    document.title = 'Taiki Hika - Essential Japanese Phrases for Travelers';
    
    // メタタグ設定
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Master essential Japanese phrases for your trip to Japan. Learn pronunciation, context, and cultural tips with Taiki Hika.';
    }
    
    // Google Analytics 4の設定
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'Taiki Hika Home',
        page_location: window.location.href
      });
    }
  }, []);

  // フレーズデータベース
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
          xp: 10
        },
        {
          id: 'r6',
          japanese: '水をください',
          romaji: 'Mizu o kudasai',
          english: 'Water, please',
          context: 'Ask for water',
          audio: true,
          xp: 10
        },
        {
          id: 'r7',
          japanese: '英語のメニューはありますか',
          romaji: 'Eigo no menyu wa arimasu ka',
          english: 'Do you have an English menu?',
          context: 'Ask for English menu',
          audio: true,
          xp: 15
        },
        {
          id: 'r8',
          japanese: 'おすすめは何ですか',
          romaji: 'Osusume wa nan desu ka',
          english: 'What do you recommend?',
          context: 'Ask for recommendations',
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
          xp: 15
        },
        {
          id: 't5',
          japanese: '次の駅は何ですか',
          romaji: 'Tsugi no eki wa nan desu ka',
          english: 'What\'s the next station?',
          context: 'Ask about next stop',
          audio: true,
          xp: 15
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
          xp: 15
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
          xp: 15,
          premium: true
        },
        {
          id: 'h2',
          japanese: '予約があります',
          romaji: 'Yoyaku ga arimasu',
          english: 'I have a reservation',
          context: 'Tell them you booked',
          audio: true,
          xp: 15
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

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-gray-800">Master This Phrase</h3>
            <div className="flex items-center gap-2">
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
              <button
                onClick={() => setSelectedPhrase(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-3xl font-bold text-center mb-2">{selectedPhrase.japanese}</p>
              <p className="text-lg text-center text-gray-600 mb-4">{selectedPhrase.romaji}</p>
              
              <button
                onClick={() => playAudio(selectedPhrase.japanese)}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <Volume2 className="w-5 h-5" />
                Listen to Pronunciation
              </button>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-lg font-semibold text-gray-800 mb-1">English:</p>
              <p className="text-gray-700">{selectedPhrase.english}</p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">Context:</p>
              <p className="text-sm text-gray-700">{selectedPhrase.context}</p>
            </div>

            {selectedPhrase.categoryTitle && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className={`${selectedPhrase.categoryColor} text-white px-2 py-1 rounded`}>
                  {selectedPhrase.categoryTitle}
                </span>
              </div>
            )}

            <button
              onClick={() => {
                completePhrase(selectedPhrase.id, selectedPhrase.xp);
                setSelectedPhrase(null);
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-3 font-semibold transition-all transform hover:scale-105"
            >
              I've Mastered This! (+{selectedPhrase.xp} XP)
            </button>
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
                  onClick={() => !isLocked && setSelectedPhrase(phrase)}
                  className={`bg-white rounded-xl p-4 shadow-sm ${
                    isLocked ? 'opacity-50' : 'cursor-pointer hover:shadow-lg hover:border-purple-200'
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
              <h1 className="text-2xl font-bold flex items-center gap-2">
                ✨ Taiki Hika
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
            <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg flex items-center justify-between">
              <span className="flex items-center gap-3">
                <Star className="w-5 h-5" />
                <span>Upgrade to Premium</span>
              </span>
              <span className="text-sm">$4.99/mo</span>
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

        {/* コンテンツ表示 */}
        {activeTab === 'all' && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Choose Your Journey</h2>
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
                      onClick={() => !isLocked && setSelectedPhrase(phrase)}
                      className={`bg-white rounded-xl p-4 shadow-sm ${
                        isLocked ? 'opacity-50' : 'cursor-pointer hover:shadow-md'
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
                      onClick={() => !isLocked && setSelectedPhrase(phrase)}
                      className={`bg-white rounded-xl p-4 shadow-sm ${
                        isLocked ? 'opacity-50' : 'cursor-pointer hover:shadow-md'
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
              <p className="mb-4">Master 3 new phrases and continue your learning path!</p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">{userProgress.streak}</p>
                  <p className="text-sm">Day Streak</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold">{userProgress.completedPhrases.length}</p>
                  <p className="text-sm">Phrases Mastered</p>
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

            {/* Buy Me a Coffee セクション */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <p className="text-lg font-semibold mb-2">✨ Enjoying Taiki Hika?</p>
                <p className="text-gray-700 mb-4">Support us to expand our phrase collection!</p>
                <a 
                  href="https://www.buymeacoffee.com/taikihika"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl transition-all transform hover:scale-105"
                >
                  Support Taiki Hika ☕
                </a>
              </div>
            </div>

            {/* フッター */}
            <div className="mt-12 pb-8 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Made with ✨ by Taiki Hika Phrases
              </p>
              <p className="text-xs text-gray-500">
                Empowering travelers to connect with Japan through language
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaikiHika;