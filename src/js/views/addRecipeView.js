import View from './view';
import icons from 'url:../../img/icons.svg';

/**@description: Selecting form for adding custom recipe */
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = 'Recipe uploaded successfully✅';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowForm();
    this._addHandlerRemoveForm();
  }

  toggleForm() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowForm() {
    this._btnOpen.addEventListener('click', this.toggleForm.bind(this));
  }
  _addHandlerRemoveForm() {
    this._btnClose.addEventListener('click', this.toggleForm.bind(this));
    this._overlay.addEventListener('click', this.toggleForm.bind(this));
  }

  addHandlerUploadForm(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }
  _generateMarkup() {}
}
export default new AddRecipeView();
