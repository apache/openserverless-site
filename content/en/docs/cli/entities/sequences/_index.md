---
title: Sequences
description: Combine actions in sequences
weight: 40
---
## Sequences

You can combine actions into sequences and invoke them as a single
action. Therefore, a sequence represents a logical junction between two
or more actions, where each action is invoked in a specific order.

### Combine actions sequentially

Suppose we want to describe an algorithm for preparing a pizza. We could
prepare everything in a single action, creating it all in one go, from
preparing the dough to adding all the ingredients and cooking it.

What if you would like to edit only a specific part of your algorithm,
like adding fresh tomato instead of classic, or reducing the amount of
water in your pizza dough? Every time, you have to edit your main action
to modify only a part.

Again, what if before returning a pizza you’d like to invoke a new
action like "add basil," or if you decide to refrigerate the pizza dough
after preparing it but before cooking it?

This is where sequences come into play.

Create a file called **preparePizzaDough.js**

```javascript
function main(args) {

  let persons = args.howManyPerson;

  let flour = persons * 180; // grams
  let water = persons * 120; // ml

  let yeast = (flour + water) * 0.02;

  let pizzaDough =
    "Mix " +
    flour +
    " grams of flour with " +
    water +
    " ml of water and add " +
    yeast +
    " grams of brewer's yeast";

  return {
    pizzaDough: pizzaDough,
    whichPizza: args.whichPizza,
  };
}
```

Now, in a file **cookPizza.js**

```javascript
function main(args) {

  let pizzaDough = args.pizzaDough;
  let whichPizza = args.whichPizza;

  let baseIngredients = "tomato and mozzarella";
  if (whichPizza === "Margherita") {
    return {
      result:
        "Cook " +
        pizzaDough +
        " topped with " +
        baseIngredients +
        " for 3 minutes at 380°C",
    };
  } else if (whichPizza === "Sausage") {
    baseIngredients += "plus sausage";
    return {
      result:
        "Cook " +
        pizzaDough +
        " topped with " +
        baseIngredients +
        ". Cook for 3 minutes at 380°C",
    };
  }
}
```

We have now split our code to prepare pizza into two different actions.
When we need to edit only one action without editing everything, we can
do it! Otherwise, we can now add new actions that can be invoked or not
before cooking pizza (or after).

Let’s try it.

### Testing the sequence

First, create our two actions

```bash
ops action create preparePizzaDough preparePizzaDough.js

ops action create cookPizza cookPizza.js
```

Now, we can create the sequence:

```bash
ops action create pizzaSequence --sequence preparePizzaDough,cookPizza
```

Finally, let’s invoke it

```bash
ops action invoke --result pizzaSequence -p howManyPerson 4 -p whichPizza "Margherita"

{
    "result": "Cook Mix 720 grams of flour with 480 ml of water and add 24 grams of brewer's yeast topped with tomato and mozzarella for 3 minutes at 380°C"
}
```

## Conclusion

Now, thanks to sequences, our code is split correctly, and we are able
to scale it more easily!
