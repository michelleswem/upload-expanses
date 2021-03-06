import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ButtonSort, SortButtonProps } from '../ButtonSort';

const sortButtonProps: SortButtonProps = {
  onClick: jest.fn(),
  sortOrder: 'asc',
  columnKey: 'departments',
  sortKey: 'departments',
  type: 'button',
  children: 'button',
};

describe('Button component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders a button', () => {
    const { container } = render(<ButtonSort {...sortButtonProps} />);

    expect(container).toMatchSnapshot();
  });

  test('renders a button with this props ', () => {
    //ARRANGE
    render(<ButtonSort {...sortButtonProps} type="button" />);

    // ACT

    // ASSERT
    const btnElement = screen.getByRole('button');
    expect(btnElement).toBeInTheDocument;
  });

  test('renders a button with a className that is Not', () => {
    // ARRANGE
    render(<ButtonSort {...sortButtonProps} />);

    // ASSERT
    expect(screen.getByRole('button')).not.toHaveClass('arrow-down');
  });

  test('renders a button in asc order with a className', () => {
    // ARRANGE
    render(
      <ButtonSort
        {...sortButtonProps}
        className="arrow-up"
        type="button"
        sortKey="departments"
        columnKey="departments"
        sortOrder="asc"
      />,
    );

    // ACT
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    const outputElement = screen.getByRole('button');
    expect(outputElement).toHaveClass('arrow-up');
  });

  test('renders a button in dec order with a className', () => {
    // ARRANGE
    render(
      <ButtonSort
        {...sortButtonProps}
        className="arrow-down"
        type="button"
        sortKey="departments"
        columnKey="departments"
        sortOrder="dec"
      />,
    );

    // ACT
    const buttonElement2 = screen.getByRole('button');
    userEvent.click(buttonElement2);

    // ASSERT

    const outputElement2 = screen.getByRole('button');
    expect(outputElement2).toHaveClass('arrow-down');
  });

  test('should fire onClick callback', () => {
    // ARRANGE
    render(
      <ButtonSort {...sortButtonProps} onClick={sortButtonProps.onClick} />,
    );

    // ACT
    const button = screen.getByRole('button');

    userEvent.click(button);
    // ASSERT
    expect(sortButtonProps.onClick).toHaveBeenCalledTimes(1);
  });
});
