function serialize(mainBlock, firstCall=true) {
    //each code block has a title and a list of children
    // return mainBlock.children().each(serializeChild);

    let elements = [];
    let i = 0;
    let subcchildren = mainBlock.children();
    while (subcchildren[String(i)]) {
        console.log(subcchildren[String(i)]);
        elements.push(serializeChild(subcchildren[String(i)]));
        i++;
    }

    return JSON.stringify(elements);
}

function serializeChild(child) {
    let children = $(child).children();
    let title = $(children[0]).find(".blockTitle").text();

    let inputElement = $(children[1]);
    let inputs = [];
    inputElement.find("input, textarea, select").each(function() {
        inputs.push($(this).val());
    });

    let subelements = [];
    let subcchildren = $(children[2]).children();
    let i = 0;
    while (subcchildren[String(i)]) {
        console.log(subcchildren[String(i)]);
        subelements.push(serializeChild(subcchildren[String(i)]));
        i++;
    }

    return [title, inputs, subelements];
}

