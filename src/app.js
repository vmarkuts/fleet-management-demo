import { notifications, trucks } from "./data.js";
import {
  renderDashboard,
  renderDocuments,
  renderEditForm,
  renderMaintenance,
  renderNotifications,
  renderOverview,
  renderUnitHero
} from "./templates.js";

const state = {
  activeUnitIndex: null,
  editingUnitIndex: null,
  activeTab: "overview"
};

let elements = null;

export function initApp() {
  elements = {
    truckList: document.getElementById("truck-list"),
    fleetCount: document.getElementById("fleet-count"),
    notifBadge: document.getElementById("notif-badge"),
    notifList: document.getElementById("notif-list"),
    notifButton: document.getElementById("notif-btn"),
    drawerOverlay: document.getElementById("drawer-overlay"),
    notifDrawer: document.getElementById("notif-drawer"),
    drawerClose: document.getElementById("drawer-close"),
    screenDashboard: document.getElementById("screen-dashboard"),
    screenUnit: document.getElementById("screen-unit"),
    unitNavTitle: document.getElementById("unit-nav-title"),
    unitHero: document.getElementById("unit-hero"),
    editUnitButton: document.getElementById("edit-unit-btn"),
    backButton: document.getElementById("back-btn"),
    tabs: document.getElementById("tabs"),
    tabOverview: document.getElementById("tab-overview"),
    tabMaintenance: document.getElementById("tab-maintenance"),
    tabDocuments: document.getElementById("tab-documents"),
    editModalOverlay: document.getElementById("edit-modal-overlay"),
    editModal: document.getElementById("edit-modal"),
    editModalTitle: document.getElementById("edit-modal-title"),
    editModalClose: document.getElementById("edit-modal-close"),
    editUnitForm: document.getElementById("edit-unit-form")
  };

  bindEvents();
  paintDashboard();
  paintNotifications();
  syncEditButton();
}

function bindEvents() {
  elements.truckList.addEventListener("click", handleTruckListClick);
  elements.notifButton.addEventListener("click", openDrawer);
  elements.drawerOverlay.addEventListener("click", closeDrawer);
  elements.drawerClose.addEventListener("click", closeDrawer);
  elements.backButton.addEventListener("click", goBack);
  elements.editUnitButton.addEventListener("click", () => {
    if (state.activeUnitIndex !== null) {
      openEditModal(state.activeUnitIndex);
    }
  });
  elements.tabs.addEventListener("click", handleTabClick);
  elements.editModalOverlay.addEventListener("click", closeEditModal);
  elements.editModalClose.addEventListener("click", closeEditModal);
  elements.editUnitForm.addEventListener("submit", handleEditSubmit);
  document.addEventListener("keydown", handleKeydown);
}

function paintDashboard() {
  elements.truckList.innerHTML = renderDashboard(trucks);
  elements.fleetCount.textContent = `${trucks.length} Units`;
}

function paintNotifications() {
  elements.notifList.innerHTML = renderNotifications(notifications);
  elements.notifBadge.textContent = String(
    notifications.filter((notification) => notification.unread).length
  );
}

function paintActiveUnit() {
  if (state.activeUnitIndex === null) {
    return;
  }

  const truck = trucks[state.activeUnitIndex];
  elements.unitNavTitle.textContent = truck.id;
  elements.unitHero.innerHTML = renderUnitHero(truck);
  elements.tabOverview.innerHTML = renderOverview(truck);
  elements.tabMaintenance.innerHTML = renderMaintenance(truck);
  elements.tabDocuments.innerHTML = renderDocuments(truck);
  switchTab(state.activeTab);
  syncEditButton();
}

function handleTruckListClick(event) {
  const editButton = event.target.closest("[data-action='edit-unit']");
  if (editButton) {
    event.stopPropagation();
    openEditModal(Number(editButton.dataset.index));
    return;
  }

  const truckCard = event.target.closest(".truck-card");
  if (!truckCard) {
    return;
  }

  openUnit(Number(truckCard.dataset.index));
}

