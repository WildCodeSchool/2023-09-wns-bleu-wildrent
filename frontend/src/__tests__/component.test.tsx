import Component from '@/components/Component';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Component', () => {
  it('renders correctly', () => {
    const view = render(<Component />);
    expect(screen.getByText('Component')).toBeInTheDocument();
    expect(view.baseElement).toMatchSnapshot();
  });
});
