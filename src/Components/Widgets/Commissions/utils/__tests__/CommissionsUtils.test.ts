import { formatNumber, formatData, MockFetchCommissionSchema, findLowestBound } from '../CommissionsUtils';
import { CommissionSchema } from '../../types/commissionSchema';

describe('MockFetchCommissionSchema', () => {
    it('should return the mock commission schema', () => {
        const schema = MockFetchCommissionSchema();
        expect(schema).toEqual([
            { range: [0, 5000], commission: 0 },
            { range: [5000, 10000], commission: 0.10 },
            { range: [10000, 15000], commission: 0.15 },
            { range: [15000, 20000], commission: 0.20 },
            { range: [20000], commission: 0.25 }
        ]);
    });
});

describe('findLowestBound', () => {
    const mockCommissionsSchema = MockFetchCommissionSchema();

    it('should return the lowest bound in the commission schema', () => {
        const lowestBound = findLowestBound(mockCommissionsSchema);
        expect(lowestBound).toBe(5000);
    });
});

describe('formatData', () => {
    const mockCommissionsSchema: CommissionSchema[] = MockFetchCommissionSchema();

    it('should return an array of formatted commission data', () => {
        const formattedData = formatData(mockCommissionsSchema);
        expect(formattedData).toEqual([
            { id: '£0 to £5k', value: 0 },
            { id: '£5k to £10k', value: 0.1 },
            { id: '£10k to £15k', value: 0.15 },
            { id: '£15k to £20k', value: 0.2 },
            { id: '£20k+', value: 0.25 }
        ]);
    });

    it('should handle missing upper bound and show the lowerBound+ label', () => {
        const mockData: CommissionSchema[] = [
            { range: [20000], commission: 0.25 }
        ];
        const formattedData = formatData(mockData);
        expect(formattedData).toEqual([{ id: '£20k+', value: 0.25 }]);
    });

    it('should return the actual commission amount if post-calculations', () => {
        const mockDataWithCalculated: CommissionSchema[] = [
            { range: [0, 5000], commission: 0, calculatedCommissions: 500 },
            { range: [5000, 10000], commission: 0.1, calculatedCommissions: 1000 }
        ];

        const formattedData = formatData(mockDataWithCalculated);
        expect(formattedData).toEqual([
            { id: '£0 to £5k', value: 500 },
            { id: '£5k to £10k', value: 1000 }
        ]);
    });
});

describe('formatNumber', () => {
    it('should return undefined if the number is undefined', () => {
        expect(formatNumber(undefined)).toBeUndefined();
    });

    it('should format a number in the correct format', () => {
        expect(formatNumber(500)).toBe('£500');
    });

    it('should format a number with fractions when showFractions is true', () => {
        expect(formatNumber(500.25, true)).toBe('£500.25');
    });

    it('should format a large number and simplify it when simplify is true', () => {
        expect(formatNumber(5000, false, true)).toBe('£5k');
    });

    it('should format a large number without simplifying when simplify is false', () => {
        expect(formatNumber(5000, false, false)).toBe('£5,000');
    });
});
