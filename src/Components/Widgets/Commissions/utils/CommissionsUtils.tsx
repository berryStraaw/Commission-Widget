import { CommissionSchema } from "../types/commissionSchema"

// file/folder where all functions making requests to the backend can live
// or other helper functions not related to a specific component

type FormatedCommissionSchema = {
    id: string;
    value: number | undefined ;
}

//returns a number in a specified format
const formatNumber = (number : number | undefined, showFractions: boolean = false, simplify : boolean = false ) :string|undefined => {
    if (number === undefined) return

    if(simplify && number > 1000){
        return `£${number/1000}k`
    }

    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: showFractions? 2:0,
        maximumFractionDigits: showFractions? 2:0
        }).format(number)
}


//Takes in in commission data
//returns {id: in a form of £lowerBound - £upperBound , value: either commission %, or the calculated commission}

const formatData = (commissionsSchema: CommissionSchema[]) : FormatedCommissionSchema[] => {

    //checks if any of the tiers has calculatedCommissions
    //if yes then it is a post calculations call and we should not render the % of each commission range
    const preCalculations = !commissionsSchema.some(tier => tier.calculatedCommissions !== undefined);

    return commissionsSchema
    .slice()
    .map((tier) => {
        const [lowerBound, upperBound] = tier.range;

        //if upperbound doesnt exist we want a lable of lowerBound+
        // else we want lowerbound - upperBound label
        const id = !upperBound 
            ? `${formatNumber(lowerBound, false, true)}+`
            : `${formatNumber(lowerBound, false, true)} to ${formatNumber(upperBound, false, true)}`;

        // if preCalculations return % value for each tier
        // else return the actual commission amount if it exists
    
        const value = preCalculations? tier.commission : tier.calculatedCommissions ?? undefined;

        return {
            id,
            value 
        };
    });
}

//finds the lowest number in the schema thats not a 0
const findLowestBound = (commissionsSchema: CommissionSchema[]) : number => {
    return commissionsSchema.find(band => band.range[0] !== 0)?.range[0] || 0;
}
const MockFetchCommissionSchema = (): CommissionSchema[] => {
    return [
        { range: [0, 5000], commission: 0 },
        { range: [5000, 10000], commission: 0.10 },
        { range: [10000, 15000], commission: 0.15 },
        { range: [15000, 20000], commission: 0.20 },
        { range: [20000], commission: 0.25 }
    ]
}

export { MockFetchCommissionSchema, formatNumber, formatData, findLowestBound}