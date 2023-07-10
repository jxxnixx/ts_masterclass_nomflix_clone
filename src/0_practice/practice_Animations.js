///// 8.9 - Box Animations part 1

// 커서를 올렸을 때 scale만 올려주면 됨!
// Box component의 props 이용. whileHover
// 근데 바로 옆에서 왔다갔다 하면 살짝 이상함.
// 해결하기 위해 커서를 치울 때가 아닌 올렸을 때에만 딜레이를 줘 보자.
// transition 에 delay를 그냥 넣으면 둘다 적용되니까
// BoxVariants를 만들어 따로 지정해 주자! 특정해서 delay를 주자!
// hover 상태의 animation에만 delay를 주도록 설정하고 사용

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

// 통통 튀는 spring이 싫으니까,
// variants와 <Box> 내부에서 둘 다 tween으로 바꿔 주자

<Box
  key={movie.id}
  whileHover="hover"
  initial="normal"
  variants={boxVariants}
  transition={{ type: "tween" }}
  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
/>;

// 양쪽 끝의 이미지는 그냥 커지면 옆이 잘리니까,
// Box component 정의에 transform-origin을 추가
// first-child, last-child 로 특정해서!

const Box =
  styled(motion.div) <
  { bgPhoto: string } >
  `
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

///// 8.10 - Box Animations part 2

// 영화에 커서를 올릴 때 나오는 부분에 정보를 추가해 보자!
// Info component 생성 후 <Box> 내부에 <Info>로 추가

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

// 부모 component가 variant를 가지면, 자식은 자동으로 상속받음. 똑같이 작동.
// 일단 infoVariant를 만들고 hover만 작성 후 적용
// 이후 Box와 Info component의 css 수정 + title 포함시키기

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.1,
      type: "tween",
    },
  },
};

// 커서를 올렸을 때, 제목뿐만 아니라 버튼들도 넣고 싶으면,
// css 적인 이유 때문에, prop을 이용하는 것보다는
// <Box> 내부에 <img> 를 따로 넣는 게 좋을 것 같음.
// 그러니까 <Box> 내부에서 <Info>와 <img>는 형재 element인 것.

<Box
  key={movie.id}
  whileHover="hover"
  initial="normal"
  variants={boxVariants}
  transition={{ type: "tween" }}
  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
>
  <Info variants={infoVariants}>
    <h4>{movie.title}</h4>
  </Info>
</Box>;

// 커서를 내릴 때, 옆의 이미지가 해당 이미지를 가리는 버그가 있는데
// Box에서 position:relative를 지우면 해결!
// 왜냐하면 Row가 이미 absolute이므로

///// 8.11 - Movie Modal

// Box 클릭 시 나오는 애니메이션 구현!

// 일단, URL을 바꿔야 함.
// URL을 바꾸면, 그 변화를 감지하고, 그에 기반해 애니메이션 실행이 가능함.

// 어떤 영화를 클릭하고 있는지를 알아야 하니까 id를 이용하면 됨.
// 그러려면, Box 클릭 시 호출될, movieId를 인자로 받는 함수 onBoxClicked 생성
// 이후 <Box> prop에 onClick으로 적용

const onBoxClicked = (movieId: number) => {
  history(`movies/${movieId}`);
};

// useNavigate를 사용해 route/URL 사이를 이동할 수 있도록 할 것.
// onBoxCLicked에서 사용해 URL 변경을 구현

const history = useNavigate();

// Box에 커서를 올리면 커서가 바뀌도록 css 변경

const Box =
  styled(motion.div) <
  { bgPhoto: string } >
  `
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

// 이 경우, URL이 바뀌긴 하지만
// 우리의 Router에는 movies/:movieId에 해당하는 페이지가 없어서
// 우리는 계속 Home 페이지를 보고 있게 됨

// 그래서 match를 사용해 사용자가 지금 그 URL에 있는지 아닌지를 판단할 것

// 그 전에, App.tsx의 <Route path = "/">의 path를 배열로 바꾸자.
// "/"에 있어도, "/movies/:movieId"에 있어도 Home을 렌더링하도록.

<Route path="/" element={<Home />} />
<Route path="/movies/:id" element={<Home />} />

// 이후에 useMatch 훅을 이용, 지금 위치가 /movies/:movieId 인지 알아보고
// bigMovieMatch는 내 위치가 이 route와 맞는지 알려주므로,
// bigMovieMatch가 존재할 때만 렌더링되는 컴포넌트(큰 카드)를 작성한 다음
// animatePresence를 이용해 애니메이션을 적용하자
// 이후에, movieId를 layoutId로 사용해
// 스무스하고 자연스러운 애니메이션 연결 구현!
// layoutId 사용시 에러가 뜬다면, useRouteMatch에서 movieId의 type 지정해주면 됨

