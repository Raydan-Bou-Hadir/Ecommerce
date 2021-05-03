//import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './scss/style.scss'
import './css/style.css';
import 'jquery/dist/jquery';
import 'popper.js/dist/popper';
import 'bootstrap/dist/js/bootstrap';
import '@fortawesome/fontawesome-free/js/all';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';

$(function() {

    $('[data-toggle="tooltip"]').tooltip()

    $('.add-to-cart-button').click(function() {
        alert('أضيف الى عربة الشراء');
    });

    $('#copyright').text("جميع الحقوق محفوظة للمتجر سنة " + new Date().getFullYear());

    $('.product-option input[type="radio"]').change(function() {
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    });

    //عندما تتغير كمية المنتج
    $('[data-product-quantity]').on('change', function() {
        
        //أجلب الكمية الجديدة
        var newQuantity= $(this).val();

        //أبحث عن السطر الذي يحتوي معلومات هذا المنتج
        var parent = $(this).parents('[data-product-info]');

        //أجلب سعر الوحدة من معلومات المنتج
        var pricePerUnit = parent.attr('data-product-price');

        //السعر الإجمالي للمنتج هو سعر القطعة مظروباً بعددها
        var totalPriceForProduct = newQuantity * pricePerUnit;

        //عين السعر الجديد ضمن خلفية السعر الإجمالي في هذا السطر
        parent.find('.total-price-for-product').text(totalPriceForProduct + '$');

        calculateTotalPrice();
    });

    $('[data-remove-from-cart]').on('click', function() {
        $(this).parents('[data-product-info]').remove();
        calculateTotalPrice();
    });

    function calculateTotalPrice() {
        //أنشئ متغير جديداً لحفظ السعر الأجمالي
        var totalPriceForAllProducts = 0;

        $('[data-product-info]').each(function() {

            var pricePerUnit = $(this).attr('data-product-price');

            var quantity = $(this).find('[data-product-quantity]').val();

            var totalPriceForProduct = pricePerUnit * quantity;

            totalPriceForAllProducts = totalPriceForAllProducts + totalPriceForProduct;
        });

        $('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
    }


    var citiesByCountry = {
        sa: ['الرياض','جدة'],
        eg: ['الأسكندرية','القاهرة'],
        jo: ['الزرقاء','عمان'],
        sy: ['حماه','حلب','دمشق']
    };

    //عندما يتغير البلد
    $('#form-checkout select[name="country"]').on('change', function() {

        //أجلب رمز البلد
        var country = $(this).val();

        //أجلب مدن هذا البلد من المصفوفة
        var cities = citiesByCountry[country];
        
        //فرغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();

        //أضافة خيار أختر مدينة
        $('#form-checkout select[name="city"]').append(
            '<option disabled selected value="">أختر المدينة</option>'
        );

        //أضف المدن الى قائمة المدن
        cities.forEach(function(city) {
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);            
        });
    });

    //عندما تتغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').on('change', function(){

        var paymentMethod = $(this).val();

        if (paymentMethod === 'on_delivary') {

            $('#credit-card-info input').prop('disabled', true);
        }else {

            $('#credit-card-info input').prop('disabled', false);
        }

        //بدل معلومات بطاقة الأئتمان بين الظهور و الأغلاق
        $('#credit-card-info').toggle();
    });

    //مكون البحث حسب السعر
    $( "#price-range" ).slider({
        range: true,
        min: 50,
        max: 1000,
        values: [ 250, 800 ],
        slide: function( event, ui ) {
        $('#price-min').text(ui.value[0]);
        $('#price-max').text(ui.value[1]);
        }
    });
});