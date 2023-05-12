import { useEffect } from "react";
import { VscDebugRestart } from "react-icons/vsc";

const Header = ({ handleNewGame, wins }) => {
  useEffect(() => {
    document.title = `Memento | ${wins} ${
      wins === 0 ? "wins" : wins === 1 ? "win!" : "wins!"
    }`;
  }, [wins]);

  return (
    <header className='header'>
      <h4>
        {wins} {wins === 0 ? "wins" : wins === 1 ? "win!" : "wins!"}
      </h4>
      <h3>Memento</h3>
      <button onClick={handleNewGame}>
        <VscDebugRestart size={21} className='new-game-icon' />
        Restart
      </button>
    </header>
  );
};

export default Header;
