import './index.css';
import "./stylesheets/ReactModal.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { MathJaxContext } from "better-react-mathjax";
import router from './Router';

import axios from 'axios';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

root.render(
  <React.StrictMode>
    <MathJaxContext version={3} config={config} onError={(error) => console.log(error)}>
      <RouterProvider router={router}/>
    </MathJaxContext>
  </React.StrictMode>
);
