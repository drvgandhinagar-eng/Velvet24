// -----------------------------
// script.js (Full menu + no chat)
// -----------------------------

/* ---------- Config ---------- */
const SWIGGY_LINK = "https://www.swiggy.com/city/ahmedabad/velvet-24-restaurant-and-banquet-gandhinagar-rest1133323";
const ZOMATO_LINK = "https://www.zomato.com/ahmedabad/velvet-24-the-taste-of-culture-infocity-gandhinagar";
const RESTAURANT_EMAIL = "velvet24restaurant@gmail.com";
const RESTAURANT_PHONE = "+918014113322";

/* ---------- Full menuData (from your PDF) ---------- */
const menuData = [
  // JUICES
  { name:"Apple Juice", category:"Juice", price:"70", description:"Fresh apple juice." },
  { name:"Pineapple Juice", category:"Juice", price:"70", description:"Refreshing pineapple juice." },
  { name:"Orange Juice", category:"Juice", price:"70", description:"Citrus fresh orange juice." },
  { name:"Watermelon Juice", category:"Juice", price:"70", description:"Cool watermelon juice." },
  { name:"Papaya Shake", category:"Juice", price:"60", description:"Creamy papaya shake." },
  { name:"Pomegranate Juice", category:"Juice", price:"150", description:"Fresh pomegranate juice." },

  // PAPAD
  { name:"Roasted Papad", category:"Papad", price:"40", description:"Roasted crispy papad." },
  { name:"Fry Papad", category:"Papad", price:"50", description:"Deep fried papad." },
  { name:"Masala Papad", category:"Papad", price:"70", description:"Papad topped with fresh spices." },
  { name:"Cheese Masala Papad", category:"Papad", price:"80", description:"Papad topped with cheese & masala." },
  { name:"Chole Chilli Masala Papad", category:"Papad", price:"90", description:"Papad topped with spicy chole mix." },

  // SANDWICH
  { name:"Veg Sandwich", category:"Sandwich", price:"80", description:"Fresh vegetable sandwich." },
  { name:"Cheese Sandwich", category:"Sandwich", price:"100", description:"Cheese loaded sandwich." },
  { name:"Club Sandwich", category:"Sandwich", price:"150", description:"Three-layered club sandwich." },
  { name:"Chatni Sandwich", category:"Sandwich", price:"100", description:"Green chutney sandwich." },
  { name:"Bread Butter", category:"Sandwich", price:"60", description:"Bread with butter." },
  { name:"French Fry", category:"Sandwich", price:"120", description:"Crispy French fries." },

  // SOUPS
  { name:"Tomato Soup", category:"Soup", price:"180", description:"Classic tomato soup." },
  { name:"Cream of Tomato", category:"Soup", price:"170", description:"Creamy tomato soup." },
  { name:"Veg Manchow", category:"Soup", price:"200", description:"Chinese-style spicy manchow soup." },
  { name:"Veg Hot & Sour", category:"Soup", price:"200", description:"Hot and sour soup with vegetables." },
  { name:"Broccoli Almond", category:"Soup", price:"250", description:"Broccoli soup with almond." },
  { name:"Spanish Green", category:"Soup", price:"200", description:"Spinach green soup." },
  { name:"Taj Max Tortila", category:"Soup", price:"250", description:"Tortilla & bean soup topped with cheese." },
  { name:"Mini Strone", category:"Soup", price:"180", description:"Classic vegetable minestrone." },
  { name:"Sweet Corn Soup", category:"Soup", price:"200", description:"Sweet corn & vegetable soup." },
  { name:"Veg Corn Soup", category:"Soup", price:"200", description:"Corn-based veg soup." },
  { name:"Mexican Tomatillo Soup", category:"Soup", price:"200", description:"Mexican spicy tomato soup." },
  { name:"Italian Tomato Soup", category:"Soup", price:"200", description:"Italian style tomato & cheese soup." },
  { name:"Thai Soup", category:"Soup", price:"250", description:"Thai flavored coconut soup." },
  { name:"Mushroom Soup", category:"Soup", price:"250", description:"Creamy mushroom soup." },
  { name:"Asian Noodles Soup", category:"Soup", price:"250", description:"Asian-style noodles soup." },

  // MOCKTAILS
  { name:"Blue Lagoon", category:"Mocktail", price:"260", description:"Lemon, blue curacao, soda mix." },
  { name:"Spicy Guava Mocktail", category:"Mocktail", price:"180", description:"Guava + chilli salt." },
  { name:"Watermelon Mojito", category:"Mocktail", price:"200", description:"Watermelon mint mojito." },
  { name:"Fruite Punch", category:"Mocktail", price:"200", description:"Fruit blend with ice cream." },
  { name:"Pina Colada", category:"Mocktail", price:"240", description:"Pineapple & coconut blend." },
  { name:"Blueberry Mojito", category:"Mocktail", price:"240", description:"Blueberry flavoured mojito." },
  { name:"Orange Mojito", category:"Mocktail", price:"230", description:"Orange + mint mojito." },
  { name:"Virgin Mojito", category:"Mocktail", price:"200", description:"Mint lemon mojito." },
  { name:"Classic Mojito", category:"Mocktail", price:"225", description:"Classic mojito blend." },
  { name:"Green Apple Mojito", category:"Mocktail", price:"250", description:"Green apple flavour." },
  { name:"Strawberry Mojito", category:"Mocktail", price:"250", description:"Strawberry flavored mojito." },
  { name:"Cranberry Mimosa", category:"Mocktail", price:"260", description:"Cranberry + citrus." },
  { name:"Grapemint", category:"Mocktail", price:"200", description:"Grape juice + mint." },
  { name:"Ice Tea (Lemon/Peach)", category:"Mocktail", price:"100", description:"Refreshing iced tea." },

  // TANDOORI STARTERS
  { name:"Soya Chap Tandoori", category:"Tandoori Starters", price:"380", description:"Tandoori soya chaap." },
  { name:"Hara Bhara Kabab", category:"Tandoori Starters", price:"300", description:"Green vegetable kabab." },
  { name:"Paneer Tikka Dry", category:"Tandoori Starters", price:"340", description:"Classic paneer tikka." },
  { name:"Paneer Malai Tikka", category:"Tandoori Starters", price:"340", description:"Creamy malai paneer tikka." },
  { name:"Paneer Hariyali Tikka", category:"Tandoori Starters", price:"340", description:"Green masala paneer tikka." },
  { name:"Paneer Achari Tikka", category:"Tandoori Starters", price:"340", description:"Pickle-flavored paneer tikka." },
  { name:"Paneer Golden Pallet", category:"Tandoori Starters", price:"290", description:"Golden grilled paneer." },
  { name:"Veg Seekh Kabab", category:"Tandoori Starters", price:"300", description:"Veg seekh kabab." },
  { name:"Corn Tikka", category:"Tandoori Starters", price:"290", description:"Corn tikka." },
  { name:"Pudina Tikka Dry", category:"Tandoori Starters", price:"300", description:"Mint-flavoured tikka." },

  // PIZZA
  { name:"Cheese Pizza", category:"Pizza", price:"150", description:"Classic cheese pizza." },
  { name:"Double Cheese Pizza", category:"Pizza", price:"180", description:"Double cheese-loaded pizza." },
  { name:"Italian Pizza", category:"Pizza", price:"180", description:"Italian-style pizza." },
  { name:"Pineapple Cheese Pizza", category:"Pizza", price:"180", description:"Pineapple cheese topping." },
  { name:"Velvet 24 Special Pizza", category:"Pizza", price:"350", description:"Special topped pizza." },
  { name:"Margherita Classic", category:"Pizza", price:"150", description:"Classic margherita pizza." },

  // SALAD
  { name:"Green Salad", category:"Salad", price:"150", description:"Fresh green salad." },
  { name:"Tomato Salad", category:"Salad", price:"120", description:"Tomato cuts with herbs." },
  { name:"Cucumber Salad", category:"Salad", price:"140", description:"Cucumber salad." },
  { name:"Taco Bean Salad", category:"Salad", price:"150", description:"Mexican-style bean salad." },
  { name:"Italian Salad", category:"Salad", price:"190", description:"Cream salad with dressing." },
  { name:"Russian Salad", category:"Salad", price:"200", description:"Classic Russian mayo salad." },
  { name:"Choice of Raita", category:"Salad", price:"150", description:"Pineapple, boondi or veg raita." },

  // DRINKS / BUTTERMILK
  { name:"Buttermilk", category:"Drinks", price:"60", description:"Refreshing buttermilk." },
  { name:"Masala Buttermilk", category:"Drinks", price:"60", description:"Masala chaas." },
  { name:"Sweet Lassi", category:"Drinks", price:"160", description:"Sweet Punjabi lassi." },
  { name:"Salted Lassi", category:"Drinks", price:"160", description:"Salted lassi." },
  { name:"Dry Fruit Lassi", category:"Drinks", price:"180", description:"Lassi with dry fruits." },
  { name:"Sparkling Water", category:"Drinks", price:"100", description:"Sparkling mineral water." },
  { name:"Soft Drink", category:"Drinks", price:"75", description:"Cold drink." },
  { name:"Energetic Drink", category:"Drinks", price:"MRP", description:"Energy drink." },

  // CHINESE STARTERS
  { name:"Paneer Chilli Dry", category:"Chinese Starters", price:"290", description:"Paneer chilli dry." },
  { name:"Paneer Honey Chilli", category:"Chinese Starters", price:"340", description:"Paneer honey chilli." },
  { name:"Mushroom Chilli Dry", category:"Chinese Starters", price:"290", description:"Mushroom chilli dry." },
  { name:"Veg Crispy", category:"Chinese Starters", price:"200", description:"Crispy fried veggies." },
  { name:"Veg Lollipop", category:"Chinese Starters", price:"200", description:"Veg lollipop sticks." },
  { name:"Potato Chilly", category:"Chinese Starters", price:"200", description:"Chilli flavoured potatoes." },
  { name:"Veg Spring Roll", category:"Chinese Starters", price:"200", description:"Vegetable spring rolls." },
  { name:"Veg Manchurian Dry", category:"Chinese Starters", price:"250", description:"Dry manchurian balls." },
  { name:"Soya Chap Chilly", category:"Chinese Starters", price:"300", description:"Chilli soya chaap." },
  { name:"Paneer 65", category:"Chinese Starters", price:"300", description:"Paneer 65." },

  // INTERNATIONAL STARTERS
  { name:"Italian Sesame Roll", category:"International Starters", price:"250", description:"Bread roll stuffed with cheese." },
  { name:"Nachos Mexican", category:"International Starters", price:"290", description:"Nachos loaded with beans & salsa." },
  { name:"Loaded Nachos", category:"International Starters", price:"320", description:"Loaded nachos platter." },
  { name:"Cheese Nachos", category:"International Starters", price:"260", description:"Nachos with cheese sauce." },
  { name:"Garlic Bread", category:"International Starters", price:"180", description:"Cheesy garlic bread." },
  { name:"Broccoli Shutter", category:"International Starters", price:"300", description:"Broccoli starter." },
  { name:"Calzone Bombs", category:"International Starters", price:"310", description:"Calzone stuffed bombs." },
  { name:"Jalapeno Cheese Roll", category:"International Starters", price:"340", description:"Cheese-filled jalapeno rolls." },
  { name:"Thai Spring Roll", category:"International Starters", price:"280", description:"Thai-style rolls." },
  { name:"Corn Tikki", category:"International Starters", price:"250", description:"Corn tikki patties." },
  { name:"Mexicorn Tikki", category:"International Starters", price:"350", description:"Mexican-style corn tikki." },

  // GLOBAL CUISINE
  { name:"Mexican Burrito Wrap", category:"Global Cuisine", price:"450", description:"Mexican burrito wrap." },
  { name:"Mexican Hot Pot", category:"Global Cuisine", price:"400", description:"Mexican rice pot dish." },
  { name:"Thai Curry", category:"Global Cuisine", price:"400", description:"Thai curry (red/green/yellow)." },
  { name:"Baked Macaroni", category:"Global Cuisine", price:"350", description:"Oven baked macaroni." },
  { name:"Baked Macaroni With Pineapple", category:"Global Cuisine", price:"440", description:"Macaroni with pineapple." },
  { name:"Baked Spaghetti With Pineapple", category:"Global Cuisine", price:"440", description:"Baked spaghetti & pineapple." },
  { name:"Veg Lasagna", category:"Global Cuisine", price:"440", description:"Vegetarian lasagna." },
  { name:"Vegetable Fry Rice", category:"Global Cuisine", price:"240", description:"Vegetable fried rice." },
  { name:"Hakka Noodles", category:"Global Cuisine", price:"240", description:"Hakka-style noodles." },
  { name:"Chilly Garlic Noodles", category:"Global Cuisine", price:"240", description:"Chilly garlic noodles." },
  { name:"Schezwan Noodles", category:"Global Cuisine", price:"250", description:"Schezwan-style noodles." },
  { name:"Pan Fried Noodles", category:"Global Cuisine", price:"290", description:"Pan-fried noodles." },
  { name:"Veg Manchurian Gravy", category:"Global Cuisine", price:"250", description:"Veg manchurian gravy." },
  { name:"Paneer Chilli Gravy", category:"Global Cuisine", price:"300", description:"Paneer chilli gravy." },
  { name:"Chinese Combo", category:"Global Cuisine", price:"420", description:"Chinese variety combo." },
  { name:"Mexican Trio", category:"Global Cuisine", price:"420", description:"Mexican combo trio." },
  { name:"Veg Stroganoff", category:"Global Cuisine", price:"450", description:"Creamy veg stroganoff." },

  // INDIAN CUISINE
  { name:"Special Velvet 24 Veg", category:"Indian Cuisine", price:"390", description:"Signature Velvet 24 veg." },
  { name:"Sabji Khada Masala", category:"Indian Cuisine", price:"350", description:"Khada masala sabji." },
  { name:"Baby Veg Peshwari", category:"Indian Cuisine", price:"350", description:"Peshwari style veg sabji." },
  { name:"Sabji Navratam Korma", category:"Indian Cuisine", price:"400", description:"Navratna korma curry." },
  { name:"Sabji Deewani Handi", category:"Indian Cuisine", price:"350", description:"Deewani handi curry." },
  { name:"Sabji Jaffrezi", category:"Indian Cuisine", price:"380", description:"Veg jaffrezi." },
  { name:"Sabji Najakat", category:"Indian Cuisine", price:"400", description:"Najakat sabji." },
  { name:"Sabji Liffa Korma", category:"Indian Cuisine", price:"380", description:"Liffa korma sabji." },
  { name:"Sabji Kadahi", category:"Indian Cuisine", price:"300", description:"Veg kadai." },
  { name:"Sabji Kolhapuri", category:"Indian Cuisine", price:"400", description:"Kolhapuri spicy sabji." },
  { name:"Sabji Makhmaliwala", category:"Indian Cuisine", price:"380", description:"Makhmali sabji." },
  { name:"Sabji Angara", category:"Indian Cuisine", price:"350", description:"Angara gravy." },
  { name:"Sabji Tava", category:"Indian Cuisine", price:"300", description:"Tava cooked sabji." },
  { name:"Sabji Balti", category:"Indian Cuisine", price:"380", description:"Balti sabji." },
  { name:"Sabji Handi", category:"Indian Cuisine", price:"380", description:"Handi cooked sabji." },
  { name:"Palak Corn Capsicum Masala", category:"Indian Cuisine", price:"300", description:"Palak corn & capsicum masala." },
  { name:"Dami Aloo", category:"Indian Cuisine", price:"300", description:"Dum cooked aloo sabji." },
  { name:"Sabji Navratan Korma", category:"Indian Cuisine", price:"300", description:"Navratan korma curry." },
  { name:"Mix Vegetable", category:"Indian Cuisine", price:"280", description:"Mix veg sabji." },
  { name:"Chana Masala", category:"Indian Cuisine", price:"280", description:"Chana masala." },
  { name:"Bhindi Masala", category:"Indian Cuisine", price:"300", description:"Bhindi masala." },
  { name:"Baingan Bharta", category:"Indian Cuisine", price:"280", description:"Smoked baingan bharta." },
  { name:"Jeera Aloo", category:"Indian Cuisine", price:"270", description:"Jeera aloo." },

  // SIZZLERS
  { name:"Italian Sizzler", category:"Sizzler", price:"550", description:"Italian vegetable sizzler." },
  { name:"China Town Sizzler", category:"Sizzler", price:"450", description:"Chinese-style sizzler." },
  { name:"Vegetable Sizzler", category:"Sizzler", price:"480", description:"Vegetable sizzler platter." },
  { name:"Thai Sizzler", category:"Sizzler", price:"550", description:"Thai flavoured sizzler." },
  { name:"Mexican Sizzler", category:"Sizzler", price:"550", description:"Mexican-style sizzler." },
  { name:"Veg Ala-Kiev Sizzler", category:"Sizzler", price:"500", description:"Veg ala kiev sizzler." },

  // PASTA
  { name:"Arrabiata Pasta", category:"Pasta", price:"300", description:"Italian tomato sauce pasta." },
  { name:"Pesto Pasta", category:"Pasta", price:"450", description:"Basil pesto pasta." },
  { name:"Cheese Cream Pasta", category:"Pasta", price:"350", description:"Cream cheese pasta." },
  { name:"Aglio - Olio", category:"Pasta", price:"300", description:"Garlic olive oil pasta." },
  { name:"Pink Penne", category:"Pasta", price:"350", description:"Pink sauce penne pasta." },

  // INDIAN SPECIAL
  { name:"Kaju Curry", category:"Indian Special", price:"450", description:"Cashew curry." },
  { name:"Kaju Butter Masala", category:"Indian Special", price:"450", description:"Cashew butter gravy." },
  { name:"Khaoya Kaju", category:"Indian Special", price:"450", description:"Khoya cashew curry." },
  { name:"Malai Kofta", category:"Indian Special", price:"380", description:"Cream stuffed kofta." },
  { name:"Kaju Kofta", category:"Indian Special", price:"390", description:"Kaju kofta gravy." },
  { name:"Cheese Kofta", category:"Indian Special", price:"400", description:"Cheese stuffed kofta." },
  { name:"Nargish Kofta", category:"Indian Special", price:"400", description:"Nargisi kofta gravy." },
  { name:"Paneer Kofta", category:"Indian Special", price:"400", description:"Paneer kofta gravy." },
  { name:"Veg Kofta", category:"Indian Special", price:"300", description:"Vegetable kofta curry." },
  { name:"Cheese Butter Masala", category:"Indian Special", price:"400", description:"Cheesy butter masala." },

  // DAL
  { name:"Dal Fry", category:"Dal", price:"190", description:"Classic dal fry." },
  { name:"Dal Fry Butter", category:"Dal", price:"200", description:"Butter dal fry." },
  { name:"Dal Tadka", category:"Dal", price:"250", description:"Traditional dal tadka." },
  { name:"Dal Makhani", category:"Dal", price:"300", description:"Black dal makhani." },

  // RICE
  { name:"Steam Rice", category:"Rice", price:"150", description:"Steamed rice." },
  { name:"Jeera Rice", category:"Rice", price:"180", description:"Jeera flavoured rice." },
  { name:"Veg Pulav", category:"Rice", price:"200", description:"Vegetable pulao." },
  { name:"Kaju Pulav", category:"Rice", price:"230", description:"Cashew pulao." },
  { name:"Zafrani Pulav", category:"Rice", price:"230", description:"Saffron pulao." },
  { name:"Kashmiri Pulav", category:"Rice", price:"230", description:"Kashmiri style pulao." },
  { name:"Veg Biryani", category:"Rice", price:"300", description:"Vegetable biryani." },
  { name:"Hyderabadi Biryani", category:"Rice", price:"300", description:"Hyderabadi style biryani." },
  { name:"Handi Dum Biryani", category:"Rice", price:"300", description:"Dum cooked biryani." },

  // SPECIAL PANEER
  { name:"Special Velvet 24 Paneer", category:"Paneer Special", price:"450", description:"Velvet signature paneer." },
  { name:"Special Lal Patidar Ki Mehfil", category:"Paneer Special", price:"499", description:"Special Patidar paneer dish." },
  { name:"Paneer Angara", category:"Paneer Special", price:"440", description:"Paneer angara spicy." },
  { name:"Paneer Bhurji", category:"Paneer Special", price:"400", description:"Paneer bhurji curry." },
  { name:"Paneer Kadai", category:"Paneer Special", price:"400", description:"Kadai paneer." },
  { name:"Paneer Handi", category:"Paneer Special", price:"400", description:"Handi paneer." },
  { name:"Paneer Tawa", category:"Paneer Special", price:"400", description:"Tawa cooked paneer." },
  { name:"Paneer Patyala", category:"Paneer Special", price:"400", description:"Patiala style paneer." },
  { name:"Paneer Butter Masala", category:"Paneer Special", price:"400", description:"Butter masala paneer." },
  { name:"Paneer Tikka Masala", category:"Paneer Special", price:"400", description:"Paneer tikka masala." },
  { name:"Paneer Balti", category:"Paneer Special", price:"400", description:"Balti paneer." },
  { name:"Paneer Lababdar", category:"Paneer Special", price:"400", description:"Paneer lababdar." },
  { name:"Paneer Lasanya", category:"Paneer Special", price:"400", description:"Lasanya paneer." },
  { name:"Paneer Kurccham", category:"Paneer Special", price:"400", description:"Kurccham paneer." },
  { name:"Paneer Roltini", category:"Paneer Special", price:"400", description:"Paneer roltini." },
  { name:"Mutter Paneer", category:"Paneer Special", price:"380", description:"Peas paneer." },
  { name:"Palak Paneer", category:"Paneer Special", price:"300", description:"Spinach paneer." },
  { name:"Soya Chap Masala", category:"Paneer Special", price:"450", description:"Soya chaap masala." },

  // TANDOOR
  { name:"Tandoori Roti", category:"Tandoor", price:"50", description:"Tandoori roti." },
  { name:"Butter Roti", category:"Tandoor", price:"60", description:"Butter roti." },
  { name:"Plain Paratha", category:"Tandoor", price:"70", description:"Plain paratha." },
  { name:"Butter Paratha", category:"Tandoor", price:"80", description:"Butter paratha." },
  { name:"Cheese Paratha", category:"Tandoor", price:"110", description:"Cheese stuffed paratha." },
  { name:"Stuffed Paratha", category:"Tandoor", price:"110", description:"Stuffed paratha." },
  { name:"Onion Paratha", category:"Tandoor", price:"110", description:"Onion paratha." },
  { name:"Plain Kulcha", category:"Tandoor", price:"80", description:"Plain kulcha." },
  { name:"Butter Kulcha", category:"Tandoor", price:"90", description:"Butter kulcha." },
  { name:"Stuffed Kulcha", category:"Tandoor", price:"100", description:"Stuffed kulcha." },
  { name:"Cheese Kulcha", category:"Tandoor", price:"110", description:"Cheese kulcha." },
  { name:"Garlic Kulcha", category:"Tandoor", price:"110", description:"Garlic kulcha." },
  { name:"Plain Naan", category:"Tandoor", price:"90", description:"Plain naan." },
  { name:"Butter Naan", category:"Tandoor", price:"110", description:"Butter naan." },
  { name:"Stuffed Naan", category:"Tandoor", price:"130", description:"Stuffed naan." },
  { name:"Paneer Naan", category:"Tandoor", price:"180", description:"Paneer stuffed naan." },
  { name:"Cheese Chilly Garlic Naan", category:"Tandoor", price:"180", description:"Cheese chilli garlic naan." },
  { name:"Kashmiri Naan", category:"Tandoor", price:"200", description:"Sweet kashmiri naan." },
  { name:"Amritsari Naan", category:"Tandoor", price:"200", description:"Amritsari naan." },
  { name:"Tandoori Basket", category:"Tandoor", price:"300", description:"Assorted tandoori breads." },
  { name:"Tawa Roti/Butter", category:"Tandoor", price:"30/40", description:"Tawa roti / butter roti." },

  // DESSERTS
  { name:"Hot Gulab Jamun (3pc)", category:"Dessert", price:"100", description:"Hot gulab jamun." },
  { name:"Kala Jam (3pc)", category:"Dessert", price:"100", description:"Kala jamun." },
  { name:"Hot Gulab Jamun With Ice Cream", category:"Dessert", price:"200", description:"Gulab jamun with ice cream." },

  // ICE CREAM
  { name:"Vanilla Ice Cream", category:"Ice Cream", price:"80/140", description:"Vanilla scoop/slice." },
  { name:"Falooda Ice Cream", category:"Ice Cream", price:"150", description:"Falooda ice cream." },
  { name:"Strawberry Ice Cream", category:"Ice Cream", price:"120", description:"Strawberry ice cream." },
  { name:"Orange Ice Cream", category:"Ice Cream", price:"120", description:"Orange ice cream." },
  { name:"Butterscotch", category:"Ice Cream", price:"150", description:"Butterscotch ice cream." },
  { name:"Kesar Pista", category:"Ice Cream", price:"160", description:"Kesar pista ice cream." },
  { name:"Rajbhog", category:"Ice Cream", price:"160", description:"Rajbhog ice cream." },
  { name:"American Dry Fruit", category:"Ice Cream", price:"200", description:"Dry fruit ice cream." },
  { name:"Brownie With Ice Cream", category:"Ice Cream", price:"200", description:"Brownie & ice cream." }
];

