import { rioni25 } from '../data250721_2306.js';

window.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.team_detail_team-cards-container1');

    // Sort the rioni25 array in descending order by chiosco_tot
    const sortedRioni = [...rioni25].sort((a, b) => b.chiosco_tot - a.chiosco_tot);

    sortedRioni.forEach(rione => {
        const card = document.createElement('div');
        card.classList.add('team_detail_team-card1', `cardclass${rione.name}`);

        card.innerHTML = `
            <h2>${rione.chiosco_tot}🍺</h2>
            <p>${rione.name}</p>
        `;

        container.appendChild(card);
    });
});
