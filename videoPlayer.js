const API_KEY = "AIzaSyABqkOAEh13bB_XSS5pfuRBLzdZnM3xhdc";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

let newObj = JSON.parse(localStorage.getItem("userInputs"));

let videoId = newObj.videoId;
let channelId = newObj.channelId;

const arrayOfComments = [];

window.addEventListener("load", () => {
  //logic for rendering video player
  // iframe
  // let videoId = videoId;
  if (YT) {
    new YT.Player("video-container", {
      height: "500",
      width: "1000",
      videoId,
    });
  }
});

// load comments
// recommended video

async function getVideoStats(videoId) {
  const response = await fetch(
    `${BASE_URL}/videos?key=${API_KEY}&part=statistics&id=${videoId}`
  );
  const data = await response.json();
  console.log("videoStats ", data);
}

// viewCount

async function getChannelLogo(channelId) {
  const response = await fetch(
    `${BASE_URL}/channels?key=${API_KEY}&part=snippet&id=${channelId}`
  );
  const data = await response.json();
  console.log("channelLogo ", data);
}

getVideoStats(videoId);

// if you want to pass multiple query params
// snippet gives me video infomation as well

async function getComments(videoId) {
  const response = await fetch(
    `${BASE_URL}/commentThreads?key=${API_KEY}&videoId=${videoId}&maxResults=25&part=snippet`
  );
  const data = await response.json();
  console.log("getComments ", data);
  renderComments(data.items);
}

getComments(videoId);

function renderComments(arrayOfComments) {
  let commentsList = document.getElementById("videoComments");
  if (arrayOfComments == undefined) {
    //console.log("comments are off!");
    let displayMsg = document.createElement("div");
    displayMsg.innerText = "Comments are turned off for this video.";
    commentsList.appendChild(displayMsg);
  }
  else if (arrayOfComments.length == 0) {
    //console.log("comments are off!");
    let displayMsg = document.createElement("div");
    displayMsg.innerText = "There are no comments for this video yet!";
    commentsList.appendChild(displayMsg);
  }
   else {
    arrayOfComments.forEach((comment) => {
      let card = document.createElement("li");
      card.class = "commentsCard";
      card.innerHTML =
        '<div class="cardWrapper">' +
        '<img class="userPic" src=' +
        comment.snippet.topLevelComment.snippet.authorProfileImageUrl +
        ">" +
        '<div class="commentDeets">' +
        '<span class="commentContent">' +
        comment.snippet.topLevelComment.snippet.textOriginal +
        "</span>" +
        '<span class="commentLikes">' +
        comment.snippet.topLevelComment.snippet.likeCount +
        " likes" +
        "</span>" +
        '<span class="commentRepliesCount">' +
        comment.snippet.totalReplyCount +
        " Replies" +
        "</span>" +
        "</div>" +
        "</div>";
      commentsList.appendChild(card);
    });
  }
}
