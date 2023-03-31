export type UpdateMovieListEvent = CustomEvent<{ keyword: string }>;
export type AppendMovieListEvent = CustomEvent<{ keyword: string }>;
export type ClickMovieEvent = CustomEvent<{ movieId: string }>;
type StarRating = { imagePath: string; score: number; caption: string };

export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface MovieDetail extends Movie {
  genres: string[];
  overview: string;
  starRating: StarRating;
}

export interface RawMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export interface RawMovieDetail extends RawMovie {
  genres: { id: number; name: string }[];
  overview: string;
}

export interface FetchMoviesResult {
  statusCode?: number;
  statusMessage: string;
  movieList: Movie[];
  isLastPage: boolean;
}

export interface FetchMovieDetailResult {
  statusCode?: number;
  statusMessage: string;
  movieDetail?: MovieDetail;
}

export interface APIMovieResponseData {
  // fetch 성공한 경우(response.ok===true)
  total_pages?: number;
  results?: RawMovie[];

  // fetch 실패(response.ok===false)한 경우(API상태코드가 나오는 경우)
  success?: boolean;
  status_code?: number;
  status_message?: string;

  // fetch 실패(response.ok===false)한 경우(API상태코드가 안 나오는 경우 - ex. 현재 페이지가 최대값 보다 클 경우)
  errors?: string[];
}

export interface APIMovieDetailResponseData {
  success?: boolean;
  status_code?: number;
  status_message: string;
  errors: string[];

  rawMovieDetail?: RawMovieDetail;
}

export interface ResponseParsedData {
  statusCode?: number;
  statusMessage: string;
  totalPages?: number;
  rawMovieList?: RawMovie[];
  rawMovieDetail?: RawMovieDetail;
}
