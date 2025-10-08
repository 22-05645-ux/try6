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
      <button class="export-btn" onclick="exportCSV('${v.plate}', 'Maintenance')">📥 Export CSV</button>
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
      <button class="export-btn" onclick="exportCSV('${v.plate}', 'Vehicle Request')">📥 Export CSV</button>
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
      <button class="export-btn" onclick="exportCSV('${v.plate}', 'Whereabouts')">📥 Export CSV</button>
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
      <button class="export-btn" onclick="exportCSV('${v.plate}', 'Fuel')">📥 Export CSV</button>
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
      <button class="export-btn" onclick="exportCSV('${v.plate}', 'Report')">📥 Export CSV</button>
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

// ------------------- EXPORT CSV -------------------
// ------------------- EXPORT CSV PER TAB -------------------
function exportCSV(plate, type) {
  const v = vehicles.find(x => x.plate === plate);
  if (!v) return alert("Vehicle not found.");

  // Filter only the records that match the tab type
  const filtered = v.history.filter(h => h.type === type);
  if (!filtered.length) return alert(`No ${type} records to export.`);

  const keys = Array.from(new Set(filtered.flatMap(Object.keys)));
  const rows = [keys.join(",")];

  filtered.forEach(entry => {
    const row = keys.map(k => `"${(entry[k] ?? "").toString().replace(/"/g, '""')}"`);
    rows.push(row.join(","));
  });

  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${plate}_${type}_records.csv`;
  link.click();
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



