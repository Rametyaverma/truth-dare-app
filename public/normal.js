// API Endpoints
const TRUTH_API = "https://api.truthordarebot.xyz/v1/truth";
const DARE_API = "https://api.truthordarebot.xyz/api/dare";

// DOM Elements
const heading = document.querySelector('.player-heading');
const truthBtn = document.querySelector(".truth");
const dareBtn = document.querySelector(".dare");
const nextBtn = document.querySelector(".next-player");
const playerList = document.querySelector(".players-list");
const addBtn = document.querySelector(".add-btn");
const countDisplay = document.querySelector(".count");
const toggle = document.getElementById("togglePlayers");
const sliderText = document.getElementById("sliderText");

// Player State
let playerNames = [];
let currentPlayer = 0;

// Initial Setup
function initializePlayers() {
    const inputs = playerList.querySelectorAll('.player-input');
    playerNames = Array.from(inputs).map((input, i) => input.value || `Player ${i + 1}`);
    updateCountDisplay();
    attachInputListeners();
}
initializePlayers();

// Event: Update Heading Text on Input Change
function attachInputListeners() {
    const inputs = playerList.querySelectorAll('.player-input');
    inputs.forEach((input, index) => {
        input.removeEventListener('input', input._listener); // Remove if exists
        input._listener = () => {
            playerNames[index] = input.value || `Player ${index + 1}`;
        };
        input.addEventListener('input', input._listener);
    });
}

// API Functions
async function getTruth() {
    try {
        const res = await axios.get(TRUTH_API);
        return res.data.question;
    } catch (e) {
        console.error("Error fetching truth:", e);
        return "NO TRUTH FOUND";
    }
}

async function getDare() {
    try {
        const res = await axios.get(DARE_API);
        return res.data.question;
    } catch (e) {
        console.error("Error fetching dare:", e);
        return "NO DARE FOUND";
    }
}

// Truth Button Click
truthBtn.addEventListener("click", async () => {
    const truth = await getTruth();
    heading.style.color = "green";
    heading.innerText = `${truth}?`;
});

// Dare Button Click
dareBtn.addEventListener("click", async () => {
    const dare = await getDare();
    heading.style.color = "red";
    heading.innerText = `${dare}?`;
});

// Next Player Button
nextBtn.addEventListener("click", () => {
    if (playerNames.length === 0) return;
    currentPlayer = Math.floor(Math.random() * playerNames.length);
    heading.style.color = "white";
    heading.textContent = `${playerNames[currentPlayer]} Choose`;
});

// Add Player
addBtn.addEventListener("click", () => {
    const count = playerList.querySelectorAll('.player-row').length + 1;
    const playerRow = document.createElement('div');
    playerRow.className = 'player-row';
    playerRow.innerHTML = `
        <input type="text" value="Player ${count}" class="player-input" />
        <button class="delete-btn">×</button>
    `;
    playerList.appendChild(playerRow);
    initializePlayers(); // Reinitialize after adding
});

// Delete Player
playerList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.parentElement.remove();
        initializePlayers(); // Reinitialize after removing
    }
});

// Toggle Switch Logic
function updateToggleLabel() {
    const isOn = toggle.checked;
    sliderText.textContent = isOn ? "On" : "Off";
    sliderText.style.backgroundColor = isOn ? "#10b981" : "#ccc";

    if (isOn) {
        const count = playerNames.length;
        sliderText.style.textAlign="left";
        sliderText.style.paddingLeft="5px";
        if (count > 0) {
            const rand = Math.floor(Math.random() * count);
            heading.innerText = `${playerNames[rand]} Choose`;
        }
    } else {
        sliderText.style.textAlign="right";
        sliderText.style.paddingRight="5px";
        heading.innerText = "Choose Truth or Dare";
    }
}
toggle.addEventListener("change", updateToggleLabel);
updateToggleLabel(); // Run once on load

// Utility
function updateCountDisplay() {
    const count = playerList.querySelectorAll('.player-row').length;
    if (countDisplay) {
        countDisplay.innerText = `Players - ${count}`;
    }
}





const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".header-nav");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});