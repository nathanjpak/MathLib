// import { MathJaxContext } from "better-react-mathjax";
import GeneratorForm from './components/GeneratorForm';
import Header from './components/Header';

// const config = {
//   loader: { load: ["[tex]/html"] },
//   tex: {
//     packages: { "[+]": ["html"] },
//     inlineMath: [
//       ["$", "$"],
//       ["\\(", "\\)"]
//     ],
//     displayMath: [
//       ["$$", "$$"],
//       ["\\[", "\\]"]
//     ]
//   }
// };

const App = () => {
  return (
    <div className="container">
      <Header />
      <GeneratorForm />
    </div>    
  );
}

export default App;
