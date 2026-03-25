const menuItems = [{
    id: 1,
    name: "Greek Feta Bowl",
    shortDesc: "Classic salad with fresh greens, olives, and authentic feta cheese.",
    description: "A refreshing, high-protein bowl featuring crisp romaine lettuce, Kalamata olives, cherry tomatoes, cucumber, red onion, and creamy imported feta cheese, drizzled with a light lemon-oregano vinaigrette. Perfect for a light lunch or appetizer.",
    price: 250,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=400",
    category: "Salads"
},
{
    id: 2,
    name: "Strawberry Cashew Oatmeal",
    shortDesc: "Warm oatmeal topped with fresh berries, bananas, and crunchy cashews.",
    description: "A hearty and warm breakfast bowl made with steel-cut oats, simmered in almond milk, and topped with fresh strawberries, sliced bananas, and roasted cashews for a perfect nutritional start.",
    price: 280,
    image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?auto=format&fit=crop&q=80&w=400",
    category: "Breakfast"
},
{
    id: 3,
    name: "Steamed Veggie Trio",
    shortDesc: "Broccoli, carrots, and asparagus seasoned lightly with sea salt.",
    description: "A simple, perfect side dish: gently steamed broccoli, sweet carrots, and tender asparagus spears, finished with a hint of lemon zest and extra virgin olive oil.",
    price: 180,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400",
    category: "Sides"
},
{
    id: 4,
    name: "Spicy Salmon Poke Bowl",
    shortDesc: "Cubed salmon, sticky rice, avocado, and spicy mayo dressing.",
    description: "Our signature Poke Bowl features cubed, sustainably sourced salmon, seasoned sticky rice, fresh sliced avocado, edamame, shredded nori, and a light, creamy sriracha-mayo dressing.",
    price: 420,
    image: "https://images.unsplash.com/photo-1546069901-eacef0df6022?auto=format&fit=crop&q=80&w=400",
    category: "Bowls"
},
{
    id: 5,
    name: "Hearty Vegan Lentil Curry",
    shortDesc: "Protein-rich lentil and vegetable curry served with whole-grain rice.",
    description: "A fully plant-based, rich curry featuring red and green lentils, sweet potatoes, spinach, and a blend of aromatic Indian spices. Served with a portion of fluffy brown basmati rice.",
    price: 350,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400",
    category: "Vegan Specials"
},
{
    id: 6,
    name: "Tropical Fruit Platter",
    shortDesc: "A colorful mix of seasonal fresh fruits, naturally sweet and refreshing.",
    description: "A large platter featuring the freshest seasonal fruits, including mango, kiwi, pineapple, grapes, and berries. Perfect for sharing or as a light dessert.",
    price: 300,
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e6382b?auto=format&fit=crop&q=80&w=400",
    category: "Desserts"
},
{
    id: 7,
    name: "Grilled Chicken Pesto Pasta",
    shortDesc: "Whole-wheat pasta, grilled chicken, fresh basil pesto, and cherry tomatoes.",
    description: "Lean grilled chicken breast served over whole-wheat penne pasta, tossed in a vibrant homemade basil pesto sauce with sun-dried tomatoes.",
    price: 390,
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=400",
    category: "Main Courses"
},
{
    id: 8,
    name: "Quinoa Black Bean Burger",
    shortDesc: "Homemade patty on a whole-wheat bun with lettuce and a low-fat sauce.",
    description: "A satisfying vegetarian burger made from quinoa and black beans, served on a toasted whole-wheat bun with a slice of fresh tomato and our signature low-fat chipotle sauce.",
    price: 320,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400",
    category: "Vegan Specials"
},
{
    id: 9,
    name: "Immunity Booster Smoothie",
    shortDesc: "Blend of spinach, kale, ginger, and orange juice.",
    description: "A vibrant green smoothie packed with vitamins and antioxidants, featuring a blend of baby spinach, kale, fresh ginger, banana, and natural orange juice.",
    price: 220,
    image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?auto=format&fit=crop&q=80&w=400",
    category: "Drinks"
},
{
    id: 10,
    name: "Avocado Toast Deluxe",
    shortDesc: "Sourdough toast topped with smashed avocado, chili flakes, and egg.",
    description: "Thick slice of toasted sourdough bread generously topped with fresh smashed avocado, a sprinkle of red chili flakes, and a perfectly poached egg.",
    price: 270,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400",
    category: "Breakfast"
}
];

const initialChatHistory = [{
    role: "model",
    parts: [{
        text: "Hello! I'm your AI Food Assistant. Ask me anything about our menu, delivery, or service!"
    }]
},
{
    role: "model",
    parts: [{
        text: "We offer healthy options like the Spicy Salmon Poke Bowl and Hearty Vegan Lentil Curry. Feel free to add a few items to your cart to test the checkout process."
    }]
},
{
    role: "model",
    parts: [{
        text: "Delivery is fixed at ₹50. Standard ETA is 45 minutes. You can check your order history under the profile icon in the top right."
    }]
},
{
    role: "model",
    parts: [{
        text: "Try searching for 'Smoothie' or 'Oatmeal' using the search bar above the menu to filter the options quickly."
    }]
},
{
    role: "model",
    parts: [{
        text: "We accept all major credit cards, UPI, and Cash on Delivery. You can select your preferred method on the payment page."
    }]
},
{
    role: "model",
    parts: [{
        text: "Our menu features 10 delicious and health-focused items. Enjoy browsing our wide selection of Salads, Bowls, and Vegan Specials!"
    }]
}
];
