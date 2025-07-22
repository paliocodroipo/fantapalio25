// Importa player_type e players dal modulo data.js
import { player_type, players, td3Weights, players24, players25, what_day_is_it, team_not_in_final_1, team_not_in_final_2 } from '../data250721_2306.js';
console.log("inizio boxscore js"); // inizio




// qui c'è una funzione per ogni giornata, uguale eccetto i dati stats che usa il suffisso diverso
// quella del td3 è un po diversa ma ci sta
// g1, g2, g3, semi, final, medie, totals, td3




// Funzione per popolare la tabella per un team specifico
function populateTable_g1(team, players) {
    const tableBody = document.getElementById(`tableBodyG1${team}`);

    // Intestazione dei parametri da mostrare nella tabella
    // const headers = [
    //     "Giocatore", "PTS", "REB", "DREB", "OREB", "AST", "STL", "BLK", "TO", "2PM", "2PA", "2P%", 
    //     "3PM", "3PA", "3P%", "FTM", "FTA", "FT%", "EXP","Meme","TOT"
    // ];
       const headers = [
        "Giocatore", "TOT", "PTS", "REB", "AST", "STL", "BLK","Meme", "TO","OREB","DREB", "2PM", "2PA", "2P%", 
        "3PM", "3PA", "3P%", "FTM", "FTA", "FT%", "EXP"
    ];

    // Aggiungi la prima riga con gli header alla tabella
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    }); //
    headerRow += '</tr>';
    tableBody.innerHTML = headerRow;
    let iheader=0;

    // Funzione per calcolare la percentuale in modo sicuro
    function calculatePercentage(numerator, denominator) {
        if (denominator === 0) {
            return "0%";
        }
        return ((numerator / denominator) * 100).toFixed(1) + "%";
    }

    // Popola le righe della tabella con i dati dei giocatori del team specificato
    players.forEach(player => {
        if (player.team === team) {
            let playerRow = '<tr>';
            playerRow += `<td>${player.name}</td>`; // "giocatore"
            playerRow += `<td><strong>${player.g1}</strong></td>`; // "TOT"
            playerRow += `<td>${player.stats_g1[0]}</td>`; // "PTS"
            playerRow += `<td>${player.stats_g1[9]}</td>`; // "REB"
            playerRow += `<td>${player.stats_g1[10]}</td>`; // "AST"
            playerRow += `<td>${player.stats_g1[12]}</td>`; // "STL"
            playerRow += `<td>${player.stats_g1[13]}</td>`; // "BLK"
            playerRow += `<td>${player.stats_g1[18]}</td>`; // "Meme"
            playerRow += `<td>${player.stats_g1[11]}</td>`; // "TO"
            playerRow += `<td>${player.stats_g1[8]}</td>`; // "OREB"
            playerRow += `<td>${player.stats_g1[7]}</td>`; // "DREB"
            playerRow += `<td>${player.stats_g1[1]}</td>`; // "2PM"
            playerRow += `<td>${player.stats_g1[1] + player.stats_g1[2]}</td>`; // "2PA"
            playerRow += `<td>${calculatePercentage(player.stats_g1[1], player.stats_g1[1] + player.stats_g1[2])}</td>`; // "2P%"
            playerRow += `<td>${player.stats_g1[3]}</td>`; // "3PM"
            playerRow += `<td>${player.stats_g1[3] + player.stats_g1[4]}</td>`;// "3PA"
            playerRow += `<td>${calculatePercentage(player.stats_g1[3], player.stats_g1[3] + player.stats_g1[4])}</td>`; // "3P%"
            playerRow += `<td>${player.stats_g1[5]}</td>`; // "FTM"
            playerRow += `<td>${player.stats_g1[5] + player.stats_g1[6]}</td>`; // "FTA"
            playerRow += `<td>${calculatePercentage(player.stats_g1[5], player.stats_g1[5] + player.stats_g1[6])}</td>`; // "FT%"
            playerRow += `<td>${player.stats_g1[14]}</td>`; // "EXP"


            // playerRow += `<td>${player.name}</td>`; // "giocatore"
            // playerRow += `<td>${player.stats_g1[0]}</td>`; // "PTS"
            // playerRow += `<td>${player.stats_g1[9]}</td>`; // "REB"
            // playerRow += `<td>${player.stats_g1[7]}</td>`; // "DREB"
            // playerRow += `<td>${player.stats_g1[8]}</td>`; // "OREB"
            // playerRow += `<td>${player.stats_g1[10]}</td>`; // "AST"
            // playerRow += `<td>${player.stats_g1[12]}</td>`; // "STL"
            // playerRow += `<td>${player.stats_g1[13]}</td>`; // "BLK"
            // playerRow += `<td>${player.stats_g1[11]}</td>`; // "TO"
            // playerRow += `<td>${player.stats_g1[1]}</td>`; // "2PM"
            // playerRow += `<td>${player.stats_g1[1] + player.stats_g1[2]}</td>`; // "2PA"
            // playerRow += `<td>${calculatePercentage(player.stats_g1[1], player.stats_g1[1] + player.stats_g1[2])}</td>`; // "2P%"
            // playerRow += `<td>${player.stats_g1[3]}</td>`; // "3PM"
            // playerRow += `<td>${player.stats_g1[3] + player.stats_g1[4]}</td>`;// "3PA"
            // playerRow += `<td>${calculatePercentage(player.stats_g1[3], player.stats_g1[3] + player.stats_g1[4])}</td>`; // "3P%"
            // playerRow += `<td>${player.stats_g1[5]}</td>`; // "FTM"
            // playerRow += `<td>${player.stats_g1[5] + player.stats_g1[6]}</td>`; // "FTA"
            // playerRow += `<td>${calculatePercentage(player.stats_g1[5], player.stats_g1[5] + player.stats_g1[6])}</td>`; // "FT%"
            // playerRow += `<td>${player.stats_g1[14]}</td>`; // "EXP"
            // playerRow += `<td>${player.stats_g1[18]}</td>`; // "Meme"
            // playerRow += `<td><strong>${player.g1}</strong></td>`; // "TOT"
            
            playerRow += '</tr>';
            
            tableBody.innerHTML += playerRow;
            iheader++;
            if(iheader==10){
                tableBody.innerHTML += headerRow;
            }
        }
    });
    // tableBody.innerHTML += headerRow;
}


