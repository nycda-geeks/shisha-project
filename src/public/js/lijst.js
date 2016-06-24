$(document).ready(function (){

$.getJSON('/city.json', function(jsonData) {
    var select = $('#lijst');
    $(jsonData).each(function (index, city) {    
        var option = $("<option/>").attr("value", city.city).text(city.city);
        select.append(option);

    });
})

})