
$(document).ready(function() {
    get_all_products();
    $("#remove_chb_left").click(left_button_pressed);
    $("#remove_chb_right").click(right_button_pressed);
    buttonC
    $("#buttonC").click(button_c_pressed);
});

function get_all_products() {
    if( JSON.parse(localStorage.getItem("array_right")) == null ||  JSON.parse(localStorage.getItem("array_right")).length == 0) {
        $.ajax({
            url: "index.php?page=all_products",
            method: "POST",
            dataType: "json",
            success: function(data) {
                leftSideData(data);
                $("#products_html_right").html("");
            },
            error: function (error){
                console.error(error);
            }
        });
    }
    else {
        left_button_pressed();
    }

    
}

function leftSideData(data) {
    html = "";
    for(let prod of data) {
        html+=`
        <div class="col-md-6 col-sm-6 col-xs-6 text-left">
            <div class="checkbox icheck-sunflower">
                <input type="checkbox" class="chbFruitLeft" name="chb[]" value="${prod.idProduct}" >
                <label>${prod.product_name}</label>
            </div>
        </div>
        `
    }
    $("#products_html").html(html);
}

function left_button_pressed() {
    var array_values_old = [];
    var array_values = [];
    if(JSON.parse(localStorage.getItem("array_right")) != null ) {
        JSON.parse(localStorage.getItem("array_right")).forEach( p => {
            array_values_old.push(p);
        });
    }

    
    $('.chbFruitLeft').each( function() {
        if( $(this).is(':checked') ) {
            array_values.push( $(this).val() );
        }
    });

    
    if(array_values.length > 0) {
        array_values.forEach( el => {
            array_values_old.push(el);
        });
    }
        localStorage.removeItem("array_right");
        localStorage.setItem("array_right", JSON.stringify(array_values_old)); //5

        var ids = array_values_old;
        //salji AJAX
        $.ajax({
            url: "index.php?page=get_left_checked_products",
            method: "POST",
            dataType: "json",
            data: {
                ids: ids,
                send: true
            },
            success: function(data) {
                
                all_products_right(data);
                
                get_rest_of_left_data();
                
            },
            error: function (error){
                console.error(error);
            }
        });
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
                <input type="checkbox" class="chbFruitRight" name="chb[]" value="${prod.idProduct}" >
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
            leftSideData(data);
        },
        error: function (error){
            console.error(error);
        }
    });
}


function right_button_pressed() {
    
    var array_values = [];

    $('.chbFruitRight').each( function() {
        if( $(this).is(':checked') ) {
            array_values.push( $(this).val() );
        }
    });

    var filtrirani = [];
    if(JSON.parse(localStorage.getItem("array_right")) != null ) {
        JSON.parse(localStorage.getItem("array_right")).forEach( p => {
            if(array_values.indexOf(p) === -1) {
                filtrirani.push(p);
            }
        });
        localStorage.removeItem("array_right");
        localStorage.setItem("array_right", JSON.stringify(filtrirani));
        get_all_products();
    }
}


function button_c_pressed() {

    var array_values = [];

    $('.chbFruitRight').each( function() {
        if( $(this).is(':checked') ) {
            array_values.push( $(this).val() );
        }
    });

    //send ajax on obrada.php
    $.ajax({
        url: "index.php?page=obrada_php",
        method: "POST",
        dataType: "json",
        data: {
            ids: array_values,
            send: true
        },
        success: function(data) {
            //alert(data);
            console.log(data);
            ispis(data);
        },
        error: function (error){
            console.error(error);
        }
    });
}
function ispis(data) {
    let html = "";
    for(let prod of data) {
        html += `
        ${prod.idProduct} - ${prod.product_name} <br>
        `
    }
    $("#dataChecked").html(html);
}