// Funzione per popolare la tabella per un team specifico
function populateTable_g2(team, players) {
    const tableBody = document.getElementById(`tableBodyG2${team}`);

    // Intestazione dei parametri da mostrare nella tabella
    const headers = [
        "Giocatore", "TOT", "PTS", "REB", "AST", "STL", "BLK","Meme", "TO","OREB","DREB", "2PM", "2PA", "2P%", 
        "3PM", "3PA", "3P%", "FTM", "FTA", "FT%", "EXP"
    ];

    // Aggiungi la prima riga con gli header alla tabella
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += '</tr>';
    tableBody.innerHTML = headerRow;
    let iheader=0;

    // Funzione per calcolare la percentuale in modo sicuro
    function calculatePercentage(numerator, denominator) {
        if (denominator === 0) {
            return "0%";
        }
        return ((numerator / denominator) * 100).toFixed(1) + "%";
    }

    // Popola le righe della tabella con i dati dei giocatori del team specificato
    players.forEach(player => {
        if (player.team === team) {
            let playerRow = '<tr>';

            playerRow += `<td>${player.name}</td>`; // "giocatore"
            playerRow += `<td><strong>${player.g2}</strong></td>`; // "TOT"
            playerRow += `<td>${player.stats_g2[0]}</td>`; // "PTS"
            playerRow += `<td>${player.stats_g2[9]}</td>`; // "REB"
            playerRow += `<td>${player.stats_g2[10]}</td>`; // "AST"
            playerRow += `<td>${player.stats_g2[12]}</td>`; // "STL"
            playerRow += `<td>${player.stats_g2[13]}</td>`; // "BLK"
            playerRow += `<td>${player.stats_g2[18]}</td>`; // "Meme"
            playerRow += `<td>${player.stats_g2[11]}</td>`; // "TO"
            playerRow += `<td>${player.stats_g2[8]}</td>`; // "OREB"
            playerRow += `<td>${player.stats_g2[7]}</td>`; // "DREB"
            playerRow += `<td>${player.stats_g2[1]}</td>`; // "2PM"
            playerRow += `<td>${player.stats_g2[1] + player.stats_g2[2]}</td>`; // "2PA"
            playerRow += `<td>${calculatePercentage(player.stats_g2[1], player.stats_g2[1] + player.stats_g2[2])}</td>`; // "2P%"
            playerRow += `<td>${player.stats_g2[3]}</td>`; // "3PM"
            playerRow += `<td>${player.stats_g2[3] + player.stats_g2[4]}</td>`;// "3PA"
            playerRow += `<td>${calculatePercentage(player.stats_g2[3], player.stats_g2[3] + player.stats_g2[4])}</td>`; // "3P%"
            playerRow += `<td>${player.stats_g2[5]}</td>`; // "FTM"
            playerRow += `<td>${player.stats_g2[5] + player.stats_g2[6]}</td>`; // "FTA"
            playerRow += `<td>${calculatePercentage(player.stats_g2[5], player.stats_g2[5] + player.stats_g2[6])}</td>`; // "FT%"
            playerRow += `<td>${player.stats_g2[14]}</td>`; // "EXP"

            playerRow += '</tr>';
            tableBody.innerHTML += playerRow;
            iheader++;
            if(iheader==10){
                tableBody.innerHTML += headerRow;
            }
        }
    });
    // tableBody.innerHTML += headerRow;
}

