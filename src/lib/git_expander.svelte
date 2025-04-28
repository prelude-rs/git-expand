<script lang="ts">
  let message = $state<string | null>(null);

  console.debug('git-expander: component');

  function loadMoreContent() {
    let paginationForm = document.querySelector('form.pagination-loader-container');
    let waitCount = 0;
    if (paginationForm) {
      let paginationButton = paginationForm.querySelector('button');
      if (paginationButton) {
        const buttonText = paginationButton.innerText;
        if (buttonText === message) {
          waitCount++;
          console.debug(`git-expander waiting for requested content to load: wait count is ${waitCount}.`);

          if (waitCount > 5) {
            console.debug(`git-expander waiting for too long (count is ${waitCount}). Will stop loading.`);
            message = null;
            return;
          }
        } else {
          console.debug(`git-expander found more content to load: ${buttonText}`);
          waitCount = 0;
          message = buttonText;
          paginationButton.click();
        }

        // Run loadMoreContent again after the 'click' or a 'wait' branches above
        setTimeout(loadMoreContent, 1200);
      } else {
        console.debug(`git-expander done.`);
        message = null;
      }
    } else {
      console.debug(`git-expander done.`);
      message = null;
    }
  }

  // Load more content (if any) when the component is mounted
  loadMoreContent();
</script>

{#if message}
  <div class="git-expand-messsage">
    Loading {message}...
  </div>
{/if}

<style>
  div.git-expand-messsage {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 10px;
    background-color: #006000;
    color: #FFF;
    opacity: 0.85;
    border: 1px solid #CCC;
    border-radius: 5px 5px 5px 5px; 
    font-weight: 600;
  }
</style>
