
// adding a submit event listener to the form. once heard loader is shown then calculated
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display='none';

    //show loading.gif
    document.getElementById('loading').style.display='block';
    setTimeout(calculateResults,5000);
    e.preventDefault();
});

//called after submit
function calculateResults(e){
    console.log('test');
    //UI vars
    const $amount = document.getElementById('amount');
    const $interest = document.getElementById('interest');
    const $years = document.getElementById('years');
    const $monthlyPayment = document.getElementById('monthly-payment');
    const $totalPayment = document.getElementById('total-payment');
    const $totalInterest = document.getElementById('total-interest');

    //getting vals and parsing to float & using formulas to calc 
    const principal = parseFloat($amount.value);
    const calculatedInterest = parseFloat($interest.value)/100/12;
    const calculatedPayments = parseFloat($years.value)*12;

    //now compute monthly payments
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    //if val of monthly is finite....
    if(isFinite(monthly)){
        //...set $vals to calculated vals
        $monthlyPayment.value = monthly.toFixed(2);
        $totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        $totalInterest.value= ((monthly*calculatedPayments)-principal).toFixed(2);
    }else{
        //else throw error
        showError('Please Check Your Numbers');
    }

    //show results
    document.getElementById('results').style.display='block';
    //hide loader
    document.getElementById('loading').style.display='none'


    
}

//called when error in values is caught
function showError(error){
    //creating a div
    const errorDiv = document.createElement('div');

    //get elements using query selector and class names
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className='alert alert-danger';

    //create text node and add the error message
    errorDiv.appendChild(document.createTextNode(error));
    // Insert error above the heading
    card.insertBefore(errorDiv,heading);

    //set timer for error
    setTimeout(clearError, 1500);
}
function clearError(){
    //using the class we gave alert, remove after the specified time
    document.querySelector('.alert').remove();
}