const display = document.getElementById("display")

function clearscreen()
{
    display.value="";
}
function deletef()
{
    display.value = display.value.toString().slice(0,-1)
}
function calculate()
{
    var result=display.value;
    var q=eval(result);
    document.getElementById("display").value=q;
}




