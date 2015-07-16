var rootURL = "http://192.168.0.10:8090/";
//var rootURL = "http://5.1.28.174:8090/";

var pick_up_location_id;
var drop_off_location_id;

var is_pick_up_location;
var is_drop_off_location;

var current_coutry_id;
var current_car_id;
var current_account_id =1;


$('body').addClass('ui-alt-icon');



var LanguageStorage = window.localStorage;
//var language = window.navigator.language.slice(0, 2);
//var language = navigator.globalization.getPreferredLanguage();
var language = 'ru';

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
        LanguageStorage.clear();
        var restURL = "WebApp/services/get/interfacelanguage",
                queryParam = "?language_id=" + language;
        $.ajax({
            url: rootURL + restURL + queryParam,
            type: 'GET',
            dataType: "jsonp",
            jsonp: 'callback',
            jsonpCallback: 'interfacelanguage',
            success: function (data) {
                $.each(data, function (i, row) {
                    LanguageStorage[row.name + language] = row.value;
                });
                $(document).trigger('pagecreate');
            },
        });
    }
}


function showLoadingMsg(){
    $.mobile.loading("show", {
        text: "loading...",
        textVisible: true,
        textonly: true,
        theme: "a",
        html: ""
    });
}


function toast(message) {
    var $toast = $('<div class="ui-loader ui-overlay-shadow ui-body-e ui-corner-all"><h3>' + message + '</h3></div>');

    $toast.css({
        display: 'block', 
        background: '#fff',
        opacity: 0.90, 
        position: 'fixed',
        padding: '7px',
        'text-align': 'center',
        'font-size': '10px',
        width: '270px',
        left: ($(window).width() - 284) / 2,
        top: $(window).height() - 20
    });

    var removeToast = function(){
        $(this).remove();
    };

    $toast.click(removeToast);

    $toast.appendTo($.mobile.pageContainer).delay(2000);
    $toast.fadeOut(400, removeToast);
}

/*-----------------------------location-----------------------------*/
$('#pick_up_location').on('click', function () {
    is_pick_up_location = true;
    is_drop_off_location = false;
    $.mobile.changePage($("#select_country"), {transition: "none"});
});

$('#drop_off_location').on('click', function () {
    is_pick_up_location = false;
    is_drop_off_location = true;
    $.mobile.changePage($("#select_country"), {transition: "none"});
});

$(document).on('change', '#checkbox1', function () {
    if ($('#checkbox1').prop('checked')) {
        $('#drop_off_location_div').hide();
    }
    if (!$('#checkbox1').prop('checked')) {
        $('#drop_off_location_div').show();
    }
});

$(document).on('change', '#checkbox2', function () {
    if ($('#checkbox2').prop('checked')) {
        $('#driver_age_div').hide();
    }
    if (!$('#checkbox2').prop('checked')) {
        $('#driver_age_div').show();
    }
});
/*-----------------------------location-----------------------------*/

/*-----------------------------datebox-----------------------------*/

function getFormattedDate(currdate, currtime) {
    var dd = currdate.getDate();
    if (dd < 10) {dd = '0' + dd;}
    var mm = currdate.getMonth() + 1;
    if (mm < 10) {mm = '0' + mm;}
    var y = currdate.getFullYear();
    var h = currtime.getHours();
    if (h < 10) {h = '0' + h;}
    var m = currtime.getMinutes();
    if (m < 10) {m = '0' + m;}
    var s = currtime.getSeconds();
    if (s < 10) {s = '0' + s;}
    var formattedDate = y + '-' + mm + '-' + dd + ' ' + h + ":" + m + ":" + s;
    return formattedDate;
}

function setDropOffDate(numberOfDaysToAdd) {
    var currDate = $('#pick_up_date').datebox('getTheDate');
    currDate.setDate(currDate.getDate() + numberOfDaysToAdd);
    $('#drop_off_date').trigger('datebox', {
        'method': 'set',
        'value': currDate
    }).trigger('datebox', {
        'method': 'doset'
    });
}

$('#pick_up_date').on('click', function () {
    $('#pick_up_date').datebox('open');
});

$('#pick_up_date').on('change', function () {
    setDropOffDate(3);
});

$('#pick_up_time').on('click', function () {
    $('#pick_up_time').datebox('open');
});

$('#drop_off_date').on('click', function () {
    $('#drop_off_date').datebox('open');
});

$('#drop_off_time').on('click', function () {
    $('#drop_off_time').datebox('open');
});
/*-----------------------------datebox-----------------------------*/


/*-----------------------------list-----------------------------*/
$('#country_list').on('click', 'li a', function () {
    current_coutry_id = $(this).data('identity');
    $.mobile.changePage($("#select_city"), {transition: "none"});
});

$('#city_list').on('click', 'li a', function () {
    if (is_pick_up_location) {
        pick_up_location_id = $(this).data('identity');
        $('#pick_up_location').text($(this).text());
    }
    if (is_drop_off_location) {
        drop_off_location_id = $(this).data('identity');
        $('#drop_off_location').text($(this).text());
    }
    $.mobile.changePage($("#booking_page"), {transition: "none"});
});

$('#car_list').on('click', 'li a', function () {
    current_car_id = $(this).data('identity');
    $.mobile.changePage($("#car_information"), {transition: "none"});
});
/*-----------------------------list-----------------------------*/


/*-----------------------------pageshow-----------------------------*/
$(document).on('pageshow', '#booking_page', function () {
    var currDate = new Date();
    //
    $('#pick_up_date').trigger('datebox', {'method': 'set', 'value': currDate});
    $('#pick_up_time').trigger('datebox', {'method': 'set', 'value': currDate});
    $('#drop_off_time').trigger('datebox', {'method': 'set', 'value': currDate});
    setDropOffDate(3);
});

