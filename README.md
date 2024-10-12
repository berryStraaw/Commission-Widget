This is a demo of a Commissions Widget

The main component lives in the src/Components/Widgets/Commissions

I have made a small design for it before implementing it to help me plan ahead:
https://www.figma.com/design/iZUXF2W8vsuCzuSYDRUmmr/Widget-Design?node-id=0-1&t=s8WWlAbFJmnggUU1-1

I have used three libraries to replicate similar behaviour as in the examples given:
Nivo Charts, to create a lil chart to add some color to the widget
I have seen charts in the examples so this could be replaced by the charts/charting library already being used in the other widgets

react-currency-input-field for an easy way to format an input field
Normaly I would use input field design similar to what was already implemented
to stick to the common theme, but in the examples I did not see any input fields so I took the liberty of styling it

react-tooltip for implementing error and info popovers, same as charts, it could be replaced by the in house library or whatever is used in the other widgets
