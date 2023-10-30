const API_KEY = "AIzaSyBmOfUnRNYc22e04ZmK79uRbPb6388K9AE";

window.addEventListener("load", () => {
  // we need to write logic for rendering video player
  // iframe
  let videoId = "25T8Bj_WQbY";
  if(YT){
    new YT.Player('video-container',{
        height: "500",
        width: "1000",
        videoId,
    })
  }
});

// load comments
// recommended video


// session storage is just like 
// local storage but it will be deleted 
// once the session is over