const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");

<AnimatePresence>
  {bigMovieMatch ? (
    <motion.div
      layoutId={bigMovieMatch.params.movieId}
      style={{
        position: "absolute",
        width: "40vw",
        height: "80vh",
        backgroundColor: "red",
        top: 50,
        left: 0,
        right: 0,
        margin: "0 auto",
      }}
    />
  ) : null}
</AnimatePresence>

///// 8.12 - Movie Modal part 2

// 이제, bigMovie 뒤에서 클릭을 감지는 오버레이를 통해, 
// 상자 바깥을 클릭하면 bigMovie가 다시 작아지도록 해 보자
// 그러려면 URL도 바뀌어야 하고 Box또한 바뀌어야 함.

// 일단, 두 개의 element를 리턴할 수 있게 하기 위해
// {bigMovieMatch ? ..} 내부에 fragment <> 를 만들고
// <Overlay> 컴포넌트 추가.
// Overlay component는 styled-component이면서 motion.div로 위에 정의
// 배경을 어둡게!

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

{bigMovieMatch ? (
  <>
    <Overlay
      onClick={onOverlayClick}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
    <BigMovie
      style={{ top: scrollY.get() + 100 }}
      layoutId={bigMovieMatch.params.movieId}
    >
      hello
    </BigMovie>
  </>
) : null}

// onOverlayClick 함수를 만들어 Overlay가 클릭되면 박스가 작아지도록!
// history 이용 후 <Overlay> 내부에서 onClick으로 적용

const onOverlayClick = () => history("/");

// animate prop 사용해 애니메이션 추가
// 추가적으로 Overlay가 사라지는 transition을 넣어서 exit 애니메이션을 추가해 주고
// 경계선이 생기는 버그는 
// Overlay의 position을 absolute가 아닌 fixed로 바꾸면 해결!

<Overlay
onClick={onOverlayClick}
exit={{ opacity: 0 }}
animate={{ opacity: 1 }}
/>

// bigMovie 카드의 화면 정가운데에 위치하도록 하기 위해 
// scroll position을 알아야 함. 
// 그러므로 framer motion의 useViewportScroll 사용

const { scrollY } = useViewportScroll();

// 값을 하나 리턴해 주는데, 
// 거기엔 현재 scrollX, scrollY의 progress값 또는 스크롤 거리의 숫자 값 존재
// scrollY를 받아 와서 bigMovie의 top값으로 부여하면,
// 스크롤을 얼마나 내렸든 내가 어디에 있든 top속성의 값은 바로 거기가 될 것임.
// 그래서 사용자가 어디에 있든 bigMovie의 전체 내용을 볼 수 있음.
// margin을 주기 위해 scrollY + 50 이런 식으로 숫자를 바로 더해 줄 수 없음.
// scrollY.get()을 해 줘야 숫자 값으로 받아올 수 있음.
// 이걸 사용해 margin 추가해서 위치를 정중앙으로 고정

<BigMovie
  style={{ top: scrollY.get() + 100 }}
  layoutId={bigMovieMatch.params.movieId}
/>

// 마지막으로 bigMovie 카드를, 빨간 네모가 아니고 영화에 대한 정보들로 채워 보자
// URL과 API를 이용해서!
// API로부터 정보를 얻어오는 컴포넌트를 카드 내부에 렌더링ㄱㄱ
// 이건 내 코드 챌린지...!
// 코인에서 로딩 없이 처리할 수 있도록, 이미 갖고 있는 데이터들은 그냥 가져오고
// 없는 정보들은 더 넣어 주고..

// 이제 <motion.div> 형식이 아닌 BigMovie Component를 만들어서
// <BigMovie>로 사용해 주자!
// css를 형식에 맞게 수정 후, prop도 이용!

