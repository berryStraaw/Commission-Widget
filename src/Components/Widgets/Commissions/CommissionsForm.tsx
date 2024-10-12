import React, { useState, useEffect } from "react";
import styles from "./styles/CommissionsForm.module.css";
import { CommissionSchema } from './types/commissionSchema';
import CurrencyInput, { CurrencyInputOnChangeValues } from "react-currency-input-field";

interface CommissionsFormProps {
    commissionsSchema: CommissionSchema[];
    updateCommissionsSchema: React.Dispatch<React.SetStateAction<CommissionSchema[]>>;
    setDisplayBreakdown: React.Dispatch<React.SetStateAction<Boolean>>;
    setProjectedCommissions: React.Dispatch<React.SetStateAction<number>>;
}

const CommissionsForm: React.FC<CommissionsFormProps> = ({
    commissionsSchema,
    updateCommissionsSchema,
    setDisplayBreakdown,
    setProjectedCommissions
}) => {
    const [revenue, setRevenue] = useState<number>(0);

    const handleSubmit = (revenueToCalculate : number) => {
        if ( revenueToCalculate === 0 ) {
            handleError("0")
            return
        }
        const commissions = calculateCommissions(revenueToCalculate)
        setProjectedCommissions( commissions )
        setDisplayBreakdown(true)
    }

    // I would consider move this out to the utils file,
    //but I will keep this here to be able to change the Commissions state easier

    //it will update commissions state to include calculated commissions for each tier
    //and return the total commissions
    const calculateCommissions = (revenueToCalculate : number ) : number => {
        let totalCommission = 0

        for (const tier of commissionsSchema) {
            let tierComissions = 0
            const [lowerBound, upperBound] = tier.range;
        
            if (upperBound === undefined ) {
                tierComissions = revenueToCalculate * tier.commission 
                totalCommission += tierComissions
                tier.calculatedCommissions = tierComissions
                break
            }
            else if (revenueToCalculate - (upperBound - lowerBound) > 0 ) {
                tierComissions = (upperBound - lowerBound) * tier.commission
                totalCommission += tierComissions
                revenueToCalculate -= upperBound - lowerBound
                tier.calculatedCommissions = tierComissions
            }
            else {
                tierComissions = revenueToCalculate * tier.commission
                totalCommission += tierComissions
                tier.calculatedCommissions = tierComissions
                break
            }
        }

        updateCommissionsSchema(commissionsSchema)
        return Math.round(totalCommission * 100) / 100
    }

    //to be changes when adding error styling / alert
    const handleError = (value: string ) => {
        console.log("entered value : ", value, "is not valid")
    }

    const handleChange = (values : CurrencyInputOnChangeValues | undefined) => {
        if (values === undefined ){
            setRevenue(0)
            return
        }
        values.float !== null ? setRevenue(values.float): setRevenue(0)
    }

    return( 
        <div className= { styles.formContainer }>
            <label htmlFor="revenueInput" className= { styles.label }>Anticipated Revenue</label>
            <CurrencyInput
                id="revenueInput"
                name="revenueInput"
                placeholder="£18,000"
                autoComplete = "off"
                decimalsLimit={2}
                onValueChange={ (value: any, name: any, values: any) => handleChange(values)}
                prefix={"£"}
                step={1}
            />
            <button 
                className= { styles.button }
                onClick={() => handleSubmit(revenue)}
            >
                Calculate Commissions
            </button>

        </div>
    )
}

export default CommissionsForm;