$(document).on('pageshow', function () {
//    setInterfaceLanguage();
});

$(document).on('pageshow', '#select_country', function () {
    showLoadingMsg();
    showCountries();
});

$(document).on('pageshow', '#select_city', function () {
    showLoadingMsg();
    showCities();
});

$(document).on('pageshow', '#select_car', function () {
    $('#location_info').text( $('#pick_up_location').text());
    $('#date_info').text( $('#pick_up_date').datebox().val() + ' - ' + $('#drop_off_date').datebox().val());
    showLoadingMsg();
    showCars();
});

$(document).on('pageshow', '#car_information', function () {
    showLoadingMsg();
    showCarInformation();
});


function setInterfaceLanguage() {
    for (var i = 0, key; i < localStorage.length; i++) {
        key = localStorage.key(i);
        $('#' + key.slice(0, -2)).text(localStorage[key]);
    }
}

/*-----------------------------pageshow-----------------------------*/


/*-----------------------------ajax-----------------------------*/

function showCountries() {
    var restURL = "WebApp/services/get/country";
    $('#country_list li').remove();
    $.ajax({
        url: rootURL + restURL,
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'countires',
        timeout: 5000,
        success: function (data) {
            $.each(data, function (i, row) {
                $('#country_list').append('<li><a href="#" data-identity="' + row.id + '">' + row.name + '</a></li>');
            });
            $("#country_list").listview("refresh");
        },
        error: function () {
            alert("There was an error loading the data!");
            $.mobile.changePage($("#booking_page"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });

}

function showCities() {
    var restURL = "WebApp/services/get/city",
            queryParam = "?country_id=" + current_coutry_id;
    $('#city_list li').remove();
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'cities',
        timeout: 5000,
        success: function (data) {
            $.each(data, function (i, row) {
                $('#city_list').append('<li><a href="#" data-identity="' + row.id + '">' + row.name + '</a></li>');
            });
            $("#city_list").listview("refresh");
        },
        error: function () {
            alert("There was an error loading the data!");
            $.mobile.changePage($("#booking_page"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}

function showCars() {
    var restURL = "WebApp/services/get/car";
    var queryParam = "?location_id=" + pick_up_location_id;
    
    $('#car_list li').remove();
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'cars',
        timeout: 5000,
        success: function (data) {
            $.each(data, function (i, row) {
                $('#car_list').append('<li>' + '<a href="#" data-identity="' + row.id + '">' +  buildCarInfoHTML(row) + '</a>' + '</li>');   
            });
            $("#car_list").listview("refresh");
        },
        error: function () {
            alert("There was an error loading the data!");
            $.mobile.changePage($("#booking_page"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}

function showCarInformation() {
  
    var restURL = "WebApp/services/get/car/"+ current_car_id;
       
    $.ajax({
        url: rootURL + restURL,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'car',
        timeout: 5000,
        success: function (data) {
            $.each(data, function (i, row) {
                 $("#car_info").html(buildCarInfoHTML(row));    
                 $('.car_info_footer').remove();
            });
        },
        error: function () {
            alert("There was an error loading the data!");
            $.mobile.changePage($("#select_car"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}
 
function buildCarInfoHTML(row) {
    
    var CarInfoHTML;
    
    CarInfoHTML =  
        '<div class="car_info_header">'+
        '<div class="car_info_header_name">' + row.name + '</div>' +
        '<div class="car_info_header_srt">or similar</div>' + 
        '<div class="car_info_header_value">Excelent value</div>' + 
    '</div>' +
    '<div class="car_info_container">' +
        '<div class="car_info_left">' +
            '<img class="car_img" src="' + rootURL + row.img_path + '">' + 
            '<div> Suplied by:</div>' +
            '<div> RENT </div>' +
        '</div>' + 
        '<div class="car_info_center">' +
            '<div>|</div>' +
            '<div>|</div>' +
            '<div>|</div>' +
            '<div>|</div>' +
            '<div>|</div>' +
        '</div>' +
        '<div class="car_info_right">' +
            '<div class="car_info_price"> UAH2052.65 </div>' + 
            '<div> Location: In Terminal</div>' + 
            '<div> Fuel Policy:Full to Full</div>' + 
        '</div>' +
    '</div>' + 
    '<div class="car_info_footer">' + 
        '<div> FREE Cancellation </div>' +  
    '</div>' ;
  
    return CarInfoHTML;
 }
 
function bookCar() {
    var restURL = "WebApp/services/post/order";
    var queryParam = "?account_id="+current_account_id+
                     "&car_id="+current_car_id+
                     "&pick_up_location_id="+pick_up_location_id +
                     "&drop_off_location_id="+pick_up_location_id +
                     "&pick_up_date_time="+getFormattedDate($('#pick_up_date').datebox('getTheDate'),$('#pick_up_time').datebox('getTheDate'))+
                     "&drop_off_date_time="+getFormattedDate($('#drop_off_date').datebox('getTheDate'),$('#drop_off_time').datebox('getTheDate'));
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: 'jsonp', 
        jsonp: 'callback',
        jsonpCallback: 'order',
        timeout: 5000,
        success: function () {
            toast('Order created successfully');
            $.mobile.changePage($("#main_page"), {transition: "none"});
        },
        error: function () {
            alert("There was an error loading the data!");
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}
/*-----------------------------ajax-----------------------------*/


/*-----------------------------BOOKING PAGE-----------------------------*/



