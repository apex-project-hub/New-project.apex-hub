import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ApexQuiz({ onComplete }: { onComplete: (result: { score: number, package: any }) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const questions = [
    { q: "ما هو أفضل لغة لتطوير واجهات الويب؟", options: ["Python", "JavaScript", "C++", "Java"], answer: 1 },
    { q: "ما هو إطار العمل المستخدم في هذا التطبيق؟", options: ["Angular", "Vue", "React", "Svelte"], answer: 2 },
    { q: "ما هي أداة التصميم المستخدمة للـ CSS هنا؟", options: ["Bootstrap", "Tailwind", "Sass", "Less"], answer: 1 },
    { q: "ماذا تعني اختصار API؟", options: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Interface", "All Purpose Integration"], answer: 0 },
    { q: "أي من التالي ليس قاعدة بيانات؟", options: ["MongoDB", "PostgreSQL", "React", "MySQL"], answer: 2 },
    { q: "ما هو الغرض من استخدام Git؟", options: ["تصميم الصور", "إدارة قواعد البيانات", "التحكم في الإصدارات", "تشغيل الخوادم"], answer: 2 },
    { q: "ما هي لغة البرمجة الأساسية لتطبيقات iOS؟", options: ["Swift", "Kotlin", "Java", "C#"], answer: 0 },
    { q: "ما هو الـ DOM في الويب؟", options: ["Data Object Model", "Document Object Model", "Design Oriented Module", "Digital Output Method"], answer: 1 },
  ];

  const handleAnswer = (index: number) => {
    const isCorrect = index === questions[currentQuestion].answer;
    if (isCorrect) setScore(score + 1);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
      onComplete({ score: isCorrect ? score + 1 : score, package: { id: 'premium' } });
    }
  };

  if (isFinished) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 text-center backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-white mb-2">انتهى الاختبار!</h3>
        <p className="text-gray-400 mb-6">نتيجتك: {score} من {questions.length}</p>
        {score >= 6 ? (
          <div className="text-green-400 font-bold bg-green-400/10 p-4 rounded-xl border border-green-400/20">
            أداء ممتاز! لقد ربحت باكدج مجانية.
          </div>
        ) : (
          <div className="text-yellow-400 font-bold bg-yellow-400/10 p-4 rounded-xl border border-yellow-400/20">
            حاول مرة أخرى للحصول على الباكدج المجانية!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
      <div className="mb-6 flex justify-between items-center text-sm text-gray-400">
        <span>السؤال {currentQuestion + 1} من {questions.length}</span>
        <span>النتيجة: {score}</span>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-6 leading-relaxed">
        {questions[currentQuestion].q}
      </h3>

      <div className="space-y-3">
        {questions[currentQuestion].options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full text-right p-4 rounded-xl bg-gray-800/50 hover:bg-cyan-500/10 hover:border-cyan-500/50 border border-gray-700 transition-all text-gray-200"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
