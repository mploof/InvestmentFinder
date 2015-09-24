<?php

  echo "\n";
  echo "Retrieving XML file...";
  echo "\n";
  echo "\n";

  $url = "http://www.zillow.com/webservice/GetSearchResults.htm?" .
    "zws-id=X1-ZWz1b0j5f2l72j_9hc6e&address=1118+N+Congress&citystatezip=48197&rentzestimate=true";
  $xml = simplexml_load_file($url);

  $house = $xml->response->results->result;
  $address = $house->address;
  $zestimate = $house->zestimate;
  print_r($address);
  echo "\n";
  print_r($zestimate);


  echo "\n";
  echo "\n";
  echo "This is a PHP test";
  echo "\n";
?>
