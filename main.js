// loadPrayersFromScript('DeclarePrayersConsts');
// loadPrayersFromScript('DeclarePrayersArray');
// loadPrayersFromScript('DeclareGospelVespersArray');
// loadPrayersFromScript('DeclareGospelDawnArray');
// loadPrayersFromScript('DeclareStPaulArray');
// loadPrayersFromScript('DeclareKatholikonArray');
// loadPrayersFromScript('DeclarePraxisArray');
// loadPrayersFromScript('DeclareSynaxariumArray');
// loadPrayersFromScript('DeclareGospelMassArray');
// loadPrayersFromScript('DeclareGospelNightArray');
// loadPrayersFromScript('DeclareButtons');
// loadPrayersFromScript('DeclarePropheciesDawnArray');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const copticReadingsDates = getCopticReadingsDates();
//this is temporary in order to change the date manually by entering a date in the text box
document
    .getElementById("elID")
    .addEventListener("keypress", (e) => {
    let el = e.target;
    if (e.key == "Enter" && el.value.startsWith("Date=")) {
        changeDay(el.value.split("Date=")[1]);
    }
});
document
    .getElementById("datePicker")
    .addEventListener("change", (e) => {
    let el = e.target;
    console.log("date value = ", el.value.toString());
    changeDay(el.value.toString());
});
toggleDevBtn.addEventListener("click", () => openDev(toggleDevBtn));
function addOrRemoveLanguage(el) {
    let lang;
    lang = el.id.split("add")[1]; //we remove 'add' from the element id, which gives us the letters of the language to be added or removed, eg.: 'AR', 'EN', etc.
    if (allLanguages.indexOf(lang) != -1) {
        allLanguages.splice(allLanguages.indexOf(lang), 1);
        el.innerText = el.innerText.replace("Remove", "Add");
    }
    else {
        allLanguages.push(lang);
        el.innerText = el.innerText.replace("Add", "Remove");
    }
}
setCopticDates();
function setCopticDates(today) {
    today ? (todayDate = today) : (todayDate = new Date());
    copticDate = convertGregorianDateToCopticDate(todayDate);
    season = copticDate;
    copticMonth = copticDate.slice(2, 4);
    copticReadingsDate = setCopticReadingsDate(copticDate);
    copticDay = copticDate.slice(0, 2);
    if (copticReadingsDate.includes('GreatLent')) {
        //if we are a Sunday or a Saturday, the Gospel Response is different than in week days
        todayDate.getDay() == 0 || todayDate.getDay() == 6 ? GospelResponse = 'GreatLentSundays' : GospelResponse = 'GreatLent#';
    }
    else if (Number(copticDay) == 29) {
        GospelResponse = '2900';
    }
    else if (Number(copticMonth) == 12 && Number(copticDay) < 16) {
        //We are during the month of Misra where the Virigin's fast falls 
        GospelResponse = '0112';
    }
    else {
        GospelResponse = copticDate;
    }
    ;
    //The PsalmResponse is the same as the GospelResponse	
    PsalmResponse = GospelResponse;
    todayString =
        todayDate.getDate() +
            "-" +
            todayDate.getMonth() +
            "-" +
            todayDate.getFullYear();
    showDates();
}
;
function changeDay(date = undefined, next = true, days = 1) {
    let currentDate = todayDate.getTime();
    //let input = document.getElementById('elID') as HTMLInputElement
    if (date) {
        currentDate = new Date(date).getTime();
        todayDate.setTime(currentDate);
        console.log(todayDate);
    }
    else {
        if (next) {
            todayDate.setTime(currentDate + (days * calendarDay));
        }
        else if (!next) {
            todayDate.setTime(currentDate - (days * calendarDay));
        }
    }
    setCopticDates(todayDate);
    return todayDate;
}
;
function showDates() {
    let showDates = document.getElementById("showCurrentDate");
    showDates.innerText =
        "Current gregorian date is " +
            todayDate.toString() +
            " and the coptic date is " +
            copticDay +
            "/" +
            copticMonth +
            ". And the copticReadingsDate =" +
            copticReadingsDate;
}
;
//not used anymore since we are now using array instead of hidden html
let appendExractedHtml = () => {
    //parseHtmlFile('htmlPrayers.html', 'hiddenPrayers')
    //parseHtmlFile('htmlReadings.html', 'hiddenReadings');
};
function parseHtmlFile(htmlFileName, elID) {
    return __awaiter(this, void 0, void 0, function* () {
        //not used anymore since we are now using array instead of hidden html
        let resp = yield fetch(htmlFileName);
        let el = document.getElementById(elID);
        let text = yield resp.text();
        let parser = new DOMParser();
        let doc = parser.parseFromString(text, "text/html");
        let divs = doc.querySelectorAll("div");
        for (let i = 1; i < divs.length; i++) {
            el.appendChild(divs[i]);
        }
        console.log("divs " + htmlFileName + " = ", divs);
        return divs;
    });
}
;
//not used anymore since we are now using array instead of hidden html
document.addEventListener("DOMContentLoaded", appendExractedHtml);
autoRunOnLoad();
function autoRunOnLoad() {
    showChildButtonsOrPrayers(btnMain, true);
    //appendRepeatable('Test');
    setCopticDates();
    allDivs = document.querySelectorAll("div");
    console.log("all nodes count = ", document.querySelectorAll("*").length);
    DetectFingerSwipe();
    //copticReadingsDate = '0101';
    //registerServiceWorker()
    //PWA();
}
;
//this will be e, it was to test the performance when the text was retrieved from hidden html elements instead from an array
function appendRepeatable(elID) {
    //this is a temporary function in order to test the performance with a big number of loaded elements
    let repeat = document.getElementById(elID);
    let hidden = document.getElementById("sourcesDiv");
    let input = document.getElementById("elID");
    input.value = repeat.getAttribute("id") + "#";
    let newDiv;
    for (let i = 1; i < 1000; i++) {
        newDiv = document.createElement("DIV");
        newDiv.innerHTML = repeat.innerHTML;
        newDiv.setAttribute("id", repeat.getAttribute("id") +
            String(i) +
            "Date=" +
            copticReadingsDate);
        //let ids: string[] = ["AR", "TitleAR", "FR","TitleFR", "COP", "TitleCOP", "CA", "TitleCA"]
        for (let x = 0; x < newDiv.children.length; x++) {
            let child = newDiv.children[x];
            if (child.getAttribute("id").includes("Title")) {
                child.innerText =
                    child.innerText +
                        newDiv.getAttribute("id") +
                        ": " +
                        "This is the Title of the Prayer which has been selected either through the input box or the dropdown list or the clickable buttons";
            }
            else {
                let newP = document.createElement("p");
                newP.innerText =
                    newDiv.getAttribute("id") +
                        ": this is a test of the core text in the relevant language";
                child.insertBefore(newP, child.children[0]);
            }
            child.setAttribute("id", newDiv.getAttribute("id") +
                child
                    .getAttribute("id")
                    .slice(13, child.getAttribute("id").length));
            child.classList.add("Repeatable");
        }
        hidden.appendChild(newDiv);
    }
}
;
// getting a prayer from an ID directly provided in the text input
function getPrayerFromInputBox() {
    let input = document.getElementById("elID");
    showPrayers([input.value], ReadingsArray, readingsLanguages);
}
;
function showPrayers(prayers, prayersArray, languages) {
    if (prayers[0] == "") {
        //getting the selected option in the list if there is no id passed to the function
        let list = document.getElementById("Menu");
        prayers.push(list.selectedOptions[0].value);
    }
    else if (prayers[0] == "getfromtextbox") {
        //this will be e, it was just for being able to retrieve a prayer by entering its id in the text box
        let input = document.getElementById("elID");
        prayers[0] = input.value;
    }
    //we empty the subdivs of the containerDiv before populating them with the new text
    containerDiv.innerHTML = "";
    let rightTitlesDiv = rightSideBar.querySelector('#sideBarBtns'); //this is the right side bar where the titles are displayed for navigation purposes
    rightSideBar.querySelector('#sideBarBtns').innerHTML = ''; //we empty the right side bar from any text
    //looping the 'prayers' property of the button (this property is a sequence of prayers ids) and for each 'prayer' in the 'prayers' array, we will check if there is an identic prayer id in the prayersArray (note that prayersArray is the array of text containing all the text in which the button may find its 'prayers'. There is an array containing all the Praxis readings, another one containing all the Gospel readings, another one containing all the prayers of the Mass, etc. The button specifies in which prayersArray its 'prayers' may be found)
    prayers.map((prayerID) => retrieveButtonPrayersFromItsPrayersArray(prayersArray, prayerID, languages, rightTitlesDiv));
    closeSideBar(leftSideBar);
}
function retrieveButtonPrayersFromItsPrayersArray(btnPrayersArray, prayerID, languagesArray, rightTitlesDiv) {
    let date, idsArray = [], titlesArray = [];
    if (prayerID.includes('Date=0000')) {
        //if the id of the prayer include the value 'Date=0000' this tells us that this prayer is not linked to a specific day in the coptic calendar. We will not add the copticReadingsDate to the prayerID before looking for it in the btnPrayresArray
        date = '';
    }
    else if (prayerID.includes('GospelResponse')) {
        //this is the Gospel response, we add a date according to the season or feast
        date = 'Date=' + GospelResponse; //we will set the GospelResponse variable so that it matches the season/feast (eg.: 'Resurrection", 'Nativity', 'Baptism', etc.)
    }
    else if (prayerID.includes('PsalmResponse')) {
        //we do the same as Gospel response above
        date = 'Date=' + PsalmResponse; //we will do the same for the PsalmResponse variable as for the GospelResponse variable
    }
    else {
        date = 'Date=' + copticReadingsDate; //this is the default case where the date equals the copticReadingsDate. This works for most of the occasions.
    }
    ;
    idsArray.push(prayerID + date + "Title", prayerID + date); //we add 2 versions of the prayerID to the idsArray: the first version ends with 'Title', the second version does not end with 'Title' (this gives us an ids array like this ['aPrayerIDDate=0101Title', 'aPrayerIDDate=0101']). We will look for each version of the prayer id in the PrayersArray
    retrieve(idsArray);
    function retrieve(idsArray) {
        let firstElement, row, el, actorClass = undefined, text, lang;
        btnPrayersArray.map((p) => {
            //we take each prayer (p) in the PrayersArray attached to the button in its 'PrayersArray' property, then we clone it in a new variable. Note that each prayer (p) is itself an array containing the prayerID as first element, and the text of the prayer in each language: p is constructed like ['prayerID', 'text in AR, 'text in FR', 'text in COP'], etc.
            let prayers = [...p];
            firstElement = prayers[0]; //this is the id by which we will find the text of the prayer in the PrayersArray attached to the button as a property
            if (firstElement.includes("Assembly")) {
                actorClass = "Assembly";
                firstElement = firstElement.replace("Assembly", ""); //we remove the word Assembly beacuse PrayersArray does not include this information about the color of the prayer. We add a class in order to reflect that this prayer is chanted by the Assembly, which will allow us to set the background color and other css of the html element accordingly. We do the same for 'Priest' and 'Diacon'.
            }
            else if (firstElement.includes("Priest")) {
                actorClass = "Priest";
                firstElement = firstElement.replace("Priest", "");
            }
            else if (firstElement.includes("Diacon")) {
                actorClass = "Diacon";
                firstElement = firstElement.replace("Diacon", "");
            }
            ;
            if (firstElement == idsArray[0] ||
                firstElement == idsArray[1]) {
                // if we find an array which first element equals firstElement (i.e., we find an Array constructed according to this model = ['idsArray[0] || idsArray[1]', 'prayer text in Arabic', 'prayer text in French', ' prayer text in English'], note that the languages and their sequence is not the same in all the PrayersArrays declared. The languages depends on the source from which the text was retrieved), we create a newDiv to represent the text in this subArray
                if (firstElement == idsArray[0]) {
                    //this means that it is the title of the prayer. We add it to the titlesArray in order to show it in the right side bar later on
                    titlesArray.push(prayers);
                }
                ;
                row = document.createElement("div");
                row.classList.add("TargetRow"); //we add 'TargetRow' class to this div
                row.id = prayers[0]; //we give it as id the 'prayer id'
                if (actorClass) {
                    row.classList.add(actorClass);
                    actorClass = undefined; //we reset it to avoid that it remains unchanged in the loop
                }
                for (let x = 1; x < prayers.length; x++) {
                    lang = languagesArray[x - 1]; //we select the language in the button's langaugesArray, starting from 0 not from 1, that's why we start from x-1.
                    //we check that the language is included in the allLanguages array, i.e. if it has not been removed by the user, which means that he does not want this language to be displayed. If the language is not removed, we retrieve the text in this language. otherwise we will not retrieve its text.
                    if (allLanguages.indexOf(lang) != -1) {
                        el = document.createElement("p"); //we create a new <p></p> element for the text of each language in the 'prayer' array (the 'prayer' array is constructed like ['prayer id', 'text in AR, 'text in FR', ' text in COP', 'text in Language', etc.])
                        if (firstElement.includes("Title")) {
                            //this means that the 'prayer' array includes the titles of the prayer since its first element contains the word 'Title'. We add a class 'Title' to the newly created p element.
                            el.classList.add("Title");
                            row.classList.add("TargetRowTitle"); //we also add a specific class to the <div></div> to which the <p></p> elements will be appended
                        }
                        else {
                            //The 'prayer' array includes a paragraph of ordinary core text of the array. We give it 'PrayerText' as class
                            el.classList.add("PrayerText");
                        }
                        el.classList.add(lang); //we add the language as a class in order to be able to set the font
                        el.dataset.lang = lang;
                        text = prayers[x];
                        el.textContent = text; //x starts from 1 beacuse prayer[0] is the prayer id
                        el.addEventListener('dblclick', (event) => toggleClassListForAllChildrenOFAnElement(event, 'fullScreenText')); //adding a double click eventListner that amplifies the text size of the chosen language;
                        row.appendChild(el); //the row which is a <div></div>, will encapsulate a <p></p> element for each language in the 'prayer' array (i.e., it will have as many <p></p> elements as the number of elements in the 'prayer' array)
                    }
                    else {
                        console.log("The language is not one of the languages set by the user: ", lang);
                    }
                    if (languagesArray[0] == "COP") {
                        row.style.flexDirection = "row"; //this is in order to show the Arabic text on the right hand, followed by Coptic text in Arabic characters, etc, ie. [AR, CA, FR, COP]. If we keep their original order as in the languagesArray (which is  [COP, FR, CA, AR]), the arabic paragraph will be displayed in the first column starting from left to right, and the coptic paragraph will be on the last column from left to right
                    }
                    containerDiv.appendChild(row);
                }
            }
            ;
        });
    }
    ;
    showTitlesInRightSideBar(titlesArray, rightTitlesDiv);
}
;
function showTitlesInRightSideBar(titlesArray, rightTitlesDiv) {
    //this function shows the titles in the right side Bar
    let newDiv, parag, text = '', suffix = 'SideBar', id;
    titlesArray.map(t => addTitle(t));
    function addTitle(t) {
        id = t[0];
        newDiv = document.createElement('div');
        newDiv.id = id + suffix;
        newDiv.classList.add(id + suffix);
        //newDiv.addEventListener('click',
        //	() => setFocus(id));
        for (let i = 1; i < t.length; i++) {
            if (t[i]) {
                text = text + ' / ' + t[i];
            }
        }
        ;
        parag = document.createElement('p');
        parag.innerText = text;
        parag.classList.add('sideTitle');
        newDiv.appendChild(parag);
        parag.addEventListener('click', () => setFocus(id));
        /* 		if (!rightSideBar) {
                    rightSideBar = buildSideBar('rightSideBar')
                } */
        rightTitlesDiv.appendChild(newDiv);
        text = '';
    }
    ;
    function setFocus(id) {
        for (let i = 1; i < containerDiv.children.length; i++) {
            if (containerDiv.children[i].id == id) {
                let target = containerDiv.children[i];
                target.focus();
                return;
            }
        }
    }
    ;
}
;
//Deprecated - it was used when we were retrieving the text from hidden html elements
function showPrayerInAllLanguagesForAGivenID(prayerID, langArray) {
    let date = "Date=" + copticReadingsDate;
    if (prayerID.includes("Date=0000")) {
        //this is the case where the prayer is not linked to a specific period or event
        date = "";
    }
    //takes the ID of an htmelement, adds the word "Title" to it and one of the languages key letters (eg.: AR, FR, etc) to the ID (which gives an ID like "MesseStCyrilReconciliationTitleAR"), and retrieves the text of the html elment. Then repeats the same thing without adding the word "Title" (wich means that the ID is like "MesseStCyrilReconciliationAR")
    let idsArray = new Array();
    if (!langArray) {
        langArray = allLanguages;
    }
    langArray.map((l) => {
        idsArray.push(prayerID + date + "Title" + "lang=" + l); // we add the id with the word "Title" and the language letters at the end of the IdsArray
        idsArray.push(prayerID + date + "lang=" + l); // we add the id without the word but with the language letters at the end of the idsArray
    });
    console.log("idsArray=", idsArray);
    idsArray.map((id) => getTextAndAppendElementToMainDiv(id));
    // getTextAndAppendElementToMainDiv(prayerID) // we think this is useless, to be checked
}
;
//e - it was used when we were retrieving the text from hidden html elements
function getTextAndAppendElementToMainDiv(elID) {
    let prayer;
    //we get the last 2 or 3 letters of the element ID, those characters represent  the language letters (eg.: AR, FR, COP etc)
    let lang = elID.split("lang=")[1];
    if (elID.startsWith("creatHtml")) {
        //this is a prayer which text is retrieved not from a hidden html element but from a constant delcared in the Readings array
        prayer = document.createElement("div");
        prayer.innerText = Readings[elID.split("Date=")[0]];
    }
    else {
        prayer = getPrayerText(elID); // getting a new div having the the html innerHTML of the hidden div identified by its id = elID. If no such hidden div is found by the elID, we get 'undefined'
        if (typeof prayer === "undefined") {
            console.log("no html element with the provided ID:  " +
                elID +
                " returned undefined");
            return;
        }
        else if (elID.includes("Title")) {
            //we add a class to the title part of the prayer in order to CSS it
            prayer.classList.add("Title");
        }
        else {
            //we do the same for the core text of the prayer
            prayer.classList.add("PrayerText");
        }
        //we add the language as a class to the class list
        prayer.classList.add(lang);
        //we also use the language letters (AR, FR, COP, etc.) to identifiy the element to which the "prayer" child will be appended
        if (document.getElementById(containerDiv.id + lang)) {
            prayer.setAttribute("id", elID);
            document
                .getElementById(containerDiv.id + lang)
                .appendChild(prayer);
        }
    }
}
;
//e - it was used when we were retrieving the text from hidden html elements
function getPrayerText(elID) {
    let id = elID.split("lang=")[0] + elID.split("lang=")[1];
    //gets the text of a given prayer by retrieving the html innerHTML of the specified html element
    if (document.getElementById(id)) {
        //creating a new div that we will append to the DOM
        let newDiv = document.createElement("div");
        //populating the newDiv innerHTML with the innerHTML of a hidden div which id = elID
        newDiv.innerHTML = document.getElementById(id).innerHTML;
        return newDiv;
    }
    else {
        console.log("No html element with the provided ID: " + id);
        return undefined;
    }
}
;
function setCopticReadingsDate(coptDate) {
    let greatLentOrPentecostal = checkIfGreatLentOrPentecostalDays(todayDate);
    //console.log("greateLentOrPentcostal = ", greatLentOrPentecostal)
    if (greatLentOrPentecostal != "") {
        // it means we are either during the Great Lent period, or the Penstecostal 50 days, or any day/feast within these periods
        //console.log('we are within the Great  Lent period or the Pentecostal 50 days and the date returned by the function = ', greatLentOrPentecostal)
        if (season == Seasons.GreatLent || season == Seasons.JonahFast) {
            if (btnDayReadings.children.indexOf(btnReadingsPropheciesDawn) == -1 &&
                todayDate.getDay() != 0 &&
                todayDate.getDay() != 6) {
                //it means btnReadingsPropheciesDawn does not appear in the Day Readings buttons list (i.e., =-1), and we are neither a Saturday or a Sunday, which means that there are prophocies lectures for these days and we need to add the button in all the Day Readings Menu, and the Incense Dawn
                btnIncenseDawn.children.unshift(btnReadingsPropheciesDawn);
                btnDayReadings.children.splice(1, 0, btnReadingsPropheciesDawn);
                //btnIncenseDawn.children.unshift(btnReadingsPropheciesDawn);
                //btnDayReadings.children.unshift(btnReadingsPropheciesDawn);
            }
            else if (btnDayReadings.children.indexOf(btnReadingsPropheciesDawn) != -1 &&
                (todayDate.getDay() == 0 || todayDate.getDay() == 6)) {
                //it means btnReadingsPropheciesDawn appears in the Day Readings buttons list, and we are either a Saturday or a Sunday, which means that there is no prophocies for these days and we need to remove the button from all the menues to which it had been added before
                btnIncenseDawn.children.splice(btnIncenseDawn.children.indexOf(btnReadingsPropheciesDawn), 1);
                btnDayReadings.children.splice(btnDayReadings.children.indexOf(btnReadingsPropheciesDawn), 1);
            }
            if (btnDayReadings.children.indexOf(btnReadingsGospelNight) == -1 &&
                todayDate.getDay() == 0) {
                // it means that we are a Sunday. We add the Gospel Night button to the Day Readings menu (we do not add it to the Unbaptized mass menu because it is not read during the mass)
                btnDayReadings.children.push(btnReadingsGospelNight);
            }
            else if (btnDayReadings.children.indexOf(btnReadingsGospelNight) != -1 &&
                todayDate.getDay() != 0) {
                //it means we are not a Sunday, which means that if the Night Gospel button appears in the Day Readings menu, we need to remove it
                btnDayReadings.children.splice(btnDayReadings.children.indexOf(btnReadingsGospelNight), 1);
            }
        }
        return greatLentOrPentecostal;
    }
    else if (todayDate.getDay() == 0) {
        // it means we are on an ordinary  Sunday (any sunday other than Great lent and Pentecostal period Sundays)
        // console.log('We are on a sunday')
        let sunday = checkWhichSundayWeAre(Number(coptDate.slice(0, 2)));
        //the readings for the 5th sunday of any coptic month (other than the 5th sunday of the Great Lent or the Pentecostal Days) are the same. We will then retrieve the readings of the 5th sunday of the first coptic month (Tout)
        sunday == "5thSunday"
            ? (sunday = "01" + sunday)
            : (sunday = copticMonth + sunday);
        return sunday;
    }
    else {
        // it means we are in an ordinary day and we follow the ordinary readings calender, this should return a coptic date in a string of "DDMM"
        for (let i = 0; i < copticReadingsDates.length; i++) {
            if (coptDate == copticReadingsDates[i][0]) {
                return copticReadingsDates[i][1];
            }
        }
        return coptDate;
    }
}
;
function checkWhichSundayWeAre(day) {
    //this function returns a string like '1stSunday', '22ndSunday', '43rdSunday', etc.
    let n = Math.ceil(day / 7);
    let sunday = n.toString();
    if (n == 1 || (n > 20 && n % 10 == 1)) {
        sunday = sunday + "stSunday";
    }
    else if (n == 2 || (n > 20 && n % 10 == 2)) {
        sunday = sunday + "ndSunday";
    }
    else if (n == 3 || (n > 20 && n % 10 == 3)) {
        sunday = sunday + "rdSunday";
    }
    else {
        sunday = sunday + "thSunday";
    }
    return sunday;
}
;
function convertGregorianDateToCopticDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; //we add one because the months count starts at 0
    let coptMonth, coptDay, coptDate, dm;
    if (month == 1) {
        day < 9 ? (dm = [22, 4]) : (dm = [-8, 5]);
    }
    else if (month == 2) {
        day < 7 ? (dm = [23, 5]) : (dm = [-7, 6]);
    }
    else if (month == 3) {
        day < 10 ? (dm = [21, 6]) : (dm = [-9, 7]);
        console.log("march ", day + dm[0]);
    }
    else if (month == 4) {
        day < 9 ? (dm = [23, 7]) : (dm = [-8, 8]);
    }
    else if (month == 5) {
        day < 9 ? (dm = [23, 8]) : (dm = [-8, 9]);
    }
    else if (month == 6) {
        day < 8 ? (dm = [23, 9]) : (dm = [-7, 10]);
    }
    else if (month == 7) {
        day < 8 ? (dm = [23, 10]) : (dm = [-7, 11]);
    }
    else if (month == 8) {
        day < 7 ? (dm = [5, 11]) : (dm = [-6, 12]);
    }
    else if (month == 9) {
        if (day < 6) {
            dm = [25, 12];
        }
        else if ((day > 5 && day < 11) ||
            (day == 11 && date.getFullYear() % 4 == 3)) {
            //the 13th coptic month gets an additional 6th day every 4 years. It falls 1 year before the leap year of the Gregorian calendar. When we divide by 4, the remainder is 3
            dm = [-5, 13];
        }
        else {
            dm = [-10, 1];
        }
    }
    else if (month == 10) {
        day < 11 ? (dm = [20, 1]) : (dm = [-10, 2]);
    }
    else if (month == 11) {
        day < 11 ? (dm = [21, 2]) : (dm = [-9, 3]);
    }
    else if (month == 12) {
        day < 10 ? (dm = [21, 3]) : (dm = [-9, 4]);
    }
    setCopticDayAndMonth(dm);
    function setCopticDayAndMonth(daysMonth) {
        coptDay = day + daysMonth[0];
        coptMonth = daysMonth[1];
    }
    if (coptDay > 30) {
        console.log("copt day > 30", coptDay, coptMonth);
        coptDay = 1;
        coptMonth = coptMonth + 1;
    }
    if (date.getFullYear() % 4 == 0) {
        console.log("we are in a leap year");
        // we first check that we are in a leap year. Then we check that the day is after Feb 28th. If this is the case, we add 1 to the coptDay
        console.log("original coptic day and mont are ", coptDay, coptMonth);
        date > new Date(date.getFullYear().toString() + "-02-28") &&
            month == 2
            ? (coptDay = coptDay - 1)
            : coptDay;
        if (coptDay == 0) {
            coptDay = 30;
            coptMonth = coptMonth - 1;
        }
    }
    function getTwoDigitsStringFromNumber(n) {
        if (n < 10) {
            return "0" + n.toString();
        }
        else {
            return n.toString();
        }
    }
    return (getTwoDigitsStringFromNumber(coptDay) +
        getTwoDigitsStringFromNumber(coptMonth));
}
;
function showChildButtonsOrPrayers(btn, clear) {
    //if (!leftSideBar) {
    //	leftSideBar = buildSideBar('leftSideBar')
    //}
    let btnsDiv = leftSideBar.querySelector('#sideBarBtns');
    let inlineBtnsDiv = document.getElementById('inlineBtns');
    if (clear) {
        btnsDiv.innerHTML = '';
        inlineBtnsDiv.innerHTML = '';
    }
    ;
    if (btn.inlineBtns) {
        btn.inlineBtns.map((b) => {
            if (btn != btnGoBack) {
                // for each child button that will be created, we set btn as its parent in case we need to use this property on the button
                b.parentBtn = btn.parentBtn;
            }
            ;
            createBtn(b, inlineBtnsDiv, b.cssClass);
        });
    }
    ;
    if (btn.children) {
        btn.children.map((c) => {
            if (btn != btnGoBack) {
                // for each child button that will be created, we set btn as its parent in case we need to use this property on the button
                c.parentBtn = btn;
            }
            ;
            createBtn(c, btnsDiv, c.cssClass); //creating and showing a new html button element for each child
        });
    }
    ;
    if (btn.prayers && btn.prayersArray && btn.languages) {
        showPrayers(btn.prayers, btn.prayersArray, btn.languages);
    }
    if (btn.parentBtn) {
        addGoBackButton(btn).addEventListener("click", () => showChildButtonsOrPrayers(btn.parentBtn, true));
    }
    if (btn !== btnMain) {
        createBtn(btnMain, btnsDiv, btn.cssClass);
    }
    ;
    function createBtn(btn, btnsBar, btnClass) {
        let newDiv = document.createElement("div");
        let newBtn = document.createElement('button');
        newBtn.classList.add(btnClass);
        for (let lang in btn.label) {
            //for each language in btn.text, we create a new "p" element
            if (btn.label[lang]) {
                let btnLable = document.createElement("p");
                //we edit the p element by adding its innerText (=btn.text[lang], and its class)
                editBtnInnerText(btnLable, btn.label[lang], "btnLable" + lang);
                //we append the "p" element  to the newBtn button
                newBtn.appendChild(btnLable);
            }
        }
        newDiv.appendChild(newBtn);
        btnsBar.appendChild(newDiv);
        if (btn.children || btn.prayers) {
            // if the btn object that we used to create the html button element, has childs, we add an "onclick" event that passes the btn itself to the showChildButtonsOrPrayers. This will create html button elements for each child and show them
            newBtn.addEventListener('click', () => showChildButtonsOrPrayers(btn, true));
        }
        return newBtn;
    }
    function addGoBackButton(btn) {
        btnGoBack.children = []; //we are emptying any childs of the btnGoBack button
        btnGoBack.children[0] = btn; // we are adding btn as a child to the btnGoBack;
        return createBtn(btnGoBack, document.getElementById('sideBarBtns'), btnGoBack.cssClass); // we are creating a new html button element from btnGoBack. Since btnGoBack has as a sole child btn, when clicking on it, it will trigger the showButtons function (see the if(btn.childs) above. When triggered, the showButtons will show btn as a button);
    }
    function editBtnInnerText(el, text, btnClass) {
        el.innerText = text;
        el.classList.add("btnText");
        if (btnClass) {
            el.classList.add(btnClass);
        }
    }
}
;
function checkIfGreatLentOrPentecostalDays(today) {
    let readingsDate = "";
    ResurrectionDates.map((d) => {
        //we convert each string in the ResurrectionDates array into a date
        let resurrection = new Date(d);
        //console.log("resurrection date = ", resurrection, " and TodayDate gives = ", todayDate )
        if (today.getFullYear() == resurrection.getFullYear()) {
            //if the year of any  resurrection date in the array = current calendar year, then we take this resurrection date and process it to get the floating/changing events dates
            let todayUTC = new Date(today).setUTCHours(0, 0, 0, 0);
            resurrection.setUTCHours(0, 0, 0, 0);
            readingsDate = checkForUnfixedEvent(todayUTC, resurrection.getTime(), today.getDay());
        }
        return readingsDate;
    });
    return readingsDate;
}
;
function checkForUnfixedEvent(today, resDate, weekDay) {
    let difference = (resDate - today) / calendarDay;
    // console.log("The difference = ", difference, " and the dates are: Resurrection = ", new Date(resDate), " and Today = ", new Date(today), 'and today weekday =', new Date(today).getDay())
    //console.log('weekday = ', weekDay)
    if (difference == 0 || (difference == 1 && todayDate.getHours() > 15)) {
        //If we are Saturday (which means that difference = 1) and we are after 3 PM, we will retrieve the readings of the Resurrection because we use to celebrate the Resurrection Mass on Saturday evening not on Sunday itself
        season = Seasons.Resurrection;
        return Seasons.Resurrection; //we get the reading of Resurrection although we are still Saturday
    }
    else if (difference >= 1 && difference < 58) {
        //We are during the Great Lent period which counts 56 days from the Saturday preceding the 1st Sunday (which is the begining of the so called "preparation week") until the Resurrection day
        season = Seasons.GreatLent;
        return isItSundayOrWeekDay(Seasons.GreatLent, 58 - difference, weekDay);
    }
    else if (difference > 65 && difference < 70) {
        //We are in the Jonah Feast days (3 days + 1)
        //The Jonay feast starts 15 days before the begining of the Great Lent
        //I didn't find the readings for this period in the Power Point presentations
        season = Seasons.JonahFast;
        return isItSundayOrWeekDay(Seasons.JonahFast, Math.abs(70 - difference), weekDay);
    }
    else if (difference < 0 && Math.abs(difference) < 50) {
        // we are during the 50 Pentecostal days
        console.log("We are in the Pentecostal period and the difference = ", difference);
        season = Seasons.FiftyHolyDays;
        return isItSundayOrWeekDay(Seasons.FiftyHolyDays, Math.abs(difference), weekDay);
    }
    else if (difference < 0 && Math.abs(difference) > 50) {
        if (Number(copticMonth) < 11 ||
            (Number(copticMonth) == 11 && Number(copticDay) < 5)) {
            season = Seasons.ApostlesFast;
            console.log("difference = apostles");
            // We are during the Apostles lent.
            //I didn't find specific readings for this period. I assume there are no specific reading and we follow the ordinary readings. This needs however to be checked that's why I kept this "else if" case
            return "";
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
}
;
function isItSundayOrWeekDay(period, days, weekDay) {
    // let weekday: string = todayDate.toLocaleDateString('en-GB', { weekday: 'long' });
    //this returns the day of the week in English, eg.: Monday, Tuesday, etc.
    if (weekDay == 0) {
        //we are a Sunday
        return period + checkWhichSundayWeAre(days);
    }
    else {
        // we are not a sunday
        return period + days.toString();
    }
}
;
function PWA() {
    // Initialize deferredPrompt for use later to show browser install prompt.
    let deferredPrompt;
    window.addEventListener("beforeinstallprompt", (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        showInstallPromotion();
        // Optionally, send analytics event that PWA install promo was shown.
        console.log(`'beforeinstallprompt' event was fired.`);
    });
    function showInstallPromotion() {
        let buttonInstall = document.getElementById("InstallPWA");
        buttonInstall.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            // Hide the app provided install promotion
            //hideInstallPromotion();
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = yield deferredPrompt.userChoice;
            // Optionally, send analytics event with outcome of user choice
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
        }));
        window.addEventListener("appinstalled", () => {
            // Hide the app-provided install promotion
            //hideInstallPromotion();
            // Clear the deferredPrompt so it can be garbage collected
            deferredPrompt = null;
            // Optionally, send analytics event to indicate successful install
            console.log("PWA was installed");
        });
    }
    function getPWADisplayMode() {
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
        if (document.referrer.startsWith("android-app://")) {
            return "twa";
            //@ts-ignore
        }
        else if (navigator.standalone || isStandalone) {
            return "standalone";
        }
        return "browser";
    }
}
;
function registerServiceWorker() {
    const registerServiceWorker = () => __awaiter(this, void 0, void 0, function* () {
        if ("serviceWorker" in navigator) {
            try {
                const registration = yield navigator.serviceWorker.register("/sw.js", {
                    scope: "/",
                });
                if (registration.installing) {
                    console.log("Service worker installing");
                }
                else if (registration.waiting) {
                    console.log("Service worker installed");
                }
                else if (registration.active) {
                    console.log("Service worker active");
                }
            }
            catch (error) {
                console.error(`Registration failed with ${error}`);
            }
        }
    });
}
;
function getCopticReadingsDates() {
    return [
        ["1903", "1307"],
        ["1301", "1703"],
        ["1101", "2708"],
        ["0901", "2803"],
        ["0501", "3005"],
        ["1001", "3005"],
        ["1508", "0105"],
        ["1907", "0105"],
        ["2005", "0105"],
        ["2209", "0105"],
        ["2510", "0105"],
        ["2908", "0105"],
        ["0110", "0105"],
        ["0309", "0105"],
        ["0611", "0105"],
        ["1501", "0105"],
        ["2401", "0105"],
        ["2602", "0105"],
        ["1612", "0109"],
        ["2105", "0109"],
        ["2110", "0109"],
        ["0304", "0109"],
        ["2504", "0206"],
        ["0704", "0206"],
        ["0711", "0206"],
        ["2002", "0206"],
        ["3006", "0210"],
        ["1208", "0311"],
        ["1303", "0311"],
        ["1812", "0311"],
        ["2207", "0311"],
        ["2810", "0311"],
        ["3003", "0311"],
        ["3009", "0311"],
        ["0103", "0311"],
        ["0202", "0311"],
        ["0205", "0311"],
        ["0308", "0311"],
        ["0701", "0311"],
        ["0706", "0311"],
        ["0709", "0311"],
        ["0805", "0311"],
        ["1102", "0311"],
        ["1702", "0311"],
        ["1409", "0312"],
        ["1511", "0312"],
        ["1704", "0312"],
        ["2109", "0312"],
        ["2410", "0312"],
        ["2909", "0312"],
        ["0209", "0312"],
        ["0906", "0312"],
        ["1401", "0312"],
        ["1310", "0313"],
        ["1608", "0405"],
        ["1609", "0405"],
        ["1611", "0405"],
        ["2404", "0405"],
        ["2906", "0405"],
        ["1708", "0511"],
        ["1803", "0511"],
        ["1811", "0511"],
        ["2104", "0511"],
        ["2106", "0511"],
        ["2911", "0511"],
        ["0404", "0511"],
        ["0807", "0511"],
        ["1006", "0511"],
        ["0604", "0605"],
        ["0806", "0605"],
        ["1505", "0801"],
        ["2004", "0801"],
        ["2010", "0801"],
        ["2212", "0801"],
        ["2307", "0801"],
        ["2606", "0801"],
        ["2610", "0801"],
        ["2611", "0801"],
        ["0401", "0801"],
        ["0412", "0801"],
        ["0504", "0801"],
        ["0508", "0801"],
        ["0509", "0801"],
        ["0601", "0801"],
        ["0708", "0801"],
        ["0910", "0801"],
        ["2102", "0801"],
        ["2501", "0801"],
        ["0106", "0903"],
        ["0303", "0903"],
        ["0407", "0903"],
        ["1201", "0903"],
        ["0812", "1009"],
        ["1509", "1202"],
        ["1210", "1203"],
        ["2111", "1307"],
        ["0402", "1307"],
        ["0403", "1307"],
        ["0804", "1307"],
        ["1002", "1307"],
        ["2107", "1312"],
        ["2507", "1402"],
        ["1211", "1503"],
        ["1510", "1503"],
        ["2411", "1503"],
        ["2805", "1503"],
        ["0112", "1503"],
        ["0410", "1503"],
        ["0411", "1503"],
        ["0606", "1503"],
        ["0912", "1503"],
        ["2807", "1601"],
        ["0909", "1608"],
        ["1104", "1610"],
        ["1506", "1610"],
        ["1603", "1610"],
        ["1705", "1610"],
        ["0204", "1610"],
        ["1007", "1701"],
        ["1212", "1701"],
        ["1209", "1703"],
        ["1406", "1703"],
        ["1412", "1703"],
        ["1504", "1703"],
        ["1806", "1703"],
        ["2103", "1703"],
        ["2706", "1703"],
        ["2809", "1703"],
        ["0104", "1703"],
        ["0302", "1703"],
        ["0502", "1703"],
        ["0603", "1703"],
        ["0705", "1703"],
        ["0902", "1703"],
        ["3001", "1705"],
        ["1008", "2009"],
        ["1206", "2009"],
        ["1405", "2009"],
        ["1906", "2009"],
        ["2505", "2009"],
        ["2910", "2009"],
        ["0108", "2009"],
        ["0306", "2009"],
        ["0702", "2009"],
        ["0703", "2009"],
        ["0907", "2009"],
        ["1204", "2009"],
        ["1302", "2009"],
        ["2502", "2009"],
        ["1807", "2011"],
        ["2008", "2011"],
        ["2408", "2011"],
        ["2506", "2011"],
        ["2608", "2011"],
        ["2806", "2011"],
        ["0208", "2011"],
        ["0610", "2011"],
        ["1502", "2011"],
        ["1902", "2011"],
        ["1107", "2101"],
        ["1407", "2101"],
        ["2301", "2101"],
        ["1804", "2202"],
        ["0406", "2202"],
        ["1010", "2203"],
        ["1308", "2203"],
        ["1905", "2203"],
        ["1911", "2203"],
        ["2012", "2203"],
        ["2210", "2203"],
        ["2603", "2203"],
        ["3011", "2203"],
        ["0107", "2203"],
        ["0408", "2203"],
        ["0707", "2203"],
        ["2701", "2203"],
        ["2801", "2203"],
        ["3007", "2204"],
        ["1309", "2205"],
        ["1710", "2205"],
        ["1909", "2205"],
        ["2310", "2205"],
        ["0510", "2205"],
        ["0904", "2205"],
        ["0908", "2205"],
        ["2402", "2205"],
        ["1910", "2308"],
        ["2312", "2308"],
        ["2711", "2308"],
        ["2712", "2308"],
        ["0609", "2308"],
        ["0710", "2308"],
        ["0809", "2308"],
        ["0703", "2308"],
        ["0810", "2409"],
        ["2509", "2503"],
        ["2511", "2503"],
        ["2808", "2503"],
        ["0505", "2503"],
        ["0802", "2503"],
        ["2802", "2503"],
        ["1103", "2601"],
        ["1304", "2601"],
        ["1606", "2601"],
        ["0712", "2601"],
        ["0512", "2605"],
        ["1411", "2702"],
        ["1809", "2702"],
        ["1912", "2702"],
        ["2707", "2702"],
        ["0506", "2702"],
        ["0811", "2702"],
        ["0905", "2702"],
        ["1604", "2703"],
        ["2311", "2703"],
        ["0503", "2703"],
        ["0607", "2703"],
        ["1012", "2703"],
        ["2902", "2703"],
        ["1110", "2708"],
        ["1306", "2708"],
        ["1404", "2708"],
        ["1605", "2708"],
        ["1706", "2708"],
        ["1808", "2708"],
        ["2211", "2708"],
        ["2306", "2708"],
        ["2705", "2708"],
        ["1111", "2708"],
        ["2201", "2708"],
        ["1101", "2708"],
        ["2201", "2708"],
        ["1004", "2803"],
        ["1109", "2803"],
        ["1311", "2803"],
        ["1403", "2803"],
        ["1410", "2803"],
        ["1707", "2803"],
        ["1709", "2803"],
        ["1805", "2803"],
        ["1904", "2803"],
        ["1908", "2803"],
        ["2206", "2803"],
        ["2303", "2803"],
        ["2305", "2803"],
        ["2406", "2803"],
        ["2412", "2803"],
        ["2704", "2803"],
        ["2709", "2803"],
        ["0207", "2803"],
        ["0310", "2803"],
        ["0507", "2803"],
        ["0513", "2803"],
        ["1011", "2803"],
        ["1112", "2803"],
        ["2302", "2803"],
        ["1106", "2903"],
        ["1207", "2903"],
        ["1408", "2903"],
        ["1607", "2903"],
        ["2006", "2903"],
        ["2007", "2903"],
        ["2208", "2903"],
        ["2407", "2903"],
        ["0203", "2903"],
        ["0307", "2903"],
        ["0409", "2903"],
        ["1602", "2903"],
        ["1802", "2903"],
        ["1810", "2905"],
        ["1003", "3005"],
        ["1108", "3005"],
        ["1507", "3005"],
        ["1512", "3005"],
        ["1711", "3005"],
        ["2121", "3005"],
        ["2405", "3005"],
        ["2508", "3005"],
        ["2604", "3005"],
        ["2607", "3005"],
        ["2811", "3005"],
        ["2905", "3005"],
        ["0102", "3005"],
        ["0212", "3005"],
        ["0602", "3005"],
        ["0608", "3005"],
        ["0612", "3005"],
        ["0808", "3005"],
        ["2001", "3005"],
        ["2901", "3005"],
        ["0211", "3008"],
        ["2003", "3008"],
        ["2309", "3008"],
        ["2710", "3008"],
        ["0111", "3008"],
        ["0911", "3008"],
        ["3002", "3008"],
        ["0301", "0311"],
    ];
}
;
function toggleSideBars() {
    if (leftSideBar.classList.contains('extended') && rightSideBar.classList.contains('collapsed')) {
        closeSideBar(leftSideBar);
    }
    else if (rightSideBar.classList.contains('extended') && leftSideBar.classList.contains('collapsed')) {
        closeSideBar(rightSideBar);
    }
    else if (leftSideBar.classList.contains('collapsed') && leftSideBar.classList.contains('collapsed')) {
        openSideBar(leftSideBar);
    }
}
function openDev(btn) {
    let dev = document.getElementById("Dev");
    dev.style.display = "block";
    btn.removeEventListener("click", () => openDev(btn));
    btn.addEventListener("click", () => closeDev(btn));
}
function closeDev(btn) {
    let dev = document.getElementById("Dev");
    dev.style.display = "none";
    btn.removeEventListener("click", () => closeDev(btn));
    btn.addEventListener("click", () => openDev(btn));
}
;
function openSideBar(sideBar) {
    //containerDiv.appendChild(sideBar);
    let btnText = String.fromCharCode(9776) + "Close Sidebar";
    let width = "30%";
    sideBar.style.width = width;
    sideBar.classList.remove('collapsed');
    sideBar.classList.add('extended');
    contentDiv.style.marginLeft = width;
    sideBarBtn.innerText = btnText;
    sideBarBtn.removeEventListener("click", () => openSideBar(sideBar));
    sideBarBtn.addEventListener("click", () => closeSideBar(sideBar));
}
;
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeSideBar(sideBar) {
    let btnText = String.fromCharCode(9776) + "Open Sidebar";
    let width = '0px';
    sideBar.style.width = width;
    sideBar.classList.remove('extended');
    sideBar.classList.add('collapsed');
    contentDiv.style.marginLeft = width;
    sideBarBtn.innerText = btnText;
    sideBarBtn.removeEventListener("click", () => closeSideBar(sideBar));
    sideBarBtn.addEventListener("click", () => openSideBar(sideBar));
}
;
function DetectFingerSwipe() {
    //Add finger swipe event
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);
    let xDown = null;
    let yDown = null;
    function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }
    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;
        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
                /* right to left swipe */
                if (leftSideBar.classList.contains('extended') && rightSideBar.classList.contains('collapsed')) {
                    closeSideBar(leftSideBar);
                }
                else if (rightSideBar.classList.contains('collapsed') && leftSideBar.classList.contains('collapsed')) {
                    openSideBar(rightSideBar);
                }
                ;
            }
            else {
                /* left to right swipe */
                if (leftSideBar.classList.contains('collapsed') && rightSideBar.classList.contains('collapsed')) {
                    openSideBar(leftSideBar);
                }
                else if (rightSideBar.classList.contains('extended') && leftSideBar.classList.contains('collapsed')) {
                    closeSideBar(rightSideBar);
                }
                ;
            }
        }
        else {
            if (yDiff > 0) {
                /* down swipe */
            }
            else {
                /* up swipe */
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }
}
;
function toggleClassListForAllChildrenOFAnElement(ev, myClass) {
    let el = ev.target;
    let haveDataLang = containerDiv.querySelectorAll('[data-lang]');
    for (let i = 0; i < haveDataLang.length; i++) {
        if (haveDataLang[i].attributes.getNamedItem('data-lang').value == el.attributes.getNamedItem('data-lang').value) {
            toggleClassList(haveDataLang[i], myClass);
        }
    }
}
;
function toggleClassList(el, myClass) {
    if (!el.classList.contains(myClass)) {
        el.classList.add(myClass);
    }
    else if (el.classList.contains(myClass)) {
        el.classList.remove(myClass);
    }
}
;
function buildSideBar(id) {
    let sideBar = document.createElement('div');
    let btnsDiv = document.createElement('div');
    let a = document.createElement('a');
    sideBar.id = id;
    sideBar.classList.add(id);
    sideBar.classList.add('sideBar');
    sideBar.classList.add('collapsed');
    a.innerText = '&times';
    a.setAttribute('href', 'javascript:void(0)');
    a.classList.add('closebtn');
    a.addEventListener('click', () => closeSideBar(sideBar));
    sideBar.appendChild(a);
    btnsDiv.id = 'sideBarBtns';
    sideBar.appendChild(btnsDiv);
    if (id == 'leftSideBar') {
        //leftSideBar = sideBar
    }
    else if (id == 'rightSideBar') {
        //rightSideBar = sideBar
    }
    return sideBar;
}
;
