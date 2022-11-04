
var debug = 0;
var Test_Length = 10;
const starttime = Date.now();
var explanation_time = 0;
var IsExplaining = false;
var CookieSecur = "; samesite=strict; max-age =3600; Secure=true;";
var Samples = [];

//
var fun_name=[  "ONYME Anne",    "TOMBALE Pierre",    "Sandra JAIFROIS",    "TERRIEUR Alex",    "HERPIERRE Axelle",    "MANVUSSA Gérard"];
var fun_mail=[  "anne@onyme.fr", "pierre@tombale.fr", "sandra@jaifrois.fr", "alex@terrieur.fr", "axelle@herpeirre.fr", "gérard@manvussa.fr"];
var indice = Math.floor(Math.random() * fun_name.length);
var User = fun_name[indice];
var Email = fun_mail[indice];
var Pending = 0;
var Success = 0;
var Total = 0;

/* Mathematic */
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/* Timer */
function AddTime(){
  if(IsExplaining){
    explanation_time=explanation_time+100;
  }
}
setInterval(AddTime,100);



/* Cookie handling */
function getCookie(key) {
  var cookieArr = document.cookie.split(";");
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      if(debug>1){log(" - - > Check "+cookiePair[0].trim());}
      if(key == cookiePair[0].trim()) {
        if(debug>2){log(" - - > Found "+key);}
        if(debug>2){log(" - - > Return  "+decodeURIComponent(cookiePair[1]));}
        return decodeURIComponent(cookiePair[1]);
      }
  }
  return null;
}
function CookieInit(){

    // -------------- Eléments de "Sécurité"
    // path =/                      pour rendre le cookie accessible à partir de toutes les pages du site Web
    // domain=pierre-giraud.com     mon cookie sera disponible sur le domaine et sur l’ensemble des sous domaines liés
    // samesite="strict"            indique qu’un cookie ne doit jamais être envoyé si l’utilisateur arrive sur le site depuis un autre site 
    // max-age=3600                 pour définir la date d’expiration d’un cookie en secondes à partir du moment actuel

    // -------------- Eléments de code
    // UserName     Pour personnaliser les exemples
    // Email        Pour personnaliser les exemples

    // Verif if cookie exist
    if(debug>1){log(" -> Cookie check ("+document.cookie+")");}
    let Loc_User = getCookie("UserName");
    let Loc_Email = getCookie("Email");

    if (Loc_User != "" && Loc_User != null && Loc_Email != "" && Loc_Email != null) {
      if(debug>2){log(" - - > Known user: "+User);}
      SetHTML("UserName",Loc_User);
      SetHTML("Email",Loc_Email);
      User = Loc_User;
      Email = Loc_Email;
      return true;
    }else {
      if(debug>2){log(" - - > Unknown user asking");}
      Personalize();    
    }
    return true;
}

