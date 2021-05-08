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

app.date = document.querySelector('input[type="date"]');
app.ul = document.querySelector('.dataList');
app.intro = document.querySelector('.intro');


app.displayData = (data) => {
    
    data.splice(11, 1);
    
    if (data[0].date == app.yesterday('day') && app.date.value != app.yesterday('year')) {
        app.intro.style.display = 'block';
        alert("Please select a date using the YYYY-MM-DD format");
        return false
    }

    document.getElementById('dateDisplay').innerText = `As of ${app.date.value}:`
    
    data.forEach((item) => {
        for (const value in item) {
            if (item[value] === "NULL") {
                item[value] = 0;
            };
        };
    
        const li = document.createElement('li');
        li.className = `box`;
        li.innerHTML = 
        `  
        <h2 class=${item.province}>${item.province}</h2>
        <div><p>Recovered on this day: ${(item.recovered).toLocaleString()}</p>
        <p>Total Recovered: ${(item.cumulative_recovered).toLocaleString()}</p></div>
        <div><p>Vaccinated on this day: ${(item.avaccine).toLocaleString()}</p>
        <p>Total Vaccinated: ${(item.cumulative_avaccine).toLocaleString()}</p></div>
        `
         app.ul.append(li);
    })
       
    document.querySelector('.BC').innerHTML = `British Columbia`
    document.querySelector('.NL').innerHTML = `Newfoundland and Labrador`
    document.querySelector('.NWT').innerHTML = `Northwest Territories`
    document.querySelector('.PEI').innerHTML = `Prince Edward Island`
};

app.gimmeData = () => {
    const url = new URL('https://api.opencovid.ca/summary')

    url.search = new URLSearchParams({
        date: app.date.value
    });

    fetch(url)
        .then((data) => {
            return data.json();
        })

        .then((jsonResponse) => {
            console.log(jsonResponse);
            app.displayData(jsonResponse.summary);
        })
};

app.dateSelector = () => {
    const form = document.querySelector('form');
    app.date.max = app.yesterday('year');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        app.intro.style.display = 'none';
        app.gimmeData();
        app.ul.replaceChildren()
        dateDisplay.textContent = ' '
    })
};

app.yesterday = (format) => {
    const date = new Date();

    date.setDate(date.getDate() - 1)
    month = '' + (date.getMonth() + 1),
    day = '' + date.getDate(),
    year = date.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    if (format == 'year') {
        return [year, month, day].join('-');
    }  else if (format == 'day') {
        return [day, month, year].join('-');
    }
};

console.log(`yesterday: ${app.yesterday('year')}`);

app.init = () => {
    console.log('init!');
    app.dateSelector();
};

app.init();

// GIPHY APP

const giphyUrl = new URL(`https://api.giphy.com/v1/gifs`)
    
    giphyUrl.search = new URLSearchParams({
        api_key: 'HVo4BiCuwH7vyhWSzlAfRqhIp06cIt7O',
        ids: 'D6dBdLMT3Y1SZZFFtJ, RPqLAs6u4z0YUTsOCM, rIlmnpIaVVoxOwD9e0, sfFM0VWuQfINlsHFVY, zDLeiIHrabdtWN6MxN'
    });
    
    fetch(giphyUrl)
        .then((giphyData) => {
            return giphyData.json();
        })
        .then((jsonGiphyResponse) => {
            console.log(jsonGiphyResponse);
        })