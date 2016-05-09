'use strict';

var colorEditor = (function () {
  var selectedColor = [0,0,0,1],
      isAlphaEditing = false;

  //  Cached Dom
  var $colorEditor = $('.color-editor'),
      $alphaSlider = $colorEditor.find('.alpha-slider');

  //Bind Events

  $alphaSlider.find('i')
      .mousedown(setAlphaEditing)
      .mouseup(setAlphaEditing);

  $alphaSlider
      .mouseleave(setAlphaEditing)
      .mousemove(setAlpha);

  _render();
  function _render() {
      $colorEditor.find('.color-block').css('background-color','rgba('+selectedColor.join(',')+')');
      $alphaSlider.css('background-color','rgb('+selectedColor.slice(0,3).join(',')+')');
      $alphaSlider.find('i').css('left',selectedColor[3]*100+'%');
  }
  function setAlphaEditing(event){
      isAlphaEditing = (typeof event === 'boolean') ? event : !(event.type === 'mouseup' || event.type === 'mouseleave');
  }
  function setAlpha(event){
    if(isAlphaEditing){
      var $this = $(this),
          slideValue = +(((event.pageX - $this.offset().left)/parseInt($this.css('width'))).toFixed(2));
      slideValue = slideValue >= 1 ? 1 : slideValue <= 0 ? 0 :slideValue;
      selectedColor[3] = slideValue;
      _render();
    }
  }
})(jQuery);

