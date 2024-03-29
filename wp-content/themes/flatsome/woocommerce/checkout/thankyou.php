<?php
/**
 * Thankyou page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/thankyou.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.7.0
 */

defined( 'ABSPATH' ) || exit;
echo do_shortcode('[block id="banner"]');
?>

<!-- <div class="row">

	<?php if ( $order ) :

		do_action( 'woocommerce_before_thankyou', $order->get_id() ); ?>

		<?php if ( $order->has_status( 'failed' ) ) : ?>
		<div class="large-12 col order-failed">
			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed"><?php esc_html_e( 'Unfortunately your order cannot be processed as the originating bank/merchant has declined your transaction. Please attempt your purchase again.', 'woocommerce' ); ?></p>

			<p class="woocommerce-notice woocommerce-notice--error woocommerce-thankyou-order-failed-actions">
				<a href="<?php echo esc_url( $order->get_checkout_payment_url() ); ?>" class="button pay"><?php esc_html_e( 'Pay', 'woocommerce' ); ?></a>
				<?php if ( is_user_logged_in() ) : ?>
					<a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>" class="button pay"><?php esc_html_e( 'My account', 'woocommerce' ); ?></a>
				<?php endif; ?>
			</p>
		</div>

		<?php else : ?>
    <div class="large-7 col">

    <?php
    $get_payment_method = $order->get_payment_method();
    $get_order_id       = $order->get_id();
    ?>
    <?php do_action( 'woocommerce_thankyou_' . $get_payment_method, $get_order_id ); ?>
    <?php do_action( 'woocommerce_thankyou', $get_order_id ); ?>

    </div>

		<div class="large-5 col">
			<div class="is-well col-inner entry-content">
				<p class="success-color woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received"><strong><?php echo apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woocommerce' ), $order ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong></p>

				<ul class="woocommerce-order-overview woocommerce-thankyou-order-details order_details">

					<li class="woocommerce-order-overview__order order">
						<?php esc_html_e( 'Order number:', 'woocommerce' ); ?>
						<strong><?php echo $order->get_order_number(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
					</li>

						<li class="woocommerce-order-overview__date date">
							<?php esc_html_e( 'Date:', 'woocommerce' ); ?>
							<strong><?php echo wc_format_datetime( $order->get_date_created() ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
						</li>

						<?php if ( is_user_logged_in() && $order->get_user_id() === get_current_user_id() && $order->get_billing_email() ) : ?>
							<li class="woocommerce-order-overview__email email">
								<?php esc_html_e( 'Email:', 'woocommerce' ); ?>
								<strong><?php echo $order->get_billing_email(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
							</li>
						<?php endif; ?>

					<li class="woocommerce-order-overview__total total">
						<?php esc_html_e( 'Total:', 'woocommerce' ); ?>
						<strong><?php echo $order->get_formatted_order_total(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></strong>
					</li>

					<?php
					$payment_method_title = $order->get_payment_method_title();
					if ( $payment_method_title ) :
					?>
						<li class="woocommerce-order-overview__payment-method method">
							<?php esc_html_e( 'Payment method:', 'woocommerce' ); ?>
							<strong><?php echo wp_kses_post( $payment_method_title ); ?></strong>
						</li>
					<?php endif; ?>

				</ul>

				<div class="clear"></div>
			</div>
		</div>9

		<?php endif; ?>

	<?php else : ?>

		<p class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received"><?php echo apply_filters( 'woocommerce_thankyou_order_received_text', esc_html__( 'Thank you. Your order has been received.', 'woocommerce' ), null ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>

	<?php endif; ?>

</div> -->

<?php
$product_data = [];
foreach( $order->get_items() as $item_id => $item){
	$items_meta_data = $item->get_meta_data();
	if(count($items_meta_data) > 2) {
		$data_item = [];
		$product_id = $item->get_product_id();
		$product = $item->get_product();

		$data_item['quantity'] = $item->get_quantity();
		$data_item['name'] = $item->get_name();

		foreach($items_meta_data as $item_meta) {
			$data = $item_meta->get_data();
			if($data['key'] == '_reduced_stock') continue;
			if($data['key'] == 'Adults') {
				$data_item['Adults'] = $data['value'];
			}
			if($data['key'] == 'Childs') {
				$data_item['Childs'] = $data['value'];
			}
			if($data['key'] == 'Date check in') {
				$data_item['Date check in'] = $data['value'];
			}
			if($data['key'] == 'Date check out') {
				$data_item['Date check out'] = $data['value'];
			}
		}
		$count_day = abs(strtotime($data_item['Date check in'])-strtotime($data_item['Date check out']))/86400;
		$data_item['price'] = (int)($item->get_total());
		array_push($product_data,$data_item);
	}
	
}
foreach( $order->get_items() as $item_id => $item){
	$items_meta_data = $item->get_meta_data();
	if(count($items_meta_data) < 3) {
		$data_item = [];
		$product_id = $item->get_product_id();
		$product = $item->get_product();

		$data_item['quantity'] = $item->get_quantity();
		$data_item['price'] = $item->get_total();
		$data_item['name'] = $item->get_name();
		array_push($product_data,$data_item);
	}
	
}
?>

<div class="woocommerce-order container">
	<div class="woocommerce-thank-you-page">
	<h2 class="title-thank-you">Xác nhận và hoàn thành đặt phòng</h2>
		<div class="number-order">Mã đặt phòng: <?php echo $order->get_id(); ?></div>
		<div class="content-thank-you">Cảm ơn bạn đã đặt phòng tai Bamboo Sapa Hotel vui lòng đợi trong 30p, chúng tôi sẽ kiểm tra va xác nhận thông tin đặt phòng va thanh toán của bạn qua sms va email. <br><b>Lưu ý:</b> Bạn hãy lưu lại mã đặt phòng để check-in nhận phòng</div>
		<form method="post" action="/wp-content/generate.php">
			<?php
				$email = $order->get_billing_email(); 
				$name = $order->get_billing_first_name();
				$phone = $order->get_billing_phone();
				$payment = $order->get_payment_method();
				$total = 0;
				$i = 1;
				foreach($product_data as $prod) {
					foreach($prod as $key => $value) {
						if($key == 'price') {
							$total += (int)$value;
						}
			?>
				<input type="hidden" name="<?php echo $key.$i ?>" value="<?php echo $value; ?>" />
			<?php 
					}
			$i++; } ?>
			<input type="hidden" name="number_item" value="<?php echo $i; ?>" />
			<input type="hidden" name="email" value="<?php echo $email; ?>" />
			<input type="hidden" name="name_customer" value="<?php echo $name; ?>" />
			<input type="hidden" name="phone" value="<?php echo $phone; ?>" />
			<input type="hidden" name="payment" value="<?php echo $payment; ?>" />
			<input type="hidden" name="total" value="<?php echo $total; ?>" />
			<input type="hidden" name="orderId" value="<?php echo $order->get_id(); ?>" />
			<button class="export-bill" type="submit"> Xác nhận đặt phòng </button>
		</form>
	</div>
</div>