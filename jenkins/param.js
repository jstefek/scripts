function getParam(paramName) {
    var input = getInputElement(paramName);
    function getInputElement(paramName) {
        var param = jQuery('td.setting-name:contains("' + paramName + '") + td.setting-main');
        var input = param.find('input:visible').get(0);
        var select = param.find('select:visible').get(0);
        return jQuery(!input ? select : input);
    }
    return {
        getInputElement: function () {
            return input;
        },
        setValue: function (newValue) {
            this.getInputElement().val(newValue);
        },
        hide: function () {
            this.getInputElement().closest('tbody').hide();
        }
    };
}