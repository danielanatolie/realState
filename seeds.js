var mongoose = require("mongoose");
var Property = require("./models/property");
var Comment = require("./models/comment");

var data = [ 
    {
        name: "York House", 
        image: "https://static.pexels.com/photos/106399/pexels-photo-106399.jpeg",
        desciption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius massa eget porta lobortis. Ut lobortis aliquam tellus laoreet molestie. Maecenas porttitor elit tortor, ut commodo turpis posuere ut. Phasellus porttitor sem nec augue malesuada, et maximus felis facilisis. Duis posuere velit at sapien porta, nec porta enim tempor. Aenean efficitur, libero id dictum consequat, tellus elit lacinia diam, sed semper ligula lectus in nisi. Sed luctus tortor mi, vitae aliquam augue hendrerit sed. Etiam pharetra gravida erat at volutpat. Phasellus pretium mi ac orci lacinia mattis. Sed sem felis, venenatis eget finibus a, condimentum blandit libero. Aenean interdum tristique lacus."
    },
    {
        name: "Dansworth", 
        image: "http://www.jumptools.com/wp-content/uploads/2013/08/fotolia_3825014_x.jpg",
        desciption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius massa eget porta lobortis. Ut lobortis aliquam tellus laoreet molestie. Maecenas porttitor elit tortor, ut commodo turpis posuere ut. Phasellus porttitor sem nec augue malesuada, et maximus felis facilisis. Duis posuere velit at sapien porta, nec porta enim tempor. Aenean efficitur, libero id dictum consequat, tellus elit lacinia diam, sed semper ligula lectus in nisi. Sed luctus tortor mi, vitae aliquam augue hendrerit sed. Etiam pharetra gravida erat at volutpat. Phasellus pretium mi ac orci lacinia mattis. Sed sem felis, venenatis eget finibus a, condimentum blandit libero. Aenean interdum tristique lacus."
    },
        {
        name: "Crosmith Apartment", 
        image: "https://si.wsj.net/public/resources/images/BN-NN734_0414pp_12S_20160413160150.jpg",
        desciption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius massa eget porta lobortis. Ut lobortis aliquam tellus laoreet molestie. Maecenas porttitor elit tortor, ut commodo turpis posuere ut. Phasellus porttitor sem nec augue malesuada, et maximus felis facilisis. Duis posuere velit at sapien porta, nec porta enim tempor. Aenean efficitur, libero id dictum consequat, tellus elit lacinia diam, sed semper ligula lectus in nisi. Sed luctus tortor mi, vitae aliquam augue hendrerit sed. Etiam pharetra gravida erat at volutpat. Phasellus pretium mi ac orci lacinia mattis. Sed sem felis, venenatis eget finibus a, condimentum blandit libero. Aenean interdum tristique lacus."
    }
]

function seedDB() {
       Property.remove({}, function(err) {
            if(err) {
                console.log(err);
            }
            console.log("Removed all properties."); 
            data.forEach(function(seed) {
                Property.create(seed, function(err, property) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Added a property.");
                        Comment.create(
                            {
                                text: "A stable and flourishing investment.",
                                author: "Peterson"
                            }, function(err, comment) {
                                if(err) {
                                    console.log(err);
                                } else {
                                    property.comments.push(comment);
                                    property.save();
                                    console.log("Created new comment.");
                                }
                            });
                    }
                });
            });
        });
}

module.exports = seedDB;