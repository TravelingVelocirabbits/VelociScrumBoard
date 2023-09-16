/**
 * ************************************
 *
 * @module  index.js
 * @author  Nathan Agbayani, Ken Iwane, Simon Lin, Gio Mogi
 * @date
 * @description entry point for application. Hangs React app off of #contents in index.html
 *
 * ************************************
 */

import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

const root = createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)



