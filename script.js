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



app.displayData = (data) => {
    const ul = document.querySelector('.dataList');
    data.splice(11, 1);
    data.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<h2>${item.province}</h2>`
        ul.append(li);
    })

}


app.gimmeData = () => {
    const url = new URL('https://api.opencovid.ca/summary')
    const dateValue = date.value;

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