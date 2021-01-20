function main() {
    //////////Program Element Variables
    const interfaceFrame = document.querySelector(`#interfaceFrame`);
    const box = document.createElement(`div`);
    //////////Program State Variables
    //Maintains (or keeps track of) the active elements.
    let active = {divs:[],buttons:[],paragraphs:[],fields:[]};
    let allParas = 0;
    let allButtons = 0;
    let paraClasses = 0;
    //////////Utility Functions
    //Clears the interface of content and resets certain state-related variables to zero.
    function clear() {
        box.innerHTML = ``;
        active = {divs:[],buttons:[],paragraphs:[],fields:[]};
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
    //Creates a new button.
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
        /////Clearing contents from previous interface.
        clear();
        /////Creates an object in local storage.
        createMaster();
        /////Creating the elements.
        createBox();
        createH2(`What Would You Like To Do?`);
        createDiv(`typical`);
        createButton(`Add New Delivery`);
        createButton(`View All Deliveries`);
        /////Assembling the elements.
        active.divs[0].e.appendChild(active.buttons[0].e);
        active.divs[0].e.appendChild(active.buttons[1].e);
        /////Assigning event listeners to the relevant elements.
        active.buttons[0].e.addEventListener(`click`, interfaceOne);
        active.buttons[1].e.addEventListener(`click`, interfaceTwo);
    }
    //Interface One; the interface that is created when the "Add New Delivery" button is selected.
    function interfaceOne() {
        /////Clearing contents from previous interface.
        clear();
        /////Creating and assembling the elements.
        createH2(`Add New Delivery`);
        //Contains the text to be used by the appropriate paragraph and field elements.
        const paras = [`First Name: `,`Last Name: `,`Address: `,`Apt/PMB: `,`City: `,`State: `,`Zip Code: `];
        const flds = [`Enter first name here`,`Enter last name here`,`Enter street address here`,`Enter apartment or PMB number here`,`Enter city here`,`Enter state here`,`Enter zip code here`]
        //Loops through two arrays above, creating and populating elements with the correct text content.
        for (let i = 0; i < paras.length; i++) {
            createDiv(`typical`);
            createPara(paras[i]);
            createField(flds[i]);
            active.divs[i].e.appendChild(active.paragraphs[i].e);
            active.divs[i].e.appendChild(active.fields[i].e);
        }
        //Creating both of the "Add New" and "Previous Screen" buttons.
        createDiv(`typical`);
        createButton(`Add New`);
        createButton(`Previous Screen`);
        active.divs[7].e.appendChild(active.buttons[0].e);
        active.divs[7].e.appendChild(active.buttons[1].e);
        //Assigning event listeners to the relevant button elements.
        active.buttons[0].e.addEventListener(`click`, addNew);
        active.buttons[1].e.addEventListener(`click`, interfaceZero);
    }
    //Interface Two; allows the user to view all of the current deliveries.
    function interfaceTwo() {
        /////Clearing contents from previous interface.
        clear();
        /////Accessing the "master" objecting local storage.
        const retrievedMaster = localStorage.getItem(`master`);
        const retrievedMasterParsed = JSON.parse(retrievedMaster);
        /////Creating and assembling the elements.
        let currentSave;
        createH2(`Current Deliveries`);
        for (let i = 0; i < retrievedMasterParsed.length; i++) {
            //Captures the current paraClasses value, for reference on a per-loop basis.
            currentSave = paraClasses;
            createDiv(`atypical`);
            //Loops through each item housed in the local storage object.
            for (let z = 0; z < retrievedMasterParsed[i].length; z++) {
                //Creates the needed paragraph elements, and populates each with the respective data from local storage.
                createPara(`${(retrievedMasterParsed[i][z] === ``) ? `N/A` : retrievedMasterParsed[i][z]}`,true);
                active.paragraphs[allParas].e.classList.add(`c${paraClasses}`);
                active.divs[i].e.appendChild(active.paragraphs[allParas++].e);
            }
            //Creates the "Save Changes" and "Delete" buttons for each delivery entry.
            createButton(`Save Changes`);
            createButton(`Delete`);
            //Attaches an event listener to the "Save Changes" button.
            active.divs[i].e.appendChild(active.buttons[allButtons].e)
            active.buttons[allButtons++].e.addEventListener(`click`, function() {
                //Captures all of the paragraph elements within the appropriate delivery entry, and pushes the content to a temporary array; which then replaces the saved contents inside local storage and saves the data.
                const pElems = document.querySelectorAll(`.c${currentSave}`);
                let obj = [];
                for (let q = 0; q < pElems.length; q++) {
                    obj.push(pElems[q].textContent);
                }
                retrievedMasterParsed[i] = obj;
                localStorage.setItem("master", JSON.stringify(retrievedMasterParsed));
            });
            active.divs[i].e.appendChild(active.buttons[allButtons].e);
            //Attaches an event listener to the "Delete" button.
            active.buttons[allButtons++].e.addEventListener(`click`, function() {
                //Creates a new "master" object for local storage, and excludes/removes the appropriate delivery entry from the interface stored object.
                let newMaster = [];
                for (let i = 0; i < retrievedMasterParsed.length; i++) {
                    if (i !== currentSave) {
                        newMaster.push(retrievedMasterParsed[i]);
                    }
                }
                localStorage.setItem("master", JSON.stringify(newMaster));
                active.buttons[currentSave].e.parentNode.parentNode.removeChild(this.parentNode);
            });
            //Keeps tracks of which class of paragraphs is being accessed.
            paraClasses++;
        }
        /////Adds the "Previous Screen" button and attaches an event listener to it that redraws the opening interface.
        createButton(`Previous Screen`);
        active.buttons[allButtons].e.addEventListener(`click`, interfaceZero);
    }
    //Creating the first screen.
    interfaceZero();
}
main();
