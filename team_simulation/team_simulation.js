// Importa l'array di giocatori dal modulo esterno
import { players25 } from '../data250721_2306.js';
const players=players25; // messo questo, da updeateare ogni anno ma sticazzi

// Variabili globali per tenere traccia dei giocatori selezionati e dei crediti totali
let selectedPlayers = [];
let totalCost = 0;
const maxCredits = 30; // Massimo credito disponibile per il team

// Funzione per aggiungere un giocatore al team
function addPlayer(player) {
    // Verifica se il numero di giocatori selezionati ha raggiunto il limite di 5
    if (selectedPlayers.length >= 5) {
        alert("Hai già selezionato il numero massimo di giocatori.");
        return;
    }

    // Verifica se il giocatore è già presente nel team
    if (selectedPlayers.some(p => p.name === player.name)) {
        alert("Questo giocatore è già stato selezionato.");
        return;
    }

    // Verifica se il totale dei crediti supera il limite
    if (totalCost + player.cost > maxCredits) {
        alert("Non hai abbastanza crediti per selezionare questo giocatore.");
        return;
    }

    // Aggiungi il giocatore al team
    selectedPlayers.push(player);
    totalCost += player.cost;

    // Aggiorna l'interfaccia del team
    renderTeam();
    updateCreditsCounter();
}

// Funzione per rimuovere un giocatore dal team
function removePlayer(index) {
    const removedPlayer = selectedPlayers.splice(index, 1)[0];
    totalCost -= removedPlayer.cost;

    // Aggiorna l'interfaccia del team
    renderTeam();
    updateCreditsCounter();
}

// Funzione per aggiornare l'interfaccia del team
function renderTeam() {
    const teamContainer = document.getElementById('teamContainer');
    teamContainer.innerHTML = '';

    const validMessage = document.getElementById('validMessage');
    const signupLink = document.getElementById('signupLink');
    const textb4link = document.getElementById('textb4link');
    const messageContainer = document.getElementById('messageContainerLink');

    if (selectedPlayers.length === 0) {
        teamContainer.innerHTML = '<p><em>Team vuoto</em></p>';
        if (validMessage) {
            validMessage.remove();
        }
        if (signupLink) {
            signupLink.remove();
        }
        if (textb4link) {
            textb4link.remove();
        }
        if (messageContainer) {
            messageContainer.remove();
        }
    } else {
        if (selectedPlayers.length === 5) {
            if (!validMessage) {
                const newValidMessage = document.createElement('p');
                newValidMessage.textContent = 'VALIDO';
                newValidMessage.classList.add('highlighted-text');
                newValidMessage.classList.add('valid-message');
                // newValidMessage.style.color = 'green';
                newValidMessage.style.fontWeight = 'bold';
                newValidMessage.id = 'validMessage';
                teamContainer.parentNode.insertBefore(newValidMessage, teamContainer);

                // // commented to separate link and "ricordateli bene, poi"
                // const newSignupLink = document.createElement('a');
                // newSignupLink.href = "https://docs.google.com/forms/d/e/1FAIpQLSe3fKik12LNEV4ZggWzvRN1ueC6tBCAwZVzjOINZ7etyKp91A/viewform?usp=header";
                // newSignupLink.target = "_blank";
                // newSignupLink.textContent = "ricordateli bene, poi iscrivi la squadra";
                // newSignupLink.id = 'signupLink';
                // newSignupLink.classList.add('highlighted-text');
                // newSignupLink.classList.add('registrationlink');  // Aggiunge la classe registrationlink
                
                // newValidMessage.parentNode.insertBefore(newSignupLink, newValidMessage.nextSibling);


                 // Create container for the message
                const messageContainerLink = document.createElement('p');
                messageContainerLink.classList.add('highlighted-text');
                messageContainerLink.id = 'messageContainerLink';

                // Add plain text
                // const plainTextB4link = document.createTextNode('Non hai ancora registrato la squadra. <span class="orange_text">Ricordati</span> i giocatori selezionati e ');
                const textb4link = document.createElement('span');
                textb4link.id = 'textb4link';
                textb4link.innerHTML = 'Non hai ancora registrato la squadra. <span class="orange_text">Ricordati</span> i giocatori selezionati e ';
                // messageContainerLink.innerHTML = 'Non hai ancora registrato la squadra. <span class="orange_text">Ricordati</span> i giocatori selezionati e ';
                // Create the link
                const signupLink = document.createElement('a');
                signupLink.classList.add('registrationlink');
                signupLink.href = "https://docs.google.com/forms/d/e/1FAIpQLSe3fKik12LNEV4ZggWzvRN1ueC6tBCAwZVzjOINZ7etyKp91A/viewform?usp=header";
                signupLink.target = "_blank";
                signupLink.textContent = 'compila il modulo di iscrizione';
                signupLink.id = 'signupLink';

                // Append text and link to the container
                // messageContainerLink.appendChild(plainTextB4link);
                messageContainerLink.appendChild(textb4link);
                messageContainerLink.appendChild(signupLink);

                // Insert the container after the valid message
                newValidMessage.parentNode.insertBefore(messageContainerLink, newValidMessage.nextSibling);
            }
        } else {
            if (validMessage) {
                validMessage.remove();
            }
            if (signupLink) {
                signupLink.remove();
            }
            if (textb4link) {
                textb4link.remove();
            }
            if (messageContainer) {
                messageContainer.remove();
            }
        }

        selectedPlayers.forEach((player, index) => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card1', `cardclass${player.team}`);
            playerCard.innerHTML = `
                <p><b>${player.name}</b></p>
               
                <p><b>${player.team}</b> &emsp; <b>$${player.cost}</b></p>
            `;
            // Aggiungi un evento per rimuovere il giocatore cliccando sulla card
            playerCard.addEventListener('click', () => removePlayer(index));
            teamContainer.appendChild(playerCard);
        });
    }
}



