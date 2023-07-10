///// 8.1 - Header part 1

// router 부터 시작하자!
// react-router-dom을 이용해서.

// Router, Routes, Route 이용 후
// 컴포넌트 만들고
// Header 추가

// Header 컴포넌트 안에는 Nav 바 추가

/// App.tsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

/// Header.tsx

import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;

function Header() {
  return (
    <Nav>
      <Col>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Items>
          <Item>Home</Item>
          <Item>Tv Shows</Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Search>
      </Col>
    </Nav>
  );
}

/// Home.tsx

function Home() {
  return <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}></div>;
}

/// Search.tsx

function Search() {
  return null;
}

/// Tv.tsx

function Tv() {
  return null;
}

///// 8.2 - Header part 2

// Header에 animation 추가해 보자!
// layout / SVG animation 이용!

/// 1) Logo
/// Netflix 로고에 마우스를 갖다 대면,
/// 계속 반복해서 움직이는 애니메이션 추가

// framer-motion으로부터 motion import
// <Logo> 의 path를, motion.path로 수정
// Logo 정의 부분에서도 motion.svg로 수정

// variants 사용을 위해 logoVariants 생성 후 사용
// 반복되는 애니메이션을 위해서,
// variants의 active 요소를 배열로 작성해 단계 지정
// 이후 transition 이용, repeat 횟수 설정 (infinity 가능)

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

function Header() {
  return (
    <Nav>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle />}</Link>
          </Item>
          <Item>
            <Link to="/tv">Tv Shows{tvMatch && <Circle />}</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Search>
      </Col>
    </Nav>
  );
}

/// 2) Items
/// Header 상에서 현재 내가 어디 있느냐에 따라서,
/// 해당 버튼/영역에 동그라미를 생성해 어딘지 나타내는 애니메이션 추가

// Item이 상대적인 위치를 가지도록 설정. position : relative
// 각 영역에 사용될 원 만들기. Circle component 생성, 위치/ 여백 설정
// (무언가를 정중앙에 위치하고 싶으면, left : 0, right : 0, margin: 0 auto 사용 )

const Circle = styled.span`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

// Item 정의 수정해 위치, 방향 설정

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

// 현재는 li로 클릭이 안 됨. <Item> 안에 <Link>를 써서 링크로 만들자!

// 이후에, 내 현재 위치에 따라 원이 표시되도록 하기 위해
// route match 사용
// react router는, 우리가 지금 찾고 있는 route는 URL에 있다는 걸 말해줌.
// 따라서 react router로부터, useMatch를 불러와 뒤에 경로를 적어주고
// 해당 경로상의 route 안에 있는지 다른 곳에 있는지를 알려줄 것.

///// 8.3 - Header part 3

// layout ID를 사용해
// 클릭을 통한 페이지 이동 시 원이 해당 위치로 이동하는 애니메이션 추가
// Circle 정의 수정, motion.span 으로.
// <Circle> 사용 위치에서 layoutId 추가, 두 컴포넌트에 같은 id 부여

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

function Header() {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");

  return (
    <Nav>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home {homeMatch && <Circle layoutId="circle" />}</Link>
          </Item>
          <Item>
            <Link to="/tv">
              Tv Shows {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Search>
      </Col>
    </Nav>
  );
}


/// 3) Search
/// 돋보기를 누르면,
/// 검색 창을 만들어 input을 보여주는 애니메이션 추가

// 이걸 위해, state가 필요하므로, state 생성 후 할당

const [searchOpen, setSearchOpen] = useState(false);

// <Search>에 onClick 속성 추가
// 새 함수를 생성할 수도 있고, 익명 함수를 사용할 수도 있지만,
// 웬만하면 익명함수보다는 새 함수를 만들어 최상단에 두자.
// openSearch 라는 함수 생성, SearchOpen state 변경 가능하도록 정의.
// onClick에 openSearch 사용!

const toggleSearch = () => setSearchOpen((prev) => !prev);


// 돋보기를 눌렀을 때, 오른쪽부터 input 창이 생성되므로
// input 창 만들자!
// 그런데 이 input은 그냥 태그가 아니고
// style component이자 motion component가 되어야 함
// 그러니까 Input = styled(motion.input) 으로 설정해
// <Input> 형식의 컴포넌트로 직상

const Input = styled(motion.input)`
  position: absolute;
  left: -150px;
`;

// 검색창 디자인이 별로 안 예뻐서, Search component 정의로 가서 css 작성

const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  svg {
    height: 25px;
  }
`;


// 클릭 후 검색창이 열릴 때, Input이 x축 방향으로만 늘어나는 것이므로
// scaleX 사용할 건데,
// 만약 searchOpen이 true 라면 scaleX의 비율이 1이 될 것이고
// 아니면 0이 될 것임. <Input animate = {{scaleX : searchOpen ? 1 : 0}}

<Input
transition={{ type: "linear" }}
animate={{ scaleX: searchOpen ? 1 : 0 }}
placeholder="Search for movie or tv show..."
/>

// 근데 그냥 적용하면, 애니메이션이 오른쪽부터가 아니고 중앙에서부터 시작되므로
// 변형의 시작점을 바꿔 주자.
// Input component 정의로 가서 transform-origin 추가
// 그리고 검색창 위치도 수정! position : absolute로 절대 위치로 변경
// Search component 정의에도 position : relative로 상대 위치 설정

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -150px;
`;

const Search = styled.span`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

// 이제 오른쪽부터 검색창 생성 시,
// 생겨난 검색창과 함께 변경될 돋보기 위치도 설정해 보자!
// <Search> 내부의 <svg> 를 <motion.svg> 로 변경 후 animate 사용
// searchOpen의 true/false 여부에 따라 돋보기가 움직일 것.
// true일 때, x좌표 변경
// <motion.svg animate = {{x : searchOpen ? -180 : 0}}  ... >

