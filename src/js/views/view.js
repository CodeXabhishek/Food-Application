import icons from 'url:../../img/icons.svg';

/** @description Inserting DOM html for different function */
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markUp = this._generateMarkup();
    if (!render) return markUp;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  /** @description Updating recipe serving algorithm */
  update(data) {
    if (!data && data.length === 0) return this.renderError();
    this._data = data;
    const newMarkUp = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkUp);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currElement = Array.from(this._parentElement.querySelectorAll('*'));
    //  console.log(currElement, newElements);
    newElements.forEach((newEle, i) => {
      const currEle = currElement[i];
      if (
        !newEle.isEqualNode(currEle) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      ) {
        currEle.textContent = newEle.textContent;
      }
      if (!newEle.isEqualNode(currEle)) {
        Array.from(newEle.attributes).forEach(attr =>
          currEle.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  /** @description Rendering loading spinner for d/f file laoding */
  renderSpinner() {
    const markUp = `<div class="spinner">
                <svg>
                  <use href="${icons}#icon-loader"></use>
                </svg>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  /** @description Rendering function different error messages*/
  renderError(message = this._errorMessage) {
    const markUp = `
          <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</    p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }

  /** @description Rendering function different success messages*/

  renderSuccess(message = this._successMessage) {
    const markUp = `
       <div class="message">
       <div>
         <svg>
           <use href="${icons}#icon-smile"></use>
         </svg>
       </div>
       <p>${message}</    p>
     </div>
   `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
