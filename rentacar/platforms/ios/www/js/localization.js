var rootURL = "http://192.168.0.10:8090/";
//var rootURL = "http://5.1.28.174:8090/";

var LanguageStorage = window.localStorage;
var language = window.navigator.language.slice(0, 2);

$(document).on("pagebeforecreate", '#main_page', function () {
    getInterfaceLanguage();
});

$(document).on('pagecreate', function () {
    setInterfaceLanguage();
});

function setInterfaceLanguage() {
    for (var i = 0, key; i < LanguageStorage.length; i++) {
        key = LanguageStorage.key(i);
        $('#' + key.slice(0, -2)).text(LanguageStorage[key]);
    }
}

function getInterfaceLanguage() {
    if (typeof (LanguageStorage['buttonAdd' + language]) === "undefined") {
        alert(typeof(LanguageStorage));
        alert(language);
        //LanguageStorage.clear();
        var restURL = "WebApp/services/get/interfacelanguage",
                queryParam = "?language_id=" + language;
        $.ajax({
            url: rootURL + restURL + queryParam,
            type: 'GET',
            dataType: "jsonp",
            jsonp: 'callback',
            jsonpCallback: 'interfacelanguage',
            //timeout: 5000,
            success: function (data) {
                $.each(data, function (i, row) {
                    //LanguageStorage[row.name + language] = row.value;
                });
                //$(document).trigger('pagecreate');
                alert('success');
            },
            error: function () {
            alert("There was an error loading the data!");
             }
        });
    }
}
