
$(document).ready(function() {
    // all_products_right();
    $("#remove_chb_left").click(left_button_pressed);
    get_left_onload_data();
});

function get_all_left_products() {
    if( JSON.parse(localStorage.getItem("array_right")) == null ) {
        $.ajax({
            url: "index.php?page=all_products",
            method: "POST",
            dataType: "json",
            success: function(data) {
                console.log("All products are here");
                leftSideData(data);
                
            },
            error: function (error){
                console.error(error);
            }
        });
    }
    else {
        get_rest_of_left_data();
    }
    
}

function leftSideData(data) {
    html = "";
    for(let prod of data) {
        html+=`
        <div class="col-md-6 col-sm-6 col-xs-6 text-left">
            <div class="checkbox icheck-sunflower">
                <input type="checkbox" class="chbFruit" name="chb[]" value="${prod.idProduct}" >
                <label>${prod.product_name}</label>
            </div>
        </div>
        `
    }
    $("#products_html").html(html);
}
function get_left_onload_data() {
    var ids = null;
    if(JSON.parse(localStorage.getItem("array_right")).length == 0 ) {
        ids = "null";
    }
    else {
        ids = JSON.parse(localStorage.getItem("array_right"));
    }
    console.log(JSON.parse(localStorage.getItem("array_right")));
    $.ajax({
        url: "index.php?page=get_left_checked_products",
        method: "GET",
        dataType: "json",
        data: {
            ids: ids,
            send: true
        },
        success: function(data) {
            // all_products_right(data);
            get_ajax_right();
            get_all_left_products();
        },
        error: function (error){
            console.error(error);
        }
    });
}
function left_button_pressed() {

    var array_values_old = [];
    var array_values = [];
    if(JSON.parse(localStorage.getItem("array_right")) != null ) {
        JSON.parse(localStorage.getItem("array_right")).forEach( p => {
            array_values_old.push(p);
        });
    }

    
    $('.chbFruit').each( function() {
        if( $(this).is(':checked') ) {
            array_values.push( $(this).val() );
        }
    });

    if(array_values.length > 0) {

        array_values.forEach( el => {
            array_values_old.push(el);
        });
        localStorage.removeItem("array_right");
        localStorage.setItem("array_right", JSON.stringify(array_values_old));

        // var ids = array_values_old;
        get_left_onload_data();
        
        //salji AJAX
        // $.ajax({
        //     url: "index.php?page=get_left_checked_products",
        //     method: "POST",
        //     dataType: "json",
        //     data: {
        //         ids: ids,
        //         send: true
        //     },
        //     success: function(data) {
        //         all_products_right(data);
        //         get_all_left_products();
                
        //     },
        //     error: function (error){
        //         console.error(error);
        //     }
        // });
    }
    else {
        alert("U have to choose something");
    }
        
   
}
function get_ajax_right() {
    
}

function all_products_right(data) {
    
    if(JSON.parse(localStorage.getItem("array_right")) != null ) {
        rightSideData(data);
    }
    else {
        $("#products_html_right").html("No items to show.")
    }
}

function rightSideData(data) {
    html = "";
    for(let prod of data) {
        html+=`
        <div class="col-md-6 col-sm-6 col-xs-6 text-left">
            <div class="checkbox icheck-sunflower">
                <input type="checkbox" class="chbFruit" name="chb[]" value="${prod.idProduct}" >
                <label>${prod.product_name}</label>
            </div>
        </div>
        `
    }
    $("#products_html_right").html(html);
}

function get_rest_of_left_data() {
    $.ajax({
        url: "index.php?page=get_rest_left_checked_products",
        method: "POST",
        dataType: "json",
        data: {
            ids: JSON.parse(localStorage.getItem("array_right")),
            send: true
        },
        success: function(data) {
            console.log("Just checked are  LEFT AGAIN here now.");
            leftSideData(data);
        },
        error: function (error){
            console.error(error);
        }
    });
}