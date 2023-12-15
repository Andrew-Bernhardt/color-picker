import logo from './logo.svg';
import ColorBlock from './ColorBlock.tsx';
import './App.css';

function App() {

  // Make an API call HERE and gather 100 or so randomly generated values. This will save server calls. 
  // We can make 1 server call only here.
  const colorBlocks = [];
  for (let i=0; i < 100; i++) {
    const randomColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);

    colorBlocks.push(<ColorBlock color={randomColor} numVotes={0} />);
  }

  return (
    <div className="app-container-grid">
      <div className="color-block-container">
        {colorBlocks}
      </div>
      <div className="scoreboard">
        <h3>Leaderboard</h3>
        {/**Pull Rankings in from the database */}
      </div>
    </div>
  );
}

export default App;
