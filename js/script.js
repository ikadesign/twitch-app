var channelOffset = 0;
var isLoading;
const clientId = 'q76w73hhqbti678iemb94j43sro4kh';
const limit = 15;
var gameType = 'Overwatch';

function getData() {
  channelOffset +=15;
  isLoading = true;
  document.querySelector('.loading').style.display = 'block';
  var streamReq = new XMLHttpRequest();
  var url = `https://api.twitch.tv/kraken/streams/?client_id=${clientId}&game=${gameType}&offset=${channelOffset}&limit=${limit}`;
  streamReq.open("GET",url,true);
  streamReq.onload = function() {
    // console.log(streamReq.status);
    if (streamReq.status >= 200 && streamReq.status < 400) {
      var streamData = JSON.parse(streamReq.responseText);
      str(streamData);
    }
  }
  streamReq.send();

  function str(data) {
    console.log(data);
    let container = document.querySelector('.channel-list');
    for (let dataOut of data.streams) {
      var itemData = `
        <li class="channel-item">
          <a href="${dataOut.channel.url}" target="_blank" title="Check Now!">
            <div class="thumb-channel">
              <img src="${dataOut.preview.medium}" alt="channel-thumb" onload="this.style.opacity=1" />
            </div>
            <div class="info-channel">
              <div class="author-info">
                <img src="${dataOut.channel.logo}" alt="author-thumb" onload="this.style.opacity=1" />
              </div>
              <div class="title-info">
                <span class="title-info-text">
                  ${dataOut.channel.status}
                </span>
                <div class="author-info-text">
                  ${dataOut.channel.display_name}
                </div>
                <div class="viewer-info-text">
                  Viewers: ${dataOut.viewers}
                </div>
              </div>
            </div>
          </a>
        </li>
      `;
      const div = document.createElement('div');
      container.appendChild(div);
      div.outerHTML = itemData;
    }
    isLoading = false;
    document.querySelector('.loading').style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", function() {
  getData();
})

window.addEventListener("scroll", function() {
  if (document.body.scrollTop+ window.innerHeight > document.documentElement.scrollHeight - 200) {
    getData();
  }
})