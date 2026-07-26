const STORAGE_KEY = "visitor_history";

export const getVisitHistory = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveVisit = (pageName) => {
  const history = getVisitHistory();

  const last = history[history.length - 1];

  // Prevent duplicate consecutive pages
  if (last && last.page === pageName) return;

  history.push({
    page: pageName,
    visitedAt: new Date().toISOString()
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const clearVisitHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};