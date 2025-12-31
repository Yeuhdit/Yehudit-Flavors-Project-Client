// src/features/recipes/recipesData.js

import chocolateCake from '../../assets/images/chocolate_cake.jpg'; //1
import brownies from '../../assets/images/brownies.jpg'; //2
import chocolateBalls from '../../assets/images/chocolate_balls.jpg'; //3
import mousseCups from '../../assets/images/mousse_cups.jpg'; //4
import cheesecake from '../../assets/images/cheesecake.jpg'; //5
import cupcakes from '../../assets/images/cupcakes.jpg'; //6
import cookies from '../../assets/images/cookies.jpg'; //7
import souffle from '../../assets/images/souffle.jpg'; //8
import alfajores from '../../assets/images/alfajores.jpg'; //9
import CandyCoatedChocolateBalls from '../../assets/images/Candy_coated_chocolate_balls.jpg'; //10
import CoffeeAndChocolateCake from '../../assets/images/Coffee_and_chocolate_cake.jpg'; //11
import HomFantasy from '../../assets/images/Hom_fantasy.jpg'; //12
import MiniPavlovas from '../../assets/images/Mini_Pavlovas.jpg'; //13
import EarthquakeCookies from '../../assets/images/Earthquake_cookies.jpg'; //14
import LentilCookies from '../../assets/images/Lentil_cookies.jpg'; //15
import PeanutButterCake from '../../assets/images/Peanut_butter_cake.jpg'; //16
import PretzelSneakers from '../../assets/images/Pretzel_sneakers.jpg'; //17
import Coccolidea from '../../assets/images/Coccolidea.jpg'; //18
import BreastCoffeeCake from '../../assets/images/Breast_Coffee_Cake.jpg'; //19
import Schnitzel from '../../assets/images/Schnitzel.jpg'; //20
import ChickenBreast from '../../assets/images/Chicken_Breast.jpg'; //21
import PopcornChicken from '../../assets/images/Popcorn_chicken.jpg'; //22
import Shawarma from '../../assets/images/Shawarma.jpg'; //23
import pinterest from '../../assets/images/pinterest.jpg'; //24
import CreamySoup from '../../assets/images/Creamy_soup.jpg'; //25
import OrangeSoupWithLentils from '../../assets/images/Orange_soup_with_lentils.jpg'; //26
import SoupWithChickenBalls from '../../assets/images/Soup_with_chicken_balls.jpg'; //27
import ChickenSoup from '../../assets/images/Chicken_soup.jpg'; //28
import SoupWithMeat from '../../assets/images/Soup_with_meat.jpg'; //29
import FishFillet from '../../assets/images/Fish_fillet.jpg'; //30
import SalmonFish from '../../assets/images/Salmon.jpg'; //31
import RedMusht from '../../assets/images/Red_musht.jpg'; //32
import PilaFish from '../../assets/images/Pila_fish.jpg'; //33
import ChickenSalad from '../../assets/images/Chicken_salad.jpg'; //34
import SchnitzelSalad from '../../assets/images/Schnitzel_salad.jpg'; //35
import VegetableSalad from '../../assets/images/Vegetable_salad.jpg'; //36 אתה יכול לעזור לי למטה לכתוב 

