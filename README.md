<h1 align="center">
  Snapper
  <br>
  <img src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/118/camera-with-flash_1f4f8.png" alt="snapper logo" title="snapper logo" width="100">
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">A generator of Jest snapshot based tests for React components written with TypeScript</p>

## Why
[Snapshot testing](https://facebook.github.io/jest/docs/en/snapshot-testing.html) of React components is useful tool that [Jest](https://facebook.github.io/jest/) provides to make sure your UI does not change unexpectedly. To apply it you have to describe several different states of a component configuring it with different props that this component can have. 

However, if you write components with [TypeScript](https://www.typescriptlang.org/), you have an interface describing the types of the props. There is no reason to fill props up manually with random values in your tests. It could be done automatically based on the described types. That is what `Snapper` does. 

`Snapper` generates files with tests for your React components. You just run them. ✨

## Quick Overview

Run `Snapper` through `npx` with a configured glob pattern of your React components files and a name of a root folder for generated tests:

```sh
npx snapper components/**/*.jsx __tests__
```

*([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))*

You'll get a folder full of generated snapshot-based tests for every of your components.

It will create a directory called `__tests__` inside the current folder.

Inside that directory, it will generate the files with snapshot-based tests for every of the components from the files that matched to `components/**/*.js` pattern. The structure of the included folders with tests will be the same as the scructure of the folders with components.

## How it works
A usual React component written with TypeScript look like this:

```ts
import * as React from 'react';

interface IButtonProps {
    className?: string;
    children: React.ReactNode;
    isDisabled?: boolean;
    onClick?: () => void;
}

const Button: React.StatelessComponent<IButtonProps> = (props) => {
    const { className, isDisabled, onClick } = props;

    return (
        <div className={className} onClick={!isDisabled && onClick}>
            {props.text}
        </div>
    );
};

export default Button;
```

Here we have the `Button` component that have the declared interface for its props called `IButtonProps`. 

`Snapper` takes this component and its interface, and generates a file with snapshot-based tests. The props values be taken randomly based on their types:

```jsx
import React from 'react';
import renderer from 'react-test-renderer';

import Button from 'components/Button.tsx';

test('Button 1', () => {
    const tree = renderer.create(
        <Button
            className={"className value"}
            isDisabled={true}
            onClick={() => {}}
            children={<div />}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
});

// other props values combinations go here...
```


