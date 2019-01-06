//by Federico Villalpando 12/19/2018
const ingredients = [];
const clarifi_model = 'bd367be194cf45149e75f01d59f77ba7'
const image_URL = 'https://food.fnr.sndimg.com/content/dam/images/food/unsized/2016/2/16/0/FND_chefs-picks-comfort-madison-poutine_s4x3.jpg'
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
  console.log('This is the display Function [Sachiko to display the contents of the nutritionix_response object]:')
  console.log(nutritionix_response);

  // use nutritionix_response objec to create a table that displays:
        //     link_to_thumbnail: '',       // thubmnail 
        //     name: '',                    //name of item
        //     calories: '',                //total calories:  id: 208 in kcal
        //     sugar: '',                   //total sugar : id: 269 in grams,
        //     protein: '',                 //total protein: id: 203 in grams,
        //     trans_fat: '',               // total transfat : id: 605 in grams,
        //     vitamin_D: ''                // total vit D : id: 328 in micro grams
        // }


}







