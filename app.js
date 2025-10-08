// ------------------- DATA -------------------
let vehicles = [
  { plate: "NGX 4853", whereabouts: "Batangas City", history: [] },
  { plate: "NGX 4856", whereabouts: "Batangas City", history: [] },
  { plate: "NFZ 2848", whereabouts: "Batangas City", history: [] },
  { plate: "CBP 5511", whereabouts: "Batangas City", history: [] },
  { plate: "CBP 1336", whereabouts: "Batangas City", history: [] },
  { plate: "ZSG 105", whereabouts: "Batangas City", history: [] },
  { plate: "UOF 225", whereabouts: "Batangas City", history: [] },
  { plate: "NQX 657", whereabouts: "Batangas City", history: [] },
  { plate: "WQT 225", whereabouts: "Batangas City", history: [] },
  { plate: "MAM 7806", whereabouts: "Batangas City", history: [] },
  { plate: "NBO 6586", whereabouts: "Batangas City", history: [] },
  { plate: "EMPTY", whereabouts: "Batangas City", history: [] },
];

const details = {
  "NGX 4853": { model: "Mitsubishi L300", yearBought: "2022", status: "Active" },
  "NGX 4856": { model: "Mitsubishi L300", yearBought: "2021", status: "Active" },
  "NFZ 2848": { model: "Isuzu Traviz", yearBought: "2023", status: "Under Maintenance" },
  "CBP 5511": { model: "Isuzu Elf Truck", yearBought: "2021", status: "Active" },
  "CBP 1336": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance" },
  "ZSG 105": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance" },
  "UOF 225": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance" },
  "NQX 657": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance" },
  "WQT 225": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance" },
  "MAM 7806": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance" },
  "NBO 6586": { model: "Isuzu Elf Truck", yearBought: "2023", status: "Under Maintenance" },
  "EMPTY": { model: "Unknown", yearBought: "N/A", status: "Inactive" },
};

const vehicleImages = {
  "NGX 4853": "https://alpinemotors.com.ph/wp-content/uploads/2021/05/L300.png",
  "NGX 4856": "https://alpinemotors.com.ph/wp-content/uploads/2021/05/L300.png",
  "NFZ 2848": "https://www.isuzu-gencars.com.ph/wp-content/uploads/2020/07/Isuzu-TRAVIZ-Utility-Van-222-scaled.jpg",
  "CBP 5511": "https://carused.jp/images/elf/flatbody.jpg",
  "CBP 1336": "https://carused.jp/images/elf/flatbody.jpg",
  "ZSG 105": "https://alpinemotors.com.ph/wp-content/uploads/2021/05/L300.png",
  "UOF 225": "https://www.isuzu-gencars.com.ph/wp-content/uploads/2020/07/Isuzu-TRAVIZ-Utility-Van-222-scaled.jpg",
  "NQX 657": "https://www.carmag.co.za/wp-content/uploads/2023/10/Isuzu-D-Max-edit-2-800x480.png",
  "WQT 225": "https://alpinemotors.com.ph/wp-content/uploads/2021/05/L300.png",
  "MAM 7806": "https://carused.jp/images/elf/flatbody.jpg",
  "NBO 6586": "https://www.isuzu-gencars.com.ph/wp-content/uploads/2020/07/Isuzu-TRAVIZ-Utility-Van-222-scaled.jpg",
  "EMPTY": "https://media.licdn.com/dms/image/D560BAQGwtTvFVA5e_Q/company-logo_200_200/0/1697595933193?e=2147483647&v=beta&t=kOA11OZMk-StnPS_3-MpbicPzWtUTavPSMqPgvYGEuc"
};

const app = document.getElementById("app");
let selectedVehicle = null;
let activeTab = "Details";

