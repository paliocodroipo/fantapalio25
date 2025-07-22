import {
  game_results_array   
} from '../data250721_2306.js';

const teamClassMap = {
  'SUD': 'score_sud',
  'NORD': 'score_nord',
  'EST': 'score_est',
  'WEST': 'score_west'
};

// Create a mapping of game labels by index if needed
// const gamedayLabels = [
//   "Domenica (G1)",
//   "Lunedì (G2)",
//   "Mercoledì (G3)",
//   "Giovedì (Semifinali)",
//   "Sabato (Finale)"
// ];

const gamedayLabelMap = {
  g1: "Domenica (G1)",
  g2: "Lunedì (G2)",
  g3: "Mercoledì (G3)",
  semi: "Giovedì (Semifinali)",
  final: "Sabato (Finale)"
};

function createGameScoreDiv(homeTeam, homeScore, awayTeam, awayScore) {
  const gameScoreDiv = document.createElement('div');
  gameScoreDiv.className = 'gamescore';

  const homeDiv = document.createElement('div');
  homeDiv.className = teamClassMap[homeTeam] || 'score_default';
  homeDiv.innerHTML = `${homeTeam}<br>${homeScore}`;

  const awayDiv = document.createElement('div');
  awayDiv.className = teamClassMap[awayTeam] || 'score_default';
  awayDiv.innerHTML = `${awayTeam}<br>${awayScore}`;

  gameScoreDiv.appendChild(homeDiv);
  gameScoreDiv.appendChild(awayDiv);

  return gameScoreDiv;
}

function renderGameResults() {
//   const main = document.querySelector('main');
  const results_container = document.getElementById('game_results_container');

  game_results_array.forEach((gameDayData, index) => {
    const gameDayTitle = document.createElement('p');
    gameDayTitle.className = 'gameday';


    const label = gamedayLabelMap[gameDayData.game_results_day?.toLowerCase()] || `Giorno ${index + 1}`;
    gameDayTitle.textContent = label;

    // gameDayTitle.textContent = gamedayLabels[index] || `Giorno ${index + 1}`;

    // results_container.appendChild(gameDayTitle);

    // Match A
    const matchA = createGameScoreDiv(
      gameDayData.match_A_home_team,
      gameDayData.match_A_home_score,
      gameDayData.match_A_away_team,
      gameDayData.match_A_away_score
    );
    // results_container.appendChild(matchA);

    // Divider (optional: e.g. dash)
    const divider = document.createElement('div');
    divider.textContent = '-';
    divider.style.textAlign = 'center';
    divider.style.margin = '0.5em 0';
    // results_container.appendChild(divider);

    // Match B
    const matchB = createGameScoreDiv(
      gameDayData.match_B_home_team,
      gameDayData.match_B_home_score,
      gameDayData.match_B_away_team,
      gameDayData.match_B_away_score
    );
    // results_container.appendChild(matchB);

    const gameDayBlock = document.createElement('div');
    gameDayBlock.className = 'gameday-block';

    // Then append elements to this block instead of directly to `main`
    gameDayBlock.appendChild(gameDayTitle);
    gameDayBlock.appendChild(matchA);
    if(gameDayData.game_results_day != "final"){
      gameDayBlock.appendChild(divider);
      gameDayBlock.appendChild(matchB);
    }

    results_container.appendChild(gameDayBlock);

  });
}

// Run after DOM is ready
window.addEventListener('DOMContentLoaded', renderGameResults);
