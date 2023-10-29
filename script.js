const API_KEY = "AIzaSyCXi-T8Yh0Q0Pzp7cpUniCElf3bbhL0Y4E";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

async function fetchVideo(searchQuery, maxResults) {
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  console.log(data.items);
}

fetchVideo("icc", 50); // keep it empty for first page result

async function getVideoStats(videoId){
    const response = await fetch(`${BASE_URL}/videos?key=${API_KEY}&part=statistics&id=${videoId}`);
    const data = await response.json();
    console.log(data);
}

async function getChannelLogo(channelId){
    const response = await fetch(`${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`);
    const data = await response.json();
    console.log(data);
}

getVideoStats('3YJvtBqhEJ0');
// if you want to pass multiple query params
// 

// snippet gives me video infomation as well