function decodeBase64(s) {
  var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
  var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for(i=0;i<64;i++){e[A.charAt(i)]=i;}
  for(x=0;x<L;x++){
      c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
      while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
  }
  return r;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function Personalize(){
  SetDisplay("Sample_eMail","none");
  SetDisplay("Sample_SMS",	"none");
  SetDisplay("Termination", "none");
  SetDisplay("Loading",		  "none");
  SetDisplay("Response",	  "none");
  SetDisplay("Explanation",	"none");
  SetDisplay("logger",		  "none");
  SetDisplay("error",		    "none");

  if(debug>0){log(" - - > Asking User Name");}
  User = prompt("Veuillez entrer NOM Prenom:", User);
  // user = "Han ONYME"

  if(debug>0){log(" - - > Asking Email");}
  Email = prompt("Veuillez entrer votre email:", Email);
  // email = "han@onyme.fr"
  if ((User != "" && User != null) && (Email != "" && Email != null)){
    if((User.length>3) && (Email.length>4) && Email.includes("@")){
      document.cookie = "UserName=" + User + CookieSecur;
      document.cookie = "Email=" + Email + CookieSecur;
      SetHTML("UserName",User);
      SetHTML("Email",Email);
    }else{
      alert("Valeurs saisies nom conforme.");
    }
    
  }else{
    alert("Valeurs saisies vide.");
  }
  location.reload();
}

/* Function Logging */
function log(text,Show=true){
  if(Show){
    document.getElementById("logger").innerHTML = document.getElementById("logger").innerHTML + "<br>" + text;
    document.getElementById("logger").scrollTop = document.getElementById("logger").scrollHeight;
  }
  console.log(text)
}

/* Function for CLicks */

function AddListener(){
  if(debug>0){log("[INFO] Add Listener to button");}
  document.getElementById("Btn_Personalize").addEventListener('click', ClickPersonalize);
  document.getElementById("Btn_rep_phishing").addEventListener('click', ClickPhish);
  document.getElementById("Btn_rep_notphishing").addEventListener('click', ClickNotPhish);
  document.getElementById("Btn_ShowHeaders").addEventListener('click', ShowHeaders);
  document.getElementById("Btn_Reset").addEventListener('click', Reset);
  document.getElementById("Btn_Next").addEventListener('click', NextSample);
}
function ClickPersonalize(){
  log("[EVENT] Click Personalize");
  Personalize();
}
function ClickPhish(){
  log("[EVENT] Click Phish");
  Answer("true");
}
function ClickNotPhish(){
  log("[EVENT] Click Not Phish");
  Answer("false");
}
function ShowHeaders(){
  log("[EVENT] Click Show/HideHeaders "+document.getElementById("Sample_Headers").style.display);
  if(document.getElementById("Sample_Headers").style.display === "none"){
    if(debug>1){log(" > Show");}
    SetDisplay("Sample_Headers","table-cell"); //Car c'est une cellule de tableau
    SetText("Btn_ShowHeaders","Cacher"); 
    SetHeight("Headers_Area",300);
  }else{
    if(debug>1){log(" > Hide");}
    SetDisplay("Sample_Headers","none");
    SetText("Btn_ShowHeaders","Voir"); 
    SetHeight("Headers_Area",30);
  }

}
function Reset(){
  document.cookie = "Success=0"+ CookieSecur;
  document.cookie = "Pending=0"+ CookieSecur;
  location.reload();
}
/* Fonction Réponse */
function Answer(Choice){
  if(debug>1){log("Answer("+Choice+")");}
  SetDisplay("Sample_eMail",  "none");
  SetDisplay("Sample_SMS",    "none");
  SetDisplay("Response",      "none");
  SetDisplay("Exp_Infos",     "none");
  SetDisplay("Headers_Area",  "none");
  
  // var Success = parseInt(getCookie("Success"));
  // var Pending = parseInt(getCookie("Pending"));
  if(debug>3){log(" - > Checking Result");}
  if(document.getElementById("Sample_Phishing").innerHTML == Choice){
    //Exact
    log("[+] Good Answer");
    // Showing explanation
    IsExplaining = true;
    Explanation("<font color='green'>Exact</font>: " + document.getElementById("Sample_AnswerGood").innerHTML)
    SetDisplay("Line_Btn_Next","table-row");

    Success = Success +1;
    Pending = Pending +1;
    // document.cookie = "Success=" + Success + CookieSecur;
    // document.cookie = "Pending=" + Pending + CookieSecur;
  }else{
    //faux
    log("[-] Bad Answer");
    // Showing explanation
    IsExplaining = true;
    Explanation("<font color='red'>Erreur</font>: " + document.getElementById("Sample_AnswerBad").innerHTML)
    SetDisplay("Line_Btn_Next","table-row");
    
    Pending = Pending +1;
    // document.cookie = "Pending=" + Pending + CookieSecur;
  }
}

function NextSample(){
  IsExplaining = false;
  // var Pending = parseInt(getCookie("Pending"));
  SetDisplay("Loading","table");// car c'est un table
  log("[x] Next Sample ("+Pending+")");
  LoadFile("./samples.json",Pending);
  Explanation();
  if(debug>2){log(" - - > Termination display: "+document.getElementById("Termination").style.display);}
  sleep(250).then(() => {
    if(document.getElementById("Termination").style.display == "none"){
      SetDisplay("Loading","none");
      // SetDisplay("Sample","table");//car c'est une table;
    }
  });
  SetDisplay("Exp_Infos","table-cell");
  SetDisplay("Line_Btn_Next","none");
}

/* Fonction de chargement / Affichage */
function replaceTAG(OneString){
  while (OneString.includes("#nom_prenom#")){     OneString = OneString.replace("#nom_prenom#",User);}
  while (OneString.includes("#email#")){          OneString = OneString.replace("#email#",Email);}
  while (OneString.includes("#nom#")){            OneString = OneString.replace("#nom#",User.split(" ")[0]);}
  while (OneString.includes("#domain#")){         OneString = OneString.replace("#domain#",Email.split("@")[1]);}
  while (OneString.includes("#prenom#")){         OneString = OneString.replace("#prenom#",User.replace(User.split(" ")[0]," ").trim());}
  while (OneString.includes("#pending#")){        OneString = OneString.replace("#pending#",(parseInt(Pending)+1));}
  while (OneString.includes("#success#")){        OneString = OneString.replace("#success#",(parseInt(Success)+1));}
  while (OneString.includes("#total#")){          OneString = OneString.replace("#total#",(parseInt(Total)));}
  return OneString;
}

function Load_To_Table(OneSample){
  if(debug>5)log("[FUNC] Loading One Sample");

  
  SetDisplay("Sample_eMail","none");
  SetDisplay("Sample_SMS","none");

  if(OneSample.Style=='outlook'){
    if(debug>5){log("    -> Sender Update : "+OneSample.Sender);}
    SetHTML("Sample_Sender",      replaceTAG(OneSample.Sender));

    if(debug>5){log("    -> Destination Update : "+OneSample.Destination);}
    SetHTML("Sample_Destination",      replaceTAG(OneSample.Destination));

    // if(debug>5){log("    -> CC Update : "+OneSample.CC)}
    // if(OneSample.CC.length>5){
    //   SetDisplay("line_CC","table-row");
    //   SetHTML("Sample_CC",      replaceTAG(OneSample.CC));
    // }else{
    //   SetDisplay("line_CC","none");
    //   SetHTML("Sample_CC",     "");
    // }
    if(debug>5){log("    -> Object Update : "+OneSample.Object)}
    SetHTML("Sample_Object",      replaceTAG(OneSample.Object));
    SetHTML("Sample_Object_2",    replaceTAG(OneSample.Object));

    if(debug>5){log("    -> Body/attachement Update : "+OneSample.Body);}
    var HTML_Body_Content = "";
    if(OneSample.Attachements.length>5){
      HTML_Body_Content += replaceTAG(OneSample.Attachements)+"<br>";
    }
    if(OneSample.Body.includes("<")){
      HTML_Body_Content += replaceTAG(OneSample.Body);
    }else{
      HTML_Body_Content += replaceTAG(decodeBase64(OneSample.Body));
    }
    SetHTML("Sample_Body",    HTML_Body_Content);
    

    if(debug>1){log("    -> Headers Update : "+OneSample.Headers);}
    if(OneSample.Headers.length>5){
      SetDisplay("Headers_Area","block");
      SetHTML("Sample_Headers",    replaceTAG(OneSample.Headers));
    }else{
      SetDisplay("Headers_Area","none");
      SetHTML("Sample_Headers",    "");
    }

    // Date
    SetText("Sample_Date",    new Date().toLocaleDateString("fr",{ weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour:'numeric', minute:'numeric'  }));

    if(debug>5){log("    -> ShowBlock eMail");}
    SetDisplay("Sample_eMail","block");
    if(debug>5){log("    -> SetClass eMail");}
    SetClass("Sample_eMail",OneSample.Style);
  }else if(OneSample.Style=='android'){
    if(debug>5){log("    -> Sender Update : "+OneSample.Sender);}
    SetHTML("sms_num_exp",      replaceTAG(OneSample.Sender));
    SetHTML("sms_exp",          messages.Conversation.replace("#sender#",OneSample.Sender));
    SetHTML("SMS_text",         replaceTAG(OneSample.Body));

    
    // Date
    let DoD = messages.Days[new Date().getDay()];
    let Hours = new Date().toLocaleTimeString("fr",{ hour:'numeric', minute:'numeric'  });
    SetText("hour_top",    new Date().toLocaleTimeString("fr",{ hour:'numeric', minute:'numeric'  }));
    SetHTML("dayhour_start",    DoD +" &#8226; "+Hours);
    SetText("dayhour_received", DoD.substring(0,3)+". "+Hours);
    

    if(debug>5){log("    -> ShowBlock SMS");}
    SetDisplay("Sample_SMS","block");
    if(debug>5){log("    -> SetClass SMS");}
    SetClass("Sample_SMS",OneSample.Style);
  }

  // if(debug>5){log("    -> Class Update : "+OneSample.Style)}
  // SetClass("Sample",OneSample.Style);

  
    

  if(debug>1){log("    -> Phishing Update : "+OneSample.Phishing)}
  SetHTML("Sample_Phishing",    OneSample.Phishing);

  if(debug>1){log("    -> AnswerBad Update : "+OneSample.AnswerBad)}
  SetHTML("Sample_AnswerBad",    replaceTAG(OneSample.AnswerBad));

  if(debug>1){log("    -> AnswerGood Update : "+OneSample.AnswerGood)}
  SetHTML("Sample_AnswerGood",    replaceTAG(OneSample.AnswerGood));

  if(debug>1){log("    -> Level Update : "+OneSample.Level)}
  SetHTML("Sample_Level",    OneSample.Level);
  
}

/* JSON function */
function LoadFile(JSON_Fic,num=0){
  log("[FUNC] Loading ("+num+") JSON Fic: "+JSON_Fic);
  
  if(Samples.length>0){
    //Already Loaded
    log(" -> Load from array");
    if(num==Samples.length){
      log("Nothing more to load...");
      Finished();
    }else{
      Load_To_Table(Samples[num]);
      SetDisplay("Response",    "table");// car c'est un table
      SetHTML("Exp_Infos",replaceTAG(messages.explanation_stp));
    }
  }else{
    log(" -> Load from JSON");
    try {
      fetch(JSON_Fic)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        // document.cookie = "Total=" + data.length + CookieSecur;
        
        //We have to select only Test_Length sample, randomly
        final_list = shuffle(data).splice(0, 10); 
        // for (var i = 0; i < Test_Length; i++) {
          
        //   var indice = Math.floor(Math.random() * data.length)
        //   var randomElement = data[indice];
        //   randomElement.splice(indice, 1); 
        //   final_list[i]=randomElement;
        // }
        
        Total = final_list.length;
        SetHTML("Exp_Infos",replaceTAG(messages.explanation_stp));
        
        if(num==final_list.length){
          log("Nothing more to load...Weared because it's a analysation.");
          Finished();
        }else{
          Samples = final_list;
          Load_To_Table(final_list[num]);
          SetDisplay("Response",    "table"); // car c'est un table
        }
      });
    } catch (e) {
     document.getElementById("error").innerHTML = e;
    }
    
  }
  


}

