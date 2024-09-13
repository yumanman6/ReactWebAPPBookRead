import React from 'react';
import cx from 'classnames';

import './styles/index.scss';

import { getTimeItems } from '@/base/countdown/utils';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

export interface CountdownProps {
    // 倒计时总时长：单位毫秒
    time: number;
    // 倒计时格式： hh:mm:ss
    format?: string;
    // 结束文案
    endText?: string;
    // 数字样式
    numberClassName?: string;
    // 符号样式
    symbolClassName?: string;
    // 结束文案样式
    endTextClassName?: string;
}

const classPrefix = 'ygm-countdown';

// 30小时 ===> 108000000
// format: hh:mm:ss
// [{num: '29', symbol: ':'},{num:'59',symbol: ":"},{num:'59',symbol: ":"}]
// 遍历 ===》 29:59:59
// 定时器 ==》更新时间 ===》重新渲染

type timeItemType = {num: string; symbol: string} [];

const Countdown: React.FC<CountdownProps> = (props) => {

    const [timeItems, setTimeItems] = React.useState<timeItemType>();
    const [timeEnd, setTimeEnd] = React.useState<boolean>(false);

    const computerTimeRef = React.useRef<number>(props.time);
    const timeRef = React.useRef<number>(0);
    const endTimeMs = React.useMemo(() => Date.now() + computerTimeRef.current, []);
    
    const setCountdownTimeItems = React.useCallback(() => {
        if(computerTimeRef.current <= 0) {
            setTimeEnd(true);
            clearTimeout(timeRef.current);
        }

        const timeItems = getTimeItems(props.format!,computerTimeRef.current);
        setTimeItems(timeItems);
    },[props.format])
    
    const initCountdown = React.useCallback(() => {
        clearTimeout(timeRef.current);
        // 获取当前时间
        const now = Date.now();
        // 获取剩余毫秒数
        computerTimeRef.current = endTimeMs - now;
        timeRef.current = window.setTimeout(() => {
            initCountdown();
        })
        setCountdownTimeItems();
    }, [endTimeMs, setCountdownTimeItems])

    // useEffect 是异步的，useLayoutEffect 是同步的
    // useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前
    // useLayoutEffect 和 componentDidMount和 componentDidUpdate 应该是一致的

    useIsomorphicLayoutEffect(() => {
        initCountdown();

        return () => {
          clearTimeout(timeRef.current);
        }
    }, [initCountdown])

    return (
        <div className={classPrefix}> 
          { 
            timeItems ? (
              timeEnd && props.endText ? ( 
                <div className={props.endTextClassName}>{props.endText}</div> 
              ) : ( 
                timeItems.map((item,index) => ( 
                  <div className={`${classPrefix}-item`} key={index}> 
                    <div className={cx(`${classPrefix}-item-num`, props.numberClassName)}>{item.num}</div> 
                    <div className={cx(`${classPrefix}-symbol`, props.symbolClassName)}>{item.symbol}</div>
                  </div> 
                )) 
              )
            ) : null
          }  
        </div>
      );
      
};

Countdown.displayName = 'Countdown';

Countdown.defaultProps = {
    format: 'hh:mm:ss'
}

export default Countdown;