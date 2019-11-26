(function () {
  var ms_ie = false;
  var ua = window.navigator.userAgent;
  var old_ie = ua.indexOf('MSIE');
  var new_ie = ua.indexOf('Trident/');

  if ((old_ie > -1) || (new_ie > -1) && window.location.href !== 'https://www.outsidersignal.com/ie') {
    ms_ie = true;
    window.location.href = 'https://www.outsidersignal.com/ie';
  }
})();