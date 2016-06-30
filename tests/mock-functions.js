/**
* Convert a JS date into a readable string
* @param {string} str - JS date
*/
function convertDate(str) {
    const dateObj = new Date(str)
    return dateObj.toDateString();
}

/**
* Remove the protocol from the given url
* @param {string} url - video url
*/
function removeProtocol(url) {
    var shortenedUrl;
    if (url.includes('https')) {
        shortenedUrl = url.replace('https://', '');
    } else if (url.includes('http')) {
        shortenedUrl = url.replace('http://', '');
    } else {
        shortenedUrl = url;
    }
    return shortenedUrl;
}
