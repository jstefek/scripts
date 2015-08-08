function getLatestTag() {

    // send ajax request to github api to get all tags from richfaces-qa repository.
    $.ajax({
        url: 'https://api.github.com/repos/richfaces/richfaces-qa/tags',
        dataType: 'json',
        type: 'get'
    }).done(function (datas) {
        var names = [];
        for (var i = 0; i < datas.length; i++) {
            names.push(datas[i].name);
        }
        return getLatestTagFromNames(names);
    });

    function getLatestTagFromNames(names) {
        var latest = 1;
        var latestTMP = 1;
        var str = '';
        var begin = /4.5./;
        var end = /-.*/;
        for (var i = 0; i < names.length; i++) {
            // replace beginning and end of the string
            str = names[i].replace(begin, '').replace(end, '');
            if (latestTMP < str) {
                latestTMP = str;
                latest = names[i];
            }
        }
        return latest;
    }
}