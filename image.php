<?php

function Log_A_Search($file,$Search){
	$line  = "\r\n";
	$now = new DateTime('NOW');
	$line .= $now->format('Y-m-d H:i:s.u')." UTC;";
	$line .= $_SERVER['HTTP_X_FORWARDED_FOR'].";";
	$line .= $Search."";
	file_put_contents($file,$line,FILE_APPEND);
}

$data = base64_decode($_GET['a']);
Log_A_Search("/var/www/html/Didactic/JeuxPhishing_Outlook/data.csv",$data);

// Image génération
header("Content-Type: image/png");
header('Cache-Control: max-age=1');
$im = @imagecreate(110, 20)
    or die("Cannot Initialize new GD image stream");
$background_color = imagecolorallocate($im, 0, 0, 0);
$text_color = imagecolorallocate($im, 233, 14, 91);
imagestring($im, 1, 5, 5,  "Participation valide", $text_color);
imagepng($im);
imagedestroy($im);

?>
