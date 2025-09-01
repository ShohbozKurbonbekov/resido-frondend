### what is React.memo

- memo is a wrapper you put around a component.
  -It tells React: - “Only re-render this component if its props actually change.”
  - If props stay the same, React will reuse the previous render result instead of re-rendering.

### Think of memo as telling React:

"Don’t bother re-cooking the dish if the ingredients are the same — just reuse the last plate." 🍽️