export const mockRecipes = [
  {
    _id: '1',
    name: 'עוגת שוקולד',
    imageUrl: chocolateCake,
    category: 'פרווה',
    difficulty: 'בינוני',
    prepTime: '20 דקות',
    cookTime: '40 דקות',
    servings: 12,
    cardHeight: '340px',
    ingredients: ['200ג שוקולד מריר', '150ג מרגרינה', '4 ביצים', 'כוס סוכר', 'כוס קמח תופח', 'קורט מלח'],
    instructions: ['ממיסים שוקולד ומרגרינה', 'מקציפים ביצים וסוכר', 'מאחדים', 'מוסיפים קמח', 'אופים 40 דקות ב-180°', 'מצננים']
  },
  {
    _id: '2',
    name: 'בראוניז',
    imageUrl: brownies,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '15 דקות',
    cookTime: '25 דקות',
    servings: 9,
    cardHeight: '260px',
    ingredients: ['200ג שוקולד', '150ג מרגרינה', '3 ביצים', 'כוס סוכר', '¾ כוס קמח'],
    instructions: ['ממיסים שוקולד ומרגרינה', 'מערבבים ביצים וסוכר', 'מאחדים', 'אופים 25 דקות ב-180°']
  },
  {
    _id: '3',
    name: 'כדורי שוקולד',
    imageUrl: chocolateBalls,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '15 דקות',
    cookTime: 'ללא אפייה',
    servings: 25,
    cardHeight: '300px',
    ingredients: ['400ג ביסקוויטים', '200ג שוקולד', 'כוס חלב צמחי', 'קוקוס'],
    instructions: ['מפוררים ביסקוויטים', 'ממיסים שוקולד', 'מערבבים', 'מגלגלים', 'מצפים', 'מקררים']
  },
  {
    _id: '4',
    name: 'כוסות מוס',
    imageUrl: mousseCups,
    category: 'חלבי',
    difficulty: 'בינוני',
    prepTime: '20 דקות',
    cookTime: 'ללא אפייה',
    servings: 8,
    cardHeight: '280px',
    ingredients: ['200ג שוקולד', '500מ"ל שמנת מתוקה', '3 ביצים', 'סוכר'],
    instructions: ['ממיסים שוקולד', 'מקציפים שמנת', 'מאחדים', 'יוצקים לכוסות', 'מקררים 4 שעות']
  },
  {
    _id: '5',
    name: 'עוגת גבינה',
    imageUrl: cheesecake,
    category: 'חלבי',
    difficulty: 'בינוני',
    prepTime: '30 דקות',
    cookTime: '60 דקות',
    servings: 10,
    cardHeight: '320px',
    ingredients: ['500ג גבינה', 'שמנת חמוצה', '5 ביצים', 'סוכר', 'פודינג וניל', 'בסיס ביסקוויטים'],
    instructions: ['מכינים בסיס', 'מערבבים מלית', 'אופים שעה ב-160°', 'מצננים לילה']
  },
  {
    _id: '6',
    name: 'קאפקייקס',
    imageUrl: cupcakes,
    category: 'חלבי',
    difficulty: 'קל',
    prepTime: '20 דקות',
    cookTime: '20 דקות',
    servings: 12,
    cardHeight: '300px',
    ingredients: ['חמאה', 'סוכר', 'ביצים', 'קמח', 'קצפת לקישוט'],
    instructions: ['מקציפים', 'אופים 20 דקות', 'מקשטים']
  },
  {
    _id: '7',
    name: 'עוגיות',
    imageUrl: cookies,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '15 דקות',
    cookTime: '12 דקות',
    servings: 30,
    cardHeight: '260px',
    ingredients: ['מרגרינה', 'סוכר', 'ביצים', 'קמח', 'שוקולד צ\'יפס'],
    instructions: ['מערבבים', 'יוצרים עיגולים', 'אופים 12 דקות']
  },
  {
    _id: '8',
    name: 'סופלה',
    imageUrl: souffle,
    category: 'פרווה',
    difficulty: 'קשה',
    prepTime: '20 דקות',
    cookTime: '15 דקות',
    servings: 6,
    cardHeight: '340px',
    ingredients: ['שוקולד', 'מרגרינה', 'ביצים', 'סוכר'],
    instructions: ['ממיסים', 'מקציפים חלבונים', 'אופים מיד 15 דקות']
  },
  {
    _id: '9',
    name: 'אלפחורס',
    imageUrl: alfajores,
    category: 'חלבי',
    difficulty: 'בינוני',
    prepTime: '40 דקות',
    cookTime: '15 דקות',
    servings: 20,
    cardHeight: '280px',
    ingredients: ['חמאה', 'סוכר', 'חלמונים', 'קורנפלור', 'ריבת חלב'],
    instructions: ['מכינים בצק', 'אופים', 'ממלאים']
  },
  {
    _id: '10',
    name: 'כדורי שוקולד מצופים',
    imageUrl: CandyCoatedChocolateBalls,
    category: 'חלבי',
    difficulty: 'קל',
    prepTime: '20 דקות',
    cookTime: 'ללא אפייה',
    servings: 20,
    cardHeight: '320px',
    ingredients: ['ביסקוויטים', 'שוקולד', 'חלב', 'ממתקים'],
    instructions: ['מכינים תערובת', 'מגלגלים', 'מצפים', 'מקררים']
  },
  {
    _id: '11',
    name: 'עוגת קפה ושוקולד',
    imageUrl: CoffeeAndChocolateCake,
    category: 'פרווה',
    difficulty: 'בינוני',
    prepTime: '30 דקות',
    cookTime: '40 דקות',
    servings: 12,
    cardHeight: '300px',
    ingredients: ['שוקולד', 'קפה', 'ביצים', 'קמח', 'סוכר'],
    instructions: ['ממיסים', 'מערבבים', 'אופים']
  },
  {
    _id: '12',
    name: 'הום פנטזי',
    imageUrl: HomFantasy,
    category: 'חלבי',
    difficulty: 'קל',
    prepTime: '20 דקות',
    cookTime: 'ללא אפייה',
    servings: 10,
    cardHeight: '260px',
    ingredients: ['ביסקוויטים', 'גבינה', 'שמנת', 'פירות'],
    instructions: ['שכבות', 'מקררים']
  },
  {
    _id: '13',
    name: 'מיני פבלובות',
    imageUrl: MiniPavlovas,
    category: 'פרווה',
    difficulty: 'בינוני',
    prepTime: '30 דקות',
    cookTime: '60 דקות',
    servings: 8,
    cardHeight: '340px',
    ingredients: ['חלבונים', 'סוכר', 'קצפת', 'פירות'],
    instructions: ['מקציפים מרנג', 'אופים נמוך', 'ממלאים']
  },
  {
    _id: '14',
    name: 'עוגיות רעידת אדמה',
    imageUrl: EarthquakeCookies,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '15 דקות',
    cookTime: '12 דקות',
    servings: 20,
    cardHeight: '280px',
    ingredients: ['שוקולד', 'חמאה', 'ביצים', 'קמח', 'אבקת סוכר'],
    instructions: ['מערבבים', 'מקררים', 'אופים', 'מצפים באבקה']
  },
  {
    _id: '15',
    name: 'עוגיות עדשים',
    imageUrl: LentilCookies,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '15 דקות',
    cookTime: '15 דקות',
    servings: 20,
    cardHeight: '300px',
    ingredients: ['עדשים מבושלות', 'קמח', 'סוכר', 'תבלינים'],
    instructions: ['טוחנים עדשים', 'מערבבים', 'אופים']
  },
  {
    _id: '16',
    name: 'עוגת חמאת בוטנים',
    imageUrl: PeanutButterCake,
    category: 'פרווה',
    difficulty: 'בינוני',
    prepTime: '25 דקות',
    cookTime: '35 דקות',
    servings: 10,
    cardHeight: '320px',
    ingredients: ['חמאת בוטנים', 'סוכר', 'ביצים', 'קמח'],
    instructions: ['מערבבים', 'אופים']
  },
  {
    _id: '17',
    name: 'סניקרס פרצל',
    imageUrl: PretzelSneakers,
    category: 'פרווה',
    difficulty: 'בינוני',
    prepTime: '30 דקות',
    cookTime: 'ללא אפייה',
    servings: 15,
    cardHeight: '260px',
    ingredients: ['פרצלים', 'קרמל', 'שוקולד', 'בוטנים'],
    instructions: ['שכבות', 'מקררים']
  },
  {
    _id: '18',
    name: 'קוקולידאה',
    imageUrl: Coccolidea,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '20 דקות',
    cookTime: 'ללא אפייה',
    servings: 12,
    cardHeight: '340px',
    ingredients: ['שוקולד', 'קוקוס', 'ביסקוויטים'],
    instructions: ['מערבבים', 'מקררים']
  },
  {
    _id: '19',
    name: 'עוגת קפה',
    imageUrl: BreastCoffeeCake,
    category: 'פרווה',
    difficulty: 'בינוני',
    prepTime: '30 דקות',
    cookTime: '40 דקות',
    servings: 10,
    cardHeight: '300px',
    ingredients: ['קפה', 'שוקולד', 'קמח', 'ביצים'],
    instructions: ['מערבבים', 'אופים']
  },
  {
    _id: '20',
    name: 'שניצל',
    imageUrl: Schnitzel,
    category: 'בשרי',
    difficulty: 'קל',
    prepTime: '15 דקות',
    cookTime: '10 דקות',
    servings: 4,
    cardHeight: '280px',
    ingredients: ['חזה עוף', 'קמח', 'ביצה', 'פירורי לחם'],
    instructions: ['מתבלים', 'טובלים', 'מטגנים']
  },
  {
    _id: '21',
    name: 'חזה עוף במילוי',
    imageUrl: ChickenBreast,
    category: 'בשרי',
    difficulty: 'בינוני',
    prepTime: '30 דקות',
    cookTime: '40 דקות',
    servings: 4,
    cardHeight: '320px',
    ingredients: ['חזה עוף', 'גבינה', 'ירקות', 'תבלינים'],
    instructions: ['ממלאים', 'אופים']
  },
  {
    _id: '22',
    name: 'פופקורן עוף',
    imageUrl: PopcornChicken,
    category: 'בשרי',
    difficulty: 'קל',
    prepTime: '20 דקות',
    cookTime: '15 דקות',
    servings: 4,
    cardHeight: '260px',
    ingredients: ['חזה עוף חתוך', 'פירורי לחם', 'ביצה'],
    instructions: ['טובלים', 'מטגנים']
  },
  {
    _id: '23',
    name: 'שווארמה ביתית',
    imageUrl: Shawarma,
    category: 'בשרי',
    difficulty: 'בינוני',
    prepTime: '30 דקות + השרייה',
    cookTime: '30 דקות',
    servings: 6,
    cardHeight: '340px',
    ingredients: ['עוף או הודו', 'תבליני שווארמה', 'יוגורט'],
    instructions: ['משרים', 'מטגנים', 'מגישים בפיתה']
  },
  {
    _id: '24',
    name: 'עוגת פינטרסט',
    imageUrl: pinterest,
    category: 'חלבי',
    difficulty: 'בינוני',
    prepTime: '40 דקות',
    cookTime: '35 דקות',
    servings: 10,
    cardHeight: '300px',
    ingredients: ['קמח', 'סוכר', 'חמאה', 'קישוטים'],
    instructions: ['אופים שכבות', 'מקשטים יפה']
  },
  {
    _id: '25',
    name: 'מרק שמנת',
    imageUrl: CreamySoup,
    category: 'חלבי',
    difficulty: 'קל',
    prepTime: '20 דקות',
    cookTime: '30 דקות',
    servings: 6,
    cardHeight: '280px',
    ingredients: ['פטריות או ירקות', 'שמנת', 'ציר'],
    instructions: ['מטגנים', 'מוסיפים ציר', 'טוחנים', 'מוסיפים שמנת']
  },
  {
    _id: '26',
    name: 'מרק כתום עם עדשים',
    imageUrl: OrangeSoupWithLentils,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '20 דקות',
    cookTime: '40 דקות',
    servings: 6,
    cardHeight: '320px',
    ingredients: ['גזר', 'דלעת', 'עדשים כתומות'],
    instructions: ['מבשלים', 'טוחנים']
  },
  {
    _id: '27',
    name: 'מרק עם כדורי עוף',
    imageUrl: SoupWithChickenBalls,
    category: 'בשרי',
    difficulty: 'בינוני',
    prepTime: '30 דקות',
    cookTime: '60 דקות',
    servings: 8,
    cardHeight: '260px',
    ingredients: ['ציר עוף', 'בשר טחון לכדורים', 'ירקות'],
    instructions: ['מבשלים ציר', 'מכינים כדורים', 'מוסיפים']
  },
  {
    _id: '28',
    name: 'מרק עוף',
    imageUrl: ChickenSoup,
    category: 'בשרי',
    difficulty: 'קל',
    prepTime: '20 דקות',
    cookTime: '90 דקות',
    servings: 8,
    cardHeight: '340px',
    ingredients: ['עוף', 'גזר', 'סלרי', 'בצל'],
    instructions: ['מבשלים ארוך', 'מוסיפים אטריות']
  },
  {
    _id: '29',
    name: 'מרק בשר',
    imageUrl: SoupWithMeat,
    category: 'בשרי',
    difficulty: 'בינוני',
    prepTime: '30 דקות',
    cookTime: '2 שעות',
    servings: 8,
    cardHeight: '300px',
    ingredients: ['בשר', 'ירקות', 'קטניות'],
    instructions: ['מבשלים בשר ארוך', 'מוסיפים ירקות']
  },
  {
    _id: '30',
    name: 'פילה דג עם ירקות',
    imageUrl: FishFillet,
    category: 'פרווה',
    difficulty: 'בינוני',
    prepTime: '20 דקות',
    cookTime: '30 דקות',
    servings: 4,
    cardHeight: '280px',
    ingredients: ['פילה דג', 'ירקות', 'תבלינים'],
    instructions: ['מתבלים', 'אופים עם ירקות']
  },
  {
    _id: '31',
    name: 'דג סלמון',
    imageUrl: SalmonFish,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '10 דקות',
    cookTime: '20 דקות',
    servings: 4,
    cardHeight: '320px',
    ingredients: ['סלמון', 'לימון', 'שום', 'שמן זית'],
    instructions: ['מתבלים', 'אופים 20 דקות']
  },
  {
    _id: '32',
    name: 'פילה דג אדום',
    imageUrl: RedMusht,
    category: 'פרווה',
    difficulty: 'בינוני',
    prepTime: '15 דקות',
    cookTime: '25 דקות',
    servings: 4,
    cardHeight: '260px',
    ingredients: ['פילה דג אדום', 'תבלינים', 'לימון'],
    instructions: ['מתבלים', 'אופים או מטגנים']
  },
  {
    _id: '33',
    name: 'פילה דג',
    imageUrl: PilaFish,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '10 דקות',
    cookTime: '20 דקות',
    servings: 4,
    cardHeight: '340px',
    ingredients: ['פילה דג', 'שמן זית', 'עשבים'],
    instructions: ['מתבלים', 'אופים']
  },
  {
    _id: '34',
    name: 'סלט עוף',
    imageUrl: ChickenSalad,
    category: 'בשרי',
    difficulty: 'קל',
    prepTime: '15 דקות',
    cookTime: 'ללא',
    servings: 4,
    cardHeight: '300px',
    ingredients: ['עוף מבושל', 'ירקות', 'מיונז או רוטב'],
    instructions: ['קוצצים', 'מערבבים']
  },
  {
    _id: '35',
    name: 'סלט שניצל',
    imageUrl: SchnitzelSalad,
    category: 'בשרי',
    difficulty: 'קל',
    prepTime: '15 דקות',
    cookTime: 'ללא',
    servings: 4,
    cardHeight: '280px',
    ingredients: ['שניצל קר', 'ירקות', 'רוטב'],
    instructions: ['חותכים שניצל', 'מערבבים עם סלט']
  },

   {
    _id: '36',
    name: 'סלט ירקות',
    imageUrl: VegetableSalad,
    category: 'פרווה',
    difficulty: 'קל',
    prepTime: '15 דקות',
    cookTime: 'ללא',
    servings: 4,
    cardHeight: '280px',
    ingredients: ['שניצל קר', 'ירקות', 'רוטב'],
    instructions: ['חותכים ירקות אגבנייה ', 'מערבבים עם סלט']
  }


];