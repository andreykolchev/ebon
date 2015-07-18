
$('body').addClass('ui-alt-icon');

var pick_up_location_id;
var drop_off_location_id;

var is_pick_up_location;
var is_drop_off_location;

var current_coutry_id;
var current_city_id;
var current_car_id;
var current_account_id = 1;
var current_currency_id = 3;
var current_currency = "USD";

var dataStorage = window.localStorage;
var localLanguage = dataStorage['localLanguage'];
var localLanguageId = dataStorage['localLanguageId'];
var rootURL = dataStorage['rootURL'];
//var localLanguage = 'ru';
//var localLanguageId = 2;
//var rootURL = "http://192.168.0.10:8090/";


var LOADING;
var ERROR;
var ORDER_CREATE;

/*-----------------------------localization-----------------------------*/
function buildSettings() {
    if(typeof(dataStorage['current_currency']) !== "undefined"){
        current_currency = dataStorage['current_currency'];
        current_currency_id = dataStorage['current_currency_id'];
        $('.buttonCurrency').html(current_currency);
    }
}

function buildInterfaceMessages() {
    if(typeof(dataStorage['LOADING'+localLanguage]) !== "undefined"){
         LOADING = dataStorage['LOADING'+localLanguage];
         ERROR = dataStorage['ERROR'+localLanguage]; 
         ORDER_CREATE = dataStorage['ORDER_CREATE'+localLanguage]; 
    }else{
         LOADING = 'loading...';
         ERROR = 'There was an error loading the data!';
         ORDER_CREATE = 'Order created successfully';
    }
}

function buildInterface() {
    for (var i = 0, key; i < dataStorage.length; i++) {
        key = dataStorage.key(i);
        $('#' + key.slice(0, -2)).text(dataStorage[key]);
        $('.' + key.slice(0, -2)).text(dataStorage[key]);
    }
}
/*-----------------------------localization-----------------------------*/


/*-----------------------------messages-----------------------------*/
function showLoadingMsg(){
    $.mobile.loading("show", {
        text: LOADING,
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
        top: ($(window).height()*70/100)
    });
    var removeToast = function(){
        $(this).remove();
    };
    $toast.click(removeToast);
    $toast.appendTo($.mobile.pageContainer).delay(5000);
    $toast.fadeOut(400, removeToast);
}
/*-----------------------------messages-----------------------------*/

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
    setDropOffDate(1);
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
    current_city_id = $(this).data('identity');
    $.mobile.changePage($("#select_location"), {transition: "none"});
});

$('#location_list').on('click', 'li a', function () {
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

$('#currency_list1').on('click', 'li a', function () {
    current_currency_id = $(this).data('identity');
    current_currency = $(this).text();
    $('.buttonCurrency').html(current_currency);
    $( "#popupCurrency1" ).popup("close");
    dataStorage['current_currency'] = current_currency;
    dataStorage['current_currency_id'] = current_currency_id;
});

$('#currency_list2').on('click', 'li a', function () {
    current_currency_id = $(this).data('identity');
    current_currency = $(this).text();
    $('.buttonCurrency').html(current_currency);
    $( "#popupCurrency2" ).popup("close");
    showCars();
});

$('#currency_list3').on('click', 'li a', function () {
    current_currency_id = $(this).data('identity');
    current_currency = $(this).text();
    $('.buttonCurrency').html(current_currency);
    $( "#popupCurrency3" ).popup("close");
    showCarInformation();
});
/*-----------------------------list-----------------------------*/


/*-----------------------------pageshow-----------------------------*/
$(document).on('pagebeforeshow', '#main_page', function () {
    buildSettings();
    buildInterfaceMessages();
    buildInterface();
});

$(document).on('pagebeforeshow', '#booking_page', function () {
    var currDate = new Date();
    //set dates
    $('#pick_up_date').trigger('datebox', {'method': 'set', 'value': currDate});
    $('#pick_up_time').trigger('datebox', {'method': 'set', 'value': currDate});
    $('#drop_off_time').trigger('datebox', {'method': 'set', 'value': currDate});
    setDropOffDate(1);
    //set language
    $('.date_time').datebox("option", {"useLang": localLanguage});
    buildInterface();
});

$(document).on('pageshow', '#select_country', function () {
    buildInterface();
    showLoadingMsg();
    showCountries();
});

$(document).on('pageshow', '#select_payment_cards', function () {
    buildInterface();
    showLoadingMsg();
    showPaymentCards();
});

$(document).on('pageshow', '#select_city', function () {
    buildInterface();
    showLoadingMsg();
    showCities();
});

$(document).on('pageshow', '#select_location', function () {
    buildInterface();
    showLoadingMsg();
    showLocations();
});

$(document).on('pageshow', '#account_settings', function () {
    fillCurrency($('#popupCurrency1'));
});

$(document).on('pageshow', '#select_car', function () {
    $('#location_info').text( $('#pick_up_location').text());
    $('#date_info').text( $('#pick_up_date').datebox().val() + ' - ' + $('#drop_off_date').datebox().val());
    showLoadingMsg();
    fillCurrency($('#popupCurrency2'));
    showCars();
});

$(document).on('pagebeforeshow', '#car_information', function () {
    fillCurrency($('#popupCurrency3'));
    showCarInformation();
    showAdditionalService();
});
/*-----------------------------pageshow-----------------------------*/


/*-----------------------------ajax-----------------------------*/

function fillCurrency(popupCurrency) {
    var restURL = "WebApp/services/get/currency";
    var queryParam = "?language_id=" + localLanguageId;
    popupCurrency.find('li').remove();
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'currency',
        timeout: 3000,
        success: function (data) {
            $.each(data, function (i, row) {
               popupCurrency.find('ul').append('<li><a href="#" data-identity="' + row.id + '">' + row.name + '</a></li>');
            });
            popupCurrency.find('ul').listview("refresh");
        }
    });

}

