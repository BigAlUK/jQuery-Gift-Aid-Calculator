(function($) {
  $.fn.giftaidcalc = function(options) {
    
    var settings;
    
    //calculations
    function calcGiftAid() {

      var $donation_amount = $('#donation_amount');
      var donation = $donation_amount.val() * 1;

      if(isNaN(donation)) {
        donation = 0;
        $donation_amount.html('')
      }

      var gift_aid = (donation / 0.80) - donation // [0.80 = 1 - 20% basic rate]

      var tax_type = $('#tax_type').val();
      
      switch(tax_type) {
        case 'tax_basic':
          tax_return = 0;
          total_cost = donation;
          break;
        case 'tax_higher':
          tax_return = (donation + gift_aid) * 0.20;
          total_cost = donation - gift_aid;
          break;
        default:
          tax_return = 0;
          total_cost = donation;
          gift_aid = 0;
      }
      
      $('#gift_aid_claim').html(gift_aid.toFixed(2));
      $('#tax_return_claim').html(tax_return.toFixed(2));
      $('#total_cost').html(total_cost.toFixed(2));
      $('#total_benefit').html((donation + gift_aid).toFixed(2));
    }

    return this.each(function() {
      //not using any options yet, but if I do...
      if(options) {
        $.extend(settings, options)
      }
      
      var $this = $(this);
      
      //empty the container
      $this.empty();
      
      //select label
      $('<label />', {
        for: 'tax_type',
        text: 'UK income tax status'
      }).appendTo($this);
      
      //select box
      var $select_box = $('<select />', {
        name: 'tax_type',
        id:'tax_type'
      }).appendTo($this).change(calcGiftAid);
      //select options
      $('<option />', {
        text:'Please Select',
        val:''
      }).appendTo($select_box);
      $('<option />', {
        text:'I do not pay UK income tax',
        val:'tax_no'
      }).appendTo($select_box);
      $('<option />', {
        text:'I pay basic rate (20%) UK income tax',
        val:'tax_basic'
      }).appendTo($select_box);
      $('<option />', {
        text:'I pay higher rate (40%) UK income tax',
        val:'tax_higher'
      }).appendTo($select_box);
      
      //donation label
      $('<label />', {
        for: 'donation_amount',
        text: 'Donation amount'
      }).appendTo($this);
      
      //donation amount
      $('<input />', {
        name: 'donation_amount',
        id:'donation_amount'
      }).appendTo($this).keyup(calcGiftAid);
      
      //output strings
      //gift aid claim
      $gift_aid_claim = $('<p />', {
        text: 'We can claim from HMRC: £'
      }).appendTo($this);
      $('<span />', {
        id: 'gift_aid_claim',
        text: '0.00'
      }).appendTo($gift_aid_claim);
      
      //tax return claim
      $tax_return_claim = $('<p />', {
        text: 'You can claim tax relief of: £'
      }).appendTo($this);
      $('<span />', {
        id: 'tax_return_claim',
        text: '0.00'
      }).appendTo($tax_return_claim);
      
      //total cost to you
      $total_cost = $('<p />', {
        text: 'Total cost to you: £'
      }).appendTo($this);
      $('<span />', {
        id: 'total_cost',
        text: '0.00'
      }).appendTo($total_cost);
      
      //total benefit
      $total_benefit = $('<p />', {
        text: 'Total benefit to us: £'
      }).appendTo($this);
      $('<span />', {
        id: 'total_benefit',
        text: '0.00'
      }).appendTo($total_benefit);
      
    });
  }
})(jQuery);