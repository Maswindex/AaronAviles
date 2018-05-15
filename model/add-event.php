<?
    /*
     * Author: Raine Padilla
     * Date: 4/30/18
     * Updated: 5/14/18
     * Team: Remote Workers
     */
    // Retrieve New Event

    // Send to file upload
    include "model/file-upload.php";

    $event = array('Name' => $_POST['eventName'], 'Content' => $_POST['eventContent'],
        'Category' => $_POST['eventCategory']);

    // Pull the contents of the events.json file
    $file = file_get_contents("test_events.json");

    // Create a temporary array to hold all events
    $tempEvent = json_decode($file, true);
    print_r($tempEvent);

    // Add the new event to the events array
    $tempEvent[] = $event;
    print_r($tempEvent);
    // make sure the file is writable
    // if it is, write the temporary array back into the file.
    echo is_writable($file) ? file_put_contents("test_events.json", json_encode($tempEvent)) :
        "not writable";