<?
if(isset($_POST))
{
    /*
     * Author: Raine Padilla
     * Date: 4/30/18
     * Updated: 5/1/18
     * Team: Remote Workers
     */
    // Retrieve New Event
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
}
?>
<!--
Author: LEFT
Date: 4/25/2018
Updated: 4/27/2018
Team: Remote Workers
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add an Event</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
    <link rel="stylesheet" href="../styles/adminstyles.css" type="text/css">
</head>
<body>

<!-- Main Body Container -->
<div class="wrapper container-fluid">
    <!-- Navbar container -->
    <nav class="navbar navbar-expanded fixed-top aa-header-top">
        <div class="aa-header">
            <div class="page-title">
                <span>Aaron Aviles</span>
            </div>
        </div>
        <div class="aa-header-right">
            <div class="page-title">
                <span>Add an Event</span>
            </div>
            <ul class="nav navbar-nav float-right">
                <li class="nav-item dropdown">
                    <a class="nav-link icon-nav">
                        <img class="aa-button-icon" src="../octicons/svg/gear.svg">
                    </a>
                </li>
                <li class="nav-item dropdown"></li>
                <li class="nav-item dropdown"></li>
            </ul>
        </div>
    </nav>
    <!-- End Navbar container -->

    <!-- Main Content row-->
    <div class="row content mh-100">
        <!-- Sidebar column -->
        <div class="col-2">
            <div class="left-sidebar">
                <div class="left-sidebar-wrapper">
                    <ul class="nav flex-column">
                        <li class="nav-item" href="#"><a href="../view/admin.html"><span class="nav-icon"><img src="../octicons/svg/home.svg">Dashboard</span></a></li>
                        <li class="nav-item"><a href="AdminAdd.php"><span class="nav-icon"><img src="../octicons/svg/checklist.svg">Add an Event</span></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- End Sidebar Column -->

        <!-- Main Content Column -->
        <div class="col-10">
            <!-- Main Content Div -->
            <div class="main-content">

                <!-- Main Content First row-->
                <div class="row">

                    <!-- Empty column -->
                    <div class="col-3">
                        <!-- Empty for style -->
                    </div>

                    <!-- Content Column Div -->
                    <div class="col-6">
                            <!-- event card register -->
                            <div class="card card-outline-secondary mt-5">
                                <div class="card-header">
                                    <h3 class="mb-0">Add an Event</h3>
                                </div>
                                <div class="card-body">
                                    <form class="form" action="" method="post" role="form" autocomplete="off">
                                        <div class="form-group">
                                            <label for="eventName">Event Name</label>
                                            <input type="text" class="form-control" id="eventName" name="eventName">
                                        </div>
                                        <div class="form-group">
                                            <label for="eventContent">Event Content</label>
                                            <textarea class="form-control" id="eventContent" name="eventContent" rows="3"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="eventImage">Event Images</label>
                                            <input type="file" class="form-control-file" id="eventImage">
                                        </div>
                                        <div class="form-group">
                                            <label for="eventCategory">Event Category</label>
                                            <select class="form-control" id="eventCategory" name="eventCategory">
                                                <option selected>Entertainment</option>
                                                <option>Hospitality</option>
                                                <option>Travel</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="startDate">Event Date</label>
                                            <input type="date" class="form-control" id="startDate" name="startDate">
                                        </div>
                                        <div class="form-group">
                                            <label for="eventUrl">URL</label>
                                            <input type="text" class="form-control" id="eventUrl" name="eventUrl">
                                            <label for="urlCaption">Caption</label>
                                            <input type="text" class="form-control" id="urlCaption" name="urlCaption">
                                        </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success btn-lg float-right">Add Event</button>
                                        </div>
                                    </form>
                                </div>
                                <!-- /event card register -->
                            </div>
                        <!-- End Content Column -->

                        <p>
                            <?
                            if(isset($_POST)) echo $eventJSon;
                            ?>
                        </p>
                    </div>

                    <!-- Empty Style Column -->
                    <div class="col-3">
                        <!-- Empty for style purposes -->
                    </div>
            </div>
                <!-- End Main Content First Row -->
            </div>
            <!-- End Main Content Div -->
        </div>
        <!-- End Main Content Column -->
    </div>
    <!-- End Content Row -->
</div>
<!-- End Container Div -->

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>
</body>
</html>