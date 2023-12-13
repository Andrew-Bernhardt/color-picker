import logo from './logo.svg';
import ColorBlock from './ColorBlock.tsx';
import './App.css';

function App() {

  const colorBlocks = [];
  for (let i=0; i < 100; i++) 
    colorBlocks.push(<ColorBlock/>);

  return (
    <div className="App">
      {colorBlocks}
    </div>
  );
}

export default App;
