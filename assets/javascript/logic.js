//by Federico Villalpando 12/19/2018
const ingredients = [];
const clarifi_model = 'bd367be194cf45149e75f01d59f77ba7'
//const image_URL = 'https://food.fnr.sndimg.com/content/dam/images/food/unsized/2016/2/16/0/FND_chefs-picks-comfort-madison-poutine_s4x3.jpg'
var nutritionix_input = [];

// Instantiate a new Clarifai app passing in the API key.
const app = new Clarifai.App({
  apiKey: '080661d621c8443089fdf99c3df14ae1'
});

// Format Clarifi results before sending to Nutritionix
function format4NutritionixAPI (clarifi_response){

  for (let i = 0; i < 10; i++) {
    ingredients[i] = {
      name: clarifi_response.outputs[0].data.concepts[i].name, 
      value: clarifi_response.outputs[0].data.concepts[i].value
    };
  }

  ingredients.forEach(element => {
    console.log(element.name);
    nutritionix_input = nutritionix_input.concat(' ' + element.name + ' and ');
  });

    return nutritionix_input
}

//by Sachiko put input url by user to image_URL const and display the image
$("form").on('submit', function(e){
  e.preventDefault();
  console.log($("#inputBox").val());
  $("#image").attr("src", $("#inputBox").val());
  const image_URL=$("#inputBox").val();
//use Clarifi.GENERAL_MODEL to access genereric prediction model
app.models.predict(clarifi_model, image_URL).then(
    
    function(clarifi_response) {
      
      var nutritionix_input = format4NutritionixAPI(clarifi_response);
      console.log('This is the nutritionix_input string :'+ nutritionix_input);
      callEdamam(nutritionix_input);
    
    },
    //catch errors
    function(err) {
      alert(err);
      return error;
    },

);
});

//by Federico Villalpando 12/20
const nutritionix_app_ID = '91b04efd';
const nutritionix_app_KEY = '86859fed8878066519436c598b5c1c23';
const queryURL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

function callEdamam(nutritionix_input){
    //var test = nutritionix_input.toString();
    var settings = 
        {
            "async": true,
            "crossDomain": true,
            "url": queryURL,
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "x-app-id": nutritionix_app_ID,
                "x-app-key": nutritionix_app_KEY,
                "cache-control": "no-cache",
                "Postman-Token": "a40402d4-a942-4f20-801d-df21a2a44301"
            },
            "processData": false,
            "data": "{\"query\":\" "+ nutritionix_input + " pesto,pasta,penne,meat,garlic\"}"
        }

        $.ajax(settings).then(
            function (nutritionix_response) {
              displayIngredients(nutritionix_response);
        });      
        
};

function displayIngredients(nutritionix_response){
  var food = nutritionix_response;
  for (i = 0; i < food.foods.length; i++) {
    var newRow = $("<tr>").append(
      $("<td>").text(food.foods[i].food_name),
      $("<td>").text(food.foods[i].serving_qty),
      $("<td>").text(food.foods[i].serving_unit),
      $("<td>").text(food.foods[i].nf_calories),
      $("<td>").text(food.foods[i].nf_protein),
      $("<td>").text(food.foods[i].nf_total_carbohydrate),
      $("<td>").text(food.foods[i].nf_total_fat),
    );
    $("#ingredients").append(newRow);
    }
}







