import React, { useState, useEffect } from "react";
import styles from "./styles/Commissions.module.css";
import { MockFetchCommissionSchema } from "./utils/CommissionsUtils"
import { CommissionSchema } from './types/commissionSchema';
import CommissionsForm from "./CommissionsForm";

const Commissions: React.FC = () => {
    const [ commissionsSchema, setCommissionsSchema ] = useState<CommissionSchema[]>([])
    const [ displayBreakdown, setDisplayBreakdown ]  = useState<Boolean>(false)
    const [ projectedCommissions, setProjectedCommissions] = useState<number>(0)
    
    /* fetch commissions on widget render
        could potentialy move it out to parent component/memoise it so we wouldnt have to make the same call on each render
    */
    useEffect(() => {
        setCommissionsSchema(MockFetchCommissionSchema())
    }, [])

    /* 
        { range: [0, 5000], commission: 0, calculatedCommissions: 0},
        { range: [5000, 10000], commission: 0.10 , calculatedCommissions: 500},
        { range: [10000, 15000], commission: 0.15 , calculatedCommissions: 750},
        { range: [15000, 20000], commission: 0.20 , calculatedCommissions: 600},
        { range: [20000], commission: 0.25 , calculatedCommissions: 0}

        
    */
        /* £18,000, 
         they should see a total commission value of 
         £1,850, 
         0% (£0) from the first £5k,
        10% (£500) from the next £5k, 
        15% (£750) from the next £5k and 
        20% (£600) from the remaining £3k. */

    return( 
        <div className = { styles.commissionsContainer } >
            <div className={ styles.header}>
                <h2>Projected Commissions</h2>
                {/* info icon placeholder */}
                i
            </div>
            
            <div className = { styles.commissionsContent}>
                <div className= { styles.form}>
                    {!displayBreakdown && 
                        <CommissionsForm
                            commissionsSchema = { commissionsSchema }
                            updateCommissionsSchema = { setCommissionsSchema }
                            setDisplayBreakdown = { setDisplayBreakdown }
                            setProjectedCommissions = { setProjectedCommissions }
                        />
                    }
                    {displayBreakdown && ""
                        /* display Breakdown here */
                    } 
                </div>

                {/*  vertical divider for desktop size */}
                <div className = { styles.divider }/>

                {/* graph/chart  */}
                <div className = { styles.graph }>
                </div>
            </div>
        </div>
    )
}

export default Commissions;