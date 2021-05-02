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

const app = {};

const date = document.querySelector('input[type="date"]');
const ul = document.querySelector('.dataList');


app.displayData = (data) => {
    data.splice(11, 1);
    data.forEach((item) => {
        const li = document.createElement('li');
        li.className = `box`;
        li.innerHTML = 
        `  
        <h2 class=${item.province}>${item.province}</h2>
        <p>Recovered on this day: ${item.recovered}</p>
        <p>Total Recovered: ${item.cumulative_recovered}</p>
        <p>Vaccinated on this day: ${item.avaccine}</p>
        <p>Total Vaccinated: ${item.cumulative_avaccine}</p>
        `
        ul.append(li);
    })
    
    document.querySelector('.BC').innerHTML = `<h2>British Columbia</h2>`
    document.querySelector('.NL').innerHTML = `<h2>Newfoundland and Labrador</h2>`
    document.querySelector('.NWT').innerHTML = `<h2>Northwest Territories</h2>`
    document.querySelector('.PEI').innerHTML = `<h2>Prince Edward Island</h2>`
}


app.gimmeData = () => {
    const url = new URL('https://api.opencovid.ca/summary')
    const dateValue = date.value;
    document.getElementById('dateDisplay').innerText = `As of ${dateValue}:`

    url.search = new URLSearchParams({
        date: dateValue
    });

    fetch(url)
        .then((data) => {
            return data.json();
        })

        .then((jsonResponse) => {
            console.log(jsonResponse);
            app.displayData(jsonResponse.summary);
        })
    console.log(dateValue);
}

app.dateSelector = () => {
    const form = document.querySelector('form');
    date.max = app.yesterday();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        app.gimmeData();
        ul.innerHTML = '';
    })
};

app.yesterday = () => {
    const date = new Date();

    date.setDate(date.getDate() - 1)
    month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

console.log(`yesterday: ${app.yesterday()}`);


app.init = () => {
    console.log('init!');
    app.dateSelector();
}

app.init();