function handleTabClick(event) {
  const tabButton = event.target.closest("[data-tab]");
  if (!tabButton) {
    return;
  }

  switchTab(tabButton.dataset.tab);
}

function openUnit(index) {
  state.activeUnitIndex = index;
  state.activeTab = "overview";
  paintActiveUnit();
  elements.screenUnit.scrollTop = 0;
  elements.screenDashboard.classList.add("hidden");
  elements.screenUnit.classList.add("visible");
}

function goBack() {
  elements.screenUnit.classList.remove("visible");
  elements.screenDashboard.classList.remove("hidden");
}

function switchTab(tab) {
  state.activeTab = tab;

  const tabs = {
    overview: {
      content: elements.tabOverview,
      button: document.getElementById("tab-overview-btn")
    },
    maintenance: {
      content: elements.tabMaintenance,
      button: document.getElementById("tab-maint-btn")
    },
    documents: {
      content: elements.tabDocuments,
      button: document.getElementById("tab-docs-btn")
    }
  };

  Object.entries(tabs).forEach(([key, value]) => {
    const isActive = key === tab;
    value.content.classList.toggle("active", isActive);
    value.button.classList.toggle("active", isActive);
  });
}

function openDrawer() {
  elements.drawerOverlay.classList.add("open");
  elements.notifDrawer.classList.add("open");
  elements.notifDrawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  elements.drawerOverlay.classList.remove("open");
  elements.notifDrawer.classList.remove("open");
  elements.notifDrawer.setAttribute("aria-hidden", "true");
}

function openEditModal(index) {
  state.editingUnitIndex = index;
  const truck = trucks[index];
  elements.editModalTitle.textContent = `Edit ${truck.id}`;
  elements.editUnitForm.innerHTML = renderEditForm(truck);
  elements.editModalOverlay.classList.add("open");
  elements.editModal.classList.add("open");
  elements.editModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const firstEditableField = elements.editUnitForm.querySelector("#edit-name");
  if (firstEditableField) {
    firstEditableField.focus();
    firstEditableField.select();
  }
}

function closeEditModal() {
  state.editingUnitIndex = null;
  elements.editModalOverlay.classList.remove("open");
  elements.editModal.classList.remove("open");
  elements.editModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function handleEditSubmit(event) {
  event.preventDefault();

  if (state.editingUnitIndex === null) {
    return;
  }

  const truck = trucks[state.editingUnitIndex];
  const formData = new FormData(event.currentTarget);
  const driverName = sanitizeValue(formData.get("driverName"), truck.driver.name);

  truck.name = sanitizeValue(formData.get("name"), truck.name);
  truck.year = sanitizeValue(formData.get("year"), truck.year);
  truck.odometer = sanitizeValue(formData.get("odometer"), truck.odometer);
  truck.status = sanitizeValue(formData.get("status"), truck.status);
  truck.driver.name = driverName;
  truck.driver.initials = getInitials(driverName);
  truck.overview.license = sanitizeValue(formData.get("license"), truck.overview.license);
  truck.nextService.name = sanitizeValue(
    formData.get("nextServiceName"),
    truck.nextService.name
  );
  truck.nextService.label = sanitizeValue(
    formData.get("nextServiceLabel"),
    truck.nextService.label
  );
  truck.nextService.type = sanitizeValue(
    formData.get("nextServiceType"),
    truck.nextService.type
  );

  paintDashboard();
  paintActiveUnit();
  closeEditModal();
}

function handleKeydown(event) {
  if (event.key !== "Escape") {
    return;
  }

  if (elements.editModal.classList.contains("open")) {
    closeEditModal();
    return;
  }

  if (elements.notifDrawer.classList.contains("open")) {
    closeDrawer();
  }
}

function syncEditButton() {
  elements.editUnitButton.disabled = state.activeUnitIndex === null;
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function sanitizeValue(value, fallback) {
  const trimmed = String(value || "").trim();
  return trimmed || fallback;
}
