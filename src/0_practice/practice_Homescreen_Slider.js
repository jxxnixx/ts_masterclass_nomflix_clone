///// 8.5 - Home Screen part 1

// 홈 스크린을 만들 건데,
// 이걸 위해서 우리는 데이터와 그들이 어디서부터 오는지 알아야 함.

// 일단 영화 or 홈 화면에서 엄청 큰 영화 포스터를 만들어줄 것!
// 또 많은 가로 슬라이드도 만들 건데
// 지금 어디서 데이터가 오는지를 알아야 함!

// 데이터는 themoviedb.org에서 올 것임
// api 사용! 정보가 매우 많음.

// 일단, 우리가 보여줄 첫 번째 영화를 get now playing으로부터 가져와야 함.
// 나머지는 우리가 만들 슬라이더에 배치할 것.
// get popular -> 유행하는 영화
// get upcomung -> 개봉예정작

// TV show도 똑같이 적용!
// 유행하는 쇼 중 첫번째 것을 짱 크게 가져오고,
// 나머지는 슬라이드로!

// react query를 사용할 건데, 일단 index로 가서 query client를 만들자
// client 속성도 작성해서!

/// index.tsx

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

// 저 org 사이트에 로그인하고 settings에 들어가면
// API 키를 찾을 수 있음!

// Routes에 api.ts라는 새 파일 생성 후 API_KEY 작성
// 이후에, 가져올 데이터의 성격에 따라 api_key값과 URL을 이용하자.
// fetch 함수 작성, json으로 만들고 export

// Routes의 Home에서 query 사용
// useQuery 사용 시, key가 필요한데, 이는 문자열/배열 가능
// data, isLoading 알려줌.

/// api.ts

const API_KEY = "b027be29d983f35a80fb316b6734e898";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// 이후에 이미지 id 등등을 이용해 이미지를 받아오자.
// 해상도, id, backdrop_path 등등 사용

/// 일단 Home.tsx

import { useQuery } from "react-query";
import { getMovies } from "../api";

function Home() {
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);

  return (
    <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}>home</div>
  );
}

///// 8.6 - Home Screen part 2

// 받아온 data를 ts에서 사용하기 위해, api 응답의 type을 지정해줘야 함!
// interface 객체로 지정해 주자. 
// getMovies에 대한 result 관련 -> IGetMoviesResult
// Movie 관련 -> IMovie ( 모든 값들 말고, 쓰고 싶은 값들만 뽑아서! )
// (단, 클릭 시 어디로 이동했는지 알아야 하므로 number 타입의 id 추가)
// api.ts에서 interface 정의 후 Home.tsx에서 적용

/// api.ts

const API_KEY = "b027be29d983f35a80fb316b6734e898";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// 이후, Wrapper 만들고 배경 넣고 화면 만들자 챡챡
// Loader 만들고 로딩 끝나면 data 띄워주고
// index.tsx에서 배경색, 글자색 css 조금 수정하고
// 우리가 얻응 영화 배열에서 첫 번째 항목 보여주도록 하는 Banner 만들고 작성
// 작성 시에 Loading 컴포넌트 뒤쪽에 넣을 건데,
// <></>를 사용할 것임. 
// 이건 개발자가 많은 요소를 공통된 부모 없이 연이어 리턴할 수 있도록 해줌.
// Banner는 배열 첫 제목, 줄거리를 포함하므로
// Title, Overview component 만들고 data와 연결해 적용
// 줄거리가 너무 길 경우, overview component에 너비 지정해 해결
// css도 지정!

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;

  // 포스터 색상 때문에 글씨가 안 보일 경우를 대비해,
  // Banner의 background-image를 두 가지로 수정!
  // linear-gradient(그라데이션으로 어두운 화면), URL(포스터 원본)
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

// 이제 포스터 이미지 받아오자.
// 이미지는 그냥 backdrop_path 앞에 image로 시작하는 URL 붙여 주고 
// 그 뒤에 형식이랑 ID 적어주면 됨.
// 이럴 때 helper function이 필요하겠지? ㄱㄱ

