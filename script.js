//Covid, Positive - app code

    // Have the user input a date using input[type="date"] 
        // BUT for Safari and IE have them input a date manually with error handling for format

    // add an event listener for date submission that will then generate the data based on date's value

    // stop the page from refreshing 

    // connect to the opencovid API and filter info by date
        // take the recovered cases, as well as total vaccinated by province
        // loop this info and put it into a newly created <li>
        // append to the <ul>
        // display data on the page

    // allow for user to change date with new results generating without having to refresh the page

    // STRETCH GOAL:
        // spread some positive vibes by also generating a "vaccinated" gif(s) from GIPHY, somewhere on the page

let date = document.querySelector('input[type="date"]').value;
console.log(date);



const url = new URL('https://api.opencovid.ca/summary')

url.search = new URLSearchParams({
    date: date
});

fetch(url)
    .then((data) => {
        return data.json();
    })

    .then((jsonResponse) => {
        console.log(jsonResponse)

    })


