// On mobile browsers we have a collapsible address bar
// That bar is NOT included in ViewportHeight calculation (100vh), but included in window.innerHeight calculation
// On mobile browsers approximately 100vh = window.innerHeight + CollapsibleAddressBarHeight
// Have to use window.innerHeight to match mobile browser height precisely and avoid that collapsibility+scroll, etc.

computeVhPct();
window.addEventListener('resize', computeVhPct);

function computeVhPct() {
  const oneVhToPx = window.innerHeight / 100;
  document.documentElement.style.setProperty('--vhPct', `${oneVhToPx}px`);
}

export {};
