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
$order_id = $_POST['orderId'];
$logo = get_site_url()."/wp-content/uploads/2022/10/LOGO-BAMBOO-SAPA-01.png";
$date = date("d/m/Y");

$html = '<section class="title" style="text-align: center">
<h1 class=>Bamboo Sapa Hotel</h1>
<h2 class="thankyou">Đặt phòng của quý khách đã được xác nhận. Cảm ơn!</h2>
</div>
<div class="info-customer">
<h3>Thông tin đặt phòng</h3>
<div class="info">Họ tên KH:'.$name_customer.'</div>
<div class="info">Số điện thoại khách hàng: '.$phone.'</div>
<div class="info">Email KH: '.$email.'</div>
</section>';
$html .= '<section class="info-customer">';
for($i = 1; $i < $number_item; $i++) {
    if(isset($_POST['Childs'.$i])) {
        $nhanPhong = date_format(date_create($_POST['Date_check_in'.$i]),"d/m/Y");
        $traPhong = date_format(date_create($_POST['Date_check_out'.$i]),"d/m/Y");
        $html .= '<div class="info">Hạng phòng: '.$_POST['name'.$i].'</div>';
        $html .= '<div class="info">Giá: '.number_format($_POST['price'.$i]).' VNĐ</div>';
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
            $html .= '<div class="info">Ngày nhận - trả phòng: '.date_format(date_create($_POST['Date_check_in'.$i]),"d/m/Y").' - '.date_format(date_create($_POST['Date_check_out'.$i]),"d/m/Y").'</div>';
        }
    } else {
        $html .= $_POST['name'.$i].' - '.number_format($_POST['price'.$i]).'VNĐ';
    }
    
}
$html .= '</section>';
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

$html .= '<section class="info-customer">';
    $html .= '<div class="info">Phương thức thanh toán: '.$payment_method.'</div>';
    $html .= '<div class="info">Tổng tiền: '.$total.'</div>';
$html .= '</section>';

$date = date("d/m/Y");
$html .= '<section class="info-customer">
<h3>Thông tin liên hệ: Bamboo Sapa Hotel</h3>
<div class="info">Địa chỉ: Số 18, Đường Mường Hoa, Thị xã Sapa, Huyện Sapa, TỈnh Lào Cai</div>
<div class="info">Hotline: 091 5510689 - 0214 3871076</div>
<div class="info">Email: sales@bamboosapahotel.com</div>

</section>';

$content = $html;



$pdf = new TCPDF();
$pdf->SetPrintHeader(false);
$pdf->SetPrintFooter(false);
$pdf->AddPage();
$pdf->SetFont('freeserif','',19);

$html ='';
$html = <<<EOF

<style>
.title {
    text-align:center;
}
.info-customer {
    border-bottom: 1px solid #000;
}
.info-customer{
    margin-top: 0 !important;
}
.title h1{
    font-size: 18px;
}
.title h2{
    font-size: 16px;
}
h3, div{
    font-size: 12px
}
div{
    font-weight: 100 !important
}
</style>

<section class="title" style="text-align: center">
<img src="uploads/2022/12/header-pdf1.png" width="595" height="128" alt="logo img">
</section>
<section class="info-customer" style="">
<table cellspacing="0">
    <tr>
        <td style="font-size: 12px; line-height: 1; margin: 0; padding: 0">
            <h3 style="font-size: 14px; line-height: 1">Mã đặt phòng</h3>
        </td>
        <th rowspan="3" width="10%"></th>
        <td colspan="2" style="font-size: 12px; line-height: 1; margin: 0; padding: 0">
            <h3 style="font-size: 16px; line-height: 1">Bamboo Sapa Hotel</h3>
        </td>
    </tr>
    <tr>
        <td rowspan="2" style="font-size: 12px; line-height: 1; margin: 0; padding: 0">
            <h6 style="font-size: 18px">{$order_id}</h6>
            <h6 style="font-size: 12px; line-height: 1; margin-bottom: 20px; font-weight: 100">Đặt phòng và thanh toán bởi Bamboo Sapa Hotel</h6>
            <h6 style="font-size: 12px; line-height: 1; margin-bottom: 20px; font-weight: 100">Ngày xuất hóa đơn: {$date}</h6>
        </td>
        <td colspan="2" style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 60%">
            <h6 style="font-size: 12px; line-height: 1; margin: 0; padding: 0; font-weight: 100">Địa chỉ: Số 18, Đường Mường Hoa, Thị xã Sapa, Huyện Sapa, Tỉnh Lào Cai</h6>
            <h6 style="font-size: 12px; line-height: 1; margin: 0; padding: 0; font-weight: 100"><b>Điện thoại: </b>091 5510689 - 0214 3871076</h6><br>
        </td>
    </tr>
    <tr>
        <td style="padding: 0 15px !important; border-left: 2px solid black; line-height: 1; height: 40px">
            <span style="font-size: 12px; line-height: 1; margin: 0">Nhận phòng</span><br>
            <b style="font-size: 13px">{$nhanPhong}</b><br>
            <span style="font-size: 12px;">14:00</span>
        </td>
        <td style="padding: 0 15px !important; border-left: 2px solid black; line-height: 1; height: 40px">
            <span style="font-size: 12px; line-height: 1; margin: 0">Trả phòng</span><br>
            <b style="font-size: 13px">{$traPhong}</b><br>
            <span style="font-size: 12px;">12:00</span>
        </td>
    </tr>