function Finished(){
  log("Game Finished");
  if(debug>1){log("Hiding unused part");}
  
  SetDisplay("Question",    "none");
  SetDisplay("Response",    "none");
  SetDisplay("Explanation", "none");
  SetDisplay("Loading",     "none");
  SetDisplay("Sample_eMail","none");
  SetDisplay("Sample_SMS",  "none");

  if(debug>1){log("Showing result");}
  SetDisplay("Termination",      "inline"); // car c'est un p.
  
  var comment = ""

  if(Success==Pending){
    comment="Un sans faute, magnifique";
    SetColor("Result",      "green");
  } else if(Success==Pending-1) {
    comment="Une faute, on va dire que c'était de l'innatention";
    SetColor("Result",      "lightgreen");
  } else if(Success==Pending-2) {
    comment="Deux fautes, peux mieux faire.";
    SetColor("Result",      "orange");
  } else if(Success==0) {
    comment="Là faut vraiment faire attention désormais.";
    SetColor("Result",      "red");
  } else {
    comment="Il va falloir retravailler ça. Votre compte bancaire vous remerciera.";
    SetColor("Result",      "orangered");
  }

  if(debug>1){log("Showing result text");}
  var millis = Date.now() - starttime;
  let chronometre = Math.floor((millis-explanation_time) / 1000);
  SetHTML("Result","Le jeux/test est fini cher "+User+"<br>Vous avez "+(parseInt(Success))+"/"+(parseInt(Total))+" en "+chronometre+" secondes.<br>"+comment);
}