// Routes 폴더에 utils.ts 파일 만들어서 이미지 경로 포맷 설정

export function makeImagePath(id: string, format?: string) {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
  }

// 이 데이터는 data?.results[0].backdrop_path에 있음
// 그 배경 이미지를 bgPhoto라는 이름으로 Banner component에 넘기자.
// 이때, 사용을 가능하게 하기 위해 Banner 정의도 수정
// 근데, 이때 bgPhoto는 위 데이터를 받으면 안 되고
// makeImagePath에 id를 넣은 것을 받아야 함.
// 그리고 데이터가 존재하지 않거나 제대로 안 받아졌을 때를 대비해 
// 빈 스트링을 보내라는 뜻의 fallback "" 추가

function Home() {
    const { data, isLoading } = useQuery<IGetMoviesResult>(
      ["movies", "nowPlaying"],
      getMovies
    );
  
    const [index, setIndex] = useState(0);
    const increaseIndex = () => setIndex((prev) => prev + 1);
  
    return (
      <Wrapper>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <> ///////////
            <Banner
              onClick={increaseIndex}
              bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}/////////
            >
              <Title>{data?.results[0].title}</Title>
              <Overview>{data?.results[0].overview}</Overview>
            </Banner>
            <Slider>
              <AnimatePresence>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  //////////////
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Box key={i}>{i}</Box>
                    ///////////////
                  ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </>
        )}
      </Wrapper>
    );
  }
  
///// 8.7 - Slider part 1

// 이제 가로 slider component 만들자 ㄱㄱ
// Slider component 만들고, 
// 여러 열을 구현하기 위해 Row component을 motion.div로 만들고
// 열 안에 나열될 Box component를 motion.div로 만들어
// <Slider> 안에 3 * (<Row> 작성 후 <Box> 6개 넣어주기)

// Row component CSS 수정하고, position : absolute 추가
// Slider component에 position : relative 추가

// 그리고, 우린 motion을 사용할 거니까 아까 Box * 6 이런 거 허용되지 않음
// motion을 사용할 때에는 모든 것을 한번에 render해야 하므로!
// 대신, key만 바꾸면 되지롱
// 그러니까 Row * 3 이런 것까지 전부 삭제 룰루

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)`
  background-color: white;
  height: 200px;
  color: red;
  font-size: 66px;
`;

// component가 render되거나 destroy될 때 효과를 줄 수 있는
// AnimatePresence import 하기

// index 시스템이 있어야 어딜 누르면 다른 곳으로 넘어가므로,
// index 시스템 만들쟈. useState로! 그 index를 Row의 key로 넘겨 주고
// index를 증가시키는 함수(increaseIndex)와 rowVariants 를 만들어
// <Row> 에 적용! 
// 처음과 마지막 Box의 gap 설정을 위해 
// rowVariants의 hidden, exit 간격 설정하고 exit - 10 해 주기

const rowVariants = {
    hidden: {
      x: window.outerWidth + 10,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 10,
    },
};


function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);
  const increaseIndex = () => setIndex((prev) => prev + 1);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                // slider가 튕기는 게(spring) 싫으면,
                // transition = {{type : "tween"}} 설정
                key={index}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Box key={i}>{i}</Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}
  
///// 8.8 - Slider part 2

// 여기서 버그가 하나 있는데,
// 슬라이드를 넘길 때 빨리 두번 클릭하면 간격이 커짐
// 원래 있던 Row가 exit 하는 도중에 한번 더 눌러서 
// 다음 Row 도 사라지려고 하기 때문에!

// 이를 해결하기 위해 state를 만들자. leaving
// index를 증가시키기 전에 체크하는 방식으로
// leaving이 true면 return하고 아무것도 하지 않도록!

// 이 상태로만 가면 leaving은 true로 계속 남게 딤.
// AnimatePresence의 prop인 onExitComplete를 이용해서
// 그 안에 넣은 함수가 exit이 끝났을 때 실행되도록 하자
// 그리고 leaving을 반전시켜주는 함수 toggleLeaving을 만들어
// increaseIndex에서 사용!

