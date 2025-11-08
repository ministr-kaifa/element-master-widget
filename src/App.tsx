import TokenPrompt from "./TokenPrompt";

function App() {
  
  import('eruda').then(eruda => {
    eruda.default.init({});
  });

  return (
  <>
    <TokenPrompt onTokenSet={() => {}}/>
  </>
  );
}

export default App;
