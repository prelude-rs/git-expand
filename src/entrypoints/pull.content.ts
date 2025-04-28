import App from '../lib/git_expander.svelte';
import { mount, unmount } from 'svelte';

const watchPattern = new MatchPattern('https://github.com/*/pull/*');

export default defineContentScript({
  matches: ['https://github.com/*'],
  main(ctx) {
    // Svelte UI component
    const ui = createIntegratedUi(ctx, {
      position: 'inline',
      anchor: 'body',
      onMount: (container) => {
        console.debug('git-expand mounting component on pull request page');
        return mount(App, {
          target: container,
        });
      },
      onRemove: (_) => {
        console.debug('git-expand unmounting component');
        unmount(App);
      },
    });

    // Listen for location changes (for HTML 5 history API)
    ctx.addEventListener(window, 'wxt:locationchange', ({ newUrl }) => {
      const newUrlMatch = watchPattern.includes(newUrl);
      if (newUrlMatch) {
        ui.mount();
      }
    });

    const urlMatch = watchPattern.includes(window.location.href);

    // If the original page matches the pattern, mount the UI
    if (urlMatch) {
      ui.mount();
    } else {
      console.debug('git-expand loaded, watching URL changes waiting for a pull request page');
    }
  },
});
