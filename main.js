




var operations = {

    //obtain the array of contact-objects on local storage
    getNames : function () {
        try {
            var names = JSON.parse(localStorage.contactEntries);
        } catch (err) {
            var names = [];
        }
        return names;
    },

    //writes to the local storage
    writeNamesLocal : function (arrayOfObjects) {
        localStorage.contactEntries = JSON.stringify(arrayOfObjects);
    },

    //to generate a new JSON object for the contact
    ContactProfile : function (name, email, address, number) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.phoneNumber = number;
    },

    //response to submit button with filled-out information
    submitNewContact : function () {
        var saveContactButton = $("#saveChanges");
        saveContactButton.click(function () {
            let $name = $("#newFullName").val();
            let $email = $("#newEmail").val();
            let $address = $("#newAddress").val();
            let $number = $("#newNumber").val();
            //create li element
            operations.createEntryElement($name, $email, $address, $number);
            //create JSON object
            operations.createNewLocalEntry($name, $email, $address, $number);
            $('#myModal').modal('hide');
        });
    },

    //add entry to array of contact-objects on local storage;
    createNewLocalEntry : function (name, email, address, number) {
        var newJSONObject = new operations.ContactProfile(name, email, address, number);
        var storedContacts = operations.getNames();
        storedContacts.push(newJSONObject);
        operations.writeNamesLocal(storedContacts);
    },

    //create li element for the actual address book
    createEntryElement : function (name, email, address, phone) {
        var addressBook = $(".addressBook");
        var $li = $("<li ripple>");
        //have img accept a url
        var $image = $("<img>").addClass("item-icon").attr("src", "http://dev.alurosu.com/bobo/chat/data/img/admin/default.png");
        var $firstSpan = $("<span>").addClass("item-text").text(name);
        var $secondSpan = $("<span>").addClass("secondary-text").text(email);

        $li.append($image);
        $li.append($firstSpan);
        $firstSpan.append($secondSpan);

        addressBook.append($li);

    },

    //render the contact list on load
    renderContactsOnLoad : function () {
        var contacts = operations.getNames();
        contacts.forEach(function (item) {
            operations.createEntryElement(item.name, item.email, item. address, item.phoneNumber);

        });
    }

};





//var testObject = new operations.ContactProfile("stuff", "here", "and", "there");


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




let initialize = function () {
    operations.submitNewContact();
    operations.renderContactsOnLoad();
};



$(document).ready(initialize);