// add ids
menuData.forEach((it, i) => it.id = 'm' + (i+1));

/* ---------- Helpers ---------- */
function isValidLink(url) {
  return typeof url === "string" && url.trim() !== "" && !url.includes("REPLACE_WITH");
}
function openLink(url) {
  if (!isValidLink(url)) { alert("Link not configured."); return; }
  window.open(url, "_blank");
}

/* ---------- Render menu ---------- */
function renderMenu(items) {
  const container = document.getElementById("menuList");
  if (!container) return;
  container.innerHTML = "";

  const order = [];
  const categories = {};
  items.forEach(it => {
    if (!categories[it.category]) {
      categories[it.category] = [];
      order.push(it.category);
    }
    categories[it.category].push(it);
  });

  order.forEach(cat => {
    const catDiv = document.createElement("div");
    catDiv.className = "menu-category";
    catDiv.innerHTML = `<h3>${cat}</h3>`;
    categories[cat].forEach(it => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "menu-item";
      itemDiv.innerHTML = `
        <div class="mi-left">
          <h4>${it.name} <span class="price">— ₹${it.price}</span></h4>
          <p class="desc">${it.description.length > 140 ? it.description.slice(0, 140) + '...' : it.description}</p>
        </div>
        <div class="mi-right">
          <button class="view-item-btn" data-id="${it.id}">View</button>
        </div>
      `;
      catDiv.appendChild(itemDiv);
    });
    container.appendChild(catDiv);
  });

  initViewButtons();
}

