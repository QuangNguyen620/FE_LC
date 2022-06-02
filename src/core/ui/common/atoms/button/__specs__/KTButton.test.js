import React from 'react';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import '@testing-library/jest-dom/extend-expect';

//👇 Imports a specific story for the test
import * as stories from './KTButton.stories';

// Every component that is returned maps 1:1 with the stories, but they already contain all decorators from story level, meta level and global level!
const { Disabled, Primary } = composeStories(stories);

describe('Kiểm tra chức năng cơ bản', () => {
  it('renders the button in the primary state', () => {
    render(<Primary />);
    expect(screen.getByRole('button')).toHaveTextContent('Primary');
  });

  test('renders radius of button', () => {
    // NOT IMPLEMENTED
    // expect(false).toBe(true);
  });

  test('renders text of button', () => {
    // NOT IMPLEMENTED
    // expect(false).toBe(true);
  });

  test('hover on button', () => {
    // NOT IMPLEMENTED
    // expect(false).toBe(true);
  });

  test('onclick handler is called', () => {
    const onClickSpy = jest.fn();
    // you can also pass custom props, which override the ones coming from the story args
    render(<Primary onClick={onClickSpy} />);
    screen.getByRole('button').click();
    expect(onClickSpy).toHaveBeenCalled();
  });

  test('onclick handler is not called when disabled', () => {
    const onClickSpy = jest.fn();
    // you can also pass custom props, which override the ones coming from the story args
    render(<Disabled onClick={onClickSpy} />);
    screen.getByRole('button').click();
    expect(onClickSpy).not.toHaveBeenCalled();
  });
});
