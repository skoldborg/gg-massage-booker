const rootElement = document.getElementById('app');
const rootPath = rootElement ? rootElement.getAttribute('data-root-url') : 'http://localhost:3001';

export default rootPath;