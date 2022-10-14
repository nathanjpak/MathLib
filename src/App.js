import { MathJaxContext } from "better-react-mathjax";
import GeneratorForm from './components/GeneratorForm';

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

const App = () => {
  return (
    <div className="container">
      <MathJaxContext version={3} config={config} onError={(error) => console.log(error)}>
        <GeneratorForm />
      </MathJaxContext>
    </div>    
  );
}

export default App;
