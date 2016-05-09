'use strict';

var colorEditor = (function () {
    var selectedColor = [0, 0, 0, 1], isAlphaEditing = false;
    //  Cached Dom
    var $container = $('.container'), $colorEditor = $('.color-editor'), $alphaSlider = $colorEditor.find('.alpha-slider');
    //Bind Events
    $alphaSlider.find('i').mousedown(setAlphaEditing);
    $container.mousemove(function(event){if(isAlphaEditing){setAlpha(event);}})
        .mouseup(function () {if(isAlphaEditing){setAlphaEditing(event);}});

    _render();

    function _render() {
        $colorEditor.find('.color-block').css('background-color', 'rgba(' + selectedColor.join(',') + ')');
        $alphaSlider.css('background-color', 'rgb(' + selectedColor.slice(0, 3).join(',') + ')');
        $alphaSlider.find('i').css('left', selectedColor[3] * 100 + '%');
    }
    function setAlphaEditing(event) {
        isAlphaEditing = (typeof event === 'boolean') ? event : !(event.type === 'mouseup' || event.type === 'mouseleave');
        $container.toggleClass('isDragging', isAlphaEditing);
        console.log(isAlphaEditing);
    }
    function setAlpha(event) {
        if (isAlphaEditing) {
            var val = +((event.pageX - $alphaSlider.offset().left ) / parseInt($alphaSlider.css('width')).toFixed(2));
            val = val >= 1 ? 1 : val <= 0 ? 0 : val;
            selectedColor[3] = val;
            _render();
        }
    }
})(jQuery);