// Funzione per aggiornare i crediti rimanenti
function updateCreditsCounter() {
    const creditsCounter = document.getElementById('creditsCounter');
    creditsCounter.textContent = `Hai ancora: ${maxCredits - totalCost}$`;
}

// // Funzione per popolare la lista dei giocatori disponibili, ORDINATI SOLO PER PREZZO E NON TEAM
// function populatePlayersList() {
//     const playersContainer = document.getElementById('playersContainer');
//     playersContainer.innerHTML = '';

//     // Sort players by cost descending before displaying
//     players
//     .slice() // Make a shallow copy, so you don't modify original "players"
//     .sort((a, b) => b.cost - a.cost) // Sort descending by cost
//     .forEach((player) => {
//         const playerCard = document.createElement('div');
//         playerCard.classList.add('player-card1', `cardclass${player.team}`);
//         playerCard.innerHTML = `
//             <p>${player.name}</p>
//             <p>${player.team} &emsp; $${player.cost}</p>
//         `;
//         playerCard.addEventListener('click', () => addPlayer(player));
//         playersContainer.appendChild(playerCard);
//     });


//     // Aggiungi l'elemento per i crediti rimanenti
//     const creditsCounter = document.createElement('p');
//     creditsCounter.id = 'creditsCounter';
//     creditsCounter.textContent = `Hai ancora: ${maxCredits}$`;
//     playersContainer.parentNode.insertBefore(creditsCounter, playersContainer.nextSibling);
// }

// Funzione per popolare la lista dei giocatori disponibili, ORDINATI SOLO PER TEAM E POI PREZZO
function populatePlayersList() {
    const playersContainer = document.getElementById('playersContainer');
    playersContainer.innerHTML = '';

    // Group players by team
    const teams = ['NORD', 'WEST', 'EST', 'SUD']; // Adjust if you have other team names
    teams.forEach((teamName) => {
        // Filter players belonging to the current team
        const playersOfTeam = players
            .filter(player => player.team === teamName)
            .sort((a, b) => b.cost - a.cost); // Sort descending by cost inside the team

        // Now display players of this team
        playersOfTeam.forEach((player) => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card1', `cardclass${player.team}`);
            playerCard.innerHTML = `
                <p><b>${player.name}</b></p>
                <p><b>${player.team}</b> &emsp; <b>$${player.cost}</b></p>
            `;
            playerCard.addEventListener('click', () => addPlayer(player));
            playersContainer.appendChild(playerCard);
        });
    });

    const creditsCounter = document.createElement('p');
    creditsCounter.id = 'creditsCounter';
    creditsCounter.classList.add('highlighted-text')
    creditsCounter.textContent = `Hai ancora: ${maxCredits}$`;
    playersContainer.parentNode.insertBefore(creditsCounter, playersContainer.nextSibling);
}


// Inizializza la pagina
window.onload = () => {
    populatePlayersList();
};






// // Importa l'array di giocatori dal modulo esterno

// // Variabili globali per tenere traccia dei giocatori selezionati e dei crediti totali
// let selectedPlayers = [];
// let totalCost = 0;
// const maxCredits = 30; // Massimo credito disponibile per il team

