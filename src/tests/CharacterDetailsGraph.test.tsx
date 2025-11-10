import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CharacterDetailsGraph from '../components/CharacterDetailsGraph';


function renderWithClient(ui: React.ReactElement) {
  const client = new QueryClient();
  return render(<QueryClientProvider client={client}>{ui}</QueryClientProvider>);
}


test('shows placeholder when no id', () => {
  renderWithClient(<CharacterDetailsGraph />);
  expect(screen.getByText(/select a character/i)).toBeInTheDocument();
});

test('loads character graph when id is provided', async () => {
  renderWithClient(<CharacterDetailsGraph id={'1'} />);
  await waitFor(() => expect(screen.queryByText('Loading character...')).not.toBeInTheDocument());
});