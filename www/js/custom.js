//to pull params from url on spelllist page
function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

//

$(document).on("pageshow","#main",function(){
    // insertRecord();

    setTimeout(
      function()
      {
      $('#spin0').attr('value',localStorage.lvl0Value);
      $('#spin1').attr('value',localStorage.lvl1Value);
      $('#spin2').attr('value',localStorage.lvl2Value);
      $('#spin3').attr('value',localStorage.lvl3Value);
      $('#spin4').attr('value',localStorage.lvl4Value);
      $('#spin5').attr('value',localStorage.lvl5Value);
      $('#spin6').attr('value',localStorage.lvl6Value);
      $('#spin7').attr('value',localStorage.lvl7Value);
      $('#spin8').attr('value',localStorage.lvl8Value);
      $('#spin9').attr('value',localStorage.lvl9Value);

      //bottom panel
      $('#vSpin0').attr('value',localStorage.Vertlvl0Value);
      $('#vSpin1').attr('value',localStorage.Vertlvl1Value);

      //beta panel code
      // $('#spinSet0').attr('value',localStorage.lvl0MaxValue);
      // $('#spinSet1').attr('value',localStorage.lvl1MaxValue);
      // $('#spinSet2').attr('value',localStorage.lvl2MaxValue);
      // $('#spinSet3').attr('value',localStorage.lvl3MaxValue);
      // $('#spinSet4').attr('value',localStorage.lvl4MaxValue);
      // $('#spinSet5').attr('value',localStorage.lvl5MaxValue);
      // $('#spinSet6').attr('value',localStorage.lvl6MaxValue);
      // $('#spinSet7').attr('value',localStorage.lvl7MaxValue);
      // $('#spinSet8').attr('value',localStorage.lvl8MaxValue);
      // $('#spinSet9').attr('value',localStorage.lvl9MaxValue);

      }, 500);
    });

