const API_KEY = "AIzaSyABqkOAEh13bB_XSS5pfuRBLzdZnM3xhdc";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

const arrayOfVideos = [];

async function fetchVideos(searchQuery, maxResults) {
  const response = await fetch(
    `${BASE_URL}/search?key=${API_KEY}&q=${searchQuery}&maxResults=${maxResults}&part=snippet`
  );
  const data = await response.json();
  //console.log("data is ", data);
  renderData(data.items);
  console.log("1. fetchVideos ", data.items);
  setVideoId();
}

 fetchVideos("", 20); // keep it empty for first page result

 //implementing time ago
function timeAgo(date) {
  // const seconds = Math.floor((new Date() - date) / 1000);

  // const interval = Math.floor(seconds / 31536000);

  //years check
  const yearsInterval = Math.floor(new Date().getFullYear() - date.getFullYear());
  if (yearsInterval > 1) {
      return yearsInterval + " years ago";
  }
  else if (yearsInterval === 1) {
      return yearsInterval + " year ago";
  }

  //months check
  const monthsInterval = Math.floor(new Date().getMonth() - date.getMonth());
  //const monthsInterval = Math.floor(months / 12);

  if (monthsInterval > 1) {
      return monthsInterval + " months ago";
  }
  else if (monthsInterval === 1) {
      return monthsInterval + " month ago";
  }

  //minutes check
  const minutesInterval = Math.floor(new Date().getMinutes() - date.getMinutes());

  if (minutesInterval > 1) {
      return minutesInterval + " minutes ago";
  }
  else if (minutesInterval === 1) {
      return minutesInterval + " minute ago";
  }
  
  //seconds check
  const secondsInterval = Math.floor(new Date().getSeconds() - date.getSeconds());

  if (secondsInterval > 1) {
      return secondsInterval + " seconds ago";
  }
  else if (secondsInterval === 1) {
      return secondsInterval + " seconds ago";
  }

  //return "just now";
}

//render videos list on homepage
function renderData(arrayOfVideos) {
  let videosList = document.getElementById('resultsList');
  if(videosList.children.length > 0){
    videosList.replaceChildren();
  }
  arrayOfVideos.forEach((video) =>{
      let card = document.createElement('li');
      card.class = "videoCard";
      //let videosList = document.getElementById('resultsList');
      card.innerHTML = '<div class="cardWrapper">' +
         '<div class="thumbnailWrapper">'+
         //'<span class="videoId">'+video.snippet.id.videoId+'</span>'+
          '<img class="thumbnail" src=' + video.snippet.thumbnails.high.url + '>' +
           '<img class="playIcon" data-channelId ="'+ video.snippet.channelId + '"' + 'data-src="'+ video.id.videoId + '"' + ' src="./images/ytBtn.png">' +
          '</div>'+
          // '<span class="category">' + object.type + '</span>' +
          '<div class="videoDeets">' +
            '<span class="videoTitle">' + video.snippet.title.substring(0,80) + "..." + '</span>' +
            '<span class="channelName">' + video.snippet.channelTitle + '</span>' +
          '</div>' +
            '<div class="viewsAndTimestamp">' + 
            '<span class="views">' + '</span>' +
            '<span class="timeStamp">' + timeAgo(new Date(video.snippet.publishedAt))  + '</span>' +
            '</div>'+
           '</div>';
       videosList.appendChild(card);
      //   console.log("now ",new Date().toISOString());
      //  console.log("then ",new Date(video.snippet.publishedAt).toISOString());
  });
}



//search Functionality
function formSubmit(){
  let submit1 = document.getElementById("submit1");
  submit1.addEventListener("click", function () {
      let searchQuery = document.getElementById("searchVids").value;
      //console.log("searchQuery ", searchQuery);
      fetchVideos(searchQuery, 20); 
  });    
}

//go to detail page function
function setVideoId(){
  let playBtn = document.getElementsByClassName("playIcon");
  for(let i=0;i<playBtn.length;i++){
    playBtn[i].addEventListener("click", ()=>{
      const userInputs = {
        videoId : playBtn[i].getAttribute("data-src"),
        channelId: playBtn[i].getAttribute("data-channelId"),
      }
      localStorage.setItem("userInputs", JSON.stringify(userInputs));

      if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        window.location.pathname = "/videoDetails.html"; 
      }else{
        window.location.pathname = "/youtube-clone/videoDetails.html"; 
      }
    });
  }
}



//slider menu function
function sliderMenu() {
  let ham = document.getElementById("hamburgerMenu");
  let slider = document.getElementById("slider");
  ham.addEventListener("click", function () {
    slider.style.display = slider.style.display == "block" ? "none" : "block";
  });
}
window.addEventListener("DOMContentLoaded", (event) => {
  formSubmit();
  sliderMenu();
 // setVideoId();
});