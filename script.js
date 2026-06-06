let baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

let input = document.querySelector("input");
let display = document.querySelector(".conversion p");
let para = document.querySelector("#para");

let btn = document.querySelector("button");

let selects = document.querySelectorAll("select");
let curr = selects[0];
let aft = selects[1];

for(let select of selects){
    for(let code in countryList){
        let opt = document.createElement("option");
        opt.innerText = code;
        opt.value = code;
        select.append(opt);
        if(code === "INR" && select.name === "from"){
            opt.selected = "selected";
        }
        else if(code === "USD" && select.name === "to"){
            opt.selected = "selected";
        }
    }
}

const calcRate = async (currVal, aftVal, amt) => {
    let url = `${baseURL}${currVal}.json`;
    // console.log(currVal, aftVal);

    let response = await fetch(url);
    let data = await response.json();

    let rate = data[currVal][aftVal];
    let totAmt = amt * rate;
    // console.log(totAmt);
    let res = `${amt} ${currVal.toUpperCase()} = ${totAmt.toFixed(5)} ${aftVal.toUpperCase()}`;

    display.innerText = res;
    // console.log(res);
}

const updateExchangeRate = () => {
    let amt = input.value;
    // logic for less than 1 amt
    if(amt < 1 || amt === ""){
        para.style.visibility = "visible";
        display.innerText = "";
        return;
    }
    else{
        para.style.visibility = "hidden";
    }
    let currVal = curr.value.toLowerCase();
    let aftVal = aft.value.toLowerCase();
    calcRate(currVal, aftVal, amt);
}
 
selects.forEach((select) => {
    select.addEventListener("change", () => {
        let currCode = select.value;
        let country = countryList[currCode];
        // console.log(country);
        let img = select.parentElement.firstElementChild;
        img.src = `https://flagsapi.com/${country}/flat/64.png`;
    });
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load", () => {
    updateExchangeRate();
});