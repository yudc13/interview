var counter = 3;
var user = {
  age: 20
}
function incCounter() {
  counter++;
}
function updateAge() {
  user.age += 1;
}
function print () {
  console.log(counter, user.age)
}
module.exports = {
  counter: counter,
  user: user,
  incCounter: incCounter,
  updateAge: updateAge,
  print
};