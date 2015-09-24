<html>

  <head>
  </head>

  <body>
    <h1>Zillow Investment Finder</h1>
		<p>Here is some output</p>
    <?php
      $start = $_POST['start'];
      $stop = $_POST['stop'];
      $street = $_POST['street'];
      $street = str_replace(" ", "+", $street);
      $zip = $_POST['zip'];
      $bestRatio = 0;
      $bestHouse = NULL;
      $startTime = time();

      for($i = $start; $i <= $stop; $i += 2){
        $url = "http://www.zillow.com/webservice/GetSearchResults.htm?" .
          "zws-id=X1-ZWz1b0j5f2l72j_9hc6e&address=$i+$street&citystatezip=$zip&rentzestimate=true";
        $xml = simplexml_load_file($url);
        $code = $xml->message->code;

        // If the property doesn't exist, skip it
        if($code == 508 || $code == 507)
          continue;

        $house = $xml->response->results->result;
        $address = $house->address->street;
        $price = $house->zestimate->amount;
        $rent = $house->rentzestimate->amount;

        // If there's no estimated rent, skip it
        if($rent == 0)
          continue;

        $ratio = $price / $rent;

        /*
        echo("Address: $address");
        echo '<br />';
        echo("Estimated value: $price");
        echo '<br />';
        echo("Estimated rent: $rent");
        echo '<br />';
        echo("Investment Ratio: " . round($ratio, 2));
        echo '<br /> <br />';
        */

        //echo $url;
        //echo '<br /> <br />';

        if($bestRatio == 0 || $ratio < $bestRatio){
          $bestRatio = $ratio;
          $bestHouse = $house;
        }
      }

      $endTime = time();

      echo("Address: " . $bestHouse->address->street);
      echo '<br />';
      echo("Estimated value: " . $bestHouse->zestimate->amount);
      echo '<br />';
      echo("Estimated rent: " . $bestHouse->rentzestimate->amount);
      echo '<br />';
      echo("Investment Ratio: " . round($bestRatio, 2));
      echo '<br /> <br />';
      $count = ($stop - $start) / 2;
      echo("Properties searched: $count");
      echo '<br />';
      $totalTime = $endTime - $startTime;
      echo("Execution time: $totalTime");
      echo '<br />';
      $timePer = $totalTime / $count;
      echo("Time per search: " . round($timePer, 2));
      echo '<br /> <br />';
    ?>
  </body>

</html>
