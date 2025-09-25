// Runtime plugin para carregar CSS automaticamente
const MfRuntime = {
  name: 'css-loader',
  async loadEntry({ remoteInfo, remoteEntryExports }) {
    // Carrega CSS automaticamente quando o remote é carregado
    const cssLinks = document.querySelectorAll('link[href*="swipe"]');
    if (cssLinks.length === 0) {
      // Tenta encontrar e carregar o CSS do remote
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = remoteInfo.entry.replace('remoteEntry.js', 'assets/style.css');
      document.head.appendChild(link);
    }
    return remoteEntryExports;
  },
};

export default MfRuntime;
