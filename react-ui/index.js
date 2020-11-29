import {React, ReactDOM} from 'https://unpkg.com/es-react@16.8.30/index.js';
import htm from 'https://unpkg.com/htm@2.1.1/dist/htm.mjs';
import csz from 'https://unpkg.com/csz@0.1.2/index.js';

import NavBar from './components/NavBar.js';

window.React = React;
window.css = csz;
window.html = htm.bind(React.createElement);

const Route = {
  [`${location.pathname}`]: React.lazy(() =>
    import('./routes/profile/index.js'),
  ),
};

ReactDOM.render(
  html`
    <${React.Suspense} fallback=${html`<div>Loading...</div>`}>
      <${NavBar} />
      <${Route[location.pathname] || Route['*']} />
    </${React.Suspense}>
  `,
  document.querySelector('.main-app-container'),
);
