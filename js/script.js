var channelOffset = 0;
var isLoading;

function getData(test) {
  var clientId = 'q76w73hhqbti678iemb94j43sro4kh';
  var limit = 15;
  channelOffset +=15;
  isLoading = true;
  $('.loading').show();
  $.ajax({
    url: 'https://api.twitch.tv/kraken/streams/?client_id=' + clientId + '&game=Overwatch' + '&limit=' + limit + '&offset='+ channelOffset,
    
    error: function(err) {
      console.log("Error!");
    },
    success: function(response) {
      console.log(response);
      (function() {
        var chlist = $('.channel-list');
        for (var i = 0; i<response.streams.length;i++) {
          var itemData = `
            <li class="channel-item">
              <a href="${response.streams[i].channel.url}" target="_blank" title="Check Now!">
                <div class="thumb-channel">
                  <img src="${response.streams[i].preview.medium}" alt="channel-thumb" onload="this.style.opacity=1" />
                </div>
                <div class="info-channel">
                  <div class="author-info">
                    <img src="${response.streams[i].channel.logo}" alt="author-thumb" onload="this.style.opacity=1" />
                  </div>
                  <div class="title-info">
                    <span class="title-info-text">
                      ${response.streams[i].channel.status}
                    </span>
                    <div class="author-info-text">
                      ${response.streams[i].channel.display_name}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          `;
          chlist.append(itemData);
          isLoading = false;
          $('.loading').fadeOut();
        }
      }());
    }
  })
}
$(document).ready(function(){
  getData();
  $(window).scroll(function(){
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 200) {
      if ( isLoading == false ) {
        getData();
      }
    }
  })
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