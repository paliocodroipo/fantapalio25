import {
    pdkWeights,
    player_type,
    players,
    td3Weights,
    what_day_is_it
} from '../data250721_2306.js';

document.addEventListener('DOMContentLoaded', function() {
    const playerCardsContainer = document.getElementById('playerCardsContainer');

    // Ordina i giocatori in ordine decrescente in base a 'meme_tot'
    const sortedPlayers = players.slice().sort((a, b) => b.meme_tot - a.meme_tot);

    // Crea e mostra le schede dei giocatori con solo nome e meme_tot
    sortedPlayers.forEach((player, index) => {
        const card = document.createElement('div');
        card.classList.add('player-card', `cardclass${player.team}`);
        // card.innerHTML = `
        //     <h3>${index + 1}. ${player.name}</h3>
        //     <p>G1: ${player.stats_g1[18]*pdkWeights[18]}</p>
        //     <p>G2: ${player.stats_g2[18]*pdkWeights[18]}</p>
        //     <p>G3: ${player.stats_g3[18]*pdkWeights[18]}</p>
        //     <p>Semifinale: ${player.stats_semi[18]*pdkWeights[18]}</p>
        //     <p>Tiro da 3: ${player.stats_td3[11]*td3Weights[11]+player.stats_td3[12]*td3Weights[12]}</p>
        //     <p>Finale: ${player.stats_final[18]*pdkWeights[18]}</p>
        //     <p class="total">Punti meme: ${player.meme_tot}</p>
        // `;
        let cardHtml = ``
        if(index == 0){
            cardHtml = `
                <h3><span class="big_emoji">🤡</span><br>${player.name}</h3>
            `;
        }else{
            cardHtml = `
                <h3>${index + 1}. ${player.name}</h3>
            `;
        }

        if (what_day_is_it >= 1) {
            cardHtml += `<p>G1: ${(player.stats_g1[18] * pdkWeights[18])}</p>`;
        }
        if (what_day_is_it >= 2) {
            cardHtml += `<p>G2: ${(player.stats_g2[18] * pdkWeights[18])}</p>`;
        }
        if (what_day_is_it >= 3) {
            cardHtml += `<p>G3: ${(player.stats_g3[18] * pdkWeights[18])}</p>`;
        }
        if (what_day_is_it >= 4) {
            cardHtml += `<p>Semifinale: ${(player.stats_semi[18] * pdkWeights[18])}</p>`;
        }
        if (what_day_is_it >= 5) {
            const td3_meme_tot_temp = player.stats_td3[11] * td3Weights[11] + player.stats_td3[12] * td3Weights[12];
            cardHtml += `<p>Tiro da 3: ${td3_meme_tot_temp}</p>`;
        }
        if (what_day_is_it >= 6) {
            cardHtml += `<p>Finale: ${(player.stats_final[18] * pdkWeights[18])}</p>`;
        }

        cardHtml += `<p class="total_memes">PUNTI MEME:<br><span class="total">${player.meme_tot}</span></p>`;

        card.innerHTML = cardHtml;
        playerCardsContainer.appendChild(card);
    });
});
