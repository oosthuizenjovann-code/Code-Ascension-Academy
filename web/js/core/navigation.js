export function createScreenNavigator() {
  const screens = [...document.querySelectorAll('.screen')];

  return {
    show(id) {
      screens.forEach(screen => screen.classList.remove('active'));
      const target = document.getElementById(id);
      if (!target) {
        throw new Error(`Unknown Academy screen: ${id}`);
      }
      target.classList.add('active');
      window.scrollTo(0, 0);
    }
  };
}
