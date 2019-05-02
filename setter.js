// jshint esversion:6
let startTovarName = TovarItems.TovarName;
let isNameChanged = startTovarName.indexOf("$$$");

// set props to name 
if (isNameChanged == -1) {
    TovarItems.TovarName =
        TovarItems.TovarName + "$$$" +
        Math.round(TovarItems.TovarModel.GSize.x) + "_" +
        Math.round(TovarItems.TovarModel.GSize.y) + "_" +
        Math.round(TovarItems.TovarModel.GSize.z);
}
else{
    let str = "str";
    setUserPropsToBlock(TovarItems.TovarModel,str,"12345");
    alert(TovarItems.TovarModel.UserProperty[str]);
    let pnAndFurn = [];
    pnAndFurn = getAllPanelAndFurnFromObjectsTopLvl(TovarItems.TovarModel);
    let pn = pnAndFurn[0];
    let furn = pnAndFurn[1];
    alert( pn.length );
    alert( furn.length );
}

// устанавливает свойства у блоков
function setUserPropsToBlock(block, prop,propVl){
    
    let bl = block;
    bl.UserPropertyName = prop;

    bl.UserProperty[prop] = propVl;
}


// все панели и фурнитура из одинаковых элементов или элемента  TopLvl
function getAllPanelAndFurnFromObjectsTopLvl(objectsTopLvl) {

    var allPanelAndAllFurn = [];

    var allPanel = [];
    var allFurn = [];

    var oneObjTop;
    if (objectsTopLvl instanceof TFurnBlock) {
        alert("TFurnBlock");
        oneObjTop = objectsTopLvl;
        rec(oneObjTop);
    }
    else {

        for (var i = 0; i < objectsTopLvl.length; i++) {
            oneObjTop = objectsTopLvl[i];
            rec(oneObjTop);
        }
    }


    function rec(oneObjTop) {
        for (var i = 0; i < oneObjTop.Count; i++) {
            var obj = oneObjTop[i];
            alert(oneObjTop.Count);
            if (obj.List) {
                rec(obj);
            }
            else {
                if (obj instanceof TFurnPanel) {
                    alert("panel");
                    allPanel.push(obj);
                }
                else {
                    allFurn.push(obj);
                }
            }
        }
    }

    allPanelAndAllFurn.push(allPanel);
    allPanelAndAllFurn.push(allFurn);
    alert( allPanel.length);
    return allPanelAndAllFurn;
}



// // jshint esversion:6
// let startTovarName = TovarItems.TovarName;
// let isNameChanged = startTovarName.indexOf("$$$");

// // set props to name 
// if (isNameChanged == -1) {
//     TovarItems.TovarName =
//         TovarItems.TovarName + "$$$" +
//         Math.round(TovarItems.TovarModel.GSize.x) + "_" +
//         Math.round(TovarItems.TovarModel.GSize.y) + "_" +
//         Math.round(TovarItems.TovarModel.GSize.z);
// }
// else{
//     let str = "str";
//     setUserPropsToBlock(TovarItems.TovarModel,str,"12345");
//     alert(TovarItems.TovarModel.UserProperty[str]);
// }

// // устанавливает свойства у блоков
// function setUserPropsToBlock(block, prop,propVl){
    
//     let bl = block;
//     bl.UserPropertyName = prop;

//     bl.UserProperty[prop] = propVl;
// }






// else {
//     let finishElemnt = FindByName("Измененные изделия");
//     // check all tovar elements and count price 
//     if (finishElemnt != undefined) {
//         alert("check all tovar elements and count price ");
//     }
//     alert("DON T HAVE FINISH ELEMENT");
// }



// start values 
var artInit;
var nmInit;

var widthInit;
var heightInit;
var depthInit;
var detailCntInit;
var holeCntInit;
var furnCntInit;



// new values from model 
var widthNew;
var heightNew;
var depthNew;
var detailCntNew;
var holeCntNew;
var furnCntNew;


/**
 * 
*/

// var artInit = TovarItems.TovarArticul;
// var nmInit = TovarItems.TovarName;
var setName;
//читаем файл с таблицей соответствия корпусов и артикулов
tab_art = file_to_Mas(SalonUtils.GetFullPathAttachment('_simple_exemple.csv'));
initialize_start_values(tab_art);

// initialize new values 
widthNew = Math.round(TovarItems.TovarModel.GSize.x);
heightNew = Math.round(TovarItems.TovarModel.GSize.y);
depthNew = Math.round(TovarItems.TovarModel.GSize.z);
detailCntNew = getDetailCnt();
holeCntNew = getHoleCnt();
furnCntNew = getFurnCnt();

// check sizes
var widthIsEq = (widthInit == widthNew);
var heightIsEq = (heightInit == heightNew);
var depthIsEq = (depthInit == depthNew);
setName = check_sizes (nmInit);

// check params
setName = check_params(setName);

// set new name and art 
TovarItems.TovarName = setName;
TovarItems.TovarArticul = setName;

/**
 * 
*/
function check_sizes(nmInit) {
    var sizeNm;
    // size not change
    if (widthIsEq && heightIsEq && depthIsEq) {
        return nmInit;
    }

    // set name 
    if (!widthIsEq && heightIsEq && depthIsEq) {
        sizeNm = widthNew + "_" + nmInit;
        return sizeNm;
    }

    if ((widthIsEq && !heightIsEq && depthIsEq) ||
        (!widthIsEq && !heightIsEq && depthIsEq)) {
        sizeNm = widthInit + "x" + heightNew + "_" + nmInit;
        return sizeNm;
    }

    if ((widthIsEq && heightIsEq && !depthIsEq) ||
        (widthIsEq && !heightIsEq && !depthIsEq) ||
        (!widthIsEq && !heightIsEq && !depthIsEq)) {
        sizeNm = widthInit + "x" + heightNew + "x" + depthNew + "_" + nmInit;
        return sizeNm;
    }

}
function check_params(setName) {
    
}

function initialize_start_values(tab_art){
    var oneArt = tab_art[n][1];
    if (oneArt === TovarItems.TovarArticul) {
        artInit = Number(tab_art[n][1]);
        widthInit = Number(tab_art[n][2]);
        heightInit = Number(tab_art[n][3]);
        depthInit = Number(tab_art[n][4]);
        detailCntInit = Number(tab_art[n][5]);
        holeCntInit = Number(tab_art[n][6]);
        furnCntInit = Number(tab_art[n][7]);
    }
}


//преобразование файла в массив
function file_to_Mas(fileName) {
    //считали файл
    var text = system.readTextFile(fileName);
    // объект в массив из строк
    var array = text.split('\r\n');
    var str = [];
    for (i = 0; i < array.length; ++i) {
        //строка в набор ячеек с разделителем - ";"
        str[i] = array[i].split(';');
    }
    return str;
}