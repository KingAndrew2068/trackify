// Function to fetch cryptocurrency data from CoinRanking API
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

// Function to add periods after every third digit in a number
function addPeriods(number) {
  // Convert the number to a string and split it by the period
  const parts = number.toString().split(".");
  // Extract the integer part
  const integerPart = parts[0];
  // Extract the decimal part and truncate it to the first 7 digits
  const decimalPart = parts[1] ? parts[1].slice(0, 7) : "";
  // Add the period after every third digit in the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // Combine the formatted integer and decimal parts with a period
  const formattedNumber = decimalPart
    ? formattedInteger + "." + decimalPart
    : formattedInteger;
  return formattedNumber;
}

// Function to display cryptocurrency data in the table
function displayCryptoData(coins) {
  const cryptoTable = document.getElementById("cryptoTable");
  cryptoTable.innerHTML = "";

  coins.forEach((coin) => {
    const row = document.createElement("tr");
    row.innerHTML = `
		<td><img src="${coin.iconUrl}" class="crypto-logo" alt="${coin.name}"></td>
		<td>${coin.name}</td>
		<td>${coin.symbol}</td>
		<td>$${addPeriods(
      coin.price
    )}</td> <!-- Call addPeriods function here for price -->
		<td>${addPeriods(
      coin.change
    )}%</td> <!-- Call addPeriods function here for change -->
		<td>${addPeriods(
      coin.volume ? coin.volume : "-"
    )}</td> <!-- Call addPeriods function here for volume -->
		<td>${addPeriods(
      coin.marketCap ? coin.marketCap : "-"
    )}</td> <!-- Call addPeriods function here for market cap -->
		`;
    cryptoTable.appendChild(row);
  });
}

// Function to filter cryptocurrencies based on user input
function filterCryptoData(coins, searchTerm) {
  searchTerm = searchTerm.toLowerCase();

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm) ||
      coin.symbol.toLowerCase().includes(searchTerm)
  );

  return filteredCoins;
}

// Function to handle search input
function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.trim();

  fetchCryptoData().then((coins) => {
    const filteredCoins = filterCryptoData(coins, searchTerm);
    displayCryptoData(filteredCoins);
  });
}

// Function to initialize the app
async function initializeApp() {
  const coins = await fetchCryptoData();
  displayCryptoData(coins);

  // Add event listener to search input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", handleSearchInput);
}

// Call initializeApp function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", initializeApp);
