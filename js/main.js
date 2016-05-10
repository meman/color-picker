'use strict';

var colorEditor = (function () {
    var selectedColor = [45, 255, 45, 1], isAlphaEditing = false;

    //  Cached Dom
    var $container = $('.container'), $colorEditor = $('.color-editor'), $alphaSlider = $colorEditor.find('.alpha-slider')
    ,$colorInfo = $colorEditor.find('.color-info');

    //Bind Events
    $alphaSlider.find('i').mousedown(setAlphaEditing);
    $container.mousemove(function(event){if(isAlphaEditing){setAlpha(event);}})
        .mouseup(function () {if(isAlphaEditing){setAlphaEditing(event);}});

    _render();
    function _render() {
        $colorEditor.find('.color-block').css('background-color', 'rgba(' + selectedColor.join(',') + ')');
        $alphaSlider.css('background-color', 'rgb(' + selectedColor.slice(0, 3).join(',') + ')');
        $alphaSlider.find('i').css('left', selectedColor[3] * 100 + '%');
        $colorInfo.find('.color-hex').text('#'+getHex(selectedColor));
        $colorInfo.find('.color-rgb').text(getRGBstring(selectedColor));
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
    function getHex(rgb){
        return rgb[3] == 1 && rgb ? rgb.slice(0, 3).map(
            function (val) {
                return ("0" + parseInt(val,10).toString(16)).slice(-2);
            }).join('').toLocaleUpperCase() : '';
    }
    function getRGBstring(rgb) {
        if(rgb){
            if(rgb[3] !== 1){
                return 'rgba('+rgb.map(function(n){
                        return (n === +n && n !== (n|0)) ? n.toFixed(2) : n;
                    }).join(',')+')';
            }
            return 'rgb('+rgb.slice(0, 3).join(',')+')';
        }
        return ''

    }
    function setCurrentColor(rgb){
        selectedColor = rgb && rgb.length == 4 ? rgb : [0,0,0,1];
    }
    return {
        setCurrentColor:setCurrentColor
    };
})(jQuery);