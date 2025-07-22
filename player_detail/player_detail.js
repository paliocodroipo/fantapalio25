// questo prima fa un po di robe per generare la tendina coi player elencati per rione
// poi genera le cards una per ogni partita con le stats non nulle (calcolando ogni contributo di stats)
// se si cambiano array di stats è da cambiare anche questo codice


import { players, pdkWeights, td3Weights, what_day_is_it, td3_bonus_passadaprimoultimo } from '../data250721_2306.js';

document.addEventListener("DOMContentLoaded", function() {
    const select = document.getElementById("playerDetails");
    const playerStatsContainer = document.getElementById("playerStatsContainer");

    // Raggruppa i giocatori per team e ordina all'interno di ogni gruppo
    const teams = ["WEST", "NORD", "EST", "SUD"];
    const groupedPlayers = teams.map(team => {
        return {
            team: team,
            players: players.filter(player => player.team === team).sort((a, b) => b.cost - a.cost)
        };
    });

    // Rimuovi eventuali opzioni esistenti
    select.innerHTML = '';

    // Aggiungi nuove opzioni
    groupedPlayers.forEach(group => {
        // Aggiungi un gruppo di opzioni per ogni team
        const optGroup = document.createElement('optgroup');
        optGroup.label = group.team;
        group.players.forEach((player, index) => {
            const opt = document.createElement('option');
            opt.value = players.indexOf(player); // Usa l'indice del giocatore nell'array originale
            opt.textContent = player.name;
            optGroup.appendChild(opt);
        });
        select.appendChild(optGroup);
    });

    // Aggiungi un event listener per l'evento change sulla tendina
    select.addEventListener("change", function() {
        // Ottieni l'indice del giocatore selezionato
        const playerIndex = parseInt(this.value);

        // Trova il giocatore corrispondente nell'array players
        const selectedPlayer = players[playerIndex];

        // Pulisci il contenitore delle schede
        playerStatsContainer.innerHTML = '';

        const headerContainer = document.createElement('div');
        headerContainer.classList.add('player-stats-header');


        // Crea e aggiungi l'intestazione con il nome del giocatore
        const playerNameHeader = document.createElement('h3');
        playerNameHeader.innerHTML = `${selectedPlayer.name}
                                        <br>#${selectedPlayer.number} ${selectedPlayer.team}
                                        <br>$${selectedPlayer.cost}
                                        <br>${selectedPlayer.player_position_total}° in classifica`;
        headerContainer.appendChild(playerNameHeader);
        
        // Crea e aggiungi l'intestazione con il totale del giocatore
        const playerTotalHeader = document.createElement('h3');
        playerTotalHeader.innerHTML = `Totale: <span class="totalpointsindex">${selectedPlayer.tot}</span>`;
        headerContainer.appendChild(playerTotalHeader);

        // Aggiungi il contenitore delle intestazioni
        playerStatsContainer.appendChild(headerContainer);

        const formatValue = (value) => (value > 0 ? `+${value}` : value);

        // Funzione per creare una scheda partita
        const createGameCard = (game, score, stats) => {
            const card = document.createElement('div');
            card.classList.add('game-card', `cardclass${selectedPlayer.team}`);
            let statsHtml = `
                <h3>${game}</h3>
                <p>Totale: <span class="totalpointsindex">${score}</span></p>
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
        const createGameCard_td3 = (game, score, stats) => {
            const card = document.createElement('div');
            card.classList.add('game-card', `cardclass${selectedPlayer.team}`);
            let statsHtml = `
                <h3>${game}</h3>
                <p>Totale: <span class="totalpointsindex">${score}</span></p>
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
            // if (stats[2] !== 0) statsHtml += `<p>Passa al 2° turno: <strong>${formatValue(stats[2] * td3Weights[2])}</strong></p>`;
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

        // Aggiungi schede per ogni partita
        // playerStatsContainer.appendChild(createGameCard('G1', selectedPlayer.g1, selectedPlayer.stats_g1));
        // playerStatsContainer.appendChild(createGameCard('G2', selectedPlayer.g2, selectedPlayer.stats_g2));
        // playerStatsContainer.appendChild(createGameCard('G3', selectedPlayer.g3, selectedPlayer.stats_g3));
        // playerStatsContainer.appendChild(createGameCard('Semifinale', selectedPlayer.semi, selectedPlayer.stats_semi));
        // playerStatsContainer.appendChild(createGameCard_td3('Tiro da 3', selectedPlayer.td3, selectedPlayer.stats_td3));
        // playerStatsContainer.appendChild(createGameCard('Finale', selectedPlayer.final, selectedPlayer.stats_final));
        const cardsContainer = document.createElement('div');
        cardsContainer.classList.add('player-stats-cards');

        if(what_day_is_it >= 1) // domenica g1 fatta
            cardsContainer.appendChild(createGameCard('G1', selectedPlayer.g1, selectedPlayer.stats_g1));
        if(what_day_is_it >= 2) // lunedì g2 fatto
            cardsContainer.appendChild(createGameCard('G2', selectedPlayer.g2, selectedPlayer.stats_g2));
        if(what_day_is_it >= 3) // mercoledì g3 fatto
            cardsContainer.appendChild(createGameCard('G3', selectedPlayer.g3, selectedPlayer.stats_g3));
        if(what_day_is_it >= 4) // giovedì semi fatto
            cardsContainer.appendChild(createGameCard('Semifinale', selectedPlayer.semi, selectedPlayer.stats_semi));
        if(what_day_is_it >= 5) // venerdì td3 fatto
            cardsContainer.appendChild(createGameCard_td3('Tiro da 3', selectedPlayer.td3, selectedPlayer.stats_td3));
        if(what_day_is_it >= 6) // sabato finale fatto
            cardsContainer.appendChild(createGameCard('Finale', selectedPlayer.final, selectedPlayer.stats_final));

        playerStatsContainer.appendChild(cardsContainer);
    });
});
