import React from 'react';

import { Game } from 'containers';

import './Deck.scss';

export default function Deck() {
  const game = Game.useContainer();
  const isEnded = game.isEnded();
  const isWin = game.isWin();
  const isLoss = game.isLoss();
  const isBusy = game.isBusy();

  return (
    <div className="Deck">
      <strong className="Deck__score Deck__score--dealer">
        {game.dealer.score}
      </strong>

      <div className="Deck__buttons">
        {!isEnded && (
          <>
            <button
              className="Deck__button"
              type="button"
              onClick={() => game.hit()}
              disabled={isBusy}
            >
              <span>Hit</span>
            </button>

            <button
              className="Deck__button"
              type="button"
              onClick={() => game.stick()}
              disabled={isBusy}
            >
              <span>Stick</span>
            </button>
          </>
        )}

        {isEnded && (
          <button
            className="Deck__button"
            type="button"
            onClick={() => game.restart()}
          >
            <span>
              {isWin ? 'New game' : 'Try again'}
            </span>
          </button>
        )}
      </div>

      <strong
        className={`Deck__score
          ${isLoss && 'Deck__score--loss'}
          ${isWin && 'Deck__score--win'}`}
      >
        {game.player1.score}
      </strong>
    </div>
  );
}