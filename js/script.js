var channelOffset = 0;
var isLoading;
const clientId = 'q76w73hhqbti678iemb94j43sro4kh';
const limit = 15;
var gameType = 'Overwatch';
var LANG;
var isEnd = false;

function getData(lang) {
  //預設語言
  if (lang === undefined ) { 
    lang = 'en';
  }
  //標記讀取中
  isLoading = true; 
  document.querySelector('.loading').style.display = 'block';
  console.log('loading content');

  //ajax
  var streamReq = new XMLHttpRequest();
  var url = `https://api.twitch.tv/kraken/streams/?client_id=${clientId}&game=${gameType}&offset=${channelOffset}&limit=${limit}&language=${lang}`;
  streamReq.open("GET",url,true);
  streamReq.onload = function() {
    console.log(streamReq.status);
    if (streamReq.status >= 200 && streamReq.status < 400) {
      var streamData = JSON.parse(streamReq.responseText);
      str(streamData);
    }
  }
  streamReq.send();

  function str(data) {
    console.log(data);
    let container = document.querySelector('.channel-list');
    if (data.streams.length == 0) {
      isEnd = true;
      console.log('end of streams');
    }
    for (let dataOut of data.streams) {
      if (dataOut.channel.logo == null) {
        authorImg = "images/author.png";
      }else {
        authorImg = dataOut.channel.logo;
      }
      var itemData = `
        <li class="channel-item">
          <a href="${dataOut.channel.url}" target="_blank" title="Check Now!">
            <div class="thumb-channel">
              <img src="${dataOut.preview.medium}" alt="channel-thumb" onload="this.style.opacity=1" />
            </div>
            <div class="info-channel">
              <div class="author-info">
                <img src="${authorImg}" alt="author-thumb" onload="this.style.opacity=1" />
              </div>
              <div class="title-info">
                <span class="title-info-text">
                  ${dataOut.channel.status}
                </span>
                <div class="author-info-text">
                  ${dataOut.channel.display_name}
                </div>
                <div class="viewer-info-text">
                  <span class="viewer-title"></span>: ${dataOut.viewers}
                </div>
              </div>
            </div>
          </a>
        </li>
      `;
      const div = document.createElement('div');
      container.appendChild(div);
      div.outerHTML = itemData;
      $('.viewer-title').text(window.I18N[lang].viewer_title);
    }
    //標記讀取完畢
    isLoading = false; 
    document.querySelector('.loading').style.display = 'none';
    console.log('content loaded');
  }
}

document.addEventListener("DOMContentLoaded", function() {
  getData(LANG);
  channelOffset +=15;
})

window.addEventListener("scroll", function() {
  if (document.body.scrollTop+ window.innerHeight > document.documentElement.scrollHeight - 200) {
    if (!isLoading && isEnd == false) {
      getData(LANG);
      channelOffset +=15;
    }
  }
})

function changeLang(lang) {
  LANG = lang;
  channelOffset = 0;
  isEnd = false;
  $('.channel-list > *').remove();
  getData(LANG);
  channelOffset +=15;
  $('.page-title').text(window.I18N[lang].title);
  $('.viewer-title').text(window.I18N[lang].viewer_title);
}