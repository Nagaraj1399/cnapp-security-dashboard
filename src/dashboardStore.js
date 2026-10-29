import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import initialData from "./dashboardData.json";

export const useDashboardStore = create(
  persist(
    (set) => ({
      dashboard: initialData,
      searchQuery: "",

      setSearchQuery: (query) => set({ searchQuery: query }),

      toggleWidgetSelection: (categoryId, widgetId) =>
        set((state) => {
          const updatedCategories = state.dashboard.categories.map((category) => {
            if (category.id !== categoryId) return category;

            const updatedWidgets = category.widgets.map((widget) =>
              widget.id === widgetId
                ? { ...widget, selected: !widget.selected }
                : widget,
            );
            return { ...category, widgets: updatedWidgets };
          });

          return {
            dashboard: { ...state.dashboard, categories: updatedCategories },
          };
        }),

      addNewWidget: (categoryId, widgetName, widgetText) =>
        set((state) => {
          const newWidget = {
            id: `custom-${crypto.randomUUID()}`,
            name: widgetName,
            text: widgetText,
            type: "custom",
            selected: true,
          };

          const updatedCategories = state.dashboard.categories.map((category) =>
            category.id === categoryId
              ? { ...category, widgets: [...category.widgets, newWidget] }
              : category,
          );

          return {
            dashboard: { ...state.dashboard, categories: updatedCategories },
          };
        }),

      updateWidget: (categoryId, widgetId, name, text) =>
        set((state) => {
          const updatedCategories = state.dashboard.categories.map((category) => {
            if (category.id !== categoryId) return category;

            const updatedWidgets = category.widgets.map((widget) =>
              widget.id === widgetId ? { ...widget, name, text } : widget,
            );
            return { ...category, widgets: updatedWidgets };
          });

          return {
            dashboard: { ...state.dashboard, categories: updatedCategories },
          };
        }),
    }),
    {
      name: "cloudscope-dashboard",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dashboard: state.dashboard }),
    },
  ),
);