// // Funzione per aggiungere un giocatore al team
// function addPlayer(player) {
//     // Verifica se il numero di giocatori selezionati ha raggiunto il limite di 5
//     if (selectedPlayers.length >= 5) {
//         alert("Hai già selezionato il numero massimo di giocatori.");
//         return;
//     }

//     // Verifica se il giocatore è già presente nel team
//     if (selectedPlayers.some(p => p.name === player.name)) {
//         alert("Questo giocatore è già stato selezionato.");
//         return;
//     }

//     // Verifica se il totale dei crediti supera il limite
//     if (totalCost + player.cost > maxCredits) {
//         alert("Non hai abbastanza crediti per selezionare questo giocatore.");
//         return;
//     }

//     // Aggiungi il giocatore al team
//     selectedPlayers.push(player);
//     totalCost += player.cost;

//     // Aggiorna l'interfaccia del team
//     renderTeam();
// }

// // Funzione per rimuovere un giocatore dal team
// function removePlayer(index) {
//     const removedPlayer = selectedPlayers.splice(index, 1)[0];
//     totalCost -= removedPlayer.cost;

//     // Aggiorna l'interfaccia del team
//     renderTeam();
// }

// // Funzione per aggiornare l'interfaccia del team
// function renderTeam() {
//     const teamContainer = document.getElementById('teamContainer');
//     teamContainer.innerHTML = '';

//     const validMessage = document.getElementById('validMessage');
//     const signupLink = document.getElementById('signupLink');

//     if (selectedPlayers.length === 0) {
//         teamContainer.innerHTML = '<p><em>Team vuoto</em></p>';
//         if (validMessage) {
//             validMessage.remove();
//         }
//         if (signupLink) {
//             signupLink.remove();
//         }
//     } else {
//         if (selectedPlayers.length === 5) {
//             if (!validMessage) {
//                 const newValidMessage = document.createElement('p');
//                 newValidMessage.textContent = 'VALIDO';
//                 newValidMessage.classList.add('valid-message');
//                 newValidMessage.style.color = 'green';
//                 newValidMessage.style.fontWeight = 'bold';
//                 newValidMessage.id = 'validMessage';
//                 teamContainer.parentNode.insertBefore(newValidMessage, teamContainer);

//                 const newSignupLink = document.createElement('a');
//                 newSignupLink.href = "https://docs.google.com/forms/d/e/1FAIpQLSe3fKik12LNEV4ZggWzvRN1ueC6tBCAwZVzjOINZ7etyKp91A/viewform?usp=header";
//                 newSignupLink.target = "_blank";
//                 newSignupLink.textContent = "iscrivi la squadra";
//                 newSignupLink.id = 'signupLink';
//                 newSignupLink.classList.add('registrationlink');  // Aggiunge la classe registrationlink
//                 newValidMessage.parentNode.insertBefore(newSignupLink, newValidMessage.nextSibling);
//             }
//         } else {
//             if (validMessage) {
//                 validMessage.remove();
//             }
//             if (signupLink) {
//                 signupLink.remove();
//             }
//         }

//         selectedPlayers.forEach((player, index) => {
//             const playerCard = document.createElement('div');
//             playerCard.classList.add('player-card1',`cardclass${player.team}`);
//             playerCard.innerHTML = `
//                 <p>${player.name}</p>
//                 <p>$${player.cost}</p>
//                 <p>${player.team}</p>
//             `;
//             // Aggiungi un evento per rimuovere il giocatore cliccando sulla card
//             playerCard.addEventListener('click', () => removePlayer(index));
//             teamContainer.appendChild(playerCard);
//         });
//     }
// }

// // Funzione per popolare la lista dei giocatori disponibili
// function populatePlayersList() {
//     const playersContainer = document.getElementById('playersContainer');
//     playersContainer.innerHTML = '';

//     players.forEach((player) => {
//         const playerCard = document.createElement('div');
//         playerCard.classList.add('player-card1',`cardclass${player.team}`);
//         playerCard.innerHTML = `
//             <p>${player.name}</p>
//             <p>$${player.cost}</p>
//             <p>${player.team}</p>
//         `;
//         // Aggiungi un evento per aggiungere il giocatore cliccando sulla card
//         playerCard.addEventListener('click', () => addPlayer(player));
//         playersContainer.appendChild(playerCard);
//     });
// }

// // Inizializza la pagina
// window.onload = () => {
//     populatePlayersList();
// };
