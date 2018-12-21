//by Federico Villalpando 12/19/2018
const ingredients = [];
const clarifi_model = 'bd367be194cf45149e75f01d59f77ba7'
const image_URL = 'https://food.fnr.sndimg.com/content/dam/images/food/unsized/2016/2/16/0/FND_chefs-picks-comfort-madison-poutine_s4x3.jpg'

// instantiate a new Clarifai app passing in the API key.
const app = new Clarifai.App({
  apiKey: '080661d621c8443089fdf99c3df14ae1'
});

//use Clarifi.GENERAL_MODEL to access genereric prediction model
app.models.predict(clarifi_model, image_URL).then(
    
    function(response) {

      for (let i = 0; i < 10; i++) {
        ingredients[i] = {
          name: response.outputs[0].data.concepts[i].name, 
          value: response.outputs[0].data.concepts[i].value
        };
      }

      console.log('This is the ingredients array: ' + JSON.stringify(ingredients));
      console.log(ingredients);
      console.log(ingredients[3].name); 
      console.log(ingredients[3].value); 

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

function callEdamam(){
    
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
            "data": "{\n\t\"query\":\"for breakfast i ate 2 eggs, bacon, and french toast\"}"
        }

        $.ajax(settings).then(
            function (response) {
            console.log(response);

        });      

        // displayIngredients(ingredients);   Sachiko 

        // ingredients = {
        //     link_to_thumbnail: '',       // thubmnail 
        //     name: '',                    //name of item
        //     calories: '',                //total calories:  id: 208 in kcal
        //     sugar: '',                   //total sugar : id: 269 in grams,
        //     protein: '',                 //total protein: id: 203 in grams,
        //     trans_fat: '',               // total transfat : id: 605 in grams,
        //     vitamin_D: ''                // total vit D : id: 328 in micro grams
        // }

};

callEdamam();