$(document).on("pageshow","#index2",function(){ // When entering pagetwo

    //assign functions to buttons on page index2
    $("#btnOrderByLevel").click(showRecordsByLevel);
    $("#btnOrderByRange").click(showRecordsByRange);
    $("#btnOrderByName").click(showRecords);
    $("#btnOrderByDuration").click(showRecordsByDuration);
    $("#spellBookBackButton").click(dropTable);
    // $("#btnDrop").click(dropTable);


    //assigning variables for query statements
    var className = getUrlParameter('class');
    var classLevel = getUrlParameter('level');


    if (classLevel === 'Cantrip'){
        selectAllStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = "' + classLevel + '"';
    } else {
        selectAllStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = ' + classLevel + '';
    }

    if (classLevel === 'Cantrip'){
        sortByLevelStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = "' + classLevel + '" ORDER BY CASE WHEN level = "Cantrip" THEN 0 WHEN level = 1 THEN 1 WHEN level = 2 THEN 2 WHEN level = 3 THEN 3 WHEN level = 4 THEN 4 WHEN level = 5 THEN 5 WHEN level = 6 THEN 6 WHEN level = 7 THEN 7 WHEN level = 8 THEN 8 WHEN level = 9 THEN 9 ELSE 20 END';
    } else {
        sortByLevelStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = ' + classLevel + ' ORDER BY CASE WHEN level = "Cantrip" THEN 0 WHEN level = 1 THEN 1 WHEN level = 2 THEN 2 WHEN level = 3 THEN 3 WHEN level = 4 THEN 4 WHEN level = 5 THEN 5 WHEN level = 6 THEN 6 WHEN level = 7 THEN 7 WHEN level = 8 THEN 8 WHEN level = 9 THEN 9 ELSE 20 END';
    }



    if (classLevel === 'Cantrip'){
        sortByRangeStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = "' + classLevel + '" ORDER BY CASE WHEN range = "Special" THEN 0 WHEN range = "Unlimited" THEN 1 WHEN range = "500 miles" THEN 5 WHEN range = "Self (5-mile radius)" THEN 5 WHEN range = "1 mile" THEN 10 WHEN range = "Sight" THEN 15 WHEN range = "500 feet" THEN 20 WHEN range = "300 feet" THEN 25 WHEN range = "150 feet" THEN 30 WHEN range = "120 feet" THEN 35 WHEN range = "100 feet" THEN 40 WHEN range = "Self (100-foot line)" THEN 45 WHEN range = "90 feet" THEN 50 WHEN range = "60 feet" THEN 55 WHEN range = "Self (60 foot cone)" THEN 60 WHEN range = "Self (60-foot line)" THEN 65 WHEN range = "Self (60-foot cone)" THEN 75 WHEN range = "30 feet" THEN 80 WHEN range = "Self (30-foot radius)" THEN 85 WHEN range = "Self (30-foot cone)" THEN 90 WHEN range = "Self (15-foot cube)" THEN 95 WHEN range = "Self (15-foot-radius)" THEN 100 WHEN range = "Self (15-foot cone)" THEN 105 WHEN range = "10 feet" THEN 110 WHEN range = "Self (10-foot radius)" THEN 115 WHEN range = "5 feet" THEN 120 WHEN range = "Self (5-foot radius)" THEN 125 WHEN range = "Touch" THEN 130 WHEN range = "Self" THEN 135 ELSE 200 END';
    } else {
        sortByRangeStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = ' + classLevel + ' ORDER BY CASE WHEN range = "Special" THEN 0 WHEN range = "Unlimited" THEN 1 WHEN range = "500 miles" THEN 5 WHEN range = "Self (5-mile radius)" THEN 5 WHEN range = "1 mile" THEN 10 WHEN range = "Sight" THEN 15 WHEN range = "500 feet" THEN 20 WHEN range = "300 feet" THEN 25 WHEN range = "150 feet" THEN 30 WHEN range = "120 feet" THEN 35 WHEN range = "100 feet" THEN 40 WHEN range = "Self (100-foot line)" THEN 45 WHEN range = "90 feet" THEN 50 WHEN range = "60 feet" THEN 55 WHEN range = "Self (60 foot cone)" THEN 60 WHEN range = "Self (60-foot line)" THEN 65 WHEN range = "Self (60-foot cone)" THEN 75 WHEN range = "30 feet" THEN 80 WHEN range = "Self (30-foot radius)" THEN 85 WHEN range = "Self (30-foot cone)" THEN 90 WHEN range = "Self (15-foot cube)" THEN 95 WHEN range = "Self (15-foot-radius)" THEN 100 WHEN range = "Self (15-foot cone)" THEN 105 WHEN range = "10 feet" THEN 110 WHEN range = "Self (10-foot radius)" THEN 115 WHEN range = "5 feet" THEN 120 WHEN range = "Self (5-foot radius)" THEN 125 WHEN range = "Touch" THEN 130 WHEN range = "Self" THEN 135 ELSE 200 END';
    }

    if (classLevel === 'Cantrip'){
        sortByDurationStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = "' + classLevel + '" ORDER BY CASE WHEN duration = "Special" THEN 0 WHEN duration = "Until dispelled" THEN 5 WHEN duration = "Until dispelled or triggered" THEN 7 WHEN duration = "30 days" THEN 10 WHEN duration = "10 days" THEN 15 WHEN duration = "7 days" THEN 20 WHEN duration = "1 day" THEN 25 WHEN duration = "CON, up to 1 day" THEN 27 WHEN duration = "24 hours" THEN 30 WHEN duration = "CON, up to 24 hours" THEN 35 WHEN duration = "8 hours" THEN 40 WHEN duration = "CON, up to 8 hours" THEN 55 WHEN duration = "Up to 8 hours" THEN 50 WHEN duration = "CON, up to 2 hours" THEN 58 WHEN duration = "1 hour" THEN 60 WHEN duration = "Instantaneous or 1 hour" THEN 62 WHEN duration = "CON, up to 1 hour" THEN 68 WHEN duration = "Up to 1 hour" THEN 65 WHEN duration = "10 minutes" THEN 70 WHEN duration = "CON, up to 10 minutes" THEN 75 WHEN duration = "1 minute" THEN 85 WHEN duration = "CON, up to 1 minute" THEN 80 WHEN duration = "Up to 1 minute" THEN 87 WHEN duration = "CON, up to 6 rounds" THEN 88 WHEN duration = "1 round" THEN 90 WHEN duration = "CON, up to 1 round" THEN 92 WHEN duration = "Instantaneous" THEN 95 ELSE 200 END';
    } else {
        sortByDurationStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = ' + classLevel + ' ORDER BY CASE WHEN duration = "Special" THEN 0 WHEN duration = "Until dispelled" THEN 5 WHEN duration = "Until dispelled or triggered" THEN 7 WHEN duration = "30 days" THEN 10 WHEN duration = "10 days" THEN 15 WHEN duration = "7 days" THEN 20 WHEN duration = "1 day" THEN 25 WHEN duration = "CON, up to 1 day" THEN 27 WHEN duration = "24 hours" THEN 30 WHEN duration = "CON, up to 24 hours" THEN 35 WHEN duration = "8 hours" THEN 40 WHEN duration = "CON, up to 8 hours" THEN 55 WHEN duration = "Up to 8 hours" THEN 50 WHEN duration = "CON, up to 2 hours" THEN 58 WHEN duration = "1 hour" THEN 60 WHEN duration = "Instantaneous or 1 hour" THEN 62 WHEN duration = "CON, up to 1 hour" THEN 68 WHEN duration = "Up to 1 hour" THEN 65 WHEN duration = "10 minutes" THEN 70 WHEN duration = "CON, up to 10 minutes" THEN 75 WHEN duration = "1 minute" THEN 85 WHEN duration = "CON, up to 1 minute" THEN 80 WHEN duration = "Up to 1 minute" THEN 87 WHEN duration = "CON, up to 6 rounds" THEN 88 WHEN duration = "1 round" THEN 90 WHEN duration = "CON, up to 1 round" THEN 92 WHEN duration = "Instantaneous" THEN 95 ELSE 200 END';
    }


    //add active class to index2 nav
    $('.spellSortNav ul li button').click(function(e) {
        $('.spellSortNav ul li button').removeClass('ui-btn-active');

        var $parent = $(this);
        if (!$parent.hasClass('ui-btn-active')) {
            $parent.addClass('ui-btn-active');
        }
        e.preventDefault();
    });

    //this gets you the spell list ordered by class
    insertRecord();
    showRecords();
});




