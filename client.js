$(document).ready(function(e) {
  //alert(window.clients.length);

   var table = $("#tb-clients tbody");

   for(var i = 0; i < window.clients.length; i++) {
      var firstName = $("<td/>");
      firstName.text(window.clients[i].firstName);

      var lastName = $("<td/>");
      lastName.text(window.clients[i].lastName);

      var balance = $("<td/>");
      balance.text(window.clients[i].balance);

      var tr = $("<tr/>");
      tr.append(firstName, lastName, balance);
      table.append(tr);
   } 

   // Get the categories container to be filled with categies list.
   var categoryContainer = $("#blk-categories");

   for(var i = 0; i < window.categories.length; i++) {
      // Create a button element using JQuery library.
      var categoryBtn = $("<button/>");

      // Set text attribute of the button element with a category name.
      categoryBtn.text(window.categories[i].name);

      // Set metadata to be available at the click event handler execution time.
      categoryBtn.data("categoryId", window.categories[i].id);

      // Set click handler for the created button.
      categoryBtn.click(function(){
         onTagClick($(this).data("categoryId"));
      });

      //Append the created button to the categories container using jQuery library
      categoryContainer.append(categoryBtn);
      
   }

   $("#bt-find-max").click(function() {
      
      var max = 0;
      var outputText = '';
      // Find the max balance
      for(var i = 0; i < window.clients.length; i++) {
         if(max <= window.clients[i].balance) {
            max = window.clients[i].balance;            
         }
      }


      // Find clients with the max balance
      for(var i = 0; i < window.clients.length; i++) {
         if(max == window.clients[i].balance) {
            outputText += `${output(window.clients[i])};`
         }
      }

      alert(outputText);

   });



   var findVideosByTagId = function(tagId){
      // variable to store result videos.
      var resultVideos = [];

      // Iterate over through each videos.
      for(var i = 0; i < window.videos.length; i++){

         // Iterate over through each tag associated with the current video.
         for(var j = 0; j < window.videos[i].tags.length; j++) {

            // If a current tag of the current video equals to 'tagId' parameter 
            // add the current video into the 'resultVideos' variable
            if(window.videos[i].tags[j] == tagId){
               resultVideos.push(window.videos[i]);
            }
         }
      }

      return resultVideos;
   }

   var onTagClick = function(categoryId){
      // Clean up the videos container with "ctn-videos" id using JQuery library.
      $("#ctn-videos").empty();

      var resultsVideos = findVideosByTagId(categoryId);

      // Iterate over the list of found videos
      for(var i = 0; i < resultsVideos.length; i++){

         // Create a paragraph using JQuery library.
         var p = $("<p/>");

         // Set the inner text of the paragraph as "Title - Duration" of a video.
         p.text(`${resultsVideos[i].title} - ${resultsVideos[i].duration} min`);

         // Append the current paragraph to the videos container using JQuery library.
         $("#ctn-videos").append(p);
      }
   };

   var output = function(client){
      return `${client.firstName} ${client.lastName}`;
   };

});