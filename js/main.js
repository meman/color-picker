(function($){
  $(function(){
    var currentColor = [0,0,0,1],
        $alphaSlider = $('.alpha-slider'),
        $colorBlock = $('.color-block'),
        $colorInfo = $('.color-info'),
        $colorEditor = $('.color-editor'),
        isAlphaDrag = false;

    $alphaSlider.find('i')
        .mousedown(function() {
        isAlphaDrag = true;
        })
        .mouseup(function(e){
          isAlphaDrag = false;
        });

    $alphaSlider
        .mousemove(function() {
          var $this = $(this),
              sliderHeight = parseInt($this.css('height'),10),
              slideValue = event.pageY - $this.offset().top + 1;

          slideValue = slideValue > sliderHeight ? sliderHeight : slideValue < 0 ? 0 :slideValue;

          if(isAlphaDrag){
            currentColor[3] = +((1-(slideValue / 100)).toFixed(2));
            $this.find('i').css('top',slideValue);
            renderColor();
          }
        })
        .mouseleave(function(){
          isAlphaDrag = false;
        });

    $colorEditor.find('input').on('keyup',function(e){
      var $this = $(this),
          currentIndex = $colorEditor.find('input').index($this),
          currentValue =  currentIndex === 3 ? parseFloat($this.val()) : parseInt($this.val());

      // currentValue = currentValue < 0 ? 0 : currentIndex == 3 && currentValue > 1 ? 1 :
      //     currentValue > 255 ? 255 :currentValue;

      console.log(currentValue);

      // currentColor[currentIndex] = currentValue;
    });

    function rgbToHex(rgb){
      if(rgb[3] !== 1 || !rgb){
        return '';
      }
      return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    }

    function renderColor(){
      var colorToRender = currentColor[3] == 1 ? 'rgb('+currentColor[0]+','+currentColor[1]+','+currentColor[2]+')' :
      'rgba('+currentColor.join(',')+')';
      console.log(currentColor);
      $colorEditor.find('input').each(function(i,elm){
        elm.value = currentColor[i];
      });
      $colorBlock.css('background-color',colorToRender);
      $colorInfo.find('.color-rgb').text(colorToRender);
      $colorInfo.find('.color-hex').text(rgbToHex(currentColor));
    }

    renderColor();
  });
})(jQuery);
