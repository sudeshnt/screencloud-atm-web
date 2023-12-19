import { formatPound } from '..';

describe('formatPound function', () => {
  it('formats positive number correctly', () => {
    const result = formatPound(12345.67);
    expect(result).toBe('£12,345.67');
  });

  it('formats negative number correctly', () => {
    const result = formatPound(-9876.54);
    expect(result).toBe('-£9,876.54');
  });

  it('handles zero correctly', () => {
    const result = formatPound(0);
    expect(result).toBe('£0.00');
  });

  it('handles large numbers correctly', () => {
    const result = formatPound(1234567890.12345);
    expect(result).toBe('£1,234,567,890.12');
  });
});
