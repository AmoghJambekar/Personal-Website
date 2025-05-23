// Initialize theme immediately to prevent flash
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', savedTheme === 'dark');

// Make sure Feather is loaded
function ensureFeather() {
  if (!window.feather) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/feather-icons/dist/feather.min.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
  return Promise.resolve();
}

// Update all theme toggle icons on the page
async function updateThemeIcons(isDark) {
  await ensureFeather();
  const themeToggles = document.querySelectorAll('.theme-toggle i');
  themeToggles.forEach(toggle => {
    toggle.setAttribute('data-feather', isDark ? 'sun' : 'moon');
  });
  feather.replace();
}

// Global theme toggle function
window.toggleTheme = async function() {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  await updateThemeIcons(isDark);
}

// Initialize icons when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  const isDark = document.documentElement.classList.contains('dark');
  await updateThemeIcons(isDark);
});

// Listen for storage events to sync theme across tabs
window.addEventListener('storage', async (e) => {
  if (e.key === 'theme') {
    const isDark = e.newValue === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    await updateThemeIcons(isDark);
  }
}); 