// jshint esversion:6

for (let j = 0; j < Model.Count; j++) {
    let tovarElement = Model[j];
    let tovarName = tovarElement.Name;
    let nmHaveSimvol = tovarName.indexOf("$$$");
    if(nmHaveSimvol != -1){
        let startProps = Object.create(null);
        startProps = getStartProps(tovarName);

        let newProps = Object.create(null);
        newProps = getNewProps(tovarElement);

        // for(let key in tovarElement){
        //     alert(key + "--" + tovarElement[key]);
        // }
        let str = "str";
        // alert(tovarElement.UserProperty[str]);
        // for(let key in startProps){
        //     alert(startProps[key]);
        // }
        // for(let key in newProps){
        //     alert(newProps[key]);
        // }
    }
}


function getStartProps (tovarName){

    let startProps = Object.create(null);
    let nm = tovarName.split("$$$")[1];
    let props = nm.split("_");
    startProps.widthInit = props[0];
    startProps.heightInit = props[1];
    startProps.depthInit = props[2];
    return startProps;
}

// function getNewProps(tovarElement){

//     let newProps = Object.create(null);
//     newProps.widthNew = Math.round(tovarElement.GabMax.x);
//     newProps.heightNew = Math.round(tovarElement.GabMax.y);
//     newProps.depthNew = Math.round(tovarElement.GabMax.z);
//     return newProps;
// }

function getNewProps(tovarElement){

    let newProps = Object.create(null);
    newProps.widthNew = Math.round(tovarElement.GSize.x).toFixed();
    newProps.heightNew = Math.round(tovarElement.GSize.y).toFixed();
    newProps.depthNew = Math.round(tovarElement.GSize.z).toFixed();
    return newProps;
}
