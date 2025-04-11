# Patches

This directory contains patches for npm packages using [patch-package](https://github.com/ds300/patch-package).

## react-native-paper+5.12.5.patch

This patch fixes a React warning about spreading a "key" prop into JSX in the BottomNavigation.Bar component.

### Issue

The warning occurs because the `renderTouchable` prop default value in `BottomNavigationBar.tsx` spreads props including the `key` prop into JSX:

```typescript
renderTouchable = (props: TouchableProps<Route>) => <Touchable {...props} />
```

React requires that the `key` prop be passed directly to JSX elements rather than being included in spread operators.

### Fix

The patch extracts the `key` prop before spreading the rest of the props:

```typescript
renderTouchable = ({ key, ...props }: TouchableProps<Route>) => (
  <Touchable key={key} {...props} />
)
```

This ensures that the `key` prop is passed directly to the JSX element, which is the recommended approach in React.
