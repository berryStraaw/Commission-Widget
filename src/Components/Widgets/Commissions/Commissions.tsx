import React, { useState, useEffect } from "react";
import styles from "./styles/Commissions.module.css";
import { MockFetchCommissionSchema } from "./utils/CommissionsUtils"
import { CommissionSchema } from './types/commissionSchema';

const Commissions: React.FC = () => {
    const [ commissionsSchema, setCommissionsSchema ] = useState<CommissionSchema[]>([])
    const [ displayBreakdown, setDisplayBreakdown ]  = useState<Boolean>(false)
    
    /* fetch commissions on widget render
        could potentialy move it out to parent component/memoise it so we wouldnt have to make the same call on each render
    */
    useEffect(() => {
        setCommissionsSchema(MockFetchCommissionSchema())
    }, [])

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
                    {/* potentialy change how we display the form by using a class = disabled?
                        might be usefull when applying animations
                        */}
                    {!displayBreakdown && ""
                        /* Display form here */
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