// Funzione per popolare la tabella per un team specifico
function populateTable_g3(team, players) {
    const tableBody = document.getElementById(`tableBodyG3${team}`);

    // Intestazione dei parametri da mostrare nella tabella
    const headers = [
        "Giocatore", "TOT", "PTS", "REB", "AST", "STL", "BLK","Meme", "TO","OREB","DREB", "2PM", "2PA", "2P%", 
        "3PM", "3PA", "3P%", "FTM", "FTA", "FT%", "EXP"
    ];

    // Aggiungi la prima riga con gli header alla tabella
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += '</tr>';
    tableBody.innerHTML = headerRow;
    let iheader=0;

    // Funzione per calcolare la percentuale in modo sicuro
    function calculatePercentage(numerator, denominator) {
        if (denominator === 0) {
            return "0%";
        }
        return ((numerator / denominator) * 100).toFixed(1) + "%";
    }

    // Popola le righe della tabella con i dati dei giocatori del team specificato
    players.forEach(player => {
        if (player.team === team) {
            let playerRow = '<tr>';
           
            playerRow += `<td>${player.name}</td>`; // "giocatore"
            playerRow += `<td><strong>${player.g3}</strong></td>`; // "TOT"
            playerRow += `<td>${player.stats_g3[0]}</td>`; // "PTS"
            playerRow += `<td>${player.stats_g3[9]}</td>`; // "REB"
            playerRow += `<td>${player.stats_g3[10]}</td>`; // "AST"
            playerRow += `<td>${player.stats_g3[12]}</td>`; // "STL"
            playerRow += `<td>${player.stats_g3[13]}</td>`; // "BLK"
            playerRow += `<td>${player.stats_g3[18]}</td>`; // "Meme"
            playerRow += `<td>${player.stats_g3[11]}</td>`; // "TO"
            playerRow += `<td>${player.stats_g3[8]}</td>`; // "OREB"
            playerRow += `<td>${player.stats_g3[7]}</td>`; // "DREB"
            playerRow += `<td>${player.stats_g3[1]}</td>`; // "2PM"
            playerRow += `<td>${player.stats_g3[1] + player.stats_g3[2]}</td>`; // "2PA"
            playerRow += `<td>${calculatePercentage(player.stats_g3[1], player.stats_g3[1] + player.stats_g3[2])}</td>`; // "2P%"
            playerRow += `<td>${player.stats_g3[3]}</td>`; // "3PM"
            playerRow += `<td>${player.stats_g3[3] + player.stats_g3[4]}</td>`;// "3PA"
            playerRow += `<td>${calculatePercentage(player.stats_g3[3], player.stats_g3[3] + player.stats_g3[4])}</td>`; // "3P%"
            playerRow += `<td>${player.stats_g3[5]}</td>`; // "FTM"
            playerRow += `<td>${player.stats_g3[5] + player.stats_g3[6]}</td>`; // "FTA"
            playerRow += `<td>${calculatePercentage(player.stats_g3[5], player.stats_g3[5] + player.stats_g3[6])}</td>`; // "FT%"
            playerRow += `<td>${player.stats_g3[14]}</td>`; // "EXP"

            playerRow += '</tr>';
            tableBody.innerHTML += playerRow;
            iheader++;
            if(iheader==10){
                tableBody.innerHTML += headerRow;
            }
        }
    });
    // tableBody.innerHTML += headerRow;
}

// Funzione per popolare la tabella per un team specifico
function populateTable_semi(team, players) {
    const tableBody = document.getElementById(`tableBodySemi${team}`);

    // Intestazione dei parametri da mostrare nella tabella
    const headers = [
        "Giocatore", "TOT", "PTS", "REB", "AST", "STL", "BLK","Meme", "TO","OREB","DREB", "2PM", "2PA", "2P%", 
        "3PM", "3PA", "3P%", "FTM", "FTA", "FT%", "EXP"
    ];

    // Aggiungi la prima riga con gli header alla tabella
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += '</tr>';
    tableBody.innerHTML = headerRow;
    let iheader=0;

    // Funzione per calcolare la percentuale in modo sicuro
    function calculatePercentage(numerator, denominator) {
        if (denominator === 0) {
            return "0%";
        }
        return ((numerator / denominator) * 100).toFixed(1) + "%";
    }

    // Popola le righe della tabella con i dati dei giocatori del team specificato
    players.forEach(player => {
        if (player.team === team) {
            let playerRow = '<tr>';
            
            playerRow += `<td>${player.name}</td>`; // "giocatore"
            playerRow += `<td><strong>${player.semi}</strong></td>`; // "TOT"
            playerRow += `<td>${player.stats_semi[0]}</td>`; // "PTS"
            playerRow += `<td>${player.stats_semi[9]}</td>`; // "REB"
            playerRow += `<td>${player.stats_semi[10]}</td>`; // "AST"
            playerRow += `<td>${player.stats_semi[12]}</td>`; // "STL"
            playerRow += `<td>${player.stats_semi[13]}</td>`; // "BLK"
            playerRow += `<td>${player.stats_semi[18]}</td>`; // "Meme"
            playerRow += `<td>${player.stats_semi[11]}</td>`; // "TO"
            playerRow += `<td>${player.stats_semi[8]}</td>`; // "OREB"
            playerRow += `<td>${player.stats_semi[7]}</td>`; // "DREB"
            playerRow += `<td>${player.stats_semi[1]}</td>`; // "2PM"
            playerRow += `<td>${player.stats_semi[1] + player.stats_semi[2]}</td>`; // "2PA"
            playerRow += `<td>${calculatePercentage(player.stats_semi[1], player.stats_semi[1] + player.stats_semi[2])}</td>`; // "2P%"
            playerRow += `<td>${player.stats_semi[3]}</td>`; // "3PM"
            playerRow += `<td>${player.stats_semi[3] + player.stats_semi[4]}</td>`;// "3PA"
            playerRow += `<td>${calculatePercentage(player.stats_semi[3], player.stats_semi[3] + player.stats_semi[4])}</td>`; // "3P%"
            playerRow += `<td>${player.stats_semi[5]}</td>`; // "FTM"
            playerRow += `<td>${player.stats_semi[5] + player.stats_semi[6]}</td>`; // "FTA"
            playerRow += `<td>${calculatePercentage(player.stats_semi[5], player.stats_semi[5] + player.stats_semi[6])}</td>`; // "FT%"
            playerRow += `<td>${player.stats_semi[14]}</td>`; // "EXP"

            playerRow += '</tr>';
            tableBody.innerHTML += playerRow;
            iheader++;
            if(iheader==10){
                tableBody.innerHTML += headerRow;
            }
        }
    });
    // tableBody.innerHTML += headerRow;
}


