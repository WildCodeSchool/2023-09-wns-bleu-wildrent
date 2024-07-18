import ProductCard from '@/components/ProductCard';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('ProductCard Component', () => {
  it('renders correctly', () => {
    const productRef = { id: 1, name: 'Guirlande', image: 'https://img.com/i.png', priceHT: 1 };
    const view = render(<ProductCard productRef={productRef} link="/products/1" />);
    const link = screen.getByRole('link');
    const heading = screen.getByRole('heading', { level: 2 });
    const image = screen.getByRole('img');

    expect(link).toHaveAttribute('href', '/products/1');
    expect(heading).toBeInTheDocument();
    expect(screen.getByText('Guirlande')).toBeInTheDocument();
    expect(image).toHaveAttribute('src', productRef.image);

    expect(view.baseElement).toMatchSnapshot();
  });
});
