const form = document.querySelector('#searchForm');
const res = document.querySelector('#resultTable');
const allcons = document.getElementById("allcons");
var update;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    if (update){
        clearTimeout(update);
    }

    const ctype = form.elements.coinType.value;
    const currency = form.elements.currType.value;
    
    allcons.classList.add('mainClick');
    allcons.classList.remove('main'); 

    fetchDetails(currency,ctype);

});

const fetchDetails= async (currency,ctype) => {

    const details=await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=${currency}`);
    showPrice(details.data.coin)
};

const showPrice= (coinData) => {
   
    const price = coinData.price;
    const priceChange=coinData.priceChange1h;
    const totalSupplys = coinData.totalSupply;
    

    res.innerHTML=` <table class="styled-table">
    <thead>
        <tr>
            <th>Property</th>
            <th>Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Price</td>
            <td>${price}</td>
        </tr>
        <tr class="active-row">
            <td>Price change <br> in 1 hr</td>
            <td>${priceChange}</td>
        </tr>
        <tr class="active-row">
            <td>Total Supplies</td>
            <td>${totalSupplys}</td>
        </tr>
    </tbody>
</table>
    `
    update= setTimeout(()=>fetchDetails(currency,ctype),30000);
}
