function selectable(className, $input, appendable, replacement) {
    var elems = jQuery('.' + className);
    elems.each(function (i, e) {
        var $e = jQuery(e);
        $e.on('click', function (evt) {
            var toSet = jQuery(this).text();
            if (!!appendable) {
                if (evt.shiftKey || evt.ctrlKey) {
                    var valueBefore = $input.val();
                    if (!!valueBefore) {
                        if (!!replacement) {
                            toSet = valueBefore + ',' + toSet.replace(replacement, "");
                        } else {
                            toSet = valueBefore + ',' + toSet;
                        }
                    }
                }
            }
            $input.val(toSet);
        });
        $e.css('color', 'blue');
        $e.css('cursor', 'Pointer');
    });
}