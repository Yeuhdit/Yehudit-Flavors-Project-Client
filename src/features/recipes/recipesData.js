// // src/features/recipes/recipesData.js

import chocolateCake from '../../assets/images/chocolate_cake.jpg';//1
import brownies from '../../assets/images/brownies.jpg';//2
import chocolateBalls from '../../assets/images/chocolate_balls.jpg';//3
import mousseCups from '../../assets/images/mousse_cups.jpg';//4
import cheesecake from '../../assets/images/cheesecake.jpg';
import cupcakes from '../../assets/images/cupcakes.jpg';
import cookies from '../../assets/images/cookies.jpg';//8
import souffle from '../../assets/images/souffle.jpg';
import alfajores from '../../assets/images/alfajores.jpg';
import  CandyCoatedChocolateBalls from '../../assets/images/Candy_coated_chocolate_balls.jpg';
import  CoffeeAndChocolateCake from '../../assets/images/Coffee_and_chocolate_cake.jpg';
import  HomFantasy from '../../assets/images/Hom_fantasy.jpg';
import  MiniPavlovas from '../../assets/images/Mini_Pavlovas.jpg';
import  EarthquakeCookies from '../../assets/images/Earthquake_cookies.jpg';
import  LentilCookies from '../../assets/images/Lentil_cookies.jpg';//16
import PeanutButterCake from '../../assets/images/Peanut_butter_cake.jpg';
import  PretzelSneakers from '../../assets/images/Pretzel_sneakers.jpg';
import  Coccolidea from '../../assets/images/Coccolidea.jpg';
import  BreastCoffeeCake from '../../assets/images/Breast_Coffee_Cake.jpg';
import  Schnitzel from '../../assets/images/Schnitzel.jpg';
import  ChickenBreast from '../../assets/images/Chicken_Breast.jpg';
import  PopcornChicken from '../../assets/images/Popcorn_chicken.jpg';//23
import  Shawarma from '../../assets/images/Shawarma.jpg';
import  pinterest from '../../assets/images/pinterest.jpg';
import  CreamySoup from '../../assets/images/Creamy_soup.jpg';
import  OrangeSoupWithLentils from '../../assets/images/Orange_soup_with_lentils.jpg';
import  SoupWithChickenBalls from '../../assets/images/Soup_with_chicken_balls.jpg';
import  ChickenSoup from '../../assets/images/Chicken_soup.jpg';//28
import  SoupWithMeat from '../../assets/images/Soup_with_meat.jpg';//29
 import  VegetableSalad from '../../assets/images/Vegetable_salad.jpg';
 import  FishFillet from '../../assets/images/Fish_fillet.jpg';
 import  SalmonFish from '../../assets/images/Salmon.jpg';
import  RedMusht from '../../assets/images/Red_musht.jpg';
import  PilaFish from '../../assets/images/Pila_fish.jpg';

