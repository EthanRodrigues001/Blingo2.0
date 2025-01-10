# Code Citations

## License: unknown

https://github.com/Ekenzy-101/React-Instagram-Clone/tree/959c146caf509099cc1abfe1ab6bca02ad55fb35/src/utils/context/user.tsx

```
}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider"
```

## License: unknown

https://github.com/maolululu/explainPaper/tree/a1f1d4aa79be8120231f6f9cc725e2fc0ae8df86/lib/user.tsx

```
}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context
```
