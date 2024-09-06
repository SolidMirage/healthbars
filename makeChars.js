let characters = {};
let numCharacters = 0;
let numId = 0;
localStorage.setItem('listOfCharacters', JSON.stringify(characters));
localStorage.setItem('numCharacters', numCharacters);


function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
function changeHealth(ele){
    let currChar = ele.parentElement;
    console.log(currChar.id);
    let currHealth = document.getElementById("currHealthNum"+currChar.id).value;
    let maxHealth = document.getElementById("maxHealthNum"+currChar.id).value;
    let healthRatio = (currHealth/maxHealth)*100;
    //console.log(currChar.id);
    //console.log(characters[currChar.id]);
    characters[currChar.id].maxHealth = maxHealth;
    characters[currChar.id].currHealth = currHealth;
    // characters[currChar.id].health = healthRatio;
    // localStorage.setItem('health'+currChar.id,healthRatio);
    localStorage.setItem(currChar.id+'currHealth', currHealth);
    localStorage.setItem(currChar.id+'maxHealth', maxHealth);
    document.getElementById('healthBar'+currChar.id).style.width=""+(healthRatio)+"%";
    // //console.log(ele.id);
    // let solariMaxHealth = document.getElementById('max-health').value;
    // let solariCurrHealth = document.getElementById('curr-health').value;
    // let healthRatio = (solariCurrHealth/solariMaxHealth)*100;
    // let healthLedOn = Math.round(map_range(healthRatio, 0, 100, 0, 64));
    // localStorage.setItem('solari-health', healthRatio);
    // //console.log(healthLedOn);
    // document.getElementById('solari-health-bar').style.width= ""+(healthRatio)+"%";
}

function changeCondition(ele){
    console.log('whee changing condition');
    let currChar = ele.parentElement.parentElement;
    let currCondition = ele.value;
    if(currCondition != ''){
        ele.style.backgroundColor = 'orange';
    }
    else{
        // ele.style = 'background-color: none;';
        ele.style.backgroundColor = 'white';
    }
    characters[currChar.id].condition = currCondition;
    localStorage.setItem(currChar.id+'condition', currCondition);
}

let charDiv = document.getElementById('character-list');

function deleteCharacter(){
    let charToDelete = document.getElementById('deleteList').value;
    //console.log('char to delete: ' + charToDelete);
    document.getElementById(charToDelete).remove();
    delete characters[charToDelete];
    numCharacters--;
    localStorage.setItem('listOfCharacters', JSON.stringify(characters));
    localStorage.setItem('numCharacters', numCharacters);
    localStorage.removeItem(charToDelete+'health');
    var selectobject = document.getElementById("deleteList");
    for (var i=0; i<selectobject.length; i++) {
        if (selectobject.options[i].value == charToDelete)
            selectobject.remove(i);
    }
    //console.log(characters);
}

function addCharacter(){
    let newName = document.getElementById('newName').value;
    document.getElementById('newName').value = '';
    let currChar = document.createElement("div");
    currChar.id="char" + numId;
    let currHealthLabel = document.createElement("label");
    currHealthLabel.innerText = newName + " Current Health";
    currHealthLabel.id="currHealthLabel"+numId;
    let currHealthNum = document.createElement("input");
    currHealthNum.className = "curr-health-input";
    currHealthNum.id="currHealthNum"+"char"+numId;
    currHealthNum.type="number";
    currHealthNum.value=50;
    currHealthNum.min=0;
    let maxHealthLabel = document.createElement("label");
    maxHealthLabel.innerText = newName + " Max Health";
    maxHealthLabel.id="maxHealthLabel"+numId;
    let maxHealthNum = document.createElement("input");
    maxHealthNum.className = "max-health-input";
    maxHealthNum.id="maxHealthNum"+"char" +numId;
    maxHealthNum.type="number";
    maxHealthNum.value=50;
    maxHealthNum.min=0;

    let healthBarGroup = document.createElement("div");
    healthBarGroup.className = "health-bar-group";
    healthBarGroup.id = "healthBarGroup" + "char"+ numId;
    let healthBarParent = document.createElement("div");
    healthBarParent.className = "health-bar-parent";
    healthBarParent.id = "healthBarParent" + "char" + numId;
    let healthBar = document.createElement("div");
    healthBar.className = "health-bar";
    healthBar.id = "healthBar" + "char" + numId;
    healthBarParent.append(healthBar);
    healthBarGroup.append(healthBarParent);
    let breakElement = document.createElement("br");
    currChar.append(currHealthLabel);
    currChar.append(breakElement.cloneNode(true));
    currChar.append(currHealthNum);
    currChar.append(breakElement.cloneNode(true));
    currChar.append(maxHealthLabel);
    currChar.append(breakElement.cloneNode(true));
    currChar.append(maxHealthNum);
    currChar.append(breakElement.cloneNode(true));
    currChar.append(healthBarGroup);
    // currChar.append(breakElement.cloneNode(true));
    currHealthNum.setAttribute("onchange","changeHealth(this)");
    maxHealthNum.setAttribute("onchange","changeHealth(this)");

    let conditionGroup = document.createElement("div");
    conditionGroup.className = 'condition-group';
    let conditionLabel = document.createElement("label");
    conditionLabel.className = 'condition-label';
    conditionLabel.innerText = newName + ' Condition(s): ';
    let conditionText = document.createElement("input");
    conditionText.className = 'condition-text';
    conditionText.id = 'conditionText' + 'char' + numId;
    conditionText.setAttribute("onchange","changeCondition(this)");
    conditionGroup.append(conditionLabel, conditionText);
    currChar.append(conditionGroup);
    charDiv.append(currChar);
    
    let charJSON = {
        name: newName,
        currHealth: 50,
        maxHealth: 50,
        condition: 'None'
    }
    characters['char'+numId]=charJSON;
    let deleteList = document.getElementById('deleteList');
    let newChar = document.createElement('option');
    newChar.value = 'char'+numId;
    newChar.innerHTML = newName;
    deleteList.append(newChar);
    numCharacters++;
    numId++;
    changeHealth(currHealthNum);
    changeCondition(conditionText);
    localStorage.setItem('listOfCharacters', JSON.stringify(characters));
    localStorage.setItem('numCharacters', numCharacters);
    //console.log(characters);
}