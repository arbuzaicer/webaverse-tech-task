import {React} from '../web_modules/es-react.js';
import htm from '../web_modules/htm.js';

const html = htm.bind(React.createElement);

const Application = () => {
  return html`
      <h1>My profile</h1>
      <div className="profile-card">
        <div className="image-container">
          <img
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          />
        </div>
        <div className="profile-info">
          <p>nickName: @someNickName</p>
          <p>UserName: @bestPlayer</p>
        </div>
      </div>
  `;
};

export default Application;
