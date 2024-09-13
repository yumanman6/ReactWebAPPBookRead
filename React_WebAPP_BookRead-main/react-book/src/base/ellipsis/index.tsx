import React from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import useResizeObserver from "@/hooks/useResizeObserver";
import { pxToNumber } from "./utils";

import './styles/index.scss';

export interface EllipsisProps {
    // 文本内容
    text: string;
    // 展示几行
    rows?: number;
    // 收起操作元素
    collapse?: React.ReactNode;
    // 展开操作元素
    expand?: React.ReactNode;
}

const classPrefix = 'ygm-ellipsis';
const ellipsisTailing = "......";
const Ellipsis: React.FC<EllipsisProps> = (props) => {
    const [exceeded, setExceeded] = React.useState<boolean>(false);
    const [expanded, setExpanded] = React.useState<boolean>(false);
    const [ellipsis, setEllipsis] = React.useState<string>('');

    const containerRef = React.useRef<HTMLDivElement>(null);

    const calcEllipsised = React.useCallback(() => {
        const element = containerRef.current;
        if(!element) return;

        const orginStyle = window.getComputedStyle(element);
        const container = document.createElement('div');

        const styleNames:string[] = Array.prototype.slice.apply(orginStyle);
        styleNames.forEach((name) => {
            container.style.setProperty(name,orginStyle.getPropertyValue(name));
        });
        
        container.innerText = props.text;

        container.style.height = 'auto';
        container.style.position = 'fixed';
        container.style.visibility = 'hidden';

        document.body.appendChild(container);

        const lineHeight = pxToNumber(orginStyle.lineHeight);
        // 期望想要的显示最大高度
        const maxHeight = lineHeight * props.rows!;
        const height = container.getBoundingClientRect().height;

        const check = (left: number, right: number) => {
            let l = left;
            let r = right;
            let text = '';

            while(l < r) {
                const m = Math.floor((l+r)/2);
                if(l === m) {
                    break;
                }

                const tempText = props.text.slice(l,m);
                container.innerText = `${text}${tempText}${ellipsisTailing}${props.expand}`
                const height = container.getBoundingClientRect().height;

                if(height > maxHeight) {
                    r = m;
                }else {
                    text += tempText;
                    l = m;
                }
            }
            return text;
        }

        if(maxHeight >= height) {
            setExceeded(false);
        }else {
            setExceeded(true);
            const ellipsisedValue = check(0, props.text.length);
            setEllipsis(ellipsisedValue);

        }

        document.body.removeChild(container);

    }, [props.text, props.expand, props.rows]);

    useIsomorphicLayoutEffect(() => {
        calcEllipsised();
    }, [calcEllipsised])

    // 适应尺寸变化，重新计算
    useResizeObserver(calcEllipsised, containerRef);

    const renderContent = () => {
        if(!exceeded) {
            return props.text;
        }
        if(expanded) {
            return (
                <>
                    {props.text}
                    {props.collapse && <a>{props.collapse}</a>}
                </>
            )
        }else {
            return (
                <>
                    {ellipsis}
                    {ellipsisTailing}
                    {props.expand && <a>{props.expand}</a>}
                </>
            )
        }
    }

    const onContent = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation;
        
        if(!props.expand && !props.collapse) return;
        
        if(props.expand && !props.collapse) {
            setExpanded(true);
            return;
        }

        setExpanded(!expanded);
    }

    return <div className={classPrefix} ref={containerRef} onClick={onContent}>
        {renderContent()}
    </div>
}

Ellipsis.defaultProps = {
    text: '',
    rows: 1,
    collapse: "",
    expand: ""
}

Ellipsis.displayName = "Ellipsis";
export default Ellipsis;