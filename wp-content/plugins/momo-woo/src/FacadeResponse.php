<?php

/**
 *
 * @author nghiatruong - truongbanghia@gmail.com
 * @since  1.0.0
 */

namespace momo\Facades;

interface FacadeResponse
{
    public function getResponseDescription($responseCode);
    public function checkResponse($txnResponseCode);
    public function ipn_url_momo($txnResponfseCode);
    public function getOrder($orderId);
}
