// jshint esversion:6
let changesPropNm = "changeParams";

for (let j = 0; j < Model.Count; j++) {
    let tovar = Model[j];
    let isSetProp = tovar.UserProperty[changesPropNm];

    if (isSetProp !=  undefined) {
        let changes = tovar.UserProperty[changesPropNm];
    }
}

