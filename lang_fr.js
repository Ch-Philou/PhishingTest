var messages = {
    title: "PhishTest",
    // Section Personalize
    personalize_text: "Vous pouvez rendre ce jeu plus concret en le personnalisant.",
    personalize_btnp : "Personaliser",
    personalize_btnr : "Relancer",
    personalize_name : "Votre nom:",
    personalize_email : "Votre email:",
    // Section explanation
    explanation: "Les &eacute;l&eacute;ments en <font color='green'>[vert]</font> sont &agrave; prendre en compte ayant une valeur cr&eacute;dible:<br>un nom de coll&egrave;gue (patrick de la compta), un de vos vieux mot de passe, un site que vous fr&eacute;quentez, votre adresse postale...",
    explanation_btn: "Suivant",
    explanation_stp: "Questions #pending#/#total#",
    // Section Loading
    loading : "Chargement d'un exemple...",
    // Section Sample
    line_Headers :      "Entêtes SMTP",
    line_HeadersBtnS :  "Voir Entêtes",
    line_HeadersBtnH :  "Cacher",
    // Section Response
    Response_Catpion : "Ceci est il un phishing?",
    Response_Btn_Yes : "Oui, phishing",
    Response_Btn_No : "Non, légitime",

    // Section Termination
    TerminationText : "Nous esp&eacute;rons que cela vous a aid&eacute; &agrave; affuter votre cybervigilance.<br>Rappel des actions &agrave; faire:<ul><li>Regarder l'exp&eacute;diteur r&eacute;el</li><li>Regarder les liens (survoler sans cliquer)</li><li>Regarder le format des pi&egrave;ces jointes (pdf, xls, doc, exe...)</li><li>La coh&eacute;rence des informations (titre, texte, exp&eacute;diteur...)</li></ul>Plus globalement:<ul><li>R&eacute;fl&eacute;chir avant de cliquer, votre carte bleue vaut bien 30s</li><li>SMS Louche: transf&eacute;rez le au 33700 (service gratuit)</li><li>Inscrire tous vos emails sur <a href='https://haveibeenpwned.com'>HaveIBeenPwned</a></li><li>Un mot de passe par site, et <a href='https://keepass.info/'>Keepass</a> pour les rassembler tous</li></ul>",

    // Section Footer
    Footer: "Jeux sans obligation d'achat. Le but est de vous entrainer &agrave; ne plus &ecirc;tre phish&eacute;.<br>Ce jeu est 100% dans votre navigateur,totalement anonyme, nous n'avons pas les &eacute;l&eacute;ments que vous renseignez.<br>(<a href='https://github.com/Ch-Philou/PhishingTest' target='_gitcode'>Show me the code</a>)",
    Footer_logged: "Jeux sans obligation d'achat. Le but est de vous entrainer &agrave; ne plus &ecirc;tre phish&eacute;.<br><font color='red'>Les données sont sauvegardées</font> (formulaire, résultat, temps, @IP).<br>(<a href='https://github.com/Ch-Philou/PhishingTest' target='_gitcode'>Show me the code</a>)",
    // Section logger
    // Section error

    // Section SMS
    Conversation: "<br>&Eacute;change de SMS/MMS avec #sender#<br>",

    Days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
};
 
//this are helpfull function to not blovck due to error
function SetText(id,text){
    try {
        if(document.getElementById(id)!=''){
            if(text.includes("<")){
                document.getElementById(id).innerHTML = text;
            }else{
                document.getElementById(id).innerText = text;
            }
            
        }
    } catch (e) {
        document.getElementById("error").innerHTML = "SetText(id=" + id + ",HTML=" + text + ") > "+ e;
    }
    
}
function SetHTML(id,HTML){
    try {
        if(document.getElementById(id)!=''){
            document.getElementById(id).innerHTML = HTML;
        }
    } catch (e) {
        document.getElementById("error").innerHTML = "SetHTML(id=" + id + ",HTML=" + HTML + ") > "+ e;
    }
}
function SetCaption(id,CaptionText){
    try {
        if(document.getElementById(id)!=''){
            document.getElementById(id).caption.innerText = CaptionText;
        }
    } catch (e) {
        document.getElementById("error").innerHTML = "SetCaption(id=" + id + ",CaptionText=" + CaptionText + ") > "+ e;
    }
}
function SetColor(id,Color){
    try {
        if(document.getElementById(id)!=''){
            document.getElementById(id).style.color  = Color;
        }
    } catch (e) {
        document.getElementById("error").innerHTML = "SetColor(id=" + id + ",Color=" + Color + ") > "+ e;
    }
}
function SetDisplay(id,Display="none"){
    try {
        if(document.getElementById(id)!=''){
            document.getElementById(id).style.display  = Display;
        }
    } catch (e) {
        document.getElementById("error").innerHTML = "SetDisplay(id=" + id + ",Display=" + Display + ") > "+ e;
    }
}
function SetHeight(id,Height=0){
    try {
        if(document.getElementById(id)!=''){
            document.getElementById(id).style.height  = Height;
        }
    } catch (e) {
        document.getElementById("error").innerHTML = "SetHeight(id=" + id + ",Height=" + Display + ") > "+ e;
    }
}
function SetClass(id,Class=""){
    try {
        if(document.getElementById(id)!=''){
            document.getElementById(id).className  = Class;
        }
    } catch (e) {
        document.getElementById("error").innerHTML = "SetClass(id=" + id + ",Class=" + Display + ") > "+ e;
    }
}

function SetLang(){
    document.title = messages.title;
    //buttons
    SetText("Btn_Personalize",      messages.personalize_btnp);
    SetText("Btn_rep_phishing",     messages.Response_Btn_Yes);
    SetText("Btn_rep_notphishing",  messages.Response_Btn_No);
    SetText("Btn_ShowHeaders",      messages.line_HeadersBtnS);
    SetText("Btn_Reset",            messages.personalize_btnr);
    SetText("Btn_Next",             messages.explanation_btn);

    // Section Personalize
    SetCaption("Personalize",       messages.personalize_text);
    SetText("pUserName",            messages.personalize_name);
    SetText("pEmail",               messages.personalize_email);
    // Section explanation
    SetHTML("pExplanation",         messages.explanation);
    // Section Loading
    SetText("pLoading",             messages.loading);
    // Section Response

    // Section Termination
    SetCaption("Response",          messages.Response_Catpion);
    SetHTML("pTermination",      messages.TerminationText);
    // Section Footer
    SetHTML("Footer",            messages.Footer);
    // Section logger
    // Section error
}

function Explanation(text = "", Pending=-1, Total=-1){
    //Section Explanation
    if(text.length>0){
        SetText("pExplanation",             text);
        document.getElementById("pExplanation").style.fontSize = "25px";
    }else{
        SetText("pExplanation",             messages.explanation);
        document.getElementById("pExplanation").style.fontSize = "16px";
    }
    

}

SetLang();