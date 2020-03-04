const fs = require("fs");
const dbname = "app/data/db.json";
const dbcontent = fs.readFileSync(dbname);
let content = JSON.parse(dbcontent);

$(document).ready(function() {
    readDB();
    main();
    $(".mybtn").click(handleTaskCreate);
});

function readDB() {
    console.log(content);
    content.forEach((o, i) => {
        console.log(o, i);
        for (let key in o) {
            console.log(key, o[key]);
        }
        $(".taskitem").draggable({
            start: function() {
                console.log("du dragst gerade: ", $(this).text());
            },
            revert: true
        });
    });
}

function main() {
    $("#inprogress , #done").droppable({
        drop: function(event, ui) {
            let elem = ui.draggable[0];
            let dropid = $(this).attr("id");
            console.log(dropid);
            $("#" + dropid + " .taskitems").append(
                "<div class='taskitem'>" + $(elem).text() + "</div>"
            );
            $(elem).remove();
            insertIntoDB(dropid, $(elem).text());
        }
    });
}

function handleTaskCreate() {
    console.log("click!");
    let input = $("#taskcreate").val();
    if (input) {
        $("#todo .taskitems").append("<div class='taskitem'>" + input + "</div>");
        $(".taskitem").draggable({
            start: function() {
                console.log("du dragst gerade: ", $(this).text());
            },
            revert: true
        });
        $("#taskcreate").val("");
    }
}

function insertIntoDB(target, text) {
    content.todo = content.todo.filter(c => {
        return c !== text;
    });
    console.log(content.todo);
    target == "inprogress" ?
        content.inprogress.push(text) :
        content.done.push(text);
    fs.writeFile(dbname, JSON.stringify(content), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(content));
        console.log("writing to " + dbname);
    });
}