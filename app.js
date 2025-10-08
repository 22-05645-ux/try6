// ------------------- DATA -------------------
let vehicles = JSON.parse(localStorage.getItem("vehicles")) || [
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
  "NGX 4853": { model: "Mitsubishi L300", yearBought: "2025", },
  "NGX 4856": { model: "Mitsubishi L300", yearBought: "2021",  },
  "NFZ 2848": { model: "Isuzu Traviz", yearBought: "2023",  },
  "CBP 5511": { model: "Isuzu Elf Truck", yearBought: "2021",  },
  "CBP 1336": { model: "Isuzu Elf Truck", yearBought: "2023",  },
  "ZSG 105": { model: "Isuzu Elf Truck", yearBought: "2023",  },
  "UOF 225": { model: "Isuzu Elf Truck", yearBought: "2023",  },
  "NQX 657": { model: "Isuzu Elf Truck", yearBought: "2023",  },
  "WQT 225": { model: "Isuzu Elf Truck", yearBought: "2023",  },
  "MAM 7806": { model: "Isuzu Elf Truck", yearBought: "2023",  },
  "NBO 6586": { model: "Isuzu Elf Truck", yearBought: "2023",  },
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

// ------------------- STORAGE -------------------
function saveData() {
  localStorage.setItem("vehicles", JSON.stringify(vehicles));
}

// ------------------- RENDER VEHICLE LIST -------------------
function renderList() {
  app.innerHTML = `<div class="grid"></div>`;
  const grid = app.querySelector(".grid");

  vehicles.forEach(v => {
    const imgUrl = vehicleImages[v.plate];
    const d = details[v.plate];

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${imgUrl}" alt="${v.plate}" />
      <h2>${v.plate}</h2>
      <p>Whereabouts: ${v.whereabouts}</p>
    `;
    card.onclick = () => { selectedVehicle = v.plate; activeTab = "Details"; renderDetails(); };
    grid.appendChild(card);
  });
}

// ------------------- VEHICLE DETAILS -------------------
function renderDetails() {
  const v = vehicles.find(x => x.plate === selectedVehicle);
  const d = details[selectedVehicle];
  const imgUrl = vehicleImages[v.plate];
  app.innerHTML = `
    <div class="details-container">
      <button class="back-btn" onclick="backToList()">← Back</button>
      <h1>${v.plate}</h1>
      <img src="${imgUrl}" class="details-image" alt="${v.plate}" />
      <div class="tab-buttons">
        ${["Details","Maintenance","Vehicle Request","Whereabouts","Fuel","Reports","History"]
          .map(tab => `<button onclick="setTab('${tab}')" class="${activeTab===tab?'active':''}">${tab}</button>`).join("")}
      </div>
      <div id="tabContent"></div>
    </div>
  `;
  renderTab(v, d);
}

// ------------------- TABS -------------------
function renderTab(v, d) {
  const tab = document.getElementById("tabContent");

  if (activeTab === "Details") {
    tab.innerHTML = `
      <p><b>Model:</b> ${d.model}</p>
      <p><b>Year Bought:</b> ${d.yearBought}</p>
      <p><b>Status:</b> ${d.status}</p>
      <p><b>Whereabouts:</b> ${v.whereabouts}</p>
    `;
  } 
  else if (activeTab === "Maintenance") {
    tab.innerHTML = `
      <form onsubmit="submitMaintenance(event)">
        <input type="date" name="date" required />
        <input type="text" name="cv" placeholder="CV Number" required />
        <input type="text" name="reason" placeholder="Reason / Description" required />
        <input type="number" name="cost" placeholder="Cost / Amount" required />
        <button type="submit">Save</button>
      </form>
    `;
  } 
  else if (activeTab === "Vehicle Request") {
    tab.innerHTML = `
      <form onsubmit="submitVehicleRequest(event)">
        <input type="date" name="date" required />
        <input type="text" name="project" placeholder="Project" required />
        <input type="text" name="from" placeholder="Job Order #" required />
        <input type="text" name="to" placeholder="Location" required />
        <input type="text" name="driver" placeholder="Driver" required />
        <input type="text" name="purpose" placeholder="Purpose" required />
        <input type="text" name="request" placeholder="Requested By" required />
        <button type="submit">Save</button>
      </form>
    `;
  } 
  else if (activeTab === "Whereabouts") {
    tab.innerHTML = `
      <form onsubmit="submitWhereabouts(event)">
        <select name="place" required>
          <option value="">Select Location</option>
          <option>Batangas City</option>
          <option>Makati</option>
          <option>Company Use</option>
          <option>Repair Shop</option>
        </select>
        <input type="text" name="company" placeholder="If Company Use, specify destination" />
        <button type="submit">Save</button>
      </form>
    `;
  } 
  else if (activeTab === "Fuel") {
    tab.innerHTML = `
      <form onsubmit="submitFuel(event)">
        <input type="date" name="date" required />
        <input type="text" name="bearer" placeholder="Bearer" required />
        <input type="text" name="order" placeholder="PO #" required />
        <select name="gas" required>
          <option value="">Select Fuel Type</option>
          <option>Diesel</option>
          <option>Gasoline</option>
        </select>
        <input type="number" name="amount" placeholder="Amount" required />
        <button type="submit">Save</button>
      </form>
    `;
  } 
  else if (activeTab === "Reports") {
    tab.innerHTML = `
      <form onsubmit="submitReport(event)">
        <input type="file" name="report" required />
        <button type="submit">Upload</button>
      </form>
    `;
  } 
  else if (activeTab === "History") {
    renderHistory(v, tab);
  }
}

// ------------------- HISTORY -------------------
function renderHistory(v, tab) {
  if (!v.history.length) {
    tab.innerHTML = `<p>No history yet.</p>`;
    return;
  }

  const grouped = {};
  v.history.forEach((item, i) => {
    if (!grouped[item.type]) grouped[item.type] = [];
    grouped[item.type].push({ ...item, index: i });
  });

  let html = "";

  for (const [type, records] of Object.entries(grouped)) {
    html += `
      <div class="history-section">
        <div class="history-header" onclick="toggleHistory('${type}')">▼ ${type}</div>
        <div class="history-body" id="history-${type}">
          <button class="export-btn" onclick="exportCSV('${v.plate}', '${type}')">📥 Export ${type} CSV</button>
          <table class="history-group-table">
            <thead><tr>${generateHeaders(type)}<th>Actions</th></tr></thead>
            <tbody>${records.map(r => generateRow(type, r)).join("")}</tbody>
          </table>
        </div>
      </div>
    `;
  }
  tab.innerHTML = html;
}

// ------------------- CSV EXPORT PER TYPE -------------------
function exportCSV(plate, type) {
  const v = vehicles.find(x => x.plate === plate);
  if (!v) return alert("Vehicle not found.");
  const filtered = v.history.filter(h => h.type === type);
  if (!filtered.length) return alert(`No ${type} records to export.`);
  const keys = Array.from(new Set(filtered.flatMap(Object.keys)));
  const rows = [keys.join(",")];
  filtered.forEach(entry => {
    const row = keys.map(k => `"${(entry[k] ?? "").toString().replace(/"/g, '""')}"`);
    rows.push(row.join(","));
  });
  const dateStr = new Date().toISOString().split("T")[0];
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${plate}_${type}_${dateStr}.csv`;
  link.click();
}

// ------------------- TABLE HELPERS -------------------
function generateHeaders(type) {
  switch (type) {
    case "Maintenance": return "<th>Date</th><th>CV No.</th><th>Reason / Description</th><th>Cost / Amount</th>";
    case "Fuel": return "<th>Date</th><th>Bearer</th><th>PO #</th><th>Fuel Type</th><th>Amount</th>";
    case "Vehicle Request": return "<th>Date</th><th>Project</th><th>Job Order #</th><th>Location</th><th>Driver</th><th>Purpose</th><th>Requested By</th>";
    case "Whereabouts": return "<th>Date</th><th>Place</th>";
    case "Report": return "<th>Date</th><th>File</th>";
    default: return "<th>Date</th><th>Details</th>";
  }
}

function generateRow(type, r) {
  let cells = "";
  switch (type) {
    case "Maintenance": cells = `<td>${r.date}</td><td>${r.cv}</td><td>${r.reason}</td><td>₱${r.cost}</td>`; break;
    case "Fuel": cells = `<td>${r.date}</td><td>${r.bearer}</td><td>${r.order}</td><td>${r.gas}</td><td>₱${r.amount}</td>`; break;
    case "Vehicle Request": cells = `<td>${r.date}</td><td>${r.project}</td><td>${r.from}</td><td>${r.to}</td><td>${r.driver}</td><td>${r.purpose}</td><td>${r.request}</td>`; break;
    case "Whereabouts": cells = `<td>${r.date}</td><td>${r.place}</td>`; break;
    case "Report": cells = `<td>${r.date}</td><td>${r.file}</td>`; break;
    default: cells = `<td>${r.date}</td><td>${JSON.stringify(r)}</td>`;
  }
  return `<tr>${cells}<td><button class='del-btn' onclick="deleteRecord('${r.index}')">🗑️</button></td></tr>`;
}

function deleteRecord(index) {
  const v = vehicles.find(x => x.plate === selectedVehicle);
  if (confirm("Are you sure you want to delete this record?")) {
    v.history.splice(index, 1);
    saveAndRefresh("History");
  }
}

function toggleHistory(type) {
  const section = document.getElementById(`history-${type}`);
  if (!section) return;
  const isVisible = section.style.display !== "none";
  section.style.display = isVisible ? "none" : "block";
  section.previousElementSibling.textContent = (isVisible ? "▶" : "▼") + " " + type;
}

// ------------------- FORMS -------------------
function submitMaintenance(e) {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const v = vehicles.find(x => x.plate === selectedVehicle);
  v.history.push({ type: "Maintenance", ...d });
  saveAndRefresh("History");
}

function submitVehicleRequest(e) {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const v = vehicles.find(x => x.plate === selectedVehicle);
  v.history.push({ type: "Vehicle Request", ...d });
  saveAndRefresh("History");
}

function submitWhereabouts(e) {
  e.preventDefault();
  const f = new FormData(e.target);
  const place = f.get("place") === "Company Use" ? `Company Use - ${f.get("company")}` : f.get("place");
  const v = vehicles.find(x => x.plate === selectedVehicle);
  v.whereabouts = place;
  v.history.push({ type: "Whereabouts", date: new Date().toISOString().split("T")[0], place });
  saveAndRefresh("Details");
}

function submitFuel(e) {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const v = vehicles.find(x => x.plate === selectedVehicle);
  v.history.push({ type: "Fuel", ...d });
  saveAndRefresh("History");
}

function submitReport(e) {
  e.preventDefault();
  const file = e.target.report.value.split("\\").pop();
  const v = vehicles.find(x => x.plate === selectedVehicle);
  v.history.push({ type: "Report", date: new Date().toISOString().split("T")[0], file });
  saveAndRefresh("History");
}

// ------------------- HELPERS -------------------
function backToList(){ selectedVehicle=null; renderList(); }
function setTab(tab){ activeTab=tab; renderDetails(); }
function saveAndRefresh(tab){ saveData(); setTab(tab); }

// ------------------- INIT -------------------
renderList();



