import {React} from '../web_modules/es-react.js';
import htm from '../web_modules/htm.js';

const html = htm.bind(React.createElement);

const Application = () => {
  return html` <div>Gallery Page</div> `;
};

export default Application;
