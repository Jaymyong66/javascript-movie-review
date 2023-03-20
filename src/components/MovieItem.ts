import { Movie } from '../types/movie';
import { POSTER_BASE_URL } from '../constants';
import { $ } from '../utils/domSelector';
import { EmptyStar, FilledStar } from '../assets';

class MovieItem {
  private static instance: MovieItem;

  static getInstance(): MovieItem {
    if (!MovieItem.instance) {
      MovieItem.instance = new MovieItem();
    }

    return MovieItem.instance;
  }

  template() {
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <p class="item-title skeleton"></p>
            <p class="item-score skeleton"></p>
          </div>
        </a>
      </li>`;
  }

  private posterImageTemplate(title: string, imagePath: string) {
    return imagePath
      ? `
        <img
          class="item-thumbnail"
          src="${POSTER_BASE_URL}${imagePath}"
          loading="lazy"
          alt="${title}"
        />`
      : `<div class="item-thumbnail"></div>`;
  }

  private scoreTemplate(voteAverage: number) {
    return `
      <img src="${voteAverage ? FilledStar : EmptyStar}" alt="별점" />${voteAverage}
    `;
  }

  render(target: HTMLElement, movie: Movie) {
    const itemThumbnail = $('.item-thumbnail', target);
    itemThumbnail.classList.remove('skeleton');
    itemThumbnail.insertAdjacentHTML(
      'beforeend',
      this.posterImageTemplate(movie.title, movie.posterPath)
    );

    const itemTitle = $('.item-title', target);
    itemTitle.classList.remove('skeleton');
    itemTitle.textContent = movie.title;

    const itemScore = $('.item-score', target);
    itemScore.classList.remove('skeleton');
    itemScore.insertAdjacentHTML('beforeend', this.scoreTemplate(movie.voteAverage));
  }
}

export default MovieItem.getInstance();
