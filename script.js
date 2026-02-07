// CONFIGURATION
const PHONE_NUMBER = '33605656753';
const DAYS_TO_DISPLAY = 21;
const START_HOUR = 9;
const END_HOUR = 19;
const MINUTE_INCREMENT = 15;
const SERVICE_DURATION = 25;
const BUFFER_DURATION = 30;
const TOTAL_DURATION = SERVICE_DURATION + BUFFER_DURATION;

let bookedSlotsCache = [];
let selectedSlot = null;
const dayNames = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const monthNames = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Aoû','Sep','Oct','Nov','Déc'];

function formatTime(hour, minute){return `${hour.toString().padStart(2,'0')}:${minute.toString().padStart(2,'0')}`;}
function formatDate(date){return `${date.getDate()} ${monthNames[date.getMonth()]}`;}
function isSlotPast(date,h,m){const now=new Date();const slot=new Date(date);slot.setHours(h,m,0,0);return slot<now;}

// --- GOOGLE SHEET API ---
const SHEET_API = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

async function loadBookedSlots(){
  const res = await fetch(SHEET_API+'?action=get');
  bookedSlotsCache = await res.json();
}

function isSlotBooked(date,h,m){
  const dateStr = date.toISOString().split('T')[0];
  const timeStr = formatTime(h,m);
  return bookedSlotsCache.some(b=>b.date===dateStr && b.slots.includes(timeStr));
}

function getSlotsToBlock(hour,minute){
  const slots=[]; let total=0,h=hour,m=minute;
  while(total<TOTAL_DURATION){
    slots.push(formatTime(h,m));
    m+=MINUTE_INCREMENT;
    if(m>=60){ m=0; h++; }
    total+=MINUTE_INCREMENT;
  }
  return slots;
}

function canSelectSlot(date,h,m){
  const dateStr = date.toISOString().split('T')[0];
  const slots = getSlotsToBlock(h,m);
  return !slots.some(time => bookedSlotsCache.some(b=>b.date===dateStr && b.slots.includes(time)));
}

// --- CALENDAR ---
const today = new Date(); today.setHours(0,0,0,0);

function createCalendar(){
  const container = document.getElementById('calendarContainer'); container.innerHTML='';
  for(let i=0;i<DAYS_TO_DISPLAY;i++){
    const date=new Date(today); date.setDate(today.getDate()+i);
    const dayColumn=document.createElement('div'); dayColumn.className='day-column';
    const header=document.createElement('div'); header.className='day-header';
    if(i===0) header.classList.add('today');
    const dayName=document.createElement('div'); dayName.className='day-name'; dayName.textContent=dayNames[date.getDay()];
    const dayDate=document.createElement('div'); dayDate.className='day-date'; dayDate.textContent=formatDate(date);
    header.appendChild(dayName); header.appendChild(dayDate);
    const timeline=document.createElement('div'); timeline.className='timeline';
    for(let h=START_HOUR;h<=END_HOUR;h++){
      for(let m=0;m<60;m+=MINUTE_INCREMENT){
        if(h===END_HOUR && m>0) break;
        const slot=document.createElement('div'); slot.className='time-slot';
        const past=isSlotPast(date,h,m);
        const booked=isSlotBooked(date,h,m);
        if(past) slot.classList.add('past');
        else if(booked || !canSelectSlot(date,h,m)) slot.classList.add('booked');
        else slot.addEventListener('click',()=>selectSlot(date,h,m,slot));
        const label=document.createElement('div'); label.className='time-label'; label.textContent=formatTime(h,m);
        slot.appendChild(label); timeline.appendChild(slot);
      }
    }
    dayColumn.appendChild(header); dayColumn.appendChild(timeline); container.appendChild(dayColumn);
  }
}

// --- SELECTION ---
function selectSlot(date,h,m,slot){
  if(selectedSlot && selectedSlot.element) selectedSlot.element.classList.remove('selected');
  slot.classList.add('selected');
  selectedSlot={date,h,m,element:slot};
  updateUI();
  slot.scrollIntoView({behavior:'smooth',block:'center'});
}

function updateUI(){
  const info=document.getElementById('selectionInfo'); const validateBtn=document.getElementById('validateBtn');
  if(selectedSlot){
    const d=selectedSlot.date;
    const dayName = dayNames[d.getDay()];
    const dateStr = `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    const timeStr = formatTime(selectedSlot.h,selectedSlot.m);
    info.textContent=`${dayName} ${dateStr} • ${timeStr}`; info.classList.add('active'); validateBtn.disabled=false;
  }else{ info.textContent='Sélectionnez un horaire'; info.classList.remove('active'); validateBtn.disabled=true; }
}

function reset(){ if(selectedSlot && selectedSlot.element) selectedSlot.element.classList.remove('selected'); selectedSlot=null; updateUI(); }

// --- VALIDATION ---
async function validate(){
  if(!selectedSlot) return;
  const slots=getSlotsToBlock(selectedSlot.h,selectedSlot.m);
  const payload={ action:'post', date:selectedSlot.date.toISOString().split('T')[0], start_time:formatTime(selectedSlot.h,selectedSlot.m), slots, phone:PHONE_NUMBER };
  const res = await fetch(SHEET_API,{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
  if(!res.ok){ alert('Ce créneau est déjà réservé'); await loadBookedSlots(); createCalendar(); return; }
  const d = selectedSlot.date;
  const dateFormatted = `${dayNames[d.getDay()]} ${d.getDate()} ${monthNames[d.getMonth()]}`;
  const message=`Bonjour Lola 🌸\n\nJe souhaite réserver un rendez-vous :\n📅 Date : ${dateFormatted}\n⏰ Heure : ${formatTime(selectedSlot.h,selectedSlot.m)}\nMerci !`;
  window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`,'_blank');
  setTimeout(()=>{ reset(); createCalendar(); },500);
}

// --- INIT ---
async function init(){
  const loader=document.getElementById('loader'); const container=document.getElementById('calendarContainer');
  await loadBookedSlots(); createCalendar(); loader.style.display='none'; container.style.display='flex';
  setInterval(async()=>{ await loadBookedSlots(); createCalendar(); },30000);
}

document.getElementById('resetBtn').addEventListener('click',reset);
document.getElementById('validateBtn').addEventListener('click',validate);
init();