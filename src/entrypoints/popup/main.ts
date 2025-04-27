import { mount } from 'svelte';
import App from './app.svelte';
import './app.css';

console.log('git-expand popup!', { id: browser.runtime.id });

const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;
