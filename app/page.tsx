"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import gif1 from '@/public/gif1.gif';
import gif2 from '@/public/gif2.gif';
import { motion } from 'framer-motion';

const CustomAlert = ({ message }: { message: string; }) => (
  <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
    <p className="text-lg text-center">{message}</p>
  </div>
);

const FallingHeart = () => {
  const randomX = Math.random() * 100;
  const randomTilt = Math.random() * 30 - 15; 
  const randomDuration = Math.random() * 2 + 3; 

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${randomX}vw`,
        top: "-10vh",
        rotate: randomTilt,
      }}
      animate={{
        translateY: "110vh", 
        opacity: 0,
      }}
      transition={{
        duration: randomDuration, 
        ease: "easeIn",
      }}
    >
      <span className="text-red-500 text-[2rem]">❤️</span>
    </motion.div>
  );
};

export default function Home() {
  const [showPoems, setShowPoems] = useState<boolean>(false);
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [isYesHovered, setIsYesHovered] = useState<boolean>(false);
  const [isNoHovered, setIsNoHovered] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isNoClicked, setIsNoClicked] = useState<boolean>(false);
  const [isYesClicked, setIsYesClicked] = useState<boolean>(false); 
  const [questionText, setQuestionText] = useState<string>("Will you be my girlfriend? 💖");
  const [gif, setGif] = useState(gif1);
  const [fallingHeartsVisible, setFallingHeartsVisible] = useState<boolean>(false);  
  const poems = [
    "Yieeee, kinikilig na yannn 😝",
    "Don't worry, caring and loyal naman yung napili mo 😊",
    "WAHHHHHHH, kami na ni crushhhh! ❤️",
    "I wuv you pooooo 💕",
  ];

  const noButtonMessages = [
    "Di pwede, pindutin mo na yung 'yes' please 🥺",
    "Iiyak ako, sige ka 🥹",
    "Bagay naman tayo eee, kaya yung 'yes' na pindutin moooo 😞",
    "Paliligayahin naman kita, so please ako nalang 😖"
  ];

  const handleYesClick = () => {
    setIsYesClicked(true);
    setFallingHeartsVisible(true);
    setShowPoems(true);
    const shuffledAffirmations = [...poems].sort(() => Math.random() - 0.5);
    setAffirmations(shuffledAffirmations);
  };

  const handleNoHover = () => {
    const randomMessage = noButtonMessages[Math.floor(Math.random() * noButtonMessages.length)];
    setAlertMessage(randomMessage);
  };

  const handleNoClick = () => {
    setIsNoClicked(true);
    setIsModalVisible(true);
    setQuestionText("No choice ka boss, ako talaga magiging bf mo");
    setGif(gif2);

    setTimeout(() => {
      setIsModalVisible(false);
    }, 5000);
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    const spawnHearts = setInterval(() => {
      if (fallingHeartsVisible) {
        const heartContainer = document.getElementById('heart-container');
        if (heartContainer) {
          heartContainer.appendChild(document.createElement('div')).innerHTML = '<FallingHeart />';
        }
      }
    }, 300);

    return () => clearInterval(spawnHearts);
  }, [fallingHeartsVisible]);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className={`min-h-screen bg-gradient-to-r from-pink-300 to-purple-300 flex flex-col items-center justify-center relative`}>
      <div id="heart-container" className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {fallingHeartsVisible && Array.from({ length: 30 }).map((_, index) => (
          <FallingHeart key={index} />
        ))}
      </div>

      {!showPoems && (
        <div className="relative w-80 h-80 mb-8 z-10">
          <Image
            src={gif}
            alt="romantic_gif"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center">
        {!showPoems ? (
          <>
            <motion.div
              className="text-center p-10"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
            >
              <h1 className="text-4xl font-bold text-red-600 mb-4">
                {questionText}
              </h1>
            </motion.div>
            <div className="flex space-x-4 mt-4 relative">
              <button
                onMouseEnter={() => setIsYesHovered(true)}
                onMouseLeave={() => setIsYesHovered(false)}
                onClick={handleYesClick}
                className="px-6 py-3 bg-red-500 text-white rounded-lg text-lg hover:bg-red-600 transition duration-300"
              >
                Yes 💕
              </button>
              {!isNoClicked && (
                <button
                  onMouseEnter={() => {
                    setIsNoHovered(true);
                    handleNoHover();
                  }}
                  onMouseLeave={() => setIsNoHovered(false)}
                  onClick={handleNoClick}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg text-lg hover:bg-gray-600 transition duration-300"
                >
                  No ❌
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="text-5xl font-bold text-red-600 mb-2">
                I am officially your boyfriend!
              </h1>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                As for the agreement, please say to that beloved man, &quot;<span className="text-pink-700">I am officially your girlfriend too</span>&quot;.
              </h2>
              <p className="text-lg font-bold text-gray-600">{currentDate}</p>
            </div>
            {affirmations.map((poem, index) => (
              <motion.div
                key={index}
                className={`text-red-500 text-xl text-center absolute ${["top-48 left-10", "top-48 right-10", "bottom-48 left-10", "bottom-48 right-10"][index % 4]} w-80 p-10`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              >
                {poem}
              </motion.div>
            ))}
          </>
        )}
      </div>

      {/* Yes Emoji Peeking from the right side, only when Yes is hovered */}
      {isYesHovered && !isYesClicked && (
        <motion.div
          className="fixed right-0 top-10 bottom-0 transform translate-x-full z-50"
          initial={{ x: '100%' }}
          animate={{ x: '0%' }}  // Make the emoji fully visible on hover
          exit={{ x: '100%' }}    // Hide it when not hovered
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <span className="text-[25rem] leading-none">😄</span>
        </motion.div>
      )}

      {/* No Emoji Peeking from the left side, only when No is hovered */}
      {isNoHovered && !isNoClicked && (
        <motion.div
          className="fixed left-0 top-10 bottom-0 transform -translate-x-full z-50"
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}  // Make the emoji fully visible on hover
          exit={{ x: '-100%' }}   // Hide it when not hovered
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <span className="text-[25rem] leading-none">😢</span>
        </motion.div>
      )}

      {/* Alert message */}
      {alertMessage && <CustomAlert message={alertMessage} />}

      {/* Modal for No Button Click */}
      {isModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg">{questionText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
