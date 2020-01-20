
selectedText = ""; //variable to store currently selected command
selectedColor = "white"; //variable to store color of selected command
$(".draggable").click(function () { //function to handle selecting command
    if ($(this).hasClass("selected")) {
        selectedText = "";
        selectedColor = "white";
        $(this).removeClass("selected");
    } else {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");
        selectedText = $(this).text();
        selectedColor = $(this).css("background-color");
    }
});

block_html_map = {
    "Generic Container": "",
    "Slide": "",
    "Two Columns": "",
    "Randomizer": "",
    "Title": "<input type='text' placeholder='Type Title Here'/>",
    "Image": "<input type='text' placeholder='Image URL'/>",
    "Embed Video File": "<input type='text' placeholder='Video URL'/>",
    "Embed Youtube Video": "<input type='text' placeholder='Youtube URL'/>",
    "Custom HTML": "<textarea placeholder='<p>Paste HTML Here</p>'></textarea>",
    "Short Answer": "<input type='text' placeholder='question description'/>",
    "Sketch": "<input type='text' placeholder='question description'/>",
    "True False Collection": "<input type='text' placeholder='directions for true false problems'/>",
    "Statement": "<input type='text' placeholder='statement'/> is: <select><option value=\"ungraded\">Ungraded</option><option value=\"true\">True</option><option value=\"false\">False</option></select>",
    "Ordering": "<input type='text' placeholder='question description'/>",
    "Event": "<input type='text' placeholder='event'/>",
    "Multiple Choice": "<input type='text' placeholder='question description'/>",
    "Option": "<input type='text' placeholder='option'/>",
    "Matching": "<input type='text' placeholder='question description'/>",
    "Pair": "<input type='text' placeholder='first statement'/><input type='text' placeholder='second statement'/>",
    "Paragraph": "<textarea placeholder='Type paragraph here'></textarea>",
    "Essay": "<input type='text' placeholder='question description'/>",
    "FPTP Vote Results": "Display top <input type='number'> winner(s)",
    "Schulze Vote Results": "Display top <input type='number'> winner(s)",
    "Approval Vote Results": "Display top <input type='number'> winner(s)",
    "Assign Diverse Groups": "Group Size: <input type='number'>",
    "Assign Similar Groups": "Group Size: <input type='number'>",
    "Assign Random Groups": "Group Size: <input type='number'>",
};

function formatCodeBlock(text, color) {
    return "<div class='codeBlock' style='background-color: " + color + "'>"
        + "<div class='blockTitleWrapper'>"
        + "<p class='blockTitle'>" + text + "</p>"
        + "<div class='icon-container'>"
        + "<i class='fas fa-arrow-up' title='insert above'></i>"
        + "<i class='fas fa-arrow-down' title='insert below'></i>"
        + "<i class='fas fa-plus-square' title='insert child'></i>"
        + "<span class='floatright spacer'></span>"
        + "<i class='fas fa-trash' title='delete'></i>"
        + "<i class='fas fa-cut' title='cut'></i>"
        + "<i class='fas fa-copy' title='copy'></i>"
        + "<span class='floatright spacer'></span>"
        + "<i class='fas fa-ghost' title='collapse'></i>"
        + "<i class='fas fa-question-circle' title='help'></i>"
        + "</div></div>"
        + "<div class='question-info'>" + block_html_map[text] + "</div>"
        + "<div class='subcontainer'></div>"
        + "</div>"
}

function updateSerialization() {
    serial = serialize($("#code-wrapper"));
    $("#serialized").text(serial);
}

codeWrapper = $("#code-wrapper");

codeWrapper.click(function () {
    console.log("code wrapper clicked");
    if (selectedText) {
        $(this).append(formatCodeBlock(selectedText, selectedColor))
    }

    updateSerialization();
});

codeWrapper.on("click", ".fa-trash", function (event) {
    $(this).parent().parent().parent().remove();
    event.stopPropagation();
    updateSerialization();
});

codeWrapper.on("click", ".fa-arrow-up", function (event) {
    $(this).parent().parent().parent().before(formatCodeBlock(selectedText, selectedColor));
    event.stopPropagation();
    updateSerialization();
});

codeWrapper.on("click", ".fa-arrow-down", function (event) {
    $(this).parent().parent().parent().after(formatCodeBlock(selectedText, selectedColor));

    event.stopPropagation();
    updateSerialization();
});

codeWrapper.on("click", ".fa-plus-square", function (event) {
    let block = $($(this).parent().parent().parent());
    $(block.children()[2]).append(formatCodeBlock(selectedText, selectedColor));
    event.stopPropagation();
    updateSerialization();
});

codeWrapper.on("click", ".fa-ghost", function (event) {
    let block = $($(this).parent().parent().parent());
    block.toggleClass("collapsed");
    event.stopPropagation();
});

codeWrapper.on("click", ".codeBlock", function (event){
    event.stopPropagation();
    updateSerialization();
});

$("#save").click(function() {
    let html = $("code-wrapper").html();
    alert(html);
});
