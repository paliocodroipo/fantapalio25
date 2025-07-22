import {
    players,pdkWeights, td3Weights, what_day_is_it, td3_bonus_passadaprimoultimo
} from '../data250721_2306.js';

document.addEventListener('DOMContentLoaded', () => {
    const playerCardsContainer = document.getElementById('playerCardsContainer');
    const sortSelect = document.getElementById('sortSelect');

    const valueToKeyMap = {
        'totale': 'tot',
        'g1': 'g1',
        'g2': 'g2',
        'g3': 'g3',
        'semifinale': 'semi',
        'td3': 'td3',
        'finale': 'final'
    };

    function renderPlayers(sortKey) {

        // start extra

        const formatValue = (value) => (value > 0 ? `+${value}` : value);

        // Funzione per creare una scheda partita
        const createGameCard = (selectedPlayer, score, stats, index) => { // attenzione funzioni leggermente modificate rispetto che in player detail
            const card = document.createElement('div');
            card.classList.add('player-card', `cardclass${selectedPlayer.team}`);
            let statsHtml = `
                <h3>${index + 1}. ${selectedPlayer.name}</h3>
                <p>#${selectedPlayer.number}</p>
                <p>Totale: <span class="totalpointsindex">${score}</span></p><br>
            `;
            
            // Mette dentro solo stats non nulle
            if (stats[0] !== 0) statsHtml += `<p>Punti: <strong>${formatValue(stats[0] * pdkWeights[0])}</strong> (${stats[0]} PTS)</p>`;
            if (stats[7] !== 0) statsHtml += `<p>Rimbalzi difensivi: <strong>${formatValue(stats[7] * pdkWeights[7])}</strong> (${stats[7]} DR)</p>`;
            if (stats[8] !== 0) statsHtml += `<p>Rimbalzi offensivi: <strong>${formatValue(stats[8] * pdkWeights[8])}</strong> (${stats[8]} OR)</p>`;
            if (stats[10] !== 0) statsHtml += `<p>Assist: <strong>${formatValue(stats[10] * pdkWeights[10])}</strong> (${stats[10]} AST)</p>`;
            if (stats[12] !== 0) statsHtml += `<p>Palle recuperate: <strong>${formatValue(stats[12] * pdkWeights[12])}</strong> (${stats[12]} STL)</p>`;
            if (stats[11] !== 0) statsHtml += `<p>Palle perse: <strong>${formatValue(stats[11] * pdkWeights[11])}</strong> (${stats[11]} TO)</p>`;
            if (stats[13] !== 0) statsHtml += `<p>Stoppate: <strong>${formatValue(stats[13] * pdkWeights[13])}</strong> (${stats[13]} BLK)</p>`;
            if (stats[3] !== 0) statsHtml += `<p>Triple segnate: <strong>${formatValue(stats[3] * pdkWeights[3])}</strong> (${stats[3]} 3PM)</p>`;
            if (stats[2] !== 0 || stats[4] !== 0) statsHtml += `<p>Tiri sbagliati: <strong>${formatValue((stats[2] * pdkWeights[2]) + (stats[4] * pdkWeights[4]))}</strong> (${stats[2]+ stats[4]} miss)</p>`;
            if (stats[6] !== 0) statsHtml += `<p>Tiri liberi sbagliati: <strong>${formatValue(stats[6] * pdkWeights[6])}</strong> (${stats[6]} miss)</p>`;
            if (stats[15] !== 0) statsHtml += `<p>Doppia doppia: <strong>${formatValue(stats[15] * pdkWeights[15])}</strong></p>`;
            if (stats[16] !== 0) statsHtml += `<p>Tripla doppia: <strong>${formatValue(stats[16] * pdkWeights[16])}</strong></p>`;
            if (stats[14] !== 0) statsHtml += `<p>Espulsione: <strong>${formatValue(stats[14] * pdkWeights[14])}</strong></p>`;
            if (stats[17] !== 0) statsHtml += `<p>Vittoria: <strong>${formatValue(stats[17] * pdkWeights[17])}</strong></p>`;
            if (stats[18] !== 0) statsHtml += `<p>Punti meme: <strong>${formatValue(stats[18] * pdkWeights[18])}</strong></p>`;

            card.innerHTML = statsHtml;
            return card;
        };

        // Funzione per creare una scheda partita specifica per "Tiro da 3"
        const createGameCard_td3 = (selectedPlayer, score, stats, index) => {
            const card = document.createElement('div');
            card.classList.add('player-card', `cardclass${selectedPlayer.team}`);
            let statsHtml = `
                <h3>${index + 1}. ${selectedPlayer.name}</h3>
                <p>#${selectedPlayer.number}</p>
                <p>Totale: <span class="totalpointsindex">${score}</span></p><br>
            `;

            if (stats[0] !== 0) statsHtml += `<p>Partecipazione: <strong>${formatValue(stats[0] * td3Weights[0])}</strong></p>`;
            if (stats[1] !== 0) statsHtml += `<p>Non partecipa: <strong>${formatValue(stats[1] * td3Weights[1])}</strong></p>`;
            if (stats[2] !== 0 && stats[2] != td3_bonus_passadaprimoultimo) statsHtml += `<p>Passa al 2° turno: <strong>${formatValue(stats[2] * td3Weights[2])}</strong></p>`;
            if (stats[2] !== 0 && stats[2] == td3_bonus_passadaprimoultimo) statsHtml += `<p>Passa al 2° turno: <strong>${formatValue(stats[2] * td3Weights[2])}</strong> (da primo o ultimo classificato)</p>`;
            if (stats[2] !== 0 && stats[3] != td3_bonus_passadaprimoultimo) statsHtml += `<p>Passa al 3° turno: <strong>${formatValue(stats[3] * td3Weights[3])}</strong></p>`;
            if (stats[2] !== 0 && stats[3] == td3_bonus_passadaprimoultimo) statsHtml += `<p>Passa al 3° turno: <strong>${formatValue(stats[3] * td3Weights[3])}</strong> (da primo o ultimo classificato)</p>`;
            if (stats[2] !== 0 && stats[4] != td3_bonus_passadaprimoultimo) statsHtml += `<p>Passa al 4° turno: <strong>${formatValue(stats[4] * td3Weights[4])}</strong></p>`;
            if (stats[2] !== 0 && stats[4] == td3_bonus_passadaprimoultimo) statsHtml += `<p>Passa al 4° turno: <strong>${formatValue(stats[4] * td3Weights[4])}</strong> (da primo o ultimo classificato)</p>`;
            if (stats[2] !== 0 && stats[5] != td3_bonus_passadaprimoultimo) statsHtml += `<p>Arriva in semifinale: <strong>${formatValue(stats[5] * td3Weights[5])}</strong></p>`;
            if (stats[2] !== 0 && stats[5] == td3_bonus_passadaprimoultimo) statsHtml += `<p>Arriva in semifinale: <strong>${formatValue(stats[5] * td3Weights[5])}</strong> (da primo o ultimo classificato)</p>`;
            if (stats[2] !== 0 && stats[6] != td3_bonus_passadaprimoultimo) statsHtml += `<p>Arriva in finale: <strong>${formatValue(stats[6] * td3Weights[6])}</strong></p>`;
            if (stats[2] !== 0 && stats[6] == td3_bonus_passadaprimoultimo) statsHtml += `<p>Arriva in finale: <strong>${formatValue(stats[6] * td3Weights[6])}</strong> (da primo o ultimo classificato)</p>`;
            // if (stats[3] !== 0) statsHtml += `<p>Passa al 3° turno: <strong>${formatValue(stats[3] * td3Weights[3])}</strong></p>`;
            // if (stats[4] !== 0) statsHtml += `<p>Passa al 4° turno: <strong>${formatValue(stats[4] * td3Weights[4])}</strong></p>`;
            // if (stats[5] !== 0) statsHtml += `<p>Arriva in semifinale: <strong>${formatValue(stats[5] * td3Weights[5])}</strong></p>`;
            // if (stats[6] !== 0) statsHtml += `<p>Arriva in finale: <strong>${formatValue(stats[6] * td3Weights[6])}</strong></p>`;
            if (stats[7] !== 0) statsHtml += `<p>Terzo classificato: <strong>${formatValue(stats[7] * td3Weights[7])}</strong></p>`;
            if (stats[8] !== 0) statsHtml += `<p>Secondo classificato: <strong>${formatValue(stats[8] * td3Weights[8])}</strong></p>`;
            if (stats[9] !== 0) statsHtml += `<p>Primo classificato: <strong>${formatValue(stats[9] * td3Weights[9])}</strong></p>`;
            if (stats[10] !== 0) statsHtml += `<p>0 su 10 da 3: <strong>${formatValue(stats[10] * td3Weights[10])}</strong></p>`;
            if (stats[11] !== 0) statsHtml += `<p>Tira in ciabatte: <strong>${formatValue(stats[11] * td3Weights[11])}</strong></p>`;
            if (stats[12] !== 0) statsHtml += `<p>Altri punti meme: <strong>${formatValue(stats[12] * td3Weights[12])}</strong></p>`;

            card.innerHTML = statsHtml;
            return card;
        };

        // end extra


        playerCardsContainer.innerHTML = '';

        // Sort players by selected key
        const sortedPlayers = players.slice().sort((a, b) => {
            const aVal = a[sortKey] ?? 0;
            const bVal = b[sortKey] ?? 0;
            return bVal - aVal;
        });

        // Create player cards
        sortedPlayers.forEach((player, index) => {

            // const card = document.createElement('div');
            // card.classList.add('player-card', `cardclass${player.team}`);

            // card.innerHTML = `
            //     <h3>${index + 1}. ${player.name}</h3>
            //     <p><strong>${player[sortKey] ?? 0}</strong></p>
            // `; // useless

            // extra start
            let game_sortKey = "tot";
            switch (sortKey) {
                case "g1":
                    game_sortKey = "stats_g1";
                    break;
                case "g2":
                    game_sortKey = "stats_g2";
                    break;
                case "g3":
                    game_sortKey = "stats_g3";
                    break;
                case "semi":
                    game_sortKey = "stats_semi";
                    break;
                case "td3":
                    game_sortKey = "stats_td3";
                    break;
                case "final":
                    game_sortKey = "stats_final";
                    break;
                default:
                    game_sortKey = "tot";  // fallback to total score if none matched (in this case game_sortKey won't be used)
                    break;
            }
            console.log(sortKey, game_sortKey);
            if (sortKey != "tot" && sortKey != "td3"){ // creates card with all stats for that game
                const createdCard = createGameCard(player,player[sortKey],player[game_sortKey], index);
                playerCardsContainer.appendChild(createdCard);

            }else if (sortKey == "td3"){
                const createdCard = createGameCard_td3(player,player[sortKey],player[game_sortKey], index);
                playerCardsContainer.appendChild(createdCard);

            }else if (sortKey == "tot"){ // creates card with all games totals only
                const createdCard = document.createElement('div');
                createdCard.classList.add('player-card',`cardclass${player.team}`);
                // createdCard.innerHTML = `
                //     <h3>${index + 1}. ${player.name}</h3>
                //     <p>#${player.number}</p>
                //     <p>Prezzo: ${player.cost}</p>
                //     <p class="total">${player.tot.toFixed(2)}</p>
                //     <p>G1: ${player.g1}</p>
                //     <p>G2: ${player.g2}</p>
                //     <p>G3: ${player.g3}</p>
                //     <p>Semifinale: ${player.semi}</p>
                //     <p>Tiro da 3: ${player.td3}</p>
                //     <p>Finale: ${player.final}</p>
                // `;
                let createdHtml = `
                    <h3>${index + 1}. ${player.name}</h3>
                    <p>#${player.number}</p>
                    <p>$${player.cost}</p>
                    <p class="total">${player.tot.toFixed(2)}</p>
                `;

                if (what_day_is_it >= 1) {
                    createdHtml += `<p>G1: ${player.g1}</p>`;
                }
                if (what_day_is_it >= 2) {
                    createdHtml += `<p>G2: ${player.g2}</p>`;
                }
                if (what_day_is_it >= 3) {
                    createdHtml += `<p>G3: ${player.g3}</p>`;
                }
                if (what_day_is_it >= 4) {
                    createdHtml += `<p>Semifinale: ${player.semi}</p>`;
                }
                if (what_day_is_it >= 5) {
                    createdHtml += `<p>Tiro da 3: ${player.td3}</p>`;
                }
                if (what_day_is_it >= 6) {
                    createdHtml += `<p>Finale: ${player.final}</p>`;
                }

                createdCard.innerHTML = createdHtml;
                
                playerCardsContainer.appendChild(createdCard);

            }
            // extra end

            // playerCardsContainer.appendChild(card);
        });

        

    }

    // Initial render with 'totale'
    renderPlayers('tot');

    // Handle dropdown change
    sortSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const sortKey = valueToKeyMap[selectedValue];
        if (!sortKey) {
            console.error(`Invalid sort key: ${selectedValue}`);
            return;
        }
        renderPlayers(sortKey);
    });
});


