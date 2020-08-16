import React from 'react';
// Always scope imports and avoid loose variables
import * as Unstated from 'unstated-next';

import { Deck, Players } from 'containers';

const Statuses = {
  IS_HITTING: 0,
  IS_STICKING: 1,
  LOSS: 2,
  WIN: 3,
};

function useGame() {
  const [status, setStatus] = React.useState(Statuses.IS_HITTING);
  const deck = Deck.useContainer();
  const dealer = Players[0].useContainer();
  const player1 = Players[1].useContainer();

  React.useEffect(() => {
    init();
  }, []);

  React.useEffect(() => {
    if (status === Statuses.IS_STICKING) {
      const { score } = dealer;

      if (score > Number(process.env.REACT_APP_MAX_SCORE)) {
        // Dealer loses
        setStatus(Statuses.WIN);
      } else if (score > player1.score) {
        // Dealer wins
        setStatus(Statuses.LOSS);
      } else {
        goDealer();
      }
    }
  }, [status, dealer.score]);

  const init = async () => {
    // Start the game with 2 cards
    const cards = await deck.takeCards(2);
    player1.add(...cards);
  };

  const goDealer = async () => {
    if (isEnded()) return;

    const cards = await deck.takeCards();
    dealer.add(...cards);
  };

  const hit = async () => {
    if (isEnded()) return;

    const cards = await deck.takeCards();
    const score = player1.add(...cards);

    if (score > Number(process.env.REACT_APP_MAX_SCORE)) {
      // Player loses
      setStatus(Statuses.LOSS);
    }
  };

  const stick = async () => {
    if (isEnded()) return;

    setStatus(Statuses.IS_STICKING);
  };

  const isLoss = () => status === Statuses.LOSS;

  const isWin = () => status === Statuses.WIN;

  const isBusy = () => status === Statuses.IS_STICKING;

  const isEnded = () => isLoss() || isWin();

  const restart = () => {
    // @todo
    window.location.reload();
  };

  return {
    dealer, player1,
    hit, stick, isEnded, isLoss, isWin, isBusy, restart,
  };
}

export default Unstated.createContainer(useGame);