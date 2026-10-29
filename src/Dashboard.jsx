import { useState } from "react";
import {
  Activity,
  Cloud,
  Layers3,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useDashboardStore } from "./dashboardStore";

const categoryIcons = [Cloud, ShieldCheck, Layers3];

export default function Dashboard() {
  const {
    dashboard,
    toggleWidgetSelection,
    addNewWidget,
    updateWidget,
    searchQuery,
    setSearchQuery,
  } = useDashboardStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(dashboard.categories[0]?.id ?? "");
  const [editingWidget, setEditingWidget] = useState(null);
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");

  const activeCategory = dashboard.categories.find(
    (category) => category.id === activeTab,
  );
  const activeWidgetCount = dashboard.categories.reduce(
    (count, category) =>
      count + category.widgets.filter((widget) => widget.selected).length,
    0,
  );

  const openDrawer = (categoryId = activeTab) => {
    setActiveTab(categoryId);
    setEditingWidget(null);
    setWidgetName("");
    setWidgetText("");
    setSearchQuery("");
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingWidget(null);
    setWidgetName("");
    setWidgetText("");
  };

  const startEditing = (categoryId, widget) => {
    setActiveTab(categoryId);
    setEditingWidget(widget);
    setWidgetName(widget.name);
    setWidgetText(widget.text);
    setSearchQuery("");
    setIsDrawerOpen(true);
  };

  const handleSaveWidget = (event) => {
    event.preventDefault();
    const trimmedName = widgetName.trim();
    if (!trimmedName) return;

    if (editingWidget) {
      updateWidget(activeTab, editingWidget.id, trimmedName, widgetText.trim());
    } else {
      addNewWidget(
        activeTab,
        trimmedName,
        widgetText.trim() || "Add a description for this widget.",
      );
    }

    setEditingWidget(null);
    setWidgetName("");
    setWidgetText("");
  };

  return (
    <main className="dashboard-shell" id="dashboard">
      <header className="topbar">
        <a className="brand" href="#dashboard" aria-label="Dashboard home">
          <span className="brand-mark">
            <Activity size={19} strokeWidth={2.5} />
          </span>
          <span>cloud<span className="brand-light">scope</span></span>
        </a>
        <div className="topbar-meta">
          <span className="status-dot" />
          <span>All systems operational</span>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="page-heading">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>{dashboard.dashboardTitle}</h1>
            <p className="page-subtitle">
              Monitor your cloud security posture in one place.
            </p>
          </div>
          <div className="heading-actions">
            <div className="widget-count">
              <span className="count-number">{activeWidgetCount}</span>
              <span>active widgets</span>
            </div>
            <button className="button button-primary" onClick={() => openDrawer()}>
              <Plus size={17} />
              <span>Add widget</span>
            </button>
          </div>
        </div>

        <div className="dashboard-grid">
          {dashboard.categories.map((category, index) => {
            const CategoryIcon = categoryIcons[index % categoryIcons.length];
            const selectedWidgets = category.widgets.filter(
              (widget) => widget.selected,
            );

            return (
              <section className="category-section" key={category.id}>
                <div className="category-heading">
                  <div className="category-title">
                    <span className="category-icon">
                      <CategoryIcon size={17} />
                    </span>
                    <div>
                      <h2>{category.name}</h2>
                      <span className="category-count">
                        {selectedWidgets.length} widget
                        {selectedWidgets.length === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                  <button
                    className="text-button"
                    onClick={() => openDrawer(category.id)}
                  >
                    Manage
                  </button>
                </div>

                {selectedWidgets.length > 0 ? (
                  <div className="widget-grid">
                    {selectedWidgets.map((widget) => (
                      <article className="widget-card" key={widget.id}>
                        <div className="widget-card-header">
                          <span className="widget-type-icon">
                            <Activity size={17} />
                          </span>
                          <div className="widget-actions">
                            <button
                              className="icon-button"
                              onClick={() => startEditing(category.id, widget)}
                              title={`Edit ${widget.name}`}
                              aria-label={`Edit ${widget.name}`}
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              className="icon-button remove-button"
                              onClick={() =>
                                toggleWidgetSelection(category.id, widget.id)
                              }
                              title={`Remove ${widget.name}`}
                              aria-label={`Remove ${widget.name}`}
                            >
                              <X size={17} />
                            </button>
                          </div>
                        </div>
                        <h3>{widget.name}</h3>
                        <p className="widget-description">{widget.text}</p>
                        <div className="widget-card-footer">
                          <span className="live-indicator" />
                          <span>{widget.type === "custom" ? "Custom widget" : "Live data"}</span>
                        </div>
                      </article>
                    ))}
                    <button
                      className="add-widget-card"
                      onClick={() => openDrawer(category.id)}
                    >
                      <span className="add-widget-icon"><Plus size={18} /></span>
                      <span>Add a widget</span>
                    </button>
                  </div>
                ) : (
                  <button
                    className="empty-category"
                    onClick={() => openDrawer(category.id)}
                  >
                    <span className="add-widget-icon"><Plus size={18} /></span>
                    <span>No widgets here yet. Add one to get started.</span>
                  </button>
                )}
              </section>
            );
          })}
        </div>
        <footer className="dashboard-footer">
          <span>Cloudscope security dashboard</span>
          <span>Your widget setup is saved on this device</span>
        </footer>
      </section>

      {isDrawerOpen && (
        <div className="drawer-backdrop" onClick={closeDrawer}>
          <aside
            className="widget-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">DASHBOARD SETTINGS</p>
                <h2 id="drawer-title">Manage widgets</h2>
              </div>
              <button
                className="icon-button drawer-close"
                onClick={closeDrawer}
                aria-label="Close widget manager"
              >
                <X size={19} />
              </button>
            </div>

            <div className="drawer-content">
              <p className="drawer-description">
                Choose which widgets to show, or create one that fits your workflow.
              </p>
              <div className="category-tabs" role="tablist" aria-label="Widget category">
                {dashboard.categories.map((category) => (
                  <button
                    className={`category-tab${activeTab === category.id ? " active" : ""}`}
                    key={category.id}
                    onClick={() => {
                      setActiveTab(category.id);
                      setEditingWidget(null);
                      setWidgetName("");
                      setWidgetText("");
                    }}
                    role="tab"
                    aria-selected={activeTab === category.id}
                  >
                    {category.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              <label className="search-field">
                <Search size={16} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search widgets"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </label>

              <div className="available-widgets">
                <p className="field-label">AVAILABLE WIDGETS</p>
                {activeCategory?.widgets
                  .filter((widget) =>
                    widget.name.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .map((widget) => (
                    <div className="widget-option" key={widget.id}>
                      <label className="widget-option-toggle">
                        <input
                          type="checkbox"
                          checked={widget.selected}
                          onChange={() =>
                            toggleWidgetSelection(activeTab, widget.id)
                          }
                        />
                        <span className="custom-checkbox" />
                        <span className="widget-option-name">{widget.name}</span>
                      </label>
                      {widget.type === "custom" && (
                        <button
                          className="option-edit"
                          type="button"
                          onClick={() => startEditing(activeTab, widget)}
                          aria-label={`Edit ${widget.name}`}
                        >
                          <Pencil size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                {activeCategory?.widgets.filter((widget) =>
                  widget.name.toLowerCase().includes(searchQuery.toLowerCase()),
                ).length === 0 && (
                  <p className="no-results">No matching widgets found.</p>
                )}
              </div>

              <form className="widget-form" onSubmit={handleSaveWidget}>
                <div className="form-heading">
                  <div>
                    <p className="field-label">
                      {editingWidget ? "CUSTOMIZE WIDGET" : "CREATE A WIDGET"}
                    </p>
                    <h3>{editingWidget ? "Edit widget details" : "Make it yours"}</h3>
                  </div>
                  {editingWidget && (
                    <button
                      className="text-button"
                      type="button"
                      onClick={() => {
                        setEditingWidget(null);
                        setWidgetName("");
                        setWidgetText("");
                      }}
                    >
                      Cancel edit
                    </button>
                  )}
                </div>
                <label className="form-label" htmlFor="widget-name">Widget name</label>
                <input
                  id="widget-name"
                  className="form-input"
                  type="text"
                  placeholder="e.g. Weekly cloud spend"
                  value={widgetName}
                  onChange={(event) => setWidgetName(event.target.value)}
                  maxLength={60}
                  required
                />
                <label className="form-label" htmlFor="widget-content">Description or content</label>
                <textarea
                  id="widget-content"
                  className="form-input form-textarea"
                  placeholder="What should this widget show?"
                  value={widgetText}
                  onChange={(event) => setWidgetText(event.target.value)}
                  rows={3}
                  maxLength={180}
                />
                <button className="button button-primary submit-button" type="submit">
                  {editingWidget ? "Save changes" : "Add widget"}
                </button>
              </form>
            </div>

            <div className="drawer-footer">
              <button className="button button-secondary" onClick={closeDrawer}>
                Done
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
