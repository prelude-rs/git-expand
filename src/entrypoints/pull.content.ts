import App from '../lib/git_expander.svelte';
import { mount, unmount } from 'svelte';

const watchPattern = new MatchPattern('https://github.com/*/pull/*');

export default defineContentScript({
  matches: ['https://github.com/*/pulls', 'https://github.com/*/pull/*'],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        console.debug('git-expand mounting component');
        return mount(App, {
          target: container,
        });
      },
      onRemove: (_) => {
        console.debug('git-expand unmounting component');
        unmount(App);
      },
    });

    ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
      const newUrlMatch = watchPattern.includes(newUrl);
      console.debug(`git-expand location change: process ${newUrl} - ${newUrlMatch}`);

      if (newUrlMatch) {
        ui.mount();
      }
    });

    const urlMatch = watchPattern.includes(window.location.href);
    console.debug(`git-expand starting: process ${window.location.href} - ${urlMatch}`);

    if (urlMatch) {
      ui.mount();
    }
  },
});
