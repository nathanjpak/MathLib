// import { MathJaxContext } from "better-react-mathjax";
import GeneratorForm from './components/GeneratorForm';

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
      <GeneratorForm />
    </div>    
  );
}

export default App;
