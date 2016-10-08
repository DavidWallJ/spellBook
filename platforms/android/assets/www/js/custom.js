
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

var sortByRangeStatement = "SELECT * FROM spell ORDER BY CASE WHEN range = '150 feet' THEN 0 WHEN range = '60 feet' THEN 1 WHEN range = '30 feet' THEN 2 WHEN range = 'Self' THEN 3 END";

var sortByDurationStatement = "SELECT * FROM spell ORDER BY duration";

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
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (5,'Aid','2nd level Abjuration',2,'1 action','30 feet','V, S, M (a tiny strip of white cloth)','8 hours','Your spell bolsters your allies with toughness and resolve. Choose up to three creatures within range. Each target''s hit point maximum and current hit points increase by 5 for the duration. ','When you cast this spell using a spell slot of 3rd level or higher, a target''s hit points increase by an additional 5 for each slot level above 2nd.','phb 211',0,0,1,0,1,0,0,0,0)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (6,'Alarm (Ritual)','1st level Abjuration',1,'1 minute','30 feet','V, S, M (a tiny bell and a piece of fine silver wire)','8 hours','You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won''t set off the alarm. You also choose whether the alarm is mental or audible.<br>A mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping.<br>An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet.','-','phb 211',0,0,0,0,0,1,0,0,1)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (7,'Alter Self','2nd level Transmutation',2,'1 action','Self','V, S','Concentration, up to 1 hour','You assume a different form. When you cast the spell, choose one of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an action to gain the benefits of a different one.<br><b><i>Aquatic Adaptation.</b></i> You adapt your body to an aquatic environment, sprouting gills, and growing webbing between your fingers. You can breathe underwater and gain a swimming speed equal to your walking speed. <br><b><i>Change Appearance.</b></i> You transform your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and distinguishing characteristics, if any. You can make yourself appear as a member of another race, though none of your statistics change. You also don''t appear as a creature of a different size than you, and your basic shape stays the same, if you''re bipedal, you can''t use this spell to become quadrupedal, for instance. At any time for the duration of the spell, you can use your action to change your appearance in this way again. <br><b><i>Natural Weapons. </b></i>You grow claws, fangs, spines, horns, or a different natural weapon of your choice. Your unarmed strikes deal 1d6 bludgeoning, piercing, or slashing damage, as appropriate to the natural weapon you chose, and you are proficient with you unarmed strikes. Finally, the natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it.','-','phb 211',0,0,0,0,0,0,1,0,1)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (8,'Animal Friendship','1st level Enchantment',1,'1 action','30 feet','V, S, M (a morsel of food)','24 hours','This spell lets you convince a beast that you mean it no harm. Choose a beast that you can see within range. It must see and hear you. If the beast''s Intelligence is 4 or higher, the spell fails. Otherwise, the beast must succeed on a Wisdom saving throw or be charmed by you for the spell''s duration. If you or one of your companions harms the target, the spell ends.','When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional beast for each slot level above 1st.','phb 212',0,1,0,1,0,1,0,0,0)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (9,'Animal Messenger (Ritual)','2nd level Enchantment',2,'1 action','30 feet','V, S, M (a morsel of food)','24 hours','By means of this spell you use an animal to deliver a message. Choose a Tiny beast you can see within range such as a squirrel a blue ray or a bad. You specify a location which you must have visited and a recipient who matches a general description such as a man or woman dressed in the uniform of the town guard or a red-haired dwarf wearing a pointed hat. You also speak a message of up to twenty five words. The target beast travels for the duration of the spell towards the specified location covering about 50 miles per 24 hours for a flying messenger or 25 miles for other animals. <br>When the messenger arrives it delivers your message to the creature that you described replicating the sound of your voice. The messenger speaks only to a creature matching the description you gave. If the messenger doesn''t reach its destination before the spell ends the message is lost and the beast makes it way back to where you cast this spell. ','If you cast this spell using a spell slot of 3rd level or higher the duration of the spell increases by 48 hours for each slot level above 2nd.','phb 212',0,1,0,1,0,1,0,0,0)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (10,'Animal Shapes','8th level Transmutation',8,'1 action','30 feet','V, S','Concentration, up to 24 hours','Your magic turns others into beasts. Choose any number of willing creatures that you can see within range. You transform each target into the form of a large or smaller beast with a challenge rating of 4 or lower. On subsequent turns, you can use your actions to transform affected creatures into new forms.   <br>The transformation lasts for the duration for each target, or until the target drops to 0 hit points or dies. You can choose a different form for each target. A target''s game statistics are replaced by the statistics of the chosen beast, though the target retains its alignment and Intelligence, Wisdom, and Charisma scores. The target assumes the hit points of its new form, and when it reverts to its normal form, it returns to the number of hit point it had before it transformed. If it reverts as a result of dropping to 0 hit points, any excess damage carries over to its normal form. As long as the excess damage doesn''t reduce the creature''s normal form to 0 hit points, it isn''t knocked unconscious. The creature is limited in the actions it can perform by the nature of its new form, and it can''t speak or cast spells.  <br>The target''s gear melds into the new form. The target can''t activate, wield, or otherwise benefit from any of its equipment.','-','phb 212',0,0,0,1,0,0,0,0,0)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (11,'Animate Dead','3rd level Necromancy',3,'1 minute','10 feet','V, S, M (a drop of blood, a piece of flesh, and a pinch of bone dust)','Instantaneous','This spell creates an undead servant. Choose a pile of bones or a corpse of a Medium or Small humanoid within range. Your spell imbues the target with a foul mimicry of life, raising it as an undead creature. The target becomes a skeleton if you chose bones or a zombie if you chose a corpse (the DM has the creature''s game statistics).  <br>On each of your turns, you can use a bonus action to mentally command any creature you made with this spell if the creature is within 60 feet of you (if you control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete.  <br>The creature is under your control for 24 hours, after which it stops obeying any command you''ve given it. To maintain the control of the creature for another 24 hours, you must cast this spell on the creature again before the current 24-hour period ends. This use of the spell reasserts your control over up to four creatures you have animated with this spell, rather than animating a new one.  ','When you cast this spell using a spell slot of 4th level or higher, you animate or reassert control over two additional undead creatures for each slot above 3rd. Each of the creatures must come from a different corpse or pile of bones.','phb 212',0,0,1,0,0,0,0,0,1)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (12,'Animate Objects','5th level Transmutation',5,'1 action','120 feet','V, S','Concentration up to 1 minute','Objects come to life at your command. Choose up to ten non magical objects within range that are not being worn or carried. Medium targets count as two objects Large targets count as four objects Huge targets count as eight objects. You can''t animate any object larger than Huge. Each target animates and becomes a creature under your control until the spell ends or until reduced to 0 hit points. <br>As a bonus action you can mentally command any creature you made with this spell if the creature is within 500 feet of you (if you control multiple creatures you can command any or all of them at the same time issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn or you can issue a general command such as to guard a particular chamber or corridor. If you issue no commands the creature only defends itself against hostile creatures. Once given an order the creature continues to follow it until its task is complete. <br><br><p><b>ANIMATED OBJECT STATISTICS</b></p><table><tr><td><b>Size</b></td><td><b>HP</b></td><td><b>AC</b></td><td><b>Attack</b></td><td><b>Str</b></td><td><b>Dex</b></td></tr><tr><td>Tiny</td><td>20</td><td>18</td><td>+8 to hit, 1d4 + 4 damage</td><td>4</td><td>18</td></tr><tr><td>Small</td> <td>25</td> <td>16</td> <td>+6 to hit, 1d8 + 2 damage</td>  <td>6</td> <td>14</td></tr><tr><td>Medium</td><td>40</td><td>13</td><td>+5 to hit, 2d6 + 1 damage</td> <td>10</td><td>12</td></tr><tr><td>Large</td><td>50</td><td>10</td><td>+6 to hit, 2d10 + 2 damage</td><td>14</td> <td>10</td></tr><tr><td>Huge</td><td>80</td><td>10</td><td>+8 to hit, 2d12 + 4 damage</td><td>18</td><td>6</td></tr></table><br>An animated object is a construct with AC hit points attacks Strength and Dexterity determine by its size. Its Constitution is 10 and its Intelligence and Wisdom are 3 and its Charisma is 1. Its speed is 30 feet if the objects lack legs or other appendages it can use for locomotion it instead has a flying speed of 30 feet and can hover. If the object is securely attached to a surface or larger object such as a chain bolted to a wall its speed is 0. It has blindsight with a radius of 30 feet and is blind beyond that distance. When the animated object drops to 0 hit points it reverts to its original object form and any remaining damage carries over to its original object form. <br>If you command an object to attack it can make a single melee attack against a creature within 5 feet of it. It makes a slam attack with an attack bonus and bludgeoning damage determine by its size. The DM might rule that a specific object inflicts slashing or piercing damage based on its form.','If you cast this spell using a spell slot of 6th or higher you can animate two additional objects for each slot level above 5th.','phb 213',0,1,0,0,0,0,1,0,1)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (13,'Antilife Shell','5th level Abjuration',5,'1 action','Self (10-foot radius)','V, S','Concentration, up to 1 hour','A shimmering barrier extends out from you in a 10-foot radius and moves with you, remaining centered on you and hedging out creatures other than undead and constructs. <br>The barrier lasts for the duration. The barrier prevents an affected creature from passing or reaching through. An affected creature can cast spells or make attacks with ranged or reach weapons through the barrier. <br>If you move so that an affect creature is forced to pass through the barrier, the spell ends.','-','phb 213',0,0,0,1,0,0,0,0,0)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (14,'Antimagic Field','8th level Abjuration',8,'1 action','Self (10-foot-radius sphere)','V, S, M (a pinch of powdered iron or iron filings)','Concentration, up to 1 hour','A 10-foot-radius invisible sphere of antimagic surrounds you. This area is divorced from the magical energy that suffuses the multiverse. Within the sphere, spells can''t be cast, summoned creatures disappear, and even magic items become mundane. Until the spell ends, the sphere moves with you, centered on you. <br>Spells and other magical effects, except those created by an artifact or a deity, are suppressed in the sphere and can''t protrude into it. A slot expended to cast a suppressed spell is consumed. While an effect is suppressed, it doesn''t function, but the time it spends suppressed counts against its duration. <br><b><i>Targeted Effects.</b></i> Spells and other magical effects, such as magic missile and charm person, that target a creature or an object in the sphere have no effect on that target.<br><b><i>Areas of Magic.</b></i> The area of another spell or magical effect, such as fireball, can''t extend into the sphere. If the sphere overlaps an area of magic, the part of the area that is covered by the sphere is suppressed. For example, the flames created by a wall of fire are suppressed within the sphere, creating a gap in the wall if the overlap is large enough. <br><b><i>Spells.</b></i>  Any active spell or other magical effect on a creature or an object in the sphere is suppressed while the creature or object is in it. <br><b><i>Magic Items.</b></i> The properties and powers of magic items are suppressed in the sphere. For example, a +1 longsword in the sphere functions as a non magical longsword. A magic weapon''s properties and powers are suppressed if it is used against a target in the sphere or wielded by an attacker in the sphere. If a magic weapon or piece of magic ammunition fully leaves the sphere (For example, if you fire a magic arrow or throw a magic spear at a target outside the sphere), the magic of the item ceases to be suppressed as soon as it exits. <br><b><i>Magical Travel. </b></i> Teleportation and planar travel fail to work in the sphere, whether the sphere is the destination or the departure point for such magical travel. A portal to another location, world, or plane of existence, as well as an opening to an extradimensional space such as that created by the rope trick spells, temporarily closes while in the sphere. <br><b><i>Creatures and Objects.</b></i> A creature or object summoned or created by magic temporarily winks out of existence in the sphere. Such a creature instantly reappears once the space the creature occupied is no longer within the sphere. <br><b><i>Dispel Magic.</b></i> Spells and magical effects such as dispel magic have no effect on the sphere. Likewise, the spheres created by different antimagic field spells don''t nullify each other.','-','phb 213',0,0,1,0,0,0,0,0,1)");
            tx.executeSql("INSERT INTO spell (_id,name,school,level,casting_time,range,components,duration,description,description_high,book,favorite,bard,cleric,druid,paladin,ranger,sorcerer,warlock,wizard) VALUES (15,'Antipathy/Sympathy','8th level Enchantment',8,'1 hour','60 feet','V, S, M (either a lump of alum soaked in vinegar for the antipathy effect or a drop of honey for the sympathy effect)','10 days','This spell attracts or repels creatures of your choice. You target something within range, either a Huge or smaller object or creature or an area that is no larger than a 200-foot cube. Then specify a kind of intelligent creature, such as red dragons, goblins, or vampires. You invest the target with an aura that either attracts or repels the specified creatures for the duration. Choose antipathy or sympathy as the aura''s effect. <br><b><i>Antipathy.</b></i> The enchantment causes creatures of the kind you designated to feel an intense urge to leave the area and avoid the target. When such a creature can see the target or comes within 60 feet of it, the creature must succeed on a Wisdom saving throw or become frightened. The creature remains frightened while it can see the target or is within 60 feet of it. While frightened by the target, the creature must use its movement to move to the nearest safe spot from which it can''t see the target. If the creature moves more than 60 feet from the target and can''t see it, the creature is no longer frightened, but the creature becomes frightened again if it regains sight of the target or moves within 60 feet of it. <br><b><i>Sympathy. </b></i>The enchantment causes the specified creatures to feel an intense urge to approach the target while within 60 feet of it or able to see it. When such a creature can see the target or comes within 60 feet of it, the creature must succeed on a Wisdom saving throw or use its movement on each of its turns to enter the area or move within reach of the target. When the creature has done so, it can''t willingly move away from the target.<br>If the target damages or otherwise harms an affected creature, the affected creature can make a Wisdom saving throw to end the effect, as described below.<br><b><i>Ending the Effect.</b></i> If an affected creature ends its turn while not within 60 feet of the target or able to see it, the creature makes a Wisdom saving throw. On a successful save, the creature is no longer affected by the target and recognizes the feeling of repugnance or attraction as magical. In addition, a creature affected by the spell is allowed another Wisdom saving throw every 24 hours while the spell persists. <br>A creature that successfully saves against this effect is immune to it for 1 minute, after which time it can be affected again.','-','phb 214',0,0,0,1,0,0,0,0,1)");

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

                var linkeditdelete = '<div data-role="collapsible" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-iconpos="right" data-theme="a" data-content-theme="b" data-mini="true"><h3 class="ui-li-heading">'+item['name']+'</h3><ul data-role="listview"><li>School: '+item['school']+'</li><li>Level: '+item['level']+'</li><li>Casting Time: '+item['casting_time']+'</li><li>Range: '+item['range']+'</li><li>Duration: '+item['duration']+'</li></ul><p class="inset">'+item['description']+'</p><p class="inset">Components: '+item['components']+' </p></div>';

                $("#results").append(linkeditdelete).trigger('create');

            }
            $("#results").listview("refresh");
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

                var linkeditdelete = '<div data-role="collapsible" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-iconpos="right" data-theme="a" data-content-theme="b" data-mini="true"><h3 class="ui-li-heading">'+item['name']+'</h3><ul data-role="listview"><li>School: '+item['school']+'</li><li>Level: '+item['level']+'</li><li>Casting Time: '+item['casting_time']+'</li><li>Range: '+item['range']+'</li><li>Duration: '+item['duration']+'</li></ul><p class="inset">'+item['description']+'</p><p class="inset">Components: '+item['components']+' </p></div>';

                $("#results").append(linkeditdelete).trigger('create');

            }
            $("#results").listview("refresh");
        });

    });

}

