import React from 'react';
import { isFragment } from 'react-is';
 
export const traverseReactNode = (children:React.ReactNode, fn:(child:React.ReactNode, index:number) => void)=> {
    // 递归，处理React.Fragement的情况
    // <>
    //   </> 拿到里面的child
    //   </>
    // <>
    const handle = (traget:React.ReactNode) => {
        let i = 0;
        React.Children.forEach(traget, (child) => {
            if(!isFragment(child)) {
                fn(child,i);
                i++;
            }else {
                handle(child.props.children);
            }
        })
    }

    handle(children);
}