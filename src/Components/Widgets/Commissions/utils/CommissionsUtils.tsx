import { CommissionSchema } from "../types/commissionSchema"

// file/folder where all functions making requests to the backend can live
// or other helper functions not related to a specific component

const formatNumber = (number : number | undefined, showFractions: boolean = false  ) :string|undefined => {
    if (number === undefined) return

    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: showFractions? 2:0,
        maximumFractionDigits: showFractions? 2:0
        }).format(number)
}


const MockFetchCommissionSchema = (): CommissionSchema[] => {

    // another example of a commission schema for later testing
    /* return [
        { range: [0, 5000], commission: 0 },
        { range: [5000, 10000], commission: 0.10 },
        { range: [10000, 15000], commission: 0.15 },
        { range: [15000, 20000], commission: 0.20 },
        { range: [20000, 25000], commission: 0.25 },
        { range: [25000, 30000], commission: 0.30 },
    ] */

    return [
        { range: [0, 5000], commission: 0 },
        { range: [5000, 10000], commission: 0.10 },
        { range: [10000, 15000], commission: 0.15 },
        { range: [15000, 20000], commission: 0.20 },
        { range: [20000], commission: 0.25 }
    ]
}

export { MockFetchCommissionSchema, formatNumber }