function showRecordsByRange() // Function For Retrive data from Database Display records as list

{

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(sortByRangeStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<div data-role="collapsible" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-iconpos="right" data-theme="a" data-content-theme="b" data-mini="true"><h3 class="ui-li-heading">'+item['name']+'</h3><ul data-role="listview"><li>School: '+item['school']+'</li><li>Level: '+item['level']+'</li><li>Casting Time: '+item['casting_time']+'</li><li>Range: '+item['range']+'</li><li>Duration: '+item['duration']+'</li></ul><p class="inset">'+item['description']+'</p><p class="inset">Components: '+item['components']+' </p></div>';

                $("#results").append(linkeditdelete).trigger('create');

            }
            $("#results").listview("refresh");
        });

    });

}

function showRecordsByDuration() // Function For Retrive data from Database Display records as list

{

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(sortByDurationStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<div data-role="collapsible" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-iconpos="right" data-theme="a" data-content-theme="b" data-mini="true"><h3 class="ui-li-heading">'+item['name']+'</h3><ul data-role="listview"><li>School: '+item['school']+'</li><li>Level: '+item['level']+'</li><li>Casting Time: '+item['casting_time']+'</li><li>Range: '+item['range']+'</li><li>Duration: '+item['duration']+'</li></ul><p class="inset">'+item['description']+'</p><p class="inset">Components: '+item['components']+' </p></div>';

                $("#results").append(linkeditdelete).trigger('create');

            }
            $("#results").listview("refresh");
        });

    });

}




$(document).ready(function () // Call function when page is ready for load..

{


    // $("body").fadeIn(2000); // Fede In Effect when Page Load..

    initDatabase();

    $("#submitButton").click(insertRecord);  // Register Event Listener when button click.

    $("#btnUpdate").click(showRecords);

    $("#btnOrderByLevel").click(showRecordsByLevel);
    $("#btnOrderByName").click(showRecordsByName);
    $("#btnOrderByRange").click(showRecordsByRange);
    $("#btnOrderByDuration").click(showRecordsByDuration);

    $("#btnDrop").click(dropTable);

});
