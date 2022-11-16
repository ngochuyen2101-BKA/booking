<?php
require(__DIR__ .'/themes/flatsome/assets/fpdf/fpdf.php');
define( 'HTML_EMAIL_HEADERS', array('Content-Type: text/html; charset=UTF-8\r\n'));

$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial','B',19);

$number_item = $_POST['number_item'];

for($i = 1; $i < $number_item; $i++) {
    $name = $_POST['name'.$i];
    $pdf->Cell(190,10,$name,1,1,'C');

    $quantity = $_POST['quantity'.$i];
    $pdf->Cell(50,10,'Quantity',1,0);
    $pdf->Cell(140,10,$quantity,1,1);

    $price = $_POST['price'.$i];
    $pdf->Cell(50,10,'Price',1,0);
    $pdf->Cell(140,10,$price,1,1);

    if(isset($_POST['custom_adult'.$i])) {
        $custom_adult = $_POST['custom_adult'.$i];
        $pdf->Cell(50,10,'Adults',1,0);
        $pdf->Cell(140,10,$custom_adult,1,1);
    }

    if(isset($_POST['custom_child'.$i])) {
        $custom_child = $_POST['custom_child'.$i];
        $pdf->Cell(50,10,'Childs',1,0);
        $pdf->Cell(140,10,$custom_child,1,1);
    }

    if(isset($_POST['custom_date_checkin'.$i])) {
        $custom_date_checkin = $_POST['custom_date_checkin'.$i];
        $pdf->Cell(50,10,'Check in',1,0);
        $pdf->Cell(140,10,$custom_date_checkin,1,1);
    }

    if(isset($_POST['custom_date_checkout'.$i])) {
        $custom_date_checkout = $_POST['custom_date_checkout'.$i];
        $pdf->Cell(50,10,'Check out',1,0);
        $pdf->Cell(140,10,$custom_date_checkout,1,1);
    }

}
$pdf->Output();

$headers = HTML_EMAIL_HEADERS;
$content = "Hello";
$email = $_POST['email'];
wp_mail( $email, 'Booking successfully', $content, $headers );