<motion.svg
onClick={toggleSearch}
animate={{ x: searchOpen ? -180 : 0 }}
transition={{ type: "linear" }}
fill="currentColor"
viewBox="0 0 20 20"
xmlns="http://www.w3.org/2000/svg"
/>

// 이제, 우리가 검색창 밖을 클릭하거나 돋보기를 다시 클릭하면
// 입력창이 닫히게 해 보자
// svg에 onClick 속성 부여, openSearch를 toggleSearch로 변경해
// 이전의 값과 반대되는 값을 리턴하도록 수정해 주면 됨!

const toggleSearch = () => setSearchOpen((prev) => !prev);

// 이 경우의 애니메이션을 좀더 선형적으로 만들기 위해
// <motion.svg>와 <Input> 안에 transition type을 linear로 설정

transition={{ type: "linear" }}

// Input css 수정

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

///// 8.4 - Header part 4

// 우리가 애니메이션에 대해 놓친 부분
// : 애니메이션을 코드로부터 실행시키는 것

// 예를 들어, toggleSearch에서 애니메이션을 실행시키고 싶을 때라고 하자
// 만약 검색창이 열려 있으면, 닫는 애니메이션을
// 민약 반대 상황일 때는, 열리는 애니메이션을 실행시키고 싶음
// 코드로 실행시키고 싶음! 

// useAnimation 이라는 hook을 사용해서!!!!
// 평소에는 많이 사용하지 않겠지만,
// 가끔은 특정 코드를 통해 애니메이션을 실행시키고 싶을 것이고
// 이게 지금 우리가 하는 것임.

// inputAnimation 생성, 할당 후 
const inputAnimation = useAnimation();

// <Input>에 animate로 사용
// 애니메이션 속성, 커맨드를 코드로부터 만들어줄 것.
// 닫는 애니메이션 -> scaleX : 0 사용해
// toggleSearch에 애니메이션 실행 코드를 작성!

<Input
  animate={inputAnimation}
  initial={{ scaleX: 0 }}
  transition={{ type: "linear" }}
  placeholder="Search for movie or tv show..."
/>

const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };

// 이건 애니메이션을 실행하는 또 하나의 방법임
// 이 방법은 애니메이션들을 동시에 실행시키고 싶을 때 유용하고 중요함
// 20개의 애니메이션을 동시에 실행시키고 싶다고 했을 때,
// component props 를 활용하는 것이 아니라, 이 방법으로 하는 게 좋다는 것.


/// 4)
/// 스크롤을 내리면,
/// 헤더 전체의 색상이 바뀌는 애니메이션 추가 (검정 -> 빨강)

// motion을 사용하면 됨!
// 그리고 방금 전에 배운 Animation.start를 쓰는 다른 방법도 써볼 것임.

// framer-motion이 제공하는 hook을 사용하자.
// 스크롤 감지해서 모션값을 주는 useViewportScroll 사용
// 스크롤을 움직일 때, 제일 밑에서부터 얼마나 멀리 있는지를 알려줌.

// 그리고 우리에게 값 두 개를 주는데,
// 1. Progress - x,y에 대한 스크롤 진행도를 0~1 사이의 값으로 알 수 있음.
// 우리가 끝에서부터 얼마나 떨어져 있는지를 0~100% 사이의 값으로 나타내는 것!
// 2. 얼마나 멀리 이동했는지를 픽셀 단위로 나타내줌.

// 2번으로 scrollY를 사용할 건데,
// 우리는 이 값을 읽어내야 함. 이 값은 component를 새로고침하지 않으므로.
// 즉, 값이 바뀌어도 state(상태)는 변하지 않음!

// 우리는 scrollY 값이 80을 넘어가면 화면이 바뀌도록 설정해줄 것. ex)배경색
// 즉, 이 말은 우리가 네비게이션 Nav의 모양을 바꿔 주어야 한다는 것을 의미함

// navAnimation 생성, 할당 후 애니메이션 실행 코드 작성에 이용
const navAnimation = useAnimation();

// scrollY 값이 80을 넘지 않는다면, 애니메이션이 시작할 때, 배경이 투명해지도록,
// 80을 넘는다면, 투명값을 1로 조정해 검은색이 되도록 작성

useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

// Nav component 정의로 가서 motion.nav로 변경
// <Nav> 로 가서 최초 배경색 설정. initial
// 이후 <Nav animate = {navAnimation}> 추가

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

<Nav variants={navVariants} animate={navAnimation} initial={"top"} />

// variants 사용을 위해 navVariants 생성 후 적용
// 단, 변수 하나씩을 지정해 사용. 
// 코드를 통한 이벤트 실행 방법에서, 옵션이 두 가지가 있는데,
// 1. toggleSearch를 구현할 때처럼 문자 그대로 스타일들을 코드에 적는 것이고
// ex) inputAnimation.start({scaleX:0});
// 2. 변수 하나를 지정하는 것. 이게 조금 더 좋은 것 같대
// ex) scroll, top

const navVariants = {
    top: {
      backgroundColor: "rgba(0,0,0,0)",
    },
    scroll: {
      backgroundColor: "rgba(0,0,0,1)",
    },
  };  

// 근데 이 방법 자체가, 지금처럼 단순히 배경색만 바꿀 경우보다는
// 더 복잡한 경우에 사용하면 좋음. 
// 배경색 정도는 
// <Nav animate = {{backgroundColor : scollY > 80 ? "색깔" : "색깔"}}
// 이렇게 하는 게 더 짧지롱


