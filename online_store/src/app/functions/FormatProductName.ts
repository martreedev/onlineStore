function formatName(name:string){
    let newString=name;
    if (name.length > 48){
        newString = name.slice(0,48)
        newString = `${newString}...`
    }
    return newString;

}export{formatName}