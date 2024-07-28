import React from 'react'
import './index.css';
import { StaticRouter } from 'react-router-dom/server'
import { renderToString } from 'react-dom/server'
import App from './App'
import store from './assets/store';
import { Provider } from 'react-redux';

export function render(url, ssrManifest, options) {
  return renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>,
    options
  );
}
