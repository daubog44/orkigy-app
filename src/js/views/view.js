import icons from 'url:../../img/icons.svg'; // parcel 2

export default class View {
  _data;

  /**
   * Render the recevived object to the DOM
   * @param {Object | Object[]} data the data to be rndered (e.g. recipe)
   * @param {boolean} [render=true] if false render, create markup string instead of rendering to the DOM
   * @returns {undefined | string} a markup string is returned if render=false
   * @this {object} View instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clearParentElemnt();
    this._parentElemnt.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElments = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElemnt.querySelectorAll('*'));

    newElments.forEach((newEl, i) => {
      const curEl = curElements[i];

      // update change text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // update change the attribute
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clearParentElemnt() {
    this._parentElemnt.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

    this._clearParentElemnt();
    this._parentElemnt.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(error = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${error}</p>
    </div>`;

    this._clearParentElemnt();
    this._parentElemnt.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clearParentElemnt();
    this._parentElemnt.insertAdjacentHTML('afterbegin', markup);
  }
}
