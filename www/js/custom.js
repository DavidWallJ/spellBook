
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


//on spell page loadRecord

$(document).on("pageshow","#allSpells",function(){ // When entering pagetwo
    insertRecord();
    showRecords();
});


//start of db stuff

//  Declare SQL Query for SQLite

var createStatement = "CREATE TABLE IF NOT EXISTS spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard)";

var selectAllStatement = "SELECT * FROM spell";

var insertStatement = "INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (?, ?, ?, ? ,? ,? ,? ,? ,? ,?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,?)";

// var updateStatement = "UPDATE Contacts SET username = ?, useremail = ? WHERE id=?";
//
// var deleteStatement = "DELETE FROM Contacts WHERE id=?";

var dropStatement = "DROP TABLE spell";

var sortByLevelStatement = "SELECT * FROM spell ORDER BY level";

var sortByNameStatement = "SELECT * FROM spell ORDER BY name";

var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database

var dataset;

var DataType;

function initDatabase()  // Function Call When Page is ready.

{

    try {

        if (!window.openDatabase)  // Check browser is supported SQLite or not.

        {

            alert('Databases are not supported in this browser.');

        }

        else {

            createTable();  // If supported then call Function for create table in SQLite

        }

    }

    catch (e) {

        if (e == 2) {

            // Version number mismatch.

            console.log("Invalid database version.");

        } else {

            console.log("Unknown error " + e + ".");

        }

        return;

    }

}

function createTable()  // Function for Create Table in SQLite.

{

    db.transaction(function (tx) {
        tx.executeSql("DROP TABLE IF EXISTS spell");
        tx.executeSql(createStatement, [], showRecords, onError); });

}

function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..

{

        db.transaction(function (tx) {

            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (1,'Abi-Dalzim''s Horrid Wilting','8th-level necromancy',8,'1 action','150 feet','V, S, M (a bit of sponge)','Instantaneous','You draw the moisture from every creature in a 30-foot cube centered on a point you choose within range. Each creature in that area must make a Constitution saving throw. Constructs and undead aren''t affected, and plants and water elementals make this saving throw with disadvantage. A creature takes 10d8 necrotic damage on a failed save, or half as much damage on a successful one.','-','ee 15',0,0,0,0,0,0,1,0,1)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (2,'Absorb Elements','1st-level abjuration',1,'1 reaction, which you take when you take acid, cold, fire, lightning, or thunder damage','Self','S ','1 round','The spell captures some of the incoming energy, lessening its effect on you and storing it for your next melee attack. You have resistance to the triggering damage type until the start of your next turn. Also, the first time you hit with a melee attack on your next turn, the target takes an extra 1d6 damage of the triggering type, and the spell ends.','When you cast this spell using a spell slot of 2nd level or higher, the extra damage increases by 1d6 for each slot level above 1st.','ee 15',0,0,0,1,0,1,0,0,1)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (3,'Acid Splash','Conjuration Cantrip',-1,'1 action','60 feet','V, S','Instantaneous','You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage. <br>This spells damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6) and 17th level (4d6).','-','phb 211',0,0,0,0,0,0,1,0,1)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (4,'Aganazzar''s Scorcher','2nd-level evocation',2,'1 action','30 feet','V, S, M (a red dragon''s scale)','Instantaneous','A line of roaring flame 30 feet long and 5 feet wide emanates from you in a direction you choose. Each creature in the line must make a Dexterity saving throw. A creature takes 3d8 fire damage on a failed save, or half as much damage on a successful one.','When you cast this spell using a spell slot of 3rd level or higher, the damage increases by 1d8 for each slot level above 2nd.','ee 15',0,0,0,0,0,0,1,0,1)");

         });
         alert('db populated');

        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

}

// function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
//
// {
//
//     var iddelete = id.toString();
//
//     db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
//
//     resetForm();
//
// }
//
// function updateRecord() // Get id of record . Function Call when Delete Button Click..
//
// {
//
//     var usernameupdate = $('input:text[id=username]').val().toString();
//
//     var useremailupdate = $('input:text[id=useremail]').val().toString();
//
//     var useridupdate = $("#id").val();
//
//     db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, useremailupdate, Number(useridupdate)], loadAndReset, onError); });
//
// }

function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.

{

    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });

    resetForm();

    initDatabase();

}

// function loadRecord(i) // Function for display records which are retrived from database.
//
// {
//
//     var item = dataset.item(i);
//
//     $("#username").val((item['username']).toString());
//
//     $("#useremail").val((item['useremail']).toString());
//
//     $("#id").val((item['id']).toString());
//
// }
//
// function resetForm() // Function for reset form input values.
//
// {
//
//     $("#username").val("");
//
//     $("#useremail").val("");
//
//     $("#id").val("");
//
// }
//
function loadAndReset() //Function for Load and Reset...

{

    resetForm();

    showRecords();

}

function onError(tx, error) // Function for Hendeling Error...

{

    alert(error.message);

}

function showRecords() // Function For Retrive data from Database Display records as list

{

    $("#results").html('');

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);
                var linkeditdelete = '<div data-role="collapsible" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-iconpos="right" data-theme="a" data-content-theme="b" data-mini="true"><h3 class="ui-li-heading">'+item['name']+'</h3><ul data-role="listview"><li>School: '+item['school']+'</li><li>Level: '+item['level']+'</li><li>Casting Time: '+item['casting_time']+'</li><li>Range: '+item['range']+'</li><li>Duration: '+item['duration']+'</li></ul><p class="inset">'+item['description']+'</p><p class="inset">Components: '+item['components']+' </p></div>';

                // $("#results").append(linkeditdelete);
                $("#results").append(linkeditdelete).trigger('create');
            }
            $("#results").listview("refresh");
        });

    });

}

function showRecordsByLevel() // Function For Retrive data from Database Display records as list

{

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(sortByLevelStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<li>' + item['name'] + ' , ' + item['school'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +

                                            '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';

                $("#results").append(linkeditdelete);

            }

        });

    });

}


function showRecordsByName() // Function For Retrive data from Database Display records as list

{

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(sortByNameStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<li>' + item['name'] + ' , ' + item['school'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +

                                            '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';

                $("#results").append(linkeditdelete);

            }

        });

    });

}


$(document).ready(function () // Call function when page is ready for load..

{


    // $("body").fadeIn(2000); // Fede In Effect when Page Load..

    initDatabase();

    $("#submitButton").click(insertRecord);  // Register Event Listener when button click.

    $("#btnUpdate").click(showRecords);

    $("#btnReset").click(showRecordsByLevel);

    $("#btnOrderByName").click(showRecordsByName);

    $("#btnDrop").click(dropTable);

});
