// jshint esversion:6

let changesPropNm = "changeParams";

let mainPrice = calcMainPrice(Model, changesPropNm);
setMaterialUsingPrice(mainPrice);// set material
TovarItems.Price = mainPrice; 

function calcMainPrice(Model, changesPropNm){

    let mainPrice = 0;

    for (let j = 0; j < Model.Count; j++) {
        let tovar = Model[j];
        let isSetProp = tovar.UserProperty[changesPropNm];
        if (isSetProp !=  undefined) {
            let changes = tovar.UserProperty[changesPropNm];
            let addCost = calcCost(changes);
            mainPrice = mainPrice + addCost;
        }
    }
    return mainPrice;
}

function calcCost(changes) {

    let cost = 0;
    
    let w_is = /w/.test(changes);
    let h_is = /h/.test(changes);
    let d_is = /d/.test(changes);
    let c_is = /c/.test(changes);

    // costs from user 
    if (h_is || (h_is && d_is)) {
        cost = cost + 500; 
    }

    if (d_is || (d_is && h_is) || (d_is && h_is && w_is) ) {
        cost = cost + 800; 
    }

    if(c_is){
        cost = cost + 1000;
    }

    return cost;
}

function setMaterialUsingPrice(price){
    let step = 250;
    let val;// value after calc

    if(price > 10000){
        alert("Значение больше 10000 - материал не установлен!");
    }

    for(let k = 0; k < 10000; k = k + step){
        if (price <= step && price >= k) {
            val = step;
            break;
        }
        step = step + 250;
    }

    let mtr = val + "_нестандарт";

    for (let j = 0; j < TovarItems.Count; j++)
    {
      let item = TovarItems.Items[j];
      if (item.Name == "Нестандартная конфигурация") {
          item.Material = mtr;
      }
    }
}