// Funzione per popolare la tabella per un team specifico
function populateTable_final(team, players) {
    const tableBody = document.getElementById(`tableBodyFinal${team}`);

    // Intestazione dei parametri da mostrare nella tabella
    const headers = [
        "Giocatore", "TOT", "PTS", "REB", "AST", "STL", "BLK","Meme", "TO","OREB","DREB", "2PM", "2PA", "2P%", 
        "3PM", "3PA", "3P%", "FTM", "FTA", "FT%", "EXP"
    ];

    // Aggiungi la prima riga con gli header alla tabella
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += '</tr>';
    tableBody.innerHTML = headerRow;
    let iheader=0;

    // Funzione per calcolare la percentuale in modo sicuro
    function calculatePercentage(numerator, denominator) {
        if (denominator === 0) {
            return "0%";
        }
        return ((numerator / denominator) * 100).toFixed(1) + "%";
    }

    // Popola le righe della tabella con i dati dei giocatori del team specificato
    players.forEach(player => {
        if (player.team === team) {
            let playerRow = '<tr>';
            
                                                                        playerRow += `<td>${player.name}</td>`; // "giocatore"
                                                                        playerRow += `<td><strong>${player.final}</strong></td>`; // "TOT"
                                                                        playerRow += `<td>${player.stats_final[0]}</td>`; // "PTS"
                                                                        playerRow += `<td>${player.stats_final[9]}</td>`; // "REB"
                                                                        playerRow += `<td>${player.stats_final[10]}</td>`; // "AST"
                                                                        playerRow += `<td>${player.stats_final[12]}</td>`; // "STL"
                                                                        playerRow += `<td>${player.stats_final[13]}</td>`; // "BLK"
                                                                        playerRow += `<td>${player.stats_final[18]}</td>`; // "Meme"
                                                                        playerRow += `<td>${player.stats_final[11]}</td>`; // "TO"
                                                                        playerRow += `<td>${player.stats_final[8]}</td>`; // "OREB"
                                                                        playerRow += `<td>${player.stats_final[7]}</td>`; // "DREB"
                                                                        playerRow += `<td>${player.stats_final[1]}</td>`; // "2PM"
                                                                        playerRow += `<td>${player.stats_final[1] + player.stats_final[2]}</td>`; // "2PA"
                                                                        playerRow += `<td>${calculatePercentage(player.stats_final[1], player.stats_final[1] + player.stats_final[2])}</td>`; // "2P%"
                                                                        playerRow += `<td>${player.stats_final[3]}</td>`; // "3PM"
                                                                        playerRow += `<td>${player.stats_final[3] + player.stats_final[4]}</td>`;// "3PA"
                                                                        playerRow += `<td>${calculatePercentage(player.stats_final[3], player.stats_final[3] + player.stats_final[4])}</td>`; // "3P%"
                                                                        playerRow += `<td>${player.stats_final[5]}</td>`; // "FTM"
                                                                        playerRow += `<td>${player.stats_final[5] + player.stats_final[6]}</td>`; // "FTA"
                                                                        playerRow += `<td>${calculatePercentage(player.stats_final[5], player.stats_final[5] + player.stats_final[6])}</td>`; // "FT%"
                                                                        playerRow += `<td>${player.stats_final[14]}</td>`; // "EXP"

            playerRow += '</tr>';
            tableBody.innerHTML += playerRow;
            iheader++;
            if(iheader==10){
                tableBody.innerHTML += headerRow;
            }
        }
    });
    // tableBody.innerHTML += headerRow;
}

