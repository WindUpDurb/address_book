
/*function contactProfile (name, email, address, number) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phoneNumber = number;
};*/

let addContact = function () {
    var saveContact = $("#saveChanges");
    saveContact.click(function () {
        //Use an object to hold the data
       // let newContact = {};
        let $name = $("#newFullName").val();
        let $email = $("#newEmail").val();
        let $address = $("#newAddress").val();
        let $number = $("#newNumber").val();
        createNewEntry($name, $email, $address, $number);
        $('#myModal').modal('hide');

    });
};

//create a div to populate with further contact info
/*let populateContactInfo = function (contact) {
    var contactEntry = $("li");
    contactEntry.click(function () {
        //use filter
        var array = $(this).text().replace(/\W/gi, " ").split(" ");
        var arrayOfInfo = array.forEach(function (item) {
            var results = [];
            if (item.length > 2) {
                results.push(item);
            }
            return results;
        })
        console.log(array)
        console.log(arrayOfInfo)
        $("#contactNumber").attr("placeholder", $(this > "#itemText").text());

    })

}*/



let createNewEntry = function (name, email, address, phone) {
    var addressBook = $(".addressBook");
    var $li = $("<li ripple>")
    var $image = $("<img>").addClass("item-icon").attr("src", "http://dev.alurosu.com/bobo/chat/data/img/admin/default.png");
    var $firstSpan = $("<span>").addClass("item-text").text(name);
    var $secondSpan = $("<span>").addClass("secondary-text").text(email);

    $li.append($image);
    $li.append($firstSpan);
    $firstSpan.append($secondSpan);


    addressBook.append($li);

    console.log($li);
};

let initialize = function () {
    addContact();
   // populateContactInfo();
}



$(document).ready(initialize);