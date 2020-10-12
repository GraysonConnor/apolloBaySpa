

let video = {
  vidSelectArr: [
    document.querySelector("#vid1"),
    document.querySelector("#vid2"),
    document.querySelector("#vid3"),
    document.querySelector("#vid4"),
    document.querySelector("#vid5"),
    document.querySelector("#vid6"),
    document.querySelector("#vid7"),
    document.querySelector("#vid8"),
    document.querySelector("#vid9"),
    document.querySelector("#vid10"),
    document.querySelector("#vid11"),
    document.querySelector("#vid12")
     ],

  videoSrc: [
       "assets/ab-videos/ab-downOnNila-pb1.mp4",
       "assets/ab-videos/ab-nativeTrees-hob.mp4",
       "assets/ab-videos/ab-myMurder-ckf.mp4",
       "assets/ab-videos/ab-moldyMoney-hs.mp4",
       "assets/ab-videos/ab-southernSoul-pb2.mp4",
       "assets/ab-videos/ab-meAgain-pb1.mp4",
       "assets/ab-videos/ab-ghostOutside-ckf.mp4",
       "assets/ab-videos/ab-downOnNila-ckf.mp4",
       "assets/ab-videos/ab-moldyMoney-pb1.mp4",
       "assets/ab-videos/ab-winnabego-pb1.mp4",
       "assets/ab-videos/ab-ghostOutside-pb1.mp4",
       "assets/ab-videos/ab-winnabego-ckf.mp4"
     ],

     videoPosterSrc: [
       "assets/images/ab-downOnNila-pb1-2-min.png",
       "assets/images/ab-nativeTrees-hob-2-min.png",
       "assets/images/ab-myMurder-ckf-2-min.png",
       "assets/images/ab-moldyMoney-hs-2-min.png",
       "assets/images/ab-southernSoul-pb2-2-min.png",
       "assets/images/ab-meAgain-pb1-2-min.png",
       "assets/images/ab-ghostOutside-ckf-2-min.png",
       "assets/images/ab-downNonNila-ckf-2-min.png",
       "assets/images/ab-moldyMoney-pb1-2-min.png",
       "assets/images/ab-winnabego-pb1-2-min.png",
       "assets/images/ab-ghostOutside-pb1-2-min.png",
       "assets/images/ab-winnabego-ckf-2-min.png"
     ],
    mainVid: document.querySelector("#featuredVideo"),
    videoTitleOutput: document.querySelector("#videoTitleOutput"),

    videoTitle: ["<h4>DOWN ON NILA</h4><br><p>Live at The Prophet Bar</p><br><p>(DALLAS,TX)",
                  "<h4>NATIVE TREES</h4><br><p>Live at House of Blues</p><br><p>(DALLAS,TX)",
                  "<h4>MY MURDER</h4><br><p>Live at Free Underage Cool Kid Fest</p><br><p>(DENTON,TX)",
                  "<h4>MOLDY MONEY</h4><br><p>Live at Hot Shots</p><br><p>(DURANT,OK)",
                  "<h4>SOUTHERN SOUL</h4><br><p>Live at The Door</p><br><p>(DALLAS,TX)",
                  "<h4>ME AGAIN</h4><br><p>Live at The Prophet Bar</p><br><p>(DALLAS,TX)",
                  "<h4>GHOST OUTSIDE</h4><br><p>Live at Free Underage Cool Kid Fest</p><br><p>(DENTON,TX)",
                  "<h4>DOWN ON NILA</h4><br><p>Live at Free Underage Cool Kid Fest</p><br><p>(DENTON,TX)",
                  "<h4>MOLDY MONEY</h4><br><p>Live at The Prophet Bar</p><br><p>(DALLAS,TX)",
                  "<h4>WINNABEGO</h4><br><p>Live at The Prophet Bar</p><br><p>(DALLAS,TX)",
                  "<h4>GHOST OUTSIDE</h4><br><p>Live at The Prophet Bar</p><br><p>(DALLAS,TX)",
                  "<h4>WINNABEGO</h4><br><p>Live at Free Underage Cool Kid Fest</p><br><p>(DENTON,TX)"]
};

for(let i=0; i<video.vidSelectArr.length; i++){
  video.vidSelectArr[i].addEventListener("click",function(){
    video.mainVid.src = video.videoSrc[i];
    video.mainVid.setAttribute("poster", video.videoPosterSrc[i]);
    video.videoTitleOutput.innerHTML = video.videoTitle[i];
  })
};

vid13.addEventListener("click", function(){
window.open('https://www.youtube.com/channel/UCeqi1g__8xEz60tI7-w_4AQ/videos', '_blank');
});







const container = document.querySelector(".container");
const lefty = document.querySelector(".lefty");
let translate = 0;

lefty.addEventListener("click", function() {
    translate += 200;
    container.style.transform = "translateX(" + translate + "px" + ")";
});

const righty = document.querySelector(".righty");
righty.addEventListener("click", function() {
    translate -= 200;
    container.style.transform = "translateX(" + translate + "px" + ")";
});
