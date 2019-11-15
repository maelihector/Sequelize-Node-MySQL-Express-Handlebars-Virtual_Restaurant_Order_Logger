


# Sequelized Virtual Restaurant Food Logger


## What is Sequelized Virtual Restaurant Food Logger?

[Sequelized Virtual Restaurant Order Logger](https://sequelized-virtual-restaurant.herokuapp.com/) app is...you guessed it, a **[Sequelize](https://sequelize.org/master/)** version of the [Homemade ORM Virtual Restaurant Order Logger](https://github.com/maelihector/Node-MySQL-Express-Handlebars-homemadeORM-App-A_Virtual_Restaurant_Order_Logger) app.

## What does Sequelized Virtual Restaurant Food Logger do?

The app is essentially a virtual restaurant where users can order any food imaginable, and sit at a one for four tables by themselves or with friends to *eat* the food.

The app keeps track of where each customer is sitting, what they have ordered, if the food has been eaten, and whether each order has been paid for.

Customers can also leave their table when all of their orders have been paid for, and are placed on the restaurant's Previous Guests list.


## How does Sequelized Virtual Restaurant Food Logger work?


[Sequelized Virtual Restaurant Order Logger](https://sequelized-virtual-restaurant.herokuapp.com/) takes advantage of [Sequelize](https://sequelize.org/master/)'s many features, including eager loading and associations support, and has the following:


- The Table model has a One-To-Many association with the Customer model.


```

// In Customer Model
Customer.associate = function (models) {
  Customer.belongsTo(models.Table, {
    foreignKey: {
      allowNull: false
    }
  });
};

// In Table Model
Table.associate = function(models){
  Table.hasMany(models.Customer);
};

```

- The Customer model has a One-To-Many association with the Order model.

```

// In Order Model
Order.associate = function (models) {
  Order.belongsTo(models.Customer, {
    foreignKey: {
      allowNull: false
    }
  });
};

// In Customer Model
Customer.associate = function (models) {
  Customer.hasMany(models.Order);
};

```

With these associations, the app can basically get all of the restaurant's data in one api `GET` call.

But to do this, the api `GET` call must include all nested associations:

```

app.get("/api/tables", function (req, res) {
  db.Table.findAll({
    include: [{ all: true, nested: true }]
  })
});

```

Here is a simplified version of the response object from the api call above:

```
Tables: [
  { 0: {
    customers: [
      { 0: {
        orders: [
          {0:{order data}}
          { 1: {}},
          { 2: {}}
        ]
      }},
      { 1: {}},
      { 2: {}}
    ]
  }},
  { 1: {}},
  { 2: {}}
]

```

As seen above, the response object is an array of table objects, with each table object having an array of customer objects, and each of those customer objects having an array of order objects. This object is passed to [Handlebars](https://handlebarsjs.com/), which then renders the data to the DOM.

## How do I use Sequelized Virtual Restaurant Food Logger?

Sequelized Virtual Restaurant Order Logger is hosted on [Heroku](https://heroku.com). Go to [Sequelized Virtual Restaurant Order Logger](https://sequelized-virtual-restaurant.herokuapp.com/) to check it out.

## Technologies Used


HTML5


CSS3


JavaScript


[jQuery](https://jquery.com/)


[Handlebars](https://handlebarsjs.com/)


[Node.js](https://nodejs.org/en/)


[Express](https://expressjs.com/)


[MySQL](https://www.mysql.com/)


[Sequelize](https://sequelize.org/master/)


[Heroku](https://heroku.com)


## Credits

[Meyerweb](http://meyerweb.com/eric/tools/css/reset/) CSS reset

Photo by [Patrick Tomasso](https://unsplash.com/@impatrickt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/waiter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)


> Written with [StackEdit](https://stackedit.io/).