import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, FileText, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

const allExamQuestions: Question[] = [
  {
    id: 1,
    question: "जेब्रा क्रसिङ (Zebra Crossing) केका लागि प्रयोग गरिन्छ?",
    options: ["गाडी पार्किङ गर्न", "पैदल यात्रीले बाटो काट्न", "गाडी रोक्न", "ओभरटेक गर्न"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "रातो ट्राफिक बत्ती (Red Light) बलेको बेला के गर्नुपर्छ?",
    options: ["गाडी अगाडि बढाउने", "गाडी रोक्ने", "गाडीको हर्न बजाउने", "विस्तारै अगाडि बढ्ने"],
    correctIndex: 1,
  },
  {
    id: 3,
    question: "ओभरटेक (Overtake) गर्दा कुन साइडबाट गर्नुपर्छ?",
    options: ["बायाँ साइडबाट", "दायाँ साइडबाट", "जुन साइडबाट सजिलो हुन्छ", "ओभरटेक गर्न हुँदैन"],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "सवारी साधन चलाउँदा चालकसँग अनिवार्य कुन कागजपत्र हुनुपर्छ?",
    options: ["सवारी चालक अनुमतिपत्र (License)", "सवारी दर्ता किताब (Bluebook)", "कर तिरेको रसिद", "माथिका सबै"],
    correctIndex: 3,
  },
  {
    id: 5,
    question: "कस्तो अवस्थामा हर्न (Horn) बजाउनु हुँदैन?",
    options: ["अस्पताल र विद्यालय नजिक", "बाक्लो कुहिरो लागेको बेला", "घुम्ती र मोडमा", "खतराको सम्भावना हुँदा"],
    correctIndex: 0,
  },
  {
    id: 6,
    question: "मोटरसाइकल वा स्कुटर चलाउँदा कुन सुरक्षा सामग्री अनिवार्य छ?",
    options: ["ज्याकेट", "पञ्जा (Gloves)", "हेल्मेट (Helmet)", "चस्मा"],
    correctIndex: 2,
  },
  {
    id: 7,
    question: "'U' टर्न (U-turn) कस्तो ठाउँमा गर्न निषेध छ?",
    options: ["घुम्तीमा", "उकालोमा", "पुलमा", "माथिका सबै"],
    correctIndex: 3,
  },
  {
    id: 8,
    question: "कस्तो गाडीलाई बाटो छोड्नु पर्छ?",
    options: ["एम्बुलेन्स (Ambulance)", "दमकल (Fire Engine)", "प्रहरीको गाडी", "माथिका सबै"],
    correctIndex: 3,
  },
  {
    id: 9,
    question: "सवारी चालक अनुमतिपत्र लिन कति वर्ष उमेर पुगेको हुनुपर्छ? (मोटरसाइकल/स्कुटरको लागि)",
    options: ["१६ वर्ष", "१८ वर्ष", "२१ वर्ष", "२५ वर्ष"],
    correctIndex: 0,
  },
  {
    id: 10,
    question: "रातीको समयमा गाडी चलाउँदा अर्को गाडी अगाडिबाट आउँदैछ भने कस्तो लाइट बाल्नुपर्छ?",
    options: ["हाई बीम (High Beam)", "लो बीम (Low Beam)", "पार्किङ लाइट", "फग लाइट"],
    correctIndex: 1,
  },
  {
    id: 11,
    question: "सडकको बीचमा कोरिएको सेतो खण्डित (टुक्रिएको) रेखाले के जनाउँछ?",
    options: ["बाटो काट्न पाइँदैन", "ओभरटेक गर्न मिल्छ (सुरक्षित भएमा)", "पार्किङ गर्न मिल्छ", "सवारी रोक्न मिल्छ"],
    correctIndex: 1,
  },
  {
    id: 12,
    question: "मादक पदार्थ सेवन (MAPASE) गरी सवारी चलाएमा के कारवाही हुन्छ?",
    options: ["जरिवाना मात्र हुन्छ", "लाइसेन्स प्वाल पारिन्छ र जरिवाना हुन्छ", "केही हुँदैन", "सम्झाई बुझाई छोडिन्छ"],
    correctIndex: 1,
  },
  {
    id: 13,
    question: "बाक्लो कुहिरो (Fog) लागेको बेला गाडी चलाउँदा के गर्नुपर्छ?",
    options: ["हेडलाइट बाल्ने", "फग लाइट (Fog light) बाल्ने", "हर्न बजाउँदै विस्तारै चलाउने", "माथिका सबै"],
    correctIndex: 3,
  },
  {
    id: 14,
    question: "सवारी साधनको ब्लुबुक (Bluebook) नवीकरण कति समयमा गर्नुपर्छ?",
    options: ["हरेक ६ महिनामा", "हरेक १ वर्षमा", "हरेक ५ वर्षमा", "हरेक १० वर्षमा"],
    correctIndex: 1,
  },
  {
    id: 15,
    question: "पहेंलो ट्राफिक बत्ती (Yellow Light) बलेको बेला के गर्नुपर्छ?",
    options: ["गाडी रोक्न तयारी गर्ने", "गाडीको स्पिड बढाउने", "गाडी रोक्ने", "अगाडि बढ्ने"],
    correctIndex: 0,
  },
  {
    id: 16,
    question: "सवारी साधनको गति (Speed) कस्तो अवस्थामा कम गर्नुपर्छ?",
    options: ["विद्यालय नजिक", "बाक्लो कुहिरो लागेको बेला", "ओरालोमा", "माथिका सबै"],
    correctIndex: 3,
  },
  {
    id: 17,
    question: "राजमार्ग (Highway) मा कताबाट ओभरटेक गर्नुपर्छ?",
    options: ["बायाँबाट", "दायाँबाट", "जताबाट सजिलो हुन्छ", "ओभरटेक गर्न निषेध छ"],
    correctIndex: 1,
  },
  {
    id: 18,
    question: "चालकले सवारी चलाउँदा के कुरामा ध्यान दिनुपर्छ?",
    options: ["सडकको अवस्था", "आफ्नो अगाडिको गाडीको गति", "सवारी नियम", "माथिका सबै"],
    correctIndex: 3,
  },
  {
    id: 19,
    question: "२ पांग्रे सवारी साधनमा कति जनासम्म बस्न पाइन्छ?",
    options: ["१ जना", "२ जना", "३ जना", "सजिलो तरिकाले जति पनि"],
    correctIndex: 1,
  },
  {
    id: 20,
    question: "भिडभाड भएको सडकमा गाडी चलाउँदा कुन गियर प्रयोग गर्नु उपयुक्त हुन्छ?",
    options: ["एक वा दुई गियर", "तीन गियर", "चार गियर", "कुनै पनि होइन"],
    correctIndex: 0,
  },
  {
    id: 21,
    question: "गोलो घुम्ती (Roundabout) मा गाडी चलाउँदा कसलाई पहिलो प्राथमिकता दिनुपर्छ?",
    options: ["बायाँबाट आउने गाडीलाई", "दायाँबाट आउने गाडीलाई", "आफ्नो अगाडिको गाडीलाई", "जो पहिला पुग्छ"],
    correctIndex: 1,
  },
  {
    id: 22,
    question: "सडक पार गर्दा पैदल यात्रीले कुन कुरामा ध्यान दिनुपर्छ?",
    options: ["जेब्रा क्रसिङ्को प्रयोग", "दायाँ र बायाँ हेर्ने", "सडक बत्तीको पालना", "माथिका सबै"],
    correctIndex: 3,
  },
  {
    id: 23,
    question: "आकस्मिक सवारी साधन (Emergency Vehicles) हरूलाई सडकमा कस्तो प्राथमिकता दिनुपर्छ?",
    options: ["पहिलो", "दोस्रो", "तेस्रो", "कुनै होइन"],
    correctIndex: 0,
  },
  {
    id: 24,
    question: "रातको समयमा पार्किङ गर्दा कुन बत्ती बाल्नुपर्छ?",
    options: ["हेड लाइट", "पार्किङ लाइट", "फग लाइट", "कुनै पनि होइन"],
    correctIndex: 1,
  },
  {
    id: 25,
    question: "सवारी साधन रोक्न कुन संकेत प्रयोग गरिन्छ?",
    options: ["हातको संकेत", "ब्रेक लाइट", "दुवै (क र ख)", "माथिका कुनै पनि होइन"],
    correctIndex: 2,
  },
  {
    id: 26,
    question: "लाइसेन्स नवीकरण म्याद सकिएको कति समय भित्र गर्नुपर्छ?",
    options: ["३ महिना भित्र", "६ महिना भित्र", "१ वर्ष भित्र", "५ वर्ष भित्र"],
    correctIndex: 0,
  },
  {
    id: 27,
    question: "ओरालो बाटोमा गाडी चलाउँदा कुन कुरामा ध्यान दिनुपर्छ?",
    options: ["ब्रेकको प्रयोग", "गियरको प्रयोग", "दुवै (क र ख)", "क्लचको मात्र प्रयोग"],
    correctIndex: 2,
  },
  {
    id: 28,
    question: "सडकमा लेन (Lane) परिवर्तन गर्दा कुन संकेत दिनुपर्छ?",
    options: ["हर्न बजाउने", "साइड लाइट बाल्ने", "हेड लाइट बाल्ने", "कुनै संकेत दिनुपर्दैन"],
    correctIndex: 1,
  },
  {
    id: 29,
    question: "कुन गाडीलाई बढी सुरक्षित मानिन्छ?",
    options: ["२ पांग्रे", "३ पांग्रे", "४ पांग्रे", "कुनै पनि होइन"],
    correctIndex: 2,
  },
  {
    id: 30,
    question: "सवारीसाधन चलाउँदा मोबाइल फोनको प्रयोगले के हुन्छ?",
    options: ["सजिलो हुन्छ", "दुर्घटना निम्त्याउँछ", "समय बच्छ", "केही हुँदैन"],
    correctIndex: 1,
  }
];

const getRandomQuestions = (count: number) => {
  const shuffled = [...allExamQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function WrittenExam() {
  const [examQuestions, setExamQuestions] = useState<Question[]>(() => getRandomQuestions(15));
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [examFinished, setExamFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = examQuestions[currentQuestionIdx];
  const isLastQuestion = currentQuestionIdx === examQuestions.length - 1;
  const hasAnsweredCurrent = selectedAnswers[currentQuestionIdx] !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (showResults) return; // Disallow changes if showing results immediately
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optionIndex
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setExamFinished(true);
      setShowResults(true);
    } else {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const restartExam = () => {
    setExamQuestions(getRandomQuestions(15));
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setExamFinished(false);
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    examQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  if (examFinished && showResults) {
    const score = calculateScore();
    const passScore = Math.ceil(examQuestions.length * 0.5); // Minimum 50% to pass
    const isPass = score >= passScore;

    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4 shadow-inner">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
              style={{ backgroundColor: isPass ? '#dcfce7' : '#fee2e2' }}
            >
              {isPass ? (
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              ) : (
                <XCircle className="w-12 h-12 text-red-600" />
              )}
            </motion.div>
            
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {isPass ? 'Congratulations! You Passed.' : 'Exam Failed. Try Again.'}
            </h2>
            <p className="text-slate-500 mb-8 text-lg">
              You scored <span className="font-bold text-slate-900">{score}</span> out of <span className="font-bold text-slate-900">{examQuestions.length}</span>
            </p>

            <button
              onClick={restartExam}
              className="bg-brand-accent text-white font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <RotateCcw size={18} /> Retake Exam
            </button>
            <a href="#home" className="inline-block mt-6 text-brand-primary font-bold hover:underline">
              Back to Home
            </a>
          </div>

          <div className="mt-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 border-b pb-4">Detailed Review</h3>
            <div className="space-y-8">
              {examQuestions.map((q, qIdx) => {
                const userAns = selectedAnswers[qIdx];
                const isCorrect = userAns === q.correctIndex;
                
                return (
                  <div key={q.id} className="relative">
                    <div className="flex gap-4">
                      <div className="shrink-0 mt-1">
                        {isCorrect ? (
                          <CheckCircle2 className="text-green-500 w-6 h-6" />
                        ) : (
                          <XCircle className="text-red-500 w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-lg text-slate-900 mb-3">{q.id}. {q.question}</p>
                        <div className="grid gap-2">
                          {q.options.map((opt, optIdx) => {
                            let optionClass = "border border-slate-200 bg-slate-50 text-slate-600";
                            if (optIdx === q.correctIndex) {
                              optionClass = "border-green-500 bg-green-50 text-green-700 font-medium";
                            } else if (optIdx === userAns && !isCorrect) {
                              optionClass = "border-red-500 bg-red-50 text-red-700";
                            }

                            return (
                              <div key={optIdx} className={`p-3 rounded-lg ${optionClass} transition-colors flex justify-between`}>
                                <span>{opt}</span>
                                {optIdx === q.correctIndex && <CheckCircle2 size={18} className="text-green-600" />}
                                {optIdx === userAns && !isCorrect && <XCircle size={18} className="text-red-600" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 shadow-inner">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <a href="#home" className="inline-flex items-center text-brand-accent font-bold hover:underline mb-4">
              <ChevronLeft size={20} className="mr-1" /> Back to Home
            </a>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <FileText className="text-brand-accent" />
              Written Exam Practice (Nepal)
            </h1>
            <p className="text-slate-500 mt-2">Test your knowledge for the real DOTM written exam.</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Question</p>
            <p className="text-2xl font-black text-brand-accent">{currentQuestionIdx + 1} <span className="text-slate-400 text-lg">/ {examQuestions.length}</span></p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-brand-accent h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIdx + 1) / examQuestions.length) * 100}%` }}
          />
        </div>

        <motion.div 
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
            {currentQuestion.id}. {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswers[currentQuestionIdx] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    isSelected 
                      ? 'border-brand-accent bg-brand-accent/5 text-brand-accent font-medium' 
                      : 'border-slate-100 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-brand-accent' : 'border-slate-300'
                  }`}>
                    {isSelected && <div className="w-3 h-3 bg-brand-accent rounded-full" />}
                  </div>
                  <span className="text-lg">{option}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className={`flex items-center gap-2 font-bold py-3 px-6 rounded-xl transition-all ${
                currentQuestionIdx === 0 
                  ? 'text-slate-300 cursor-not-allowed' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ChevronLeft size={20} /> Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!hasAnsweredCurrent}
              className={`flex items-center gap-2 font-bold py-3 px-8 rounded-xl shadow-md transition-all ${
                !hasAnsweredCurrent
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-brand-accent text-white hover:bg-brand-accent/90 hover:scale-105'
              }`}
            >
              {isLastQuestion ? 'Finish Exam' : 'Next'} {isLastQuestion ? <CheckCircle2 size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