// ------------------- CLOCK -------------------
function updateClock() {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// ------------------- RENDER -------------------
function renderList() {
  app.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "grid";

  vehicles.forEach(v => {
    const card = document.createElement("div");
    card.className = "card";
    const imgUrl = vehicleImages[v.plate] || "https://via.placeholder.com/200x120?text=Vehicle";
    card.innerHTML = `
      <img src="${imgUrl}" alt="${v.plate}" />
      <h2>${v.plate}</h2>
      <p>Whereabouts: ${v.whereabouts}</p>
    `;
    card.onclick = () => { selectedVehicle = v.plate; activeTab = "Details"; renderDetails(); };
    grid.appendChild(card);
  });

  app.appendChild(grid);
}

function renderDetails() {
  const v = vehicles.find(x => x.plate === selectedVehicle);
  const d = details[selectedVehicle] || {};
  app.innerHTML = `
    <button onclick="backToList()">← Back</button>
    <h1>${v.plate}</h1>
    <div class="tab-buttons">
      ${["Details","Maintenance","Vehicle Request","Whereabouts","Fuel","Reports","History"]
        .map(tab => `<button onclick="setTab('${tab}')" class="${activeTab===tab?'active':''}">${tab}</button>`).join("")}
    </div>
    <div id="tabContent"></div>
  `;
  renderTab(v,d);
}

function renderTab(v,d) {
  const tabContent = document.getElementById("tabContent");

  if (activeTab === "Details") {
    tabContent.innerHTML = `
      <p><b>Model:</b> ${d.model||"N/A"}</p>
      <p><b>Year Bought:</b> ${d.yearBought||"N/A"}</p>
      <p><b>Status:</b> ${d.status||"N/A"}</p>
      <p><b>Last Trip:</b> ${d.lastTrip||"N/A"}</p>
      <p><b>Last Maintenance:</b> ${d.lastMaintenance||"N/A"}</p>
      <p><b>Whereabouts:</b> ${v.whereabouts}</p>
    `;
  } else if (activeTab === "Maintenance") {
    tabContent.innerHTML = `
      <form onsubmit="submitMaintenance(event)">
        <input type="date" name="date" required />
        <input type="text" name="cv" placeholder="CV Number" required />
        <input type="text" name="reason" placeholder="Reason" required />
        <input type="number" name="cost" placeholder="Cost" required />
        <button type="submit">Submit</button>
      </form>
    `;
  } else if (activeTab === "Vehicle Request") {
    tabContent.innerHTML = `
      <form onsubmit="submitVehicleRequest(event)">
        <input type="date" name="date" required />
        <input type="text" name="project" placeholder="Project" required />
        <input type="text" name="from" placeholder="Job Order #" required />
        <input type="text" name="to" placeholder="Location" required />
        <input type="text" name="driver" placeholder="Driver" required />
        <input type="text" name="purpose" placeholder="Purpose" required />
        <input type="text" name="request" placeholder="Requested By" required />
        <button type="submit">Submit</button>
      </form>
    `;
  } else if (activeTab === "Whereabouts") {
    tabContent.innerHTML = `
      <form onsubmit="submitWhereabouts(event)">
        <select name="place" required>
          <option value="">Select</option>
          <option>Batangas City</option>
          <option>Makati</option>
          <option>Company Use</option>
          <option>Repair Shop</option>
        </select>
        <input type="text" name="company" placeholder="Destination (if Company Use)" />
        <button type="submit">Update</button>
      </form>
    `;
  } else if (activeTab === "Fuel") {
    tabContent.innerHTML = `
      <form onsubmit="submitFuel(event)">
        <input type="date" name="date" required />
        <input type="text" name="bearer" placeholder="Bearer" required />
        <input type="text" name="order" placeholder="PO #" required />
        <select name="gas" required>
          <option value="">Fuel Type</option>
          <option>Diesel</option>
          <option>Gasoline</option>
        </select>
        <input type="number" name="amount" placeholder="Amount" required />
        <button type="submit">Submit</button>
      </form>
    `;
  } else if (activeTab === "Reports") {
    tabContent.innerHTML = `
      <form onsubmit="submitReport(event)">
        <input type="file" name="report" required />
        <button type="submit">Upload</button>
      </form>
    `;
  } else if (activeTab === "History") {
    renderHistory(v, tabContent);
  }
}

// ------------------- HISTORY (Expandable + Sortable + CSV) -------------------
function renderHistory(v, tabContent) {
  if (!v.history.length) {
    tabContent.innerHTML = `<p>No history yet.</p>`;
    return;
  }

  if (!window.expanded) window.expanded = { Maintenance:true, Vehicle:true, Fuel:true, Whereabouts:true, Report:true };
  if (!window.sortState) window.sortState = {};

  const grouped = v.history.reduce((acc,h)=>{ acc[h.type]=acc[h.type]||[]; acc[h.type].push(h); return acc; },{});
  let html="";

  function makeTable(headers, rows, type) {
    return `
      <table>
        <thead style="background:#f3f4f6">
          <tr>
            ${headers.map((h,i)=>
              `<th onclick="sortHistory('${type}',${i})" style="cursor:pointer;">
                ${h} ${window.sortState[type]?.col===i?(window.sortState[type].asc?"▲":"▼"):""}
              </th>`).join("")}
          </tr>
        </thead>
        <tbody>${rows.join("")}</tbody>
      </table>
    `;
  }

  function makeToggle(title,key,tableHtml,color) {
    const isOpen=window.expanded[key];
    return `
      <div style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <button onclick="toggleHistory('${key}')" 
            style="flex:1;text-align:left;font-weight:bold;background:${color};color:white;padding:6px;border:none;border-radius:4px;">
            ${isOpen?"▼":"▶"} ${title}
          </button>
          <button onclick="exportHistory('${key}')" 
            style="margin-left:8px;background:#10b981;color:white;border:none;padding:6px 10px;border-radius:4px;cursor:pointer;">
            ⬇ CSV
          </button>
        </div>
        ${isOpen?tableHtml:""}
      </div>
    `;
  }

  // Sections
  if (grouped["Maintenance"]) {
    let rows=grouped["Maintenance"].map(h=>`<tr><td>${h.date}</td><td>${h.cv}</td><td>${h.reason}</td><td>₱${h.cost}</td></tr>`);
    html+=makeToggle("Maintenance","Maintenance",makeTable(["Date","CV No.","Reason","Cost"],rows,"Maintenance"),"#065f46");
  }
  if (grouped["Vehicle"]) {
    let rows=grouped["Vehicle"].map(h=>`<tr><td>${h.date}</td><td>${h.project}</td><td>${h.from}</td><td>${h.to}</td><td>${h.driver}</td><td>${h.purpose}</td><td>${h.request}</td></tr>`);
    html+=makeToggle("Vehicle Request","Vehicle",makeTable(["Date","Project","Job Order #","Location","Driver","Purpose","Requested By"],rows,"Vehicle"),"#1e40af");
  }
  if (grouped["Fuel"]) {
    let rows=grouped["Fuel"].map(h=>`<tr><td>${h.date}</td><td>${h.bearer}</td><td>${h.order}</td><td>${h.gas}</td><td>₱${h.amount}</td></tr>`);
    html+=makeToggle("Fuel","Fuel",makeTable(["Date","Bearer","PO #","Type","Amount"],rows,"Fuel"),"#c2410c");
  }
  if (grouped["Whereabouts"]) {
    let rows=grouped["Whereabouts"].map(h=>`<tr><td>${h.date}</td><td>${h.place}</td></tr>`);
    html+=makeToggle("Whereabouts","Whereabouts",makeTable(["Date","Location"],rows,"Whereabouts"),"#6d28d9");
  }
  if (grouped["Report"]) {
    let rows=grouped["Report"].map(h=>`<tr><td>${h.date}</td><td>${h.file}</td></tr>`);
    html+=makeToggle("Reports","Report",makeTable(["Date","File"],rows,"Report"),"#b91c1c");
  }

  tabContent.innerHTML=html;
}

// ------------------- HELPERS -------------------
function backToList(){selectedVehicle=null;renderList();}
function setTab(tab){activeTab=tab;renderDetails();}
function addHistory(type,data){const v=vehicles.find(x=>x.plate===selectedVehicle);v.history.push({type,...data});activeTab="History";renderDetails();}
function toggleHistory(key){window.expanded[key]=!window.expanded[key];renderDetails();}
function sortHistory(type,col){
  const state=window.sortState[type]||{col,asc:true};
  if(state.col===col){state.asc=!state.asc;}else{state.col=col;state.asc=true;}
  window.sortState[type]=state;
  const v=vehicles.find(x=>x.plate===selectedVehicle);
  v.history=v.history.map(h=>({...h}));
  v.history.sort((a,b)=>{
    if(a.type!==type||b.type!==type) return 0;
    const vals=Object.values(a),vals2=Object.values(b);
    return state.asc?(vals[col]>vals2[col]?1:-1):(vals[col]<vals2[col]?1:-1);
  });
  renderDetails();
}
function exportHistory(type){
  const v=vehicles.find(x=>x.plate===selectedVehicle);
  const rows=v.history.filter(h=>h.type===type);
  if(!rows.length) return;
  const csv=[Object.keys(rows[0]).join(","),...rows.map(r=>Object.values(r).join(","))].join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;a.download=`${selectedVehicle}_${type}_history.csv`;a.click();URL.revokeObjectURL(url);
}

// ------------------- FORMS -------------------
function submitMaintenance(e){e.preventDefault();addHistory("Maintenance",Object.fromEntries(new FormData(e.target)));}
function submitVehicleRequest(e){e.preventDefault();addHistory("Vehicle",Object.fromEntries(new FormData(e.target)));}
function submitWhereabouts(e){e.preventDefault();const fd=new FormData(e.target);let place=fd.get("place");if(place==="Company Use")place+=" - "+fd.get("company");const v=vehicles.find(x=>x.plate===selectedVehicle);v.whereabouts=place;addHistory("Whereabouts",{place,date:new Date().toISOString().split("T")[0]});}
function submitFuel(e){e.preventDefault();addHistory("Fuel",Object.fromEntries(new FormData(e.target)));}
function submitReport(e){e.preventDefault();addHistory("Report",{file:e.target.report.value,date:new Date().toISOString().split("T")[0]});}

// ------------------- INIT -------------------
renderList();



