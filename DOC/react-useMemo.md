### useMemo() ?

- useMemo is a React Hook that lets you memoize (cache) the result of a computation so React doesn’t re-calculate it on every render unless its dependencies change.

# in pleain words

- It remembers the result of a function.
- If inputs (dependencies) didn’t change → React reuses the old result instead of recalculating.

### When to use it?

- You have an expensive calculation (like filtering, sorting, or computing big arrays).
- Or when you need referential equality (e.g., passing stable objects/arrays as props to children to prevent re-renders).
- ❌ Don’t use it everywhere — it adds complexity. Use only where performance matters.
