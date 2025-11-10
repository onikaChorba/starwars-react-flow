import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterList from '../components/CharacterList';


function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient();
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}


test('renders list and characters from mocked API', async () => {
  renderWithClient(<CharacterList onSelect={() => { }} />);

  const cards = await screen.findAllByRole('button');
  expect(cards.length).toBeGreaterThan(0);
});

