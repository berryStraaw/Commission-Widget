import React, { useState, useEffect } from "react";
import styles from "./styles/CommissionsBreakdown.module.css";
import { CommissionSchema } from './types/commissionSchema';
import { formatNumber } from "./utils/CommissionsUtils";

interface CommissionsBreakdownProps {
    commissionsSchema: CommissionSchema[];
    onReset: () => void;
    projectedCommissions: number;
}

const CommissionsBreakdown: React.FC<CommissionsBreakdownProps> = ({ commissionsSchema, projectedCommissions, onReset }) => {

    //Returns a formated breakdown of each commission tier and how much was earned from it
    // in a form of £lower bound - £upper bound   £amount earned 
    const renderCommissionLines = () => {
        // Reverse the array and filter out items with calculatedCommissions = 0
        return commissionsSchema
            .slice() //create a copy of the array by calling slice with no arguments
            .reverse() //reverse it so we would start with the highest bracket
            .filter(tier => tier.calculatedCommissions !== 0 && tier.calculatedCommissions !== undefined) //filter out unused brackets
            .map((tier, index) => {
                const [lowerBound, upperBound] = tier.range;

                return (
                    <div key={index} className= { styles.numberBreakdownLine} >
                        <div className= {styles.tierSummary} >
                            {
                                !upperBound? `${formatNumber(lowerBound, false)}+`
                                :
                                `${formatNumber(lowerBound, false)} to ${formatNumber(upperBound, false)}`
                            }
                        </div>
                        <div className= { styles.calculatedCommissions }>
                            {formatNumber(tier.calculatedCommissions, true)}
                        </div>
                    </div>
                );
            });
    };

    return( 
        <div >
            <h2 className= { styles.breakdownHeader}>
                {
                    formatNumber(projectedCommissions, true)
                }
            </h2>
            
            <div className= { styles.numbersBreakdown}>
                {renderCommissionLines()}
            </div>
            <button onClick={ onReset } >
                Recalculate
            </button>
        </div>
    )
}

export default CommissionsBreakdown;