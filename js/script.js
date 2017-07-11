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

getScrollXY = function() {
    var scrOfX = 0,
        scrOfY = 0;

    if (typeof(window.pageYOffset) == 'number') {
        //Netscape compliant
        scrOfY = window.pageYOffset;
        scrOfX = window.pageXOffset;
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        //DOM compliant
        scrOfY = document.body.scrollTop;
        scrOfX = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        //IE6 standards compliant mode
        scrOfY = document.documentElement.scrollTop;
        scrOfX = document.documentElement.scrollLeft;
    }
    return [scrOfX, scrOfY];
};
getDocHeight = function() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
};
// scroll code
window.addEventListener("scroll", function() {
  if (getDocHeight() <= getScrollXY()[1] + window.innerHeight) {
    getData();
  }
})
/*
function getData (cb) {
  const clientId = 'q76w73hhqbti678iemb94j43sro4kh';
  const limit = 20;
  
  $.ajax({
    url: 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&game=Overwatch&limit=' + limit,
    success: (response) => {
      console.log(response);
      cb(null, response);
    },
    error: (err) => {
      cb(err);
    }
  })
}

getData((err, data) => {
  // const {streams} = data;
  if (err) {
    console.log(err);
  } else {
    const streams = data.streams;

    const $row = $('.channel-list');
    for(const stream of streams) {
      $row.append(getColumn(stream));
    }  
  }
});

// return 每一個 col 的 html
function getColumn(data) {
  return `
    <li class="channel-item">
      <div class="thumb-channel">
        <img src="${data.preview.medium}" alt="channel-thumb">
      </div>
      <div class="info-channel">
        <div class="author-info">
          <img src="${data.channel.logo}" alt="author-thumb">
        </div>
        <div class="title-info">
          <span class="title-info-text">
            <a href="${data.channel.url}" target="_blank" title="Check now">${data.channel.status}</a>
          </span>
          <div class="author-info-text">
            ${data.channel.name}
          </div>
        </div>
      </div>
    </li>
  `;
    
}
*/