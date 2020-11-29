import { React } from "../web_modules/es-react.js";
import htm from "../web_modules/htm.js";

const html = htm.bind(React.createElement);

const Application = () => {
  return html`
    <nav>
      <span className="nav-item"
        ><a href="#" className="nav-link">Profile</a>
      </span>
      <span className="nav-item"
        ><a href="#" className="nav-link">Gallery</a>
      </span>
      <span className="nav-item"
        ><a href="#" className="nav-link">Creators</a>
      </span>
      <span className="nav-item"
        ><a href="#" className="nav-link">Mint NFT</a>
      </span>
      <div className="nav-bottom-section" />
    </nav>
  `;
};

export default Application;
