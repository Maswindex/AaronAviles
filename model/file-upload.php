<?php
/*
 * Author: Raine Padilla
 * Date: 5/9/18
 * Updated: 5/14/18
 * Team: Remote Workers
 */

    $target_dir = "images/";
    $target_file = $target_dir . basename($_FILES["eventImage"]["name"]);
    $uploadOk = 1;

    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    // Check if the image is real or fake
    if(isset($_POST["submit"]))
    {
        $check = getimagesize($_FILES["eventImage"]["tmp_name"]);
        if($check !== false)
        {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        }
        else
        {
            echo "File is not an image.";
            $uploadOk = 0;
        }

        // Check if file already exists
        if (file_exists($target_file))
        {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }

        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" )
        {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        // Check if there was an error
        if($uploadOk == 0)
        {
            echo "Sorry, your file was not uploaded.";
        }
        // If everything is okay, try to upload the file.
        else
        {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file))
            {
                echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
            }
            else
            {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    }