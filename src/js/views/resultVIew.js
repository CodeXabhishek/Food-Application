import icons from 'url:../../img/icons.svg';

/**@description: Showing results for search query */
import View from './view';
import previewView from './previewView';
class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for query. Please try again!';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
