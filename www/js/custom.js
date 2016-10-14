
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

$(document).on("pageshow","#allSpells",function(){ // When entering pagetwo
    insertRecord();
    showRecords();
});

$(window).on("navigate", function (event, data) {
  var direction = data.state.direction;
  if (direction == 'back') {
      dropTable();
  }
});
