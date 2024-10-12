export interface CommissionSchema {
    range: [number, number?];
    commission: number;
    calculatedCommissions?: number
  }