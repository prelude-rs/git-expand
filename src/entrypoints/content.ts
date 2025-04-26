export default defineContentScript({
  matches: ['https://github.com/*/*/pull/*'],
  main() {
    const msgDivId = 'loading-message';
    const msgDivSelector = `#${msgDivId}`;
    let hiddenContentMsg: string | undefined;

    function loadMoreContent() {
      let paginationForm = document.querySelector('form.pagination-loader-container');
      let waitCount = 0;
      if (paginationForm) {
        let paginationButton = paginationForm.querySelector('button');
        if (paginationButton) {
          const buttonText = paginationButton.innerText;
          if (buttonText === hiddenContentMsg) {
            waitCount++;
            if (waitCount > 5) {
              hiddenContentMsg = undefined;
              removeLoadingMessage();
              return;
            }
          } else {
            waitCount = 0;
            hiddenContentMsg = buttonText;
            displayLoadingMessage();

            paginationButton.click();
          }

          // Check if the button is still visible after clicking or waiting
          setTimeout(loadMoreContent, 1000);
        } else {
          removeLoadingMessage();
        }
      } else {
        removeLoadingMessage();
      }
    }

    function displayLoadingMessage() {
      if (!hiddenContentMsg) {
        return;
      }

      let div: HTMLDivElement | null = document.querySelector(msgDivSelector);
      if (!div) {
        div = document.createElement('div');
        div.id = msgDivId;
        div.innerText = `Loading ${hiddenContentMsg}...`;

        div.style.position = 'fixed';
        div.style.top = '10px';
        div.style.right = '10px';
        div.style.color = '#fff';
        div.style.backgroundColor = '#444';
        div.style.opacity = '0.8';
        div.style.padding = '10px';
        div.style.border = '1px solid #ccc';
        document.body.appendChild(div);
      } else {
        div.innerText = `Loading ${hiddenContentMsg}...`;
      }
    }

    function removeLoadingMessage() {
      const div = document.querySelector(msgDivSelector);
      if (div) {
        document.body.removeChild(div);
      }
    }

    loadMoreContent();
  },
});
