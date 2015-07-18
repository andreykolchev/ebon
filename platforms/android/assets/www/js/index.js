//var rootURL = "http://192.168.0.10:8090/";
//var rootURL = "http://5.1.28.174:8090/";
var rootURL = "http://134.249.132.85:8090/";

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    onDeviceReady: function () {
        window.navigator.globalization.getLocaleName(
                function (locale) {
                    var localLanguage = locale.value.slice(0, 2);
                    if (localLanguage !== window.localStorage['localLanguage']) {
                        window.localStorage.clear();
                        getLanguageId(localLanguage);
                    } else {
                        window.location = "main.html";
                    }
                }
        );
    }
};
app.initialize();

function  setDefaultLanguage() {
    window.localStorage['rootURL'] = rootURL;
    window.localStorage['localLanguage'] = 'en';
    window.localStorage['localLanguageId'] = 1;
    window.location = "main.html";
}

function  getLanguageId(localLanguage) {
    var restURL = "WebApp/services/get/language",
            queryParam = "?name=" + localLanguage;
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'language',
        timeout: 1000,
        success: function (data) {
            $.each(data, function (i, row) {
                getInterface(localLanguage, row.id);
            });
        },
        error: function () {
            setDefaultLanguage();
        }
    });
}

function getInterface(localLanguage, localLanguageId) {
    var restURL = "WebApp/services/get/interface",
            queryParam = "?language_id=" + localLanguageId;
    window.localStorage['rootURL'] = rootURL;
    window.localStorage['localLanguage'] = localLanguage;
    window.localStorage['localLanguageId'] = localLanguageId;
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'interfacelanguage',
        timeout: 1000,
        success: function (data) {
            $.each(data, function (i, row) {
                window.localStorage[row.name + localLanguage] = row.value;
            });
            window.location = "main.html";
        },
        error: function () {
            setDefaultLanguage();
        }
    });
}