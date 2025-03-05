const mongoose = require("mongoose");
const Campground = require("../models/campground");

const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

//to check if there is any error while connecting
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "679f1606d21f24664023d6ef",
      location: `${cities[rand1000].city},${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: `https://picsum.photos/400?random=${Math.random()}`,
      geometry: {
        type: "Point",
        coordinates: [cities[rand1000].longitude, cities[rand1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dct5vgsit/image/upload/v1738565599/YelpCamp/o1gxnrctdqqrpcgji1qb.jpg",
          filename: "YelpCamp/o1gxnrctdqqrpcgji1qb",
        },
        {
          url: "https://res.cloudinary.com/dct5vgsit/image/upload/v1738565600/YelpCamp/wvhn2yzpt0cp6tk3utsk.jpg",
          filename: "YelpCamp/wvhn2yzpt0cp6tk3utsk",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
      price,
    });
    await camp.save();
  }
};

seedDB();
