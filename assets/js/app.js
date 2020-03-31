// Topics array
var topics = ["happy","angry","mischievous","ecstatic","funny","victorious","hungry","hangry","worried","stressed","scared","satisfied"]
var topicSelected = "";
var newTopic;

// Create buttons based on topics array
function createButtons() {
    // Empty out the topic buttons every creation
    $("#topicButtons").empty();

    // Run a for in loop to create buttons out of topics array values
    for (v in topics) {
        var topicButton = $("<button>");
        topicButton.text(topics[v]);
        topicButton.addClass("topicButton")
        $("#topicButtons").append(topicButton);
    }

    // When button is clicked run this code block
    $(".topicButton").on("click", function () {

        $("#emotionsDiv").empty();

        // Get the button text as topicSelected
        topicSelected = $(this).text();

        // Makes the GET call to url and triggers function to save json payload
        // Creates url based on parameters added
        var url = "https://api.giphy.com/v1/gifs/search";
        url += '?' + $.param({
            'q': topicSelected,
            'api_key': "aq2QKEzeOkwyPBsKY1OmdpET62y3UqqC"
        });

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {

            // Save JSON in results
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var stillImageUrl = results[i].images.downsized_still.url;

                // Create div for card
                var emotionDiv = $("<div>");
                // Add class col-sm-4
                emotionDiv.addClass("col-sm-4")

                // Create card
                var emotionCard = $("<div>")
                emotionCard.addClass("card")

                // Create img, add card-img-top class and append to card
                var emotionImage = $("<img>").attr("src", stillImageUrl);
                emotionImage.attr("data-still", results[i].images.original_still.url)
                emotionImage.attr("data-animate", results[i].images.original.url)
                emotionImage.attr("data-state", "still")
                emotionImage.addClass("card-img-top");
                emotionCard.append(emotionImage);

                // Create title for card, add card-body class
                // Create h5 header , add class card-title and append to emotion title
                var emotionTitle = $("<div>")
                emotionTitle.addClass("card-body")
                var emotionTitleHeading = $("<h5>")
                emotionTitleHeading.addClass("card-title")
                emotionTitleHeading.append(results[i].title);
                emotionTitle.append(emotionTitleHeading);
                // Append emotion title and heading to card
                emotionCard.append(emotionTitle);

                // Create info for card
                var emotionInfoList = $("<ul>");
                emotionInfoList.addClass("list-group", "list-group-flush");
                // Create items for info in card
                // Create rating item and append to list
                var emotionInfoRating = $("<li>");
                emotionInfoRating.addClass("list-group-item");
                emotionInfoRating.append("Rating: " + results[i].rating);
                emotionInfoList.append(emotionInfoRating);
                // Create username item and append to list
                var emotionInfoUsername = $("<li>")
                emotionInfoUsername.addClass("list-group-item")
                emotionInfoUsername.append("Username: " + results[i].username);
                emotionInfoList.append(emotionInfoUsername);
                // Create created time item and append to list
                var emotionInfoCreatedTime = $("<li>")
                emotionInfoCreatedTime.addClass("list-group-item")
                emotionInfoCreatedTime.append("Created Time: " + results[i].import_datetime);
                emotionInfoList.append(emotionInfoCreatedTime);
                emotionCard.append(emotionInfoList);

                // Append emotion card to emotion div
                emotionDiv.append(emotionCard)
                $("#emotionsDiv").append(emotionDiv);
            }
            $("img").on("click", function () {

                if ($(this).attr("data-state") === "still") {

                    $(this).attr("data-state", "animated");
                    $(this).attr("src", $(this).attr("data-animate"));

                }
                else {
                    $(this).attr("data-state", "still");
                    $(this).attr("src", $(this).attr("data-still"));
                }
            });
        })
        
    })
}

// Initial creation of buttons
createButtons();

// Create new topic button if not in topics array
$("#newTopic").on("click", function(){
    // Avoid browser defaults
    event.preventDefault();

    // Get new topic from user
    newTopic = $("#userTopic").val().trim();
    // Clear the form after user submits
    $("#form")[0].reset();
    // Looks for user topic in topics array
    if (topics.indexOf(newTopic) === -1) {
        // If not found, push user topic to topics
        topics.push(newTopic);
        // Re-run buttons 
        createButtons();
    }
    
})

