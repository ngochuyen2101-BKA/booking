<?php
require(__DIR__ .'/themes/flatsome/assets/tcpdf/tcpdf.php');
require_once("../wp-load.php");
define( 'HTML_EMAIL_HEADERS', array('Content-Type: text/html; charset=UTF-8\r\n'));

$headers = HTML_EMAIL_HEADERS;
$email = $_POST['email'];
$name_customer = $_POST['name_customer'];
$phone = $_POST['phone'];
$payment = $_POST['payment'];
$total = $_POST['total'];
$number_item = $_POST['number_item'];

$html = '<div class="title">
<h1 class=>Bamboo Sapa Hotel</h1>
<h2 class="thankyou">Đặt phòng của quý khách đã được xác nhận. Cảm ơn!</h2>
</div>
<div class="info-customer">
<h3>Thông tin đặt phòng</h3>
<div class="info">Họ tên KH:'.$name_customer.'</div>
<div class="info">Số điện thoại khách hàng: '.$phone.'</div>
<div class="info">Email KH: '.$email.'</div>
</div>';
$html .= '<div class="info-customer">';
for($i = 1; $i < $number_item; $i++) {
    if(isset($_POST['Childs'.$i])) {
        $html .= '<div class="info">Hạng phòng: '.$_POST['name'.$i].'</div>';
        $html .= '<div class="info">Giá: '.number_format($_POST['price'.$i]).'</div>';
        if($_POST['quantity'.$i]) {
            $html .= '<div class="info">Số lượng phòng: '.$_POST['quantity'.$i].'</div>';
        }
        if(isset($_POST['Adults'.$i])) {
            $html .= '<div class="info">Số lượng người lớn: '.$_POST['Adults'.$i].'</div>';
        }
        if(isset($_POST['Childs'.$i])) {
            $html .= '<div class="info">Số lượng trẻ em: '.$_POST['Childs'.$i].'</div>';
        }
        if(isset($_POST['Date_check_in'.$i])) {
            $html .= '<div class="info">Ngày nhận - trả phòng: '.$_POST['Date_check_in'.$i].' - '.$_POST['Date_check_out'.$i].'</div>';
        }
    } else {
        $html .= $_POST['name'.$i].' - '.number_format($_POST['price'.$i]);
    }
    
}
$html .= '</div>';
$payment_method = '';
if($payment == "bacs") {
    $payment_method = 'Chuyển khoản';
}
if($payment == "cod") {
    $payment_method = 'Trả tiền mặt';
}
if($payment == "vnpay") {
    $payment_method = 'VNPay';
}
if($payment == "momo") {
    $payment_method = 'Momo';
}

$html .= '<div class="info-customer">';
    $html .= '<div class="info">Phương thức thanh toán: '.$payment_method.'</div>';
    $html .= '<div class="info">Tổng tiền: '.$total.'</div>';
$html .= '</div>';

$date = date("d/m/Y");
$html .= '<div class="info-customer">
<h3>Thông tin liên hệ: Bamboo Sapa Hotel</h3>
<div class="info">Địa chỉ: Số 18, Đường Mường Hoa, Thị xã Sapa, Huyện Sapa, TỈnh Lào Cai</div>
<div class="info">Hotline: 091 5510689 - 0214 3871076</div>
<div class="info">Email: sales@bamboosapahotel.com</div>
<div class="info">Ngày xuất hóa đơn: '.$date.'</div>
</div>';

$content = $html;



$pdf = new TCPDF();
$pdf->AddPage();
$pdf->SetFont('freeserif','B',19);

$html ='';
$html = <<<EOF

<style>
.title {
    text-align:center;
}
.info-customer {
    border-bottom: 1px solid #000;
}
</style>

<div class="title">
    <h1 class=>Bamboo Sapa Hotel</h1>
    <h2 class="thankyou">Đặt phòng của quý khách đã được xác nhận. Cảm ơn!</h2>
</div>
<div class="info-customer">
    <h3>Thông tin đặt phòng</h3>
    <div class="info">Họ tên KH:{$name_customer}</div>
    <div class="info">Số điện thoại khách hàng: {$phone}</div>
    <div class="info">Email KH: {$email}</div>
</div>

EOF;
$html .= '<div class="info-customer">';
for($i = 1; $i < $number_item; $i++) {
    if(isset($_POST['Childs'.$i])) {
        $html .= '<div class="info">Hạng phòng: '.$_POST['name'.$i].'</div>';
        $html .= '<div class="info">Giá: '.number_format($_POST['price'.$i]).'</div>';
        if($_POST['quantity'.$i]) {
            $html .= '<div class="info">Số lượng phòng: '.$_POST['quantity'.$i].'</div>';
        }
        if(isset($_POST['Adults'.$i])) {
            $html .= '<div class="info">Số lượng người lớn: '.$_POST['Adults'.$i].'</div>';
        }
        if(isset($_POST['Childs'.$i])) {
            $html .= '<div class="info">Số lượng trẻ em: '.$_POST['Childs'.$i].'</div>';
        }
        if(isset($_POST['Date_check_in'.$i])) {
            $html .= '<div class="info">Ngày nhận - trả phòng: '.$_POST['Date_check_in'.$i].' - '.$_POST['Date_check_out'.$i].'</div>';
        }
    } else {
        $html .= $_POST['name'.$i].' - '.number_format($_POST['price'.$i]);
    }
    $html .= '<br>';
}
$html .= '</div>';

$payment_method = '';
if($payment == "bacs") {
    $payment_method = 'Chuyển khoản';
}
if($payment == "cod") {
    $payment_method = 'Trả tiền mặt';
}
if($payment == "vnpay") {
    $payment_method = 'VNPay';
}
if($payment == "momo") {
    $payment_method = 'Momo';
}

$html .= '<div class="info-customer">';
    $html .= '<div class="info">Phương thức thanh toán: '.$payment_method.'</div>';
    $html .= '<div class="info">Tổng tiền: '.$total.'</div>';
$html .= '</div>';

$date = date("d/m/Y");
$html .= <<<EOF

<div class="info-customer">
    <h3>Thông tin liên hệ: Bamboo Sapa Hotel</h3>
    <div class="info">Địa chỉ: Số 18, Đường Mường Hoa, Thị xã Sapa, Huyện Sapa, TỈnh Lào Cai</div>
    <div class="info">Hotline: 091 5510689 - 0214 3871076</div>
    <div class="info">Email: sales@bamboosapahotel.com</div>
    <div class="info">Ngày xuất hóa đơn: {$date}</div>
</div>

EOF;
$pdf->writeHTML($html, true, false, true, false, '');
$fileName = 'hoa-don-'.$phone.'-'.time().'.pdf';
ob_clean();
$pdf->Output($_SERVER['DOCUMENT_ROOT'].'/pdf/'.$fileName, 'FD');
$attachments = array($_SERVER['DOCUMENT_ROOT'].'/pdf/'.$fileName);
wp_mail( $email, 'Booking successfully', $content, $headers, $attachments);
?>