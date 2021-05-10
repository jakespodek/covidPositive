// COVID, POSITIVE SCRIPT

// APP OBJECT

const app = {};

// VARIABLES 

app.date = document.querySelector('input[type="date"]');
app.ul = document.querySelector('.dataList');
app.intro = document.querySelector('.intro');
app.dateDisplay = document.getElementById('dateDisplay');
app.form = document.querySelector('form');

// GENERAL DISPLAY METHOD

app.displayData = (data) => {
    
    // SPLICE OUT "REPATRIATED" DATA
    
    data.splice(11, 1);
    
    // ERROR HANDLING FOR DATE INPUT
    
    if (data[0].date == app.yesterday('day') && app.date.value != app.yesterday('year')) {
        app.intro.style.display = 'block';
        alert("Please select a date using the YYYY-MM-DD format");
        return false
    }
    
    // LOOP THROUGH THE DATA
    
    data.forEach((item) => {
        
        // ERROR HANDLING FOR "NULL" RESULTS
        
        for (const value in item) {
            if (item[value] === "NULL") {
                item[value] = 0;
            };
        };

        // SHOW TODAY'S DATE
        
        app.dateDisplay.innerText = `As of ${app.date.value}:`
        
        // CREATE <li>'s AND READY TO SHOW THE DATA
    
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

    // FIX FOR ABBREVIATED PROVINCES TO FULL NAMES
       
    document.querySelector('.BC').innerHTML = `British Columbia`
    document.querySelector('.NL').innerHTML = `Newfoundland and Labrador`
    document.querySelector('.NWT').innerHTML = `Northwest Territories`
    document.querySelector('.PEI').innerHTML = `Prince Edward Island`
};

// CALL to opencovid API METHOD 

app.gimmeData = () => {
    const url = new URL('https://api.opencovid.ca/summary')

    // USE DATE AS A SEARCH PARAM

    url.search = new URLSearchParams({
        date: app.date.value
    });

    fetch(url)
        .then((data) => {
            return data.json();
        })

        .then((jsonResponse) => {
            app.displayData(jsonResponse.summary);
        })
};

// FILTERING THE DATA BY DATE METHOD
// AND 
// CALLING THE DISPLAY METHOD 

app.dateSelector = () => {
    app.date.max = app.yesterday('year');

    // DISPLAYING THE CORRECT, FILTERED DATA ONTO THE PAGE

    app.form.addEventListener('submit', (event) => {
        event.preventDefault();
        app.intro.style.display = 'none';
        app.gimmeData();
        app.ul.innerHTML = ' ';
        dateDisplay.textContent = ' ';
    })
};

// METHOD TO DETERMINE YESTERDAY'S DATE

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

    // USED FOR ERROR HANDLING FOR DISPLAY DATA METHOD 

    if (format == 'year') {
        return [year, month, day].join('-');
    }  else if (format == 'day') {
        return [day, month, year].join('-');
    }
};

// ADDITIONAL: GIPHY METHODS----------------------------------------------------

// DISPLAY GIFS METHOD

app.displayGifs = (gifs) => {
    const gifContainer = document.createElement('img');

    // GIPHY RANDOMIZER 

    i = Math.floor(Math.random() * gifs.data.length);
    gifContainer.alt = gifs.data[i].title;
    gifContainer.src = gifs.data[i].images.original.url;

    // APPENDINGS GIFS TO DOM

    app.intro.append(gifContainer);
}

// CALL TO giphy API METHOD

app.gimmeGifs = () => {
    const giphyUrl = new URL(`https://api.giphy.com/v1/gifs`)

    giphyUrl.search = new URLSearchParams({
        api_key: 'HVo4BiCuwH7vyhWSzlAfRqhIp06cIt7O',
        ids: 'jGXxbKsmdUSXvBsd4l, EmbD6Qia2yKbLXpd2U, zQ6htTN6ZbsJa8rTrp, dRi7EJ5q9Xfb7PcoY0, zDLeiIHrabdtWN6MxN'
    });

    fetch(giphyUrl)
        .then((giphyData) => {
            return giphyData.json();
        })
        .then((jsonGiphyResponse) => {
            app.displayGifs(jsonGiphyResponse);
        })
};

// INIT METHOD

app.init = () => {
    app.dateSelector();
    app.gimmeGifs();
};

app.init();