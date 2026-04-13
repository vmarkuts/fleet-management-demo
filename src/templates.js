const statusLabels = {
  ok: "Active",
  warn: "Due Soon",
  danger: "Overdue"
};

const documentLabels = {
  ok: "Valid",
  warn: "Due Soon",
  danger: "Expired"
};

export function renderDashboard(trucks) {
  return trucks
    .map(
      (truck, index) => `
        <article
          class="truck-card status-${truck.status} animate-in"
          data-index="${index}"
          style="animation-delay: ${index * 0.08}s"
        >
          <div class="truck-card-top">
            <div>
              <div class="truck-card-id">${truck.id} · ${truck.year}</div>
              <div class="truck-card-name">${truck.emoji} ${truck.name}</div>
            </div>
            <div class="status-pill ${truck.status}">
              <span class="status-dot"></span>
              ${statusLabels[truck.status]}
            </div>
          </div>
          <div class="truck-card-meta">
            <div class="truck-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              ${truck.driver.name}
            </div>
            <div class="truck-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${truck.odometer}
            </div>
          </div>
          <div class="truck-card-footer">
            <div class="truck-next-service">
              Next: ${truck.nextService.name} —
              <span class="${truck.nextService.type}">${truck.nextService.label}</span>
            </div>
            <div class="truck-card-actions">
              <button
                class="truck-card-edit"
                type="button"
                data-action="edit-unit"
                data-index="${index}"
              >
                Edit
              </button>
              <div class="truck-card-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M9 18l6-6-6-6"></path>
                </svg>
              </div>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

export function renderNotifications(notifications) {
  return notifications
    .map(
      (notification) => `
        <div class="notif-item ${notification.unread ? "notif-unread" : ""}">
          <div class="notif-icon ${notification.type}">${notification.icon}</div>
          <div class="notif-body">
            <div class="notif-title">${notification.title}</div>
            <div class="notif-desc">${notification.desc}</div>
            <div class="notif-time">${notification.time}</div>
          </div>
        </div>
      `
    )
    .join("");
}

export function renderUnitHero(truck) {
  return `
    <div class="unit-hero-top">
      <div class="unit-avatar">${truck.emoji}</div>
      <div class="unit-hero-info">
        <div class="unit-hero-id">${truck.id}</div>
        <div class="unit-hero-name">${truck.name}</div>
        <div class="unit-hero-stats">
          <div class="unit-stat">
            <div class="unit-stat-label">Year</div>
            <div class="unit-stat-value">${truck.year}</div>
          </div>
          <div class="unit-stat">
            <div class="unit-stat-label">Odometer</div>
            <div class="unit-stat-value">${truck.odometer}</div>
          </div>
          <div class="unit-stat">
            <div class="unit-stat-label">Status</div>
            <div class="unit-stat-value">
              <span class="status-pill ${truck.status}" style="padding: 2px 8px; font-size: 10px;">
                <span class="status-dot"></span>
                ${statusLabels[truck.status]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderOverview(truck) {
  const insuranceStatus = truck.overview.insurance === "EXPIRED" ? "danger" : "ok";
  const driverStatus = truck.driver.status === "on-duty" ? "ok" : "warn";
  const driverLabel = truck.driver.status === "on-duty" ? "On Duty" : "Off Duty";

  return `
    <div class="section-label" style="margin-bottom: 12px;">Vehicle Specs</div>
    <div class="info-grid">
      <div class="info-card">
        <div class="info-card-label">Plate</div>
        <div class="info-card-value highlight">${truck.overview.license}</div>
      </div>
      <div class="info-card">
        <div class="info-card-label">Year</div>
        <div class="info-card-value">${truck.year}</div>
      </div>
      <div class="info-card">
        <div class="info-card-label">Fuel Capacity</div>
        <div class="info-card-value">220 Gal</div>
      </div>
      <div class="info-card">
        <div class="info-card-label">Engine</div>
        <div class="info-card-value">PACCAR MX-13</div>
      </div>
      <div class="info-card" style="grid-column: 1 / -1;">
        <div class="info-card-label">VIN</div>
        <div class="info-card-value" style="font-size: 12px; font-weight: 600; letter-spacing: 0.5px;">${truck.vin}</div>
      </div>
    </div>
    <div class="section-label" style="margin: 16px 0 12px;">Assigned Driver</div>
    <div class="driver-card">
      <div class="driver-avatar">${truck.driver.initials}</div>
      <div style="flex: 1;">
        <div class="driver-info-name">${truck.driver.name}</div>
        <div class="driver-info-role">Class A CDL · 8 Yrs Exp</div>
        <div style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">License: #TX-9923481</div>
      </div>
      <div class="driver-status">
        <span class="status-pill ${driverStatus}" style="font-size: 10px; padding: 3px 8px;">
          <span class="status-dot"></span>
          ${driverLabel}
        </span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="section-label" style="margin-bottom: 12px;">Insurance & Compliance</div>
    <div class="info-grid">
      <div class="info-card" style="grid-column: 1 / -1;">
        <div class="info-card-label">Insurance Provider</div>
        <div class="info-card-value" style="font-size: 13px; margin-bottom: 4px;">Progressive Commercial #88231</div>
        <div class="info-card-value" style="font-size: 13px; color: var(--${insuranceStatus === "danger" ? "red" : "green"});">${truck.overview.insurance}</div>
      </div>
      <div class="info-card" style="grid-column: 1 / -1;">
        <div class="info-card-label">Registration Status</div>
        <div class="info-card-value" style="font-size: 13px; color: var(--green);">${truck.overview.registration}</div>
      </div>
    </div>
  `;
}

export function renderMaintenance(truck) {
  const isOverdue = truck.nextService.type === "danger";

  return `
    <div class="action-bar">
      <button class="btn-secondary" type="button" style="background: var(--amber-dim); color: var(--amber); border-color: rgba(245, 158, 11, 0.2);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        Record Service
      </button>
    </div>
    <div class="${isOverdue ? "next-service-card overdue" : "next-service-card"}">
      <div class="next-service-icon">${isOverdue ? "⚠️" : "🔧"}</div>
      <div>
        <div class="next-service-label">${isOverdue ? "Overdue Service" : "Next Service"}</div>
        <div class="next-service-value">${truck.nextService.name}</div>
        <div class="next-service-sub">${truck.nextService.label}</div>
      </div>
    </div>
    <div class="section-label" style="margin-bottom: 16px;">Service History</div>
    <div class="timeline">
      ${truck.maintenance
        .map(
          (item) => `
            <div class="timeline-item">
              <div class="timeline-line">
                <div class="timeline-dot" style="${item.tag === "scheduled" ? "background: var(--blue); outline-color: var(--blue-dim);" : ""}"></div>
                <div class="timeline-segment"></div>
              </div>
              <div class="timeline-body">
                <div class="timeline-date">${item.date} · ${item.odometer}</div>
                <div class="timeline-title">${item.title}</div>
                <div class="timeline-desc">${item.desc}</div>
                <span class="timeline-tag ${item.tag}">${item.tag === "completed" ? "✓ Completed" : "📅 Scheduled"}</span>
              </div>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

export function renderDocuments(truck) {
  return `
    <div class="action-bar">
      <button class="btn-secondary" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        Upload Doc
      </button>
      <button class="btn-secondary" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
        Scan
      </button>
    </div>
    <div class="doc-list">
      ${truck.documents
        .map(
          (document) => `
            <div class="doc-card">
              <div class="doc-icon ${document.status}">${document.icon}</div>
              <div class="doc-info">
                <div class="doc-name">${document.name}</div>
                <div class="doc-expiry">Expires: ${document.expiry}</div>
              </div>
              <span class="doc-badge ${document.status}">${documentLabels[document.status]}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

export function renderEditForm(truck) {
  return `
    <div class="modal-grid">
      <div class="field-group">
        <label class="field-label" for="edit-id">Unit ID</label>
        <input class="field-input" id="edit-id" name="id" value="${truck.id}" readonly />
      </div>
      <div class="field-group">
        <label class="field-label" for="edit-year">Year</label>
        <input class="field-input" id="edit-year" name="year" value="${truck.year}" />
      </div>
      <div class="field-group full">
        <label class="field-label" for="edit-name">Truck Name</label>
        <input class="field-input" id="edit-name" name="name" value="${truck.name}" />
      </div>
      <div class="field-group full">
        <label class="field-label" for="edit-driver">Driver</label>
        <input class="field-input" id="edit-driver" name="driverName" value="${truck.driver.name}" />
      </div>
      <div class="field-group">
        <label class="field-label" for="edit-odometer">Odometer</label>
        <input class="field-input" id="edit-odometer" name="odometer" value="${truck.odometer}" />
      </div>
      <div class="field-group">
        <label class="field-label" for="edit-plate">Plate</label>
        <input class="field-input" id="edit-plate" name="license" value="${truck.overview.license}" />
      </div>
      <div class="field-group">
        <label class="field-label" for="edit-status">Unit Status</label>
        <select class="field-select" id="edit-status" name="status">
          ${renderStatusOptions(truck.status)}
        </select>
      </div>
      <div class="field-group">
        <label class="field-label" for="edit-service-type">Service State</label>
        <select class="field-select" id="edit-service-type" name="nextServiceType">
          ${renderStatusOptions(truck.nextService.type)}
        </select>
      </div>
      <div class="field-group full">
        <label class="field-label" for="edit-service-name">Next Service</label>
        <input class="field-input" id="edit-service-name" name="nextServiceName" value="${truck.nextService.name}" />
      </div>
      <div class="field-group full">
        <label class="field-label" for="edit-service-label">Service Timing</label>
        <input class="field-input" id="edit-service-label" name="nextServiceLabel" value="${truck.nextService.label}" />
        <div class="field-help">Example: In 5 days / Overdue 9 days</div>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn-primary" type="submit">Save Changes</button>
    </div>
  `;
}

function renderStatusOptions(selected) {
  return Object.entries(statusLabels)
    .map(
      ([value, label]) => `
        <option value="${value}" ${value === selected ? "selected" : ""}>${label}</option>
      `
    )
    .join("");
}
