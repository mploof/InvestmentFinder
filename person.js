function Person(first, last) {
  this.first = first;
  this.last = last;
}

Person.prototype.fullName = function fullName() {
  return this.first + ' ' + this.last;
}

Person.prototype.fullNameReversed = function fullName() {
  return this.last+ ', ' + this.first;
}
var s = new Person("Simon", "Willison");

function getAPIcall(x) {
  return x;
}

document.write(getAPIcall("something"));