$(document).on("pageshow","#index3",function(){ // When entering pagetwo
    //assign functions to buttons on page index3

    $("#btnOrderByLevel").click(showRecordsListByLevel);
    $("#btnOrderByName").click(showRecordsList);
    $("#spellBookBackButton").click(dropTable);

    $('.spellSortNav ul li button').click(function(e) {
        $('.spellSortNav ul li button').removeClass('ui-btn-active');

        var $parent = $(this);
        if (!$parent.hasClass('ui-btn-active')) {
            $parent.addClass('ui-btn-active');
        }
        e.preventDefault();
    });

    insertRecord();
    showRecordsList();
});


$(document).on("pageshow","#index4",function(){ // When entering pagetwo
    //assign functions to buttons on page index3

    $("#spellBookBackButton").click(dropTable);

    var spellName = getUrlParameter('name');


    selectAllStatement = 'SELECT * FROM spell WHERE name = "' + spellName + '"';

    // insertRecord();
    showSingleRecord();
});



//drop table on back button to ensure no duplicate items
$(window).on("navigate", function (event, data) {
  var direction = data.state.direction;
  if (direction == 'back') {
      dropTable();
  }
});


//left panel


var panelLeft = '<div data-role="panel" id="leftpanel" data-display="overlay" data-position-fixed="true" class="ui-panel ui-panel-position-left ui-panel-display-overlay ui-body-inherit ui-panel-fixed ui-panel-animate ui-panel-open"><ul data-role="listview" data-inset="false" class="ui-listview spellBookSpellCountHeader"><li data-role="list-divider" class="spellBookOrderBy ui-li-divider ui-bar-b ui-first-child ui-last-child">Spell Count:</li></ul><div><div class="spellBookCounterLabel"><label for="spin">Sorcery<br> Points:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin0" value="0" min="0" max="100" /></div></div><div><div class="spellBookCounterLabel"><label for="spin">Level<br> One:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin1" value="0" min="0" max="100" /></div><div><div class="spellBookCounterLabel"><label for="spin">Level<br> Two:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin2" value="0" min="0" max="100" /></div><div><div class="spellBookCounterLabel"><label for="spin">Level<br> Three:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin3" value="0" min="0" max="100" /></div><div><div class="spellBookCounterLabel"><label for="spin">Level<br> Four:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin4" value="0" min="0" max="100" /></div></div><div><div class="spellBookCounterLabel"><label for="spin">Level<br> Five:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin5" value="0" min="0" max="100" /></div></div><div><div class="spellBookCounterLabel"><label for="spin">Level<br> Six:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin6" value="0" min="0" max="100" /></div></div><div><div class="spellBookCounterLabel"><label for="spin">Level<br> Seven:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin7" value="0" min="0" max="100" /></div></div><div><div class="spellBookCounterLabel"><label for="spin">Level<br> Eight:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin8" value="0" min="0" max="100" /></div></div><div class="spellBookLastCounter"><div class="spellBookCounterLabel"><label for="spin">Level<br> Nine:</label></div><div class="ui-field-contain spellBookCounter"><input type="number" data-role="spinbox" name="spin" id="spin9" value="0" min="0" max="100" /></div></div></div>';

$(document).one('pagebeforecreate', function () {

    $.mobile.pageContainer.prepend(panelLeft);
    $("#leftpanel").panel().enhanceWithin();
});
