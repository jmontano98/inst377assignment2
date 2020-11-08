const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const restaurants = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => restaurants.push(...data));

function findMatches(wordToMatch, restaurants) {
    return restaurants.filter(obj => {
        const regex = new RegExp(wordToMatch, 'gi');
        return obj.address_line_1.match(regex) || obj.name.match(regex) || obj.category.match(regex) || obj.zip.match(regex) || obj.rodent_and_insects.match(regex)
    })
}

function displayMatches(){
    
    const matchArray = findMatches(this.value, restaurants);
    const html = matchArray.map(obj => {
        return `
            <div class="result">
                <span class="name">${obj.name}</span><br>
                <span class="location">${obj.address_line_1}, ${obj.city}</span><br>
                <span class="category">${obj.category}</span><br>
                <span class="zipcode">${obj.zip}</span><br>
                <span class="rodents">Rodents/Insect Compliance?: ${obj.rodent_and_insects}</span>
            </div>
        `;
    }).join('');

    suggestions.innerHTML = html;
    if (this.value == "") {
        suggestions.innerHTML = "";
    }

}
// comment

const searchInput = document.querySelector('.textInput');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);