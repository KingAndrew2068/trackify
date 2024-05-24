async function fetchCryptoData() {
  try {
    const response = await fetch("https://api.coinranking.com/v2/coins");
    const data = await response.json();
    return data.data.coins;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    return [];
  }
}

function addPeriods(number) {
  const parts = number.toString().split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] ? parts[1].slice(0, 7) : "";
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const formattedNumber = decimalPart
    ? formattedInteger + "." + decimalPart
    : formattedInteger;
  return formattedNumber;
}

function displayCryptoData(coins) {
  const cryptoTable = document.getElementById("cryptoTable");
  cryptoTable.innerHTML = "";

  coins.forEach((coin) => {
    const row = document.createElement("tr");
    row.innerHTML = `
		<td><img src="${coin.iconUrl}" class="crypto-logo" alt="${coin.name}"></td>
		<td>${coin.name}</td>
		<td>${coin.symbol}</td>
		<td>$${addPeriods(coin.price)}</td>
		<td>${addPeriods(coin.change)}%</td>
		<td>${addPeriods(coin.volume ? coin.volume : "-")}</td>
		<td>${addPeriods(coin.marketCap ? coin.marketCap : "-")}</td>
		`;
    cryptoTable.appendChild(row);
  });
}

function filterCryptoData(coins, searchTerm) {
  searchTerm = searchTerm.toLowerCase();

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
  );

  return filteredCoins;
}

function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();

  fetchCryptoData().then((coins) => {
    const filteredCoins = filterCryptoData(coins, searchTerm);
    displayCryptoData(filteredCoins);
  });
}

async function initializeApp() {
  const coins = await fetchCryptoData();
  displayCryptoData(coins);

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearchInput);
}

document.addEventListener("DOMContentLoaded", initializeApp);

document.addEventListener("keydown", function (event) {
  if (event.key === "F12") {
    event.preventDefault();
  }

  if (event.ctrlKey && event.shiftKey && event.key === "I") {
    event.preventDefault();
  }

  if (event.ctrlKey && event.shiftKey && event.key === "C") {
    event.preventDefault();
  }

  if (event.ctrlKey && event.shiftKey && event.key === "J") {
    event.preventDefault();
  }

  if (event.ctrlKey && event.key === "U") {
    event.preventDefault();
  }
});

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});
