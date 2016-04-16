

//for future drafts:
//fix the additional information div--doesn't close are erasing a contact


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
    ContactProfile : function (name, email, address, number, url) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.phoneNumber = number;
        this.image = url;
    },

    //response to submit button with filled-out information
    submitNewContact : function () {
        var saveContactButton = $("#saveChanges");
        saveContactButton.click(function () {
            var $name = $("#newFullName").val();
            var $email = $("#newEmail").val();
            var $address = $("#newAddress").val();
            var $number = $("#newNumber").val();
            var $image = $("#newImage").val() || "http://dev.alurosu.com/bobo/chat/data/img/admin/default.png";

            //create JSON object
            var jsonContact = operations.createNewLocalEntry($name, $email, $address, $number, $image);
            //create li element
            operations.createEntryElement($name, $email, $address, $number, $image, jsonContact);
            $('#myModal').modal('hide');
            //clear fields
            $("#newFullName").val("");
            $("#newEmail").val("");
            $("#newAddress").val("");
            $("#newNumber").val("");
            $("#newImage").val("")
        });
    },

    //add entry to array of contact-objects on local storage;
    createNewLocalEntry : function (name, email, address, number, url) {
        var newJSONObject = new operations.ContactProfile(name, email, address, number, url);
        var storedContacts = operations.getNames();
        storedContacts.push(newJSONObject);
        operations.writeNamesLocal(storedContacts);
        return newJSONObject;
    },

    //create li element for the actual address book
    createEntryElement : function (name, email, address, phone, image, jsonContact) {
        var addressBook = $(".addressBook");
        var $li = $("<li ripple>").attr("id", name.split(" ").join(""));
        //have img accept a url
        var $image = $("<img>").addClass("item-icon").attr("src", image);
        var $firstSpan = $("<span>").addClass("item-text").text(name);
        var $secondSpan = $("<span>").addClass("secondary-text").text(email);
        $li.append($image);
        $li.append($firstSpan);
        $firstSpan.append($secondSpan);
        addressBook.append($li);
        operations.clickContact();
    },

    //render the contact list on load
    renderContactsOnLoad : function () {
        //hide additional information div
        $("#contactInfoDiv").hide();
        var contacts = operations.getNames();
        contacts.forEach(function (item) {
            operations.createEntryElement(item.name, item.email, item. address, item.phoneNumber, item.image);

        });
    },

    //click events
    clickContact : function () {
        var contactEntry = $("li");
        contactEntry.click(function () {
            var contactName = $(this).find(".item-text").text();
            var localStorage = operations.getNames();
            var clickedContactName;
            for (var i in localStorage) {
                if (localStorage[i].name + localStorage[i].email === contactName) {
                    console.log(localStorage[i]);
                    operations.openAdditionalDetails(localStorage[i]);
                    clickedContactName = localStorage[i].name;
                }
            };
            //double click to delete contact
            contactEntry.dblclick(function () {
                $("#removeContactModal").modal("show");
                $("#deleteContactName").text(clickedContactName)
            });
        });
    },


    //delete contact event
    deleteContact : function () {
        $("#deleteContact").click(function () {
            var contactToDelete = $("#deleteContactName").text();
            var localStorage = operations.getNames();
            var toUpdateWith = localStorage.map(function (item) {
                if (item.name !== contactToDelete) {
                    return item;
                }
            }).filter(function (item) {
                return (item);
            });
            //update local storage
            operations.writeNamesLocal(toUpdateWith);
            //remove modal
            $("#removeContactModal").modal("hide");
            //update list
            console.log("#" + contactToDelete.split(" ").join(""));
            $("#" + contactToDelete.split(" ").join("")).remove();
        })
    },

    //open additional contact info div
    openAdditionalDetails : function (jsonContactObject) {
        $("#contactInfoDiv").show();
        $("#contactName").text(jsonContactObject.name);
        $("#contactNumber").text(jsonContactObject.phoneNumber);
        $("#contactEmail").text(jsonContactObject.email);
        $("#contactAddress").text(jsonContactObject.address);
        $("#contactImage").attr("src", jsonContactObject.image)
    }

};


//initialize function
let initialize = function () {
    operations.submitNewContact();
    operations.renderContactsOnLoad();
    operations.deleteContact();
    operations.clickContact();
};



$(document).ready(initialize);