function showPaymentCards() {
    var restURL = "WebApp/services/get/payment_cards",
            queryParam = "?account_id=" + current_account_id;
    $('#payment_cards_list li').remove();
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'payment_cards',
        timeout: 3000,
        success: function (data) {
            $.each(data, function (i, row) {
                $('#payment_cards_list').append('<li><a href="#" data-identity="' + row.id + '">' + row.name + '</a></li>');
            });
            $("#payment_cards_list").listview("refresh");
        },
        error: function () {
            alert(ERROR);
            $.mobile.changePage($("#account_page"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}

function showCountries() {
    var restURL = "WebApp/services/get/country";
    var queryParam = "?language_id=" + localLanguageId;
    
    $('#country_list li').remove();
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'countires',
        timeout: 3000,
        success: function (data) {
            $.each(data, function (i, row) {
                $('#country_list').append('<li><a href="#" data-identity="' + row.id + '">' + row.name + '</a></li>');
            });
            $("#country_list").listview("refresh");
        },
        error: function () {
            alert(ERROR);
            $.mobile.changePage($("#booking_page"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });

}

function showCities() {
    var restURL = "WebApp/services/get/city",
            queryParam = "?country_id=" + current_coutry_id + "&language_id=" + localLanguageId;
    $('#city_list li').remove();
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'cities',
        timeout: 3000,
        success: function (data) {
            $.each(data, function (i, row) {
                $('#city_list').append('<li><a href="#" data-identity="' + row.id + '">' + row.name + '</a></li>');
            });
            $("#city_list").listview("refresh");
        },
        error: function () {
            alert(ERROR);
            $.mobile.changePage($("#booking_page"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}

function showLocations() {
    var restURL = "WebApp/services/get/service_location";
    var queryParam = "?city_id=" + current_city_id + "&language_id=" + localLanguageId;
    $('#location_list li').remove();
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'cars',
        timeout: 3000,
        success: function (data) {
            $.each(data, function (i, row) {
                $('#location_list').append('<li><a href="#" data-identity="' + row.id + '">' + row.name + '</a></li>');  
            });
            $("#location_list").listview("refresh");
         },
        error: function () {
            alert(ERROR);
            $.mobile.changePage($("#booking_page"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}

function showCars() {
    var restURL = "WebApp/services/get/car";
    var queryParam = "?location_id=" + pick_up_location_id + "&language_id=" + localLanguageId+ "&currency_id=" + current_currency_id;
    $('#car_list li').remove();
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'cars',
        timeout: 3000,
        success: function (data) {
            $.each(data, function (i, row) {
                $('#car_list').append('<li>' + '<a href="#" data-identity="' + row.id + '">' +  buildCarInfoHTML(row) + '</a>' + '</li>');   
            });
            $("#car_list").listview("refresh");
            buildInterface();
        },
        error: function () {
            alert(ERROR);
            $.mobile.changePage($("#booking_page"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}


function showCarInformation() {
  
    var restURL = "WebApp/services/get/car";
    var queryParam = "?car_id=" + current_car_id + "&language_id=" + localLanguageId + "&currency_id=" + current_currency_id;   
    
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'car',
        timeout: 3000,
        success: function (data) {
            $.each(data, function (i, row) {
                 $("#car_info").html(buildCarInfoHTML(row));    
                 $('.car_info_footer').remove();
            });
            buildInterface();
        },
        error: function () {
            alert(ERROR);
            $.mobile.changePage($("#select_car"), {transition: "none"});
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}

function showAdditionalService() {
  
    var restURL = "WebApp/services/get/additional_service";
    var queryParam = "?&language_id=" + localLanguageId + "&currency_id=" + current_currency_id;   
    $('#additional_service_list li').remove();
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: "jsonp",
        jsonp: 'callback',
        jsonpCallback: 'additional_service',
        timeout: 3000,
        success: function (data) {
            $.each(data, function (i, row) {
                $('#additional_service_list').append('<li id=' + row.id + '>' + '<a href="#>' +  buildAdditionalServiceHTML(row) + '</a>' + '</li>');   
            });
             $("#additional_service_list").listview("refresh");
        },
        error: function () {
            alert(ERROR);
        },
        complete: function () {
            $.mobile.loading('hide');
        }
    });
}

function bookCar() {
    var new_order_id;
    var restURL = "WebApp/services/post/orders";
    var queryParam = "?account_id=" + current_account_id +
            "&car_id=" + current_car_id +
            "&get_service_location_id=" + pick_up_location_id +
            "&get_date_time=" + getFormattedDate($('#pick_up_date').datebox('getTheDate'), $('#pick_up_time').datebox('getTheDate')) +
            "&put_service_location_id=" + ((drop_off_location_id > 0) ? drop_off_location_id : pick_up_location_id) +
            "&put_date_time=" + getFormattedDate($('#drop_off_date').datebox('getTheDate'), $('#drop_off_time').datebox('getTheDate'));
    $.ajax({
        url: rootURL + restURL + queryParam,
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'order',
        timeout: 3000,
        success: function (data) {
            $.each(data, function (i, row) {
                new_order_id = row.id;
            });
            bookAdditionalService(new_order_id);
        },
        error: function () {
            alert(ERROR);
        }
    });
}

function bookAdditionalService(order_id) {
    var additionalServiceData = "";

    $('#additional_service_list li').each(function (i, elem) {
        var additional_service_id = elem.id;
        var additional_number = $(this).find(".additional_number").val();
        if (additional_number !== "") {
            additionalServiceData = additionalServiceData + "" + additional_service_id + "," + additional_number + ";";
        }
    });

    if (additionalServiceData !== "") {
        var restURL = "WebApp/services/post/order_details";
        var queryParam = "?orders_id=" + order_id + "&additional_service_data=" + additionalServiceData;
        $.ajax({
            url: rootURL + restURL + queryParam,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'callback',
            jsonpCallback: 'order_details',
            timeout: 3000,
            success: function (data) {
                toast(ORDER_CREATE);
                $.mobile.changePage($("#main_page"), {transition: "none"});
            },
            error: function () {
                alert(ERROR);
            }

        });
    } else {
        toast(ORDER_CREATE);
        $.mobile.changePage($("#main_page"), {transition: "none"});
    }
}

/*-----------------------------ajax-----------------------------*/


/*-----------------------------buildHTML-----------------------------*/
function buildCarInfoHTML(row) {
    
    var CarInfoHTML;
    
    CarInfoHTML =  
    '<div class="car_info_header">'+
        '<div class="car_info_header_name">' + row.name + '</div>' +
    '</div>' +
    '<div class="car_info_container">' +
        '<div class="car_info_left">' +
            '<img class="car_img" src="' + rootURL + row.img_path + '">' + 
        '</div>' + 
        '<div class="car_info_center">' +
        '</div>' +
        '<div class="car_info_right">' +
            '<div class="car_info_price"> day: ' + current_currency +  ' ' + row.price_day +'</div>' + 
            '<div class="car_info_price"> week: '+ current_currency + ' ' + row.price_week +'</div>' + 
            '<div class="car_info_price"> month: '+ current_currency + ' ' + row.price_month +'</div>' + 
        '</div>' +
    '</div>';
  
    return CarInfoHTML;
 }
 
function buildAdditionalServiceHTML(row) {
    
    var AdditionalServiceHTML;
    
    AdditionalServiceHTML =  
    '<div class="additional_header">'+
        '<div class="additional_header_name">' + row.name + '</div>' +
    '</div>'+
    '<div class="additional_container">' +
        '<div class="additional_left">' +
            '<img class="additional_img" src="' + rootURL + row.img_path + '">' + 
        '</div>' + 
        '<div class="additional_center">' +
            '<div class="additional_price"> day: ' + current_currency +  ' ' +  row.price_day +'</div>' + 
            '<div class="additional_price"> week: '+ current_currency +  ' ' +  row.price_week +'</div>' + 
            '<div class="additional_price"> month: '+ current_currency +  ' ' +  row.price_month +'</div>' + 
        '</div>' +
        '<div class="additional_right">' +
            '<input class="additional_number" type="number" value="">'+
        '</div>' +
    '</div>';
  
    return AdditionalServiceHTML;
 }
/*-----------------------------buildHTML-----------------------------*/