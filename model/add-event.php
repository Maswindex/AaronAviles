<?
    /*
     * Author: Raine Padilla
     * Date: 4/30/18
     * Updated: 5/14/18
     * Team: Remote Workers
     */

    //Set Refresh header using PHP.
    header( "refresh:5;url=../admin" );

    // Send to file upload
    include "file-upload.php";

    // Retrieve new event
    $eventName = $_POST['eventName']; // text.headline
    $eventDescription = $_POST['eventContent']; // text.text
    $eventCategory = $_POST['eventCategory']; // append to text.text for now
    $eventUrl = $_POST['eventUrl']; // media.url
    $eventUrlCaption = $_POST['urlCaption']; // media.caption
    // Separate out month, day, year
    $eventDate = explode("-", $_POST['startDate']); // formatted YYYY/MM/DD
    $year = $eventDate[0]; // start_date.year
    $month = $eventDate[1]; // start_date.month
    $day = $eventDate[2]; // start_date.day


    $event = array();
    $event['text']['headline'] = $eventName;
    $event['text']['text'] = $eventDescription . " - " . $eventCategory;
    $event['media']['url'] = $eventUrl;
    $event['media']['caption'] = $eventUrlCaption;
    $event['start_date']['month'] = $month;
    $event['start_date']['day'] = $day;
    $event['start_date']['year'] = $year;


    // Pull the contents of the events.json file
    $file = file_get_contents("test_events.json");

    // Create a temporary array to hold all events
    $tempEvent = json_decode($file, true);

    // Add the new event to the events array
    $tempEvent[] = $event;
    // make sure the file is writable

    // if it is, write the temporary array back into the file.
    echo is_writable("test_events.json") ? file_put_contents("test_events.json",
                             json_encode($tempEvent)) : "Something went wrong!";