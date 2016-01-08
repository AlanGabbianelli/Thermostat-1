$(document).ready(function() {

///////////// THERMOSTAT /////////////

  var thermostat = new Thermostat();
  refreshPowerStatus();
  refreshThermostatTemperature();
  getData();

  $('#temp-up').click(function() {
    thermostat.increaseTemp();
    refreshThermostatTemperature();
  });

  $('#temp-down').click(function() {
    thermostat.decreseTemp();
    refreshThermostatTemperature();
  });

  $('#temp-reset').click(function() {
    thermostat.reset();
    refreshThermostatTemperature();
  });

  $('#PSM-on').click(function() {
    thermostat.turnPowerSaveOn();
    refreshPowerStatus();
    refreshThermostatTemperature();
  });

  $('#PSM-off').click(function() {
    thermostat.turnPowerSaveOff();
    refreshPowerStatus();
    refreshThermostatTemperature();
  });

  function refreshPowerStatus() {
    if(thermostat.isPowerSaveOn()){
      $('#power-saving-status').text('ON ');
    } else {
      $('#power-saving-status').text('OFF');
    }
  }

  function refreshThermostatTemperature() {
    $('#thermostat-temperature').text(thermostat.temp);
    $('h1').attr('class', thermostat.energyUsage());
  }

 ///////////// WEATHER API /////////////

  $('#go').click(function() {
    getData($('#country').val(), $('#city').val());
  });

  function getData(country, city) {
    var country_name = country || 'UK';
    var city_name = city || 'London';

    $.getJSON('http://api.wunderground.com/api/12a2d3bf53a24799/conditions/q/' + country_name + '/' + city_name + '.json')
    .done(function(data) {
      $('#current-city').text(data.current_observation.display_location.full);
      $('#city-temperature').text(data.current_observation.temp_c);
      $('#city-weather-condition').text(data.current_observation.weather);
      $('#city-weather-image').attr('src', data.current_observation.icon_url);
    })
    .fail(function() {
      $('#display-city-info').text('Ops, something went wrong!');
    });
  }
});
