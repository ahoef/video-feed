let httpRequest;
let model = {
    currentRangeStart: 0,
    currentRangeEnd: 4,
    currentPage: 1,
    totalPages: 0,
    data: []
}

const nextButton = document.getElementsByClassName('next')[0];
const prevButton = document.getElementsByClassName('prev')[0];

/**
* Create a GET request to the given endpoint
* @param {string} url - API endpoint
*/
function makeRequest(url) {
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        displayErrorMsg('Sorry, there was a problem making the request!');
        return false;
    }
    httpRequest.onreadystatechange = receiveRequest;
    httpRequest.open('GET', url);
    httpRequest.send();
}

/**
* Store data from the request in the model; render video feed & pagination; attach events
*/
function receiveRequest() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            model.data = JSON.parse(httpRequest.response);
            model.totalPages = model.data.length / 5;

            createVideoFeed();
            updatePaginationDisplay();
            attachEvents();

            document.getElementById('pagination').style.display='block';
        } else {
            displayErrorMsg('Sorry, there was a problem with the request response!');
        }
    }
}

/**
* Register pagination events with the DOM
*/
function attachEvents() {
    nextButton.addEventListener('click', function(){paginate('forward')}, false);
    prevButton.addEventListener('click', function(){paginate('backward')}, false);
}

/**
* Paginate in the given direction to display a new set of 5 videos
*/
function paginate(direction) {
    if (direction === 'forward') {
        model.currentRangeStart = model.currentRangeStart + 5;
        model.currentRangeEnd = model.currentRangeEnd + 5;
    } else {
        model.currentRangeStart = model.currentRangeStart - 5;
        model.currentRangeEnd = model.currentRangeEnd - 5;
    }

    model.currentPage = (model.currentRangeStart / 5) + 1;
    createVideoFeed();
    updatePaginationDisplay();
    window.scrollTo(0, 0);
}

/**
* Update displayed page number, and set an arrow's disabled state if a user can't
* paginate forward or backward
*/
function updatePaginationDisplay() {
    const paginationMarkup = `${model.currentPage} / ${model.totalPages}`;
    document.getElementsByClassName('pages')[0].innerHTML = paginationMarkup;

    if (model.currentRangeStart === 0) {
        prevButton.setAttribute('disabled', 'true');
    } else {
        prevButton.removeAttribute('disabled');
    }

    if ((model.currentRangeEnd + 1) >= model.data.length) {
        nextButton.setAttribute('disabled', 'true');
    } else {
        nextButton.removeAttribute('disabled');
    }
}

/**
* Generate and insert the markup for a set of 5 videos within the current range
*/
function createVideoFeed() {
    let videoFeedMarkup = '';

    model.data.forEach((el, index) => {
        if ((index >= model.currentRangeStart) && (index <= model.currentRangeEnd)) {
            let newTemplate =
            `
            <article class='channel-item-container'>
                <header>
                    <img src='${el.user_portrait_medium}' alt='${el.user_name}' />
                    <div class='header-text'>
                        <h1><a href='${el.url}'>${el.title}</a></h1>
                        <p>from <a href='${el.user_url}'>${el.user_name}</a></p>
                    </div>
                </header>
                <iframe src='https://player.vimeo.com/video/${el.id}?&loop=1&color=ffffff&title=0&byline=0&portrait=0'
                        width='630' height='354' frameborder='0'
                        webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                <div class='item-information'>
                    <footer>
                        <p class='upload-date'>Uploaded ${convertDate(el.upload_date)}</p>
                        ${outputStats(el)}
                        <p><a href='${el.url}' class='url'># ${removeProtocol(el.url)}</a></p>
                    </footer>
                </div>
            </article>
            `
            videoFeedMarkup += newTemplate;
        }
    })
    document.getElementById('video-feed').innerHTML = videoFeedMarkup;
}

/**
* Check if stat values exist, and output them if they do. Output an empty string if they don't
* @param {Object} el - Video object
*/
function outputStats(el) {
    let statsMarkup;
    if (typeof el.stats_number_of_plays != 'undefined') {
        statsMarkup =  `<p class='plays'>${el.stats_number_of_plays} Plays</p>
                        <p class='likes'>${el.stats_number_of_likes} Likes</p>
                        <p class='comments'>${el.stats_number_of_comments} Comments</p>`;
    } else {
        statsMarkup = '';
    }
    return statsMarkup
}

/**
* Remove the protocol from the given url
* @param {string} url - video url
*/
function removeProtocol(url) {
    let shortenedUrl;
    if (url.includes('https')) {
        shortenedUrl = url.replace('https://', '');
    } else if (url.includes('http')) {
        shortenedUrl = url.replace('http://', '');
    } else {
        shortenedUrl = url;
    }
    return shortenedUrl;
}

/**
* Convert a JS date into a readable string
* @param {string} str - JS date
*/
function convertDate(str) {
    const dateObj = new Date(str)
    return dateObj.toDateString();
}

/**
* Display an error message to the user
* @param {string} message - Error message
*/
function displayErrorMsg(message) {
    console.log(message);
    document.getElementById('video-feed').innerHTML = `<p>${message}</p>`;
}

window.onload = makeRequest('http://vimeo.com/api/v2/channel/documentaryfilm/videos.json');
