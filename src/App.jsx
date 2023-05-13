import { useState, useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import shuffle from "./utilities/shuffle";
import useAppBadge from "./hooks/useAppBadge";
import "./App.css";

function App() {
  const [wins, setWins] = useState(0); // Win streak
  const [cards, setCards] = useState(shuffle); // Cards array from assets
  const [pickOne, setPickOne] = useState(null); // First selection
  const [pickTwo, setPickTwo] = useState(null); // Second selection
  const [disabled, setDisabled] = useState(false); // Delay handler
  const [setBadge, clearBadge] = useAppBadge();

  // Handle card selection
  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  // Start over
  const handleNewGame = () => {
    clearBadge();
    setWins(0);
    handleTurn();
    setCards(shuffle);
  };

  // Used for selection and match handling
  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
      // Check if the cards the same
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === pickOne.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo, wins]);

  // If player has found all matches, handle accordingly
  useEffect(() => {
    // Check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
      setBadge();
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, wins, setBadge]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
      <hr />
      <div className='grid'>
        {cards.map((card) => {
          // Destructured card properties
          const { image, matched } = card;

          return (
            <Card
              key={card.id}
              card={card}
              image={image}
              onClick={() => handleClick(card)}
              selected={card === pickOne || card === pickTwo || matched}
            />
          );
        })}
      </div>
      <hr />
    </>
  );
}

export default App;
