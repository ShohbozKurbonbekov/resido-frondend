### Why React rerenders even when ids look different:

- React uses the key prop to track components.
  - It decides: “Can I reuse this component, or do I need to make a new one?”
  - Keys must be unique among siblings.
    - If two components in the same list have the same key, React might mix them up.

### In plain words for notes:

“React tracks components by the key prop. When pagination gives a new chunk of data with different keys, React sees them as completely new components and rerenders everything. Even if the layout is the same, different keys force remounting.”
