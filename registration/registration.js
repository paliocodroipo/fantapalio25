import { players } from '../data250721_2306.js';
console.log("inizio registration.js");

// Group players by their team
const teams = {
    NORD: [],
    WEST: [],
    EST: [],
    SUD: []
};

players.forEach(player => {
    const teamName = player.team.toUpperCase();
    if (teams[teamName]) {
        teams[teamName].push(player);
    }
});

// Helper to create a table for one team
function createTable(teamName, playerList) {

    // Sort players by cost descending
    playerList.sort((a, b) => b.cost - a.cost);

    const table = document.createElement('table');
    
    table.className = `boxscore-table${teamName} fixed-column-table`;


    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');

    const nameHeader = document.createElement('th');
    nameHeader.textContent = "Giocatore";
    const costHeader = document.createElement('th');
    costHeader.textContent = "Costo";

    headRow.appendChild(nameHeader);
    headRow.appendChild(costHeader);
    thead.appendChild(headRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    playerList.forEach(player => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = player.name;

        const costCell = document.createElement('td');
        costCell.textContent = player.cost;

        row.appendChild(nameCell);
        row.appendChild(costCell);

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    return table;
}

// Insert all tables into the container
const container = document.getElementById('tables-container');

for (const team in teams) {
    const title = document.createElement('h2');
    title.textContent = team;
    container.appendChild(title);

    const registration_teamTable = createTable(team, teams[team]);
    container.appendChild(registration_teamTable);
}
