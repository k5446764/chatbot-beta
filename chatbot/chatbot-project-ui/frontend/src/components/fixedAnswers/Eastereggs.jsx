import React, { useState, useEffect } from 'react';

// === 스타일링 및 애니메이션 라이브러리 ===
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';

// === UI 컴포넌트 라이브러리 ===
import { Card } from 'antd';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// === 아이콘 라이브러리 ===
import { IoSparkles } from "react-icons/io5";

// === 제스처 라이브러리 ===
import { useSwipeable } from 'react-swipeable';

// === 이미지 import ===
import eastereggImage from '../../assets/easteregg.png';

// 3D 효과를 위한 설정
const calc = (x, y, rect) => [-(y - rect.top - rect.height / 2) / 20, (x - rect.left - rect.width / 2) / 20, 1.05];
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

// --- ▼ 폭죽 애니메이션 관련 컴포넌트 ---

// 개별 폭죽 입자(Particle) 컴포넌트
const Particle = ({ color, endX, endY }) => {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 6,
        height: 6,
        backgroundColor: color,
      }}
      initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      animate={{ x: endX, y: endY, scale: 0, opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
};

// 폭죽 전체를 관리하는 컴포넌트
const Fireworks = () => {
  // ▼ [수정] 이제 particles는 개별 입자가 아닌, '폭죽 묶음(burst)'을 관리합니다.
  const [bursts, setBursts] = useState([]);

  const createBurst = () => {
    const newParticles = [];
    const colors = ['#FFC700', '#FF6B9A', '#7481FE', '#62FFDA', '#f87171'];
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * 360;
      const radius = Math.random() * 100 + 50;
      const endX = radius * Math.cos(angle * Math.PI / 180);
      const endY = radius * Math.sin(angle * Math.PI / 180);
      newParticles.push({
        id: `${Date.now()}-${i}`,
        color: colors[Math.floor(Math.random() * colors.length)],
        endX,
        endY,
      });
    }
    
    // 화면의 무작위 위치에 폭죽 묶음을 추가합니다.
    const newBurst = {
      id: Date.now(),
      x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
      y: Math.random() * 400,
      children: newParticles
    };
    setBursts(prev => [...prev, newBurst]);
  };

  // ▼ [수정] 컴포넌트가 마운트될 때, setInterval을 사용하여 계속 폭죽을 터트립니다.
  useEffect(() => {
    const interval = setInterval(createBurst, 1500);
    // 컴포넌트가 사라질 때 interval을 정리합니다.
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* ▼ [수정] 각 폭죽 묶음을 렌더링하고, 애니메이션이 끝나면 스스로를 제거합니다. */}
      <AnimatePresence>
        {bursts.map(burst => (
          <motion.div
            key={burst.id}
            className="absolute"
            style={{ x: burst.x, y: burst.y }}
            onAnimationComplete={() => {
              setBursts(prev => prev.filter(b => b.id !== burst.id));
            }}
          >
            {burst.children.map(p => <Particle key={p.id} {...p} />)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// --- 폭죽 애니메이션 컴포넌트 끝 ---


const Eastereggs = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));
  const cardRef = React.useRef(null);
  
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => setIsVisible(false),
    onSwipedDown: () => setIsVisible(false),
    preventScrollOnSwipe: true,
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="relative flex justify-center items-center p-4 my-4 rounded-3xl bg-gradient-to-br from-[#1a113c] to-[#0b072e]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
          {...swipeHandlers}
        >
          <Fireworks />
          
          <animated.div
            ref={cardRef}
            onMouseMove={({ clientX: x, clientY: y }) => {
                if(!cardRef.current) return;
                const rect = cardRef.current.getBoundingClientRect();
                set({ xys: calc(x, y, rect) });
            }}
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{ transform: props.xys.to(trans), zIndex: 10 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
            >
              <Card
                className="bg-white/10 backdrop-blur-md border-white/20"
                style={{ width: 320 }}
              >
                <div className="relative flex justify-center items-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                  >
                    <img
                      src={eastereggImage}
                      alt="이스터에그 이미지"
                      className="max-w-xs rounded-lg shadow-lg z-10"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="mt-4"
                >
                  <Alert severity="success" variant="filled">
                    <AlertTitle>Success</AlertTitle>
                    <strong>이스터에그</strong>를 발견하셨습니다!
                  </Alert>
                </motion.div>
              </Card>
            </motion.div>
          </animated.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Eastereggs;