// // Old working version with no stats:
// import {
//     players
// } from '../data250721_2306.js';

// document.addEventListener('DOMContentLoaded', () => {
//     const playerCardsContainer = document.getElementById('playerCardsContainer');
//     const sortSelect = document.getElementById('sortSelect');

//     const valueToKeyMap = {
//         'totale': 'tot',
//         'g1': 'g1',
//         'g2': 'g2',
//         'g3': 'g3',
//         'semifinale': 'semi',
//         'td3': 'td3',
//         'finale': 'final'
//     };

//     function renderPlayers(sortKey) {
//         playerCardsContainer.innerHTML = '';

//         // Sort players by selected key
//         const sortedPlayers = players.slice().sort((a, b) => {
//             const aVal = a[sortKey] ?? 0;
//             const bVal = b[sortKey] ?? 0;
//             return bVal - aVal;
//         });

//         // Create player cards
//         sortedPlayers.forEach((player, index) => {

//             const card = document.createElement('div');
//             card.classList.add('player-card', `cardclass${player.team}`);

//             card.innerHTML = `
//                 <p>${index + 1}. ${player.name}<p>
//                 <p><strong>${player[sortKey] ?? 0}</strong></p>
//             `;

//             playerCardsContainer.appendChild(card);
//         });

       

//     }

//     // Initial render with 'totale'
//     renderPlayers('tot');

//     // Handle dropdown change
//     sortSelect.addEventListener('change', (e) => {
//         const selectedValue = e.target.value;
//         const sortKey = valueToKeyMap[selectedValue];
//         if (!sortKey) {
//             console.error(`Invalid sort key: ${selectedValue}`);
//             return;
//         }
//         renderPlayers(sortKey);
//     });
// });

