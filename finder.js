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

function getInput() {
  var number = document.getElementById("number").value;
  var street = document.getElementById("street").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var zip = document.getElementById("zip").value;
  document.getElementById("output").innerHTML =
    (number + " " + street + " " + city + " " + state + " " + zip);
  var newProp = new Property(parseInt(number), street, city, state, parseInt(zip));
  return newProp;
}

$.ajax({
    type: "GET",
    url: "http://www.w3schools.com/ajax/cd_catalog.xml",
    dataType: "xml",
    success: function (xml) {

        // Parse the xml file and get data
        var xmlDoc = $.parseXML(xml),
            $xml = $(xmlDoc);
        $xml.find('address[name="My t"] logo').each(function () {
            $("#results").append($(this).text() + "<br />");
        });
    }
});

function search(){

  // Get use input from HTML page
  var prop = getInput();

  // Generate the API call
  var call = getAPIcall(prop);
  document.getElementById("APIoutput").innerHTML = call;

  // Open the XML file
  loadXMLDoc(call);
}

function loadXMLDoc(url)
{
var xmlhttp;
var txt,x,xx,i;

xmlhttp=new XMLHttpRequest();

xmlhttp.onreadystatechange=function()
  {
    document.getElementById("output").innerHTML = xmlhttp.readyState;
    document.getElementById("APIoutput").innerHTML = xmlhttp.status;
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    txt="<table border='1'><tr><th>Title</th><th>Artist</th></tr>";
    x=xmlhttp.responseXML.documentElement.getElementsByTagName("CD");
    for (i=0;i<x.length;i++)
      {
      txt=txt + "<tr>";
      xx=x[i].getElementsByTagName("TITLE");
        {
        try
          {
          txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
          }
        catch (er)
          {
          txt=txt + "<td> </td>";
          }
        }
      xx=x[i].getElementsByTagName("ARTIST");
        {
        try
          {
          txt=txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
          }
        catch (er)
          {
          txt=txt + "<td> </td>";
          }
        }
      txt=txt + "</tr>";
      }
    txt=txt + "</table>";
    //document.getElementById('results').innerHTML=txt;
    document.getElementById("APIoutput").innerHTML = "running function";
    }
  }
xmlhttp.open("GET",url,true);
xmlhttp.send();
}

function loadXMLDoc_foad(url) {
  var xmlhttp;
  var txt, x, xx, i;
  xmlhttp=new XMLHttpRequest();

  xmlhttp.onreadystatechange=function() {

    document.getElementById('results').innerHTML="Executing request";

    // Check ready state
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById('results').innerHTML="State is ok";

      // Create table text
      txt = "<table border='1'><tr><th>Address</th><th>Price</th></tr>";

      // Get all address elements
      x = xmlhttp.responseXML.documentElement.getElementsByTagName("address");

      // Iterate for each address
      for (i=0; i < x.length; i++) {

        txt = txt + "<tr>";

        xx = x[i].getElementsByTagName("street");
        {
          try {
            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
          }
          catch (er) {
            txt = txt + "<td> </td>";
          }
        }

        xx = x[i].getElementsByTagName("city");
        {
          try {
            txt = txt + "<td>" + xx[0].firstChild.nodeValue + "</td>";
          }
          catch (er) {
            txt = txt + "<td> </td>";
          }
        }
        txt = txt + "</tr>";

      }

      txt = txt + "</table>";
      document.getElementById('results').innerHTML="test";
    }
  }

  xmlhttp.open("GET",url,true);
  xmlhttp.send();
}
