$(document).ready(function() {
  var windowHeight = $(window).height();

  window.onresize = function(event) {
    console.log('change');
    windowHeight = $(window).height()
  };

  $('.home-button').click(function(event) {
    console.log(windowHeight);
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 500);
  });
  $('.assignment-button').click(function(event) {
    console.log(windowHeight);
    event.preventDefault();
    $('html, body').animate({ scrollTop: windowHeight }, 500);
  });
  $('.project-button').click(function(event) {
    console.log(windowHeight);
    event.preventDefault();
    $('html, body').animate({ scrollTop: 2*windowHeight }, 500);
  });
});