// Funzione per popolare la tabella per un team specifico
function populateTable_avg(team, players, isinfinal) {
    const tableBody = document.getElementById(`tableBodyAvg${team}`);

    // Intestazione dei parametri da mostrare nella tabella
    const headers = [
        "Giocatore", "TOT", "PTS", "REB", "AST", "STL", "BLK","Meme", "TO","OREB","DREB", "2PM", "2PA", "2P%", 
        "3PM", "3PA", "3P%", "FTM", "FTA", "FT%", "EXP"
    ];

    // Aggiungi la prima riga con gli header alla tabella
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += '</tr>';
    tableBody.innerHTML = headerRow;
    let iheader=0;

    // Funzione per calcolare la percentuale in modo sicuro
    function calculatePercentage(numerator, denominator) {
        if (denominator === 0) {
            return "0%";
        }
        return ((numerator / denominator) * 100).toFixed(1) + "%";
    }

    // Popola le righe della tabella con i dati dei giocatori del team specificato, fa le medie (non riesco a usare array per medie mannaggia)
    players.forEach(player => {
        if (player.team === team) {
            // if(team == "NORD" || team == "WEST"){
            if(isinfinal){
                let playerRow = '<tr>';
                playerRow += `<td>${player.name}</td>`;
                playerRow += `<td><strong>${((player.g1 + player.g2 + player.g3 + player.semi + player.final)/ 5).toFixed(1)}</strong></td>`; //TOT
                playerRow += `<td>${((player.stats_g1[0] + player.stats_g2[0] + player.stats_g3[0] + player.stats_semi[0] + player.stats_final[0]) / 5).toFixed(1)}</td>`; //PTS
                playerRow += `<td>${((player.stats_g1[9] + player.stats_g2[9] + player.stats_g3[9] + player.stats_semi[9] + player.stats_final[9]) / 5).toFixed(1)}</td>`; //REB
                playerRow += `<td>${((player.stats_g1[10] + player.stats_g2[10] + player.stats_g3[10] + player.stats_semi[10] + player.stats_final[10]) / 5).toFixed(1)}</td>`; // AST
                playerRow += `<td>${((player.stats_g1[12] + player.stats_g2[12] + player.stats_g3[12] + player.stats_semi[12] + player.stats_final[12]) / 5).toFixed(1)}</td>`; // STL
                playerRow += `<td>${((player.stats_g1[13] + player.stats_g2[13] + player.stats_g3[13] + player.stats_semi[13] + player.stats_final[13]) / 5).toFixed(1)}</td>`; // BLK 
                playerRow += `<td>${((player.stats_g1[18] + player.stats_g2[18] + player.stats_g3[18] + player.stats_semi[18] + player.stats_final[18]) / 5).toFixed(1)}</td>`;  //Meme
                playerRow += `<td>${((player.stats_g1[11] + player.stats_g2[11] + player.stats_g3[11] + player.stats_semi[11] + player.stats_final[11]) / 5).toFixed(1)}</td>`; // TO
                playerRow += `<td>${((player.stats_g1[8] + player.stats_g2[8] + player.stats_g3[8] + player.stats_semi[8] + player.stats_final[8]) / 5).toFixed(1)}</td>`; // OREB
                playerRow += `<td>${((player.stats_g1[7] + player.stats_g2[7] + player.stats_g3[7] + player.stats_semi[7] + player.stats_final[7]) / 5).toFixed(1)}</td>`; // DREB
                playerRow += `<td>${((player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1] + player.stats_final[1]) / 5).toFixed(1)}</td>`; // 2PM
                playerRow += `<td>${(((player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1] + player.stats_final[1]) / 5) + ((player.stats_g1[2] + player.stats_g2[2] + player.stats_g3[2] + player.stats_semi[2] + player.stats_final[2]) / 5)).toFixed(1)}</td>`; // 2PA
                playerRow += `<td>${calculatePercentage(
                    (player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1] + player.stats_final[1]) / 5,
                    ((player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1] + player.stats_final[1]) / 5) + ((player.stats_g1[2] + player.stats_g2[2] + player.stats_g3[2] + player.stats_semi[2] + player.stats_final[2]) / 5) // 2P%
                )}</td>`;
                playerRow += `<td>${((player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3] + player.stats_final[3]) / 5).toFixed(1)}</td>`; // 3PM
                playerRow += `<td>${(((player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3] + player.stats_final[3]) / 5) + ((player.stats_g1[4] + player.stats_g2[4] + player.stats_g3[4] + player.stats_semi[4] + player.stats_final[4]) / 5)).toFixed(1)}</td>`; //3PA
                playerRow += `<td>${calculatePercentage(
                    (player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3] + player.stats_final[3]) / 5,
                    ((player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3] + player.stats_final[3]) / 5) + ((player.stats_g1[4] + player.stats_g2[4] + player.stats_g3[4] + player.stats_semi[4] + player.stats_final[4]) / 5) //3P%
                )}</td>`;
                playerRow += `<td>${((player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5] + player.stats_final[5]) / 5).toFixed(1)}</td>`; //FTM
                playerRow += `<td>${(((player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5] + player.stats_final[5]) / 5) + ((player.stats_g1[6] + player.stats_g2[6] + player.stats_g3[6] + player.stats_semi[6] + player.stats_final[6]) / 5)).toFixed(1)}</td>`; //FTA
                playerRow += `<td>${calculatePercentage(
                    (player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5] + player.stats_final[5]) / 5,
                    ((player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5] + player.stats_final[5]) / 5) + ((player.stats_g1[6] + player.stats_g2[6] + player.stats_g3[6] + player.stats_semi[6] + player.stats_final[6]) / 5) //FT%
                )}</td>`;
                playerRow += `<td>${((player.stats_g1[14] + player.stats_g2[14] + player.stats_g3[14] + player.stats_semi[14] + player.stats_final[14]) / 5).toFixed(1)}</td>`; //EXP
                playerRow += '</tr>';
                tableBody.innerHTML += playerRow;
            }else{ //team = "SUD" o "EST", isinfinal = 0, 
                let playerRow = '<tr>';

                playerRow += `<td>${player.name}</td>`; // NO FINAL STATS COUNTED (THEY ARE ZERO, MEME COULD BE NOT ZERO BUT WOULD NOT BE INGAME MEME)
                playerRow += `<td><strong>${((player.g1 + player.g2 + player.g3 + player.semi)/ 4).toFixed(1)}</strong></td>`; // TOT
                playerRow += `<td>${((player.stats_g1[0] + player.stats_g2[0] + player.stats_g3[0] + player.stats_semi[0]) / 4).toFixed(1)}</td>`; // PTS
                playerRow += `<td>${((player.stats_g1[9] + player.stats_g2[9] + player.stats_g3[9] + player.stats_semi[9]) / 4).toFixed(1)}</td>`; // REB
                playerRow += `<td>${((player.stats_g1[10] + player.stats_g2[10] + player.stats_g3[10] + player.stats_semi[10]) / 4).toFixed(1)}</td>`; // AST
                playerRow += `<td>${((player.stats_g1[12] + player.stats_g2[12] + player.stats_g3[12] + player.stats_semi[12]) / 4).toFixed(1)}</td>`; // STL
                playerRow += `<td>${((player.stats_g1[13] + player.stats_g2[13] + player.stats_g3[13] + player.stats_semi[13]) / 4).toFixed(1)}</td>`; // BLK
                playerRow += `<td>${((player.stats_g1[18] + player.stats_g2[18] + player.stats_g3[18] + player.stats_semi[18]) / 4).toFixed(1)}</td>`; // Meme
                playerRow += `<td>${((player.stats_g1[11] + player.stats_g2[11] + player.stats_g3[11] + player.stats_semi[11]) / 4).toFixed(1)}</td>`; // TO
                playerRow += `<td>${((player.stats_g1[8] + player.stats_g2[8] + player.stats_g3[8] + player.stats_semi[8]) / 4).toFixed(1)}</td>`; // OREB
                playerRow += `<td>${((player.stats_g1[7] + player.stats_g2[7] + player.stats_g3[7] + player.stats_semi[7]) / 4).toFixed(1)}</td>`; // DREB
                playerRow += `<td>${((player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1]) / 4).toFixed(1)}</td>`; // 2PM
                playerRow += `<td>${(((player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1]) / 4) + ((player.stats_g1[2] + player.stats_g2[2] + player.stats_g3[2] + player.stats_semi[2]) / 4)).toFixed(1)}</td>`; // 2PA
                playerRow += `<td>${calculatePercentage(
                    (player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1]) / 4,
                    ((player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1]) / 4) + ((player.stats_g1[2] + player.stats_g2[2] + player.stats_g3[2] + player.stats_semi[2]) / 4) // 2P%
                )}</td>`;
                playerRow += `<td>${((player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3]) / 4).toFixed(1)}</td>`; // 3PM
                playerRow += `<td>${(((player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3]) / 4) + ((player.stats_g1[4] + player.stats_g2[4] + player.stats_g3[4] + player.stats_semi[4]) / 4)).toFixed(1)}</td>`; //3PA
                playerRow += `<td>${calculatePercentage(
                    (player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3]) / 4,
                    ((player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3]) / 4) + ((player.stats_g1[4] + player.stats_g2[4] + player.stats_g3[4] + player.stats_semi[4]) / 4) // 3P%
                )}</td>`;
                playerRow += `<td>${((player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5]) / 4).toFixed(1)}</td>`; // FTM
                playerRow += `<td>${(((player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5]) / 4) + ((player.stats_g1[6] + player.stats_g2[6] + player.stats_g3[6] + player.stats_semi[6]) / 4)).toFixed(1)}</td>`; //FTA
                playerRow += `<td>${calculatePercentage(
                    (player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5]) / 4,
                    ((player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5]) / 4) + ((player.stats_g1[6] + player.stats_g2[6] + player.stats_g3[6] + player.stats_semi[6]) / 4) // FT%
                )}</td>`;
                playerRow += `<td>${((player.stats_g1[14] + player.stats_g2[14] + player.stats_g3[14] + player.stats_semi[14]) / 4).toFixed(1)}</td>`; // EXP
                playerRow += '</tr>';
                tableBody.innerHTML += playerRow;
            }
            iheader++;
            if(iheader==10){
                tableBody.innerHTML += headerRow;
            }
        }
        
        
    });
    // tableBody.innerHTML += headerRow;
}


