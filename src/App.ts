import { Movie } from './index.d';
import MoreButton from './components/MoreButton';
import MovieCard from './components/MovieCard';
import movieStore from './store/MovieStore';
import SearchBox from './components/SearchBox';
import searchMovieStore from './store/SearchMovieStore';

const SKELETON_UI_FIXED = 8; // 스켈레톤 UI 갯수
type Tpage = 'popular' | 'search';

export default class App {
  #pageType: Tpage = 'popular';

  async run() {
    this.#generateMovieList();

    this.#generateSearchBox();
  }

  async #generateMovieList() {
    const ulElement = document.querySelector('ul.item-list');

    if (ulElement) {
      this.#generateSkeletonUI(ulElement as HTMLElement);
      const newData = await movieStore.getMovies(); //

      this.#removeSkeletonUI();
      this.#appendMovieCard(newData, ulElement as HTMLElement);
    }
  }

  async #generateSearchMovieList() {
    const ulElement = document.querySelector('ul.item-list');

    if (ulElement) {
      this.#generateSkeletonUI(ulElement as HTMLElement);
      const newData = await searchMovieStore.searchMovies();

      this.#removeSkeletonUI();
      this.#appendMovieCard(newData, ulElement as HTMLElement);
    }
  }

  #appendMovieCard(newData: Movie[], ulElement: HTMLElement) {
    newData.forEach((data: Movie) => {
      const card = new MovieCard(data);

      ulElement?.appendChild(card.element);
    });
    this.#generateMoreButton();
  }

  #generateSkeletonUI(ulElement: HTMLElement) {
    this.#removeMoreButton();
    for (let i = 0; i < SKELETON_UI_FIXED; i++) {
      const card = new MovieCard();

      ulElement?.appendChild(card.element);
    }
  }

  #removeSkeletonUI() {
    const skeletonElements = document.querySelectorAll('.skeleton');

    skeletonElements.forEach((skeletonElement) => {
      skeletonElement.parentNode?.removeChild(skeletonElement);
    });
  }

  /* eslint-disable max-lines-per-function */
  #generateMoreButton() {
    this.#removeMoreButton();
    if (searchMovieStore.presentPage === searchMovieStore.totalPages) return;
    const itemView = document.querySelector('section.item-view');
    const moreBtn = new MoreButton({
      onClick: () => {
        if (this.#pageType === 'popular') {
          movieStore.increasePageCount();
          this.#generateMovieList();
        } else {
          searchMovieStore.increasePageCount();
          this.#generateSearchMovieList();
        }
      },
    });

    itemView?.appendChild(moreBtn.element);
  }

  #removeMoreButton() {
    const moreButton = document.getElementById('more-button');
    if (moreButton) {
      moreButton.parentNode?.removeChild(moreButton);
    }
  }

  #generateSearchBox() {
    const header = document.querySelector('header');
    const ulElement = document.querySelector('ul.item-list');
    const searchBox = new SearchBox({
      onClick: (query: string) => {
        if (ulElement) ulElement.innerHTML = '';
        this.#pageType = 'search';
        searchMovieStore.query = query;
        this.#generateSearchMovieList();
      },
    });

    header?.appendChild(searchBox.element);
  }
}
