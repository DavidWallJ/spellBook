
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

$(document).on("pageshow","#index2",function(){ // When entering pagetwo
    var className = getUrlParameter('class');
    var classLevel = getUrlParameter('level');
    if(classLevel === 'ALL'){
        classLevel = '1 OR level = 2 OR level = 3 OR level = 4 OR level = 5 OR level = 6 OR level = 7 OR level = 8 OR level = 9';
    }
    selectAllStatement = 'SELECT * FROM spell WHERE ' + className + ' = 1 AND level = ' + classLevel + '';
    alert(selectAllStatement);
    insertRecord();
    showRecordsByClassStatement(selectAllStatement);

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
