"use strict";

// To add media, set mediaFile to a local path such as
// "assets/images/station-1.jpg"
const stations = [
  {
    id: 1,
    position: 7,
    letter: "A",
    title: "Art, Identity, and Defiance",
    arabic: "الفن",
    clue: "",
    text: [
      "Palestinian artists use painting, cartoons, sculpture, posters, and other visual forms to preserve identity and collective memory. Through symbols of the land, culture, exile, and sumud, their work depicts displacement, expresses the longing for return, and affirms Palestinian identity and defiance.",

      "Across generations and artistic styles, Palestinian art carries history, examines Palestinian life, confronts erasure, and helps imagine a liberated future.",
    ],
    media: "image",
    mediaFile: "assets/images/station1.jpeg",
    style: "art",
    nextDirection: "[Direction from Station 1 to Station 2]"
  },

  {
    id: 2,
    position: 9,
    letter: "C",
    title: "The Great March of Return",
    arabic: "الاحتجاج",
    clue: "",
    text: [
      "The Great March of Return began on Land Day, March 30, 2018. Palestinians in Gaza joined mass demonstrations calling for the Palestinian right of return and an end to the blockade.",
      "The demonstrations used public gathering and collective visibility to assert Palestinian rights before the world."
    ],
    media: "image",
    mediaFile: "assets/images/greatmarch.png",
    style: "march",
    nextDirection: "[Direction from Station 2 to Station 3]"
  },

  {
    id: 3,
    position: 4,
    letter: "I",
    title: "Documenting What Cannot Be Erased",
    arabic: "التوثيق",
    clue: "",
    text: [
      "Palestinian historians, researchers, archivists, and families preserve maps, land records, photographs, testimonies, and the names of depopulated villages.",
      "Documentation challenges erasure by preserving evidence of Palestinian life, history, community, and belonging."
    ],
    media: "image",
    mediaFile: "assets/images/station3.jpeg",
    style: "archive",
    nextDirection: "[Direction from Station 3 to Station 4]"
  },

  {
    id: 4,
    position: 5,
    letter: "S",
    title: "Sumud: Remaining Rooted",
    arabic: "الصمود",
    clue: "",
    text: [
      "Sumud — صمود — means steadfastness. It can be expressed by remaining on the land, caring for a home, harvesting olives, preserving community, and continuing ordinary life under extraordinary conditions.",
      "Sumud demonstrates the power of perseverance, rootedness, and refusing to be displaced."
    ],
    media: "image",
    mediaFile: "assets/images/station4.jpg",
    style: "sumud",
    nextDirection: "[Direction from Station 4 to Station 5]"
  },

  {
    id: 5,
    position: 8,
    letter: "N",
    title: "The Power of Collective Refusal",
    arabic: "عدم التعاون",
    clue: "",
    text: [
      "During the 1936 general strike, Palestinian workers, merchants, and communities collectively disrupted ordinary economic activity to oppose British colonial rule and Zionist settlement.",
      "Strikes and collective refusal demonstrate the political power people possess when they withdraw their labor and cooperation together."
    ],
    media: "image",
    mediaFile: "assets/images/station5.jpg",
    style: "strike",
    nextDirection: "[Direction from Station 5 to Station 6]"
  },

  {
    id: 6,
    position: 3,
    letter: "S",
    title: "Testimony and Memory",
    arabic: "الشهادة",
    clue: "",
    text: [
      "Palestinian survivors and elders have preserved memories of their villages, homes, customs, and displacement through oral history.",
      "Telling these stories prevents Palestinian experiences from being erased and carries memory from one generation to the next."
    ],
    media: "image",
    mediaFile: "assets/images/station6.jpg",
    style: "testimony",
    nextDirection: "[Direction from Station 6 to Station 7]"
  },

  {
    id: 7,
    position: 2,
    letter: "E",
    title: "Education Against Erasure",
    arabic: "التعليم",
    clue: "",
    text: [
      "When Palestinian schools and universities were closed during the First Intifada, communities organized education in homes, mosques, and other informal spaces.",
      "By continuing to teach, Palestinians refused to allow military closures to deprive an entire generation of education."
    ],
    media: "image",
    mediaFile: "assets/images/station7.jpg",
    style: "school",
    nextDirection: "[Direction from Station 7 to Station 8]"
  },

  {
    id: 8,
    position: 6,
    letter: "T",
    title: "Boycott and Collective Pressure",
    arabic: "المقاطعة",
    clue: "",
    text: [
      "Boycotts allow people to withhold financial support from companies and institutions connected to injustice.",
      "When practiced collectively, an ordinary purchasing decision becomes a form of organized economic pressure and principled collective action."
    ],
    media: "image",
    mediaFile: "assets/images/station8.jpg",
    style: "boycott",
    nextDirection: "[Direction from Station 8 to Station 9]"
  },

  {
    id: 9,
    position: 1,
    letter: "R",
    title: "Rebuilding and Renewal",
    arabic: "إعادة البناء",
    clue: "",
    text: [
      "Palestinians rebuild homes, replant olive trees, and restore spaces damaged or destroyed by displacement and violence.",
      "Rebuilding refuses the idea that destruction must be permanent. It affirms an intention to remain, return, and begin again."
    ],
    media: "image",
    mediaFile: "assets/images/station9.jpg",
    style: "olive",
    nextDirection: "[Direction from Station 9 to Station 10]"
  },

  {
    id: 10,
    position: 10,
    letter: "E",
    title: "Writing Against Erasure",
    arabic: "الكتابة",
    clue: "",
    text: [
      "Palestinian poets, novelists, journalists, prisoners, and diarists have used writing to document life, confront erasure, preserve memory, and imagine freedom.",
      "A written work can cross borders, survive its author, and ensure that experiences others attempt to silence remain present."
    ],
    media: "image",
    mediaFile: "assets/images/station10.jpg",
    style: "writing",
    nextDirection: ""
  }
];

