function main() {
    //////////Main Program Variables
    const interfaceFrame = document.querySelector(`#interfaceFrame`);
    const box = document.createElement(`div`);
    //////////Program State Variables
    //Maintains (or keeps track of) the active elements.
    let active = {divs:[],buttons:[],paragraphs:[],fields:[]};
    let allDivs = 0;
    let allParas = 0;
    let allButtons = 0;
    let paraClasses = 0;
    //////////Utility Functions
    //Clears the interface of content and resets certain state-related variables to zero.
    function clear() {
        box.innerHTML = ``;
        active = {divs:[],buttons:[],paragraphs:[],fields:[]};
        allDivs = 0;
        allParas = 0;
        allButtons = 0;
        paraClasses = 0;
    }
    //Creates and stores an object in the user's local storage.
    function createMaster() {
        if (localStorage.getItem("master") === null) {
            const masterTemplate = [];
            localStorage.setItem("master", JSON.stringify(masterTemplate));
          }
    }
    //Adds a new delivery to the "master" object in local storage.
    function addNew() {
        const retrievedMaster = localStorage.getItem(`master`);
        const retrievedMasterParsed = JSON.parse(retrievedMaster);
        retrievedMasterParsed.push([
            active.fields[0].e.value,
            active.fields[1].e.value,
            active.fields[2].e.value,
            active.fields[3].e.value,
            active.fields[4].e.value,
            active.fields[5].e.value,
            active.fields[6].e.value,
        ]);
        localStorage.setItem("master", JSON.stringify(retrievedMasterParsed));
    }
    //////////Element Creation Functions
    //Creates the HTML div element wherein inputs and outputs are displayed.
    function createBox() {
        box.id = `box`;
        interfaceFrame.appendChild(box);
    }
    //Creates a div element.
    function createDiv(cls) {
        const elem = document.createElement(`div`);
        elem.classList.add(`${cls}`);
        active.divs.push({
            e: elem
        });
        box.appendChild(elem);
    }
    //Creates a H2 element.
    function createH2(text) {
        const elem = document.createElement(`h2`);
        elem.innerHTML = `${text}`;
        box.appendChild(elem);
    }
    //Creates the "Add New Delivery" button.
    function createButton(inrTxt) {
        const elem = document.createElement(`button`);
        elem.classList.add(`buttons`);
        elem.innerText = `${inrTxt}`;
        active.buttons.push({
            e: elem
        });
        box.appendChild(elem);
    }
    //Creates an paragraph field.
    function createPara(inrTxt,t = false) {
        const elem = document.createElement(`p`);
        elem.innerText = `${inrTxt}`;
        elem.contentEditable = t;
        active.paragraphs.push({
            e: elem
        });
    }
    //Creates an input field.
    function createField(inrTxt) {
        const elem = document.createElement(`input`);
        elem.placeholder = `${inrTxt}`;
        active.fields.push({
            e: elem
        });
    }
    //////////Interface Functions
    //Interface Zero; the first interface shown when the program is loaded.
    function interfaceZero() {
        //Clearing contents from previous interface.
        clear();
        //Creates an object in local storage.
        createMaster();
        //Creating the elements.
        createBox();
        createH2(`What Would You Like To Do?`);
        createDiv(`typical`);
        createButton(`Add New Delivery`);
        createButton(`View All Deliveries`);
        //Assembling the elements.
        active.divs[0].e.appendChild(active.buttons[0].e);
        active.divs[0].e.appendChild(active.buttons[1].e);
        //Assigning event listeners to the relevant elements.
        active.buttons[0].e.addEventListener(`click`, interfaceOne);
        active.buttons[1].e.addEventListener(`click`, interfaceTwo);
    }
    //Interface One; the interface that is created when the "Add New" button is selected.
    function interfaceOne() {
        //Clearing contents from previous interface.
        clear();
        //Creating the elements.
        createH2(`Add New Delivery`);
        createDiv(`typical`);
        createPara(`First Name: `);
        createField(`Enter first name here`);
        createDiv(`typical`);
        createPara(`Last Name: `);
        createField(`Enter last name here`);
        createDiv(`typical`);
        createPara(`Address: `);
        createField(`Enter street address here`);
        createDiv(`typical`);
        createPara(`Apt/PMB: `);
        createField(`Enter apartment or PMB number here`);
        createDiv(`typical`);
        createPara(`City: `);
        createField(`Enter city here`);
        createDiv(`typical`);
        createPara(`State: `);
        createField(`Enter state here`);
        createDiv(`typical`);
        createPara(`Zip Code: `);
        createField(`Enter zip code here`);
        createDiv(`typical`);
        createButton(`Add New`);
        createButton(`Previous Screen`);
        //Assembling the elements.
        active.divs[0].e.appendChild(active.paragraphs[0].e);
        active.divs[0].e.appendChild(active.fields[0].e);
        active.divs[1].e.appendChild(active.paragraphs[1].e);
        active.divs[1].e.appendChild(active.fields[1].e);
        active.divs[2].e.appendChild(active.paragraphs[2].e);
        active.divs[2].e.appendChild(active.fields[2].e);
        active.divs[3].e.appendChild(active.paragraphs[3].e);
        active.divs[3].e.appendChild(active.fields[3].e);
        active.divs[4].e.appendChild(active.paragraphs[4].e);
        active.divs[4].e.appendChild(active.fields[4].e);
        active.divs[5].e.appendChild(active.paragraphs[5].e);
        active.divs[5].e.appendChild(active.fields[5].e);
        active.divs[6].e.appendChild(active.paragraphs[6].e);
        active.divs[6].e.appendChild(active.fields[6].e);
        active.divs[7].e.appendChild(active.buttons[0].e);
        active.divs[7].e.appendChild(active.buttons[1].e);
        //Assigning event listeners to the relevant elements.
        active.buttons[0].e.addEventListener(`click`, addNew);
        active.buttons[1].e.addEventListener(`click`, interfaceZero);
    }
    //Interface Two; allows the user to view all of the current deliveries.
    function interfaceTwo() {
        //Clearing contents from previous interface.
        clear();
        //Accessing the "master" objecting local storage.
        const retrievedMaster = localStorage.getItem(`master`);
        const retrievedMasterParsed = JSON.parse(retrievedMaster);
        //Creating and assembling the elements.
        let currentSave;
        createH2(`Current Deliveries`);
        for (let i = 0; i < retrievedMasterParsed.length; i++) {
            currentSave = paraClasses;
            createDiv(`atypical`);
            for (let z = 0; z < retrievedMasterParsed[i].length; z++) {
                createPara(`${(retrievedMasterParsed[i][z] === ``) ? `N/A` : retrievedMasterParsed[i][z]}`,true);
                active.paragraphs[allParas].e.classList.add(`c${paraClasses}`);
                active.divs[i].e.appendChild(active.paragraphs[allParas++].e);
            }
            createButton(`Save Changes`);
            createButton(`Delete`);
            active.divs[i].e.appendChild(active.buttons[allButtons].e)
            active.buttons[allButtons++].e.addEventListener(`click`, function() {
                const pElems = document.querySelectorAll(`.c${currentSave}`);
                let obj = [];
                for (let q = 0; q < pElems.length; q++) {
                    obj.push(pElems[q].textContent);
                }
                retrievedMasterParsed[i] = obj;
                localStorage.setItem("master", JSON.stringify(retrievedMasterParsed));
            });
            active.divs[i].e.appendChild(active.buttons[allButtons].e);
            active.buttons[allButtons++].e.addEventListener(`click`, function() {
                let newMaster = [];
                for (let i = 0; i < retrievedMasterParsed.length; i++) {
                    if (i !== currentSave) {
                        newMaster.push(retrievedMasterParsed[i]);
                    }
                }
                localStorage.setItem("master", JSON.stringify(newMaster));
                active.buttons[currentSave].e.parentNode.parentNode.removeChild(this.parentNode);
            });
            paraClasses++;
        }
        createButton(`Previous Screen`);
        active.buttons[allButtons].e.addEventListener(`click`, interfaceZero);
    }
    //Calling Interface Two through an external function.
    function callingInterfaceTwo() {
        interfaceTwo();
    }
    //Creating the first screen.
    interfaceZero();
}
main();
