(function($) {
  $.fn.serializeArrayAll = function() {
    var rCRLF = /\r?\n/g;

    return this.map(function() {
      return this.elements ? $.makeArray(this.elements) : this;
    }).map(function(i, elem) {
      var val = $(this).val();

      if (val == null) {
        return val == null;
      } else if (this.type === 'checkbox') {
        if (this.checked) {
          return {name: this.name, value: this.checked ? this.value : ''};
        }
      } else if (this.type === 'radio') {
        if (this.checked) {
          return {name: this.name, value: this.checked ? this.value : ''};
        }
      } else {
        return $.isArray(val) ?
            $.map(val, function(val, i) {
              return {name: elem.name, value: val.replace(rCRLF, '\r\n')};
            }) :
            {name: elem.name, value: val.replace(rCRLF, '\r\n')};
      }
    }).get();
  };

  $(document).on('wooaa_adding_to_cart', function(e, $btn) {
    $btn.removeClass('added').addClass('loading');
  });

  $(document).
      on('wooaa_added_to_cart', function(e, fragments, cart_hash, $btn) {
        $btn.removeClass('loading').addClass('added');
      });

  $(document).
      on('click',
          '.single_add_to_cart_button:not(.disabled, .wpc-disabled, .wooaa-disabled, .wooco-disabled, .woosb-disabled, .woobt-disabled, .woosg-disabled, .woofs-disabled, .woopq-disabled, .wpcbn-btn, .wpcuv-update)',
          function(e) {
            var wooaa = false;
            var $btn = $(this);
            var $form = $btn.closest('form.cart');

            if (wooaa_vars.product_types !== undefined) {
              var product_types = wooaa_vars.product_types.split(',');

              if (product_types.includes('all')) {
                wooaa = true;
              } else {
                product_types.forEach(function(item) {
                  if ($btn.is('.product-type-' + item +
                      ' .single_add_to_cart_button')) {
                    wooaa = true;
                  }
                });
              }
            }

            if (wooaa) {
              e.preventDefault();

              var data = $form.find(
                  'input:not([name="product_id"]), select, button, textarea').
                  serializeArrayAll() || 0;

              $.each(data, function(i, item) {
                if (item.name === 'add-to-cart') {
                  item.name = 'product_id';
                  item.value = $form.find('input[name=variation_id]').val() ||
                      $form.find('input.variation_id').val() ||
                      $form.find('input[name=add-to-cart]').val() || $btn.val();
                }
              });

              $(document.body).trigger('wooaa_adding_to_cart', [$btn, data]);
              $(document.body).trigger('adding_to_cart', [$btn, data]);

              if ($btn.is(
                  '.product-type-variable .single_add_to_cart_button')) {
                // variable product
                var _data = {};
                var attrs = {};

                $form.find('select[name^=attribute]').each(function() {
                  var attribute = $(this).attr('name');
                  var attribute_value = $(this).val();

                  attrs[attribute] = attribute_value;
                });

                $.each(data, function(i, item) {
                  if (item.name !== '') {
                    _data[item.name] = item.value;
                  }
                });

                _data.action = 'wooaa_add_to_cart_variable';
                _data.variation = attrs;

                $.post(wooaa_vars.ajax_url, _data, function(response) {
                  if (!response) {
                    return;
                  }

                  if (response.error && response.product_url) {
                    window.location = response.product_url;
                    return;
                  }

                  // Redirect to cart option
                  if (wc_add_to_cart_params.cart_redirect_after_add === 'yes') {
                    window.location = wc_add_to_cart_params.cart_url;
                    return;
                  }

                  // Trigger event so themes can refresh other areas.
                  $(document.body).
                      trigger('added_to_cart',
                          [
                            response.fragments,
                            response.cart_hash,
                            $btn]);
                  $(document.body).
                      trigger('wooaa_added_to_cart',
                          [
                            response.fragments,
                            response.cart_hash,
                            $btn]);
                });
              } else {
                $.ajax({
                  type: 'POST',
                  url: wc_add_to_cart_params.wc_ajax_url.toString().
                      replace('%%endpoint%%', 'add_to_cart'),
                  data: data,
                  success: function(response) {
                    if (!response) {
                      return;
                    }

                    if (response.error && response.product_url) {
                      window.location = response.product_url;
                      return;
                    }

                    // Redirect to cart option
                    if (wc_add_to_cart_params.cart_redirect_after_add ===
                        'yes') {
                      window.location = wc_add_to_cart_params.cart_url;
                      return;
                    }

                    // Trigger event so themes can refresh other areas.
                    $(document.body).
                        trigger('added_to_cart',
                            [
                              response.fragments,
                              response.cart_hash,
                              $btn]);
                    $(document.body).
                        trigger('wooaa_added_to_cart',
                            [
                              response.fragments,
                              response.cart_hash,
                              $btn]);
                  },
                  dataType: 'json',
                });
              }

              return false;
            }
          });
})(jQuery);