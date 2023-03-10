class Button {
    constructor(label, rootID, parentBtn, children, prayers, prayersArray, languages, onClick, value, cssClass, inlineBtns) {
        this._label = { FR: '', AR: '', EN: '' };
        this._label = label;
        this._rootID = rootID;
        this._parentBtn = parentBtn;
        this._children = children;
        this._prayers = prayers;
        this._prayersArray = prayersArray;
        this._languages = languages;
        this._onClick = onClick;
        this._value = value;
        this._cssClass = cssClass;
        this._inlineBtns = inlineBtns;
        if (!this._cssClass) {
            this._cssClass = 'sideBarBtn';
        }
    }
    ;
    get children() { return this._children; }
    ;
    get prayers() { return this._prayers; }
    ;
    get prayersArray() { return this._prayersArray; }
    ;
    get languages() { return this._languages; }
    ;
    get label() { return this._label; }
    ;
    get parentBtn() { return this._parentBtn; }
    ;
    get rootID() { return this._rootID; }
    ;
    get onClick() { return this._onClick; }
    ;
    get value() { return this._value; }
    ;
    get cssClass() { return this._cssClass; }
    ;
    get inlineBtns() { return this._inlineBtns; }
    ;
    set label(lbl) { this._label = lbl; }
    ;
    set parentBtn(parentBtn) { this._parentBtn = parentBtn; }
    ;
    set prayers(btnPrayers) { this._prayers = btnPrayers; }
    ;
    set onClick(fun) { this._onClick = fun; }
    ;
    set children(children) { this._children = children; }
    ;
    set cssClass(cssClass) { this._cssClass = cssClass; }
    ;
    set inlineBtns(btns) { this._inlineBtns = btns; }
}
;
class inlineButton extends Button {
    constructor(label, rootID, parentBtn, children, prayers, prayersArray, languages, onClick, value, cssClass, inlineBtns) {
        super(label, rootID, parentBtn, children, prayers, prayersArray, languages, onClick, value, cssClass, inlineBtns);
        if (!this.cssClass) {
            this.cssClass = 'inlineButton';
        }
        ;
    }
    ;
}
;
const btnMain = new Button({ AR: "???????????? ?????? ?????????????? ????????????????", FR: "Retour au menu principal", EN: "Back to the main menu" });
const btnGoBack = new Button({ AR: "????????????", FR: "Retour", EN: "Go Back" });
const btnMass = new Button({ AR: "????????????????", FR: "Messes" });
const btnIncenseOffice = new Button({
    AR: "?????? ???????? ???????? ???? ????????",
    FR: "Office des Encens Aube et Soir"
});
const btnIncenseDawn = new Button({
    AR: '???????? ????????',
    FR: 'Encens Aube'
}, undefined, undefined, undefined, IncenseDawnPrayers, PrayersArray, prayersLanguages);
const btnIncenseVespers = new Button({
    AR: "???????? ????????",
    FR: 'Incense Vespers'
}, undefined, undefined, undefined, IncenseVespersPrayers, PrayersArray, prayersLanguages);
const btnMassStCyril = new Button({ AR: "????????????", FR: "Encens Soir" }, 'StCyril', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StCyril'));
const btnMassStGregory = new Button({ AR: "??????????????", FR: "Saint Gregory" }, 'StGregory', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StGregory'));
const btnMassStBasil = new Button({ AR: '????????????', FR: 'Saint Basil' }, 'StBasil', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StBasil'));
const btnMassStJean = new Button({ AR: '???????????? ??????????', FR: 'Saint Jean' }, 'StJean', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StJean'));
const btnGoToStGregoryReconciliation = new inlineButton({ AR: '???????? ?????????? ??????????????????', FR: 'Reconciliation Saint Gregory' }, 'StGregory', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StGregory'));
const btnGoToStBasilReconciliation = new inlineButton({ AR: '???????? ?????????? ????????????????', FR: 'Reconciliation Saint Basil' }, 'StBasil', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StBasil'));
const btnGoToStCyrilReconciliation = new inlineButton({ AR: '???????? ?????????? ????????????????', FR: 'Reconciliation Saint Cyril' }, 'StCyril', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StCyril'));
const btnGoToStJeanReconciliation = new inlineButton({ AR: '???????? ?????????? ???????????? ??????????', FR: 'Reconciliation Saint Jean' }, 'StJohn', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StJohn'));
const btnMassOfferingOfTheLamb = new Button({ AR: '?????????? ??????????', FR: "Pr??sentation de l'Agneau" });
const btnMassRoshoumat = new Button({ AR: '???????????? ??????????', FR: "Roshoumat El Hamal" });
const btnMassUnBaptised = new Button({ AR: '???????? ??????????????????', FR: 'Messe des non baptis??s', EN: 'Unbaptised Mass' });
const btnMassBaptised = new Button({
    AR: '???????? ????????????????',
    FR: 'Messe des Croyants',
    EN: 'Baptized Mass'
}, undefined, btnMass, [btnMassStBasil, btnMassStCyril, btnMassStGregory, btnMassStJean]);
const btnFractionPrayers = new Button({ AR: '?????????? ????????????', FR: 'Fraction' });
const btnMassReadings = new Button({
    AR: '????????????????',
    FR: 'Lectures'
}, undefined, undefined, undefined, [Readings.StPaul, Readings.Katholikon, Readings.Praxis, Readings.Synaxarium, Readings.GospelMass]);
const btnDayReadings = new Button({ AR: "???????????? ??????????", FR: "Lectures du jour", EN: 'Day\'s Readings' });
const btnReadingsStPaul = new Button({
    AR: '????????????',
    FR: 'Ep??tre de Saint Paul',
    EN: 'Pauline Epistle'
}, undefined, undefined, undefined, [Readings.StPaul], StPaulArray, readingsLanguages);
const btnReadingsKatholikon = new Button({
    AR: '??????????????????????',
    FR: 'Katholikon'
}, undefined, undefined, undefined, [Readings.Katholikon], KatholikonArray, readingsLanguages);
const btnReadingsPraxis = new Button({
    AR: '??????????????????',
    FR: 'Praxis'
}, undefined, undefined, undefined, [Readings.Praxis], PraxisArray, readingsLanguages);
const btnReadingsSynaxarium = new Button({
    AR: '????????????????',
    FR: 'Synaxarium'
}, undefined, undefined, undefined, [Readings.Synaxarium], SynaxariumArray, readingsLanguages);
const btnReadingsGospelMass = new Button({
    AR: '?????????? ????????????',
    FR: 'l\'Evangile',
    EN: 'Gospel'
}, undefined, undefined, undefined, ['PrayerPsalmResponse' + PsalmResponse, Readings.GospelMass + Readings.Psalm, Readings.GospelMass, 'PrayerGospelResponse' + GospelResponse], GospelMassArray, readingsLanguages);
const btnReadingsGospelIncenseVespers = new Button({
    AR: '?????????? ????????',
    FR: 'Evangile  V??pres',
    EN: 'Vespers Gospel'
}, undefined, undefined, undefined, ['PrayerPsalmResponse' + PsalmResponse, Readings.GospelVespers + Readings.Psalm, Readings.GospelVespers, 'PrayerGospelResponse' + GospelResponse], GospelVespersArray, readingsLanguages);
const btnReadingsGospelIncenseDawn = new Button({
    AR: '?????????? ????????',
    FR: 'Evangile Aube',
    EN: 'Gospel Dawn'
}, undefined, undefined, undefined, [Readings.GospelDawn + Readings.Psalm, Readings.GospelDawn], GospelDawnArray, readingsLanguages);
const btnReadingsGospelNight = new Button({
    AR: '?????????? ????????????',
    FR: 'Evangile Soir',
    EN: 'Vespers Gospel'
}, undefined, btnIncenseVespers, undefined, [Readings.GospelNight + Readings.Psalm, Readings.GospelNight], GospelNightArray, readingsLanguages);
const btnReadingsPropheciesDawn = new Button({
    AR: "?????????? ????????",
    FR: 'Propheties Matin'
}, undefined, btnIncenseDawn, undefined, [Readings.PropheciesDawn], PropheciesDawnArray, readingsLanguages);
const btnHeteneyat = new Button({ AR: '??????????????????', FR: 'Heteneyat' });
const btnPraxisResponse = new Button({ AR: '?????? ??????????????????', FR: 'R??ponse Praxis' });
const btnMassGospelResponse = new Button({ AR: '?????? ??????????????', FR: 'R??ponse Evangile' });
const btnMassReconciliation = new Button({
    AR: '???????? ??????????',
    FR: 'Reconcilation'
});
const btnMassAnaphora = new Button({ AR: '??????????????????', FR: 'Anaphora' });
const btnMassCommunion = new Button({ AR: '??????????????', FR: 'Communion' });
btnMain.children = [btnMass, btnIncenseOffice, btnDayReadings];
btnMass.children = [btnIncenseDawn, btnMassOfferingOfTheLamb, btnMassRoshoumat, btnMassUnBaptised, btnMassBaptised];
btnMassUnBaptised.children = [btnReadingsStPaul, btnReadingsKatholikon, btnReadingsPraxis, btnReadingsSynaxarium, btnReadingsGospelMass];
btnIncenseVespers.children = [btnReadingsGospelIncenseVespers];
btnIncenseDawn.children = [btnReadingsGospelIncenseDawn];
const commonMassChildBtns = [btnMassReconciliation, btnMassAnaphora, btnFractionPrayers, btnMassCommunion];
//btnMassReconciliation.children = [btnMassStCyrilReconciliation, btnMassStGregoryReconciliation, btnMassStCyrilReconciliation, btnMassStJeanReconciliation]
btnDayReadings.children = [btnReadingsGospelIncenseVespers, btnReadingsGospelIncenseDawn, btnReadingsStPaul, btnReadingsKatholikon, btnReadingsPraxis, btnReadingsGospelMass];
//we may need to change the properties of a given button for each mass: eg. changing the paryers property of btnMassReconciliation in order to adapt it
btnMassStJean.children = commonMassChildBtns;
btnMassStBasil.children = commonMassChildBtns;
btnMassStBasil.inlineBtns = [btnGoToStGregoryReconciliation, btnGoToStCyrilReconciliation, btnGoToStJeanReconciliation];
btnMassStCyril.children = commonMassChildBtns;
btnMassStCyril.inlineBtns = [btnGoToStGregoryReconciliation, btnGoToStBasilReconciliation, btnGoToStJeanReconciliation];
btnMassStGregory.children = commonMassChildBtns;
btnIncenseOffice.children = [btnIncenseDawn, btnIncenseVespers];
function buildButtonPrayers(prayersArrays, replaceWhat, replaceWith) {
    let newArray = [];
    prayersArrays.map((prayersArray) => newArray = [...replacePrayerIDVariable(prayersArray, replaceWhat, replaceWith)]);
    return newArray;
    function replacePrayerIDVariable(prayersArray, replaceWhat, replaceWith) {
        let newArray = [...prayersArray];
        newArray.map(p => p.replace(replaceWhat, replaceWith));
        return newArray;
    }
}
;
