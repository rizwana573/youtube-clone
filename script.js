const API_KEY = "AIzaSyBmOfUnRNYc22e04ZmK79uRbPb6388K9AE";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

async function fetchVideos(searchQuery, maxResults) {
    // https://www.googleapis.com/youtube/v3/search?key=AIzaSyBmOfUnRNYc22e04ZmK79uRbPb6388K9AE&q=icc
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  console.log(data.items);
}

fetchVideos("icc", 50); // keep it empty for first page result

// thumbnail
// video title
// channel title
// video id
// channel id
// publish time

async function getVideoStats(videoId){
    // https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBmOfUnRNYc22e04ZmK79uRbPb6388K9AE&part=statistics&id=JhIBqykjzbs
    const response = await fetch(`${BASE_URL}/videos?key=${API_KEY}&part=statistics&id=${videoId}`);
    const data = await response.json();
    console.log(data);
}

// viewCount

async function getChannelLogo(channelId){
    // https://www.googleapis.com/youtube/v3/channels?key=AIzaSyBmOfUnRNYc22e04ZmK79uRbPb6388K9AE&part=snippet&id=UC8Wd_RVw8T1O1_IWEbICkIg
    const response = await fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`);
    const data = await response.json();
    console.log(data);
}

// getVideoStats('3YJvtBqhEJ0');
// if you want to pass multiple query params
// 

// snippet gives me video infomation as well