/* ---------- Search & Filter ---------- */
function initMenuSearch() {
  const search = document.getElementById("menuSearch");
  const filter = document.getElementById("categoryFilter");
  if (!search || !filter) return;

  filter.innerHTML = '<option value="">All categories</option>';
  const cats = Array.from(new Set(menuData.map(i => i.category)));
  cats.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    filter.appendChild(opt);
  });

  function doFilter() {
    const q = (search.value || "").trim().toLowerCase();
    const cat = filter.value;
    const filtered = menuData.filter(it => {
      const inCat = !cat || it.category === cat;
      const combined = (it.name + " " + it.description + " " + it.category).toLowerCase();
      const inQuery = q === "" || combined.includes(q);
      return inCat && inQuery;
    });
    renderMenu(filtered);
  }

  search.addEventListener("input", doFilter);
  filter.addEventListener("change", doFilter);
  doFilter();
}

/* ---------- Item modal ---------- */
function initViewButtons() {
  document.querySelectorAll(".view-item-btn").forEach(btn => {
    btn.onclick = function() {
      const id = btn.getAttribute("data-id");
      const item = menuData.find(x => x.id === id);
      if (!item) return;
      let modalBg = document.getElementById("itemModalBg");
      let modal = document.getElementById("itemModal");
      let t = document.getElementById("modalTitle");
      let d = document.getElementById("modalDesc");
      let p = document.getElementById("modalPrice");
      let close = document.getElementById("modalClose");

      if (!modal) {
        // create simple modal if not present in HTML
        modalBg = document.createElement("div");
        modalBg.id = "itemModalBg";
        modalBg.className = "modal-bg";
        modal = document.createElement("div");
        modal.id = "itemModal";
        modal.className = "modal";
        modal.innerHTML = `
          <div class="modal-inner">
            <button id="modalClose" class="modal-close">Close</button>
            <h3 id="modalTitle"></h3>
            <p id="modalDesc"></p>
            <p id="modalPrice" style="font-weight:700;"></p>
          </div>
        `;
        document.body.appendChild(modalBg);
        document.body.appendChild(modal);
        t = document.getElementById("modalTitle");
        d = document.getElementById("modalDesc");
        p = document.getElementById("modalPrice");
        close = document.getElementById("modalClose");

        modalBg.addEventListener("click", () => {
          modal.classList.remove("active");
          modalBg.classList.remove("active");
        });
      }

      if (t) t.textContent = item.name;
      if (d) d.textContent = item.description;
      if (p) p.textContent = "Price: ₹" + item.price;
      if (modal && modalBg) {
        modal.classList.add("active");
        modalBg.classList.add("active");
      }
      if (close) close.onclick = () => { if (modal && modalBg) { modal.classList.remove("active"); modalBg.classList.remove("active"); } };
    };
  });
}

