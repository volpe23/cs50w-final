const price = document.getElementById('getPrice');
const priceTag = document.getElementById('price');

price.addEventListener('click', async (e) => {
    e.preventDefault()
    const response = await fetch('/flight');
    const res = await response.json()
});

