


let addContact = function () {
    var saveContact = $("#saveChanges");
    saveContact.click(function () {
        let newName = $("#newFullName").val();
        let newEmail = $("#newEmail").val();
        let newAddress = $("#newAddress").val();
        let newNumber = $("#newNumber").val();
        createNewEntry(newName, newEmail, newAddress, newNumber);
        $('#myModal').modal('hide');

    });
}


let createNewEntry = function (newName, newEmail, newAddress, newNumber) {
    var addressBook = $(".addressBook");
    var $li = $("<li ripple>")
    var $image = $("<img>").addClass("item-icon").attr("src", "http://dev.alurosu.com/bobo/chat/data/img/admin/default.png");
    var $firstSpan = $("<span>").addClass("item-text").text(newName);
    var $secondSpan = $("<span>").addClass("secondary-text").text(newEmail);

    $li.append($image);
    $li.append($firstSpan);
    $firstSpan.append($secondSpan);


    addressBook.append($li);

    console.log($li);
};

let initialize = function () {
    addContact();
}



$(document).ready(initialize);