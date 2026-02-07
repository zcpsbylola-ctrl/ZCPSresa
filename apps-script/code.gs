const SHEET_ID = 'VOTRE_GOOGLE_SHEET_ID';
const CALENDAR_ID = 'VOTRE_GOOGLE_CALENDAR_ID';
const SERVICE_DURATION = 25;
const BUFFER_DURATION = 30;

function doGet(e){
  const action = e.parameter.action;
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('bookings');
  if(action==='get'){
    const data = sheet.getDataRange().getValues().slice(1).map(r=>{
      let d = r[0];
      if (d instanceof Date) {
        d = d.toISOString().split('T')[0];
      }
      return {date:d, slots:r[3].split(','), phone:r[4]};
    });
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e){
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('bookings');
  const startTime = new Date(`${data.date}T${data.start_time}:00`);
  const endTime = new Date(startTime.getTime() + (SERVICE_DURATION+BUFFER_DURATION)*60000);

  // Vérifier double booking
  const rows = sheet.getDataRange().getValues();
  for(let i=1;i<rows.length;i++){
    const s = new Date(`${rows[i][0]}T${rows[i][1]}:00`);
    const eTime = new Date(`${rows[i][0]}T${rows[i][2]}:00`);
    if(s < endTime && eTime > startTime) return ContentService.createTextOutput(JSON.stringify({error:'taken'})).setMimeType(ContentService.MimeType.JSON).setResponseCode(409);
  }

  sheet.appendRow([data.date,data.start_time,formatEnd(endTime),data.slots.join(','),data.phone,new Date()]);
  CalendarApp.getCalendarById(CALENDAR_ID).createEvent('Réservation', startTime, endTime, {description:`Téléphone : ${data.phone}`});
  return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
}

function formatEnd(d){ return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`; }