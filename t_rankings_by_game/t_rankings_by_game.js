import {
    fantateam_type,
    NORD, SUD, EST, WEST,
    fantateams
} from '../data250721_2306.js';

document.addEventListener('DOMContentLoaded', function() {
    const teamCardsContainer = document.getElementById('teamCardsContainer');
    const sortSelect = document.getElementById('sortSelect');

    function renderTeams(sortKey = 'tot_team') {
        // Clear container
        teamCardsContainer.innerHTML = '';

        // Sort teams
        const sortedTeams = [...fantateams].sort((a, b) => b[sortKey] - a[sortKey]);
        console.log(sortedTeams);

        let p_sortKey = "tot";
        switch (sortKey) {
            case "tot_g1":
                p_sortKey = "g1";
                break;
            case "tot_g2":
                p_sortKey = "g2";
                break;
            case "tot_g3":
                p_sortKey = "g3";
                break;
            case "tot_semi":
                p_sortKey = "semi";
                break;
            case "tot_td3":
                p_sortKey = "td3";
                break;
            case "tot_final":
                p_sortKey = "final";
                break;
            default:
                p_sortKey = "tot";  // fallback to total score if none matched
                break;
        }
        

        // Render cards
        sortedTeams.forEach((team, index) => {
            const players = [team.p1, team.p2, team.p3, team.p4, team.p5];
            players.sort((a, b) => b.tot - a.tot);

            const card = document.createElement('div');
            card.classList.add('team-card', `cardclasssoft${team.rione.name}`);

            
            let playerInfoHTML = "";

            // Loop through players and build the HTML string
            players.forEach(player => {
                playerInfoHTML += `<div class="player-info"> ${player.name} (<span class="team_ranking_pdk">${player[p_sortKey]}</span>)</div>`;
            });

            if (index == 0) {
                if (p_sortKey == "tot") {
                    card.innerHTML = `
                        <div class="team-card-header"><span class="big_emoji">👑</span><br>${team.name}</div>
                        <div class="team-card-body">
                            <div class="punteggio-info team_ranking_pdk_tot"><strong>${team[sortKey].toFixed(2)}</strong></div>
                            ${playerInfoHTML}
                            <div>${team.rione.name} (<span class="team_ranking_pdk">${team.rione.final_points}</span>)</div>
                        </div>
                    `;
                }else{
                    card.innerHTML = `
                        <div class="team-card-header"><span class="big_emoji">👑</span><br>${team.name}</div>
                        <div class="team-card-body">
                            <div class="punteggio-info team_ranking_pdk_tot"><strong>${team[sortKey].toFixed(2)}</strong></div>
                            ${playerInfoHTML}
                        </div>
                    `;
                }
            }else{
                if (p_sortKey == "tot"){
                    card.innerHTML = `
                        <div class="team-card-header"><span class="orange_text">${index + 1}.</span> ${team.name}</div>
                        <div class="team-card-body">
                            <div class="punteggio-info team_ranking_pdk_tot"><strong>${team[sortKey].toFixed(2)}</strong></div>
                            ${playerInfoHTML}
                            <div>${team.rione.name} (<span class="team_ranking_pdk">${team.rione.final_points}</span>)</div>
                        </div>
                `;
                }else{
                    card.innerHTML = `
                        <div class="team-card-header"><span class="orange_text">${index + 1}.</span> ${team.name}</div>
                        <div class="team-card-body">
                            <div class="punteggio-info team_ranking_pdk_tot"><strong>${team[sortKey].toFixed(2)}</strong></div>
                            ${playerInfoHTML}
                        </div>
                    `;
                }
            }
            teamCardsContainer.appendChild(card);
        });
    }

    // Initial render
    renderTeams();

    // Change sort on dropdown selection
    sortSelect.addEventListener('change', (e) => {
        const selectedValue = e.target.value;
        const sortKeyMap = {
            'g1': 'tot_g1',
            'g2': 'tot_g2',
            'g3': 'tot_g3',
            'semifinale': 'tot_semi',
            'td3': 'tot_td3',
            'finale': 'tot_final',
            'totale': 'tot_team'
        };
        const sortKey = sortKeyMap[selectedValue];
        if (!sortKey) {
            console.error(`No mapping found for selected value: ${selectedValue}`);
            return;
        }
        renderTeams(sortKey);


        console.log(sortKey);

    });
});