// Funzione per popolare la tabella per un team specifico
function populateTable_totals(team, players) {
    const tableBody = document.getElementById(`tableBodyTotals${team}`);

    // Intestazione dei parametri da mostrare nella tabella
    const headers = [
        "Giocatore", "TOT", "PTS", "REB", "AST", "STL", "BLK","Meme", "TO","OREB","DREB", "2PM", "2PA", "2P%", 
        "3PM", "3PA", "3P%", "FTM", "FTA", "FT%", "EXP"
    ];

    // Aggiungi la prima riga con gli header alla tabella
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += '</tr>';
    tableBody.innerHTML = headerRow;
    let iheader=0;

    // Funzione per calcolare la percentuale in modo sicuro
    function calculatePercentage(numerator, denominator) {
        if (denominator === 0) {
            return "0%";
        }
        return ((numerator / denominator) * 100).toFixed(1) + "%";
    }

    // Popola le righe della tabella con i dati dei giocatori del team specificato, fa le medie (non riesco a usare array per medie mannaggia)
    players.forEach(player => {
        if (player.team === team) {
            let playerRow = '<tr>';
            playerRow += `<td>${player.name}</td>`;
            playerRow += `<td><strong>${((player.g1 + player.g2 + player.g3 + player.semi + player.final)).toFixed(0)}</strong></td>`; // TOT
            playerRow += `<td>${((player.stats_g1[0] + player.stats_g2[0] + player.stats_g3[0] + player.stats_semi[0] + player.stats_final[0]) ).toFixed(0)}</td>`; // PTS
            playerRow += `<td>${((player.stats_g1[9] + player.stats_g2[9] + player.stats_g3[9] + player.stats_semi[9] + player.stats_final[9]) ).toFixed(0)}</td>`; // REB
            playerRow += `<td>${((player.stats_g1[10] + player.stats_g2[10] + player.stats_g3[10] + player.stats_semi[10] + player.stats_final[10]) ).toFixed(0)}</td>`; // ASS
            playerRow += `<td>${((player.stats_g1[12] + player.stats_g2[12] + player.stats_g3[12] + player.stats_semi[12] + player.stats_final[12]) ).toFixed(0)}</td>`; // STE
            playerRow += `<td>${((player.stats_g1[13] + player.stats_g2[13] + player.stats_g3[13] + player.stats_semi[13] + player.stats_final[13]) ).toFixed(0)}</td>`; // BLK
            playerRow += `<td>${((player.stats_g1[18] + player.stats_g2[18] + player.stats_g3[18] + player.stats_semi[18] + player.stats_final[18]) ).toFixed(0)}</td>`; // MEME
            playerRow += `<td>${((player.stats_g1[11] + player.stats_g2[11] + player.stats_g3[11] + player.stats_semi[11] + player.stats_final[11]) ).toFixed(0)}</td>`; // TO
            playerRow += `<td>${((player.stats_g1[8] + player.stats_g2[8] + player.stats_g3[8] + player.stats_semi[8] + player.stats_final[8]) ).toFixed(0)}</td>`; // OREB
            playerRow += `<td>${((player.stats_g1[7] + player.stats_g2[7] + player.stats_g3[7] + player.stats_semi[7] + player.stats_final[7]) ).toFixed(0)}</td>`; // DREB
            playerRow += `<td>${((player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1] + player.stats_final[1]) ).toFixed(0)}</td>`;
            playerRow += `<td>${(((player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1] + player.stats_final[1]) ) + ((player.stats_g1[2] + player.stats_g2[2] + player.stats_g3[2] + player.stats_semi[2] + player.stats_final[2]) )).toFixed(0)}</td>`;
            playerRow += `<td>${calculatePercentage(
                (player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1] + player.stats_final[1]) ,
                ((player.stats_g1[1] + player.stats_g2[1] + player.stats_g3[1] + player.stats_semi[1] + player.stats_final[1]) ) + ((player.stats_g1[2] + player.stats_g2[2] + player.stats_g3[2] + player.stats_semi[2] + player.stats_final[2]) )
            )}</td>`;
            playerRow += `<td>${((player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3] + player.stats_final[3]) ).toFixed(0)}</td>`;
            playerRow += `<td>${(((player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3] + player.stats_final[3]) ) + ((player.stats_g1[4] + player.stats_g2[4] + player.stats_g3[4] + player.stats_semi[4] + player.stats_final[4]) )).toFixed(0)}</td>`;
            playerRow += `<td>${calculatePercentage(
                (player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3] + player.stats_final[3]) ,
                ((player.stats_g1[3] + player.stats_g2[3] + player.stats_g3[3] + player.stats_semi[3] + player.stats_final[3]) ) + ((player.stats_g1[4] + player.stats_g2[4] + player.stats_g3[4] + player.stats_semi[4] + player.stats_final[4]) )
            )}</td>`;
            playerRow += `<td>${((player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5] + player.stats_final[5]) ).toFixed(0)}</td>`;
            playerRow += `<td>${(((player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5] + player.stats_final[5]) ) + ((player.stats_g1[6] + player.stats_g2[6] + player.stats_g3[6] + player.stats_semi[6] + player.stats_final[6]) )).toFixed(0)}</td>`;
            playerRow += `<td>${calculatePercentage(
                (player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5] + player.stats_final[5]) ,
                ((player.stats_g1[5] + player.stats_g2[5] + player.stats_g3[5] + player.stats_semi[5] + player.stats_final[5]) ) + ((player.stats_g1[6] + player.stats_g2[6] + player.stats_g3[6] + player.stats_semi[6] + player.stats_final[6]) )
            )}</td>`;
            playerRow += `<td>${((player.stats_g1[14] + player.stats_g2[14] + player.stats_g3[14] + player.stats_semi[14] + player.stats_final[14]) ).toFixed(0)}</td>`;
            playerRow += '</tr>';
            tableBody.innerHTML += playerRow;
            iheader++;
            if(iheader==10){
                tableBody.innerHTML += headerRow;
            }
        }
    });
    // tableBody.innerHTML += headerRow;
}


