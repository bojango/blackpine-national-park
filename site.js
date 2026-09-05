const BP={
 stations:[
  {code:'WS-04',lat:48.74,lon:-121.07,elev:'1,184 m'},
  {code:'WS-02',lat:47.72,lon:-123.16,elev:'920 m'},
  {code:'WS-07',lat:48.53,lon:-118.96,elev:'1,306 m'},
  {code:'WS-01',lat:49.42,lon:-114.06,elev:'1,142 m'},
  {code:'WS-05',lat:50.68,lon:-116.20,elev:'1,422 m'},
  {code:'WS-09',lat:46.85,lon:-121.75,elev:'1,575 m'}
 ],
 weatherCodes:{0:'Clear',1:'Mostly clear',2:'Broken cloud',3:'Overcast',45:'Fog',48:'Freezing fog',51:'Light drizzle',53:'Drizzle',55:'Heavy drizzle',61:'Light rain',63:'Rain',65:'Heavy rain',71:'Light snow',73:'Snow',75:'Heavy snow',80:'Rain showers',81:'Rain showers',82:'Heavy showers',85:'Snow showers',86:'Heavy snow showers',95:'Thunderstorms',96:'Thunderstorms / hail',99:'Severe thunderstorms'},
 nav(){const p=(location.pathname.split('/').pop()||'index.html');document.querySelectorAll('.main-nav a').forEach(a=>{if(a.getAttribute('href')===p)a.classList.add('active')});},
 daySeed(){const d=new Date();return Math.floor(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate())/86400000)},
 mulberry32(a){return function(){let t=a+=0x6D2B79F5;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}},
 station(){return this.stations[this.daySeed()%this.stations.length]},
 async weather(){const s=this.station();const u=`https://api.open-meteo.com/v1/forecast?latitude=${s.lat}&longitude=${s.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&forecast_days=1`;
   try{const r=await fetch(u);if(!r.ok)throw new Error('weather');return {s,data:await r.json()}}catch(e){return null}},
 compass(deg){return ['N','NE','E','SE','S','SW','W','NW'][Math.round((deg||0)/45)%8]},
 async renderWeather(){const els=document.querySelectorAll('[data-weather]');if(!els.length)return;const w=await this.weather();if(!w){els.forEach(e=>e.textContent=e.dataset.fallback||'Station unavailable');return}const c=w.data.current,d=w.data.daily,s=w.s;const vals={temp:`${Math.round(c.temperature_2m)}°`,condition:this.weatherCodes[c.weather_code]||'Variable',station:s.code,elev:s.elev,wind:`${Math.round(c.wind_speed_10m)} mph ${this.compass(c.wind_direction_10m)}`,humidity:`${c.relative_humidity_2m}%`,pressure:`${Math.round(c.surface_pressure)} hPa`,cloud:`${c.cloud_cover}%`,rain:`${c.precipitation} in`,high:`${Math.round(d.temperature_2m_max[0])}°F`,low:`${Math.round(d.temperature_2m_min[0])}°F`,precip:`${d.precipitation_probability_max[0]}%`,sunrise:new Date(d.sunrise[0]).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),sunset:new Date(d.sunset[0]).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})};els.forEach(e=>{e.textContent=vals[e.dataset.weather]??''});},
 notices(){const pool=[
  ['Trail advisory','Bridge decking loose on the lower Coldwater Trail. One-at-a-time crossing advised.','advisory'],
  ['Bear activity','Food storage order remains in effect for North Fork and Whitebark campgrounds.','advisory'],
  ['Road conditions','Forest Road 6 open to high-clearance vehicles only beyond Alder Creek junction.','open'],
  ['Fire operations','Seasonal fuels crew conducting pile work west of Juniper drainage. Smoke may be visible.','advisory'],
  ['Water system','Potable water unavailable at Morrow Basin trailhead. Carry sufficient water.','advisory'],
  ['Backcountry permit desk','Alder Creek ranger desk open 08:00–16:30, Thursday through Monday.','open'],
  ['Trail closure','Upper Granite Shelf closed beyond mile 7.2 due to rockfall.','closed'],
  ['Weather advisory','Rapid temperature changes expected above timberline after 16:00.','advisory']
 ];let r=this.mulberry32(this.daySeed()+904);return [...pool].sort(()=>r()-.5).slice(0,4)},
 renderNotices(){const box=document.querySelector('[data-notice-list]');if(!box)return;box.innerHTML=this.notices().map((n,i)=>`<article class="notice"><div class="notice-meta"><span>${new Date(Date.now()-i*86400000).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span><span class="tag ${n[2]}">${n[2]}</span></div><h3>${n[0]}</h3><p>${n[1]}</p></article>`).join('')},
 lostItems(){return [
  ['LF-261','Canvas daypack','Juniper Pass trailhead','Brown canvas pack with metal-frame support. No identification.'],
  ['LF-262','Prescription sunglasses','Coldwater Lake dock','Black plastic frames in green hard case.'],
  ['LF-263','Child’s rain jacket','Whitebark Campground','Yellow shell, youth size. Initials “T.M.” written on tag.'],
  ['LF-264','Compact camera','Boundary Trail, mile 4','35 mm point-and-shoot camera. Film remains inside.'],
  ['LF-265','Brass key tag','Alder Creek visitor lot','Single brass key on stamped tag marked SABLE-7.'],
  ['LF-266','Walking pole','North Fork footbridge','Single telescopic pole with cork grip.'],
  ['LF-267','Silver thermos','Moraine Spur','Dented 1 litre vacuum flask.'],
  ['LF-268','Field notebook','Blackpine Ridge shelter','Green Rite-in-the-Rain notebook. Owner name illegible.'],
  ['LF-269','Wool glove','Forest Road 12 gate','Single red wool glove, adult size.'],
  ['LF-270','Cassette tape','Old Cedar Road','Unlabelled Type II cassette in cracked clear case.'],
  ['LF-271','Binoculars','Morrow Peak approach','8×42 binoculars with faded orange neck strap.'],
  ['LF-272','Pocket compass','Granite Shelf','Brass sighting compass. Engraving removed from case.'],
  ['LF-X14','Unidentified photographic slide','Service track north of Boundary Basin','35 mm colour transparency. Image appears to show an interior concrete stairwell. No comparable structure is recorded in the immediate area.','oddity'],
  ['LF-X18','Unidentified metal plate','Blackpine Ridge drainage','Rectangular steel plate, 9 × 14 cm. Three drilled holes. No manufacturer mark. Recovered below exposed bedrock.','oddity']
 ]},
 renderLost(){const box=document.querySelector('[data-lost-grid]');if(!box)return;let all=this.lostItems(),seed=this.daySeed(),r=this.mulberry32(seed+38),normal=all.filter(x=>!x[4]).sort(()=>r()-.5).slice(0,8);if(seed%19===0)normal[7]=all.filter(x=>x[4])[seed%2];box.innerHTML=normal.map(x=>`<article class="lost-item ${x[4]||''}"><div class="lost-thumb"><span class="lost-icon">${x[0]}</span></div><div class="lost-body"><div class="meta-row"><span>${x[2]}</span></div><h3>${x[1]}</h3><p>${x[3]}</p></div></article>`).join('')},
 bindForm(){document.querySelectorAll('[data-interest-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const ref=`BP-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9000)+1000)}`;localStorage.setItem('blackpine-interest',JSON.stringify(Object.fromEntries(new FormData(f))));const s=f.querySelector('.form-status');s.textContent=`Expression of interest recorded locally. Reference ${ref}. No information has been transmitted from this demonstration site.`;f.reset()}))},
 init(){this.nav();this.renderWeather();this.renderNotices();this.renderLost();this.bindForm();}
};
document.addEventListener('DOMContentLoaded',()=>BP.init());
