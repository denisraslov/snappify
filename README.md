<h1 align="center">
  Snappify
  <br>
  <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/118/camera-with-flash_1f4f8.png" alt="Snappify logo" title="Snappify logo" width="100">
  <br>
  <img src="https://s3.amazonaws.com/media-p.slid.es/uploads/401307/images/4926305/All.png" alt="React + Jest + TypeScript" title="React + Jest + TypeScript" width="400">
  
</h1>
<p align="center" style="font-size: 1.2rem;"><b>A generator of Jest snapshot-based tests for React components written with TypeScript</b></p>

## Why

[Snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html) of React components is a useful tool that [Jest](https://facebook.github.io/jest/) provides to make sure your UI does not change unexpectedly. To apply it you have to describe several different states of a component configuring it with different props that this component can have. 

However, if you write components with [TypeScript](https://www.typescriptlang.org/), you have an interface describing the types of the props. There is no reason to fill props up manually with random values in your tests. It could be done automatically based on the described types. That is what `Snappify` does. 

`Snappify` generates files with tests for your React components. You just run them. ✨

## A related blog post

* [Introducing Snappify 📸: A generator of snapshot tests for React + TypeScript](https://medium.com/@denisraslov/introducing-snappify-a-generator-of-snapshot-tests-for-react-typescript-54b3fd1ffa54)

## Quick Overview

Install `Snappify` globally:

```sh
npm install -g snappify
```

Run `Snappify` inside of a project folder with a configured glob pattern of the React components files and a name of a root folder for generated tests:

```sh
snappify components/**/*.tsx --testsRoot=tests
```

It will create a directory called `tests` inside the current folder.

Inside that directory, it will generate the files with snapshot-based tests for every of the components from the files that matched to `components/**/*.tsx` pattern. 

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
├── tests
│   └── Header.js
│   └── Content.js
│   └── Footer.js
│   └── Button
│       └── index.js
```

## How it works

`Snappify` takes a component and its interface, and generates a file with snapshot-based tests with **up to 10 test cases each**. 

The props values for test cases be **generated with uniformly distributed sets of random values based on the types of the props**. That means you get the count of test cases that you can take control of, but they are still cover the details of your components as wide as it possible in this situation. 

## An example

Here we have the `Button` component that have the declared interface for its props called `IButtonProps`. 

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

`Snappify` will generate a file with tests for this component that will looks like:

```jsx
import React from 'react';
import renderer from 'react-test-renderer';

import Button from 'components/Button.tsx';

test('Button case #1', () => {
    const tree = renderer.create(
        <Button
            // some randomly generated values for props
            className={'value'}
            isDisabled={true}
            onClick={() => undefined}
            children={<div />}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

test('Button case #2', () => {
    const tree = renderer.create(
        <Button
            // another set of randomly generated values for props
            // (the not required props were skipped)
            children={<div />}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

// Other test cases go here...
```

## Supported TypeScript types

Right now `Snappify` supports the [basic types of TypeScript](https://www.typescriptlang.org/docs/handbook/basic-types.html). It also supports a few of the React types: `React.ReactNode`, `JSX.Element` and `React.CSSProperties`. 

It **doesn't support** using other declared TypeScript interfaces as types of items of a React component's interface yet.

I condiser increase of the supported types as a future improvement.

## Supported TypeScript syntax

Right now `Snappify` supports **only** the semicolon (`;`) as a delimiter between interface items. See example:

```js
interface IButtonProps {
    children: React.ReactNode;
    className?: string;
}
```

It also supports only React components declared with one of the following statements:

```js
class Button extends React.Component<IButtonProps, IButtonState> {}
```

```js
class Button extends React.PureComponent<IButtonProps, IButtonState> {}
```

```js
const Button:React.StatelessComponent<IButtonProps> = (props) => {}
```

```js
const Button:React.FunctionComponent<IButtonProps> = (props) => {}
```