const KEY="palestine-resistance-hunt-v1";
const $=selector=>document.querySelector(selector);
let found=loadProgress(), active=null, scanner=null;

function loadProgress(){
  try{
    const value=JSON.parse(localStorage.getItem(KEY)||"[]");
    return Array.isArray(value)?value.filter(id=>Number.isInteger(id)&&id>=1&&id<=10):[];
  }catch{return[]}
}
function renderProgress(){
  const count=found.length;
  $("#letterGrid").innerHTML = Array.from(
      { length: 10 },
      (_, index) => index + 1
    ).map(position => {
      const station = stations.find(item => item.position === position);
      const collected = found.includes(station.id);

      return `
        <div class="letter-tile ${collected ? "collected" : ""}">
          <span>${collected ? station.letter : ""}</span>
          <small>${position}</small>
        </div>
      `;
    }).join("");
  $("#foundCount").textContent=count;
  $("#ringCount").textContent=count;
  $("#progressRing").style.setProperty("--progress",`${count*36}deg`);
  $("#progressBar").style.width=`${count*10}%`;
  $("#progressCopy").textContent=count===0?"Your first letter is waiting.":count<10?`${10-count} station${10-count===1?"":"s"} remaining.`:"You found every station.";
}
function show(element){element.classList.remove("hidden");lockPage()}
function hide(element){element.classList.add("hidden");lockPage()}
function lockPage(){document.body.classList.toggle("no-scroll",Boolean(document.querySelector(".modal-layer:not(.hidden)")))}
function fromHash(){
  const match=location.hash.match(/^#station-?(\d+)$/i);
  return match?stations.find(s=>s.id===Number(match[1]))||null:null;
}
function mediaHTML(s) {
  if (!s.mediaFile) return "";

  return `<img class="media-slot" src="${s.mediaFile}" alt="">`;
}
function openStation(s){
  active=s;
  $("#stationNumber").textContent=`Station ${String(s.id).padStart(2,"0")}`;
  $("#stationArabic").textContent=s.arabic;
  $("#stationTitle").textContent=s.title;
  $("#stationClue").textContent=s.clue;
  $("#mediaType").textContent = "Clue image";
  $("#stationExplanation").innerHTML=s.text.map(p=>`<p>${p}</p>`).join("");
  const visual=$("#stationVisual");
  visual.className=`station-visual ${s.style} ${s.mediaFile?"has-media":""}`;
  visual.querySelectorAll(".media-slot").forEach(item=>item.remove());
  visual.insertAdjacentHTML("afterbegin",mediaHTML(s));
  renderStationAction();
  show($("#stationModal"));
}
function renderStationAction() {
  const collected = found.includes(active.id);

  const nextStep = active.nextDirection
    ? `
        <div class="next-clue">
          <span>Next clue</span>
          <p>${active.nextDirection}</p>
        </div>
      `
    : `
        <div class="next-clue">
          <span>Final clue collected</span>
          <p>
            You have reached the end of the trail. Complete your
            answer to reveal the language of liberation.
          </p>
        </div>
      `;

  $("#stationAction").innerHTML = collected
    ? `
        <div class="revealed-panel">
          <span>✓ Letter collected</span>

          <strong>${active.letter}</strong>

          <p class="position-message">
            This letter has been added to position ${active.position}.
          </p>

          ${nextStep}

          <button class="secondary-button" id="continueButton">
            Continue the Hunt ›
          </button>
        </div>
      `
    : `
        <button class="reveal-button" id="revealButton">
          Reveal Letter ›
        </button>
      `;

  $("#revealButton")?.addEventListener("click", reveal);
  $("#continueButton")?.addEventListener("click", closeStation);
}
function reveal(){
  if(!found.includes(active.id)){
    found=[...found,active.id].sort((a,b)=>a-b);
    localStorage.setItem(KEY,JSON.stringify(found));
    renderProgress();
  }
  renderStationAction();
  if(found.length===10)setTimeout(()=>show($("#completionModal")),700);
}
function closeStation(){
  hide($("#stationModal"));
  active=null;
  history.replaceState(null,"",location.pathname+location.search);
}
function closeGuide(){
  localStorage.setItem(`${KEY}-welcomed`,"true");
  hide($("#guideModal"));
}
function scannerError(message){
  $("#scannerError").textContent=message;
  $("#scannerError").classList.remove("hidden");
}
async function openScanner(){
  $("#scannerError").classList.add("hidden");
  show($("#scannerModal"));
  if(!window.QrScanner){scannerError("The scanner could not load. Use your phone’s Camera app instead.");return}
  QrScanner.WORKER_PATH="vendor/qr-scanner/qr-scanner-worker.min.js";
  scanner=new QrScanner($("#cameraVideo"),result=>{
    const data=typeof result==="string"?result:result.data;
    let hash="";try{hash=new URL(data,location.href).hash}catch{}
    if(!/^#station-?\d+$/i.test(hash)){scannerError("That code is not part of this scavenger hunt.");return}
    closeScanner();location.hash=hash;
  },{returnDetailedScanResult:true,highlightScanRegion:true,highlightCodeOutline:true});
  try{await scanner.start()}catch{scannerError("Camera access was unavailable. Use your phone’s Camera app instead.")}
}
function closeScanner(){
  if(scanner){scanner.destroy();scanner=null}
  hide($("#scannerModal"));
}
function reset(){
  if(!confirm("Clear every collected letter and restart the hunt?"))return;
  localStorage.removeItem(KEY);found=[];renderProgress();hide($("#completionModal"));
}

$("#guideButton").addEventListener("click",()=>show($("#guideModal")));
$("#beginButton").addEventListener("click",closeGuide);
$("#scanButton").addEventListener("click",openScanner);
$("#resetButton").addEventListener("click",reset);
document.querySelectorAll("[data-close]").forEach(button=>button.addEventListener("click",()=>{
  if(button.dataset.close==="station")closeStation();
  if(button.dataset.close==="guide")closeGuide();
  if(button.dataset.close==="scanner")closeScanner();
  if(button.dataset.close==="completion")hide($("#completionModal"));
}));
addEventListener("hashchange",()=>{const s=fromHash();if(s)openStation(s)});
addEventListener("storage",event=>{
  if(event.key===KEY){found=loadProgress();renderProgress();if(active)renderStationAction()}
});

renderProgress();
const first=fromHash();
if(first)openStation(first);
else if(!localStorage.getItem(`${KEY}-welcomed`))show($("#guideModal"));
