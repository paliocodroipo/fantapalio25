import { fantateams , what_day_is_it} from './data250721_2306.js';

document.addEventListener("DOMContentLoaded", function() {
    const select = document.getElementById("teamDetails");
    const teamCardsContainer = document.getElementById("teamCardsContainer1");

    // Rimuovi eventuali opzioni esistenti
    select.innerHTML = '';

    // Sorta in ordine alfabetico
    fantateams.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });

    // Aggiungi nuove opzioni dal data.js
    fantateams.forEach(team => {
        const opt = document.createElement('option');
        opt.value = team.team_index;
        opt.textContent = team.name;
        select.appendChild(opt);
    });

    // Aggiungi un event listener per l'evento change sulla tendina
    select.addEventListener("change", function() {
        // Ottieni l'indice del team selezionato
        const teamIndex = parseInt(this.value);

        // Trova il team corrispondente nell'array fantateams
        const selectedTeam = fantateams.find(team => team.team_index === teamIndex);

        // Pulisci il contenitore delle carte
        teamCardsContainer.innerHTML = '';

        // Estrai i giocatori dal team e ordina in ordine decrescente in base a player.tot
        const players = [];
        for (let i = 1; i <= 5; i++) {
            players.push(selectedTeam['p' + i]);
        }
        players.sort((a, b) => b.tot - a.tot);

        if (what_day_is_it >= 1) { // team total card solo dopo la prima sera
            // Aggiungi la scheda per i totali del team
            const totalCard = document.createElement('div');
            totalCard.classList.add('team_detail_team-card1','totalteamcard');
            // totalCard.innerHTML = `
            //     <h3>Totale squadra</h3>
            //     <p>Prezzo totale: ${selectedTeam.total_cost}$</p>
            //     <p>G1: <span class="orange_text">${selectedTeam.tot_g1}</span></p>
            //     <p>G2: <span class="orange_text">${selectedTeam.tot_g2}</span></p>
            //     <p>G3: <span class="orange_text">${selectedTeam.tot_g3}</span></p>
            //     <p>Semifinale: <span class="orange_text">${selectedTeam.tot_semi}</span></p>
            //     <p>Tiro da 3: <span class="orange_text">${selectedTeam.tot_td3}</span></p>
            //     <p>Finale: <span class="orange_text">${selectedTeam.tot_final}</span></p>
            //     <p class="total">Totale:<br><span class="totalpointsindex orange_text">${selectedTeam.tot_team}</span></p>
            // `;
            
             let totalHtml = `
                <h3>Totali squadra</h3>
                <p><span class="orange_text">${selectedTeam.team_position_total}°</span> in classifica</p>
            `;
                // <p>Prezzo totale: ${selectedTeam.total_cost}$</p>

            if (what_day_is_it >= 1) {
                totalHtml += `<p>G1: <span class="orange_text">${selectedTeam.tot_g1}</span></p>`;
            }
            if (what_day_is_it >= 2) {
                totalHtml += `<p>G2: <span class="orange_text">${selectedTeam.tot_g2}</span></p>`;
            }
            if (what_day_is_it >= 3) {
                totalHtml += `<p>G3: <span class="orange_text">${selectedTeam.tot_g3}</span></p>`;
            }
            if (what_day_is_it >= 4) {
                totalHtml += `<p>Semifinale: <span class="orange_text">${selectedTeam.tot_semi}</span></p>`;
            }
            if (what_day_is_it >= 5) {
                totalHtml += `<p>Tiro da 3: <span class="orange_text">${selectedTeam.tot_td3}</span></p>`;
            }
            if (what_day_is_it >= 6) {
                totalHtml += `<p>Finale: <span class="orange_text">${selectedTeam.tot_final.toFixed(2)}</span></p>`;
            }
            
            totalHtml += `
                <p class="total">Totale:<br><span class="totalpointsindex orange_text">${selectedTeam.tot_team}</span></p>
            `;

            totalCard.innerHTML = totalHtml;
            totalCard.classList.add('bold-card');
            teamCardsContainer.appendChild(totalCard);
        }   // mette prima card totali

        // Aggiungi le schede per i giocatori p1, p2, p3, p4, p5 del team selezionato
        players.forEach(player => {
            // Crea una nuova scheda
            const card = document.createElement('div');
            card.classList.add('team_detail_team-card1', `cardclass${player.team}`);
            // Usa encodeURIComponent per gestire caratteri speciali nel nome
            // card.innerHTML = `
            //     <h3>${player.name}</a></h3>
            //     <p>#${player.number}</p>
            //     <p>Prezzo: ${player.cost}</p>
            //     <p>G1: ${player.g1}</p>
            //     <p>G2: ${player.g2}</p>
            //     <p>G3: ${player.g3}</p>
            //     <p>Semifinale: ${player.semi}</p>
            //     <p>Tiro da 3: ${player.td3}</p>
            //     <p>Finale: ${player.final}</p>
            //     <p class="total">Totale:<br><span class="totalpointsindex">${player.tot}</span></p>
            // `;
            let html = `<h3>${player.name}</h3>`;

            if (what_day_is_it >= 1) { // quando sappiamo i numeri allora escono (dopo domenica)
                html += `<p>#${player.number}</p>`
            }

            html +=`<p>$${player.cost}</p>`;

            if (what_day_is_it >= 1) {
                html += `<p>G1: ${player.g1}</p>`;
            }
            if (what_day_is_it >= 2) {
                html += `<p>G2: ${player.g2}</p>`;
            }
            if (what_day_is_it >= 3) {
                html += `<p>G3: ${player.g3}</p>`;
            }
            if (what_day_is_it >= 4) {
                html += `<p>Semifinale: ${player.semi}</p>`;
            }
            if (what_day_is_it >= 5) {
                html += `<p>Tiro da 3: ${player.td3}</p>`;
            }
            if (what_day_is_it >= 6) {
                html += `<p>Finale: ${player.final}</p>`;
            }
            if (what_day_is_it >= 1) {
                html += `<p class="total">Totale:<br><span class="totalpointsindex">${player.tot}</span></p>`;
            }
            card.innerHTML = html;
            teamCardsContainer.appendChild(card);
        });

        // Aggiungi la scheda per il rione
        const rioneCard = document.createElement('div');
        rioneCard.classList.add('team_detail_team-card1', `cardclass${selectedTeam.rione.name}`);
        let rioneHtml =  `
            <h3>Rione: ${selectedTeam.rione.name}</h3>
            `
        if (what_day_is_it>=1){
            rioneHtml +=`
                <p>Punti classifica: ${selectedTeam.rione.classifica_bonus}</p>
                <p>Punti coppa chiosco: ${selectedTeam.rione.chiosco_bonus}</p>
                <p class="total">Totale: ${selectedTeam.rione.final_points}</p>
            `;
        }
         
        rioneCard.innerHTML = rioneHtml;
          
        teamCardsContainer.appendChild(rioneCard);

        
    });
});
