##미니콘다로 가상환경 3개를 이용함 conda create -n react python=3.12.8 로 react폴더를 만든후 파이썬 버전을 설치함 
conda env list 로 가상환경 만든 리스트 볼수있고 그렇게 conda activate react로 가상환경 접속한후 패키지 설치##

node -v 해서 버전 확인 
nodejs 버전 22.15 사용해야함.
// 패키지 설치 conda create -n react python=3.12.8 다음  json 설치 npm ERR! enoent Could not read package.json
npm ERR! enoent ENOENT: no such file or directory, open 'C:\Users\user\package.json' 다음 npm install 다음 npm start 끝 ##


// 가상환경별 요구 파이썬 버전
conda create -n react python=3.12.8
conda create -n backend python=3.8
conda create -n rasa python=3.10.10
//



설치 패키지

기본 npm install 

1 npm install -D tailwindcss postcss autoprefixer

2 npm install react-router-dom recharts

3 npm install react-icons @heroicons/react

4 npm install framer-motion

5 npm install @mui/material @emotion/react @emotion/styled //Material Design 컴포넌트 사용시

6 npm install antd  //컴포넌트 제공

7 npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion //스타일링이 쉬운 컴포넌트 제공

8 npm install react-spring //물리학 기반 애니메이션 사용

9 npm install styled-components CSS-in-JS //방식으로 컴포넌트 레벨에서 스타일 가능하게 함

10 npm install react-transition-group

11 npm install react-swipeable //스와이프 제스처 기능 패키지

12 npm install styled-components

13 npm install react-icons
 
14 npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
 



1. 
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

2.
chmod +x ./start_react.sh
./start_react.sh

