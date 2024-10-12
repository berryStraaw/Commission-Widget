import React from "react";
import styles from "./WidgetContainer.module.css";
import Commissions from "./Commissions/Commissions";

const WidgetContainer: React.FC = () => {

    return( 
        <div className={styles.widgetContainer}>
            <Commissions/>
        </div>
    )
}

export default WidgetContainer;