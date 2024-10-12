import React, { useState, useEffect } from "react";
import styles from "./styles/Commissions.module.css";
import { MockFetchCommissionSchema } from "./utils/CommissionsUtils"
import { CommissionSchema } from './types/commissionSchema';
import CommissionsForm from "./CommissionsForm";
import CommissionsBreakdown from "./CommissionsBreakdown";
import { ResponsivePieGraph } from "./Graph";
import { Tooltip } from "react-tooltip";

const Commissions: React.FC = () => {
    const [ commissionsSchema, setCommissionsSchema ] = useState<CommissionSchema[]>([])
    const [ displayBreakdown, setDisplayBreakdown ]  = useState<Boolean>(false)
    const [ projectedCommissions, setProjectedCommissions] = useState<number>(0)
    
    useEffect(() => {
        setCommissionsSchema(MockFetchCommissionSchema())
    }, [])

    const onReset = () => {
        setDisplayBreakdown(false)
        setCommissionsSchema(MockFetchCommissionSchema())
    }

    return( 
        <div className = { styles.commissionsContainer } >
            <div className={ styles.header}>
                <h2>Projected Commissions</h2>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                    data-tooltip-id="tooltip"
                >
                    <path
                        fill="currentColor"
                        d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0
                        13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1
                        2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175
                        2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                    />
                </svg>
                <Tooltip
                    id="tooltip"
                    variant="info"
                    place="right"
                >
                    Enter your estimated revenue amount and <br/>
                    we will calculate the total commissions <br/>earned and provide a detailed breakdown
                </Tooltip>
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
                    {displayBreakdown &&
                        <CommissionsBreakdown
                            commissionsSchema = { commissionsSchema }
                            projectedCommissions={ projectedCommissions }
                            onReset = { onReset }
                        />
                    } 
                </div>

                <div className = { styles.divider }/>

                <div className = { styles.graph }>
                    <ResponsivePieGraph commissionsSchema={ commissionsSchema }/>
                </div>
            </div>
        </div>
    )
}

export default Commissions;