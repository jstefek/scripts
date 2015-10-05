/**
 * Examples:
 * githubMediator.getBranches('richfaces','richfaces-qa',function(data){console.log(data);})
 * githubMediator.getTags('richfaces','richfaces-qa',function(data){console.log(data);})
 * githubMediator.getLatestTag('richfaces','richfaces-qa',function(data){console.log(data);})
 **/
var githubMediator = function () {
    return {
        sendAjaxRequestToGithubAPI: function (githubApiAddress, callbackDone) {
            var githubApiUrl = 'https://api.github.com';
            var address;
            var slash = '/';
            if (githubApiAddress.indexOf(githubApiUrl) === -1) {// does address contain githubApiUrl ?
                if (githubApiAddress.indexOf(slash) === 0) {// starts with slash ?
                    address = githubApiUrl + githubApiAddress;
                } else {
                    address = githubApiUrl + slash + githubApiAddress;
                }
            } else {
                address = githubApiAddress;
            }
            // send ajax request to github api
            jQuery.ajax({
                url: address,
                dataType: 'json',
                type: 'get'
            }).done(callbackDone);
        },
        getTags: function (owner, repo, callBack) {
            function callbackDone(datas) {
                var names = [];
                for (var i = 0; i < datas.length; i++) {
                    names.push(datas[i].name);
                }
                callBack(names);
            }
            this.sendAjaxRequestToGithubAPI('repos/' + owner + '/' + repo + '/tags', callbackDone);
        },
        getLatestTag: function (owner, repo, callBack) {
            function getLatestTagFromNames(names) {
                var latest = 1;
                var latestTMP = 1;
                var str = '';
                var begin = /\d\.\d\./;
                var end = /-.*/;
                for (var i = 0; i < names.length; i++) {
                    // replace beginning and end of the string
                    str = names[i].replace(begin, '').replace(end, '');
                    if (new Number(latestTMP) < new Number(str)) {
                        latestTMP = str;
                        latest = names[i];
                    }
                }
                return latest;
            }
            function callbackDone(data) {
                callBack(getLatestTagFromNames(data));
            }
            this.getTags(owner, repo, callbackDone);
        },
        getBranches: function (owner, repo, callBack) {
            function callbackDone(datas) {
                var refs = [];
                for (var i = 0; i < datas.length; i++) {
                    refs.push(datas[i].ref);
                }
                callBack(parseBranches(refs));
            }
            function parseBranches(refs) {
                var branches = [];
                var begin = 'refs/heads/';
                for (var i = 0; i < refs.length; i++) {
                    // replace beginning of the string
                    branches.push(refs[i].replace(begin, ''));
                }
                return branches;
            }
            this.sendAjaxRequestToGithubAPI('repos/' + owner + '/' + repo + '/git/refs/heads', callbackDone);
        }
    };
}();