</table>
    <h3 style="font-size: 14px; line-height: 1.2" >Thông tin khách hàng</h3>
    <h6 class="info" style="font-weight: 100; line-height: .8; font-size: 12px"><b style="line-height: 1.6; font-size: 12px">Họ tên KH: </b>{$name_customer}</h6>
    <h6 class="info"style="font-weight: 100; line-height: .8; font-size: 12px"><b style="line-height: 1.6; font-size: 12px">Số điện thoại KH:</b> {$phone}</h6>
    <h6 class="info" style="font-weight: 100; line-height: .8; font-size: 12px"><b style="line-height: 1.6; font-size: 12px">Email KH: </b> {$email}</h6>

    <h3 style="font-size: 14px;" >Thông tin đặt chỗ</h3>
</section>

EOF;
$html .= '<section class="info-customer">';
$html .= '<table style="width: 100%">';
$html .= '<tr>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 7%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">No.</span></th>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 30%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">Hạng phòng</span></th>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 15%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">Số lượng</span></th>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 15%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">Người lớn</span></th>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 13%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">Trẻ em</span></th>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 20%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">Giá</span></th>';
$html .= '</tr>';
for($i = 1; $i < $number_item; $i++) {
    
    if(isset($_POST['Childs'.$i])) {
        $html .= '<tr>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.$i.'</span></td>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.$_POST['name'.$i].'</span></td>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.$_POST['quantity'.$i].'</span></td>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.$_POST['Adults'.$i].'</span></td>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.$_POST['Childs'.$i].'</span></td>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.number_format($_POST['price'.$i]).' VNĐ</span></td>';
        $html .= '</tr>';
        
    }
}
$html .='</table>';
$html .= '<br>';

$html .='<h3 style="font-size: 14px;" >Dịch vụ bổ sung</h3>';
$html .= '<table style="width: 100%">';
$html .= '<tr>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 7%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">No.</span></th>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 30%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">Dịch vụ</span></th>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 43%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">Số lượng</span></th>';
$html .= '<th style="font-size: 12px; line-height: 1; margin: 0; padding: 0; width: 20%; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">Giá</span></th>';
$html .= '</tr>';
for($i = 1; $i < $number_item; $i++) {
    
    if(isset($_POST['Childs'.$i])) {
        
    } else {
        $html .= '<tr>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.$i.'</span></td>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.$_POST['name'.$i].'</span></td>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.$_POST['quantity'.$i].'</span></td>';
        $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; border-bottom: 1px solid lightgray;"><span style="font-size: 12px; line-height: 2.4; margin: 0; padding: 10px; font-weight: 100">'.number_format($_POST['price'.$i]).' VNĐ</span></td>';
        $html .= '</tr>';
    }
}
$html .='</table>';
$html .= '<br>';
$html .= '</section>';

$html .= '<section class="info-customer">';
$html .= '<br>';
$html .= '<table><tr>';
    $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; width: 80%; font-weight: bold">Tổng hoá đơn: </td>';
    $html .= '<td style="font-size: 12px; line-height: 1; margin: 0; padding: 10px; width: 20%; font-weight: bold">'.number_format($total).' VNĐ</td>';
$html .= '</tr></table></section>';

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
$html .= '<div class="info"><b>Phương thức thanh toán:</b> '.$payment_method.'</div>';

$html .= <<<EOF

<section class="info-customer">
    <h3 style="font-size: 14px; line-height: 1.2" >Chính sách huỷ phòng</h3>
    <ul>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Đặt phòng này không được hoàn tiền.</li>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Thời gian hiển thị là giờ địa phương. Số đêm nghỉ và hạng phòng không được thay đổi.</li>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Quý khách vui lòng tham khảo thủ tục hoàn tiền tại: Bamboo Sapa Hotel</li>
    </ul>
    <h3 style="font-size: 14px; line-height: 1.2" >Lưu ý quan trọng!</h3>
    <ul>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Chính Sách Độ Tuổi Tối Thiểu để Nhận Phòng.</li>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Guests must be at least 18 years old to be able to check-in.</li>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Hướng Dẫn Nhận Phòng Chung.</li>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Chính Sách Nhận Phòng Sớm.</li>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Khách sạn có thể cho nhận phòng sớm tùy theo tình trạng phòng trống thực tế.</li>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Chính Sách Trả Phòng Trễ.</li>
        <li style="margin-bottom: 0; font-size: 12px; line-height: 1.2">Khách sạn có thể cho trả phòng muộn tùy theo tình trạng phòng trống thực tế.</li>
    </ul>
</section>

EOF;
$pdf->writeHTML($html, true, false, true, false, '');
$fileName = $name_customer.'-'.$phone.'-'.time().'.pdf';
ob_clean();
$pdf->Output($_SERVER['DOCUMENT_ROOT'].'/pdf/'.$fileName, 'FD');
$attachments = array($_SERVER['DOCUMENT_ROOT'].'/pdf/'.$fileName);
wp_mail( $email, 'Booking successfully', $content, $headers, $attachments);
?>