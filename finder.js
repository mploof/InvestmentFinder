var API = {

    apiHeader: "http://www.zillow.com/webservice/GetSearchResults.htm?",
    zwsID: "zws-id=X1-ZWz1b0j5f2l72j_9hc6e",
    rentZestimate: "rentzestimate=true",

    getCall: function (address) {
		return this.apiHeader + this.zwsID + address + this.rentZestimate;
		//return call;

	}
};

function Property(number, street, city, state, zip){
  this.number = number;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;

  this.setValues = function(pLow, pEst, pHigh, rLow, rEst, rHigh){
		this.pLow = pLow;
		this.pEst = pEst;
		this.pHigh = pHigh;
		this.pRange = pHigh - pLow;
		this.rLow = rLow;
		this.rEst = rEst;
		this.rHigh = rHigh;
		this.rRange = rHigh - rLow;
	};

  this.getPriceRentRatio = function ( ) {
    return this.pEst / this.rEst;
  };

  this.getPriceRentRatioLow = function ( ) {
		return this.pEst / this.rLow;
	};

  this.getPriceRentRatioHigh = function ( ) {
		return this.pEst / this.rHigh;
	};

	this.getFullAddress = function ( ) {
		var address = this.number + " " + this.street + ", " + this.city +
      " " + this.state + ", " + this.zip;
      return address;
	};

	this.getNumber = function ( ) {
		return this.number;
	};

  this.getStreet = function ( ) {
		return this.street;
	};

	this.getCity = function ( ) {
		return this.city;
	};

	this.getState = function ( ) {
		return this.state;
	};

	this.getZip = function ( ) {
		return this.zip;
	};

	this.getPLow = function ( ) {
		return this.pLow;
	};

	this.getPEst = function ( ) {
		return this.pEst;
	};

	this.getPHigh = function ( ) {
		return this.pHigh;
	};

	this.getPRange = function ( ) {
		return this.pRange;
	};

	this.getRLow = function ( ) {
		return this.rLow;
	};
  
	this.getREst = function ( ) {
		return this.rEst;
	};

	this.getRHigh = function ( ) {
		return this.rHigh;
	};

	this.getRRange = function ( ) {
		return this.rRange;
	};
}

var prop1 = new Property(1118, "N Congress St", "Ypsilanti", "MI", 48197);
prop1.setValues(142000, 156000, 168000, 1100, 1300, 1500);

API.getCall();
document.write("Rent ratio for " + prop1.getFullAddress() + ": " + prop1.getPriceRentRatio());
document.write("<br>");
document.write(API.getCall(prop1.getFullAddress()));
