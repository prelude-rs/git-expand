<script lang="ts">
</script>

<main>
  <a href="https://git.dev" target="_blank" rel="noreferrer">
    <img src="/git-expand.png" class="logo git-expand" alt="git-expand Logo" />
  </a>
  <h1>git-expand</h1>
  <hr />
  <h2><span class="dimmed">Created with &nbsp;</span> WXT + Svelte</h2>
  <div class="logos">
    <a href="https://wxt.dev" target="_blank" rel="noreferrer">
      <img src="/wxt.svg" class="logo wxt" alt="WXT Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src="/svelte.svg" class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
</main>

<style>
  main {
    padding: 0px;
    margin: 0px;
    width: 100%;
  }

  hr {
    margin: 2em 0 2em 0;
    width: 100%;
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }

  .logos {
    display: flex;
    justify-content: center;
    gap: 2em;
  }

  .logo {
    margin-top: 1em;
    height: 4em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo.git-expand {
    height: 6em;
  }
  .logo.git-expand:hover {
    filter: drop-shadow(0 0 2em #545caae0);
  }
  .logo.wxt:hover {
    filter: drop-shadow(0 0 2em #54bc4ae0);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }

  .dimmed {
    color: #888;
  }
</style>
