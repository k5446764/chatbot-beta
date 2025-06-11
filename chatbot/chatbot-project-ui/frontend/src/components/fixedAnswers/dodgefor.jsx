import React, { useState, useEffect, useCallback, useRef } from 'react';

// === 스타일링 및 애니메이션 라이브러리 ===
import styled from 'styled-components';
// ▼ [드래그 수정] 1. useMotionValue와 useMotionValueEvent import
import { motion, AnimatePresence, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import { useSwipeable } from 'react-swipeable';

// === UI 컴포넌트 라이브러리 ===
import { Card, Statistic } from 'antd';
import Button from '@mui/material/Button';

// === 아이콘 라이브러리 ===
import { IoRocketSharp } from 'react-icons/io5';
import { FaMeteor, FaStar } from 'react-icons/fa';
import { MdRestartAlt } from 'react-icons/md';

// === 데이터 시각화 라이브러리 ===
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const GameContainer = styled.div`
  position: relative;
  width: 95%;
  max-width: 500px;
  height: 600px;
  margin: 20px auto;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(160deg, #0b072e 0%, #2a206a 100%);
  box-shadow: 0 10px 30px rgba(42, 32, 106, 0.5);
  cursor: grab;
`;

const DodgeGame = () => {
  const gameWidth = 500;
  const gameHeight = 600;
  const playerSize = 40;

  // ▼ [드래그 수정] 2. playerPos에서 x를 분리하여 y만 관리
  const [playerPos, setPlayerPos] = useState({ y: gameHeight - 60 });
  const [enemies, setEnemies] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [spawnAmount, setSpawnAmount] = useState(1);
  const [items, setItems] = useState([]);
  const [isPoweredUp, setIsPoweredUp] = useState(false);
  
  // ▼ [드래그 수정] 3. x좌표를 위한 motionValue 생성. 렌더링과 독립적으로 위치를 관리.
  const playerX = useMotionValue(gameWidth / 2 - playerSize / 2);

  const requestRef = useRef();
  const powerUpTimerRef = useRef(null);
  const animatedScore = useSpring({ val: score, from: { val: 0 }, config: { tension: 200, friction: 80 } });
  const constraintsRef = useRef(null);

  const restartGame = () => {
    // ▼ [드래그 수정] 4. playerX 값을 초기 위치로 리셋
    playerX.set(gameWidth / 2 - playerSize / 2);
    setPlayerPos({ y: gameHeight - 60 });
    setEnemies([]);
    setScore(0);
    setIsGameOver(false);
    setSpawnAmount(1);
    setItems([]);
    setIsPoweredUp(false);
    clearTimeout(powerUpTimerRef.current);
  };

  const gameLoop = useCallback(() => {
    if (isGameOver) return;
    setScore(prev => prev + 1);
    
    if (score > 0 && score % 1800 === 0) {
      setSpawnAmount(prevAmount => prevAmount + 1);
    }

    if (score > 0 && score % 1000 === 0 && items.length === 0) {
      setItems([{
        id: Date.now(),
        x: Math.random() * (gameWidth - 30),
        y: -30
      }]);
    }
    setItems(prev => prev.map(item => ({ ...item, y: item.y + 2.5 })).filter(item => item.y < gameHeight));
    
    setEnemies(prevEnemies => {
      const newEnemies = [...prevEnemies];
      const spawnRate = Math.max(20, 80 - Math.floor(score / 100));
      const speed = 5 + Math.floor(score / 200);

      if (score > 0 && score % spawnRate === 0) {
        for (let i = 0; i < spawnAmount; i++) {
          newEnemies.push({
            id: Date.now() + i,
            x: Math.random() * (gameWidth - 30),
            y: -30 - (i * 40),
          });
        }
      }

      return newEnemies
        .map(enemy => ({ ...enemy, y: enemy.y + speed }))
        .filter(enemy => enemy.y < gameHeight);
    });
    requestRef.current = requestAnimationFrame(gameLoop);
  }, [isGameOver, score, gameHeight, spawnAmount, items.length]);

  // ▼ [드래그 수정] 5. 키보드/스와이프 조작이 state 대신 playerX motionValue를 직접 업데이트하도록 변경
  const movePlayer = (direction) => {
    if (isGameOver) return;
    const currentX = playerX.get();
    let newX = currentX + (direction === 'left' ? -30 : 30);
    newX = Math.max(0, Math.min(newX, gameWidth - playerSize));
    playerX.set(newX);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') movePlayer('left');
      if (e.key === 'ArrowRight') movePlayer('right');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => movePlayer('left'),
    onSwipedRight: () => movePlayer('right'),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // ▼ [드래그 수정] 6. 충돌 감지를 위해 motionValue의 변경을 감지하고 playerX_reactive 상태를 업데이트
  const [playerX_reactive, setPlayerX_reactive] = useState(playerX.get());
  useMotionValueEvent(playerX, "change", (latest) => {
    setPlayerX_reactive(latest);
  });
  
  // 충돌 감지 로직
  useEffect(() => {
    const playerRect = { x: playerX_reactive, y: playerPos.y, width: playerSize, height: playerSize };

    for (const item of items) {
      const itemRect = { x: item.x, y: item.y, width: 30, height: 30 };
      if (
        playerRect.x < itemRect.x + itemRect.width &&
        playerRect.x + playerRect.width > itemRect.x &&
        playerRect.y < itemRect.y + itemRect.height &&
        playerRect.y + playerRect.height > itemRect.y
      ) {
        setItems(prev => prev.filter(i => i.id !== item.id));
        setIsPoweredUp(true);

        clearTimeout(powerUpTimerRef.current);
        powerUpTimerRef.current = setTimeout(() => {
          setIsPoweredUp(false);
        }, 5000);
      }
    }

    for (const enemy of enemies) {
      const enemyRect = { x: enemy.x, y: enemy.y, width: 30, height: 30 };
      if (
        playerRect.x < enemyRect.x + enemyRect.width &&
        playerRect.x + playerRect.width > enemyRect.x &&
        playerRect.y < enemyRect.y + enemyRect.height &&
        playerRect.y + playerRect.height > enemyRect.y
      ) {
        if (isPoweredUp) {
          setEnemies(prev => prev.filter(e => e.id !== enemy.id));
          setScore(prev => prev + 100);
        } else {
          setIsGameOver(true);
          clearTimeout(powerUpTimerRef.current);
          break;
        }
      }
    }
  }, [playerX_reactive, playerPos.y, items, enemies, isPoweredUp]);

  useEffect(() => {
    if (!isGameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      cancelAnimationFrame(requestRef.current);
      clearTimeout(powerUpTimerRef.current);
    }
  }, [isGameOver, gameLoop]);

  return (
    <GameContainer ref={constraintsRef} {...swipeHandlers}>
      <div className="absolute top-4 left-4 z-10">
        <Statistic 
          title={<span className="text-white/70">SCORE</span>}
          valueRender={() => 
            <animated.div className="text-3xl font-bold text-white">
              {animatedScore.val.to(v => Math.floor(v))}
            </animated.div>
          } 
        />
      </div>

      {/* ▼ [드래그 수정] 7. animate prop을 제거하고, style prop에 motionValue를 직접 연결 */}
      <motion.div
        className="absolute"
        style={{ 
          y: playerPos.y, 
          width: playerSize, 
          height: playerSize,
          x: playerX, // motionValue를 직접 스타일에 적용
        }}
        // ▼ [파워업 효과 수정] 
        animate={{
          scale: isPoweredUp ? [1.2, 1.3, 1.2] : 1, // 파워업 시 두근거리는 효과
        }}
        transition={{
          scale: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        drag="x"
        dragConstraints={{ left: 0, right: gameWidth - playerSize }}
        dragElastic={0.1}
        dragMomentum={false}
      >
        <IoRocketSharp 
          className={`w-full h-full transition-colors duration-300 ${
            isPoweredUp 
              ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]' // 더 밝은 노란색과 강한 그림자
              : 'text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]'
          }`}
        />
      </motion.div>

      <AnimatePresence>
        {items.map(item => (
          <motion.div
            key={item.id}
            className="absolute z-10"
            initial={{ y: -30, opacity: 0 }}
            animate={{
              y: item.y, x: item.x, opacity: 1, scale: [1, 1.2, 1], rotate: [0, 10, -10, 0],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaStar className="w-[30px] h-[30px] text-yellow-400" />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {enemies.map(enemy => (
          <motion.div
            key={enemy.id} className="absolute"
            initial={{ y: -30, opacity: 0, scale: 0.5 }}
            animate={{ y: enemy.y, x: enemy.x, opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaMeteor className="w-[30px] h-[30px] text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)] transform -rotate-45" />
          </motion.div>
        ))}
      </AnimatePresence>
      
      <AnimatePresence>
        {isGameOver && (
          <motion.div
            className="absolute inset-0 w-full h-full flex items-center justify-center z-20 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div initial={{ scale: 0.5, y: 50 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', delay: 0.2 }}>
              <Card className="text-center bg-white/10 border-white/20 text-white">
                <h2 className="text-4xl font-black mb-4 tracking-wider">GAME OVER</h2>
                
                <div style={{ width: '100%', height: 120 }}>
                  <ResponsiveContainer>
                    <RadialBarChart innerRadius="80%" outerRadius="100%" data={[{ value: score }]} startAngle={180} endAngle={-180}>
                      <RadialBar minAngle={15} background clockWise={true} dataKey='value' fill="url(#gradient)"/>
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8884d8" />
                          <stop offset="100%" stopColor="#82ca9d" />
                        </linearGradient>
                      </defs>
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <Statistic title={<span className="text-white/70">FINAL SCORE</span>} value={score}
                  valueStyle={{ color: 'white', fontSize: '3rem', fontWeight: 'bold' }}
                />

                <Button variant="contained" color="primary" size="large" onClick={restartGame} startIcon={<MdRestartAlt />}
                  className="mt-6" sx={{ borderRadius: '999px', padding: '10px 24px', fontWeight: 'bold' }}
                >
                  Restart
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </GameContainer>
  );
};

export default DodgeGame;