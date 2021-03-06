import { TooltipCursorContent } from "../Graph.styles";

const TooltipCursor = ({x, y, width, height}) => {
    return (<>
        <TooltipCursorContent x={x + 0.5} y={y}>
            <defs>
                <linearGradient id="grad" gradientTransform="rotate(90)">
                    <stop id="stop_1" offset="7%" />
                    <stop id="stop_2" offset="88%" />
                </linearGradient>
            </defs>
            <rect fill="url(#grad)" width={width - 1.5} height={height}/>
        </TooltipCursorContent>
    </>);
};

export default TooltipCursor;