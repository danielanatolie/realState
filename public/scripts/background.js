var counter = 0;
function changeBG(){
    var imgs = [
        "url(http://cdn.pcwallart.com/images/island-beach-house-wallpaper-4.jpg)",
        "url(http://unisci24.com/data_images/wlls/9/199518-building.jpg)",
        "url(https://adc3ef35f321fe6e725a-fb8aac3b3bf42afe824f73b606f0aa4c.ssl.cf1.rackcdn.com/propertyimages/849/quaker-bridge-mall-03.jpg)",
        "url(http://unisci24.com/data_images/wlls/9/199518-building.jpg)",
        "url(http://cdn.pcwallart.com/images/island-beach-house-wallpaper-4.jpg)"
      ]
    
    if(counter === imgs.length) counter = 0;
    $("body").css("background-image", imgs[counter]);

    counter++;
}
  
  setInterval(changeBG, 2000);
