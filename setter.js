// jshint esversion:6
/**
 * Set Tovar values to name after change.
 * Start values write to UserProperty
 */

let bl = TovarItems.TovarModel;
let startPropsName = "startValues";
let isSetStartProp = bl.UserProperty[startPropsName];

// set start props
if (isSetStartProp ==  undefined) {
    bl.UserPropertyName = startPropsName;
    let panelAndFurnCounter = getPanelAndFurnCount();
    // start name$x$y$x$all detail cont
    bl.UserProperty[startPropsName] =
        TovarItems.TovarName + "$" +
        Math.round(TovarItems.TovarModel.GSize.x).toFixed() + "$" +
        Math.round(TovarItems.TovarModel.GSize.y).toFixed() + "$" +
        Math.round(TovarItems.TovarModel.GSize.z).toFixed() + "$" +
        panelAndFurnCounter;
    //alert(bl.UserProperty[startPropsName]);
}
//check props and set name
else{
    let startProps = Object.create(null);
    startProps = getStartProps(bl,startPropsName);
    let newProps = Object.create(null);
    newProps = getNewProps(bl);
    setName(startProps,newProps,startProps.nameInit);
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


function getStartProps (bl,startPropsName){
    let startProps = Object.create(null);
    let stringProps = bl.UserProperty[startPropsName];

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

function setName(startProps, newProps,startNm) {

    // check sizes and cnt
    let widthIsEq = (startProps.widthInit == newProps.widthNew);
    let heightIsEq = (startProps.heightInit == newProps.heightNew);
    let depthIsEq = (startProps.depthInit == newProps.depthNew);
    let cntIsEq = (startProps.cntInit == newProps.cntNew);

    let newPartName = checker();
    //set new name
    TovarItems.TovarName = newPartName + startNm;

    function checker() {
        let newStr = "$wx$hx$d_";
        // size not change(trigger false start)
        if (widthIsEq && heightIsEq && depthIsEq && cntIsEq) {
            alert("нет изменений");
            newStr = "";
            return newStr;
        }

        if(!widthIsEq){newStr = newStr.replace("$w",newProps.widthNew);}
        if(!heightIsEq){newStr = newStr.replace("$h",newProps.heightNew);}
        if(!depthIsEq){newStr = newStr.replace("$d",newProps.depthNew);}

        newStr = newStr.replace("$wx","");
        newStr = newStr.replace("x$h","");
        newStr = newStr.replace("x$d","");

        if(!cntIsEq){newStr = "Д_" + newStr;}
        //alert(newStr);
        return newStr;
    }
}