
// 'root.FS' is meant to give me the root of for the project regardless of wether it's local or not
function gotFS(fileSystem) {
   console.log("got filesystem");
   // save the file system for later access
   console.log(fileSystem.root.fullPath);
   window.rootFS = fileSystem.root;
}

document.addEventListener('deviceready', function() {
   window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}, false);


//add active class to nav

$(document).ready(function () {
    $('.spellSortNav ul li button').click(function(e) {
        $('.spellSortNav ul li button').removeClass('ui-btn-active');

        var $parent = $(this);
        if (!$parent.hasClass('ui-btn-active')) {
            $parent.addClass('ui-btn-active');
        }
        e.preventDefault();
    });
});
//on spell page loadRecord
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


$(document).ready(function(){
    testtest = "testtest";
});

$(document).on("pageshow","#index2",function(){ // When entering pagetwo
    var className = getUrlParameter('class');
    var classLevel = getUrlParameter('level');
    if(classLevel === 'ALL'){
        classLevel = '1 OR level = 2 OR level = 3 OR level = 4 OR level = 5 OR level = 6 OR level = 7 OR level = 8 OR level = 9';
    }



    selectAllStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = ' + classLevel + '';

    sortByLevelStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = ' + classLevel + ' ORDER BY CASE WHEN level = "Cantrip" THEN 0 WHEN level = 1 THEN 1 WHEN level = 2 THEN 2 WHEN level = 3 THEN 3 WHEN level = 4 THEN 4 WHEN level = 5 THEN 5 WHEN level = 6 THEN 6 WHEN level = 7 THEN 7 WHEN level = 8 THEN 8 WHEN level = 9 THEN 9 ELSE 20 END';

    sortByRangeStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = ' + classLevel + ' ORDER BY CASE WHEN range = "Special" THEN 0 WHEN range = "Unlimited" THEN 1 WHEN range = "500 miles" THEN 5 WHEN range = "Self (5-mile radius)" THEN 5 WHEN range = "1 mile" THEN 10 WHEN range = "Sight" THEN 15 WHEN range = "500 feet" THEN 20 WHEN range = "300 feet" THEN 25 WHEN range = "150 feet" THEN 30 WHEN range = "120 feet" THEN 35 WHEN range = "100 feet" THEN 40 WHEN range = "Self (100-foot line)" THEN 45 WHEN range = "90 feet" THEN 50 WHEN range = "60 feet" THEN 55 WHEN range = "Self (60 foot cone)" THEN 60 WHEN range = "Self (60-foot line)" THEN 65 WHEN range = "Self (60-foot cone)" THEN 75 WHEN range = "30 feet" THEN 80 WHEN range = "Self (30-foot radius)" THEN 85 WHEN range = "Self (30-foot cone)" THEN 90 WHEN range = "Self (15-foot cube)" THEN 95 WHEN range = "Self (15-foot-radius)" THEN 100 WHEN range = "Self (15-foot cone)" THEN 105 WHEN range = "10 feet" THEN 110 WHEN range = "Self (10-foot radius)" THEN 115 WHEN range = "5 feet" THEN 120 WHEN range = "Self (5-foot radius)" THEN 125 WHEN range = "Touch" THEN 130 WHEN range = "Self" THEN 135 ELSE 200 END';

    sortByDurationStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = ' + classLevel + ' ORDER BY CASE WHEN duration = "Special" THEN 0 WHEN duration = "Until dispelled" THEN 5 WHEN duration = "Until dispelled or triggered" THEN 7 WHEN duration = "30 days" THEN 10 WHEN duration = "10 days" THEN 15 WHEN duration = "7 days" THEN 20 WHEN duration = "1 day" THEN 25 WHEN duration = "Concentration, up to 1 day" THEN 27 WHEN duration = "24 hours" THEN 30 WHEN duration = "Concentration, up to 24 hours" THEN 35 WHEN duration = "8 hours" THEN 40 WHEN duration = "Concentration, up to 8 hours" THEN 55 WHEN duration = "Up to 8 hours" THEN 50 WHEN duration = "Concentration, up to 2 hours" THEN 58 WHEN duration = "1 hour" THEN 60 WHEN duration = "Instantaneous or 1 hour" THEN 62 WHEN duration = "Concentration, up to 1 hour" THEN 68 WHEN duration = "Up to 1 hour" THEN 65 WHEN duration = "10 minutes" THEN 70 WHEN duration = "Concentration, up to 10 minutes" THEN 75 WHEN duration = "1 minute" THEN 85 WHEN duration = "Concentration, up to 1 minute" THEN 80 WHEN duration = "Up to 1 minute" THEN 87 WHEN duration = "Concentration, up to 6 rounds" THEN 88 WHEN duration = "1 round" THEN 90 WHEN duration = "Concentration up to 1 round" THEN 92 WHEN duration = "Instantaneous" THEN 95 ELSE 200 END';


    insertRecord();
    showRecordsByClassStatement(selectAllStatement);


    // $("#btnOrderByLevel").click(showRecordsByLevel);
    $("#btnOrderByRange").click(showRecordsByRange);
    $("#btnOrderByName").click(showRecords);
    $("#btnOrderByDuration").click(showRecordsByDuration);

});

$(window).on("navigate", function (event, data) {
  var direction = data.state.direction;
  if (direction == 'back') {
      dropTable();
  }
});

$(document).on("pagehide", "div[data-role=page]", function(event){
  $(event.target).remove();
});
