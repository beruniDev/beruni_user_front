to search by country I have used paramentr - inventory_number,

all book objects, that is required for book submission and giving the initial value is located in /utils/helpers.ts
to add nre element add item to the tableArr(in the pages/EditAddBook) and bookValues, the value of them should be the same, in bookvalues shown like a inventory*number: "1_1",in tableArr it is like a {
name: "Country",
id: 1, // parent id
child: [
{ name: "Country", id: 1 },
{ name: "Establishment/Institution", id: 2 },
{ name: "Collection, code", id: 3 },
],
}, so first id is parend id, ids in the child array are ids that will be located like a 1_1, 1_2, first digit(numbers before *) is parent id, second(numbers after \_) is child id

api based hooks are located in hooks directory, POST/PUT requests in the mutation folder
