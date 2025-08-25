'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export const AnimationHeadLine = () => {
  const t = useTranslations('AnimationHeadLine');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  // コンテナのアニメーション定義 - Apple風のスムーズなスタッガー
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // メインテキストのアニメーション - 滑らかなフェードアップ
  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.23, 1, 0.32, 1], // カスタムイージングでスムーズに
      },
    },
  };

  // 数字部分の強調アニメーション
  const numberVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  // ハイライトアニメーション - スライドイン効果
  const highlightVariants: Variants = {
    hidden: { 
      width: 0,
      opacity: 0.5,
    },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.9,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  // サブテキストのアニメーション
  const subtitleVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 1,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  // テキストを分割
  const lines = [
    { text: t('lines.0'), hasNumber: true },
    { text: t('lines.1'), hasNumber: true, hasHighlight: true }
  ];

  return (
    <div className="py-20">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          ref={ref}
          className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-950 mb-10 tracking-tight"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {lines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                className="inline-block"
                variants={lineVariants}
              >
                {line.text.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={line.hasNumber && /[0-9]/.test(char) ? numberVariants : {}}
                    custom={index}
                  >
                    {char}
                  </motion.span>
                ))}
                {line.hasHighlight && (
                  <motion.span
                    className="block h-1 bg-gradient-to-r from-indigo-700 to-purple-500 mt-2"
                    variants={highlightVariants}
                  />
                )}
              </motion.div>
            </div>
          ))}
        </motion.h1>
        
        <motion.div
          className=" text-neutral-600 max-w-3xl leading-relaxed"
          variants={subtitleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <p className="mb-4">
            {t.rich('subtitle.p1', {
              strong: (chunks) => (
                <strong className="font-semibold text-neutral-900">{chunks}</strong>
              )
            })}
          </p>
          <p>
            {t('subtitle.p2')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
