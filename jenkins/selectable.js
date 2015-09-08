function selectable(className, $input, appendable, replacement, noDuplicates) {
    var elems = jQuery('.' + className);
    elems.each(function (i, e) {
        var $e = jQuery(e);
        $e.on('click', function (evt) {
            var toSet = jQuery(this).text();
            if (!!appendable) {
                if (evt.shiftKey || evt.ctrlKey) {
                    var valueBefore = $input.val();
                    if (!!valueBefore) {
                        var toSetReplaced = toSet;
                        if (!!replacement) {
                            toSetReplaced = toSet.replace(replacement, "");
                        }
                        if (!!noDuplicates && valueBefore.indexOf(toSetReplaced) !== -1) {
                            return;
                        }
                        toSet = valueBefore + ',' + toSetReplaced;
                    }
                }
            }
            $input.val(toSet);
        });
        $e.css('color', 'blue');
        $e.css('cursor', 'Pointer');
    });
}