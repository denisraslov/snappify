<h1 align="center">
  Snappify
  <br>
  <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/118/camera-with-flash_1f4f8.png" alt="snappify logo" title="snappify logo" width="100">
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;"><b>A generator of Jest snapshot-based tests for React components written with TypeScript</b></p>

## Why

[Snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html) of React components is a useful tool that [Jest](https://facebook.github.io/jest/) provides to make sure your UI does not change unexpectedly. To apply it you have to describe several different states of a component configuring it with different props that this component can have. 

However, if you write components with [TypeScript](https://www.typescriptlang.org/), you have an interface describing the types of the props. There is no reason to fill props up manually with random values in your tests. It could be done automatically based on the described types. That is what `Snappify` does. 

`Snappify` generates files with tests for your React components. You just run them. ✨

## Quick Overview

Install `Snappify` globally:

```sh
npm install -g snappify
```

Run `Snappify` inside of a project folder with a configured glob pattern of the React components files and a name of a root folder for generated tests:

```sh
snappify components/**/*.tsx __tests__
```

It will create a directory called `__tests__` inside the current folder.

Inside that directory, it will generate the files with snapshot-based tests for every of the components from the files that matched to `components/**/*.js` pattern. 

## Folders structure
The structure of the included folders with tests will be the same as the structure of the folders with components. The names of the files with tests will be the same as the names of the files with the components.

For example, if you have this structure of folders:
```
my-app
├── components
│   └── Header.tsx
│   └── Content.tsx
│   └── Footer.tsx
│   └── Button
│       └── index.tsx
```

You will get this structure of the folders with the tests (when you run the command above):

```
my-app
├── __tests__
│   └── Header.js
│   └── Content.js
│   └── Footer.js
│   └── Button
│       └── index.js
```

## How it works
A usual React component written with TypeScript looks like this:

```ts
import * as React from 'react';

interface IButtonProps {
    children: React.ReactNode;
    className?: string;
    isDisabled?: boolean;
    onClick?: () => void;
}

const Button: React.StatelessComponent<IButtonProps> = (props) => {
    const { className, isDisabled, onClick } = props;

    return (
        <div className={className} onClick={!isDisabled && onClick}>
            {props.children}
        </div>
    );
};

export default Button;
```

Here we have the `Button` component that have the declared interface for its props called `IButtonProps`. 

`Snappify` takes this component and its interface, and generates a file with snapshot-based tests. The props values be taken randomly based on their types:

```jsx
import React from 'react';
import renderer from 'react-test-renderer';

import Button from 'components/Button.tsx';

test('Button with all the props', () => {
    const tree = renderer.create(
        <Button
            className={'className value'}
            isDisabled={true}
            onClick={() => {}}
            children={<div />}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('Button with the required props', () => {
    const tree = renderer.create(
        <Button
            children={<div />}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});
```

Right now `Snappify` generates two combinations of props' values only: **for all the props** and **for the required props**. We condiser increase of the quantity of the combinations as a future improvement.

## Supported TypeScript types

Right now `Snappify` supports the [basic types of TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html). It also supports a few of the React types: `React.ReactNode` and `React.CSSProperties`. We condiser increase of the supported types as a future improvement.

## Usage
