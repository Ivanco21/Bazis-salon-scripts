// jshint esversion:6
/**
 * Set Tovar values to name after change.
 * Start values write to UserProperty
 */
let bl = TovarItems.TovarModel;
let changesPropNm = "changeParams";

alert("1" + TovarItems.Remark);
// set start props
if (TovarItems.Remark == "") {
    let panelAndFurnCounter = getPanelAndFurnCount();
    // start name$x$y$x$all detail cont
    TovarItems.Remark =
        TovarItems.TovarName + "$" +
        Math.round(TovarItems.TovarModel.GSize.x).toFixed() + "$" +
        Math.round(TovarItems.TovarModel.GSize.y).toFixed() + "$" +
        Math.round(TovarItems.TovarModel.GSize.z).toFixed() + "$" +
        panelAndFurnCounter;
    alert("2" + TovarItems.Remark);
}
//check props and set name
else{
    let startProps = Object.create(null);
    startProps = getStartProps();
    let newProps = Object.create(null);
    newProps = getNewProps(bl);

    // check sizes and cnt
    let widthIsEq = (startProps.widthInit == newProps.widthNew);
    let heightIsEq = (startProps.heightInit == newProps.heightNew);
    let depthIsEq = (startProps.depthInit == newProps.depthNew);
    let cntIsEq = (startProps.cntInit == newProps.cntNew);

    setName(startProps,newProps);

    if ( ! (widthIsEq && heightIsEq && depthIsEq && cntIsEq)) {
        setChangesProps(bl,startProps,newProps,changesPropNm);
    }
    alert("3" + TovarItems.Remark);
}

/**
 * 
 * 
 */

function getPanelAndFurnCount() {
    let mainCnt = 0;
    for (let j = 0; j < TovarItems.Count; j++) {
        let oneItem = TovarItems.Items[j];
        for (let i_d = 0; i_d < oneItem.ObjList.Count; i_d++) {
            let oneDetail = oneItem.ObjList.Items[i_d];
            let cnt = getAllPanelAndFurnFromObjectsTopLvl(oneDetail);
            mainCnt = mainCnt + cnt;
        }
    }
    return mainCnt;
}

// all simple elements
function getAllPanelAndFurnFromObjectsTopLvl(objectsTopLvl) {

    let cnt = 0;

    rec(objectsTopLvl);

    function rec(oneObjTop) {
        for (let i = 0; i < oneObjTop.Count; i++) {
            let obj = oneObjTop[i];
            if (obj instanceof TFurnBlock) {
                rec(obj);
            }
            if (obj instanceof TFurnPanel) {
                //alert("add panel");
                cnt++;
            }
            else {
                //alert("add furn");
                cnt++;
            }
        }
    }
    return cnt;
}


function getStartProps (){
    let startProps = Object.create(null);
    let stringProps = TovarItems.Remark;

    let prs = stringProps.split("$");
    // start name$x$y$x$all detail cont
    startProps.nameInit = prs[0];
    startProps.widthInit = prs[1];
    startProps.heightInit = prs[2];
    startProps.depthInit = prs[3];
    startProps.cntInit = prs[4];
    return startProps;
}


function getNewProps(bl){
    let newProps = Object.create(null);

    newProps.widthNew = Math.round(TovarItems.TovarModel.GSize.x).toFixed();
    newProps.heightNew = Math.round(TovarItems.TovarModel.GSize.y).toFixed();
    newProps.depthNew = Math.round(TovarItems.TovarModel.GSize.z).toFixed();
    newProps.cntNew = getPanelAndFurnCount(bl);

    return newProps;
}

function setName(startProps,newProps) {
    // check sizes and cnt
    let widthIsEq = (startProps.widthInit == newProps.widthNew);
    let heightIsEq = (startProps.heightInit == newProps.heightNew);
    let depthIsEq = (startProps.depthInit == newProps.depthNew);
    let cntIsEq = (startProps.cntInit == newProps.cntNew);

    let newStr = "$wx$hx$d_";
    // size not change(trigger false start)
    if (widthIsEq && heightIsEq && depthIsEq && cntIsEq) {
        alert("нет изменений");
        newStr = "";
    }

    if (!widthIsEq) { newStr = newStr.replace("$w", ("ш" + newProps.widthNew)); }
    if (!heightIsEq) { newStr = newStr.replace("$h", ("в" + newProps.heightNew)); }
    if (!depthIsEq) { newStr = newStr.replace("$d", ("г" + newProps.depthNew)); }

    newStr = newStr.replace("$wx", "");
    newStr = newStr.replace("x$h", "");
    newStr = newStr.replace("x$d", "");

    if (!cntIsEq) { newStr = "Д_" + newStr; }
    alert(newStr);

    //set new name
    TovarItems.TovarName = newStr + startProps.nameInit;
}

function setChangesProps(bl,startProps,newProps,changesPropNm) {

    // check sizes and cnt
    let widthIsEq = (startProps.widthInit == newProps.widthNew);
    let heightIsEq = (startProps.heightInit == newProps.heightNew);
    let depthIsEq = (startProps.depthInit == newProps.depthNew);
    let cntIsEq = (startProps.cntInit == newProps.cntNew);

    let isSetProp = TovarItems.Remark;

    if (isSetProp == undefined ) {
        TovarItems.Remark = changesPropNm;
    }

    let str = "";
    if (!cntIsEq) { str = "$c" + str; }//detail count
    if (!depthIsEq) { str = "$d" + str; }
    if (!heightIsEq) { str = "$h" + str; }
    if (!widthIsEq) { str = "$w" + str; }

    TovarItems.Remark = str;
}