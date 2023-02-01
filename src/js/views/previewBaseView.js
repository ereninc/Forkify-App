import BaseView from './baseView.js';

class PreviewView extends BaseView {
  //   _parentElement = '';

  _generateMarkup() {
    return `
    <li class="preview">
        <a class="preview__link ${
          id === this._data.id ? 'preview__link--active' : ''
        }" href="#${this._data.id}">
        <figure class="preview__fig">
            <img src=${this._data.image} alt=${this._data.title} />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
        </div>
        </a>
    </li>`;
  }
}

export default new PreviewView();