// Funzione per popolare la tabella per un team specifico
function populateTable_td3(team, players) {
    const tableBody = document.getElementById(`tableBodytd3${team}`);

    // Intestazione dei parametri da mostrare nella tabella
    const headers = [
        "Giocatore", "Partecipazione", "1° turno", "2° turno", "3° turno", "4° turno", "Semifinale", "Finale", "0/10 tiri", "Ciabatte", "Altri Meme","TOT"
    ]; //                                                                                           "Posizionamento"

    // Aggiungi la prima riga con gli header alla tabella
    let headerRow = '<tr>';
    headers.forEach(header => {
        headerRow += `<th>${header}</th>`;
    });
    headerRow += '</tr>';
    tableBody.innerHTML = headerRow;
    let iheader=0;


    // Popola le righe della tabella con i dati dei giocatori del team specificato, fa le medie (non riesco a usare array per medie mannaggia)
    players.forEach(player => {
        if (player.team === team) {
            let playerRow = '<tr>';
            //giocatore
            playerRow += `<td>${player.name}</td>`;
            //partecipazione
            if(player.stats_td3[0] == 1){
                playerRow += `<td>${player.stats_td3[0]*td3Weights[0]}</td>`;
            }else{
                playerRow += `<td>${player.stats_td3[1]*td3Weights[1]}</td>`;
            }
            
            //secondo turno
            playerRow += `<td>${player.stats_td3[2]*td3Weights[2]}</td>`;
            //terzo turno
            playerRow += `<td>${player.stats_td3[3]*td3Weights[3]}</td>`;
            //quarto turno
            playerRow += `<td>${player.stats_td3[4]*td3Weights[4]}</td>`;
            //quinto turno
            playerRow += `<td>${player.stats_td3[5]*td3Weights[5]}</td>`;
            //finale 
            playerRow += `<td>${player.stats_td3[6]*td3Weights[6]}</td>`;
            //posizionamento
            if(player.stats_td3[7] == 0 && player.stats_td3[8] == 0 && player.stats_td3[9] == 0){ //non nei primi 3
                playerRow += `<td>${player.stats_td3[9]*td3Weights[9]}</td>`; //zero qui
            }else{
                if (player.stats_td3[7] == 1){
                    playerRow += `<td>3° : ${player.stats_td3[7]*td3Weights[7]}</td>`;//+5
                }else if (player.stats_td3[8] == 1){
                    playerRow += `<td>2° : ${player.stats_td3[8]*td3Weights[8]}</td>`;//+10
                }else{
                    playerRow += `<td>1° : ${player.stats_td3[9]*td3Weights[9]}</td>`;//+20
                }
            }
            //0 su 10
            playerRow += `<td>${player.stats_td3[10]*td3Weights[10]}</td>`;
            //Ciabatte
            playerRow += `<td>${player.stats_td3[11]*td3Weights[11]}</td>`;
            //Altri meme
            playerRow += `<td>${player.stats_td3[12]*td3Weights[12]}</td>`;
            //totale td3
            playerRow += `<td><strong>${player.td3}</strong></td>`;
            tableBody.innerHTML += playerRow;
            iheader++;
            if(iheader==10){
                tableBody.innerHTML += headerRow;
            }
        }
    });
    // tableBody.innerHTML += headerRow;
}




