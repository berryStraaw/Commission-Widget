import { ResponsivePie } from '@nivo/pie'
import { CommissionSchema } from './types/commissionSchema';
import { formatData, formatNumber } from './utils/CommissionsUtils';

interface ResponsivePieProps {
    commissionsSchema: CommissionSchema[];
}

export const ResponsivePieGraph: React.FC<ResponsivePieProps> = ({ commissionsSchema } ) => {
    return (
        <ResponsivePie
            data={formatData(commissionsSchema)}
            margin={{top: 10 , right: 10, bottom: 10, left: 10}}
            innerRadius={0.4}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            valueFormat= { (value) => value < 1? value * 100 + "%" : `${formatNumber(value,true)}`}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            enableArcLinkLabels = {false}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
        />
    )
}