/* ---------- Order popup ---------- */
function initOrderingPopup() {
  const headerBtn = document.getElementById("orderHeaderBtn");
  const heroOrderBtn = document.getElementById("heroOrderBtn");
  const swiggyPopupBtn = document.getElementById("popupSwiggy");
  const zomatoPopupBtn = document.getElementById("popupZomato");
  const popupClose = document.getElementById("popupClose");
  const modal = document.getElementById("orderPopup");
  const modalBg = document.getElementById("popupBg");

  function openPopup() {
    if (modal && modalBg) {
      modal.classList.add("active"); modal.setAttribute("aria-hidden","false");
      modalBg.classList.add("active");
    } else {
      if (isValidLink(SWIGGY_LINK)) openLink(SWIGGY_LINK);
      else if (isValidLink(ZOMATO_LINK)) openLink(ZOMATO_LINK);
    }
  }
  function closePopup() { if (modal && modalBg) { modal.classList.remove("active"); modal.setAttribute("aria-hidden","true"); modalBg.classList.remove("active"); } }

  if (headerBtn) headerBtn.addEventListener("click", function(e){
    const href = headerBtn.getAttribute("href");
    const isReal = href && href.trim() !== "#" && !href.startsWith("javascript:");
    if (isReal && !(modal && modalBg && swiggyPopupBtn && zomatoPopupBtn)) return;
    e.preventDefault && e.preventDefault();
    openPopup();
  });
  if (heroOrderBtn) heroOrderBtn.addEventListener("click", function(e){ e.preventDefault && e.preventDefault(); openPopup(); });
  if (swiggyPopupBtn) swiggyPopupBtn.addEventListener("click", function(){ openLink(SWIGGY_LINK); closePopup(); });
  if (zomatoPopupBtn) zomatoPopupBtn.addEventListener("click", function(){ openLink(ZOMATO_LINK); closePopup(); });
  if (popupClose) popupClose.addEventListener("click", closePopup);
  if (modalBg) modalBg.addEventListener("click", closePopup);

  const swiggyBtn = document.getElementById("swiggyBtn");
  const zomatoBtn = document.getElementById("zomatoBtn");
  if (swiggyBtn) swiggyBtn.addEventListener("click", ()=>openLink(SWIGGY_LINK));
  if (zomatoBtn) zomatoBtn.addEventListener("click", ()=>openLink(ZOMATO_LINK));
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", function(){
  try {
    if (document.getElementById("menuList") && menuData.length > 0) {
      renderMenu(menuData);
      initMenuSearch();
    }
  } catch(e) { console.warn("menu init failed", e); }

  initOrderingPopup();

  document.addEventListener("keydown", function(e){ if (e.key === "Escape") {
    const modal = document.getElementById("itemModal");
    const modalBg = document.getElementById("itemModalBg");
    if (modal && modalBg) { modal.classList.remove("active"); modal.setAttribute("aria-hidden","true"); modalBg.classList.remove("active"); }
  }});
});