function Home() {
  const history = useNavigate();
  const bigMovieMatch: PathMatch<string> | null = useMatch("/movies/:movieId");

  const { scrollY } = useViewportScroll();
  //const setScrollY = useTransform(scrollY, (value: number) => value + 50);

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (movieId: number) => {
    history(`movies/${movieId}`);
  };

  const onOverlayClick = () => history("/");

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

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
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
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
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <AnimatePresence>
              {bigMovieMatch ? (
                <>
                  <Overlay
                    onClick={onOverlayClick}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <BigMovie
                    style={{ top: scrollY.get() + 100 }}
                    layoutId={bigMovieMatch.params.movieId}
                  >
                    hello
                  </BigMovie>
                </>
              ) : null}
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

///// 8.13 - Movie Modal part 3

// 사용자가 클릭한 영화부터 찾아보자
// movieId 이용, API에서 얻어온 data에서 해당 영화 찾자
// 그러면 다른 컴포넌트가,
// URL로 API에서 정보를 얻어오는 동안,
// 미리보기 보여주면 됨.

// clickedMovie 상수 생성 후, bigMovieMatch가 존재하는지부터 검사 후
// true라면, data.results 내부 탐색 후 find 함수를 사용해 
// 넣은 조건을 만족하는 가장 첫 번째 항목 반환
// 조건은, 모든 영화 중에서, movie.id가
// bigMovieMatch.params.movieId와 같은 것
// number와 string 간 동일 여부 비교 불가하므로, 
// movie.id + ""나 String(movie.id) 로 string 변환
// 아니면 bigMovie... 앞에 +를 붙여서 +bigMovie.. 로 number 변환

const clickedMovie =
bigMovieMatch?.params.movieId &&
data?.results.find(
  (movie) => String(movie.id) === bigMovieMatch.params.movieId
);

// 이후에, <BigMovie> 내부의 요소들을 추가해 보자.
// hello를 지우고,
// clickedMovie가 존재하는지 확인 후, 있으면 fragment 작성
// 이후 내부에 제목, 사진 등등 추가
// 태그 사용하지 말고, BigTitle, BigCover 등의 styled-component 생성 후 이용
// BigOverview component 만들고 적용해서 영화 줄거리/설명 추가
// BigMovie component css 수정

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

{bigMovieMatch ? (
  <>
    <Overlay
      onClick={onOverlayClick}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
    <BigMovie
      style={{ top: scrollY.get() + 100 }}
      layoutId={bigMovieMatch.params.movieId}
    >
      {clickedMovie && (
        <>
          <BigCover
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                clickedMovie.backdrop_path,
                "w500"
              )})`,
            }}
          />
          <BigTitle>{clickedMovie.title}</BigTitle>
          <BigOverview>{clickedMovie.overview}</BigOverview>
        </>
      )}
    </BigMovie>
  </>
) : null}

///// 8.14 - Search Redirect

// react-hook-form 을 이용해 search를 제어하자

// 일단 Header.tsx에 
// form에 사용할 interface인 IForm 생성
// useForm<IForm>(); 사용 후 register, handleSubmit 불러오기
// <Input> 내부에 불러온 것들 사용!

interface IForm {
  keyword: string;
}

const { register, handleSubmit } = useForm<IForm>();

// Search component 수정
const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

// <Search onSumbit=..> 사용
// handleSubmit 사용 시, 첫 번째 인자로 데이터가 유효하면 실행할 함수 넣어줌
// onValid 생성 후 사용

<Search onSubmit={handleSubmit(onValid)}></Search>

// 이때, App.tsx에서 보면 Search가 있는데, 
// 이처럼 사용자를, 클릭하지 않아도 Search로 리다이렉트 해줄 것!
// react-router를 사용해서! -> onValid 안에 useNavigate 사용

// 이후에 가장 먼저 해야 할 일은, keyword에 접근하는 것
// keyword를 가지고 검색을 해야 하니까!

// 그러니까 Search.tsx에 location을 이용, keyword를 받아오기 위해
// 파싱을 해 주면 됨.
// 근데, 직접 하는 것보다는 JS에 내장된 URLSearchParameter를 이용해서
// router에서 얻는 것과 똑같이 복사해서 넣어 주면,
// keyword, region 다 편하게 받아올 수 있어서 좋음.

const history = useNavigate();
const { register, handleSubmit } = useForm<IForm>();

const onValid = (data: IForm) => {
  history(`/search?keyword=${data.keyword}`);
};

<Input
  {...register("keyword", { required: true, minLength: 2 })}
  animate={inputAnimation}
  initial={{ scaleX: 0 }}
  transition={{ type: "linear" }}
  placeholder="Search for movie or tv show..."
/>

// 이후에, fetch해 주면 끝!

///// 8. 15 - Conclusions

// Header나 더 많은 종류의 영화나 slider들을 불러오고 만들어서
// API를 이용하면 다 됨! 
// id나 detail들 건드리면 귯귯
// TV show도 !

// Home 에서는 영화를 더 보여주고,
// TV shows 에서는 TV show들을 보여주고,
// 검색 부분은 검색 결과를 보여 주고,
// bigMovie 컴포넌트 개선하고,
// slider 도 더 만들고!