/* Main idea */
function main(){
  /* Full Run */
  log("Starting (debug = "+debug+")");
  CookieInit();
  AddListener();
  SetDisplay("Termination",        "none");
  SetDisplay("Sample_Headers",     "none");
  SetDisplay("Headers_Area",       "none");

  SetDisplay("Sample_AnswerGood",  "none");
  SetDisplay("Sample_AnswerBad",   "none");

  SetDisplay("Line_Btn_Next",      "none");

  if(debug<1){
    SetDisplay("Sample_Level",       "none");
    SetDisplay("Sample_Phishing",    "none");
  }else{
    SetDisplay("Sample_Level",       "block");// Car c'est une ligne de tableau
    SetDisplay("Sample_Phishing",    "block");// Car c'est une ligne de tableau
  }

  // Hide log
  if(debug<1){SetDisplay("logger",       "none");}

  // Hide Error
  if(debug<1){SetDisplay("error",        "none");}
  

  SetDisplay("Loading","table");
  
  SetDisplay("Sample_eMail","none"); 
  SetDisplay("Sample_SMS","none"); 
  
  LoadFile("./samples.json",Pending);
  
  sleep(1000).then(() => {
    if(document.getElementById("Termination").style.display == "none"){
      SetDisplay("Loading",        "none");
    }
  });
  
}




try {
   main();
 } catch (e) {
  document.getElementById("error").innerHTML = e;
} 

