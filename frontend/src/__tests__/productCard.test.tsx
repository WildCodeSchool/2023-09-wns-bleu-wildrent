import ProductCard from '@/components/ProductCard';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('ProductCard Component', () => {
  it('renders correctly', () => {
    const view = render(
      <ProductCard
        name="Guirlande"
        image="https://img.com/i.png"
        description="Cupcake ipsum dolor sit amet tootsie roll pastry."
        priceHT={1}
        link="/products/1"
      ></ProductCard>,
    );
    const link = screen.getByRole('link');
    const heading = screen.getByRole('heading', { level: 3 });
    expect(link).toHaveAttribute('href', '/products/1');
    expect(heading).toBeInTheDocument();
    expect(screen.getByText('Guirlande')).toBeInTheDocument();
    expect(view.baseElement).toMatchSnapshot();
  });
});