const [index, setIndex] = useState(0);
const [leaving, setLeaving] = useState(false);

const toggleLeaving = () => setLeaving((prev) => !prev);

const increaseIndex = () => {
  if (data) {
    if (leaving) return;
    toggleLeaving();
    const totalMovies = data.results.length - 1;
    const maxIndex = Math.floor(totalMovies / offset) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  }
};

// 또다른 문제를 해결하기 위해 다른 prop을 이용해 보자
// state가 hidden인 상태에서 시작하므로, 
// 첫 홈 화면에서는 slider가 오른쪽부터 미끄러져 들어오기 시작함.
// 그 자리에 위치해서 시작하는 것이 아니고 ㅇㅇ
// AnimatePresence에 initial = false를 넣어주면 제자리에서 시작될 것임

<AnimatePresence initial={false} onExitComplete={toggleLeaving} />

// 이제 Box에 이미지를 넣어 보자.
// Row의 gap이 너무 커 보이니 Row와 rowVariants에서 10을 5로 수정

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const rowVariants = {
    hidden: {
      x: window.outerWidth + 5,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 5,
    },
  };

  
// 그리고 지금은 index를 계속 증가시키고 있지만,
// 영화는 무한히 존재하지 않기 때문에 index를 계속 늘리는 것은 별로 좋지 않음.
// 페이지별로 영화를 담아야 하니까!
// 지금은 한 페이지에 6개씩 보여주고 있고!

// 받아오는 데이터를 보면, 총 20개의 영화 정보를 넘겨 주고 있고,
// 맨 처음 것을 배경으로 쓰고 있으니까,
// 19개가 남는데, 6개씩이면, slider는 4개가 필요하다는 말임.
// 그러면 계속 증가되는 index의 상한을 알아야 하고, 
// 그를 넘어가면 0으로 돌아가야 함.

// 그러니까 배열을 6개씩 잘라 반환해주는 함수를 만들자
// offset = 6, page = 0 으로 시작해 이를 기반으로 배열을 자를 것
// page가 0인 상태는
// [..].slice(offset*page, offset*page+offset)하면 처음 6개를
// page가 1인 상태는 그 다음 6개를
// page가 2인 상태는 그 다음 6개를 반환.
// 즉 page가 index나 다름없는 것! pagination

// 일단 그 전에, 배경으로 사용한 맨 첫 영화는 배열에서 제해줘야 함.
// data?.results.slice(1) ㄱㄱ
// 최종 -> data?.results.slice(1).slice(offset*index, offset*index + offest)

// key 에는 movie.id로 ㄱㄱ
// index에 상한을 정해 주자! 페이지는 4개니까, index는 0, 1, 2, 3만 가능
// increaseIndex에서 index의 상한을 지정! totalMovies를 이용해서
// 영화 갯수가 나중에 바뀔 수도 있으니까, 올림 처리ㄱㄱ
// 영화 하나는 빼줘야 하니까, totalMovies는 -1 해줘야 함.
// index가 maxIndex값과 같다면, 0으로 돌려 보내기!
// maxIndex 설정 시에도, index는 0부터 시작하니까 -1 해줘야 함.
<Row
  variants={rowVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
  transition={{ type: "tween", duration: 1 }}
  key={index}
>
  {data?.results
    .slice(1)
    .slice(offset * index, offset * index + offset) ///////////////////
    .map((movie) => (
      <Box
        key={movie.id}
        bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
      />
    ))}
</Row>

// 이제 진짜 이미지를 가져오자! movie로부터 ㄱㄱ
// Box component에는 bgPhoto prop이 정의되어 있지 않으니까
// 정의 상에서 수정해 주고, 
// background-image를 url(${props => props.bgPhoto})로 설정!
// 근데 그냥 넣으면 사이즈가 너무 크니까,
// <Box bgPhoto=...> 사용 시 w500으로 설정해 크기 지정
// Box component css 수정

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
`;

<Box
  key={movie.id}
  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
/>

// 남는 영화 없애려면, 올림(floor) 말고 내림 ㄱㄱ
