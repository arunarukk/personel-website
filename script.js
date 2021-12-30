document.querySelector(".number").addEventListener("keypress", function (evt) {
    if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
    {
        evt.preventDefault();
    }else if (document.getElementById("number").value.length == 10) {
        evt.preventDefault();
    }
});
document.querySelector(".name").addEventListener("keypress", function (evt) {
    if (evt.which != 32 && evt.which < 65 || evt.which > 90 && evt.which <97 || evt.which > 122)
    {
        evt.preventDefault();
    }else if ( evt.which == 32)
    {
        if (document.getElementById("name").value == '') {
            evt.preventDefault();
        }
    }
});


document.querySelector(".message").addEventListener("keypress", function (evt) {
    if ( evt.which == 32)
    {
        if (document.getElementById("message").value == '') {
            evt.preventDefault();
        }
    }
});
