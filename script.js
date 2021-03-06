var albumApolloBay = {
     artist: 'Apollo Bay',
     songs: [
       { title: 'Me Again', duration: 232.0, audioUrl: 'assets/music/meAgain' },
          { title: 'Karma', duration: 312.0, audioUrl: 'assets/music/karma' },
          { title: 'Native Trees', duration: 250.0, audioUrl: 'assets/music/nativeTrees' },
          { title: 'Southern Soul', duration: 258.0, audioUrl: 'assets/music/southernSoul' },
          { title: 'Moldy Money', duration: 216.0, audioUrl: 'assets/music/moldyMoney' }
      ]
 };
 function forEach(array,callback) {
  for (var i=0; i<array.length; i++) {
    callback(array[i]);
  }
}



 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + playButtonTemplate + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '   <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
      + '</tr>'
      ;

     var $row = $(template);


     var clickHandler = function() {

         var songNumber = parseInt($(this).attr('data-song-number'));

         if (currentlyPlayingSongNumber !== null) {

             var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

             currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
             currentlyPlayingCell.html(playButtonTemplate);
         }

          if (currentlyPlayingSongNumber !== songNumber) {
              setSong(songNumber);
             currentSoundFile.play();
             updateSeekBarWhileSongPlays();
             currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

             var $volumeFill = $('.volume .fill');
             var $volumeThumb = $('.volume .thumb');
              $volumeFill.width(currentVolume + '%');
              $volumeThumb.css({left: currentVolume + '%'});

             $(this).html(pauseButtonTemplate);
              updatePlayerBarSong();
          } else if (currentlyPlayingSongNumber === songNumber) {
             if (currentSoundFile.isPaused()) {
                 $(this).html(pauseButtonTemplate);
                 $('.main-controls .play-pause').html(playerBarPauseButton);
                 currentSoundFile.play();
             } else {
                 $(this).html(playButtonTemplate);
                 $('.main-controls .play-pause').html(playerBarPlayButton);
                 currentSoundFile.pause();
             }

          }
  };

     $row.find('.song-item-number').click(clickHandler);
     return $row;
 };

    var $albumSongList = $('.album-view-song-list');

 var setCurrentAlbum = function(album) {
   currentAlbum = album;
   $albumSongList.empty();


     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
       $albumSongList.append($newRow);
     }
 };


 var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         currentSoundFile.bind('timeupdate', function(event) {
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');

             updateSeekPercentage($seekBar, seekBarFillRatio);
             setCurrentTimeInPlayerBar(this.getTime());
         });
     }
 };

 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
     var offsetXPercent = seekBarFillRatio * 100;
     // #1
     offsetXPercent = Math.max(0, offsetXPercent);
     offsetXPercent = Math.min(100, offsetXPercent);

     // #2
     var percentageString = offsetXPercent + '%';
     $seekBar.find('.fill').width(percentageString);
     $seekBar.find('.thumb').css({left: percentageString});
  };

  var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) {

        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;

        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);
        }


        updateSeekPercentage($(this), seekBarFillRatio);
    });

    $seekBars.find('.thumb').mousedown(function(event) {
        var $seekBar = $(this).parent();

        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;

            if ($seekBar.parent().attr('class') == 'seek-control') {
               seek(seekBarFillRatio * currentSoundFile.getDuration());
           } else {
               setVolume(seekBarFillRatio);
           }

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });


        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
    });
};

var setCurrentTimeInPlayerBar = function(currentTime) {
     if (currentSoundFile) {
         filterTimeCode
         $('.current-time').text(filterTimeCode(currentTime));
     }
 };

 var setTotalTimeInPlayerBar = function(totalTime) {
     if (currentSoundFile) {
         $('.total-time').text(filterTimeCode(totalTime));
     }
 };

 var filterTimeCode = function(timeInSeconds) {
     var roundedTime = Math.floor(parseFloat(timeInSeconds));
     var minutes = Math.floor(roundedTime / 60);
     var seconds = Math.floor(roundedTime % 60);
     if (roundedTime < 10) {
         return minutes + ':0' + seconds;
     } else {
         return minutes + ':' + seconds;
     }
 };


 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

 var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    setTotalTimeInPlayerBar(currentSongFromAlbum.duration);

};

var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }


    var lastSongNumber = currentlyPlayingSongNumber;


    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();


    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(playButtonTemplate);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }


    var lastSongNumber = currentlyPlayingSongNumber;

    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();


    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $nextSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $nextSongNumberCell.html(playButtonTemplate);
};

var setSong = function(songNumber) {
  if (currentSoundFile) {
        currentSoundFile.stop();
    }
     currentlyPlayingSongNumber = parseInt(songNumber);
     currentSongFromAlbum = currentAlbum.songs[songNumber - 1] ;
     currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
       formats: [ 'm4a' ],
       preload: true
   });
   setVolume(currentVolume);
 };

 var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 }

 var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

 var getSongNumberCell = function(number) {
     return $('.song-item-number[data-song-number="' + number + '"]');
 };


 var togglePlayFromPlayerBar = function() {

     var $currentSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);

     if (currentSoundFile.isPaused()) {
         $currentSongNumberCell.html(pauseButtonTemplate);
         $(this).html(playerBarPauseButton);
         currentSoundFile.play();
     } else {
         $currentSongNumberCell.html(playButtonTemplate);
         $(this).html(playerBarPlayButton);
         currentSoundFile.pause();
     }
 }



 var playButtonTemplate = '<a class="album-song-button"><img class="trackBtn" src="assets/images/play-button2.png"></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><img class="trackBtn" src="assets/images/pause-button.png"></a>';
 var playerBarPlayButton = '<img class="playerBarBtn" src="assets/images/play-button2.png">';
 var playerBarPauseButton = '<img class="playerBarBtn" src="assets/images/pause-button.png">';

 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentSoundFile = null;
 var currentVolume = 80;
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');
 var $playPauseButton = $('.main-controls .play-pause');


    $(document).ready(function() {
     setCurrentAlbum(albumApolloBay);
     setupSeekBars();
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     $playPauseButton.click(togglePlayFromPlayerBar);

  });
     var albums = [albumApolloBay];
     var index = 1;


    