export const mockRecipes = [
  { _id: '1', name: 'עוגת שוקולד', imageUrl: chocolateCake, category: 'פרווה', difficulty: 'בינוני' },//1
  { _id: '2', name: 'בראוניז', imageUrl: brownies, category: 'פרווה', difficulty: 'קל' },//2
  { _id: '3', name: 'כדורי שוקולד', imageUrl: chocolateBalls, category: 'פרווה', difficulty: 'קל' },//3
  { _id: '4', name: 'כוסות מוס', imageUrl: mousseCups, category: 'חלבי', difficulty: 'בינוני' },
  { _id: '5', name: 'עוגת גבינה', imageUrl: cheesecake, category: 'חלבי', difficulty: 'בינוני' },//5
  { _id: '7', name: 'קאפקייקס', imageUrl: cupcakes, category: 'חלבי', difficulty: 'קל' },
  { _id: '8', name: 'עוגיות', imageUrl: cookies, category: 'פרווה', difficulty: 'קל' },
  { _id: '9', name: 'סופלה', imageUrl: souffle, category: 'פרווה', difficulty: 'קשה' },//9
  { _id: '10', name: 'אלפחורס', imageUrl: alfajores, category: 'חלבי', difficulty: 'בינוני' },//
    { _id: '11', name: 'כדורי שוקולד מצופים בממתק', imageUrl: CandyCoatedChocolateBalls, category: 'חלבי', difficulty: 'קל' },
    { _id: '12', name: 'עוגת קפה ושוקולד', imageUrl: CoffeeAndChocolateCake, category: 'פרווה', difficulty: 'בינוני' },
    { _id: '13', name: 'הום פנטזי', imageUrl: HomFantasy, category: 'חלבי', difficulty: 'קל' },//13
    { _id: '14', name: 'מיני פבלובות', imageUrl: MiniPavlovas, category: 'פרווה', difficulty: 'בינוני' },
    { _id: '15', name: 'עוגיות רעידת אדמה', imageUrl: EarthquakeCookies, category: 'פרווה', difficulty: 'קל' },
    { _id: '16', name: 'עוגיות עדשים', imageUrl: LentilCookies, category: 'פרווה', difficulty: 'קל' },//16
    { _id: '17', name: 'עוגת חמאת בוטנים', imageUrl:PeanutButterCake, category: 'פרווה', difficulty: 'בינוני' },
    { _id: '18', name: 'סניקרס פרצל', imageUrl: PretzelSneakers, category: 'פרווה', difficulty: 'בינוני' },
    { _id: '19', name: 'קוקולידאה', imageUrl: Coccolidea, category: 'פרווה', difficulty: 'קל' },
    { _id: '20', name: 'עוגת קפה ', imageUrl: BreastCoffeeCake, category: 'פרווה', difficulty: 'בינוני' },
    { _id: '21', name: 'שניצל', imageUrl: Schnitzel, category: 'בשרי', difficulty: 'קל' },//21
    { _id: '22', name: 'חזה עוף במילוי', imageUrl: ChickenBreast, category: 'בשרי', difficulty: 'בינוני' },
    { _id: '23', name: 'פופקורן עוף', imageUrl: PopcornChicken, category: 'בשרי', difficulty: 'קל' },
    { _id: '24', name: 'שווארמה ביתית', imageUrl: Shawarma, category: 'בשרי', difficulty: 'בינוני' },//24
    { _id: '25', name: 'פינטרסט', imageUrl: pinterest, category: 'בשרי', difficulty: 'בינוני' },//24
        { _id: '26', name: 'מרק שמנת קרם', imageUrl: CreamySoup, category: 'חלבי', difficulty: 'קל' },//26
    { _id: '27', name: 'מרק כתום עם עדשים', imageUrl: OrangeSoupWithLentils, category: 'פרווה', difficulty: 'קל' },
    { _id: '28', name: 'מרק עם כדורי עוף', imageUrl: SoupWithChickenBalls, category: 'בשרי', difficulty: 'בינוני' },
    { _id: '29', name: 'מרק עוף קלאסי', imageUrl: ChickenSoup, category: 'בשרי', difficulty: 'קל' },//28
    { _id: '30', name: 'מרק עם בשר', imageUrl: SoupWithMeat, category: 'בשרי', difficulty: 'בינוני' },//29
    { _id: '31', name: 'סלט ירקות קצוץ', imageUrl: VegetableSalad, category: 'פרווה', difficulty: 'קל' },
  { _id: '32', name: ' מושט עם ירקות ', imageUrl: FishFillet, category: 'פרווה', difficulty: 'בינוני' },
    { _id: '33', name: 'דג סלמון בתנור', imageUrl: SalmonFish, category: 'פרווה', difficulty: 'בינוני' },
    { _id: '34', name: 'פילה דג אדום', imageUrl: RedMusht, category: 'פרווה', difficulty: 'בינוני' },
    { _id: '35', name: 'פילה דג פילה', imageUrl: PilaFish, category: 'פרווה', difficulty: 'בינוני' },



];