function Property(number, street, city, state, zip){
  this.number = number;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.pLow;
  this.pEst;
  this.pHigh;
  this.pRange;
  this.rLow;
  this.rEst;
  this.rHigh;
  this.rRange;
}

// Getters and setters for Property objects
Property.prototype.setValues = function(pLow, pEst, pHigh, rLow, rEst, rHigh){
		this.pLow = pLow;
		this.pEst = pEst;
		this.pHigh = pHigh;
		this.pRange = pHigh - pLow;
		this.rLow = rLow;
		this.rEst = rEst;
		this.rHigh = rHigh;
		this.rRange = rHigh - rLow;
};

Property.prototype.getPriceRentRatio = function() {
  return this.pEst / this.rEst;
};

Property.prototype.getPriceRentRatioLow = function() {
	return this.pEst / this.rLow;
};

Property.prototype.getPriceRentRatioHigh = function() {
	return this.pEst / this.rHigh;
};

Property.prototype.getFullAddress = function() {
	var address = this.number + " " + this.street + ", " + this.city +
    " " + this.state + ", " + this.zip;
    return address;
};

Property.prototype.getNumber = function() {
	return this.number;
};

Property.prototype.getStreet = function() {
	return this.street;
};

Property.prototype.getCity = function() {
	return this.city;
};

Property.prototype.getState = function() {
	return this.state;
};

Property.prototype.getZip = function() {
	return this.zip;
};

Property.prototype.getPLow = function() {
	return this.pLow;
};

Property.prototype.getPEst = function() {
	return this.pEst;
};

Property.prototype.getPHigh = function() {
	return this.pHigh;
};

Property.prototype.getPRange = function() {
	return this.pRange;
};

Property.prototype.getRLow = function() {
	return this.rLow;
};

Property.prototype.getREst = function() {
	return this.rEst;
};

Property.prototype.getRHigh = function() {
	return this.rHigh;
};

Property.prototype.getRRange = function() {
	return this.rRange;
};

String.prototype.replaceAll = function(needle, replaceTo) {
 var str = this.replace(new RegExp(needle, 'g'), replaceTo);
  return str;
};

function getAPIcall(prop) {
  var address = prop.getNumber() + "+" + prop.getStreet();
  address = address.replaceAll(" ", "+");
  var zip = prop.getZip();
  var apiHeader = "http://www.zillow.com/webservice/GetSearchResults.htm?";
  var zwsID = "zws-id=X1-ZWz1b0j5f2l72j_9hc6e";
  var rentZestimate = "rentzestimate=true";
  return apiHeader + zwsID + "&address=" + address + "&citystatezip=" + zip + "&" + rentZestimate;
}

var prop1 = new Property(1118, "N Congress St", "Ypsilanti", "MI", 48197);
prop1.setValues(142000, 156000, 168000, 1100, 1300, 1500);

document.write("Rent ratio for " + prop1.getFullAddress() + ": " + prop1.getPriceRentRatio());
document.write("<br>");
document.write(getAPIcall(prop1));
window.location.href=getAPIcall(prop1);