// // 2024 stats:
// // usa players24
// players24.sort((a, b) => (b.tot-b.td3) - (a.tot-a.td3)); // sort without td3 stats
//         populateTable_avg("WEST", players24,1); // third argument is "isinfinal"
//         populateTable_avg("NORD", players24,1);
//         populateTable_avg("EST", players24,0);
//         populateTable_avg("SUD", players24,0);




if (what_day_is_it >= 1){
players.sort((a, b) => b.g1 - a.g1);
    // Chiamata alla funzione per popolare le tabelle per ciascun team
    populateTable_g1("NORD", players);
    // Popola le tabelle per EST, SUD e WEST allo stesso modo
    populateTable_g1("EST", players);
    populateTable_g1("SUD", players);
    populateTable_g1("WEST", players);
}
if (what_day_is_it >= 2){
    players.sort((a, b) => b.g2 - a.g2);
    populateTable_g2("NORD", players);
    populateTable_g2("EST", players);
    populateTable_g2("SUD", players);
    populateTable_g2("WEST", players);
}
if (what_day_is_it >= 3){
    players.sort((a, b) => b.g3 - a.g3);
    populateTable_g3("NORD", players);
    populateTable_g3("EST", players);
    populateTable_g3("SUD", players);
    populateTable_g3("WEST", players);
}
if (what_day_is_it >= 4){
    players.sort((a, b) => b.semi - a.semi);
    populateTable_semi("NORD", players);
    populateTable_semi("EST", players);
    populateTable_semi("SUD", players);
    populateTable_semi("WEST", players);
}
if (what_day_is_it >= 5){
    players.sort((a, b) => b.td3 - a.td3);
    populateTable_td3("WEST", players);
    populateTable_td3("NORD", players);
    populateTable_td3("EST", players);
    populateTable_td3("SUD", players);
}
if (what_day_is_it >= 6){
    players.sort((a, b) => b.final - a.final); 
    populateTable_final("NORD", players);
    populateTable_final("WEST", players);

    players.sort((a, b) => (b.tot-b.td3) - (a.tot-a.td3));
    if(team_not_in_final_1 == "WEST" || team_not_in_final_2 == "WEST") populateTable_avg("WEST", players, 0); // not in final
    else populateTable_avg("WEST", players, 1); // in final
    if(team_not_in_final_1 == "NORD" || team_not_in_final_2 == "NORD") populateTable_avg("NORD", players, 0); // not in final
    else populateTable_avg("NORD", players, 1); // in final
    if(team_not_in_final_1 == "EST" || team_not_in_final_2 == "EST") populateTable_avg("EST", players, 0); // not in final
    else populateTable_avg("EST", players, 1); // in final
    if(team_not_in_final_1 == "SUD" || team_not_in_final_2 == "SUD") populateTable_avg("SUD", players, 0); // not in final
    else populateTable_avg("SUD", players, 1); // in final
    

    players.sort((a, b) => (b.tot-b.td3) - (a.tot-a.td3));
    populateTable_totals("WEST", players);
    populateTable_totals("NORD", players);
    populateTable_totals("EST", players);
    populateTable_totals("SUD", players);
}



