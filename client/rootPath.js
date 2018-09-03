const rootElement = document.getElementById('app');
const rootPath = rootElement ? rootElement.getAttribute('data-root-path') : 'http://localhost:3001';

export default rootPath;